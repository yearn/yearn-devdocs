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

### set_deposit_limit
>
> type: `nonpayable function`
>

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

### add_strategy
>
> type: `nonpayable function`
>

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

### update_debt
>
> type: `nonpayable function`
>

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

### withdraw
>
> type: `nonpayable function`
>

*The default behavior is to not allow any loss.*

Arguments:

* `assets`:  - *The amount of asset to withdraw.*

* `receiver`:  - *The address to receive the assets.*

* `owner`:  - *The address who's shares are being burnt.*

* `max_loss`:  - *Optional amount of acceptable loss in Basis Points.*

* `strategies`:  - *Optional array of strategies to withdraw from.*

Returns:

* `_0` - The amount of shares actually burnt.

### withdraw
>
> type: `nonpayable function`
>

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

### redeem
>
> type: `nonpayable function`
>

*The default behavior is to allow losses to be realized.*

Arguments:

* `shares`:  - *The amount of shares to burn.*

* `receiver`:  - *The address to receive the assets.*

* `owner`:  - *The address who's shares are being burnt.*

* `max_loss`:  - *Optional amount of acceptable loss in Basis Points.*

* `strategies`:  - *Optional array of strategies to withdraw from.*

Returns:

* `_0` - The amount of assets actually withdrawn.

### redeem
>
> type: `nonpayable function`
>

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

Get the the total amount of funds invested across all strategies.

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

### maxWithdraw
>
> type: `view function`
>

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

Arguments:

* `owner`:  - *The address that owns the shares.*

* `max_loss`:  - *Custom max_loss if any.*

* `strategies`:  - *Custom strategies queue if any.*

Returns:

* `_0` - The maximum amount of assets that can be withdrawn.

### maxWithdraw
>
> type: `view function`
>

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

### maxRedeem
>
> type: `view function`
>

*Complies to normal 4626 interface and takes custom params. NOTE: Passing in a incorrectly ordered queue may result in incorrect returns values.*

Arguments:

* `owner`:  - *The address that owns the shares.*

* `max_loss`:  - *Custom max_loss if any.*

* `strategies`:  - *Custom strategies queue if any.*

Returns:

* `_0` - The maximum amount of shares that can be redeemed.

### maxRedeem
>
> type: `view function`
>

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

## ABI

```json
[
  {
    "name": "Deposit",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "name": "assets",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Withdraw",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "receiver",
        "type": "address",
        "indexed": true
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "name": "assets",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Transfer",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "receiver",
        "type": "address",
        "indexed": true
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyChanged",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "change_type",
        "type": "uint256",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyReported",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "gain",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "loss",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "current_debt",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "protocol_fees",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "total_fees",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "total_refunds",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "DebtUpdated",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "current_debt",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "new_debt",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "RoleSet",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": true
      },
      {
        "name": "role",
        "type": "uint256",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateRoleManager",
    "inputs": [
      {
        "name": "role_manager",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateAccountant",
    "inputs": [
      {
        "name": "accountant",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateDepositLimitModule",
    "inputs": [
      {
        "name": "deposit_limit_module",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateWithdrawLimitModule",
    "inputs": [
      {
        "name": "withdraw_limit_module",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateDefaultQueue",
    "inputs": [
      {
        "name": "new_default_queue",
        "type": "address[]",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateUseDefaultQueue",
    "inputs": [
      {
        "name": "use_default_queue",
        "type": "bool",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdatedMaxDebtForStrategy",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "new_debt",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateDepositLimit",
    "inputs": [
      {
        "name": "deposit_limit",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateMinimumTotalIdle",
    "inputs": [
      {
        "name": "minimum_total_idle",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateProfitMaxUnlockTime",
    "inputs": [
      {
        "name": "profit_max_unlock_time",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "DebtPurchased",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Shutdown",
    "inputs": [],
    "anonymous": false,
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "constructor",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "asset",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "role_manager",
        "type": "address"
      },
      {
        "name": "profit_max_unlock_time",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_accountant",
    "inputs": [
      {
        "name": "new_accountant",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_default_queue",
    "inputs": [
      {
        "name": "new_default_queue",
        "type": "address[]"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_use_default_queue",
    "inputs": [
      {
        "name": "use_default_queue",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_deposit_limit",
    "inputs": [
      {
        "name": "deposit_limit",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_deposit_limit",
    "inputs": [
      {
        "name": "deposit_limit",
        "type": "uint256"
      },
      {
        "name": "override",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_deposit_limit_module",
    "inputs": [
      {
        "name": "deposit_limit_module",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_deposit_limit_module",
    "inputs": [
      {
        "name": "deposit_limit_module",
        "type": "address"
      },
      {
        "name": "override",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_withdraw_limit_module",
    "inputs": [
      {
        "name": "withdraw_limit_module",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_minimum_total_idle",
    "inputs": [
      {
        "name": "minimum_total_idle",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setProfitMaxUnlockTime",
    "inputs": [
      {
        "name": "new_profit_max_unlock_time",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_role",
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "role",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "add_role",
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "role",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "remove_role",
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "role",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transfer_role_manager",
    "inputs": [
      {
        "name": "role_manager",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "accept_role_manager",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "isShutdown",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "unlockedShares",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "pricePerShare",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "get_default_queue",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "process_report",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "buy_debt",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "add_strategy",
    "inputs": [
      {
        "name": "new_strategy",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "add_strategy",
    "inputs": [
      {
        "name": "new_strategy",
        "type": "address"
      },
      {
        "name": "add_to_queue",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "revoke_strategy",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "force_revoke_strategy",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "update_max_debt_for_strategy",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "new_max_debt",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "update_debt",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "target_debt",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "update_debt",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "target_debt",
        "type": "uint256"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "shutdown_vault",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deposit",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      },
      {
        "name": "strategies",
        "type": "address[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "redeem",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "redeem",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "redeem",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      },
      {
        "name": "strategies",
        "type": "address[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "permit",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "deadline",
        "type": "uint256"
      },
      {
        "name": "v",
        "type": "uint8"
      },
      {
        "name": "r",
        "type": "bytes32"
      },
      {
        "name": "s",
        "type": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalAssets",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalIdle",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalDebt",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "convertToShares",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "previewDeposit",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "previewMint",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "convertToAssets",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxDeposit",
    "inputs": [
      {
        "name": "receiver",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxMint",
    "inputs": [
      {
        "name": "receiver",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxWithdraw",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxWithdraw",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxWithdraw",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      },
      {
        "name": "strategies",
        "type": "address[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxRedeem",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxRedeem",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxRedeem",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "max_loss",
        "type": "uint256"
      },
      {
        "name": "strategies",
        "type": "address[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "previewWithdraw",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "previewRedeem",
    "inputs": [
      {
        "name": "shares",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "FACTORY",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "apiVersion",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "assess_share_of_unrealised_losses",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "assets_needed",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "profitMaxUnlockTime",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "fullProfitUnlockDate",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "profitUnlockingRate",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "lastProfitUpdate",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "DOMAIN_SEPARATOR",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "asset",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "strategies",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "activation",
            "type": "uint256"
          },
          {
            "name": "last_report",
            "type": "uint256"
          },
          {
            "name": "current_debt",
            "type": "uint256"
          },
          {
            "name": "max_debt",
            "type": "uint256"
          }
        ]
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "default_queue",
    "inputs": [
      {
        "name": "arg0",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "use_default_queue",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "allowance",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      },
      {
        "name": "arg1",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "minimum_total_idle",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "deposit_limit",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "accountant",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "deposit_limit_module",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "withdraw_limit_module",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "roles",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "role_manager",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "future_role_manager",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "nonces",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  }
]
```

