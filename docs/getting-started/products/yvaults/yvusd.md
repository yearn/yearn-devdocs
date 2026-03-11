# yvUSD

## Overview

**yvUSD** is a USD-denominated cross-chain vault built on Yearn's v3 architecture. In standard Yearn v3 vaults, the assets deposited into a vault stay on the same chain. But yvUSD applies a new design approach: combine the battle-tested Yearn v3 vault with cross-chain capital deployment to maximize yield. Users deposit their assets to the vault on mainnet and the vault uses native asset bridges, like Circle's CCTP protocol, to send the assets to strategies on other chains.

![yvUSD Design](/img/diagrams/yvusd/summary1.png)

Because only a strategy contract is needed on any native-bridge-supported chain, rather than the entire Yearn v3 vault infra, the new design allows for a more nimble approach to capturing yield for users across chains.

![yvUSD with strategies on 3 chains](/img/diagrams/yvusd/summary2.png)

## How yvUSD differs from a standard Yearn vault

- **Cross-chain deployment:** yvUSD strategies can deploy capital on other chains via native asset and/or chain bridges. Most V3 vaults keep assets on the same chain as the vault.
- **Withdrawals can be non-atomic:** While the expectation is for withdrawals to be atomic just like a normal vault, it is possible that under certain conditions, there may be a delay.
- **Optional lock wrapper:** `Locked YvUSD` adds a cooldown plus a withdrawal window to make withdrawals more predictable for users who opt in, and it can add a "locker bonus" yield component.
- **Different strategy risk profile:** yvUSD can include cross-chain components, duration risk (holding PT tokens) and leveraged loopers (e.g., Morpho Blue), adding additional cross-chain, time, and liquidation/borrow-rate risks compared to standard Yearn vaults.

## Locked yvUSD

`Locked yvUSD` is a companion vault that wraps `yvUSD` shares and enforces a withdrawal cooldown. This is an optional opt-in product for users who can commit to delayed withdrawals, in exchange for an additional yield component (a "locker bonus") sourced from the vault's fee mechanics. The rationale for this feature is as follows: yvUSD can more effectively deploy capital into longer duration or cross-chain strategies with liquidity guarantees enforced by the locked yvUSD cooldown mechanics. These strategies in turn earn higher yield than their fully liquid counterparts and therefore all users earn better overall returns.

### Withdrawal process

Withdrawing from `Locked yvUSD` is a two-step process:

1. **Start cooldown** — call `startCooldown(shares)` to lock a specific number of shares for withdrawal. The default cooldown period is 14 days.
2. **Withdraw** — once the cooldown expires, withdraw within the 5-day withdrawal window.

If the withdrawal window expires before the user withdraws, the cooldown must be restarted from step 1. Shares locked in an active cooldown cannot be transferred.

![Withdrawal timeline for Locked yvUSD](/img/diagrams/yvusd/Locked yvUSD-timeline.png)

## Risks To Understand

yvUSD and its strategies involve risks beyond standard single-chain Yearn v3 vaults:

- Smart contract risk (Yearn vaults, strategies, and integrations)
- Stablecoin risk (depegs, issuer/custody risk, liquidity)
- Duration risk (exposure to interest rate changes when holding fixed-rate or longer-term debt positions)
- Cross-chain risk (bridging and remote execution/accounting)
- Leverage/liquidation risk (for looper strategies that borrow against collateral)

## Read More

<PrettyLink>[yvUSD Deep Dive](/developers/yvusd)</PrettyLink>

<PrettyLink>[Circle Cross-Chain Transfer Protocol (CCTP)](https://www.circle.com/cross-chain-transfer-protocol)</PrettyLink>
