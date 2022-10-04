# Security Home

Information about Yearn's security processes, team members, disclosures, PGP keys and more can be found in the [/yearn-security](https://github.com/yearn/yearn-security) repo on Github.

## Vulnerability disclosure process

Potential vulnerabilities are welcome to be disclosed following the guidelines established in [/yearn-security/SECURITY.md](https://github.com/yearn/yearn-security/blob/master/SECURITY.md). Valid vulnerabilities may be eligible for bounty rewards.

## Third-party audits

The core contracts found in [yearn-vaults](https://github.com/yearn/yearn-vaults/) repository have been audited by multiple independent third-party firms:
- [MixBytes](https://mixbytes.io/) has audited v0.2.1, public report [available here](https://github.com/yearn/yearn-security/tree/master/audits/202012_MixBytes_yearn-vaults)
- [ChainSecurity](https://chainsecurity.com/) has audited v0.3.5, public report unavailable
- [Trail of Bits](https://www.trailofbits.com/) has audited v0.4.2, public report [available here](https://github.com/yearn/yearn-security/tree/master/audits/20210719_ToB_yearn_vaultsv2)

Yearn is much bigger than its core, the DAO has a rigorous review process for its contracts, and retains independent auditors which review Strategies and other protocol components.

Other public reports can be found under [yearn-security/audits](https://github.com/yearn/yearn-security/tree/master/audits).

## Security assumption

Yearn as a protocol hinges on the critical assumption that the `Governance` role is honest. This role is currently controlled by a [6 of 9 Gnosis Safe multisig](https://gov.yearn.finance/t/yip-62-change-two-multisig-signers/10758).

A compromised or malicious Governance can cause catastrophic damage across the entire protocol.

It is a conscious design decision that this role is not behind a time lock. Priority is given to the ability to rapidly update and iterate on live vaults, strategies, and other components. Both so as not to advertise new investment strategies in advance, but also to rapidly improve our existing components without interruption. It also avoids downtimes whenever there is a bug or security vulnerability that needs to be fixed.

Trusting `Governance` to be honest is a prerequisite to trusting Yearn's vaults.

Modifications to these design decisions can be proposed in the forum through [Yearn's governance process](https://gov.yearn.finance/t/yip-61-governance-2-0/10460).


## Testing

Vault tests are done using brownie and the [ganache CLI](https://trufflesuite.com/docs/ganache/) development network.

To see test coverage you can have a look at the [CI](https://github.com/yearn/yearn-vaults/actions/workflows/test.yaml) you must look for a run that runs `Run build test_duration`. The tests are run once a month together to compute the duration cache, then they are split into several test pipelines to speed up testing.