# yCRV

## What is yCRV
![](https://i.imgur.com/ni42qE6.png)

### Base-token

yCRV is the base-token, which carries no native rewards, but lets users easily enter into the other 'activated' tokens that do.

New yCRV can be minted in two ways:

- Lock CRV in yearn (permanent 1-way lock).

*or*

- Migrate from legacy tokens [yveCRV and yvBOOST](#how-yvecrv-and-veboost-functionality-was-migrated-to-ycrv).

yCRV can only ever be minted when a user either locks their CRV or migrates their yveCRV. Both operations mint yCRV at a 1:1 rate. All CRV locked in this way will automatically get max-locked as veCRV to increase Yearn's veCRV position. 

### 'Activated'-tokens

Yearn passes all benefits of its veCRV position on to yCRV users who hold one of its **activated-tokens:**

- [**st-yCRV (Staking Rewards):**](#staked-ycrv) [yVault](https://medium.com/iearn/yearn-finance-explained-what-are-vaults-and-strategies-96970560432) that receives admin fees and bribes from locked CRV.
- [**lp-yCRV (Liquidity Pool Rewards):**](#lpd-ycrvcrv) yVault for CRV/yCRV LP tokens, autocompounds emissions and fees.
- [**vl-yCRV (Curve Gauges Voting Power):**](#voting-with-ycrv) Vote power mechanism to vote on Curve gauge weights. 

Users can choose to move between activated-tokens at any time depending on which benefits they want, except for vl-yCRV which has time lock [restrictions](#voting-with-ycrv) varying from 14 to 28 days.

![](https://i.imgur.com/KrYztyJ.png)


## Staked yCRV
![](https://i.imgur.com/IgpIhKN.png)


Staked yCRV is designed to be a 'set and forget' yield-optimized position for yCRV users. The source of yield comes from two primary places:

- **Admin Fees:** Every week, veCRV holders earn weekly "admin fees" from Curve protocol. Staked yCRV is where 100% of admin fees earned by Yearn's veCRV position are sent and auto-compounded into more yCRV.
- **Bribes:** For all the yCRV within st-yCRV, 1 veCRV worth of vote power will be used to vote in favor of the Curve gauge which optimizes bribe revenue for st-yCRV users. Bribes (or misc. revenue) collected from these votes will be allocated as supplemental yield to st-yCRV users.

Under the hood, st-yCRV is a Yearn v2 vault, allowing users to sit back, relax and have their underlying token compounded by a strategy that sells 3CRV and some claimed bribes into yCRV.

## LP'd yCRV/CRV
![](https://i.imgur.com/3JNhzWR.png)

Liquidity Pool'd yCRV provides liquidity to the new CRV/yCRV pool on Curve, and lp-yCRV holders receive this LP fees and emissions. When you zap to this token, under the hood, you are entering an LP position in the yCRV/CRV pool and and depositing the LP tokens into the lp-yCRV yVault.

This is also a v2 Yearn vault with a strategy that deposits all CRV emissions generated back into the pool to grow the position. Like st-yCRV this is designed to be a set and forget token that auto harvests and auto compound rewards.

Yearn will mark 1 veCRV worth of voting power for every 1 yCRV in this position to vote in favor of yCRV Curve gauge - increasing CRV emissions to users.

## Voting with yCRV
![](https://i.imgur.com/uCwM4Pv.png)

vl-yCRV is the position that users can enter which allows them to cast votes for Curve [gauge](https://resources.curve.fi/reward-gauges/understanding-gauges) weights.

**It is currently in the final stages of development, not yet ready for production.**

In this position, users can vote for gauge weights (not DAO votes).

Users in this position will not earn weekly admin fees or bribes, and will be subject to a minimum 14-day lock (28-day maximum). Once the lock period is over, the user is free to withdraw to yCRV if they choose and move freely within/without the yCRV ecosystem.

We expect this system to be especially useful protocols that seek to boost emissions to their pool's Curve gauges without committing to a 4-year veCRV lock or repeatedly submitting large bribes.

### Voting In-depth:
- Voting periods last 14 days.
- Users can vote on a single gauge or split their votes across multiple gauges.
- Users must vote every period. Votes cannot carry over automatically from one period to the next.
- Voting is all on-chain and therefore is not cost-free. Consider voting when the network is not particularly congested.
- Votes can be added throughout the week as long as the user's balance permits.
- Once voted on a gauge in a period, those votes cannot be removed or substituted until the next period.

#### Vote Delegation
- Each vl-yCRV user can assign up to one delegate who becomes eligible to cast votes on behalf of the user.
- The purpose of delegation is to allow for multisigs to automate their voting activities each period, reducing missed votes due to slow signers or forgetfulness.

#### Locks
- A vote lock lasts a minimum of 1 voting period (14 days) and no more than 28 days depending on when the vote was cast.
- Each vote re-ups a user's lock for the remainder of the current period plus the full duration of the next period.
- After unlock time has expired, users can withdraw from vl-yCRV and move freely within the yCRV system.
<p align="center">
  <img width="620" height="280" src="https://i.imgur.com/p5fCVnY.png"/>
</p>

### Bribes and Incentives
- While in vl-yCRV, users forego yield from other parts of the yCRV system.
- vl-yCRV users will not collect bribes on the gauges they vote for.

## How yveCRV and veBOOST functionality was migrated to yCRV

yveCRV and yvBOOST are being deprecated, and there is a migration path available to users. The functionality of both was integrated into [st-yCRV](#staked-ycrv) so if you are looking for the same benefits check the guide on [how to migrate from the legacy tokens](#how-to-migrate-from-yvecrv-andor-yvboost) using yearn's UI

![](https://i.imgur.com/Htl3AgP.png)

## Guide: How To Use The UI

DeFi can look complicated, but like any new technology, the best way to get comfortable with it… is to use it. This short guide will take you through the steps to start earning that sweet sweet yield with yCRV. Are you ready anon? Let’s go.

You'll need a browser [wallet](https://finematics.com/top-3-defi-wallets-for-2021/) and some [ETH](https://consensys.net/blog/metamask/how-to-use-the-browser-buy-eth-and-send-transactions-on-metamask-mobile/) in it to pay for gas fees. You'll also need some CRV in your wallet which can be bought at your favorite exchange like CowSwap, Uniswap, Binance, FTX.

So, with Eth and CRV loaded up, let's find out how to start earning supercharged yields.

- **yCRV Interface:** https://ycrvdev.yearn.farm/

### Connect Wallet with yCRV interface

1) Click "Connect Wallet" in [yCRV interface](https://ycrvdev.yearn.farm/)
![](https://i.imgur.com/QVAmOXb.png)

2) Select your preferred wallet and confirm the connection
![](https://i.imgur.com/pZ7FmCY.png)

3) If you see a wallet address instead of "Connect Wallet" you are connected!
![](https://i.imgur.com/FNjmMQG.png)


### How to zap from CRV or yCRV to any of the 3 types of reward tokens

As yCRV is the base-token and carries no native yield or voting power, you'll likely want to position yourself into one of the three activated-tokens.

1) Go to [yCRV interface](https://ycrvdev.yearn.farm/) and decide which token you want to zap to. You can zap from either CRV or yCRV:
    - [**st-yCRV (Staking Rewards):**](#staked-ycrv) [yVault](https://medium.com/iearn/yearn-finance-explained-what-are-vaults-and-strategies-96970560432) that receives admin fees and bribes from locked CRV.
    - [**lp-yCRV (Liquidity Pool Rewards):**](#lpd-ycrvcrv) yVault for CRV/yCRV LP tokens, autocompounds emissions and fees.
    - [**st-yCRV (Curve Gauges Voting Power):**](#voting-with-ycrv) Vote power mechanism to vote on Curve gauge weights. 
![](https://i.imgur.com/rpLcCwg.png)

2) Choose your desired position:
![](https://i.imgur.com/xjSlSd0.png)

3) Approve the contract:
![](https://i.imgur.com/qahKX4O.png)

4) Execute the swap:
![](https://i.imgur.com/xigS4rA.png)


### How to migrate from yveCRV and/or yvBOOST

yCRV and its ecosystem tokens are a redesign of our previous yveCRV and yvBOOST tokens (which are no longer supported), however if you hold these tokens, you can easily migrate to the new tokens.

1) Select the token you want to migrate from in [yCRV interface](https://ycrvdev.yearn.farm/):
![](https://i.imgur.com/6wPMtAJ.png)

2) Select the token you want to migrate to:
![](https://i.imgur.com/AaYKfNk.png)

3) Chose the amount (max will be filled already) and approve the contract:
![](https://i.imgur.com/wFbWpwY.png)

4) Execute the swap:
![](https://i.imgur.com/uLrNb2z.png)

## FAQ

### Launch and Migration

#### When will yCRV launch?
TBD - no date set yet. All contracts are live, but due to how rewards work, some coordination is required to ensure all users are migrated without missing rewards.

#### Should I migrate now?
No. Wait until the migration date, when incentives move to the new system otherwise you will not have exposure to them.

#### What happens to yveCRV and yvBOOST?
yveCRV and yvBOOST are being deprecated, and there is a migration path available to users. yCRV can be minted 1:1 from yveCRV. yCRV can be minted `1 * pricePerShare` of yvBOOST at the time of migration. There will be a migration zap available to all users to make this easy.

#### Will I get rewards if I don't migrate?
No. After the cut-over date, all incentives will move to the new yCRV system.

#### Is there a deadline for migration?
Nope! You can migrate anytime in the future. Contracts are trustless and migrations cannot be stopped.

## Addresses

- **yCRV:** [0xFCc5c47bE19d06BF83eB04298b026F81069ff65b](https://etherscan.io/address/0xFCc5c47bE19d06BF83eB04298b026F81069ff65b)
- **st-yCRV (vault):**	[0x27B5739e22ad9033bcBf192059122d163b60349D](https://etherscan.io/address/0x27B5739e22ad9033bcBf192059122d163b60349D)
- **lp-yCRV (vault):** [0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e](https://etherscan.io/address/0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e)
- **vl-yCRV:** in audit
- **CRV/yCRV Curve Pool:** [0x453D92C7d4263201C69aACfaf589Ed14202d83a4](https://etherscan.io/address/0x453D92C7d4263201C69aACfaf589Ed14202d83a4)
- **ZapYCRV.vy (zapper):** [0x01D7f32B6E463c96c00575fA97B8224326C6A6B9](https://etherscan.io/address/0x01D7f32B6E463c96c00575fA97B8224326C6A6B9)
- **yCRV Interface:** https://ycrvdev.yearn.farm/