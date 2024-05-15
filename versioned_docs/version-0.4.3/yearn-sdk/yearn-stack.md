# Yearn Stack + FE Features

Yearn SDK integrates several components, both on-chain and off-chain.

## Backend stack

<p align="center">
  <img src="https://i.imgur.com/BTuanfX.png" alt="Backend Chart"/>
</p>

### On Chain

- 🔍 Yearn Lens
  - Oracle
  - Helpers
  - Adapters
    - Vaults V1
    - Vaults V2
    - Iron Bank

### On IPFS

<p align="center">
  <img src="https://i.imgur.com/VkmnkfX.png" alt="IPFS Metadata"/>
</p>

- Yearn Metadata is a lightweight storage for all the stuff that would have been hardcoded in v2 frontend, including but not limited to:
  - custom messages for deposits / withdrawals
  - custom copywriting for special assets
  - strategy descriptions / diagrams
  - disabling asset interactions
- Yearn Frontend

### Off Chain

- Yearn Exporter: stores (and displays) stats about yearn assets, exposing:
  - historical TVL
  - historical APY
- Yearn Subgraph: stores all historical data for users
- Zapper Integration

## Backend features

### Resilience powered by on-chain data and IPFS storage

- Critical data (assets, positions, vault deprecations) will be fetched exclusively from the chain / IPFS
  - maximizing uptime
  - reducing reliance on other services
- Historical TVL, historical APY and other non critical data will be stored off chain and fetched dinamically.

#### On-chain assets and positions

- Lens does what the old off-chain API does, but directly on-chain. This will speed up the fetching time and greatly reduce our reliance on scheduled jobs in servers.

#### IPFS CI/CD for frontend and metadata

- Frontend and hardcoded values will be stored in IPFS utilizing a similar system to the one [introduced](https://uniswap.org/blog/ipfs-uniswap-interface/) by Uniswap.

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

Example: [Idle Finance Reinvest](https://meta.yearn.network/strategies/1/0x01b54c320d6B3057377cbc71d953d1BBa84df44e)

```json
{
  "$schema":"strategy",
  "name":"Idle Finance Reinvest",
  "description":"Supplies {{token}} to [Idle Finance](https://idle.finance) to earn IDLE and COMP. Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.",
  "protocols":["IdleFinance"]
}
```

#### Assets management

We can store Asset informations so in critical situations we can toggle interactions and add custom messages.

Example: [Curve EURS](https://meta.yearn.network/vaults/1/0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A)

```json
{
  "$schema": "vault",
  "comment": "Curve EURS",
  "hideAlways": false,
  "depositsDisabled": false,
  "withdrawalsDisabled": false,
  "order": 18,
  "migrationAvailable": false,
  "allowZapIn": true,
  "allowZapOut": true,
  "retired": false,
  "displayName": "Curve EURS"
}
```


### Front End stack

<p align="center">
  <img src="https://i.imgur.com/H5XqpZI.png" alt="Backend Chart"/>
</p>


### Front End Features


<p align="center">
  <img src="https://i.imgur.com/LfJmzkK.png" alt="Frontend Chart"/>
</p>