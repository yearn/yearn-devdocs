# Kong

[Kong](https://github.com/yearn/kong) is a real-time/historical EVM indexer and analytics platform designed to make it easy to index EVM logs, enrich blockchain data, and query indexed data via GraphQL. A few REST endpoints also exist in Kong for common queries. It comes pre-configured with an index over Yearn's v2 and v3 vault ecosystems. For more detailed docs, reference [deepwiki](https://deepwiki.com/yearn/kong).

## Key Features

### Event Sourcing Architecture

- Stores EVM logs and contract snapshots in PostgreSQL without transformation
- Supports index replay without re-extracting data from blockchain
- Handles events out of order for faster historical indexing

### Hook System

Three types of custom enrichment hooks:

- **Snapshot Hooks**: Process recurring snapshots of contracts
- **Event Hooks**: Process and enrich blockchain events
- **Timeseries Hooks**: Generate time-series analytics data

### Real-Time Webhooks

- Real-time notifications triggered during indexing
- HMAC-SHA256 authentication
- Configurable filtering by chains and contract addresses

### Domain Modeling with "Things"

- Dynamically created entities (analogous to "entities" in conventional ETL)
- Used as sources for further indexing
- Supports hierarchical indexing (e.g., Registry → Vaults → Strategies)

## GraphQL API

### Base URL

- GraphQL Explorer: https://kong.yearn.fi/api/gql
- REST API: see [REST API](#rest-api) section below

### Example Queries

#### List Yearn Vaults on mainnet

```graphql
query MainnetVaults {
  vaults(chainId: 1) {
    address
    name
    symbol
  }
}
```

REST: https://kong.yearn.fi/api/rest/list/vaults/:chainId
REST Example: https://kong.yearn.fi/api/rest/list/vaults/1

#### List Yearn V2 vaults on all chains

```graphql
query GetV2VaultAddresses {
  vaults(vaultType: 2) {
    chainId
    address
    name
    symbol
  }
}
```

### Query last 100 deposit events for specific vault

```graphql
query GetDeposits {
  deposits(chainId: 1, address: "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204") {
    amount
    shares
    recipient
  }
}
```

#### Query Timeseries Data for specific vault

```graphql
query Timeseries {
  timeseries(
    label: "tvl-c",
    component: "tvl",
    chainId: 1,
    address: "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
    limit: 1000
  ) {
    chainId
    address
    label
    component
    value
    time
    period
  }
}
```

## REST API

Kong Exposes a few rest API endpoints that are useful for standardized vault data

### Vault List Data

This will get a list of all vaults in Kong (note: this includes more than just Yearn Vaults)

- REST timeseries path structure: https://kong.yearn.fi/api/rest/list/vaults/
- REST timeseries path structure: https://kong.yearn.fi/api/rest/list/vaults/:chainId (optional chainID)
- REST timeseries Example: https://kong.yearn.fi/api/rest/list/vaults

### Vault snapshot Data

This endpoint will return comprehensive data about a particular vault, similar to how yDaemon's individual vault endpoint worked.

- REST timeseries path structure: https://kong.yearn.fi/api/rest/snapshot/:chainId/:address
- REST timeseries Example: https://kong.yearn.fi/api/rest/snapshot/1/0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204

### Timeseries Data

- REST timeseries path structure: https://kong.yearn.fi/api/rest/timeseries/:segment/:chainId/:address
- :segment options:
  - 'tvl'
  - 'apy-historical'
  - 'pps'
- REST timeseries Example: https://kong.yearn.fi/api/rest/timeseries/tvl/1/0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204

## Database Schema

### Core Tables

#### `thing`

Domain object definitions (vaults, strategies, etc.)

- `chain_id`, `address`, `label`, `defaults` (JSONB)

#### `snapshot`

Latest contract snapshots with hook data

- Stores contract state and enriched hook data
- JSONB fields for flexible schema

#### `evmlog`

Raw EVM logs with hook enrichments

- Full event history with args and hook data in JSONB
- Limited history on transfers, deposits, withdraws, approves

#### `evmlog_strides`

Track which blocks have been indexed

- Prevents duplicate indexing
- Identifies gaps in coverage

#### `output`

Timeseries data from timeseries hooks

- TVL, APY, PPS calculations
- Time-series analytics
