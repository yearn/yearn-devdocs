"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[7917],{3905:(e,t,a)=>{a.d(t,{kt:()=>c});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),u=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),c=u(a),d=r,m=c["".concat(l,".").concat(d)]||c[d]||p[d]||o;return a?n.createElement(m,i(i({ref:t},h),{},{components:a})):n.createElement(m,i({ref:t},h))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<o;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},9586:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=a(7462),r=(a(7294),a(3905));const o={},i="Hacking on Yearn",s={unversionedId:"v2/hacking-with-yearn",id:"v2/hacking-with-yearn",title:"Hacking on Yearn",description:"This page is for the hackers and buidlers who are currently building, or planning to build, something cool with Yearn Finance. This guide details all the info you need to start hacking!",source:"@site/docs/developers/v2/hacking-with-yearn.md",sourceDirName:"v2",slug:"/v2/hacking-with-yearn",permalink:"/developers/v2/hacking-with-yearn",draft:!1,tags:[],version:"current",lastUpdatedAt:1693865708,formattedLastUpdatedAt:"9/4/2023",frontMatter:{},sidebar:"mySidebar",previous:{title:"Subgraph Queries",permalink:"/developers/v2/queries"},next:{title:"Fork Yearn UI: create a customized stablecoins-only vaults website",permalink:"/developers/v2/fork-yearn-ui"}},l={},u=[{value:"Getting Started",id:"getting-started",level:2},{value:"Starter Kit",id:"starter-kit",level:4},{value:"Testing",id:"testing",level:2},{value:"Introduction",id:"introduction",level:3},{value:"What do I need for testing?",id:"what-do-i-need-for-testing",level:3},{value:"How do I select a supported testnet?",id:"how-do-i-select-a-supported-testnet",level:4},{value:"Additional Resources",id:"additional-resources",level:4},{value:"Some of the research questions that we are interested in:",id:"some-of-the-research-questions-that-we-are-interested-in",level:2}],p={toc:u};function h(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"hacking-on-yearn"},"Hacking on Yearn"),(0,r.kt)("p",null,"This page is for the hackers and buidlers who are currently building, or planning to build, something cool with Yearn Finance. This guide details all the info you need to start hacking!"),(0,r.kt)("h1",{id:"core-tools"},"Core Tools"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.soliditylang.org/en/v0.8.6/index.html"},"Solidity")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://eth-brownie.readthedocs.io/en/stable/"},"Brownie")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.ethers.io/v5/"},"ethers.js")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://web3js.readthedocs.io/en/v1.4.0/"},"Web3.js")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://trufflesuite.com/ganache/"},"Ganache")," "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/nicolasgarcia214/damn-vulnerable-defi-foundry"},"Foundry"))),(0,r.kt)("h1",{id:"yearn-vaults--smart-contract-integrations"},"Yearn Vaults & Smart Contract Integrations"),(0,r.kt)("p",null,"Yearn\u2019s core product is the Vault (also known as yVault) \u2014 a set-it-and-forget-it yield aggregator running on top of DeFi\u2019s yield-generating protocols like Compound, Aave, Curve, and Convex."),(0,r.kt)("h2",{id:"getting-started"},"Getting Started"),(0,r.kt)("h4",{id:"starter-kit"},"Starter Kit"),(0,r.kt)("p",null,"Here's an example of integrating V2 vaults and ERC-4626.\xa0"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/storming0x/ystarter-foundry-kit"},"https://github.com/storming0x/ystarter-foundry-kit")),(0,r.kt)("p",null,"What you'll find:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Basic example Solidity Smart Contracts for integrating with Yearn Vaults for both V2 and ERC4626 interfaces."),(0,r.kt)("li",{parentName:"ul"},"ERC4626 adapter to wrap yearn vaults."),(0,r.kt)("li",{parentName:"ul"},"Example Contracts"),(0,r.kt)("li",{parentName:"ul"},"Sample test suite.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Yearn Vaults")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/yearn-vaults#readme"},"This repository")," includes the set of smart contracts that are used for the Yearn Vaults. It contains the requirements, code, deployment scripts, and tests necessary for the core protocol, including an inheritable template strategy for use with Solidity-based strategies that interact with Yearn Vaults. These contracts are used to create a simple way to generate high risk-adjusted returns for depositors of various assets via best-in-class lending protocols, liquidity pools, and community-made yield farming strategies on Ethereum."),(0,r.kt)("h2",{id:"testing"},"Testing"),(0,r.kt)("h3",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"You can test Yearn vaults without spending cryptoassets on the available testnet for each network. "),(0,r.kt)("p",null,"To get started, head to the yearn testnet client which is available at: ",(0,r.kt)("a",{parentName:"p",href:"https://hack.yearn.fi/"},"https://hack.yearn.fi/")),(0,r.kt)("p",null,"Make sure to switch your wallet provider to the appropriate testnet network in order to use the protocol testnet without incurring costs on the mainnet network. "),(0,r.kt)("p",null,"Testnet networks are different environments from mainnet and simulate real use cases for development, testing or production. The assets on a testnet are not \u201creal,\u201d meaning that they cannot be withdrawn to your wallet for any real economic value. "),(0,r.kt)("p",null,"Testing is possible through Ethereum Rinkeby  "),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Steps"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Deploy your vault with your own token"),(0,r.kt)("li",{parentName:"ul"},"Mint your own tokens "),(0,r.kt)("li",{parentName:"ul"},"Hack!")),(0,r.kt)("h3",{id:"what-do-i-need-for-testing"},"What do I need for testing?"),(0,r.kt)("p",null,"When accessing each testnet, you will need to use its own native asset token. "),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Steps to test"),": "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Go to ",(0,r.kt)("a",{parentName:"li",href:"https://hack.yearn.fi/"},"https://hack.yearn.fi/")),(0,r.kt)("li",{parentName:"ul"},"Switch to the testnet you wish to utilize over your wallet provider "),(0,r.kt)("li",{parentName:"ul"},"Make sure to have the native asset for the specific network "),(0,r.kt)("li",{parentName:"ul"},"Get some tokens from the test client faucet (Ethereum Rinkeby ",(0,r.kt)("a",{parentName:"li",href:"https://faucet.rinkeby.io/"},"https://faucet.rinkeby.io/"),")")),(0,r.kt)("p",null,"Make sure to select the correct market in the top right corner. You can find this on the left side of the address. Select the token you need and submit the faucet transaction but be mindful to make sure that you have certain amount of the native asset of the testnet you wish to transact on."),(0,r.kt)("h4",{id:"how-do-i-select-a-supported-testnet"},"How do I select a supported testnet?"),(0,r.kt)("p",null,"First, be sure to check if your wallet provider allows you to switch to testnet.  Some providers, such as the Metamask extension, display the network selection on top of the menu over the extension and, in the case of mobile Metamask, above the wallet section. It\u2019s important to always do your research for compatible wallets with compatible networks."),(0,r.kt)("h4",{id:"additional-resources"},"Additional Resources"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Workshop: Building and Integrating with Yearn Vaults: ",(0,r.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=urC35PMbpJ4"},"https://www.youtube.com/watch?v=urC35PMbpJ4"),"\n--\x3e Learn how to leverage the power of Yearn by creating a money-making integration on top of v2 vaults by taking advantage of the brand new EIP-4626: Tokenized Vault Standard! This workshop will guide you through creating a B2B/business router for yearn v2 vaults, which complies with the new EIP-4626. You'll be able to choose from multiple fee strategies for your users to maximize your profit."),(0,r.kt)("li",{parentName:"ul"},"Smart Contract parameters: ",(0,r.kt)("a",{parentName:"li",href:"https://docs.yearn.fi/vaults/smart-contracts/vault"},"https://docs.yearn.fi/vaults/smart-contracts/vault")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://hackmd.io/t8HlcedLQeCu2l7RG-5Vbw?view"},"https://hackmd.io/t8HlcedLQeCu2l7RG-5Vbw?view")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://twitter.com/storming0x/status/1436851219864059906?s=20"},"https://twitter.com/storming0x/status/1436851219864059906?s=20"))),(0,r.kt)("h1",{id:"front-end-integrations"},"Front-end Integrations"),(0,r.kt)("p",null,"Yearn uses a JavaScript SDK for formatting protocol data and generating transactions for reading/writing protocol data. Yearn SDK integrates several components, both on-chain and off-chain."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/turtlemoji/yearn-sdk-examples"},"The repository here")," contains a live preview and example usage of the Yearn SDK. Explore this codebase to learn how to start interacting with the Yearn protocol in your own app."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Live Preview\xa0Sandbox")),(0,r.kt)("p",null,"The following repository contains a live preview and example usage of the Yearn SDK. Explore this codebase to learn how to start:\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/turtlemoji/yearn-sdk-examples"},"https://github.com/turtlemoji/yearn-sdk-examples")),(0,r.kt)("h1",{id:"strategy-development"},"Strategy Development"),(0,r.kt)("p",null,"A Yearn Strategy is a set of smart contracts that implement different farming strategies that utilize the deposited assets to generate the best yields for users. "),(0,r.kt)("p",null,"The implementation of the strategies moves assets from one farming application to another one with higher interest. This will mostly be done automatically, which automatically monitors and tracks the best farming applications with high yield and low risks."),(0,r.kt)("p",null,"Rewards/profits generated by strategies are regularly updated, harvested, swapped for the original vault asset, and deposited again for compound farming. Each vault has a unique strategy and the strategy will be improved constantly based on the observations of our AI-based monitoring engines. "),(0,r.kt)("p",null,"By having a strategy, users only need to deposit single assets and let the strategies generate profits from the funds. Yearn automates the whole compounding process, making it as close to optimal as possible. "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/brownie-strategy-mix"},"https://github.com/yearn/brownie-strategy-mix"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Forking a Strategy Locally: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/yearn-vaults/blob/main/CONTRIBUTING.md"},"https://github.com/yearn/yearn-vaults/blob/main/CONTRIBUTING.md")))),(0,r.kt)("h1",{id:"data-analysis"},"Data Analysis"),(0,r.kt)("p",null,"Yearn aims to provide more insights into our products to our customers and partners through analyzing the on-chain and off-chain data. Given that all Yearn protocol data is publicly stored on-chain, there are lots of insights to be gained from analyzing these transactions. "),(0,r.kt)("p",null,"Two common tools for on-chain data analysis are:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Dune Analytics"),"- Query contract data and generate dashboards with SQL")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://dune.com/projects/yearn"},"Current Dashboards"),"  Here's a list of all the new things you can query for:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"harvests"),(0,r.kt)("li",{parentName:"ul"},"deployments"),(0,r.kt)("li",{parentName:"ul"},"transactions"),(0,r.kt)("li",{parentName:"ul"},"contract_tokens"),(0,r.kt)("li",{parentName:"ul"},"contract_strategy"),(0,r.kt)("li",{parentName:"ul"},"v2_deployments")))),(0,r.kt)("p",null,"Fiddle with them all at ",(0,r.kt)("a",{parentName:"p",href:"https://dune.com/queries/625814"},"https://dune.com/queries/625814")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"The Graph"),"- Query contract data with GQL using the Yearn subgraphs")),(0,r.kt)("p",null,"The Graph is a decentralized protocol for indexing and querying data from blockchains, starting with Ethereum. It is an easier way to retrieve specific data from the blockchain, within the ethos of web3, with the advantages of decentralization and reliability."),(0,r.kt)("p",null,"GraphQL is the underlying query language used in The Graph. "),(0,r.kt)("p",null,"What is the difference between standard RESTFUL API calls and GraphQL calls? The difference is that traditional APIs require the developers to create specific endpoints for users that return specific data. If the user requires more information, they may need to make multiple API calls, sometimes hundreds of API calls, to get the information they require. With The Graph (which uses GraphQL), only one call is needed to a subgraph, as long as the developer has created a flexible schema."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://thegraph.com/hosted-service/subgraph/rareweasel/yearn-vaults-v2-mainnet"},"https://thegraph.com/hosted-service/subgraph/rareweasel/yearn-vaults-v2-mainnet")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-mainnet/graphql"},"https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-mainnet/graphql"))),(0,r.kt)("h2",{id:"some-of-the-research-questions-that-we-are-interested-in"},"Some of the research questions that we are interested in:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Screening profitable liquidity pools for our strategies"),(0,r.kt)("li",{parentName:"ul"},"Assessing the impact of TVL on the impermanent loss"),(0,r.kt)("li",{parentName:"ul"},"Screening the volume of various pools"),(0,r.kt)("li",{parentName:"ul"},"Providing risk metrics to our vaults"),(0,r.kt)("li",{parentName:"ul"},"Price volatility of the underlying token"),(0,r.kt)("li",{parentName:"ul"},"Addressing the protocol risks"),(0,r.kt)("li",{parentName:"ul"},"Optimizing our strategies according to the change in gas fees"),(0,r.kt)("li",{parentName:"ul"},"Decide on when to deleverage and trade the governance tokens"),(0,r.kt)("li",{parentName:"ul"},"Decide on when to harvest"),(0,r.kt)("li",{parentName:"ul"},"Predicting impermanent loss for Uniswap V3 pools"),(0,r.kt)("li",{parentName:"ul"},"Portfolio construction across yearn products\nMore details on these topics can be seen in our issues tab.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Data Sources")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/yearn-sdk"},(0,r.kt)("strong",{parentName:"a"},"Yearn SDK"))," [",(0,r.kt)("a",{parentName:"p",href:"https://yearn.github.io/yearn-sdk/"},"Docs"),"]\n",(0,r.kt)("a",{parentName:"p",href:"https://docs.yearn.fi/vaults/yearn-sdk/yearn-stack"},"https://docs.yearn.fi/vaults/yearn-sdk/yearn-stack"),"\nIf you are not sure about which service you should first look into, Yearn SDK can provide you with addresses of contracts and endpoints of yearn\u2019s services."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/yearn-caching-api"},(0,r.kt)("strong",{parentName:"a"},"Yearn API"))," [",(0,r.kt)("a",{parentName:"p",href:"https://docs.yearn.fi/vaults/yearn-api"},"Docs"),"]\nYearn API can provide non-user specific metadata, including the tvl of vaults, apys, fees, and strategy metadata through REST API, without the need to make web3 calls."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://yearn.vision"},(0,r.kt)("strong",{parentName:"a"},"Yearn Vision")),"\nYearn Vision is the Grafana dashboard of the hosted version of ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/yearn-exporter"},"Yearn Exporter"),". You can download the historical metrics related to our vaults and strategies as json or csv files through the dashboard. For instructions on downloading, please see ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/explore/explore-inspector/#download-raw-query-results-as-csv"},"Downloading query results as csv"),"."),(0,r.kt)("h1",{id:"inspiration"},"Inspiration"),(0,r.kt)("p",null,"Common use-cases for vaults include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Using Vaults as collateral for lending/borrowing"),(0,r.kt)("li",{parentName:"ul"},"Using Vaults to generate yield with user funds")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"In both cases, the protocol integrating with yearn is rewarded with performance fees taken from the vault\u2019s overall profits, the more total volume that a partner contributes to a vault, the bigger share of the profit they receive.")),(0,r.kt)("p",null,"Hundreds of protocols have built exciting functionalities using Yearn\u2019s integration methods. These include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Alchemix provides self-repaying loans using vault yields"),(0,r.kt)("li",{parentName:"ul"},"Abracadabra provided the first yVault leveraging system that allows users to take loans and keep the yield rolling"),(0,r.kt)("li",{parentName:"ul"},"QiDao provides 0% interest loans if you use yVaults as collateral")),(0,r.kt)("p",null,"Here are some ideas on what you can build:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Use the Vaults as collateral to borrow money and probably get some leverage. (e.g. Abracadabra)"),(0,r.kt)("li",{parentName:"ol"},"Build a product that allows you to use yield to do cool stuff:\ndonate yield to an NGO\ninvest the yield in more risky stuff or directional bets\npaying bills and subscriptions"),(0,r.kt)("li",{parentName:"ol"},"Create a metavault on top of multiple vaults. One idea that comes to my mind is having a USD metavault that deposits into multiple dollar-pegged vaults based on some strategy and abstracts the complexity from the user."),(0,r.kt)("li",{parentName:"ol"},"Build a UI that accepts deposits and allows you to move assets across chains."),(0,r.kt)("li",{parentName:"ol"},"Use the vaults as a place to earn interest on funds that are not currently actively being used by the user.")),(0,r.kt)("h1",{id:"examples"},"Examples"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/Tburm/tracer-vault"},(0,r.kt)("strong",{parentName:"a"},"Skew You")),": Users can borrow against their options collateral, unlocking a whole new world of capital efficiency."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/Possum-ONE"},(0,r.kt)("strong",{parentName:"a"},"Possum")),": Fixed-income product that can turn every farm into two fix/variable pools. Based on the game model, fixed pool users can have guaranteed APY while the variable user gets higher APY with higher risk."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ShayanJa/bowtie_finance"},(0,r.kt)("strong",{parentName:"a"},"Bowtie")),": Allows users to borrow against their options collateral."),(0,r.kt)("p",null,"Additionally, doing a GitHub search for Yearn functionality you are interested in implementing is a good way to find working code examples."),(0,r.kt)("h1",{id:"expectations"},"Expectations"),(0,r.kt)("p",null,"Here are some guidelines on how to maximize your chances of 'winning':"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Have your code well documented on Github."),(0,r.kt)("li",{parentName:"ul"},"Have a front end!"),(0,r.kt)("li",{parentName:"ul"},"If you created a contract, deploy them to a testnet and ensure your front end properly interacts with them."),(0,r.kt)("li",{parentName:"ul"},"Implement something interesting with your Yearn integration. Simply calling deposit() will not help your submission stand out!")),(0,r.kt)("h1",{id:"resources"},"Resources"),(0,r.kt)("p",null,"Yearn GitHub Organization: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/"},"https://github.com/yearn/")),(0,r.kt)("p",null,"Yearn V2 Documentation: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/yearn/yearn-vaults"},"https://github.com/yearn/yearn-vaults")))}h.isMDXComponent=!0}}]);