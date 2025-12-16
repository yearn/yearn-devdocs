# Yearn Risk Score Framework

Risk scores are separated into two categories: strategy-related and external protocol-related.

Strategy-related scores are intended to focus solely on the strategy implementation. While there may be indirect exposure to external protocols when evaluating these scores, the primary focus is on the strategy implementation itself.

External protocol-related scores directly target external protocols. While the strategy-related scores indirectly reference the external protocol, the responses are not directly related to the external protocol itself. Conversely, these scores fully concentrate on the external protocol.

In the case of multiple external protocols integrated with a strategy, each external protocol should be evaluated according to the risk scores, and the average will be the final score. For example, if a strategy involves depositing DAI to CurveLP and staking it in Convex, then both Convex and Curve should be evaluated accordingly.

All scores are intended to be filled objectively, so the metrics are chosen as objectively as possible. However, due to the uncertainty of potential strategies and external protocols, the Yearn security team can make exceptions and assign scores that do not strictly adhere to the scoring framework. In such cases, every score type has an optional text box, which the Yearn security team fills out to justify why the score is given as it is.

To assign scores, certain information is required, such as testing coverage and external protocol audits. This information should be initially provided by the strategist who writes the strategy, and then the Yearn security team will double-check whether the supplied information is correct or missing.

## Overall `riskLevel`

`riskLevel` is used to define the final risk score of the strategy. The `riskLevel` for the strategy is calculated by summing all risk scores below and check the following table:

- 10-20 -> 1
- 21-30 -> 2
- 31-40 -> 3
- 41+ -> 4

Yearn V3 vaults can be single-strategy or multi-strategy vaults. The risk score for the vault will be calculated as follows:

