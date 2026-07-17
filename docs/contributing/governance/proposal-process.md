# Proposal Process

[stYFI](/contributing/governance/styfi) token holders govern the Yearn ecosystem through offchain proposals and votes via [Snapshot](https://snapshot.org/#/s:styfi.eth). Proposals that generate majority support (>50% of the vote) are expected to be implemented by the proposed relevant parties. The 9-member [yChad multi-signature wallet](/developers/security/multisig) is then empowered to execute all related transactions after their own review. The [members of the multi-signature wallet](/developers/security/multisig#members) are voted in by YFI holders and are subject to change via future governance votes.

## Discussion

Public discussion regarding changes to the protocol happens mostly on the [Governance Forum](https://gov.yearn.fi/). Other, informal discussion may also happen on [Discord](https://discord.gg/yearn) and [Telegram](https://t.me/yearnfinance), although all final language and implementation details are expected to be presented on the governance forum.

Getting as much feedback as possible from the various Yearn stakeholders is recommended before introducing a formal proposal. The governance forum and Discord server have dedicated channels for proposals and governance.

## Proposals

**Yearn Improvement Proposals** (YIPs) are Yearn's comprehensive vehicle for exercising governance power. 

#### Previous and current proposals

- Previous: [Proposal Repository](/contributing/governance/proposal-repository)
- Current: [Snapshot](https://snapshot.org/#/s:styfi.eth)

#### Requirements to pass proposals

- 3 day discussion on the [forum](https://gov.yearn.fi/)
  - At least 50% vote 'for' the change
- 1 stYFI in possession to submit to snapshot
- 5 day [snapshot](https://snapshot.org/#/s:styfi.eth) with over 50% passing votes

### Making a proposal

Anyone can post a proposal on the forum for discussion. If it successfully gets over 50% of "for" votes on the forum, then it can move to the token weighted voting step via [Snapshot](https://snapshot.org/#/s:styfi.eth). Posting a vote to snapshot requires holding 1 stYFI. If your proposal made it to the snapshot phase and you don't have enough stYFI, you must find someone with at least 1 stYFI to propose on your behalf.

The default template for proposals can be found on [GitHub](https://github.com/yearn/YIPS/blob/master/yip-X.md) + on the [forum](https://gov.yearn.fi), if you post under "proposals" or "discussion" it will auto-fill in the template as well.

**Resources**:

- [Proposal How-To](https://gov.yearn.fi/t/proposal-how-to/106)
- [YIP 0: YIP Purpose and Guidelines](/contributing/governance/yips/yip-0)
- [YIP 44: Improve YIP Categories](/contributing/governance/yips/yip-44)
- [YIP 55: Formalize the YIP Introduction and Voting Process](https://gov.yearn.fi/t/yip-55-formalize-the-yip-process/7959)

## Voting

#### How do I vote?

- Holding [stYFI](/contributing/governance/styfi) enables you to vote on Yearn's [Snapshot](https://snapshot.org/#/s:styfi.eth) page

#### What’s the difference between voting for a poll on the forum and an offchain vote?

- A poll gauges the sentiment of what the community is feeling on the proposal while an offchain vote (via [Snapshot](https://snapshot.org/#/s:styfi.eth)) will be binding and will be considered binding if it passes.

## Implementation

Once a Snapshot vote has passed, changes will be implemented by Yearn's protocol or operations team and signed by the multi-sig, if necessary.

## Guardian Role

Per [YIP-81](https://snapshot.box/#/s:veyfi.eth/proposal/0x6f3082db2cef3e0c254e569580d063cb14130a92d0bf1729bef342a386e419f2), the [Yearn Multisig](/developers/security/multisig) (AKA yChad) serves in the Guardian role to steward and protect the Yearn Protocol and its participants. The Guardian role is defined as being able to **"nullify a proposal or governance decision but cannot make proposals"**.
