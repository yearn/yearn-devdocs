# Protocol Risks

Yearn’s core products are the vaults. Each vault runs at least one strategy, and each strategy is exposed to at least one protocol. Strategy and protocol risks are described [here](./strategy-risks.md) and [here](./protocol-risks.md) respectively.

The key protocols to which Yearn’s vaults are exposed are lending protocols, AMMs and protocols that enable leverage.

## Lending Protocols

One of the simplest strategies is collateralized lending which involves lending assets on lending protocols to earn a yield. For example, a lending strategy will lend the underlying asset to the highest yielding lending protocol that meets the risk score requirements. This type of strategy is the most widely used in the single asset V3 vaults.

Examples of Lending protocols that Yearn strategies may use are Aave, Morpho, Spark, LlamaLend, and more.

|Risk|Description|
|----|-----------|
|Governance|Admin key holders (or token holders) change the lending protocol adversely, e.g. accept risky assets with lenient risk parameters|
|Technological|Smart contract risk from interacting with lending protocols|
||Liquidations do not occur as expected|
|Market|The value of the loans exceed the value of the collateral|
||Low demand for borrowing leads to low yields|
||Accepted assets become impaired|
|Oracle|Incorrect price feed causes the collateral to go to such a value that the loan is liquidated|

## Automated Market Makers

AMMs are used some of Yearn’s vault strategies to earn trading fees (and liquidity mining rewards if available) and may be used to exchange earned tokens for more of the underlying token.

Yearn's Factory vaults are the main consumers of AMM strategies. Examples of the AMMs to which Yearn’s vaults are exposed, are Curve Finance, Aerodrome, and Velodrome.

Yearn's process to sell reward tokens for the underlying and compound earnings has evolved over the years and now typically uses Auctions that fall back to cowSwap.

|Risk|Description|
|----|-----------|
|Market|Lack of liquidity for the token being exchanged|
||Trading volumes reduce leading to lower fees|
||Impermanent loss due to the pool’s token prices changing relative to each other|
|Technological|Smart contract risk from interacting with AMMs|
|Governance|Token holders vote to change the AMM adversely|

## Leverage-enabling protocols

Leverage-enabling protocols are used in Yearn’s vault strategies to increase the yield. This is possible when a non-leveraged strategy earns a higher return than the cost of borrowing.

Examples of the leverage-enabling protocols to which Yearn’s vaults are exposed are Aave, Morpho, Moonwell, etc.

These kinds of strategies are typically reserved for higher risk Vaults. Sometimes a vault with a risk score of 2 can have some very light leverage, but typically these will be -3 and -4 vaults.

|Risk|Description|
|----|-----------|
|Governance|Multi-sig or token holders vote to change the protocol adversely|
||Poorly chosen risk parameters for onboarded collateral of underlying market e.g. collateralization ratios that are too low|
|Technological|Smart contract risk|
|Market|Liquidations are not processed correctly on Maker or Unit Protocol|
||Stablecoin peg is not maintained |
||Cost of uncollateralized borrowing increases such that Yearn’s strategies cannot utilize it|
|Oracle|Incorrect price feed leads to incorrect liquidation of positions |

## Liquidity mining protocols

A core strategy for Yearn’s vaults is to liquidity mine (or yield farm) protocols.
Liquidity mining involves interacting with a protocol to earn the protocol’s native tokens.

|Risk|Description|
|----|-----------|
|Governance|Admin key holders change protocol adversely, e.g. introduce penalties for withdrawals or steal funds|
|Technological|Smart contract risk of protocol or rewards contract|
|Market|Fall in price of token being farmed reducing the APY|
||Liquidity of liquidity mined token on AMM is reduced or removed |
|Oracle|Delays or inability to withdraw liquidity in an emergency|

These factors are all taken into account by the Yearn Security Team when scoring strategies using the [Risk Score Framework](./risk-score.md).
