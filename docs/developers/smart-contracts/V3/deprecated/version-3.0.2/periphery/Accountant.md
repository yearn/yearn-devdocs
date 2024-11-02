# Accountant.sol

[Git Source](https://github.com/yearn/vault-periphery/blob/master/contracts/accountants/Accountant.sol)

*Will charge fees, issue refunds, and run health check on any reported
gains or losses during a strategy's report.*

## State Variables

### MAX_BPS

Constant defining the maximum basis points.

```solidity
uint256 internal constant MAX_BPS = 10_000;
```

### SECS_PER_YEAR

Constant defining the number of seconds in a year.

```solidity
uint256 internal constant SECS_PER_YEAR = 31_556_952;
```

### MANAGEMENT_FEE_THRESHOLD

Constant defining the management fee threshold.

```solidity
uint16 public constant MANAGEMENT_FEE_THRESHOLD = 200;
```

### PERFORMANCE_FEE_THRESHOLD

Constant defining the performance fee threshold.

```solidity
uint16 public constant PERFORMANCE_FEE_THRESHOLD = 5_000;
```

### maxLoss

The amount of max loss to use when redeeming from vaults.

```solidity
uint256 public maxLoss;
```

### feeManager

The address of the fee manager.

```solidity
address public feeManager;
```

### feeRecipient

The address of the fee recipient.

```solidity
address public feeRecipient;
```

### vaultManager

An address that can add or remove vaults.

```solidity
address public vaultManager;
```

### futureFeeManager

The address of the future fee manager.

```solidity
address public futureFeeManager;
```

### defaultConfig

The default fee configuration.

```solidity
Fee public defaultConfig;
```

### vaults

Mapping to track added vaults.

```solidity
mapping(address => bool) public vaults;
```

### customConfig

Mapping vault => custom Fee config if any.

```solidity
mapping(address => Fee) public customConfig;
```

### skipHealthCheck

Mapping vault => strategy => flag for one time healthcheck skips.

```solidity
mapping(address => mapping(address => bool)) skipHealthCheck;
```

## Functions

### onlyFeeManager

```solidity
modifier onlyFeeManager();
```

### onlyVaultOrFeeManager

```solidity
modifier onlyVaultOrFeeManager();
```

### onlyFeeManagerOrRecipient

```solidity
modifier onlyFeeManagerOrRecipient();
```

### onlyAddedVaults

```solidity
modifier onlyAddedVaults();
```

### _checkFeeManager

```solidity
function _checkFeeManager() internal view virtual;
```

### _checkVaultOrFeeManager

```solidity
function _checkVaultOrFeeManager() internal view virtual;
```

### _checkFeeManagerOrRecipient

```solidity
function _checkFeeManagerOrRecipient() internal view virtual;
```

### _checkVaultIsAdded

```solidity
function _checkVaultIsAdded() internal view virtual;
```

### constructor

```solidity
constructor(
    address _feeManager,
    address _feeRecipient,
    uint16 defaultManagement,
    uint16 defaultPerformance,
    uint16 defaultRefund,
    uint16 defaultMaxFee,
    uint16 defaultMaxGain,
    uint16 defaultMaxLoss
);
```

### report

Called by a vault when a `strategy` is reporting.

*The msg.sender must have been added to the `vaults` mapping.*

```solidity
function report(address strategy, uint256 gain, uint256 loss)
    public
    virtual
    onlyAddedVaults
    returns (uint256 totalFees, uint256 totalRefunds);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`strategy`|`address`|Address of the strategy reporting.|
|`gain`|`uint256`|Amount of the gain if any.|
|`loss`|`uint256`|Amount of the loss if any.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalFees`|`uint256`|if any to charge.|
|`totalRefunds`|`uint256`|if any for the vault to pull.|

### addVault

Function to add a new vault for this accountant to charge fees for.

*This is not used to set any of the fees for the specific vault or strategy. Each fee will be set separately.*

```solidity
function addVault(address vault) external virtual onlyVaultOrFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of a vault to allow to use this accountant.|

### removeVault

Function to remove a vault from this accountant's fee charging list.

```solidity
function removeVault(address vault) external virtual onlyVaultOrFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault to be removed from this accountant.|

### updateDefaultConfig

Function to update the default fee configuration used for
all strategies that don't have a custom config set.

```solidity
function updateDefaultConfig(
    uint16 defaultManagement,
    uint16 defaultPerformance,
    uint16 defaultRefund,
    uint16 defaultMaxFee,
    uint16 defaultMaxGain,
    uint16 defaultMaxLoss
) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`defaultManagement`|`uint16`|Default annual management fee to charge.|
|`defaultPerformance`|`uint16`|Default performance fee to charge.|
|`defaultRefund`|`uint16`|Default refund ratio to give back on losses.|
|`defaultMaxFee`|`uint16`|Default max fee to allow as a percent of gain.|
|`defaultMaxGain`|`uint16`|Default max percent gain a strategy can report.|
|`defaultMaxLoss`|`uint16`|Default max percent loss a strategy can report.|

### _updateDefaultConfig

*Updates the Accountant's default fee config.
Is used during deployment and during any future updates.*

```solidity
function _updateDefaultConfig(
    uint16 defaultManagement,
    uint16 defaultPerformance,
    uint16 defaultRefund,
    uint16 defaultMaxFee,
    uint16 defaultMaxGain,
    uint16 defaultMaxLoss
) internal virtual;
```

### setCustomConfig

Function to set a custom fee configuration for a specific vault.

```solidity
function setCustomConfig(
    address vault,
    uint16 customManagement,
    uint16 customPerformance,
    uint16 customRefund,
    uint16 customMaxFee,
    uint16 customMaxGain,
    uint16 customMaxLoss
) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The vault the strategy is hooked up to.|
|`customManagement`|`uint16`|Custom annual management fee to charge.|
|`customPerformance`|`uint16`|Custom performance fee to charge.|
|`customRefund`|`uint16`|Custom refund ratio to give back on losses.|
|`customMaxFee`|`uint16`|Custom max fee to allow as a percent of gain.|
|`customMaxGain`|`uint16`|Custom max percent gain a strategy can report.|
|`customMaxLoss`|`uint16`|Custom max percent loss a strategy can report.|

### removeCustomConfig

Function to remove a previously set custom fee configuration for a vault.

```solidity
function removeCustomConfig(address vault) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The vault to remove custom setting for.|

### turnOffHealthCheck

Turn off the health check for a specific `vault` `strategy` combo.

*This will only last for one report and get automatically turned back on.*

```solidity
function turnOffHealthCheck(address vault, address strategy) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|Address of the vault.|
|`strategy`|`address`|Address of the strategy.|

### useCustomConfig

Public getter to check for custom setting.

*We use uint256 for the flag since its cheaper so this
will convert it to a bool for easy view functions.*

```solidity
function useCustomConfig(address vault) external view virtual returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|Address of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|If a custom fee config is set.|

### getVaultConfig

Get the full config used for a specific `vault`.

```solidity
function getVaultConfig(address vault) external view returns (Fee memory fee);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|Address of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`Fee`|The config that would be used during the report.|

### redeemUnderlying

Function to redeem the underlying asset from a vault.

*Will default to using the full balance of the vault.*

```solidity
function redeemUnderlying(address vault) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The vault to redeem from.|

### redeemUnderlying

Function to redeem the underlying asset from a vault.

```solidity
function redeemUnderlying(address vault, uint256 amount) public virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The vault to redeem from.|
|`amount`|`uint256`|The amount in vault shares to redeem.|

### setMaxLoss

Sets the `maxLoss` parameter to be used on redeems.

```solidity
function setMaxLoss(uint256 _maxLoss) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxLoss`|`uint256`|The amount in basis points to set as the maximum loss.|

### distribute

Function to distribute all accumulated fees to the designated recipient.

```solidity
function distribute(address token) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The token to distribute.|

### distribute

Function to distribute accumulated fees to the designated recipient.

```solidity
function distribute(address token, uint256 amount) public virtual onlyFeeManagerOrRecipient;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The token to distribute.|
|`amount`|`uint256`|amount of token to distribute.|

### setFutureFeeManager

Function to set a future fee manager address.

```solidity
function setFutureFeeManager(address _futureFeeManager) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_futureFeeManager`|`address`|The address to set as the future fee manager.|

### acceptFeeManager

Function to accept the role change and become the new fee manager.

*This function allows the future fee manager to accept the role change and become the new fee manager.*

```solidity
function acceptFeeManager() external virtual;
```

### setVaultManager

Function to set a new vault manager.

```solidity
function setVaultManager(address newVaultManager) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newVaultManager`|`address`|Address to add or remove vaults.|

### setFeeRecipient

Function to set a new address to receive distributed rewards.

```solidity
function setFeeRecipient(address newFeeRecipient) external virtual onlyFeeManager;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFeeRecipient`|`address`|Address to receive distributed fees.|

### _checkAllowance

*Internal safe function to make sure the contract you want to
interact with has enough allowance to pull the desired tokens.*

```solidity
function _checkAllowance(address _contract, address _token, uint256 _amount) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_contract`|`address`|The address of the contract that will move the token.|
|`_token`|`address`|The ERC-20 token that will be getting spent.|
|`_amount`|`uint256`|The amount of `_token` to be spent.|

## Events

### VaultChanged

An event emitted when a vault is added or removed.

```solidity
event VaultChanged(address indexed vault, ChangeType change);
```

### UpdateDefaultFeeConfig

An event emitted when the default fee configuration is updated.

```solidity
event UpdateDefaultFeeConfig(Fee defaultFeeConfig);
```

### SetFutureFeeManager

An event emitted when the future fee manager is set.

```solidity
event SetFutureFeeManager(address indexed futureFeeManager);
```

### NewFeeManager

An event emitted when a new fee manager is accepted.

```solidity
event NewFeeManager(address indexed feeManager);
```

### UpdateVaultManager

An event emitted when a new vault manager is set.

```solidity
event UpdateVaultManager(address indexed newVaultManager);
```

### UpdateFeeRecipient

An event emitted when the fee recipient is updated.

```solidity
event UpdateFeeRecipient(address indexed oldFeeRecipient, address indexed newFeeRecipient);
```

### UpdateCustomFeeConfig

An event emitted when a custom fee configuration is updated.

```solidity
event UpdateCustomFeeConfig(address indexed vault, Fee custom_config);
```

### RemovedCustomFeeConfig

An event emitted when a custom fee configuration is removed.

```solidity
event RemovedCustomFeeConfig(address indexed vault);
```

### UpdateMaxLoss

An event emitted when the `maxLoss` parameter is updated.

```solidity
event UpdateMaxLoss(uint256 maxLoss);
```

### DistributeRewards

An event emitted when rewards are distributed.

```solidity
event DistributeRewards(address indexed token, uint256 rewards);
```

## Structs

### Fee

Struct representing fee details.

```solidity
struct Fee {
    uint16 managementFee;
    uint16 performanceFee;
    uint16 refundRatio;
    uint16 maxFee;
    uint16 maxGain;
    uint16 maxLoss;
    bool custom;
}
```

## Enums

### ChangeType

Enum defining change types (added or removed).

```solidity
enum ChangeType {
    NULL,
    ADDED,
    REMOVED
}
```
