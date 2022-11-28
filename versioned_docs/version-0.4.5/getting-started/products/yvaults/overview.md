# Overview

&nbsp;

## What are yVaults?

[yVaults](https://yearn.finance/vaults) are like savings accounts for your crypto assets. They accept your deposit, then route it through strategies which seek out the highest yield available in DeFi.

![](https://i.imgur.com/T9ftjDa.png)

## yVault Fee Structure

**20% Performance Fee**: Deducted from yield earned every time a vault harvests a strategy.

**2% Management Fee**: Flat rate taken from vault deposits over a year. The fee is extracted by minting new shares of the vault, thereby diluting vault participants. This is done at the time of harvest, and calculated based on time since the previous harvest.

For example, a vault takes about .0055% of deposits per day on average (2 (percent)/365 (days)):

- It would dilute vault tokens by 5 \* .0055% after 5 days without harvesting
- It would dilute vault tokens by 7 \* .0055% on the next harvest if it had not happened for 7 days
- Vaults will only harvest if it is profitable after fees so that users won't withdraw less than their deposit

On the [yearn.finance](https://yearn.finance/) user interface, yield is displayed as net APY. This means that both fees and compounding returns are taken into consideration in the rates presented. Since harvests don't occur on a set basis, yield is estimated based off of historical data. For more information, see [How to Understand yVault ROI](https://docs.yearn.finance/getting-started/guides/how-to-understand-yvault-roi)

## v2 yVault Improvements

- **Up to 20 strategies per vault:** This will increase the flexibility to manage capital efficiently during different market scenarios. Each strategy has a capital cap. This is useful to avoid over-allocating funds to a strategy that cannot increase APY anymore.
- **Strategist and Guardian are the new Controllers:** The Controller concept is not available in V2 yVaults and has been replaced by a Guardian and the Strategy creator \(strategist\). These 2 actors oversee strategy performance and are empowered to take action to improve capital management or act on critical situations.
- **Automated vault housekeeping \(Keep3r network\):** `harvest()` and `earn()` calls are now automated through the Keep3r bots network. These 2 function calls are used to purchase new underlying collateral by selling the earned tokens while moving the profits back to the vault and later into strategies. The keep3r network takes the heavy lifting of doing these calls and running with the gas costs in exchange for keep3r tokens. This approach unloads humans from these housekeeping tasks.
- **No Withdrawal Fee**: The one-time fee charged on balance upon withdrawal has been turned off for all vaults and only existed in the v1 iteration.
