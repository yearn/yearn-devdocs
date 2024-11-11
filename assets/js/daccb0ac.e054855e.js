"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[9190],{31604:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var s=a(74848),i=a(28453);const t={},r="Yearn Stack + FE Features",l={id:"smart-contracts/deprecated/V2/version-0.4.5/yearn-sdk/yearn-stack",title:"Yearn Stack + FE Features",description:"Yearn SDK integrates several components, both on-chain and off-chain.",source:"@site/docs/developers/smart-contracts/deprecated/V2/version-0.4.5/yearn-sdk/yearn-stack.md",sourceDirName:"smart-contracts/deprecated/V2/version-0.4.5/yearn-sdk",slug:"/smart-contracts/deprecated/V2/version-0.4.5/yearn-sdk/yearn-stack",permalink:"/developers/smart-contracts/deprecated/V2/version-0.4.5/yearn-sdk/yearn-stack",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1731361534e3,frontMatter:{},sidebar:"developers",previous:{title:"Yearn Lens",permalink:"/developers/smart-contracts/deprecated/V2/version-0.4.5/yearn-lens/"},next:{title:"BaseStrategy.sol",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/BaseStrategy"}},d={},c=[{value:"Backend stack",id:"backend-stack",level:2},{value:"On Chain",id:"on-chain",level:3},{value:"On IPFS",id:"on-ipfs",level:3},{value:"Off Chain",id:"off-chain",level:3},{value:"Backend features",id:"backend-features",level:2},{value:"Resilience powered by on-chain data and IPFS storage",id:"resilience-powered-by-on-chain-data-and-ipfs-storage",level:3},{value:"On-chain assets and positions",id:"on-chain-assets-and-positions",level:4},{value:"IPFS CI/CD for frontend and metadata",id:"ipfs-cicd-for-frontend-and-metadata",level:4},{value:"Historical APY and TVL",id:"historical-apy-and-tvl",level:3},{value:"SDK, aggregator of many datasources",id:"sdk-aggregator-of-many-datasources",level:3},{value:"Historical User Earnings",id:"historical-user-earnings",level:3},{value:"Metadata",id:"metadata",level:3},{value:"Strategy descriptions",id:"strategy-descriptions",level:4},{value:"Assets management",id:"assets-management",level:4},{value:"Front End stack",id:"front-end-stack",level:3},{value:"Front End Features",id:"front-end-features",level:3}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"yearn-stack--fe-features",children:"Yearn Stack + FE Features"})}),"\n",(0,s.jsx)(n.p,{children:"Yearn SDK integrates several components, both on-chain and off-chain."}),"\n",(0,s.jsx)(n.h2,{id:"backend-stack",children:"Backend stack"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("img",{src:"https://i.imgur.com/BTuanfX.png",alt:"Backend Chart"})}),"\n",(0,s.jsx)(n.h3,{id:"on-chain",children:"On Chain"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\ud83d\udd0d Yearn Lens","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Oracle"}),"\n",(0,s.jsx)(n.li,{children:"Helpers"}),"\n",(0,s.jsxs)(n.li,{children:["Adapters","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Vaults V1"}),"\n",(0,s.jsx)(n.li,{children:"Vaults V2"}),"\n",(0,s.jsx)(n.li,{children:"Iron Bank"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"on-ipfs",children:"On IPFS"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("img",{src:"https://i.imgur.com/VkmnkfX.png",alt:"IPFS Metadata"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Yearn Metadata is a lightweight storage for all the stuff that would have been hardcoded in v2 frontend, including but not limited to:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"custom messages for deposits / withdrawals"}),"\n",(0,s.jsx)(n.li,{children:"custom copywriting for special assets"}),"\n",(0,s.jsx)(n.li,{children:"strategy descriptions / diagrams"}),"\n",(0,s.jsx)(n.li,{children:"disabling asset interactions"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Yearn Frontend"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"off-chain",children:"Off Chain"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Yearn Exporter: stores (and displays) stats about yearn assets, exposing:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"historical TVL"}),"\n",(0,s.jsx)(n.li,{children:"historical APY"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Yearn Subgraph: stores all historical data for users"}),"\n",(0,s.jsx)(n.li,{children:"Zapper Integration"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"backend-features",children:"Backend features"}),"\n",(0,s.jsx)(n.h3,{id:"resilience-powered-by-on-chain-data-and-ipfs-storage",children:"Resilience powered by on-chain data and IPFS storage"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Critical data (assets, positions, vault deprecations) will be fetched exclusively from the chain / IPFS","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"maximizing uptime"}),"\n",(0,s.jsx)(n.li,{children:"reducing reliance on other services"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Historical TVL, historical APY and other non critical data will be stored off chain and fetched dinamically."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"on-chain-assets-and-positions",children:"On-chain assets and positions"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Lens does what the old off-chain API does, but directly on-chain. This will speed up the fetching time and greatly reduce our reliance on scheduled jobs in servers."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"ipfs-cicd-for-frontend-and-metadata",children:"IPFS CI/CD for frontend and metadata"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Frontend and hardcoded values will be stored in IPFS utilizing a similar system to the one ",(0,s.jsx)(n.a,{href:"https://uniswap.org/blog/ipfs-uniswap-interface/",children:"introduced"})," by Uniswap."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"historical-apy-and-tvl",children:"Historical APY and TVL"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Yearn Exporter provides a simple backend solution for storing real-time stats from yearn products."}),"\n",(0,s.jsx)(n.li,{children:"Metrics are stored in a timeseries database and will be exposed by an api, accessible by SDK and third-party."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"sdk-aggregator-of-many-datasources",children:"SDK, aggregator of many datasources"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"SDK will provide a simple interface for all integrators, including ourselves."}),"\n",(0,s.jsx)(n.li,{children:"Read methods will seamlessly integrate with all datasources, while keeping coherent datastructures."}),"\n",(0,s.jsx)(n.li,{children:"Write methods talk directly to assets on chain. Execution of write transactions will trigger refresh events so data freshness of frontend (or other integration platforms) will still be preserved."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"historical-user-earnings",children:"Historical User Earnings"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Yearn Subgraph leverages thegraph to store historical user data that can be aggregated to display historical earnings."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"metadata",children:"Metadata"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"New way to store all the information that would generally be hard coded directly in the frontend."}),"\n",(0,s.jsx)(n.li,{children:"Data is now encoded in predefined schemas that are checked at every change."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"strategy-descriptions",children:"Strategy descriptions"}),"\n",(0,s.jsx)(n.p,{children:"We can store Strategy information directly on IPFS so they can be then be queried and rendered the frontend."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "$schema":"strategy",\n  "name":"Idle Finance Reinvest",\n  "description":"Supplies {{token}} to [Idle Finance](https://idle.finance) to earn IDLE and COMP. Earned tokens are harvested, sold for more {{token}} which is deposited back into the strategy.",\n  "protocols":["IdleFinance"]\n}\n'})}),"\n",(0,s.jsx)(n.h4,{id:"assets-management",children:"Assets management"}),"\n",(0,s.jsx)(n.p,{children:"We can store Asset informations so in critical situations we can toggle interactions and add custom messages."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "$schema": "vault",\n  "comment": "Curve EURS",\n  "hideAlways": false,\n  "depositsDisabled": false,\n  "withdrawalsDisabled": false,\n  "order": 18,\n  "migrationAvailable": false,\n  "allowZapIn": true,\n  "allowZapOut": true,\n  "retired": false,\n  "displayName": "Curve EURS"\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"front-end-stack",children:"Front End stack"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("img",{src:"https://i.imgur.com/H5XqpZI.png",alt:"Backend Chart"})}),"\n",(0,s.jsx)(n.h3,{id:"front-end-features",children:"Front End Features"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("img",{src:"https://i.imgur.com/LfJmzkK.png",alt:"Frontend Chart"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,n,a)=>{a.d(n,{R:()=>r,x:()=>l});var s=a(96540);const i={},t=s.createContext(i);function r(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);