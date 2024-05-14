# Deploying and Managing a V3 Vault

No longer will Yearn be the only manager of Vaults! V3 Vaults make it as simple as possible for anyone to deploy and manage Yearn Vaults. Now, anyone with a vision for a new vault can deploy and manage one, setting their preferences for risk profiles, fee models, decentralization, and more.

V3 "Allocator Vaults" are meta-vaults that are designed to be efficient, 4626-compliant debt allocators that can have many different "strategies" attached to them and will direct funds to these strategies based on the vault's management choice. The vaults are built to be "plug and play", allowing managers to deploy, add their strategies, and immediately start yield generation. If you want to go beyond the default settings, vaults can also be customized to allow managers to differentiate themselves and experiment with different parameters.

<!-- Running a vault doesn't require knowing how to code. Anyone desiring to manage their strategies and allocations can simply deploy and run their vault. -->

## Definitions

- **vault (allocator)**: ERC-4626 compliant contract that accepts deposits, issues shares, and allocates funds to different strategies to earn yield.
- **shares**: A tokenized representation of a depositor's share of the underlying balance of a vault.
- **strategy**: Any ERC-4626 compliant contract that can be added to an allocator vault that earns yield on an underlying asset.
- **debt**: The amount of the underlying asset that an allocator vault has sent to a strategy to earn yield.
- **report**: The function where a vault accounts for any profits or losses a strategy has accrued, charges applicable fees, and locks profit to be distributed to depositors.

## Deployment

Each release of the V3 vault contracts will have its own "Vault Factory" contract deployed, in order to make it as simple and trustless as possible to deploy a vault. All vaults deployed with the factory contracts are exact copies of the previously deployed "original" vault for that specific version.

