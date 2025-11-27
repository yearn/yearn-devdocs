# Yearn Curation

![image](/img/curating/yearning.jpg)

## Our Origin Story

Yearn Curation started from an internal need to handle risk scores for Yearn strategies that deposit into Morpho Vaults. Each vault has its own curator and each curator has different risk appetites. Morpho Vault code is immutable, but the vault's composition changes. Curators can add and remove markets from vaults, and allocations to markets can change so that the vaults no longer match their previous risk scores. So we need to be able to react and update risk scores dynamically. To handle this flow, we build a monitoring stack for the Morpho Vaults used by Yearn V3 strategies. This risk monitoring captures events and triggers alerts when these vaults are not behaving as expected. You can read about how our monitoring works in the [monitoring section](#monitoring) of this page, and on our [Github repository](https://github.com/yearn/monitoring-scripts-py/tree/main/morpho).

With the monitoring stack already built, and the pre-requisite knowledge about risk management already in house, it made sense to take the next step and start curating on Morpho ourselves to make sure our strategies are always in line with our risk appetites.

## Vault Tiers

We sort our vaults into three risk tiers:

- **Normie**: These vaults stick mostly to the big, well-known crypto markets (“blue-chips”). The goal here is steady, reliable yield with the lowest possible chance of things going sideways.
- **OG**: These vaults dip into markets that offer potentially higher yields but come with a bit more risk. They corresponds to Yearn’s internal “risk level 2”.
- **Degen**: These vaults are for those comfortable with higher risk for potentially even higher yields. They correspond to Yearn’s internal “risk level 3” and above.

## How We Decide Where to Deploy Funds

This is the most important thing we do. Choosing which markets to support and how much to send to each directly impacts the vault’s risk and its APY.

We don’t just guess! We use on-chain data and simulations to calculate how these markets perform. The simulations look at market liquidity, asset liquidity, defined caps, and more. Based on this, we can take a few actions:

- **Adding New Markets**: When we find a good, safe market that fits the vault’s risk level, we can add it in.
- **Tweaking Allocations**: Markets change! We constantly watch them and shift funds around to keep the vault optimized for the best risk-adjusted yield. Our automated systems check this hourly and reallocate if the potential APY boost is worth the gas cost. To avoid extremely high utilization, the optimization always targets a max of 95% utilization. This keeps the system liquid while still maintaining strong yield performance.
- **Setting Supply Caps**: We limit how much of the vault’s total funds can go into any single market. This prevents putting too many eggs in one basket. These caps aren’t static; they’re adjusted based on real-time on-chain liquidity and how close borrowers are to being liquidated. If slippage (the price impact of selling collateral during liquidations) looks high, we will lower the cap for that market.

## Keeping Things Running Smoothly

Once a vault is set up, the job isn’t done. Market conditions, borrowing demand, and risks can change fast, so we’re always monitoring and ready to make adjustments.

- **Playing it Safe**: We constantly check on-chain liquidity on DEXs for potential liquidation capacity and monitor borrower health on the Morpho market. We evaluate the collateral of risky positions and compare it with available on-chain DEX liquidity to adjust the cap accordingly. We also aim to avoid overly utilized markets to ensure there’s always some breathing room for withdrawals.
- **Yield Optimization**: We analyze which markets are offering the best returns for their risk level and shift funds accordingly. Our goal is always the best risk-adjusted yield, not just the highest yield. And we use our models to predict how yield might change based on time market allocation.

Our strategy boils down to deeply understanding and managing risk. We use:

- Frequent Data Checks: Looking at liquidity, volatility, potential slippage, risky positions.
- Automated Optimization: Our tools constantly work to find the best allocations and adjust safety caps.
- Sensible Guardrails: A 72-hour time-lock for major changes gives everyone time to react if needed, and specific roles (Guardian, Reallocator, Owner) ensure actions are taken by the right parties with the right permissions.
- Monitoring: We monitor assets and protocols that we use. From governance decisions to contract upgrades, on-chain liquidity to borrower health on the lending market, and other key risk factors.

