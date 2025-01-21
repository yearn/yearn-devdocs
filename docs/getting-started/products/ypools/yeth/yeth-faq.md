# Frequently Asked Questions

### How does yETH earn APY?

yETH earns APY through various sources:

- Swap fee income from the Automated Market Maker (AMM)
- Incentives fee income, which are incentives for staker participation in governance
- Liquid Staking Token (LST) income from staked ETH yield
- Buying LSTs at a discount
- Whitelisting fees

However, there are also deductions such as Beacon Chain slashings and a 10% Yearn performance fee on profits.

Please note that yield is paid out one week after it is generated. The yield generated in week N is streamed out in week N+1.

### What other benefits does yETH give holders?

yETH provides diversification by holding a basket of LSTs, which helps to spread the risk.

### How is yield passed onto stakers?

LST Protocols generate yield and update their on-chain rates. This results in yETH being minted and sent to st-yETH.

### Can I withdraw multiple LSTs?

Yes, you can withdraw multiple LSTs or just one LST. However, your withdrawal cannot cause an LST to leave its safety bands around its target weight. For example, if a pool has a weight of 20% and a band of 5%, the actual weight is allowed to be between 15% and 25%. This caps losses to at most 25%, assuming that token permanently depegs and goes to 0. In that worst-case scenario, yETH depegs to 0.75 ETH, because you can always do a balanced withdrawal of all the assets, of which only 25% is worthless. Compare this with holding the token by yourself, you’d be -100%.

### Is there slippage with proportional withdrawal?

No, there is no slippage with proportional withdrawal.

### How do I vote?

Every 4th week (known as an epoch in yPools speak), st-yETH holders can vote on the composition of yETH. You can do that here: https://yeth.yearn.fi/vote?action=weight

You must have held st-yETH from the beginning of the epoch . Your voting power grows over time. Read more about how it is calculated [here](/developers/ypools/ypools-overview#st-ytoken-user-vote-weight)
