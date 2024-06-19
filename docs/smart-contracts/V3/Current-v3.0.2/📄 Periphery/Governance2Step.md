# Governance2Step.sol

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/utils/Governance2Step.sol)

**Inherits:**
Governance

## State Variables

### pendingGovernance

Address that is set to take over governance.

```solidity
address public pendingGovernance;
```

## Functions

### constructor

```solidity
constructor(address _governance) Governance(_governance);
```

### transferGovernance

Sets a new address as the `pendingGovernance` of the contract.

*Throws if the caller is not current governance.*

```solidity
function transferGovernance(address _newGovernance) external virtual override onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newGovernance`|`address`|The new governance address.|

### acceptGovernance

Allows the `pendingGovernance` to accept the role.

```solidity
function acceptGovernance() external virtual;
```

## Events

### UpdatePendingGovernance

Emitted when the pending governance address is set.

```solidity
event UpdatePendingGovernance(address indexed newPendingGovernance);
```
