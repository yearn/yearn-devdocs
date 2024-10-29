# Manual Vault Deployment

:::tip

if you are looking for the simplest way to deploy your own multi-strategy vaults we recommend first reading about using the Role Manager Factory on [this page.](./vault_management.md#deployment)

:::

## Definitions

- **vault (allocator)**: ERC-4626 compliant contract that accepts deposits, issues shares, and allocates funds to different strategies to earn yield.
- **shares**: A tokenized representation of a depositor's share of the underlying balance of a vault.
- **strategy**: Any ERC-4626 compliant contract that can be added to an allocator vault that earns yield on an underlying asset.
- **debt**: The amount of the underlying asset that an allocator vault has sent to a strategy to earn yield.
- **report**: The function where a vault accounts for any profits or losses a strategy has accrued, charges applicable fees, and locks profit to be distributed to depositors.
- **role_manager**: The position given to an address in a vault that controls what other addresses have rights to call permissioned functions on the vault.

## Deployment

Each release of the vaults will have its own "Vault Factory" deployed to make it as simple and trustless as possible to deploy your vault. The vault factory allows anyone to trustlessly deploy their own vault which is an exact copy of the previously deployed "original" vault for that specific version.

:::warning

Vaults not deployed through the factory will not be recognized as part of the Yearn ecosystem and may experience issues during runtime.

:::

To deploy your vault directly from the factory, simply find the factory's address for the most recent release [here](/developers/addresses/v3-contracts) and call `Factory.deploy_new_vault(params)`.

The needed parameters are:

- **asset**: The address of an ERC-20 compliant token used as the underlying asset to earn yield for the vault.
- **name**: The name for your vault that will apply to the token issues to depositors.
- **symbol**: The symbol the token issued to depositors will use.
- **role_manager**: The address in charge of giving permissions to other addresses which allow access to certain permissioned functions.
- **profit_max_unlock_time**: In seconds, profits reported from strategies will be unlocked.

Once deployed, you can get your vault's address from either the Factory function's return value or the `NewVault` event emitted by the factory.

The vault should be automatically verified when deployed. However, if it is not you can follow the [verification steps](https://etherscan.io/verifyContract) on Etherscan using the [VaultV3.vy](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy) for your specific API Version.

**NOTE**: The vault factory utilizes [create2](https://eips.ethereum.org/EIPS/eip-1014) opcode to deploy vaults to deterministic addresses. This means the same address can not deploy two vaults with the same default parameters for 'asset', 'name' and 'symbol'.

## Setup

Once deployed, additional setup steps and variables can be configured if desired.

### Roles

The first is to set up the Roles for your specific vault. The vaults use a role-based system for access control to the permissioned functions. The roles are a [Vyper Enumerator](https://docs.vyperlang.org/en/stable/types.html#enums) pattern based on Pythons.

Each permissioned function in the Vaults has its own "role" that can call that specific function. For example, to call `add_strategy(new_strategy: address)` the address must have the `ADD_STRATEGY_MANAGER` role. Roles can be held by any number of addresses or by no address.

The same address can hold every role, each role can be held by a different address or any combination desired.

The address sent during deployment as `role_manager` is in charge of assigning roles to different addresses.

A full explanation of [python enumerators](https://docs.python.org/3/howto/enum.html) is beyond the scope of this doc, but the corresponding int to each role can be viewed [here](https://github.com/yearn/yearn-vaults-v3/blob/master/tests/utils/constants.py#L12)

To give an account a specific role you can simply call `vault.set_role(account, role)` where 'role' is the int representing all the roles you would like the 'account' to hold. This will override all roles previously held by the address.

The role manager can also use `vault.add_role(account, role_to_add)` to only add 1 new role to the existing roles that account already has. Or `vault.remove_role(account, role_to_remove)` to remove just one role without overriding the full bitmap.

```solidity title="Examples"
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
```

NOTE: The vault `role_manager` can not call any permissioned function by default, and would have to give itself any roles that it should have.

### Deposit Limit

Each vault will default to have a deposit limit set to 0. Which means all deposits will revert.

Once ready, the address with the DEPOSIT_LIMIT_MANAGER will need to either set a deposit_limit > 0 or add a deposit_limit_module.
