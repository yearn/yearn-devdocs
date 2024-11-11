"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[4147],{89636:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>i});var o=s(74848),t=s(28453);const r={},l="VaultFactory.vy",c={id:"smart-contracts/deprecated/V3/version-3.0.2/VaultFactory",title:"VaultFactory.vy",description:"Git Source",source:"@site/docs/developers/smart-contracts/deprecated/V3/version-3.0.2/VaultFactory.md",sourceDirName:"smart-contracts/deprecated/V3/version-3.0.2",slug:"/smart-contracts/deprecated/V3/version-3.0.2/VaultFactory",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/VaultFactory",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1731361534e3,frontMatter:{},sidebar:"developers",previous:{title:"TokenizedStrategy.sol",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/TokenizedStrategy"},next:{title:"VaultV3.vy",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/VaultV3"}},d={},i=[{value:"Events",id:"events",level:2},{value:"NewVault",id:"newvault",level:3},{value:"UpdateProtocolFeeBps",id:"updateprotocolfeebps",level:3},{value:"UpdateProtocolFeeRecipient",id:"updateprotocolfeerecipient",level:3},{value:"UpdateCustomProtocolFee",id:"updatecustomprotocolfee",level:3},{value:"RemovedCustomProtocolFee",id:"removedcustomprotocolfee",level:3},{value:"FactoryShutdown",id:"factoryshutdown",level:3},{value:"UpdateGovernance",id:"updategovernance",level:3},{value:"NewPendingGovernance",id:"newpendinggovernance",level:3},{value:"Methods",id:"methods",level:2},{value:"deploy_new_vault",id:"deploy_new_vault",level:3},{value:"vault_original",id:"vault_original",level:3},{value:"apiVersion",id:"apiversion",level:3},{value:"protocol_fee_config",id:"protocol_fee_config",level:3},{value:"set_protocol_fee_bps",id:"set_protocol_fee_bps",level:3},{value:"set_protocol_fee_recipient",id:"set_protocol_fee_recipient",level:3},{value:"set_custom_protocol_fee_bps",id:"set_custom_protocol_fee_bps",level:3},{value:"remove_custom_protocol_fee",id:"remove_custom_protocol_fee",level:3},{value:"shutdown_factory",id:"shutdown_factory",level:3},{value:"set_governance",id:"set_governance",level:3},{value:"accept_governance",id:"accept_governance",level:3}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"vaultfactoryvy",children:"VaultFactory.vy"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://github.com/yearn/yearn-vaults-v3/blob/v3.0.2-1/contracts/VaultFactory.vy",children:"Git Source"})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["vyper: ",(0,o.jsx)(n.code,{children:"0.3.7"}),"\nauthor: ",(0,o.jsx)(n.code,{children:"yearn.finance"}),"\nlicense: ",(0,o.jsx)(n.code,{children:"GNU AGPLv3"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Yearn Vault Factory"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.em,{children:["This vault Factory can be used by anyone wishing to deploy their own ERC4626 compliant Yearn V3 Vault of the same API version. The factory clones new vaults from its specific ",(0,o.jsx)(n.code,{children:"VAULT_ORIGINAL"})," immutable address set on creation of the factory. The deployments are done through create2 with a specific ",(0,o.jsx)(n.code,{children:"salt"})," that is derived from a combination of the deployer's address, the underlying asset used, as well as the name and symbol specified. Meaning a deployer will not be able to deploy the exact same vault twice and will need to use different name and or symbols for vaults that use the same other parameters such as ",(0,o.jsx)(n.code,{children:"asset"}),". The factory also holds the protocol fee configs for each vault and strategy of its specific ",(0,o.jsx)(n.code,{children:"API_VERSION"}),' that determine how much of the fees charged are designated "protocol fees" and sent to the designated ',(0,o.jsx)(n.code,{children:"fee_recipient"}),". The protocol fees work through a revenue share system, where if the vault or strategy decides to charge X amount of total fees during a ",(0,o.jsx)(n.code,{children:"report"})," the protocol fees are a percent of X. The protocol fees will be sent to the designated fee_recipient and then (X - protocol_fees) will be sent to the vault/strategy specific fee recipient."]})}),"\n",(0,o.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,o.jsx)(n.h3,{id:"newvault",children:"NewVault"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"vault_address"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"asset"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"updateprotocolfeebps",children:"UpdateProtocolFeeBps"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"old_fee_bps"})," : uint16, ",(0,o.jsx)(n.em,{children:"notIndexed"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"new_fee_bps"})," : uint16, ",(0,o.jsx)(n.em,{children:"notIndexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"updateprotocolfeerecipient",children:"UpdateProtocolFeeRecipient"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"old_fee_recipient"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"new_fee_recipient"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"updatecustomprotocolfee",children:"UpdateCustomProtocolFee"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"vault"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"new_custom_protocol_fee"})," : uint16, ",(0,o.jsx)(n.em,{children:"notIndexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"removedcustomprotocolfee",children:"RemovedCustomProtocolFee"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"vault"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"factoryshutdown",children:"FactoryShutdown"}),"\n",(0,o.jsx)(n.h3,{id:"updategovernance",children:"UpdateGovernance"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"governance"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"newpendinggovernance",children:"NewPendingGovernance"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"pending_governance"})," : address, ",(0,o.jsx)(n.em,{children:"indexed"})]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,o.jsx)(n.h3,{id:"deploy_new_vault",children:"deploy_new_vault"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Deploys a new clone of the original vault."}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"asset"}),":  - ",(0,o.jsx)(n.em,{children:"The asset to be used for the vault."})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"name"}),":  - ",(0,o.jsx)(n.em,{children:"The name of the new vault."})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"symbol"}),":  - ",(0,o.jsx)(n.em,{children:"The symbol of the new vault."})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"role_manager"}),":  - ",(0,o.jsx)(n.em,{children:"The address of the role manager."})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"profit_max_unlock_time"}),":  - ",(0,o.jsx)(n.em,{children:"The time over which the profits will unlock."})]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Returns:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"_0"})," - The address of the new vault."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"vault_original",children:"vault_original"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"view function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Get the address of the vault to clone from"}),"\n",(0,o.jsx)(n.p,{children:"Returns:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"_0"})," - The address of the original vault."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"apiversion",children:"apiVersion"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"view function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Get the API version of the factory."}),"\n",(0,o.jsx)(n.p,{children:"Returns:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"_0"})," - The API version of the factory."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"protocol_fee_config",children:"protocol_fee_config"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"view function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Called during vault and strategy reports to retrieve the protocol fee to charge and address to receive the fees."}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"vault"}),":  - ",(0,o.jsx)(n.em,{children:"Address of the vault that would be reporting."})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Returns:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"_0"})," - The protocol fee config for the msg sender."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"set_protocol_fee_bps",children:"set_protocol_fee_bps"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Set the protocol fee in basis points"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"Must be below the max allowed fee, and a default fee_recipient must be set so we don't issue fees to the 0 address."})}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"new_protocol_fee_bps"}),":  - ",(0,o.jsx)(n.em,{children:"The new protocol fee in basis points"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"set_protocol_fee_recipient",children:"set_protocol_fee_recipient"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Set the protocol fee recipient"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"Can never be set to 0 to avoid issuing fees to the 0 address."})}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"new_protocol_fee_recipient"}),":  - ",(0,o.jsx)(n.em,{children:"The new protocol fee recipient"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"set_custom_protocol_fee_bps",children:"set_custom_protocol_fee_bps"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Allows Governance to set custom protocol fees for a specific vault or strategy."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"Must be below the max allowed fee, and a default fee_recipient must be set so we don't issue fees to the 0 address."})}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"vault"}),":  - ",(0,o.jsx)(n.em,{children:"The address of the vault or strategy to customize."})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"new_custom_protocol_fee"}),":  - ",(0,o.jsx)(n.em,{children:"The custom protocol fee in BPS."})]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"remove_custom_protocol_fee",children:"remove_custom_protocol_fee"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Allows governance to remove a previously set custom protocol fee."}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"vault"}),":  - ",(0,o.jsx)(n.em,{children:"The address of the vault or strategy to remove the custom fee for."})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"shutdown_factory",children:"shutdown_factory"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"To stop new deployments through this factory."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"A one time switch available for governance to stop new vaults from being deployed through the factory. NOTE: This will have no effect on any previously deployed vaults that deployed from this factory."})}),"\n",(0,o.jsx)(n.h3,{id:"set_governance",children:"set_governance"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Set the governance address"}),"\n",(0,o.jsx)(n.p,{children:"Arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"new_governance"}),":  - ",(0,o.jsx)(n.em,{children:"The new governance address"})]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"accept_governance",children:"accept_governance"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["type: ",(0,o.jsx)(n.code,{children:"nonpayable function"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Accept the governance address"})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>c});var o=s(96540);const t={},r=o.createContext(t);function l(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);