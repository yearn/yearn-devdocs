# yETH protocol specification

### Definitions

- yETH: token that represents one to one beacon chain ETH
- staked yETH (st-yETH): yETH that has been deposited into the staking contract. Stakers will effectively receive all yield and slashings from beacon chain
- Management: trusted with privileged access for limited operations. Should eventually be replaced by a smart contract
- Guardian: trusted with emergency privileges
- Treasury: benefactor of performance fees

## Pool specification

### Normal operation

- Contract contains a set of whitelisted tokens. The assets are non-rebasing and represent different type of LSDs
- Each asset has a corresponding rate provider: a contract per asset that calculates the amount of beacon chain ETH per token unit
- Contract keeps track of asset balances as well as the asset's rate
- The asset balance in the pool multiplied by the rate is called the "virtual balance"
- Each asset has a weight associated with it, representing the desired share of the total beacon chain ETH in the pool
- The actual composition of assets in the pool is allowed to fluctuate within a fixed range around the weight
- Contract keeps track of a variable `D`, representing the pools total virtual balance if it is perfectly balanced
- The relation between `D`, the virtual balances and the weights is governed by the weighted stableswap invariant
- If any operation increases or decreases `D`, an equal amount of LP tokens (yETH) will always be minted or burned, respectively. This mechanism ensures the 1:1 peg, because the net yETH the pool has minted (the supply) is always equal to the beacon chain ETH the pool owns in a balanced state. For this reason we call `D` the LP supply
- Users can deposit any combination of whitelisted assets into the pool. The invariant will be evaluated to determine the new LP supply and an amount of LP tokens equal to the increase in supply is minted to the user
- Users are able to burn LP tokens to either receive assets in a balanced manner or receive a single asset. The LP supply is reduced by the amount of tokens burned
- In case of a balanced withdrawal, the user receives a share of every asset in the pool equal to the share of LP tokens burned, i.e. `tokens_received = pool_token_balance * lp_burned / lp_supply` for each whitelisted asset
- In case of a single sided withdrawal, the invariant is solved (after applying the supply change) to calculate the new virtual balance of the asset. The difference between the new and old virtual balance is divided by the asset's rate to calculate the amount of tokens the user receives
- Users are able to perform swaps using the pool assets. Like a traditional stableswap pool, this is done by first updating the virtual balance of the input asset and solving the invariant for the new virtual balance of the output asset. The decrease divided by the rate is the amount of output tokens the user receives
- The pool charges a fee on swaps, in the form of LP tokens minted to the staking contract
- For safety reasons, any change in asset balances due to a deposit/withdrawal/swap is only accepted if the resulting composition is within a specific tolerance range of the desired composition, or if the change brings it closer to that desired composition
- The rate of each asset can be synchronised by an internal or external (non-privileged) call, which will in turn call the corresponding rate provider and store the new rate in the contract
- If a synchronisation changes any rate, the new virtual balances are calculated and the invariant is used to calculate the new LP supply. The change in supply is minted to or burned from the staking contract
- Any deposit or withdrawal of an asset will be preceded by a sychronisation of its rate
- A rate is only allowed to increase at most 10% at once
- Management can start a gradual amplification and weight change, as long as no change is active yet
- Management can whitelist a new asset, which sets an initial weight, sets the rate provider and requires an initial deposit
- New assets can only be whitelisted if no amplification or weight change is active
- Management can update the rate provider for every whitelisted asset
- Management can approve rate increases above 10%
- Management can update the staking contract
- Management can set the pool swap fee
- Management can set the tolerance range of all assets
- Management can set the new management address
- Management can set the new guardian address
- Management can trigger pause mode
- Management can trigger killed mode
- Guardian can set the new guardian address
- Guardian can trigger pause mode

### Pause mode

_Note_: this mode is to be enabled in the event of extreme market conditions or suspicious LSD minting behaviour or oracle activity.

- During pause mode, no user may swap assets with the contract
- During pause mode, no user may deposit assets into the contract
- During pause mode, users may only withdraw assets in a balanced manner, single sided withdrawals are not allowed
- During pause mode, weights, rates and rate providers cannot be updated
- During pause mode, a weight and/or amplification ramp cannot be started
- During pause mode, management can trigger killed mode
- During pause mode, management or guardian can undo pause mode to resume normal operation

### Killed mode

_Note:_ this mode is to be activated in the event of a LSD depeg, such as a mint bug or a compromised oracle or a critical bug in the protocol.

- Killed mode may only be activated during pause mode
- During killed mode, pause mode may not be undone
- There is no way to undo killed mode

## LP token contract specification (yETH)

- ERC20 contract representing beacon chain ETH
- Management can set and unset addresses that are allowed to mint and burn tokens

## Staking contract specification (st-yETH)

- Users can deposit yETH to mint shares representing a proportional amount of the underlying asset contained in the staking contract
- Users can burn shares to receive the underlying asset from the staking contract in proportion to the total number of shares
- The contract caches its own yETH balance, which is separated in buckets: pending, streaming and unlocked.
- Before minting or burning shares, the stored yETH balance is updated
  - If the balance has increased, it is added to the pending bucket. If one or more week has been missed, the increase is distributed instead over the three buckets fairly.
  - If the balance has decreased, it is subtracted from the pending bucket until it is empty. If the bucket is empty, the remainder is subtracted from the streaming bucket. If that bucket is also empty, the remainder is subtracted from the unlocked bucket
- At the end of the week, the pending bucket becomes the streaming bucket and a new pending bucket is created
- If the first update of the week is in the first day, it is added to the streaming bucket directly instead
- The streaming bucket is unlocked linearly during the week
- User deposits and withdrawals only affect the unlocked bucket
- Each user has an internal vote weight that increases asymptotically to the user's share count. After `t` seconds, their vote weight is `s * t / (t + t_half)` where `s` is the number of shares and `t_half` is the voting half time
- The voting half time determines the time it takes until half the voting weight is reached
- The user's external vote weight is equal to the internal vote weight at the end of the previous week
- Management can set the voting half time
- Users can freely transfer their tokens to other users
- The contract implements ERC20
- The contract implements ERC4626

### Fees

- The treasury collects a performance fee on the yield generated by the protocol
- The performance fees are credited to the treasury in the form of st-yETH shares
- Management can set the performance fees, within a certain range

## Rate provider specification

- Contract has a function that returns the asset rate: the amount of beacon chain ETH backing the asset, per unit token
- Should always return the latest rate and not cache values
