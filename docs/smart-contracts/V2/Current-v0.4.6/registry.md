# Registry.vy
>
> vyper: `0.3.3`
>
>

## Events

**NewRelease**

* `release_id` : uint256, *indexed*
* `template` : address, *notIndexed*
* `api_version` : string, *notIndexed*

**NewVault**

* `token` : address, *indexed*
* `vault_id` : uint256, *indexed*
* `vault` : address, *notIndexed*
* `api_version` : string, *notIndexed*

**NewExperimentalVault**

* `token` : address, *indexed*
* `deployer` : address, *indexed*
* `vault` : address, *notIndexed*
* `api_version` : string, *notIndexed*

**NewGovernance**

* `governance` : address, *notIndexed*

**VaultTagged**

* `vault` : address, *notIndexed*
* `tag` : string, *notIndexed*

## Methods

### setGovernance
>
> type: `nonpayable function`
>

Starts the 1st phase of the governance transfer.

*Throws if the caller is not current governance.*

Arguments:

* `governance`:  - *The next governance address*

### acceptGovernance
>
> type: `nonpayable function`
>

Completes the 2nd phase of the governance transfer.

*Throws if the caller is not the pending caller. Emits a `NewGovernance` event.*

### latestRelease
>
> type: `view function`
>

Returns the api version of the latest release.

*Throws if no releases are registered yet.*

Returns:

* `_0` - The api version of the latest release.

### latestVault
>
> type: `view function`
>

Returns the latest deployed vault for the given token.

*Throws if no vaults are endorsed yet for the given token.*

Arguments:

* `token`:  - *The token address to find the latest vault for.*

Returns:

* `_0` - The address of the latest vault for the given token.

### newRelease
>
> type: `nonpayable function`
>

Add a previously deployed Vault as the template contract for the latest release, to be used by further &#34;forwarder-style&#34; delegatecall proxy contracts that can be deployed from the registry throw other methods (to save gas).

*Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if the api version is the same as the previous release. Emits a `NewVault` event.*

Arguments:

* `vault`:  - *The vault that will be used as the template contract for the next release.*

### newVault
>
> type: `nonpayable function`
>

Create a new vault for the given token using the latest release in the registry, as a simple &#34;forwarder-style&#34; delegatecall proxy to the latest release. Also adds the new vault to the list of &#34;endorsed&#34; vaults for that token.

*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a `NewVault` event.*

Arguments:

* `token`:  - *The token that may be deposited into the new Vault.*

* `guardian`:  - *The address authorized for guardian interactions in the new Vault.*

* `rewards`:  - *The address to use for collecting rewards in the new Vault*

* `name`:  - *Specify a custom Vault name. Set to empty string for default choice.*

* `symbol`:  - *Specify a custom Vault symbol name. Set to empty string for default choice.*

* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*

Returns:

* `_0` - The address of the newly-deployed vault

### newVault
>
> type: `nonpayable function`
>

*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a `NewVault` event.*

Arguments:

* `token`:  - *The token that may be deposited into the new Vault.*

* `guardian`:  - *The address authorized for guardian interactions in the new Vault.*

* `rewards`:  - *The address to use for collecting rewards in the new Vault*

* `name`:  - *Specify a custom Vault name. Set to empty string for default choice.*

* `symbol`:  - *Specify a custom Vault symbol name. Set to empty string for default choice.*

* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*

Returns:

* `_0` - The address of the newly-deployed vault

### newExperimentalVault
>
> type: `nonpayable function`
>

Create a new vault for the given token using the latest release in the registry, as a simple &#34;forwarder-style&#34; delegatecall proxy to the latest release. Does not add the new vault to the list of &#34;endorsed&#34; vaults for that token.

*Throws if no releases are registered yet. Emits a `NewExperimentalVault` event.*

Arguments:

* `token`:  - *The token that may be deposited into the new Vault.*

* `governance`:  - *The address authorized for governance interactions in the new Vault.*

* `guardian`:  - *The address authorized for guardian interactions in the new Vault.*

* `rewards`:  - *The address to use for collecting rewards in the new Vault*

* `name`:  - *Specify a custom Vault name. Set to empty string for default choice.*

* `symbol`:  - *Specify a custom Vault symbol name. Set to empty string for default choice.*

* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*

Returns:

* `_0` - The address of the newly-deployed vault

### newExperimentalVault
>
> type: `nonpayable function`
>

*Throws if no releases are registered yet. Emits a `NewExperimentalVault` event.*

Arguments:

* `token`:  - *The token that may be deposited into the new Vault.*

