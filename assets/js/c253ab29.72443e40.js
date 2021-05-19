(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{225:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return i})),a.d(t,"default",(function(){return d}));var n=a(3),r=a(7),b=(a(0),a(261)),l={},c={unversionedId:"smart-contracts/registry",id:"version-0.4.0/smart-contracts/registry",isDocsHomePage:!1,title:"Registry.vy",description:"Functions",source:"@site/versioned_docs/version-0.4.0/smart-contracts/registry.md",sourceDirName:"smart-contracts",slug:"/smart-contracts/registry",permalink:"/yearn-devdocs/v2/smart-contracts/registry",editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/versioned_docs/version-0.4.0/smart-contracts/registry.md",version:"0.4.0",frontMatter:{},sidebar:"version-0.4.0/mySidebar",previous:{title:"VaultAPI",permalink:"/yearn-devdocs/v2/smart-contracts/VaultAPI"},next:{title:"BaseStrategy",permalink:"/yearn-devdocs/v2/smart-contracts/smart-contracts/BaseStrategy"}},i=[{value:"setGovernance",id:"setgovernance",children:[]},{value:"acceptGovernance",id:"acceptgovernance",children:[]},{value:"latestRelease",id:"latestrelease",children:[]},{value:"latestVault",id:"latestvault",children:[]},{value:"newRelease",id:"newrelease",children:[]},{value:"newVault",id:"newvault",children:[]},{value:"newVault",id:"newvault-1",children:[]},{value:"newExperimentalVault",id:"newexperimentalvault",children:[]},{value:"newExperimentalVault",id:"newexperimentalvault-1",children:[]},{value:"endorseVault",id:"endorsevault",children:[]},{value:"endorseVault",id:"endorsevault-1",children:[]},{value:"setBanksy",id:"setbanksy",children:[]},{value:"setBanksy",id:"setbanksy-1",children:[]},{value:"tagVault",id:"tagvault",children:[]},{value:"Events",id:"events",children:[]}],m={toc:i};function d(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},m,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Functions"),Object(b.b)("h3",{id:"setgovernance"},"setGovernance"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function setGovernance(address)\n")),Object(b.b)("p",null,"@notice Starts the 1st phase of the governance transfer.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if the caller is not current governance.")),Object(b.b)("h4",{id:"parameters"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," governance ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The next governance address "))))),Object(b.b)("h3",{id:"acceptgovernance"},"acceptGovernance"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function acceptGovernance()\n")),Object(b.b)("p",null,"@notice Completes the 2nd phase of the governance transfer.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if the caller is not the pending caller. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewGovernance")," event.")),Object(b.b)("h3",{id:"latestrelease"},"latestRelease"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function latestRelease()\n")),Object(b.b)("p",null,"@notice Returns the api version of the latest release.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if no releases are registered yet.")),Object(b.b)("h4",{id:"return-values"},"Return Values:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The api version of the latest release. "))))),Object(b.b)("h3",{id:"latestvault"},"latestVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function latestVault(address)\n")),Object(b.b)("p",null,"@notice Returns the latest deployed vault for the given token.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if no vaults are endorsed yet for the given token.")),Object(b.b)("h4",{id:"parameters-1"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," token ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The token address to find the latest vault for. "))))),Object(b.b)("h4",{id:"return-values-1"},"Return Values:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address of the latest vault for the given token. "))))),Object(b.b)("h3",{id:"newrelease"},"newRelease"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function newRelease(address)\n")),Object(b.b)("p",null,"@notice Add a previously deployed Vault as the template contract for the latest release, to be used by further ",'"',"forwarder-style",'"'," delegatecall proxy contracts that can be deployed from the registry throw other methods (to save gas).    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if caller isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if ",Object(b.b)("inlineCode",{parentName:"em"},"vault"),"'","s governance isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if the api version is the same as the previous release. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewVault")," event.")),Object(b.b)("h4",{id:"parameters-2"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," vault ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The vault that will be used as the template contract for the next release. "))))),Object(b.b)("h3",{id:"newvault"},"newVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function newVault(address,address,address,string,string)\n")),Object(b.b)("p",null,"@notice Create a new vault for the given token using the latest release in the registry, as a simple ",'"',"forwarder-style",'"'," delegatecall proxy to the latest release. Also adds the new vault to the list of ",'"',"endorsed",'"'," vaults for that token.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},Object(b.b)("inlineCode",{parentName:"em"},"governance")," is set in the new vault as ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),", with no ability to override. Throws if caller isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewVault")," event.")),Object(b.b)("h4",{id:"parameters-3"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," token ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The token that may be deposited into the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," guardian ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address authorized for guardian interactions in the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," rewards ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to use for collecting rewards in the new Vault "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," name ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," symbol ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault symbol name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," releaseDelta ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify the number of releases prior to the latest to use as a target. Default is latest. "))))),Object(b.b)("h4",{id:"return-values-2"},"Return Values:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address of the newly-deployed vault "))))),Object(b.b)("h3",{id:"newvault-1"},"newVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function newVault(address,address,address,string,string,uint256)\n")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},Object(b.b)("inlineCode",{parentName:"em"},"governance")," is set in the new vault as ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),", with no ability to override. Throws if caller isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewVault")," event.")),Object(b.b)("h4",{id:"parameters-4"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," token ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The token that may be deposited into the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," guardian ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address authorized for guardian interactions in the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," rewards ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to use for collecting rewards in the new Vault "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," name ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," symbol ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault symbol name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," releaseDelta ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify the number of releases prior to the latest to use as a target. Default is latest. "))))),Object(b.b)("h4",{id:"return-values-3"},"Return Values:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address of the newly-deployed vault "))))),Object(b.b)("h3",{id:"newexperimentalvault"},"newExperimentalVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function newExperimentalVault(address,address,address,address,string,string)\n")),Object(b.b)("p",null,"@notice Create a new vault for the given token using the latest release in the registry, as a simple ",'"',"forwarder-style",'"'," delegatecall proxy to the latest release. Does not add the new vault to the list of ",'"',"endorsed",'"'," vaults for that token.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if no releases are registered yet. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewExperimentalVault")," event.")),Object(b.b)("h4",{id:"parameters-5"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," token ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The token that may be deposited into the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," governance ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address authorized for governance interactions in the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," guardian ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address authorized for guardian interactions in the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," rewards ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to use for collecting rewards in the new Vault "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," name ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," symbol ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault symbol name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," releaseDelta ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify the number of releases prior to the latest to use as a target. Default is latest. "))))),Object(b.b)("h4",{id:"return-values-4"},"Return Values:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address of the newly-deployed vault "))))),Object(b.b)("h3",{id:"newexperimentalvault-1"},"newExperimentalVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function newExperimentalVault(address,address,address,address,string,string,uint256)\n")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if no releases are registered yet. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewExperimentalVault")," event.")),Object(b.b)("h4",{id:"parameters-6"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," token ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The token that may be deposited into the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," governance ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address authorized for governance interactions in the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," guardian ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address authorized for guardian interactions in the new Vault. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," rewards ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to use for collecting rewards in the new Vault "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," name ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," symbol ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify a custom Vault symbol name. Set to empty string for default choice. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," releaseDelta ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify the number of releases prior to the latest to use as a target. Default is latest. "))))),Object(b.b)("h4",{id:"return-values-5"},"Return Values:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address of the newly-deployed vault "))))),Object(b.b)("h3",{id:"endorsevault"},"endorseVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function endorseVault(address)\n")),Object(b.b)("p",null,"@notice Adds an existing vault to the list of ",'"',"endorsed",'"'," vaults for that token.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},Object(b.b)("inlineCode",{parentName:"em"},"governance")," is set in the new vault as ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),", with no ability to override. Throws if caller isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if ",Object(b.b)("inlineCode",{parentName:"em"},"vault"),"'","s governance isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if no releases are registered yet. Throws if ",Object(b.b)("inlineCode",{parentName:"em"},"vault"),"'","s api version does not match latest release. Throws if there already is a deployment for the vault","'","s token with the latest api version. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewVault")," event.")),Object(b.b)("h4",{id:"parameters-7"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," vault ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The vault that will be endorsed by the Registry. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," releaseDelta ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify the number of releases prior to the latest to use as a target. Default is latest. "))))),Object(b.b)("h3",{id:"endorsevault-1"},"endorseVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function endorseVault(address,uint256)\n")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},Object(b.b)("inlineCode",{parentName:"em"},"governance")," is set in the new vault as ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),", with no ability to override. Throws if caller isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if ",Object(b.b)("inlineCode",{parentName:"em"},"vault"),"'","s governance isn","'","t ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),". Throws if no releases are registered yet. Throws if ",Object(b.b)("inlineCode",{parentName:"em"},"vault"),"'","s api version does not match latest release. Throws if there already is a deployment for the vault","'","s token with the latest api version. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"NewVault")," event.")),Object(b.b)("h4",{id:"parameters-8"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," vault ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The vault that will be endorsed by the Registry. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," releaseDelta ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Specify the number of releases prior to the latest to use as a target. Default is latest. "))))),Object(b.b)("h3",{id:"setbanksy"},"setBanksy"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function setBanksy(address)\n")),Object(b.b)("p",null,"@notice Set the ability of a particular tagger to tag current vaults.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if caller is not ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),".")),Object(b.b)("h4",{id:"parameters-9"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," tagger ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to approve or deny access to tagging. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," allowed ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Whether to approve or deny ",Object(b.b)("inlineCode",{parentName:"em"},"tagger"),". Defaults to approve. "))))),Object(b.b)("h3",{id:"setbanksy-1"},"setBanksy"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function setBanksy(address,bool)\n")),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if caller is not ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance"),".")),Object(b.b)("h4",{id:"parameters-10"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," tagger ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to approve or deny access to tagging. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," allowed ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," Whether to approve or deny ",Object(b.b)("inlineCode",{parentName:"em"},"tagger"),". Defaults to approve. "))))),Object(b.b)("h3",{id:"tagvault"},"tagVault"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-solidity"},"function tagVault(address,string)\n")),Object(b.b)("p",null,"@notice Tag a Vault with a message.    "),Object(b.b)("p",null,Object(b.b)("em",{parentName:"p"},"Throws if caller is not ",Object(b.b)("inlineCode",{parentName:"em"},"self.governance")," or an approved tagger. Emits a ",Object(b.b)("inlineCode",{parentName:"em"},"VaultTagged")," event.")),Object(b.b)("h4",{id:"parameters-11"},"Parameters:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:"left"},"Name"),Object(b.b)("th",{parentName:"tr",align:"left"},"Type"),Object(b.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," vault ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The address to tag with the given ",Object(b.b)("inlineCode",{parentName:"em"},"tag")," message. "))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," tag ")),Object(b.b)("td",{parentName:"tr",align:"left"},"*  *"),Object(b.b)("td",{parentName:"tr",align:"left"},Object(b.b)("em",{parentName:"td"}," The message to tag ",Object(b.b)("inlineCode",{parentName:"em"},"vault")," with. "))))),Object(b.b)("h2",{id:"events"},"Events"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"NewRelease")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"release_id")," : uint256, ",Object(b.b)("em",{parentName:"li"},"indexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"template")," : address, ",Object(b.b)("em",{parentName:"li"},"notIndexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"api_version")," : string, ",Object(b.b)("em",{parentName:"li"},"notIndexed"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"NewVault")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"token")," : address, ",Object(b.b)("em",{parentName:"li"},"indexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"vault_id")," : uint256, ",Object(b.b)("em",{parentName:"li"},"indexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"vault")," : address, ",Object(b.b)("em",{parentName:"li"},"notIndexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"api_version")," : string, ",Object(b.b)("em",{parentName:"li"},"notIndexed"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"NewExperimentalVault")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"token")," : address, ",Object(b.b)("em",{parentName:"li"},"indexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"deployer")," : address, ",Object(b.b)("em",{parentName:"li"},"indexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"vault")," : address, ",Object(b.b)("em",{parentName:"li"},"notIndexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"api_version")," : string, ",Object(b.b)("em",{parentName:"li"},"notIndexed"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"NewGovernance")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"governance")," : address, ",Object(b.b)("em",{parentName:"li"},"notIndexed"))),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"VaultTagged")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"vault")," : address, ",Object(b.b)("em",{parentName:"li"},"notIndexed")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"tag")," : string, ",Object(b.b)("em",{parentName:"li"},"notIndexed"))))}d.isMDXComponent=!0},261:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return O}));var n=a(0),r=a.n(n);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},b=Object.keys(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(n=0;n<b.length;n++)a=b[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var m=r.a.createContext({}),d=function(e){var t=r.a.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=d(e.components);return r.a.createElement(m.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},o=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,b=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),p=d(a),o=n,O=p["".concat(l,".").concat(o)]||p[o]||s[o]||b;return a?r.a.createElement(O,c(c({ref:t},m),{},{components:a})):r.a.createElement(O,c({ref:t},m))}));function O(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var b=a.length,l=new Array(b);l[0]=o;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var m=2;m<b;m++)l[m]=a[m];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,a)}o.displayName="MDXCreateElement"}}]);