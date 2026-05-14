#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import pathlib
import sys
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

DEFAULT_BASE = 'https://kong.yearn.fi'
TYPE_REF_FRAGMENT = '''
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
      }
    }
  }
}
'''
QUERY_FIELDS_QUERY = f'''
query QueryFields {{
  __type(name: "Query") {{
    fields {{
      name
      args {{
        name
        type {{
          ...TypeRef
        }}
      }}
      type {{
        ...TypeRef
      }}
    }}
  }}
}}
{TYPE_REF_FRAGMENT}
'''
TYPE_DETAILS_QUERY = f'''
query TypeDetails($name: String!) {{
  __type(name: $name) {{
    kind
    name
    fields {{
      name
      args {{
        name
        type {{
          ...TypeRef
        }}
      }}
      type {{
        ...TypeRef
      }}
    }}
    inputFields {{
      name
      type {{
        ...TypeRef
      }}
    }}
    enumValues {{
      name
    }}
    possibleTypes {{
      kind
      name
    }}
  }}
}}
{TYPE_REF_FRAGMENT}
'''


def normalize_base(base: str) -> str:
    value = (base or '').strip()
    if not value:
        raise SystemExit('BASE is empty')
    if not value.startswith('http://') and not value.startswith('https://'):
        value = 'https://' + value
    return value.rstrip('/')


def normalize_address(address: str) -> str:
    value = address.strip().lower()
    if not value.startswith('0x'):
        raise SystemExit(f'Address must start with 0x: {address}')
    return value


def build_url(base: str, path: str, params: list[tuple[str, str]] | None = None) -> str:
    encoded = urllib.parse.urlencode(params or [], doseq=True)
    if encoded:
        return f'{base}{path}?{encoded}'
    return f'{base}{path}'


def fetch_json(url: str, *, payload: dict[str, Any] | None = None) -> Any:
    data = None
    headers = {'accept': 'application/json'}
    method = 'GET'
    if payload is not None:
        data = json.dumps(payload).encode('utf-8')
        headers['content-type'] = 'application/json'
        method = 'POST'

    request = urllib.request.Request(url, headers=headers, data=data, method=method)
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            body = response.read().decode('utf-8')
            return json.loads(body)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode('utf-8', errors='replace')
        raise SystemExit(f'HTTP {exc.code} for {url}\n{body}') from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f'Network error for {url}: {exc}') from exc


def graphql_request(base: str, query: str, *, variables: dict[str, Any] | None = None) -> Any:
    url = build_url(base, '/api/gql')
    return fetch_json(url, payload={'query': query, 'variables': variables or {}})


def maybe_limit(value: Any, limit: int | None) -> Any:
    if limit is None:
        return value
    if isinstance(value, list):
        return value[:limit]
    return value


def filter_catalog_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    filtered: list[dict[str, Any]] = []
    for row in rows:
        origin = row.get('origin')
        inclusion = row.get('inclusion') or {}
        is_yearn = inclusion.get('isYearn')
        if origin == 'yearn' and is_yearn is not False:
            filtered.append(row)
    return filtered


def score_search_row(row: dict[str, Any], query: str) -> int:
    needle = query.strip().lower()
    if not needle:
        return 0

    tokens = [token for token in needle.split() if token]
    if not tokens:
        return 0

    asset = row.get('asset') or {}
    fields = {
        'name': str(row.get('name') or '').lower(),
        'symbol': str(row.get('symbol') or '').lower(),
        'asset_symbol': str(asset.get('symbol') or '').lower(),
        'asset_name': str(asset.get('name') or '').lower(),
        'address': str(row.get('address') or '').lower(),
    }

    score = 0
    combined = ' '.join(value for value in fields.values() if value)

    if fields['address'] == needle:
        score += 1000
    if fields['symbol'] == needle:
        score += 600
    if fields['name'] == needle:
        score += 500
    if fields['asset_symbol'] == needle:
        score += 400

    for token in tokens:
        if token in fields['name']:
            score += 120
        if token in fields['symbol']:
            score += 100
        if token in fields['asset_symbol']:
            score += 80
        if token in fields['asset_name']:
            score += 40
        if token in fields['address']:
            score += 20
        if token in combined:
            score += 5

    if needle in combined:
        score += 75

    return score


