# Risk Score

Risk for different strategies is measured using a point scoring system developed internally from yearn’s strategy deployment process. The higher the risk score number, the more riskier the strategy is. There are 7 dimensions that are assessed in calculating the risk:

* Audit
* Code Review 
* Complexity 
* Longevity 
* Protocol Safety
* Team Knowledge
* Testing Score

The Risk score take all these into account and multiplies by the TVL Impact, so the final formula is:

**Likelihood** = (Audit + Code Review + Complexity + Longevity + Protocol Safety + Team Knowledge + Testing Score)

**Risk Score **= Likelihood * TVL Impact

This risk framework was developed as an ongoing process that never ends regarding management of security dimensions and TVL of yearn’s strategies. The security team realised that given yearn’s unique approach to deploying strategies on a constant basis it couldn’t rely on a heavy waterfall process (heavy analysis/design, testing, several audits before a release, etc) to deploy contracts. The strategies are deployed and capped by their risk score and as we mitigate each dimension and improve something in the scoring the strategy can grow its TVL, think of it as calculated bets based on our internal security process. This allows yearn to compare the risk score of two strategies and prioritise mitigations/preventive actions like forming a committee to spread knowledge on the code, get more audits, migrate current code for improved versions of the strat, etc. 
 
The current version works for yearn’s current needs but we are always looking to improve it and also extend this scoring system to the vaults to be able to get a weighted average risk score that makes reasonable assumptions and can help our users get informed around what’s going on behind the scenes in the vaults. Vault risk scoring is still under development at the moment.

First dimension is audits. This is the process by which either an audit firm or an external security researcher reviews the code for any potential vulnerabilities and presents a report for mitigation. As audits usually take longer than an internal security review and are not immediately available given demand for audits in the space, most strategies are sent to production with no audits (thus high risk score) to keep their TVL limited. This strikes a balance of validating the strategy in production with a calculated risk while we schedule a proper audit. The risk score overall helps us prioritize which strategies should get audited first, based on impact and other dimensions on scoring.

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

Second, we’ve got code review. This is the process that blocks a strategy from going to production. Is done in two major phases, phase 1 consisting of  2 internal peers (2 strategists) reviewing the strategy for any potential issues regarding functionality and logical issues regarding handling of account, profits, losses, etc. After this phase is completed usually the strategy can go to ape.tax for live testing and validation. For phase 2 an internal security reviewer from yearn will review the code focusing more on security concerns. Once phase 2 is completed, the strategy gets a risk score in all dimensions and is usually deemed enough for a strategy to go to production with limited TVL based on scoring. After these steps a recurring review is scheduled, where either a second either internal or external security reviewer will have another look at the code. Here’s a table to showcase the scoring:

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

Next up, complexity. This is how the strategy earns a return - is it a simple strategy like a masterchef staking or does it have complex mechanics like leverage, risk of liquidation, many protocols involved, etc? The more pieces and components it needs will require a higher complexity score. This score is key in an emergency to evaluate how difficult it is to mitigate a live issue.The scores are below:

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

Longevity is how long the strategy has been running live on yearn.finance. Here’s the scores:

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

Up next, protocol safety. This is meant as an internal evaluation from yearn’s point of view of how resilient is the protocol the strategy works with regarding safety measures given the current DeFi security standards. It is heavily based on informed opinions regarding our internal assessments and due diligence compared to the top projects in DeFI. Accounts among other things for multisig health, decentralisation, bounty programs, audits, etc. 

We hope to improve this dimension with the help of the security and overall DeFI community to potentially use a standard scoring system that is widely accepted in the ecosystem to replace our current scoring table.

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

Team knowledge is about how the expertise of the strategy is shared amongst Yearn contributors. How many contributors can manage the strategy and respond in an emergency. The less people can manage and respond during an emergency the riskier the strategy assessment in this dimension.

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

Testing score is a metric of how much of the codebase for the strategy has been tested and uses the test coverage number as a reference. The higher the coverage means that the developer/strategist took time to test most of the operations of the strategy in a unit test or fork environment. This score assumes a less tested strategy entails more risk since it increases chances something was missed in normal operation of the strategy or other potential edge cases like a bug in the strategy’s accounting, a missed assumption about the underlying protocol, a hack or unexpected bad state on the underlying protocol, etc.

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

The TVL (total value locked) impact is a figure between 1 and 5 as well, where 5 is the highest impact labelled “extreme” (above 100MM) and 1 is the lowest impact in TVL less than 1MM. This table was proposed as a way to measure how to allocate to new riskier strategies without having a catastrophic event in case of a hack or issue. The lower the impact the more likely yearn’s treasury can recover from an incident. The TVL is measured in USD and grows dynamically based on strategies allocations onchain. Through [yearn.watch](https://yearn.watch/) we keep track of the TVL and risk score to make fund allocation decisions and mitigations in case a strategy group has fallen into the “red” high risk zone. 

Overall the risk framework turns yearn strategy deployment into a constant never ending preventive process of assessing and mitigating risks.
