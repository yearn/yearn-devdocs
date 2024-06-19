# Yearn Data Services

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
- **Docs:** https://docs.yearn.fi/developers/v2/subgraph-info

## yDaemon

yDaemon is a RESTful API that hydrates subgraph responses with more data, like APY calculations.

- **Live API:** https://ydaemon.yearn.fi/
- **Source:** https://github.com/yearn/ydaemon
- **Docs:** https://ydaemon.yearn.farm/
- **Guide:** https://medium.com/iearn/ydaemon-one-api-to-unify-all-yearn-data-4fc74dc9a33b
