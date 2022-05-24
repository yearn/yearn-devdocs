# How to understand vault APYs

It is a standard on Defi Space to estimate returns through [APY](https://www.investopedia.com/terms/a/apy.asp) and [APR](https://www.investopedia.com/terms/a/apr.asp), and Yearn also does so. However, different calculations depend on the yVault underlying asset: one for [Curve.Finance](https://curve.fi/) LP Tokens and another for non-curve assets. For a simpler version, check [our APYs Medium Article](https://medium.com/iearn/how-yearn-calculates-estimated-returns-apy-b4fd5b687bf9) or the infographic at the end of the page. The following sections will show how each is calculated:

## Non-curve assets

The estimated returns are displayed on yearn.finance this way:

![image](https://lh3.googleusercontent.com/z2zbme8yXIquVgZjFqSFyz5RmRmxBX2-LEjBvCjSSdBeBYUC9HnfWrnJD5KDYjw4O_Do9wc8lVis0z01rG8HD8YLdvuQ3N9Yzy3hFArQ5DV5I76jgrPPCtUdKDF86933YRARcUOfoXOYPStetw)

Where the definition of each one is:

- **Gross APR**: Vault total APR before deducted fees

- **Net APY**: Vault considered APY. If the network is ETH mainnet, this will show the Monthly APY, as the harvests are not that frequent. On the other hand, if the network is Fantom, then the Weekly API is chosen, as the harvests are more frequent.

- **Weekly APY**: Calculated considering the yVault price share difference in the last seven days

- **Monthly APY**: Calculated considering the yVault price share difference in the last 30 days

- **Inception APY**: Calculated considering the yVault price share difference since inception

The actual code can be found [on this repo](https://github.com/yearn/yearn-exporter/tree/master/yearn/apy)

![image](https://lh6.googleusercontent.com/1ubZF6PCD7BAd7lXM6sGHmTXmgAdzs-IjLkPN-mtsPgpnvXWZS7E4RPznBrmpXIKOaV7JAP_iZlpih0avNvTKYMU9xeuWQ8GLhcj4QmcB00v6wXXveVPHTq_O81TumVXDiykOqcpovW4YZNvEQ)

Where the file that contains the calculation for the most recent version of the yVaults [is this one](https://github.com/yearn/yearn-exporter/blob/master/yearn/apy/v2.py)

## Curve assets

The estimated returns are displayed on yearn.finance this way:

![image](https://lh3.googleusercontent.com/dvUnhactHIG6KEFHTpw77axZfgEldRjsmYd-qv5sYbx1_wp_A_Pjy_0f-ZzmFa-GxqkLjcjUZqhSfOtmA9ajqbPf_L7urk0SiQmRLXNQSYZ3mHhp_bMZTJKcK0_z9tsRZHsaZ4n_6nbEaISMtA)

Where the definition of each one is:

- **Pool APY**: APY is calculated considering the change in the “virtual price” of the curve.finance LP token in the last seven days.

- **Bonus Rewards APR**: Rewards are usually given by the token owner. IE frax curve pools also offer frax as a reward. The APY if the token were sold at the current price.

- **Base CRV APR**:The APR from the CRV emissions this curve pool gets.

- **Boost**: Multiplier from staked veCRV, ranging from 1x to 2.5x

- **Convex APR**: APR when the yVault strategy is depositing the curve.finance LP tokens into Convex Finance](https://www.convexfinance.com/)

- **Gross APR**: Vault total APR before deducted fees

- **Net APY**: Vault current APY, after deducting the fees

The actual code can be found [on this repo](https://github.com/yearn/yearn-exporter/tree/master/yearn/apy/curve)

![image](https://lh5.googleusercontent.com/0RcgjElU5oJ1831Ku1yyiwCuSDjjujo3SZjVhVdD8Ve596nB7Hedv9UHUIf_VwkLomCaO0XULTaghTKDLYJ1Uba_kcivY78s2tAA18iwnTi1k__LXqZVOqWKzI2Hj2a5zgte0DaYusDTaNOZ8w)

Where the file that contains the calculation for the most recent version of the yVaults [is this one](https://github.com/yearn/yearn-exporter/blob/master/yearn/apy/curve/simple.py)

### Notes

- When the active strategy of a yVault uses Convex Finance, and the streaming of the rewards is frozen at Convex, Yearn.finance Net APY will show 0% until the streaming is resumed.

![image](https://lh6.googleusercontent.com/I6W8YaKtwC2ah5-GI4xQf-AYva9yWRHqwtSo2PisQxgB7le9bArAl-BTcLxT2ydzwlUyAWyLGOjJWhikQ94lY7sDuDwZsYtY5QdSbjqMo6NhDOqcCTxMzL4ZMIVRRtAIvNraP7SUVNrngcvzHA)

> More details about rewards streaming on [Convex Finance](https://docs.convexfinance.com/)

- When there is a spike of transactions in a pool, the “Pool APY” will reflect it for a week, as the fees will be added to the “virtual price” of this pool, and the calculation takes the last seven days into account.

## Infographic

![image](https://lh3.googleusercontent.com/6QQUXbH-VMxN_FyUg612RX3_mfrumrueyyBpAE8SKOzm-JQP6t6wYa4IBBIJgBY0D-oxaS-SyZj9IEP9HyqYm45ovM6k_1gZrS0Yqpkm_-l0OUqvaFyl8LILf-CtZEZJLiUH_72v9ysLGvvrog)

