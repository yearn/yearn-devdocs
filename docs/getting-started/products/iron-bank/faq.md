# FAQ

## What is the difference between CREAM v1 and the Iron Bank ?

CREAM v1 offers lending markets for the long-tail of crypto assets, and does not allow protocol to protocol lending.

The Iron Bank services both individual users as well as the liquidity backbone for other DeFi protocols. The Iron Bank features a smaller selection of assets that are deemed to have higher creditworthiness. Whitelisted protocols can borrow from this pool of assets with little to no collateral on The Iron Bank directly. Credit risks are managed through a combination of smart contract security review, insurance coverage, and financial backstop.

## Is the Iron Bank liquidity Pooled with CREAM v1?

No. Assets supplied to the Iron Bank are held in separate pools from those on CREAM v1. They are two completely segregated asset pools, like two different banks.

## Who supplies liquidity to the Iron Bank? Is it CREAM depositors?

Anyone can supply and borrow assets from the Iron Bank. Iron Bank liquidity is sourced separately from CREAM v1 deposits.

## **How can I deposit assets to the Iron Bank?**

You can currently deposit to the Iron Bank [here](https://yearn.finance/#/ironbank).

## What are the risks and rewards of depositing to the Iron Bank?

Like all money market protocols in DeFi, smart contract risks and systemic risks of the underlying crypto assets exist. We highly recommend users research the risks involved and obtain proper insurance coverage to offset these risks. Yields in the Iron Bank generally range from 20–40% APY on stablecoin deposits.

Utilization rates are higher in the Iron Bank than the other money markets because the Iron Bank facilitates uncollateralized, protocol to protocol lending to whitelisted partners like Alpha Finance’s Alpha Homora and Yearn Vaults. The high utilization ratio \(ratio of total borrowed assets to total supply assets\) can sometimes lead to lower available liquidity for large suppliers to withdraw.

## What are current yields on Iron Bank deposits?

You can find all information on current supply, borrow, and APYs for assets in the [Iron Bank](https://yearn.finance/#/ironbank).

## What are the collateral factors and reserve factors for Iron Bank assets?

The Iron Bank collateral and reserve factors are listed [here](interest-rate-model.md).

## I thought the Iron Bank was undercollateralized protocol to protocol lending — why are there collateral factors?

The Iron Bank is first and foremost, a normal lending solution. Anyone can supply and borrow assets and there are zero restrictions besides the collateral and reserve factors.

If a protocol requests to borrow without posting collateral, then the parameters and implementation details are determined directly with the CREAM team.

The Iron Bank will not offer credit facilities to just any protocol. Comprehensive diligence is completed up-front, prior to accepting an uncollateralized borrower.

## What factors are used to determine whether a protocol can borrow undercollateralized from the Iron Bank?

Factors we consider in whitelisting protocols for the Iron Bank include reputation, track record, smart contract audits, insurance coverage, and treasury value / liquidity.

Additional requirements that CREAM will add to ensure that the Iron Bank is paid back:

1. Financial Backstop — Partners provide / escrow tokens as backstop and credit is given up to that limit.
2. Insurance Coverage — Partners purchase Cover Protocol or Nexus Mutual insurance and credit is given up to that limit.
3. Smart Contract review — Contracts are reviewed / audited by reputable firm\(s\), and are immutable.

## If an under-collateralized borrower is exploited, how do Iron Bank lenders get repaid?

Exploits that occur through the under-collateralized borrower will remain debt between the protocols. It is the responsibility of the exploited borrower to repay the Iron Bank. The additional debt accrued from the Alpha Homora V2 exploit In February 2021 is debt for Alpha Finance to repay Cream V2. End user funds are safe.

## What price oracle does the Iron Bank use?

The Iron Bank currently uses Chainlink’s oracle solution for its assets. You can read more about it [here](price-oracle.md).
