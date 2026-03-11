# yvUSD

## Overview

**yvUSD** is a USDC-denominated cross-chain Yearn V3 vault. In standard Yearn v3 vaults, the assets deposited into a vault stay on the same chain.

![Standard mainnet Yearn vault](/img/diagrams/yvusd-mainnet.png)

But yvUSD applies a new design approach: combine the battle-tested Yearn v3 vault with cross-chain capital deployment to maximize yield. Users deposit their USDC to the vault on mainnet and the vault uses Circle's CCTP protocol to send the assets to strategies on other chains.

![yvUSD Design](/img/diagrams/yvusd1.png)

Because only a strategy contract is needed on any CCTP-supported chain, rather than the entire Yearn v3 vault infra, the new design allows for a more nimble approach to capturing yield for users across chains.

![yvUSD with strategies on 3 chains](/img/diagrams/yvusd2.png)

## How yvUSD differs from a standard V3 vault

- **Cross-chain deployment:** yvUSD strategies can deploy capital on other chains via Circle CCTP. Most V3 vaults keep assets on the same chain as the vault.
- **Withdrawals can be non-atomic:** because some capital may be deployed remotely, not all assets are necessarily immediately available on mainnet at all times.
- **Optional lock wrapper:** `LockedyvUSD` adds a cooldown plus a withdrawal window to make withdrawals more predictable for users who opt in, and it can add a "locker bonus" yield component.
- **Different strategy risk profile:** yvUSD can include cross-chain components and leveraged loopers (e.g., Morpho Blue), adding additional cross-chain and liquidation/borrow-rate risks compared to standard Yearn v3 vaults.
- **APR computation/display:** yvUSD APR is typically an aggregated, debt-weighted rate and is often surfaced via an onchain APR oracle plus an offchain APR service/cache (so displayed APR can lag conditions).

<PrettyLink>[yvUSD developer deep dives](/developers/yvusd)</PrettyLink>

## LockedyvUSD

`LockedyvUSD` is a companion vault that wraps `yvUSD` shares and enforces a withdrawal cooldown. This is an optional opt-in product for users who can commit to delayed withdrawals, in exchange for an additional yield component (a "locker bonus") sourced from the vault's fee mechanics. The rationale for this feature is that standard Yearn v3 vaults allow for atomic withdrawals (the assets are already on the correct chain and can be withdrawn immediately), but CCTP involves a delay in bridging assets, meaning that not all vault assets are available immediately in yvUSD as they are in standard Yearn v3 vaults.

### Withdrawal process

Withdrawing from `LockedyvUSD` is a two-step process:

1. **Start cooldown** — call `startCooldown(shares)` to lock a specific number of shares for withdrawal. The default cooldown period is 14 days.
2. **Withdraw** — once the cooldown expires, withdraw within the 7-day withdrawal window.

If the withdrawal window expires before the user withdraws, the cooldown must be restarted from step 1. Shares locked in an active cooldown cannot be transferred.

## Risks To Understand

yvUSD and its strategies involve risks beyond standard single-chain Yearn v3 vaults:

- Smart contract risk (Yearn vaults, strategies, and integrations)
- Stablecoin risk (depegs, issuer/custody risk, liquidity)
- Cross-chain risk (bridging and remote execution/accounting)
- Leverage/liquidation risk (for looper strategies that borrow against collateral)

## Read More

<PrettyLink>[yvUSD Deep Dive](/developers/yvusd)</PrettyLink>

<PrettyLink>[Circle Cross-Chain Transfer Protocol (CCTP)](https://www.circle.com/cross-chain-transfer-protocol)</PrettyLink>
