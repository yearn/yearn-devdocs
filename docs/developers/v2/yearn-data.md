# Overview

If you need to fetch large amounts of historical yearn data, there are currently three services that can help you with that:

- **Yearn Exporter** (powers [yearn.vision](https://yearn.vision/))
- **Yearn Subgraph** (GraphQL API)
- **yDaemon** (RESTful API, contains the subgraph and more)

## Yearn Exporter

The exporter is used to build our Grafana dashboard at [yearn.vision](https://yearn.vision/) and contains handy historical TVL data. It provides:

- **Source + Guide:** https://github.com/yearn/yearn-exporter

## Subgraph

The subgraph is a GraphQL interface to raw historical data. Check yDaemon before using the subgraph directly.

- **Live API:** https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum/graphql
- **Docs: ** https://yearn-docs-git-fork-marcoworms-exportooor.yearn.farm/developers/v2/subgraph-info

## yDaemon

yDaemon is a RESTful API that hydrates subgraph responses with more data, like APY calculations.

- **Live API:** https://ydaemon.yearn.finance/
- **Source:** https://github.com/yearn/ydaemon
- **Docs:** https://ydaemon.yearn.farm/
- **Guide:** https://medium.com/iearn/ydaemon-one-api-to-unify-all-yearn-data-4fc74dc9a33b

### yDaemon Data Sources

To build the yDaemon API, data is fetched from several Yearn data sources:
- [Yearn Subgraph](https://thegraph.com/explorer/subgraph?id=5xMSe3wTNLgFQqsAc5SCVVwT4MiRb5AogJCuSN9PjzXF) as the base data source.
- [Yearn Meta](https://github.com/yearn/yearn-meta) for some basic data and information updated by the Yearn team.
- [Yearn API](https://api.yearn.finance/) for the APY computation.
- [Yearn Lens Oracle](https://etherscan.io/address/0xca11bde05977b3631167028862be2a173976ca11) for tokens and vault prices.
