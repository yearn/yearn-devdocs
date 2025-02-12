# Adding Assets to yPools

Follow these steps to enable the inclusion of new assets into yETH via governance proposal and voting.

:::info[Pre-requisites]

You will need access to the necessary governance contracts and a sufficient voting weight of at least 100 to create proposals. You can check your voting weight [here](https://etherscan.io/address/0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4#readContract#F13).

:::

## Steps

### Step 1: Check Inclusion Vote Status

Since the adoption of [this](https://snapshot.org/#/ylsd.eth/proposal/0x139698bed7752b80a16bb6d2fc0d9e8c82b622916ded2f064022be3c46ec9bb4) proposal, inclusion voting is off by default and needs to be enabled for the next epoch

### Step 2: Enable One-Off Inclusion Vote

To enable a one-off inclusion vote, a governance call must be made to the set_enable_epoch(next_epoch) function on the [InclusionVote contract](https://etherscan.io/address/0x6bc0878939669339e82dbFa13d260c89230f2c31#code).

This step requires crafting and approving a governance proposal. Follow the instructions [here](create-gov-proposal.md) to do that successfully.

### Step 3: Eligible Tokens for Voting

Any token that has applied for inclusion and has a rate provider set by Yearn will be eligible for this inclusion vote.

### Step 4: Outcome

Once the vote is complete, the winner (if any) will be included into yETH.
