"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[5885],{45029:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var r=n(74848),s=n(28453);const o={description:"This documentation only covers v1 vaults."},a="v1 Vaults Overview",i={id:"v1/introduction",title:"v1 Vaults Overview",description:"This documentation only covers v1 vaults.",source:"@site/docs/developers/v1/introduction.md",sourceDirName:"v1",slug:"/v1/introduction",permalink:"/developers/v1/introduction",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1633935865e3,frontMatter:{description:"This documentation only covers v1 vaults."},sidebar:"developers",previous:{title:"Additional Resources",permalink:"/developers/v2/additional-resources"},next:{title:"Naming Conventions",permalink:"/developers/v2/naming-convention"}},l={},d=[{value:"Protocol Contracts",id:"protocol-contracts",level:2},{value:"Vaults",id:"vaults",level:3},{value:"Controller",id:"controller",level:3},{value:"Registry",id:"registry",level:3},{value:"Strategies",id:"strategies",level:3},{value:"Treasury",id:"treasury",level:3},{value:"Governance",id:"governance",level:3},{value:"Vault management",id:"vault-management",level:4},{value:"Controller management",id:"controller-management",level:4},{value:"Strategy management",id:"strategy-management",level:4},{value:"Protocol Actors",id:"protocol-actors",level:2},{value:"User",id:"user",level:3},{value:"Keeper",id:"keeper",level:3},{value:"Strategist",id:"strategist",level:3}];function c(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"v1-vaults-overview",children:"v1 Vaults Overview"}),"\n",(0,r.jsxs)(t.p,{children:["This document gives a ",(0,r.jsx)(t.em,{children:"generalized and high level overview"})," of how the protocol and its actors, smart contracts, and other services interact with each other. The aim is to build intuition about how Yearn products work."]}),"\n",(0,r.jsx)(t.admonition,{type:"info",children:(0,r.jsx)(t.p,{children:"All vaults are different. This is not a formal specification. Contracts and components are subject to change without notice."})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:"https://raw.githubusercontent.com/lehnberg/yearn-diagrams/master/yearn-protocol/yearn-protocol-v0.06.svg",alt:"yearn-protocol"})}),"\n",(0,r.jsxs)(t.p,{children:["All contracts are open source and available from the ",(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-protocol",children:"/yearn-protocol"})," GitHub repo."]}),"\n",(0,r.jsx)(t.h2,{id:"protocol-contracts",children:"Protocol Contracts"}),"\n",(0,r.jsx)(t.h3,{id:"vaults",children:"Vaults"}),"\n",(0,r.jsxs)(t.p,{children:["Example: ",(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-protocol/blob/develop/contracts/vaults/yWETH.sol",children:"yWETH.sol"})]}),"\n",(0,r.jsx)(t.p,{children:"Vaults act as the representation of the user in the system, and is the internal customer for investments. There is one vault per deposit token, and they are agnostic to the strategies they interact with."}),"\n",(0,r.jsx)(t.p,{children:"Their primary tasks are to:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"process user deposits and withdrawals"}),", minting or burning LP tokens as receipts for these;"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"manage disposable funds"}),", ensuring there is enough to satisfy the minimum amount available to handle withdrawals, and issuing withdrawal requests from strategies when more funds need to be added; and"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"deposit funds into strategies"}),", when there is a surplus of funds in the vault above what's required to be kept at disposal."]}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"controller",children:"Controller"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-protocol/blob/develop/contracts/controllers/Controller.sol",children:"Controller.sol"})}),"\n",(0,r.jsxs)(t.p,{children:["The Controller act as the gatekeeping interface between vaults and strategies and oversees communication and fund flows. Deposits and withdrawals in and out of strategies flow through the ",(0,r.jsx)(t.code,{children:"Controller"}),". It keeps track of the addresses for the active vaults, strategies, tokens, and strategy rewards destination, acting as a pseudo-registry that verifies the origin and destination of a transaction. The ",(0,r.jsx)(t.code,{children:"Controller"})," also handles strategy migration, moving funds from an old strategy to a new one."]}),"\n",(0,r.jsx)(t.h3,{id:"registry",children:"Registry"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-protocol/blob/develop/contracts/registries/YRegistry.sol",children:"YRegistry.sol"})}),"\n",(0,r.jsx)(t.p,{children:"The registry is a wrapper of the controller that contains additional meta-data about active addresses. Its functionality is currently being expanded."}),"\n",(0,r.jsx)(t.h3,{id:"strategies",children:"Strategies"}),"\n",(0,r.jsxs)(t.p,{children:["Example: ",(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-protocol/blob/develop/contracts/strategies/CurveYCRVVoter.sol",children:"CurveYCRVVoter.sol"})]}),"\n",(0,r.jsxs)(t.p,{children:["Strategies are investment instruction sets, written by a ",(0,r.jsx)(t.code,{children:"Strategist"}),". They are agnostic to the vaults that use them."]}),"\n",(0,r.jsx)(t.p,{children:"Strategies execute step-by-step functions with the objective to generate yield. They do so by interacting with:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"other Yearn services"}),", such as vaults, lending, and insurance; and"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"external 3rd party services"}),", such as Aave, Curve, Chainlink and Maker."]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["Rewards are claimed and re-invested into the strategies, with deductions for Management fees and for compensating the ",(0,r.jsx)(t.code,{children:"Strategist"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"treasury",children:"Treasury"}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"Treasury"})," contract accumulates all the Management fees sent from the strategies. It's an intermediate contract that can convert between different tokens, currently normalizing all rewards into yCRV. It calls two functions:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"toVoters()"}),", sending part of the fees to the governance voters, as a reward for their participation; and"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"toGovernance()"}),", sending part of the fees to the multi-sig to cover gas costs and other expenses."]}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"governance",children:"Governance"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-protocol/blob/develop/contracts/strategies/StrategyYFIGovernance.sol",children:"StrategyYFIGovernance.sol"})}),"\n",(0,r.jsx)(t.p,{children:"Yearn Governance is a combination of the YFI staking contract to participate in Governance voting, and the 6-of-9 multi-sig that executes the decisions by the YFI holders."}),"\n",(0,r.jsxs)(t.p,{children:["Governance manages the ",(0,r.jsx)(t.code,{children:"Vaults"}),", ",(0,r.jsx)(t.code,{children:"Controller"}),", and ",(0,r.jsx)(t.code,{children:"Strategies"})," by calling functions on these contracts."]}),"\n",(0,r.jsx)(t.h4,{id:"vault-management",children:"Vault management"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Set governing address"}),", through ",(0,r.jsx)(t.code,{children:"setGovernance()"}),", in order to upgrade governance contracts."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Set controller for the vault"}),", through ",(0,r.jsx)(t.code,{children:"setController()"}),", in order to upgrade controllers."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Set amount of disposable funds at hand in vault"}),", through ",(0,r.jsx)(t.code,{children:"setMin()"}),", in order to manage how large withdrawal amounts require a Vault to issue a withdrawal request to a Strategy, via the Controller."]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"controller-management",children:"Controller management"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Set governing address"}),", through ",(0,r.jsx)(t.code,{children:"setGovernance()"}),", in order to upgrade governance contracts."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Add vaults"})," for the Controller to manage, through ",(0,r.jsx)(t.code,{children:"setVault()"}),", in order to introduce new vaults."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Set address to receive management fees"}),", through ",(0,r.jsx)(t.code,{children:"setRewards()"})," in order to upgrade the Treasury."]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"strategy-management",children:"Strategy management"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Set Strategist address"}),", through ",(0,r.jsx)(t.code,{children:"setStrategist()"}),", in order for Strategists to receive their rewards and to interact with the system."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Add an approved Strategy"}),", through ",(0,r.jsx)(t.code,{children:"approveStrategy()"})," on the Controller, in order for Strategists to be able to activate the Strategy in question."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Remove an approved Strategy"}),", through ",(0,r.jsx)(t.code,{children:"revokeStrategy()"})," on the Controller, in order to prevent Strategists from being able to activate the Strategy in question."]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"protocol-actors",children:"Protocol Actors"}),"\n",(0,r.jsx)(t.h3,{id:"user",children:"User"}),"\n",(0,r.jsx)(t.p,{children:"A Yearn end-user."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Deposits funds into vaults, to receive LP tokens, through calling ",(0,r.jsx)(t.code,{children:"deposit()"}),";"]}),"\n",(0,r.jsxs)(t.li,{children:["Withdraws funds from vaults, by depositing (effectively burning) LP tokens into vaults and receiving the corresponding deposit token amount back in return, through calling ",(0,r.jsx)(t.code,{children:"withdraw()"}),". If the vault does not have enough funds to handle the withdrawal, this triggers a cascading ",(0,r.jsx)(t.code,{children:"withdraw()"})," call via the ",(0,r.jsx)(t.code,{children:"Controller"})," to the Strategy to liquidate enough funds to process the withdrawal."]}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"keeper",children:"Keeper"}),"\n",(0,r.jsx)(t.p,{children:"Automated bot that calls contract functions. It queries the Registry to get the appropriate Vault and Strategy addresses and then calls:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"earn()"})," on the Vault, which checks for funds available to be deposited into a Strategy and then deposits those."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"harvest()"})," on the Strategy, which triggers the Strategy claim any rewards, pay management and Strategist fees, and re-invest the remainder into itself again."]}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"strategist",children:"Strategist"}),"\n",(0,r.jsx)(t.p,{children:"Creates and manages Strategies."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Interacts with the Controller to set the active strategy, through ",(0,r.jsx)(t.code,{children:"setStrategy()"}),". ",(0,r.jsx)(t.strong,{children:"Only Strategies approved by Governance can be set."})]}),"\n",(0,r.jsx)(t.li,{children:"Is paid the Strategist management fee directly from the Strategy."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>i});var r=n(96540);const s={},o=r.createContext(s);function a(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);