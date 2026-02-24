# yDaemon

[yDaemon](https://github.com/yearn/ydaemon) is a next-generation REST API aggregator and indexer for Yearn Finance. It serves as the primary data service for Yearn's production frontends, providing comprehensive, real-time data about vaults, strategies, tokens, prices, and APR calculations across multiple blockchain networks. One old medium post sharing a yDaemon overview [is here](https://medium.com/iearn/ydaemon-one-api-to-unify-all-yearn-data-4fc74dc9a33b). For more detailed docs, reference [deepwiki](https://deepwiki.com/yearn/ydaemon).

## Key Features

- **Multi-Chain Support**: Ethereum, Optimism, Gnosis, Polygon, Sonic, Fantom, Arbitrum, Katana, and Base
- **Real-time Data Indexing**: Continuously monitors blockchain state across all supported chains
- **APY/APR Calculations**: Complex yield calculations including historical tracking and forward projections
- **Price Aggregation**: Multi-source price feeds updated every 30 seconds
- **Vault Classification**: Automatic categorization (V2, V3, Juiced, Gimme, Curve, Velodrome, etc.)
- **Strategy Analytics**: Detailed strategy performance metrics and harvest history
- **Risk Scoring**: 11-factor risk assessment system for vault safety

### Update Frequencies

- Prices: Every 30 seconds
- APY information: Every 10 minutes
- Metadata: Every minute

## Supported Chains

| Chain ID | Network |
|----------|---------|
| 1 | Ethereum Mainnet |
| 10 | Optimism |
| 100 | Gnosis |
| 137 | Polygon |
| 146 | Sonic |
| 250 | Fantom |
| 8453 | Base |
| 42161 | Arbitrum |
| 747474 | Katana |

## API Endpoints

### Example calls

#### List vaults on Yearn UI

https://ydaemon.yearn.fi/vaults/v3?hideAlways=true&strategiesDetails=withDetails&strategiesCondition=inQueue&chainIDs=1,10,137,250,8453,42161,747474

#### List retired vaults

https://ydaemon.yearn.fi/vaults/retired

### Vault Endpoints

#### All Chains (Simplified Format)

```
GET /vaults                          # All Yearn vaults (all chains)
GET /vaults/all                      # Same as above
GET /vaults/detected                 # All detected vaults
GET /vaults/v2                       # All V2 Yearn vaults
GET /vaults/v3                       # All V3 Yearn vaults
GET /vaults/juiced                   # Juiced vaults
GET /vaults/gimme                    # Gimme vaults
GET /vaults/retired                  # Retired vaults
GET /vaults/pendle                   # Pendle integration vaults
GET /vaults/optimism                 # Optimism-specific vaults
GET /vaults/pooltogether             # PoolTogether integration
GET /vaults/cove                     # Cove integration
GET /vaults/morpho                   # Morpho vaults
GET /vaults/katana                   # Katana vaults
GET /vaults/ajna                     # Ajna vaults
GET /vaults/velodrome                # Velodrome vaults
GET /vaults/aerodrome                # Aerodrome vaults
GET /vaults/curve                    # Curve vaults
GET /vaults/tvl                      # Total TVL across all chains
```

#### Chain-Specific (Legacy Format)

```
GET /{chainID}/vaults/all                    # All vaults for specific chain
GET /{chainID}/vaults/v2/all                 # V2 vaults for chain
GET /{chainID}/vaults/v3/all                 # V3 vaults for chain
GET /{chainID}/vaults/juiced/all             # Juiced vaults for chain
GET /{chainID}/vaults/gimme/all              # Gimme vaults for chain
GET /{chainID}/vaults/retired                # Retired vaults for chain
GET /{chainID}/vaults/some/{addresses}       # Multiple specific vaults (comma-separated)
GET /{chainID}/vaults/{address}              # Single vault details
GET /{chainID}/vault/{address}               # Same as above
GET /{chainID}/vaults/tvl                    # TVL for specific chain
```

**Pagination & Sorting Query Parameters:**

page (numeric)

- Default: 1
- Range: 1-3000
- Used in: Vault list endpoints

limit (numeric)

- Default: 200
- Range: 1-3000 (or 1-1000 for Rotki endpoints)
- Records per page

skip (numeric)

- Default: 0
- Range: 0-10000
- Records to skip (Rotki-specific)

orderBy (string)

- Default: 'featuringScore'
- Valid values: featuringScore, name, symbol, decimals, type, tvl, address, version, timestamp, profit, loss, profitValue, lossValue
- Legacy-specific: apr.net_apy, apr.composite.boost, apr.points.week_ago, apr.type, details.order

orderDirection (string)

- Default: 'asc'
- Valid values: asc, desc

**Filtering Query Parameters:**

strategiesCondition (string)

- Default: 'debtRatio'
- Valid values:
  - all - Include all strategies
  - inQueue - Only strategies in withdrawal queue
  - debtLimit - Only strategies with non-zero debt limit
  - debtRatio - Strategies with non-zero debt ratio allocation
  - absolute - Strategies with actual debt > 0

hideAlways (boolean)

- Default: false
- Valid values: true/false (or 1/0, yes/no)
- Hides vaults marked as hidden or retired
- Incompatible with migrable=true

migrable (string)

- Default: 'none'
- Valid values:
  - none - Don't include migrable vaults if hideAlways/retired
  - all - Include all migrable vaults
  - nodust - Include migrable vaults with TVL > $100
  - ignore - Completely ignore vaults with migrations available
- Incompatible with hideAlways=true

chainIDs (string)

- Default: All supported chains
- Valid values: Comma-separated chain IDs: 1, 10, 137, 250, 8453, 42161
- Example: "1,137,42161"
- Supported chains:
  - 1 = Ethereum
  - 10 = Optimism
  - 137 = Polygon
  - 250 = Fantom
  - 8453 = Base
  - 42161 = Arbitrum

humanized (boolean)

- Default: false
- Valid values: true/false
- Used in: Price endpoints
- Returns floating-point prices instead of raw big integers

- `?skip=N` - Skip N vaults from the query (default: 0)
- `?first=N` - Limit results to N vaults

### Strategy Endpoints

```
GET /{chainID}/strategies/all                # All strategies for chain
GET /{chainID}/strategies/{address}          # Specific strategy details
GET /{chainID}/strategy/{address}            # Same as above
GET /{chainID}/reports/{address}             # Harvest reports for strategy
```

### Harvest & User Earnings Endpoints

```
GET /{chainID}/vaults/harvests/{addresses}   # Harvest history for vaults
GET /{chainID}/earned/{address}/{vaults}     # Earnings per vault per user
GET /{chainID}/earned/{address}              # All earnings for user on chain
GET /earned/{address}                        # All earnings for user (all chains)
```

### Token Endpoints

```
GET /tokens/all                              # All tokens (all chains)
GET /{chainID}/tokens/all                    # All tokens for chain
```

### Price Endpoints

```
GET /prices/all                              # All prices (all chains)
GET /{chainID}/prices/all                    # All prices for chain
GET /{chainID}/prices/{address}              # Price for specific token
GET /{chainID}/prices/some/{addresses}       # Prices for multiple tokens
GET /{chainID}/prices/all/details            # All prices with metadata
GET /prices/some/{addresses}                 # Prices across chains
POST /prices/some                            # POST body with addresses array
```

**Price Format:** Returns price in USD with 6 decimal precision (e.g., "999727" = $0.999727)

### Info/Utility Endpoints

```
GET /                                        # Welcome message
GET /health                                  # Health check with timestamp
GET /info/chains                             # Supported chains configuration
GET /info/vaults/blacklisted                 # Blacklisted vault addresses
GET /{chainID}/status                        # Chain indexing status
```

### Custom Integration Endpoints

```
GET /rotki/list/vaults                       # Vaults formatted for Rotki
GET /rotki/count/vaults                      # Vault count for Rotki
```

## Risk Score System

The `riskScore` array in vault data contains 11 risk factors (scored 0-5 each):

| Index | Risk Factor |
|-------|-------------|
| 0 | Code review quality |
| 1 | Testing coverage and quality |
| 2 | Code complexity |
| 3 | Market risk exposure |
| 4 | Protocol integration complexity |
| 5 | Centralization risk |
| 6 | External protocol audit status |
| 7 | External protocol centralization |
| 8 | External protocol TVL size |
| 9 | External protocol longevity |
| 10 | External protocol type risk |

**Overall Risk Level:**
- -1: Not assessed
- 1: Safest
- 5: Riskiest

## Vault Categories

### Vault Types
- "Yearn Vault" - Yearn V2 vaults
- "Automated Yearn Vault" - Yearn V3 vaults
- Various integration-specific types

### Vault Kinds
- "Legacy" - Older vault versions
- "Single Strategy" - One strategy per vault
- "Multi Strategy" - Multiple strategies (V3)

## Architecture Overview

### Data Sources

yDaemon aggregates data from multiple sources:

1. **Yearn Subgraph**: Base data source for vault and strategy information
2. **Yearn Meta**: Configuration and metadata (risk scores, descriptions, icons)
3. **Yearn Lens Oracle**: On-chain price data for tokens and vaults
4. **Blockchain RPC**: Direct chain queries via Tenderly and other providers
5. **Curve API**: Pool and gauge information for Curve vaults
6. **External Price Feeds**: Gamma, Pendle, and other protocol-specific data

### Caching Strategy

- **Vault Data**: 5-minute cache TTL
- **Price Data**: 1-minute cache TTL
- **Token Data**: 5-minute cache TTL
- Background daemons refresh data continuously

## Performance & Features

- Handles multiple chains simultaneously
- Websocket support for real-time updates (where available)
- Batch operations via multicall contracts
- Optimized block range queries per chain
- CORS enabled for all origins
- gzip compression enabled

## Code Examples

### Fetch All Vaults on Ethereum

```bash
curl https://ydaemon.yearn.fi/1/vaults/all
```

```javascript
// JavaScript/TypeScript
const response = await fetch('https://ydaemon.yearn.fi/1/vaults/all');
const vaults = await response.json();

console.log(`Found ${vaults.length} vaults`);
vaults.forEach(vault => {
  console.log(`${vault.name}: TVL $${vault.tvl.tvl.toLocaleString()}`);
});
```

```python
# Python
import requests

response = requests.get('https://ydaemon.yearn.fi/1/vaults/all')
vaults = response.json()

for vault in vaults:
    print(f"{vault['name']}: TVL ${vault['tvl']['tvl']:,.2f}")
```

### Get Specific Vault Details

```bash
# Get yvDAI vault details
curl https://ydaemon.yearn.fi/1/vaults/0xdA816459F1AB5631232FE5e97a05BBBb94970c95
```

```typescript
// TypeScript with type safety
interface VaultResponse {
  address: string;
  name: string;
  symbol: string;
  tvl: {
    totalAssets: string;
    tvl: number;
    price: number;
  };
  apr: {
    netAPR: number;
    fees: {
      performance: number;
      management: number;
    };
  };
}

const getVaultDetails = async (chainId: number, vaultAddress: string): Promise<VaultResponse> => {
  const response = await fetch(`https://ydaemon.yearn.fi/${chainId}/vaults/${vaultAddress}`);
  return await response.json();
};

