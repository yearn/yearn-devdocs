# Integrating V3 Vaults

V3 brings all of the same benefits to other protocols wishing to integrate as V2, but with increased optionality and standardization.

## Vaults

All V3 vaults, whether multi strategy of single strategy are fully [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) compliant which will make integration much simplified and standard compared to previous versions.

### Deposits

Deposits follow the standard 4626 flow. It is recommended to use [`deposit`](https://eips.ethereum.org/EIPS/eip-4626#deposit) over [`mint`](https://eips.ethereum.org/EIPS/eip-4626#mint) when depositing to a Yearn vault.

EX:


    token.approve(vault, amount)
    
    vault.deposit(amount, receiver)


There is also a [4626 Router](https://github.com/yearn/Yearn-ERC4626-Router) available to make multiple deposits simpler or multi step movements simplified

The max amount that a vault will accept from an address can be returned using the [`maxDeposit`](https://eips.ethereum.org/EIPS/eip-4626#maxdeposit) function.

### Withdraws

The standard functionality can work for all V3 withdraws, however there is some additional optional parameters that can be added. It is recommended to use [`redeem`](https://eips.ethereum.org/EIPS/eip-4626#redeem) instead of [`withdraw`](https://eips.ethereum.org/EIPS/eip-4626#withdraw).

All V3 vaults take an optional `maxLoss` parameter for both `withdraw` and `redeem` that is denominated in basis points. This value will enforce the max amount of allowable loss the user will accept during the withdraw and revert if the loss is over that amount.

**NOTE:** 
-    `redeem` Defaults to a `maxLoss` of 10_000 (100%), meaning it will allow any amount of loss.
-    `withdraw` Defaults to a `maxLoss` of 0 (0%), meaning it will not allow any loss.

**It is recommended to always include a `maxLoss` when possible for the final step in a withdraw**

EX:

    balance = vault.balanceOf(user)
    
    vault.redeem(balance, receiver, user, 1)

Multi strategy vaults also have an optional `strategies` parameter which takes an array (max length of 10) of ordered strategy addresses to withdraw from. This will override the vaults `default_queue` if the [`use_default_queue`](https://github.com/yearn/yearn-vaults-v3/blob/9fbc614bbce9d7cbad42e284a15f0f43cf1a673f/contracts/VaultV3.vy#L216C1-L216C18) flag is `False`.

EX:
    
    strategies = [compoundLender, aaveLender]
    
    balance = vault.balanceOf(user)
    
    vault.redeem(balance, receiver, user, 1, strategies)

*The max amount that a vault will allow an address redeem/withdraw can be returned using the [`maxRedeem/maxWithdraw`](https://eips.ethereum.org/EIPS/eip-4626#maxredeem) functions. The multi strategy vaults will also accept the optional parameters corresponding to redeem/withdraw in these `max` view functions.

### Pricing

Generic pricing of vault tokens can be done using the standard 4626 [`convertToShares`](https://eips.ethereum.org/EIPS/eip-4626#converttoshares) and [`convertToAssets`](https://eips.ethereum.org/EIPS/eip-4626#converttoassets) functions.

While Yearn takes great care to try and prevent manipulation of the conversion functions it is important to know that are some security considerations if using these functions on chain as part of another protocol. Please read more in [Yearn vaults as collateral](https://docs.yearn.fi/partners/yvtokens-as-collateral#overview-of-yearn-vaults-as-collateral)

V3 vaults also still contain the `pricePerShare` function as the V2 vaults. However this is meant as simply a simple offchain helper and should not be used for on chain integrations due to precision loss.


## Periphery

There are multiple periphery contracts that can be helpful to get the Yearn vaults on a specific chain.

### Registry

Retrieve all of the endorsed vaults on a specific chain.

- `getAllEndorsedVaults()` Returns a nested array sorted by vaults `asset` of all endorsed vaults in that registry.
- `getEndorsedVaults(address _asset)` Returns and array of all endorsed vaults for that vault
- `vaultInfo(address _vault)` Return the [`Info`](https://github.com/yearn/vault-periphery/blob/26c43a917202aeacafa3e5f0d9d2f562aaa3d1ab/contracts/registry/Registry.sol#L81) struct for an endorsed vault that includes its underlying asset, release version, deployment timestamp, vault 'type' (i.e. multi strategy or single strategy) and any tag.

### Role Manager

Manages all of the multi strategy vaults on a chain, and holds the `role_manager` position for those vaults.

- `getAllVaults()` Returns and array for all multi strategy vaults the contract is the role manager for.
- [`getVault(asset, apiVersion, category)`](https://github.com/yearn/vault-periphery/blob/26c43a917202aeacafa3e5f0d9d2f562aaa3d1ab/contracts/Managers/RoleManager.sol#L718C14-L718C22) Returns the vault if any based on the inputs.

*NOTE: `category` refers to the number that is appended to the vaults name and symbol that dictates what type of vault it is. 

- EX: `1` vaults are the lowest risk and most similar to the V2 style vaults.

All the other periphery contracts and Yearn multisigs can be retrieved from the Role manager as well using the getter functions, such as `getBrain()`, `getRegistry()`, `getDebtAllocator(vault)`. 