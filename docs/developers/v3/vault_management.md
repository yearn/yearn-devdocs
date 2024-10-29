# Deploying and Managing a V3 Multi Strategy Vault

V3 makes it as simple as possible for anyone to deploy and manage their own Multi Strategy Vaults. No longer will Yearn be the only manager of Vaults, gate-keeping who can be a debt allocator, or what strategies should be added to a vault. Now, anyone can deploy, manage, and earn fees from their vision and preferences on everything from risk profile, fee model, decentralization, etc.

In V3 our multi strategy or "Allocator Vaults" are designed to be efficient 4626 compliant debt allocators that can have many different "strategies" attached to them and will direct funds to these strategies based on the vault's management choice. The vaults are built to be "plug and play" meaning managers can simply deploy, add their strategies, and start the yield generation. But they also hold many customization factors, allowing different managers to differentiate themselves and experiment with different optionality.

Running your vault requires no need to know how to code. Anyone desiring to manage their strategies and allocations can simply deploy and run their vault.

## Definitions

- **vault (allocator)**: ERC-4626 compliant contract that accepts deposits, issues shares, and allocates funds to different strategies to earn yield.
- **shares**: A tokenized representation of a depositor's share of the underlying balance of a vault.
- **strategy**: Any ERC-4626 compliant contract that can be added to an allocator vault that earns yield on an underlying asset.
- **debt**: The amount of the underlying asset that an allocator vault has sent to a strategy to earn yield.
- **report**: The function where a vault accounts for any profits or losses a strategy has accrued, charges applicable fees, and locks profit to be distributed to depositors.
- **role_manager**: The position given to an address in a vault that controls what other addresses have rights to call permissioned functions on the vault. 

## Deployment

There are multiple ways to handle deployments of vaults. By far the simplest way to deploy your own multi strategy vaults is by utilizing the pre-built, `RoleManager` and `RoleManagerFactory` contracts.

The `RoleManagerFactory` can be used to deploy a full set of V3 periphery contracts including an `Accountant`, `DebtAllocator`, `Registry` and `RoleManager` and will configure them all automatically to make deployment and management as simple as possible while still allowing full customization where desired.

You will only need three variables. 

1. `projectName` : The name of your project i.e. "Yearn"
2. `governance` : The main address to be in control of the vaults and RoleManager contract. This should be a fully trusted address.
3. `management` :  Secondary address to manage lower risk more day to day needs of the vault such as debt allocations.



```solidity
projectName = "Project Name"     // Name of your project.
governance = address(0x69)      // Address to be in charge of the project.
management = address(0x420)    // Address to help manage vaults.

// Deploy a new RoleManager for your use case
address myNewRoleManager = roleManagerFactory.newProject(
    projectName,
    governance,
    management
)
```

The `RoleManager` contract deployed will then serve as the `role_manager` position on any multi strategy vaults deployed for simple and programatic setup of your vaults.

You can then use your new RoleManager contract to do one step deployments and setups of any new vaults.

```solidity
address newVault = myNewRoleManager.newVault(
    asset,
    category,
    vaultName,
    vaultSymbol
)
```
`category` is used by the RoleManager to classify and store vaults which will allow multiple vault types that use the same underlying address to be deployed. The categorization can be anything a project manager desires or just set to `0` or any other constant for all. 

Your new vault will now be deployed, with the Roles given out to each specified address, and Accountant hooked up to charge fees, and endorsed in your registry.

To learn more about how to customize your deployment setups and using the `RoleManager` contract view the [full spech](LINK IT)

Alternativily you can manually deploy a vault directly from the factory and do a complete custom setup by following [these instructions](LINK)

### Miscellaneous

There are other options that a vault manager can set that are not necessary for the vault to function but may be desired for further customization.

- **minimum_total_idle**: An amount specified in the underlying asset that the vault will force to remain free in the vault during debt updates to make servicing withdraws cheaper.
- **profit_max_unlock_time**: The time in which profits reported by the strategies will be distributed to depositors. This can be adjusted to match the current report cycle of the vault's strategies to create a continuous stream of APY paid out to depositors.

## Running the Vault

### Strategy Management

The job of a vault is to manage debt between strategies that do the yield generation. 3 roles control what strategies are added to the vault, ADD_STRATEGY_MANAGER, REVOKE_STRATEGY_MANAGER, and FORCE_REVOKE_MANAGER.

A strategy can be any contract that has the needed [4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L39) for the vault to interact with it. This includes Tokenized Strategies, 3rd party 4626 vaults, and other  allocator vaults.

To add a strategy first call `vault.add_strategy(strategy_address)`.

Each strategy gets added with a default 'max_debt' of 0. This means the MAX_DEBT_MANAGER will need to call `vault.update_max_debt_for_strategy(strategy, max_debt)`.

Once a strategy has been added and given a max_debt, the DEBT_MANAGER role can allocate funds.

To remove a strategy, first remove all the debt from the strategy and then call `vault.revoke_strategy(strategy)`.

If a strategy has issues and cannot pay all of its debt back `vault.force_revoke_strategy(strategy)` can be used to forcefully remove the strategy.

NOTE: Forcefully removing a strategy that still has debt will cause a loss to be recorded and a reduction of Price Per Share.

### Debt Updates

The DEBT_MANAGER role is in charge of allocating funds between the strategies added to a vault.

By default the DEBT_MANAGER role is given to the `DebtAllocator` contract deployed by the `RoleManagerFactory` and is controlled by the `management` address. For a full explanation of the `DebtAllocator` visit the [full spech](LINK IT)

All debt updates are denominated in the underlying asset and are restricted by the `max_debt` for each strategy and the `minimum_total_idle` for the specific vault.

Debt updates will also respect the strategies specific `maxRedeem` and `maxDeposit`.

To deposit or withdraw vault funds from a strategy simply call `vault.update_debt(strategy, desired_debt)` where desired debt is the end amount denominated in the underlying asset that the strategy should have after the full debt update.

Debt updates also come with an optional `max_loss` parameter that is recommended to be used on debt decreases. It works just like the withdraw/redeem parameter of the same name and assures any losses realized on debt decreases are within the expected bounds.

**NOTE**: If a strategy has unrealized losses you cannot lower its debt.

**NOTE**: It is recommended to report a strategy's gain before withdrawing 100% of debt from the strategy.

### Reporting

To properly record any profits/losses from a strategy, charge fees, and lock profits for distribution to depositors, the REPORTING_MANAGER will need to "report" for each strategy via `vault.process_report(strategy)`.

The RoleManager will give the REPORTING_MANAGER role by default to the global permissionless `Keeper`. This means anyone can call `process_report` on your vault unless otherwise set.

This function will trigger all necessary logic to record a strategy's gain since the last report and begin distributing that profit to depositors over the vault's specific `profit_max_unlock_time`.

NOTE: To charge fees you will need first to have added an 'accountant' to your vault that will hold the fee logic and receive the fees that are charged.

**NOTE: All profit and loss calculations use the strategies 'convertToAssets' function. If this function can be manipulated it can lead to incorrect profits or losses being recorded by the vault**

## Customization

### Accountant

You will need to add a separate contract as the vault's 'accountant' to charge fees.

`vault.set_accountant(accountant)`

*If using the RoleManager/Factory this contract will be automatically deployed and setup during each subsequent vault deployment.

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

There is an optional parameter in `add_strategy` of `add_to_queue` that defaults to True, but can be set to False if you do not want to add the strategy to the `default_queue`.

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