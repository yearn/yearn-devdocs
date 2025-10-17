# Understanding The Risks

:::info

The Yearn smart contracts, interfaces, and products are offered as is. Yearn contributors and YFI token holders provide no guarantee of safety of funds in ANY vault or strategy built on top of the core contracts and will not compensate users for any critical failure or loss of funds resulting from usage of the system.

:::

Hello anon. You've made it this far and now it's time to have a little chat about risk. Understanding risk is the most important element in not getting Rekt. If you are new to cryptocurrency, hopefully this page will help you better understand the space and how things can go wrong. And if you are a grizzled degen, well... a refresher never hurts.

If you are investing money (even imaginary internet money) then it is important to understand what could go wrong. We aren't going to talk about personal security or how to secure private keys, but instead talk about how you can lose money even if you do everything right, and how Yearn tries to mitigate these risks. The later pages in this section go into the specifics, but we will start broad.

## Making Money Requires Risk

To "beat the market" you must take some risk. This is why the term *risk-free rate* exists. A risk-free rate is the safest return you can get on your capital, and even so the term is a misnomer. It is just the consensus lowest risk investment that you can find. Any time you see a juicy yield there is some risk! This may be price risk, smart contract risk, liquidation risk, etc. Yearn is built to minimize that risk and maximize convenience and returns. But *minimize* and *eliminate* are not the same thing. So let's explore these risks.

## Rug Risk

This is the risk that you get scammed and the money you invested is stolen or re-appropriated. Think FTX. This is where Yearn (and DeFi) really shines. Yearn Vaults are built in a way such that only you have access to the funds you deployed in a vault. The vaults collect yield and re-deposit it permissionlessly. The [Yearn Multisig](https://docs.yearn.fi/developers/security/multisig) does have the power to pause or withdraw funds from strategies to protect depositors, but cannot be removed. When you deposit, you get shares of the vault that you can always use to get a proportional amount of vault assets back. Yearn or its contributors have no ability to mint new shares other than by depositing their own funds. Yearn operates not on a principle of "don't be evil", but of "can't be evil".

## Bug Risk

Eliminating rug risk doesn't remove the risk that something, somewhere isn’t implemented right and leads to an exploit. Yearn takes security very seriously and strives to be as safe as possible with audits and best practices. Yearn is seen as a leader in security practices and the auditing firm yAUDIT spun out of Yearn. But even if all of Yearn's vaults are totally safe, they are only as safe as the strategies and protocols that they deposit into.

## Yield Stack Risk

Yearn Vaults are a tool to optimize yield and auto-compound it, so they inherit the risk of the underlying protocols they earn yield from. On top of creating safe smart contract code, Yearn contributors work to evaluate the risks of the different protocols and strategies used in vaults. You can explore Yearn's risk scores and how different vaults rate at https://seafood.yearn.watch/risk. Strategies are chosen and approved based on available information, and that information isn't always complete. Sometimes shit happens. A freak event may cause a stablecoin to depeg. A protocol may have an incredible and safe codebase, but due to a physical security or process breach, suffer an exploit.

Yearn has developed, and continually works on improving, monitoring and risk analysis tools to prevent any losses.

## The Bottom Line

Yearn is a tool that makes earning yield on your assets easy. It has risks but, for the most part, those are the same risks you would take on if you did the same farming on your own. By depositing in Yearn vaults, you are relying on the creator of the strategies/vaults to manage that risk and provide that service to you. Any losses or gains within a vault are socialized across all depositors in that vault. The strategists and contributors at Yearn use the vaults too and so we have every incentive to make them as safe and profitable as possible.

In the end, you have to make this decision yourself. No one can decide for you whether something is safe enough. The next pages in this section may be useful in better understanding these risks and making the best decision for you.
