# Yearn Data Services

If you want to programmatically interact with Yearn data, or need to fetch large amounts of it, then you have a few options:

## Kong

[Kong](https://kong.yearn.fi/) is Yearn's preferred public data API for vault catalogs, detail snapshots, reports, and timeseries. It indexes EVM logs and state, enriches the raw blockchain data with hooks, and exposes both REST and GraphQL query surfaces.

Kong's Yearn index covers the v3 and v2 vault ecosystems:

- Regular contract snapshots of each registry, vault, strategy, trade handler, accountant, and debt allocator.
- Full event history for each of the above (*with limited history on transfers, deposits, withdraws, and approves).
- Snapshot hooks for computing vault-strategies relationships, debts, fees, and rewards.
- Snapshot hooks for integrating offchain risk and metadata.
- Event hooks for tracking new vaults and strategies, computing spot harvest APRs, and pricing transfers.
- Timeseries hooks for computing APY and TVL.

Kong can be run locally or queried through the public Yearn deployment.

- **Live REST API:** https://kong.yearn.fi/api/rest
- **Live GraphQL API:** https://kong.yearn.fi/api/gql
- **Docs:** https://docs.yearn.fi/developers/data-services/kong
- **Source:** https://github.com/yearn/kong

## yDaemon

[yDaemon](https://github.com/yearn/ydaemon) is a legacy REST API aggregator for Yearn. Some older integrations may still depend on it, but for new integrations you should prefer [Kong](./kong.md).

- **Live API:** https://ydaemon.yearn.fi/1/vaults/all
- **Docs:** https://docs.yearn.fi/developers/data-services/ydaemon
- **Source:** https://github.com/yearn/ydaemon

## Yearn Lens

Yearn Lens is a collection of smart contracts that collect data about V2 Yearn vaults.

- **Docs:** https://docs.yearn.fi/developers/data-services/yearn-lens

---

<details className="customFaqDetails">

  <summary>

## Deprecated Data Services

  </summary>

### Yearn Exporter - No longer supported

The exporter was used to build the (now deprecated) Yearn Grafana dashboard.

- **Source + Guide:** https://github.com/yearn/yearn-exporter

### Yearn Vision - No longer supported

Yearn Vision was the Grafana dashboard of the hosted version of Yearn Exporter.

- **original endpoint**: https://yearn.vision

### V1 Yearn API - No longer supported

- **original endpoint**: https://api.yearn.fi/v1/chains/1/vaults/all

</details>
