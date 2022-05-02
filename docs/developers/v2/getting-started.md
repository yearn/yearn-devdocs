# Getting Started with Vaults and Strategies

## Requirements

Before you start, you will need to download and install the following requirements.

- git
- [eth-brownie](https://eth-brownie.readthedocs.io/en/stable/)
- [ganache](https://trufflesuite.com/ganache)
- Text editor (VS Code, Sublime Text, vim, others)

If you are focusing on a strategy:

- [brownie-strategy-mix](https://github.com/yearn/brownie-strategy-mix) repository. For vault integrations

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
6. Complete review by one internal auditor
7. The strategy goes to prod

When the strategy has more than 10M in TVL, it should

1. Create a committee of 3 people with deep knowledge monitoring the strategy 24/7

When it's passed 100M in TVL

1. Audit by one reputable external audit company
1. Recurring internal reviews

For more details, check the complete deployment [process](./DEPLOYMENT.md).
