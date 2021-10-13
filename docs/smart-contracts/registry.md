# Registry.vy
> vyper: `0.2.12`
> 
> 








## Events


{{< hint info >}}
**NewRelease**

* `release_id` : uint256, *indexed*
* `template` : address, *notIndexed*
* `api_version` : string, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**NewVault**

* `token` : address, *indexed*
* `vault_id` : uint256, *indexed*
* `vault` : address, *notIndexed*
* `api_version` : string, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**NewExperimentalVault**

* `token` : address, *indexed*
* `deployer` : address, *indexed*
* `vault` : address, *notIndexed*
* `api_version` : string, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**NewGovernance**

* `governance` : address, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**VaultTagged**

* `vault` : address, *notIndexed*
* `tag` : string, *notIndexed*
{{< /hint >}}


## Methods

### setGovernance
> type: `nonpayable function`
> gas: `37545`


Starts the 1st phase of the governance transfer.    


*Throws if the caller is not current governance.*


Arguments:
    
* `governance`:  - *The next governance address*
    





### acceptGovernance
> type: `nonpayable function`
> gas: `38817`


Completes the 2nd phase of the governance transfer.    


*Throws if the caller is not the pending caller. Emits a `NewGovernance` event.*






### latestRelease
> type: `view function`
> gas: `12891`


Returns the api version of the latest release.    


*Throws if no releases are registered yet.*



Returns:

* `_0` - The api version of the latest release.





### latestVault
> type: `view function`
> gas: `5187`


Returns the latest deployed vault for the given token.    


*Throws if no vaults are endorsed yet for the given token.*


Arguments:
    
* `token`:  - *The token address to find the latest vault for.*
    


Returns:

* `_0` - The address of the latest vault for the given token.





### newRelease
> type: `nonpayable function`
> gas: `95468`


Add a previously deployed Vault as the template contract for the latest release, to be used by further &#34;forwarder-style&#34; delegatecall proxy contracts that can be deployed from the registry throw other methods (to save gas).    


*Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if the api version is the same as the previous release. Emits a `NewVault` event.*


Arguments:
    
* `vault`:  - *The vault that will be used as the template contract for the next release.*
    





### newVault
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
> type: `nonpayable function`
> 


Adds an existing vault to the list of &#34;endorsed&#34; vaults for that token.    


*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*


Arguments:
    
* `vault`:  - *The vault that will be endorsed by the Registry.*
    
* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*
    





### endorseVault
> type: `nonpayable function`
> 



*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*


Arguments:
    
* `vault`:  - *The vault that will be endorsed by the Registry.*
    
* `releaseDelta`:  - *Specify the number of releases prior to the latest to use as a target. Default is latest.*
    





### setBanksy
> type: `nonpayable function`
> 


Set the ability of a particular tagger to tag current vaults.    


*Throws if caller is not `self.governance`.*


Arguments:
    
* `tagger`:  - *The address to approve or deny access to tagging.*
    
* `allowed`:  - *Whether to approve or deny `tagger`. Defaults to approve.*
    





### setBanksy
> type: `nonpayable function`
> 



*Throws if caller is not `self.governance`.*


Arguments:
    
* `tagger`:  - *The address to approve or deny access to tagging.*
    
* `allowed`:  - *Whether to approve or deny `tagger`. Defaults to approve.*
    





