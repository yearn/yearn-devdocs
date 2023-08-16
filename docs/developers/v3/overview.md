# Overview

This is a collection of resources that aim to be an introduction to how yVaults V3 work.

## Introduction

The architecture of V3 is an improved version of V2, with increased customization and features. For a complete intro guide of V2 see [here](https://docs.yearn.finance/developers/v2/additional-resources).

Yearns V3 system is designed to be an un-opinionated and customizable infrastructure for anyone to easily build on to make the task of generating yield in a safe and efficient manner as easy as possible for all parties involved. 

V3 is built in the hopes of opening up the gates to allow anyone and everyone who wants to build their own strategy or manage their own vaults to easily be able to. Allowing for a greater and more decentralized suite of yield generating products that fit any needs. 

So whether you are a full blown gas golfing expert, a degen looking to codify your personal yield farming or just an average crypto user looking to earn some passive yield on your magical internet tokens V3 is for you.

## Definitions
- [Vault](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy) : A vault or "Meta Vault" in V3 refers to a ERC-4626 compliant contract that takes in user deposits, mints shares corresponding to the users share of the underlying assets held in that vault and then allocates the underlying asset to a range of different "strategies" that earn yield on that asset. 
- Strategy: A strategy in V3 refers to a yield generating contract added to a vault that has the needed [ERC-4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L39). The strategy takes the underlying asset and deploys it in a single source in order to generate yield on that asset.
- [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol#L14-L26) A technical implementation of a Strategy that is also a stand-alone ERC4626 compliant Vault. These are the yield generators in the V3 ecosystem. This pattern can be used so that either meta vaults or individual users can deposit directly into and receive shares in return. 
- [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy) : A factory contract deployed by Yearn Governance that all Vaults of a specific version can be easily and trustlessly deployed from.


## Get started

- [Building your own V3 Strategy](./strategy_development.md)
- [Deploying and managing a V3 Vault](./vault_management.md)
- [Protocol Fees](./protocol_fees.md)


## Contract Addresses
### Core

#### VERSION 3.0.0:
- Vault BluePrint: `0xfC49ca826f8C68c0345410fcA0c7d1e0550d9ee9`
- VaultFactory: `0xD1736eBbdefae37503F3eD8D718b61a494F24c1D`
- TokenizedStrategy: `0xAE69a93945133c00B9985D9361A1cd882d107622`

### Periphery
 - Address Provider : ``
 - Router : `0x1112dbCF805682e828606f74AB717abf4b4FD8DE`
 - Release Registry: `0x5a6E1eCC767d949D6da74e76b05DBB4870488ef6`
 - Registry Factory: `0xe0aFFaC3D8e7CBac1e73FCBD0281C3FD2B2cC2a5`
 - Common Report Trigger: `0x4D25b3aed34eC1222846F6C87e2ac4A73f4ab6b6`


## Other reading material
