# Yearn Stack + FE Features

## Backend stack

![](https://i.imgur.com/RATYyIM.png)

### On Chain

- 🔍 Yearn Lens
    - Oracle
    - Helpers
    - Adapters
        - Vaults V1
        - Vaults V2
        - Iron Bank

### On IPFS

- 📄 Yearn Metadata
    - lightweight storage for all the stuff that would have been hardcoded in v2 frontend, including but not limited to:
        - custom messages for deposits / withdrawals
        - custom copywriting for special assets
        - strategy descriptions / diagrams
        - disabling asset interactions
- 🌐 Yearn Frontend

### Off Chain

- 📊 Yearn Exporter
    - stores (and displays) stats about yearn assets, exposing:
        - historical TVL
        - historical APY
- 📀 Yearn Subgraph
    - stores all historical data for users
- ⚡ Zapper Integration
    - ⚠ to be deprecated in favour of an in-house solution

## Backend features

### Resilience powered by on-chain data and IPFS storage

- Critical data (assets, positions, vault deprecations) will be fetched exclusively from the chain / IPFS
    - maximizing uptime
    - reducing reliance on other services
- Historical TVL, historical APY and other non critical data will be stored off chain and fetched dinamically.

#### On-chain assets and positions

- Lens does what the old off-chain API does, but directly on-chain. This will speed up the fetching time and greatly reduce our reliance on scheduled jobs in servers.

#### IPFS CI/CD for frontend and metadata

- Frontend and hardcoded values will be stored in IPFS utilizing a similar system to the one [introduced](https://uniswap.org/blog/ipfs-uniswap-interface/) by uniswap.

### Historical APY and TVL

- Yearn Exporter provides a simple backend solution for storing real-time stats from yearn products.
- Metrics are stored in a timeseries database and will be exposed by an api, accessible by SDK and third-party.

### SDK, aggregator of many datasources

- SDK will provide a simple interface for all integrators, including ourselves.
- Read methods will seamlessly integrate with all datasources, while keeping coherent datastructures.
- Write methods talk directly to assets on chain. Execution of write transactions will trigger refresh events so data freshness of frontend (or other integration platforms) will still be preserved.

### Historical User Earnings

- Yearn Subgraph leverages thegraph to store historical user data that can be aggregated to display historical earnings.

### Metadata

- New way to store all the information that would generally be hard coded directly in the frontend.
- Data is now encoded in predefined schemas that are checked at every change.

#### Strategy descriptions

We can store Strategy information directly on IPFS so they can be then be queried and rendered the frontend.

https://meta.yearn.network/strategies/IBLevComp

```json
{
  "$schema": "strategy",
  "name": "IBLevComp",
  "description": "Supplies DAI on Compound and opens a long-term debt for an additional amount of DAI from Ironbank without the need for collateral, to maximize COMP farming. Earned COMP is harvested and sold for more DAI and re-deposited into the vault.",
  "authors": [
    { "name": "Sam Priestley", "uri": "https://twitter.com/arbingsam" }
  ]
}
```

#### Assets management

We can store Asset informations so in critical situations we can toggle interactions and add custom messages.

https://meta.yearn.network/vaults/0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A

```json
{
  "name": "aLINK",
  "promoted": true,
  "retired": true,
  "migrated": false,
  "deposit": {
    "disabled": true, // we can disable interaction directly by editing this file on the repo
    "message": "This vault is no longer active and its strategy is unwinding. Withdrawals will incur a 1% withdrawal fee during this process."
  },
}
```