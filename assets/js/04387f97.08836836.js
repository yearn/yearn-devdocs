"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[7393],{90569:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>a});var n=t(74848),r=t(28453);const s={},d="Strategy Risks",l={id:"security/risks/strategy-risks",title:"Strategy Risks",description:"Yearn earns income from lending, liquidity mining and trading fees. This income is often increased using leverage.",source:"@site/docs/developers/security/risks/strategy-risks.md",sourceDirName:"security/risks",slug:"/security/risks/strategy-risks",permalink:"/developers/security/risks/strategy-risks",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1724183848e3,frontMatter:{},sidebar:"developers",previous:{title:"Protocol Risks",permalink:"/developers/security/risks/protocol-risks"},next:{title:"Vault Risks",permalink:"/developers/security/risks/vault-risks"}},c={},a=[{value:"Lending",id:"lending",level:2},{value:"Liquidity Mining",id:"liquidity-mining",level:2},{value:"Trading Fees",id:"trading-fees",level:2},{value:"Leverage",id:"leverage",level:2}];function o(e){const i={a:"a",h1:"h1",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h1,{id:"strategy-risks",children:"Strategy Risks"}),"\n",(0,n.jsx)(i.p,{children:"Yearn earns income from lending, liquidity mining and trading fees. This income is often increased using leverage."}),"\n",(0,n.jsx)(i.h2,{id:"lending",children:"Lending"}),"\n",(0,n.jsx)(i.p,{children:"Collateralized lending is when an asset is lent in return for a yield paid by the borrower. The borrower has to lock up a greater amount of collateral than the value of the loan to incentivize the repayment of the loan."}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:"Risk"}),(0,n.jsx)(i.th,{children:"Description"})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Governance"}),(0,n.jsx)(i.td,{children:"Admin key holders change lending protocol adversely, e.g. change the interest rate model in such a way that discourages borrowing"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Technological"}),(0,n.jsx)(i.td,{children:"Smart contract risk of interacting with lending protocols"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Market"}),(0,n.jsx)(i.td,{children:"Low demand for borrowing the asset causes low lending yields"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{}),(0,n.jsx)(i.td,{children:"Collateral price falls causing the lending protocol to become undercollateralized"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{}),(0,n.jsx)(i.td,{children:"Lent assets become unavailable to withdraw because the utilization ratio becomes too high"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Operational"}),(0,n.jsx)(i.td,{children:"Delays or inability to withdraw assets from the lending protocol in an emergency"})]})]})]}),"\n",(0,n.jsx)(i.h2,{id:"liquidity-mining",children:"Liquidity Mining"}),"\n",(0,n.jsx)(i.p,{children:"Liquidity mining involves interacting with a protocol to earn the protocol\u2019s native tokens. The interaction can be as simple as staking an asset in a protocol\u2019s staking contract, or more complicated such as staking SNX to mint sUSD in Synthetix to earn SNX rewards."}),"\n",(0,n.jsx)(i.p,{children:"In most cases the liquidity mined token is exchanged for the Want token on an AMM."}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:"Risk"}),(0,n.jsx)(i.th,{children:"Description"})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Governance"}),(0,n.jsx)(i.td,{children:"Admin key holders change protocol adversely, e.g. introduce penalties for withdrawals"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Technological"}),(0,n.jsx)(i.td,{children:"Smart contract risk of rewards contract"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{}),(0,n.jsx)(i.td,{children:"Smart contract risk of AMM used to exchange the liquidity mined token for the Want token"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Market"}),(0,n.jsx)(i.td,{children:"Fall in price of token being farmed"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{}),(0,n.jsx)(i.td,{children:"Liquidity of liquidity mined token on AMM is reduced or removed"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Operational Risk"}),(0,n.jsx)(i.td,{children:"Delays or inability to withdraw liquidity in an emergency"})]})]})]}),"\n",(0,n.jsxs)(i.p,{children:["The ",(0,n.jsx)(i.a,{href:"https://gov.yearn.fi/t/introducing-yearn-safe-farming-committee/10533",children:"Safe Farming Committee"})," decides which protocols are secure."]}),"\n",(0,n.jsx)(i.h2,{id:"trading-fees",children:"Trading Fees"}),"\n",(0,n.jsx)(i.p,{children:"Trading fees are earned in Automated Market Makers (AMMs) by providing liquidity."}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:"Risk"}),(0,n.jsx)(i.th,{children:"Description"})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Governance"}),(0,n.jsx)(i.td,{children:"Admin key holders change protocol adversely, e.g. reduce rewards paid to liquidity providers"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Technological"}),(0,n.jsx)(i.td,{children:"Smart contract risk of AMM (e.g. Curve Finance, Sushiswap or Uniswap)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Market"}),(0,n.jsx)(i.td,{children:"Trading volumes reduce leading to lower fees"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Impermanent loss"}),(0,n.jsxs)(i.td,{children:[(0,n.jsx)(i.a,{href:"https://academy.binance.com/en/articles/impermanent-loss-explained",children:"Impermanent loss"})," due to the pool\u2019s token prices changing relative to each other"]})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Operational Risk"}),(0,n.jsx)(i.td,{children:"Delays or inability to withdraw liquidity from the AMM in an emergency"})]})]})]}),"\n",(0,n.jsx)(i.h2,{id:"leverage",children:"Leverage"}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:"Risk"}),(0,n.jsx)(i.th,{children:"Description"})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Governance"}),(0,n.jsx)(i.td,{children:"Admin key holders change the lending protocol adversely"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Technological"}),(0,n.jsx)(i.td,{children:"Smart contract risk of lending protocol (Aave, Compound Finance, Maker, Unit protocol)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Market"}),(0,n.jsx)(i.td,{children:"Risk that the debt is liquidated due to a price fall"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{}),(0,n.jsx)(i.td,{children:"Risk that income is lower than the cost of the flash loan"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Oracle"}),(0,n.jsx)(i.td,{children:"Incorrect price feed"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{}),(0,n.jsx)(i.td,{children:"liquidation penalties"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:"Operational Risk"}),(0,n.jsx)(i.td,{children:"Operational risk of managing debt positions"})]})]})]})]})}function h(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>d,x:()=>l});var n=t(96540);const r={},s=n.createContext(r);function d(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);