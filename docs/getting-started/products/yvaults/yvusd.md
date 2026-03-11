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

# yvUSD

## Overview

**yvUSD** is a USD-denominated cross-chain vault built on Yearn's V3 vault architecture. In standard Yearn vaults, the assets deposited into a vault stay on the same chain. But yvUSD applies a new design approach: combine the battle-tested Yearn vault with cross-chain capital deployment to maximize yield. Users deposit their assets to the vault on mainnet and the vault uses native asset bridges, like Circle's CCTP protocol, to send the assets to strategies on other chains.

![yvUSD Design](/img/diagrams/yvusd/summary1.png)

Because only a strategy contract is needed on another chain, rather than the entire Yearn vault infra, the new design allows for a more nimble approach to capturing yield for users across chains.

![yvUSD with strategies on 3 chains](/img/diagrams/yvusd/summary2.png)

## How yvUSD differs from a standard Yearn vault

- **Cross-chain deployment:** yvUSD strategies can deploy capital on other chains via native asset and/or chain bridges. Other Yearn vaults keep assets on the same chain as the vault.
- **Different strategy risk profile:** yvUSD can include cross-chain components, duration risk (holding PT tokens) and leveraged loopers (e.g., Morpho Blue), adding additional cross-chain, time, and liquidation/borrow-rate risks compared to standard Yearn vaults.
- **Withdrawals can be non-atomic:** While the expectation is for withdrawals to be atomic just like a normal vault, it is possible that under certain conditions, there may be a delay.
- **Optional lock wrapper:** `Locked yvUSD` adds a cooldown plus a withdrawal window to make withdrawals more predictable for users who opt in, and it can add a "locker bonus" yield component.

## Risks To Understand

yvUSD and its strategies involve risks beyond standard single-chain Yearn vaults:

- Smart contract risk (Yearn vaults, strategies, and integrations)
- Stablecoin risk (depegs, issuer/custody risk, liquidity)
- Duration risk (exposure to interest rate changes when holding fixed-rate or longer-term debt positions)
- Cross-chain risk (bridging and remote execution/accounting)
- Leverage/liquidation risk (for looper strategies that borrow against collateral)

## Locked yvUSD

`Locked yvUSD` is a companion vault that wraps `yvUSD` shares and enforces a withdrawal cooldown. This is an optional opt-in product for users who can commit to delayed withdrawals, in exchange for an additional yield component (a "locker bonus") sourced from the vault's fee mechanics. The rationale for this feature is as follows: yvUSD can more effectively deploy capital into longer duration or cross-chain strategies with liquidity guarantees enforced by the locked yvUSD cooldown mechanics. These strategies in turn earn higher yield than their fully liquid counterparts and therefore all users earn better overall returns.

### Withdrawal process

Withdrawing from `Locked yvUSD` is a two-step process:

1. **Start cooldown** — call `startCooldown(shares)` to lock a specific number of shares for withdrawal. The current cooldown period is <ContractData contractName='Locked yvUSD' methodName='cooldownDuration' format='durationDays' />.
2. **Withdraw** — once the cooldown expires, withdraw within the <ContractData contractName='Locked yvUSD' methodName='withdrawalWindow' format='durationDaysAdjective' /> withdrawal window.

If the withdrawal window expires before the user withdraws, the cooldown must be restarted from step 1. Shares locked in an active cooldown cannot be transferred.

![Withdrawal timeline for Locked yvUSD](/img/diagrams/yvusd/Locked yvUSD-timeline.png)

## Read More

<PrettyLink>[yvUSD Deep Dive](/developers/yvusd)</PrettyLink>

<PrettyLink>[Circle Cross-Chain Transfer Protocol (CCTP)](https://www.circle.com/cross-chain-transfer-protocol)</PrettyLink>
