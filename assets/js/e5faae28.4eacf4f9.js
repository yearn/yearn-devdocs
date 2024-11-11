"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[230],{82028:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var s=t(74848),r=t(28453);const a={},i=void 0,l={id:"smart-contracts/deprecated/V2/version-0.3.2/StrategyAPI",title:"StrategyAPI",description:"This interface is here for the keeper bot to use.",source:"@site/docs/developers/smart-contracts/deprecated/V2/version-0.3.2/StrategyAPI.md",sourceDirName:"smart-contracts/deprecated/V2/version-0.3.2",slug:"/smart-contracts/deprecated/V2/version-0.3.2/StrategyAPI",permalink:"/developers/smart-contracts/deprecated/V2/version-0.3.2/StrategyAPI",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1731361534e3,frontMatter:{},sidebar:"developers",previous:{title:"BaseStrategyInitializable",permalink:"/developers/smart-contracts/deprecated/V2/version-0.3.2/BaseStrategyInitializable"},next:{title:"VaultAPI",permalink:"/developers/smart-contracts/deprecated/V2/version-0.3.2/VaultAPI"}},d={},c=[{value:"Functions",id:"functions",level:2},{value:"name",id:"name",level:3},{value:"vault",id:"vault",level:3},{value:"want",id:"want",level:3},{value:"apiVersion",id:"apiversion",level:3},{value:"keeper",id:"keeper",level:3},{value:"isActive",id:"isactive",level:3},{value:"delegatedAssets",id:"delegatedassets",level:3},{value:"estimatedTotalAssets",id:"estimatedtotalassets",level:3},{value:"tendTrigger",id:"tendtrigger",level:3},{value:"tend",id:"tend",level:3},{value:"harvestTrigger",id:"harvesttrigger",level:3},{value:"harvest",id:"harvest",level:3},{value:"Events",id:"events",level:2},{value:"Harvested",id:"harvested",level:3}];function o(e){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"This interface is here for the keeper bot to use."}),"\n",(0,s.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(n.h3,{id:"name",children:"name"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function name(\n  ) external returns (string)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"vault",children:"vault"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function vault(\n  ) external returns (address)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"want",children:"want"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function want(\n  ) external returns (address)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"apiversion",children:"apiVersion"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function apiVersion(\n  ) external returns (string)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"keeper",children:"keeper"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function keeper(\n  ) external returns (address)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"isactive",children:"isActive"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function isActive(\n  ) external returns (bool)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"delegatedassets",children:"delegatedAssets"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function delegatedAssets(\n  ) external returns (uint256)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"estimatedtotalassets",children:"estimatedTotalAssets"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function estimatedTotalAssets(\n  ) external returns (uint256)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"tendtrigger",children:"tendTrigger"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function tendTrigger(\n  ) external returns (bool)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"tend",children:"tend"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function tend(\n  ) external\n"})}),"\n",(0,s.jsx)(n.h3,{id:"harvesttrigger",children:"harvestTrigger"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function harvestTrigger(\n  ) external returns (bool)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"harvest",children:"harvest"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  function harvest(\n  ) external\n"})}),"\n",(0,s.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(n.h3,{id:"harvested",children:"Harvested"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-solidity",children:"  event Harvested(\n  )\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var s=t(96540);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);