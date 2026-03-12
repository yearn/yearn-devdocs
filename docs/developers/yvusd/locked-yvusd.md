---
rpcCalls:
  - name: 'Locked yvUSD'
    chain: '1'
    address: '0xAaaFEa48472f77563961Cdb53291DEDfB46F9040'
    abiName: 'yvUsdLockedVaultABI'
    methods:
      - 'cooldownDuration'
      - 'withdrawalWindow'
---

# Locked yvUSD (Cooldown Vault)

Locked yvUSD is a vault that wraps `yvUSD` shares and restricts withdrawals behind a cooldown period plus a withdrawal window.

## Current Onchain Parameters

The current onchain values are:

- Cooldown duration: <ContractData contractName='Locked yvUSD' methodName='cooldownDuration' format='durationDays' />
- Withdrawal window: <ContractData contractName='Locked yvUSD' methodName='withdrawalWindow' format='durationDays' />

These are configurable by management onchain and can be changed. For example, the withdrawal window is currently 5 days.

![Withdrawal timeline for Locked yvUSD](/img/diagrams/yvusd/Locked-yvUSD-timeline.png)

## Key Behaviors (Integrator Notes)

- **Withdrawals are gated**: `maxWithdraw` / `maxRedeem` will return `0` unless the owner has started a cooldown and is inside the valid withdrawal window.
- **Cooldown is per-owner and will overwrite**: starting a new cooldown overwrites the previous cooldown state for that owner.
- **Transfer restrictions**: shares that are in cooldown cannot be transferred (non-cooldown shares may still be transferable).
- **Shutdown bypass**: when cooldown is disabled or the strategy is shutdown, the gating checks are bypassed (behavior depends on onchain configuration).

If you integrate Locked yvUSD, assume user withdrawals can revert unless your UI guides them through the cooldown flow.

## Cooldown Flow (Contract Methods)

Primary methods to be aware of:

- `startCooldown(uint256 shares)`: starts or overwrites the cooldown for `shares` owned by `msg.sender`.
- `cancelCooldown()`: clears the cooldown state for `msg.sender`.
- `maxWithdraw(address owner)` / `maxRedeem(address owner)`: returns `0` if cooldown is not active, still pending, or the withdrawal window has expired.
- `getCooldownStatus(address user)`: returns `(cooldownEnd, windowEnd, shares)` for UI state.

Management methods (onchain configuration):

- `setCooldownDuration(uint256)`: set to `0` to disable cooldown gating.
- `setWithdrawalWindow(uint256)`: window after cooldown during which withdrawals are allowed.

## Links

<PrettyLink>[yvUSD developer docs index](/developers/yvusd)</PrettyLink>

<PrettyLink>[yvUSD contract addresses](/developers/addresses/yvusd-contracts)</PrettyLink>
