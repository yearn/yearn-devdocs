<!-- markdownlint-disable MD024 MD034 MD036 -->
# AprOracle

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/f139be6286cb3d630b0bce6d6db812c709e5bb47/src/AprOracle/AprOracle.sol)

**Inherits:**
[Governance](https://github.com/yearn/tokenized-strategy-periphery/blob/f139be6286cb3d630b0bce6d6db812c709e5bb47/src/utils/Governance.sol)

**Author:**
Yearn.finance

*Contract to easily retrieve the APR's of V3 vaults and
strategies.
Can be used to check the current APR of any vault or strategy
based on the current profit unlocking rate. As well as the
expected APR given some change in totalAssets.
This can also be used to retrieve the expected APR a strategy
is making, thats yet to be reported, if a strategy specific
oracle has been added.
NOTE: All values are just at the specific time called and subject
to change.*

## State Variables

### oracles

```solidity
mapping(address => address) public oracles;
```

### MAX_BPS

```solidity
uint256 internal constant MAX_BPS = 10_000;
```

### MAX_BPS_EXTENDED

```solidity
uint256 internal constant MAX_BPS_EXTENDED = 1_000_000_000_000;
```

### SECONDS_PER_YEAR

```solidity
uint256 internal constant SECONDS_PER_YEAR = 31_556_952;
```

### LEGACY_ORACLE

```solidity
address internal constant LEGACY_ORACLE = 0x27aD2fFc74F74Ed27e1C0A19F1858dD0963277aE;
```

## Functions

### constructor

```solidity
constructor(address _governance) Governance(_governance);
```

### getStrategyApr

Get the current APR a strategy is earning.

*Will revert if an oracle has not been set for that strategy.
This will be different than the `getExpectedApr()` which returns
the current APR based off of previously reported profits that
are currently unlocking.
This will return the APR the strategy is currently earning that
has yet to be reported.*

```solidity
function getStrategyApr(address _strategy, int256 _debtChange) public view virtual returns (uint256 apr);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy to check.|
|`_debtChange`|`int256`|Positive or negative change in debt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`apr`|`uint256`|The expected APR it will be earning represented as 1e18.|

### setOracle

Set a custom APR `_oracle` for a `_strategy`.

*Can only be called by the Apr Oracle's `governance` or
management of the `_strategy`.
The `_oracle` will need to implement the IOracle interface.*

```solidity
function setOracle(address _strategy, address _oracle) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy.|
|`_oracle`|`address`|Address of the APR Oracle.|

### getCurrentApr

Get the current APR for a V3 vault or strategy.

*This returns the current APR based off the current
rate of profit unlocking for either a vault or strategy.
Will return 0 if there is no profit unlocking or no assets.*

```solidity
function getCurrentApr(address _vault) external view virtual returns (uint256 apr);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault or strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`apr`|`uint256`|The current apr expressed as 1e18.|

### getExpectedApr

Get the expected APR for a V3 vault or strategy based on `_delta`.

*This returns the expected APR based off the current
rate of profit unlocking for either a vault or strategy
given some change in the total assets.
Will return 0 if there is no profit unlocking or no assets.
This can be used to predict the change in current apr given some
deposit or withdraw to the vault.*

```solidity
function getExpectedApr(address _vault, int256 _delta) public view virtual returns (uint256 apr);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault or strategy.|
|`_delta`|`int256`|The positive or negative change in `totalAssets`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`apr`|`uint256`|The expected apr expressed as 1e18.|

### getWeightedAverageApr

Get the current weighted average APR for a V3 vault.

*This is the sum of all the current APR's of the strategies in the vault.*

```solidity
function getWeightedAverageApr(address _vault, int256 _delta) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault.|
|`_delta`|`int256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|apr The weighted average apr expressed as 1e18.|
