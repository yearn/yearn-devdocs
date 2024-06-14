"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[6831],{10858:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var s=r(74848),n=r(28453);const i={},o="Protocol Risks",a={id:"risks/protocol-risks",title:"Protocol Risks",description:"Yearn\u2019s core products are the vaults. Each vault runs at least one strategy, and each strategy is exposed to at least one protocol. Strategy and protocol risks are described here and here respectively.",source:"@site/docs/resources/risks/protocol-risks.md",sourceDirName:"risks",slug:"/risks/protocol-risks",permalink:"/resources/risks/protocol-risks",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1693865708e3,frontMatter:{},sidebar:"mySidebar",previous:{title:"Auctions",permalink:"/resources/auctions"},next:{title:"Risk Scores",permalink:"/resources/risks/risk-score"}},d={},l=[{value:"Lending Protocols",id:"lending-protocols",level:2},{value:"Automated Market Makers",id:"automated-market-makers",level:2},{value:"Leverage-enabling protocols",id:"leverage-enabling-protocols",level:2},{value:"Liquidity mining protocols",id:"liquidity-mining-protocols",level:2}];function c(e){const t={a:"a",h1:"h1",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"protocol-risks",children:"Protocol Risks"}),"\n",(0,s.jsxs)(t.p,{children:["Yearn\u2019s core products are the vaults. Each vault runs at least one strategy, and each strategy is exposed to at least one protocol. Strategy and protocol risks are described ",(0,s.jsx)(t.a,{href:"https://docs.yearn.fi/resources/risks/strategy-risks",children:"here"})," and ",(0,s.jsx)(t.a,{href:"https://docs.yearn.fi/resources/risks/protocol-risks",children:"here"})," respectively."]}),"\n",(0,s.jsx)(t.p,{children:"The key protocols to which Yearn\u2019s vaults are exposed are lending protocols, AMMs and protocols that enable leverage."}),"\n",(0,s.jsx)(t.h2,{id:"lending-protocols",children:"Lending Protocols"}),"\n",(0,s.jsx)(t.p,{children:"One of the simplest strategies is collateralized lending which involves lending assets on lending protocols to earn a yield. For example, the optimized lending strategy used by the Dai vault lends Dai on the highest yielding lending protocol."}),"\n",(0,s.jsx)(t.p,{children:"Yearn\u2019s vaults are exposed to the lending protocols Aave, Compound Finance, dYdX and Alpha Homora."}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Risk"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Governance"}),(0,s.jsx)(t.td,{children:"Admin key holders (or token holders) change the lending protocol adversely, e.g. accept risky assets with lenient risk parameters"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Technological"}),(0,s.jsx)(t.td,{children:"Smart contract risk from interacting with lending protocols"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Liquidations do not occur as expected"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Market"}),(0,s.jsx)(t.td,{children:"The value of the loans exceed the value of the collateral"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Low demand for borrowing leads to low yields"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Accepted assets become impaired"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Oracle"}),(0,s.jsx)(t.td,{children:"Incorrect price feed causes the collateral to go to such a value that the loan is liquidated"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"automated-market-makers",children:"Automated Market Makers"}),"\n",(0,s.jsx)(t.p,{children:"AMMs are used in Yearn\u2019s vault strategies to earn trading fees (and liquidity mining rewards if available) and to exchange liquidity mined tokens for the Want token."}),"\n",(0,s.jsx)(t.p,{children:"Examples of the AMMs to which Yearn\u2019s vaults are exposed are Curve Finance, Sushiswap and Uniswap. Curve Finance is predominantly used to earn trading fees and farm CRV rewards, whereas Sushiswap and Uniswap are used to exchange liquidity mined tokens for the Want token."}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Risk"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Market"}),(0,s.jsx)(t.td,{children:"Lack of liquidity for the token being exchanged"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Trading volumes reduce leading to lower fees"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Impermanent loss due to the pool\u2019s token prices changing relative to each other"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Technological"}),(0,s.jsx)(t.td,{children:"Smart contract risk from interacting with AMMs"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Governance"}),(0,s.jsx)(t.td,{children:"Token holders vote to change the AMM adversely"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"leverage-enabling-protocols",children:"Leverage-enabling protocols"}),"\n",(0,s.jsx)(t.p,{children:"Leverage-enabling protocols are used in Yearn\u2019s vault strategies to increase the yield. This is possible when a non-leveraged strategy earns a higher return than the cost of borrowing."}),"\n",(0,s.jsx)(t.p,{children:"Examples of the leverage-enabling protocols to which Yearn\u2019s vaults are exposed are Maker, Unit Protocol, Aave, dYdX and Cream.Finance."}),"\n",(0,s.jsx)(t.p,{children:"Maker and Unit Protocol enable the minting of stablecoins against collateral. The stablecoins can then be invested in yield-bearing strategies."}),"\n",(0,s.jsx)(t.p,{children:"Aave and dYdX offer flash loans which allows Yearn\u2019s strategies to take out a loan, deploy the capital in a strategy and repay the loan in one transaction."}),"\n",(0,s.jsx)(t.p,{children:"Cream.Finance, in combination with Iron Bank, allows strategies to increase yield with protocol-to-protocol uncollateralized borrowing. This is because Yearn\u2019s strategies have been white-listed by Cream.Finance allowing them to borrow depositors\u2019 funds that have not been lent out, in order to deploy in strategies that have a greater return than the cost of borrowing."}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Risk"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Governance"}),(0,s.jsx)(t.td,{children:"Multi-sig or token holders vote to change the protocol adversely"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Poorly chosen risk parameters for onboarded collateral of Maker or Unit Protocol, e.g. collateralization ratios that are too low"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Technological"}),(0,s.jsx)(t.td,{children:"Smart contract risk"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Market"}),(0,s.jsx)(t.td,{children:"Liquidations are not processed correctly on Maker or Unit Protocol"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Stablecoin peg is not maintained (Dai and USDP for Maker and Unit Protocol respectively)"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Cost of uncollateralized borrowing from Cream.Finance increases such that Yearn\u2019s strategies cannot utilize it"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Oracle"}),(0,s.jsx)(t.td,{children:"Incorrect price feed leads to incorrect liquidation of positions  (Maker and Unit Protocol)"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"liquidity-mining-protocols",children:"Liquidity mining protocols"}),"\n",(0,s.jsx)(t.p,{children:"A core strategy for Yearn\u2019s vaults is to liquidity mine (or yield farm) protocols.\nLiquidity mining involves interacting with a protocol to earn the protocol\u2019s native tokens. The interaction can be as simple as staking an asset in a protocol\u2019s staking contract, or it can be more complicated such as staking SNX to mint sUSD in Synthetix to earn SNX rewards.\nIn most cases the liquidity mined token is exchanged for the Want token on an AMM. For example, in the Dai vault the COMP token is farmed by supplying Dai to Compound Finance to earn COMP rewards, which are exchanged for more Dai."}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Risk"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Governance"}),(0,s.jsx)(t.td,{children:"Admin key holders change protocol adversely, e.g. introduce penalties for withdrawals or steal funds"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Technological"}),(0,s.jsx)(t.td,{children:"Smart contract risk of protocol or rewards contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Market"}),(0,s.jsx)(t.td,{children:"Fall in price of token being farmed reducing the APY"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{children:"Liquidity of liquidity mined token on AMM is reduced or removed"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Oracle"}),(0,s.jsx)(t.td,{children:"Delays or inability to withdraw liquidity in an emergency"})]})]})]}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.a,{href:"https://gov.yearn.fi/t/introducing-yearn-safe-farming-committee/10533",children:"Safe Farming Committee"})," considers these risks in detail and decides which protocols are secure."]})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>a});var s=r(96540);const n={},i=s.createContext(n);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);