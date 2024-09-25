
# yCRV Overview

![image](/img/product-pages/ycrv-banner.png)

## What is yCRV?

yCRV is Yearn's veCRV yLocker product. It is designed to tokenize the different benefits of a [veCRV position](https://resources.curve.fi/crv-token/vecrv/) in a simple, user-friendly way. Let's review the basics of liquid locker tokens like yCRV:

- 1 yCRV represents 1 veCRV max-locked to Yearn
- They are not redeemable for the underlying locked CRV
- They have no transfer restrictions and thus can always be swapped in DEX pools

yCRV allows Yearn to use your CRV tokens optimally within the Curve ecosystem to boost yields across all products and earn rewards from admin fees and voter incentives. Depositing to yCRV also allows Yearn to use the locked CRV to actively participate in Curve governance.

For more information about Yearn's Liquid Lockers, read the overview [here](../overview.md).

## Get yCRV

yCRV is a wrapped version of CRV. But unlike other wrapped tokens like WETH, it cannot be unwrapped as it is forever max-locked into the veCRV system. But, unlike veCRV, it can be swapped on DEXes.

If you have CRV tokens, you can convert them to yCRV either by minting yCRV at a 1:1 rate at https://ycrv.yearn.fi/app/get. You can also buy yCRV with CRV (or another token) using [CowSwap](https://swap.cow.fi/#/1/swap/CRV/YCRV), which may get you a better rate.

## Earn Yield on yCRV

Yearn has 2 ways to earn yield on your yCRV; depositing to the `YearnBoostedStaker` contract to earn crvUSD or depositing to the yCRV Auto-Compounder vault (yvyCRV) to earn more yCRV. The Differences and details are documented [here](/getting-started/products/ylockers/overview). Once you know which path you want to take, you can follow the step by step guide [here](/getting-started/products/ylockers/ycrv/ycrv-guide).

:::info

The names yvyCRV and st-yCRV refer to the same thing: The [Auto-compounding yCRV vault](https://etherscan.io/address/0x27B5739e22ad9033bcBf192059122d163b60349D#code). Websites and services may still use the old name (st-yCRV). We are working with ecosystem projects to change the name to yvyCRV universally, but until then, if you have concerns about your assets, be sure to check the contract address.

:::

___

## Links

<PrettyLink>[Contract Addresses](/developers/addresses/ycrv-contracts)</PrettyLink>
<PrettyLink>[yCRV UI](https://ycrv.yearn.fi)</PrettyLink>
<PrettyLink>[UI Source Code](https://github.com/yearn/ylockers-ui-ycrv)</PrettyLink>
<PrettyLink>[Yearn Boosted Staker Source Code](https://github.com/yearn/yearn-boosted-staker)</PrettyLink>
<PrettyLink>[crvhub.com - Liquid Lockers Tracker](https://crvhub.com/wrappers)</PrettyLink>
<PrettyLink>[yLockers Discord Channel](https://discord.com/channels/734804446353031319/1186417376275730552)</PrettyLink>
