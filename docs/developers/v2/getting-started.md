# Getting Started with Vaults and Strategies

## Requirements

Before you start, you will need to download and install the following requirements.

- git
- [eth-brownie](https://eth-brownie.readthedocs.io/en/stable/)
- [ganache](https://trufflesuite.com/ganache)
- Text editor (VS Code, Sublime Text, vim, others)

If you are focusing on a strategy, you have the choice of brownie and foundry template repos:

- [brownie-strategy-mix](https://github.com/yearn/brownie-strategy-mix) repository. 
- [foundry-strategy-mix](https://github.com/storming0x/foundry_strategy_mix) repository. (See Readme.MD for setup.)

If you want to integrate with our vaults:

- [BaseRouter](https://github.com/yearn/yearn-vaults/blob/main/contracts/BaseRouter.sol)
- [BaseWrapper](https://github.com/yearn/yearn-vaults/blob/main/contracts/BaseWrapper.sol)

## Overview of our vetting process

This is the short version of the vetting process for a new strategy.

1. Code the strategy using [brownie-strategy-mix](https://github.com/yearn/brownie-strategy-mix) repository
2. Complete peer review by, at least, 2 other strategists
3. Test in prod on [ape.tax](https://ape.tax) with real funds
4. Create a Due Diligence document for the protocol. Follow the example: [SNX](https://hackmd.io/0w1RZh7DSc27A9EyzlHbJQ?view)
5. Get the strategy approved by the Safe Farming Committee
6. Complete review by one internal auditor (includes internal risk score)
7. The strategy goes to prod

When the strategy has more than 3M-10M in TVL, it should improve it's risk score.

[Risk-score](https://docs.yearn.finance/resources/risks/risk-score) dimension: 1=best, 5=worst.

1. Improve risk score in dimensions like external audit, additional security reviews
[Internal Risk Dashboard](https://yearn.watch/network/ethereum/risk)
2. A required way to improve team knowledge score is to create a committee of 3 people with deep knowledge monitoring the strategy 24/7

When it's passed 50M in TVL

1. Audit by at least one reputable external audit company
1. Recurring internal reviews
1. External security assessments by experienced professional in security space

For more details, check the complete deployment [process](./DEPLOYMENT.md).
