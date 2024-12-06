# VaultV3.vy

[Git Source](https://github.com/yearn/yearn-vaults-v3/blob/v3.0.2-1/contracts/VaultV3.vy)

> vyper: `0.3.7`
> author: `yearn.finance`
> license: `GNU AGPLv3`

**Yearn V3 Vault**

*The Yearn VaultV3 is designed as a non-opinionated system to distribute funds of depositors for a specific `asset` into different opportunities (aka Strategies) and manage accounting in a robust way. Depositors receive shares (aka vaults tokens) proportional to their deposit amount. Vault tokens are yield-bearing and can be redeemed at any time to get back deposit plus any yield generated. Addresses that are given different permissioned roles by the `role_manager` are then able to allocate funds as they best see fit to different strategies and adjust the strategies and allocations as needed, as well as reporting realized profits or losses. Strategies are any ERC-4626 compliant contracts that use the same underlying `asset` as the vault. The vault provides no assurances as to the safety of any strategy and it is the responsibility of those that hold the corresponding roles to choose and fund strategies that best fit their desired specifications. Those holding vault tokens are able to redeem the tokens for the corresponding amount of underlying asset based on any reported profits or losses since their initial deposit. The vault is built to be customized by the management to be able to fit their specific desired needs. Including the customization of strategies, accountants, ownership etc.*

## Events

### Deposit

* `sender` : address, *indexed*
* `owner` : address, *indexed*
* `assets` : uint256, *notIndexed*
* `shares` : uint256, *notIndexed*

### Withdraw

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `owner` : address, *indexed*
* `assets` : uint256, *notIndexed*
* `shares` : uint256, *notIndexed*

### Transfer

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `value` : uint256, *notIndexed*

### Approval

* `owner` : address, *indexed*
* `spender` : address, *indexed*
* `value` : uint256, *notIndexed*

### StrategyChanged

* `strategy` : address, *indexed*
* `change_type` : uint256, *indexed*

### StrategyReported

* `strategy` : address, *indexed*
* `gain` : uint256, *notIndexed*
* `loss` : uint256, *notIndexed*
* `current_debt` : uint256, *notIndexed*
* `protocol_fees` : uint256, *notIndexed*
* `total_fees` : uint256, *notIndexed*
* `total_refunds` : uint256, *notIndexed*

### DebtUpdated

* `strategy` : address, *indexed*
* `current_debt` : uint256, *notIndexed*
* `new_debt` : uint256, *notIndexed*

### RoleSet

* `account` : address, *indexed*
* `role` : uint256, *indexed*

### UpdateRoleManager

* `role_manager` : address, *indexed*

### UpdateAccountant

* `accountant` : address, *indexed*

### UpdateDepositLimitModule

* `deposit_limit_module` : address, *indexed*

### UpdateWithdrawLimitModule

* `withdraw_limit_module` : address, *indexed*

### UpdateDefaultQueue

* `new_default_queue` : address[], *notIndexed*

### UpdateUseDefaultQueue

* `use_default_queue` : bool, *notIndexed*

### UpdatedMaxDebtForStrategy

* `sender` : address, *indexed*
* `strategy` : address, *indexed*
* `new_debt` : uint256, *notIndexed*

### UpdateDepositLimit

* `deposit_limit` : uint256, *notIndexed*

### UpdateMinimumTotalIdle

* `minimum_total_idle` : uint256, *notIndexed*

### UpdateProfitMaxUnlockTime

* `profit_max_unlock_time` : uint256, *notIndexed*

### DebtPurchased

* `strategy` : address, *indexed*
* `amount` : uint256, *notIndexed*

### Shutdown

## Methods

### initialize
>
> type: `nonpayable function`
>

Initialize a new vault. Sets the asset, name, symbol, and role manager.

Arguments:

* `asset`:  - *The address of the asset that the vault will accept.*

* `name`:  - *The name of the vault token.*

* `symbol`:  - *The symbol of the vault token.*

* `role_manager`:  - *The address that can add and remove roles to addresses*

* `profit_max_unlock_time`:  - *The amount of time that the profit will be locked for*

### set_accountant
>
> type: `nonpayable function`
>

Set the new accountant address.

Arguments:

* `new_accountant`:  - *The new accountant address.*

### set_default_queue
>
> type: `nonpayable function`
>

Set the new default queue array.

*Will check each strategy to make sure it is active. But will not check that the same strategy is not added twice. maxRedeem and maxWithdraw return values may be inaccurate if a strategy is added twice.*

Arguments:

* `new_default_queue`:  - *The new default queue array.*

### set_use_default_queue
>
> type: `nonpayable function`
>

Set a new value for `use_default_queue`.

*If set `True` the default queue will always be used no matter whats passed in.*

Arguments:

* `use_default_queue`:  - *new value.*

### set_deposit_limit
>
> type: `nonpayable function`
>

Set the new deposit limit.

*Can not be changed if a deposit_limit_module is set unless the override flag is true or if shutdown.*

Arguments:

* `deposit_limit`:  - *The new deposit limit.*

* `override`:  - *If a `deposit_limit_module` already set should be overridden.*

### set_deposit_limit_module
>
> type: `nonpayable function`
>

Set a contract to handle the deposit limit.

*The default `deposit_limit` will need to be set to max uint256 since the module will override it or the override flag must be set to true to set it to max in 1 tx..*

Arguments:

* `deposit_limit_module`:  - *Address of the module.*

* `override`:  - *If a `deposit_limit` already set should be overridden.*

### set_deposit_limit_module
>
> type: `nonpayable function`
>

*The default `deposit_limit` will need to be set to max uint256 since the module will override it or the override flag must be set to true to set it to max in 1 tx..*

Arguments:

* `deposit_limit_module`:  - *Address of the module.*

* `override`:  - *If a `deposit_limit` already set should be overridden.*

### set_withdraw_limit_module
>
> type: `nonpayable function`
>

Set a contract to handle the withdraw limit.

*This will override the default `max_withdraw`.*

Arguments:

* `withdraw_limit_module`:  - *Address of the module.*

### set_minimum_total_idle
>
> type: `nonpayable function`
>

Set the new minimum total idle.

Arguments:

* `minimum_total_idle`:  - *The new minimum total idle.*

### setProfitMaxUnlockTime
>
> type: `nonpayable function`
>

Set the new profit max unlock time.

*The time is denominated in seconds and must be less than 1 year. We only need to update locking period if setting to 0, since the current period will use the old rate and on the next report it will be reset with the new unlocking time. Setting to 0 will cause any currently locked profit to instantly unlock and an immediate increase in the vaults Price Per Share.*

Arguments:

* `new_profit_max_unlock_time`:  - *The new profit max unlock time.*

### set_role
>
> type: `nonpayable function`
>

Set the roles for an account.

*This will fully override an accounts current roles so it should include all roles the account should hold.*

Arguments:

* `account`:  - *The account to set the role for.*

* `role`:  - *The roles the account should hold.*

### add_role
>
> type: `nonpayable function`
>

Add a new role to an address.

*This will add a new role to the account without effecting any of the previously held roles.*

Arguments:

* `account`:  - *The account to add a role to.*

* `role`:  - *The new role to add to account.*

### remove_role
>
> type: `nonpayable function`
>

Remove a single role from an account.

*This will leave all other roles for the account unchanged.*

Arguments:

* `account`:  - *The account to remove a Role from.*

* `role`:  - *The Role to remove.*

### transfer_role_manager
>
> type: `nonpayable function`
>

Step 1 of 2 in order to transfer the role manager to a new address. This will set the future_role_manager. Which will then need to be accepted by the new manager.

Arguments:

* `role_manager`:  - *The new role manager address.*

### isShutdown
>
> type: `view function`
>

Get if the vault is shutdown.

Returns:

* `_0` - Bool representing the shutdown status

### unlockedShares
>
> type: `view function`
>

Get the amount of shares that have been unlocked.

Returns:

* `_0` - The amount of shares that are have been unlocked.

### pricePerShare
>
> type: `view function`
>

Get the price per share (pps) of the vault.

*This value offers limited precision. Integrations that require exact precision should use convertToAssets or convertToShares instead.*

Returns:

* `_0` - The price per share.

### get_default_queue
>
> type: `view function`
>

Get the full default queue currently set.

Returns:

* `_0` - The current default withdrawal queue.

### process_report
>
> type: `nonpayable function`
>

Process the report of a strategy.

Arguments:

* `strategy`:  - *The strategy to process the report for.*

Returns:

* `_0` - The gain and loss of the strategy.

### buy_debt
>
> type: `nonpayable function`
>

Used for governance to buy bad debt from the vault.

*This should only ever be used in an emergency in place of force revoking a strategy in order to not report a loss. It allows the DEBT_PURCHASER role to buy the strategies debt for an equal amount of `asset`.*

Arguments:

* `strategy`:  - *The strategy to buy the debt for*

* `amount`:  - *The amount of debt to buy from the vault.*

### add_strategy
>
> type: `nonpayable function`
>

Add a new strategy.

Arguments:

* `new_strategy`:  - *The new strategy to add.*

### revoke_strategy
>
> type: `nonpayable function`
>

Revoke a strategy.

Arguments:

* `strategy`:  - *The strategy to revoke.*

### force_revoke_strategy
>
> type: `nonpayable function`
>

Force revoke a strategy.

*The vault will remove the strategy and write off any debt left in it as a loss. This function is a dangerous function as it can force a strategy to take a loss. All possible assets should be removed from the strategy first via update_debt. If a strategy is removed erroneously it can be re-added and the loss will be credited as profit. Fees will apply.*

Arguments:

* `strategy`:  - *The strategy to force revoke.*

### update_max_debt_for_strategy
>
> type: `nonpayable function`
>

Update the max debt for a strategy.

Arguments:

* `strategy`:  - *The strategy to update the max debt for.*

* `new_max_debt`:  - *The new max debt for the strategy.*

### update_debt
>
> type: `nonpayable function`
>

Update the debt for a strategy.

Arguments:

* `strategy`:  - *The strategy to update the debt for.*

* `target_debt`:  - *The target debt for the strategy.*

* `max_loss`:  - *Optional to check realized losses on debt decreases.*

Returns:

* `_0` - The amount of debt added or removed.

### deposit
>
> type: `nonpayable function`
>

Deposit assets into the vault.

Arguments:

* `assets`:  - *The amount of assets to deposit.*

* `receiver`:  - *The address to receive the shares.*

Returns:

* `_0` - The amount of shares minted.

### mint
>
> type: `nonpayable function`
>

Mint shares for the receiver.

Arguments:

* `shares`:  - *The amount of shares to mint.*

* `receiver`:  - *The address to receive the shares.*

Returns:

* `_0` - The amount of assets deposited.

### withdraw
>
> type: `nonpayable function`
>

Withdraw an amount of asset to `receiver` burning `owner`s shares.

*The default behavior is to not allow any loss.*

Arguments:

* `assets`:  - *The amount of asset to withdraw.*

* `receiver`:  - *The address to receive the assets.*

* `owner`:  - *The address who's shares are being burnt.*

* `max_loss`:  - *Optional amount of acceptable loss in Basis Points.*

* `strategies`:  - *Optional array of strategies to withdraw from.*

Returns:

* `_0` - The amount of shares actually burnt.

### redeem
>
> type: `nonpayable function`
>

Redeems an amount of shares of `owners` shares sending funds to `receiver`.

*The default behavior is to allow losses to be realized.*

Arguments:

* `shares`:  - *The amount of shares to burn.*

* `receiver`:  - *The address to receive the assets.*

* `owner`:  - *The address who's shares are being burnt.*

* `max_loss`:  - *Optional amount of acceptable loss in Basis Points.*

* `strategies`:  - *Optional array of strategies to withdraw from.*

Returns:

* `_0` - The amount of assets actually withdrawn.

### approve
>
> type: `nonpayable function`
>

Approve an address to spend the vault&#39;s shares.

Arguments:

* `spender`:  - *The address to approve.*

* `amount`:  - *The amount of shares to approve.*

Returns:

* `_0` - True if the approval was successful.

### transfer
>
> type: `nonpayable function`
>

Transfer shares to a receiver.

Arguments:

* `receiver`:  - *The address to transfer shares to.*

* `amount`:  - *The amount of shares to transfer.*

Returns:

* `_0` - True if the transfer was successful.

### transferFrom
>
> type: `nonpayable function`
>

Transfer shares from a sender to a receiver.

Arguments:

* `sender`:  - *The address to transfer shares from.*

* `receiver`:  - *The address to transfer shares to.*

* `amount`:  - *The amount of shares to transfer.*

Returns:

* `_0` - True if the transfer was successful.

### permit
>
> type: `nonpayable function`
>

Approve an address to spend the vault&#39;s shares.

Arguments:

* `owner`:  - *The address to approve.*

* `spender`:  - *The address to approve.*

* `amount`:  - *The amount of shares to approve.*

* `deadline`:  - *The deadline for the permit.*

* `v`:  - *The v component of the signature.*

* `r`:  - *The r component of the signature.*

* `s`:  - *The s component of the signature.*

Returns:

* `_0` - True if the approval was successful.

### balanceOf
>
> type: `view function`
>

Get the balance of a user.

Arguments:

* `addr`:  - *The address to get the balance of.*

Returns:

* `_0` - The balance of the user.

### totalSupply
>
> type: `view function`
>

Get the total supply of shares.

Returns:

* `_0` - The total supply of shares.

### totalAssets
>
> type: `view function`
>

Get the total assets held by the vault.

Returns:

* `_0` - The total assets held by the vault.

### totalIdle
>
> type: `view function`
>

Get the amount of loose `asset` the vault holds.

Returns:

* `_0` - The current total idle.

### totalDebt
>
> type: `view function`
>

Get the total amount of funds invested across all strategies.

Returns:

* `_0` - The current total debt.

### convertToShares
>
> type: `view function`
>

Convert an amount of assets to shares.

Arguments:

* `assets`:  - *The amount of assets to convert.*

Returns:

* `_0` - The amount of shares.

### previewDeposit
>
> type: `view function`
>

Preview the amount of shares that would be minted for a deposit.

Arguments:

* `assets`:  - *The amount of assets to deposit.*

Returns:

* `_0` - The amount of shares that would be minted.

### previewMint
>
> type: `view function`
>

Preview the amount of assets that would be deposited for a mint.

Arguments:

* `shares`:  - *The amount of shares to mint.*

Returns:

* `_0` - The amount of assets that would be deposited.

### convertToAssets
>
> type: `view function`
>

Convert an amount of shares to assets.

Arguments:

* `shares`:  - *The amount of shares to convert.*

Returns:

* `_0` - The amount of assets.

### maxDeposit
>
> type: `view function`
>

Get the maximum amount of assets that can be deposited.

Arguments:

* `receiver`:  - *The address that will receive the shares.*

Returns:

* `_0` - The maximum amount of assets that can be deposited.

### maxMint
>
> type: `view function`
>

Get the maximum amount of shares that can be minted.

Arguments:

* `receiver`:  - *The address that will receive the shares.*

Returns:

* `_0` - The maximum amount of shares that can be minted.

### maxWithdraw
>
> type: `view function`
>

Get the maximum amount of assets that can be withdrawn.

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

Arguments:

* `owner`:  - *The address that owns the shares.*

* `max_loss`:  - *Custom max_loss if any.*

* `strategies`:  - *Custom strategies queue if any.*

Returns:

* `_0` - The maximum amount of assets that can be withdrawn.

### maxRedeem
>
> type: `view function`
>

Get the maximum amount of shares that can be redeemed.

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

Arguments:

* `owner`:  - *The address that owns the shares.*

* `max_loss`:  - *Custom max_loss if any.*

* `strategies`:  - *Custom strategies queue if any.*

Returns:

* `_0` - The maximum amount of shares that can be redeemed.

### previewWithdraw
>
> type: `view function`
>

Preview the amount of shares that would be redeemed for a withdraw.

Arguments:

* `assets`:  - *The amount of assets to withdraw.*

Returns:

* `_0` - The amount of shares that would be redeemed.

### previewRedeem
>
> type: `view function`
>

Preview the amount of assets that would be withdrawn for a redeem.

Arguments:

* `shares`:  - *The amount of shares to redeem.*

Returns:

* `_0` - The amount of assets that would be withdrawn.

### FACTORY
>
> type: `view function`
>

Address of the factory that deployed the vault.

*Is used to retrieve the protocol fees.*

Returns:

* `_0` - Address of the vault factory.

### apiVersion
>
> type: `view function`
>

Get the API version of the vault.

Returns:

* `_0` - The API version of the vault.

### assess_share_of_unrealised_losses
>
> type: `view function`
>

Assess the share of unrealised losses that a strategy has.

Arguments:

* `strategy`:  - *The address of the strategy.*

* `assets_needed`:  - *The amount of assets needed to be withdrawn.*

Returns:

* `_0` - The share of unrealised losses that the strategy has.

### profitMaxUnlockTime
>
> type: `view function`
>

Gets the current time profits are set to unlock over.

Returns:

* `_0` - The current profit max unlock time.

### fullProfitUnlockDate
>
> type: `view function`
>

Gets the timestamp at which all profits will be unlocked.

Returns:

* `_0` - The full profit unlocking timestamp

### profitUnlockingRate
>
> type: `view function`
>

The per second rate at which profits are unlocking.

*This is denominated in EXTENDED_BPS decimals.*

Returns:

* `_0` - The current profit unlocking rate.

### lastProfitUpdate
>
> type: `view function`
>

The timestamp of the last time shares were locked.

Returns:

* `_0` - The last profit update.

### DOMAIN_SEPARATOR
>
> type: `view function`
>

Get the domain separator.

Returns:

* `_0` - The domain separator.

### accept_role_manager
>
> type: `nonpayable function`
>

Accept the role manager transfer.

### shutdown_vault
>
> type: `nonpayable function`
>

Shutdown the vault.
