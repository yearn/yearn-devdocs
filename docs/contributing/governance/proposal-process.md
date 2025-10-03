# Proposal Process

[veYFI](https://docs.yearn.fi/contributing/governance/veyfi) token holders control the Yearn ecosystem through off-chain proposals and votes via [Snapshot](https://snapshot.org/#/ybaby.eth). Proposals that generate majority support (>50% of the vote) are implemented by a 9-member multi-signature wallet, and 6 out of 9 wallet signers must sign for a change to be implemented. The [members of the multi-signature wallet](https://docs.yearn.fi/developers/security/multisig#members) were voted in by YFI holders and are subject to change from future governance votes.

## Discussion

Discussion regarding changes in the protocol happens on a variety of platforms, such as:

- [Governance Forum](https://gov.yearn.fi/)
- [Discord](https://discord.gg/yearn)
- [Telegram](https://t.me/yearnfinance)

Getting as much feedback as possible from the various communication channels is recommended before introducing a formal proposal. The governance forum and Discord server have dedicated channels for specific topics.

## Proposal

### Types of proposals

**Yearn Improvement Proposals** (YIPs) are an all-encompassing vehicle for exercising power that token holders have. After [YIP-61](https://gov.yearn.fi/t/yip-61-governance-2-0/10460), **Yearn Delegation Proposals** (YDPs) were introduced, which allow token holders to change where any discrete decision-making power is delegated.

![](https://i.imgur.com/ZRNp2Zq.png)

#### Previous and current proposals

- Previous: [Proposal Repository](https://docs.yearn.fi/contributing/governance/proposal-repository)
- Current: [Snapshot](https://snapshot.org/#/ybaby.eth)

#### Requirements to pass proposals

- 3 day discussion on the [forum](https://gov.yearn.fi/)
  - At least 50% vote 'for' the change
- 1 veYFI in possession to submit to snapshot
- 5 day [snapshot](https://snapshot.org/#/ybaby.eth) with over 50% passing votes

### Making a proposal

Anyone can post a proposal on the forum for discussion within the community. If it's promoted to off-chain votation (via [Snapshot](https://snapshot.org/#/ybaby.eth)), only someone holding 1 veYFI can submit it to Snapshot. If your proposal made it to off-chain votation and you don't have enough veYFI, mods will help you through this stage.

The default template for proposals can be found on [GitHub](https://github.com/yearn/YIPS/blob/master/yip-X.md) + on the [forum](https://gov.yearn.fi), if you post under "proposals" or "discussion" it will auto-fill in the template as well.

**Resources**:

- [Proposal How-To](https://gov.yearn.fi/t/proposal-how-to/106)
- [YIP 0: YIP Purpose and Guidelines](https://yips.yearn.fi/YIPS/yip-0)
- [YIP 44: Improve YIP Categories](https://yips.yearn.fi/YIPS/yip-44)
- [YIP 55: Formalize the YIP Introduction and Voting Process](https://gov.yearn.fi/t/yip-55-formalize-the-yip-process/7959)

## Voting

#### How do I vote?

- Holding [veYFI](https://docs.yearn.fi/contributing/governance/veyfi) enables you to vote on Yearn's [Snapshot](https://snapshot.org/#/ybaby.eth) page

#### What’s the difference between voting for a poll on the forum and an off-chain vote?

- A poll gauges the sentiment of what the community is feeling on the proposal while an off-chain vote (via [Snapshot](https://snapshot.org/#/ybaby.eth)) will be binding and will take effect if it passes.

## Implementation

Once a Snapshot votes have passed, changes will be implemented by Yearn's protocol or operations team and signed by the multi-sig, if necessary.

## Guardian Role

Per [YIP-81](https://snapshot.box/#/s:veyfi.eth/proposal/0x6f3082db2cef3e0c254e569580d063cb14130a92d0bf1729bef342a386e419f2), the [Yearn Multisig](/developers/security/multisig) (AKA yChad) serves in the Guardian role to steward and protect the Yearn Protocol and its participants. The Guardian role is defined as being able to **"nullify a proposal or governance decision but cannot make proposals"**.
