# Overview

Yearn's V3 system is a decentralized suite of yield-generating products built to fit any need. It is designed to be un-opinionated and customizable infrastructure for the world to build on, making yield generation as safe, efficient, and easy as possible for all parties. Anyone can deploy a strategy or manage a vault. So whether you are a gas golfing expert, a degen looking to codify your personal yield farming strategy, or just an average crypto user looking to earn passive yield on your magical internet tokens, V3 is for you.

The most significant update to Yearn V3 from V2 was the introduction of "Tokenized Strategies". In V2, strategies are stand-alone contracts that are attached to one specific vault. Only that vault can deposit or withdraw funds from the strategy and there is a trusted relationship between them. In V3, strategies are now fully ERC-4626 compliant, stand-alone vaults. Though their job remains the same (generate yield from one external source), strategies can now be connected to many different vaults simultaneously and can also be deposited into directly by an end user.

## Definitions

- [Vault](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy): A vault or "Allocator Vault" in V3 refers to an ERC-4626 compliant contract that takes in user deposits, mints shares corresponding to the user's share of the underlying assets held in that vault, and then allocates the underlying asset to a range of different "strategies" that earn yield on that asset.
- Strategy: A strategy in V3 refers to a yield-generating contract added to a vault that has the needed [ERC-4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L40). The strategy takes the underlying asset and deploys it to a single source, generating yield on that asset.
- [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) A technical implementation of a Strategy that is also a stand-alone ERC4626 compliant Vault. These are the yield generators in the V3 ecosystem. This pattern can be used so that either Allocator Vaults or individual users can deposit directly into and receive shares in return.
- [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy): A factory contract deployed by Yearn Governance that anyone can use to easily and trustlessly deploy new Allocator Vaults. Each Allocator Vault release will have its own factory.

## Get started

- [Integrating V3](/developers/v3/integrating_v3)
- [Periphery Contracts](/developers/v3/periphery)
- [Protocol Fees](/developers/v3/protocol_fees)
- [Deploying and managing a V3 Vault](/developers/v3/vault_management)
- [Building your own V3 Strategy](/developers/v3/strategy_writing_guide)

## Core Contract Addresses

Core contracts are the base generic contracts that can be used by anyone wanting to build on vaults V3.

:::note

Deployments are done using create2 factories and should be stable across all EVM chains the protocol has been deployed on.

:::

- Protocol Address Provider: `0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B`

**Note**: All other generic Periphery contracts and factories can be retrieved on chain from the Address Provider

### Version 3.0.2

- Vault original : `0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467`
- VaultFactory : `0x444045c5C13C246e117eD36437303cac8E250aB0`
- TokenizedStrategy : `0xBB51273D6c746910C7C06fe718f30c936170feD0`

### Version 3.0.1

- Vault BluePrint: `0xDE992C652b266AE649FEC8048aFC35954Bee6145`
- VaultFactory: `0xE9E8C89c8Fc7E8b8F23425688eb68987231178e5`
- TokenizedStrategy: `0xDFC8cD9F2f2d306b7C0d109F005DF661E14f4ff2`

For Yearn specific implementation addresses check [Contract Addresses](https://docs.yearn.fi/getting-started/products/addresses)

**If a contract has not been deployed on a specific chain it can be done permissionlessly using the scripts in the relevant GitHub repo. Or reach out to a Yearn contributor for help.**
