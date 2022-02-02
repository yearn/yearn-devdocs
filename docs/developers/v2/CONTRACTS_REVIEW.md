# Smart Contracts Review Guideline

---

## Goals

This document specifies some guidelines to develop smart contracts and essential considerations when we do security reviews.

The information described here applies not ONLY to strategies (our main point of risk); if not, the main goal is to help all yDoers that develop or review contracts, especially Solidity.

The main goals are:

- Apply the best practices on developing smart contracts.
- Document our experiences as learning lessons to mitigate risks and new attack vectors.
- Reduce risks to get rekt on mainnet.
- Discover potential issues, bugs, or exploits in the development or review phase.
- Learn about the hacks or exploits that occurred in the DeFi ecosystem during the last months or years.

This document is based on:

- The experience that the Yearn team has reached out to developing smart contracts and helping other protocols to mitigate risks.
- Third sources (website, posts, and others). See more info in the `Sources` section.

## Considerations

### Solidity Version

Most smart contracts are built in Solidity (except the core contracts) and use the `0.6.12` version.

> In new Solidity versions, some considerations are not required.

## Formatting & Naming Conventions

All of us are working remotely, and each of us has different ways to develop smart contracts. So, it is extremelly important to get a standard and a naming convention for developing the smart contracts.

### Formating

The linting or formatting the smart contract is a very important action to make them more readable, clear and easy to understand.

In our [Brownie Strategy Mix repo](https://github.com/yearn/brownie-strategy-mix) we use [Pretty Quick](https://www.npmjs.com/package/pretty-quick).

To lint the contracts, you just need to execute the command:

`yarn lint`

> Before executing the CLI, you need to install the dependencies using `yarn install`.

### Naming Conventions

#### Internal or Private Functions

To make the contracts more clear, a good practice is to add the `_` prefix to all the internal or private functions.
So, for example for this function

```javascript=
function myFunction() internal {
    ...
}
```

We should use:

```javascript=
function _myFunction() internal {
    ...
}
```

#### Use Constants

Avoid using magic numbers or values. Instead, use constants with a meaningful name (in **uppercase**).

Instead of

```javascript=
function myFunction() public {
    ...
    uint256 value = aValue.mul(1234);
    ...
}
```

use
```javascript=

// Add a sentence describing what this constant means.
uint256 public constant VALUE_MULTIPLIER = 1234;
...
...
function myFunction() public {
    ...
    uint256 value = aValue.mul(VALUE_MULTIPLIER);
    ...
}
```

## Best Practices

### Reduce Bytecode Size

#### Use libraries

One option is creating libraries because it encapsulates logic (move logic from the contract itself to the library) and reduces the strategy bytecode size.

References:

#### Use Interfaces

If the contract interacts with multiple protocols, you should use interfaces to interact with them instead of using the contract itself.

### Assert Returns values

We must assert the returned values in any external call to check that the call was successful.

```solidity=
uint256 value = externalContract.externalFunction(param1, ...paramN);
require(value > 0, "invalid external value");
```

### Variables - Naming Convention

In order to make the code more clear and readable, we need to identify the unit in the variables that express amounts.

Example:

- `amountInWant`, `balanceInYShares`, etc.

### Multiple Routers

In case we need to use multiple routers to swap tokens, we should use this approach:

- Create constants for the router addresses.
- Create a variable `boolean useUniswap` or similar.
- Create a external/public function to switch the `useUniswap` value.
- To get the router, use:
    - `Router router = useUniswap ? uniswapRouter : sushiswapRouter;`

See example [here](https://github.com/therealmonoloco/geist-lender-borrower/blob/master/contracts/Strategy.sol#L158).

## Github Issues

Use a new branch for each new strategy. Some old comments have references to lines of codes in branches that were already modified. It is more complicated to follow the comment when it happens.

## Known Issues

- If the strategy uses another vault, we should add the maxLoss setting. See comment [here](https://github.com/jmonteer/yearnV2-strat-SNX-staking/pull/9#issuecomment-872376640).
- *Strategy*.*liquidatePosition* function: This condition must be true. `amountNeeded == liquidatedAmount + loss`
- **Must** have the health check address set.
    - [Example for Fantom](https://github.com/flashfish0x/Strategy0xDAOStaker/blob/ripae/contracts/GenericMasterChefStrategy.sol#L210)
    - [Example for Ethereum](https://github.com/tonkers-kuma/strategy-ssb/blob/main/contracts/Strategy.sol#L93)
- **Must** use the `SafeMath` library to do calculations in the Solidity version `0.6.x`.
    - The over/underflow issues are fixed in the Solidity version `0.8.x`.
    - The `BaseStrategy` already imports and declares the `SafeMath` and `SafeERC20` libraries, so you don't need to use the `using SafeMath for uint` statement. The same with `SafeERC20`.

## Tools

- [ETH Security Tools](https://www.ethsecurity.org/research-and-developer-resources/tools)
- Trail of Bits Tools
    - [Slither](https://github.com/crytic/slither)
    - [Manticore](https://github.com/trailofbits/manticore)
    - [Echidna](https://github.com/crytic/echidna)
    - [Docker Image with all ToB tools](https://github.com/trailofbits/eth-security-toolbox/)


## Required Checklists

Each strategy must pass two checklist verifications, a general checklist and another one depending on its type. Both checklists are ***required*** to deploy the strategy on any mainnet network.

### General

These posts describe the most important considerations on security reviews.

- [Stackoverflow - Security Review on Smart Contracts](https://ethereum.stackexchange.com/questions/8551/security-review-checklist-for-a-smart-contract)
- [Sushiswap - Multiple Checks](https://github.com/sushiswap/bentobox/blob/master/documentation/checks.txt)
- [Not Only Owner - Intro Security Hacking Smart Contracts](https://www.notonlyowner.com/learn/intro-security-hacking-smart-contracts-ethereum)

### Strategies

#### Single Sided LPs Strategies

- Item 1
- Item 2

#### Leveraged Strategies

- Item 1
- Item 2

#### Joint / Hedged Strategies

- Item 1
- Item 2

#### Fixed Rate Strategies

- Item 1
- Item 2

#### MasterChef Strategies

- Item 1
- Item 2

## Sources

- [Explained XToken Hack](https://halborn.com/explained-the-xtoken-hack-august-2021/)
- [BzX Network Post Mortem](https://bzx.network/blog/post-mortem-update)
- [Harvest Finance Uninitialized Proxies](https://medium.com/immunefi/harvest-finance-uninitialized-proxies-bug-fix-postmortem-ea5c0f7af96b)
- [Uniswap V3: Risk Analysis for TWAP](https://twitter.com/mudit__gupta/status/1459340913751117826?s=21)
- [Minimal Proxies - Reasons Why You Should Use EIP1167](https://medium.com/taipei-ethereum-meetup/reason-why-you-should-use-eip1167-proxy-contract-with-tutorial-cbb776d98e53)
- [Origin Protocol - Understanding Minimal Proxies](https://blog.originprotocol.com/a-minimal-proxy-in-the-wild-ae3f7b8da990)
- [Open Zeppelin - Understanding Minimal Proxies](https://blog.openzeppelin.com/deep-dive-into-the-minimal-proxy-contract/)
- [Open Zeppelin - Creation vs Runtime Code](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-ii-creation-vs-runtime-6b9d60ecb44c/)
- [Not Only Owner - Spanish & English](https://twitter.com/tinchoabbate/status/1433435829372850180?s=21)
- [Twitter Thread - How Your Crypto Fund or Exchange Gets Hacked](https://twitter.com/moo9000/status/1448967076698333192?s=21)
---