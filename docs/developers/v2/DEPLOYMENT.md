# Deploying a Vault and Strategy V2

**Note**: This [private repo](https://github.com/yearn/chief-multisig-officer) is encouraged to create multiple scripts for governance and dev multisig execution of complex transactions.

## Requirements

Make sure you have the brownie environment set up before trying to deploy a vault. Check out the [Readme MD in Yearn Vaults Repo](https://github.com/yearn/yearn-vaults/blob/master/README.md) for instructions.

The below instructions show some python commands that assume you are using the brownie console or a brownie script setup.

## Deploying a new Experimental Vault

1. Clone the [Yearn Vaults Repo](https://github.com/yearn/yearn-vaults/) and run `brownie run scripts/deploy.py --network <network-to-deploy-vault>`
2. Choose the brownie account for deploying your vault. This account needs to have funds to pay for the deployment transaction.
3. Confirm the script is using the latest version of registry `v2.registry.ychad.eth` against the planned new release vault to be sure it's an updated version. (Can validate on Etherscan for latest address)
4. Select the version of the vault to deploy or press enter to use the latest release.
5. Enter `Y` when prompt to deploy Proxy Vault
6. Enter the checksummed address of the ERC20 token the vault will use.
7. Enter the vault Parameters (Below are some suggested values):
   - Set your address or an address you control as governance.
   - Set Treasury (`treasury.ychad.eth`) as the rewards address.
   - Set Core Dev multisig (`dev.ychad.eth`) as guardian.
   - Set Strategist multisig (`brain.ychad.eth`) as management.
   - Set name and symbol for vault or use suggested as default (can be changed on-chain later).
8. Confirm the Parameters are correct and press `y` and ENTER to deploy the vault.
9. Check new vault has ABI setup on Etherscan (Some vault versions from older releases may have verification issues with Vyper and proxy detection on Etherscan, consider using later releases >0.3.5 to ensure verification works).

10. Set deposit limit according to the table [below](#limits-per-stage)

   ```python
   vault.setDepositLimit(limit)
   ```

11. Set management fee to 0:

   ```python
   vault.setManagementFee(0)
   ```

12. (Optional) Set governance to ychad.eth (`0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52`) if vault is planned to be endorsed soon:

- Note you can still make changes to the vault after setting governance up until governance is accepted

```python
vault.setGovernance(ychad.eth)
```

## Deploying a new Strategy

1. Request access to a Core Dev strategist and create a new issue using the `Strategy Review` template in the strategies [private repo](https://github.com/yearn/yearn-strategies/issues) **Complete all the fields**.
2. If the strategy targets a new protocol/new chain not currently approved by yearn (used in production) it may also require due diligence and path to production plan documents for the strategy to be considered for endorsement.
   Example(s) [SNX](https://hackmd.io/0w1RZh7DSc27A9EyzlHbJQ?view)
3. Coordinate with Core Dev strategist for reviewing strategy
4. Have it peer-reviewed by at least **two** strategists.
5. Check if `want` token has a deployed vault already (>=v0.3.0) and coordinate to use that first if possible.
6. Coordinate with a core developer to set a proper deposit limit and other settings for the new vault. See the table below: [Limits per Stage](#limits-per-stage).
7. Deploy strategy and upload code to Etherscan for verification.

## Make the Vault and Strategy work together

1. Add strategy to vault (for vault code v0.3.3+):

   ```python
   strategy = ''                     # Your strategy address
   debt_ratio = 9800                 # 98%
   minDebtPerHarvest = 0             # Lower limit on debt add
   maxDebtPerHarvest = 2 ** 256 - 1  # Upper limit on debt add
   performance_fee = 1000            # Strategist perf fee: 10%

   vault.addStrategy(
     strategy,
     debt_ratio,
     minDebtPerHarvest,
     maxDebtPerHarvest,
     performance_fee
   )
   ```

   - `debt_ratio` should be `9800` if first strategy on vault.
   - `rate_limit` is `0` unless there is reason for it to be different.

2. Set keeper:

   ```python
   strategy.setKeeper(keep3r_manager)
   ```

   - `keep3r_manager` = `0x736D7e3c5a6CB2CE3B764300140ABF476F6CFCCF`

3. Set health check:

   ```python
   strategy.setHealthCheck(health_check)
   ```

   - `health_check` = `0xddcea799ff1699e98edf118e0629a974df7df012`

**NOTE**: see section on [health check](#health-checks) for more details.

1. Set rewards:

   ```python
   strategy.setRewards(address)
   ```

   - Read [below](<#sharer-contract>) if you want to use the sharer contract.

2. Run tests against "live" vault and strategy in mainnet-fork:

   - Harvest.
   - Profitable harvest.
   - Revoke strategy and check that funds return to the vault.
   - Increase/decrease debt + harvest, and check that the strategy is working well.
   - Migration.
   - Check that tokens in the strategy cannot be sweeped by dust collection.

   - **Example**: Hegic strat [repo](https://github.com/Macarse/yhegic/tree/master/tests/development).

## Test harvesting manually

> You can coordinate with the strategists if you need a UI to test.

1. Deposit some `want` tokens into the vault.
2. Do first `harvest` and make sure it worked correctly.

   ```python
   strategy.harvest()
   ```

3. Monitor `harvest` and `tend` triggers for first few days. Call `harvest`/`tend` manually.
4. If this is a new vault deployment, test deposit, withdraw, and transfer to ensure functionality is as expected.

## Scaling up / Moving to Endorse

In addition to the two strategist reviews, a Core Developer has to review the strategy before going into production.

1. Create an [issue](https://github.com/yearn/yearn-finance-v3/issues) in yearn's web repo to ensure that the new vault won't create any problems with the API and that all necessary token/vault metadata is ready. Additionally, if this vault needs to go in the "labs" category, it must be manually added to the website.
2. Increase deposit limit according to the table [below](#limits-per-stage)
3. Set management fee to production level:

   ```python
   vault.setManagementFee(200)
   ```

4. Set parameters for vault correctly before endorsement:

   - Set Governance to (`ychad.eth`)
   - Set Treasury (`treasury.ychad.eth`) as the rewards address.
   - Set Core Dev multisig (`dev.ychad.eth`) as guardian.
   - Set Strategist multisig (`brain.ychad.eth`) as management.
   - Set description and symbol for vault or use suggested as default (can be changed on-chain later)

5. Yearn's governance now must accept this vault's governance and endorse it:

```python
strategy.acceptGovernance()
registry.endorseVault(vault)
```

6. If using a Curve voter stategy, make sure to approve the new strategy on yearn's voterProxy:

```python
proxy.approveStrategy(gauge, strategy)
```

### Endorsing a vault from a previous release

1. Check for the latest release number in the registry contract
2. Check the apiVersion of the vault you want to endorse to identify the target release
3. Calculate the releaseDelta from your target release. (see registry endorseVault param details)
   E.g: latestRelease = 0.3.3 and numReleases = 5. New vault apiVersion is 0.3.2
   `releaseDelta = numReleases - 1 - releaseTarget`
4. Confirm using `registry.releases(uint256)` that your `targetRelease` has the same apiVersion as your vault.

   ```python
   releaseTarget = 3 # e.g vault api version 0.3.2
   releaseDelta = registry.numReleases() - 1 - releaseTarget # (5-1-3) = 1
   strategy.acceptGovernance() # from ychad.eth
   registry.endorseVault(vault, releaseDelta) # from ychad.eth.
   ```

## Publishing Your Strategy Description

The following steps are required for all strategies. These descriptions are pulled into the v3 website and used to generate strategy diagrams.

1. Create a pull request [at this link](https://github.com/yearn/yearn-meta/tree/master/data/strategies) to add a new `.json` file with your strategy description and details.
2. Using other strategy files as a reference, create a 1-2 sentence description for your strategy.
3. The author field is optional.

## Setting up Keep3r

1. Adjust trigger variables until they are correct:

   ```python
   strategy.setProfitFactor()
   strategy.setDebtThreshold()
   strategy.setMaxReportDelay()
   ```

2. Set strategy's Keep3r role to v2-keeper-contract:

   ```python
   strategy.setKeeper(0x736D7e3c5a6CB2CE3B764300140ABF476F6CFCCF)
   ```

3. Create an add-strategy PR in Keep3r [repo](https://github.com/yearn/yearn-keeper) (TBD)

## References

### Limits per Stage

These are the standard deposit limits per stage, and they can be adjusted on a case-by-case basis:

| Stage        | Limit  |
| ------------ | ------ |
| Experimental | $500K |
| Production   | $10M  |

### Sharer contract

"Sharer" is a contract for distributing/splitting strategist rewards. For boarding school graduates suggested split is 34% to strategist multisig and 66% to strategist – [Sharer Contract](https://github.com/Grandthrax/Sharer).

- Set up rewards for your strategy by calling `sharer.addContributors`.
- Include devs if you forked someone else's strategy.
- Be sure to reward people who helped you.
- You can find the sharer here: [0x2c641e14afecb16b4aa6601a40ee60c3cc792f7d](https://etherscan.io/address/0x2c641e14afecb16b4aa6601a40ee60c3cc792f7d)

### Health Checks

Since the v0.4.3 release, we have introduced the concept of Health Checks contracts to vaults and strategies. These are helper contracts that can validate the end state of a harvest, or critical transaction, to ensure the accounting stays within established safe parameters.

You can think of these contracts as on-chain unit tests, or "self asserts", ensuring that the end state of a critical transaction matches an expected condition. The design allows health checks to be configured per individual vault or strategy. If the "assert" doesn't match expectations, the entire transaction will revert and require manual intervention by strategists or core devs.

Vaults from release v0.4.3 and onward, support attaching an on-chain health check contract to be called after every harvest report.

## Note on Health Checks Backward Compatibility

The health checks are designed to be backward compatible. To target already deployed vaults, we released a patch for each tagged release of `BaseStrategy`. e.g:

v0.3.5 -> [v0.3.5-1](https://github.com/yearn/yearn-vaults/tree/v0.3.5-1) (compatible version)

## Adding Health Checks to your strategy

1. Before deploying a strategy with [brownie-strategy-mix](https://github.com/yearn/brownie-strategy-mix) make sure your `brownie-config.yml` points to the correct patched vault version, to get a Health Check enabled `BaseStrategy` imported to your strategy.

2. To interact with the health check contract, no change should be necessary on your extended `Strategy` logic. **IMPORTANT**: Check your contract size to see if refactoring is needed for compilation.

3. Update your unit tests to set to the common Health Check contract [health.ychad.eth](https://etherscan.io/address/0xddcea799ff1699e98edf118e0629a974df7df012)

```python
commonHealthCheck = Contract(web3.ens.resolve(“health.ychad.eth”))
strategy.setHealthCheck(commonHealthCheck)
```

4. Test your normal harvest operations using mainnet-fork and unit tests to validate that the integration is working correctly.

## Health Check Operations

A global setting check against deviations in reported profit and losses within a safe interval. Any report/harvest that falls outside this global safe interval will report.

If a harvest/report revert transaction is detected on-chain, manual intervention is required to debug and accept the transaction into the vaults accounting. This should be done after proper validation by the strategist's multi-sig and Core Devs group.

Disabling health checks is meant to be a one-time special event using the following steps:

```python
# disables next health check on harvest
strategy.setDoHealthCheck(false, { account: brain.ychad.eth })

# do harvest with profit/loss deviation
strategy.harvest()
```

After this manual harvest, the health check will be automatically enabled back for further harvests.

**NOT RECOMMENDED**: Health checks can be disabled permanently by setting the health check contract to address `0x0` in the Strategy Contract. This should be done only in extreme circumstances and if you know what you are doing.

## Customizing Health Checks

The Common Health Check Contract `health.ychad.eth` uses a global default setting for profit and loss.

It also supports setting specific profit/loss limit checks per strategy via the following operation:

```python
strategy = ''; # strategy address
profitLimit = 100 # in bps
lossLimit = 100 # in bps
healthcheck.setStrategyLimits(strategy, profitLimit, lossLimit)
```

Finally, if needed, a custom Health Check contract can be deployed and attached to the standard Health Check contract, which works as a registry. You can attach a custom Health Check to a strategy using the following operation:

```python
strategy = ''; # strategy address
customHealthCheck = '' # custom health check address

healthcheck.setCheck(strategy, customHealthCheck)
```

Custom Health Check **must** follow the interface for [custom health checks](https://github.com/yearn/yearn-vaults/blob/3bea2d8c070efeb05bc02d7d0136120bc516af4b/contracts/CommonHealthCheck.sol#L5)

### Ethereum Addresses

| Identity               | ENS                   | Address                                    |
| ---------------------- | --------------------- | ------------------------------------------ |
| V2 Registry            | v2.registry.ychad.eth | [0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804](https://etherscan.io/address/0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804) |
| Yearn multisig (daddy) | ychad.eth             | [0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52](https://etherscan.io/address/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52) |
| Strategist multisig    | brain.ychad.eth       | [0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7](https://etherscan.io/address/0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7) |
| Core Dev multisig      | dev.ychad.eth         | [0x846e211e8ba920B353FB717631C015cf04061Cc9](https://etherscan.io/address/0x846e211e8ba920B353FB717631C015cf04061Cc9) |
| Treasury               | treasury.ychad.eth    | [0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde](https://etherscan.io/address/0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde) |
| Health Check           | health.ychad.eth      | [0xDDCea799fF1699e98EDF118e0629A974Df7DF012](https://etherscan.io/address/0xDDCea799fF1699e98EDF118e0629A974Df7DF012) |

### Fantom Addresses

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| Registry               | [0x727fe1759430df13655ddb0731dE0D0FDE929b04](https://oklink.com/fantom/address/0x727fe1759430df13655ddb0731dE0D0FDE929b04) |
| Strategist multisig    | [0x72a34AbafAB09b15E7191822A679f28E067C4a16](https://oklink.com/fantom/address/0x72a34AbafAB09b15E7191822A679f28E067C4a16) |
| Governance multisig    | [0xC0E2830724C946a6748dDFE09753613cd38f6767](https://oklink.com/fantom/address/0xC0E2830724C946a6748dDFE09753613cd38f6767) |
| Treasury               | [0x89716ad7edc3be3b35695789c475f3e7a3deb12a](https://oklink.com/fantom/address/0x89716ad7edc3be3b35695789c475f3e7a3deb12a) |
| Health Check           | [0xf13Cd6887C62B5beC145e30c38c4938c5E627fe0](https://oklink.com/fantom/address/0xf13Cd6887C62B5beC145e30c38c4938c5E627fe0) |

### Arbitrum Addresses

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| Registry               | [0x3199437193625DCcD6F9C9e98BDf93582200Eb1f](https://arbiscan.io/address/0x3199437193625DCcD6F9C9e98BDf93582200Eb1f) |
| Strategist multisig    | [0x6346282DB8323A54E840c6C772B4399C9c655C0d](https://arbiscan.io/address/0x6346282DB8323A54E840c6C772B4399C9c655C0d) |
| Governance multisig    | [0xb6bc033D34733329971B938fEf32faD7e98E56aD](https://arbiscan.io/address/0xb6bc033D34733329971B938fEf32faD7e98E56aD) |
| Treasury               | [0x1DEb47dCC9a35AD454Bf7f0fCDb03c09792C08c1](https://arbiscan.io/address/0x1DEb47dCC9a35AD454Bf7f0fCDb03c09792C08c1) |
| Health Check           | [0x32059ccE723b4DD15dD5cb2a5187f814e6c470bC](https://arbiscan.io/address/0x32059ccE723b4DD15dD5cb2a5187f814e6c470bC) |
