---
title: "YIP-78: Partial Compensation Sonne Hack Victims"
hide_title: true
sidebar_position: -78
---

# YIP-78: Partial Compensation Sonne Hack Victims

| Metadata | Details |
| --- | --- |
| YIP | 78 |
| Outcome | **Rejected** |
| Authors | Yearninger |
| Created | 2024-07-25 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-78-partial-compensation-sonne-hack-victims/14103) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x47c2883308fafd286697c391748c1381cf374b98cfa3af9d23d2fe79d31df6fb) |
| Vote result | For: 214.59; Against: 235.57 |
| Source | [Source](https://gov.yearn.fi/t/yip-78-partial-compensation-sonne-hack-victims/14103) |

# \[Proposal\]: Partial Compensation for yvUSDT and yvDAI Vault Users Affected by Sonne Finance Exploit

## Summary

This proposal aims to provide partial compensation to users of yvUSDT and yvDAI vaults affected by the Sonne Finance exploit. It suggests Yearn cover 80% of the remaining losses, with affected users accepting a 10% write-down. This approach demonstrates Yearn’s commitment to users while balancing the interests of YFI holders.

## Background

On May 15, 2024, Sonne Finance, where Yearn had allocated significant portions of yvUSDT and yvDAI vault assets, was exploited for $20 million \[1\]. This occurred despite a prior audit by Yearn-assigned auditors \[2\]. The exploit targeted a vulnerability in a new governance timelock introduced by Sonne Finance.

On May 24, 2024, an increased rate of OP rewards was announced by a Yearn contributor \[3\]. For 4 weeks, these rewards were paid out and mitigated some of the occurred losses. The remaining losses are as follows:

Affected vaults and losses:

1.  yvUSDT Vault (Optimism) \[4\]:
    
    -   Total Gross Loss: 356,996.37 USDT \[6\]
    -   Compensation in OP already received: $171,704.76 (76,195.19 yvOP which is 78,404 OP at a TWAP price during the rewards period of $2.19)
    -   Net Loss: 185,291.61 USDT
2.  yvDAI Vault (Optimism) \[5\]:
    
    -   Total Gross Loss: 294,283.36 DAI \[6\]
    -   Compensation in OP already received: $149,086.44 (66,157.90 yvOP which is 68,076 OP at a TWAP price during the rewards period of $2.19)
    -   Net Loss: 145,196.92 DAI

Total Net Loss of vaults (after subtracting already received yvOP rewards): $330,488.53

## Motivation

This proposal addresses three key issues:

1.  Trust Maintenance: Compensating affected users demonstrates our commitment to depositor safety, crucial for retaining and attracting users.
    
2.  Long-term Benefits: The goodwill generated will likely outweigh short-term costs, potentially leading to increased deposits and protocol growth.
    
3.  Acknowledging Risk Management Shortcomings: The incident highlights an overweighted allocation to a protocol where yAudit had identified potential security risks. By approving this proposal, we signal our commitment to improving risk assessment and management practices, thereby better protecting user funds in stablecoin vaults going forward.
    

## Specification

We propose the following compensation structure:

1.  Total remaining loss: $330.488,53
2.  Affected users to bear 10% of the loss: $33,048.85
3.  Requested compensation from Yearn: $297.439,67 (in YFI equivalent, which represents as of August, 15 2024, a total of 58.86 YFI)
4.  Users will assign all future recoveries provided by Sonne Finance to the Yearn DAO.
5.  Users receive compensation in the form of YFI tokens. Despite Users having originally invested in stablecoin vaults Users are willing to align themselves with Yearn and agree to the YFI compensation being subject to a vesting schedule.
6.  The vesting schedule releases lineary one-sixth (1/6) of the total tokens each month over a period of 6 months. One-sixth of 58.86 YFI amounts to approximately 9.8 YFI potentially sold by users per month, which should have no impact on the YFI price as several thousand YFI are traded on various exchanges daily

Users are then fully aligned with the objective of Yearn.

Yearn’s Financial Position:  
As of August 16, Yearn’s financial position is as follows:

Total liquid assets: $32.7M

The proposed compensation of $297.439,67 represents approximately 0.9% of Yearn’s total liquid assets as of August 16, 2024, a manageable amount that won’t jeopardize Yearn’s financial stability.

\[Note: Following Yearn’s recovery efforts and yvOP compensation, affected WETH and USDC vaults suffered total losses of 1% or less. Hence, they are excluded from this proposal, since the losses lie underneath the accepted loss of 10%.\]

Process of executing the proposal if voted “yes”:

A. full list of depositors → [https://gist.github.com/anyOldDev/b410c4ae27a4e1c3f3de37245205f62f](https://gist.github.com/anyOldDev/b410c4ae27a4e1c3f3de37245205f62f)  
It’s a balance snapshot of the vault and the rewards contract combined done using the graph.  
B. smart contracts → [https://github.com/pandadefi/merkle-distributor-with-vesting/blob/master/contracts/MerkleDistributor.sol](https://github.com/pandadefi/merkle-distributor-with-vesting/blob/master/contracts/MerkleDistributor.sol)  
The contract is a merkle-distributor forked from uniswap wich has been modiifed to create a vesting contract using llamapay contracts.  
C. merkle proof → Yearn will have to create based on the price of YFI and the full list of depositors as disclosed in the link above.  
D. Yearn (or alternatively the Team behind the proposal) will have to convert the USD amount to YFI amount, generate the merkle proof based on the information provided in the shared links and deploy the contract  
E. The team behind the proposal will help if necessary to create the merkle proof once the YFI price for compensation has been decided.

## Voting

-   YES! For partial compensation
-   no

0 voters

## Resources

\[1\]: [https://reports.yaudit.dev/reports/05-2023-Sonne/](https://reports.yaudit.dev/reports/05-2023-Sonne/)  
\[2\]: [https://rekt.news/sonne-finance-rekt/](https://rekt.news/sonne-finance-rekt/)  
\[3\]: ⁠⁠[Yearn Talk⁠](https://discord.com/channels/734804446353031319/734862139386232902/1243331990015443024)  
\[4\]: [https://yearn.fi/vaults/10/0xFaee21D0f0Af88EE72BB6d68E54a90E6EC2616de?tab=strategies](https://yearn.fi/vaults/10/0xFaee21D0f0Af88EE72BB6d68E54a90E6EC2616de?tab=strategies)  
\[5\]: [https://yearn.fi/vaults/10/0x65343F414FFD6c97b0f6add33d16F6845Ac22BAc?tab=strategies](https://yearn.fi/vaults/10/0x65343F414FFD6c97b0f6add33d16F6845Ac22BAc?tab=strategies)  
\[6\]: [Screen\_Shot\_2024-07-17\_at\_4.48.16\_PM.png](https://media.discordapp.net/attachments/1242905752440410162/1263235946338582548/Screen_Shot_2024-07-17_at_4.48.16_PM.png?ex=66a01727&is=669ec5a7&hm=d07d4c5cc35fa23adb06cf3fd4bc7ed40b9f8da2ded25b9cda36224984ec3942&format=webp&quality=lossless&width=1292&height=290&)  
\[7\]: [https://debank.com/profile/0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde](https://debank.com/profile/0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde)  
\[8\]: [https://debank.com/profile/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52](https://debank.com/profile/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52)  
\[9\] full list of depositors → [https://gist.github.com/anyOldDev/b410c4ae27a4e1c3f3de37245205f62f](https://gist.github.com/anyOldDev/b410c4ae27a4e1c3f3de37245205f62f)  
\[10\] smart contracts → [https://github.com/pandadefi/merkle-distributor-with-vesting/blob/master/contracts/MerkleDistributor.sol](https://github.com/pandadefi/merkle-distributor-with-vesting/blob/master/contracts/MerkleDistributor.sol)
