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

## Current Errata

- **Pricing coverage:** The current indexed dataset contains 44,714 reports. Of these, 35,780 are priced and 8,934 are unpriced, for 80.02% report coverage. Among unpriced reports, 7,246 have positive P&L, 1,686 are zero, and two contain negative P&L of only one atomic token unit each. On current evidence, missing prices make LTE materially conservative.

- **Historical price distance:** The pricing adapter currently accepts the nearest returned DefiLlama observation without a maximum time-distance or past-only rule. There are 1,155 stored price observations more than one hour from their report timestamp, affecting 1,163 reports. Of these observations, 106 are more than one day away, the worst is 16.97 days away, and 596 are later than the report. A bounded, past-only pricing policy should replace this behavior.

- **Price retries:** Cached `missing`, `error`, or `skipped` price rows are not retried by the normal pricing command. The current dataset contains 8,808 missing DefiLlama price rows, 1,122 yprice errors, and 5,724 yprice skips, with no successful yprice recoveries. A controlled refresh policy is required.

- **Source selection:** Analysis currently prefers DefiLlama whenever both DefiLlama and yprice are successful, regardless of the command-line selected primary source. This does not affect the current snapshot because it contains no successful yprice rows, but each run should record and enforce its selected pricing policy.

- **Vault universe:** LTE covers the configured Yearn-managed universe, not every deployment of Yearn vault code. Independently managed V3 deployments, vaults removed from configured managers, unsupported chains, and V2 vaults outside the configured registries are not included. Every snapshot must publish its intended universe.

- **Incident precision:** Incident adjustments are currently keyed by transaction hash rather than by chain, transaction hash, and log index. Six configured transactions therefore classify seven reports. The extra report is zero-valued and does not change LTE, but its incident metadata is incorrect. One May 2021 adjustment also removes a 2.1797 wETH gain together with a documented artificial loss. That gain should be preserved or separately justified.

- **Artifact provenance:** The current exports can be reproduced byte-for-byte from the checked-in database and code, but the CSV files do not embed their run ID, timestamps, chain cutoffs, complete vault manifest, selected pricing source and price age, incident-rule version, or code commit. These fields should become standard release metadata.

## Sources

- [yearn-data source code and exports](https://github.com/schlagopi/yearn-data).