def search_rows(rows: list[dict[str, Any]], query: str) -> list[dict[str, Any]]:
    scored_rows: list[tuple[int, dict[str, Any]]] = []
    for row in rows:
        score = score_search_row(row, query)
        if score > 0:
            row_with_score = dict(row)
            row_with_score['_matchScore'] = score
            scored_rows.append((score, row_with_score))

    scored_rows.sort(
        key=lambda item: (
            -item[0],
            -float(item[1].get('tvl') or 0),
            str(item[1].get('symbol') or ''),
        )
    )
    return [row for _score, row in scored_rows]


def render_type_ref(node: dict[str, Any] | None) -> str:
    if not node:
        return 'Unknown'
    kind = node.get('kind')
    if kind == 'NON_NULL':
        return f'{render_type_ref(node.get("ofType"))}!'
    if kind == 'LIST':
        return f'[{render_type_ref(node.get("ofType"))}]'
    name = node.get('name')
    if name:
        return name
    return kind or 'Unknown'


def format_graphql_field(field: dict[str, Any]) -> dict[str, Any]:
    return {
        'name': field.get('name'),
        'type': render_type_ref(field.get('type')),
        'args': [
            {
                'name': arg.get('name'),
                'type': render_type_ref(arg.get('type')),
            }
            for arg in field.get('args') or []
        ],
    }


