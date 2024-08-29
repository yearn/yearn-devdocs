# Integrating V3 Vaults

V3 provides all of the same benefits to integrators as V2, but with increased optionality and standardization.

## Vaults

All V3 vaults, whether multi-strategy or single-strategy, are fully [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) compliant which greatly simplifies and standardizes integrations.

### Deposits

Deposits follow the standard 4626 flow. It is recommended to use [`deposit`](https://eips.ethereum.org/EIPS/eip-4626#deposit) over [`mint`](https://eips.ethereum.org/EIPS/eip-4626#mint) when depositing to a Yearn vault.

```solidity title="Example"
token.approve(vault, amount)

vault.deposit(amount, receiver)
```

There is also a [4626 Router](/developers/smart-contracts/v3/periphery/Yearn4626Router) available to make multi-step user flows easier.

The max amount that a vault will accept from an address can be returned using the [`maxDeposit`](https://eips.ethereum.org/EIPS/eip-4626#maxdeposit) function.

### Withdrawals

The standard 4626 withdrawal functionality works for all V3 vaults, however it is recommended to use [`redeem`](https://eips.ethereum.org/EIPS/eip-4626#redeem) instead of [`withdraw`](https://eips.ethereum.org/EIPS/eip-4626#withdraw).

#### Optional Parameters

V3 Vaults have additional, optional parameters that can be added during withdrawals.

#### `maxLoss`

There is a `maxLoss` parameter for both `withdraw` and `redeem` that is denominated in basis points. This value will enforce the max amount of allowable loss the user will accept during the withdraw and revert if the loss is over that amount.

:::note

- `redeem` Defaults to a `maxLoss` of 10_000 (100%), meaning it will allow any amount of loss.
- `withdraw` Defaults to a `maxLoss` of 0 (0%), meaning it will not allow any loss.

:::

```solidity title="Example"
balance = vault.balanceOf(user)

vault.redeem(balance, receiver, user, maxLoss)
```

:::warning

**It is recommended to always include `maxLoss` when possible for the final step in a withdrawal**

:::

#### `strategies`

Multi-strategy vaults also have an optional `strategies` parameter which takes an array (max length of 10) of ordered strategy addresses to withdraw from. This will override the vaults `default_queue` if the [`use_default_queue`](https://github.com/yearn/yearn-vaults-v3/blob/9fbc614bbce9d7cbad42e284a15f0f43cf1a673f/contracts/VaultV3.vy#L216C1-L216C18) flag is `False`.

```solidity title="Example"
strategies = [compoundLender, aaveLender]

balance = vault.balanceOf(user)

vault.redeem(balance, receiver, user, 1, strategies)
```

The max amount that a vault will allow an address to redeem/withdraw can be returned using the [`maxRedeem/maxWithdraw`](https://eips.ethereum.org/EIPS/eip-4626#maxredeem) functions. The multi-strategy vaults will also accept the optional parameters corresponding to redeem/withdraw in these `max` view functions.

### Pricing

Generic pricing of vault tokens can be done using the standard 4626 [`convertToShares`](https://eips.ethereum.org/EIPS/eip-4626#converttoshares) and [`convertToAssets`](https://eips.ethereum.org/EIPS/eip-4626#converttoassets) functions.

While Yearn takes great care to try and prevent manipulation of the conversion functions, it is important to know that are some security considerations if using these functions on chain as part of another protocol. Please read more in [Yearn vaults as collateral](/partners/yvtokens-as-collateral)

V3 vaults also contain the legacy `pricePerShare` function from the V2 Vaults implementation. However, this is intended as a simple off-chain helper and should not be used for on chain integrations due to precision loss.

## Periphery

There are multiple periphery contracts that can be helpful to get information about Yearn vaults on a specific chain.

### Registry

Retrieve all of the endorsed vaults on a specific chain.

- `getAllEndorsedVaults()` Returns a nested array sorted by vaults `asset` of all endorsed vaults in that registry.
- `getEndorsedVaults(address _asset)` Returns and array of all endorsed vaults for that asset
- `vaultInfo(address _vault)` Return the [`Info`](/developers/smart-contracts/v3/periphery/Registry#structs) struct for an endorsed vault that includes its underlying asset, release version, deployment timestamp, vault 'type' (i.e. multi-strategy or single-strategy) and any tag.

### Role Manager

Manages all of the multi-strategy vaults on a chain, and holds the `role_manager` position for those vaults.

All the other periphery contracts and Yearn multisigs can be retrieved from the Role manager as well using the getter functions, such as `getBrain()`/`getPositionHolder(keccak256("Brain"))`, `getRegistry()`/`getPositionHolder(keccak256("Registry"))`, `getDebtAllocator(vault)`, .

- [`getAllVaults()`](/developers/smart-contracts/v3/periphery/RoleManager#getallvaults) Returns and array for all multi-strategy vaults the contract is the role manager for.
- [`getVault(asset, apiVersion, category)`](/developers/smart-contracts/v3/periphery/RoleManager#getvault) Returns the vault if any based on the inputs.

#### Category

V3 introduces the concept of "categories" for vaults. This is because there will now potentially be multiple multi strategy vaults per underlying asset with the `category` signalling the difference.

A vault `category` is appended to the vaults name and symbol that dictates what type of vault it is. For example, `1` vaults are the lowest risk and most similar to the V2 style vaults.
