
# yCRV Overview

## What is yCRV?

yCRV is Yearn's veCRV yLocker product. It is designed to tokenize the different benefits of a veCRV position in a simple, user-friendly way. Let's review the basics of liquid locker tokens like yCRV:

- 1 yCRV represents 1 veCRV max-locked to Yearn
- They are not redeemable for the underlying locked CRV
- They have no transfer restrictions and thus can always be swapped in DEX pools

yCRV allows Yearn to use your CRV tokens optimally within the Curve ecosystem to boost yields across all products and earn rewards from admin fees and voter incentives. Depositing to yCRV also allows Yearn to uses the locked CRV to actively participate in Curve governance.

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

- [yCRV UI](https://ycrv.yearn.fi)
- [UI Source Code](https://github.com/MarcoWorms/ylockers-ui-ycrv)
- [Yearn Boosted Staker Source Code](https://github.com/yearn/yearn-boosted-staker)
- [crvhub.com - Liquid Lockers Tracker](https://crvhub.com/wrappers)
- [yLockers Discord Channel](https://discord.com/channels/734804446353031319/1186417376275730552)

## yCRV Deployment Addresses

### Current Addresses

| Contract Name | Contract Address |
|---------------|-----------------|
| yCRV Boosted Staker | [0xE9A115b77A1057C918F997c32663FdcE24FB873f](https://etherscan.io/address/0xE9A115b77A1057C918F997c32663FdcE24FB873f#code) |
| Rewards Distributor | [0xB226c52EB411326CdB54824a88aBaFDAAfF16D3d](https://etherscan.io/address/0xB226c52EB411326CdB54824a88aBaFDAAfF16D3d#code) |
| Boosted Staker Utilities | [0x265c8D21A322B04804524b857089De2fEF619569](https://etherscan.io/address/0x265c8D21A322B04804524b857089De2fEF619569#code) |
| yvyCRV (Auto-Compounter Vault) | [0x27B5739e22ad9033bcBf192059122d163b60349D](https://etherscan.io/address/0x27B5739e22ad9033bcBf192059122d163b60349D#code) |
| yvcrvUSD (crvUSD Vault) | [0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F](https://etherscan.io/address/0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F#code) |
| lp-yCRV v2 (vault) | [0x6E9455D109202b426169F0d8f01A3332DAE160f3](https://etherscan.io/address/0x6E9455D109202b426169F0d8f01A3332DAE160f3#code) |
| CRV Token | [0xD533a949740bb3306d119CC777fa900bA034cd52](https://etherscan.io/address/0xD533a949740bb3306d119CC777fa900bA034cd52#code) |
| yCRV Token | [0xFCc5c47bE19d06BF83eB04298b026F81069ff65b](https://etherscan.io/address/0xFCc5c47bE19d06BF83eB04298b026F81069ff65b#code) |

### Expired/Deprecated Addresses

| Contract Name | Contract Address |
|---------------|-----------------|
| lp-yCRV v1 (DEPRECATED) | [0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e](https://etherscan.io/address/0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e#code) |
| old CRV/yCRV Curve Pool (DEPRECATED) | [0x453D92C7d4263201C69aACfaf589Ed14202d83a4](https://etherscan.io/address/0x453D92C7d4263201C69aACfaf589Ed14202d83a4#code) |
| ZapYCRV.vy | [0x01D7f32B6E463c96c00575fA97B8224326C6A6B9](https://etherscan.io/address/0x01D7f32B6E463c96c00575fA97B8224326C6A6B9#code) |
