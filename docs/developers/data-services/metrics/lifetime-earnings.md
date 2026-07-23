# Lifetime Earnings

Yearn Lifetime Earnings (LTE) measures the cumulative gross profit and loss (P&L) reported by indexed Yearn vault strategies, valued in USD at report time and adjusted for documented accounting incidents. **LTE is tracked as a durable measure of the economic output created by Yearn vaults across versions and chains.** It is deliberately gross, auditable, and conservative: it does not deduct fees, and reports without a reliable price do not enter the USD total.

TVL only shows how much capital Yearn manages today. **Lifetime Earnings shows how much economic value Yearn vaults have created over time.**

## Methodology

LTE begins with every indexed `StrategyReported` event in the defined vault universe.

For each report:

1. Read the strategy gain and loss in the vault's underlying asset.
1. Calculate reported P&L as `gain - loss`.
1. Apply explicit, publicly documented incident adjustments. Preserve raw values alongside adjusted values.
1. Value the adjusted gain and loss using the selected historical USD price at the report timestamp.
1. Exclude reports for which no acceptable USD price is available.
1. Aggregate priced P&L across reports, strategies, vaults, chains, and versions.

The current universe comprises Yearn V2 vaults discovered through two configured Ethereum registries and Yearn V3 vaults returned by configured role managers on Ethereum, Polygon, Base, Arbitrum, and Katana.

**Coverage begins March 16, 2021, the timestamp of the earliest indexed `StrategyReported` event.** Each included vault is indexed from its recorded deployment block. Coverage applies to the configured vault universe and does not represent Yearn activity outside that universe.

LTE is gross reported accounting P&L. It is not depositor return, revenue, TVL growth, or net earnings after fees. V3 accountant fees are generally paid through share issuance and therefore dilute existing shareholders without reducing a vault's reported gross strategy P&L. Depositor performance requires a separate share-price or time-weighted-return methodology.

Each LTE release should include its chain cutoffs, included vault universe, pricing policy, incident-rule version, code revision, and priced-report coverage.

## Sources

- [yearn-data source code and exports](https://github.com/schlagopi/yearn-data).
