# Subgraph and yDaemon

If you need to fetch large amounts of historical yearn data there are 2 services built for that:

- The subgraph is a GraphQL interface to raw historical data
- yDaemon is a RESTful API that hydrates subgraph responses with more data, like APY calculations

## yDaemon

- **Live API:** https://ydaemon.yearn.finance/
- **Source:** https://github.com/yearn/ydaemon
- **Guide:** https://medium.com/iearn/ydaemon-one-api-to-unify-all-yearn-data-4fc74dc9a33b

## Subgraph

- **Live API:** https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum/graphql