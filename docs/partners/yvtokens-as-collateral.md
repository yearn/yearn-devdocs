# yvToken as Collateral

## Overview of Yearn Vaults as Collateral

Yearn vault tokens are yield-generating wrappers around underlying assets.
Ideally, they are a great way to hold collateral because they are secure and grow in value over time rather than remaining as idle capital.

However, there are some risks to consider with some implementations of Yearn vaults before onboarding them as a collateral type in lending markets.

Aside from obvious risks involved with smart contracts (including the vault contract itself, it’s strategies, and protocols farmed by the strategy), lending protocols should also study the risks involved with how a vault’s pricePerShare is calculated, as this function is important in computing the vault token’s value.

## Why Use yvTokens as Collateral?

### They’re Yield Generating

A Yearn Vault token is a yield-bearing version of a token, so when locked up as collateral it will still generate yield. A single vault token can run up to 20 yield-generating strategies. All Vaults at [yearn.finance main website](https://yearn.finance/#/vaults) run "up-only" strategies.

### The Safest Yields in DeFi

Vaults strategies are constantly audited to practice the highest security standards of DeFi. Grow with us one day at a time. More information at:

* [Vaults & Strategies Deployment Security Guidelines](https://docs.yearn.finance/developers/v2/DEPLOYMENT)
* [Yearning for Yearn: Messari Report](https://messari.io/article/yearning-for-yearn)
* [Yearn Security Processes](https://github.com/yearn/yearn-security/blob/master/SECURITY.md)

### Split Fees with Yearn

Yearn's fee-sharing partner [program](https://docs.yearn.finance/partners/introduction) allows you to earn up to 50% of the fees generated on your users' TVL every month. We are in this together.

### They’re ERC20 Compatible

yvTokens are [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) compatible (like any other commonly expected token), there is no code security overhead for developers to implement any yvToken as a new option for collateral

### They’re Almost 100% Liquid

Strategies that lock tokens are kept to an absolute minimum amount of time. To learn more about strategy and fund allocation visit [yearn.watch](https://yearn.watch/) for a look into what's going on right now.

### They’re Transparent

What you see on-chain is what you get. For real-time protocol data see:

* [yearn vaults descriptions](https://vaults.yearn.finance/)
* [yearn.watch](https://yearn.watch/)
* [yearn.vision](https://yearn.vision/) 
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

To learn more reach out through https://yearnfinance.typeform.com/to/uP7xOJUN

## Hacks History

The [CREAM hack in 2021](https://github.com/yearn/yearn-security/blob/master/disclosures/2021-10-27.md) proved that without proper care, an attacker could trick the lending market into thinking they have a far larger position than reality. This led to a tragic $130M loss for the protocol. Technical reference: https://mudit.blog/cream-hack-analysis/

## Oracle Safety and PricePerShare Calculations

Critical to the hack cited above is the ability of an attacker to affect pricePerShare by transferring the vaults’ underlying token directly to the vault contract.

While this does not affect the accuracy/reliability of the vault token pricing, it can be used by an attacker to trick a lending market while leveraging up their position.

Beginning in API version 0.4.4, Yearn vaults introduced a feature called “Airdrop Protection”, which prevents pricePerShare changes when tokens are transferred directly to the vault contract.

## Recommendations

### Vault Tokens with API Version <= v0.4.3

* ⚠️ Not recommended for protocols without isolated lending markets and configurable borrow limits
* ⚠️ Not recommended for vaults with low TVL

### Vault Tokens with API Version >= v0.4.4

* ✅ There are no known ways for a public user to manipulate pricePerShare, and therefore v0.4.4+ is determined to be a much safer collateral type for all types of markets.
