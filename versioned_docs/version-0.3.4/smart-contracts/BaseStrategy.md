



## Functions
### apiVersion
```solidity
  function apiVersion(
  ) public returns (string)
```
@notice
 Used to track which version of `StrategyAPI` this Strategy
 implements.

The Strategy's version must match the Vault's `API_VERSION`.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`A`|  | string which holds the current API version of this contract.
### name
```solidity
  function name(
  ) external returns (string)
```
This Strategy's name.
@dev
 You can use this field to manage the "version" of this Strategy, e.g.
 `StrategySomethingOrOtherV1`. However, "API Version" is managed by
 `apiVersion()` function above.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`This`|  | Strategy's name.
### delegatedAssets
```solidity
  function delegatedAssets(
  ) external returns (uint256)
```
@notice
 The amount (priced in want) of the total assets managed by this strategy should not count
 towards Yearn's TVL calculations.
@dev
 You can override this field to set it to a non-zero value if some of the assets of this
 Strategy is somehow delegated inside another part of of Yearn's ecosystem e.g. another Vault.
 Note that this value must be strictly less than or equal to the amount provided by
 `estimatedTotalAssets()` below, as the TVL calc will be total assets minus delegated assets.
 Also note that this value is used to determine the total assets under management by this
 strategy, for the purposes of computing the management fee in `Vault`
@return
 The amount of assets this strategy manages that should not be included in Yearn's Total Value
 Locked (TVL) calculation across it's ecosystem.



### constructor
```solidity
  function constructor(
  ) public
```




### _initialize
```solidity
  function _initialize(
    address _vault
  ) internal
```
@notice
 Initializes the Strategy, this is called only once, when the
 contract is deployed.

`_vault` should implement `VaultAPI`.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_vault` | address | The address of the Vault responsible for this Strategy.

### setStrategist
```solidity
  function setStrategist(
    address _strategist
  ) external
```
@notice
 Used to change `strategist`.

 This may only be called by governance or the existing strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_strategist` | address | The new address to assign as `strategist`.

### setKeeper
```solidity
  function setKeeper(
    address _keeper
  ) external
```
@notice
 Used to change `keeper`.

 `keeper` is the only address that may call `tend()` or `harvest()`,
 other than `governance()` or `strategist`. However, unlike
 `governance()` or `strategist`, `keeper` may *only* call `tend()`
 and `harvest()`, and no other authorized functions, following the
 principle of least privilege.

 This may only be called by governance or the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_keeper` | address | The new address to assign as `keeper`.

### setRewards
```solidity
  function setRewards(
    address _rewards
  ) external
```
@notice
 Used to change `rewards`. EOA or smart contract which has the permission
 to pull rewards from the vault.

 This may only be called by the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_rewards` | address | The address to use for pulling rewards.

### setMinReportDelay
```solidity
  function setMinReportDelay(
    uint256 _delay
  ) external
```
@notice
 Used to change `minReportDelay`. `minReportDelay` is the minimum number
 of blocks that should pass for `harvest()` to be called.

 For external keepers (such as the Keep3r network), this is the minimum
 time between jobs to wait. (see `harvestTrigger()`
 for more details.)

 This may only be called by governance or the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delay` | uint256 | The minimum number of seconds to wait between harvests.

### setMaxReportDelay
```solidity
  function setMaxReportDelay(
    uint256 _delay
  ) external
```
@notice
 Used to change `maxReportDelay`. `maxReportDelay` is the maximum number
 of blocks that should pass for `harvest()` to be called.

 For external keepers (such as the Keep3r network), this is the maximum
 time between jobs to wait. (see `harvestTrigger()`
 for more details.)

 This may only be called by governance or the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delay` | uint256 | The maximum number of seconds to wait between harvests.

### setProfitFactor
```solidity
  function setProfitFactor(
    uint256 _profitFactor
  ) external
```
@notice
 Used to change `profitFactor`. `profitFactor` is used to determine
 if it's worthwhile to harvest, given gas costs. (See `harvestTrigger()`
 for more details.)

 This may only be called by governance or the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_profitFactor` | uint256 | A ratio to multiply anticipated
`harvest()` gas cost against.

### setDebtThreshold
```solidity
  function setDebtThreshold(
    uint256 _debtThreshold
  ) external
```
@notice
 Sets how far the Strategy can go into loss without a harvest and report
 being required.

 By default this is 0, meaning any losses would cause a harvest which
 will subsequently report the loss to the Vault for tracking. (See
 `harvestTrigger()` for more details.)

 This may only be called by governance or the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_debtThreshold` | uint256 | How big of a loss this Strategy may carry without
being required to report to the Vault.

### setMetadataURI
```solidity
  function setMetadataURI(
    string _metadataURI
  ) external
```
@notice
 Used to change `metadataURI`. `metadataURI` is used to store the URI
of the file describing the strategy.

 This may only be called by governance or the strategist.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_metadataURI` | string | The URI that describe the strategy.

### governance
```solidity
  function governance(
  ) internal returns (address)
