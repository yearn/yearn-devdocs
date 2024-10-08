# VaultV3.vy

**Yearn V3 Vault**

*The Yearn VaultV3 is designed as a non-opinionated system to distribute funds of depositors for a specific `asset` into different opportunities (aka Strategies) and manage accounting in a robust way. Depositors receive shares (aka vaults tokens) proportional to their deposit amount. Vault tokens are yield-bearing and can be redeemed at any time to get back deposit plus any yield generated. Addresses that are given different permissioned roles by the `role_manager` are then able to allocate funds as they best see fit to different strategies and adjust the strategies and allocations as needed, as well as reporting realized profits or losses. Strategies are any ERC-4626 compliant contracts that use the same underlying `asset` as the vault. The vault provides no assurances as to the safety of any strategy and it is the responsibility of those that hold the corresponding roles to choose and fund strategies that best fit their desired specifications. Those holding vault tokens are able to redeem the tokens for the corresponding amount of underlying asset based on any reported profits or losses since their initial deposit. The vault is built to be customized by the management to be able to fit their specific desired needs. Including the customization of strategies, accountants, ownership etc.*

## Functions

### initialize

```solidity
function initialize(address,string,string,address,uint256)
```

Initialize a new vault. Sets the asset, name, symbol, and role manager.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *asset* |  ** |  *The address of the asset that the vault will accept.* |
|  *name* |  ** |  *The name of the vault token.* |
|  *symbol* |  ** |  *The symbol of the vault token.* |
|  *role_manager* |  ** |  *The address that can add and remove roles to addresses* |
|  *profit_max_unlock_time* |  ** |  *The amount of time that the profit will be locked for* |

### setName

```solidity
function setName(string)
```

Change the vault name.

*Can only be called by the Role Manager.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *name* |  ** |  *The new name for the vault.* |

### setSymbol

```solidity
function setSymbol(string)
```

Change the vault symbol.

*Can only be called by the Role Manager.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *symbol* |  ** |  *The new name for the vault.* |

### set_accountant

```solidity
function set_accountant(address)
```

Set the new accountant address.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_accountant* |  ** |  *The new accountant address.* |

### set_default_queue

```solidity
function set_default_queue(address[])
```

Set the new default queue array.

*Will check each strategy to make sure it is active. But will not check that the same strategy is not added twice. maxRedeem and maxWithdraw return values may be inaccurate if a strategy is added twice.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_default_queue* |  ** |  *The new default queue array.* |

### set_use_default_queue

```solidity
function set_use_default_queue(bool)
```

Set a new value for `use_default_queue`.

*If set `True` the default queue will always be used no matter whats passed in.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *use_default_queue* |  ** |  *new value.* |

### set_auto_allocate

```solidity
function set_auto_allocate(bool)
```

Set new value for `auto_allocate`

*If `True` every `deposit` and `mint` call will try and allocate the deposited amount to the strategy at position 0 of the `default_queue` atomically. NOTE: An empty `default_queue` will cause deposits to fail.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *auto_allocate* |  ** |  *new value.* |

### set_deposit_limit

```solidity
function set_deposit_limit(uint256)
```

Set the new deposit limit.

*Can not be changed if a deposit_limit_module is set unless the override flag is true or if shutdown.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *deposit_limit* |  ** |  *The new deposit limit.* |
|  *override* |  ** |  *If a `deposit_limit_module` already set should be overridden.* |

### set_deposit_limit

```solidity
function set_deposit_limit(uint256,bool)
```

*Can not be changed if a deposit_limit_module is set unless the override flag is true or if shutdown.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *deposit_limit* |  ** |  *The new deposit limit.* |
|  *override* |  ** |  *If a `deposit_limit_module` already set should be overridden.* |

### set_deposit_limit_module

```solidity
function set_deposit_limit_module(address)
```

Set a contract to handle the deposit limit.

*The default `deposit_limit` will need to be set to max uint256 since the module will override it or the override flag must be set to true to set it to max in 1 tx..*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *deposit_limit_module* |  ** |  *Address of the module.* |
|  *override* |  ** |  *If a `deposit_limit` already set should be overridden.* |

### set_deposit_limit_module

```solidity
function set_deposit_limit_module(address,bool)
```

*The default `deposit_limit` will need to be set to max uint256 since the module will override it or the override flag must be set to true to set it to max in 1 tx..*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *deposit_limit_module* |  ** |  *Address of the module.* |
|  *override* |  ** |  *If a `deposit_limit` already set should be overridden.* |

