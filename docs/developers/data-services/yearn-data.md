# Yearn Data Services

If you want to programmatically interact with Yearn data, or need to fetch large amounts of it then you have a few options:

## yDaemon

yDaemon is a RESTful API that hydrates subgraph responses with more data, like APY calculations. yDaemon is the best source for current yearn Vault data and is what is used by the production Yearn front ends.

- **Live API:** https://ydaemon.yearn.fi/
- **Source:** https://github.com/yearn/ydaemon
- **Docs:** https://ydaemon.yearn.farm/docs/intro
- **Guide:** https://medium.com/iearn/ydaemon-one-api-to-unify-all-yearn-data-4fc74dc9a33b

## Subgraph

:::info

Currently only subgraphs for V2 vaults are available and some subgraphs have not been migrated to the new service.

:::

The subgraph is a GraphQL interface to query raw historical data. For current data it is recommended to check yDaemon before using the subgraph directly.

- **Docs:** https://docs.yearn.fi/developers/v2/subgraph-info

### V2 Vaults

- **Mainnet Live API:** https://thegraph.com/explorer/subgraphs/FDLuaz69DbMADuBjJDEcLnTuPnjhZqNbFVrkNiBLGkEg?view=Query&chain=arbitrum-one
- **Arbitrum Live API:** https://thegraph.com/explorer/subgraphs/G3JZhmKKHC4mydRzD6kSz5fCWve5WDYYCyTFSJyv3SD5?view=Query&chain=arbitrum-one

## Yearn Lens

Yearn Lens is a collection of smart contracts that collect data about V2 Yearn vaults.

- **Docs:** https://docs.yearn.fi/developers/v2/yearn-lens

---

<details className="customFaqDetails">

  <summary>
  
## Deprecated Data Services
  
  </summary>

### Yearn Exporter - No longer supported

The exporter is was to build the (now deprecated) Yearn Grafana dashboard.

- **Source + Guide:** https://github.com/yearn/yearn-exporter

### V1 Yearn API - No longer supported

- **original endpoint**: https://api.yearn.fi/v1/chains/1/vaults/all

</details>
