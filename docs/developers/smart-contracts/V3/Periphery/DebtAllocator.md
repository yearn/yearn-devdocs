<!-- markdownlint-disable MD024 MD034 MD036 -->
# DebtAllocator

[Git Source](https://github.com/yearn/vault-periphery/blob/516f95edcd36e28b714b52408c05009b430900e3/src/debtAllocators/DebtAllocator.sol)

**Inherits:** Governance

**Author:**
yearn.finance

This Debt Allocator is meant to be used alongside
Yearn V3 vaults to provide the needed triggers for a keeper
to perform automated debt updates for the vaults strategies.

Each vault that should be managed by this allocator will
need to be added by first setting a `minimumChange` for the
vault, which will act as the minimum amount of funds to move that will
trigger a debt update. Then adding each strategy by setting a
`targetRatio` and optionally a `maxRatio`.
The allocator aims to allocate debt between the strategies
based on their set target ratios. Which are denominated in basis
points and represent the percent of total assets that specific
strategy should hold (i.e 1_000 == 10% of the vaults `totalAssets`).
The trigger will attempt to allocate up to the `maxRatio` when
the strategy has `minimumChange` amount less than the `targetRatio`.
And will pull funds to the `targetRatio` when it has `minimumChange`
more than its `maxRatio`.

## State Variables

### MAX_BPS

```solidity
uint256 internal constant MAX_BPS = 10_000;
```

### minimumWait

Time to wait between debt updates in seconds.

```solidity
uint256 public minimumWait;
```

### baseFeeProvider

Provider to read current block's base fee.

```solidity
address public baseFeeProvider;
```

### maxDebtUpdateLoss

Max loss to accept on debt updates in basis points.

```solidity
uint256 public maxDebtUpdateLoss;
```

### maxAcceptableBaseFee

Max the chains base fee can be during debt update.

```solidity
uint256 public maxAcceptableBaseFee;
```

### keepers

Mapping of addresses that are allowed to update debt.

```solidity
mapping(address => bool) public keepers;
```

### managers

Mapping of addresses that are allowed to update debt ratios.

```solidity
mapping(address => bool) public managers;
```

### _vaultConfigs

```solidity
mapping(address => VaultConfig) internal _vaultConfigs;
```

### _strategyConfigs

Mapping of vault => strategy => its config.

```solidity
mapping(address => mapping(address => StrategyConfig)) internal _strategyConfigs;
```

## Functions

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
constructor() Governance(msg.sender);
```

### initialize

Initialize the contract after being cloned.

*Sets default values for the global variables.*

```solidity
function initialize(address _governance) external;
```

### update_debt

Debt update wrapper for the vault.

*This contract must have the DEBT_MANAGER role assigned to them.
This will also uses the `maxUpdateDebtLoss` during debt
updates to assure decreases did not realize profits outside
of the allowed range.*

```solidity
function update_debt(address _vault, address _strategy, uint256 _targetDebt) public virtual onlyKeepers;
```

### shouldUpdateDebt

Check if a strategy's debt should be updated.

*This should be called by a keeper to decide if a strategies
debt should be updated and if so by how much.*

```solidity
function shouldUpdateDebt(address _vault, address _strategy) public view virtual returns (bool, bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to update.|
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
function increaseStrategyDebtRatio(address _vault, address _strategy, uint256 _increase) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`||
|`_strategy`|`address`|The address of the strategy to increase the debt ratio for.|
|`_increase`|`uint256`|The amount in Basis Points to increase it.|

### decreaseStrategyDebtRatio

Decrease a strategies target debt ratio.

```solidity
function decreaseStrategyDebtRatio(address _vault, address _strategy, uint256 _decrease) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`||
|`_strategy`|`address`|The address of the strategy to decrease the debt ratio for.|
|`_decrease`|`uint256`|The amount in Basis Points to decrease it.|

### setStrategyDebtRatio

Sets a new target debt ratio for a strategy.

*This will default to a 20% increase for max debt.*

```solidity
function setStrategyDebtRatio(address _vault, address _strategy, uint256 _targetRatio) public virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`||
|`_strategy`|`address`|Address of the strategy to set.|
|`_targetRatio`|`uint256`|Amount in Basis points to allocate.|

### setStrategyDebtRatio

Sets a new target debt ratio for a strategy.

*A `minimumChange` for that strategy must be set first.
This is to prevent debt from being updated too frequently.*

```solidity
function setStrategyDebtRatio(address _vault, address _strategy, uint256 _targetRatio, uint256 _maxRatio)
    public
    virtual
    onlyManagers;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_strategy`|`address`|Address of the strategy to set.|
|`_targetRatio`|`uint256`|Amount in Basis points to allocate.|
|`_maxRatio`|`uint256`|Max ratio to give on debt increases.|

### removeStrategy

Remove a strategy from this debt allocator.

*Will delete the full config for the strategy*

```solidity
function removeStrategy(address _vault, address _strategy) external virtual onlyManagers;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_strategy`|`address`|Address of the address ro remove.|

### setMinimumChange

Set the minimum change variable for a strategy.

*This is the minimum amount of debt to be
added or pulled for it to trigger an update.*

```solidity
function setMinimumChange(address _vault, uint256 _minimumChange) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_minimumChange`|`uint256`|The new minimum to set for the strategy.|

### setPaused

Allows governance to pause the triggers.

```solidity
function setPaused(address _vault, bool _status) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_status`|`bool`|Status to set the `paused` bool to.|

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

### setMaxDebtUpdateLoss

Set the max loss in Basis points to allow on debt updates.

*Withdrawing during debt updates use `redeem` which allows for 100% loss.
This can be used to assure a loss is not realized on redeem outside the tolerance.*

```solidity
function setMaxDebtUpdateLoss(uint256 _maxDebtUpdateLoss) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxDebtUpdateLoss`|`uint256`|The max loss to accept on debt updates.|

### setBaseFeeProvider

Used to set our baseFeeProvider, which checks the network's current base
fee price to determine whether it is an optimal time to harvest or tend.
This may only be called by governance.

```solidity
function setBaseFeeProvider(address _baseFeeProvider) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseFeeProvider`|`address`|Address of our baseFeeProvider|

### setMaxAcceptableBaseFee

Set the max acceptable base fee.

*This defaults to max uint256 and will need to
be set for it to be used.
Is denominated in gwei. So 50gwei would be set as 50e9.*

```solidity
function setMaxAcceptableBaseFee(uint256 _maxAcceptableBaseFee) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxAcceptableBaseFee`|`uint256`|The new max base fee.|

### setKeeper

Set if a keeper can update debt.

```solidity
function setKeeper(address _address, bool _allowed) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_address`|`address`|The address to set mapping for.|
|`_allowed`|`bool`|If the address can call [update_debt](#update_debt).|

### getStrategyConfig

Get a strategies full config.

*Used for customizations by inheriting the contract.*

```solidity
function getStrategyConfig(address _vault, address _strategy) public view virtual returns (StrategyConfig memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`StrategyConfig`|The strategies current Config.|

### getVaultConfig

Get a vaults full config.

*Used for customizations by inheriting the contract.*

```solidity
function getVaultConfig(address _vault) public view virtual returns (VaultConfig memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`VaultConfig`|The vaults current Config.|

### totalDebtRatio

Get a vaults current total debt.

```solidity
function totalDebtRatio(address _vault) external view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|

### minimumChange

Get a vaults minimum change required.

```solidity
function minimumChange(address _vault) external view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|

### isPaused

Get the paused status of a vault

```solidity
function isPaused(address _vault) public view virtual returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|

### getStrategyTargetRatio

Get a strategies target debt ratio.

```solidity
function getStrategyTargetRatio(address _vault, address _strategy) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The strategies current targetRatio.|

### getStrategyMaxRatio

Get a strategies max debt ratio.

```solidity
function getStrategyMaxRatio(address _vault, address _strategy) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The strategies current maxRatio.|

### isCurrentBaseFeeAcceptable

Returns whether or not the current base fee is acceptable
based on the `maxAcceptableBaseFee`.

```solidity
function isCurrentBaseFeeAcceptable() public view virtual returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. If the current base fee is acceptable.|

## Events

### UpdatedBaseFeeProvider

An event emitted when the base fee provider is set.

```solidity
event UpdatedBaseFeeProvider(address baseFeeProvider);
```

### UpdateKeeper

An event emitted when a keeper is added or removed.

```solidity
event UpdateKeeper(address indexed keeper, bool allowed);
```

### UpdateMaxAcceptableBaseFee

An event emitted when the max base fee is updated.

```solidity
event UpdateMaxAcceptableBaseFee(uint256 newMaxAcceptableBaseFee);
```

### UpdateStrategyDebtRatio

An event emitted when a strategies debt ratios are Updated.

```solidity
event UpdateStrategyDebtRatio(
    address indexed vault,
    address indexed strategy,
    uint256 newTargetRatio,
    uint256 newMaxRatio,
    uint256 newTotalDebtRatio
);
```

### StrategyChanged

An event emitted when a strategy is added or removed.

```solidity
event StrategyChanged(address indexed vault, address indexed strategy, Status status);
```

### UpdateMinimumChange

An event emitted when the minimum change is updated.

```solidity
event UpdateMinimumChange(address indexed vault, uint256 newMinimumChange);
```

### UpdatePaused

An even emitted when the paused status is updated.

```solidity
event UpdatePaused(address indexed vault, bool indexed status);
```

### UpdateMinimumWait

An event emitted when the minimum time to wait is updated.

```solidity
event UpdateMinimumWait(uint256 newMinimumWait);
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

### StrategyConfig

Struct for each strategies info.

```solidity
struct StrategyConfig {
    bool added;
    uint16 targetRatio;
    uint16 maxRatio;
    uint96 lastUpdate;
    uint120 open;
}
```

### VaultConfig

Struct to hold the vault's info.

```solidity
struct VaultConfig {
    bool paused;
    uint128 minimumChange;
    uint16 totalDebtRatio;
}
```

### StrategyDebtInfo

Used during the `shouldUpdateDebt` to hold the data.

```solidity
struct StrategyDebtInfo {
    VaultConfig vaultConfig;
    StrategyConfig strategyConfig;
    uint256 vaultAssets;
    uint256 targetDebt;
    uint256 maxDebt;
    uint256 currentIdle;
    uint256 minIdle;
    uint256 toChange;
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