### set_withdraw_limit_module

```solidity
function set_withdraw_limit_module(address)
```

Set a contract to handle the withdraw limit.

*This will override the default `max_withdraw`.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *withdraw_limit_module* |  ** |  *Address of the module.* |

### set_minimum_total_idle

```solidity
function set_minimum_total_idle(uint256)
```

Set the new minimum total idle.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *minimum_total_idle* |  ** |  *The new minimum total idle.* |

### setProfitMaxUnlockTime

```solidity
function setProfitMaxUnlockTime(uint256)
```

Set the new profit max unlock time.

*The time is denominated in seconds and must be less than 1 year. We only need to update locking period if setting to 0, since the current period will use the old rate and on the next report it will be reset with the new unlocking time. Setting to 0 will cause any currently locked profit to instantly unlock and an immediate increase in the vaults Price Per Share.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_profit_max_unlock_time* |  ** |  *The new profit max unlock time.* |

### set_role

```solidity
function set_role(address,uint256)
```

Set the roles for an account.

*This will fully override an accounts current roles so it should include all roles the account should hold.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *account* |  ** |  *The account to set the role for.* |
|  *role* |  ** |  *The roles the account should hold.* |

### add_role

```solidity
function add_role(address,uint256)
```

Add a new role to an address.

*This will add a new role to the account without effecting any of the previously held roles.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *account* |  ** |  *The account to add a role to.* |
|  *role* |  ** |  *The new role to add to account.* |

### remove_role

```solidity
function remove_role(address,uint256)
```

Remove a single role from an account.

*This will leave all other roles for the account unchanged.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *account* |  ** |  *The account to remove a Role from.* |
|  *role* |  ** |  *The Role to remove.* |

### transfer_role_manager

```solidity
function transfer_role_manager(address)
```

Step 1 of 2 in order to transfer the role manager to a new address. This will set the future_role_manager. Which will then need to be accepted by the new manager.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *role_manager* |  ** |  *The new role manager address.* |

### isShutdown

```solidity
function isShutdown()
```

Get if the vault is shutdown.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *Bool representing the shutdown status* |

### unlockedShares

```solidity
function unlockedShares()
```

Get the amount of shares that have been unlocked.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares that are have been unlocked.* |

### pricePerShare

```solidity
function pricePerShare()
```

Get the price per share (pps) of the vault.

*This value offers limited precision. Integrations that require exact precision should use convertToAssets or convertToShares instead.*

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The price per share.* |

### get_default_queue

```solidity
function get_default_queue()
```

Get the full default queue currently set.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The current default withdrawal queue.* |

### process_report

```solidity
function process_report(address)
```

Process the report of a strategy.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to process the report for.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The gain and loss of the strategy.* |

### buy_debt

```solidity
function buy_debt(address,uint256)
```

Used for governance to buy bad debt from the vault.

*This should only ever be used in an emergency in place of force revoking a strategy in order to not report a loss. It allows the DEBT_PURCHASER role to buy the strategies debt for an equal amount of `asset`.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to buy the debt for* |
|  *amount* |  ** |  *The amount of debt to buy from the vault.* |

### add_strategy

```solidity
function add_strategy(address)
```

Add a new strategy.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_strategy* |  ** |  *The new strategy to add.* |

### add_strategy

