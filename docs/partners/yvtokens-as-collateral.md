# yvToken as Collateral

## Overview of Yearn Vaults as Collateral

Yearn vault tokens are yield-generating wrappers around underlying assets.
Ideally, they are a great way to hold collateral because they are secure and grow in value over time rather than remaining as idle capital.

However, there are some risks to consider with some implementations of Yearn vaults before onboarding them as a collateral type in lending markets.

Aside from obvious risks involved with smart contracts (including the vault contract itself, it’s strategies, and protocols farmed by the strategy), lending protocols should also study the risks involved with how a vault’s pricePerShare is calculated, as this function is important in computing the vault token’s value.

## Why Use yvTokens as Collateral?

### They’re Yield Generating

A Yearn Vault token is a yield-bearing version of a token, so when locked up as collateral it will still generate yield. A single vault token can run up to 20 yield-generating strategies. All Vaults at [yearn.fi](https://yearn.fi/#/vaults) run "up-only" strategies.

### The Safest Yields in DeFi

Vaults strategies are constantly audited to practice the highest security standards of DeFi. Grow with us one day at a time. More information at:

* [Vaults & Strategies Deployment Security Guidelines](https://docs.yearn.fi/developers/v2/DEPLOYMENT)
* [Yearning for Yearn: Messari Report](https://messari.io/article/yearning-for-yearn)
* [Yearn Security Processes](https://github.com/yearn/yearn-security/blob/master/SECURITY.md)

### They’re ERC20 Compatible

yvTokens are [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) compatible (like any other commonly expected token), there is no code security overhead for developers to implement any yvToken as a new option for collateral.

### V3 vaults are ERC4626 Compatible

V3 yvTokens are [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) compatible, there is no code security overhead for developers to implement any yvToken as a new option for collateral.

### Many are Almost 100% Liquid

In most Yearn vaults strategies that lock tokens are kept to a minimum amount of time. To learn more about strategy and fund allocation visit [seafood.yearn.watch](https://seafood.yearn.watch/) for a look into what's going on right now.

Some vaults do implement stratgies that will be less liquid and integrators should be aware of the stated goals of the vault they are integrating before hand.

### They’re Transparent

What you see on-chain is what you get. For real-time protocol data see:

* [yearn vaults descriptions](https://vaults.yearn.fi/)
* [seafood.yearn.watch](https://seafood.yearn.watch/)
* [yearn at dune analytics](https://dune.com/projects/yearn)
* [diving into yearn metrics](https://medium.com/iearn/diving-into-yearn-metrics-8c3fb0520927)

## Projects Using yvTokens as Collateral

* Alchemix: https://alchemix.fi/
* Abracadabra: https://abracadabra.money/
* Element: https://www.element.fi/
* Gearbox: https://gearbox.fi/
* QiDao: https://app.mai.finance/
* Ribbon: https://www.ribbon.finance/
* Sturdy: https://sturdy.finance/
* Tempus: https://tempus.finance/

To learn more reach out through twitter, telegram or discord.

## Oracle Safety and PricePerShare Calculations

Critical to the safety of integrating yvTokens is the ability of an attacker to affect pricePerShare of the vault being used..

Beginning in API version 0.4.4, Yearn vaults introduced a feature called “Airdrop Protection”, which prevents pricePerShare changes when tokens are transferred directly to the vault contract. This practice is continued into V3 on both the multi strategy and single strategy vaults.

While the airdrop protection limits the majority of pricePerShare concerns, both Yearn v2 and v3 vaults follow similar rounding practices from common vault standards that can lead to PPS inflation attacks seen in other protocols recently through "sleath donations".

[Read More](https://www.euler.finance/blog/exchange-rate-manipulation-in-erc4626-vaults) about known issues with vault exchange rate manipulation.

It is important to note that, as of now, it seems effects of these type of attacks are only meaningful when vaults are almost or entirely empty of assets.

Out of an abundance of caution anyone using a Yearn vault as collateral should be aware of this and take any needed steps to assure the health of their system.

## Concerns

- A vault is empty or almost empty
- A vault is held almost entirely by one entity
- The majority of outstanding vault shares can be flashloaned or borrowed
- The amount available to borrow is priced purely by the current `pricePerShare` with no extra checks

## Suggestions

### Vault Tokens with API Version <= v0.4.3

* Not recommended for protocols without isolated lending markets and configurable borrow limits
* Not recommended for vaults with low TVL

### Vault Tokens with API Version >= v0.4.4 and all V3 vaults.

- Limit use of vaults that have 0 or almost 0 assets.
- Do not allow vaults to be flashloaned or borrowed.
- Limit use of vaults who have one majority owner of the shares.
- Be mindful that PricePerShare may be subject to significant change within a single block. Treat the pricePerShare of the vault as you would other touch values.

## Hacks History

The [CREAM hack in 2021](https://github.com/yearn/yearn-security/blob/master/disclosures/2021-10-27.md) proved that without proper care, an attacker could trick the lending market into thinking they have a far larger position than reality. This led to a tragic $130M loss for the protocol. Technical reference: https://mudit.blog/cream-hack-analysis/

## Disclaimer:

Although this document presents some suggestions for integrating yearn vaults into your protocol it is NOT an exhaustive list and does not guarantee any outcomes or safety.

It's strongly advised that any integration's with Yearn vaults be reviewed/audited by experienced security professionals within the context of your specific use case and consider past attacks to similar vault contracts and implementations.