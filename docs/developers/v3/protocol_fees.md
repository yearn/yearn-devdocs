# Protocol Fees

The V3 system sees the introduction of "Protocol Fees" to the stack. Protocol fees are charged during each time a V3 vault or strategy "reports" and taken as a percent of the overall fees charged by that vaults management.

EXAMPLE:
    
    profit = 100
    performance_fee = 10%
    protocol_fee = 10%
    
    total_fees = profit * performance_fee = 10
    protocol_fees = total_fees * protocol_fee = 1
    performance_fees = total_fees - protocol_fees = 9
    
    9 would get payed to the vault specific perforamnce_fee_recipient.
    1 would get payed to the Yearn Treasury.
    

The purpose of protocol fees it to give the managers of vaults and strategies complete control over the actual fees charged, while also rewarding Yearn for supplying the infrastructure that those vaults are built on.

The amount of the Protocol fee is dictated by Yearn Governance and can be set anywhere between 0 - 50%. Yearn governance also holds the ability to set custom protocol fees for individual vaults and strategies. Allowing full customization of the system.