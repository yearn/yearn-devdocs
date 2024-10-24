<!-- markdownlint-disable MD024 MD034 MD036 -->
# CommonReportTrigger

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/f139be6286cb3d630b0bce6d6db812c709e5bb47/src/ReportTrigger/CommonReportTrigger.sol)

**Inherits:**
[Governance](https://github.com/yearn/tokenized-strategy-periphery/blob/f139be6286cb3d630b0bce6d6db812c709e5bb47/src/utils/Governance.sol)

**Author:**
Yearn.finance

*This is a central contract that keepers can use
to decide if Yearn V3 strategies should report profits as
well as when a V3 Vaults should record a strategies profits.
It allows for a simple default flow that most strategies
and vaults can use for easy integration with a keeper network.
However, it is also customizable by the strategy and vaults
management to allow complete customization if desired.*

## State Variables

### name

```solidity
string public name = "Yearn Common Report Trigger";
```

### baseFeeProvider

```solidity
address public baseFeeProvider;
```

### acceptableBaseFee

```solidity
uint256 public acceptableBaseFee;
```

### customStrategyTrigger

```solidity
mapping(address => address) public customStrategyTrigger;
```

### customStrategyBaseFee

```solidity
mapping(address => uint256) public customStrategyBaseFee;
```

### customVaultTrigger

```solidity
mapping(address => mapping(address => address)) public customVaultTrigger;
```

### customVaultBaseFee

```solidity
mapping(address => mapping(address => uint256)) public customVaultBaseFee;
```

## Functions

### constructor

```solidity
constructor(address _governance) Governance(_governance);
```

### setCustomStrategyTrigger

Set a custom report trigger contract for a strategy.

*This gives the `management` of a specific strategy the option
to enforce a custom report trigger for their strategy easily while
still using this standard contract for keepers to read the trigger
status from.
The custom trigger contract only needs to implement the `reportTrigger`
function to return true or false.*

```solidity
function setCustomStrategyTrigger(address _strategy, address _trigger) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|The address of the strategy to set the trigger for.|
|`_trigger`|`address`|The address of the custom trigger contract.|

### setCustomStrategyBaseFee

Set a custom base fee for a specific strategy.

*This can be set by a strategies `management` to increase or
decrease the acceptable network base fee for a specific strategies
trigger to return true.
This can be used instead of a custom trigger contract.
This will have no effect if a custom trigger is set for the strategy.*

```solidity
function setCustomStrategyBaseFee(address _strategy, uint256 _baseFee) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|The address of the strategy to customize.|
|`_baseFee`|`uint256`|The max acceptable network base fee.|

### setCustomVaultTrigger

Set a custom report trigger contract for a vaults strategy.

*This gives the management of a vault the option to enforce a
custom report trigger for a specific strategy attached to the vault
while still using this standard contract for keepers to read the
trigger status from.
The address calling must have the `REPORTING_MANAGER` role on the vault.
The custom trigger contract only needs to implement the `reportTrigger`
function to return true or false.*

```solidity
function setCustomVaultTrigger(address _vault, address _strategy, address _trigger) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault|
|`_strategy`|`address`|The address of the strategy to set the trigger for.|
|`_trigger`|`address`|The address of the custom trigger contract.|

### setCustomVaultBaseFee

Set a custom base fee for a vaults strategy.

*This can be set by the vaults management to increase or
decrease the acceptable network base fee for a specific strategies
trigger to return true.
This can be used instead of a custom trigger contract.
This will have no effect if a custom trigger is set for the strategy.
The address calling must have the `REPORTING_MANAGER` role on the vault.*

```solidity
function setCustomVaultBaseFee(address _vault, address _strategy, uint256 _baseFee) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault.|
|`_strategy`|`address`|The address of the strategy to customize.|
|`_baseFee`|`uint256`|The max acceptable network base fee.|

### strategyReportTrigger

Returns wether or not a strategy is ready for a keeper to call `report`.

*Will first check if a custom trigger is set. If not it will use
the default trigger flow.*

```solidity
function strategyReportTrigger(address _strategy) external view virtual returns (bool, bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|The address of the strategy to check the trigger for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Bool representing if the strategy is ready to report.|
|`<none>`|`bytes`|. Bytes with either the calldata or reason why False.|

### defaultStrategyReportTrigger

The default trigger logic for a strategy.

*This is kept in a separate function so it can still
be used by custom triggers even if extra checks are needed
first or after.
This will also check if a custom acceptable base fee has been set
by the strategies management.
In order for the default flow to return true the strategy must:

1. Not be shutdown.
2. Have funds.
3. The current network base fee be below the `acceptableBaseFee`.
4. The time since the last report be > the strategies `profitMaxUnlockTime`.*

```solidity
function defaultStrategyReportTrigger(address _strategy) public view virtual returns (bool, bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|The address of the strategy to check the trigger for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Bool representing if the strategy is ready to report.|
|`<none>`|`bytes`|. Bytes with either the calldata or reason why False.|

### vaultReportTrigger

Return wether or not a report should be called on a vault for
a specific strategy.

*Will first check if a custom trigger is set. If not it will use
the default trigger flow.*

```solidity
function vaultReportTrigger(address _vault, address _strategy) external view virtual returns (bool, bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault.|
|`_strategy`|`address`|The address of the strategy to report.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Bool if the strategy should report to the vault.|
|`<none>`|`bytes`|. Bytes with either the calldata or reason why False.|

### defaultVaultReportTrigger

The default trigger logic for a vault.

*This is kept in a separate function so it can still
be used by custom triggers even if extra checks are needed
before or after.
This will also check if a custom acceptable base fee has been set
by the vault management for the `_strategy`.
In order for the default flow to return true:

1. The vault must not be shutdown.
2. The strategy must be active and have debt allocated.
3. The current network base fee be below the `acceptableBaseFee`.
4. The time since the strategies last report be > the vaults `profitMaxUnlockTime`.*

```solidity
function defaultVaultReportTrigger(address _vault, address _strategy)
    public
    view
    virtual
    returns (bool, bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault.|
|`_strategy`|`address`|The address of the strategy to report.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Bool if the strategy should report to the vault.|
|`<none>`|`bytes`|. Bytes with either the calldata or reason why False.|

### strategyTendTrigger

Return whether or not a strategy should be tended by a keeper.

*This can be used as an easy keeper integration for any strategy that
implements a tendTrigger.
It is expected that a strategy implement all needed checks such as
isShutdown, totalAssets > 0 and base fee checks within the trigger.*

```solidity
function strategyTendTrigger(address _strategy) external view virtual returns (bool, bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Bool if the strategy should be tended.|
|`<none>`|`bytes`|. Bytes with the calldata.|

### getCurrentBaseFee

Returns the current base fee from the provider.

*Will return 0 if a base fee provider is not set.*

```solidity
function getCurrentBaseFee() public view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The current base fee for the chain.|

### isCurrentBaseFeeAcceptable

Returns wether or not the current base fee is acceptable
based on the default `acceptableBaseFee`.

*Can be used in custom triggers to easily still use this contracts
fee provider and acceptableBaseFee. And makes it backwards compatible to V2.
Will always return `true` if no `baseFeeProvider` is set.*

```solidity
function isCurrentBaseFeeAcceptable() external view virtual returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. IF the current base fee is acceptable.|

### setBaseFeeProvider

Sets the address used to pull the current network base fee.

*Throws if the caller is not current governance.*

```solidity
function setBaseFeeProvider(address _baseFeeProvider) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseFeeProvider`|`address`|The network's baseFeeProvider address.|

### setAcceptableBaseFee

Sets the default acceptable current network base fee.

*Throws if the caller is not current governance.*

```solidity
function setAcceptableBaseFee(uint256 _newAcceptableBaseFee) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newAcceptableBaseFee`|`uint256`|The acceptable network base fee.|

## Events

### NewBaseFeeProvider

```solidity
event NewBaseFeeProvider(address indexed provider);
```

### UpdatedAcceptableBaseFee

```solidity
event UpdatedAcceptableBaseFee(uint256 acceptableBaseFee);
```

### UpdatedCustomStrategyTrigger

```solidity
event UpdatedCustomStrategyTrigger(address indexed strategy, address indexed trigger);
```

### UpdatedCustomStrategyBaseFee

```solidity
event UpdatedCustomStrategyBaseFee(address indexed strategy, uint256 acceptableBaseFee);
```

### UpdatedCustomVaultTrigger

```solidity
event UpdatedCustomVaultTrigger(address indexed vault, address indexed strategy, address indexed trigger);
```

### UpdatedCustomVaultBaseFee

```solidity
event UpdatedCustomVaultBaseFee(address indexed vault, address indexed strategy, uint256 acceptableBaseFee);
```
