# Registry.vy







## Functions



### setGovernance
```solidity
function setGovernance(address)
```


@notice Starts the 1st phase of the governance transfer.    


*Throws if the caller is not current governance.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * governance * |  *  * |  * The next governance address * |







### acceptGovernance
```solidity
function acceptGovernance()
```


@notice Completes the 2nd phase of the governance transfer.    


*Throws if the caller is not the pending caller. Emits a `NewGovernance` event.*







### latestRelease
```solidity
function latestRelease()
```


@notice Returns the api version of the latest release.    


*Throws if no releases are registered yet.*



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The api version of the latest release. * |






### latestVault
```solidity
function latestVault(address)
```


@notice Returns the latest deployed vault for the given token.    


*Throws if no vaults are endorsed yet for the given token.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token address to find the latest vault for. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The address of the latest vault for the given token. * |






### newRelease
```solidity
function newRelease(address)
```


@notice Add a previously deployed Vault as the template contract for the latest release, to be used by further &#34;forwarder-style&#34; delegatecall proxy contracts that can be deployed from the registry throw other methods (to save gas).    


*Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if the api version is the same as the previous release. Emits a `NewVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * vault * |  *  * |  * The vault that will be used as the template contract for the next release. * |







### newVault
```solidity
function newVault(address,address,address,string,string)
```


@notice Create a new vault for the given token using the latest release in the registry, as a simple &#34;forwarder-style&#34; delegatecall proxy to the latest release. Also adds the new vault to the list of &#34;endorsed&#34; vaults for that token.    


*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a `NewVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token that may be deposited into the new Vault. * |
|  * guardian * |  *  * |  * The address authorized for guardian interactions in the new Vault. * |
|  * rewards * |  *  * |  * The address to use for collecting rewards in the new Vault * |
|  * name * |  *  * |  * Specify a custom Vault name. Set to empty string for default choice. * |
|  * symbol * |  *  * |  * Specify a custom Vault symbol name. Set to empty string for default choice. * |
|  * releaseDelta * |  *  * |  * Specify the number of releases prior to the latest to use as a target. Default is latest. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The address of the newly-deployed vault * |






### newVault
```solidity
function newVault(address,address,address,string,string,uint256)
```



*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a `NewVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token that may be deposited into the new Vault. * |
|  * guardian * |  *  * |  * The address authorized for guardian interactions in the new Vault. * |
|  * rewards * |  *  * |  * The address to use for collecting rewards in the new Vault * |
|  * name * |  *  * |  * Specify a custom Vault name. Set to empty string for default choice. * |
|  * symbol * |  *  * |  * Specify a custom Vault symbol name. Set to empty string for default choice. * |
|  * releaseDelta * |  *  * |  * Specify the number of releases prior to the latest to use as a target. Default is latest. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The address of the newly-deployed vault * |






### newExperimentalVault
```solidity
function newExperimentalVault(address,address,address,address,string,string)
```


@notice Create a new vault for the given token using the latest release in the registry, as a simple &#34;forwarder-style&#34; delegatecall proxy to the latest release. Does not add the new vault to the list of &#34;endorsed&#34; vaults for that token.    


*Throws if no releases are registered yet. Emits a `NewExperimentalVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token that may be deposited into the new Vault. * |
|  * governance * |  *  * |  * The address authorized for governance interactions in the new Vault. * |
|  * guardian * |  *  * |  * The address authorized for guardian interactions in the new Vault. * |
|  * rewards * |  *  * |  * The address to use for collecting rewards in the new Vault * |
|  * name * |  *  * |  * Specify a custom Vault name. Set to empty string for default choice. * |
|  * symbol * |  *  * |  * Specify a custom Vault symbol name. Set to empty string for default choice. * |
|  * releaseDelta * |  *  * |  * Specify the number of releases prior to the latest to use as a target. Default is latest. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The address of the newly-deployed vault * |






### newExperimentalVault
```solidity
function newExperimentalVault(address,address,address,address,string,string,uint256)
```



*Throws if no releases are registered yet. Emits a `NewExperimentalVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token that may be deposited into the new Vault. * |
|  * governance * |  *  * |  * The address authorized for governance interactions in the new Vault. * |
|  * guardian * |  *  * |  * The address authorized for guardian interactions in the new Vault. * |
|  * rewards * |  *  * |  * The address to use for collecting rewards in the new Vault * |
|  * name * |  *  * |  * Specify a custom Vault name. Set to empty string for default choice. * |
|  * symbol * |  *  * |  * Specify a custom Vault symbol name. Set to empty string for default choice. * |
|  * releaseDelta * |  *  * |  * Specify the number of releases prior to the latest to use as a target. Default is latest. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The address of the newly-deployed vault * |






### endorseVault
```solidity
function endorseVault(address)
```


@notice Adds an existing vault to the list of &#34;endorsed&#34; vaults for that token.    


*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * vault * |  *  * |  * The vault that will be endorsed by the Registry. * |
|  * releaseDelta * |  *  * |  * Specify the number of releases prior to the latest to use as a target. Default is latest. * |







### endorseVault
```solidity
function endorseVault(address,uint256)
```



*`governance` is set in the new vault as `self.governance`, with no ability to override. Throws if caller isn&#39;t `self.governance`. Throws if `vault`&#39;s governance isn&#39;t `self.governance`. Throws if no releases are registered yet. Throws if `vault`&#39;s api version does not match latest release. Throws if there already is a deployment for the vault&#39;s token with the latest api version. Emits a `NewVault` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * vault * |  *  * |  * The vault that will be endorsed by the Registry. * |
|  * releaseDelta * |  *  * |  * Specify the number of releases prior to the latest to use as a target. Default is latest. * |







### setBanksy
```solidity
function setBanksy(address)
```


@notice Set the ability of a particular tagger to tag current vaults.    


*Throws if caller is not `self.governance`.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * tagger * |  *  * |  * The address to approve or deny access to tagging. * |
|  * allowed * |  *  * |  * Whether to approve or deny `tagger`. Defaults to approve. * |







### setBanksy
```solidity
function setBanksy(address,bool)
```



*Throws if caller is not `self.governance`.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * tagger * |  *  * |  * The address to approve or deny access to tagging. * |
|  * allowed * |  *  * |  * Whether to approve or deny `tagger`. Defaults to approve. * |







### tagVault
```solidity
function tagVault(address,string)
```


@notice Tag a Vault with a message.    


*Throws if caller is not `self.governance` or an approved tagger. Emits a `VaultTagged` event.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * vault * |  *  * |  * The address to tag with the given `tag` message. * |
|  * tag * |  *  * |  * The message to tag `vault` with. * |









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

