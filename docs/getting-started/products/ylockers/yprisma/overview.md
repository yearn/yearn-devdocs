# yPRISMA Overview

Claim and deposit at [yprisma.yearn.fi](https://yprisma.yearn.fi)

## What is yPRISMA?

yPRISMA is Yearn's latest liquid locker, built for Prisma Finance's governance token (PRISMA). Let's review the basics of liquid locker tokens like yPRISMA:

- They represent 1 vePRISMA max-locked to Yearn
- They are not redeemable for the underlying locked PRISMA
- They have no transfer restrictions and thus can always be swapped in DEX pools

Governance for Prisma is controlled by vePRISMA, a locked token position that grants users voting power, fee revenue, and boosted PRISMA emissions.

Because all PRISMA emissions come as locked vePRISMA, it is often inconvenient for users who want to avoid managing their position or want to cash out. yPRISMA aims to offer users a tokenized version of this position, giving them instant liquidity and auto-managing governance participation to maximize yield.

## Earn Yield on yPRISMA

Yearn has 2 ways to earn yield on your yPRISMA; depositing to the `YearnBoostedStaker` contract to earn mkUSD or depositing to the yPRISMA Auto-Compounder V3 vault to earn more yPRISMA. The intricacies and details are documented [here](../overview#earning-yield-with-ylockers). Once you know which path you want to take, you can follow the step by step guide [here](yprisma-guide.md).

**More questions Anon? Head over to the [FAQ](yprisma-faq.md).**

## Links

- [yPRISMA UI](https://yprisma.yearn.fi/)
- [PRISMA.lol - Liquid Lockers Tracker](https://www.prisma.lol/)
- [yLockers Discord Channel](https://discord.com/channels/734804446353031319/1186417376275730552)

## Addresses

### Core Protocol

| Name                                             | Address                                                                                                                 |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| PRISMA | [`0xdA47862a83dac0c112BA89c6abC2159b95afd71C`](https://etherscan.io/address/0xdA47862a83dac0c112BA89c6abC2159b95afd71C)  |
| yPRISMA                                          | [`0xe3668873d944e4a949da05fc8bde419eff543882`](https://etherscan.io/address/0xe3668873d944e4a949da05fc8bde419eff543882) |
| YearnBoostedStaker                               | [`TBC`](add link) |
| yvyPRISMA Vault/Token | [`TBC`](add link) |
| yvmkUSD-A Vault/Token | [`0x04AeBe2e4301CdF5E9c57B01eBdfe4Ac4B48DD13`](https://etherscan.io/address/0x04AeBe2e4301CdF5E9c57B01eBdfe4Ac4B48DD13) |

### Expired Farms and Contracts

| Name                                             | Address |
|--------------------------------------------------|------------------------------------------------------------|
| *yPRISMA Staking (yvmkUSD-A rewards)       |       [`0xE3EE395C9067dD15C492Ca950B101a7d6c85b5Fc`](https://etherscan.io/address/0xE3EE395C9067dD15C492Ca950B101a7d6c85b5Fc) |
| *yPRISMA Staking (wstETH rewards)          |       [`0x774a55C3Eeb79929fD445Ae97191228Ab39c4d0f`](https://etherscan.io/address/0x774a55C3Eeb79929fD445Ae97191228Ab39c4d0f) |
| *yPRISMA Staking (dYFI rewards)            |       [`0x93283184650f4d3B4253ABd00978176732118428`](https://etherscan.io/address/0x93283184650f4d3B4253ABd00978176732118428) |
| *yPRISMA LP Staking (yPRISMA rewards)                        |       [`0x6806D62AAdF2Ee97cd4BCE46BF5fCD89766EF246`](https://etherscan.io/address/0x6806D62AAdF2Ee97cd4BCE46BF5fCD89766EF246) |
| *yCRV Staking (yPRISMA rewards)            |       [`0x84c94d739e075b3C7431bdb1A005F0412DF828a5`](https://etherscan.io/address/0x84c94d739e075b3C7431bdb1A005F0412DF828a5) |
**expired*

## Read More

- [Upcoming yPRISMA YBS Staking Launch: All You Need to Know](https://blog.yearn.fi/ybs-yprisma-launch)
- [yPRISMA Roadmap](https://medium.com/iearn/yprisma-roadmap-8fb3e2376594)
- [Introduction to Yearn PRISMA Incentives Farming and FAQ](https://docs.yearn.finance/getting-started/products/ylockers/yprisma/farming)
