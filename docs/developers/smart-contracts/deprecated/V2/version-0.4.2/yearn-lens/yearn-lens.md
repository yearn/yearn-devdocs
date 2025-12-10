# Yearn Lens

Yearn Lens is a series of smart contracts that aggregate and format Yearn family protocol data into standardized interfaces.

## Architecture

### Block Diagram

![Chart](https://i.imgur.com/1Y5kcxY.png)

### Key Concepts

- Lens
  - The lens contract acts as the primary data aggregator
  - Registry adapters can be added or removed from the lens contract
  - The lens contract supports many of the same methods as the registry adapters, but returns aggregated views across asset types
- Registry Adapters
  - The purpose of registry adapters is to read data from various registries and return data in a standardized format
  - Currently registry adapters exist for:
    - v1 Vaults
    - v2 Vaults
    - Earn
    - Iron Bank
    - veCrv
  - All registry adapters must implement a standardized set of methods (details below)
  - Registry adapters have the ability to return metadata specific to an asset type (for example for vaults: `pricePerShare`, `controller`, etc.)
- Oracle
  - The oracle contract is responsible for fetching price information from various sources
  - The oracle is intended for non-critical off-chain calculations
    - TVL calculations
    - Token and asset balance normalizations
    - Not intended to be used with strategies or other contracts
  - Prices are returned in USDC
  - Supports adding, removing and upgrading price calculations
    - Currently supported calculations:
      - Sushiswap market price (based on `getAmountsOut`)
      - Uniswap market price (based on `getAmountsOut`)
      - Sushiswap/Uniswap LP token prices (based on `getReserves`)
      - Iron Bank market price (based on `exchangeRateStored`)
      - Curve LP token price (based on `virtualPrice` and base underlying token price)
  - The oracle contract itself is very lightweight
    - A cascading fallback mechanism is utilized to fetch the most appropriate price for a given asset
      - This means the majority of logic lives on calculation contracts
      - This also means the oracle contract gets direct access to all underlying calculation contract helper methods

### Key Features

- Obtain all Yearn family asset data in a standardized interface
- Obtain all user asset and token balances/allowances
  - Ability to return USDC normalized balances as well as base asset balances
- Obtain various TVL calculations for Yearn
  - Total TVL
  - TVL per asset type
  - TVL per asset
- Integration with all Yearn family protocols
  - v1/v2 vaults
  - Iron Bank
  - Earn
  - VeCrv (base contract and pJar)

## Contracts

### Registry Adapters

#### Schema

##### Standardized Interfaces

All registry adapters are required to implement the following interfaces.

###### AdapterMetadata

```solidity
struct AdapterMetadata {
    string typeId;
    string categoryId;
    string subcategoryId;
}
```

###### Asset

```solidity
struct Asset {
    address id;
    string typeId;
    string name;
    string version;
    uint256 balance;
    uint256 balanceUsdc; // Asset TVL == balance * token.priceUsdc
    Token token;
    AssetMetadata metadata;
}
```

###### AssetStatic (static) (not connected)

```solidity
struct AssetStatic {
    address id;
    string typeId;
    string name;
    string version;
    Token token;
}
```

###### Token (static) (not connected)

```solidity
struct Token {
    address id;
    string name;
    string symbol;
    uint8 decimals;
}
```

```json
assetsStatic():
[{
  id: "0x123...",
  typeId: "v2Vault",
  name: "YFI Vault",
  version: "0.3.2",
  tokenId: "0x234..."
  token: {
    id: "0x234...",
    name: "yearn.fi",
    symbol: "YFI",
    decimals: 18
  }
}]

```

###### AssetDynamic (dynamic) (not connected)

```solidity
struct AssetDynamic {
    address assetId;
    address tokenId;
    AssetMetadata metadata;
    TokenAmount underlyingTokenBalance; // Amount of underlying token in the asset
}
```

###### TokenAmount (dynamic)

```solidity
struct TokenAmount {
    uint256 amount;
    uint256 amountUsdc;
}
```

```json
assetsDynamic():
[{
  assetId: "0x123",
  tokenId: "0x456",
  metadata: {
    pricePerShare: "101000022394340034000"
  },
  underlyingTokenBalance: {
    amount: "53233222334444334444", // vault.totalAssets()
    amountUsdc: "3422233333445"
  }
}]

```

###### Position (dynamic) (connected)

```solidity
struct Position {
    address assetId;
    string typeId;
    address tokenId;
    uint256 balance; // asset.balanceOf(account) - shares owned by user
    TokenPostion underlyingTokenBalance; // Amount of underlying token in the asset that a user owns
    TokenPosition accountTokenBalance; // Amount of underlying token a user owns
    Allowance[] tokenAllowances;
    Allowance[] assetAllowances;
}
```

```json
positionsOf(account):
[{
  assetId: "0x123",
  typeId: "deposit",
  tokenId: "0x545",
  balance: "105344343435553", // vault.balanceOf(account)
  underlyingTokenBalance: {
    amount: "53233222334444334444", // vault.balanceOf(account) * pricePerShare
    amountUsdc: "3422233333445"
  },
  accountTokenBalance: {
    amount: "4424424000238", // token.balanceOf(account)
    amountUsdc: "23323"
  },
  tokenAllowances: [{
    owner: "0x4800", // Account
    spender: "0x123", // Asset address
    amount: "115335543535353535235325325325235235325235425235"
  }],
  assetAllowances: [{
    owner: "0x123", // Asset address
    spender: "0x456", // Trusted migrator
    amount: "115335543535353535235325325325235235325235425235"
  }]
}]
```

###### Position

```solidity
struct Position {
    address assetId;
    uint256 balance;
    uint256 balanceUsdc;
    TokenPosition tokenPosition;
    Allowance[] allowances;
}
```

###### Token

```solidity
struct Token {
    address id;
    string name;
    string symbol;
    uint8 decimals;
    uint256 priceUsdc;
}
```

###### TokenPosition

```solidity
struct TokenPosition {
    address tokenId;
    uint256 balance;
    uint256 balanceUsdc;
    Allowance[] allowances;
}
```

```solidity
struct Allowance {
    address owner;
    address spender;
    uint256 allowance;
}
```

##### Adapter-specific Interfaces

Each registry adapter can export asset metadata that is specific to the asset type.

###### Vault

```solidity
struct AssetMetadata {
    string symbol;
    uint256 pricePerShare;
    bool migrationAvailable;
    address latestVaultAddress;
    uint256 depositLimit;
    bool emergencyShutdown;
}
```

###### Earn

`TBD`

###### Iron Bank

`TBD`

###### veCrv

`TBD`

#### Methods

All registry adapters are required to implement the following methods.

##### registryAddress

Get the registry address associated with the adapter. The adapter pulls most information from the registry. `registryAddress` is defined in the adapter consturctor.

```solidity
address public registryAddress;
```

##### assetsLength

Get the number of assets the registry adapter is capable of returning.

```javascript
function assetsLength() public view returns (uint256);
```

`RETURN` Number of registry adapter assets

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
uint256 assetsLength = registryAdapter.assetsLength();
```

###### Example Response

```solidity
32
```

##### positionSpenderAddresses

```solidity
address[] public positionSpenderAddresses;
```

##### setPositionSpenderAddresses

```solidity
function setPositionSpenderAddresses(address addresses)
```

##### assetsAddresses

Get a list of asset addresses from the asset adapter's associated registry.

```javascript
function assetsAddresses() public view returns (address[] memory);
```

`RETURN` Array of asset addresses

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
address[] assetAddresses = registryAdapter.assetsAddresses();
```

###### Example Response

```solidity
['0xE14d13d8B3b85aF791b2AADD661cDBd5E6097Db1',
 '0xdCD90C7f6324cfa40d7169ef80b12031770B4325',
 '0x986b4AFF588a109c09B50A03f42E4110E29D353F',
 '0xcB550A6D4C8e3517A939BC79d0c7093eb7cF56B5']
```

##### assetTvl

Get TVL for a specific asset (in USDC).

```javascript
function assetTvl(address assetAddress) public view returns (uint256);
```

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
address assetAddress = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
uint256 assetTvl = registryAdapter.assetTvl(assetAddress);
```

###### Example Response

`1637032292`

##### assetsTvl

Get aggregated TVL for all assets in the adapter's registry.

```javascript
function assetsTvl() external view returns (uint256);
```

`RETURN` Aggregated TVL scoped to the adapter's assets in USDC

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
uint256 assetTvl = registryAdapter.assetsTvl();
```

###### Example Response

`443923433354832`

##### asset

Get a specific asset including metadata specific to the asset type. The response extends the standardized `Asset` interface.

```javascript
function asset(address assetAddress) public view returns (Asset memory);
```

`assetAddress` The address of the asset to fetch
`RETURN` An asset struct containing information about the asset

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
address assetAddress = 0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b;
registryAdapter.asset(assetAddress);
```

###### Example Response

```json
{
  name: 'WTFTM Vault',
  id: 0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b,
  version: '0.3.2',
  totalAssets: 129999966466476313000000,
  totalAssetsUsdc: 14355444934422, // TVL
  metadata: {
    controller: 0x19D3364A399d251E894aC732651be8B0E4e85001,
    pricePerShare: 142004300000000000
    ...
  }
}
```

##### assets

Get all assets for a registry adapter

```javascript
function assets() external view returns (Asset[] memory);
```

`RETURN` An array of asset structs containing information about the assets

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
registryAdapter.assets();
```

###### Example Response

```json
[
  {
    name: 'WFTM Vault',
    id: 0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b, // vault address
    version: '0.3.2',
    totalAssets: 129999966466476313000000,
    totalAssetsUsdc: 14355444934422, // TVL
    metadata: {
      controller: 0x19D3364A399d251E894aC732651be8B0E4e85001,
      pricePerShare: 142004300000000000
      ...
    }
  },
  {
    name: 'fUSD Vault',
    id: 0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9,
    version: '0.3.2',
    totalAssets: 4593326846642963130309078,
    totalAssetsUsdc: 45444930943854422, // TVL
    metadata: {
      controller: 0x19D3364A399d251E894aC732651be8B0E4e85001,
      pricePerShare: 101003300000000000
      ...
    }
  }
]
```

##### positionOf

Get the position of an account for a specific asset address.

```javascript
function positionOf(address accountAddress, address assetAddress)
    public
    view
    returns (Position memory);
```

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
address accountAddress = 0x481140F916a4e64559694DB4d56D692CadC0326c;
address assetAddress = 0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b;
registryAdapter.positionForAsset(accountAddress, assetAddress);
```

###### Example Response

```json
{
  assetId: 0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b, // vault address
  depositedBalance: 10422000000000000000,
  depositedBalanceUsdc: 10422000,
  tokenBalance: 2110000000000000000,
  tokenBalanceUsdc: 2110000,
  tokenAllowance, 1157343987545498574545495749587452... // max uint256
}
```

##### positionsOf

Get all positions for an account for every adapter asset.

```javascript
function positionsOf(address accountAddress)
        external
        view
        returns (Position[] memory);
```

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
address accountAddress = 0x481140F916a4e64559694DB4d56D692CadC0326c;
registryAdapter.positionsOf(accountAddress);
```

###### Example Response

```json
[
  {
    assetId: 0xe2F6b9773BF3A015E2aA70741Bde1498bdB9425b, // vault address
    depositedBalance: 10422000000000000000,
    depositedBalanceUsdc: 10422000,
    tokenBalance: 2110000000000000000,
    tokenBalanceUsdc: 2110000,
    tokenAllowance, 1157343987545498574545495749587452... // max uint256
  },
  {
    assetId: 0x19D3364A399d251E894aC732651be8B0E4e85001, // vault address
    depositedBalance: 10422000000000000000,
    depositedBalanceUsdc: 10422000,
    tokenBalance: 0,
    tokenBalanceUsdc: 0,
    tokenAllowance, 0
  }
]
```

##### tokens

Get unique tokens for the adapter.

```javascript
function tokens()
        external
        view
        returns (Token[] memory);
```

###### Solidity

```solidity
RegistryAdapter registryAdapter = RegistryAdapter(0xABCD...);
registryAdapter.tokens();
```

###### Example Response

```json
[
  {
    id: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, // token address
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18,
    priceUsdc: 100000
  },
  ...
]
```

### Oracle

#### Methods

##### setCalculations

Set oracle calculation contract addresses. Each calculation contract must implement getPriceUsdc(). The order of calculation contracts matters as it determines the order preference in the cascading fallback mechanism.

```javascript
function setCalculations(address[] memory calculationAddresses)
        public
        onlyManagers;
```

`calculationAddresses` An array of addresses for underlying calculation contracts

##### calculations

View the calculation contract addresses currently associated with the oracle.

```javascript
function calculations() external view returns (address[] memory);
```

`RETURN` An array of calculation contract addresses associated with the oracle

###### Example Response

```json
[
  "0xfC714174E5c8bd056a45a5337E7b402CC4af7BF3",
  "0x55e9B18fefFF7E00548d54480373Fc8843De8eA4",
  "0x88dE7d7F7b9597C86b8cD195374FbF602934F334"
]
```

##### getPriceUsdcRecommended

Get the currently recommended price given a token address.

```javascript
function getPriceUsdcRecommended(address tokenAddress)
        public
        view
        returns (uint256);
```

`tokenAddress` The token address for which to obtain a price recommendation
`RETURN` Recommended price in USDC (6 decimals)

###### Example Response

`103000`

##### getNormalizedValueUsdc

Calculate normalized USDC value given a token address and an amount.

```javascript
function getNormalizedValueUsdc(address tokenAddress, uint256 amount)
        external
        view
        returns (uint256);
```

`tokenAddress` The token address
`amount` The amount of value to convert (in token decimals)
`RETURN` Recommended price in USDC (6 decimals)

###### Example Response

`3442238822`

##### tokenAliases

Given a token address fetch a token alias address. This is necessary for certain wrapped or special case tokens that do not have a token price available in the oracle.

```solidity
mapping(address => address) public tokenAliases;
```

##### addTokenAlias

Add a new token alias mapping.

```solidity
function addTokenAlias(address tokenAddress, address tokenAliasAddress)
        public
        onlyManagers;
```

`tokenAddress` The token address that will receive an alias
`tokenAliasAddress` The new token alias address

##### addTokenAliases

Batch add new token alias mappingings.

```solidity
    function addTokenAliases(TokenAlias[] memory tokenAliases)
        public
        onlyManagers
```

`tokenAliases` An array of `TokenAlias` structs (`[[tokenAddress, tokenAliasAddress]]`)

##### removeTokenAlias

Remove a token alias mapping.

```solidity
function addTokenAlias(address tokenAddress, address tokenAliasAddress)
        public
        onlyManagers;
```

`tokenAddress` The token address whose alias will be removed

### Calculation

#### Standardized methods

All calculation contracts must implement the following methods.

##### getPriceUsdc

Fetch the recommended price given a token address. Reverts if no relevant price is found.

```javascript
function getPriceUsdc(address tokenAddress) public view returns (uint256)
```

###### Example Response

`103000`

#### Calculation specific methods

Helper utilities for various calculations. These methods are indirectly exposed to the oracle via the oracle's cascading fallback mechanism. All of these methods can be called via the oracle contract by generating a custom ABI with the desired methods. Since these helper methods do not represent the primary use case of the oracle contract (the primary use case is fetching price) determining the details of each method implementation is left to the user.

##### Sushiswap

```javascript
function getPriceFromRouter(address token0Address, address token1Address)
        public
        view
        returns (uint256);

function getPriceFromRouterUsdc(address tokenAddress)
        public
        view
        returns (uint256);

function isLpToken(address tokenAddress) public view returns (bool);

function getRouterForLpToken(address tokenAddress)
        public
        view
        returns (PriceRouter);

function getLpTokenTotalLiquidityUsdc(address tokenAddress)
        public
        view
        returns (uint256);

function getLpTokenPriceUsdc(address tokenAddress)
        public
        view
        returns (uint256);
```

##### Curve

```javascript
function getBasePrice(address curveLpTokenAddress)
        public
        view
        returns (uint256);

function getVirtualPrice(address curveLpTokenAddress)
        public
        view
        returns (uint256);

function isCurveLpToken(address tokenAddress) public view returns (bool);

function getFirstUnderlyingCoinFromPool(address poolAddress)
        public
        view
        returns (address);
function getCurvePriceUsdc(address curveLpTokenAddress)
        public
        view
        returns (uint256);
```

##### IronBank

```javascript
function isIronBankMarket(address tokenAddress) public view returns (bool);

function getIronBankMarkets() public view returns (address[] memory);

function getIronBankMarketPriceUsdc(address tokenAddress)
        public
        view
        returns (uint256);
```

### Lens

#### Methods

##### addAdapter

Add a registry adapter. The registry adapter must conform to the standardized registry adapter interface.

```javascript
function addAdapter(address adapterAddress) public onlyManager;
```

`adapterAddress` Address of the adapter to add

###### Solidity

```solidity
Lens lens = Lens(0x9b8b9F6146B29CC32208f42b995E70F0Eb2807F3);
address adapterAddress = 0xe11ba472F74869176652C35D30dB89854b5ae84D;
lens.addAdapter(adapterAddress);
```

##### removeAdapter

Remove a registry adapter.

```javascript
function removeAdapter(address adapterAddress) public onlyManager;
```

`adapterAddress` Address of the adapter to remove

###### Solidity

```solidity
Lens lens = Lens(0x9b8b9F6146B29CC32208f42b995E70F0Eb2807F3);
address adapterAddress = 0xe11ba472F74869176652C35D30dB89854b5ae84D;
lens.removeAdapter(adapterAddress);
```

##### adapters

Fetch a list of registry adapter addresses.

```javascript
function adapters() external view returns (address[] memory);
```

###### Solidity

```javascript
Lens lens = Lens(0x9b8b9F6146B29CC32208f42b995E70F0Eb2807F3);
address[] memory = lens.adapters();
```

###### Example Response

```solidity
['0xE14d13d8B3b85aF791b2AADD661cDBd5E6097Db1',
 '0xdCD90C7f6324cfa40d7169ef80b12031770B4325',
 '0x986b4AFF588a109c09B50A03f42E4110E29D353F',
 '0xcB550A6D4C8e3517A939BC79d0c7093eb7cF56B5']
```

##### assetsFromAdapter

```javascript
function assetsFromAdapter(RegistryAdapter registryAdapterAddress)
        external
        view
        returns (RegistryAdapter.Asset[] memory)
```

See: [registryAdapter.assets](#assets)

##### assets

Fetch all assets for all supported protocols.

```javascript
function assets()
        external
        view
        returns (RegistryAdapter.Asset[] memory)
```

See: [registryAdapter.assets](#assets)

##### positionsFromAdapter

Fetch positions for an account for a specific adapter.

```javascript
function positionsFromAdapter(
        address account,
        RegistryAdapter registryAdapterAddress
    ) external view returns (RegistryAdapter.Position[] memory)
```

See: [registryAdapter.positionsOf](#positionsof)

##### positionsOf

Fetch all positions for an account within the ecosystem.

```javascript
function positionsOf(address account)
        external
        view
        returns (RegistryAdapter.Position[] memory)
```

See: [registryAdapter.positionsOf](#positionsof)

##### assetsLength

```javascript
function assetsLength() public view returns (uint256);
```

Get the total number of assets for all Yearn family protocols
See: [registryAdapter.assetsLength](#assetslength)

##### assetsAddresses

```javascript
function assetsAddresses() public view returns (address[] memory);
```

Get all addresses for all Yearn family assets
See: [registryAdapter.assetsAddresses](#assetsaddresses)

##### allowances

Batch fetch allowances given an owner, tokens and spender. This is a helper utility for fetching large amounts of token allowances for a specific set of contracts

```solidity
    function allowances(
        address owner,
        address[] memory tokens,
        address[] memory spenders
    ) external view returns (uint256[] memory)
```