```
Resolve governance address from Vault contract, used to make assertions
on protected functions in the Strategy.



### estimatedTotalAssets
```solidity
  function estimatedTotalAssets(
  ) public returns (uint256)
```
@notice
 Provide an accurate estimate for the total amount of assets
 (principle + return) that this Strategy is currently managing,
 denominated in terms of `want` tokens.

 This total should be "realizable" e.g. the total value that could
 *actually* be obtained from this Strategy if it were to divest its
 entire position based on current on-chain conditions.
@dev
 Care must be taken in using this function, since it relies on external
 systems, which could be manipulated by the attacker to give an inflated
 (or reduced) value produced by this function, based on current on-chain
 conditions (e.g. this function is possible to influence through
 flashloan attacks, oracle manipulations, or other DeFi attack
 mechanisms).

 It is up to governance to use this function to correctly order this
 Strategy relative to its peers in the withdrawal queue to minimize
 losses for the Vault based on sudden withdrawals. This value should be
 higher than the total debt of the Strategy and higher than its expected
 value to be "safe".



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | estimated total assets in this Strategy.
### isActive
```solidity
  function isActive(
  ) public returns (bool)
```




### prepareReturn
```solidity
  function prepareReturn(
  ) internal returns (uint256 _profit, uint256 _loss, uint256 _debtPayment)
```
Perform any Strategy unwinding or other calls necessary to capture the
"free return" this Strategy has generated since the last time its core
position(s) were adjusted. Examples include unwrapping extra rewards.
This call is only used during "normal operation" of a Strategy, and
should be optimized to minimize losses as much as possible.

This method returns any realized profits and/or realized losses
incurred, and should return the total amounts of profits/losses/debt
payments (in `want` tokens) for the Vault's accounting (e.g.
`want.balanceOf(this) >= _debtPayment + _profit - _loss`).

`_debtOutstanding` will be 0 if the Strategy is not past the configured
debt limit, otherwise its value will be how far past the debt limit
the Strategy is. The Strategy's debt limit is configured in the Vault.

NOTE: `_debtPayment` should be less than or equal to `_debtOutstanding`.
      It is okay for it to be less than `_debtOutstanding`, as that
      should only used as a guide for how much is left to pay back.
      Payments should be made to minimize loss from slippage, debt,
      withdrawal fees, etc.

See `vault.debtOutstanding()`.



### adjustPosition
```solidity
  function adjustPosition(
  ) internal
```
Perform any adjustments to the core position(s) of this Strategy given
what change the Vault made in the "investable capital" available to the
Strategy. Note that all "free capital" in the Strategy after the report
was made is available for reinvestment. Also note that this number
could be 0, and you should handle that scenario accordingly.

See comments regarding `_debtOutstanding` on `prepareReturn()`.



### liquidatePosition
```solidity
  function liquidatePosition(
  ) internal returns (uint256 _liquidatedAmount, uint256 _loss)
```
Liquidate up to `_amountNeeded` of `want` of this strategy's positions,
irregardless of slippage. Any excess will be re-invested with `adjustPosition()`.
This function should return the amount of `want` tokens made available by the
liquidation. If there is a difference between them, `_loss` indicates whether the
difference is due to a realized loss, or if there is some other sitution at play
(e.g. locked funds) where the amount made available is less than what is needed.
This function is used during emergency exit instead of `prepareReturn()` to
liquidate all of the Strategy's positions back to the Vault.

NOTE: The invariant `_liquidatedAmount + _loss <= _amountNeeded` should always be maintained



### tendTrigger
```solidity
  function tendTrigger(
    uint256 callCost
  ) public returns (bool)
```
@notice
 Provide a signal to the keeper that `tend()` should be called. The
 keeper will provide the estimated gas cost that they would pay to call
 `tend()`, and this function should use that estimate to make a
 determination if calling it is "worth it" for the keeper. This is not
 the only consideration into issuing this trigger, for example if the
 position would be negatively affected if `tend()` is not called
 shortly, then this can return `true` even if the keeper might be
 "at a loss" (keepers are always reimbursed by Yearn).
@dev
 `callCost` must be priced in terms of `want`.

 This call and `harvestTrigger()` should never return `true` at the same
 time.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`callCost` | uint256 | The keeper's estimated cast cost to call `tend()`.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`if`| uint256 | `tend()` should be called, `false` otherwise.
### tend
```solidity
  function tend(
  ) external
```
@notice
 Adjust the Strategy's position. The purpose of tending isn't to
 realize gains, but to maximize yield by reinvesting any returns.

 See comments on `adjustPosition()`.

 This may only be called by governance, the strategist, or the keeper.



### harvestTrigger
```solidity
  function harvestTrigger(
    uint256 callCost
  ) public returns (bool)
