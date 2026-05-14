# Kong

[Kong](https://github.com/yearn/kong) is Yearn's public indexing and analytics layer for vault catalogs, detail snapshots, time series, and report history. If you need current Yearn vault data, start with Kong.

For more detailed infrastructure docs, see the [Kong source repo](https://github.com/yearn/kong), the live [REST docs](https://github.com/yearn/kong/blob/master/docs/rest.md), the live [GraphQL docs](https://github.com/yearn/kong/blob/master/docs/graphql.md), and [deepwiki](https://deepwiki.com/yearn/kong).

## The short version

- Prefer REST first for Yearn vault catalog, detail, chart, and report flows.
- Use `?origin=yearn` when you want Yearn vaults rather than every protocol indexed by Kong.
- For the closest match to the current `yearn.fi` catalog, post-filter the list with `origin === "yearn" && inclusion?.isYearn !== false`.
- Fetch the catalog once, then fetch per-vault snapshot, timeseries, or reports on demand.
- Lowercase vault addresses when building REST paths.
- Respect Kong's cache headers. Public REST responses are cached with `Cache-Control: public, max-age=900`.

## Why REST first

The current `yearn.fi` vault surface is built on Kong REST endpoints:

- Catalog: `GET /api/rest/list/vaults`
- Detail: `GET /api/rest/snapshot/:chainId/:address`
- Charts: `GET /api/rest/timeseries/:segment/:chainId/:address`

Relevant frontend references:

- [`useFetchYearnVaults.ts`](https://github.com/yearn/yearn.fi/blob/master/src/components/shared/hooks/useFetchYearnVaults.ts)
- [`useVaultSnapshot.ts`](https://github.com/yearn/yearn.fi/blob/master/src/components/pages/vaults/hooks/useVaultSnapshot.ts)
- [`useVaultChartTimeseries.ts`](https://github.com/yearn/yearn.fi/blob/master/src/components/pages/vaults/hooks/useVaultChartTimeseries.ts)

Use GraphQL when you need ad hoc exploration, event-level queries, or shapes that are easier to express as a graph traversal than as a small number of standardized REST calls.

## Public endpoints

### Base URLs

- GraphQL Explorer: `https://kong.yearn.fi/api/gql`
- REST base: `https://kong.yearn.fi/api/rest`
- GraphQL introspection: enabled on the public endpoint

### Recommended REST endpoints for Yearn data

| Need | Endpoint | Notes |
|---|---|---|
| All vault rows | `GET /api/rest/list/vaults` | Includes more than just Yearn vaults |
| All vault rows for one chain | `GET /api/rest/list/vaults/:chainId` | Same shape, chain-scoped |
| Current vault detail | `GET /api/rest/snapshot/:chainId/:address` | Best single-vault detail payload |
| Vault charts | `GET /api/rest/timeseries/:segment/:chainId/:address` | Use `segment = pps`, `apy-historical`, `apr-oracle`, or `tvl` |
| Recent strategy reports | `GET /api/rest/reports/:chainId/:address` | Useful for harvest/report history |
| Custom/event queries | `POST /api/gql` | Use when REST is not enough |

## Best query patterns for Yearn

### 1. Discover Yearn vaults

If you want a broad Yearn catalog, start here:

```bash
curl -s 'https://kong.yearn.fi/api/rest/list/vaults?origin=yearn' | jq '.[0:10]'
```

Important: `GET /list/vaults` includes non-Yearn rows too. The `origin=yearn` query parameter is the simplest first filter.

### 2. Mirror the current `yearn.fi` vault catalog more closely

The current frontend treats a row as catalog-eligible when:

```text
origin === "yearn" && inclusion?.isYearn !== false
```

That means the safest catalog workflow is:

1. Fetch `GET /api/rest/list/vaults?origin=yearn`
2. Filter to the chains you care about
3. Apply the catalog predicate above
4. Only then build the user-facing list

Example:

```bash
curl -s 'https://kong.yearn.fi/api/rest/list/vaults?origin=yearn' \
  | jq 'map(select(.origin == "yearn" and (.inclusion.isYearn != false))) | .[0:10]'
```

If you need one chain only:

```bash
curl -s 'https://kong.yearn.fi/api/rest/list/vaults/1?origin=yearn' \
  | jq 'map(select(.origin == "yearn" and (.inclusion.isYearn != false)))'
```

### 3. Search by name, symbol, or asset symbol

When the user does not give an address, use the list endpoint for discovery and the snapshot endpoint for confirmation.

Example: search the website-style Yearn catalog for `USDC` on mainnet:

```bash
curl -s 'https://kong.yearn.fi/api/rest/list/vaults/1?origin=yearn' \
  | jq 'map(select(.origin == "yearn" and (.inclusion.isYearn != false)))
         | map(select((.name | ascii_downcase | contains("usdc"))
                   or (.symbol | ascii_downcase | contains("usdc"))
                   or (.asset.symbol | ascii_downcase | contains("usdc"))))
         | .[0:10]'
```

Use the list endpoint for:

- browsing
- disambiguation
- searching by `name`, `symbol`, or `asset.symbol`
- ranking multiple possible matches before fetching detail

Then follow up with `GET /api/rest/snapshot/:chainId/:address` for the selected vault.

### 4. Fetch vault detail on demand

After you have a chain ID and address, use the snapshot endpoint for the detail page payload:

```bash
curl -s 'https://kong.yearn.fi/api/rest/snapshot/1/0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1' \
  | jq '{chainId, address, symbol, name, asset, performance, fees, staking, pricePerShare}'
```

Use snapshot data for:

- asset metadata
- performance summaries
- fee config
- staking availability
- price per share
- deposit limit and remaining capacity
- richer vault-level metadata than the list endpoint carries
- strategy-level composition and debt breakdown

Important field handling notes:

- `totalAssets`, `totalSupply`, `deposit_limit`, `totalDebt`, and `totalIdle` are raw on-chain values. Divide by `10^decimals` before presenting them to humans.
- `pricePerShare` is also raw and should be scaled by vault decimals.
- APR and APY values are already decimal fractions, so `0.047` means `4.7%`.
- A useful default capacity formula is `deposit_limit - totalAssets`, again scaled by `10^decimals`.

### 5. Fetch chart data by segment

For charts, query the specific timeseries you need instead of over-fetching:

```bash
curl -s 'https://kong.yearn.fi/api/rest/timeseries/apy-historical/1/0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1?components=weeklyNet&components=monthlyNet' \
  | jq '.[0:5]'
```

```bash
curl -s 'https://kong.yearn.fi/api/rest/timeseries/tvl/1/0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1' \
  | jq '.[0:5]'
```

```bash
curl -s 'https://kong.yearn.fi/api/rest/timeseries/pps/1/0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1?components=humanized' \
  | jq '.[0:5]'
```

Useful segments:

- `pps` - price per share history
- `apy-historical` - historical APY values
- `apr-oracle` - oracle APR values
- `tvl` - TVL history

### 6. Pull recent vault report history

If you need harvest-style report history, query reports directly:

```bash
curl -s 'https://kong.yearn.fi/api/rest/reports/1/0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1' \
  | jq '.[0:5] | map({blockTime, strategy, gainUsd, lossUsd, currentDebtUsd, apr})'
```

This is usually the fastest path for recent StrategyReported-style data without designing a custom GraphQL query.

### 7. Discover the GraphQL schema before writing a query

Kong leaves GraphQL introspection enabled, so you do not need to guess available roots or fields.

Start by listing the root query fields:

```bash
curl -s 'https://kong.yearn.fi/api/gql' \
  -H 'content-type: application/json' \
  --data '{"query":"{ __type(name: \"Query\") { fields { name args { name type { kind name ofType { kind name ofType { kind name } } } } type { kind name ofType { kind name ofType { kind name } } } } } }"}' \
  | jq
```

Common root fields for Yearn work include:

- `vaults`
- `vault`
- `vaultReports`
- `vaultStrategies`
- `strategies`
- `strategyReports`
- `deposits`
- `transfers`
- `timeseries`
- `tvls`
- `prices`

Then inspect the fields on the type you want to query:

```bash
curl -s 'https://kong.yearn.fi/api/gql' \
  -H 'content-type: application/json' \
  --data '{"query":"{ __type(name: \"Vault\") { fields { name type { kind name ofType { kind name ofType { kind name } } } } } }"}' \
  | jq
```

You can do the same for any result type such as `Vault`, `VaultReport`, `Strategy`, `StrategyReport`, `Deposit`, `Transfer`, `Output`, or `Tvl`.

### 8. Drop to GraphQL for exploratory or event-level work

For a Yearn-scoped vault query, start with the built-in Yearn filter rather than the unfiltered `vaults(...)` root:

```graphql
query MainnetYearnVaults {
  vaults(chainId: 1, yearn: true) {
    address
    name
    symbol
    vaultType
    tvl {
      tvl
    }
  }
}
```

Example: recent deposit history for one vault.

```graphql
query GetDeposits {
  deposits(chainId: 1, address: "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204") {
    amount
    shares
    recipient
  }
}
```

Example request:

```bash
curl -s 'https://kong.yearn.fi/api/gql' \
  -H 'content-type: application/json' \
  --data '{"query":"query GetDeposits { deposits(chainId: 1, address: \"0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204\") { amount shares recipient } }"}' \
  | jq
```

## Caching and freshness

Observed from the public REST surface:

- `GET /api/rest/list/vaults` returns `Cache-Control: public, max-age=900`

The current frontend also uses short client-side cache windows around Kong data:

- catalog list: 15 minutes
- snapshot: 30 seconds
- charts/timeseries: 5 minutes

A good default for agents and backends is:

- cache list responses for about 15 minutes
- re-fetch snapshot and report data when the user opens a vault detail view
- keep timeseries scoped to the chart actually being rendered

## REST vs GraphQL

Use REST when:

- you need the current vault catalog
- you need a single vault detail payload
- you need standard charts or reports
- you want stable, easy-to-cache payloads

Use GraphQL when:

- you need event-level exploration
- you need to join across multiple indexed entities
- you are doing one-off debugging or analysis work
- REST does not expose the exact shape you need

## Agent skill

This docs site also publishes a reusable Kong skill for coding agents:

- Skill: `https://docs.yearn.fi/skills/yearn-kong-query/SKILL.md`
- Helper script: `https://docs.yearn.fi/skills/yearn-kong-query/scripts/yearn_kong_query.py`

The skill is designed for Codex, Claude Code, and similar agents. It gives them a Yearn-first workflow over Kong, including a `catalog` command that applies the current website-style Yearn filter.

### Codex install

```bash
SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/yearn-kong-query"
mkdir -p "$SKILL_DIR/scripts"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/SKILL.md -o "$SKILL_DIR/SKILL.md"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/scripts/yearn_kong_query.py -o "$SKILL_DIR/scripts/yearn_kong_query.py"
chmod +x "$SKILL_DIR/scripts/yearn_kong_query.py"
```

### Claude Code install

```bash
SKILL_DIR="$HOME/.claude/skills/yearn-kong-query"
mkdir -p "$SKILL_DIR/scripts"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/SKILL.md -o "$SKILL_DIR/SKILL.md"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/scripts/yearn_kong_query.py -o "$SKILL_DIR/scripts/yearn_kong_query.py"
chmod +x "$SKILL_DIR/scripts/yearn_kong_query.py"
```

### Verify schema discovery

After install, replace `$SKILL_DIR` with the path you used above and verify GraphQL schema discovery:

```bash
python3 "$SKILL_DIR/scripts/yearn_kong_query.py" gql-root-fields | jq '.[0:10]'
python3 "$SKILL_DIR/scripts/yearn_kong_query.py" gql-type Vault | jq '.fields[0:20]'
```

The helper exposes `gql-root-fields` and `gql-type` so agents can inspect the live Kong schema before writing a custom query.
