"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[7080],{54848:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>a,contentTitle:()=>i,default:()=>x,frontMatter:()=>r,metadata:()=>d,toc:()=>c});var s=l(74848),n=l(28453);const r={},i="Registry.vy",d={id:"smart-contracts/registry",title:"Registry.vy",description:"Functions",source:"@site/versioned_docs/version-0.3.4/smart-contracts/registry.md",sourceDirName:"smart-contracts",slug:"/smart-contracts/registry",permalink:"/vaults/0.3.4/smart-contracts/registry",draft:!1,unlisted:!1,editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/versioned_docs/version-0.3.4/smart-contracts/registry.md",tags:[],version:"0.3.4",frontMatter:{},sidebar:"mySidebar",previous:{title:"VaultAPI",permalink:"/vaults/0.3.4/smart-contracts/VaultAPI"},next:{title:"AffiliateToken",permalink:"/vaults/0.3.4/smart-contracts/test/AffiliateToken"}},a={},c=[{value:"Functions",id:"functions",level:2},{value:"setGovernance",id:"setgovernance",level:3},{value:"Parameters:",id:"parameters",level:4},{value:"acceptGovernance",id:"acceptgovernance",level:3},{value:"latestRelease",id:"latestrelease",level:3},{value:"Return Values:",id:"return-values",level:4},{value:"latestVault",id:"latestvault",level:3},{value:"Parameters:",id:"parameters-1",level:4},{value:"Return Values:",id:"return-values-1",level:4},{value:"newRelease",id:"newrelease",level:3},{value:"Parameters:",id:"parameters-2",level:4},{value:"newVault",id:"newvault",level:3},{value:"Parameters:",id:"parameters-3",level:4},{value:"Return Values:",id:"return-values-2",level:4},{value:"newVault",id:"newvault-1",level:3},{value:"Parameters:",id:"parameters-4",level:4},{value:"Return Values:",id:"return-values-3",level:4},{value:"newExperimentalVault",id:"newexperimentalvault",level:3},{value:"Parameters:",id:"parameters-5",level:4},{value:"Return Values:",id:"return-values-4",level:4},{value:"newExperimentalVault",id:"newexperimentalvault-1",level:3},{value:"Parameters:",id:"parameters-6",level:4},{value:"Return Values:",id:"return-values-5",level:4},{value:"endorseVault",id:"endorsevault",level:3},{value:"Parameters:",id:"parameters-7",level:4},{value:"endorseVault",id:"endorsevault-1",level:3},{value:"Parameters:",id:"parameters-8",level:4},{value:"setBanksy",id:"setbanksy",level:3},{value:"Parameters:",id:"parameters-9",level:4},{value:"setBanksy",id:"setbanksy-1",level:3},{value:"Parameters:",id:"parameters-10",level:4},{value:"tagVault",id:"tagvault",level:3},{value:"Parameters:",id:"parameters-11",level:4},{value:"Events",id:"events",level:2}];function h(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"registryvy",children:"Registry.vy"}),"\n",(0,s.jsx)(t.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(t.h3,{id:"setgovernance",children:"setGovernance"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setGovernance(address)\n"})}),"\n",(0,s.jsx)(t.p,{children:"Starts the 1st phase of the governance transfer."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Throws if the caller is not current governance."})}),"\n",(0,s.jsx)(t.h4,{id:"parameters",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* governance *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The next governance address *"})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"acceptgovernance",children:"acceptGovernance"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function acceptGovernance()\n"})}),"\n",(0,s.jsx)(t.p,{children:"Completes the 2nd phase of the governance transfer."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if the caller is not the pending caller. Emits a ",(0,s.jsx)(t.code,{children:"NewGovernance"})," event."]})}),"\n",(0,s.jsx)(t.h3,{id:"latestrelease",children:"latestRelease"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function latestRelease()\n"})}),"\n",(0,s.jsx)(t.p,{children:"Returns the api version of the latest release."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Throws if no releases are registered yet."})}),"\n",(0,s.jsx)(t.h4,{id:"return-values",children:"Return Values:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The api version of the latest release. *"})})})]}),"\n",(0,s.jsx)(t.h3,{id:"latestvault",children:"latestVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function latestVault(address)\n"})}),"\n",(0,s.jsx)(t.p,{children:"Returns the latest deployed vault for the given token."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Throws if no vaults are endorsed yet for the given token."})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-1",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* token *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The token address to find the latest vault for. *"})]})})]}),"\n",(0,s.jsx)(t.h4,{id:"return-values-1",children:"Return Values:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address of the latest vault for the given token. *"})})})]}),"\n",(0,s.jsx)(t.h3,{id:"newrelease",children:"newRelease"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function newRelease(address)\n"})}),"\n",(0,s.jsx)(t.p,{children:'Add a previously deployed Vault as the template contract for the latest release, to be used by further "forwarder-style" delegatecall proxy contracts that can be deployed from the registry throw other methods (to save gas).'}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if caller isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if ",(0,s.jsx)(t.code,{children:"vault"}),"'s governance isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if the api version is the same as the previous release. Emits a ",(0,s.jsx)(t.code,{children:"NewVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-2",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* vault *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The vault that will be used as the template contract for the next release. *"})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"newvault",children:"newVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function newVault(address,address,address,string,string)\n"})}),"\n",(0,s.jsx)(t.p,{children:'Create a new vault for the given token using the latest release in the registry, as a simple "forwarder-style" delegatecall proxy to the latest release. Also adds the new vault to the list of "endorsed" vaults for that token.'}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:[(0,s.jsx)(t.code,{children:"governance"})," is set in the new vault as ",(0,s.jsx)(t.code,{children:"self.governance"}),", with no ability to override. Throws if caller isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a ",(0,s.jsx)(t.code,{children:"NewVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-3",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* token *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The token that may be deposited into the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* guardian *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address authorized for guardian interactions in the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* rewards *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address to use for collecting rewards in the new Vault *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* name *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* symbol *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault symbol name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* releaseDelta *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify the number of releases prior to the latest to use as a target. Default is latest. *"})]})]})]}),"\n",(0,s.jsx)(t.h4,{id:"return-values-2",children:"Return Values:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address of the newly-deployed vault *"})})})]}),"\n",(0,s.jsx)(t.h3,{id:"newvault-1",children:"newVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function newVault(address,address,address,string,string,uint256)\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:[(0,s.jsx)(t.code,{children:"governance"})," is set in the new vault as ",(0,s.jsx)(t.code,{children:"self.governance"}),", with no ability to override. Throws if caller isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if no releases are registered yet. Throws if there already is a registered vault for the given token with the latest api version. Emits a ",(0,s.jsx)(t.code,{children:"NewVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-4",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* token *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The token that may be deposited into the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* guardian *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address authorized for guardian interactions in the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* rewards *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address to use for collecting rewards in the new Vault *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* name *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* symbol *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault symbol name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* releaseDelta *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify the number of releases prior to the latest to use as a target. Default is latest. *"})]})]})]}),"\n",(0,s.jsx)(t.h4,{id:"return-values-3",children:"Return Values:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address of the newly-deployed vault *"})})})]}),"\n",(0,s.jsx)(t.h3,{id:"newexperimentalvault",children:"newExperimentalVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function newExperimentalVault(address,address,address,address,string,string)\n"})}),"\n",(0,s.jsx)(t.p,{children:'Create a new vault for the given token using the latest release in the registry, as a simple "forwarder-style" delegatecall proxy to the latest release. Does not add the new vault to the list of "endorsed" vaults for that token.'}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if no releases are registered yet. Emits a ",(0,s.jsx)(t.code,{children:"NewExperimentalVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-5",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* token *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The token that may be deposited into the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* governance *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address authorized for governance interactions in the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* guardian *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address authorized for guardian interactions in the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* rewards *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address to use for collecting rewards in the new Vault *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* name *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* symbol *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault symbol name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* releaseDelta *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify the number of releases prior to the latest to use as a target. Default is latest. *"})]})]})]}),"\n",(0,s.jsx)(t.h4,{id:"return-values-4",children:"Return Values:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address of the newly-deployed vault *"})})})]}),"\n",(0,s.jsx)(t.h3,{id:"newexperimentalvault-1",children:"newExperimentalVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function newExperimentalVault(address,address,address,address,string,string,uint256)\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if no releases are registered yet. Emits a ",(0,s.jsx)(t.code,{children:"NewExperimentalVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-6",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* token *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The token that may be deposited into the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* governance *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address authorized for governance interactions in the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* guardian *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address authorized for guardian interactions in the new Vault. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* rewards *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address to use for collecting rewards in the new Vault *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* name *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* symbol *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify a custom Vault symbol name. Set to empty string for default choice. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* releaseDelta *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify the number of releases prior to the latest to use as a target. Default is latest. *"})]})]})]}),"\n",(0,s.jsx)(t.h4,{id:"return-values-5",children:"Return Values:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address of the newly-deployed vault *"})})})]}),"\n",(0,s.jsx)(t.h3,{id:"endorsevault",children:"endorseVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function endorseVault(address)\n"})}),"\n",(0,s.jsx)(t.p,{children:'Adds an existing vault to the list of "endorsed" vaults for that token.'}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:[(0,s.jsx)(t.code,{children:"governance"})," is set in the new vault as ",(0,s.jsx)(t.code,{children:"self.governance"}),", with no ability to override. Throws if caller isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if ",(0,s.jsx)(t.code,{children:"vault"}),"'s governance isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if no releases are registered yet. Throws if ",(0,s.jsx)(t.code,{children:"vault"}),"'s api version does not match latest release. Throws if there already is a deployment for the vault's token with the latest api version. Emits a ",(0,s.jsx)(t.code,{children:"NewVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-7",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* vault *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The vault that will be endorsed by the Registry. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* releaseDelta *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify the number of releases prior to the latest to use as a target. Default is latest. *"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"endorsevault-1",children:"endorseVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function endorseVault(address,uint256)\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:[(0,s.jsx)(t.code,{children:"governance"})," is set in the new vault as ",(0,s.jsx)(t.code,{children:"self.governance"}),", with no ability to override. Throws if caller isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if ",(0,s.jsx)(t.code,{children:"vault"}),"'s governance isn't ",(0,s.jsx)(t.code,{children:"self.governance"}),". Throws if no releases are registered yet. Throws if ",(0,s.jsx)(t.code,{children:"vault"}),"'s api version does not match latest release. Throws if there already is a deployment for the vault's token with the latest api version. Emits a ",(0,s.jsx)(t.code,{children:"NewVault"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-8",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* vault *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The vault that will be endorsed by the Registry. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* releaseDelta *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* Specify the number of releases prior to the latest to use as a target. Default is latest. *"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"setbanksy",children:"setBanksy"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setBanksy(address)\n"})}),"\n",(0,s.jsx)(t.p,{children:"Set the ability of a particular tagger to tag current vaults."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if caller is not ",(0,s.jsx)(t.code,{children:"self.governance"}),"."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-9",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* tagger *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address to approve or deny access to tagging. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* allowed *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["* Whether to approve or deny ",(0,s.jsx)(t.code,{children:"tagger"}),". Defaults to approve. *"]})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"setbanksy-1",children:"setBanksy"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setBanksy(address,bool)\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if caller is not ",(0,s.jsx)(t.code,{children:"self.governance"}),"."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-10",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* tagger *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* The address to approve or deny access to tagging. *"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* allowed *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["* Whether to approve or deny ",(0,s.jsx)(t.code,{children:"tagger"}),". Defaults to approve. *"]})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"tagvault",children:"tagVault"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function tagVault(address,string)\n"})}),"\n",(0,s.jsx)(t.p,{children:"Tag a Vault with a message."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Throws if caller is not ",(0,s.jsx)(t.code,{children:"self.governance"})," or an approved tagger. Emits a ",(0,s.jsx)(t.code,{children:"VaultTagged"})," event."]})}),"\n",(0,s.jsx)(t.h4,{id:"parameters-11",children:"Parameters:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* vault *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["* The address to tag with the given ",(0,s.jsx)(t.code,{children:"tag"})," message. *"]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"* tag *"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"*  *"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["* The message to tag ",(0,s.jsx)(t.code,{children:"vault"})," with. *"]})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"NewRelease"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"release_id"})," : uint256, ",(0,s.jsx)(t.em,{children:"indexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"template"})," : address, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"api_version"})," : string, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"NewVault"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"token"})," : address, ",(0,s.jsx)(t.em,{children:"indexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"vault_id"})," : uint256, ",(0,s.jsx)(t.em,{children:"indexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"vault"})," : address, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"api_version"})," : string, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"NewExperimentalVault"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"token"})," : address, ",(0,s.jsx)(t.em,{children:"indexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"deployer"})," : address, ",(0,s.jsx)(t.em,{children:"indexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"vault"})," : address, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"api_version"})," : string, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"NewGovernance"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"governance"})," : address, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"VaultTagged"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"vault"})," : address, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"tag"})," : string, ",(0,s.jsx)(t.em,{children:"notIndexed"})]}),"\n"]})]})}function x(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,t,l)=>{l.d(t,{R:()=>i,x:()=>d});var s=l(96540);const n={},r=s.createContext(n);function i(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);