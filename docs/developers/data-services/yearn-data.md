# Yearn Data Services

If you want to programmatically interact with Yearn data, or need to fetch large amounts of it then you have a few options:

## Kong

[Kong](https://kong.yearn.fi/) is an integrated set of services and tools that make it easy to index EVM logs and state, enrich your data with custom hooks, query your data over graphql. Kong is designed to be cheap, reliable, easy to maintain, and simplify the process of updating your index.

Kong's Yearn index covers the v3 and v2 vault ecosystems:

- Regular contract snapshots of each registry, vault, strategy, trade handler, accountant, and debt allocator.
- Full event history for each of the above (*with limited history on transfers, deposits, withdraws, and approves).
- Snapshot hooks for computing vault-strategies relationships, debts, fees, and rewards.
- Snapshot hooks for integrating off-chain risk and meta data.
- Event hooks for tracking new vaults and strategies, computing spot harvest APRs, and pricing transfers.
- Timeseries hooks for computing APY and TVL.

Kong can be run locally or a hosted version run by Yearn can be queried with the public endpoint.

- **Live API:** https://kong.yearn.fi/api/gql
- **Source:** https://github.com/yearn/kong

## yDaemon

yDaemon is a RESTful API used by some Yearn frontends. While Kong is generally preferred to yDaemon when possible for the areas of overlap, yDaemon is the best source for current Yearn Vault data and is what is used by the production Yearn frontends.

- **Live API:** https://ydaemon.yearn.fi/1/vaults/all
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
