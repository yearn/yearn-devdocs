---
rpcCalls:  
  - name: 'yPools Inclusion'
    chain: '1'
    address: '0x6bc0878939669339e82dbFa13d260c89230f2c31'
    abiName: 'yPoolsInclusionVoteABI'
    methods:  
      - 'epoch'
---
<!-- markdownlint-disable MD037 -->

# Create a Governance Proposal

:::info[Pre-requisites]

You will need access to the necessary governance contracts and a sufficient voting weight of at least 100 to create proposals. You can check your voting weight [here](https://etherscan.io/address/0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4#readContract#F13).

:::

## Step 1: Craft the Proposal Script

1. Generate a script by calling the `script(_to, _data)` view function on the [Executor contract](https://etherscan.io/address/0x71258Ee726644f1D52d6A9F5E11C21d1E38c2bF1#readContract#F1).

   In this case, set the `_to(address)` field to the [InclusionVote contract](../../addresses/ypools-contracts.md#yeth-contract-addresses) `0x6bc0878939669339e82dbFa13d260c89230f2c31` and use ABI-encoded data for the function set_enable_epoch(next_epoch) as the calldata (_data).

   <AbiEncodingWidget defaultAbi='yPoolsInclusionVoteABI' defaultFunction='set_enable_epoch' functionArg='20'/>

2. To enable multiple calls in a single proposal, concatenate the scripts together.

## Step 2: Submit a Governance Proposal

1. You can create the proposal via the [proposal page](https://yeth.yearn.fi/propose) or directly by calling the propose(ipfs_hash, script) function on the [GenericGovernor contract](https://etherscan.io/address/0xB7a528CF6D36F736Fa678A629b98A427d43E5ba5).
2. The ipfs_hash should point to a document hosted on IPFS with details explaining the proposal and its rationale. You can host your own IPFS document or use a provider like [Piñata](https://pinata.cloud/).

## Step 3: Proposal Approval and Execution

Once the proposal is created, the governance process will need to:

1. Approve the proposal.
2. Execute the set_enable_epoch(next_epoch) function to enable the inclusion vote for the next epoch.