To deploy a new vault, call `deploy_new_vault()`, with the required parameters passed in, on the desired Vault Factory Contract. You can find the factory address for the most recent release [here](https://docs.yearn.fi/developers/v3/overview#contract-addresses).

The needed parameters are:

- **asset**: The `address` of an ERC-20 compliant token used as the underlying asset to earn yield for the vault.
- **name**: The name ('string') for your vault that will apply to the token issues to depositors.
- **symbol**: The symbol ('string') the token issued to depositors will use.
- **role_manager**: The `address` in charge of giving permissions to other addresses which allow access to certain permissioned functions.
- **profit_max_unlock_time**: `uint256` number in seconds in which profits reported from strategies will be unlocked.

Once deployed, you can get your vault's address from either the Factory function's return value or the `NewVault` event emitted by the factory. The vault should be automatically verified when deployed. However, if it is not you can follow the [verification steps](https://etherscan.io/verifyContract) on Etherscan using the [VaultV3.vy](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy) for your specific API Version.

**⚠️ Important**: Vaults not deployed through the factory will not be recognized as part of the Yearn ecosystem and may experience issues during runtime.

**:information_source: Note**: The vault factory utilizes [create2](https://eips.ethereum.org/EIPS/eip-1014) opcode to deploy vaults to deterministic addresses. This means the same address can not deploy two vaults with the same default parameters for 'asset', 'name' and 'symbol'.

## Setup

Once deployed, additional setup steps and variables can be configured if desired.

#### Roles

---
The first is to set up the Roles for your specific vault. The vaults use a role-based system for access control to the permissioned functions. The roles are a [Vyper Enumerator](https://docs.vyperlang.org/en/stable/types.html#enums) pattern based on Pythons.

Each permissioned function in the Vaults has its own "role" that can call that specific function. For example, to call `add_strategy(new_strategy: address)` the address must have the `ADD_STRATEGY_MANAGER` role. Roles can be held by any number of addresses or by no address.

The same address can hold every role, each role can be held by a different address or any combination desired.

The address sent during deployment as `role_manager` is in charge of assigning roles to different addresses.

A full explanation of [python enumerators](https://docs.python.org/3/howto/enum.html) is beyond the scope of this doc, but the corresponding int to each role can be viewed [here](https://github.com/yearn/yearn-vaults-v3/blob/master/tests/utils/constants.py#L12)

To give an account a specific role you can simply call `vault.set_role(account, role)` where 'role' is the int representing all the roles you would like the 'account' to hold. This will override all roles previously held by the address.

The role manager can also use `vault.add_role(account, role_to_add)` to only add 1 new role to the existing roles that account already has. Or `vault.remove_role(account, role_to_remove)` to remove just one role without overriding the full bitmap.

Example:

    # Set `account` to be the ADD_STRATEGY_MANAGER
    vault.set_role(account, 1)
    
    # Set `account` to be both the ADD_STRATEGY_MANAGER and REVOKE_STRATEGY_MANAGER
    vault.set_role(account, 3)
    
    # Add the REPORTING_MANAGER role to the accounts already held roles.
    vault.add_role(account, 32)
    
    # Remove just the REVOKE_STRATEGY_MANAGER role.
    vault.remove_role(account, 2)
    
    # Set `account` to hold every role
    vault.set_role(account, 16383)
    
    # Set `account` to hold no roles
    vault.set_role(account, 0)

NOTE: The vault `role_manager` can not call any permissioned function by default, and would have to give itself any roles that it should have.

#### Deposit Limit

---
Each vault will default to have a deposit limit set to 0. Which means all deposits will revert.

Once ready, the address with the DEPOSIT_LIMIT_MANAGER will need to either set a deposit_limit > 0 or add a deposit_limit_module.

#### Miscellaneous

---
There are other options that a vault manager can set that are not necessary for the vault to function but may be desired for further customization.

- **minimum_total_idle**: An amount specified in the underlying asset that the vault will force to remain free in the vault during debt updates to make servicing withdraws cheaper.
- **profit_max_unlock_time**: The time in which profits reported by the strategies will be distributed to depositors. This can be adjusted to match the current report cycle of the vault's strategies to create a continuous stream of APY paid out to depositors.

## Running the Vault

#### Strategy Management

The job of a vault is to manage debt between strategies that do the yield generation. 3 roles control what strategies are added to the vault, ADD_STRATEGY_MANAGER, REVOKE_STRATEGY_MANAGER, and FORCE_REVOKE_MANAGER.

A strategy can be any contract that has the needed [4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L39) for the vault to interact with it. This includes Tokenized Strategies, 3rd party 4626 vaults, and other  allocator vaults.

To add a strategy first call `vault.add_strategy(strategy_address)`. There is an optional parameter in `add_strategy` of `add_to_queue` that defaults to True, but can be set to False if you do not want to add the strategy to the `default_queue`.

Each strategy gets added with a default 'max_debt' of 0. This means the MAX_DEBT_MANAGER will need to call `vault.update_max_debt_for_strategy(strategy, max_debt)`.

Once a strategy has been added and given a max_debt, the DEBT_MANAGER role can allocate funds.

To remove a strategy, first remove all the debt from the strategy and then call `vault.revoke_strategy(strategy)`.

If a strategy has issues and cannot pay all of its debt back `vault.force_revoke_strategy(strategy)` can be used to forcefully remove the strategy.

NOTE: Forcefully removing a strategy that still has debt will cause a loss to be recorded and a reduction of Price Per Share.

#### Debt Updates

The DEBT_MANAGER role is in charge of allocating funds between the strategies added to a vault.

All debt updates are denominated in the underlying asset and are restricted by the `max_debt` for each strategy and the `minimum_total_idle` for the specific vault.

Debt updates will also respect the strategies specific `maxRedeem` and `maxDeposit`.

To deposit or withdraw vault funds from a strategy simply call `vault.update_debt(strategy, desired_debt)` where desired debt is the end amount denominated in the underlying asset that the strategy should have after the full debt update.

Debt updates also come with an optional `max_loss` parameter that is recommended to be used on debt decreases. It works just like the withdraw/redeem parameter of the same name and assures an losses realized on debt decreases are within the expected bounds.

**NOTE**: If a strategy has unrealized losses you cannot lower its debt.

**NOTE**: It is recommended to report a strategy's gain before withdrawing 100% of debt from the strategy.

#### Reporting

To properly record any profits/losses from a strategy, charge fees, and lock profits for distribution to depositors, the REPORTING_MANAGER will need to "report" for each strategy via `vault.process_report(strategy)`.

This function will trigger all necessary logic to record a strategy's gain since the last report and begin distributing that profit to depositors over the vault's specific `profit_max_unlock_time`.

NOTE: To charge fees you will need first to have added an 'accountant' to your vault that will hold the fee logic and receive the fees that are charged.

**NOTE: All profit and loss calculations use the strategies 'convertToAssets' function. If this function can be manipulated it can lead to incorrect profits or losses being recorded by the vault**

## Customization

#### Accountant

You will need to add a separate contract as the vault's 'accountant' to charge fees.

`vault.set_accountant(accountant)`

The accountant is called by the vault during every `report` with the strategy that is reporting and the gain or loss it's reporting. The accountant will then return the total fees or refunds that should be charged by the vault during that report and paid to the accountant.

Accountants can hold any logic that vault managers want to dictate fees or simply charge normal performance or management fees. A ready-to-use Accountant can easily be used with any vault for those who wish just to charge standard fees.

See Here: https://github.com/yearn/vault-periphery/blob/master/contracts/accountants/Accountant.sol

#### Deposit/Withdraw Limit Modules

Each vault comes with default deposit and withdraw limits that can be used for out of the box 4626 compliant functionality. However, these limits can also be completely customized for full programmability by adding a deposit_limit_module or withdraw_limit_module respectively.

These modules are stand-alone smart contracts similar to the accountant that if added will be used by the vault to enforce any custom deposit or withdraw limits.

This can be used to enforce a whitelist of depositors, minimum or maximum deposit sizes, liquidity constraints etc.

**Note**: To set a deposit_limit_module the DEPOSIT_LIMIT_MANAGER will either need to use the optional `override` flag or first need to set the vaults default `deposit_limit` to uint256 max. And will not be able to change the `deposit_limit` without the same flag or unless the deposit_limit_module is removed and set to address(0).

#### Default Queue

Each vault has a `default_queue` based on the strategies added and removed from the vault. The `default_queue` is used to service withdraws when no custom queue is passed. This queue is simply ordered by the time when strategies were added: where the oldest strategy is at the beginning of the queue.

If a different ordering is desired or management wants to remove a certain strategy from the default queue, the QUEUE_MANAGER role can set a new queue.

`vault.set_default_queue(new_default_queue)`

Where `new_default_queue` is an array of strategies with a max length of 10, in which all strategies are currently active in the vault.

The vaults QUEUE_MANAGER can also choose to not allow custom queues to be passed into the vault on withdraws at any time by turning on the 'use_default_queue' flag by calling, `vault.set_use_default_queue(True)`.

## Good to Know

### What Tokens Not to Use

There are certain tokens whose native behavior makes them incompatible with being the underlying asset of a vault and should be avoided.

A few examples of this are:

- Rebasing Tokens
- Fee on Transfer
- Reentrancy Tokens (ERC-777)

Any token whose normal functionality breaks the ERC-20 standard may not be compatible with V3 vaults.
