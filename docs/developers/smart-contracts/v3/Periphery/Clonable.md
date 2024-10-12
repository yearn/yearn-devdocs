<!-- markdownlint-disable MD024 MD036 -->
# Clonable

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/b5038c9021e11faa494b2ff9921a2fa9566f8d8b/src/utils/Clonable.sol)

## State Variables

### original

Set to the address to auto clone from.

```solidity
address public original;
```

## Functions

### _clone

Clone the contracts default `original` contract.

```solidity
function _clone() internal virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address of the new Minimal Proxy clone.|

### _clone

Clone any `_original` contract.

```solidity
function _clone(address _original) internal virtual returns (address _newContract);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_newContract`|`address`|Address of the new Minimal Proxy clone.|
