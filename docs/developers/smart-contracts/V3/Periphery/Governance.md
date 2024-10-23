<!-- markdownlint-disable MD024 MD034 MD036 -->
# Governance

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/f139be6286cb3d630b0bce6d6db812c709e5bb47/src/utils/Governance.sol)

## State Variables

### governance

Address that can set the default base fee and provider

```solidity
address public governance;
```

## Functions

### onlyGovernance

```solidity
modifier onlyGovernance();
```

### _checkGovernance

Checks if the msg sender is the governance.

```solidity
function _checkGovernance() internal view virtual;
```

### constructor

```solidity
constructor(address _governance);
```

### transferGovernance

Sets a new address as the governance of the contract.

*Throws if the caller is not current governance.*

```solidity
function transferGovernance(address _newGovernance) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newGovernance`|`address`|The new governance address.|

## Events

### GovernanceTransferred

Emitted when the governance address is updated.

```solidity
event GovernanceTransferred(address indexed previousGovernance, address indexed newGovernance);
```
