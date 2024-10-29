"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[5352],{30171:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>c,metadata:()=>o,toc:()=>i});var s=r(74848),t=r(28453);const c={},a="Governance.sol",o={id:"smart-contracts/V3/deprecated/version-3.0.2/periphery/Governance",title:"Governance.sol",description:"Git Source",source:"@site/docs/developers/smart-contracts/V3/deprecated/version-3.0.2/periphery/Governance.md",sourceDirName:"smart-contracts/V3/deprecated/version-3.0.2/periphery",slug:"/smart-contracts/V3/deprecated/version-3.0.2/periphery/Governance",permalink:"/developers/smart-contracts/V3/deprecated/version-3.0.2/periphery/Governance",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1730237247e3,frontMatter:{},sidebar:"developers",previous:{title:"DebtAllocator.sol",permalink:"/developers/smart-contracts/V3/deprecated/version-3.0.2/periphery/DebtAllocator"},next:{title:"Governance2Step.sol",permalink:"/developers/smart-contracts/V3/deprecated/version-3.0.2/periphery/Governance2Step"}},d={},i=[{value:"State Variables",id:"state-variables",level:2},{value:"governance",id:"governance",level:3},{value:"Functions",id:"functions",level:2},{value:"onlyGovernance",id:"onlygovernance",level:3},{value:"_checkGovernance",id:"_checkgovernance",level:3},{value:"constructor",id:"constructor",level:3},{value:"transferGovernance",id:"transfergovernance",level:3},{value:"Events",id:"events",level:2},{value:"GovernanceTransferred",id:"governancetransferred",level:3}];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"governancesol",children:"Governance.sol"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/utils/Governance.sol",children:"Git Source"})}),"\n",(0,s.jsx)(n.h2,{id:"state-variables",children:"State Variables"}),"\n",(0,s.jsx)(n.h3,{id:"governance",children:"governance"}),"\n",(0,s.jsx)(n.p,{children:"Address that owns the smart contract."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"address public governance;\n"})}),"\n",(0,s.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(n.h3,{id:"onlygovernance",children:"onlyGovernance"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"modifier onlyGovernance();\n"})}),"\n",(0,s.jsx)(n.h3,{id:"_checkgovernance",children:"_checkGovernance"}),"\n",(0,s.jsx)(n.p,{children:"Checks if the msg sender is the governance."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"function _checkGovernance() internal view virtual;\n"})}),"\n",(0,s.jsx)(n.h3,{id:"constructor",children:"constructor"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"constructor(address _governance);\n"})}),"\n",(0,s.jsx)(n.h3,{id:"transfergovernance",children:"transferGovernance"}),"\n",(0,s.jsx)(n.p,{children:"Sets a new address as the governance of the contract."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"Throws if the caller is not current governance."})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"function transferGovernance(address _newGovernance) external virtual onlyGovernance;\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Name"}),(0,s.jsx)(n.th,{children:"Type"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"_newGovernance"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"address"})}),(0,s.jsx)(n.td,{children:"The new governance address."})]})})]}),"\n",(0,s.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(n.h3,{id:"governancetransferred",children:"GovernanceTransferred"}),"\n",(0,s.jsx)(n.p,{children:"Emitted when the governance address is updated."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"event GovernanceTransferred(address indexed previousGovernance, address indexed newGovernance);\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>o});var s=r(96540);const t={},c=s.createContext(t);function a(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);