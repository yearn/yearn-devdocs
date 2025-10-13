# Yearn Curating

![image](/img/curating/yearning.jpg)

Yearn Curating team has started from a need to handle risk score for Yearn V3 strategies that deposit into Morpho Vaults. Each vault has its own curator and each curator has different risk appetites. Morpho Vault code is immutable, but risk scores change all the time. Markets can be added and removed, risky market can have too high allocation for our current risk score so we need to react and updated the risk score dynamically. To handle this flow we build monitoring stack around different Morpho Vaults used by Yearn V3 strategies to capture events and trigger alerts when risk score is not behaving as expected. Check out how monitoring works in our [Github repository](https://github.com/yearn/monitoring-scripts-py/tree/main/morpho).

With the monitoring stack in line and knowledge about risk management, we decided to start curating on Morpho to make sure our strategies are always in line with our risk appetite.

## Vault Tiers

We will sort our vaults into three risk tiers:

- **Normie**: Sticks mostly to the big, well-known crypto markets (“blue-chips”). The goal here is steady, reliable yield with the lowest possible chance of things going sideways.
- **OG**: Dips into markets that offer potentially higher yields but come with a bit more risk. Corresponds to Yearn’s internal “risk level 2”.
- **Degen**: For those comfortable with higher risk for potentially even higher rewards. Corresponds to Yearn’s internal “risk level 3” and above.

## How We Decide Where to Put the Money

This is the most important thing we do. Choosing which markets to use and how much to send to each directly impacts the vault’s risk and its APY.

We don’t just guess! We use on-chain data and simulations to calculate how markets perform. These simulations look at things like market liquidity, asset liquidity, defined caps, and more. Based on this, we take a few actions:

- New Markets: When we find a good, safe market that fits the vault’s risk level, we can add it in.
- Tweaking Allocations: Markets change! We constantly watch them and shift funds around to keep the vault optimized for the best risk-adjusted yield. Our automated systems check this hourly and reallocate if the potential APY boost is worth the gas cost. To avoid extremely high utilization, the optimization always targets a max of 95% utilization. This keeps the system liquid while still maintaining strong yield performance.
- Setting Supply Caps: We limit how much of the vault’s total funds can go into any single market. This prevents putting too many eggs in one basket. These caps aren’t static; they’re adjusted based on real-time on-chain liquidity and how close borrowers are to being liquidated. If slippage (the price impact of selling collateral during liquidations) looks too high, we will lower the cap for that market.

## Keeping Things Running Smoothly

Once a vault is set up, the job isn’t done. We’re always monitoring and making adjustments because market conditions, borrowing demand, and risks can change fast.

- Playing it Safe: We constantly check on-chain liquidity on DEXs for potential liquidation capacity and monitor borrower health on the Morpho market. We evaluate the collateral of risky positions and compare it with available on-chain DEX liquidity to adjust the cap accordingly. We also aim to avoid overly utilized markets to ensure there’s always some breathing room for withdrawals.
- Yield Optimization: We analyze which markets are offering the best returns for their risk level and shift funds accordingly. Our goal is always the best risk-adjusted yield, not just the highest number. We use our models to predict how yield might change based on time and how much a market is being used.

Our whole strategy boils down to deeply understanding and managing risk. We use:

- Frequent Data Checks: Looking at liquidity, volatility, potential slippage, risky positions.
- Automated Optimization: Tools constantly work to find the best allocations and adjust safety caps.
- Sensible Guardrails: Things like a 72-hour timelock for major changes give everyone time to react if needed, and specific roles (Guardian, Reallocator, Owner) ensure actions are taken by the right parties with the right permissions.
- Monitoring: We monitor assets and protocols that we use. From governance decisions to contract upgrades, on-chain liquidity to borrower health on the Morpho market, and other key risk factors.

By combining automated optimization with careful, real-time monitoring and a risk-first mindset, we aim to provide Morpho vaults that are both high-performing and aligned with Yearn’s safety standards. This means Yearn users can confidently use these vaults, and Morpho users get access to expertly managed options.

### Automation

Yearn pioneered the concept of DeFi strategies and yield optimization. Morpho markets provide additional rewards in the form of tokens, which can be auto-compounded for more underlying assets. Each deployed Morpho vault will have a Yearn auto-compounding strategy. This will enable users to get the maximum from Yearn’s security and automation. Deposit and forget, rewards are sold for more desired asset.

### Monitoring

We don’t just guess what might happen – we build tools to watch it closely. Our monitoring system keeps tabs on important numbers and potential risks across all the DeFi protocols Yearn uses.

Our monitoring system is designed to track key metrics and potential risks across various DeFi protocols integrated with Yearn.
Capabilities include:

- Governance Tracking: Observes governance activities, including scheduled timelock transactions, multisig queue proposals, and critical function calls across protocols like Aave, Compound, Maker, Morpho, and others.
- Peg Stability: Checks exchange rates for LSTs/LRTs (like stETH, ezETH) and stablecoins in key liquidity pools, alerting on significant depegs.
- Market Risk Metrics: For specific protocols like Morpho and Euler, it monitors composite vault/market risk levels based on asset allocations and individual risk scores.
- Bad Debt Monitoring: Tracks protocol bad debt levels, often using external data sources like Risk DAO, alerting if thresholds are breached.
- Market Utilization: Monitors asset utilization rates in lending markets, sending alerts when utilization approaches critical levels.

Alerts are primarily delivered via Telegram, triggered by scheduled GitHub Actions running Python scripts or real-time Tenderly alerts based on on-chain events.

For more details, check our [Github monitoring repository](https://github.com/yearn/monitoring-scripts-py). This is only part of our monitoring stack that we have open sourced.
