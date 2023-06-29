# Overview

This is a collection of resources that aim to be an introduction to how yVaults V3 work.

## Introduction

The architecture V3 is an improved version of V2, with increased customizability and features. For a complete intro guide of V2 see [here](https://docs.yearn.finance/developers/v2/additional-resources).

Yearns V3 system is designed to be an un-opinionated and customizable infrastructure for anyone to easily build on to make the task of generating yield in a safe and efficient manner as easy as possible for all parties involved. 


V3 is built in the hopes of opening up the gates to allow anyone and everyone who wants to build their own strategy or manage their own vaults to easily be able to. Allowing for a greater and more decentralized suite of yield generating products that fit any needs. 

So whether you are a full blown solidity gas golfing expert, a degen looking to codify your personal yield farming or just an average crypto user looking to earn some passive yield on your magical internet tokens V3 is for you.

## Definitions
- [Vault](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy) : A vault or "Meta Vault" in V3 refers to a ERC-4626 compliant contract that takes in user deposits, mints shares corresponding to the users share of the underlying assets held in that vault and then allocates the underlying asset to a range of different "strategies" that earn yield on that asset. 
- [Strategy](https://github.com/yearn/tokenized-strategy) : A strategy or "Tokenized Strategy" in V3 refers to a ERC-4626 compliant contract that utilizes the [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol#L14-L26) pattern that either meta vaults or individual users can deposit directly into and receive shares in return. The strategy takes the underlying asset and deploys it in a single source in order to generate yield on that asset.
- [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy) : A factory contract deployed by Yearn Governance that all Vaults of a specific version can be easily and trustlessly deployed from.


## Get started

- [Deploying and managing a V3 Vault](link)
- [Building your own V3 Strategy](link)
- [Integrate with V3](link)

## Other reading material

This is a complement to the others but it's not directly related to creating strategies.

- [The Keep3r Network](https://macarse.medium.com/the-keep3r-network-experiment-bb1c5182bda3)
- [Andre intro to Yearn Vaults](https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613)
