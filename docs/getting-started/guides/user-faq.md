# Frequently Asked Questions and Troubleshooting

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

<details className="customFaqDetails">

  <summary>

## My Transaction isn't going through
  
  </summary>

If your transaction doesn't go through on the Yearn UI (stuck with a spinning loading circle), there are a few things you can do:

- Try using a different browser or wallet provider.
- If on mobile, try using the desktop version, and vice versa
- Change your wallet RPC for the network you are transacting on. This is the data endpoint that your wallet talks to to pull blockchain data.
  - Here website with lists of different chain RPCs: https://chainlist.org/
  - If you connect your wallet to the chainlist site then you can add new RPCs to your wallet directly from there.
- If none of the above work, you can interact with Yearn smart contracts via a block explorer. See the next entry for more information on how to do that.

</details>

<details className="customFaqDetails">

  <summary>

## Using a block explorer to interact with Yearn contracts
  
  </summary>

:::warning

Using a block explorer is advanced and if you have not used one before, we only recommend it to withdraw from a vault that you cannot access from the yearn.fi website, or in an emergency. Yearn, and its website, are in active developement, so issues with the website should be fixed quickly upon reporting them. For many issues it is better to wait for a website fix.

If you need help, come by the discord and [open a support ticket](https://discord.gg/q8fYnmnV).

:::

All of the smart contracts that you will interact with from Yearn's website live on Ethereum or one of its layer-2 networks. We have worked to make the experience of interacting with the contracts as easy as possible via the website, but sometimes something goes wrong and the website may not work. If that happens, you can interact with the underlying contracts directly with a block explorer like [Etherscan](https://etherscan.io/).

Each network has its own block explorer, and many have more than one. The most popular is Etherscan and most networks have a version of it for their users to use.

| Network Name | Etherscan URL |
|--------------|---------------|
| Ethereum Mainnet | https://etherscan.io/ |
| Polygon | https://polygonscan.com |
| Optimism | https://optimistic.etherscan.io |
| Base | https://basescan.org |
| Arbitrum | https://arbiscan.io/ |
| GnosisChain | https://gnosisscan.io/ |
| Fantom | https://ftmscan.com |

All of these sites should look and feel and work the same way.

### Finding the right Smart Contract

<br></br>

You can find the address of the smart contract that you want to interact with from the Yearn website. If is a 42-digit alphanumeric string. If you navigate to a vault page, the address is listed directly below the name. Click on the address to copy it to the clipboard.

![find address](/img/guides/FAQ/findSCAddress.png)

:::warning

You should confirm that your vault tokens are not staked. On the yearn website, make sure that they show up when trying to withdraw. If not they could be staked in a rewards contract. You can also withdraw from staking contracts on etherscan, but that is outside the scope of this article. So if this applies to you, come to the discord and [open a ticket]((https://discord.gg/q8fYnmnV)) and someone will be able to walk you through the process.

:::

Once you have it copied, go to etherscan.io (or its equivalent for other chains) and paste it into the search bar. Then hit enter and it will bring up a page with information about the contract.

### Interacting with the Contract

<br></br>

![paste address](/img/guides/FAQ/pasteAddress.png)

On the landing page, you can see recent transactions that have interacted with the contract.

To interact with the contract, you will need to click on the `Contract` button.

![contract button](/img/guides/FAQ/contractButton.png)

Once you click on the `Contract` button you will see 3 new tabs: `Code`, `Read Contract (as Proxy)`, and `Write Contract (as Proxy)`.

- The `Code` tab will show you the source code for the smart contract
- The `Read` tab allows you to query values on the contract like the contract name, user balances, etc.
- The `Write` tab allows you to perform transactions using the contract, like depositing and withdrawing.

![contract options](/img/guides/FAQ/contractOptions.png)

To confirm you are looking at the correct contract, click the `Read` tab and find the `name` function in the list and click on it. It should show the vault name (i.e. yvUSDC-1 yVault)

![contract name](/img/guides/FAQ/contractName.png)

### Withdrawing from a vault using Etherscan

<br></br>

1. Click on the `Read Contract as Proxy` button.

2. Click on the 🔴`Connect to Web3` button and connect the wallet you used to deposit.

![connect to web3](/img/guides/FAQ/connectToWeb3.png)

3. There are different steps depending on what version vault you are using, so lets check the version.

    - Find the apiVersion field and click on it.
    - If the number starts with 0 (i.e. 0.4.6) then it is a V2 vault.
    - If the number starts with 3 (i.e. 3.0.4) then it is a V3 vault.
    ![apiVersion](/img/guides/FAQ/apiVersion.png)

Once you know the vault type, go on to the next step.

If a V2 Vault:

1. Click on `Write Contract as Proxy`
2. Find the first `withdraw` function. This one should only have a button that says "Write" with no additional fields.
3. Click `Write` and submit the transaction in your wallet.
![withdraw](/img/guides/FAQ/withdrawV2.png)

Once the transaction is approved you will be fully withdrawn from the Vault.

If a V3 Vault:

1. Withdrawing from V3 vaults requires 3 arguments to withdraw: The amount, the owner, and the recipient.
2. Both the owner and the recipient will be your wallet address.
3. To get the amount, you need get your total balance by clicking on `balanceOf` and then entering your wallet address in the address field. Click query and you should get a long number that is your balance. copy this balance to the clipboard.
  ![balanceOf](/img/guides/FAQ/balanceOf.png)
4. Click on `Write Contract as Proxy`
5. find the first `redeem` function. It will have 3 fields for arguments. Enter the copied `balanceOf` value into the `shares` field, and your wallet address into both the `receiver` and `owner` fields.
6. Click `Write` and submit the transaction in your wallet.
  ![withdraw](/img/guides/FAQ/withdrawV2.png)

Once the transaction is approved you will be fully withdrawn from the Vault.

</details>

<details className="customFaqDetails">

  <summary>

## I have rSWELL tokens in a Yearn Vault but don't see them anywhere
  
  </summary>

If you are looking at a wallet or portfolio tracker like Debank, Zerion, or Zapper and it shows you have Swell tokens in a V3 yearn Vault, you need to go to the Swell website to withdraw them: https://app.swellnetwork.io/stake/rswell

The rSWELL vault was built on Yearn V3 contracts but was not deployed by yearn, so we don't show it on our website, but they will!

</details>

<details className="customFaqDetails">

  <summary>

## I see I have a DSProxy but don't know what that is
  
  </summary>

A DSProxy is a "smart account" similar to a gnosis safe that was used by projects like DefiSaver, instaDapp, Balancer, and others. You most likely have a wallet that controls it.

You may be able to access and operate your DSProxy using the [defisaver](https://app.defisaver.com/) website.

</details>