By combining automated optimization with careful, real-time monitoring and a risk-first mindset, we aim to provide curated lending vaults that are both high-performing and aligned with Yearn’s safety standards. This means Yearn users can confidently use these vaults, and lending market users get access to expertly managed options.

### Monitoring

We don’t just guess what might happen – we build tools to watch it closely. Our monitoring system keeps tabs on important numbers and potential risks across all the DeFi protocols Yearn uses.

Our monitoring system is designed to track key metrics and potential risks across various DeFi protocols integrated with Yearn.
Capabilities include:

- Governance Tracking: Observing governance activities, including scheduled timelock transactions using [Tenderly Alerts](https://docs.tenderly.co/alerts/intro-to-alerts), [multisig queued transactions](https://github.com/yearn/monitoring-scripts-py/blob/main/safe/main.py) on safe, and critical function calls across protocols like [Aave](https://github.com/yearn/monitoring-scripts-py/tree/main/aave), [Compound](https://github.com/yearn/monitoring-scripts-py/tree/main/compound), [Maker](https://github.com/yearn/monitoring-scripts-py/tree/main/maker), [Morpho](https://github.com/yearn/monitoring-scripts-py/tree/main/morpho), [Ethena](https://github.com/yearn/monitoring-scripts-py/tree/main/ethena) and [others](https://github.com/yearn/monitoring-scripts-py/tree/main/README.md).
- Peg Stability: Checking exchange rates for [LSTs/LRTs](https://github.com/yearn/monitoring-scripts-py/tree/main/lrt-pegs) (like stETH, ezETH) and stablecoins in key liquidity pools, alerting on significant depegs.
- Market Risk Metrics: For specific protocols like [Morpho](https://github.com/yearn/monitoring-scripts-py/tree/main/morpho), [Euler](https://github.com/yearn/monitoring-scripts-py/tree/main/euler), monitoring composite vault/market risk levels based on asset allocations and individual risk scores.
- Bad Debt Monitoring: Tracking protocol bad debt levels, often using external data sources like [Risk DAO](https://github.com/Risk-DAO/simulation-results), alerting if [thresholds are breached](https://github.com/yearn/monitoring-scripts-py/blob/main/bad-debt/bad-debt-trigger.py).
- Market Utilization: Monitoring asset utilization rates in lending markets and sending alerts when utilization approaches critical levels.
- Market Caps: Calculating market caps multiple times a day and alerting if the market cap is too high and should be lowered. We don't immediately lower the market cap in Morpho contracts, but we lower it in our internal reallocation configuration. This allows us to keep the vault's allocation below calculated caps and set higher caps if the market gets healthier without waiting for the 3-day timelock delay. If the caps remain high over a long period of time, we will lower the cap in the Morpho contracts to ensure maximum safety.
- Collateral Liquidity: Calculating liquidity multiple times a day to verify that collaterals backing risky borrowing positions have enough on-chain liquidity. This assures smooth liquidations for the borrowed asset without slippage, and minimizes the risk that a position becomes unprofitable to liquidate and lead to bad debt in lending vaults.

Alerts are primarily delivered via Telegram, triggered by scheduled GitHub Actions running Python scripts or real-time Tenderly alerts based on on-chain events.

For more details, check our [Github monitoring repository](https://github.com/yearn/monitoring-scripts-py) and [detailed documentation generated by DeepWiki](https://deepwiki.com/yearn/monitoring-scripts-py/). This is only part of our monitoring stack that we have open sourced.

### Morpho and other Rewards

Yearn pioneered the concept of auto-compounding strategies and yield optimization. Morpho markets provide additional rewards in the form of tokens, which can be auto-compounded for more underlying assets. Each deployed Morpho vault will have a corresponding Yearn vault. Deposit and get on with your life. The additional rewards will be compounded for you.
