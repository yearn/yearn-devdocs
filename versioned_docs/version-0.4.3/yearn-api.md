# Yearn API

### Production Endpoint

https://api.yearn.finance/v1/chains/1/vaults/all

### API Schema

| Field                       | Description                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `address`                   | Checksummed address of the vault                                                              |
| `inception`                 | The block number a vault was created at                                                       |
| `symbol`                    | Vault token symbol (used primarily in metamask)                                               |
| `name`                      | Vault token name                                                                              |
| `display_name`              | Vault name as displayed in UI (usually based on underlying symbol)                            |
| `icon`                      | Vault token icon url                                                                          |
| `token`                     | Underlying vault token metadata                                                               |
| `token.name`                | Underlying token name                                                                         |
| `token.symbol`              | Underlying token symbol                                                                       |
| `token.address`             | Underlying token address                                                                      |
| `token.decimals`            | Underlying token decimal amount                                                               |
| `token.display_name`        | Underlying token display name                                                                 |
| `token.icon`                | Underlying token icon (usually used as vault dispaly icon)                                    |
| `tvl`                       | TVL information about a vault                                                                 |
| `tvl.total_assets`          | TVL in underlying token denomination                                                          |
| `tvl.price`                 | Token price in USD                                                                            |
| `tvl.tvl`                   | TVL in USD                                                                                    |
| `apy`                       | Vault APY metadata                                                                            |
| `apy.type`                  | APY type. Options are `v2:simple`, `v2:averaged`, `v1:simple`, `crv`                          |
| `apy.gross_apr`             | Uncompounded gross APR before fees                                                            |
| `apy.net_apy`               | Net APY (compounded) after fees. This is what the UI shows                                    |
| `apy.fees`                  | Fee structure breakdown for a vault                                                           |
| `apy.fees.performance`      | Performance fee in bips                                                                       |
| `apy.fees.withdrawal`       | Withdrawal fee in bips                                                                        |
| `apy.fees.management`       | Management fee in bips                                                                        |
| `apy.fees.keep_crv`         | Amount of CRV to keep upon harvest for curve vaults in bips                                   |
| `apy.fees.cvx_keep_crv`     | Amount of CRV to keep upon harvest for curve convex vaults in bips                            |
| `apy.points`                | APY samples for various timeframes                                                            |
| `apy.points.week_ago`       | APY calculated from one week sample of pricePerShare                                          |
| `apy.points.month_ago`      | APY calculated from one month sample of pricePerShare                                         |
| `apy.points.month_ago`      | APY calculated from inception block sample of pricePerShare                                   |
| `apy.composite`             | Complex APY breakdown (for curve vaults)                                                      |
| `apy.composite.boost`       | Current boost of the strategies                                                               |
| `apy.composite.pool_apy`    | APY of the Curve LP position                                                                  |
| `apy.composite.base_apr`    | Base APR of Curve emissions                                                                   |
| `apy.composite.boosted_apr` | Boosted APR of Curve emissions                                                                |
| `apy.composite.cvx_apr`     | APR of Convex rewards                                                                         |
| `apy.composite.rewards_apr` | APR of additional pool rewards                                                                |
| `strategies`                | A list of active vault strategies                                                             |
| `strategies[idx].address`   | Address of an active strategy                                                                 |
| `strategies[idx].name`      | Name of an active strategy                                                                    |
| `endorsed`                  | True if the vault is an endorsed production vault. Do not show the vault if it's not endorsed |
| `version`                   | API version of the vault                                                                      |
| `decimals`                  | Number of decimals for the vault token                                                        |
| `type`                      | High level vault classification. Valid options are v1 and v2                                  |
| `emergency_shutdown`        | If true the vault is in shut down mode and no new deposits should be accepted                 |
| `updated`                   | Unix timestamp of the last vault update                                                       |
