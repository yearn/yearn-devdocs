<!-- markdownlint-disable MD024 MD036 -->

# VaultV3.vy

vyper: `0.3.7`
author: `yearn.finance`
license: `GNU AGPLv3`

## Yearn V3 Vault**

*The Yearn VaultV3 is designed as a non-opinionated system to distribute funds of depositors for a specific `asset` into different opportunities (aka Strategies) and manage accounting in a robust way. Depositors receive shares (aka vaults tokens) proportional to their deposit amount. Vault tokens are yield-bearing and can be redeemed at any time to get back deposit plus any yield generated. Addresses that are given different permissioned roles by the `role_manager` are then able to allocate funds as they best see fit to different strategies and adjust the strategies and allocations as needed, as well as reporting realized profits or losses. Strategies are any ERC-4626 compliant contracts that use the same underlying `asset` as the vault. The vault provides no assurances as to the safety of any strategy and it is the responsibility of those that hold the corresponding roles to choose and fund strategies that best fit their desired specifications. Those holding vault tokens are able to redeem the tokens for the corresponding amount of underlying asset based on any reported profits or losses since their initial deposit. The vault is built to be customized by the management to be able to fit their specific desired needs. Including the customization of strategies, accountants, ownership etc.*

## Functions

### initialize

Initialize a new vault. Sets the asset, name, symbol, and role manager.

```solidity
function initialize(address,string,string,address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| asset | address | The address of the asset that the vault will accept. |
| name | string | The name of the vault token. |
| symbol | string | The symbol of the vault token. |
| role_manager | address | The address that can add and remove roles to addresses |
| profit_max_unlock_time | uint256 | The amount of time that the profit will be locked for |

### setName

Change the vault name.

*Can only be called by the Role Manager.*

```solidity
function setName(string)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| name | string | The new name for the vault. |

### setSymbol

Change the vault symbol.

*Can only be called by the Role Manager.*