const vault = await getVaultDetails(1, '0xdA816459F1AB5631232FE5e97a05BBBb94970c95');
console.log(`APR: ${(vault.apr.netAPR * 100).toFixed(2)}%`);
```

### Get Token Prices

```bash
# Get DAI price
curl https://ydaemon.yearn.fi/1/prices/0x6B175474E89094C44Da98b954EedeAC495271d0F
# Returns: "999727" (meaning $0.999727)
```

```javascript
// Get multiple token prices
const tokens = [
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
];

const addresses = tokens.join(',');
const response = await fetch(`https://ydaemon.yearn.fi/1/prices/some/${addresses}`);
const prices = await response.json();

// Convert from 6-decimal format to standard price
Object.entries(prices).forEach(([address, price]) => {
  console.log(`Token ${address}: $${(price / 1e6).toFixed(6)}`);
});
```

### Get User Earnings

```bash
# Get earnings for a user across all vaults on Ethereum
curl https://ydaemon.yearn.fi/1/earned/0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

### Pagination Example

```javascript
// Fetch vaults in batches
const BATCH_SIZE = 100;
let allVaults = [];
let skip = 0;

while (true) {
  const response = await fetch(
    `https://ydaemon.yearn.fi/1/vaults/all?first=${BATCH_SIZE}&skip=${skip}`
  );
  const vaults = await response.json();

  if (vaults.length === 0) break;

  allVaults = allVaults.concat(vaults);
  skip += BATCH_SIZE;

  if (vaults.length < BATCH_SIZE) break; // Last page
}

console.log(`Total vaults: ${allVaults.length}`);
```