```solidity
function add_strategy(address,bool)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_strategy* |  ** |  *The new strategy to add.* |

### revoke_strategy

```solidity
function revoke_strategy(address)
```

Revoke a strategy.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to revoke.* |

### force_revoke_strategy

```solidity
function force_revoke_strategy(address)
```

Force revoke a strategy.

*The vault will remove the strategy and write off any debt left in it as a loss. This function is a dangerous function as it can force a strategy to take a loss. All possible assets should be removed from the strategy first via update_debt. If a strategy is removed erroneously it can be re-added and the loss will be credited as profit. Fees will apply.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to force revoke.* |

### update_max_debt_for_strategy

```solidity
function update_max_debt_for_strategy(address,uint256)
```

Update the max debt for a strategy.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to update the max debt for.* |
|  *new_max_debt* |  ** |  *The new max debt for the strategy.* |

### update_debt

```solidity
function update_debt(address,uint256)
```

Update the debt for a strategy.

*Pass max uint256 to allocate as much idle as possible.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to update the debt for.* |
|  *target_debt* |  ** |  *The target debt for the strategy.* |
|  *max_loss* |  ** |  *Optional to check realized losses on debt decreases.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of debt added or removed.* |

### update_debt

```solidity
function update_debt(address,uint256,uint256)
```

*Pass max uint256 to allocate as much idle as possible.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The strategy to update the debt for.* |
|  *target_debt* |  ** |  *The target debt for the strategy.* |
|  *max_loss* |  ** |  *Optional to check realized losses on debt decreases.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of debt added or removed.* |

### deposit

```solidity
function deposit(uint256,address)
```

Deposit assets into the vault.

*Pass max uint256 to deposit full asset balance.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of assets to deposit.* |
|  *receiver* |  ** |  *The address to receive the shares.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares minted.* |

### mint

```solidity
function mint(uint256,address)
```

Mint shares for the receiver.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to mint.* |
|  *receiver* |  ** |  *The address to receive the shares.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets deposited.* |

### withdraw

```solidity
function withdraw(uint256,address,address)
```

Withdraw an amount of asset to `receiver` burning `owner`s shares.

*The default behavior is to not allow any loss.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of asset to withdraw.* |
|  *receiver* |  ** |  *The address to receive the assets.* |
|  *owner* |  ** |  *The address who's shares are being burnt.* |
|  *max_loss* |  ** |  *Optional amount of acceptable loss in Basis Points.* |
|  *strategies* |  ** |  *Optional array of strategies to withdraw from.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares actually burnt.* |

### withdraw

```solidity
function withdraw(uint256,address,address,uint256)
```

*The default behavior is to not allow any loss.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of asset to withdraw.* |
|  *receiver* |  ** |  *The address to receive the assets.* |
|  *owner* |  ** |  *The address who's shares are being burnt.* |
|  *max_loss* |  ** |  *Optional amount of acceptable loss in Basis Points.* |
|  *strategies* |  ** |  *Optional array of strategies to withdraw from.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares actually burnt.* |

### withdraw

```solidity
function withdraw(uint256,address,address,uint256,address[])
```

*The default behavior is to not allow any loss.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of asset to withdraw.* |
|  *receiver* |  ** |  *The address to receive the assets.* |
|  *owner* |  ** |  *The address who's shares are being burnt.* |
|  *max_loss* |  ** |  *Optional amount of acceptable loss in Basis Points.* |
|  *strategies* |  ** |  *Optional array of strategies to withdraw from.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares actually burnt.* |

### redeem

```solidity
function redeem(uint256,address,address)
```

Redeems an amount of shares of `owners` shares sending funds to `receiver`.

*The default behavior is to allow losses to be realized.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to burn.* |
|  *receiver* |  ** |  *The address to receive the assets.* |
|  *owner* |  ** |  *The address who's shares are being burnt.* |
|  *max_loss* |  ** |  *Optional amount of acceptable loss in Basis Points.* |
|  *strategies* |  ** |  *Optional array of strategies to withdraw from.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets actually withdrawn.* |

### redeem

```solidity
function redeem(uint256,address,address,uint256)
```

*The default behavior is to allow losses to be realized.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to burn.* |
|  *receiver* |  ** |  *The address to receive the assets.* |
|  *owner* |  ** |  *The address who's shares are being burnt.* |
|  *max_loss* |  ** |  *Optional amount of acceptable loss in Basis Points.* |
|  *strategies* |  ** |  *Optional array of strategies to withdraw from.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets actually withdrawn.* |

### redeem

```solidity
function redeem(uint256,address,address,uint256,address[])
```

*The default behavior is to allow losses to be realized.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to burn.* |
|  *receiver* |  ** |  *The address to receive the assets.* |
|  *owner* |  ** |  *The address who's shares are being burnt.* |
|  *max_loss* |  ** |  *Optional amount of acceptable loss in Basis Points.* |
|  *strategies* |  ** |  *Optional array of strategies to withdraw from.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets actually withdrawn.* |

### approve

```solidity
function approve(address,uint256)
```

Approve an address to spend the vault&#39;s shares.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *spender* |  ** |  *The address to approve.* |
|  *amount* |  ** |  *The amount of shares to approve.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *True if the approval was successful.* |

### transfer

```solidity
function transfer(address,uint256)
```

Transfer shares to a receiver.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *receiver* |  ** |  *The address to transfer shares to.* |
|  *amount* |  ** |  *The amount of shares to transfer.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *True if the transfer was successful.* |

### transferFrom

```solidity
function transferFrom(address,address,uint256)
```

Transfer shares from a sender to a receiver.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *sender* |  ** |  *The address to transfer shares from.* |
|  *receiver* |  ** |  *The address to transfer shares to.* |
|  *amount* |  ** |  *The amount of shares to transfer.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *True if the transfer was successful.* |

### permit

```solidity
function permit(address,address,uint256,uint256,uint8,bytes32,bytes32)
```

Approve an address to spend the vault&#39;s shares.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address to approve.* |
|  *spender* |  ** |  *The address to approve.* |
|  *amount* |  ** |  *The amount of shares to approve.* |
|  *deadline* |  ** |  *The deadline for the permit.* |
|  *v* |  ** |  *The v component of the signature.* |
|  *r* |  ** |  *The r component of the signature.* |
|  *s* |  ** |  *The s component of the signature.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *True if the approval was successful.* |

### balanceOf

```solidity
function balanceOf(address)
```

Get the balance of a user.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *addr* |  ** |  *The address to get the balance of.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The balance of the user.* |

### totalSupply

```solidity
function totalSupply()
```

Get the total supply of shares.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The total supply of shares.* |

### totalAssets

```solidity
function totalAssets()
```

Get the total assets held by the vault.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The total assets held by the vault.* |

### totalIdle

```solidity
function totalIdle()
```

Get the amount of loose `asset` the vault holds.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The current total idle.* |

### totalDebt

```solidity
function totalDebt()
```

Get the the total amount of funds invested across all strategies.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The current total debt.* |

### convertToShares

```solidity
function convertToShares(uint256)
```

Convert an amount of assets to shares.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of assets to convert.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares.* |

### previewDeposit

```solidity
function previewDeposit(uint256)
```

Preview the amount of shares that would be minted for a deposit.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of assets to deposit.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares that would be minted.* |

### previewMint

```solidity
function previewMint(uint256)
```

Preview the amount of assets that would be deposited for a mint.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to mint.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets that would be deposited.* |

### convertToAssets

```solidity
function convertToAssets(uint256)
```

Convert an amount of shares to assets.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to convert.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets.* |

### maxDeposit

```solidity
function maxDeposit(address)
```

Get the maximum amount of assets that can be deposited.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *receiver* |  ** |  *The address that will receive the shares.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of assets that can be deposited.* |

### maxMint

```solidity
function maxMint(address)
```

Get the maximum amount of shares that can be minted.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *receiver* |  ** |  *The address that will receive the shares.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of shares that can be minted.* |

### maxWithdraw

```solidity
function maxWithdraw(address)
```

Get the maximum amount of assets that can be withdrawn.

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address that owns the shares.* |
|  *max_loss* |  ** |  *Custom max_loss if any.* |
|  *strategies* |  ** |  *Custom strategies queue if any.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of assets that can be withdrawn.* |

### maxWithdraw

```solidity
function maxWithdraw(address,uint256)
```

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address that owns the shares.* |
|  *max_loss* |  ** |  *Custom max_loss if any.* |
|  *strategies* |  ** |  *Custom strategies queue if any.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of assets that can be withdrawn.* |

### maxWithdraw

```solidity
function maxWithdraw(address,uint256,address[])
```

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address that owns the shares.* |
|  *max_loss* |  ** |  *Custom max_loss if any.* |
|  *strategies* |  ** |  *Custom strategies queue if any.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of assets that can be withdrawn.* |

### maxRedeem

```solidity
function maxRedeem(address)
```

Get the maximum amount of shares that can be redeemed.

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address that owns the shares.* |
|  *max_loss* |  ** |  *Custom max_loss if any.* |
|  *strategies* |  ** |  *Custom strategies queue if any.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of shares that can be redeemed.* |

### maxRedeem

```solidity
function maxRedeem(address,uint256)
```

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address that owns the shares.* |
|  *max_loss* |  ** |  *Custom max_loss if any.* |
|  *strategies* |  ** |  *Custom strategies queue if any.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of shares that can be redeemed.* |

### maxRedeem

```solidity
function maxRedeem(address,uint256,address[])
```

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *owner* |  ** |  *The address that owns the shares.* |
|  *max_loss* |  ** |  *Custom max_loss if any.* |
|  *strategies* |  ** |  *Custom strategies queue if any.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The maximum amount of shares that can be redeemed.* |

### previewWithdraw

```solidity
function previewWithdraw(uint256)
```

Preview the amount of shares that would be redeemed for a withdraw.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *assets* |  ** |  *The amount of assets to withdraw.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of shares that would be redeemed.* |

### previewRedeem

```solidity
function previewRedeem(uint256)
```

Preview the amount of assets that would be withdrawn for a redeem.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *shares* |  ** |  *The amount of shares to redeem.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The amount of assets that would be withdrawn.* |

### FACTORY

```solidity
function FACTORY()
```

Address of the factory that deployed the vault.

*Is used to retrieve the protocol fees.*

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *Address of the vault factory.* |

### apiVersion

```solidity
function apiVersion()
```

Get the API version of the vault.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The API version of the vault.* |

### assess_share_of_unrealised_losses

```solidity
function assess_share_of_unrealised_losses(address,uint256)
```

Assess the share of unrealised losses that a strategy has.

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *strategy* |  ** |  *The address of the strategy.* |
|  *assets_needed* |  ** |  *The amount of assets needed to be withdrawn.* |

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The share of unrealised losses that the strategy has.* |

### profitMaxUnlockTime

```solidity
function profitMaxUnlockTime()
```

Gets the current time profits are set to unlock over.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The current profit max unlock time.* |

### fullProfitUnlockDate

```solidity
function fullProfitUnlockDate()
```

Gets the timestamp at which all profits will be unlocked.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The full profit unlocking timestamp* |

### profitUnlockingRate

```solidity
function profitUnlockingRate()
```

The per second rate at which profits are unlocking.

*This is denominated in EXTENDED_BPS decimals.*

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The current profit unlocking rate.* |

### lastProfitUpdate

```solidity
function lastProfitUpdate()
```

The timestamp of the last time shares were locked.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The last profit update.* |

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR()
```

