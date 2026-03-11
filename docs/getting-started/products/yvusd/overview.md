# yvUSD

## Overview

**yvUSD** is a USDC-denominated cross-chain Yearn V3 vault. In standard Yearn v3 vaults, the assets deposited into a vault stay on the same chain.

![Standard mainnet Yearn vault](/img/diagrams/mainnet.png)

But yvUSD applies a new design approach: combine the battle-tested Yearn v3 vault with cross-chain capital deployment to maximize yield. Users deposit their USDC to the vault on mainnet and the vault uses Circle's CCTP protocol to send the assets to strategies on other chains.

![yvUSD Design](/img/diagrams/yvusd1.png)

Because only a strategy contract is needed on any CCTP-supported chain, rather than the entire Yearn v3 vault infra, the new design allows for a more nimble approach to capturing yield for users across chains.

![yvUSD with strategies on 3 chains](/img/diagrams/yvusd2.png)

## LockedyvUSD

`LockedYvUSD` is a companion vault that wraps `yvUSD` shares and enforces a 7-day withdrawal cooldown. This is an optional opt-in product for users who can commit to delayed withdrawals, in exchange for an additional yield component (a "locker bonus") sourced from the vault's fee mechanics. The rationale for this feature is that standard Yearn v3 vaults allow for atomic withdrawals (the assets are already on the correct chain and can be withdrawn immediately), but CCTP involves a delay in bridges assets, meaning that not all vault assets are available immediately in yvUSD as they are in standard Yearn v3 vaults.

## Risks To Understand

yvUSD and its strategies involve risks beyond standard single-chain Yearn v3 vaults:

- Smart contract risk (Yearn vaults, strategies, and integrations)
- Stablecoin risk (depegs, issuer/custody risk, liquidity)
- Cross-chain risk (bridging and remote execution/accounting)
- Leverage/liquidation risk (for looper strategies that borrow against collateral)

## Read More

**V3 overview:** <PrettyLink>[https://docs.yearn.fi/developers/v3/overview](/developers/v3/overview)</PrettyLink>

**Circle CCTP:** <PrettyLink>https://www.circle.com/cross-chain-transfer-protocol</PrettyLink>
