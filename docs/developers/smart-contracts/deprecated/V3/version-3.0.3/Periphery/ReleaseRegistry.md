<!-- markdownlint-disable MD024 MD034 MD036 -->
# ReleaseRegistry

[Git Source](https://github.com/yearn/vault-periphery/blob/68b201f38716a8ab5aa5cedce51a90f52c89578b/src/registry/ReleaseRegistry.sol)

**Inherits:**
[Governance2Step](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/utils/Governance2Step.sol)

**Author:**
yearn.finance

Used by Yearn Governance to track on chain all
releases of the V3 vaults by API Version.

## State Variables

### name

```solidity
string public constant name = "Yearn V3 Release Registry";
```

### numReleases

```solidity
uint256 public numReleases;
```

### factories

```solidity
mapping(uint256 => address) public factories;
```

### tokenizedStrategies

```solidity
mapping(uint256 => address) public tokenizedStrategies;
```

### releaseTargets

```solidity
mapping(string => uint256) public releaseTargets;
```

## Functions

### constructor

```solidity
constructor(address _governance) Governance2Step(_governance);
```

### latestFactory

Returns the latest factory.

```solidity
function latestFactory() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the factory for the latest release.|

### latestTokenizedStrategy

Returns the latest tokenized strategy.

```solidity
function latestTokenizedStrategy() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the tokenized strategy for the latest release.|

### latestRelease

Returns the api version of the latest release.

```solidity
function latestRelease() external view virtual returns (string memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The api version of the latest release.|

### newRelease

Issue a new release using a deployed factory.

*Stores the factory address in `factories` and the release
target in `releaseTargets` with its associated API version.
Throws if caller isn't `governance`.
Throws if the api version is the same as the previous release.
Throws if the factory does not have the same api version as the tokenized strategy.
Emits a `NewRelease` event.*

```solidity
function newRelease(address _factory, address _tokenizedStrategy) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|The factory that will be used create new vaults.|
|`_tokenizedStrategy`|`address`||

## Events

### NewRelease

```solidity
event NewRelease(
    uint256 indexed releaseId, address indexed factory, address indexed tokenizedStrategy, string apiVersion
);
```
