# Overview

This is a collection of resources that aim to be an introduction to how yVaults V3 works.

## Introduction

Yearns V3 system is designed to be an un-opinionated and customizable infrastructure for anyone to easily build on, making generating yield safely and efficiently as easy as possible for all parties involved.

V3 is built in the hopes of opening up the gates to allow anyone and everyone who wants to build a strategy or manage vaults to be easily able to do so. It allows for a more decentralized suite of yield-generating products that fit any needs.

So whether you are a full-blown gas golfing expert, a degen looking to codify your personal yield farming, or just an average crypto user looking to earn passive yield on your magical internet tokens, V3 is for you.

## Definitions

- [Vault](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy): A vault or "Allocator Vault" in V3 refers to an ERC-4626 compliant contract that takes in user deposits, mints shares corresponding to the user's share of the underlying assets held in that vault, and then allocates the underlying asset to a range of different "strategies" that earn yield on that asset. 
- Strategy: A strategy in V3 refers to a yield-generating contract added to a vault that has the needed [ERC-4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L40). The strategy takes the underlying asset and deploys it to a single source, generating yield on that asset.
- [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) A technical implementation of a Strategy that is also a stand-alone ERC4626 compliant Vault. These are the yield generators in the V3 ecosystem. This pattern can be used so that either Allocator Vaults or individual users can deposit directly into and receive shares in return. 
- [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy): A factory contract deployed by Yearn Governance that all Allocator Vaults of a specific version can be easily and trustlessly deployed from.


## Get started

- [Building your own V3 Strategy](https://docs.yearn.fi/developers/v3/strategy_writing_guide)
- [Deploying and managing a V3 Vault](https://docs.yearn.fi/developers/v3/vault_management)
- [Protocol Fees](https://docs.yearn.fi/developers/v3/protocol_fees)


## Contract Addresses

*Deployments are done using create2 factories and should be stable across all EVM chains the protocol has been deployed on. 

### Core

#### Version 3.0.2:
- Vault original : `0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467`
- VaultFactory : `0x444045c5C13C246e117eD36437303cac8E250aB0`
- TokenizedStrategy : `0xBB51273D6c746910C7C06fe718f30c936170feD0`

- Periphery Address Provider: `0xB1662c1E500610F5D14B8041FD5306bbD3D8EdEe`

**If a contract has not been deployed on a specific chain it can be done permissionlessly using the scripts in the relevant GitHub repo. Or reach out to a Yearn contributor for help.**
