# Vote Locked yCRV

### Overview
vl-yCRV is a segment of the yCRV system that allows users to vote using Yearn's veCRV, where 1 vote locked yCRV is worth 1 veCRV.

We expect this system to be especially useful protocols that seek to boost emissions to their pool's Curve gauges without committing to a 4-year veCRV lock or repeatedly submitting large bribes.

### Voting on vl-yCRV
- Voting periods last 14 days.
- Users can vote on a single gauge or split their votes across multiple gauges.
- Users must vote every period. Votes cannot carry over automatically from one period to the next.
- Voting is all on-chain and therefore is not cost-free. Consider voting when the network is not particularly congested.

### Locks
- A vote lock lasts a minimum of 1 voting period (14 days) and no more than 21 days depending on when the vote was cast.
- Each vote re-ups a user's lock for the remainder of the current period plus the full duration of the next period.
- After unlock time has expired, users can withdraw from vl-yCRV and move freely within the yCRV system.

### Bribes and Incentives
- While in vl-yCRV, users forego yield from other parts of the yCRV system
- vl-yCRV users will not collect bribes on the gauges they vote for
