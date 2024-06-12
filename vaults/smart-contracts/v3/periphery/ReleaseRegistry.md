# ReleaseRegistry
[Git Source](https://github.com/yearn/vault-periphery/blob/master/contracts/registry/ReleaseRegistry.sol)

**Inherits:**
[Governance](/Governance)

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


### releaseTargets

```solidity
mapping(string => uint256) public releaseTargets;
```


## Functions
### constructor


```solidity
constructor(address _governance) Governance(_governance);
```

### latestFactory

Returns the latest factory.

*Throws if no releases are registered yet.*


```solidity
function latestFactory() external view virtual returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the factory for the latest release.|


### latestRelease

Returns the api version of the latest release.

*Throws if no releases are registered yet.*


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
Emits a `NewRelease` event.*


```solidity
function newRelease(address _factory) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|The factory that will be used create new vaults.|


## Events
### NewRelease

```solidity
event NewRelease(uint256 indexed releaseId, address indexed factory, string apiVersion);
```

