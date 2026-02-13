# Protocol Fees

V3 introduces a **protocol fee** that is applied by the **vault** on each strategy
`report()`. This fee is a **percentage of the total fees** returned by the
Accountant (management/performance fees), not a direct percentage of profit.

The protocol fee is configured in the VaultFactory (default + optional per‑vault
custom overrides). Governance controls the allowed values, which can be set anywhere
from 0% to 50%. The protocol fee recipient is stored in the VaultFactory and is the
default recipient even when a custom protocol fee is set for a specific vault.

```markdown title="Example"
profit = 100
performance_fee = 20%
protocol_fee = 10%

total_fees = profit * performance_fee = 20
protocol_fees = total_fees * protocol_fee = 2
performance_fees = total_fees - protocol_fees = 18

18 would get paid to the vault managers performance_fee_recipient.
2 would get paid to the Yearn Treasury.
```

You can retrieve both the default protocol fee and a vault‑specific override using
the VaultFactory that corresponds to that vault’s API.

``` solidity title="Examples"
# Retrieve the default config.
vaultFactory.protocol_fee_config()

# Check a specific vault current config to be used
vaultFactory.protocol_fee_config(vault_address)

# Check whether a custom override is active for a vault
vaultFactory.use_custom_protocol_fee(vault_address)
```
