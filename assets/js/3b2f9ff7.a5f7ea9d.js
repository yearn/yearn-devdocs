"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[2980],{43151:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var s=n(74848),r=n(28453);const i={},a="Hacking on Yearn",o={id:"v2/hacking-with-yearn",title:"Hacking on Yearn",description:"This page is for the hackers and buidlers who are currently building, or planning to build, something cool with Yearn Finance. This guide details all the info you need to start hacking!",source:"@site/docs/developers/v2/hacking-with-yearn.md",sourceDirName:"v2",slug:"/v2/hacking-with-yearn",permalink:"/developers/v2/hacking-with-yearn",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1693865708e3,frontMatter:{},sidebar:"mySidebar",previous:{title:"Yearn API",permalink:"/developers/v2/yearn-api"},next:{title:"Fork Yearn UI: create a customized stablecoins-only vaults website",permalink:"/developers/v2/fork-yearn-ui"}},l={},h=[{value:"Getting Started",id:"getting-started",level:2},{value:"Starter Kit",id:"starter-kit",level:4},{value:"Testing",id:"testing",level:2},{value:"Introduction",id:"introduction",level:3},{value:"What do I need for testing?",id:"what-do-i-need-for-testing",level:3},{value:"How do I select a supported testnet?",id:"how-do-i-select-a-supported-testnet",level:4},{value:"Additional Resources",id:"additional-resources",level:4},{value:"Some of the research questions that we are interested in:",id:"some-of-the-research-questions-that-we-are-interested-in",level:2}];function d(e){const t={a:"a",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"hacking-on-yearn",children:"Hacking on Yearn"}),"\n",(0,s.jsx)(t.p,{children:"This page is for the hackers and buidlers who are currently building, or planning to build, something cool with Yearn Finance. This guide details all the info you need to start hacking!"}),"\n",(0,s.jsx)(t.h1,{id:"core-tools",children:"Core Tools"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://docs.soliditylang.org/en/v0.8.6/index.html",children:"Solidity"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://eth-brownie.readthedocs.io/en/stable/",children:"Brownie"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://docs.ethers.io/v5/",children:"ethers.js"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://web3js.readthedocs.io/en/v1.4.0/",children:"Web3.js"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://trufflesuite.com/ganache/",children:"Ganache"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/nicolasgarcia214/damn-vulnerable-defi-foundry",children:"Foundry"})}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"yearn-vaults--smart-contract-integrations",children:"Yearn Vaults & Smart Contract Integrations"}),"\n",(0,s.jsx)(t.p,{children:"Yearn\u2019s core product is the Vault (also known as yVault) \u2014 a set-it-and-forget-it yield aggregator running on top of DeFi\u2019s yield-generating protocols like Compound, Aave, Curve, and Convex."}),"\n",(0,s.jsx)(t.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,s.jsx)(t.h4,{id:"starter-kit",children:"Starter Kit"}),"\n",(0,s.jsx)(t.p,{children:"Here's an example of integrating V2 vaults and ERC-4626.\xa0"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://github.com/storming0x/ystarter-foundry-kit",children:"https://github.com/storming0x/ystarter-foundry-kit"})}),"\n",(0,s.jsx)(t.p,{children:"What you'll find:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Basic example Solidity Smart Contracts for integrating with Yearn Vaults for both V2 and ERC4626 interfaces."}),"\n",(0,s.jsx)(t.li,{children:"ERC4626 adapter to wrap yearn vaults."}),"\n",(0,s.jsx)(t.li,{children:"Example Contracts"}),"\n",(0,s.jsx)(t.li,{children:"Sample test suite."}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Yearn Vaults"})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/yearn/yearn-vaults#readme",children:"This repository"})," includes the set of smart contracts that are used for the Yearn Vaults. It contains the requirements, code, deployment scripts, and tests necessary for the core protocol, including an inheritable template strategy for use with Solidity-based strategies that interact with Yearn Vaults. These contracts are used to create a simple way to generate high risk-adjusted returns for depositors of various assets via best-in-class lending protocols, liquidity pools, and community-made yield farming strategies on Ethereum."]}),"\n",(0,s.jsx)(t.h2,{id:"testing",children:"Testing"}),"\n",(0,s.jsx)(t.h3,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(t.p,{children:"You can test Yearn vaults without spending cryptoassets on the available testnet for each network."}),"\n",(0,s.jsxs)(t.p,{children:["To get started, head to the yearn testnet client which is available at: ",(0,s.jsx)(t.a,{href:"https://hack.yearn.fi/",children:"https://hack.yearn.fi/"})]}),"\n",(0,s.jsx)(t.p,{children:"Make sure to switch your wallet provider to the appropriate testnet network in order to use the protocol testnet without incurring costs on the mainnet network."}),"\n",(0,s.jsx)(t.p,{children:"Testnet networks are different environments from mainnet and simulate real use cases for development, testing or production. The assets on a testnet are not \u201creal,\u201d meaning that they cannot be withdrawn to your wallet for any real economic value."}),"\n",(0,s.jsx)(t.p,{children:"Testing is possible through Ethereum Rinkeby"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Steps"}),":"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Deploy your vault with your own token"}),"\n",(0,s.jsx)(t.li,{children:"Mint your own tokens"}),"\n",(0,s.jsx)(t.li,{children:"Hack!"}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"what-do-i-need-for-testing",children:"What do I need for testing?"}),"\n",(0,s.jsx)(t.p,{children:"When accessing each testnet, you will need to use its own native asset token."}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Steps to test"}),":"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Go to ",(0,s.jsx)(t.a,{href:"https://hack.yearn.fi/",children:"https://hack.yearn.fi/"})]}),"\n",(0,s.jsx)(t.li,{children:"Switch to the testnet you wish to utilize over your wallet provider"}),"\n",(0,s.jsx)(t.li,{children:"Make sure to have the native asset for the specific network"}),"\n",(0,s.jsxs)(t.li,{children:["Get some tokens from the test client faucet (Ethereum Rinkeby ",(0,s.jsx)(t.a,{href:"https://faucet.rinkeby.io/",children:"https://faucet.rinkeby.io/"}),")"]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Make sure to select the correct market in the top right corner. You can find this on the left side of the address. Select the token you need and submit the faucet transaction but be mindful to make sure that you have certain amount of the native asset of the testnet you wish to transact on."}),"\n",(0,s.jsx)(t.h4,{id:"how-do-i-select-a-supported-testnet",children:"How do I select a supported testnet?"}),"\n",(0,s.jsx)(t.p,{children:"First, be sure to check if your wallet provider allows you to switch to testnet.  Some providers, such as the Metamask extension, display the network selection on top of the menu over the extension and, in the case of mobile Metamask, above the wallet section. It\u2019s important to always do your research for compatible wallets with compatible networks."}),"\n",(0,s.jsx)(t.h4,{id:"additional-resources",children:"Additional Resources"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Workshop: Building and Integrating with Yearn Vaults: ",(0,s.jsx)(t.a,{href:"https://www.youtube.com/watch?v=urC35PMbpJ4",children:"https://www.youtube.com/watch?v=urC35PMbpJ4"}),"\n--\x3e Learn how to leverage the power of Yearn by creating a money-making integration on top of v2 vaults by taking advantage of the brand new EIP-4626: Tokenized Vault Standard! This workshop will guide you through creating a B2B/business router for yearn v2 vaults, which complies with the new EIP-4626. You'll be able to choose from multiple fee strategies for your users to maximize your profit."]}),"\n",(0,s.jsxs)(t.li,{children:["Smart Contract parameters: ",(0,s.jsx)(t.a,{href:"https://docs.yearn.fi/vaults/smart-contracts/vault",children:"https://docs.yearn.fi/vaults/smart-contracts/vault"})]}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://hackmd.io/t8HlcedLQeCu2l7RG-5Vbw?view",children:"https://hackmd.io/t8HlcedLQeCu2l7RG-5Vbw?view"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://twitter.com/storming0x/status/1436851219864059906?s=20",children:"https://twitter.com/storming0x/status/1436851219864059906?s=20"})}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"front-end-integrations",children:"Front-end Integrations"}),"\n",(0,s.jsx)(t.p,{children:"Yearn uses a JavaScript SDK for formatting protocol data and generating transactions for reading/writing protocol data. Yearn SDK integrates several components, both on-chain and off-chain."}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/turtlemoji/yearn-sdk-examples",children:"The repository here"})," contains a live preview and example usage of the Yearn SDK. Explore this codebase to learn how to start interacting with the Yearn protocol in your own app."]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Live Preview\xa0Sandbox"})}),"\n",(0,s.jsxs)(t.p,{children:["The following repository contains a live preview and example usage of the Yearn SDK. Explore this codebase to learn how to start:\n",(0,s.jsx)(t.a,{href:"https://github.com/turtlemoji/yearn-sdk-examples",children:"https://github.com/turtlemoji/yearn-sdk-examples"})]}),"\n",(0,s.jsx)(t.h1,{id:"strategy-development",children:"Strategy Development"}),"\n",(0,s.jsx)(t.p,{children:"A Yearn Strategy is a set of smart contracts that implement different farming strategies that utilize the deposited assets to generate the best yields for users."}),"\n",(0,s.jsx)(t.p,{children:"The implementation of the strategies moves assets from one farming application to another one with higher interest. This will mostly be done automatically, which automatically monitors and tracks the best farming applications with high yield and low risks."}),"\n",(0,s.jsx)(t.p,{children:"Rewards/profits generated by strategies are regularly updated, harvested, swapped for the original vault asset, and deposited again for compound farming. Each vault has a unique strategy and the strategy will be improved constantly based on the observations of our AI-based monitoring engines."}),"\n",(0,s.jsx)(t.p,{children:"By having a strategy, users only need to deposit single assets and let the strategies generate profits from the funds. Yearn automates the whole compounding process, making it as close to optimal as possible."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://github.com/yearn/brownie-strategy-mix",children:"https://github.com/yearn/brownie-strategy-mix"})}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["Forking a Strategy Locally: ",(0,s.jsx)(t.a,{href:"https://github.com/yearn/yearn-vaults/blob/main/CONTRIBUTING.md",children:"https://github.com/yearn/yearn-vaults/blob/main/CONTRIBUTING.md"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"data-analysis",children:"Data Analysis"}),"\n",(0,s.jsx)(t.p,{children:"Yearn aims to provide more insights into our products to our customers and partners through analyzing the on-chain and off-chain data. Given that all Yearn protocol data is publicly stored on-chain, there are lots of insights to be gained from analyzing these transactions."}),"\n",(0,s.jsx)(t.p,{children:"Two common tools for on-chain data analysis are:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Dune Analytics"}),"- Query contract data and generate dashboards with SQL"]}),"\n"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://dune.com/projects/yearn",children:"Current Dashboards"})}),"\n",(0,s.jsx)(t.p,{children:"Here's a list of all the new things you can query for:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"harvests"}),"\n",(0,s.jsx)(t.li,{children:"deployments"}),"\n",(0,s.jsx)(t.li,{children:"transactions"}),"\n",(0,s.jsx)(t.li,{children:"contract_tokens"}),"\n",(0,s.jsx)(t.li,{children:"contract_strategy"}),"\n",(0,s.jsx)(t.li,{children:"v2_deployments"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Fiddle with them all at ",(0,s.jsx)(t.a,{href:"https://dune.com/queries/625814",children:"https://dune.com/queries/625814"})]}),"\n",(0,s.jsxs)(t.ol,{start:"2",children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"The Graph"}),"- Query contract data with GQL using the Yearn subgraphs"]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"The Graph is a decentralized protocol for indexing and querying data from blockchains, starting with Ethereum. It is an easier way to retrieve specific data from the blockchain, within the ethos of web3, with the advantages of decentralization and reliability."}),"\n",(0,s.jsx)(t.p,{children:"GraphQL is the underlying query language used in The Graph."}),"\n",(0,s.jsx)(t.p,{children:"What is the difference between standard RESTFUL API calls and GraphQL calls? The difference is that traditional APIs require the developers to create specific endpoints for users that return specific data. If the user requires more information, they may need to make multiple API calls, sometimes hundreds of API calls, to get the information they require. With The Graph (which uses GraphQL), only one call is needed to a subgraph, as long as the developer has created a flexible schema."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://thegraph.com/hosted-service/subgraph/rareweasel/yearn-vaults-v2-mainnet",children:"https://thegraph.com/hosted-service/subgraph/rareweasel/yearn-vaults-v2-mainnet"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-mainnet/graphql",children:"https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-mainnet/graphql"})}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"some-of-the-research-questions-that-we-are-interested-in",children:"Some of the research questions that we are interested in:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Screening profitable liquidity pools for our strategies"}),"\n",(0,s.jsx)(t.li,{children:"Assessing the impact of TVL on the impermanent loss"}),"\n",(0,s.jsx)(t.li,{children:"Screening the volume of various pools"}),"\n",(0,s.jsx)(t.li,{children:"Providing risk metrics to our vaults"}),"\n",(0,s.jsx)(t.li,{children:"Price volatility of the underlying token"}),"\n",(0,s.jsx)(t.li,{children:"Addressing the protocol risks"}),"\n",(0,s.jsx)(t.li,{children:"Optimizing our strategies according to the change in gas fees"}),"\n",(0,s.jsx)(t.li,{children:"Decide on when to deleverage and trade the governance tokens"}),"\n",(0,s.jsx)(t.li,{children:"Decide on when to harvest"}),"\n",(0,s.jsx)(t.li,{children:"Predicting impermanent loss for Uniswap V3 pools"}),"\n",(0,s.jsx)(t.li,{children:"Portfolio construction across yearn products\nMore details on these topics can be seen in our issues tab."}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Data Sources"})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/yearn/yearn-sdk",children:(0,s.jsx)(t.strong,{children:"Yearn SDK"})})," [",(0,s.jsx)(t.a,{href:"https://yearn.github.io/yearn-sdk/",children:"Docs"}),"]\n",(0,s.jsx)(t.a,{href:"https://docs.yearn.fi/vaults/yearn-sdk/yearn-stack",children:"https://docs.yearn.fi/vaults/yearn-sdk/yearn-stack"}),"\nIf you are not sure about which service you should first look into, Yearn SDK can provide you with addresses of contracts and endpoints of yearn\u2019s services."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/yearn/yearn-caching-api",children:(0,s.jsx)(t.strong,{children:"Yearn API"})})," [",(0,s.jsx)(t.a,{href:"https://docs.yearn.fi/vaults/yearn-api",children:"Docs"}),"]\nYearn API can provide non-user specific metadata, including the tvl of vaults, apys, fees, and strategy metadata through REST API, without the need to make web3 calls."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://yearn.vision",children:(0,s.jsx)(t.strong,{children:"Yearn Vision"})}),"\nYearn Vision is the Grafana dashboard of the hosted version of ",(0,s.jsx)(t.a,{href:"https://github.com/yearn/yearn-exporter",children:"Yearn Exporter"}),". You can download the historical metrics related to our vaults and strategies as json or csv files through the dashboard. For instructions on downloading, please see ",(0,s.jsx)(t.a,{href:"https://grafana.com/docs/grafana/latest/explore/explore-inspector/#download-raw-query-results-as-csv",children:"Downloading query results as csv"}),"."]}),"\n",(0,s.jsx)(t.h1,{id:"inspiration",children:"Inspiration"}),"\n",(0,s.jsx)(t.p,{children:"Common use-cases for vaults include:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Using Vaults as collateral for lending/borrowing"}),"\n",(0,s.jsx)(t.li,{children:"Using Vaults to generate yield with user funds"}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"In both cases, the protocol integrating with yearn is rewarded with performance fees taken from the vault\u2019s overall profits, the more total volume that a partner contributes to a vault, the bigger share of the profit they receive."})}),"\n",(0,s.jsx)(t.p,{children:"Hundreds of protocols have built exciting functionalities using Yearn\u2019s integration methods. These include:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Alchemix provides self-repaying loans using vault yields"}),"\n",(0,s.jsx)(t.li,{children:"Abracadabra provided the first yVault leveraging system that allows users to take loans and keep the yield rolling"}),"\n",(0,s.jsx)(t.li,{children:"QiDao provides 0% interest loans if you use yVaults as collateral"}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Here are some ideas on what you can build:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:"Use the Vaults as collateral to borrow money and probably get some leverage. (e.g. Abracadabra)"}),"\n",(0,s.jsx)(t.li,{children:"Build a product that allows you to use yield to do cool stuff:\ndonate yield to an NGO\ninvest the yield in more risky stuff or directional bets\npaying bills and subscriptions"}),"\n",(0,s.jsx)(t.li,{children:"Create a metavault on top of multiple vaults. One idea that comes to my mind is having a USD metavault that deposits into multiple dollar-pegged vaults based on some strategy and abstracts the complexity from the user."}),"\n",(0,s.jsx)(t.li,{children:"Build a UI that accepts deposits and allows you to move assets across chains."}),"\n",(0,s.jsx)(t.li,{children:"Use the vaults as a place to earn interest on funds that are not currently actively being used by the user."}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/Tburm/tracer-vault",children:(0,s.jsx)(t.strong,{children:"Skew You"})}),": Users can borrow against their options collateral, unlocking a whole new world of capital efficiency."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/Possum-ONE",children:(0,s.jsx)(t.strong,{children:"Possum"})}),": Fixed-income product that can turn every farm into two fix/variable pools. Based on the game model, fixed pool users can have guaranteed APY while the variable user gets higher APY with higher risk."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/ShayanJa/bowtie_finance",children:(0,s.jsx)(t.strong,{children:"Bowtie"})}),": Allows users to borrow against their options collateral."]}),"\n",(0,s.jsx)(t.p,{children:"Additionally, doing a GitHub search for Yearn functionality you are interested in implementing is a good way to find working code examples."}),"\n",(0,s.jsx)(t.h1,{id:"expectations",children:"Expectations"}),"\n",(0,s.jsx)(t.p,{children:"Here are some guidelines on how to maximize your chances of 'winning':"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Have your code well documented on Github."}),"\n",(0,s.jsx)(t.li,{children:"Have a front end!"}),"\n",(0,s.jsx)(t.li,{children:"If you created a contract, deploy them to a testnet and ensure your front end properly interacts with them."}),"\n",(0,s.jsx)(t.li,{children:"Implement something interesting with your Yearn integration. Simply calling deposit() will not help your submission stand out!"}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"resources",children:"Resources"}),"\n",(0,s.jsxs)(t.p,{children:["Yearn GitHub Organization: ",(0,s.jsx)(t.a,{href:"https://github.com/yearn/",children:"https://github.com/yearn/"})]}),"\n",(0,s.jsxs)(t.p,{children:["Yearn V2 Documentation: ",(0,s.jsx)(t.a,{href:"https://github.com/yearn/yearn-vaults",children:"https://github.com/yearn/yearn-vaults"})]})]})}function c(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var s=n(96540);const r={},i=s.createContext(r);function a(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);