# FAQ

---

## Products

### yVaults

#### What is a Vault?

- [yVaults](https://docs.yearn.finance/getting-started/products/yvaults/overview#what-are-yvaults)

#### How is vault growth calculated?

- [Vault Returns](https://docs.yearn.finance/getting-started/guides/how-to-understand-yvault-roi#roi-calculation)

#### How can I deposit?

- [yVaults](https://docs.yearn.finance/getting-started/using-yearn)

#### What are the implications of depositing or withdrawing with an asset that isn't native to the vault?

- You can potentially [lose value](https://docs.yearn.finance/getting-started/using-yearn#if-you-dont-have-the-required-token-for-the-vault-that-you-would-like-to-deposit-in) to slippage.

#### Can I deposit any token into any vault?

- [Zap](https://docs.yearn.finance/getting-started/products/yvaults/overview#zap-in-with-any-asset)

#### Where can I go to see how my deposit is performing?

- [Tools to track your funds](https://docs.yearn.finance/getting-started/using-yearn#tools-to-track-your-funds)

#### When do I realize profits from a vault?

- Your profits [are compounded](https://docs.yearn.finance/getting-started/using-yearn#tools-to-track-your-funds) into the vault token overtime, which can be withdrawn for your principal plus profit.

#### How is vault growth calculated?

- [Vault Returns](https://docs.yearn.finance/getting-started/guides/how-to-understand-yvault-roi#roi-calculation)

#### How can I migrate vaults?

- When it is announced that you need to migrate vaults, there will be a popup on the user interface that gives you the option of withdrawing or migrating your funds.

#### What is the fee structure?

- [Detailed description of fees](https://docs.yearn.finance/getting-started/products/yvaults/overview#yvault-fee-structure)

#### Why is gas so expensive?

- Gas prices fluctuate and can be monitored with tools like [Etherscan](https://ethereumprice.org/gas/), [Blocknative's Gas Estimator](https://www.blocknative.com/gas-estimator), or [Tx Price](https://txprice.com/).

#### What is yveCRV?

- [How to understand yveCRV](https://docs.yearn.finance/getting-started/guides/how-to-understand-yvecrv)

### Vault Strategies

#### What is a Vault Strategy?

- [Strategies](https://docs.yearn.finance/getting-started/products/yvaults/vaults-and-strategies)

#### Where can I find strategy descriptions?

- [Yearn State of the Vaults](https://vaults.yearn.finance/)

#### Where can I find current strategy contracts?

- [yearn.watch](https://yearn.watch/)

#### Does anyone monitor strategy performance?

- [Strategists and Guardians](https://docs.yearn.finance/getting-started/products/yvaults/vaults-and-strategies)

#### What is the process for getting my strategy onto Yearn?

- [Protocol Contributors](https://docs.yearn.finance/contributing/contribute)

#### My strategy hasn't been harvested in a while. Is that normal?

- Strategies don't have a set time period in which they harvest. Even if your strategy has created profit, harvest timing is still optimized with fees taken into account.

#### How do I check which strategy my funds are in?

- On [yearn.watch](https://yearn.watch), find your vault and click on the name. Click on the 'Allocation' tab to see what strategies are being utilized by the vaults. The debt percent allocation reflects the percent of vault funds allocated to each strategy.

### Earn

#### What's the difference between depositing in Earn and yVaults?

- [Earn](https://docs.yearn.finance/getting-started/products/earn)

## Governance

#### Who is on the multisig?

- [Yearn's Multisig](https://gov.yearn.finance/t/yip-62-change-two-multisig-signers/10758/)

#### What is a YIP?

- [Yearn Improvement Proposals](https://docs.yearn.finance/contributing/governance/proposal-process)

#### How do I vote?

- [Voting Details](https://docs.yearn.finance/contributing/governance/proposal-process#voting)

## Security

#### Is it safe to invest money in Yearn?

- Please do your own research and decide for yourself.

#### Is Yearn audited?

- [Security Audit Repository](https://github.com/yearn/yearn-security/tree/master/audits)

#### Where should I report a bug?

- [File a bug](https://docs.yearn.finance/contributing/contribute#file-a-bug) — create a new issue in the relevant repository.

## Support

#### I deposited into a vault, but the vault token isn't showing in my wallet? How do I make it appear?

- On the [yearn.finance](https://yearn.finance) user interface, click the name of the vault that you deposited in. This will take you to to the Etherscan page for the vault. Click on the "Tracker" link in the "More Info" box to find the vault token page. Copy the address from there and follow your wallet's instructions on [adding a custom token](https://docs.yearn.finance/getting-started/guides/how-to-add-a-custom-token-to-metamask)
- Alternatively, most vault tokens are supported on [Zapper.fi](https://zapper.fi) shortly after their release.

#### I'm getting an error that says "SafeERC20: low-level call failed". How do I resolve this?

- This most often occurs when submitting a duplicate transaction. If you want to deposit $100 into a vault, you can submit that deposit as many times you want until one of those transactions is executed. Afterwards, the rest will show this error because you no longer have that $100 in your wallet.

#### I'm getting an error that says "ALERT: Transaction Error. Exception thrown in contract code." What does that mean?

- There may be a bug in the contract that you are interacting with. bring this up with the team of [Discord](https://discord.gg/yearn).

#### I paid gas for a deposit, but it didn't go through, why is that?

- You pay gas even if a transaction fails. This can happen if the price of gas increased shortly after the transaction was submitted

#### I'm having issues with yearn.fi

- This website is one of many front-ends maintained by separate groups of developers. Consider getting in touch with the yearn.fi development team via their website or through social media channels.

**If you have any other questions about using the protocol, it's best to ask in either [Discord](https://discord.gg/yearn) or [Telegram](https://t.me/yearnfinance)**

## Careers and contributors

#### Does yearn hire or pay contributors?

- [Contributors](https://docs.yearn.finance/contributing/contribute#how-to-contribute)

## Related Projects

- [Curve Finance](https://curve.fi)
- [CREAM Finance](https://cream.finance)
- [SushiSwap](https://www.sushi.com)
- [Akropolis](https://www.akropolis.io)
- [Pickle Finance](https://www.pickle.finance)
- [Keep3r](https://thekeep3r.network/)

## Resources

#### Where can I learn more about Yearn?

- [Informational Resources](https://docs.yearn.finance/resources/links/#learn)

#### Lists of yVaults deployed

- Use the [Registry](https://docs.yearn.finance/vaults/smart-contracts/registry)

#### Statistics

- [Yearn Statistics Links](https://docs.yearn.finance/resources/links/#statistics)

#### Latest Yearn News and Blog Posts

- [Yearn News Links](https://docs.yearn.finance/resources/links/#updates)

#### Media Resources

- Can be found in the Discord under [\#media-resources](https://discord.gg/pp3JKTVwtF)