* `governance`:  - *The address authorized for governance interactions in the new Vault.*

* `guardian`:  - *The address authorized for guardian interactions in the new Vault.*

* `rewards`:  - *The address to use for collecting rewards in the new Vault*

* `name`:  - *Specify a custom Vault name. Set to empty string for default choice.*

* `symbol`:  - *Specify a custom Vault symbol name. Set to empty string for default choice.*

* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*

Returns:

* `_0` - The address of the newly-deployed vault

### endorseVault
>
> type: `nonpayable function`
>

Adds an existing vault to the list of &#34;endorsed&#34; vaults for that token.

*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*

Arguments:

* `vault`:  - *The vault that will be endorsed by the Registry.*

* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*

### endorseVault
>
> type: `nonpayable function`
>

*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*

Arguments:

* `vault`:  - *The vault that will be endorsed by the Registry.*

* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*

### setBanksy
>
> type: `nonpayable function`
>

Set the ability of a particular tagger to tag current vaults.

*Throws if caller is not `self.governance`.*

Arguments:

* `tagger`:  - *The address to approve or deny access to tagging.*

* `allowed`:  - *Whether to approve or deny `tagger`. Defaults to approve.*

### setBanksy
>
> type: `nonpayable function`
>

*Throws if caller is not `self.governance`.*

Arguments:

* `tagger`:  - *The address to approve or deny access to tagging.*

* `allowed`:  - *Whether to approve or deny `tagger`. Defaults to approve.*

### tagVault
>
> type: `nonpayable function`
>

Tag a Vault with a message.

*Throws if caller is not `self.governance` or an approved tagger. Emits a `VaultTagged` event.*

Arguments:

* `vault`:  - *The address to tag with the given `tag` message.*

* `tag`:  - *The message to tag `vault` with.*

## ABI