- [single-strategy](https://github.com/yearn/ydaemon/blob/6797a0246ba13ac3e8b78f8b9a54b12e8500d603/data/meta/vaults/1.json#L13374): riskScore is used to define final riskLevel
- [multi-strategy](https://github.com/yearn/ydaemon/blob/6797a0246ba13ac3e8b78f8b9a54b12e8500d603/data/meta/vaults/1.json#L2606): riskLevel is defined by the highest riskLevel value of all strategies in the vault. Typically, vaults are constructed to only allow strategies at or below a specific risk level. So the USDC-2 vault could only have -2 or -1 level strategies attached to it, while the USDC-1 vault could only have -1 strategies attached to it.

## Strategy Related Scores

### `review`

To have a unified reviewScore for both internal and external strategies, we assume that the strategist writer itself is either a Source of Trust (internal) or not (external). So all internal strategies always includes that 1 additional source of trust in addition.
Together with all other Sources of Trust (SoTs) in this list:

- internal strategist wrote the strategy
- peer reviews
- expert peer reviews
- Yearn security team security reviews
- Yearn security team recurring security review

each item accounts for 1 SoT point, and any combinations of these gives the number of SoTs a strategy has and thus gives the associated review score:

- 5 -> 1 SoT
- 4 -> 2 SoT
- 3 -> 3 SoT
- 2 -> 4 SoT
- 1 -> 5 SoT

### `testing`

The testing coverage of the strategy being evaluated. Note that there are no intermediate scores for this score. The reason is to incentivise strategists to aim for at least 80% testing coverage.

- 1 -> 95%+
- 2 -> 90%+
- 3 -> 80%+
- 4 -> 70%+
- 5 -> below 70%

### `complexity`

The sLOC count of the strategy being evaluated. Note that the strategy can be complex regardless of the sLOC. In such cases, the Yearn security team will provide the justification reason for the score by text if needed.

- 5 -> 600+ sLOC
- 4 -> 450-600 sLOC
- 3 -> 300-450 sLOC
- 2 -> 150-300 sLOC
- 1 -> 0-150 sLOC

### `riskExposure`

This score aims to find out how much and how often a strategy can be subject to losses. Due to the nature of evaluating such hard metrics, the Yearn security team will provide the justification reason for the score by text if needed.

- 5 -> Loss of funds or non recoverable funds 30%+ (Example, Leveraging cross assets and got liquidated, adding liquidity to volatile pairs single sided)
- 4 -> Loss of funds or non recoverable funds 10-30% (Example, adding liquidity to single sided curve stable pools)
- 3 -> Loss of funds or non recoverable funds 3-10% (Example, Protocol specific IL exposure, very high deposit/withdrawal fees)
- 2 -> Loss of funds or non recoverable funds 0-3% (Example, deposit/withdrawal fees or anything protocol specific)
- 1 -> Strategy has no lossable cases, only gains, up only.

### `centralisationRisk`

The centralization score of the strategy that is being evaluated. Measures the strategy's reliance on privileged roles that are defined in strategy.

- 5 -> Strategy heavily relies on off-chain management, potentially exposing user funds to rug possibilities by admins.
- 4 -> Strategy frequently depends on off-chain management but has safeguards against rug possibilities by admins.
- 3 -> Strategy involves privileged roles but less frequently and with less risk of rug possibilities.
- 2 -> Strategy has privileged roles but they are not vital for operations and pose minimal risk of rug possibilities.
- 1 -> Strategy operates without dependency on any privileged roles, ensuring full permissionlessness.

### `protocolIntegration`

The protocols that are integrated into the strategy that is being evaluated.
For example:
If the strategy's underlying asset is DAI and deposits it to Curve LP and stakes the LP in Convex, then there are 2 external protocols integrated.
Note:
Protocols used only in swapping or getting reference value that are not critical to how the strategy works are not added here. For example: UniswapV3Swapper is not counted as an external protocol.

- 5 -> Strategy interacts with 5 external protocols
- 4 -> Strategy interacts with 4 external protocols
- 3 -> Strategy interacts with 3 external protocols
- 2 -> Strategy interacts with 2 external protocols
- 1 -> Strategy interacts with 1 external protocol

## External Protocol Related Scores

In case there are multiple external protocols integrated with strategy, then each external protocol should be evaluated according to the risk scores and the average will be the final score. For example: If strategy is depositing DAI to CurveLP and stakes it in Convex, then both Convex and Curve should be evaluated accordingly.

### `externalProtocolAuditing`

The public audits count of the external protocols.

- 5 -> No audit conducted by a trusted firm or security researcher.
- 4 -> Audit conducted by 1 trusted firm or security researcher conducted
- 3 -> Audit conducted by 2 trusted firm or security researcher conducted
- 2 -> Audit conducted by 3 trusted firm or security researcher conducted
- 1 -> Audit conducted by 4 or more trusted firm or security researcher conducted

### `externalProtocolCentralisation`

Measurement of the centralization score of the external protocols.

- 5 -> Contracts owner is an EOA or a multisig with less than 4 members `OR` Contracts are not verified `OR` Contracts owner can harm our strategy completely
- 4 -> Contracts owner is a multisig but the addresses are not known/hidden `OR` Contracts owner can harm our strategy by setting parameters in external protocol contracts up to some degree
- 3 -> Contracts owner is a multisig with known people but multisig threshold is very low.
- 2 -> Contracts owner is a multisig with known trusted people
- 1 -> Contracts owner is a multisig with known trusted people with Timelock `OR` Contracts are governanceless, immutable `OR` Contracts owner can't do any harm to our strategy by setting parameters in external protocol contracts

### `externalProtocolTvl`

The active TVL that the external protocol holds:

- 5 -> TVL of $10M or less
- 4 -> TVL between $10M and $40M
- 3 -> TVL between $40M and $120M
- 2 -> TVL between $120M and $480M
- 1 -> TVL of $480M or more

### `externalProtocolLongevity`

How long the external protocol contracts in scope have been deployed alive

- 5 -> Less than 6 months
- 4 -> Between 6 and 12 months
- 3 -> Between 12 and 18 months
- 2 -> Between 18 and 24 months
- 1 -> 24 months or more

### `externalProtocolType`

What does the external protocol do? Note that this is a rough estimate of evaluating a protocol's purpose. In some cases, the Yearn security team can score regardless of the criteria; in such cases, the reasoning will be provided in the text box as usual with all scores.

- 5 -> The main expertise of the protocol lies in off-chain operations, such as RWA protocols.
- 4 -> Cross-chain applications, like cross-chain bridges, cross-chain yield aggregators, and cross-chain lending/borrowing protocols
- 3 -> AMM lending/borrowing protocols that are not forks of blue-chip protocols, leveraged farming protocols, as well as newly conceptualized protocols
- 2 -> Slightly modified forked blue-chip protocols.
- 1 -> Blue-chip protocols such as AAVE, Compound, Uniswap, Curve, Convex, and Balancer.

### `comment`

Comment is used by the Yearn security team to provide additional information about the score given. It can be used to justify the score given or provide additional information about the potential problems or loses.

## Defining risk scores for the strategy

This is how the risk scores will be attached to the strategy:

```json
{
    "review": 2,
    "testing": 3,
    "complexity": 1,
    "riskExposure": 3,
    "protocolIntegration": 1,
    "centralizationRisk": 1,
    "externalProtocolAudit": 4,
    "externalProtocolCentralisation": 3,
    "externalProtocolTvl": 2,
    "externalProtocolLongevity": 1,
    "externalProtocolType": 4,
    "comment": ""
}
```

For more info on how to attach the risk scores to the strategy see [yDaemon schema](https://github.com/yearn/ydaemon/blob/main/data/meta/vaults/_schema.md#the-risk-score-object). Example of the strategy [`yPT-uniETH Yearn Auto-Rolling Pendle PT`](https://github.com/yearn/ydaemon/blob/6797a0246ba13ac3e8b78f8b9a54b12e8500d603/data/meta/vaults/1.json#L62-L75).
