---
title: "YIP-75: Launch V3"
hide_title: true
sidebar_position: -75
---

# YIP-75: Launch V3

| Metadata | Details |
| --- | --- |
| YIP | 75 |
| Outcome | **Passed** |
| Authors | V3 Protocol Team, V3 Secret Admirers Group |
| Created | 2023-08-15 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-75-launch-v3/13591) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xdb02fe93b77c6addfa9b197bb47f5b6d7779f69000210cffe54ea1fb35b91eec) |
| Vote result | For: 193.61; Against: 38.34 |
| Source | [Source](https://gov.yearn.fi/t/yip-75-launch-v3/13591) |

# YIP-XX: Launch V3

## Authors

V3 Protocol Team & V3 “Secret Admirers” Group

## Summary

Launch the full V3 system - making the latest generation of yield generating vaults and strategies permissionlessly deployable by anyone.

## Abstract

If adopted, this proposal seeks to:

-   Ratify the Design Specification of V3 and endorse its deployment.
-   Specify parameters and initial configurations.
-   Specify the bootstrapping and implementation process.
-   Accept Governance roles.

## Background

From the outset, the core goal of V3 development has been to be _a significant upgrade to V2_. The end state of V3 should be a fully decentralized protocol that provides the most secure and trusted infrastructure for on-chain capital allocation.

To achieve this Yearn contributors outlined four key requirements for V3 to fulfill:

-   Further decentralization at launch and enable progressive decentralization over time.
-   Simplify strategy writing.
-   Better than Yearn’s V1 single vault/strategy offering.
-   Better than Yearn’s V2 managed vaults.

#### **Vision**:

Yearn V3 attempts to commoditize what Yearn Vaults V2 does. Management and strategy writing becomes easy for anybody to do. Effectively creating an open marketplace of V3 Vaults and strategies that can be operated by any third party, individual or entity without any involvement from Yearn contributors. Our goal is to provide the base infrastructure that all on chain capital allocators use.

The open design of Yearn V3 creates little reason to launch a full fork. Instead encouraging others to build on top of the Yearn stack. We envision the next generation of yield aggregators will be strategists and vault managers in the Yearn marketplace. Integrating their own tokens and using their marketing, risk management, and developer expertise to attract capital.

The high standards Yearn puts on its own vaults has long been the main growth constraint for the protocol. V3 takes these brakes off. Now anyone both within Yearn and outside can build, deploy and manage their own vaults and strategies with any risk profile they desire. While Yearn contributors may certainly choose to continue running V3 versions of our popular very safe single asset vaults or deploying factory vaults. No gate keeping means V3 allows the flexibility to properly experiment and grow the range of strategies and vaults offered.

Perhaps a protocol with a large idle USDC position in their treasury wants to deploy some of those funds to generate returns. They can manage their own vault picking and choosing which strategies from the marketplace are within their risk profile.

This creates opportunities for new and improved Yearn teams to arise and become even more decentralized. For example a yTeam could become a rating agency where vault managers or strategists pay to be reviewed and get rated. Like a very specialized audit firm.

In V3 strategists can now simply write and deploy strategies fully autonomously and people can start using it immediately. Want it to be included in vault? You can apply for a rating and pitch it to vault managers.

Different vault managers can have different requirements. Perhaps a Yearn vault will require your strategy to be at or above some specific rating threshold. While a 3rd party vault can have entirely different and unique requirements. Above or below the Yearn standard.

With all this commoditization one might wonder about the impact this will have on Yearn earnings. The unique nature and exclusivity of the V2 design generated significant revenues from vault fees that flowed directly to the Yearn treasury. However, in this commoditized future Yearn can not only generate revenue from vault management but also firmly positions our future to be in market technology capture.

Why spend the incredible amount of time and money it takes to build, audit and launch your own vault system when you can immediately and cheaply leverage the proven and trusted Yearn stack.

We see this to be a positive shift for the Yearn suite of protocols. We will become more resilient to the swings in the crypto markets, and no longer tied to the success of a few other protocols. Key teams can transition into independent, peripheral and fully autonomous entities. This evolution opens up possibilities for healthy competition and innovation, leading to a reduction in protocol expenses while cementing its market position no matter what direction the market goes in or which specific applications lead the way.

### Definitions

#### Universal Terms

-   Vault - A tokenized representation of a yield bearing position.
-   ERC4626 - A standard for a yield bearing vault.

#### Yearn Terms

-   V3 Vault - A yearn-branded ERC4626 “meta vault” that is a debt allocator between multiple different strategies.
-   Strategy - A term that V3 uses to refer to any ERC4626 compliant contract that a V3 Vault balances debt between. A strategy can be another Yearn vault but doesn’t need to be. It can be anything that implements the same API as an ERC4626 Vault (e.g. sfrxETH).
-   V3 Tokenized Strategy - A technical implementation of a Strategy that is also a stand-alone ERC4626 compliant Vault. These are the yield generators in the V3 ecosystem.

### In Depth

**TLDR**: In V3 both Vaults and Strategies are fully stand alone 4626 compliant vaults. The relationship between a V3 Vault and its strategies is entirely changed and are now fully independent. Meaning not only can a vault deploy capital to many strategies. But now, a strategy can accept capital from many different vaults (as well as non-vault sources, like direct deposits from users).

[Vault Spec](https://github.com/yearn/yearn-vaults-v3/blob/master/TECH_SPEC.md)  
[Tokenized Strategy Spec](https://github.com/yearn/tokenized-strategy/blob/master/SPECIFICATION.md)

## The Basic Structure

[![](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/c/c1cf462ebbb39326336349b397cdfe0c6c85e420_2_690x322.png)

921×431 47.8 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/c/c1cf462ebbb39326336349b397cdfe0c6c85e420.png)

**V3 Vaults[\[1\]](#references)** are debt managers. They approve strategies which they may balance debt between. Users will pay a fee for that debt management. In these ways, a V3 Vault acts exactly the same as a V2 Vault, but will come with much more flexibility and improvements.

By becoming 4626-compliant, a strategy’s interface is instantly standardized with many protocols across DeFi. This allows any 4626-compliant protocol to instantly be attached to a V3 vault with no new strategy code or deployments necessary. This allows significant complexity to be stripped from the vault accounting as well as reducing gas costs.

#### Notable Improvements:

-   Composability: Being ERC-4626 means V3 is more composable with DeFi as a whole, and also with the yearn suite of products.
-   Decentralization: V3 introduces “Roles”. Each permissioned function now has its own role, that can be held by an EOA, a multisig, a smart contract, or any combination.
-   Customization: Roles and periphery add ons such as “Accountants” mean that while the base remains immutable and secure, management can continue to iterate with new ideas and implementations.
-   Efficiency: Both debt updates and profit reporting have been entirely redesigned to both increase capital efficiency as well as reduce gas costs.
-   Profit Locking: V3 introduces a new profit locking mechanism that will allow users to continuously earn yield slowly over time rather than just at specific post “harvest” intervals, while also allowing the full capital to always remain deployed.

**V3 Strategies[\[2\]](#references)** As mentioned before, any 4626 vault is instantly a valid strategy. For everything else, V3 provides a “Tokenized” strategy template designed to make strategy writing dead simple. It abstracts away core security features and the 4626 implementation, allowing the developer to focus soley on their yield farming logic.

Tokenized Strategies provide many benefits over the V2 model.

-   Immutability: If built correctly V3 strategies can become fully immutable vaults with no trust assumptions of the management.
-   Increase Total Addressable Market: With Tokenized Strategies, yield generation opportunities that were not feasible in V2, because they would never be added to our vaults, can now be developed and thrive on their own. They also make it much easier to bootstrap and launch on new chains.
-   Developer Experience: A V3 strategy can be developed with only needing to implement as few as 3 functions, and only 1 accounting variable. And due to the design, Tokenized Strategies are significantly smaller contracts than their V2 counterparts meaning lower deployment costs.

**V3 Periphery[\[3\]](#references)[\[4\]](#references)**

The base V3 contracts were built as an un-opinionated base that allows the vault and strategy managers to build their own unique vision on top of it. To make customization even easier a series of periphery contracts have been developed and will continue to be improved on to make the full V3 stack as customizable as possible while also being as easy as possible to build on.

Some examples of periphery contracts that have already been developed are:

**[Accountant](https://github.com/yearn/vault-periphery/tree/master/contracts/accountants)**: Accountants are stand alone contracts that are attached to a vault and charge the fees for a vault when strategies report profits or losses. An accountant can charge any fees that can be codified as well as give refunds back to the vault. Accountants will also be able to serve as a Junior Tranche to the vault.  
**4626 Router[\[5\]](#references)**: To make integration with any V3 vault or strategy as easy as possible. The router also utilizes permit and multicall to make user tx’s as simple and cheap as possible.  
**[Custom Registries](https://github.com/yearn/vault-periphery/tree/master/contracts/registry)**: Each team, protocol, UI etc. can deploy and manage their own registry to easily track on chain the vaults and strategies they work with.  
**[Swappers](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/swappers)**: Strategists can simply inherit a contract that has their preferred method of token swapping to easily integrate with any dex or swapping method they want.

## Fee Structure

**TLDR**: Because strategies are now themselves stand alone vaults, fees in V3 will be charged at both the meta vault level as well as through the Tokenized Strategies. V3 also introduces a “Protocol Fee”. The Protocol Fee is set by Yearn Governance and is applied as a percent of the total fees charged when any V3 vault or strategy reports.

#### Example with a 20% Protocol Fee charged on a vault that is charging a total fee of 1,000 tokens and a strategy that is charging 500 tokens.

[![](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/b/bdaff2fd984051d620edab1389a7f98ca00146cb_2_690x411.png)

2231×1329 100 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/b/bdaff2fd984051d620edab1389a7f98ca00146cb.png)

\*NOTE: It is possible that the ‘Vault Accountant’ and ‘Strategy Fee Recipient’ are also the Yearn Treasury.

### Yearn Managed Multistrategy Vault Fees

V3 Vaults have no fee by default. Rather an external “Accountant” must be added to the the vault that will hold custom logic to charge any types of fees that management can dream up.

There has been a “Generic Accountant” contract developed for vault managers, to use if desired, to manage accounting for vaults upon launch.

In the future Vault managers can experiment with different fee structures such as re-introducing management fees, capped fees, tiered performance fees based on returns or any combination. Accountants can also serve as Junior Tranches and not only charge specialized fees but also give “refunds” (negative fees) back to the vault.

### Tokenized Strategy Fees

Tokenized strategies are built to only charge performance fees. Since they are now stand alone vaults we must also report, lock profit and charge fees at the strategy level as well.

It is expected that strategy fees will fluctuate depending on strategy complexity as well as due to market dynamics.

The Tokenized Strategy implementation has both minimum and maximum fees hard coded that strategists must abide by. The minimum fee disincentives a race to zero. The maximum fee reassures depositors by guaranteeing managers can’t raise their fees to something exploitative downstream.

### Protocol Fees

With the hope for V3 to commoditize the yield aggregation stack allowing the further decentralization of ownership and power over vaults and strategies not all vaults will be accruing fees directly to the Yearn Treasury.

In order to assure the Yearn Treasury continues to earn revenue and fees, V3 implements a “Protocol Fee” that will earn revenue no matter who runs the vault or strategy.

The protocol fee is a configurable amount that is taken out of the fees charged during any V3 vault or strategy report based on the fees charged. It serves as a “tax” on fees earned by using the Yearn stack while still allowing each individual vault and strategy manager to set their own fee structure .

Example:

```
profit = 100
performance_fee = 10%
protocol_fee = 10%

total_fees = profit * performance_fee = 10
protocol_fees = total_fees * protocol_fee = 1
performance_fees = total_fees - protocol_fees = 9

9 is payed to the vault/strategy specific performance fee recipient
1 is payed to the protocol fee recipient (Yearn)
```

Protocol fees are configurable by the Governance of the VaultFactory for each specific API version across all Vaults and Strategies of that API.

Governance can also set a custom protocol fee for individual vault and strategies both higher or lower than the default fee.

* * *

NOTE: The fee structure is not dictated by this YIP and should adjust to meet market conditions based on the desires of vault managers, strategists and veYFI holders.

* * *

## Specification

**1\. Relevant Contracts**:

The first release “3.0.0” has been deployed on Ethereum Mainnet, Polygon, Optimism and Avalanche.

Contract Addressses (Constant across all chains):

_Vault BluePrint_ (To use EIP-5202) : 0xfC49ca826f8C68c0345410fcA0c7d1e0550d9ee9v

_VaultFactory_ : 0xD1736eBbdefae37503F3eD8D718b61a494F24c1D

_TokenizedStrategy_ : 0xAE69a93945133c00B9985D9361A1cd882d107622

**2\. Configuration**:

2.1 Vault Blueprint:

-   n/a

2.2 Vault Factory:

-   MAX\_FEE\_BPS (constant): 50%
-   default protocol fee : 20%
-   protocol fee recipient : Chain specific V3/Treasury Splitter Contract.
-   governance : yChad or equivalent
-   Mainnet will have all V3 vaults that have a V2 equivalent have a custom protocol fee set at 40% of the default fee.

2.3 Tokenized Strategy:

-   MIN\_FEE (constant): 5%
-   MAX\_FEE (constant) : 50%

## Plan

The initial rollout plan for V3 is designed to start in places that V2 has little or no presence in order to immediately increase Yearn’s market share.

While the contracts have been deployed on multiple chains, focus will initially be placed on Polygon for the first public push of V3.

This will establish a Yearn presence and source TVL on a new chain, as well as battle test the V3 code before beginning TVL migration on Ethereum.

In order to bootstrap the V3 ecosystem on any new chain, focus will be initially placed on the development and deployment of Tokenized Strategies for that specific chain. This should lead to a significant improvement over V2. It means cutting down on the amount of contracts that need to be deployed, the governance roles we need filled and the need for overlapping opportunities in any specific asset we want to launch a vault for. Tokenized strategies can also be built and deployed easily by anyone so it allows for the immediate inclusion of 3rd parties to work with V3.

When the launch on Polygon has proven itself and stabilized we will then continue to publicly push on other chains such as Arbitrum, AVAX and Optimism and of course Ethereum.

As stated in the [Specification](#specification) section, the ownership over the VaultFactory that sets the protocol fee config should initially be held by yChad or its equivalent on that chain.

Once established or possible governance rights of the Vault Factories should be moved to veYFI where applicable. And all future deployments should have governance given to veYFI

* * *

### Use at Your Own Risk

The V3 system is offered as is. Yearn contributors and YFI token holders provide no guarantee of safety of funds in **ANY** vault or strategy built on top of the core contracts and will not compensate users for any critical failure or loss of funds resulting from usage of the system.

## References

1.  [GitHub - yearn/yearn-vaults-v3](https://github.com/yearn/yearn-vaults-v3)
2.  [GitHub - yearn/tokenized-strategy: Contains the Contracts for the Yearn V3 Tokenized Strategy Implementation](https://github.com/yearn/tokenized-strategy)
3.  [GitHub - yearn/vault-periphery](https://github.com/yearn/vault-periphery)
4.  [GitHub - yearn/tokenized-strategy-periphery](https://github.com/yearn/tokenized-strategy-periphery)
5.  [GitHub - yearn/Yearn-ERC4626-Router: ERC4626 Router for Yearn V3 vaults.](https://github.com/Schlagonia/Yearn-ERC4626-Router)

-   For
-   Against

0 voters
