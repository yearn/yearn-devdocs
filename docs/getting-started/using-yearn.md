# Using Yearn

Thanks to a feature called 'zap', depositing into any vault with almost any token is effortless.

Here's how it works:

First, **Connect your wallet** using the button at the top right corner. Multiple wallets are supported, but most people use [MetaMask](https://metamask.io/), which can be downloaded for free as a Chrome extension or through the Apple and Android app stores. Make sure that your wallet is connected to the Ethereum network.

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/33f03d9c-76fc-4433-9e16-c3c573484596)

## Yearn is multi-chain

Our V3 vaults are currently on Ethereum, Arbitrum, and Polygon with more to come.

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/d5d9731e-360a-47cf-ae21-664e0489d3c5)

Click on this button to select the network you would like to interact with:

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/0f8aa890-5383-4ef0-9569-b764c4474894)

## If you **already have the required token** for the vault that you would like to deposit in:

1. Select the vault that you would like to deposit into.
2. Enter the amount of tokens you want to deposit into the vault. If you are depositing ETH, ensure you have enough ETH left over to pay for future transactions you might need to make.

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/b5ff55a0-5b26-4c44-b149-d73c10906198)

3. Click the 'Approve' or 'Deposit' button, depending on if you have previously approved.

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/33e59b67-3bb6-41ae-882e-df4dadc67754)
   
4. Your wallet will ask you to confirm the transaction. This will take about 3 minutes, but you can speed it up by [paying a higher gas fee to the network](https://blog.leverj.io/how-to-set-the-gas-limit-and-gas-price-in-metamask-1b33c38c32fd). If your transaction gets stuck, see [this guide](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/) on how to speed up or cancel the transaction.

<p align="center">
  <img width="258.75" height=" 459.75" src="https://i.imgur.com/qjryeGD.png" className="topRightImg"/>
</p>

5. When your transaction succeeds, you will see your deposited balance in the vault's interface, which should appear at the top of the vault list.

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/29708ae3-96be-482f-ba8b-b902ea9016fa)

When you're ready to withdraw:

1. Select the vault that you would like to withdraw from. Click the "Withdraw" tab.

![image](https://github.com/yearn/yearn-devdocs/assets/167110386/dc1d7ebf-3f4f-47b8-9435-c74a0641ecd1)

2. Enter the amount you want to withdraw, or click 'Max' to withdraw the entire balance.
3. Click 'Withdraw'
4. Your wallet will ask you to confirm the transaction. See step 4 above for more details.
5. When your transaction succeeds, the tokens will show up in your wallet again.

## Tools to track your funds

If you would like to see how your USD balance changes while your assets are in a vault, connect your wallet to [Zapper.xyz](https://zapper.xyz) or a similar portfolio-tracking product. This is also the easiest way to tell how much profit the vault has made for you.

Your balance WILL NOT increase continuously. Profit will be distributed to your share of the vault when the harvest() function is called, which happens on a fluctuating basis.

Community resources to monitor your returns:

- [Zapper](https://zapper.xyz/)
- [Zerion](https://app.zerion.io/)
- [DeBank](https://debank.com/)
 
