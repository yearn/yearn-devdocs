# Overview

This is a collection of resources that aim to be an introduction to how yVaults V3 works.

## Introduction

Yearn's V3 system is designed to be un-opinionated and customizable infrastructure for anyone to easily build on, making yield generation as safe, efficient, and easy as possible for all parties. It is built to allow anyone and everyone who wants to build a strategy or manage vaults to easily do so. It is a decentralized suite of yield-generating products that fit any need. So whether you are a gas golfing expert, a degen looking to codify your personal yield farming strategy, or just an average crypto user looking to earn passive yield on your magical internet tokens, V3 is for you.

## Definitions

- [Vault](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy): A vault or "Allocator Vault" in V3 refers to an ERC-4626 compliant contract that takes in user deposits, mints shares corresponding to the user's share of the underlying assets held in that vault, and then allocates the underlying asset to a range of different "strategies" that earn yield on that asset.
- Strategy: A strategy in V3 refers to a yield-generating contract added to a vault that has the needed [ERC-4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L40). The strategy takes the underlying asset and deploys it to a single source, generating yield on that asset.
- [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) A technical implementation of a Strategy that is also a stand-alone ERC4626 compliant Vault. These are the yield generators in the V3 ecosystem. This pattern can be used so that either Allocator Vaults or individual users can deposit directly into and receive shares in return.
- [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy): A factory contract deployed by Yearn Governance that all Allocator Vaults of a specific version can be easily and trustlessly deployed from.

## Get started

- [Building your own V3 Strategy](https://docs.yearn.fi/developers/v3/strategy_writing_guide)
- [Deploying and managing a V3 Vault](https://docs.yearn.fi/developers/v3/vault_management)
- [Protocol Fees](https://docs.yearn.fi/developers/v3/protocol_fees)

## Deployed Contract Addresses

**:information_source: Note**: Deployments are done using create2 factories and should be stable across all EVM chains the protocol has been deployed on.

### Core

#### Version 3.0.2

- Vault original : `0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467`
- VaultFactory : `0x444045c5C13C246e117eD36437303cac8E250aB0`
- TokenizedStrategy : `0xBB51273D6c746910C7C06fe718f30c936170feD0`
- Protocol Address Provider: `0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B`

**If a contract has not been deployed on a specific chain it can be done permissionlessly using the scripts in the relevant GitHub repo. Or reach out to a Yearn contributor for help.**
