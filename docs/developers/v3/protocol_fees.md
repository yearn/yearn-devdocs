# Protocol Fees

The V3 system sees the introduction of "Protocol Fees" to the stack. Protocol fees are charged each time a V3 vault or strategy "reports" and are taken as a percent of the overall fees charged by that vault's management.

EXAMPLE:
    
    profit = 100
    performance_fee = 10%
    protocol_fee = 10%
    
    total_fees = profit * performance_fee = 10
    protocol_fees = total_fees * protocol_fee = 1
    performance_fees = total_fees - protocol_fees = 9
    
    9 would get paid to the vault specified as the performance_fee_recipient.
    1 would get paid to the Yearn Treasury.
    

The purpose of protocol fees is to give the managers of vaults and strategies complete control over the actual fees charged, while also rewarding Yearn for supplying the infrastructure that those vaults are built on.

The amount of the Protocol fee is dictated by Yearn Governance and can be set anywhere between 0 - 50%. Yearn governance also holds the ability to set custom protocol fees for individual vaults and strategies. Allowing full customization of the system.

You can retrieve both the default protocol fee as well as if a custom config has been set for a specific vault or strategy using the Vault Factory that corresponds to that vault's API.

    # Retrieve the default config.
    vaultFactory.default_protocol_fee_config()
    
    # Check if there is a custom protocol fee for a vault.
    vaultFactory.use_custom_protocol_fee(vault_address)
    
    # Get a custom config if applicable.
    vaultFactory.custom_protocol_fee(vault_address)
    