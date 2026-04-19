# Kong

[Kong](https://github.com/yearn/kong) is Yearn's public indexing and analytics layer for vault catalogs, detail snapshots, time series, and report history. If you need current Yearn vault data, start with Kong.

For more detailed infrastructure docs, see the [Kong source repo](https://github.com/yearn/kong), the live [REST docs](https://github.com/yearn/kong/blob/master/docs/rest.md), and [deepwiki](https://deepwiki.com/yearn/kong).

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

### 3. Fetch vault detail on demand

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
- richer vault-level metadata than the list endpoint carries

### 4. Fetch chart data by segment

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

### 5. Pull recent vault report history

If you need harvest-style report history, query reports directly:

```bash
curl -s 'https://kong.yearn.fi/api/rest/reports/1/0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1' \
  | jq '.[0:5] | map({blockTime, strategy, gainUsd, lossUsd, currentDebtUsd, apr})'
```

This is usually the fastest path for recent StrategyReported-style data without designing a custom GraphQL query.

### 6. Drop to GraphQL for exploratory or event-level work

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
