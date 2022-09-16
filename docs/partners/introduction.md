---
title: Partnership Program
---

Yearn's partnership program allows developers to easily integrate yield into their own services.

To make yVaults accessible from virtually anywhere, any protocol that integrates yVaults can earn up to a 50% profit share from their contributed TVL. The Partnership program is being tested and audited as we currently work with a range of partners.

If you are interested in partnering with us, we’d love to hear from you! Please reach out to us through this [Yearn Partners form](https://yearnfinance.typeform.com/to/uP7xOJUN).

# Eligibility

Yearn's Partnership Program is focused on protocols that want to build on top of Yearn's products. We firmly believe that the value a protocol brings to the community, and the ecosystem, is more than just funds parked in a vault. To this end, we work closely with our partners to integrate and form a mutually beneficial relationship to add value to both protocols.

# Profit Share Model

We offer profit shares based on yield generated across all vaults. For now, we are paying out profit shares manually, retroactively, but we want to move it on-chain as the program matures.

Profit-sharing is paid out in the native token of the vaults that partners are utilizing.

Yearn partner's profit works like this:
* Yearn fees for a vault can be checked at [yearn.watch](https://yearn.watch).
    * Management fee (if applied) is yearly charged from the vault's TVL
    * Performance fee is charged from the vault's strategies harvest profits
    * For example, checking DAI vault fees at yearn watch: ![](https://i.imgur.com/Ok6hfVJ.png)
* **45% of the fees generated** by both fees are set aside for operational expenses (salaries, infrastructure gas, etc)
* **55% of the fees generated** are split between the partner and Yearn based on the Profit-Sharing Tier Table below

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

Here is an example case of how yearn would share profits with a partner, the values won't match production ones but it helps to understand the entire flow:

Let's say a partner protocol contributes to Yearn during a year with:

**$10,000,000 Total Locked Value**

which generated a total yield of

**$1,000,000 Anual Yield**

Here is how we calculate management and performance fees:

- In this example the vault has a 2% management fee and a 20% performance fee:
    - 2% of the vaults yearly TVL ($200,000) goes to management fees
    - 20% of yield ($200,000) goes to performance fees

So out of the $400,000:

* **45% ($180,000)** are set apart as operational costs
* **55% ($220,000)** is shared with the partner according to the tier table

Since the partner contributed with **$10.000.000 TVL** it fits in **tier 3** in the [Profit-Sharing Tier Table](#Profit-Sharing-Tier-Table)

| Tier | TVL contributed | Profit Share |
| -------- | -------- | -------- |
| 3     | $10-50m     | 20%     |

The partner would receive in this case **20% of $220,000** which is **$44,000**
