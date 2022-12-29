Risk Scores

Yearn works with risk scores to quantify and assess the amount of risk of each strategy and vault. This document outlines how we measure risk vectors and use them to find the optimal balance of security and innovation.

* [**Strategy Risk Score**](#strategy-risk-score) defines each dimension of risk for a strategy and how we quantify them
* [**Vault Risk Score Proposal**](#vault-risk-score-proposal) aggregates all strategy scores for a vault, averaging by TVL **(this is in draft stage)**
* [**Overall Risk Score Proposal**](#overall-risk-score-proposal) aggregates strategy/vault scores into overall scores **(this is in draft stage)**

## Strategy Risk Score

Risk for different strategies is quantified using an internal point system developed by yearn's strategy deployment process. The higher the risk score number, the more risky the strategy is. The risk assessment evaluates eight dimensions:

* [Audit](#audit)
* [Code Review](#code-review)
* [Complexity](#complexity)
* [Longevity](#longevity)
* [Protocol Safety](#protocol-safety)
* [Team Knowledge](#team-knowledge)
* [Testing Score](#testing-score)
* [TVL Impact](#tvl-impact)

This risk framework is an ongoing process to ensure the security of yearn's strategies. Yearn recognized that, due to its unique approach to deploying strategies, it could not rely on a traditional waterfall process (heavy analysis and design, testing, multiple audits before release, etc.) to deploy contracts. Strategies are deployed and capped by their risk score. As we reduce the risk in any of the eight dimensions, the strategy can grow its TVL. This system allows yearn to compare the risk score of two strategies and prioritize risk mitigation and preventive actions, such as forming a committee to spread knowledge on the code, getting more audits, migrating current code to improved versions of the strategy, etc. 
 
The current version of the risk score system works for yearn's current needs, but we are always looking to improve and expand it to the vaults. We want to provide our users with a better understanding of what is happening behind the scenes in the vaults. The development of vault risk scoring is still in progress!

### Audit

Auditing is the process where an audit firm or an external security researcher reviews the code for any potential vulnerabilities and presents a report for mitigation. Audits usually take longer than an internal security review and are not immediately available given the demand for audits in the space, so most strategies are sent to production with no audits (thus high-risk score) to keep their TVL limited. This strikes a balance of validating the strategy in production with a calculated risk while we schedule a proper audit. The risk score helps us prioritize which strategies should get audited first, based on impact and other dimensions of scoring:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Audit</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>No audit by a trusted firm or security researcher</td>
  </tr>
  <tr>
   <td>4</td>
   <td>Audit by trusted firm or security researcher took place 6 months+ ago</td>
  </tr>
  <tr>
   <td>3</td>
   <td>Audit by trusted firm or security researcher took place 3 months+ ago</td>
  </tr>
  <tr>
   <td>2</td>
   <td>Audit less than 3 months ago. Independent audit by a trusted firm.</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Audit less than 3 months ago. In total, 3 or more independent audits by trusted firms.</td>
  </tr>
</table>

### Code Review

This is the process that reviews strategy code going to production. It is done in two major phases:

**Phase 1:** Two internal peers (strategists) review the strategy for any potential issues regarding handling accounts, profits, losses, etc. After this phase is completed, the strategy can go to ape.tax for live testing and validation.

**Phase 2:** An internal security reviewer from yearn will review the code focusing on security concerns. Once phase 2 is completed, the strategy gets a risk score in all dimensions and is usually deemed enough for a strategy to go to production with limited TVL based on scoring.

After these steps a recurring review is scheduled, where either a second either internal or external security reviewer will have another look at the code:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Code Review</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>0 - 1 reviewer of the code only or most recent was done 6 months+ ago</td>
  </tr>
  <tr>
   <td>4</td>
   <td>2 reviewers of the code, the most recent of which was done 3+ months ago</td>
  </tr>
  <tr>
   <td>3</td>
   <td>3 reviewers of the code, the most recent of which was done 3+ months ago (1 of the reviewers is an internal security dev)</td>
  </tr>
  <tr>
   <td>2</td>
   <td>4 reviewers of the code (2 peers and 2 internal security devs)</td>
  </tr>
  <tr>
   <td>1</td>
   <td>5 reviewers of the code, (2 strategists peers and 2 security reviewers and either external protocol devs reviewed or external security researchers reviewed)</td>
  </tr>
</table>

### Complexity

This is how the strategy earns its returns: is it a simple strategy like a masterchef staking or does it have complex mechanics like leverage, risk of liquidation, many protocols involved, etc? The more pieces and components it needs will require a higher complexity score. This score is key in an emergency to evaluate how difficult it is to mitigate a live issue:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Complexity</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>Strategy is very complex, uses leverage or debt, not easy to unwind. No health check</td>
  </tr>
  <tr>
   <td>4</td>
   <td>Uses leverage or debt, not easy to unwind. No health check</td>
  </tr>
  <tr>
   <td>3</td>
   <td>Has loss potential, withdrawal fee or requires detailed queue management to avoid losses. No health check</td>
  </tr>
  <tr>
   <td>2</td>
   <td>Strategy is simple, easy to migrate/unwind. Has health check</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Strategy is simple, easy to migrate/unwide. No leverage and zero public unrestricted methods. Is highly unlikely to have a loss.</td>
  </tr>
</table>

### Longevity

How long the strategy has been running live on yearn.finance:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Longevity</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>New code. Did not go to ape tax before going live on yearn.finance</td>
  </tr>
  <tr>
   <td>4</td>
   <td>Code has been live less than a month</td>
  </tr>
  <tr>
   <td>3</td>
   <td>Code has been live 1-4 months</td>
  </tr>
  <tr>
   <td>2</td>
   <td>Code live 4+ months</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Code live 8+ months. No critical issues and no changes in code base over this time</td>
  </tr>
</table>

### Protocol Safety

Internal evaluation from yearn’s point-of-view of how resilient are the protocols that the strategy works with. It regards safety measures given the current DeFi security standards, it's heavily based on informed opinions regarding our internal assessments and due diligence compared to the top projects in DeFI. Accounts for multisig health, decentralization, bounty programs, audits, etc. 

We hope to improve this dimension with the help of the DeFI community to potentially use a standard scoring system that is widely accepted in the ecosystem to replace our current scoring table:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Protocol Safety</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>No due diligence (DD) document for this strategy. The protocol contracts used are very recent and not audited/verified. An EOA (externally owned account) owns the contracts and can upgrade them. </td>
  </tr>
  <tr>
   <td>4</td>
   <td>DD took place. Protocol contracts audited/verified. A multisig is required or contracts are Upgradable. Multisig has a low threshold of signers. No bounty program.</td>
  </tr>
  <tr>
   <td>3</td>
   <td>DD took place. Protocol contracts are audited/verified by at least <strong>one reputable audit </strong>firm. A multisig with a good threshold is required and/or contracts are immutable. Has a good bounty program.</td>
  </tr>
  <tr>
   <td>2</td>
   <td>DD took place. Currently deployed protocol contracts are audited/verified by at least <strong>two reputable audit </strong>firms. A multisig with a good threshold is required and/or contracts are immutable. Has a good bounty program.</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Protocols involved in contracts are trusted blue chip protocols with a good record of security. For example: Maker, Uniswap, Curve, AAVE, and Compound. These protocols handle at least all the criteria specified in item 2 and more.</td>
  </tr>
</table>

### Team knowledge

Measures how much expertise on a strategy is shared amongst Yearn contributors. How many contributors can manage the strategy and respond in an emergency? The less people can manage and respond during an emergency the riskier the strategy assessment in this dimension:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Team Knowledge</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>1 person in the team is the only one that has in-depth knowledge of the strategy code</td>
  </tr>
  <tr>
   <td>4</td>
   <td>1 strategist has in-depth knowledge, and 1 strategist is somewhat familiar with the strategy code.</td>
  </tr>
  <tr>
   <td>3</td>
   <td>2 strategists have in-depth knowledge of the strategy code.</td>
  </tr>
  <tr>
   <td>2</td>
   <td>2 strategists have in-depth knowledge, and 1 strategist is somewhat familiar with the strategy code.</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Team of 3+ strategists are very familiar with the strategy code and the protocol the strategy is utilising. </td>
  </tr>
</table>

### Testing score

Testing score is a metric of how much of the codebase for the strategy has been tested. It uses the test coverage number as a reference, higher coverage means the developer/strategist took time to test most of the operations of the strategy in a unit test or fork environment. This score assumes a less tested strategy entails more risk since we know less about what is expected from the code:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>Testing Score</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>Less than 20% coverage in testing</td>
  </tr>
  <tr>
   <td>4</td>
   <td>Less than 40% coverage in testing</td>
  </tr>
  <tr>
   <td>3</td>
   <td>40% to 80% coverage</td>
  </tr>
  <tr>
   <td>2</td>
   <td>Over 80% coverage</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Over 90% coverage in testing. Second developer validated and added tests and also added new ones for uncovered cases while reviewing. You can pull repository and test are currently passing</td>
  </tr>
</table>

### TVL Impact

The TVL (total value locked) impact is a figure between 1 and 5 as well, where 5 is the highest impact labeled “extreme” (above 100MM) and 1 is the lowest impact in TVL less than 1MM. This table measures how to allocate to new riskier strategies without having a catastrophic event in case of a hack or issue. The lower the impact, the more likely yearn’s treasury can recover from an incident. The TVL is measured in USD and grows dynamically based on strategies allocations onchain. Through [yearn.watch](https://yearn.watch/) we keep track of the TVL and risk score to make fund allocation decisions and mitigations if a strategy group has fallen into the “red” high-risk zone:

<table>
  <tr>
   <td><strong>Score</strong></td>
   <td><strong>TVL Impact</strong></td>
  </tr>
  <tr>
   <td>5</td>
   <td>Extreme: > USD 100 MM</td>
  </tr>
  <tr>
   <td>4</td>
   <td>Very high: less than USD 100 MM</td>
  </tr>
  <tr>
   <td>3</td>
   <td>High: less than USD 50 MM</td>
  </tr>
  <tr>
   <td>2</td>
   <td>Medium: less than USD 10 MM</td>
  </tr>
  <tr>
   <td>1</td>
   <td>Low: less than USD 1 MM</td>
  </tr>
</table>

## Vault Risk Score Proposal

A vault is a contract that holds funds for up to 20 strategies, the vault risk score is a TVL weighted average for each active strategy, for example:

**Strategy X** has **5000$** funds deposited  
**Strategy Y** has **1000$** funds deposited

This vault's risk score would be calculated like this:

```
(
  (Strategy X risk) * 5000
  +
  (Strategy Y risk) * 1000
)
÷
6000
```

## Overall Risk Score Proposal

Risks on some projects may have more relevance than others, so before calculating the overall score we first define the weight for the context we want to apply the framework on and then we do a weighted average between all risk dimensions and risk profiles:

**Risk Profile** = Weighted table of which risk dimension is more important given the current context  
**Risk Score** = Weighted average of all 8 dimensions using the risk profile weights

A project may have many risk profiles, so for each profile the score is calculated and the final list that remains is then used with medians to reach the final result:

The projects overall risk score will be presented in 3 variables:

* **high:** profile score for a risk-averse user
* **low:** profile score for a risk-seeking user
* **median:** profile score for a median representative user

Where each one of these use the final list median:

* **high:** median + 1.5 IQR
* **low:** median - 1.5 IQR
* **median:** the median value from the distribution

Where IQR stands for the interquartile range of the distribution

Here is what the final result looks like:

```
{
  'overallScore': {
    'high': 3.37675585284281,
    'low': 2.5463210702341135,
    'median': 2.9615384615384617,
  },
}
```