### tagVault
> type: `nonpayable function`
> gas: `190064`


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
    "outputs": [],
    "gas": 37545
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "acceptGovernance",
    "inputs": [],
    "outputs": [],
    "gas": 38817
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
    ],
    "gas": 12891
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
    ],
    "gas": 5187
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
    "outputs": [],
    "gas": 95468
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
    "outputs": [],
    "gas": 190064
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
    ],
    "gas": 2688
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
    ],
    "gas": 2833
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
    ],
    "gas": 2963
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
    ],
    "gas": 3108
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
    ],
    "gas": 2923
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
    ],
    "gas": 2838
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
    ],
    "gas": 3083
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
    ],
    "gas": 2898
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
    ],
    "gas": 2928
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
    ],
    "gas": 18029
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
    ],
    "gas": 3203
  }
]
```

## Byte code
```bin
0x336007556115e556600436101561000d576110f3565b600035601c52600051341561002157600080fd5b63ab033ea98114156100535760043560a01c1561003d57600080fd5b600754331461004b57600080fd5b600435600855005b63238efcbc81141561009f57600854331461006d57600080fd5b3360075533610140527f4f386975ea1c2f7cf1845b08bee00626fbb624ecad16254d63d9bb9ba86526de6020610140a1005b637be0ca5e8114156101735760606101a0600463258294106101405261015c60016000546001808210156100d257600080fd5b8082039050905060e05260c052604060c020545afa6100f057600080fd5b603f3d116100fd57600080fd5b601d6101a06101a05101511061011257600080fd5b6000506101c08051602001806102408284600060045af161013257600080fd5b5050610240518061026001818260206001820306601f82010390500336823750506020610220526040610240510160206001820306601f8201039050610220f35b63e177dc708114156101db5760043560a01c1561018f57600080fd5b600360043560e05260c052604060c020600260043560e05260c052604060c020546001808210156101bf57600080fd5b8082039050905060e05260c052604060c0205460005260206000f35b6333990d4b8114156104315760043560a01c156101f757600080fd5b600754331461020557600080fd5b6000546101405260006101405111156102e1576060610400600463258294106103a0526103bc6004355afa61023957600080fd5b603f3d1161024657600080fd5b601d6104006104005101511061025b57600080fd5b600050610420602001516060610340600463258294106102e0526102fc60016101405160018082101561028d57600080fd5b8082039050905060e05260c052604060c020545afa6102ab57600080fd5b603f3d116102b857600080fd5b601d610340610340510151106102cd57600080fd5b60005061036060200151186102e157600080fd5b60043560016101405160e05260c052604060c0205561014051600181818301101561030b57600080fd5b8082019050905060005560606101c0600463258294106101605261017c6004355afa61033657600080fd5b603f3d1161034357600080fd5b601d6101c06101c05101511061035857600080fd5b6000506101e08051602001806102208284600060045af161037857600080fd5b50506004356102c052604061028052610280516102e052610220805160200180610280516102c0018284600060045af16103b157600080fd5b5050610280516102c00151806020610280516102c0010101818260206001820306601f82010390500336823750506020610280516102c0015160206001820306601f820103905061028051010161028052610140517fa6fbd216b6734f34092f1be6b7247e1551a6d4f2d5000c53721cfdc119a5b7cf610280516102c0a2005b63108ca11e81141561044857600061022052610469565b63b0b40fce81141561046457602060a461022037600050610469565b6106f4565b60043560a01c1561047957600080fd5b60243560a01c1561048957600080fd5b60443560a01c1561049957600080fd5b60606064356004016101403760406064356004013511156104b957600080fd5b60406084356004016101c03760206084356004013511156104d957600080fd5b60075433146104e757600080fd5b6000546001808210156104f957600080fd5b80820390509050610220518082101561051157600080fd5b80820390509050610240526101405161016051610180516101a0516101c0516101e0516102005161022051610240516102605160e060043561028052336102a0526044356102c0526024356102e05280610300526101408080516020018084610280018284600060045af161058557600080fd5b50508051820160206001820306601f820103905060200191505080610320526101c08080516020018084610280018284600060045af16105c457600080fd5b50505061024051610340525061032051806102800180518060206001820306601f82010390508201610440525050505b6103606104405110156106065761061b565b610440515160206104405103610440526105f4565b6103405161032051610300516102e0516102c0516102a05161028051600658016110f9565b61046052610260526102405261022052610200526101e0526101c0526101a05261018052610160526101405261046051610260526101405161016051610180516101a0516101c0516101e0516102005161022051610240516102605160043561028052610260516102a0526102a05161028051600658016112fc565b610260526102405261022052610200526101e0526101c0526101a0526101805261016052610140526000506102605160005260206000f35b635b73aa0d81141561070b5760006102205261072c565b635bd4b0f281141561072757602060c46102203760005061072c565b610a5e565b60043560a01c1561073c57600080fd5b60243560a01c1561074c57600080fd5b60443560a01c1561075c57600080fd5b60643560a01c1561076c57600080fd5b606060843560040161014037604060843560040135111561078c57600080fd5b604060a4356004016101c037602060a4356004013511156107ac57600080fd5b6000546001808210156107be57600080fd5b8082039050905061022051808210156107d657600080fd5b80820390509050610240526101405161016051610180516101a0516101c0516101e0516102005161022051610240516102605160e060406004610280376064356102c0526044356102e05280610300526101408080516020018084610280018284600060045af161084657600080fd5b50508051820160206001820306601f820103905060200191505080610320526101c08080516020018084610280018284600060045af161088557600080fd5b50505061024051610340525061032051806102800180518060206001820306601f82010390508201610440525050505b6103606104405110156108c7576108dc565b610440515160206104405103610440526108b5565b6103405161032051610300516102e0516102c0516102a05161028051600658016110f9565b61046052610260526102405261022052610200526101e0526101c0526101a052610180526101605261014052610460516102605260606102e0600463258294106102805261029c610260515afa61095757600080fd5b603f3d1161096457600080fd5b601d6102e06102e05101511061097957600080fd5b6000506103008051602001806103408284600060045af161099957600080fd5b5050610260516103e05260406103a0526103a051610400526103408051602001806103a0516103e0018284600060045af16109d357600080fd5b50506103a0516103e001518060206103a0516103e0010101818260206001820306601f820103905003368237505060206103a0516103e0015160206001820306601f82010390506103a05101016103a052336004357f57a9cdc2a05e05f66e76769bdbe88e21ec45d9ee0f97d4cb60395d4c75dcbcda6103a0516103e0a36102605160005260206000f35b6329b2e0c6811415610a7557600061014052610a96565b63b366a35c811415610a91576020602461014037600050610a96565b610ca6565b60043560a01c15610aa657600080fd5b6007543314610ab457600080fd5b3360206101c06004635aa6e6756101605261017c6004355afa610ad657600080fd5b601f3d11610ae357600080fd5b6000506101c05114610af457600080fd5b600054600180821015610b0657600080fd5b808203905090506101405180821015610b1e57600080fd5b80820390509050610160526060610240600463258294106101e0526101fc60016101605160e05260c052604060c020545afa610b5957600080fd5b603f3d11610b6657600080fd5b601d61024061024051015110610b7b57600080fd5b6000506102608051602001806101808284600060045af1610b9b57600080fd5b50506101a0516060610300600463258294106102a0526102bc6004355afa610bc257600080fd5b603f3d11610bcf57600080fd5b601d61030061030051015110610be457600080fd5b6000506103206020015114610bf857600080fd5b6020610240600463fc0c546a6101e0526101fc6004355afa610c1957600080fd5b601f3d11610c2657600080fd5b60005061024051610260526101405161016051610180516101a0516101c0516101e0516102005161022051610240516102605161026051610280526004356102a0526102a05161028051600658016112fc565b610260526102405261022052610200526101e0526101c0526101a052610180526101605261014052600050005b632cad8f9f811415610cbd57600161014052610cee565b635e05f6af811415610ce95760243560011c15610cd957600080fd5b6020602461014037600050610cee565b610d23565b60043560a01c15610cfe57600080fd5b6007543314610d0c57600080fd5b61014051600a60043560e05260c052604060c02055005b6360bd68f8811415610e9c5760043560a01c15610d3f57600080fd5b6098602435600401610140376078602435600401351115610d5f57600080fd5b600754331815610d8157600a3360e05260c052604060c02054610d8157600080fd5b61014080600960043560e05260c052604060c02060c052602060c020602082510161012060006005818352015b82610120516020021115610dc157610de3565b61012051602002850151610120518501555b8151600101808352811415610dae575b50505050505060043561024052604061020052610200516102605261014080516020018061020051610240018284600060045af1610e2057600080fd5b505061020051610240015180602061020051610240010101818260206001820306601f8201039050033682375050602061020051610240015160206001820306601f8201039050610200510101610200527f07bd58794c2ca0ae152f7719eb5f02c654476de972cadec0e8191ae8be42096d61020051610240a1005b6356e0a94b811415610eb45760005460005260206000f35b63b6a9f40f811415610eda57600160043560e05260c052604060c0205460005260206000f35b63f9c7bba5811415610f105760043560a01c15610ef657600080fd5b600260043560e05260c052604060c0205460005260206000f35b637bbfc69e811415610f545760043560a01c15610f2c57600080fd5b600360043560e05260c052604060c02060243560e05260c052604060c0205460005260206000f35b634f64b2be811415610f7a57600460043560e05260c052604060c0205460005260206000f35b638e499bcf811415610f925760055460005260206000f35b63c3c5a547811415610fc85760043560a01c15610fae57600080fd5b600660043560e05260c052604060c0205460005260206000f35b635aa6e675811415610fe05760075460005260206000f35b63f39c38a0811415610ff85760085460005260206000f35b6358b8f8428114156110bb5760043560a01c1561101457600080fd5b600960043560e05260c052604060c0208060c052602060c020610180602082540161012060006005818352015b8261012051602002111561105457611076565b61012051850154610120516020028501525b8151600101808352811415611041575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f35b63ee711ed58114156110f15760043560a01c156110d757600080fd5b600a60043560e05260c052604060c0205460005260206000f35b505b60006000fd5b610220526101405261016052610180526101a0526101c0526101e05261020052610240526000610320525b6102405160206001820306601f8201039050610320511015156111465761115f565b6103205161026001526103205160200161032052611124565b6102c0526000610320525b6102c05160206001820306601f82010390506103205110151561118c576111a5565b610320516102e00152610320516020016103205261116a565b60005060016102005160e05260c052604060c0205461034052600061034051186111ce57600080fd5b7f602d3d8160093d39f3363d3d373d3d3d363d7300000000000000000000000000610380526103405160601b610393527f5af43d82803e903d91602b57fd5bf300000000000000000000000000000000006103a75260366103806000f061036052610360513b61123d57600080fd5b6000600061016460c063a5b81fdf61038052610140516103a052610160516103c052610180516103e052806104005261024080805160200180846103a0018284600060045af161128c57600080fd5b50508051820160206001820306601f820103905060200191505080610420526102c080805160200180846103a0018284600060045af16112cb57600080fd5b5050506101a0516104405261039c90506000610360515af16112ec57600080fd5b6103605160005260005161022051565b61018052610140526101605260026101405160e05260c052604060c020546101a05260006101a0511115611403576060610460600463258294106104005261041c610160515afa61134c57600080fd5b603f3d1161135957600080fd5b601d6104606104605101511061136e57600080fd5b6000506104806020015160606103a0600463258294106103405261035c60036101405160e05260c052604060c0206101a0516001808210156113af57600080fd5b8082039050905060e05260c052604060c020545afa6113cd57600080fd5b603f3d116113da57600080fd5b601d6103a06103a0510151106113ef57600080fd5b6000506103c0602001511861140357600080fd5b6101605160036101405160e05260c052604060c0206101a05160e05260c052604060c020556101a051600181818301101561143d57600080fd5b8082019050905060026101405160e05260c052604060c0205560066101405160e05260c052604060c0205415156114b757600160066101405160e05260c052604060c0205561014051600460055460e05260c052604060c020556005805460018181830110156114ac57600080fd5b808201905090508155505b6060610220600463258294106101c0526101dc610160515afa6114d957600080fd5b603f3d116114e657600080fd5b601d610220610220510151106114fb57600080fd5b6000506102408051602001806102808284600060045af161151b57600080fd5b5050610160516103205260406102e0526102e051610340526102808051602001806102e051610320018284600060045af161155557600080fd5b50506102e05161032001518060206102e051610320010101818260206001820306601f820103905003368237505060206102e051610320015160206001820306601f82010390506102e05101016102e0526101a051610140517fce089905ba4a4d622553bcb5646fd23e895c256f0376eee04e99e61cec1dc7e86102e051610320a361018051565b6100086115e5036100086000396100086115e5036000f3
```