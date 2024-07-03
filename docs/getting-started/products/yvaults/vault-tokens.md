# yVault Tokens

[yVault Tokens](https://docs.yearn.fi/resources/defi-glossary#ytoken) are like a deposit receipt. They represent a user's share of the yVault that they are participating in.

**For example**, if you deposit YFI in a yVault you will receive yvYFI in return. yvYFI would be the yVault Token.

If your yVault generates profit, the share price of your yVault tokens will increase. This happens because more underlying tokens are in the yVault to redeem upon withdrawal.

![](https://i.imgur.com/3zkSnoE.png)
![](https://i.imgur.com/yrGEVCr.png)

Once a user's liquidity is withdrawn from the yVault, their yVault Token will be burned. yVault Tokens are [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/), meaning they can be transferred and traded as any other common Ethereum token.

The vault tokens have evolved between v1, v2, and v3, here are a couple of main differences:

## V1 yVault Tokens

- Each vault contract can use only 1 yield strategy contract.
- Vault tokens are prefixed with a leading `y`, so a v1 vault for USDC gives the user yUSDC.

## V2 yVault Tokens

- Each vault contract can use up to 20 yield strategy contracts.
- Vault tokens are prefixed with `yv`, so a v2 vault for USDC gives the user yvUSDC.

## V3 yVault Tokens

- All V3 vaults are [ERC-4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) compliant.
- Vaults can be either [multi-strategy](https://docs.yearn.fi/developers/v3/overview#definitions) or [single-strategy (Tokenized Strategy)](https://docs.yearn.fi/developers/v3/overview#definitions).
- Multi-strategy vaults tokens are prefixed with `yv` and appended with a ["category"](https://docs.yearn.fi/developers/v3/integrating_v3#category), so a v3 vault for USDC with a category type of `1` gives the user `yvUSDC-1`.
- Single strategy vaults are prefixed with `ys`, so a v3 single strategy vault gives the user `ysUSDC`.
