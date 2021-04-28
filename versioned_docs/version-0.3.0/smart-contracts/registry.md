# Registry.vy
> vyper: `0.2.8`
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
* `deployment_id` : uint256, *indexed*
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
> gas: `36218`


Starts the 1st phase of the governance transfer.    


*Throws if the caller is not current governance.*


Arguments:
    
* `governance`:  - *The next governance address*
    





### acceptGovernance
> type: `nonpayable function`
> gas: `37490`


Completes the 2nd phase of the governance transfer.    


*Throws if the caller is not the pending caller. Emits a `NewGovernance` event.*






### latestRelease
> type: `view function`
> gas: `6804`


Returns the api version of the latest release.    


*Throws if no releases are registered yet.*



Returns:

* `_0` - The api version of the latest release.





### latestVault
> type: `view function`
> gas: `2560`


Returns the latest deployed vault for the given token.    


*Throws if no deployments are endorsed yet for the given token.*


Arguments:
    
* `token`:  - *The token address to find the latest deployment for.*
    


Returns:

* `_0` - The address of the latest deployment.





### newRelease
> type: `nonpayable function`
> gas: `166808`


Add a previously deployed Vault as the template contract for the latest release, to be used by further &#34;forwarder-style&#34; delegatecall proxy contracts that can be deployed from the registry throw other methods (to save gas).    


*Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if the api version is the same as the previous release. Emits a `NewVault` event.*


Arguments:
    
* `vault`:  - *The vault that will be used as the template contract for the next release.*
    





### newVault
> type: `nonpayable function`
> gas: `136989`


Create a new vault for the given token using the latest release in the registry, as a simple &#34;forwarder-style&#34; delegatecall proxy to the latest release. Also adds the new vault to the list of &#34;endorsed&#34; vaults for that token.    


*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if there already is a deployment for the given token with the latest api version. Emits a `NewVault` event.*


Arguments:
    
* `token`:  - *The token that may be deposited into the new Vault.*
    
* `guardian`:  - *The address authorized for guardian interactions in the new Vault.*
    
* `rewards`:  - *The address to use for collecting rewards in the new Vault*
    
* `name`:  - *Specify a custom Vault name. Set to empty string for default choice.*
    
* `symbol`:  - *Specify a custom Vault symbol name. Set to empty string for default choice.*
    


Returns:

* `_0` - The address of the newly-deployed vault





### newExperimentalVault
> type: `nonpayable function`
> gas: `61714`


Create a new vault for the given token using the latest release in the registry, as a simple &#34;forwarder-style&#34; delegatecall proxy to the latest release. Does not add the new vault to the list of &#34;endorsed&#34; vaults for that token.    


*Throws if no releases are registered yet. Emits a `NewExperimentalVault` event.*


Arguments:
    
* `token`:  - *The token that may be deposited into the new Vault.*
    
* `governance`:  - *The address authorized for governance interactions in the new Vault.*
    
* `guardian`:  - *The address authorized for guardian interactions in the new Vault.*
    
* `rewards`:  - *The address to use for collecting rewards in the new Vault*
    
* `name`:  - *Specify a custom Vault name. Set to empty string for default choice.*
    
* `symbol`:  - *Specify a custom Vault symbol name. Set to empty string for default choice.*
    


Returns:

* `_0` - The address of the newly-deployed vault





### endorseVault
> type: `nonpayable function`
> gas: `88812`


Adds an existing vault to the list of &#34;endorsed&#34; vaults for that token.    


*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*


Arguments:
    
