<!-- markdownlint-disable MD024 MD034 MD036 -->
# AuctionRegistry

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/c0dfe4a563a45efb72718547e840429b3a6092e6/src/Auctions/AuctionRegistry.sol)

**Inherits:** Governance2Step

**Title:**
AuctionRegistry

Registry contract that manages released and endorsed auction factory addresses

Provides on-chain discovery and verification of official auction factories

## State Variables

### factories

Array of all registered factories

```solidity
address[] public factories
```

### factoryInfo

Mapping from factory address to its index in the factories array

```solidity
mapping(address => FactoryInfo) public factoryInfo
```

### versionToFactory

Mapping from version string to factory address

```solidity
mapping(string => address) public versionToFactory
```

## Functions

### constructor

Initialize the registry with known factory addresses

```solidity
constructor(address _governance, address[] memory _knownFactories, string[] memory _versions)
    Governance2Step(_governance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_governance`|`address`|The address that will have governance rights|
|`_knownFactories`|`address[]`|Array of known factory addresses to register|
|`_versions`|`string[]`|Array of version strings corresponding to the factories|

### getLatestFactory

Get the latest endorsed auction factory address

```solidity
function getLatestFactory() external view returns (address factory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`factory`|`address`|The address of the latest endorsed factory|

### getFactory

Get a factory by its version string

```solidity
function getFactory(string memory _version) external view returns (address factory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_version`|`string`|The version string of the factory|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`factory`|`address`|The address of the factory|

### getFactoryInfo

Get factory information by address

```solidity
function getFactoryInfo(address _factory) external view returns (FactoryInfo memory info);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|The address of the factory|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`info`|`FactoryInfo`|The factory information struct|

### getAllFactories

Get all registered factories

```solidity
function getAllFactories() external view returns (address[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|All factory information|

### numberOfFactories

Get the total number of registered factories

```solidity
function numberOfFactories() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of registered factories|

### isRegisteredFactory

Check if a factory is endorsed

```solidity
function isRegisteredFactory(address _factory) public view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|The address to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the factory is endorsed|

### registerNewFactory

Release a new factory

```solidity
function registerNewFactory(address _factory, string memory _version) external onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|The address of the factory|
|`_version`|`string`|The version string of the factory|

### retireFactory

Revoke endorsement from a factory

```solidity
function retireFactory(address _factory) external onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|The address of the factory|

### _registerFactory

Internal function to register a factory

```solidity
function _registerFactory(address _factory, string memory _version) internal;
```

## Events

### FactoryRegistered

```solidity
event FactoryRegistered(address indexed factory, string version, uint256 index);
```

### FactoryRetired

```solidity
event FactoryRetired(address indexed factory);
```

## Structs

### FactoryInfo

```solidity
struct FactoryInfo {
    string version;
    uint256 index;
    bool isRetired;
}
```
