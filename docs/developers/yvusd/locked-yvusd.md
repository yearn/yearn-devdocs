# LockedyvUSD (Cooldown Vault)

LockedyvUSD is a vault that wraps `yvUSD` shares and restricts withdrawals behind a cooldown period plus a withdrawal window. In this workspace it is implemented in `locked-yvusd/src/LockedyvUSD.sol`.

## Key Behaviors (Integrator Notes)

- **Withdrawals are gated**: `maxWithdraw` / `maxRedeem` will return `0` unless the owner has started a cooldown and is inside the valid withdrawal window.
- **Cooldown is per-owner and overwriting**: starting a new cooldown overwrites the previous cooldown state for that owner.
- **Transfer restrictions**: shares that are in cooldown cannot be transferred (non-cooldown shares may still be transferable).
- **Shutdown bypass**: when cooldown is disabled or the strategy is shutdown, the gating checks are bypassed (behavior depends on onchain configuration).

If you integrate LockedyvUSD, assume user withdrawals can revert unless your UI guides them through the cooldown flow.

## Cooldown Flow (Contract Methods)

Primary methods to be aware of:

- `startCooldown(uint256 shares)`: starts or overwrites the cooldown for `shares` owned by `msg.sender`.
- `cancelCooldown()`: clears the cooldown state for `msg.sender`.
- `maxWithdraw(address owner)` / `maxRedeem(address owner)`: returns `0` if cooldown is not active, still pending, or the withdrawal window has expired.
- `getCooldownStatus(address user)`: returns `(cooldownEnd, windowEnd, shares)` for UI state.

Management methods (onchain configuration):

- `setCooldownDuration(uint256)`: set to `0` to disable cooldown gating.
- `setWithdrawalWindow(uint256)`: window after cooldown during which withdrawals are allowed.

## Default Parameters

In the current contract code, defaults are:

- Cooldown duration: `14 days`
- Withdrawal window: `7 days`

These are configurable by management onchain (for example `setCooldownDuration` and `setWithdrawalWindow`).

## Related Contracts

- `locked-yvusd/src/LockerZapper.sol` can combine base-asset -> yvUSD -> LockedyvUSD (and reverse) in a single transaction where possible.

## Links

<PrettyLink>[yvUSD developer docs index](/developers/yvusd)</PrettyLink>

<PrettyLink>[yvUSD contract addresses](/developers/addresses/yvusd-contracts)</PrettyLink>