Get the domain separator.

#### Return Values

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The domain separator.* |

### accept_role_manager

```solidity
function accept_role_manager()
```

Accept the role manager transfer.

### shutdown_vault

```solidity
function shutdown_vault()
```

Shutdown the vault.

## Events

**Deposit**

* `sender` : address, *indexed*
* `owner` : address, *indexed*
* `assets` : uint256, *notIndexed*
* `shares` : uint256, *notIndexed*

**Withdraw**

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `owner` : address, *indexed*
* `assets` : uint256, *notIndexed*
* `shares` : uint256, *notIndexed*

**Transfer**

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `value` : uint256, *notIndexed*

**Approval**

* `owner` : address, *indexed*
* `spender` : address, *indexed*
* `value` : uint256, *notIndexed*

**StrategyChanged**

* `strategy` : address, *indexed*
* `change_type` : uint256, *indexed*

**StrategyReported**

* `strategy` : address, *indexed*
* `gain` : uint256, *notIndexed*
* `loss` : uint256, *notIndexed*
* `current_debt` : uint256, *notIndexed*
* `protocol_fees` : uint256, *notIndexed*
* `total_fees` : uint256, *notIndexed*
* `total_refunds` : uint256, *notIndexed*

**DebtUpdated**

* `strategy` : address, *indexed*
* `current_debt` : uint256, *notIndexed*
* `new_debt` : uint256, *notIndexed*

**RoleSet**

* `account` : address, *indexed*
* `role` : uint256, *indexed*

**UpdateRoleManager**

* `role_manager` : address, *indexed*

**UpdateAccountant**

* `accountant` : address, *indexed*

**UpdateDepositLimitModule**

* `deposit_limit_module` : address, *indexed*

**UpdateWithdrawLimitModule**

* `withdraw_limit_module` : address, *indexed*

**UpdateDefaultQueue**

* `new_default_queue` : address[], *notIndexed*

**UpdateUseDefaultQueue**

* `use_default_queue` : bool, *notIndexed*

**UpdateAutoAllocate**

* `auto_allocate` : bool, *notIndexed*

**UpdatedMaxDebtForStrategy**

* `sender` : address, *indexed*
* `strategy` : address, *indexed*
* `new_debt` : uint256, *notIndexed*

**UpdateDepositLimit**

* `deposit_limit` : uint256, *notIndexed*

**UpdateMinimumTotalIdle**

* `minimum_total_idle` : uint256, *notIndexed*

**UpdateProfitMaxUnlockTime**

* `profit_max_unlock_time` : uint256, *notIndexed*

**DebtPurchased**

* `strategy` : address, *indexed*
* `amount` : uint256, *notIndexed*

**Shutdown**
