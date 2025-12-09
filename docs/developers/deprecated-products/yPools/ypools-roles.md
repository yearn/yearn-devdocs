# yPools Roles and Modes

## Management Role

Trusted addresses with privileged access for limited operations. Should eventually be replaced by a smart contract:

- Can start a gradual weight change, as long as no weight change is active yet.
- Can whitelist a new asset, which sets an initial weight, sets the rate provider, and requires an initial deposit. New assets can only be whitelisted if no weight change has been scheduled yet.
- Can update the rate provider for every whitelisted asset.
- Can approve rate increases above 10%.
- Can update the staking contract.
- Can set the pool swap fee.
- Can set the tolerance range.
- Can set the new management address.
- Can set the new guardian addresses.
- Can trigger `pause mode`.
- Can trigger `killed mode`.

## Guardian Role

Trusted addresses with emergency privileges:

- Can trigger pause mode.

### Pause mode

> This mode is to be activated in the event of extreme market conditions or detected suspicious behavior, either in the protocol itself or in the underlying LST tokens that back it.

- No user may swap assets with the contract.
- No user may deposit assets into the contract.
- Users may only withdraw assets in a balanced manner, single-sided withdrawals are not allowed.
- Weights, rates, and rate providers cannot be updated during this mode.
- Management or guardian can undo pause mode to resume normal operation.

### Killed mode

> This mode is to be activated in the event of critical failures, whether in the protocol itself or in any of the underlying LST tokens that back it. This can also be used to migrate to a new version of the yETH protocol.

- No user may deposit assets into the contract.
- Users may only withdraw assets in a balanced manner.
- The reward controller may not update the beacon chain amounts.
- Pause mode may not be undone.

There is no way to undo `killed mode`.
