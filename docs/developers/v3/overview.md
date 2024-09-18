# yVaults v3

Yearn's V3 system is a decentralized suite of yield-generating products built to fit any need. It is designed to be un-opinionated and customizable infrastructure for the world to build on, making yield generation as safe, efficient, and easy as possible for all parties. Anyone can deploy a strategy or manage a vault. So whether you are a gas golfing expert, a degen looking to codify your personal yield farming strategy, or just an average crypto user looking to earn passive yield on your magical internet tokens, V3 is for you.

V3 is a drastically more modular design than V2. Meaning that the core vaults will serve as generic contracts that handle the base vault functionality. Then there are many optional "periphery" contracts such as [Accountants](/developers/v3/periphery#accountant) that charge fees, or [Debt Allocators](/developers/v3/periphery#debt-allocator) that manage debt allocations that can be added on or customized for complete freedom and customization of the vaults functionality.

The most significant update to Yearn V3 from V2 was the introduction of "Tokenized Strategies". In V2, strategies are stand-alone contracts that are attached to one specific vault. Only that vault can deposit or withdraw funds from the strategy and there is a trusted relationship between them. In V3, strategies are now fully ERC-4626 compliant, stand-alone vaults. Though their job remains the same (generate yield from one external source), strategies can now be connected to many different vaults simultaneously and can also be deposited into directly by an end user.

## Definitions

- [Vault](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy): A vault or "Allocator Vault" in V3 refers to an ERC-4626 compliant contract that takes in user deposits, mints shares corresponding to the user's share of the underlying assets held in that vault, and then allocates the underlying asset to an array of different "strategies" that earn yield on that asset.

- Strategy: A strategy in V3 refers to a yield-generating contract added to a vault that has the needed [ERC-4626 interface](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L40). The strategy takes the underlying asset and deploys it to a single source, generating yield on that asset.

- [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) A technical implementation of a Strategy that is also a stand-alone ERC-4626 compliant Vault. These are the yield generators in the V3 ecosystem. This pattern can be used so that either Allocator Vaults or individual users can deposit directly into and receive shares in return.

- [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy): A factory contract deployed by Yearn Governance that anyone can use to easily and trustlessly deploy new Allocator Vaults. Each Allocator Vault release will have its own factory.

![image](/img/diagrams/yvaults-v3-more-detail.png)

## Periphery Contracts

V3 incorporates periphery contracts, which are extensible code blocks that can be attached to a yVault or work alongside it to extend functionality over and beyond core base logic. They are not required but can facilitate building around yVaults.

A few examples of periphery contracts used in V3 are:

- **4626 Router**: Wrapper that handles deposits and withdrawals to/from all vaults and strategies.
- **Registry**: Handles adding and tracking strategies and vaults.
- **Debt Allocator**: Can efficiently allocate debt to different strategies. Added to a Allocator Vault for the best yield opportunities.
- **Accountant**: Handles changing fees for vault operations.
- **Deposit/Withdraw Limit Modules**: Allows dynamic control over a vaults deposit or withdraw limits for full customization.
- **Swappers**: Pre-built contracts for strategies to inherit to easily implement their desired swap logic.
- **APR Oracles**: Retrieve the expected current APY on-chain for different vaults or strategies to properly allocate debt.
- And any others you can come up with!

To read more about the periphery contracts or where to find the curren versions click [here](./periphery.md)

## Get started

- [Integrating V3](/developers/v3/integrating_v3)
- [Building your own V3 Strategy](/developers/v3/strategy_writing_guide)
- [Deploying and managing a V3 Vault](/developers/v3/vault_management)
- [Periphery Contracts](/developers/v3/periphery)
- [Protocol Fees](/developers/v3/protocol_fees)

To find deployed contracts see [Contract Addresses](/developers/addresses/v3-contracts)

**If a contract has not been deployed on a specific chain it can be done permissionlessly using the scripts in the relevant GitHub repo. Or reach out to a Yearn contributor for help.**

## Additional Links

[yVaults v3 GitHub Repo](https://github.com/yearn/yearn-vaults-v3)  
[VaultV3 Specification](https://github.com/yearn/yearn-vaults-v3/blob/master/TECH_SPEC.md)  
[Tokenized Strategy GitHub Repo](https://github.com/yearn/tokenized-strategy)  
[Tokenized Strategy Specification](https://github.com/yearn/tokenized-strategy/blob/master/SPECIFICATION.md)  
[V3 Design Article](https://medium.com/iearn/yearnv3-motivation-and-design-107840cb4844)  
[ERC4626 Info](https://erc4626.info/)  
[ERC4626 EIP](https://eips.ethereum.org/EIPS/eip-4626)  
