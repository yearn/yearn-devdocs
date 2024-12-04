"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[733],{98713:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var n=o(74848),r=o(28453);const s={},i="Overview",a={id:"products/ylockers/overview",title:"Overview",description:"The new Ylockers ecosystem has rolled out as of June 6th, 2024 with the launch of the YearnBoostedStaker (YBS) contract and a new V3 Auto-Compounder vault. These new contracts are now available for yPRISMA and yCRV.",source:"@site/docs/getting-started/products/ylockers/overview.md",sourceDirName:"products/ylockers",slug:"/products/ylockers/overview",permalink:"/getting-started/products/ylockers/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/docs/getting-started/products/ylockers/overview.md",tags:[],version:"current",frontMatter:{},sidebar:"userDocsSidebar",previous:{title:"yVaults FAQ",permalink:"/getting-started/products/yvaults/yvaults-faq"},next:{title:"yCRV Overview",permalink:"/getting-started/products/ylockers/ycrv/overview"}},d={},l=[{value:"yLocker Products",id:"ylocker-products",level:2},{value:"Earning Yield with yLockers",id:"earning-yield-with-ylockers",level:2},{value:"Option 1: Deposit yLocker Tokens into YBS",id:"option-1-deposit-ylocker-tokens-into-ybs",level:3},{value:"Weights and Boosts",id:"weights-and-boosts",level:3},{value:"Let\u2019s demonstrate with an example of how the weights work",id:"lets-demonstrate-with-an-example-of-how-the-weights-work",level:4},{value:"Rewards and Claiming",id:"rewards-and-claiming",level:3},{value:"Fees",id:"fees",level:3},{value:"Unstaking",id:"unstaking",level:3},{value:"Option 2: Deposit your yLocker tokens into the Auto-Compounder Vault",id:"option-2-deposit-your-ylocker-tokens-into-the-auto-compounder-vault",level:3},{value:"Deployment Addresses",id:"deployment-addresses",level:2}];function c(e){const t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"overview",children:"Overview"})}),"\n",(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsxs)(t.p,{children:["The new Ylockers ecosystem has rolled out as of June 6th, 2024 with the launch of the ",(0,n.jsx)(t.em,{children:"YearnBoostedStaker"})," (YBS) contract and a new V3 Auto-Compounder vault. These new contracts are now available for yPRISMA and yCRV."]})}),"\n",(0,n.jsxs)(t.p,{children:["yLockers are a category of assets built by Yearn designed to tokenize locked governance positions in external DeFi protocols based on ",(0,n.jsx)(t.a,{href:"https://resources.curve.fi/crv-token/vecrv/",children:"Curve's vote escrow (ve) model"}),'. This asset type is often called a "Liquid Locker".']}),"\n",(0,n.jsx)(t.p,{children:"To achieve this, Yearn has deployed a system of smart contracts that allows users to permissionlessly max-lock their governance tokens to Yearn in exchange for a yLocker token (e.g., yCRV, yPRISMA, etc.) at a rate of 1:1."}),"\n",(0,n.jsx)(t.p,{children:"The benefit of doing this is to provide the end user with a fully transferrable and liquid token that can still receive a share of governance benefits like yield or voting power depending on the protocol. No longer is there a need to lock up your asset value for up to 4 full years!"}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"\u26a0\ufe0f Important"}),": Liquid locker tokens are not redeemable for the underlying locked tokens. This is not possible. But because they are liquid, they can be traded on decentralized exchanges, and bought and sold at market value."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"ylocker-products",children:"yLocker Products"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"../ylockers/yprisma/overview",children:"yPrisma"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"../ylockers/ycrv/overview",children:"yCRV"})}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"earning-yield-with-ylockers",children:"Earning Yield with yLockers"}),"\n",(0,n.jsx)(t.p,{children:"Within the yLockers ecosystem, there are two distinct ways to earn yield:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"Deposit your yLocker tokens into YBS (earn stablecoins)"}),"\n",(0,n.jsx)(t.li,{children:"Deposit your yLocker tokens into the Auto-Compounder Vault (earn yLocker tokens)"}),"\n"]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"option-1-deposit-ylocker-tokens-into-ybs",children:"Option 1: Deposit yLocker Tokens into YBS"}),"\n",(0,n.jsxs)(t.p,{children:["Each week, Yearn's yLockers earn revenue from protocol fees and vote incentives. This revenue is converted into ecosystem stablecoins (mkUSD for yPrisma or crvUSD for yCRV) and distributed to yLocker stakers at the start of the week via the ",(0,n.jsx)(t.code,{children:"YearnBoostedStaker"}),"(YBS), a new contract which was launched in Spring 2024 following the passing of ",(0,n.jsx)(t.a,{href:"https://snapshot.org/#/veyfi.eth/proposal/0xe79fb2ef4f21ef1e9cc30dd1522c9751c74b631c4782bccbbeb25185d4ddae1d",children:"YIP-77"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"To begin earning your share, all you need to do is stake your respective yLocker tokens in the staking contract. Take a look at the interface guides for your desired yLocker to get started. Want to learn how it all works under the hood? Read on Anon!"}),"\n",(0,n.jsx)(t.h3,{id:"weights-and-boosts",children:"Weights and Boosts"}),"\n",(0,n.jsx)(t.p,{children:"The longer you stake, the greater your boost! Yearn's yLocker staking contract incentivizes long-term users by boosting their yield (up to a maximum of 2.5x)."}),"\n",(0,n.jsx)(t.p,{children:"You'll reach max boost and achieve the maximum staking APR less than four weeks after depositing your yLocker tokens."}),"\n",(0,n.jsx)(t.p,{children:"To calculate your boost, the staking contract maintains a weight for every deposit (which is a function of the amount of yLocker tokens you have staked and the duration since it was staked)."}),"\n",(0,n.jsx)(t.p,{children:"Stake weight increases by 50 points each week (at 00:00:00 UTC, Thursday) until the maximum weight is reached after 4 weeks. For security purposes, the rewards contract is designed to ignore staked amounts that have not yet reached a level of 1x boost (those in their first week). After the first week and once the stake weight has reached 100 points, rewards become claimable."}),"\n",(0,n.jsx)(t.h4,{id:"lets-demonstrate-with-an-example-of-how-the-weights-work",children:"Let\u2019s demonstrate with an example of how the weights work"}),"\n",(0,n.jsx)(t.p,{children:"In this example\u2026"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["YearnBoostedStaker is deployed with ",(0,n.jsx)(t.code,{children:"maxGrowthWeeks"})," = 4"]}),"\n",(0,n.jsx)(t.li,{children:"You stake 100 yLocker tokens"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"On deposit, your initial weight will be 50. At 00:00:00 UTC the following Thursday, your weight will increase to 100, then 150, then 200, and finally 250 (on the fourth Thursday following your deposit)."}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"week"}),(0,n.jsx)(t.th,{children:"balance"}),(0,n.jsx)(t.th,{children:"weight"}),(0,n.jsx)(t.th,{children:"boost"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"0 (deposit week)"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"50"}),(0,n.jsx)(t.td,{children:"0x"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"1"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"1.0x"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"2"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"150"}),(0,n.jsx)(t.td,{children:"1.5x"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"3"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"200"}),(0,n.jsx)(t.td,{children:"2.0x"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"4 (final growth week)"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"250"}),(0,n.jsx)(t.td,{children:"2.5x"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"5 ...n"}),(0,n.jsx)(t.td,{children:"100"}),(0,n.jsx)(t.td,{children:"250"}),(0,n.jsx)(t.td,{children:"2.5x"})]})]})]}),"\n",(0,n.jsx)(t.p,{children:"To keep it simple, the example above does not address what happens if you make a withdrawal or a second deposit. If, for example, you deposit 100 yLocker tokens every week for four weeks, you will then have four independent weight groups traveling through the system."}),"\n",(0,n.jsx)(t.p,{children:"A withdraw will always retrieve yLocker tokens from your most recent (least weighted) deposit, leaving the higher weighted yLocker tokens to continue along."}),"\n",(0,n.jsx)(t.p,{children:"Your total weight is equal to the sum of each of your deposit\u2019s weight. And the total system weight is the sum of all user weight."}),"\n",(0,n.jsx)(t.h3,{id:"rewards-and-claiming",children:"Rewards and Claiming"}),"\n",(0,n.jsx)(t.p,{children:"Each week, Yearn claims its share of protocol fees and vote-maximized vote incentives. These are swapped for ecosystem stablecoins, wrapped as a yield-bearing Yearn V3 vault token, and deposited directly into the reward distributor contract."}),"\n",(0,n.jsx)(t.p,{children:"yLocker stakers are entitled to the following rewards:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"100% of their share of protocol fees"}),"\n",(0,n.jsxs)(t.li,{children:["90% of their share of gauge votes will be used to earn vote-maximized vote incentives","\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.em,{children:"(the other 10% votes to support yLocker token liquidity)"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Your rewards accrue week over week and are never lost if unclaimed. In fact, they begin earning you additional stablecoin yield from the moment we receive them! When claimed, Yearn V3 vault tokens will be received directly to your wallet."}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["\u26a0\ufe0f ",(0,n.jsx)(t.strong,{children:"Important:"})," Yearn vaults can use multiple strategies to generate yield and may be exposed to more than one DeFi protocol. For more information on the various layers of smart contract risk involved, please refer to our ",(0,n.jsx)(t.a,{href:"https://docs.yearn.fi/resources/risks/protocol-risks",children:"risk documentation"}),"."]}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"fees",children:"Fees"}),"\n",(0,n.jsx)(t.p,{children:"Every yLocker charges a 10% performance fee on the total revenue it receives each week."}),"\n",(0,n.jsx)(t.h3,{id:"unstaking",children:"Unstaking"}),"\n",(0,n.jsx)(t.p,{children:"You're free to unstake your yLocker tokens at any time with no lock-ups or penalties."}),"\n",(0,n.jsx)(t.p,{children:"You can also make partial withdrawals. If you have multiple amounts actively growing in different weeks, the withdrawal is made from the least-weighted amounts first."}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"option-2-deposit-your-ylocker-tokens-into-the-auto-compounder-vault",children:"Option 2: Deposit your yLocker tokens into the Auto-Compounder Vault"}),"\n",(0,n.jsx)(t.p,{children:"Too busy to deal with staking, weights, and manual claims? Just want more yLocker tokens and the highest APYs? Then the simple yLocker auto-compounding vaults are for you!"}),"\n",(0,n.jsxs)(t.p,{children:["These are Yearn V3 vaults (more info ",(0,n.jsx)(t.a,{href:"https://docs.yearn.fi/getting-started/products/yvaults/v3",children:"here"}),") that have the capability to use multiple strategies to increase the yield on your yLocker tokens. However, in practice, it only requires one simple strategy to farm the ",(0,n.jsx)(t.code,{children:"YearnBoostedStaker"})," staking contract."]}),"\n",(0,n.jsx)(t.p,{children:"Once a week, the vault claims its boosted share of stablecoins from the yLocker staker contract, swaps it for more yLocker tokens, and deposits it back into the staker. On top of that, the Auto-Compounder vault is whitelisted, allowing it to earn max boost immediately on all reinvested yLocker tokens."}),"\n",(0,n.jsx)(t.p,{children:"The vault charges a 10% performance fee."}),"\n",(0,n.jsx)(t.h2,{id:"deployment-addresses",children:"Deployment Addresses"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["yLockers Registry: ",(0,n.jsx)(t.a,{href:"https://etherscan.io/address/0x262be1d31d0754399d8d5dc63B99c22146E9f738",children:"0x262be1d31d0754399d8d5dc63B99c22146E9f738"})]}),"\n",(0,n.jsx)(t.li,{children:"Or See individual yLocker pages for their specific deployed contracts"}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},28453:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>a});var n=o(96540);const r={},s=n.createContext(r);function i(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);