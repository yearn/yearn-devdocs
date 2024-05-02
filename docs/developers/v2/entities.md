# Subgraph Entities

- [`Transaction`](#transaction)
- [`Token`](#token)
- [`TokenFee`](#tokenfee)
- [`VaultRelease`](#vaultrelease)
- [`Registry`](#registry)
- [`Vault`](#vault)
- [`VaultUpdate`](#vaultupdate)
- [`HealthCheck`](#healthcheck)
- [`Account`](#account)
- [`Deposit`](#deposit)
- [`Withdrawal`](#withdrawal)
- [`Transfer`](#transfer)
- [`AccountVaultPosition`](#accountvaultposition)
- [`AccountVaultPositionUpdate`](#accountvaultpositionupdate)
- [`Strategy`](#strategy)
- [`StrategyReport`](#strategyreport)
- [`StrategyReportResult`](#strategyreportresult)
- [`Harvest`](#harvest)
- [`VaultDayData`](#vaultdaydata)
- [`Yearn`](#yearn)

<br />

# SCHEMA GUIDELINES

### Naming Conventions

#### Certain prefixes may be used to indicate a particular type of value

#### \* total - indicates this is a cumulative value (e.g. totalSharesMinted, totalGrossReturns)

#### \* balance - indicates this is a spot balance (e.g. balanceTokensIdle)

#### \* delta - indicates this value is the difference between the prior state and the current state (e.g. deltaPricePerShare)

#### \* current - used exclusively in Update entities. Similar to balance, current indicates the state of a field or value at the time of the update. These values are populated in every update whether they changed or not

#### \* new - used exclusively in Update entities. Fields with this prefix will only be populated if they have changed since the last Update. If there has been no change, the value will be null

#### Use plurals when referring to Tokens or Shares (e.g. totalShares, balanceTokens)

 <br />
 <br />

# Transaction

Description: get specific details of the transaction

| Field         | Type    | Description                                                                 |
| ------------- | ------- | --------------------------------------------------------------------------- |
| id            | ID!     | Transaction hash + Log Index                                                |
| logIndex      | BigInt! | Log index related to the event. A Transaction might contain multiple events |
| event         | String! | The event name / call stacktrace                                            |
| from          | Bytes!  | The transaction sender                                                      |
| gasPrice      | BigInt! | Gas price used in the transaction                                           |
| gasLimit      | BigInt! | Gas limit used in the transaction                                           |
| hash          | Bytes!  | Transaction hash                                                            |
| index         | BigInt! | The transaction index                                                       |
| to            | Bytes!  | Address that received the transaction                                       |
| value         | BigInt! | Ether value sent in the transaction                                         |
| timestamp     | BigInt! | Timestamp when the transaction was executed                                 |
| blockGasLimit | BigInt! | Gas limit used in the current block                                         |
| blockNumber   | BigInt! | Block number                                                                |

# Token

Description: get specific details of the token

| Field    | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| id       | ID!     | Token address                     |
| decimals | Int!    | Number of decimals for this Token |
| name     | String! | Name of the Token                 |
| symbol   | String! | Symbol of the Token               |

# TokenFee

Description: get specific details of the token fee

| Field                    | Type    | Description                                                                                                                                               |
| ------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                       | ID!     | Token address                                                                                                                                             |
| vault                    | Vault!  | Vault this fee is for                                                                                                                                     |
| token                    | Token!  | The token which the fees are denominated in. Equivalent to vault.token.                                                                                   |
| totalTreasuryFees        | BigInt! | All time fees paid using this token to the treasury. Denominated in the vault's want token.                                                               |
| totalStrategyFees        | BigInt! | All time fees paid using this token to strategists. Denominated in the vault's want token.                                                                |
| totalFees                | BigInt! | All time fees paid using this token to strategists and the treasury. Denominated in the vault's want token.                                               |
| unrecognizedTreasuryFees | BigInt! | Internal field used by VaultUpdate. The amount of treasury fees paid using this token that has yet to be recognized by the subgraph's accounting logic.   |
| unrecognizedStrategyFees | BigInt! | Internal field used by VaultUpdate. The amount of strategist fees paid using this token that has yet to be recognized by the subgraph's accounting logic. |

# VaultRelease

Description: get specific details of the Vault Release

| Field       | Type               | Description                               |
| ----------- | ------------------ | ----------------------------------------- |
| id          | ID!                | Release index in Registry contract        |
| version     | String!            | Version string                            |
| contract    | Bytes!             | Contract address                          |
| vaults      | [`Vault!`](#vault) | Vault deployments of this release version |
| timestamp   | BigInt!            | Timestamp of Release                      |
| blockNumber | BigInt!            | Block number of Release                   |
| transaction | Transaction!       | Ethereum Transaction                      |

# Registry

Description: get specific details of the Registry

| Field       | Type               | Description                       |
| ----------- | ------------------ | --------------------------------- |
| id          | ID!                | Registry address                  |
| timestamp   | BigInt!            | Transaction timestamp             |
| blockNumber | BigInt!            | Transaction/Block Block number    |
| transaction | Transaction!       | Ethereum Transaction              |
| vaults      | [`Vault!`](#vault) | Vaults registered in the registry |

# Vault

Description: get specific details of the Vault

| Field                 | Type                             | Description                                                                                                                                 |
| --------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | ID!                              | Vault address                                                                                                                               |
| transaction           | Transaction!                     | Ethereum Transaction                                                                                                                        |
| registry              | Registry!                        | The registry address                                                                                                                        |
| token                 | Token!                           | Token this Vault will accrue                                                                                                                |
| shareToken            | Token!                           | Token representing Shares in the Vault                                                                                                      |
| status                | VaultStatus!                     | Vault status                                                                                                                                |
| classification        | VaultClassification!             | Vault classification                                                                                                                        |
| release               | VaultRelease!                    | Release Information                                                                                                                         |
| latestUpdate          | VaultUpdate                      | Latest Vault Update                                                                                                                         |
| vaultDayData          | [`VaultDayData!`](#vaultdaydata) | All Vault Updates                                                                                                                           |
| historicalUpdates     | [`VaultUpdate!`](#vaultupdate)   | All Vault Updates                                                                                                                           |
| strategies            | [`Strategy!`](#strategy)         | Strategies for this Vault                                                                                                                   |
| strategyIds           | [Strategy!]!                     | Strategy Ids for this vault                                                                                                                 |
| deposits              | [`Deposit!`](#deposit)           | Token deposits into the Vault                                                                                                               |
| withdrawals           | [`Withdrawal!`](#withdrawal)     | Token withdrawals from the Vault                                                                                                            |
| withdrawalQueue       | [Strategy!]!                     | withdrawl queue of strategies                                                                                                               |
| transfers             | [`Transfer!`](#transfer)         | Transfers of Vault Shares                                                                                                                   |
| tags                  | [String!]!                       | Tags attached to the Vault                                                                                                                  |
| balanceTokens         | BigInt!                          | Balance of Tokens in the Vault and its Strategies                                                                                           |
| balanceTokensIdle     | BigInt!                          | Current idle Token balance                                                                                                                  |
| sharesSupply          | BigInt!                          | Current supply of Shares                                                                                                                    |
| managementFeeBps      | Int!                             | Management fee in basis points                                                                                                              |
| performanceFeeBps     | Int!                             | Performance fee in basis points                                                                                                             |
| rewards               | Bytes!                           | The address where management fees are paid to                                                                                               |
| isTemplateListening   | Boolean!                         | This technical field defines whether this vault is a custom item (created by a custom handler) or not (created by the registry dynamically) |
| activation            | BigInt!                          | Creation timestamp                                                                                                                          |
| apiVersion            | String!                          | The API version                                                                                                                             |
| healthCheck           | HealthCheck                      | The vault's health check contract                                                                                                           |
| guardian              | Bytes!                           | The address authorized for guardian interactions in the new Vault                                                                           |
| management            | Bytes!                           | The management address of the Vault to assert privileged functions that can only be called by management                                    |
| governance            | Bytes!                           | The governance address of the Vault to assert privileged functions that can only be called by governance                                    |
| availableDepositLimit | BigInt!                          | The maximum amount of underlying that can be deposited                                                                                      |
| depositLimit          | BigInt!                          | The maximum amount of tokens that can be deposited in this Vault                                                                            |
| emergencyShutdown     | Boolean!                         | Is vault in emergency shutdown                                                                                                              |
| activationBlockNumber | BigInt!                          | Block.timestamp of contract deployment                                                                                                      |

# VaultUpdate

Description: get specific details of Vault Update

| Field                 | Type         | Description                                                                                                                                  |
| --------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | ID!          | Vault-Transaction-Log                                                                                                                        |
| timestamp             | BigInt!      | Timestamp of update                                                                                                                          |
| blockNumber           | BigInt!      | Block number of update                                                                                                                       |
| transaction           | Transaction! | Ethereum Transaction                                                                                                                         |
| vault                 | Vault!       | Vault this update is for                                                                                                                     |
| tokensDeposited       | BigInt!      | Sum of tokens deposited                                                                                                                      |
| tokensWithdrawn       | BigInt!      | Sum of tokens withdrawn                                                                                                                      |
| sharesMinted          | BigInt!      | Sum of Shares minted over all time                                                                                                           |
| sharesBurnt           | BigInt!      | Sum of Shares burnt over all time                                                                                                            |
| balancePosition       | BigInt!      | The current balance position defined as: (vault.totalAssets() \* (vault.pricePerShare() / 10\*\*vault.decimals())).                          |
| returnsGenerated      | BigInt!      | Returns generated in Tokens                                                                                                                  |
| totalFees             | BigInt!      | Total fees accrued over the lifetime of the vault. Denominated in want tokens.                                                               |
| pricePerShare         | BigInt!      | Price per full share at the time of the update. Denominated in want tokens.                                                                  |
| currentBalanceTokens  | BigInt!      | Balance of Tokens in the Vault and its Strategies at the time of update.                                                                     |
| newManagementFee      | BigInt       | Management fee at time of update, in basis points. If this value has not been changed since the last VaultEvent, it will be null.            |
| newPerformanceFee     | BigInt       | New Performance fee at time of update, in basis points. If this value has not been changed since the last VaultEvent, it will be null.       |
| newRewards            | Bytes        | The new Rewards address that management fees will be paid to. If this value has not been changed since the last VaultEvent, it will be null. |
| newHealthCheck        | HealthCheck  | The vault's new health check contract. If this value has not been changed since the last VaultEvent, it will be null.                        |
| availableDepositLimit | BigInt!      | The maximum amount of underlying that can be deposited                                                                                       |
| depositLimit          | BigInt!      | The maximum amount of tokens that can be deposited in this Vault                                                                             |
| guardian              | Bytes!       | The address authorized for guardian interactions in the new Vault                                                                            |
| management            | Bytes!       | The management address of the Vault to assert privileged functions that can only be called by management                                     |
| governance            | Bytes!       | The governance address of the Vault to assert privileged functions that can only be called by governance                                     |

# Healthcheck

Description: get healthcheck

| Field  | Type               | Description                                |
| ------ | ------------------ | ------------------------------------------ |
| id     | ID!                | Health check address                       |
| vaults | [`Vault!`](#vault) | Vaults that use this health check contract |

# Account

Description: get specific details of the Account

| Field          | Type                                             | Description              |
| -------------- | ------------------------------------------------ | ------------------------ |
| id             | ID!                                              | Account address          |
| deposits       | [`Deposit!`](#deposit)                           | Vault deposits           |
| withdrawals    | [`Withdrawal!`](#withdrawal)                     | Vault withdrawals        |
| vaultPositions | [`AccountVaultPosition!`](#accountvaultposition) | Vault positions          |
| sharesReceived | [`Transfer!`](#transfer)                         | Incoming share transfers |
| sharesSent     | [`Transfer!`](#transfer)                         | Outgoing share transfers |

# Deposit

Description: get specific details of the Deposit

| Field        | Type         | Description                           |
| ------------ | ------------ | ------------------------------------- |
| id           | ID!          | Transaction-Log                       |
| timestamp    | BigInt!      | Timestamp of update                   |
| blockNumber  | BigInt!      | Block number of update                |
| account      | Account!     | Account making Deposit                |
| vault        | Vault!       | Vault deposited into                  |
| tokenAmount  | BigInt!      | Number of Tokens deposited into Vault |
| sharesMinted | BigInt!      | Number of new Vault Shares minted     |
| transaction  | Transaction! | Ethereum Transaction                  |
| vaultUpdate  | VaultUpdate! | Vault Update                          |

# Withdrawal

Description: get specific details of the Withdrawal

| Field       | Type         | Description                           |
| ----------- | ------------ | ------------------------------------- |
| id          | ID!          | Transaction-Log                       |
| timestamp   | BigInt!      | Timestamp of update                   |
| blockNumber | BigInt!      | Block number of update                |
| account     | Account!     | Account making withdraw               |
| vault       | Vault!       | Vault withdrawn from                  |
| tokenAmount | BigInt!      | Number of Tokens withdrawn from Vault |
| sharesBurnt | BigInt!      | Number of Vault Shares burnt          |
| transaction | Transaction! | Ethereum Transaction                  |
| vaultUpdate | VaultUpdate! | Vault Update                          |

# Transfer

Description: get specific details of the Transfer

| Field           | Type         | Description                                                                               |
| --------------- | ------------ | ----------------------------------------------------------------------------------------- |
| id              | ID!          | Transaction-Log                                                                           |
| vault           | Vault!       | Vault                                                                                     |
| from            | Account!     | Sender                                                                                    |
| to              | Account!     | Receiver                                                                                  |
| shareToken      | Token!       | Vault Share Token                                                                         |
| shareAmount     | BigInt!      | Number of Vault Shares transferred                                                        |
| token           | Token!       | Vault Token                                                                               |
| tokenAmount     | BigInt!      | Number of Tokens redeemable for shares transferred                                        |
| tokenAmountUsdc | BigInt!      | Token Amount in USDC, 0 if the transaction was before the oracle was deployed at 12198044 |
| timestamp       | BigInt!      | Timestamp of Transfer                                                                     |
| blockNumber     | BigInt!      | Block number of Transfer                                                                  |
| transaction     | Transaction! | Ethereum Transaction                                                                      |
| isFeeToTreasury | Boolean!     | Whether the transfer was used to pay a fee to the vault's rewards address                 |
| isFeeToStrategy | Boolean!     | Whether the transfer was used to pay a fee to a strategy                                  |

# AccountVaultPosition

Description: get specific details of the Account Vault positions

| Field           | Type                                                         | Description                                                                                                                 |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| id              | ID!                                                          | Account-Vault                                                                                                               |
| vault           | Vault!                                                       | Vault                                                                                                                       |
| account         | Account!                                                     | Account                                                                                                                     |
| token           | Token!                                                       | Vault token                                                                                                                 |
| shareToken      | Token!                                                       | Vault share token                                                                                                           |
| transaction     | Transaction!                                                 | Created in transaction                                                                                                      |
| latestUpdate    | AccountVaultPositionUpdate!                                  | Latest account update for this Vault                                                                                        |
| updates         | [`AccountVaultPositionUpdate!`](#accountvaultpositionupdate) | Account updates over time                                                                                                   |
| balanceShares   | BigInt!                                                      | Share balance                                                                                                               |
| balanceTokens   | BigInt!                                                      | The current balance of tokens defined as: sum(deposits) - sum(withdrawals) + sum(received transfers) - sum(sent transfers). |
| balancePosition | BigInt!                                                      | The current balance position defined as: (vault.balanceOf(account) \* (vault.pricePerShare() / 10\*\*vault.decimals())).    |
| balanceProfit   | BigInt!                                                      | The accumulated profit balance for the account/vault. It is only calculated when the user withdraws all the shares.         |

# AccountVaultPositionUpdate

Description: get specific details of the Account Vault positions

| Field                | Type                  | Description                                            |
| -------------------- | --------------------- | ------------------------------------------------------ |
| id                   | ID!                   | Account-Vault-Order                                    |
| order                | BigInt!               | Incremental value for the same account/vault.          |
| timestamp            | BigInt!               | Timestamp                                              |
| blockNumber          | BigInt!               | Block number                                           |
| account              | Account!              | Account that owns position update                      |
| accountVaultPosition | AccountVaultPosition! | The account vault position that this update applies to |
| transaction          | Transaction!          | Ethereum Transaction                                   |
| deposits             | BigInt!               | Sum of token deposits                                  |
| withdrawals          | BigInt!               | Sum of token withdrawals                               |
| sharesMinted         | BigInt!               | Sum of share tokens minted                             |
| sharesBurnt          | BigInt!               | Sum of share tokens burnt                              |
| tokensSent           | BigInt!               | Tokens sent                                            |
| tokensReceived       | BigInt!               | Tokens received                                        |
| sharesSent           | BigInt!               | Share tokens sent                                      |
| sharesReceived       | BigInt!               | Share tokens received                                  |
| balanceShares        | BigInt!               | The balance of shares                                  |
| balancePosition      | BigInt!               | The balance position.                                  |
| vaultUpdate          | VaultUpdate!          | Vault Update                                           |

# Strategy

Description: get specific details of the Strategy

| Field                | Type                                 | Description                                                                                                                                                     |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                   | ID!                                  | Strategy address                                                                                                                                                |
| name                 | String!                              | Strategy name.                                                                                                                                                  |
| timestamp            | BigInt!                              | Timestamp the vault information was most recently updated.                                                                                                      |
| blockNumber          | BigInt!                              | Blocknumber the vault information was most recently updated.                                                                                                    |
| transaction          | Transaction!                         | Ethereum Transaction                                                                                                                                            |
| address              | Bytes!                               | The Strategy address.                                                                                                                                           |
| healthCheck          | Bytes                                | The health check contract address.                                                                                                                              |
| doHealthCheck        | Boolean!                             | Defines whether the strategy will call the health check or not.                                                                                                 |
| inQueue              | Boolean!                             | Defines whether this strategy is within the vault queue                                                                                                         |
| vault                | Vault!                               | The Vault                                                                                                                                                       |
| clonedFrom           | Strategy                             | Strategy reference used to clone this strategy.                                                                                                                 |
| debtLimit            | BigInt!                              | Defines the maximum borrow amount. In strategies \<v0.3.5 it is debtRatio.                                                                                       |
| minDebtPerHarvest    | BigInt!                              | Lower limit on the increase of debt since last harvest.                                                                                                         |
| maxDebtPerHarvest    | BigInt!                              | Upper limit on the increase of debt since last harvest.                                                                                                         |
| rateLimit            | BigInt!                              | It is the current rate limit. It increases/decreases per block. This field is currently only populated on strategy create                                       |
| performanceFeeBps    | BigInt!                              | Defines the strategist's fee (basis points).                                                                                                                    |
| latestReport         | StrategyReport                       | The latest report for this Strategy                                                                                                                             |
| reports              | [`StrategyReport!`](#strategyreport) | The reports created by this strategy                                                                                                                            |
| harvests             | [`Harvest!`](#harvest)               | harvest() calls                                                                                                                                                 |
| apiVersion           | String!                              | Used to track the deployed version of this contract                                                                                                             |
| emergencyExit        | Boolean!                             | Determines if strategy is in emergency exit                                                                                                                     |
| keeper               | Bytes!                               | keeper is the only address that may call tend() or harvest(), other than governance() or strategist                                                             |
| strategist           | Bytes!                               | The address of the strategist                                                                                                                                   |
| rewards              | Bytes!                               | The address for rewards                                                                                                                                         |
| delegatedAssets      | BigInt!                              | The amount of assets this strategy manages that should not be included in Yearn's Total Value Locked (TVL) calculation across it's ecosystem.                   |
| isActive             | Boolean!                             | Provide an indication of whether this strategy is currently active                                                                                              |
| estimatedTotalAssets | BigInt!#                             | Provide an accurate estimate for the total amount of assets (principle + return) that this Strategy is currently managing, denominated in terms of want tokens. |

# StrategyMigration

Description: get specific details of the Strategy Migration

| Field       | Type         | Description                            |
| ----------- | ------------ | -------------------------------------- |
| id          | ID!          | The Strategy Migration ID              |
| oldStrategy | Strategy!    | Old Strategy                           |
| newStrategy | Strategy!    | New Strategy                           |
| blockNumber | BigInt!      | Blocknumber the migration was created. |
| timestamp   | BigInt!      | Timestamp the migration was created.   |
| transaction | Transaction! | Ethereum Transaction                   |

# StrategyReport

Description: get specific details of the Strategy Report

| Field       | Type                                             | Description                                                                                              |
| ----------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| id          | ID!                                              | The Strategy Report ID                                                                                   |
| timestamp   | BigInt!                                          | Timestamp the strategy report was most recently updated.                                                 |
| blockNumber | BigInt!                                          | Blocknumber the strategy report was most recently updated.                                               |
| transaction | Transaction!                                     | Ethereum Transaction                                                                                     |
| strategy    | Strategy!                                        | The Strategy reference.                                                                                  |
| gain        | BigInt!                                          | The reported gain amount for the strategy.                                                               |
| loss        | BigInt!                                          | The reported loss amount for the strategy.                                                               |
| totalGain   | BigInt!                                          | The reported total gain amount for the strategy.                                                         |
| totalLoss   | BigInt!                                          | The reported total loss amount for the strategy.                                                         |
| totalDebt   | BigInt!                                          | The reported total debt amount for the strategy.                                                         |
| debtAdded   | BigInt!                                          | The reported debt added amount for the strategy.                                                         |
| debtLimit   | BigInt!                                          | The reported debt limit amount for the strategy.                                                         |
| debtPaid    | BigInt!                                          | The reported debt paid for the strategy. This field is 0 for v0.3.0 or v0.3.1.                           |
| vaultUpdate | VaultUpdate!                                     | Vault state                                                                                              |
| results     | [`StrategyReportResult!`](#strategyreportresult) | The results created by this report. They are generated comparing the previous report and the current one |
| apy12dEMA   | Int!                                             | 12-day EMA of Vault APY as reported by built-in Yield Oracle                                             |
| apy50dEMA   | Int!                                             | 50-day EMA of Vault APY as reported by built-in Yield Oracle                                             |

# StrategyReportResult

Description: get specific details of the Strategy Report Results

| Field          | Type            | Description                                                |
| -------------- | --------------- | ---------------------------------------------------------- |
| id             | ID!             | The Strategy Report Result ID                              |
| timestamp      | BigInt!         | Timestamp the strategy report was most recently updated.   |
| blockNumber    | BigInt!         | Blocknumber the strategy report was most recently updated. |
| currentReport  | StrategyReport! | The current strategy report.                               |
| previousReport | StrategyReport! | The previous strategy report.                              |
| startTimestamp | BigInt!         | Start time of report                                       |
| endTimestamp   | BigInt!         | End time of report                                         |
| duration       | BigDecimal!     | The duration (in days) from the previous report.           |
| durationPr     | BigDecimal!     | Duration percentage rate.                                  |
| apr            | BigDecimal!     | Annual Percentage Rate.                                    |
| transaction    | Transaction!    | Ethereum Transaction                                       |

# Harvest

Description: get specific details of the Harvest

| Field           | Type         | Description                                                            |
| --------------- | ------------ | ---------------------------------------------------------------------- |
| id              | ID!          | Stratedy-Transaction-Log                                               |
| timestamp       | BigInt!      | Timestamp the strategy report was most recently updated                |
| blockNumber     | BigInt!      | Blocknumber the strategy report was most recently updated              |
| transaction     | Transaction! | Ethereum Transaction                                                   |
| vault           | Vault!       | Vault that owns the strategy                                           |
| strategy        | Strategy!    | Strategy that harvested                                                |
| harvester       | Bytes!       | Function caller                                                        |
| profit          | BigInt!      | The reported profit amount for the strategy at the time of the harvest |
| loss            | BigInt!      | The reported loss amount for the strategy at the time of the harvest   |
| debtPayment     | BigInt!      | The reported debt paid from strategy at the time of the harvest        |
| debtOutstanding | BigInt!      | The reported outstanding debt from strategy at the time of the harvest |

# VaultDayData

Description: get specific details of Vault Day Data

| Field                     | Type    | Description                                                                                                                                                                                 |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                        | ID!     | vault ID                                                                                                                                                                                    |
| timestamp                 | BigInt! | time in UTC                                                                                                                                                                                 |
| vault                     | Vault!  | specific vault                                                                                                                                                                              |
| pricePerShare             | BigInt! | price per share of vault                                                                                                                                                                    |
| deposited                 | BigInt! | The amount of tokens deposited to this vault this day                                                                                                                                       |
| withdrawn                 | BigInt! | The amount of tokens withdrawn from this vault this day                                                                                                                                     |
| totalReturnsGenerated     | BigInt! | The total earnings generated for this vault up to and including this day                                                                                                                    |
| totalReturnsGeneratedUSDC | BigInt! | The total earnings generated in USDC for this vault up to and including this day. These returns are priced using the token's USDC-denominated price at the time each harvest was performed. |
| dayReturnsGenerated       | BigInt! | The earnings generated for this vault this day                                                                                                                                              |
| dayReturnsGeneratedUSDC   | BigInt! | The earnings generated in USDC for this vault this day. These returns are priced using the token's USDC-denominated price at the time each harvest was performed.                           |
| tokenPriceUSDC            | BigInt! | The price of one of the vault's underlying token                                                                                                                                            |
| blockNumber               | BigInt! | Block number the day data aggregation occurred on                                                                                                                                            |

# Yearn

Description: get specific details of Yearn

| Field            | Type    | Description                                          |
| ---------------- | ------- | ---------------------------------------------------- |
| id               | ID!     |                                                      |
| treasuryFeesUsdc | BigInt! | Only valid after the oracle was deployed at 12242339 |
| strategyFeesUsdc | BigInt! | Only valid after the oracle was deployed at 12242339 |
| totalFeesUsdc    | BigInt! | Only valid after the oracle was deployed at 12242339 |
