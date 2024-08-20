# veYFI Specs

veYFI incorporates [YIP-56: Buyback and Build](https://gov.yearn.fi/t/yip-56-buyback-and-build/8929) funds into YFI tokenomics. Users can lock YFI tokens and receive veYFI, which allows them to boost vault rewards and vote on where bought-back YFI will be sent.

Contract Address: [`0x90c1f9220d90d3966fbee24045edd73e1d588ad5`](https://etherscan.io/address/0x90c1f9220d90d3966fbee24045edd73e1d588ad5)

## Specification

Governance Forum Thread: https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics

## veYFI Overview

- Locking is similar to the ve-style program of Curve.
- YFI can be locked into veYFI, which is non-transferable.
- Lock duration can be decided on deposit: from 1 week to 4 years.
  - You can actually lock up to 10 years, but anything above 4 years doesn’t give you more veYFI. This way you don't have to relock every week. If you set it to longer than 4 years, you can always reset it to 4 years so it starts decaying.
- A user must have a veYFI lock earn boosted rewards. No lock leads to no boosted rewards. A Maximum lock, continuously renewed, maximizes rewards.
  - Just like with Curve, even without a veYFI lock, you can still deposit into a vault and stake the vault token into a gauge which will give you the base boost. With the minimum boost, you get to keep 10% of the dYFI you farm. The other 90% goes to veYFI lockers.
- It’s possible to exit the lock early, in exchange for paying a penalty that gets allocated to the other veYFI holders.
- The penalty is up to 75% locked amount and decays over time:
  - The total penalty is the minimum percentage between `75% locked amount` and `(time remaining / 4 years)`
  - So if your lock is over 3 years you will pay 75%.
  - If your lock is 2 years you will pay 2/4 = 50%
  - Penalty Formula: `min(75%, lock_duration_left / 4 years * 100%)`
- veYFI holders are eligible to receive a share of the early exit penalties.
- veYFI holders are eligible to receive a share of gauge dYFI rewards from unused boosts.
- Now that veYFI has been implemented, only veYFI is accepted voting power in Yearn Governance.

### dYFI as Gauges Reward

- dYFI is an ERC-20 token.
- Gauges emit dYFI that users can either sell for ETH or convert to YFI at a cost.
- Gives its bearer the right to redeem an equivalent amount of YFI in exchange for ETH.
- dYFI is burned upon redemption.
- The circulating supply of dYFI must not exceed the amount of YFI available to be redeemed as part of the tokenomics program.
- The amount of ETH required for redemption is at a discount to the current spot price of YFI/ETH.
- Discount calculation is a function of the veYFI and YFI supply with the following formula:
  - discount = `c / (1 + a * e^k(s * x − 1))`, where:
    - **c** = `1`
    - **a** = `10`
    - **k** = `4.7`
    - **s** = `configurable scaling factor`
    - **x** = `veYFI_supply / YFI_supply`

  ![image](/img/charts/dyfi-redemption-chart.png)
- ETH received from dYFI redemption is redirected to automated YFI buybacks handled by an immutable smart contract that runs Dutch auctions.

### Vault Gauges + Voting

- Vault gauges allow vault depositors to stake their vault tokens and earn dYFI rewards according to their veYFI weight.
- Weights decay as the remaining lock duration decreases and can be extended up to the max lock duration.
- Increased locking duration is rewarded with increased weight, so locking for 4 years gives 100% weight, locking for 2 years 50% weight, etc.
- dYFI is allocated to gauges based on bi-monthly governance votes. Each gauge can get a different amount dYFI to emit.
- Based on their veYFI lock, users can boost their gauge rewards by up to 10x proportional to the number of vault tokens deposited, when they claim YFI rewards from gauges. The greater the amount of veYFI, the more vault deposits can be boosted for the user.
- The boost mechanism will calculate your earning weight by taking the smaller amount of two values, provided in the formula below:
  - Gauge boost formula: `min(AmountDeposited, (AmountDeposited /10) + (TotalDepositedInTheGauge * VeYFIBalance / VeYFITotalSupply * 0.9))`
- A claim with boost under 100% will send the leftover tokens to veYFI holders.

### Vault Gauges Table

| Index | Symbol | Name | Address |
| ------ | ------ | ---- | ------- |
| 0 | `yG-yvCurve-YFIETH` | yGauge Curve YFI-ETH Pool yVault | [`0x7Fd8Af959B54A677a1D8F92265Bd0714274C56a3`](https://etherscan.io/address/0x7Fd8Af959B54A677a1D8F92265Bd0714274C56a3) |
| 1 | `yG-yvCurve-dYFIETH-f-f` | yGauge Curve dYFIETH-f Factory yVault | [`0x28da6dE3e804bDdF0aD237CFA6048f2930D0b4Dc`](https://etherscan.io/address/0x28da6dE3e804bDdF0aD237CFA6048f2930D0b4Dc) |
| 2 | `yG-lp-yCRVv2` | yGauge LP Yearn CRV Vault v2 | [`0x107717C98C8125A94D3d2Cc82b86a1b705f3A27C`](https://etherscan.io/address/0x107717C98C8125A94D3d2Cc82b86a1b705f3A27C) |
| 3 | `yG-yvCurve-yETH-f` | yGauge Curve yETH Factory yVault | [`0x81d93531720d86f0491DeE7D03f30b3b5aC24e59`](https://etherscan.io/address/0x81d93531720d86f0491DeE7D03f30b3b5aC24e59) |
| 4 | `yG-lp-yPRISMA` | yGauge LP Yearn PRISMA Vault | [`0x6130E6cD924a40b24703407F246966D7435D4998`](https://etherscan.io/address/0x6130E6cD924a40b24703407F246966D7435D4998) |
| 5 | `yG-yvWETH-1` | yGauge WETH-1 yVault | [`0x5943F7090282Eb66575662EADf7C60a717a7cE4D`](https://etherscan.io/address/0x5943f7090282eb66575662eadf7c60a717a7ce4d) |
| 6 | `yG-yvUSDC-1` | yGauge USDC-1 yVault | [`0x622fA41799406B120f9a40dA843D358b7b2CFEE3`](https://etherscan.io/address/0x622fa41799406b120f9a40da843d358b7b2cfee3) |
| 7 | `yG-yvDAI-1`  | yGauge DAI-1 yVault  | [`0x128e72DfD8b00cbF9d12cB75E846AC87B83DdFc9`](https://etherscan.io/address/0x128e72DfD8b00cbF9d12cB75E846AC87B83DdFc9) |
| 8 | `yG-yvCurve-sdYFIv2-f` | yGauge Curve sdYFIv2 Factory yVault | [`0xB61F8fff8Dd8C438E0d61C07b5536cE3d728f660`](https://etherscan.io/token/0xB61F8fff8Dd8C438E0d61C07b5536cE3d728f660) |
| 9 | `yG-yvCurve-upYFI-f` | yGauge Curve upYFI Factory yVault | [`0xf719B2d3925CC445D2Bb67FA12963265E224Fa11`](https://etherscan.io/token/0xf719B2d3925CC445D2Bb67FA12963265E224Fa11) |

The above Gauges can be verified using the [YFI Gauge Registry](https://etherscan.io/address/0x1D0fdCb628b2f8c0e22354d45B3B2D4cE9936F8B#readContract) contract and querying the `gauges()` function with the index listed above.

### veYFI Reward Pool

- Users who lock veYFI can claim accumulated fees from the veYFI reward pool. The reward pool gets fees two ways: YFI from the veYFI early exit fee and the non-distributed gauge rewards due to a lack of full boost.

## Addresses

| Description        | Address                                                         |
|--------------------|-----------------------------------------------------------------|
| Gauge registry     | [`0x1D0fdCb628b2f8c0e22354d45B3B2D4cE9936F8B`](https://etherscan.io/address/0x1D0fdCb628b2f8c0e22354d45B3B2D4cE9936F8B) |
| Gauge controller   | [`0x46b38522422D597dDbAA2D6E98D6C9b397028d5B`](https://etherscan.io/address/0x46b38522422D597dDbAA2D6E98D6C9b397028d5B) |
| dYFI               | [`0x41252e8691e964f7de35156b68493bab6797a275`](https://etherscan.io/address/0x41252e8691e964f7de35156b68493bab6797a275) |
| dYFI Redemption    | [`0x7dC3A74F0684fc026f9163C6D5c3C99fda2cf60a`](https://etherscan.io/address/0x7dC3A74F0684fc026f9163C6D5c3C99fda2cf60a) |
| YFI Reward Pool    | [`0xb287a1964AEE422911c7b8409f5E5A273c1412fA`](https://etherscan.io/address/0xb287a1964AEE422911c7b8409f5E5A273c1412fA) |
| dYFI Reward Pool   | [`0x2391Fc8f5E417526338F5aa3968b1851C16D894E`](https://etherscan.io/address/0x2391Fc8f5E417526338F5aa3968b1851C16D894E) |
