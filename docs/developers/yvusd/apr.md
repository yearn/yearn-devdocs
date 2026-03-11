# yvUSD APR (Oracle + APR Service)

yvUSD APR is derived from a mix of onchain data (vault/strategy accounting and APR-oracle reads) and an offchain service that periodically computes and caches results for fast frontend access.

## Sources Of Truth

- **Vault/strategy accounting** is onchain (ERC-4626 `totalAssets`, `totalSupply`, strategy debt allocations, fee config).
- **APR oracle** is onchain and provides strategy-level APR estimation.
- **APR service** aggregates these inputs into a debt-weighted vault APR and exposes it via a cached API.

## Onchain APR Oracle

The APR service is configured to read an onchain APR oracle address. This oracle is used to fetch strategy APRs and to compute derivatives like LockedyvUSD's locker bonus APR.

See: `yearn-yvusd-apr-service/config/config.yaml` (`apr.sources.onchain.apr_oracle_address`).

## APR Service (Offchain)

The yvUSD APR API:

- Indexes strategy membership from onchain events.
- Hydrates onchain metadata for strategies and vaults.
- Computes a **debt-weighted** APR for each configured vault.
- Writes the latest results to Redis for instant reads.

The service is designed so frontends can read APR data without performing expensive onchain reads on every request.

### API Routes

In this workspace (`yearn-yvusd-apr-service`), the service exposes routes like:

- `GET /api/health`: Redis connectivity and data freshness.
- `GET /api/sync`: run a full sync + recompute cycle (typically triggered by cron).
- `GET /api/aprs`: return precomputed APR results from Redis.
- `GET /api/aprs/<address>`: APR for a single vault address.
- `GET /api/snapshot`: raw indexed strategy cache.

### Cache Keys

The service writes results into Redis (see the service README for the exact schema). Key names used by the service include:

- `yvusd:strategy_cache`
- `yvusd:apr_result`

## Data Freshness

APR outputs can be stale if:

- The sync job has not run recently.
- One of the configured RPC endpoints is degraded.
- A particular strategy type requires an offchain calculator that fails or is temporarily disabled.

In these cases, vault operations (deposit/withdraw/report) continue unaffected; only the rate display is impacted.

## Where The Chain/Vault List Comes From

The APR service’s configured vault list and supported RPCs/chains are defined in:

- `yearn-yvusd-apr-service/config/config.yaml`

## Links

<PrettyLink>[yvUSD developer docs index](/developers/yvusd)</PrettyLink>

<PrettyLink>[yvUSD contract addresses](/developers/addresses/yvusd-contracts)</PrettyLink>
