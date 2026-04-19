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

    url = build_url(base, '/api/gql')
    return fetch_json(url, payload={'query': query, 'variables': variables})


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
