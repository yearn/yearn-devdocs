---
title: "YIP-82: The BIP YIP, Bearn Finance"
hide_title: true
sidebar_position: -82
---

# YIP-82: The BIP YIP, Bearn Finance

| Metadata | Details |
| --- | --- |
| YIP | 82 |
| Outcome | **Rejected** |
| Authors | The yBera Boyzzzz |
| Created | 2025-01-21 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-82-the-bip-yip-bearn-finance/14359) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x24ae3413fcf92bcb92cbbe8845d0684a4e8d36c7f164b4afee6c45c629f16f83) |
| Vote result | For: 506.27; Against: 576.04 |
| Source | [Source](https://gov.yearn.fi/t/yip-82-the-bip-yip-bearn-finance/14359) |

[![bearn](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/f/f80a5084db802701126ab04e3ca0817b28dfb1f5_2_500x500.jpeg)

bearn1024×1024 252 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/f/f80a5084db802701126ab04e3ca0817b28dfb1f5.jpeg "bearn")

## Authors

The yBera Boyzzzz

## Summary

Fund and endorse “Bearn” aka “The Blue Bear” aka “The Big Bad Bearn’n Bananza”, a new sub DAO focused on building and launching products on Berachain.

Are you ready to feel the Bearn?

## Abstract

If adopted, this proposal seeks to:

-   Endorse Bearn as an official sub DAO of Yearn
-   Fund the new sub DAO and kick off development
-   Specify the goals, structure and launch specifications
-   Make Yearn Great Again

## Background

[Berachain](https://www.berachain.com/) is a new EVM equivalent layer 1 network launching with a novel consensus mechanism called [Proof of Liquidity](https://docs.berachain.com/learn/what-is-proof-of-liquidity) (POL). POL is meant to unlock many new types of structures for apps to gain traction and interact with both users and the validators of the network. Given that the main focus of Berachain is to revitalize yield farming in DeFi, it makes perfect sense for Yearn to focus on building on Berachain.

However, due to the novel nature of POL, the products that will make the most sense for Berachain will different enough than the current Yearn products to motivate a entirely new sub DAO that utilizies existing Yearn products and infrastrucutre where possible but builds new parts where needed.

The sub DAO is structured so that the success of Bearn will be able to contribute greatly both to the success of existing Yearn products as well as return new sources of revenue to the treasury.

## **Vision**

Bearn will start with two main products, a stable coin and a BGT liquid locker, that will work together to create one of a kind offerings made possible due to Berachain’s unique design.

#### **Stable coin**:

Bearn will launch a Bera native, over collateralized, demand driven stable coin whose entire backing will be deposited into Yearn vaults.

Yearn vaults greatest strengths have always been its use by other protocols to outsource the yield generation needs to power unique use cases such as with Alchemix and Abra. The Bearn stable coin is the next iteration of this. At launch the stable coin will only be mintable using approved stable coins, such as USDC, USDT and USDS. All of these coins will then be deposited into the main Yearn “1” vaults on ETH mainnet to earn Yield.

Bearn will then utilize the veYFI system for both bribing veYFI holders and staking the vault tokens to earn additional dYFI to help boost the yields of the stable coin backing as well.

The yield earned by these deposits will be periodically “harvested”, bridged to Berachain and then used to bribe on Bera for BGT emissions to be directed towards positive sum behavior to encourage use of the stable.

For example, it can be used to direct BGT emissions to the STABLE/HONEY LP token, a yvSTABLE savings vault, or even lending positions in custom lending markets for other stables such as HONEY, to allow yvSTABLE users to leverage their positions.

The increased efficiency of stable coin bribes for both veYFI emissions and for BGT from a continuous flow of sustainable real yield to encourage positive sum behavior means it can continuously create real demand for its use and existence by being one of the highest yielding native stable coins on the market, bringing in new demand and thus more deposits for Yearn vaults.

\*\*If successful the stable coin model could be expanded to other assets such as ETH for Berachain as well as any L2’s.

#### **yBGT**:

yBGT is a liquid locker and reward compounder, similar to yCRV, for users to stake their BGT eligible tokens and earn either yBGT or have their positions auto-compounded.

#### Earn BGT

-   User deposits BGT eligible tokens in a Bearn vault that stakes them.
-   All BGT earned is kept locked and an equal amount of yBGT is minted.
-   Users then can claim any earned BGT for their position (minus a small fee) as yBGT.
-   yBGT can be sold through certain secondary markets. Or staked to earn share of revenues from Bearn’s ever expanding BGT position.

#### Compounders:

-   Users deposit their BGT eligible tokens to a vault that stakes them to earn BGT.
-   All the BGT minus a fee get redeemed for BERA, sold and compounded into more of the underlying asset deposited.
-   The remaining BGT is minted as yBGT to the protocol.
-   Users get a simple classic Yearn compounder product and yBGT becomes more attractive cause it controls more BGT overall.

yBGT combines both of Yearn’s longest standing products, a liquid locker and auto compounding vaults to give users a unique product that allows them to get to full benefits of the Berachain designs easily by abstracting away the complexity

## Motivation

By itself each product offers a unique value for users, but still has significant competition for other similar products. However, launching them together creates an extra layer of synergy that puts the benefits to users above what they can get elsewhere.

To List a few examples of the positive synergies:

-   yBGT compounders will be listed as collateral in custom lending markets where the STABLE is the borrow token. This gives an immediate competitive advantage to the BGT compounders, since they can be collateral, as well as gives an immediate real use case for the STABLE to generate even more demand that does not put the backing of the coin at risk.
-   The lowest risk compounders such as the native gauges, will be used as collateral in a CDP to mint the stable coin
-   Fees from the secondary lending markets will be used to help bribe the lending positions of those markets thus increasing the viability and attractiveness of yBGT compounders and the stable.
-   Bearn can be fully vertically integrated having both money to bribe with, BGT to bribe and potentially our own future validator’s to delegate BGT to which will increase effeciencies and profitability at every layer.
-   Autocompounders of the Stable’s bribed tokens (ex: yvSTABLE) give a much better product for users as well as creating perpetual buy pressure for the stable coin and help the protocol accumulate Protocol owned BGT.

For a perfect example of the synergy consider the yvSTABLE vault, whose goal is to give users a simple very high yielding place to deposit the STABLE and create demand to hold the coin.

EX:

-   The majority of bribes from STABLE backings yield is used to direct BGT emissions to a reward vault for yvSTABLE.
-   yBGT launches an autocompounder for the yvSTABLE reward vault giving users a simple high yielding bearing stable coin product.
-   All extra BGT earned from the autcompounder taken as fees makes the yBGT and BEARN token more attractive
-   yvSTABLE will be able to deploy the capital deposited into the vault into the secondary markets to be used by other yBGT users to leverage their positions creating both more yield for yvSTABLE depositors as well as a better use case and more TVL for the yBGT products. Both of which generate more fees for the protocol.

The new governance token earning revenues from both products also make it a much more attractive token to hold and stake.

## Token

A new governance token $BEARN will be issued in conjunction with the launch of the sub DAO that will be in charge of needed operational decisions regarding the protocol as well as returning revenues earned by the protocol back to owners (such as the Yearn Treasury).

#### Controls:

-   STABLE bakcing composition, limits and fees
-   Minter and Burner whitelist’s for STABLE
-   Secondary Market operations such as collateral’s to add, LTV’s etc.
-   Future CDP deployment collaterals and LTV’s.
-   STABLE bribes
-   keepBGT rates for the rewards vaults.
-   Fees for reward vaults.
-   BGT delegations
-   Grant funding

### Revenues

-   PSM fees (yield and burning)
-   Secondary Market fees
-   Future CDP fees or interest
-   keepBGT and fees from reward vault deposits.
-   Protocol owned yBGT yield
-   yvSTABLE performance fees
-   Potential future validator revenue

#### Allocations

Yearn - 10% (Staked and vests linearly over 3 years)  
Team - 15% (Staked and vests linearly over 3 years with a 1 year cliff)  
Treasury - 15% (Future Grants)  
veYFI Holders: 2% (Optional vest or immediate unlock for reduced amount)  
Pre-Launch Boints program - 8%  
Post launch Incentives - 50%

* * *

## Overview

[![image](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/e/ed1fabec9e80cd66702f42fd1446c16218f16fb4_2_690x365.jpeg)

image4984×2638 566 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/e/ed1fabec9e80cd66702f42fd1446c16218f16fb4.jpeg "image")

## Proposal

Request is for $600k in exchange for 10% of the initial token supply to be distributed as a staked version on Bera Chain to the Yearn Treasury. The governance rights over the tokens will be delegated to the yLockers team. The yield earned from the the tokens from protocol revenue and yBGT yield will be periodically bridged back to mainnet as a stable coin to either return to the treasury or distribute to veYFI holders.

This serves as a one time grant as the funding for the expected full cost of development and launch of the protocol, including audit, dev costs etc. Once launched the team will earn income based on the revenues earned from the protocol as well as future token grants from the treasury allocation.

Yearn receives the full value of the tokens as they vest based on the current market rate as well as the continuous revenue payed out to stakers, of which it will be the largest single owner.

Yearn should see a drastic increase in TVL in its mainnet single asset vaults that are used as the stable coins backing since 100% of the TVL backing the coin at launch will be deployed to the vaults on mainnet and thus increase fees to the DAO.

veYFI holders will see an increase in the effective yield of their positions due to the presence of a new bribe market for the directing of dYFI emmisions.

An additional 2% of the token supply will be airdropped to veYFI holders to give them the ability for immediate direct governance in the new protocol.

In addition we request another $1m in liquidity to be deployed by the Yearn DAO to be the initial farmer of the system. These funds will be delegated to the yLockers team, once the pre-launch Boints program is launched, so they do not leave the control of the DAO and will unlock after 1 year for the DAO to either leave deposited or remove. All farming proceeds, including earned BEARN can be immediately claimed/sold and bridged back to mainnet or continuously compounded.

**TOTALS**:  
\- **GRANT**: $600k for 10% of BEARN supply. Payment will be split into 3 equal parts  
\- 1) On approval of the YIP  
\- 2) Once contracts go to Audit  
\- 3) Once contracts complete the audits  
\- **Liquidity**: $1m locked for 1 year.  
\-Sent to ylockers msig on mainnet once pre-launch Boints campaign begins.

\*\*NOTE: It is the hope that the initial grant will be enough to launch the product. If not, the team will be required to either find additional outside funding or create an additional YIP for another grant in exchange for more tokens.

Ooga Fuckin Booga!

Follow the twitter for more update: [https://twitter.com/Bearnsucks](https://twitter.com/Bearnsucks)

-   For
-   Against

0 voters
