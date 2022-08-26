# How to Understand Strategies Descriptions

Navigating [yearn.watch](https://yearn.watch/) strategies descriptions may expose you to terms that you have never seen, this page contains a complete glossary on what each term means when used to describe strategies for yearn vaults.

It complements our DeFi [Glossary](../../resources/defi-glossary) and it's more focused only on the words used by strategy descriptions and shorter explanations.

- Regular links navigate between the glossary.
- Links marked with ↗ go to external websites.

# Yearn

### yVault / Yearn Vault
- [Smart contract↗](https://ethereum.org/en/developers/docs/smart-contracts/) that holds user deposits and allocates into different strategies (up to 20 in the current version 2).
### yvToken / Token
- Token is any [ERC20-compatible↗](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) DeFi token.
- Yearn Vault Token (yvToken) is an ERC20-compatible token that represents a [position](#position).
- For example: yvDAI represents a position in the DAI Yearn Vault.
### Strategy
- A [smart contract↗](https://ethereum.org/en/developers/docs/smart-contracts/) that knows how to allocate funds into a specific [yield](#yield--profit)-generating strategy.
### Strategist
- A person that creates and maintains one or more strategies.

# Finance

### Yield / Profit
- Money (or tokens) made by an investment that surpasses the invested initial amount.
### Interest
- Fee charged for [lending](#lend--borrow-against) money.
### Compound / Autocompound
- Compound is when you deposit yields into the same investment that it came from.
- Autocoumpound is when a tool does compounding automatically for you.
- There is also a protocol called Compound Finance (COMP) but that is different.
### Position
- Total amount of money (or tokens) allocated into a investment.
### Hedge
- A position in a contrarian investment to one you already have, so if things go wrong in one thesis you offset losses by gains in the other position. 
### Arbitrage
- Buy and Sell tokens for instant [profit](#yield--profit). For example: Eth is 2000$ at one place and 1950$ at another, so you quickly buy from the cheaper source and sell on the more expensive source for 50$ profit.  
### Vest
- Gradual [unlocking](#unlock) of tokens or stocks.
- For example: if you receive 4000 tokens in a 4 year vesting it usually means you get 1000 tokens/year (unlocked on a daily or monthly basis depending on the contract).
### Collateral
- An amount of money (or tokens) that gets [locked](#lock--unlock) until a pre-determined agreement is met, commonly at risk of [liquidation](#liquidation)
### Liquidation
- When you fail to repay a [loan](#lend--borrow-against) or other agreement which involves [collateral](#collateral) and the collateral is sent to other parties to repay and make them whole, so you can't access the collateral anymore.
- For example: you add 100 Eth as collateral and borrow 75% of it's value as dollars, but you fail to repay the loan in due time, so your collateral gets *liquidated* which costs you 25% of the initial amount deposited.

### Lend / Borrow Against
- Lending is when you provide liquidity to someone else for some time and expect them to pay you back in the future.
- Borrowing is when you take money from a lender.
- Borrowing *against* is used to specify the collateral used by the borrower. Example: "I borrowed 5000$ against my car, so if I don't repay the loan the bank can take it".
- In DeFi this operation is always collateralized since there are no resources to charge debt.

# DeFi

### Yield Aggregator / Yield Optimizer
- DeFi protocols like Yearn that provides a single interface that aggregates/optimizes users deposits in a single place and reallocates them in an optimal way.
### Supply / Deposit / Stake
- Might be used interchangeably sometimes, but it often means that tokens are sent to a contract external to a [strategy](#strategy).
- Supply often means that the money is being [lent](#lend--borrow-against)
### Harvest / Collect / Claim
- When a [strategy](#strategy) collects [profits](#yield--profit) or [rewards](#rewards) in a blockchain transaction.
### Sell / Buy
- Market buy or sell tokens on a Decentralized Exchange like [Uniswap](#uniswap) or Sushiswap.
### Rewards
- Tokens earned by a protocol-incentivized action.
- For example: if you deposit liquidity into Uniswap you get trading fees, but you also get UNI *rewards* for doing this at Uniswap and not at SushiSwap.
### Lock
- Tokens that are locked can't be used until a specific condition is met.
### Unlock
- Unlocking refers to meeting a condition and receiving locked tokens.
### Liquidity Provider
- Liquidity Provider is anyone that invest tokens in a protocol.
### Joint Liquidity Provider
- Joint [Liquidity Provider](#liquidity-provider) is when your tokens are aggregated with another person's tokens in order to provide liquidity together.
### Liquidity Pool
- A [Liquidity Pool↗](https://www.coindesk.com/learn/what-are-liquidity-pools/) is a decentralized market for 2 (or more) tokens.
### Stable Pool
- A Stable Pool is a Liquidity Pool made only of stablecoins.
### Impermanent Loss
- When you lose money for being a liquidity provider to liquidity pools when compared to just holding the 2 (or more) tokens in your wallet, it happens when the market price ratio for the tokens diverges from the value that they had when you provided liquidity, which is why it can also be called Divergence Loss.
### Uniswap
- The [Uniswap↗](https://app.uniswap.org/#/swap?chain=mainnet↗) protocol, a decentralized exchange that aggregates many Liquidity Pools, used to buy and sell tokens.
- The Uniswap protocol has a v1, v2 and v3, when you read "Uniswap" it refers to v2, the v3 is always explicitly mentioned like "Uniswap v3".
### DAI / USDT / USDC
- The three largest stablecoins in the market, pegged to the dollar value, so 1 token represents 1 dollar.
### Curve
- Curve is the most well-known and largest stablecoin swap protocol.
- CRV is the token it emits and is locked to receive curve protocol [profits](#yield--profit).
### 3pool
- 3pool refers to the [DAI / USDT / USDC](#usdc--dai--usdt) curve [liquidity pool](#liquidity-pool).
### Tricrypto
- Tricripto refers to the wBTC + wETH + USDT curve [liquidity pool](#liquidity-pool).
### Curve Boost / Curve Gauge
- Locking up CRV on Curve allows you to boost your CRV [rewards](#rewards) for being a liquidity provider.
- Read more at curve [docs↗](https://resources.curve.fi/reward-gauges/boosting-your-crv-rewards).
### Convex
- A protocol that made locked CRV (called veCRV) tradeable and managed to amass huge liquidity and control more than 50% circulating CRV. [docs↗](https://docs.convexfinance.com/convexfinance/general-information/why-convex).
### Flashloan / Flashlend
- Loan, use, and payback tokens in a single blockchain transaction.
- Often used to amass high liquidity for a quick operation where you don't have it.
### Mint
- The creation of new tokens.
- For example: new DAI is *minted* when someone [borrows against](#lend--borrow-against) Eth.
### Flashmint
- [Flashloan](#flashloan--flashlend) tokens to [mint](#mint) new ones in a single blockchain transaction.
### Cooldown
- An obligatory period of waiting before you can do an action.
### Fold / Leverage
- [Borrow](#lend--borrow-against) tokens, sell them for the ones you borrowed against, and borrow again.
- For example. You deposit 100 Eth as collateral, borrow DAI, trade DAI for ETH and deposit again as [collateral](#collateral) for increased [yield](#yield--profit) (but also increased [liquidation](#liquidation) risk).