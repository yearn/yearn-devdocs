# yVaults

:::yearn[WHAT IS A yVAULT ANYWAY?]

Yearn Vaults are like crypto savings accounts in cyberspace. You deposit your assets, and Yearn's smart contracts put them to work within the DeFi ecosystem, returning the earned yield back to you.

However, unlike a bank account - none of this takes place behind closed doors (no offense to doors). Decentralized Finance uses public blockchains, meaning you are in control of your assets and can see where they are at all times. Nothing is hidden and everything is auditable by anyone, at any time.

With the advent of v3, Vaults can now be made out of a single strategy for your assets, or a collection of multiple strategies which balance your funds between them. Users now have more control over where they want their funds to go and a wider range of risk appetites.

Go you!

:::

<PrettyLink>[Still Confused? Click here for an ELI-5 explainer](yvaults-faq#yvaults-eli-5)</PrettyLink>

## yVault Types

Over the years, Yearn has developed 3 versions of the yVault products: v1, v2, and v3. Super creative, we know!

- [**v1 yVaults**](../../../developers/v1/introduction) are the OG vaults and are mostly phased out (*deprecated* in developer-speak).

- [**v2 yVaults**](./v2) are the reliable, workhorse vaults that you know and love. They started focused on the Curve ecosystem and are still used when creating vaults for Curve pools.

- [**v3 yVaults**](./v3) are the new cool vaults on the block. They are designed to interoperate using the ERC-4626 standard and have several new features to make them safer and easier to use and create.

## yVault Fee Structure

yVaults have 2 potential fees that can be charged on deposited funds:

**Performance Fee**: Deducted from yield earned every time a vault harvests a strategy.

**Management Fee**: Flat rate taken from vault deposits over a year. The fee is extracted by minting new shares of the vault, thereby diluting vault participants. This is done at the time of harvest, and calculated based on time since the previous harvest.

Prior to [YIP-69](https://gov.yearn.fi/t/yip-69-reduce-and-cap-fees-through-yrates/12588), vaults had 20% performance fees and 2% management fees, but this has changed and yVaults now have a dynamic fee structure.

Single asset vaults generally have no management fee. Fee values for all yVaults can be checked in real-time at [yearn.fi](https://yearn.fi/)

- On the [yearn.fi](https://yearn.fi/) user interface, yield is displayed as net APY. This means that both fees and compounding returns are taken into consideration in the rates presented. Since harvests don't occur on a set basis, yield is usually estimated based on historical data. For more information, see [How to Understand yVault ROI](../../guides/how-apy-works)

- For vaults deployed by the vault [factory](/developers/v2/vault-factory) the performance fee is 10% instead of 20%.