```json
[
  {
    "name": "NewRelease",
    "inputs": [
      {
        "name": "release_id",
        "type": "uint256",
        "indexed": true
      },
      {
        "name": "template",
        "type": "address",
        "indexed": false
      },
      {
        "name": "api_version",
        "type": "string",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "NewVault",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "vault_id",
        "type": "uint256",
        "indexed": true
      },
      {
        "name": "vault",
        "type": "address",
        "indexed": false
      },
      {
        "name": "api_version",
        "type": "string",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "NewExperimentalVault",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "deployer",
        "type": "address",
        "indexed": true
      },
      {
        "name": "vault",
        "type": "address",
        "indexed": false
      },
      {
        "name": "api_version",
        "type": "string",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "NewGovernance",
    "inputs": [
      {
        "name": "governance",
        "type": "address",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "VaultTagged",
    "inputs": [
      {
        "name": "vault",
        "type": "address",
        "indexed": false
      },
      {
        "name": "tag",
        "type": "string",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "constructor",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setGovernance",
    "inputs": [
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
    "name": "acceptGovernance",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "latestRelease",
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
    "name": "latestVault",
    "inputs": [
      {
        "name": "token",
        "type": "address"
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
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "newRelease",
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
    "name": "newVault",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "guardian",
        "type": "address"
      },
      {
        "name": "rewards",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
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
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "newVault",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "guardian",
        "type": "address"
      },
      {
        "name": "rewards",
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
        "name": "releaseDelta",
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
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "newExperimentalVault",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "governance",
        "type": "address"
      },
      {
        "name": "guardian",
        "type": "address"
      },
      {
        "name": "rewards",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
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
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "newExperimentalVault",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "governance",
        "type": "address"
      },
      {
        "name": "guardian",
        "type": "address"
      },
      {
        "name": "rewards",
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
        "name": "releaseDelta",
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
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "endorseVault",
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
    "name": "endorseVault",
    "inputs": [
      {
        "name": "vault",
        "type": "address"
      },
      {
        "name": "releaseDelta",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setBanksy",
    "inputs": [
      {
        "name": "tagger",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setBanksy",
    "inputs": [
      {
        "name": "tagger",
        "type": "address"
      },
      {
        "name": "allowed",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "tagVault",
    "inputs": [
      {
        "name": "vault",
        "type": "address"
      },
      {
        "name": "tag",
        "type": "string"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "numReleases",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "releases",
    "inputs": [
      {
        "name": "arg0",
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
    "name": "numVaults",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "vaults",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      },
      {
        "name": "arg1",
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
    "name": "tokens",
    "inputs": [
      {
        "name": "arg0",
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
    "name": "numTokens",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "isRegistered",
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
    "name": "pendingGovernance",
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
    "name": "tags",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
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
    "name": "banksy",
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
0x336007556110a161001c6300000000396110a16000016300000000f3600436101561000d57610cac565b60003560e01c3461109c5763ab033ea98118610042576004358060a01c61109c57604052600754331861109c57604051600855005b63238efcbc811861008657600854331861109c57336007557f4f386975ea1c2f7cf1845b08bee00626fbb624ecad16254d63d9bb9ba86526de3360405260206040a1005b637be0ca5e811861014b57602080610100526325829410604052606060406004605c6001600054600180821061109c57808203905090506020526000526040600020545afa6100da573d600060003e3d6000fd5b60403d1061109c57604051604001601c81511161109c5780518060c05260208201805160e05250505060c081610100018151808252602083016020830181518152505050805180602083010181600003601f163682375050601f19601f825160200101169050905081019050610100f35b63e177dc7081186101ad576004358060a01c61109c5760405260036040516020526000526040600020806002604051602052600052604060002054600180821061109c5780820390509050602052600052604060002090505460605260206060f35b6333990d4b81186103bb576004358060a01c61109c57604052600754331861109c57600054606052600060605111156102c45763258294106102c05260606102c060046102dc6040515afa610207573d600060003e3d6000fd5b60403d1061109c576102c0516102c001601c81511161109c5780518061034052602082018051610360525050506103408051602082012090506325829410610200526060610200600461021c6001606051600180821061109c57808203905090506020526000526040600020545afa610285573d600060003e3d6000fd5b60403d1061109c576102005161020001601c81511161109c57805180610280526020820180516102a0525050506102808051602082012090501461109c575b60405160016060516020526000526040600020556060516001818183011061109c57808201905090506000556060517fa6fbd216b6734f34092f1be6b7247e1551a6d4f2d5000c53721cfdc119a5b7cf60406040516101405280610160526325829410608052606060806004609c6040515afa610346573d600060003e3d6000fd5b60403d1061109c57608051608001601c81511161109c57805180610100526020820180516101205250505061010081610140018151808252602083016020830181518152505050805180602083010181600003601f163682375050601f19601f825160200101169050905081019050610140a2005b63108ca11e81186103d15760006104a0526103e4565b63b0b40fce81186105015760a4356104a0525b6004358060a01c61109c576103a0526024358060a01c61109c576103c0526044358060a01c61109c576103e052606435600401604081351161109c578035806104005260208201818161042037505050608435600401602081351161109c578035806104605260208201803561048052505050600754331861109c57600054600180821061109c57808203905090506104a05180821061109c57808203905090506104c0526103a051604052336060526103e0516080526103c05160a052610400518060c0528060e08261042060045afa50506104605180610120526104805161014052506104c051610160526104dc610500610cb2565b610500516104e0526103a0516040526104e0516060526104fa610e1a565b60206104e0f35b635b73aa0d81186105175760006104605261052a565b635bd4b0f2811861070c5760c435610460525b6004358060a01c61109c57610340526024358060a01c61109c57610360526044358060a01c61109c57610380526064358060a01c61109c576103a052608435600401604081351161109c578035806103c0526020820181816103e03750505060a435600401602081351161109c578035806104205260208201803561044052505050600054600180821061109c57808203905090506104605180821061109c57808203905090506104805261034051604052610360516060526103a0516080526103805160a0526103c0518060c0528060e0826103e060045afa5050610420518061012052610440516101405250610480516101605261062b6104c0610cb2565b6104c0516104a05233610340517f57a9cdc2a05e05f66e76769bdbe88e21ec45d9ee0f97d4cb60395d4c75dcbcda60406104a05161058052806105a05263258294106104c05260606104c060046104dc6104a0515afa610690573d600060003e3d6000fd5b60403d1061109c576104c0516104c001601c81511161109c57805180610540526020820180516105605250505061054081610580018151808252602083016020830181518152505050805180602083010181600003601f163682375050601f19601f825160200101169050905081019050610580a360206104a0f35b6329b2e0c681186107225760006103c052610735565b63b366a35c8118610900576024356103c0525b6004358060a01c61109c576103a052600754331861109c5733635aa6e6756103e05260206103e060046103fc6103a0515afa610776573d600060003e3d6000fd5b60203d1061109c576103e0518060a01c61109c5761042052610420511861109c57600054600180821061109c57808203905090506103c05180821061109c57808203905090506103e0526325829410610440526060610440600461045c60016103e0516020526000526040600020545afa6107f6573d600060003e3d6000fd5b60403d1061109c576104405161044001601c81511161109c578051806104c0526020820180516104e0525050506104c0805180610400526020820180516104205250505061040051610420206325829410610500526060610500600461051c6103a0515afa61086a573d600060003e3d6000fd5b60403d1061109c576105005161050001601c81511161109c57805180610580526020820180516105a0525050506105808051602082012090501861109c5763fc0c546a610440526020610440600461045c6103a0515afa6108d0573d600060003e3d6000fd5b60203d1061109c57610440518060a01c61109c5761048052610480516040526103a0516060526108fe610e1a565b005b632cad8f9f811861091557600160605261092f565b635e05f6af811861095c576024358060011c61109c576060525b6004358060a01c61109c57604052600754331861109c57606051600a604051602052600052604060002055005b6360bd68f88118610a87576004358060a01c61109c57604052602435600401607881351161109c5780358060605260208201818160803750505060075433146109b457600a336020526000526040600020541561109c575b606051806009604051602052600052604060002055600160096040516020526000526040600020016000602083601f01046004811161109c578015610a0c57905b6020810260800151818401556001018181186109f5575b505050507f07bd58794c2ca0ae152f7719eb5f02c654476de972cadec0e8191ae8be42096d6040604051610100528061012052806101000160605180825260208201818183608060045afa90505050805180602083010181600003601f163682375050601f19601f82516020010116905081019050610100a1005b6356e0a94b8118610a9e5760005460405260206040f35b63b6a9f40f8118610ac357600160043560205260005260406000205460405260206040f35b63f9c7bba58118610af6576004358060a01c61109c57604052600260405160205260005260406000205460605260206060f35b637bbfc69e8118610b3a576004358060a01c61109c576040526003604051602052600052604060002080602435602052600052604060002090505460605260206060f35b634f64b2be8118610b5f57600460043560205260005260406000205460405260206040f35b638e499bcf8118610b765760055460405260206040f35b63c3c5a5478118610ba9576004358060a01c61109c57604052600660405160205260005260406000205460605260206060f35b635aa6e6758118610bc05760075460405260206040f35b63f39c38a08118610bd75760085460405260206040f35b6358b8f8428118610c77576004358060a01c61109c576040526020806060526009604051602052600052604060002081606001815480825260018301602083016000602084601f01046004811161109c578015610c4657905b8084015460208202840152600101818118610c30575b5050505050805180602083010181600003601f163682375050601f19601f8251602001011690509050810190506060f35b63ee711ed58118610caa576004358060a01c61109c57604052600a60405160205260005260406000205460605260206060f35b505b60006000fd5b600161016051602052600052604060002054610180526000610180511461109c577f602d3d8160093d39f3363d3d373d3d3d363d73000000000000000000000000006101c0526101805160601b6101d3527f5af43d82803e903d91602b57fd5bf300000000000000000000000000000000006101e75260366101c06000f06101a05263a5b81fdf6101c05260c06040516101e05260605161020052608051610220528061024052806101e00160c0518082526020820181818360e060045afa90505050805180602083010181600003601f163682375050601f19601f825160200101169050810190508061026052806101e00161012051808252602082016101405181525050805180602083010181600003601f163682375050601f19601f8251602001011690508101905060a05161028052506101a0513b1561109c57600060006101646101dc60006101a0515af1610e11573d600060003e3d6000fd5b6101a051815250565b600260405160205260005260406000205460805260006080511115610f2e5763258294106102e05260606102e060046102fc6060515afa610e60573d600060003e3d6000fd5b60403d1061109c576102e0516102e001601c81511161109c5780518061036052602082018051610380525050506103608051602082012090506325829410610220526060610220600461023c6003604051602052600052604060002080608051600180821061109c578082039050905060205260005260406000209050545afa610eef573d600060003e3d6000fd5b60403d1061109c576102205161022001601c81511161109c578051806102a0526020820180516102c0525050506102a08051602082012090501461109c575b606051600360405160205260005260406000208060805160205260005260406000209050556080516001818183011061109c578082019050905060026040516020526000526040600020556006604051602052600052604060002054610fce576001600660405160205260005260406000205560405160046005546020526000526040600020556005546001818183011061109c57808201905090506005555b6080516040517fce089905ba4a4d622553bcb5646fd23e895c256f0376eee04e99e61cec1dc7e86040606051610160528061018052632582941060a052606060a0600460bc6060515afa611027573d600060003e3d6000fd5b60403d1061109c5760a05160a001601c81511161109c57805180610120526020820180516101405250505061012081610160018151808252602083016020830181518152505050805180602083010181600003601f163682375050601f19601f825160200101169050905081019050610160a3565b600080fd
```
