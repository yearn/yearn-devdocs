# yBOLD

yBOLD is Yearn's BOLD tokenized Stability Pool product. It is designed to tokenize the different benefits of a BOLD-in-Stability-Pool position in a simple, user-friendly way. Let's review the basics of yBOLD:

- 1 yBOLD represents 1 BOLD deposited across Liquity V2's Stability Pools
- They are always redeemable for the underlying BOLD without any withdrawal fees or waiting period (the price-per-share stays at 1.0 by design)
- They have no transfer restrictions and thus can always be swapped in DEX pools or used in other DeFi integrations

## Get yBOLD

If you have BOLD tokens, you can convert them to yBOLD either by minting yBOLD at a 1:1 rate or buy yBOLD with BOLD (or another token) using CowSwap, which may or may not get you a better rate.

## Earn Yield on yBOLD

The way to capture the Stability Pool yield is to **stake your yBOLD in the yBOLD Auto-Compounder vault** (AKA ysyBOLD), whose value grows relative to yBOLD as rewards compound automatically. Bare yBOLD does not accrue yield on its own, only staked yBOLD (ysyBOLD) does.

## How It Works

When you deposit BOLD into yBOLD and stake it for ysyBOLD, Yearn routes your funds across Liquity V2's Stability Pools (currently the wstETH, rETH, and WETH branches, rebalanced toward the best yield). Revenue for Stability Pool depositors comes from two sources:

1) **Liquidation gains**: when a loan is liquidated, the pool absorbs its BOLD debt and seizes the collateral (wstETH/rETH/WETH) at roughly a 5% discount
2) **Borrower interest**: 75% of all interest paid by Liquity V2 borrowers is directed to the Stability Pool depositors, paid in BOLD.

## Why Use yBOLD?

**TLDR: Highest rewards, lowest risk.**

- Auto-Compounding: Liquidation rewards and protocol interest are automatically harvested and re-deposited into the Stability Pool, with the proceeds compounding into the value of ysyBOLD over time.

- Auto-optimizing: The allocation between the different stability pools is re-evaluated every 30 minutes and if there's a more profitable allocation, the vault makes the change automatically.

- Low risk design: The independent [Pharos risk rating dashboard](https://pharos.watch/stablecoin/ybold-yearn/) gives yBOLD an "A" safety rating. By building on a decentralized stablecoin, yBOLD has no risk of underlying collateral manipulation by a centralized entity.

- Optimized rewards dumping: Instead of using hardcoded swap paths, Yearn sells liquidation collateral through a permissionless Dutch auction where MEV bots compete to fill. The auction starts at a buffer above the oracle price (≥115%) and floors at 95% of oracle, and refuses to sell at stale oracle prints. This is structurally better execution than a manual swap, with no sandwiching.

- Oracle-independent price discovery: Collateral rewards are sold via competitive auction rather than being marked-to-market at an oracle price at report time. An oracle only provides a 95% safety floor (and stale-price guardrail) for the auction, it does not set the realized sale price.

- Composable: yBOLD and ysyBOLD can be integrated into DeFi protocols as a productive version of BOLD.

## Risks

- Smart Contract Risk: yBOLD relies on smart contracts from both our wrapper and Liquity V2. Use at your own risk.

- Protocol Risk: If Liquity V2 experiences bad debt or exploits, your yield (and principal) may be impacted.

- Stability Pool Risk: If there are losses in the Stability Pool, or we are not able to sell the collateral rewards at a favorable price, the strategy could experience losses. If such a scenario ever happens, the strategy automatically works towards refunding any losses in yBOLD.

## Integrations

yBOLD and ysyBOLD can be used in protocols that support ERC-4626 tokens. If you're building an integration or need help, reach out on [Telegram](https://t.me/yearnfinance/) or [Discord](https://discord.gg/yearn).