```
@notice
 Provide a signal to the keeper that `harvest()` should be called. The
 keeper will provide the estimated gas cost that they would pay to call
 `harvest()`, and this function should use that estimate to make a
 determination if calling it is "worth it" for the keeper. This is not
 the only consideration into issuing this trigger, for example if the
 position would be negatively affected if `harvest()` is not called
 shortly, then this can return `true` even if the keeper might be "at a
 loss" (keepers are always reimbursed by Yearn).
@dev
 `callCost` must be priced in terms of `want`.

 This call and `tendTrigger` should never return `true` at the
 same time.

 See `min/maxReportDelay`, `profitFactor`, `debtThreshold` to adjust the
 strategist-controlled parameters that will influence whether this call
 returns `true` or not. These parameters will be used in conjunction
 with the parameters reported to the Vault (see `params`) to determine
 if calling `harvest()` is merited.

 It is expected that an external system will check `harvestTrigger()`.
 This could be a script run off a desktop or cloud bot (e.g.
 https://github.com/iearn-finance/yearn-vaults/blob/master/scripts/keep.py),
 or via an integration with the Keep3r network (e.g.
 https://github.com/Macarse/GenericKeep3rV2/blob/master/contracts/keep3r/GenericKeep3rV2.sol).


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`callCost` | uint256 | The keeper's estimated cast cost to call `harvest()`.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`if`| uint256 | `harvest()` should be called, `false` otherwise.
### harvest
```solidity
  function harvest(
  ) external
```
@notice
 Harvests the Strategy, recognizing any profits or losses and adjusting
 the Strategy's position.

 In the rare case the Strategy is in emergency shutdown, this will exit
 the Strategy's position.

 This may only be called by governance, the strategist, or the keeper.
@dev
 When `harvest()` is called, the Strategy reports to the Vault (via
 `vault.report()`), so in some cases `harvest()` must be called in order
 to take in profits, to borrow newly available funds from the Vault, or
 otherwise adjust its position. In other cases `harvest()` must be
 called to report to the Vault on the Strategy's position, especially if
 any losses have occurred.



### withdraw
```solidity
  function withdraw(
    uint256 _amountNeeded
  ) external returns (uint256 _loss)
```
@notice
 Withdraws `_amountNeeded` to `vault`.

 This may only be called by the Vault.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_amountNeeded` | uint256 | How much `want` to withdraw.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`_loss`| uint256 | Any realized losses
### prepareMigration
```solidity
  function prepareMigration(
  ) internal
```
Do anything necessary to prepare this Strategy for migration, such as
transferring any reserve or LP tokens, CDPs, or other tokens or stores of
value.



### migrate
```solidity
  function migrate(
    address _newStrategy
  ) external
```
@notice
 Transfers all `want` from this Strategy to `_newStrategy`.

 This may only be called by governance or the Vault.
@dev
 The new Strategy's Vault must be the same as this Strategy's Vault.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newStrategy` | address | The Strategy to migrate to.

### setEmergencyExit
```solidity
  function setEmergencyExit(
  ) external
```
@notice
 Activates emergency exit. Once activated, the Strategy will exit its
 position upon the next harvest, depositing all funds into the Vault as
 quickly as is reasonable given on-chain conditions.

 This may only be called by governance or the strategist.
@dev
 See `vault.setEmergencyShutdown()` and `harvest()` for further details.



### protectedTokens
```solidity
  function protectedTokens(
  ) internal returns (address[])
```
Override this to add all tokens/tokenized positions this contract
manages on a *persistent* basis (e.g. not just for swapping back to
want ephemerally).

NOTE: Do *not* include `want`, already included in `sweep` below.

Example:

   function protectedTokens() internal override view returns (address[] memory) {
     address[] memory protected = new address[](3);
     protected[0] = tokenA;
     protected[1] = tokenB;
     protected[2] = tokenC;
     return protected;
   }



### sweep
```solidity
  function sweep(
    address _token
  ) external
```
@notice
 Removes tokens from this Strategy that are not the type of tokens
 managed by this Strategy. This may be used in case of accidentally
 sending the wrong kind of token to this Strategy.

 Tokens will be sent to `governance()`.

 This will fail if an attempt is made to sweep `want`, or any tokens
 that are protected by this Strategy.

 This may only be called by governance.
@dev
 Implement `protectedTokens()` to specify any additional tokens that
 should be protected from sweeping in addition to `want`.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_token` | address | The token to transfer out of this vault.

## Events
### Harvested
```solidity
  event Harvested(
  )
```



### UpdatedStrategist
```solidity
  event UpdatedStrategist(
  )
```



### UpdatedKeeper
```solidity
  event UpdatedKeeper(
  )
```



### UpdatedRewards
```solidity
  event UpdatedRewards(
  )
```



### UpdatedMinReportDelay
```solidity
  event UpdatedMinReportDelay(
  )
```



### UpdatedMaxReportDelay
```solidity
  event UpdatedMaxReportDelay(
  )
```



### UpdatedProfitFactor
```solidity
  event UpdatedProfitFactor(
  )
```



### UpdatedDebtThreshold
```solidity
  event UpdatedDebtThreshold(
  )
```



### EmergencyExitEnabled
```solidity
  event EmergencyExitEnabled(
  )
```



### UpdatedMetadataURI
```solidity
  event UpdatedMetadataURI(
  )
```



