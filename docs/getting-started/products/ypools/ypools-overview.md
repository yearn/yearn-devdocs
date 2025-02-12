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
---

# yPools

![image](/img/product-pages/ypools-banner3.png)

yPools are user-governed baskets of similar assets, typically liquid staking tokens(LSTs). They serve as both a re-balancing index and liquidity pool (AMM) of the underlying tokens. This AMM model, combined with governance and incentive mechanisms, aims to provide an optimal risk-adjusted yield by dynamically adjusting the weights of the LST tokens in the pool.

Users can stake their yPool tokens to mint st-yTokens, accrue yield, and later unstake st-yTokens to receive yPool tokens back according to their earnings. Only stakers receive yield and slashings from the underlying yield sources and earn incentives if they participate and vote in their respective yPool's governance process.

## Governance at a Glance

yPools are governed by their depositors, who stake their yPool tokens for governance power. Once staked, yPool token holders can set pool parameters, weights as well as vote on whitelisted pool assets. The governance process follows a 4 week cadence of *epochs* where the first 3 weeks are reserved for proposals for new LSTs to be added to the pool and a final week where proposals and pool weights are voted on.

:::yearnData[Live Governance Info]

<GovDataYPools/>

:::

## yETH

The inaugural yPool is yETH, which is a basket of LSTs of Beacon Chain ETH (stETH, rETH, etc.), earning Ethereum's Validator Staking rewards.

<PrettyLink>[yETH Docs](./yeth/overview)</PrettyLink>

<PrettyLink>[yETH dApp](https://yeth.yearn.fi/)</PrettyLink>

## More Info

Want to dive into the details? Check out the Developer Docs:
<PrettyLink>[yPools Developer Docs](/developers/ypools/ypools-overview)</PrettyLink>
