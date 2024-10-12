<!-- markdownlint-disable MD024 MD036 -->
# Governance

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/b5038c9021e11faa494b2ff9921a2fa9566f8d8b/src/utils/Governance.sol)

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
