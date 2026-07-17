---
title: "YIP-80: Sonne Hack Victims Revised Proposal"
hide_title: true
sidebar_position: -80
---

# YIP-80: Sonne Hack Victims Revised Proposal

| Metadata | Details |
| --- | --- |
| YIP | 80 |
| Outcome | **Rejected** |
| Authors | Yearninger |
| Created | 2024-09-17 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-80-sonne-hack-victims-revised-proposal/14173) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x2a9ecea04244b83ed8f1ef6b4f62e9ee9a31d16c5ef3b52d00e3a185e78df78e) |
| Vote result | For: 0; Against: 838.86 |
| Source | [Source](https://gov.yearn.fi/t/yip-80-sonne-hack-victims-revised-proposal/14173) |

**\[Proposal\]: One-Time Emergency Fund for Partial Compensation of yvUSDT and yvDAI Vault Users Affected by Sonne Finance Exploit (No Precedent)**

**Summary**

This proposal establishes a **One-Time Emergency Fund** to provide partial compensation to users of the yvUSDT and yvDAI vaults affected by the Sonne Finance exploit. Yearn will cover 70% of the remaining losses, with affected users accepting a **30% haircut**, which is **3x larger** compared to the last compensation proposal. Compensation will be provided in **YFI tokens**, with a **6-month vesting schedule** to minimize selling pressure on the market to only 7.14 YFI per month in case all victims would even sell and not just hold.

**Background**

On May 15, 2024, Sonne Finance, where Yearn decided to allocate significant portions of its managed yvUSDT and yvDAI vault assets (especially yvUSDT), was exploited for $20 million. Despite a prior audit by Yearn-assigned auditors, the exploit targeted a vulnerability in a new governance timelock introduced by Sonne Finance. Beefy Finance was reportedly able to withdraw their liquidity from Sonne Finance before Yearn Finance did, which led to Yearn vaults facing higher significant losses compared to Beefy vaults.

#### Affected vaults and losses:

-   **yvUSDT Vault (Optimism)**: Net Loss: 185,291.61 USDT
-   **yvDAI Vault (Optimism)**: Net Loss: 145,196.92 DAI
-   **Total Net Loss** (after subtracting yvOP rewards): $330,488.53, of which users will bear 30%.

### Motivation

1.  **Maintaining Trust**: Compensation is crucial for maintaining user trust in the protocol.
2.  **Balanced Approach**: This proposal sets clear expectations without creating future precedents.
3.  **One-Time Emergency**: The exploit justifies an exceptional response given the significant exposure of Yearn’s funds.

**Specification**

We propose the following compensation structure:

1.  **Total remaining loss**: $330,488.53
2.  **Users’ 30% haircut**: $99,146.56 (3x larger than the previous proposal).
3.  **Requested Yearn compensation**: $231,341.91, paid in **YFI tokens** (~42.8 YFI as of October 1, 2024) or 7.14 YFI token per month according to the 6 month vesting schedule. This amounts to only **0.7% of Yearn’s treasury** ($32.72 M) or less than 2 weeks of Yearn’s monthly treasury yield-farming revenue\*\* (Source “Cryptonews”)
4.  **One-Time Emergency Fund:** This compensation is categorized as a “**One-Time Emergency Fund**” specific to this incident, designed to address the exceptional nature of the Sonne Finance exploit. It is not intended to create a precedent for future compensation requests.
5.  **Future Recovery Assignment:** Users will assign all future recoveries provided by Sonne Finance to the Yearn DAO to offset the compensation provided.
6.  **Reimbursement Clause:** Any future recoveries through legal actions or third-party settlements will be reimbursed to Yearn, potentially offsetting the cost of this compensation.
7.  **Exclusion of Minor Losses:** Vaults with losses of less than 1% are excluded from this compensation proposal, aligning with Yearn’s approach to focus on significant losses.

Users are then fully aligned with the objective of Yearn.

**Conclusion**

By approving this proposal, Yearn will compensate affected users, while implementing a large 30% haircut and ensuring no future compensation expectations are set. The 6 month vesting schedule of YFI reduces the sell pressure of YFI significantly to only 7.14 YFI token per month which is neglectable.  
The significant allocation to Sonne Finance justifies this one-off response to mitigate the impact on Yearn users. Furthermore, Yearn’s treasury strength and monthly yield-farming revenue strengthens its ability to support such one-time emergency compensation without jeopardizing its long-term sustainability.

**Process for Execution if Voted “Yes”**

A. **Full list of depositors** → [Data on Sonne Depositors and compensation amounts · GitHub](https://gist.github.com/anyOldDev/b410c4ae27a4e1c3f3de37245205f62f)  
A balance snapshot of the vault and the rewards contract combined, done using The Graph.

B. **Smart contracts** → we will use the code from [GitHub - Uniswap/merkle-distributor: 📦 A smart contract that distributes a balance of tokens according to a merkle root](https://github.com/Uniswap/merkle-distributor)

C. **Merkle proof:** Yearn chooses between DAI, USDC or USDT and will generate the Merkle proof based on the price of the chosen stablecoin and the full list of depositors as disclosed in the link above.

D. **Execution:** Yearn (or alternatively the team behind the proposal) will generate the Merkle proof based on the information provided and deploy the contract.

E. **Assistance:** The team behind the proposal will assist if necessary to create the Merkle proof and execute the in the chosen stablecoin.

## Voting

-   YES! For partial compensation
-   no

-   YES! For partial compensation of victims
-   No

0 voters

**Resources**

\[1\]: ⁠⁠[Yearn Talk⁠](https://discord.com/channels/734804446353031319/734862139386232902/1243331990015443024)  
\[2\]: [Yearn Vault](https://yearn.fi/vaults/10/0xFaee21D0f0Af88EE72BB6d68E54a90E6EC2616de?tab=strategies)  
\[3\]: [Yearn Vault](https://yearn.fi/vaults/10/0x65343F414FFD6c97b0f6add33d16F6845Ac22BAc?tab=strategies)  
\[4\]: [Screen\_Shot\_2024-07-17\_at\_4.48.16\_PM.png](https://media.discordapp.net/attachments/1242905752440410162/1263235946338582548/Screen_Shot_2024-07-17_at_4.48.16_PM.png?ex=66a01727&is=669ec5a7&hm=d07d4c5cc35fa23adb06cf3fd4bc7ed40b9f8da2ded25b9cda36224984ec3942&format=webp&quality=lossless&width=1292&height=290&)  
\[5\]: [DeBank | Your go-to portfolio tracker for Ethereum and EVM](https://debank.com/profile/0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde)  
\[6\]: [DeBank | Your go-to portfolio tracker for Ethereum and EVM](https://debank.com/profile/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52)  
\[7\] full list of depositors → [Data on Sonne Depositors and compensation amounts · GitHub](https://gist.github.com/anyOldDev/b410c4ae27a4e1c3f3de37245205f62f)  
\[8\] smart contracts → [https://github.com/pandadefi/merkle-distributor-with-vesting/blob/master/contracts/MerkleDistributor.sols](https://github.com/pandadefi/merkle-distributor-with-vesting/blob/master/contracts/MerkleDistributor.sols)  
\[9\]: [yAudit Reports](https://reports.yaudit.dev/reports/05-2023-Sonne/)  
\[10\]: [Rekt - Sonne Finance - Rekt](https://rekt.news/sonne-finance-rekt/)
