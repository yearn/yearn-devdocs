# AprOracle

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/AprOracle/AprOracle.sol)

**Inherits:**
[Governance](/Governance)

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

### MAX_BPS_EXTENDED

```solidity
uint256 internal constant MAX_BPS_EXTENDED = 1_000_000_000_000;
```

### SECONDS_PER_YEAR

```solidity
uint256 internal constant SECONDS_PER_YEAR = 31_556_952;
```

## Functions

### constructor

```solidity
constructor(address _governance) Governance(_governance);
```

### getStrategyApr

Get the current APR a strategy is earning.

*Will revert if an oracle has not been set for that strategy.
This will be different than the [getExpectedApr](#getexpectedapr) which returns
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

### weightedApr

Get the current weighted APR of a strategy.

*Gives the apr weighted by its `totalAssets`. This can be used
to get the combined expected return of a collection of strategies.*

```solidity
function weightedApr(address _strategy) external view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_strategy`|`address`|Address of the strategy.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The current weighted APR of the strategy.|

### setOracle

Set a custom APR `_oracle` for a `_strategy`.

*Can only be called by the oracle's `governance` or
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
