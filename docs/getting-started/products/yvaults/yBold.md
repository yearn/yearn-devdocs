# yBOLD

yBOLD is Yearn's BOLD tokenized Stability pool product. It is designed to tokenize the different benefits of a BOLD-in-Stability-Pool position in a simple, user-friendly way. Let's review the basics of yBOLD:

- 1 yBOLD represents 1 BOLD deposited in one of Liquity V2's Stability Pools
- They are always redeemable for the underlying BOLD without any withdrawal fees or waiting period
- They have no transfer restrictions and thus can always be swapped in DEX pools or used in other DeFi integrations

## Get yBOLD

If you have BOLD tokens, you can convert them to yBOLD either by minting yBOLD at a 1:1 rate or buy yBOLD with BOLD (or another token) using CowSwap, which may or may not get you a better rate.

## Earn Yield on yBOLD

There are 2 main ways to earn yield on your yBOLD; (1) depositing to the Curve LP to earn trading fees and CRV emissions (AKA lp-yBOLD), or (2) staking it in the yBOLD Auto-Compounder vault (AKA ysyBOLD) to earn more yBOLD.

## How It Works

When you deposit BOLD into yBOLD, Yearn routes your funds into the different Liquity V2 Stability Pools. Revenue for Stability Pool depositors comes from (1) liquidation fees and (2) 75% of the system's interest rate earnings. When you stake yBOLD, you'll receive ysyBOLD (Staked Yearn BOLD). Over time, the value of ysyBOLD increases relative to yBOLD as rewards compound automatically.

## Why Use yBOLD?

**TLDR: Highest rewards, lowest risk.**

- Auto-Compounding: Liquidation rewards and protocol earnings are automatically re-invested into the Stability Pool, growing your position.

- Auto-optimizing: The allocation between the different stability pools is re-evaluated every 30 minutes and if there's a more profitable allocation, the vault makes the change automatically.

- Optimized rewards dumping: Instead of using hardcoded swap paths, Yearn uses a Dutch Auction to allow for MEV bots to compete to provide you with the best price.

- No oracles: No oracles are being used to price the collateral token rewards.

- Immutable: yBOLD is designed with immutability in mind. A few months after launch, once we're confident no funny stuff happens, we'll revoke any privileged rights (which are almost non-existent anyway).

- Composable: yBOLD and ysyBOLD can be integrated into DeFi protocols as a productive version of BOLD.

## Risks

- Smart Contract Risk: yBOLD relies on smart contracts from both our wrapper and Liquity V2. Use at your own risk.

- Protocol Risk: If Liquity V2 experiences bad debt or exploits, your yield (and principal) may be impacted.

- Stability Pool Risk: If there are losses in the Stability Pool, or we are not able to sell the collateral rewards at a favorable price, the strategy could experience losses. If such a scenario ever happens, the strategy automatically works towards refunding any losses in yBOLD.

## Integrations

yBOLD and ysyBOLD can be used in protocols that support ERC-4626 tokens. If you're building an integration or need help, reach out on [Telegram](https://t.me/yearnfinance/) or [Discord](https://discord.gg/yearn).
