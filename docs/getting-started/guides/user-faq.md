# Frequently Asked Questions

<details className="customFaqDetails">

  <summary>

## I don't see my deposit, where is it?
  
  </summary>

If you deposited into a Yearn Vault and then click the "withdraw" tab and don't see your tokens, don't worry, they are probably staked!

The default "deposit" action in yVaults with a gauge or other extra rewards is to deposit your tokens in the yVault and stake the yVault token for extra rewards. To see your yVault tokens, click on the "veYFI BOOST" tab (it may be named something else like "staking BOOST") next to the withdraw tab. You should be able to un-stake your vault tokens there and then withdraw.

![Withdraw modal](/img/guides/FAQ/unstake.png)

### Update your default deposit settings

If you want to change the default deposit behavior to only deposit and not also stake the vault tokens, you can change that setting by clicking on the gear icon to the right of the tabs and unchecking "stake automatically" at the bottom of the menu that opens up.

![deposit setting](/img/guides/FAQ/deposit-setting.png)

</details>

<details className="customFaqDetails">

  <summary>

## My veYFI rewards are lower than expected, Why?
  
  </summary>

veYFI rewards are variable depending on how much veYFI your wallet holds. If you don't have veYFI, you will only get 10% of the maximum reward amount shown. In the image below, note the range of rewards APY. Without any veYFI, a deposit will earn a 1.16% boost, paid in dYFI.

![apy-range](/img/guides/FAQ/boostAPY.png)

If you don't have veYFI, you can deposit and stake your tokens using liquid lockers. By doing this you use the liquid locker's veYFI to boost your deposit.

Read more about veYFI, boosts, dYFI and liquid lockers on the [veYFI page](/contributing/governance/veYFI-intro)

And remember, you have to consider transaction costs when using Yearn. If using Ethereum mainnet, prices for transactions vary from a few dollars to tens or hundreds of dollars, depending on chain congestion (Yearn has no control over this). If you are depositing lower amounts (\<$500-1000), you may want to consider using Yearn on an L2 so fees don't negate your interest earned.

</details>
