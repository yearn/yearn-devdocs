# yYB Interface Guide

## Quick Start

1. On the landing page, click "Launch App" to enter the yYB app.
2. Click "Connect Wallet" (top right) to connect to your preferred wallet.
3. When you see your wallet address instead of "Connect Wallet", you're connected!

## Stake yYB

You'll begin on the "EARN crvUSD" tab, which is the home for yYB staking.

![image](/img/guides/yYB/yyb-landing.png)

Inside this tab, you can perform the following actions:

1. Stake
2. Unstake
3. Claim Rewards
4. Get yYB

There's also a "Learn More" tab to the right of those 4 options and a helpful data panel on the right-hand side with the following information:

* **Max Staking APR:** The current APR for stakers with the maximum 2.5x boost
* **Your Boost:** The average boost of all your staked yYB - it will be somewhere between the minimum (0.5x) and the maximum (2.5x)
* **Staked Amount:** The total amount of yYB you have in the Yearn Boosted Staker
* **Your APR:** The current APR you are receiving based on your boost
* **Claimable Rewards:** The current $ value of your crvUSD rewards available to claim
* **Total Staked:** The total amount of yYB staked in the Yearn Boosted Staker
* **Min/Max APR:** The current minimum APR (based on 0.5x boost) and maximum APR (based on 2.5x boost)
* **Total Rewards Last Week:** The total $ value of crvUSD rewards shared between Yearn Boosted Staker users last week

### 1. Stake

First, you'll need some yYB. You can mint or buy yYB with YB via the zapper on the [Get yYB](#4-get-yyb) tab.

![image](/img/guides/yYB/yyb-stake.png)

You'll need to approve the Yearn Boosted Staker contract and then you can stake your yYB. Once staked, the data panel on the right-hand side will update to display your new boost multiplier, staked amount, and APR.

![image](/img/guides/yYB/yyb-info-panel.png)

### 2. Unstake

You're free to unstake your yYB at any time with no lock-ups or penalties.

![image](/img/guides/yYB/yyb-unstake.png)

The total amount of yYB you have staked will appear below the unstaking field. To unstake your full balance, simply click the max button which will auto-fill the amount. Then click "Unstake" to receive your yYB tokens back to your wallet.

Again, the data panel on the right will update following your unstaking. A max unstake will reset your boost, staked amount and APR to zero. A partial unstake may increase your boost and APR as the least-weighted amounts are unstaked first.

### 3. Claim Rewards

You can view the $ value of your claimable rewards in this tab, as well as the amount in yvcrvUSD-2 vault tokens.

![image](/img/guides/yYB/yyb-claim.png)

As the vault earns yield, the price of your vault tokens will increase as there is more underlying crvUSD in the vault for you to redeem upon withdrawal. For example, 100 yvcrvUSD-2 could represent 150 crvUSD (~$150.00), dependent on the total cumulative earnings of the vault.

Your crvUSD rewards accrue week over week and are never lost if unclaimed. To claim them to your wallet, all you need to do is click "Claim All" and confirm the transaction .

### 4. Get yYB

Here you'll find an interface for Yearn's yYB zapper contract. You'll need to have YB tokens in your wallet in order to use it.

![image](/img/guides/yYB/yyb-get-yyb.png)

Using the zapper is as simple as clicking "Mint". Your CRV will then either be locked with Yearn (minting you new yYB at a 1:1 ratio) or swapped for yYB via the Curve pool (if this would output more yYB).

## Auto-Compound yYB

Clicking the "EARN yYB" tab switches you to our auto-compounding yYB V3 vault.

![image](/img/guides/yYB/yvyyb-landing.png)

Inside this tab, you can perform the following actions

1. Deposit
2. Withdraw

There's also a helpful data panel on the right-hand side with the following information:

* **Estimated Vault APY:** The "live" APY of the vault, after fees, and with the compounding of returns taken into consideration
* **Deposited Amount:** The $ value of your yYB deposited in the vault
* **Earned:** The $ value of yYB you have earned whilst in the vault
* **Total Deposits:** The total amount of yYB deposited in the vault by all users
* **TVL:** The $ value of all yYB deposited in the vault

### 1. Deposit

You'll need to approve the vault contract to allow it to access your yYB and then you can go ahead and deposit your yYB.

![image](/img/guides/yYB/yvyyb-deposit.png)

And that's it. There's nothing more for you to do.

You'll receive "yvyYB" vault tokens to your wallet, which are like a deposit receipt. They represent your share of the yYB yVault. As the vault earns yield, the price of your vault tokens will increase as there is more underlying yYB in the vault for you to redeem upon withdrawal.

⚠️Note: you can also buy yvyYB directly on your favorite dex aggregator like Cowswap

### 2. Withdraw

You can make a withdrawal from the vault at any time.

![image](/img/guides/yYB/yvyyb-withdraw.png)

The total amount of yvyYB vault tokens you have in your wallet will appear below the withdraw field. To withdraw your full balance, simply click the max button which will auto-fill the amount. Then click "Withdraw" to receive yYB tokens back to your wallet.
