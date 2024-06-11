# VaultFactory.vy

[Git Source](https://github.com/yearn/yearn-vaults-v3/blob/v3.0.2-1/contracts/VaultFactory.vy)

> vyper: `0.3.7`
> author: `yearn.finance`
> license: `GNU AGPLv3`

**Yearn Vault Factory**

*This vault Factory can be used by anyone wishing to deploy their own ERC4626 compliant Yearn V3 Vault of the same API version. The factory clones new vaults from its specific `VAULT_ORIGINAL` immutable address set on creation of the factory. The deployments are done through create2 with a specific `salt` that is derived from a combination of the deployer's address, the underlying asset used, as well as the name and symbol specified. Meaning a deployer will not be able to deploy the exact same vault twice and will need to use different name and or symbols for vaults that use the same other parameters such as `asset`. The factory also holds the protocol fee configs for each vault and strategy of its specific `API_VERSION` that determine how much of the fees charged are designated "protocol fees" and sent to the designated `fee_recipient`. The protocol fees work through a revenue share system, where if the vault or strategy decides to charge X amount of total fees during a `report` the protocol fees are a percent of X. The protocol fees will be sent to the designated fee_recipient and then (X - protocol_fees) will be sent to the vault/strategy specific fee recipient.*

## Events

### NewVault

* `vault_address` : address, *indexed*
* `asset` : address, *indexed*

### UpdateProtocolFeeBps

* `old_fee_bps` : uint16, *notIndexed*
* `new_fee_bps` : uint16, *notIndexed*

### UpdateProtocolFeeRecipient

* `old_fee_recipient` : address, *indexed*
* `new_fee_recipient` : address, *indexed*

### UpdateCustomProtocolFee

* `vault` : address, *indexed*
* `new_custom_protocol_fee` : uint16, *notIndexed*

### RemovedCustomProtocolFee

* `vault` : address, *indexed*

### FactoryShutdown

### UpdateGovernance

* `governance` : address, *indexed*

### NewPendingGovernance

* `pending_governance` : address, *indexed*

## Methods

### deploy_new_vault
>
> type: `nonpayable function`
>

Deploys a new clone of the original vault.

Arguments:

* `asset`:  - *The asset to be used for the vault.*

* `name`:  - *The name of the new vault.*

* `symbol`:  - *The symbol of the new vault.*

* `role_manager`:  - *The address of the role manager.*

* `profit_max_unlock_time`:  - *The time over which the profits will unlock.*

Returns:

* `_0` - The address of the new vault.

### vault_original
>
> type: `view function`
>

Get the address of the vault to clone from

Returns:

* `_0` - The address of the original vault.

### apiVersion
>
> type: `view function`
>

Get the API version of the factory.

Returns:

* `_0` - The API version of the factory.

### protocol_fee_config
>
> type: `view function`
>

Called during vault and strategy reports to retrieve the protocol fee to charge and address to receive the fees.

Arguments:

* `vault`:  - *Address of the vault that would be reporting.*

Returns:

* `_0` - The protocol fee config for the msg sender.

### protocol_fee_config
>
> type: `view function`
>

Arguments:

* `vault`:  - *Address of the vault that would be reporting.*

Returns:

* `_0` - The protocol fee config for the msg sender.

### set_protocol_fee_bps
>
> type: `nonpayable function`
>

Set the protocol fee in basis points

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*

Arguments:

* `new_protocol_fee_bps`:  - *The new protocol fee in basis points*

### set_protocol_fee_recipient
>
> type: `nonpayable function`
>

Set the protocol fee recipient

*Can never be set to 0 to avoid issuing fees to the 0 address.*

Arguments:

* `new_protocol_fee_recipient`:  - *The new protocol fee recipient*

### set_custom_protocol_fee_bps
>
> type: `nonpayable function`
>

Allows Governance to set custom protocol fees for a specific vault or strategy.

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*

Arguments:

* `vault`:  - *The address of the vault or strategy to customize.*

* `new_custom_protocol_fee`:  - *The custom protocol fee in BPS.*

### remove_custom_protocol_fee
>
> type: `nonpayable function`
>

Allows governance to remove a previously set custom protocol fee.

Arguments:

* `vault`:  - *The address of the vault or strategy to remove the custom fee for.*

### shutdown_factory
>
> type: `nonpayable function`
>

To stop new deployments through this factory.

*A one time switch available for governance to stop new vaults from being deployed through the factory. NOTE: This will have no effect on any previously deployed vaults that deployed from this factory.*

### set_governance
>
> type: `nonpayable function`
>

Set the governance address

Arguments:

* `new_governance`:  - *The new governance address*

### accept_governance
>
> type: `nonpayable function`
>

Accept the governance address

## ABI

```json
[
  {
    "name": "NewVault",
    "inputs": [
      {
        "name": "vault_address",
        "type": "address",
        "indexed": true
      },
      {
        "name": "asset",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateProtocolFeeBps",
    "inputs": [
      {
        "name": "old_fee_bps",
        "type": "uint16",
        "indexed": false
      },
      {
        "name": "new_fee_bps",
        "type": "uint16",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateProtocolFeeRecipient",
    "inputs": [
      {
        "name": "old_fee_recipient",
        "type": "address",
        "indexed": true
      },
      {
        "name": "new_fee_recipient",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateCustomProtocolFee",
    "inputs": [
      {
        "name": "vault",
        "type": "address",
        "indexed": true
      },
      {
        "name": "new_custom_protocol_fee",
        "type": "uint16",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "RemovedCustomProtocolFee",
    "inputs": [
      {
        "name": "vault",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "FactoryShutdown",
    "inputs": [],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateGovernance",
    "inputs": [
      {
        "name": "governance",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "NewPendingGovernance",
    "inputs": [
      {
        "name": "pending_governance",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "constructor",
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "vault_original",
        "type": "address"
      },
      {
        "name": "governance",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deploy_new_vault",
    "inputs": [
      {
        "name": "asset",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "role_manager",
        "type": "address"
      },
      {
        "name": "profit_max_unlock_time",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "vault_original",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "apiVersion",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "protocol_fee_config",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "fee_bps",
            "type": "uint16"
          },
          {
            "name": "fee_recipient",
            "type": "address"
          }
        ]
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "protocol_fee_config",
    "inputs": [
      {
        "name": "vault",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "fee_bps",
            "type": "uint16"
          },
          {
            "name": "fee_recipient",
            "type": "address"
          }
        ]
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_protocol_fee_bps",
    "inputs": [
      {
        "name": "new_protocol_fee_bps",
        "type": "uint16"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_protocol_fee_recipient",
    "inputs": [
      {
        "name": "new_protocol_fee_recipient",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_custom_protocol_fee_bps",
    "inputs": [
      {
        "name": "vault",
        "type": "address"
      },
      {
        "name": "new_custom_protocol_fee",
        "type": "uint16"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "remove_custom_protocol_fee",
    "inputs": [
      {
        "name": "vault",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "shutdown_factory",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_governance",
    "inputs": [
      {
        "name": "new_governance",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "accept_governance",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "shutdown",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "governance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "pending_governance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "default_protocol_fee_config",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "fee_bps",
            "type": "uint16"
          },
          {
            "name": "fee_recipient",
            "type": "address"
          }
        ]
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "custom_protocol_fee",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint16"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "use_custom_protocol_fee",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  }
]
```

## Byte code

```bin
0x6020610e906000396000516040602082610e900160003960005111610e8b57602081610e900160003960005180604052602082018181610e90016060395050506020610eb06000396000518060a01c610e8b5760a0526020610ed06000396000518060a01c610e8b5760c05234610e8b5760405180600355600081601f0160051c60028111610e8b5780156100a857905b8060051b606001518160040155600101818118610090575b50505060a051610dc05260c051600155610dc06100ca61000039610de0610000f36003361161000c57610da8565b60003560e01c34610dae5763b4aeee7781186103115760e43610610dae576004358060a01c610dae576040526024356004016040813511610dae578035806060526020820181816080375050506044356004016020813511610dae5780358060c05260208201803560e0525050506064358060a01c610dae5761010052600054156100f5576008610120527f73687574646f776e0000000000000000000000000000000000000000000000006101405261012050610120518061014001601f826000031636823750506308c379a060e052602061010052601f19601f61012051011660440160fcfd5b7f602d3d8160093d39f3363d3d373d3d3d363d7300000000000000000000000000610280526020610dc060003960005160601b610293527f5af43d82803e903d91602b57fd5bf300000000000000000000000000000000006102a7526080336101605260405161018052806101a052806101600160605180825260208201818183608060045afa5050508051806020830101601f82600003163682375050601f19601f82516020010116905081019050806101c052806101600160c0518082526020820160e051815250508051806020830101601f82600003163682375050601f19601f825160200101169050810190506101405261014080516020820120905060366102806000f58015610dae5761012052610120516375b30be66101405260a0604051610160528061018052806101600160605180825260208201818183608060045afa5050508051806020830101601f82600003163682375050601f19601f82516020010116905081019050806101a052806101600160c0518082526020820160e051815250508051806020830101601f82600003163682375050601f19601f82516020010116905081019050610100516101c0526084356101e05250803b15610dae57600061014061014461015c6000855af16102db573d600060003e3d6000fd5b50604051610120517f4241302c393c713e690702c4a45a57e93cef59aa8c6e2358495853b3420551d86000610140a36020610120f35b63f71bf70d81186103385760043610610dae576020610dc060003960005160405260206040f35b632582941081186103c05760043610610dae5760208060805260056040527f332e302e3200000000000000000000000000000000000000000000000000000060605260408160800181518082526020830160208301815181525050508051806020830101601f82600003163682375050601f19601f8251602001011690509050810190506080f35b635153b19981186103dc5760043610610dae57336040526103fe565b636556424b811861044d5760243610610dae576004358060a01c610dae576040525b600960405160205260005260406000205461042c576006546060526007546080526040606061044b5661044b565b6008604051602052600052604060002054606052600754608052604060605bf35b6362fbf60381186105e85760243610610dae576004358060101c610dae576040526001543318156104d557600e6060527f6e6f7420676f7665726e616e636500000000000000000000000000000000000060805260605060605180608001601f826000031636823750506308c379a06020526020604052601f19601f6060510116604401603cfd5b611388604051131561053e57600c6060527f66656520746f6f2068696768000000000000000000000000000000000000000060805260605060605180608001601f826000031636823750506308c379a06020526020604052601f19601f6060510116604401603cfd5b6006546060526007546080526080516105ae57600c60a0527f6e6f20726563697069656e74000000000000000000000000000000000000000060c05260a05060a0518060c001601f826000031636823750506308c379a06060526020608052601f19601f60a0510116604401607cfd5b6040516006557f678d2b2fe79c193f6c2c18d7515e339afcbd73fcfb360b1d0fbadae07342e05160605160a05260405160c052604060a0a1005b63f8ebccea811861070e5760243610610dae576004358060a01c610dae5760405260015433181561067057600e6060527f6e6f7420676f7665726e616e636500000000000000000000000000000000000060805260605060605180608001601f826000031636823750506308c379a06020526020604052601f19601f6060510116604401603cfd5b6040516106d457600c6060527f7a65726f2061646472657373000000000000000000000000000000000000000060805260605060605180608001601f826000031636823750506308c379a06020526020604052601f19601f6060510116604401603cfd5b6007546060526040516007556040516060517f6af4e38beb02e4b110090dd85c5adfb341e2278b905068773762fe4666e5db7a60006080a3005b63b5a71e0781186108df5760443610610dae576004358060a01c610dae576040526024358060101c610dae576060526001543318156107a457600e6080527f6e6f7420676f7665726e616e636500000000000000000000000000000000000060a0526080506080518060a001601f826000031636823750506308c379a06040526020606052601f19601f6080510116604401605cfd5b611388606051131561080d57600c6080527f66656520746f6f2068696768000000000000000000000000000000000000000060a0526080506080518060a001601f826000031636823750506308c379a06040526020606052601f19601f6080510116604401605cfd5b60075461087157600c6080527f6e6f20726563697069656e74000000000000000000000000000000000000000060a0526080506080518060a001601f826000031636823750506308c379a06040526020606052601f19601f6080510116604401605cfd5b606051600860405160205260005260406000205560096040516020526000526040600020546108ae57600160096040516020526000526040600020555b6040517f96d6cc624354ffe5a7207dc2dcc152e58e23ac8df9c96943f3cfb10ea4c140ac60605160805260206080a2005b6311a3a43481186109b85760243610610dae576004358060a01c610dae5760405260015433181561096757600e6060527f6e6f7420676f7665726e616e636500000000000000000000000000000000000060805260605060605180608001601f826000031636823750506308c379a06020526020604052601f19601f6060510116604401603cfd5b60006008604051602052600052604060002055600060096040516020526000526040600020556040517f39612c4f13d7a058dece05cf6730e3322fd9a11d6f055a5eacdde49191f45f1f60006060a2005b63365adba68118610ac45760043610610dae57600154331815610a3257600e6040527f6e6f7420676f7665726e616e636500000000000000000000000000000000000060605260405060405180606001601f826000031636823750506308c379a06000526020602052601f19601f6040510116604401601cfd5b60005415610a975760086040527f73687574646f776e00000000000000000000000000000000000000000000000060605260405060405180606001601f826000031636823750506308c379a06000526020602052601f19601f6040510116604401601cfd5b60016000557fc643193a97fc0e18d69c95e1c034b91f51fa164ba8ea68dfb6dd98568b9bc96b60006040a1005b63070313fa8118610b7d5760243610610dae576004358060a01c610dae57604052600154331815610b4c57600e6060527f6e6f7420676f7665726e616e636500000000000000000000000000000000000060805260605060605180608001601f826000031636823750506308c379a06020526020604052601f19601f6060510116604401603cfd5b6040516002556040517f90ad4c550d25bd23af61db38d1ff8671b89edaaa0bca0fc36bac5084ecc120bd60006060a2005b63a7dbff3e8118610c295760043610610dae57600254331815610bf75760166040527f6e6f742070656e64696e6720676f7665726e616e63650000000000000000000060605260405060405180606001601f826000031636823750506308c379a06000526020602052601f19601f6040510116604401601cfd5b336001556000600255337f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b8760006040a2005b63fc0e74d18118610c485760043610610dae5760005460405260206040f35b635aa6e6758118610c675760043610610dae5760015460405260206040f35b63c66eb0a28118610c865760043610610dae5760025460405260206040f35b6306fdde038118610d0b5760043610610dae576020806040528060400160035480825260208201600082601f0160051c60028111610dae578015610cdd57905b80600401548160051b840152600101818118610cc6575b505050508051806020830101601f82600003163682375050601f19601f825160200101169050810190506040f35b6397ad2ecc8118610d305760043610610dae5760065460405260075460605260406040f35b63cbe286638118610d6b5760243610610dae576004358060a01c610dae57604052600860405160205260005260406000205460605260206060f35b63e94860d88118610da65760243610610dae576004358060a01c610dae57604052600960405160205260005260406000205460605260206060f35b505b60006000fd5b600080fda165767970657283000307000b005b600080fd
```
