# RegistryFactory.sol

[Git Source](https://github.com/yearn/vault-periphery/blob/master/contracts/registry/Registry.sol)

**Author:**
yearn.finance

Factory for anyone to easily deploy their own Registry.

## State Variables

### releaseRegistry

```solidity
address public immutable releaseRegistry;
```

## Functions

### constructor

```solidity
constructor(address _releaseRegistry);
```

### name

```solidity
function name() external pure virtual returns (string memory);
```

### createNewRegistry

Deploy a new Registry.

*Default to msg.sender for governance.*

```solidity
function createNewRegistry(string memory _name) external virtual returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The name of the new registry.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address of the new Registry.|

### createNewRegistry

Deploy a new Registry.

```solidity
function createNewRegistry(string memory _name, address _governance) public virtual returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The name of the new registry.|
|`_governance`|`address`|Address to set as governance.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address of the new Registry.|

## Events

### NewRegistry

```solidity
event NewRegistry(address indexed newRegistry, address indexed governance, string name);
```
