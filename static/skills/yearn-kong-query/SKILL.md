---
name: yearn-kong-query
description: Query Yearn data from Kong with a Yearn-first workflow. Use REST first for catalog, search, snapshot, timeseries, and reports; use GraphQL when REST is not enough. Includes a helper script that applies the current website-style Yearn catalog filter and supports GraphQL schema introspection.
---

# Yearn Kong Query

## Inputs

- `BASE` (optional): Kong origin. Defaults to `https://kong.yearn.fi`.

Example:

```text
BASE=https://kong.yearn.fi
```

Commands below are relative to the installed skill root. If you run the helper manually from some other working directory, use the full path to `scripts/yearn_kong_query.py`.

## Recommended workflow

1. Start with `catalog` when you want the current Yearn vault surface.
2. Use `search` when the user gives a vault name, symbol, asset symbol, or only a partial clue.
3. Use `snapshot` for one vault's current detail payload.
4. Use `timeseries` for charts.
5. Use `reports` for recent StrategyReported history.
6. Use `gql` only when REST does not expose the shape you need.

## Why this workflow

Kong indexes more than just Yearn. The raw vault list can contain non-Yearn rows.

For the closest match to the current `yearn.fi` catalog, use the current frontend predicate:

```text
origin === "yearn" && inclusion?.isYearn !== false
```

The helper script's `catalog` and default `search` behavior apply that filter for you.

## Commands

### Website-style Yearn catalog

All chains:

```bash
python3 scripts/yearn_kong_query.py catalog
```

One chain:

```bash
python3 scripts/yearn_kong_query.py catalog --chain-id 1
```

Limit output rows:

```bash
python3 scripts/yearn_kong_query.py catalog --chain-id 1 --limit 20
```

### Search by vault name, symbol, asset symbol, or address

Search the current website-style Yearn catalog:

```bash
python3 scripts/yearn_kong_query.py search yvUSDC
```

```bash
python3 scripts/yearn_kong_query.py search USDC --chain-id 1 --limit 10
```

Search the raw multi-origin Kong list instead:

```bash
python3 scripts/yearn_kong_query.py search USDC --all-origins --limit 20
```

### Raw Kong list

All origins:

```bash
python3 scripts/yearn_kong_query.py list
```

Yearn origin only:

```bash
python3 scripts/yearn_kong_query.py list --origin yearn
```

### Vault snapshot

```bash
python3 scripts/yearn_kong_query.py snapshot 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1
```

### Vault timeseries

Historical APY:

```bash
python3 scripts/yearn_kong_query.py timeseries apy-historical 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1 --component weeklyNet --component monthlyNet
```

TVL:

```bash
python3 scripts/yearn_kong_query.py timeseries tvl 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1
```

PPS:

```bash
python3 scripts/yearn_kong_query.py timeseries pps 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1 --component humanized
```

### Vault reports

```bash
python3 scripts/yearn_kong_query.py reports 1 0x6faf8b7ffee3306efcfc2ba9fec912b4d49834c1 --limit 10
```

### GraphQL fallback

Inline query:

```bash
python3 scripts/yearn_kong_query.py gql \
  --query 'query MainnetYearnVaults { vaults(chainId: 1, yearn: true) { address name symbol } }'
```

Query from file:

```bash
python3 scripts/yearn_kong_query.py gql --query-file /tmp/kong-query.graphql
```

List GraphQL query roots before writing a query:

```bash
python3 scripts/yearn_kong_query.py gql-root-fields
```

Inspect one GraphQL type:

```bash
python3 scripts/yearn_kong_query.py gql-type Vault
```

```bash
python3 scripts/yearn_kong_query.py gql-type Deposit
```

## Output shape

The helper prints JSON to stdout so you can pipe it into `jq` or feed it directly to another tool.

- `catalog`, `search`, `list`, `timeseries`, `reports` return JSON arrays
- `snapshot` returns one JSON object
- `gql` returns the GraphQL response envelope
- `gql-root-fields` returns a simplified array of query roots, their arguments, and return types
- `gql-type` returns a simplified JSON description of one GraphQL type

## Query strategy

### Prefer REST first

Use REST when you need:

- a Yearn vault catalog
- name/symbol disambiguation
- current detail for one vault
- standard charts
- report history

REST is simpler, easier to cache, and matches the current frontend flow.

### Use GraphQL second

Use GraphQL when you need:

- event-level exploration
- custom joins across indexed entities
- data shapes REST does not expose

Recommended workflow:

1. Run `gql-root-fields` to discover the available query roots.
2. Run `gql-type <TypeName>` to inspect the fields on the result type you want.
3. Only then write the final `gql` query.

Kong keeps introspection enabled on the public `/api/gql` endpoint, and the browser endpoint also exposes the Apollo embedded explorer.

## Default response template

When the user asks about one vault without a more specific question, a good default summary is:

- Name: `name` and `symbol`
- Chain: `chainId`
- Address: `address`
- TVL: `tvl.close` from `snapshot`, or `tvl` from `list`
- Estimated APR: `performance.estimated.apr` when present
- Fallback APR/APY: `performance.oracle.apr`, `performance.oracle.apy`, `performance.historical.net`
- Deposit limit: `deposit_limit`, scaled by `10^decimals`
- Remaining capacity: `deposit_limit - totalAssets`, scaled by `10^decimals`
- Last report: `lastProfitUpdate`, formatted from unix seconds

## Search and disambiguation notes

- Use `search` when the user provides only a vault name, symbol, or underlying asset clue.
- The search command ranks `name`, `symbol`, `asset.symbol`, `asset.name`, and `address` matches.
- For broad symbols like `USDC`, `ETH`, or `BTC`, pass `--chain-id` when you know the chain.
- If the user does not specify a chain and there is ambiguity, mainnet-first is a reasonable first pass, but call out the assumption.
- If a `search` result looks right, follow it with `snapshot` before answering detailed questions.

## Special cases

- If the user asks about `yvUSD`, it is often useful to check both:
  - `yvUSD`: `0x696d02Db93291651ED510704c9b286841d506987`
  - `Locked yvUSD`: `0xAaaFEa48472f77563961Cdb53291DEDfB46F9040`
- `list --origin yearn` is still broader than the website-visible catalog. Prefer `catalog` or the default `search` flow when you want the frontend-style Yearn surface.

## Field handling notes

- Lowercase addresses in REST paths.
- `totalAssets`, `totalSupply`, `deposit_limit`, `totalDebt`, and `totalIdle` are raw on-chain values. Divide by `10^decimals` before presenting human-readable amounts.
- `pricePerShare` from `snapshot` is also raw and should be scaled by vault decimals.
- APR and APY values from Kong are already decimal fractions, so `0.047` means `4.7%`.
- The list endpoint is lighter than snapshot. Use it for browsing and matching; use snapshot for deposit limit, composition, debts, strategies, and richer vault metadata.
- `composition` gives per-strategy breakdown if the user wants strategy-level detail.

## Caching guidance

Kong's public REST endpoints advertise `Cache-Control: public, max-age=900`.

Good defaults:

- cache catalog/list responses for about 15 minutes
- re-fetch snapshots when the user drills into a vault detail view
- request only the timeseries segment you actually need

## Notes

- `list` can include non-Yearn rows; `catalog` is the safer starting point for most agent tasks.
- For GraphQL vault discovery, prefer `vaults(..., yearn: true)` or `vaults(..., origin: "yearn")` over the unfiltered `vaults(...)` query.
- If you need exact website parity, keep your chain set aligned with the current frontend and start from `catalog`, not the raw list.
