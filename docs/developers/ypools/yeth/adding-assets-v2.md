---
rpcCalls:  
- name: 'yPools Governance'
  chain: '1'
  address: '0xB7a528CF6D36F736Fa678A629b98A427d43E5ba5'
  abiName: 'yPoolsGenericGovernorABI'
  methods:  
  - 'epoch'
  - 'propose_open'
  - 'vote_open'
  - 'genesis'


sidebar_label: Adding Assets to yETH
---
<!-- markdownlint-disable MD037 -->

# Adding Assets to yETH

:::info[Pre-requisites]

You will need access to the necessary governance contracts and a sufficient voting weight of at least 100 to create proposals. You can check your voting weight [here](https://etherscan.io/address/0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4#readContract#F13).

:::

:::yearnData[Live yETH Governance Info]

<GovDataYPools/>

:::

## Step 1: Enable One-Off Inclusion Vote

Since the adoption of [this proposal](https://snapshot.org/#/ylsd.eth/proposal/0x139698bed7752b80a16bb6d2fc0d9e8c82b622916ded2f064022be3c46ec9bb4), inclusion voting is off by default and needs to be enabled for the next epoch. Here is how you do that.

To enable a one-off inclusion vote, a governance call must be made to the `set_enable_epoch(next_epoch)` function on the [InclusionVote contract](https://etherscan.io/address/0x6bc0878939669339e82dbFa13d260c89230f2c31#code). This requires crafting and getting a governance proposal approved. Follow the instructions below:

1. Create the text of your proposal and pin it to IPFS. The ipfs_hash should point to a document hosted on IPFS with details explaining the proposal and its rationale. You can host your own IPFS document or use a provider like [Piñata](https://pinata.cloud/). For this, you should explain why you want to enable an inclusion vote, what assets you want to propose, etc.

2. Generate a script by calling the `script(_to, _data)` view function on the yPools [Executor contract](https://etherscan.io/address/0x71258Ee726644f1D52d6A9F5E11C21d1E38c2bF1#readContract#F1). In this case, you want this script to call `set_enable_epoch()` on the InclusionVote contract with the value of the next epoch.

    - Set the`_to(address)` field to the [InclusionVote contract](../../addresses/ypools-contracts.md#yeth-contract-addresses): `0x6bc0878939669339e82dbFa13d260c89230f2c31`.
    - Then create the ABI-encoded data for the function `set_enable_epoch()` with the argument set to the next epoch. Below is a ABI encoding widget that you can use. It should be pre-populated with the correct contract and function, but you need to enter the next epoch. The current epoch should be listed at the top of this page in the `Live Governance Info` admonition box. Just add 1 to that number. Take the output from the widget and put it in the `_data(bytes)` field.
    - Click `query` and copy the result.

<!-- get next epoch value for functionArg. get epoch from rpc call passed to wrapper -->
   <AbiEncodingWidget defaultAbi='yPoolsInclusionVoteABI' defaultFunction='set_enable_epoch'/>

3. You can now create the proposal via the [proposal page](https://yeth.yearn.fi/propose) or directly by calling the `propose(ipfs_hash, script)` function on the [GenericGovernor contract](https://etherscan.io/address/0xB7a528CF6D36F736Fa678A629b98A427d43E5ba5). Enter the IPFS pin and the script value that you created in steps one and 2.

4. Once the proposal is created, the governance process will need to:
    - Approve the proposal.
    - Execute the set_enable_epoch(next_epoch) function to enable the inclusion vote for the next epoch.

## Step 2: Apply for Inclusion

To apply to have an LST included in yETH's basket of tokens, you will need to fill out the application form and pay a non-refundable application fee. Any token that has applied for inclusion and has a rate provider set by Yearn will be eligible for the inclusion vote that was enabled above.

## Step 3: Outcome

Once the vote is complete, the winner (if any) will be included into yETH.
