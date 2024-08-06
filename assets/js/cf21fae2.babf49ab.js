"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[4209],{2209:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var r=i(74848),n=i(28453);const a={Status:"On Hold (No Active Development or R&D)"},o="StableCredit",s={id:"deprecated/stablecredit",title:"StableCredit",description:"StableCredit combines three pillars of existing DeFi infrastructure:",source:"@site/docs/resources/deprecated/stablecredit.md",sourceDirName:"deprecated",slug:"/deprecated/stablecredit",permalink:"/resources/deprecated/stablecredit",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1708445498e3,frontMatter:{Status:"On Hold (No Active Development or R&D)"},sidebar:"mySidebar",previous:{title:"Delegated Funding DAO Vaults",permalink:"/resources/deprecated/delegated-funding-dao-vaults"},next:{title:"veCRV Boosts",permalink:"/resources/deprecated/vecrv-boosts"}},l={},d=[{value:"Mechanics",id:"mechanics",level:2},{value:"Summary",id:"summary",level:2},{value:"Additional Learning Resources &amp; Background",id:"additional-learning-resources--background",level:2}];function c(e){const t={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"stablecredit",children:"StableCredit"}),"\n",(0,r.jsx)(t.p,{children:"StableCredit combines three pillars of existing DeFi infrastructure:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Minting synthetic debt (DAI, Synthetix)."}),"\n",(0,r.jsx)(t.li,{children:"Decentralized lending platform (Compound, AAVE)."}),"\n",(0,r.jsx)(t.li,{children:"Automated Market Maker (AMM) functionality (Uniswap, Sushiswap)."}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"mechanics",children:"Mechanics"}),"\n",(0,r.jsx)(t.p,{children:"StableCredit will enable users to deposit assets as collateral and obtain a line of credit (denominated in StableCredit USD) based on the dollar value of the assets at deposit. For example, a user can deposit 100 LINK and will obtain $1,100 worth of StableCredit USD (at the time of writing LINK is ~$11). StableCredit USD can then be traded for other assets available in the protocol."}),"\n",(0,r.jsx)(t.p,{children:"Exchange rates between StableCredit USD and assets in the protocol are determined by price feeds from oracles (Chainlink), and current utilization ratios of assets within the platform. For example, if liquidity providers have lent 100 DAI to the pool and 90 DAI is borrowed, the utilization ratio is 90%. Similar to how bonding curves work, there will then be a significant premium for any additional DAI borrowing (the cost to borrow DAI will be > $1). Users will be able to borrow up to 75% of the value of their collateral (i.e., utilization ratio of 75%)."}),"\n",(0,r.jsx)(t.p,{children:"The AMM will also support single-sided liquidity exposure for liquidity providers (LPs). Current popular AMM models, such as Uniswap and Sushiswap, require LPs to deposit both assets in a liquidity pool. For example, in a ETH-USDC liquidity pool, the liquidity provider would be required to deposit ETH and USDC in a 50/50 ratio. This increases the barrier to entry for liquidity providers and also the capital requirements. Single-sided liquidity provisioning will enable LPs to deposit only one of the assets in the liquidity pool (i.e., either ETH or USDC). As a result, the barriers of entry to be a LP will be greatly reduced, and should contribute to an overall increase in capital efficiency."}),"\n",(0,r.jsx)(t.h2,{id:"summary",children:"Summary"}),"\n",(0,r.jsx)(t.p,{children:"Users can:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Deposit collateral and obtain a line of credit (StableCredit USD)."}),"\n",(0,r.jsx)(t.li,{children:"Borrow other assets with this line of credit (similar to Aave or Compound)."}),"\n",(0,r.jsx)(t.li,{children:"Trade the asset borrowed for another asset in the pool (existing AMM functionality)."}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"additional-learning-resources--background",children:"Additional Learning Resources & Background"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://medium.com/iearn/introducing-stablecredit-a-new-protocol-for-decentralized-lending-stablecoins-and-amms-7252a43ee56",children:"Initial Medium Post introducing StableCredit"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/finematics/status/1305188626008100865",children:"Animation illustrating the mechanics of StableCredit"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.youtube.com/watch?v=SkTuMVBLBNQ",children:"Bankless video about StableCredit, featuring Andre Cronje"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.youtube.com/watch?v=bdC3rNDChbw&feature=youtu.be&t=2002",children:"CODEUP 38 video about StableCredit, featuring Andre Cronje"})}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>s});var r=i(96540);const n={},a=r.createContext(n);function o(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);