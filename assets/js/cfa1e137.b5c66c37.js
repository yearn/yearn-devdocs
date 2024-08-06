"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[7290],{26779:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>h});var i=s(74848),n=s(28453);const a={},r="Overview",o={id:"products/yeth/overview",title:"Overview",description:"yETH",source:"@site/docs/getting-started/products/yeth/overview.md",sourceDirName:"products/yeth",slug:"/products/yeth/overview",permalink:"/getting-started/products/yeth/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/docs/getting-started/products/yeth/overview.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Overview",permalink:"/getting-started/products/veyfi"},next:{title:"Overview",permalink:"/getting-started/products/ylockers/overview"}},d={},h=[{value:"yETH",id:"yeth",level:2},{value:"Staked yETH (st-yETH)",id:"staked-yeth-st-yeth",level:2},{value:"st-yETH user vote weight",id:"st-yeth-user-vote-weight",level:3},{value:"Pool Weights for each LST",id:"pool-weights-for-each-lst",level:2},{value:"Example",id:"example",level:3},{value:"Single-Sided Deposits and Withdrawals",id:"single-sided-deposits-and-withdrawals",level:2},{value:"Single-Sided Deposits",id:"single-sided-deposits",level:3},{value:"Single-Sided Withdrawals",id:"single-sided-withdrawals",level:3},{value:"Examples",id:"examples",level:3},{value:"Contracts &amp; Roles",id:"contracts--roles",level:2},{value:"Management Role",id:"management-role",level:2},{value:"Pause mode",id:"pause-mode",level:3},{value:"Killed mode",id:"killed-mode",level:3},{value:"Guardian Role",id:"guardian-role",level:2},{value:"Protocol Specs",id:"protocol-specs",level:2},{value:"Frequently Asked Questions",id:"frequently-asked-questions",level:2},{value:"How does yETH earn APY?",id:"how-does-yeth-earn-apy",level:3},{value:"What other benefits does yETH give holders?",id:"what-other-benefits-does-yeth-give-holders",level:3},{value:"How is yield passed onto stakers?",id:"how-is-yield-passed-onto-stakers",level:3},{value:"Can I withdraw multiple LSDs?",id:"can-i-withdraw-multiple-lsds",level:3},{value:"Is there slippage with proportional withdrawal?",id:"is-there-slippage-with-proportional-withdrawal",level:3}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"overview",children:"Overview"}),"\n",(0,i.jsx)(t.h2,{id:"yeth",children:"yETH"}),"\n",(0,i.jsx)(t.p,{children:"yETH is a user-governed liquidity pool token consisting of various Ethereum Liquid Staking Derivatives (LSTs)."}),"\n",(0,i.jsxs)(t.p,{children:["The yETH protocol is an Automated Market Maker (AMM) for LSTs. Each LST in the yETH pool is priced according to the amount of ",(0,i.jsx)(t.a,{href:"https://ethereum.org/en/upgrades/beacon-chain/",children:"beacon chain"})," ETH it represents. This lets users deposit their LSTs into the pool and receive yETH tokens pegged 1:1 with beacon chain ETH. Users can also stake their yETH tokens to mint st-yETH, accrue yield, and participate in yETH governance."]}),"\n",(0,i.jsx)(t.p,{children:"This AMM model, combined with the governance and incentive mechanisms of the yETH protocol, aims to provide an optimal risk-adjusted yield for ETH staking by dynamically adjusting the weights of the LSTs in the pool. It also offers users flexibility with single-sided deposits and withdrawals, and maintains the pool's balance and diversification through a weight management system."}),"\n",(0,i.jsx)(t.p,{children:"The yETH protocol is governed by its users who can vote to adjust the weights of the LSTs in the pool, helping to maximize yield and mitigate risks associated with individual LSTs."}),"\n",(0,i.jsx)(t.p,{children:"All yields generated by yETH go to Staked yETH (st-yETH) holders, making yETH an ideal token for Liquidity Providing in stableswap pools like those on Curve. To acquire yETH, users can mint yETH by depositing LSTs or swap against the yETH/ETH Curve pool."}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Source Repo: ",(0,i.jsx)(t.a,{href:"https://github.com/yearn/yETH",children:"https://github.com/yearn/yETH"})]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"staked-yeth-st-yeth",children:"Staked yETH (st-yETH)"}),"\n",(0,i.jsx)(t.p,{children:"Users stake their yETH to mint st-yETH, accrue yield, and later unstake st-yETH to receive yETH back according to their earnings. Stakers receive all yield and slashings from the beacon chain (Ethereum proof-of-stake validators) and earn incentives if they participate and vote in yETH governance."}),"\n",(0,i.jsx)(t.p,{children:"By bundling LSTs, st-yETH aims to generate the best risk-adjusted yield from ETH staking. Through protocol governance, st-yETH users can readjust pool weights to maximize yield while mitigating catastrophic scenarios where one or several LSTs in the yETH composition suffer adverse events like de-pegging or security incidents."}),"\n",(0,i.jsx)(t.h3,{id:"st-yeth-user-vote-weight",children:"st-yETH user vote weight"}),"\n",(0,i.jsxs)(t.p,{children:["Each user has an internal vote weight that increases asymptotically to the user's share count. After ",(0,i.jsx)(t.code,{children:"t"})," seconds, their vote weight is ",(0,i.jsx)(t.code,{children:"s * t / (t + t_half)"})," where ",(0,i.jsx)(t.code,{children:"s"})," is the number of shares and ",(0,i.jsx)(t.code,{children:"t_half"})," is the voting half-time."]}),"\n",(0,i.jsxs)(t.p,{children:["The voting half-time variable determines the time it takes until half the voting weight is reached for a staker. You can find the current voting half-time on ",(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4#readContract#F20",children:"Etherscan"})," in seconds. Thus the wait to get to half of your st-yETH voting power is 60 days."]}),"\n",(0,i.jsx)(t.p,{children:"The user's external vote weight equals the internal vote weight at the end of the previous week."}),"\n",(0,i.jsx)(t.h2,{id:"pool-weights-for-each-lst",children:"Pool Weights for each LST"}),"\n",(0,i.jsx)(t.p,{children:"In yETH, each Liquid Staking Derivative (LST) has an assigned weight representing its proportion in the pool. The weight management system ensures that the pool remains diversified and balanced. As an LST performs well or gains popularity, its weight in the pool may increase, attracting more liquidity and providing better returns. Conversely, if an LST underperforms or faces issues, its weight may decrease, reducing its impact on the overall pool performance. This dynamic adjustment helps maintain an optimal risk-adjusted yield for yETH users."}),"\n",(0,i.jsx)(t.p,{children:'For each epoch, users can vote to adjust the weights of the LSTs in the pool. The voting process also involves a "do nothing" option, allowing the current weight distribution to remain unchanged. If a new LST is added during the voting process, it starts at 0% weight and gradually increases to 1% in the first epoch. In the subsequent epoch, they participate like all other LSTs.'}),"\n",(0,i.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,i.jsx)(t.p,{children:"Suppose we have four LSTs: A, B, C, and D with weights 10%, 20%, 30%, and 40% respectively in epoch n. For the next epoch (n+1), C has incentives worth $100."}),"\n",(0,i.jsx)(t.p,{children:"The voting outcome for epoch n+1 is:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Do nothing: 30%"}),"\n",(0,i.jsx)(t.li,{children:"A: 7%"}),"\n",(0,i.jsx)(t.li,{children:"B: 10%"}),"\n",(0,i.jsx)(t.li,{children:"C: 43%"}),"\n",(0,i.jsx)(t.li,{children:"D: 10%"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Here's how the voting outcome affects the weights:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:'The "do nothing" vote is distributed to the current weight, reducing the total redistribution to 7%.'}),"\n",(0,i.jsx)(t.li,{children:"The incentives for voting are distributed only to those who explicitly voted for a particular LST, making the incentive system more effective."}),"\n",(0,i.jsx)(t.li,{children:"If a new LST, say E, is added during the voting process, they start at 0% weight and do not fight for the 7% redistribution. They are gradually increased to 1% in the first epoch. In the next epoch, they participate like all other LSTs."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"single-sided-deposits-and-withdrawals",children:"Single-Sided Deposits and Withdrawals"}),"\n",(0,i.jsx)(t.p,{children:"Single-sided deposits and withdrawals allow users to add or remove a specific asset from the pool. This differs from balanced operations where users deposit or withdraw a proportionate amount of all assets in the pool. Single-sided operations can be more convenient but may also incur bonuses or penalties."}),"\n",(0,i.jsx)(t.h3,{id:"single-sided-deposits",children:"Single-Sided Deposits"}),"\n",(0,i.jsx)(t.p,{children:"When a user makes a single-sided deposit, they add a specific amount of one asset to the pool. The system calculates the equivalent amount of yETH tokens to mint based on the current rate of the deposited asset."}),"\n",(0,i.jsx)(t.p,{children:"However, single-sided deposits can distort the balance of assets in the pool. The system applies a deposit penalty if the deposited asset's weight increases above its target weight due to the deposit. This penalty reduces the amount of yETH tokens minted for the depositor, making the deposit operation more expensive. The penalty serves as an incentive for users to maintain the balance of assets in the pool."}),"\n",(0,i.jsx)(t.p,{children:"Conversely, the system applies a deposit bonus if the deposited asset's weight is below its target weight. This bonus increases the yETH tokens minted for the depositor, making the deposit operation cheaper. The bonus serves as an incentive for users to restore the balance of assets in the pool."}),"\n",(0,i.jsx)(t.h3,{id:"single-sided-withdrawals",children:"Single-Sided Withdrawals"}),"\n",(0,i.jsx)(t.p,{children:"Users who make a single-sided withdrawal burn a specific amount of yETH tokens to withdraw one asset from the pool. The system calculates the amount of the asset to send based on the current rate."}),"\n",(0,i.jsx)(t.p,{children:"Like single-sided deposits, single-sided withdrawals can also distort the balance of assets in the pool. If the withdrawn asset's weight decreases below its target weight due to the withdrawal, the system applies a withdrawal penalty. This penalty reduces the amount of the asset sent to the withdrawer, making the withdrawal operation more expensive."}),"\n",(0,i.jsx)(t.p,{children:"Conversely, the system applies a withdrawal bonus if the withdrawn asset's weight exceeds its target weight. This bonus increases the amount of the asset sent to the withdrawer, effectively making the withdrawal operation cheaper."}),"\n",(0,i.jsx)(t.h3,{id:"examples",children:"Examples"}),"\n",(0,i.jsx)(t.p,{children:"Let's consider a pool with two assets, A and B, with a target weight of 50%. Due to market fluctuations, the current weights are 60% for A and 40% for B."}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"If a user deposits asset A, they will incur a deposit penalty because the deposit increases the weight of A above its target weight. The system will mint fewer yETH tokens for the depositor than the rate would suggest."}),"\n",(0,i.jsx)(t.li,{children:"If a user deposits asset B, they will receive a deposit bonus because the deposit brings the weight of B closer to its target weight. The system will mint more yETH tokens for the depositor than the rate would suggest."}),"\n",(0,i.jsx)(t.li,{children:"If a user withdraws asset A, they will receive a withdrawal bonus because the withdrawal brings the weight of A closer to its target weight. The system will send more asset A to the withdrawer than the rate would suggest."}),"\n",(0,i.jsx)(t.li,{children:"If a user withdraws asset B, they will incur a withdrawal penalty because the withdrawal decreases the weight of B below its target weight. The system will send less asset B to the withdrawer than the rate would suggest."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["For a deeper dive into the math behind the calculation of yETH weighted stable swap check this paper: ",(0,i.jsx)(t.a,{href:"https://github.com/yearn/yETH/blob/main/whitepaper/derivation.pdf",children:"https://github.com/yearn/yETH/blob/main/whitepaper/derivation.pdf"})]}),"\n",(0,i.jsx)(t.h2,{id:"contracts--roles",children:"Contracts & Roles"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Name"}),(0,i.jsx)(t.th,{children:"Address"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"yETH"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x1BED97CBC3c24A4fb5C069C6E311a967386131f7",children:(0,i.jsx)(t.code,{children:"0x1BED97CBC3c24A4fb5C069C6E311a967386131f7"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"st-yETH"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4",children:(0,i.jsx)(t.code,{children:"0x583019fF0f430721aDa9cfb4fac8F06cA104d0B4"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Management"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0xbBBBBbbB6B942883EAd4976882C99201108c784d",children:(0,i.jsx)(t.code,{children:"0xbBBBBbbB6B942883EAd4976882C99201108c784d"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Protocol Owned Liquidity"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x929401e30Aab6bd648dEf2d30FF44952BaB04478",children:(0,i.jsx)(t.code,{children:"0x929401e30Aab6bd648dEf2d30FF44952BaB04478"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Bootstrap: Deposit, Vote, Claim Incentives"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x41B994C192183793bB9cc35bAAb8bD9C6885c6bf",children:(0,i.jsx)(t.code,{children:"0x41B994C192183793bB9cc35bAAb8bD9C6885c6bf"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Bootstrap: Claim st-yETH"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x7cf484D9d16BA26aB3bCdc8EC4a73aC50136d491",children:(0,i.jsx)(t.code,{children:"0x7cf484D9d16BA26aB3bCdc8EC4a73aC50136d491"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Guardian"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0xDC775e813cDB38a4f02c4BAd3942319088018eFA",children:(0,i.jsx)(t.code,{children:"0xDC775e813cDB38a4f02c4BAd3942319088018eFA"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Pool"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x2cced4ffA804ADbe1269cDFc22D7904471aBdE63",children:(0,i.jsx)(t.code,{children:"0x2cced4ffA804ADbe1269cDFc22D7904471aBdE63"})})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Rate Providers"}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.a,{href:"https://etherscan.io/address/0x4e322aeAf355dFf8fb9Fd5D18F3D87667E8f8316",children:(0,i.jsx)(t.code,{children:"0x4e322aeAf355dFf8fb9Fd5D18F3D87667E8f8316"})})})]})]})]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsxs)(t.p,{children:["Due to a redeploy of st-yETH during the bootstrap process the first st-yETH contract has been deprecated, use the ",(0,i.jsx)(t.code,{children:"Bootstrap: Claim st-yETH"})," contract to claim the new version if you participated in the bootstrap phase."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"management-role",children:"Management Role"}),"\n",(0,i.jsx)(t.p,{children:"Trusted addresses with privileged access for limited operations. Should eventually be replaced by a smart contract:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Can start a gradual weight change, as long as no weight change is active yet."}),"\n",(0,i.jsx)(t.li,{children:"Can whitelist a new asset, which sets an initial weight, sets the rate provider, and requires an initial deposit. New assets can only be whitelisted if no weight change has been scheduled yet."}),"\n",(0,i.jsx)(t.li,{children:"Can update the rate provider for every whitelisted asset."}),"\n",(0,i.jsx)(t.li,{children:"Can approve rate increases above 10%."}),"\n",(0,i.jsx)(t.li,{children:"Can update the staking contract."}),"\n",(0,i.jsx)(t.li,{children:"Can set the pool swap fee."}),"\n",(0,i.jsx)(t.li,{children:"Can set the tolerance range."}),"\n",(0,i.jsx)(t.li,{children:"Can set the new management address."}),"\n",(0,i.jsx)(t.li,{children:"Can set the new guardian addresses."}),"\n",(0,i.jsxs)(t.li,{children:["Can trigger ",(0,i.jsx)(t.code,{children:"pause mode"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["Can trigger ",(0,i.jsx)(t.code,{children:"killed mode"}),"."]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"pause-mode",children:"Pause mode"}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"This mode is to be activated in the event of extreme market conditions or detected suspicious behavior, either in the protocol itself or in the underlying LST tokens that back it."}),"\n"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"No user may swap assets with the contract."}),"\n",(0,i.jsx)(t.li,{children:"No user may deposit assets into the contract."}),"\n",(0,i.jsx)(t.li,{children:"Users may only withdraw assets in a balanced manner, single-sided withdrawals are not allowed."}),"\n",(0,i.jsx)(t.li,{children:"Weights, rates, and rate providers cannot be updated during this mode."}),"\n",(0,i.jsx)(t.li,{children:"Management or guardian can undo pause mode to resume normal operation."}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"killed-mode",children:"Killed mode"}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"This mode is to be activated in the event of critical failures, whether in the protocol itself or in any of the underlying LST tokens that back it. This can also be used to migrate to a new version of the yETH protocol."}),"\n"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"No user may deposit assets into the contract."}),"\n",(0,i.jsx)(t.li,{children:"Users may only withdraw assets in a balanced manner."}),"\n",(0,i.jsx)(t.li,{children:"The reward controller may not update the beacon chain amounts."}),"\n",(0,i.jsx)(t.li,{children:"Pause mode may not be undone."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["There is no way to undo ",(0,i.jsx)(t.code,{children:"killed mode"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"guardian-role",children:"Guardian Role"}),"\n",(0,i.jsx)(t.p,{children:"Trusted addresses with emergency privileges:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Can trigger pause mode."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"protocol-specs",children:"Protocol Specs"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["The yETH specification can be found in the source repo: ",(0,i.jsx)(t.a,{href:"https://github.com/yearn/yETH/blob/main/SPECIFICATION.md",children:"https://github.com/yearn/yETH/blob/main/SPECIFICATION.md"})]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"frequently-asked-questions",children:"Frequently Asked Questions"}),"\n",(0,i.jsx)(t.h3,{id:"how-does-yeth-earn-apy",children:"How does yETH earn APY?"}),"\n",(0,i.jsx)(t.p,{children:"yETH earns APY through various sources:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Swap fee income from the Automated Market Maker (AMM)"}),"\n",(0,i.jsx)(t.li,{children:"Incentives fee income, which are incentives for staker participation in governance"}),"\n",(0,i.jsx)(t.li,{children:"Liquid Staking Derivative (LSD) income from staked ETH yield"}),"\n",(0,i.jsx)(t.li,{children:"Buying LSTs at a discount"}),"\n",(0,i.jsx)(t.li,{children:"Whitelisting fees"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"However, there are also deductions such as Beacon Chain slashings and a 10% Yearn performance fee on profits."}),"\n",(0,i.jsx)(t.p,{children:"Please note that yield is paid out one week after it is generated. The yield generated in week N is streamed out in week N+1."}),"\n",(0,i.jsx)(t.h3,{id:"what-other-benefits-does-yeth-give-holders",children:"What other benefits does yETH give holders?"}),"\n",(0,i.jsx)(t.p,{children:"yETH provides diversification by holding a basket of LSDs, which helps to spread the risk."}),"\n",(0,i.jsx)(t.h3,{id:"how-is-yield-passed-onto-stakers",children:"How is yield passed onto stakers?"}),"\n",(0,i.jsx)(t.p,{children:"LSD Protocols generate yield and update their on-chain rates. This results in yETH being minted and sent to st-yETH."}),"\n",(0,i.jsx)(t.h3,{id:"can-i-withdraw-multiple-lsds",children:"Can I withdraw multiple LSDs?"}),"\n",(0,i.jsx)(t.p,{children:"Yes, you can withdraw multiple LSDs or just one LSD. However, your withdrawal cannot cause an LSD to leave its safety bands around its target weight. For example, if a pool has a weight of 20% and a band of 5%, the actual weight is allowed to be between 15% and 25%. This caps losses to at most 25%, assuming that token permanently depegs and goes to 0. In that worst-case scenario, yETH depegs to 0.75 ETH, because you can always do a balanced withdrawal of all the assets, of which only 25% is worthless. Compare this with holding the token by yourself, you\u2019d be -100%."}),"\n",(0,i.jsx)(t.h3,{id:"is-there-slippage-with-proportional-withdrawal",children:"Is there slippage with proportional withdrawal?"}),"\n",(0,i.jsx)(t.p,{children:"No, there is no slippage with proportional withdrawal."})]})}function c(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>o});var i=s(96540);const n={},a=i.createContext(n);function r(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);