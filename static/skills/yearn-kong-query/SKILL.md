---
name: yearn-kong-query
description: Query Yearn data from Kong with a Yearn-first workflow. Use REST first for catalog, snapshot, timeseries, and reports; use GraphQL when REST is not enough. Includes a helper script that applies the current website-style Yearn catalog filter.
---

# Yearn Kong Query

## Inputs

- `BASE` (optional): Kong origin. Defaults to `https://kong.yearn.fi`.

Example:

```text
BASE=https://kong.yearn.fi
```

## Recommended workflow

1. Start with `catalog` when you want the current Yearn vault surface.
2. Use `snapshot` for one vault's current detail payload.
3. Use `timeseries` for charts.
4. Use `reports` for recent StrategyReported history.
5. Use `gql` only when REST does not expose the shape you need.

## Why this workflow

Kong indexes more than just Yearn. The raw vault list can contain non-Yearn rows.

For the closest match to the current `yearn.fi` catalog, use the current frontend predicate:

```text
origin === "yearn" && inclusion?.isYearn !== false
```

The helper script's `catalog` subcommand applies that filter for you.

## Commands

### Website-style Yearn catalog

All chains:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py catalog
```

One chain:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py catalog --chain-id 1
```

Limit output rows:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py catalog --chain-id 1 --limit 20
```

### Raw Kong list

All origins:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py list
```

Yearn origin only:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py list --origin yearn
```

### Vault snapshot

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py snapshot 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1
```

### Vault timeseries

Historical APY:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py timeseries apy-historical 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1 --component weeklyNet --component monthlyNet
```

TVL:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py timeseries tvl 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1
```

PPS:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py timeseries pps 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1 --component humanized
```

### Vault reports

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py reports 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1 --limit 10
```

### GraphQL fallback

Inline query:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py gql \
  --query 'query MainnetVaults { vaults(chainId: 1) { address name symbol } }'
```

Query from file:

```bash
python3 skills/yearn-kong-query/scripts/yearn_kong_query.py gql --query-file /tmp/kong-query.graphql
```

## Output shape

The helper prints JSON to stdout so you can pipe it into `jq` or feed it directly to another tool.

- `catalog`, `list`, `timeseries`, `reports` return JSON arrays
- `snapshot` returns one JSON object
- `gql` returns the GraphQL response envelope

## Query strategy

### Prefer REST first

Use REST when you need:

- a Yearn vault catalog
- current detail for one vault
- standard charts
- report history

REST is simpler, easier to cache, and matches the current frontend flow.

### Use GraphQL second

Use GraphQL when you need:

- event-level exploration
- custom joins across indexed entities
- data shapes REST does not expose

## Caching guidance

Kong's public REST endpoints advertise `Cache-Control: public, max-age=900`.

Good defaults:

- cache catalog/list responses for about 15 minutes
- re-fetch snapshots when the user drills into a vault detail view
- request only the timeseries segment you actually need

## Notes

- Lowercase addresses in REST paths.
- `list` can include non-Yearn rows; `catalog` is the safer starting point for most agent tasks.
- If you need exact website parity, keep your chain set aligned with the current frontend and start from `catalog`, not the raw list.
