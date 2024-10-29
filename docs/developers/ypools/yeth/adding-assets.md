# Adding Assets to yPools

Follow these steps to enable the inclusion of new assets into yETH via governance proposal and voting.

## Prerequisites

You will need access to the necessary governance contracts and a sufficient voting weight of at least 100 to create proposals.

## Steps

### Step 1: Check Inclusion Vote Status

Since the adoption of [this](https://snapshot.org/#/ylsd.eth/proposal/0x139698bed7752b80a16bb6d2fc0d9e8c82b622916ded2f064022be3c46ec9bb4) proposal, inclusion voting is off by default.

### Step 2: Enable One-Off Inclusion Vote

To enable a one-off inclusion vote, a governance call must be made to the set_enable_epoch(next_epoch) function on the [InclusionVote contract](https://etherscan.io/address/0x6bc0878939669339e82dbFa13d260c89230f2c31#code).

This step requires crafting and approving a governance proposal.

### Step 3: Craft the Proposal Script

1. Generate a script by calling the script(target, calldata) view function on the [Executor contract](https://etherscan.io/address/0x71258Ee726644f1D52d6A9F5E11C21d1E38c2bF1).
2. To enable multiple calls in a single proposal, concatenate the scripts together.
3. In this case, set the target as the InclusionVote contract and use ABI-encoded data for the function set_enable_epoch(next_epoch) as the calldata.

### Step 4: Submit a Governance Proposal

1. You can create the proposal via the [proposal page](https://yeth.yearn.fi/propose) or directly by calling the propose(ipfs_hash, script) function on the [GenericGovernor contract](https://etherscan.io/address/0xB7a528CF6D36F736Fa678A629b98A427d43E5ba5).
2. The ipfs_hash should point to a document hosted on IPFS with details explaining the proposal and its rationale.

### Step 5: Voting Requirements

You will need at least 100 voting weight to create a proposal and begin the voting process.

### Step 6: Proposal Approval and Execution

Once the proposal is created, the governance process will need to:

1. Approve the proposal.
2. Execute the set_enable_epoch(next_epoch) function to enable the inclusion vote for the next epoch.

### Step 7: Eligible Tokens for Voting

Any token that has applied for inclusion and has a rate provider set by Yearn will be eligible for this inclusion vote.

### Step 8: Outcome

Once the vote is complete, the winner (if any) will be included into yETH.
