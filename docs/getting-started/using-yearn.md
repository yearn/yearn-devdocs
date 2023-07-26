# Using Yearn

Thanks to a feature called 'zap', it's extremely easy to deposit into any vault with almost any token.

Here's how it works:

First, **Connect your wallet** using the button at the top right corner. Multiple types of wallets are supported, but most people use [MetaMask](https://metamask.io/), which can be downloaded for free as a Chrome extension or through the Apple and Android app stores. Make sure that your wallet is connected to the Ethereum network.

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/3b537d18-bbfe-449a-8d6d-d6b53c44e056)

## Yearn is multi-chain

Our products are currently on Ethereum, Fantom, Arbitrum, and Optimism with more to come.

Click on this button to select the network you would like to interact with:

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/5a2d63ad-6a67-4622-b8d7-c44021efdfb5)

## If you **already have the required token** for the vault that you would like to deposit in:

1. Select the vault that you would like to deposit into.
2. Enter the amount of tokens you want to deposit into the vault. If you are depositing ETH, make sure you have enough ETH left over to pay for future transactions that you might need to make.

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/b829c7f3-078c-4674-be24-3763443a4299)

3. Click 'Approve' or 'Deposit' button, depending on if you have previously approved
4. Your wallet will ask you to confirm the transaction. This will take about 3 minutes, but you can speed it up by [paying a higher gas fee to the network](https://blog.leverj.io/how-to-set-the-gas-limit-and-gas-price-in-metamask-1b33c38c32fd). If your transaction gets stuck, see [this guide](https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction) on speeding up or cancelling the transaction.

<p align="center">
  <img width="258.75" height=" 459.75" src="https://i.imgur.com/qjryeGD.png" className="topRightImg"/>
</p>

6. When your transaction succeeds, you will see your deposited balance in the vault's interface, which should appear at the top of the vault list.

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/5b2c2308-0384-4446-ab12-2fc23d8cc829)

When you're ready to withdraw:

1. Select the vault that you would like to withdraw from. Click the "Withdraw" tab

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/935b97f8-b740-432a-bd89-543ff0cce484)

2. Enter the amount you want to withdraw, or click 'Max' to withdraw the entire balance.
3. Click 'Withdraw'
4. Your wallet will ask you to confirm the transaction. See step 4 above for more details.
5. When your transaction succeeds, the tokens will show up in your wallet again

## If you **don't have the required token** for the vault that you would like to deposit in:

Yearn provides a zapping feature so you can deposit from any token into any vault:

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/63cb991c-71de-4840-8bf2-38084e7ab907)

The Zap provider can be set on the same page:

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/87d20e40-2792-4790-a3f9-d7cb0d6ed961)

Zapping also works on withdrawal, so you can receive any desired token:

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/0a6e66de-222a-471c-9003-071bdf87e042)

### Slippage Tolerance

You can change slippage settings in the UI right next to the deposit/withdraw button:

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/447f443e-d664-4a9c-bfdd-341335ea0dc5)

### Themes
View Yearn.Finance with community-created themes or [create a custom theme](https://github.com/yearn/yearn-finance-v3/tree/develop/src/client/themes) to suit your style.

## Tools to track your funds

If you would like to see how your USD balance changes while your assets are in a vault, connect your wallet to [zapper.fi](https://zapper.fi) or a similar portfolio tracking product. This is also the easiest way to tell how much profit the vault has made for you.

Your balance WILL NOT increase continuously. Profit will be distributed to your share of the vault when the harvest() function is called, which happens on a fluctuating basis.

Community resources to monitor your returns:

- [Zapper](https://zapper.fi/)
- [Zerion](https://app.zerion.io/)
