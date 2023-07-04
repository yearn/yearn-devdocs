# Overview

**yETH**

yETH is a user-governed liquidity pool token consisting of various Ethereum Liquid Staking Derivatives (LSDs). yETH represents one-to-one [beacon chain ETH](https://ethereum.org/en/upgrades/beacon-chain/) (a.k.a. "ETH staked").

yETH does not accrue any yield, it all goes to Staked yETH (st-yETH) holders, which makes yETH a good token to LP in stableswap pools like those on Curve. To acquire yETH, users can mint yETH by depositing LSTs, or swap against the yETH/ETH Curve pool.

**Staked yETH (st-yETH)**

Users stake their yETH to mint st-yETH, accrue yield, and later unstake st-yETH to receive yETH back according to their earnings. Stakers receive all yield and slashings from beacon chain (Ethereum proof-of-stake validators) and earn incentives if they participate and vote in yETH governance.

By bundling LSTs together, st-yETH aims to generate the best risk-adjusted yield from ETH staking. Through protocol governance, st-yETH users can readjust pool weights in order to maximize yield, while mitigating catastrophic scenarios where one or several LSTs in the yETH composition suffer adverse events like de-pegging or security incidents.

**Pool Weights for each LSD**

In yETH, each Liquid Staking Derivative (LSD) has an assigned weight representing its proportion in the pool. The weight management system ensures that the pool remains diversified and balanced. When an LSD's weight increases, it occupies a larger share of the pool, while a decrease in weight reduces its share.

This dynamic adjustment allows the pool to optimize risk and yield distribution among the LSDs. In practice, this means that as an LSD performs well or gains popularity, its weight in the pool may increase, attracting more liquidity and providing better returns.

If an LSD underperforms or faces issues, its weight may decrease, reducing its impact on the overall pool performance. This weight adjustment mechanism helps maintain an optimal risk-adjusted yield for yETH users.

**Which LSDs compose yETH?**

> TO BE DONE: tutorial on how to check this onchain + check weights for each current LSD

**How to start using yETH**

> TO BE DONE: add ui guide from webapp

**How to stake yETH into st-yETH**

> TO BE DONE:  add ui guide from webapp

**How boostraping (launch) works?**

> TO BE DONE: This paragraph will just link to https://hackmd.io/RxCM6oi5Rue6vSzfyvSUaw?both because it is already a detailed breakdown focused on bootstrapping

# Contracts & Roles

| Name                        | Address                             |
|-----------------------------|-------------------------------------|
| yETH                        |                                     |
| st-yETH                     |                                     |
| Management                  |                                     |
| Guardian                    |                                     |
| Whitelister                 |                                     |
| Treasury                    |     ychad.eth                       |
| Rate Providers              |                                     |

## Management Role

Trusted addresses with privileged access for limited operations. Should eventually be replaced by a smart contract:

- Can start a gradual weight change, as long as no weight change is active yet.
- Can whitelist a new asset, which sets an initial weight, sets the rate provider and requires an initial deposit. New assets can only be whitelisted if no weight change has been scheduled yet.
- Can update the rate provider for every whitelisted asset.
- Can update the staking contract.
- Can set the pool swap fee.
- Can set the tolerance range.
- Can set the new management address.
- Can set the new guardian and whitelister addresses.
- Can trigger [`pause mode`](pause-mode).
- Can trigger [`killed mode`](killed-mode).

#### Pause mode

> This mode is to be enabled in the event of extreme market conditions or suspicious LSD minting behaviour or oracle activity.

- No user may deposit assets into the contract.
- Users may only withdraw assets in a balanced manner.
- Management or guardian can undo pause mode to resume normal operation.

#### Killed mode

> This mode is to be activated in the event of a LSD depeg, such as a mint bug or a compromised oracle or a critical bug in the protocol. This can also be used as part of upgrading to a new version of yETH.

- No user may deposit assets into the contract.
- Users may only withdraw assets in a balanced manner.
- The reward controller may not update the beacon chain amounts.

There is no way to undo `killed mode`.

## Guardian Role

Trusted addresses with emergency privileges:

- Can trigger pause mode.

## Whitelister Role

Trusted addresses with privilege to whitelist new assets:

- Can whitelist a new asset, which sets an initial weight, sets the rate provider and requires an initial deposit. New assets can only be whitelisted if no weight change has been scheduled yet.