## Byte code

```bin
0x34615c965730600155615c7b61001a61000039615c7b610000f36003361161000c576123a7565b60003560e01c34615c69576375b30be681186102845760e43610615c69576004358060a01c615c69576040526024356004016040813511615c69578035806060526020820181816080375050506044356004016020813511615c695780358060c05260208201803560e0525050506064358060a01c615c695761010052600154156100f557600b610120527f696e697469616c697a65640000000000000000000000000000000000000000006101405261012050610120518061014001601f826000031636823750506308c379a060e052602061010052601f19601f61012051011660440160fcfd5b60405161016057600c610120527f5a45524f204144445245535300000000000000000000000000000000000000006101405261012050610120518061014001601f826000031636823750506308c379a060e052602061010052601f19601f61012051011660440160fcfd5b610100516101cc57600c610120527f5a45524f204144445245535300000000000000000000000000000000000000006101405261012050610120518061014001601f826000031636823750506308c379a060e052602061010052601f19601f61012051011660440160fcfd5b60405160015560405163313ce567610120526020610120600461013c845afa6101fa573d600060003e3d6000fd5b60203d10615c6957610120518060081c615c695761016052610160905051600255336003556301e1855860843511615c695760843560245560605180601e55600081601f0160051c60028111615c6957801561026a57905b8060051b6080015181601f0155600101818118610252575b50505060c0518060215560e0516022555061010051601c55005b6371da8a8d81186102e75760243610615c69576004358060a01c615c695760c0523360405260086060526102b6615bf1565b60c05160185560c0517f28709a2dab2a5d5e8688e96159011151c51644ab21839a8a45b449634d7c8b2b600060e0a2005b632d9caa4e81186104c55760443610615c6957600435600401600a813511615c695780358060c052600081600a8111615c6957801561034757905b8060051b6020850101358060a01c615c69578160051b60e00152600101818118610322575b5050505033604052601060605261035c615bf1565b600060c051600a8111615c6957801561040457905b8060051b60e00151610220526004610220516020526000526040600020546103f9576009610240527f21696e61637469766500000000000000000000000000000000000000000000006102605261024050610240518061026001601f826000031636823750506308c379a061020052602061022052601f19601f61024051011660440161021cfd5b600101818118610371575b505060c051806005558060051b600081601f0160051c600a8111615c6957801561044257905b8060051b60e00151816006015560010181811861042a575b505050507f0bc0cb8c5ccee13e6a2fd26a699f57ad7ff6e454e6aae97ec41cd2eb9ebd63a5602080610220528061022001600060c0518083528060051b600082600a8111615c695780156104af57905b8060051b60e001518160051b602088010152600101818118610492575b50508201602001915050905081019050610220a1005b6329c8a33b811861052b5760243610615c69576004358060011c615c695760c0523360405260106060526104f7615bf1565b60c0516010557f1f88e73ebc721f227812938fe07a069ec1f7136aafacb397ed460bd15dee13f160c05160e052602060e0a1005b636fe01d1e81186105485760243610615c6957600060c05261056a565b6381685796811861065f5760443610615c69576024358060011c615c695760c0525b602354615c695733604052610100606052610583615bf1565b60c0516105f5576019541561062b57600c60e0527f7573696e67206d6f64756c6500000000000000000000000000000000000000006101005260e05060e0518061010001601f826000031636823750506308c379a060a052602060c052601f19601f60e051011660440160bcfd61062b565b6019541561062b57600060195560007f777d215db24fb9fee4ded85c66b422abd7162a1caa6ed3ec4c031f6cd29ada52600060e0a25b6004356017557fae565aab888bca5e19e25a13db7b0c9144305bf55cb0f3f4d724f730e5acdd6260043560e052602060e0a1005b63bb435466811861067c5760243610615c6957600060e05261069e565b639823dd7881186108085760443610615c69576024358060011c615c695760e0525b6004358060a01c615c695760c052602354615c6957336040526101006060526106c5615bf1565b60e05161073c5760175419156107d6576013610100527f7573696e67206465706f736974206c696d6974000000000000000000000000006101205261010050610100518061012001601f826000031636823750506308c379a060c052602060e052601f19601f61010051011660440160dcfd6107d6565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff601754146107d6577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6017557fae565aab888bca5e19e25a13db7b0c9144305bf55cb0f3f4d724f730e5acdd627fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610100526020610100a15b60c05160195560c0517f777d215db24fb9fee4ded85c66b422abd7162a1caa6ed3ec4c031f6cd29ada526000610100a2005b637b675894811861086c5760243610615c69576004358060a01c615c695760c0523360405261020060605261083b615bf1565b60c051601a5560c0517fce6e3f8beda82a13c441d76efd4a6335760f219f38c60502e6680060874e109d600060e0a2005b63bdd81c0181186108c55760243610615c695733604052610400606052610891615bf1565b6004356016557f01a4494beed88920b88742cc58f2744e198f55ff192635a1fbabc6be8ffade8160043560c052602060c0a1005b63df69b22a81186109c75760243610615c6957336040526108006060526108ea615bf1565b6301e18558600435111561095557601b60c0527f70726f66697420756e6c6f636b2074696d6520746f6f206c6f6e67000000000060e05260c05060c0518060e001601f826000031636823750506308c379a0608052602060a052601f19601f60c0510116604401609cfd5b6004356109935760113060205260005260406000205460c05260c051156109885760c05160405230606052610988612a38565b600060265560006025555b6004356024557ff361aed463da6fa20358e45c6209f1d3e16d4eca706e6eab0b0aeb338729c77a60043560c052602060c0a1005b632cf7fd858118610a415760443610615c69576004358060a01c615c695760405260243580600e1c615c6957606052601c543318615c6957606051601b6040516020526000526040600020556060516040517f78557646b1d8efa2cd49740d66df5aca39eb610ca8ca0e1ccac08979b6b2c46e60006080a3005b63a97cefa28118610adb5760443610615c69576004358060a01c615c695760405260243580600e1c615c6957606052601c543318615c6957606051601b60405160205260005260406000205417601b604051602052600052604060002055601b6040516020526000526040600020546040517f78557646b1d8efa2cd49740d66df5aca39eb610ca8ca0e1ccac08979b6b2c46e60006080a3005b63e2bf56dd8118610b795760443610615c69576004358060a01c615c695760405260243580600e1c615c6957606052601c543318615c6957606051613fff18601b60405160205260005260406000205416601b604051602052600052604060002055601b6040516020526000526040600020546040517f78557646b1d8efa2cd49740d66df5aca39eb610ca8ca0e1ccac08979b6b2c46e60006080a3005b63ef54cefd8118610bab5760243610615c69576004358060a01c615c6957604052601c543318615c6957604051601d55005b63f776bf1f8118610bf95760043610615c6957601d543318615c695733601c556000601d55337fce93baa0b608a7d420822b6b90cfcccb70574363ba4fd26ef5ac17dd465016c460006040a2005b63bf86d6908118610c185760043610615c695760235460405260206040f35b63d9a0e97a8118610c3b5760043610615c69576020610c376080612a9b565b6080f35b6399530b068118610c795760043610615c69576020600254604d8111615c695780600a0a905060a052600160c052610c74610140612b49565b610140f35b63a9bbf1cc8118610ce35760043610615c69576020806040528060400160006005548083528060051b600082600a8111615c69578015610ccf57905b80600601548160051b602088010152600101818118610cb5575b505082016020019150509050810190506040f35b636ec2b8d48118610d445760243610615c69576004358060a01c615c69576104e052600054600214615c69576002600055336040526020606052610d25615bf1565b60406104e0516101a052610d3a61050061539d565b6105006003600055f35b63e5e91818811861110c5760443610615c69576004358060a01c615c69576101a052600054600214615c6957600260005533604052611000606052610d87615bf1565b60046101a051602052600052604060002054610e0357600a6101c0527f6e6f7420616374697665000000000000000000000000000000000000000000006101e0526101c0506101c051806101e001601f826000031636823750506308c379a06101805260206101a052601f19601f6101c051011660440161019cfd5b60046101a0516020526000526040600020600281019050546101c0526024356101e0526101c051610e9457600e610200527f6e6f7468696e6720746f206275790000000000000000000000000000000000006102205261020050610200518061022001601f826000031636823750506308c379a06101c05260206101e052601f19601f6102005101166044016101dcfd5b6101e051610f02576013610200527f6e6f7468696e6720746f206275792077697468000000000000000000000000006102205261020050610200518061022001601f826000031636823750506308c379a06101c05260206101e052601f19601f6102005101166044016101dcfd5b6101c0516101e0511115610f19576101c0516101e0525b6101a0516370a082316102205230610240526020610220602461023c845afa610f47573d600060003e3d6000fd5b60203d10615c69576102209050516101e051808202811583838304141715615c6957905090506101c0518015615c6957808204905090506102005261020051610ff057600f610220527f63616e6e6f7420627579207a65726f00000000000000000000000000000000006102405261022050610220518061024001601f826000031636823750506308c379a06101e052602061020052601f19601f6102205101166044016101fcfd5b60015460405233606052306080526101e05160a05261100d612de8565b60046101a051602052600052604060002060028101905080546101e051808203828111615c6957905090508155506014546101e051808203828111615c6957905090506014556015546101e051808201828110615c6957905090506015556101a0517f5e2b8821ad6e0e26207e0cb4d242d07eeb1cbb1cfd853e645bdcd27cc5484f956101c051610220526101c0516101e051808203828111615c695790509050610240526040610220a26101a05160405233606052610200516080526110d2612ec4565b6101a0517fe94e7f88819f66c19b097748cb754149f63b1a176ed425dee1f1ee933e6d09b06101e051610220526020610220a26003600055005b63de7aeb41811861112a5760243610615c695760016101405261114d565b63c2e73cca81186111855760443610615c69576024358060011c615c6957610140525b6004358060a01c615c69576101205233604052600160605261116d615bf1565b61012051604052610140516060526111836146ad565b005b63577db31681186111ce5760243610615c69576004358060a01c615c6957610220523360405260026060526111b8615bf1565b6102205160405260006060526111cc6148cc565b005b63fd129e6381186112175760243610615c69576004358060a01c615c695761022052336040526004606052611201615bf1565b6102205160405260016060526112156148cc565b005b63b9ddcd6881186113095760443610615c69576004358060a01c615c695760c052336040526080606052611249615bf1565b600460c0516020526000526040600020546112bd57601160e0527f696e6163746976652073747261746567790000000000000000000000000000006101005260e05060e0518061010001601f826000031636823750506308c379a060a052602060c052601f19601f60e051011660440160bcfd5b602435600460c05160205260005260406000206003810190505560c051337fb3eef2123fec1523a6bbc90aceb203000154c1a4974335fe06b544c7534d4b8960243560e052602060e0a3005b630aeebf5581186113285760443610615c695761271061038052611343565b63ba54971f81186113a05760643610615c6957604435610380525b6004358060a01c615c695761036052600054600214615c69576002600055336040526040606052611372615bf1565b6020610360516101605260243561018052610380516101a0526113966103a0614b23565b6103a06003600055f35b6336a5545081186114805760043610615c6957336040526120006060526113c5615bf1565b602354615c695760016023556019541561140757600060195560007f777d215db24fb9fee4ded85c66b422abd7162a1caa6ed3ec4c031f6cd29ada52600060c0a25b60006017557fae565aab888bca5e19e25a13db7b0c9144305bf55cb0f3f4d724f730e5acdd62600060c052602060c0a16040601b3360205260005260406000205417601b336020526000526040600020557f4426aa1fb73e391071491fcfe21a88b5c38a0a0333a1f6e77161470439704cf8600060c0a1005b636e553f6581186114dc5760443610615c69576024358060a01c615c695761026052600054600214615c695760026000556020336101a052610260516101c0526004356101e0526114d2610280613729565b6102806003600055f35b6394bf804d81186115385760443610615c69576024358060a01c615c695761028052600054600214615c695760026000556020336101a052610280516101c0526004356101e05261152e6102a06138c2565b6102a06003600055f35b63b460af9481186115575760643610615c6957604036610780376115ea565b63a318c1a4811861157c5760843610615c69576064356107805260006107a0526115ea565b63d81a09f681186116985760c43610615c695760643561078052608435600401600a813511615c69578035806107a052600081600a8111615c695780156115e557905b8060051b6020850101358060a01c615c69578160051b6107c001526001018181186115bf575b505050505b6024358060a01c615c6957610740526044358060a01c615c695761076052600054600214615c6957600260005560043560a052600260c05261162d610920612c20565b61092051610900523361018052610740516101a052610760516101c0526004356101e052610900516102005261078051610220526107a05180610240528060051b80610260826107c060045afa505050611688610920613b32565b6109205060206109006003600055f35b63ba08765281186116bd5760643610615c69576127106107805260006107a052611750565b639f40a7b381186116e25760843610615c69576064356107805260006107a052611750565b6306580f2d81186117fa5760c43610615c695760643561078052608435600401600a813511615c69578035806107a052600081600a8111615c6957801561174b57905b8060051b6020850101358060a01c615c69578160051b6107c00152600101818118611725575b505050505b6024358060a01c615c6957610740526044358060a01c615c695761076052600054600214615c6957600260005560043560a052600160c052611793610920612b49565b610920516109005260203361018052610740516101a052610760516101c052610900516101e0526004356102005261078051610220526107a05180610240528060051b80610260826107c060045afa5050506117f0610920613b32565b6109206003600055f35b63095ea7b3811861183b5760443610615c69576004358060a01c615c695760c05260203360405260c05160605260243560805261183760e06123ad565b60e0f35b63a9059cbb81186118a05760443610615c69576004358060a01c615c6957610100526101005130811461187057801515611873565b60005b905015615c695733604052610100516060526024356080526118936124f9565b6001610120526020610120f35b6323b872dd81186119175760643610615c69576004358060a01c615c69576101e0526024358060a01c615c695761020052610200513081146118e4578015156118e7565b60005b905015615c695760206101e05161018052610200516101a0526044356101c0526119126102206125e8565b610220f35b63d505accf81186119915760e43610615c69576004358060a01c615c6957610460526024358060a01c615c6957610480526084358060081c615c69576104a05260206104605161018052610480516101a052604060446101c0376104a05161020052604060a46102203761198c6104c0612701565b6104c0f35b6370a082318118611a0e5760243610615c69576004358060a01c615c695760805230608051186119f35760116080516020526000526040600020546119d660a0612a9b565b60a051808203828111615c69579050905060c052602060c0611a0c565b601160805160205260005260406000205460a052602060a05bf35b6318160ddd8118611a315760043610615c69576020611a2d60a0612b0d565b60a0f35b6301e1d1148118611a545760043610615c69576020611a506040612b30565b6040f35b639aa7df948118611a735760043610615c695760155460405260206040f35b63fc7b9c188118611a925760043610615c695760145460405260206040f35b63c6e6f5928118611ac25760243610615c6957602060043560a052600160c052611abd610160612c20565b610160f35b63ef8b30f78118611af25760243610615c6957602060043560a052600160c052611aed610160612c20565b610160f35b63b3d7f6b98118611b225760243610615c6957602060043560a052600260c052611b1d610140612b49565b610140f35b6307a2d13a8118611b525760243610615c6957602060043560a052600160c052611b4d610140612b49565b610140f35b63402d267d8118611b8b5760243610615c69576004358060a01c615c695760e052602060e051604052611b866101006130c3565b610100f35b63c63d75b68118611be55760243610615c69576004358060a01c615c69576101605261016051604052611bbf6101a06130c3565b6101a0516101805260206101805160a052600160c052611be06101a0612c20565b6101a0f35b63ce96cb778118611c045760243610615c695760403661060037611c97565b6385b687568118611c295760443610615c695760243561060052600061062052611c97565b6365cb67658118611ce45760843610615c695760243561060052604435600401600a813511615c695780358061062052600081600a8111615c69578015611c9257905b8060051b6020850101358060a01c615c69578160051b6106400152600101818118611c6c575b505050505b6004358060a01c615c69576105e05260206105e0516101405261060051610160526106205180610180528060051b806101a08261064060045afa505050611cdf6107806132b4565b610780f35b63d905777e8118611d095760243610615c695761271061060052600061062052611d9c565b634abe41378118611d2e5760443610615c695760243561060052600061062052611d9c565b6334b5fab68118611e375760843610615c695760243561060052604435600401600a813511615c695780358061062052600081600a8111615c69578015611d9757905b8060051b6020850101358060a01c615c69578160051b6106400152600101818118611d71575b505050505b6004358060a01c615c69576105e0526105e0516101405261060051610160526106205180610180528060051b806101a08261064060045afa505050611de26107806132b4565b610780516107c05260016107e0526107c05160a0526107e05160c052611e096107a0612c20565b6107a05160116105e05160205260005260406000205480828118828410021890509050610800526020610800f35b630a28a4778118611e675760243610615c6957602060043560a052600260c052611e62610160612c20565b610160f35b634cdad5068118611e975760243610615c6957602060043560a052600160c052611e92610140612b49565b610140f35b632dd310008118611eb65760043610615c695760035460405260206040f35b63258294108118611f3e5760043610615c695760208060805260056040527f332e302e3200000000000000000000000000000000000000000000000000000060605260408160800181518082526020830160208301815181525050508051806020830101601f82600003163682375050601f19601f8251602001011690509050810190506080f35b6366d3ae578118611f9f5760443610615c69576004358060a01c615c69576101205260243560046101205160205260005260406000206002810190505410615c6957602061012051604052602435606052611f9a610140613181565b610140f35b630952864e8118611fbe5760043610615c695760245460405260206040f35b632d6326928118611fdd5760043610615c695760255460405260206040f35b635141eebb8118611ffc5760043610615c695760265460405260206040f35b638afca8f0811861201b5760043610615c695760275460405260206040f35b633644e51581186120405760043610615c6957602061203b610180612627565b610180f35b6338d52e0f811861205f5760043610615c695760015460405260206040f35b63313ce567811861207e5760043610615c695760025460405260206040f35b6339ebf82381186120d35760243610615c69576004358060a01c615c69576040526004604051602052600052604060002080546060526001810154608052600281015460a052600381015460c0525060806060f35b638bf03b9e81186121005760243610615c6957600435600554811015615c69576006015460405260206040f35b631e56558d811861211f5760043610615c695760105460405260206040f35b63dd62ed3e81186121795760443610615c69576004358060a01c615c69576040526024358060a01c615c69576060526012604051602052600052604060002080606051602052600052604060002090505460805260206080f35b63356d640981186121985760043610615c695760165460405260206040f35b63e46a579781186121b75760043610615c695760175460405260206040f35b634fb3ccc581186121d65760043610615c695760185460405260206040f35b6361c2ccf481186121f55760043610615c695760195460405260206040f35b63f5ba68f381186122145760043610615c6957601a5460405260206040f35b6399374642811861224f5760243610615c69576004358060a01c615c6957604052601b60405160205260005260406000205460605260206060f35b6379b98917811861226e5760043610615c6957601c5460405260206040f35b639a98f418811861228d5760043610615c6957601d5460405260206040f35b6306fdde0381186123125760043610615c695760208060405280604001601e5480825260208201600082601f0160051c60028111615c695780156122e457905b80601f01548160051b8401526001018181186122cd575b505050508051806020830101601f82600003163682375050601f19601f825160200101169050810190506040f35b6395d89b41811861236a5760043610615c69576020806040528060400160215480825260208201602254815250508051806020830101601f82600003163682375050601f19601f825160200101169050810190506040f35b637ecebe0081186123a55760243610615c69576004358060a01c615c6957604052602860405160205260005260406000205460605260206060f35b505b60006000fd5b608051601260405160205260005260406000208060605160205260005260406000209050556060516040517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560805160a052602060a0a36001815250565b601260c05160205260005260406000208060e0516020526000526040600020905054610120527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61012051146124f757610100516101205110156124cf576016610140527f696e73756666696369656e7420616c6c6f77616e6365000000000000000000006101605261014050610140518061016001601f826000031636823750506308c379a061010052602061012052601f19601f61014051011660440161011cfd5b60c05160405260e0516060526101005161012051036080526124f26101406123ad565b610140505b565b601160405160205260005260406000205460a05260805160a051101561257657601260c0527f696e73756666696369656e742066756e6473000000000000000000000000000060e05260c05060c0518060e001601f826000031636823750506308c379a0608052602060a052601f19601f60c0510116604401609cfd5b60805160a05103601160405160205260005260406000205560805160116060516020526000526040600020540160116060516020526000526040600020556060516040517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60805160c052602060c0a3565b6101805160c0523360e0526101c0516101005261260361240b565b610180516040526101a0516060526101c0516080526126206124f9565b6001815250565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8160e00152602081019050600b6040527f596561726e205661756c7400000000000000000000000000000000000000000060605260408051602082012090508160e0015260208101905060056080527f332e302e3200000000000000000000000000000000000000000000000000000060a05260808051602082012090508160e00152602081019050468160e00152602081019050308160e001526020810190508060c05260c09050805160208201209050815250565b6101805161276f57600d610260527f696e76616c6964206f776e6572000000000000000000000000000000000000006102805261026050610260518061028001601f826000031636823750506308c379a061022052602061024052601f19601f61026051011660440161023cfd5b426101e05110156127e057600e610260527f7065726d697420657870697265640000000000000000000000000000000000006102805261026050610260518061028001601f826000031636823750506308c379a061022052602061024052601f19601f61026051011660440161023cfd5b60286101805160205260005260406000205461026052600060026102a0527f19010000000000000000000000000000000000000000000000000000000000006102c0526102a08051602082018361040001815181525050808301925050506128496102e0612627565b6102e05181610400015260208101905060007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9816103200152602081019050610180518161032001526020810190506101a0518161032001526020810190506101c051816103200152602081019050610260518161032001526020810190506101e05181610320015260208101905080610300526103009050805160208201209050816104000152602081019050806103e0526103e090508051602082012090506102805261018051610280516102a052610200516102c052610220516102e05261024051610300526020600060806102a060015afa5060005118156129af576011610340527f696e76616c6964207369676e61747572650000000000000000000000000000006103605261034050610340518061036001601f826000031636823750506308c379a061030052602061032052601f19601f61034051011660440161031cfd5b6101c0516012610180516020526000526040600020806101a05160205260005260406000209050556102605160018101818110615c695790506028610180516020526000526040600020556101a051610180517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256101c0516102a05260206102a0a36001815250565b601160605160205260005260406000208054604051808203828111615c6957905090508155506040516013540360135560006060517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160805260206080a3565b60255460405260006060524260405111612ace5760405115612b0557601130602052600052604060002054606052612b05565b60265442602754808203828111615c695790509050808202811583838304141715615c69579050905064e8d4a51000810490506060525b606051815250565b601354612b1a6080612a9b565b608051808203828111615c695790509050815250565b601554601454808201828110615c695790509050815250565b60a05119612b58576001612b5d565b60a051155b15612b6d5760a051815250612c1e565b612b78610100612b0d565b6101005160e05260e051612b915760a051815250612c1e565b60a051612b9f610120612b30565b61012051808202811583838304141715615c695790509050610100526101005160e0518015615c69578082049050905061012052600260c05118612bf8576101005160e0518015615c6957808206905090501515612bfb565b60005b15612c16576101205160018101818110615c69579050610120525b610120518152505b565b60a05119612c2f576001612c34565b60a051155b15612c445760a051815250612d14565b612c4f610100612b0d565b6101005160e052612c61610120612b30565b610120516101005261010051612c915760e051612c875760a051815250612d1456612c91565b6000815250612d14565b60a05160e051808202811583838304141715615c6957905090506101205261012051610100518015615c69578082049050905061014052600260c05118612cee5761012051610100518015615c6957808206905090501515612cf1565b60005b15612d0c576101405160018101818110615c69579050610140525b610140518152505b565b60405163095ea7b360a05260605160c05260805160e052602060a0604460bc6000855af1612d49573d600060003e3d6000fd5b3d612d6057803b15615c6957600161010052612d78565b60203d10615c695760a0518060011c615c6957610100525b610100905051612de657600f610120527f617070726f76616c206661696c656400000000000000000000000000000000006101405261012050610120518061014001601f826000031636823750506308c379a060e052602061010052601f19601f61012051011660440160fcfd5b565b6040516323b872dd60c05260605160e0526080516101005260a05161012052602060c0606460dc6000855af1612e23573d600060003e3d6000fd5b3d612e3a57803b15615c6957600161014052612e52565b60203d10615c695760c0518060011c615c6957610140525b610140905051612ec257600f610160527f7472616e73666572206661696c656400000000000000000000000000000000006101805261016050610160518061018001601f826000031636823750506308c379a061012052602061014052601f19601f61016051011660440161013cfd5b565b60405163a9059cbb60a05260605160c05260805160e052602060a0604460bc6000855af1612ef7573d600060003e3d6000fd5b3d612f0e57803b15615c6957600161010052612f26565b60203d10615c695760a0518060011c615c6957610100525b610100905051612f9457600f610120527f7472616e73666572206661696c656400000000000000000000000000000000006101405261012050610120518061014001601f826000031636823750506308c379a060e052602061010052601f19601f61012051011660440160fcfd5b565b6040516011606051602052600052604060002054016011606051602052600052604060002055601354604051808201828110615c69579050905060135560605160007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160805260206080a3565b613011610100612b0d565b6101005160e052613023610120612b30565b610120516101005260006101205260e0516130445760a05161012052613092565b60a0516101005111156130925760a05160e051808202811583838304141715615c6957905090506101005160a051808203828111615c6957905090508015615c695780820490509050610120525b610120516130a45760008152506130c1565b6101205160405260c0516060526130b9612f96565b610120518152505b565b604051806130d25760016130d7565b308118155b9050156130e857600081525061317f565b601954606052606051156131365760605163320704ed60805260405160a052602060806024609c845afa613121573d600060003e3d6000fd5b60203d10615c6957608090505181525061317f565b6017546080526080511961314f5760805181525061317f565b61315960c0612b30565b60c05160a05260805160a0511061317457600081525061317f565b60a051608051038152505b565b60046040516020526000526040600020600281019050546080526040516370a0823160c0523060e052602060c0602460dc845afa6131c4573d600060003e3d6000fd5b60203d10615c695760c090505160a0526040516307a2d13a60e05260a05161010052602060e0602460fc845afa613200573d600060003e3d6000fd5b60203d10615c695760e090505160c05260805160c05110156132255760805115613228565b60015b156132375760008152506132b2565b60605160c051808202811583838304141715615c69579050905060e05260605160e0516080518015615c695780820490509050808203828111615c6957905090506101005260e0516080518015615c695780820690509050156132aa576101005160018101818110615c69579050610100525b610100518152505b565b60116101405160205260005260406000205460a052600160c0526132d9610300612b49565b610300516102e052601a546103005261030051156133ac576103005163c36a0eee61032052606061014051610340526101605161036052806103805280610340016000610180518083528060051b600082600a8111615c6957801561335857905b8060051b6101a001518160051b60208801015260010181811861333a575b5050820160200191505090508101505060206103206101c461033c845afa613385573d600060003e3d6000fd5b60203d10615c69576103209050516102e05180828118828410021890509050815250613727565b60155461032052610320516102e051111561371f57610320516103405260006103605260055480610380528060051b600081601f0160051c600a8111615c6957801561340d57905b80600601548160051b6103a001526001018181186133f4575b5050505061018051156134235760105415613426565b60005b15613448576101805180610380528060051b806103a0826101a060045afa5050505b600061038051600a8111615c6957801561371457905b8060051b6103a001516104e05260046104e0516020526000526040600020546134e7576011610500527f696e6163746976652073747261746567790000000000000000000000000000006105205261050050610500518061052001601f826000031636823750506308c379a06104c05260206104e052601f19601f6105005101166044016104dcfd5b6102e05161034051808203828111615c69579050905060046104e05160205260005260406000206002810190505480828118828410021890509050610500526104e0516040526105005160605261353f610540613181565b61054051610520526104e0516307a2d13a6105a0526104e05163d905777e6105605230610580526020610560602461057c845afa613582573d600060003e3d6000fd5b60203d10615c69576105609050516105c05260206105a060246105bc845afa6135b0573d600060003e3d6000fd5b60203d10615c69576105a0905051610540526105005161052051808203828111615c6957905090506105605261056051610540511015613640576105205115613625576105205161054051808202811583838304141715615c695790509050610560518015615c695780820490509050610520525b6105405161052051808201828110615c695790509050610500525b6105005161364d57613709565b61052051156136645761270f610160511115613667565b60005b156136c2576103405161050051808201828110615c69579050905061016051808202811583838304141715615c695790509050612710810490506103605161052051808201828110615c69579050905011156136c257613714565b6103405161050051808201828110615c695790509050610340526102e05161034051106136ee57613714565b6103605161052051808201828110615c695790509050610360525b60010181811861345e575b5050610340516102e0525b6102e0518152505b565b602354615c69576101c0516040526137426102006130c3565b610200516101e05111156137b6576014610220527f657863656564206465706f736974206c696d69740000000000000000000000006102405261022050610220518061024001601f826000031636823750506308c379a06101e052602061020052601f19601f6102205101166044016101fcfd5b60015460405233606052306080526101e05160a0526137d3612de8565b6015546101e051808201828110615c6957905090506015556101e05160a0526101c05160c052613804610220613006565b61022051610200526102005161387a576010610220527f63616e6e6f74206d696e74207a65726f000000000000000000000000000000006102405261022050610220518061024001601f826000031636823750506308c379a06101e052602061020052601f19601f6102205101166044016101fcfd5b6101c0516101a0517fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d76101e0516102205261020051610240526040610220a361020051815250565b602354615c69576101e05160a052600260c0526138e0610220612b49565b610220516102005261020051613956576013610220527f63616e6e6f74206465706f736974207a65726f000000000000000000000000006102405261022050610220518061024001601f826000031636823750506308c379a06101e052602061020052601f19601f6102205101166044016101fcfd5b6101c0516040526139686102206130c3565b610220516102005111156139dc576014610240527f657863656564206465706f736974206c696d69740000000000000000000000006102605261024050610240518061026001601f826000031636823750506308c379a061020052602061022052601f19601f61024051011660440161021cfd5b60015460405233606052306080526102005160a0526139f9612de8565b60155461020051808201828110615c6957905090506015556101e0516040526101c051606052613a27612f96565b6101c0516101a0517fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d761020051610220526101e051610240526040610220a361020051815250565b604051630a28a47760a05260605160c052602060a0602460bc845afa613a9a573d600060003e3d6000fd5b60203d10615c695760a09050516040516370a0823160e0523061010052602060e0602460fc845afa613ad1573d600060003e3d6000fd5b60203d10615c695760e09050518082811882841002189050905060805260405163ba08765260a05260805160c0523060e0523061010052602060a0606460bc6000855af1613b24573d600060003e3d6000fd5b60203d10615c695760a05050565b6101a051613ba057600c6103a0527f5a45524f204144445245535300000000000000000000000000000000000000006103c0526103a0506103a051806103c001601f826000031636823750506308c379a061036052602061038052601f19601f6103a051011660440161037cfd5b61020051613c0e5760136103a0527f6e6f2073686172657320746f2072656465656d000000000000000000000000006103c0526103a0506103a051806103c001601f826000031636823750506308c379a061036052602061038052601f19601f6103a051011660440161037cfd5b6101e051613c7c5760156103a0527f6e6f2061737365747320746f20776974686472617700000000000000000000006103c0526103a0506103a051806103c001601f826000031636823750506308c379a061036052602061038052601f19601f6103a051011660440161037cfd5b612710610220511115613cef5760086103a0527f6d6178206c6f73730000000000000000000000000000000000000000000000006103c0526103a0506103a051806103c001601f826000031636823750506308c379a061036052602061038052601f19601f6103a051011660440161037cfd5b601a546103a0526103a05115613e11576103a05163c36a0eee6103c05260606101c0516103e05261022051610400528061042052806103e0016000610240518083528060051b600082600a8111615c69578015613d6657905b8060051b61026001518160051b602088010152600101818118613d48575b5050820160200191505090508101505060206103c06101c46103dc845afa613d93573d600060003e3d6000fd5b60203d10615c69576103c09050516101e0511115613e115760156105a0527f657863656564207769746864726177206c696d697400000000000000000000006105c0526105a0506105a051806105c001601f826000031636823750506308c379a061056052602061058052601f19601f6105a051011660440161057cfd5b6102005160116101c0516020526000526040600020541015613e9357601d6103c0527f696e73756666696369656e742073686172657320746f2072656465656d0000006103e0526103c0506103c051806103e001601f826000031636823750506308c379a06103805260206103a052601f19601f6103c051011660440161039cfd5b6101c0516101805114613ebe576101c05160c0526101805160e0526102005161010052613ebe61240b565b6101e0516103c0526015546103e052600154610400526103e0516103c051111561454d5760055480610420528060051b600081601f0160051c600a8111615c69578015613f2057905b80600601548160051b6104400152600101818118613f07575b505050506102405115613f365760105415613f39565b60005b15613f5b576102405180610420528060051b806104408261026060045afa5050505b601454610580526103e0516103c051036105a05260006105c052610400516370a082316106005230610620526020610600602461061c845afa613fa3573d600060003e3d6000fd5b60203d10615c69576106009050516105e052600061042051600a8111615c695780156144cf57905b8060051b610440015161060052600461060051602052600052604060002054614054576011610620527f696e6163746976652073747261746567790000000000000000000000000000006106405261062050610620518061064001601f826000031636823750506308c379a06105e052602061060052601f19601f6106205101166044016105fcfd5b600461060051602052600052604060002060028101905054610620526105a05161062051808281188284100218905090506105c052610600516307a2d13a6106a0526106005163d905777e6106605230610680526020610660602461067c845afa6140c4573d600060003e3d6000fd5b60203d10615c69576106609050516106c05260206106a060246106bc845afa6140f2573d600060003e3d6000fd5b60203d10615c69576106a090505161064052610600516040526105c05160605261411d610680613181565b610680516106605261066051156142a9576105c05161066051808203828111615c6957905090506106405110156141b4576105c05161066051808203828111615c695790509050610680526106605161064051808202811583838304141715615c695790509050610680518015615c695780820490509050610660526106405161066051808201828110615c6957905090506105c0525b6105c05161066051808203828111615c6957905090506105c0526103c05161066051808203828111615c6957905090506103c0526105a05161066051808203828111615c6957905090506105a0526105805161066051808203828111615c695790509050610580526106405161422f57610660511515614232565b60005b156142a9576106205161066051808203828111615c6957905090506106805261068051600461060051602052600052604060002060028101905055610600517f5e2b8821ad6e0e26207e0cb4d242d07eeb1cbb1cfd853e645bdcd27cc5484f95610620516106a052610680516106c05260406106a0a25b6105c05161064051808281188284100218905090506105c0526105c0516142cf576144c4565b610600516040526105c0516060526142e5613a6f565b610400516370a082316106a052306106c05260206106a060246106bc845afa614313573d600060003e3d6000fd5b60203d10615c69576106a090505161068052610680516105e051808203828111615c6957905090506106a05260006106c0526105c0516106a05111614372576105c0516106a05110156143ac576106a0516105c051036106c0526143ac565b610620516106a051116143a3576105c0516105c0516106a05103808201828110615c6957905090506105c0526143ac565b610620516105c0525b6103e0516105c0516106c051808203828111615c695790509050808201828110615c6957905090506103e0526103c0516106c051808203828111615c6957905090506103c052610580516105c051808203828111615c69579050905061058052610620516105c05161066051808201828110615c695790509050808203828111615c6957905090506106e0526106e051600461060051602052600052604060002060028101905055610600517f5e2b8821ad6e0e26207e0cb4d242d07eeb1cbb1cfd853e645bdcd27cc5484f9561062051610700526106e051610720526040610700a26103e0516103c051116144a1576144cf565b610680516105e0526105a0516105c051808203828111615c6957905090506105a0525b600101818118613fcb575b50506103c0516103e051101561454557601c610600527f696e73756666696369656e742061737365747320696e207661756c74000000006106205261060050610600518061062001601f826000031636823750506308c379a06105c05260206105e052601f19601f6106005101166044016105dcfd5b610580516014555b6103c0516101e0511161456157600061456b565b61270f6102205111155b15614615576101e05161022051808202811583838304141715615c695790509050612710810490506101e0516103c051808203828111615c695790509050111561461557600d610420527f746f6f206d756368206c6f7373000000000000000000000000000000000000006104405261042050610420518061044001601f826000031636823750506308c379a06103e052602061040052601f19601f6104205101166044016103fcfd5b610200516040526101c05160605261462b612a38565b6103e0516103c051808203828111615c695790509050601555610400516040526101a0516060526103c051608052614661612ec4565b6101c0516101a051610180517ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db6103c0516104205261020051610440526040610420a46103c051815250565b6040513081146146bf578015156146c2565b60005b905061472557601f60a0527f73747261746567792063616e6e6f74206265207a65726f20616464726573730060c05260a05060a0518060c001601f826000031636823750506308c379a06060526020608052601f19601f60a0510116604401607cfd5b6001546040516338d52e0f608052602060806004609c845afa61474d573d600060003e3d6000fd5b60203d10615c69576080518060a01c615c695760c05260c090505118156147cd57600d60e0527f696e76616c6964206173736574000000000000000000000000000000000000006101005260e05060e0518061010001601f826000031636823750506308c379a060a052602060c052601f19601f60e051011660440160bcfd5b6004604051602052600052604060002054156148405760176080527f737472617465677920616c72656164792061637469766500000000000000000060a0526080506080518060a001601f826000031636823750506308c379a06040526020606052601f19601f6080510116604401605cfd5b6004604051602052600052604060002042815542600182015560006002820155600060038201555060605161487657600061487e565b600960055411155b1561489f5760055460098111615c6957600181016005556040518160060155505b60016040517fde8ff765a5c5dad48d27bc9faa99836fb81f3b07c9dc62cfe005475d6b83a2ca60006080a3565b600460405160205260005260406000205461493e5760136080527f7374726174656779206e6f74206163746976650000000000000000000000000060a0526080506080518060a001601f826000031636823750506308c379a06040526020606052601f19601f6080510116604401605cfd5b6000608052600460405160205260005260406000206002810190505415614a2f576060516149c357601160a0527f737472617465677920686173206465627400000000000000000000000000000060c05260a05060a0518060c001601f826000031636823750506308c379a06060526020608052601f19601f60a0510116604401607cfd5b6004604051602052600052604060002060028101905054608052601454608051808203828111615c6957905090506014556040517f7f2ad1d3ba35276f35ef140f83e3e0f17b23064fd710113d3f7a5ab30d267811600060a05260805160c05260803660e03760c060a0a25b600460405160205260005260406000206000815560006001820155600060028201556000600382015550600060a0526000600554600a8111615c69578015614ab357905b8060060154610200526040516102005114614aa85760a05160098111615c69576001810160a052610200518160051b60c00152505b600101818118614a73575b505060a051806005558060051b600081601f0160051c600a8111615c69578015614af157905b8060051b60c001518160060155600101818118614ad9575b5050505060026040517fde8ff765a5c5dad48d27bc9faa99836fb81f3b07c9dc62cfe005475d6b83a2ca6000610200a3565b610180516101c0526004610160516020526000526040600020600281019050546101e05260235415614b565760006101c0525b6101e0516101c05118614bc957601c610200527f6e6577206465627420657175616c732063757272656e742064656274000000006102205261020050610200518061022001601f826000031636823750506308c379a06101c05260206101e052601f19601f6102005101166044016101dcfd5b6101c0516101e05111614f59576004610160516020526000526040600020600381019050546101c0511115614c5e576020610200527f746172676574206465627420686967686572207468616e206d617820646562746102205261020050610200518061022001601f826000031636823750506308c379a06101c05260206101e052601f19601f6102005101166044016101dcfd5b6101605163402d267d6102205230610240526020610220602461023c845afa614c8c573d600060003e3d6000fd5b60203d10615c69576102209050516102005261020051614d0c576012610220527f6e6f7468696e6720746f206465706f73697400000000000000000000000000006102405261022050610220518061024001601f826000031636823750506308c379a06101e052602061020052601f19601f6102205101166044016101fcfd5b6101c0516101e051808203828111615c6957905090506102205261020051610220511115614d3d5761020051610220525b6016546102405260155461026052610240516102605111614dbe576013610280527f6e6f2066756e647320746f206465706f736974000000000000000000000000006102a0526102805061028051806102a001601f826000031636823750506308c379a061024052602061026052601f19601f61028051011660440161025cfd5b6102405161026051036102805261028051610220511115614de25761028051610220525b6102205115614f3a576001546102a0526102a0516040526101605160605261022051608052614e0f612d16565b6102a0516370a082316102e052306103005260206102e060246102fc845afa614e3d573d600060003e3d6000fd5b60203d10615c69576102e09050516102c05261016051636e553f656102e0526102205161030052306103205260206102e060446102fc6000855af1614e87573d600060003e3d6000fd5b60203d10615c69576102e050506102a0516370a082316103005230610320526020610300602461031c845afa614ec2573d600060003e3d6000fd5b60203d10615c69576103009050516102e0526102a051604052610160516060526000608052614eef612d16565b6102c0516102e051808203828111615c6957905090506102205260155461022051808203828111615c69579050905060155560145461022051808201828110615c6957905090506014555b6101e05161022051808201828110615c6957905090506101c05261533d565b6101c0516101e05103610200526016546102205260155461024052610220516102405161020051808201828110615c6957905090501015614fb857610240516102205103610200526101e051610200511115614fb8576101e051610200525b610160516307a2d13a6102c0526101605163d905777e61028052306102a0526020610280602461029c845afa614ff3573d600060003e3d6000fd5b60203d10615c69576102809050516102e05260206102c060246102dc845afa615021573d600060003e3d6000fd5b60203d10615c69576102c090505161026052610260516150a1576013610280527f6e6f7468696e6720746f207769746864726177000000000000000000000000006102a0526102805061028051806102a001601f826000031636823750506308c379a061024052602061026052601f19601f61028051011660440161025cfd5b610200516102605110156150b85761026051610200525b61016051604052610200516060526150d16102a0613181565b6102a05161028052610280511561514857601e6102a0527f73747261746567792068617320756e7265616c69736564206c6f7373657300006102c0526102a0506102a051806102c001601f826000031636823750506308c379a061026052602061028052601f19601f6102a051011660440161027cfd5b6001546102a0526102a0516370a082316102e052306103005260206102e060246102fc845afa61517d573d600060003e3d6000fd5b60203d10615c69576102e09050516102c05261016051604052610200516060526151a5613a6f565b6102a0516370a082316103005230610320526020610300602461031c845afa6151d3573d600060003e3d6000fd5b60203d10615c69576103009050516102e0526102e0516102c051808203828111615c6957905090506101e051808281188284100218905090506103005261020051610300511061522457600061522e565b61270f6101a05111155b61524d57610200516103005111156152f25761030051610200526152f2565b610200516101a051808202811583838304141715615c695790509050612710810490506102005161030051808203828111615c69579050905011156152f257600d610320527f746f6f206d756368206c6f7373000000000000000000000000000000000000006103405261032050610320518061034001601f826000031636823750506308c379a06102e052602061030052601f19601f6103205101166044016102fcfd5b60155461030051808201828110615c69579050905060155560145461020051808203828111615c6957905090506014556101e05161020051808203828111615c6957905090506101c0525b6101c051600461016051602052600052604060002060028101905055610160517f5e2b8821ad6e0e26207e0cb4d242d07eeb1cbb1cfd853e645bdcd27cc5484f956101e051610200526101c051610220526040610200a26101c051815250565b60046101a0516020526000526040600020546154195760116101c0527f696e6163746976652073747261746567790000000000000000000000000000006101e0526101c0506101c051806101e001601f826000031636823750506308c379a06101805260206101a052601f19601f6101c051011660440161019cfd5b6101a0516370a082316101e052306102005260206101e060246101fc845afa615447573d600060003e3d6000fd5b60203d10615c69576101e09050516101c0526101a0516307a2d13a610200526101c051610220526020610200602461021c845afa61548a573d600060003e3d6000fd5b60203d10615c69576102009050516101e05260046101a0516020526000526040600020600281019050546102005260403661022037610200516101e051116154de576101e0516102005103610240526154ec565b610200516101e05103610220525b60015461026052604036610280376018546102c0526102c05115615619576102c05163921f8a8f6102e0526101a051610300526102205161032052610240516103405260406102e060646102fc6000855af161554d573d600060003e3d6000fd5b60403d10615c69576102e0905080516102805260208101516102a052506102a05115615619576102a051610260516370a082316102e0526102c0516103005260206102e060246102fc845afa6155a8573d600060003e3d6000fd5b60203d10615c69576102e09050516102605163dd62ed3e610320526102c0516103405230610360526020610320604461033c845afa6155ec573d600060003e3d6000fd5b60203d10615c695761032090505180828118828410021890509050808281188284100218905090506102a0525b60a0366102e0376102405161028051808201828110615c69579050905015615750576102405161028051808201828110615c69579050905060a052600260c052615664610380612c20565b61038051610360526102805115615750576103605161028051808202811583838304141715615c6957905090506102405161028051808201828110615c6957905090508015615c6957808204905090506102e052600354635153b199610380526040610380600461039c845afa6156e0573d600060003e3d6000fd5b60403d10615c6957610380518060101c615c69576103e0526103a0518060a01c615c6957610400526103e090508051610300526020810151610340525060016103005112615750576102e05161030051808202811583838304141715615c69579050905061271081049050610320525b6000610380526024546103a052610220516102a051808201828110615c69579050905015615783576103a0511515615786565b60005b156157bd57610220516102a051808201828110615c69579050905060a052600160c0526157b46103c0612c20565b6103c051610380525b6013546103c0526011306020526000526040600020546103e0526103c05161038051808201828110615c69579050905061036051808203828111615c69579050905061580a610420612a9b565b61042051808203828111615c695790509050610400526103c051610400511161587057610400516103c051111561588857610400516103c051036103e05180828118828410021890509050610420526104205160405230606052615888612a3856615888565b6103c051610400510360405230606052615888612f96565b6103605161038051116158a0576000610380526158ae565b610360516103805103610380525b6102a051156158f157610260516040526102c051606052306080526102a05160a0526158d8612de8565b6015546102a051808201828110615c6957905090506015555b610220511561594057610220516102005101610200526102005160046101a05160205260005260406000206002810190505560145461022051808201828110615c69579050905060145561598b565b610240511561598b57610240516102005103610200526102005160046101a05160205260005260406000206002810190505560145461024051808203828111615c6957905090506014555b6102e051156159db576102e05161032051808203828111615c6957905090506040526102c0516060526159bc612f96565b61032051156159db5761032051604052610340516060526159db612f96565b6011306020526000526040600020546103e0526103e05115615ae3576000610420526025546104405242610440511115615a51576103e05161038051808203828111615c6957905090506104405142808203828111615c695790509050808202811583838304141715615c695790509050610420525b61042051610380516103a051808202811583838304141715615c695790509050808201828110615c6957905090506103e0518015615c695780820490509050610460526103e05164e8d4a5100081028164e8d4a51000820418615c69579050610460518015615c6957808204905090506026554261046051808201828110615c69579050905060255542602755615ae9565b60006025555b4260046101a051602052600052604060002060018101905055610220516102a051808201828110615c6957905090506102405161028051808201828110615c69579050905011615b3d576103a05115615b40565b60015b15615b65576102e05160a052600160c052615b5c610420612b49565b61042051610280525b6101a0517f7f2ad1d3ba35276f35ef140f83e3e0f17b23064fd710113d3f7a5ab30d2678116102205161042052610240516104405261020051610460526102805161030051808202811583838304141715615c6957905090506127108104905061048052610280516104a0526102a0516104c05260c0610420a261022051815261024051602082015250565b601b60405160205260005260406000205460605116615c6757600b6080527f6e6f7420616c6c6f77656400000000000000000000000000000000000000000060a0526080506080518060a001601f826000031636823750506308c379a06040526020606052601f19601f6080510116604401605cfd5b565b600080fda165767970657283000307000b005b600080fd
```