* `vault`:  - *The vault that will be endorsed by the Registry.*
    





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
> gas: `186127`


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
        "type": "uint256",
        "name": "release_id",
        "indexed": true
      },
      {
        "type": "address",
        "name": "template",
        "indexed": false
      },
      {
        "type": "string",
        "name": "api_version",
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
        "type": "address",
        "name": "token",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "deployment_id",
        "indexed": true
      },
      {
        "type": "address",
        "name": "vault",
        "indexed": false
      },
      {
        "type": "string",
        "name": "api_version",
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
        "type": "address",
        "name": "token",
        "indexed": true
      },
      {
        "type": "address",
        "name": "deployer",
        "indexed": true
      },
      {
        "type": "address",
        "name": "vault",
        "indexed": false
      },
      {
        "type": "string",
        "name": "api_version",
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
        "type": "address",
        "name": "governance",
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
        "type": "address",
        "name": "vault",
        "indexed": false
      },
      {
        "type": "string",
        "name": "tag",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "outputs": [],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "name": "setGovernance",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "governance"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36218
  },
  {
    "name": "acceptGovernance",
    "outputs": [],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37490
  },
  {
    "name": "latestRelease",
    "outputs": [
      {
        "type": "string",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 6804
  },
  {
    "name": "latestVault",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 2560
  },
  {
    "name": "newRelease",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "vault"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 166808
  },
  {
    "name": "newVault",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      },
      {
        "type": "address",
        "name": "guardian"
      },
      {
        "type": "address",
        "name": "rewards"
      },
      {
        "type": "string",
        "name": "name"
      },
      {
        "type": "string",
        "name": "symbol"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 136989
  },
  {
    "name": "newExperimentalVault",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      },
      {
        "type": "address",
        "name": "governance"
      },
      {
        "type": "address",
        "name": "guardian"
      },
      {
        "type": "address",
        "name": "rewards"
      },
      {
        "type": "string",
        "name": "name"
      },
      {
        "type": "string",
        "name": "symbol"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 61714
  },
  {
    "name": "endorseVault",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "vault"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 88812
  },
  {
    "name": "setBanksy",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "tagger"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "setBanksy",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "tagger"
      },
      {
        "type": "bool",
        "name": "allowed"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "tagVault",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "vault"
      },
      {
        "type": "string",
        "name": "tag"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 186127
  },
  {
    "name": "nextRelease",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 1451
  },
  {
    "name": "releases",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 1596
  },
  {
    "name": "nextDeployment",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 1726
  },
  {
    "name": "vaults",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      },
      {
        "type": "uint256",
        "name": "arg1"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 1871
  },
  {
    "name": "governance",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 1571
  },
  {
    "name": "tags",
    "outputs": [
      {
        "type": "string",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 10172
  },
  {
    "name": "banksy",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 1846
  }
]
```

## Byte code
```bin
0x336004556114ea56341561000a57600080fd5b6004361015610018576114dc565b600035601c5263ab033ea960005114156100525760043560a01c1561003c57600080fd5b600454331461004a57600080fd5b600435600555005b63238efcbc60005114156100a057600554331461006e57600080fd5b3360045533610140527f4f386975ea1c2f7cf1845b08bee00626fbb624ecad16254d63d9bb9ba86526de6020610140a1005b637be0ca5e60005114156101785760606101a0600463258294106101405261015c60016000546001808210156100d557600080fd5b8082039050905060e05260c052604060c020545afa6100f357600080fd5b603f3d1161010057600080fd5b601d6101a06101a05101511061011557600080fd5b6000506101c08051602001806102408284600060045af161013557600080fd5b5050610240518061026001818260206001820306601f82010390500336823750506020610220526040610240510160206001820306601f8201039050610220f350005b63e177dc7060005114156101e45760043560a01c1561019657600080fd5b600360043560e05260c052604060c020600260043560e05260c052604060c020546001808210156101c657600080fd5b8082039050905060e05260c052604060c0205460005260206000f350005b600015610429575b61016052610140526000546101805260006101805111156102d2576060610440600463258294106103e0526103fc610140515afa61022957600080fd5b603f3d1161023657600080fd5b601d6104406104405101511061024b57600080fd5b600050610460602001516060610380600463258294106103205261033c60016101805160018082101561027d57600080fd5b8082039050905060e05260c052604060c020545afa61029b57600080fd5b603f3d116102a857600080fd5b601d610380610380510151106102bd57600080fd5b6000506103a060200151186102d157600080fd5b5b6101405160016101805160e05260c052604060c020556101805160018181830110156102fd57600080fd5b808201905090506000556060610200600463258294106101a0526101bc610140515afa61032957600080fd5b603f3d1161033657600080fd5b601d6102006102005101511061034b57600080fd5b6000506102208051602001806102608284600060045af161036b57600080fd5b5050610140516103005260406102c0526102c051610320526102608051602001806102c051610300018284600060045af16103a557600080fd5b50506102c05161030001518060206102c051610300010101818260206001820306601f820103905003368237505060206102c051610300015160206001820306601f82010390506102c05101016102c052610180517fa6fbd216b6734f34092f1be6b7247e1551a6d4f2d5000c53721cfdc119a5b7cf6102c051610300a261016051565b6000156106b2575b61018052610140526101605260026101405160e05260c052604060c020546101a05260006101a0511115610539576060610460600463258294106104005261041c610160515afa61048157600080fd5b603f3d1161048e57600080fd5b601d610460610460510151106104a357600080fd5b6000506104806020015160606103a0600463258294106103405261035c60036101405160e05260c052604060c0206101a0516001808210156104e457600080fd5b8082039050905060e05260c052604060c020545afa61050257600080fd5b603f3d1161050f57600080fd5b601d6103a06103a05101511061052457600080fd5b6000506103c0602001511861053857600080fd5b5b6101605160036101405160e05260c052604060c0206101a05160e05260c052604060c020556101a051600181818301101561057357600080fd5b8082019050905060026101405160e05260c052604060c020556060610220600463258294106101c0526101dc610160515afa6105ae57600080fd5b603f3d116105bb57600080fd5b601d610220610220510151106105d057600080fd5b6000506102408051602001806102808284600060045af16105f057600080fd5b5050610160516103205260406102e0526102e051610340526102808051602001806102e051610320018284600060045af161062a57600080fd5b50506102e05161032001518060206102e051610320010101818260206001820306601f820103905003368237505060206102e051610320015160206001820306601f82010390506102e05101016102e0526101a051610140517fce089905ba4a4d622553bcb5646fd23e895c256f0376eee04e99e61cec1dc7e86102e051610320a361018051565b6333990d4b60005114156107bb5760043560a01c156106d057600080fd5b60045433146106de57600080fd5b3360206101a06004635aa6e6756101405261015c6004355afa61070057600080fd5b601f3d1161070d57600080fd5b6000506101a0511461071e57600080fd5b6004356101405261014051600658016101ec565b60005060206101a0600463fc0c546a6101405261015c6004355afa61075657600080fd5b601f3d1161076357600080fd5b6000506101a0516101c0526101405161016051610180516101a0516101c0516101c0516101e05260043561020052610200516101e05160065801610431565b6101c0526101a052610180526101605261014052600050005b6000156109d7575b610200526101405261016052610180526101a0526101c0526101e052610220526000610300525b6102205160206001820306601f82010390506103005110151561080c57610825565b61030051610240015261030051602001610300526107ea565b6102a0526000610300525b6102a05160206001820306601f8201039050610300511015156108525761086b565b610300516102c001526103005160200161030052610830565b6000507f6033600c60003960336000f33660006000376110006000366000730000000000610340526c0100000000000000000000000060016000546001808210156108b557600080fd5b8082039050905060e05260c052604060c020540261035b527f5af4602c57600080fd5b6110006000f30000000000000000000000000000000061036f5260606103406000f08061090457600080fd5b61032052610320513b61091657600080fd5b6000600061016460c063a5b81fdf6103405261014051610360526101605161038052610180516103a052806103c0526102208080516020018084610360018284600060045af161096557600080fd5b50508051820160206001820306601f8201039050602001915050806103e0526102a08080516020018084610360018284600060045af16109a457600080fd5b5050506101a0516104005261035c90506000610320515af16109c557600080fd5b61032051600052600051610200515650005b63108ca11e6000511415610c115760043560a01c156109f557600080fd5b60243560a01c15610a0557600080fd5b60443560a01c15610a1557600080fd5b6060606435600401610140376040606435600401351115610a3557600080fd5b60406084356004016101c0376020608435600401351115610a5557600080fd5b6004543314610a6357600080fd5b6101405161016051610180516101a0516101c0516101e051610200516102205160c0600435610240523361026052604435610280526024356102a052806102c0526101408080516020018084610240018284600060045af1610ac457600080fd5b50508051820160206001820306601f8201039050602001915050806102e0526101c08080516020018084610240018284600060045af1610b0357600080fd5b505050506102e051806102400180518060206001820306601f820103905082016103e0525050505b6103006103e0511015610b3d57610b52565b6103e0515160206103e051036103e052610b2b565b6102e0516102c0516102a051610280516102605161024051600658016107c3565b6104005261022052610200526101e0526101c0526101a05261018052610160526101405261040051610220526101405161016051610180516101a0516101c0516101e0516102005161022051600435610240526102205161026052610260516102405160065801610431565b61022052610200526101e0526101c0526101a0526101805261016052610140526000506102205160005260206000f350005b635b73aa0d6000511415610f085760043560a01c15610c2f57600080fd5b60243560a01c15610c3f57600080fd5b60443560a01c15610c4f57600080fd5b60643560a01c15610c5f57600080fd5b6060608435600401610140376040608435600401351115610c7f57600080fd5b604060a4356004016101c037602060a435600401351115610c9f57600080fd5b6101405161016051610180516101a0516101c0516101e051610200516102205160c06004356102405260243561026052606435610280526044356102a052806102c0526101408080516020018084610240018284600060045af1610d0257600080fd5b50508051820160206001820306601f8201039050602001915050806102e0526101c08080516020018084610240018284600060045af1610d4157600080fd5b505050506102e051806102400180518060206001820306601f820103905082016103e0525050505b6103006103e0511015610d7b57610d90565b6103e0515160206103e051036103e052610d69565b6102e0516102c0516102a051610280516102605161024051600658016107c3565b6104005261022052610200526101e0526101c0526101a052610180526101605261014052610400516102205260606102a0600463258294106102405261025c610220515afa610dff57600080fd5b603f3d11610e0c57600080fd5b601d6102a06102a051015110610e2157600080fd5b6000506102c08051602001806103008284600060045af1610e4157600080fd5b5050610220516103a052604061036052610360516103c052610300805160200180610360516103a0018284600060045af1610e7b57600080fd5b5050610360516103a00151806020610360516103a0010101818260206001820306601f82010390500336823750506020610360516103a0015160206001820306601f820103905061036051010161036052336004357f57a9cdc2a05e05f66e76769bdbe88e21ec45d9ee0f97d4cb60395d4c75dcbcda610360516103a0a36102205160005260206000f350005b6329b2e0c660005114156110f65760043560a01c15610f2657600080fd5b6004543314610f3457600080fd5b3360206101a06004635aa6e6756101405261015c6004355afa610f5657600080fd5b601f3d11610f6357600080fd5b6000506101a05114610f7457600080fd5b6060610200600463258294106101a0526101bc6001600054600180821015610f9b57600080fd5b8082039050905060e05260c052604060c020545afa610fb957600080fd5b603f3d11610fc657600080fd5b601d61020061020051015110610fdb57600080fd5b6000506102208051602001806101408284600060045af1610ffb57600080fd5b50506101605160606102c0600463258294106102605261027c6004355afa61102257600080fd5b603f3d1161102f57600080fd5b601d6102c06102c05101511061104457600080fd5b6000506102e0602001511461105857600080fd5b6020610200600463fc0c546a6101a0526101bc6004355afa61107957600080fd5b601f3d1161108657600080fd5b60005061020051610220526101405161016051610180516101a0516101c0516101e0516102005161022051610220516102405260043561026052610260516102405160065801610431565b61022052610200526101e0526101c0526101a052610180526101605261014052600050005b632cad8f9f600051141561110f57600161014052611145565b635e05f6af600051141561113d5760243560011c1561112d57600080fd5b6020602461014037600050611145565b60001561117a575b60043560a01c1561115557600080fd5b600454331461116357600080fd5b61014051600760043560e05260c052604060c02055005b6360bd68f860005114156112f65760043560a01c1561119857600080fd5b60986024356004016101403760786024356004013511156111b857600080fd5b6004543318156111db5760073360e05260c052604060c020546111da57600080fd5b5b61014080600660043560e05260c052604060c02060c052602060c020602082510161012060006005818352015b8261012051602002111561121b5761123d565b61012051602002850151610120518501555b8151600101808352811415611208575b50505050505060043561024052604061020052610200516102605261014080516020018061020051610240018284600060045af161127a57600080fd5b505061020051610240015180602061020051610240010101818260206001820306601f8201039050033682375050602061020051610240015160206001820306601f8201039050610200510101610200527f07bd58794c2ca0ae152f7719eb5f02c654476de972cadec0e8191ae8be42096d61020051610240a1005b63a157190260005114156113125760005460005260206000f350005b63b6a9f40f600051141561133c57600160043560e05260c052604060c0205460005260206000f350005b63ba7ee48c60005114156113765760043560a01c1561135a57600080fd5b600260043560e05260c052604060c0205460005260206000f350005b637bbfc69e60005114156113be5760043560a01c1561139457600080fd5b600360043560e05260c052604060c02060243560e05260c052604060c0205460005260206000f350005b635aa6e67560005114156113da5760045460005260206000f350005b6358b8f84260005114156114a15760043560a01c156113f857600080fd5b600660043560e05260c052604060c0208060c052602060c020610180602082540161012060006005818352015b826101205160200211156114385761145a565b61012051850154610120516020028501525b8151600101808352811415611425575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f350005b63ee711ed560005114156114db5760043560a01c156114bf57600080fd5b600760043560e05260c052604060c0205460005260206000f350005b5b60006000fd5b6100086114ea036100086000396100086114ea036000f3
```