def command_catalog(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    path = f'/api/rest/list/vaults/{args.chain_id}' if args.chain_id is not None else '/api/rest/list/vaults'
    rows = fetch_json(build_url(base, path, [('origin', 'yearn')]))
    if not isinstance(rows, list):
        raise SystemExit('Expected a JSON array from the catalog endpoint')
    return maybe_limit(filter_catalog_rows(rows), args.limit)


def command_list(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    path = f'/api/rest/list/vaults/{args.chain_id}' if args.chain_id is not None else '/api/rest/list/vaults'
    params: list[tuple[str, str]] = []
    if args.origin:
        params.append(('origin', args.origin))
    rows = fetch_json(build_url(base, path, params))
    return maybe_limit(rows, args.limit)


def command_search(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    path = f'/api/rest/list/vaults/{args.chain_id}' if args.chain_id is not None else '/api/rest/list/vaults'

    params: list[tuple[str, str]] = []
    if not args.all_origins:
        params.append(('origin', 'yearn'))

    rows = fetch_json(build_url(base, path, params))
    if not isinstance(rows, list):
        raise SystemExit('Expected a JSON array from the list endpoint')

    scoped_rows = rows if args.all_origins else filter_catalog_rows(rows)
    matches = search_rows(scoped_rows, args.query)
    return maybe_limit(matches, args.limit)


def command_snapshot(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    address = normalize_address(args.address)
    path = f'/api/rest/snapshot/{args.chain_id}/{address}'
    return fetch_json(build_url(base, path))


def command_timeseries(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    address = normalize_address(args.address)
    path = f'/api/rest/timeseries/{args.segment}/{args.chain_id}/{address}'
    params = [('components', component) for component in args.component]
    rows = fetch_json(build_url(base, path, params))
    return maybe_limit(rows, args.limit)


def command_reports(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    address = normalize_address(args.address)
    path = f'/api/rest/reports/{args.chain_id}/{address}'
    rows = fetch_json(build_url(base, path))
    return maybe_limit(rows, args.limit)


def command_gql(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    if bool(args.query) == bool(args.query_file):
        raise SystemExit('Provide exactly one of --query or --query-file')

    query = args.query
    if args.query_file:
        query = pathlib.Path(args.query_file).read_text(encoding='utf-8')

    variables: dict[str, Any] = {}
    if args.variables:
        parsed = json.loads(args.variables)
        if not isinstance(parsed, dict):
            raise SystemExit('--variables must decode to a JSON object')
        variables = parsed

    return graphql_request(base, query, variables=variables)


def command_gql_root_fields(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    response = graphql_request(base, QUERY_FIELDS_QUERY)
    query_type = ((response or {}).get('data') or {}).get('__type')
    if not isinstance(query_type, dict):
        return response
    fields = query_type.get('fields') or []
    return [format_graphql_field(field) for field in fields]


def command_gql_type(args: argparse.Namespace) -> Any:
    base = normalize_base(args.base)
    response = graphql_request(base, TYPE_DETAILS_QUERY, variables={'name': args.type_name})
    type_info = ((response or {}).get('data') or {}).get('__type')
    if not isinstance(type_info, dict):
        return response

    result: dict[str, Any] = {
        'name': type_info.get('name'),
        'kind': type_info.get('kind'),
    }

    fields = type_info.get('fields') or []
    if fields:
        result['fields'] = [format_graphql_field(field) for field in fields]

    input_fields = type_info.get('inputFields') or []
    if input_fields:
        result['inputFields'] = [
            {
                'name': field.get('name'),
                'type': render_type_ref(field.get('type')),
            }
            for field in input_fields
        ]

    enum_values = type_info.get('enumValues') or []
    if enum_values:
        result['enumValues'] = [value.get('name') for value in enum_values]

    possible_types = type_info.get('possibleTypes') or []
    if possible_types:
        result['possibleTypes'] = [
            {
                'name': possible_type.get('name'),
                'kind': possible_type.get('kind'),
            }
            for possible_type in possible_types
        ]

    return result


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description='Query Yearn Kong data with a Yearn-first workflow.'
    )
    parser.add_argument('--base', default=DEFAULT_BASE, help='Kong origin (default: https://kong.yearn.fi)')
    subparsers = parser.add_subparsers(dest='command', required=True)

    catalog_parser = subparsers.add_parser(
        'catalog',
        help='Return the current website-style Yearn catalog (origin=yearn plus inclusion.isYearn filter).'
    )
    catalog_parser.add_argument('--chain-id', type=int, help='Optional chain ID filter')
    catalog_parser.add_argument('--limit', type=int, help='Limit returned rows after filtering')
    catalog_parser.set_defaults(func=command_catalog)

    list_parser = subparsers.add_parser('list', help='Return the raw Kong list endpoint output.')
    list_parser.add_argument('--chain-id', type=int, help='Optional chain ID filter')
    list_parser.add_argument('--origin', help='Optional origin filter, for example yearn')
    list_parser.add_argument('--limit', type=int, help='Limit returned rows')
    list_parser.set_defaults(func=command_list)

    search_parser = subparsers.add_parser(
        'search',
        help='Search vault rows by name, symbol, asset symbol, or address. Defaults to the website-style Yearn catalog.'
    )
    search_parser.add_argument('query', help='Search text, for example yvUSDC, USDC, or a vault address')
    search_parser.add_argument('--chain-id', type=int, help='Optional chain ID filter')
    search_parser.add_argument('--all-origins', action='store_true', help='Search the raw multi-origin Kong list instead of the Yearn catalog')
    search_parser.add_argument('--limit', type=int, help='Limit returned rows')
    search_parser.set_defaults(func=command_search)

    snapshot_parser = subparsers.add_parser('snapshot', help='Return one vault snapshot.')
    snapshot_parser.add_argument('chain_id', type=int, help='Chain ID')
    snapshot_parser.add_argument('address', help='Vault address')
    snapshot_parser.set_defaults(func=command_snapshot)

    timeseries_parser = subparsers.add_parser('timeseries', help='Return one vault timeseries segment.')
    timeseries_parser.add_argument('segment', choices=['pps', 'apy-historical', 'apr-oracle', 'tvl'], help='Timeseries segment')
    timeseries_parser.add_argument('chain_id', type=int, help='Chain ID')
    timeseries_parser.add_argument('address', help='Vault address')
    timeseries_parser.add_argument('--component', action='append', default=[], help='Repeat to request specific components')
    timeseries_parser.add_argument('--limit', type=int, help='Limit returned rows')
    timeseries_parser.set_defaults(func=command_timeseries)

    reports_parser = subparsers.add_parser('reports', help='Return recent reports for one vault.')
    reports_parser.add_argument('chain_id', type=int, help='Chain ID')
    reports_parser.add_argument('address', help='Vault address')
    reports_parser.add_argument('--limit', type=int, help='Limit returned rows')
    reports_parser.set_defaults(func=command_reports)

    gql_parser = subparsers.add_parser('gql', help='Run a GraphQL query against Kong.')
    gql_parser.add_argument('--query', help='Inline GraphQL query string')
    gql_parser.add_argument('--query-file', help='Path to a .graphql file')
    gql_parser.add_argument('--variables', help='JSON object string for GraphQL variables')
    gql_parser.set_defaults(func=command_gql)

    gql_root_fields_parser = subparsers.add_parser(
        'gql-root-fields',
        help='List GraphQL query root fields with their arguments and return types.'
    )
    gql_root_fields_parser.set_defaults(func=command_gql_root_fields)

    gql_type_parser = subparsers.add_parser(
        'gql-type',
        help='Inspect one GraphQL type and list its fields, input fields, or enum values.'
    )
    gql_type_parser.add_argument('type_name', help='GraphQL type name, for example Vault or Deposit')
    gql_type_parser.set_defaults(func=command_gql_type)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    result = args.func(args)
    json.dump(result, sys.stdout, indent=2, sort_keys=True)
    sys.stdout.write('\n')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
