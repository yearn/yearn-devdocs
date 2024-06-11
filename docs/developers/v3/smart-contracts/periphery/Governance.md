# Governance

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/aa404867f4e02afd209e27f2544a6ac0e1f4fb89/src/utils/Governance.sol)

## State Variables

### governance

Address that owns the smart contract.

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

# Governance2Step

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/aa404867f4e02afd209e27f2544a6ac0e1f4fb89/src/utils/Governance2Step.sol)

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
