# yPRISMA Interface Guide

## Quick Start

1. On the landing page, click "Launch App" to enter the yPRISMA app.
2. Click "Connect Wallet" (top right) to connect to your preferred wallet.
3. When you see your wallet address, instead of "Connect Wallet", you're connected!

## Stake yPRISMA

You'll begin on the "EARN mkUSD" tab, which is the home for yPRISMA staking.

![image](/img/guides/yPRISMA/screen-1.png)

Inside this tab, you can perform the following actions:

1. Stake
2. Unstake
3. Claim Rewards
4. Get yPRISMA

There's also a helpful data panel on the right-hand side with the following information:

* **Max Staking APR:** The current APR for stakers with the maximum 2.5x boost
* **Your Boost:** The average boost of all your staked yPRISMA - it will be somewhere between the minimum (0.5x) and the maximum (2.5x)
* **Staked Amount:** The total amount of yPRISMA you have in the Yearn Boosted Staker
* **Your APR:** The current APR you are receiving based on your boost
* **Claimable Rewards:** The current $ value of your mkUSD rewards available to claim
* **Total Staked:** The total amount of yPRISMA staked in the Yearn Boosted Staker
* **Min/Max APR:** The current minimum APR (based on 0.5x boost) and maximum APR (based on 2.5x boost)
* **Total Rewards Last Week:** The total $ value of mkUSD rewards shared between Yearn Boosted Staker users last week

### 1. Stake

First, you'll need some yPRISMA. You can mint or buy yPRISMA with PRISMA via the zapper on the "Get yPRISMA" tab. Alternatively, yPRISMA can be purchased directly through the following platforms:

* [Curve Finance](https://curve.finance/#/ethereum/swap?from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0xe3668873d944e4a949da05fc8bde419eff543882) - The primary liquidity source for yPRISMA
* [CowSwap](https://swap.cow.fi/#/1/swap/ETH/YPRISMA) - DEX aggregators like CowSwap should also work well

![image](/img/guides/yPRISMA/stake-1.png)

You'll need to approve the Yearn Boosted Staker contract and then you can stake your yPRISMA. Once staked, the data panel on the right-hand side will update to display your new boost multiplier, staked amount, and APR.

![image](/img/guides/yPRISMA/data-panel-1.png)

### 2. Unstake

You're free to unstake your yPRISMA at any time with no lock-ups or penalties.

![image](/img/guides/yPRISMA/unstake-1.png)

The total amount of yPRISMA you have staked will appear below the unstaking field. To unstake your full balance, simply click the max button which will auto-fill the amount. Then click "Unstake" to receive your yPRISMA tokens back to your wallet.

Again, the data panel on the right will update following your unstaking. A max unstake will reset your boost, staked amount and APR to zero. A partial unstake may increase your boost and APR as the least-weighted amounts are unstaked first.

### 3. Claim Rewards

You can view the $ value of your claimable rewards in this tab, as well as the amount in yvmkUSD-A vault tokens.

![image](/img/guides/yPRISMA/claim-1.png)

As the vault earns yield, the price of your vault tokens will increase as there is more underlying mkUSD in the vault for you to redeem upon withdrawal. For example, 100 yvmkUSD-A could represent 150 mkUSD (~$150.00), dependent on the total cumulative earnings of the vault.

Your mkUSD rewards accrue week over week and are never lost if unclaimed. To claim them to your wallet, all you need to do is click "Claim All" and confirm the transaction .

### 4. Get yPRISMA

Here you'll find an interface for Yearn's yPRISMA zapper contract. You'll need to have PRISMA tokens in your wallet in order to use it.

![image](/img/guides/yPRISMA/zap-1.png)

Using the zapper is as simple as clicking "Mint". Your PRISMA will then either be locked with Yearn (minting you new yPRISMA at a 1:1 ratio) or swapped for yPRISMA via the Curve pool (if this would output more yPRISMA).

## Auto-Compound yPRISMA

Clicking the "EARN yPRISMA" tab switches you to our auto-compounding yPRISMA V3 vault.

![image](/img/guides/yPRISMA/auto-comp-screen-1.png)

Inside this tab, you can perform the following actions

1. Deposit
2. Withdraw

There's also a helpful data panel on the right-hand side with the following information:

* **Estimated Vault APY:** The "live" APY of the vault, after fees, and with the compounding of returns taken into consideration
* **Deposited Amount:** The $ value of your yPRISMA deposited in the vault
* **Earned:** The $ value of yPRISMA you have earned whilst in the vault
* **Total Deposits:** The total amount of yPRISMA deposited in the vault by all users
* **TVL:** The $ value of all yPRISMA deposited in the vault

### 1. Deposit

You'll need to approve the vault contract to allow it to access your yPRISMA and then you can go ahead and deposit your yPRISMA.

![image](/img/guides/yPRISMA/auto-comp-deposit-1.png)

And that's it. There's nothing more for you to do.

You'll receive "yvyPRISMA" vault tokens to your wallet, which are like a deposit receipt. They represent your share of the yPRISMA yVault. As the vault earns yield, the price of your vault tokens will increase as there is more underlying yPRISMA in the vault for you to redeem upon withdrawal.

### 2. Withdraw

You can make a withdrawal from the vault at any time.

![image](/img/guides/yPRISMA/auto-comp-withdraw.png)

The total amount of yvyPRISMA vault tokens you have in your wallet will appear below the withdraw field. To withdraw your full balance, simply click the max button which will auto-fill the amount. Then click "Withdraw" to receive yPRISMA tokens back to your wallet.

## Prisma Vaults

At the bottom of the Earn page, you'll find a list of Yearn's Prisma-based auto-compounding vaults.

![image](/img/guides/yPRISMA/vaults-list.png)

Clicking on a vault will open up the vault detail page in a new tab. Here you can make deposits and withdrawals, as well as finding more data on the vault and strategies themselves.

![image](/img/guides/yPRISMA/vault-factory.png)

:::info

You can find more information on Yearn's vaults [**here**](/getting-started/products/yvaults/overview).

:::
