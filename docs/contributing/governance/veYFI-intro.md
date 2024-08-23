# veYFI

veYFI is a time-locked version of the YFI token that grants access to governance, yield boosts, and rewards. It is based on [Curve's vote escrow (ve) model](https://resources.curve.fi/crv-token/vecrv/) and each YFI token can be locked for up to 4 years (technically longer, but there is no added voting or earning power gained by locking for more than 4 years). The length of lock determines how much veYFI is received per locked YFI. One YFI locked for four+ years converts to one veYFI. This relationship scales linearly, so one YFI locked for two years converts to 0.5 veYFI, one year converts to 0.25 veYFI, and so forth.

## veYFI Benefits

Locking YFI for veYFI has 3 main benefits: Voting power, Yield boosts on funds deposited in Yearn, and earning protocol incentives.

### veYFI Voting

veYFI is the governance token of Yearn. It is used to vote on YFI emissions distributions and other governance items in [snapshot](https://snapshot.org/#/veyfi.eth). For more information on Yearn's governance process, head over to the [governance section of the docs](https://docs.yearn.fi/contributing/governance/proposal-process).

### veYFI Yield Boosts on Yearn Deposits

Yearn depositors who have locked YFI for veYFI can receive a increase in their earned yield when depositing and staking in certain "boosted" vaults. This yield is paid in [dYFI](veyfi.md#dyfi-as-gauges-reward) and is claimed separately from the auto-compounding native vault yield. All users who stake in the "boosted" vaults receive some dYFI rewards (1x boost) but only veYFI holders can increase that boost (up to the 10x).

The boost that depositors receive is calculated using the formula found in [this section](./veyfi.md#vault-gauges--voting) of the veYFI specification. The TL:DR is that your boost is maxed out when your share of the vault/gauge you deposit in is less than your share of the total veYFI supply.

Any dYFI not earned by depositors (difference between the possible 10x boost and actual boost) goes to veYFI holders.

### veYFI protocol incentives

veYFI holders earn a share of the early exit penalties charged to veYFI holders who unlock their positions early, and they also receive a share of dYFI rewards from unused boosts.

## veYFI Decay

To weigh the advantages of locking YFI for veYFI, it is important to understand how locking works. From the moment YFI is locked for veYFI, the amount of veYFI the locking user has starts to decay (decrease) to zero. The rate of decay is linear and results in the user have no veYFI left at the end of their lock. Because voting power, rewards rates, and yield boosts are based on the amount of veYFI a user holds, these characteristics of the user's position also decrease over time. The only intrinsic (within the system) way to counteract this decay is to re-lock your YFI for your desired amount of time.

## Lock Parameters

veYFI is non-transferrable and additional YFI locked from an account that already has a veYFI balance will add to and extend that lock. veYFI that belongs to any particular address will all unlock together when a lock expires. If a veYFI position needs to be exited before a lock expires, there is an early exit fee equal to the lesser of ``75% locked amount` and `(lock time remaining / 4 years)`.

## Liquid Lockers

If you don't want to deal with the intricacies of locks, there are products called *Liquid Lockers* that abstract them away and also counteract veYFI decay. Yearn provides these for other protocols (yCRV and yPRISMA), and while it does not provide them for YFI, other DAOs/entities do. At the time of writing, there are 3 liquid lockers for YFI:

- [1up](https://1up.tokyo/stake)
- [Cove](https://app.cove.finance/yfi/stake-yfi)
- [StakeDAO](https://www.stakedao.org/lockers/yfi)

Liquid Lockers are contracts that permissionlessly max-lock governance tokens (YFI to veYFI in this case) in exchange for a receipt token at a rate of 1:1. The benefit of doing this is to provide the end user with a fully transferrable token that can still receive a share of governance benefits like yield or voting power. Liquid locker tokens are not redeemable for the underlying locked tokens. Instead, they can be traded on decentralized exchanges. This means they may not always maintain price parity with their underlying assets.

If you use a liquid locker instead of locking YFI for veYFI directly then you would use the liquid locker's interface to stake your vault tokens for boosts and claim rewards. Liquid locker interfaces typically show the boost that they offer on different vaults, and users can deposit into these vaults and earn that boost without owning any YFI or veYFI at all.

## Claiming YFI from dYFI

dYFI has a variable redemption cost (in ETH) to convert into YFI. The amount you must pay to redeem YFI increases as the veYFI supply increases.

There is an interface to redeem on the [Yearn dApp](https://veyfi.yearn.fi/?tab=redeem) or you can use [Cove's dYFI redeemer contract](https://app.cove.finance/yfi/convert-dyfi) that will redeem automatically and charges a fee to do so, but don't not require any ETH upfront.
