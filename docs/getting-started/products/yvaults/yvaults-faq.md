# yVaults FAQ

<details className="customFaqDetails">

  <summary>

## yVaults ELI-5
  
  </summary>

Yearn Vaults are contracts on the Ethereum blockchain—and the layer2 networks that sit atop it. They allow you to deposit cryptocurrency tokens you own and earn interest on them. When you deposit, your tokens are combined with other depositors' tokens and directed toward interest earning opportunities. How and which opportunities are chosen depends on the *Strategies* used by the vault. You receive a receipt token (aka a Vault Token) that can be used to retrieve your original deposit plus any interest earned.
</details>

<details className="customFaqDetails">

  <summary>

## V1, V2, V3, Juiced... Whats the difference?

  </summary>

So many options! But don't worry, it isn't so complicated.

- V3 are the newest vaults. They are probably your best bet unless you can't find what you are looking for.
- V2 are older vaults, but are still used for Curve and Curve-based pools like Velodrome and Aerodrome.
- V1 vaults are the OG and not supported so you shouldn't even see them anywhere. If you do, or if you need to access funds deposited during defi summer, hop in the discord and let us know. Someone there can help you out. Discord link is above under "Community".
- Juiced Vaults are vaults built to use Ajna, which is a new lending and borrowing protocol. They have their own [front-end](https://juiced.yearn.fi/) and [docs](https://docs.juiced.app/) so check those out. One thing to be aware of is that since Ajna is a lending platform, you may not be able to withdraw funds immediately if there is high borrowing demand.

</details>

<details className="customFaqDetails">

  <summary>

## What is Gimme?

  </summary>

[Gimme](https://gimme.mom/) is a new, easy-to-use front-end focused on making Yearn super simple. It currently supports Polygon and Base Vaults and will roll out other L2s soon. You can easily zap right into Yearn's single asset V3 vaults and start earning fast!

</details>

<details className="customFaqDetails">

  <summary>

## How Do Vault Tokens Work?

  </summary>

[yVault Tokens](https://docs.yearn.fi/resources/defi-glossary#ytoken) are like a deposit receipt. They represent a user's share of the yVault that they are participating in.

**For example**, if you deposit YFI in a yVault you will receive yvYFI in return. yvYFI would be the yVault Token.

If your yVault generates profit, the share price of your yVault tokens will increase. This happens because more underlying tokens are in the yVault to redeem upon withdrawal.

![image](https://i.imgur.com/3zkSnoE.png)
![image](https://i.imgur.com/yrGEVCr.png)

Once a user's assets are withdrawn from the yVault, their yVault Token will be burned. yVault Tokens are [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/), meaning they can be transferred and traded as any other common Ethereum token.

The vault tokens have evolved between v1, v2, and v3, here are a couple of main differences:

### V1 yVault Tokens

- Each vault contract can use only 1 yield strategy contract.
- Vault tokens are prefixed with a leading `y`, so a v1 vault for USDC gives the user yUSDC.

### V2 yVault Tokens

- Each vault contract can use up to 20 yield strategy contracts.
- Vault tokens are prefixed with `yv`, so a v2 vault for USDC gives the user yvUSDC.

### V3 yVault Tokens

- All V3 vaults are [ERC-4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) compliant.
- Vaults can be either [multi-strategy](https://docs.yearn.fi/developers/v3/overview#definitions) or [single-strategy (Tokenized Strategy)](https://docs.yearn.fi/developers/v3/overview#definitions).
- Multi-strategy vaults tokens are prefixed with `yv` and appended with a ["category"](https://docs.yearn.fi/developers/v3/integrating_v3#category), so a v3 vault for USDC with a category type of `1` gives the user `yvUSDC-1`.
- Single strategy vaults are prefixed with `ys`, so a v3 single strategy vault gives the user `ysUSDC`.

</details>
