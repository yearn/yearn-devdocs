<!-- markdownlint-disable MD024 MD034 MD036 -->
# Clonable

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/f139be6286cb3d630b0bce6d6db812c709e5bb47/src/utils/Clonable.sol)

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
