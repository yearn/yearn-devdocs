# How to Understand Strategies Descriptions

While reading the strategy descriptions at [yearn.watch↗](https://yearn.watch/) or [vaults.yearn.finance↗](https://vaults.yearn.finance/) you may come across unfamiliar terms. But do not fear, like a DeFi Duolingo, Yearn is here to help you navigate these strange semantic waters. So buckle in and let's learn the lingo of strategies.

This guide focuses primarily on strategy descriptions, but those thirsty for more DeFi jargon can see our broader [glossary↗](https://docs.yearn.finance/resources/defi-glossary).

- Regular links navigate between the glossary.
- Links marked with ↗ go to external websites.

# Yearn

### yVault / Yearn Vault
- [Smart contract↗](https://ethereum.org/en/developers/docs/smart-contracts/) that holds user deposits and allocates into different strategies (up to 20 in the current version 2).
### Token
- Token is any [ERC20-compatible↗](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) DeFi token.
### yvToken
- Yearn Vault Token (yvToken) is an ERC20-compatible token that represents a [position](#position) in a Yearn Vault.
- For example: yvDAI represents a position in the DAI Yearn Vault.
### Strategy
- A [smart contract↗](https://ethereum.org/en/developers/docs/smart-contracts/) that knows how to allocate funds into a specific [yield](#yield--profit)-generating automated operation.
### Strategist
- A person that creates and maintains one or more strategies.

# Finance

### Yield / Profit
- Money (or tokens) made by an investment that surpasses the invested initial amount.
### Interest
- Fee charged for [lending](#lend--borrow-against) money.
### Compound / Autocompound
- Compounding is when you reinvest [yields](#yield--profit) in the same investment.
- Autocoumpound is when a tool does compounding automatically for you.
- There is also a protocol called Compound Finance (COMP), but that is different.
### Position
- Total amount of money (or tokens) allocated into a investment.
### Hedge
- A position in a contrarian investment to one you already have, so if things go wrong in one thesis you offset losses by gains in the other position. 
### Arbitrage
- Taking advantage of the price difference in different places.
- For example: ETH is $2000 at one place and $1950 at another, so you quickly buy from the cheaper source and sell on the more expensive source for $50 profit.  
### Vest
- Gradual [unlocking](#unlock) of tokens or stocks.
- For example: if you receive 4000 tokens in a 4-year linear vesting it means you get 1000 tokens/year (unlocked on a daily or monthly basis depending on the contract).
### Collateral
- An amount of money (or tokens) that gets [locked](#lock--unlock) until a pre-determined agreement is met, commonly at risk of [liquidation](#liquidation)
### Liquidation
- When you fail to repay a [loan](#lend--borrow-against) or other agreement which involves [collateral](#collateral) and the collateral is sent to other parties to repay and make them whole, so you can't access the collateral because it's not yours anymore.
- For example: you add ETH as collateral and borrow dollars against it, but you fail to repay the loan in due time, so your collateral gets *liquidated* and you lose the ETH deposited.

### Lend / Borrow Against
- Lending is when you provide liquidity to someone else for some time and expect them to pay you back in the future.
- Borrowing is when you take money from a lender.
- Borrowing *against* is used to specify the [collateral](#collateral) used by the borrower. Example: "I borrowed 5000$ against my car, so if I don't repay the loan the bank can take it".
- In DeFi this operation is often over-collateralized since there are no resources to charge debt.

# DeFi

### Yield Aggregator / Yield Optimizer
- DeFi protocols like Yearn that provides a single interface to allocate capital in different yield sources, leveraging [autocompounding](#compound--autocompound) to improve the [yield](#yield--profit).
### Supply / Deposit / Stake
- Might be used interchangeably sometimes, but it often means that tokens are sent to a contract external to the current wallet.
- Supply often means that the money is being [lent](#lend--borrow-against)
### Harvest / Claim
- When a [strategy](#strategy) collects [profits](#yield--profit) or [rewards](#rewards) in a blockchain transaction.
### Sell / Buy
- Exchange a token for another token, in DeFi this happens on Decentralized Exchanges
### Rewards
- Tokens earned by a protocol-incentivized action.
- For example: if you deposit liquidity into Uniswap you get trading fees, but you also get UNI *rewards* for doing this at Uniswap and not at SushiSwap.
### Lock
- Tokens that are locked can't be used until a specific condition is met.
### Unlock
- Unlocking refers to meeting a condition and receiving locked tokens.
### Liquidity Provider
- Liquidity Provider is anyone that [deposit](#supply--deposit--stake) tokens in a protocol.
### Joint Liquidity Provider
- Joint [Liquidity Provider](#liquidity-provider) is when your tokens are aggregated with another person's tokens to provide liquidity together.
### Liquidity Pool
- A [Liquidity Pool↗](https://www.coindesk.com/learn/what-are-liquidity-pools/) is a decentralized market for 2 (or more) tokens.
### Stable Pool
- A Stable Pool is a Liquidity Pool made only of stablecoins.
### Impermanent Loss
- When you lose money for being a liquidity provider to liquidity pools when compared to just holding the 2 (or more) tokens in your wallet, it happens when the market price ratio for the tokens diverges from the value that they had when you provided liquidity, which is why it can also be called Divergence Loss.
### Uniswap
- The [Uniswap↗](https://app.uniswap.org/#/swap?chain=mainnet↗) protocol, a decentralized exchange that aggregates many [Liquidity Pools](#liquidity-pool), used to buy and sell tokens.
- The Uniswap protocol has a v1, v2 and v3, when you read "Uniswap" it refers to v2, the v3 is always explicitly mentioned like "Uniswap v3".
### DAI / USDT / USDC
- The three largest stablecoins in the market, pegged to the dollar value, so 1 token represents 1 dollar.
### Curve
- Curve is the most well-known and largest stablecoin swap protocol.
- CRV is the token Curve mints
- CRV can be locked for veCRV (untradeable) to receive curve protocol [profits](#yield--profit).
- veCRV also has governance power over the Curve protocol and allows boosting rewards for adding liquidity to their [pools](#liquidity-pool).
### 3pool
- 3pool refers to the [DAI / USDT / USDC](#usdc--dai--usdt) curve [liquidity pool](#liquidity-pool).
### Tricrypto
- Tricripto refers to the wBTC + wETH + USDT curve [liquidity pool](#liquidity-pool).
### Curve Boost / Curve Gauge
- Locking up [CRV](#curve) on Curve allows you to boost your CRV [rewards](#rewards) for being a liquidity provider.
- Read more at curve [docs↗](https://resources.curve.fi/reward-gauges/boosting-your-crv-rewards).
### Convex
- A protocol that made locked CRV (called veCRV) tradeable, managed to amass huge liquidity, and controls more than 50% of all circulating CRV. [docs↗](https://docs.convexfinance.com/convexfinance/general-information/why-convex).
### Flashloan / Flashlend
- Loan, use, and payback tokens in a single blockchain transaction.
- Often used to amass high liquidity for a quick operation where you don't have it.
### Mint
- The creation of new tokens.
- For example: new DAI is *minted* when someone [borrows against](#lend--borrow-against) ETH.
### Flashmint
- [Flashloan](#flashloan--flashlend) tokens to [mint](#mint) new ones in a single blockchain transaction.
### Cooldown
- An obligatory period of waiting before you can do an action.
### Fold / Leverage
- [Borrow](#lend--borrow-against) tokens, sell them for the ones you borrowed against, and borrow again.
- For example. You deposit 100 ETH as collateral, borrow DAI, trade DAI for ETH and deposit again as [collateral](#collateral) for increased [yield](#yield--profit) (but also increased [liquidation](#liquidation) risk).