```solidity
function setSymbol(string)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| symbol | string | The new name for the vault. |

### set_accountant

Set the new accountant address.

```solidity
function set_accountant(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_accountant | address | The new accountant address. |

### set_default_queue

Set the new default queue array.

*Will check each strategy to make sure it is active. But will not check that the same strategy is not added twice. maxRedeem and maxWithdraw return values may be inaccurate if a strategy is added twice.*

```solidity
function set_default_queue(address[])
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_default_queue | address[] | The new default queue array. |

### set_use_default_queue

Set a new value for `use_default_queue`.

*If set `True` the default queue will always be used no matter whats passed in.*

```solidity
function set_use_default_queue(bool)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| use_default_queue | bool | new value. |

### set_auto_allocate

Set new value for `auto_allocate`

*If `True` every `deposit` and `mint` call will try and allocate the deposited amount to the strategy at position 0 of the `default_queue` atomically. NOTE: An empty `default_queue` will cause deposits to fail.*

```solidity
function set_auto_allocate(bool)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| auto_allocate | bool | new value. |

### set_deposit_limit

Set the new deposit limit.

*Can not be changed if a deposit_limit_module is set unless the override flag is true or if shutdown.*

```solidity
function set_deposit_limit(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| deposit_limit | uint256 | The new deposit limit. |
| override | unknown | If a `deposit_limit_module` already set should be overridden. |

### set_deposit_limit

*Can not be changed if a deposit_limit_module is set unless the override flag is true or if shutdown.*

```solidity
function set_deposit_limit(uint256,bool)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| deposit_limit | uint256 | The new deposit limit. |
| override | bool | If a `deposit_limit_module` already set should be overridden. |

### set_deposit_limit_module

Set a contract to handle the deposit limit.

*The default `deposit_limit` will need to be set to max uint256 since the module will override it or the override flag must be set to true to set it to max in 1 tx..*

```solidity
function set_deposit_limit_module(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| deposit_limit_module | address | Address of the module. |
| override | unknown | If a `deposit_limit` already set should be overridden. |

### set_deposit_limit_module

*The default `deposit_limit` will need to be set to max uint256 since the module will override it or the override flag must be set to true to set it to max in 1 tx..*

```solidity
function set_deposit_limit_module(address,bool)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| deposit_limit_module | address | Address of the module. |
| override | bool | If a `deposit_limit` already set should be overridden. |

### set_withdraw_limit_module

Set a contract to handle the withdraw limit.

*This will override the default `max_withdraw`.*

```solidity
function set_withdraw_limit_module(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| withdraw_limit_module | address | Address of the module. |

### set_minimum_total_idle

Set the new minimum total idle.

```solidity
function set_minimum_total_idle(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| minimum_total_idle | uint256 | The new minimum total idle. |

### setProfitMaxUnlockTime

Set the new profit max unlock time.

*The time is denominated in seconds and must be less than 1 year. We only need to update locking period if setting to 0, since the current period will use the old rate and on the next report it will be reset with the new unlocking time. Setting to 0 will cause any currently locked profit to instantly unlock and an immediate increase in the vaults Price Per Share.*

```solidity
function setProfitMaxUnlockTime(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_profit_max_unlock_time | uint256 | The new profit max unlock time. |

### set_role

Set the roles for an account.

*This will fully override an accounts current roles so it should include all roles the account should hold.*

```solidity
function set_role(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| account | address | The account to set the role for. |
| role | uint256 | The roles the account should hold. |

### add_role

Add a new role to an address.

*This will add a new role to the account without effecting any of the previously held roles.*

```solidity
function add_role(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| account | address | The account to add a role to. |
| role | uint256 | The new role to add to account. |

### remove_role

Remove a single role from an account.

*This will leave all other roles for the account unchanged.*

```solidity
function remove_role(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| account | address | The account to remove a Role from. |
| role | uint256 | The Role to remove. |

### transfer_role_manager

Step 1 of 2 in order to transfer the role manager to a new address. This will set the future_role_manager. Which will then need to be accepted by the new manager.

```solidity
function transfer_role_manager(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| role_manager | address | The new role manager address. |

### isShutdown

Get if the vault is shutdown.

```solidity
function isShutdown()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bool | Bool representing the shutdown status |

### unlockedShares

Get the amount of shares that have been unlocked.

```solidity
function unlockedShares()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares that are have been unlocked. |

### pricePerShare

Get the price per share (pps) of the vault.

*This value offers limited precision. Integrations that require exact precision should use convertToAssets or convertToShares instead.*

```solidity
function pricePerShare()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The price per share. |

### get_default_queue

Get the full default queue currently set.

```solidity
function get_default_queue()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | address[] | The current default withdrawal queue. |

### process_report

Process the report of a strategy.

```solidity
function process_report(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to process the report for. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The gain and loss of the strategy. |

| _output1 | uint256 |  |

### buy_debt

Used for governance to buy bad debt from the vault.

*This should only ever be used in an emergency in place of force revoking a strategy in order to not report a loss. It allows the DEBT_PURCHASER role to buy the strategies debt for an equal amount of `asset`.*

```solidity
function buy_debt(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to buy the debt for |
| amount | uint256 | The amount of debt to buy from the vault. |

### add_strategy

Add a new strategy.

```solidity
function add_strategy(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_strategy | address | The new strategy to add. |

### add_strategy

```solidity
function add_strategy(address,bool)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_strategy | address | The new strategy to add. |

### revoke_strategy

Revoke a strategy.

```solidity
function revoke_strategy(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to revoke. |

### force_revoke_strategy

Force revoke a strategy.

*The vault will remove the strategy and write off any debt left in it as a loss. This function is a dangerous function as it can force a strategy to take a loss. All possible assets should be removed from the strategy first via update_debt. If a strategy is removed erroneously it can be re-added and the loss will be credited as profit. Fees will apply.*

```solidity
function force_revoke_strategy(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to force revoke. |

### update_max_debt_for_strategy

Update the max debt for a strategy.

```solidity
function update_max_debt_for_strategy(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to update the max debt for. |
| new_max_debt | uint256 | The new max debt for the strategy. |

### update_debt

Update the debt for a strategy.

*Pass max uint256 to allocate as much idle as possible.*

```solidity
function update_debt(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to update the debt for. |
| target_debt | uint256 | The target debt for the strategy. |
| max_loss | unknown | Optional to check realized losses on debt decreases. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of debt added or removed. |

### update_debt

*Pass max uint256 to allocate as much idle as possible.*

```solidity
function update_debt(address,uint256,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The strategy to update the debt for. |
| target_debt | uint256 | The target debt for the strategy. |
| max_loss | uint256 | Optional to check realized losses on debt decreases. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of debt added or removed. |

### deposit

Deposit assets into the vault.

*Pass max uint256 to deposit full asset balance.*

```solidity
function deposit(uint256,address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of assets to deposit. |
| receiver | address | The address to receive the shares. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares minted. |

### mint

Mint shares for the receiver.

```solidity
function mint(uint256,address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to mint. |
| receiver | address | The address to receive the shares. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets deposited. |

### withdraw

Withdraw an amount of asset to `receiver` burning `owner`s shares.

*The default behavior is to not allow any loss.*

```solidity
function withdraw(uint256,address,address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of asset to withdraw. |
| receiver | address | The address to receive the assets. |
| owner | address | The address who&#39;s shares are being burnt. |
| max_loss | unknown | Optional amount of acceptable loss in Basis Points. |
| strategies | unknown | Optional array of strategies to withdraw from. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares actually burnt. |

### withdraw

*The default behavior is to not allow any loss.*

```solidity
function withdraw(uint256,address,address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of asset to withdraw. |
| receiver | address | The address to receive the assets. |
| owner | address | The address who&#39;s shares are being burnt. |
| max_loss | uint256 | Optional amount of acceptable loss in Basis Points. |
| strategies | unknown | Optional array of strategies to withdraw from. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares actually burnt. |

### withdraw

*The default behavior is to not allow any loss.*

```solidity
function withdraw(uint256,address,address,uint256,address[])
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of asset to withdraw. |
| receiver | address | The address to receive the assets. |
| owner | address | The address who&#39;s shares are being burnt. |
| max_loss | uint256 | Optional amount of acceptable loss in Basis Points. |
| strategies | address[] | Optional array of strategies to withdraw from. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares actually burnt. |

### redeem

Redeems an amount of shares of `owners` shares sending funds to `receiver`.

*The default behavior is to allow losses to be realized.*

```solidity
function redeem(uint256,address,address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to burn. |
| receiver | address | The address to receive the assets. |
| owner | address | The address who&#39;s shares are being burnt. |
| max_loss | unknown | Optional amount of acceptable loss in Basis Points. |
| strategies | unknown | Optional array of strategies to withdraw from. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets actually withdrawn. |

### redeem

*The default behavior is to allow losses to be realized.*

```solidity
function redeem(uint256,address,address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to burn. |
| receiver | address | The address to receive the assets. |
| owner | address | The address who&#39;s shares are being burnt. |
| max_loss | uint256 | Optional amount of acceptable loss in Basis Points. |
| strategies | unknown | Optional array of strategies to withdraw from. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets actually withdrawn. |

### redeem

*The default behavior is to allow losses to be realized.*

```solidity
function redeem(uint256,address,address,uint256,address[])
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to burn. |
| receiver | address | The address to receive the assets. |
| owner | address | The address who&#39;s shares are being burnt. |
| max_loss | uint256 | Optional amount of acceptable loss in Basis Points. |
| strategies | address[] | Optional array of strategies to withdraw from. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets actually withdrawn. |

### approve

Approve an address to spend the vault&#39;s shares.

```solidity
function approve(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| spender | address | The address to approve. |
| amount | uint256 | The amount of shares to approve. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bool | True if the approval was successful. |

### transfer

Transfer shares to a receiver.

```solidity
function transfer(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| receiver | address | The address to transfer shares to. |
| amount | uint256 | The amount of shares to transfer. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bool | True if the transfer was successful. |

### transferFrom

Transfer shares from a sender to a receiver.

```solidity
function transferFrom(address,address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| sender | address | The address to transfer shares from. |
| receiver | address | The address to transfer shares to. |
| amount | uint256 | The amount of shares to transfer. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bool | True if the transfer was successful. |

### permit

Approve an address to spend the vault&#39;s shares.

```solidity
function permit(address,address,uint256,uint256,uint8,bytes32,bytes32)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address to approve. |
| spender | address | The address to approve. |
| amount | uint256 | The amount of shares to approve. |
| deadline | uint256 | The deadline for the permit. |
| v | uint8 | The v component of the signature. |
| r | bytes32 | The r component of the signature. |
| s | bytes32 | The s component of the signature. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bool | True if the approval was successful. |

### balanceOf

Get the balance of a user.

```solidity
function balanceOf(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| addr | address | The address to get the balance of. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The balance of the user. |

### totalSupply

Get the total supply of shares.

```solidity
function totalSupply()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The total supply of shares. |

### totalAssets

Get the total assets held by the vault.

```solidity
function totalAssets()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The total assets held by the vault. |

### totalIdle

Get the amount of loose `asset` the vault holds.

```solidity
function totalIdle()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The current total idle. |

### totalDebt

Get the the total amount of funds invested across all strategies.

```solidity
function totalDebt()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The current total debt. |

### convertToShares

Convert an amount of assets to shares.

```solidity
function convertToShares(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of assets to convert. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares. |

### previewDeposit

Preview the amount of shares that would be minted for a deposit.

```solidity
function previewDeposit(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of assets to deposit. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares that would be minted. |

### previewMint

Preview the amount of assets that would be deposited for a mint.

```solidity
function previewMint(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to mint. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets that would be deposited. |

### convertToAssets

Convert an amount of shares to assets.

```solidity
function convertToAssets(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to convert. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets. |

### maxDeposit

Get the maximum amount of assets that can be deposited.

```solidity
function maxDeposit(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| receiver | address | The address that will receive the shares. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of assets that can be deposited. |

### maxMint

Get the maximum amount of shares that can be minted.

```solidity
function maxMint(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| receiver | address | The address that will receive the shares. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of shares that can be minted. |

### maxWithdraw

Get the maximum amount of assets that can be withdrawn.

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

```solidity
function maxWithdraw(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address that owns the shares. |
| max_loss | unknown | Custom max_loss if any. |
| strategies | unknown | Custom strategies queue if any. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of assets that can be withdrawn. |

### maxWithdraw

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

```solidity
function maxWithdraw(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address that owns the shares. |
| max_loss | uint256 | Custom max_loss if any. |
| strategies | unknown | Custom strategies queue if any. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of assets that can be withdrawn. |

### maxWithdraw

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

```solidity
function maxWithdraw(address,uint256,address[])
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address that owns the shares. |
| max_loss | uint256 | Custom max_loss if any. |
| strategies | address[] | Custom strategies queue if any. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of assets that can be withdrawn. |

### maxRedeem

Get the maximum amount of shares that can be redeemed.

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

```solidity
function maxRedeem(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address that owns the shares. |
| max_loss | unknown | Custom max_loss if any. |
| strategies | unknown | Custom strategies queue if any. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of shares that can be redeemed. |

### maxRedeem

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

```solidity
function maxRedeem(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address that owns the shares. |
| max_loss | uint256 | Custom max_loss if any. |
| strategies | unknown | Custom strategies queue if any. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of shares that can be redeemed. |

### maxRedeem

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

```solidity
function maxRedeem(address,uint256,address[])
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| owner | address | The address that owns the shares. |
| max_loss | uint256 | Custom max_loss if any. |
| strategies | address[] | Custom strategies queue if any. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The maximum amount of shares that can be redeemed. |

### previewWithdraw

Preview the amount of shares that would be redeemed for a withdraw.

```solidity
function previewWithdraw(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| assets | uint256 | The amount of assets to withdraw. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of shares that would be redeemed. |

### previewRedeem

Preview the amount of assets that would be withdrawn for a redeem.

```solidity
function previewRedeem(uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| shares | uint256 | The amount of shares to redeem. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The amount of assets that would be withdrawn. |

### FACTORY

Address of the factory that deployed the vault.

*Is used to retrieve the protocol fees.*

```solidity
function FACTORY()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | address | Address of the vault factory. |

### apiVersion

Get the API version of the vault.

```solidity
function apiVersion()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | string | The API version of the vault. |

### assess_share_of_unrealised_losses

Assess the share of unrealised losses that a strategy has.

```solidity
function assess_share_of_unrealised_losses(address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| strategy | address | The address of the strategy. |
| assets_needed | uint256 | The amount of assets needed to be withdrawn. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The share of unrealised losses that the strategy has. |

### profitMaxUnlockTime

Gets the current time profits are set to unlock over.

```solidity
function profitMaxUnlockTime()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The current profit max unlock time. |

### fullProfitUnlockDate

Gets the timestamp at which all profits will be unlocked.

```solidity
function fullProfitUnlockDate()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The full profit unlocking timestamp |

### profitUnlockingRate

The per second rate at which profits are unlocking.

*This is denominated in EXTENDED_BPS decimals.*

```solidity
function profitUnlockingRate()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The current profit unlocking rate. |

### lastProfitUpdate

The timestamp of the last time shares were locked.

```solidity
function lastProfitUpdate()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint256 | The last profit update. |

### DOMAIN_SEPARATOR

Get the domain separator.

```solidity
function DOMAIN_SEPARATOR()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bytes32 | The domain separator. |

### accept_role_manager

Accept the role manager transfer.

```solidity
function accept_role_manager()
```

### shutdown_vault

Shutdown the vault.

```solidity
function shutdown_vault()
```

## Events

### Deposit

| Name | Type | Indexed? |
|------|------|----------|
| sender | address | Yes |
| owner | address | Yes |
| assets | uint256 | No |
| shares | uint256 | No |

### Withdraw

| Name | Type | Indexed? |
|------|------|----------|
| sender | address | Yes |
| receiver | address | Yes |
| owner | address | Yes |
| assets | uint256 | No |
| shares | uint256 | No |

### Transfer

| Name | Type | Indexed? |
|------|------|----------|
| sender | address | Yes |
| receiver | address | Yes |
| value | uint256 | No |

### Approval

| Name | Type | Indexed? |
|------|------|----------|
| owner | address | Yes |
| spender | address | Yes |
| value | uint256 | No |

### StrategyChanged

| Name | Type | Indexed? |
|------|------|----------|
| strategy | address | Yes |
| change_type | uint256 | Yes |

### StrategyReported

| Name | Type | Indexed? |
|------|------|----------|
| strategy | address | Yes |
| gain | uint256 | No |
| loss | uint256 | No |
| current_debt | uint256 | No |
| protocol_fees | uint256 | No |
| total_fees | uint256 | No |
| total_refunds | uint256 | No |

### DebtUpdated

| Name | Type | Indexed? |
|------|------|----------|
| strategy | address | Yes |
| current_debt | uint256 | No |
| new_debt | uint256 | No |

### RoleSet

| Name | Type | Indexed? |
|------|------|----------|
| account | address | Yes |
| role | uint256 | Yes |

### UpdateRoleManager

| Name | Type | Indexed? |
|------|------|----------|
| role_manager | address | Yes |

### UpdateAccountant

| Name | Type | Indexed? |
|------|------|----------|
| accountant | address | Yes |

### UpdateDepositLimitModule

| Name | Type | Indexed? |
|------|------|----------|
| deposit_limit_module | address | Yes |

### UpdateWithdrawLimitModule

| Name | Type | Indexed? |
|------|------|----------|
| withdraw_limit_module | address | Yes |

### UpdateDefaultQueue

| Name | Type | Indexed? |
|------|------|----------|
| new_default_queue | address[] | No |

### UpdateUseDefaultQueue

| Name | Type | Indexed? |
|------|------|----------|
| use_default_queue | bool | No |

### UpdateAutoAllocate

| Name | Type | Indexed? |
|------|------|----------|
| auto_allocate | bool | No |

### UpdatedMaxDebtForStrategy

| Name | Type | Indexed? |
|------|------|----------|
| sender | address | Yes |
| strategy | address | Yes |
| new_debt | uint256 | No |

### UpdateDepositLimit

| Name | Type | Indexed? |
|------|------|----------|
| deposit_limit | uint256 | No |

### UpdateMinimumTotalIdle

| Name | Type | Indexed? |
|------|------|----------|
| minimum_total_idle | uint256 | No |

### UpdateProfitMaxUnlockTime

| Name | Type | Indexed? |
|------|------|----------|
| profit_max_unlock_time | uint256 | No |

### DebtPurchased

| Name | Type | Indexed? |
|------|------|----------|
| strategy | address | Yes |
| amount | uint256 | No |

### Shutdown

| Name | Type | Indexed? |
|------|------|----------|
