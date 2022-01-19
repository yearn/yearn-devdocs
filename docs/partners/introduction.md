---
title: Partnership Program
---

Yearn's partnership program allows developers to easily integrate yield into their own services.

In an effort to make yVaults accessible from virtually anywhere, any protocol that integrates yVaults can earn up to a 50% profit share from their contributed TVL. The Partnership program is being tested, audited, and we’ll commence a gradual release with selected Partners over the coming months.

If you are interested in partnering with us, we’d love to hear from you! Please reach out to us through this [Yearn Partners form](https://yearnfinance.typeform.com/to/uP7xOJUN).

# Eligibility

Yearn's Partnership Program is focused on protocols which want to build on top of Yearn's products. We firmly believe that the value a protocol brings to the community, and the ecosystem, is more than just funds parked in a vault. To this end, we work closely with our partners to integrate and form a mutually beneficial relationship to add value to both protocols.

# Profit Share Model

We offer profit shares based on yield generated across all vaults. For now, we are paying out profit shares manually, retroactively, but we want to move it on-chain as the program matures.

Profit-sharing is paid out in the native token of the vaults that partners are utilizing.

Yearn partner's profit works like this:
* Yearn charges a **2% yearly management fee over the vault TVL**
* **10% of the yield generated** by the vault is sent directly to the vault's strategist
* **10% of the yield generated** by the vault is split as:
    * **35% is operational costs** and goes to Yearn
    * **65% is profit** which is then shared with our partner according to the [Profit-Sharing Tier Table](#Profit-Sharing-Tier-Table)


Tiers are what determine the percentage of profit-sharing with the partner. They are calculated based on the total TVL provided across all vaults:

# Profit-Sharing Tier Table

| Tier | TVL contributed | Profit Share |
| -------- | -------- | -------- |
| 1     | $1m-5m     | 10%     |
| 2     | $5m-$10m     | 15%     |
| 3     | $10-50m     | 20%     |
| 4     | $50-$100m     | 25%     |
| 5     | $100-$200m     | 30%     |
| 6     | $200-400m     | 35%     |
| 7     | $400-700m     | 40%     |
| 8     | $700-1bn     | 45%     |
| 9     | >$1bn     | 50%     |

# Example Partner Profit Sharing Case

Here is an example case on how yearn would share profits with a partner, the values won't match production ones but it helps to understand the entire flow:

Let's say a partner protocol contributes to Yearn during a year with:

**$10.000.000 Total Locked Value**

which generated a total yield of

**$1.000.000 Anual Yield**

Here is how we calculate and distribute fees then:

- **2% of the vaults TVL ($200,000)** goes to Yearn every year (management fee)
- **10% of yield ($100,000)** goes to Yearn (performance fee)
- **10% of yield ($100,000)** goes to the strategist vault (performance fee)

Let's breakdown on the management and performance fees that yearn took in the process at the moment (which sums $300,000)

* **35% ($105,000)** goes to Yearn as operational costs
* **65% ($195,000)** is shared with the partner according to the tier table

Since the partner contributed with **$10.000.000 TVL** it fits in **tier 3** in the [Profit-Sharing Tier Table](#Profit-Sharing-Tier-Table)

| Tier | TVL contributed | Profit Share |
| -------- | -------- | -------- |
| 3     | $10-50m     | 20%     |

So the partner would receive in this case **20% of $195,000, so $39,000** of profit-sharing
