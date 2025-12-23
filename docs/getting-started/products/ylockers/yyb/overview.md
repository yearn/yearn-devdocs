# yYB Overview

## What is yYB?

yYB is Yearn's veYB yLocker product. It is designed to tokenize the different benefits of a [veYB position](https://docs.yieldbasis.com/user/veyb) in a simple, user-friendly way. Let's review the basics of liquid locker tokens like yYB:

* 1 yYB represents 1 veYB permalocked to Yearn
* They are not redeemable for the underlying locked YB
* They have no transfer restrictions and thus can always be swapped in DEX pools

yYB gives users access to veYB revenue sources (admin fees and vote incentives) without giving up the option to instantly exit their position. Depositing to yYB also allows Yearn to use the locked YB to actively participate in Yield Basis governance.

For more information about Yearn's Liquid Lockers, read the overview [here](/getting-started/products/ylockers/overview).

## Get yYB

yYB is a wrapped version of YB. But unlike other wrapped tokens like WETH, it cannot be unwrapped as it is forever max-locked into the veYB system. But, unlike veYB, it can be swapped on DEXes.

If you have YB tokens...

* You can convert them to yYB by minting yYB at a 1:1 rate [here](https://yyb.yearn.fi/app/get)
* You can buy yYB via Curve or CowSwap, which may get you a better rate

If you have an existing veYB position...

* You can convert your veYB to yYB at a 1:1 rate [here](https://yyb.yearn.fi/app/migrate) after completing these steps:
    1. Clear votes - Remove gauge weight allocations
    2. Max lock - Permalock your YB

## Earn yield on yYB

Yearn has two ways to earn yield on your yYB; depositing to the `YearnBoostedStaker` contract to earn crvUSD or depositing to the yYB Auto-Compounder vault (yvyYB) to earn more yYB. The differences and details are documented [here](/getting-started/products/ylockers/overview). Once you know which path you want to take, you can follow the step by step guide [here](/getting-started/products/ylockers/yyb/yyb-guide).

## Links

* [Contract Addresses](https://docs.yearn.fi/developers/addresses/yyb-contracts)
* [yYB UI](https://yyb.yearn.fi/)
* [UI Source Code](https://github.com/yearn/ylockers-ui)
* [Yearn Boosted Staker Source Code](https://github.com/yearn/yearn-boosted-staker)
* [YB Monitor - veYB Locks](https://www.ybmonitor.com/veYB)
* [yLockers Discord Channel](https://discord.com/channels/734804446353031319/1186417376275730552)
