# How Yearn Boosts Yield

This is an overview of how Yearn investment strategies take advantage of CRV vote locking on Curve Finance in order to increase yield.

## CRV vote locking

Vote locking, "Boosties", or "Vote boosting" is a Curve Finance feature where CRV is locked into the Curve DAO.

Vote locking CRV rewards yields **veCRV** (voting escrow CRV tokens). The longer time period that CRV is locked for, the more veCRVs are received. The minimum locking period is 1 week and the maximum period is 4 years.

veCRV enables its holders to:

- **vote** in Curve governance
- **stake** to earn trading fees and
- **boost** rewards from liquidity provided

### Voting

Once CRV holders vote-lock their CRV, changing it into veCRV, they can then vote on various DAO proposals and pool parameter changes which are proposed, or propose their own changes.

It is worth noting that native veCRV cannot be transferred, and the only way to obtain it is by vote-locking CRV.

You can stake CRV on [Curve.fi](https://curve.fi/) and actively manage your boosts for Liquidity Pools yourself, or you can let Yearn take care of CRV staking for you with our dedicated vaults: yveCRV, and yvBOOST. Also our yVault tokens are tradeable and transferable unlike staking CRV at [Curve.fi](https://curve.fi/).

### Staking

veCRV (staked CRV), receives a share of trading fees from the Curve protocol (50% of all trading fees generated, from Sept. 19, 2020 - onwards). Those fees are collected and used to buy 3CRV, the LP token for the TriPool (DAI+USDC+USDT), which are then distributed to veCRV holders.

#### Earning Trading fees

Based on Yearn's share of the total veCRV, 50% of trading fees will be claimed as CRV, out of which 10% will in turn be locked into the Curve DAO for more veCRV.

### Boosting

Beyond staking, another major incentive for CRV is the ability to boost your rewards on provided liquidity. Vote locking CRV allows you to acquire voting power to participate in the DAO and direct CRV reward allocations towards selected pools, earning a boost of up to **2.5x** on the liquidity you are providing.

The actual boost multiplier is determined by a formula that depends on the current pool gauge liquidity as a fraction out of the total amount of liquidity provided in Curve pools by Yearn, and the fraction of voting power that the veCRV constitutes out of the total (i.e. its share of the current total of veCRV issued).

A "Yearn boost" tool displaying Yearn's current active and potential boost is available [here](https://crv.ape.tax/).

See the [Curve Guide](https://resources.curve.fi/reward-gauges/boosting-your-crv-rewards/) for more details on the formula and its calculation.

## The yveCRV yVault

<p align="center">
  <img src="https://miro.medium.com/max/115/0*OsdD6266-e0jWcVH.png"/>
</p>

#### Earn CRV with a better boost

When a user deposits CRV into the vault, that CRV is locked on the [Curve.fi](https://curve.fi/) platform as veCRV and the user is returned a tokenized version of veCRV, yveCRV. This vault earns you a continuous share of Curve’s trading fees. Every week, these rewards can be claimed as 3Crv (Curve’s 3pool LP token).

You could do this yourself directly on the [Curve.fi](https://curve.fi/), but there is a very good reason one would prefer to use the yveCRV yVault: **more rewards!**

How much more? Your rewards through this vault can be more than double! Yearn achieves this because it periodically donates 10% of the farmed CRV it earns through all [Curve.fi](https://curve.fi/) based strategies to this yveCRV vault and allows yveCRV vault depositors to claim Yearn’s share of Curve protocol fees. This means we give all of Yearn’s rewards, which we could have claimed for the protocol, to yveCRV depositors, boosting their weekly rewards.

Locking your CRV tokens into the vault means that you delegate your [Curve.fi](https://curve.fi/) voting power to yearn. Yearn constantly runs simulations to optimize its voting allocations which maximizes yield across all vaults, benefiting your deposits in other vaults!

**You can now claim your rewards and spend that money on mojitos while you enjoy retirement.** Though, another option you might want instead is to add your rewards back into the vault to compound your gains and you can even find a “Restake” button to do just that. You could very well do this manually, but Yearn has you covered here with …

## The yvBoost yVault

<p align="center">
  <img src="https://miro.medium.com/max/115/0*Xr6RMWyDc6gmZnKw.png"/>
</p>

#### Earn boosted CRV with compounding

The yvBOOST yVault is a fully automated and compounding version of the yveCRV yVault explained above.

To put it simply, this vault claims your weekly 3CRV rewards automatically and uses them to acquire more yveCRV (either via market-buy or mint, depending on which is most efficient at time of harvest).

Once deposited, just as in the yveCRV yVault, your CRV tokens’s voting power is handled and optimized by Yearn. You do not need to worry about claiming [Curve.fi](https://curve.fi/)’s weekly protocol fees, the vault does this for you!

This is a “set-and-forget” vault where your CRV tokens grow exponentially, harnessing the power of compound interest!

Now you might be wondering how one would extract any gains made from your CRV tokens in the vault, when as mentioned earlier, any CRV deposited into either the yveCRV or the yvBOOST are locked. While you cannot withdraw from the yveCRV vault, you can actually swap both of these vault tokens on Sushiswap. This is because Yearn and its users provide liquidity on Sushiswap to allow swapping of your yveCRV and yvBOOST tokens for ETH (or anything, really).

#### A little alpha.

Yearn buys yvBOOST from the market, unwraps it into yveCRV, and donates that yveCRV into the yvBOOST vault, increasing the underlying value of yvBOOST.

### Locking CRV for veCRV

**10% of all CRV earned** by the strategies are **locked up for 4 years** in the Curve DAO in order to get the maximum reward ratio of 1:1 CRV:veCRV.

Actual veCRV distribution has not yet begun, with a date for this still to be announced by Curve Finance.

## CRV Vote Locking in Yearn

Staking your CRV directly on the [Curve.fi](https://curve.fi/) platform means locking your CRV token in exchange for a non-transferrable veCRV token that allows you to manually claim a share of the protocol’s fee (3CRV). You can use this veCRV token to manually rebalance your votes to obtain a boost on your provided liquidity to the [Curve.fi](https://curve.fi/) platform.

Yearn deploys a single CRV vote locking strategy that is shared across its general Curve strategies:

- [StrategyCurveYBUSDVoterProxy](https://etherscan.io/address/0x112570655b32a8c747845e0215ad139661e66e7f#code)
- [StrategyCurveBTCVoterProxy](https://etherscan.io/address/0x6d6c1ad13a5000148aa087e7cbfb53d402c81341#code)
- [StrategyCurveYVoterProxy](https://etherscan.io/address/0x07db4b9b3951094b9e278d336adf46a036295de7#code)
- [StrategyCurve3CrvVoterProxy](https://etherscan.io/address/0xC59601F0CC49baa266891b7fc63d2D5FE097A79D#code)

### Enter Yearn’s yveCRV and yveBOOST vaults

Both of these Yearn vaults reward CRV stakers with a share of the CRV locked by Yearn, making it an ideal destination for those who wish to stake CRV whilst remaining liquid:

- Earn a share of trading fees from the [Curve.fi](https://curve.fi/) protocol (3Crv), automatically reinvested (for the yvBOOST vault).
- Earn a share of Yearn’s claim of [Curve.fi](https://curve.fi/) protocol fees, on top of your own rewards (more 3CRV!), automatically reinvested (for the yvBOOST vault).
- The collective voting power of the veCRV tokens is optimized and rebalanced automatically to maximize rewards in all of Yearn’s Curve Pool vaults.
- Receive yveCRV or yvBOOST tokens for your deposited CRV, allowing you to easily extract profit or exit your staked CRV position

Yearn’s work to automate the yield generation and rebalancing of your crypto assets is especially true in the case of your CRV holdings, and Yearn’s yveCRV or yvBOOST offers a powerful, compounding, “set-and-forget” place to stake your CRV!

## Yearn veTokens Holdings

- veYFI: https://yearn.vision/?orgId=1&refresh=5m&viewPanel=53
- veCRV: https://yearn.vision/d/Qu4WGIwnz/vecrv?orgId=1

## More information

- [curve.fi](https://www.curve.fi/) webpage
- Curve [Guide](https://resources.curve.fi/crv-token/staking-your-crv/) for staking CRV
- Curve [Guide](https://resources.curve.fi/reward-gauges/boosting-your-crv-rewards/) for vote locking
- Curve [FAQ](https://resources.curve.fi/governance/vote-locking-boost)
- deFinn [Infographic](https://gateway.pinata.cloud/ipfs/QmY8BZjN6oT4rrgveSqHjygcQmWitoMQk5B3moqFA6K8ea) on CRV Voting Boost and formula
- Boost [calculator](https://dao.curve.fi/minter/calc)
- Yearn CurveDAO proxy strategy [diagram](https://twitter.com/bantg/status/1308680661801340929)
