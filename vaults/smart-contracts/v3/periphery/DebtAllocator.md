# DebtAllocator
[Git Source](https://github.com/yearn/vault-periphery/blob/master/contracts/debtAllocators/DebtAllocator.sol)

**Author:**
yearn.finance


This Debt Allocator is meant to be used alongside
a Yearn V3 vault to provide the needed triggers for a keeper
to perform automated debt updates for the vaults strategies.
Each allocator contract will serve one Vault and each strategy
that should be managed by this allocator will need to be added
manually by setting a `targetRatio` and `maxRatio`.
The allocator aims to allocate debt between the strategies
based on their set target ratios. Which are denominated in basis
points and represent the percent of total assets that specific
strategy should hold.
The trigger will attempt to allocate up to the `maxRatio` when
the strategy has `minimumChange` amount less than the `targetRatio`.
And will pull funds from the strategy when it has `minimumChange`
more than its `maxRatio`.


## State Variables
### MAX_BPS

```solidity
uint256 internal constant MAX_BPS = 10_000;
```


### factory
Address to get permissioned roles from.


```solidity
address public immutable factory;
```


### vault
Address of the vault this serves as allocator for.


```solidity
address public vault;
```


### minimumWait
Time to wait between debt updates in seconds.


```solidity
uint256 public minimumWait;
```


### minimumChange
The minimum amount denominated in asset that will


```solidity
uint256 public minimumChange;
```


### totalDebtRatio
Total debt ratio currently allocated in basis points.


```solidity
uint256 public totalDebtRatio;
```


### maxDebtUpdateLoss
Max loss to accept on debt updates in basis points.


```solidity
uint256 public maxDebtUpdateLoss;
```


### managers
Mapping of addresses that are allowed to update debt ratios.


```solidity
mapping(address => bool) public managers;
```


### _configs
Mapping of strategy => its config.


```solidity
mapping(address => Config) internal _configs;
```


## Functions
### onlyGovernance

Make sure the caller is governance.


```solidity
modifier onlyGovernance();
```

### onlyManagers

Make sure the caller is governance or a manager.


```solidity
modifier onlyManagers();
```

### onlyKeepers

Make sure the caller is a keeper


```solidity
modifier onlyKeepers();
```

### _isGovernance

Check the Factories governance address.


```solidity
function _isGovernance() internal view virtual;
```

### _isManager

Check is either factories governance or local manager.


```solidity
function _isManager() internal view virtual;
```

### _isKeeper

Check is one of the allowed keepers.


```solidity
function _isKeeper() internal view virtual;
```

### constructor


```solidity
constructor();
```

### initialize

Initializes the debt allocator.

*Should be called atomically after cloning.*


```solidity
function initialize(address _vault, uint256 _minimumChange) public virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault this allocates debt for.|
|`_minimumChange`|`uint256`|The minimum in asset that must be moved.|


### update_debt

Debt update wrapper for the vault.

*This can be used if a minimum time between debt updates
is desired to be used for the trigger and to enforce a max loss.
This contract must have the DEBT_MANAGER role assigned to them.
The function signature matches the vault so no update to the
call data is required.
This will also run checks on losses realized during debt
updates to assure decreases did not realize profits outside
of the allowed range.*


```solidity
function update_debt(address _strategy, uint256 _targetDebt) public virtual onlyKeepers;
```

### shouldUpdateDebt

Check if a strategy's debt should be updated.

*This should be called by a keeper to decide if a strategies
debt should be updated and if so by how much.*


```solidity
function shouldUpdateDebt(address _strategy) public view virtual returns (bool, bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Bool representing if the debt should be updated.|
|`<none>`|`bytes`|. Calldata if `true` or reason if `false`.|


### increaseStrategyDebtRatio

Increase a strategies target debt ratio.

*`setStrategyDebtRatio` functions will do all needed checks.*


```solidity
function increaseStrategyDebtRatio(address _strategy, uint256 _increase) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|The address of the strategy to increase the debt ratio for.|
|`_increase`|`uint256`|The amount in Basis Points to increase it.|


### decreaseStrategyDebtRatio

Decrease a strategies target debt ratio.


```solidity
function decreaseStrategyDebtRatio(address _strategy, uint256 _decrease) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|The address of the strategy to decrease the debt ratio for.|
|`_decrease`|`uint256`|The amount in Basis Points to decrease it.|


### setStrategyDebtRatio

Sets a new target debt ratio for a strategy.

*This will default to a 20% increase for max debt.*


```solidity
function setStrategyDebtRatio(address _strategy, uint256 _targetRatio) public virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy to set.|
|`_targetRatio`|`uint256`|Amount in Basis points to allocate.|


### setStrategyDebtRatio

Sets a new target debt ratio for a strategy.

*A `minimumChange` for that strategy must be set first.
This is to prevent debt from being updated too frequently.*


```solidity
function setStrategyDebtRatio(address _strategy, uint256 _targetRatio, uint256 _maxRatio) public virtual onlyManagers;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy to set.|
|`_targetRatio`|`uint256`|Amount in Basis points to allocate.|
|`_maxRatio`|`uint256`|Max ratio to give on debt increases.|


### removeStrategy

Remove a strategy from this debt allocator.

*Will delete the full config for the strategy*


```solidity
function removeStrategy(address _strategy) external virtual onlyManagers;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the address ro remove.|


### setMinimumChange

Set the minimum change variable for a strategy.

*This is the minimum amount of debt to be
added or pulled for it to trigger an update.*


```solidity
function setMinimumChange(uint256 _minimumChange) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minimumChange`|`uint256`|The new minimum to set for the strategy.|


### setMaxDebtUpdateLoss

Set the max loss in Basis points to allow on debt updates.

*Withdrawing during debt updates use {redeem} which allows for 100% loss.
This can be used to assure a loss is not realized on redeem outside the tolerance.*


```solidity
function setMaxDebtUpdateLoss(uint256 _maxDebtUpdateLoss) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxDebtUpdateLoss`|`uint256`|The max loss to accept on debt updates.|


### setMinimumWait

Set the minimum time to wait before re-updating a strategies debt.

*This is only enforced per strategy.*


```solidity
function setMinimumWait(uint256 _minimumWait) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minimumWait`|`uint256`|The minimum time in seconds to wait.|


### setManager

Set if a manager can update ratios.


```solidity
function setManager(address _address, bool _allowed) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_address`|`address`|The address to set mapping for.|
|`_allowed`|`bool`|If the address can call [update_debt](#update_debt).|


### getConfig

Get a strategies full config.

*Used for customizations by inheriting the contract.*


```solidity
function getConfig(address _strategy) public view virtual returns (Config memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Config`|The strategies current Config.|


### getStrategyTargetRatio

Get a strategies target debt ratio.


```solidity
function getStrategyTargetRatio(address _strategy) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The strategies current targetRatio.|


### getStrategyMaxRatio

Get a strategies max debt ratio.


```solidity
function getStrategyMaxRatio(address _strategy) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The strategies current maxRatio.|


## Events
### UpdateStrategyDebtRatio
An event emitted when a strategies debt ratios are Updated.


```solidity
event UpdateStrategyDebtRatio(
    address indexed strategy, uint256 newTargetRatio, uint256 newMaxRatio, uint256 newTotalDebtRatio
);
```

### StrategyChanged
An event emitted when a strategy is added or removed.


```solidity
event StrategyChanged(address indexed strategy, Status status);
```

### UpdateMinimumWait
An event emitted when the minimum time to wait is updated.


```solidity
event UpdateMinimumWait(uint256 newMinimumWait);
```

### UpdateMinimumChange
An event emitted when the minimum change is updated.


```solidity
event UpdateMinimumChange(uint256 newMinimumChange);
```

### UpdateManager
An event emitted when a keeper is added or removed.


```solidity
event UpdateManager(address indexed manager, bool allowed);
```

### UpdateMaxDebtUpdateLoss
An event emitted when the max debt update loss is updated.


```solidity
event UpdateMaxDebtUpdateLoss(uint256 newMaxDebtUpdateLoss);
```

## Structs
### Config
Struct for each strategies info.


```solidity
struct Config {
    bool added;
    uint16 targetRatio;
    uint16 maxRatio;
    uint96 lastUpdate;
    uint120 open;
}
```

## Enums
### Status
Status when a strategy is added or removed from the allocator.


```solidity
enum Status {
    NULL,
    ADDED,
    REMOVED
}
```

