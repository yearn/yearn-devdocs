# Overview

## yETH

yETH is a user-governed liquidity pool token consisting of various Ethereum Liquid Staking Derivatives (LSTs). yETH represents one-to-one [beacon chain ETH](https://ethereum.org/en/upgrades/beacon-chain/) (a.k.a. "ETH staked").

yETH does not accrue any yield, it all goes to Staked yETH (st-yETH) holders, which makes yETH a good token to LP in stableswap pools like those on Curve. To acquire yETH, users can mint yETH by depositing LSTs or swap against the yETH/ETH Curve pool.

## Staked yETH (st-yETH)

Users stake their yETH to mint st-yETH, accrue yield, and later unstake st-yETH to receive yETH back according to their earnings. Stakers receive all yield and slashings from the beacon chain (Ethereum proof-of-stake validators) and earn incentives if they participate and vote in yETH governance.

By bundling LSTs, st-yETH aims to generate the best risk-adjusted yield from ETH staking. Through protocol governance, st-yETH users can readjust pool weights to maximize yield while mitigating catastrophic scenarios where one or several LSTs in the yETH composition suffer adverse events like de-pegging or security incidents.

## Pool Weights for each LST

In yETH, each Liquid Staking Derivative (LST) has an assigned weight representing its proportion in the pool. The weight management system ensures that the pool remains diversified and balanced. When an LST's weight increases, it occupies a larger share of the pool, while a decrease in weight reduces its share.

This dynamic adjustment allows the pool to optimize risk and yield distribution among the LSTs. In practice, as an LST performs well or gains popularity, its weight in the pool may increase, attracting more liquidity and providing better returns.

If an LST underperforms or faces issues, its weight may decrease, reducing its impact on the overall pool performance. This weight adjustment mechanism helps maintain an optimal risk-adjusted yield for yETH users.

## How Bootstrapping Works

![image](https://github.com/MarcoWorms/yearn-devdocs/assets/7863230/b92613a6-42e6-4936-affa-4c77a395ceb3)

The bootstrapping process aims to kickstart yETH first LSTs and liquidity. You can read all about each phase in our bootstrapping release [article](https://medium.com/@marcoworms/yeth-lsd-lobbying-season-is-now-open-ff8a2537402d).

## Contracts & Roles

| Name                                             | Address                             |
|--------------------------------------------------|-------------------------------------|
| yETH                                             | [`0x1BED97CBC3c24A4fb5C069C6E311a967386131f7`](https://etherscan.io/address/0x1BED97CBC3c24A4fb5C069C6E311a967386131f7) |
| st-yETH                                          | [`0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4`](https://etherscan.io/address/0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4) |
| Management                                       | [`0xbBBBBbbB6B942883EAd4976882C99201108c784d`](https://etherscan.io/address/0xbBBBBbbB6B942883EAd4976882C99201108c784d) |
| Protocol Owned Liquidity                         | [`0x929401e30Aab6bd648dEf2d30FF44952BaB04478`](https://etherscan.io/address/0x929401e30Aab6bd648dEf2d30FF44952BaB04478) |
| Bootstrap: Deposit, Vote, Claim Incentives       | [`0x41B994C192183793bB9cc35bAAb8bD9C6885c6bf`](https://etherscan.io/address/0x41B994C192183793bB9cc35bAAb8bD9C6885c6bf) |
| Bootstrap: Claim st-yETH                         | [`0x7cf484D9d16BA26aB3bCdc8EC4a73aC50136d491`](https://etherscan.io/address/0x7cf484D9d16BA26aB3bCdc8EC4a73aC50136d491) |
| Guardian                                         | [`0xDC775e813cDB38a4f02c4BAd3942319088018eFA`](https://etherscan.io/address/0xDC775e813cDB38a4f02c4BAd3942319088018eFA) |
| Pool                                             | [`0x2cced4ffA804ADbe1269cDFc22D7904471aBdE63`](https://etherscan.io/address/0x2cced4ffA804ADbe1269cDFc22D7904471aBdE63) |
| Rate Providers                                   | [`0x4e322aeAf355dFf8fb9Fd5D18F3D87667E8f8316`](https://etherscan.io/address/0x4e322aeAf355dFf8fb9Fd5D18F3D87667E8f8316) |

> Due to a redeploy of st-yETH during the bootstrap process the first st-yETH contract has been deprecated, use the `Bootstrap: Claim st-yETH` contract to claim the new version if you participated in the bootstrap phase.

## Management Role

Trusted addresses with privileged access for limited operations. Should eventually be replaced by a smart contract:

- Can start a gradual weight change, as long as no weight change is active yet.
- Can whitelist a new asset, which sets an initial weight, sets the rate provider, and requires an initial deposit. New assets can only be whitelisted if no weight change has been scheduled yet.
- Can update the rate provider for every whitelisted asset.
- Can update the staking contract.
- Can set the pool swap fee.
- Can set the tolerance range.
- Can set the new management address.
- Can set the new guardian and whitelister addresses.
- Can trigger `pause mode`.
- Can trigger `killed mode`.

### Pause mode

> This mode is to be activated in the event of extreme market conditions or detected suspicious behavior, either in the protocol itself or in the underlying LST tokens that back it.

- No user may deposit assets into the contract.
- Users may only withdraw assets in a balanced manner.
- Management or guardian can undo pause mode to resume normal operation.

### Killed mode

> This mode is to be activated in the event of critical failures, whether in the protocol itself or in any of the underlying LST tokens that back it. This can also be used to migrate to a new version of the yETH protocol.

- No user may deposit assets into the contract.
- Users may only withdraw assets in a balanced manner.
- The reward controller may not update the beacon chain amounts.

There is no way to undo `killed mode`.

## Guardian Role

Trusted addresses with emergency privileges:

- Can trigger pause mode.

## Whitelister Role

Trusted addresses with the privilege to whitelist new assets:

- Can whitelist a new asset, which sets an initial weight, sets the rate provider and requires an initial deposit. New assets can only be whitelisted if no weight change has been scheduled yet.

## Frequently Asked Questions

### How does yETH earn APY?

yETH earns APY through various sources:

- Swap fee income from the Automated Market Maker (AMM)
- Incentives fee income, which are incentives for staker participation in governance
- Liquid Staking Derivative (LSD) income from staked ETH yield
- Buying LSTs at a discount
- Whitelisting fees

However, there are also deductions such as Beacon Chain slashings and a 10% Yearn performance fee on profits. 

Please note that yield is paid out one week after it is generated. The yield generated in week N is streamed out in week N+1.

### What other benefits does yETH give holders?

yETH provides diversification by holding a basket of LSDs, which helps to spread the risk.

### How is yield passed onto stakers?

LSD Protocols generate yield and update their on-chain rates. This results in yETH being minted and sent to st-yETH.

### Can I withdraw multiple LSDs?

Yes, you can withdraw multiple LSDs or just one LSD. However, your withdrawal cannot cause an LSD to leave its safety bands around its target weight. For example, if a pool has a weight of 20% and a band of 5%, the actual weight is allowed to be between 15% and 25%. This caps losses to at most 25%, assuming that token permanently depegs and goes to 0. In that worst-case scenario, yETH depegs to 0.75 ETH, because you can always do a balanced withdrawal of all the assets, of which only 25% is worthless. Compare this with holding the token by yourself, you’d be -100%.

### Is there slippage with proportional withdrawal?

No, there is no slippage with proportional withdrawal.
