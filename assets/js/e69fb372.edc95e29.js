"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[101],{56636:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>n,metadata:()=>i,toc:()=>d});var a=r(74848),s=r(28453);const n={},o="Vault Factory",i={id:"products/yvaults/vault-factory",title:"Vault Factory",description:"Yearn's Vault Factory allows anyone to permissionlessly deploy an official Yearn Vault with ready-made yield strategies.",source:"@site/docs/getting-started/products/yvaults/vault-factory.md",sourceDirName:"products/yvaults",slug:"/products/yvaults/vault-factory",permalink:"/getting-started/products/yvaults/vault-factory",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1708445498e3,frontMatter:{},sidebar:"mySidebar",previous:{title:"Overview",permalink:"/getting-started/products/yvaults/v3"},next:{title:"Overview",permalink:"/getting-started/products/veyfi"}},l={},d=[{value:"Harvests: Traditional vs. Factory Strategies",id:"harvests-traditional-vs-factory-strategies",level:2},{value:"Traditional Strategies",id:"traditional-strategies",level:3},{value:"Factory Strategies",id:"factory-strategies",level:3},{value:"Calling Harvest",id:"calling-harvest",level:3},{value:"Curve LP Tokens",id:"curve-lp-tokens",level:2},{value:"Curve Strategies",id:"curve-strategies",level:3},{value:"Velodrome LP Tokens",id:"velodrome-lp-tokens",level:2},{value:"Balancer LP Tokens",id:"balancer-lp-tokens",level:2},{value:"Balancer Strategies",id:"balancer-strategies",level:3},{value:"Aerodrome LP Tokens",id:"aerodrome-lp-tokens",level:2},{value:"Determine Accumulated Rewards",id:"determine-accumulated-rewards",level:2},{value:"Curve Strategy",id:"curve-strategy",level:3},{value:"Convex and Convex Frax Strategies",id:"convex-and-convex-frax-strategies",level:3},{value:"Contracts",id:"contracts",level:2},{value:"Ethereum",id:"ethereum",level:3},{value:"Optimism",id:"optimism",level:3},{value:"Base",id:"base",level:3},{value:"Create with UI",id:"create-with-ui",level:2},{value:"Create from Contract",id:"create-from-contract",level:2}];function c(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"vault-factory",children:"Vault Factory"}),"\n",(0,a.jsx)(t.p,{children:"Yearn's Vault Factory allows anyone to permissionlessly deploy an official Yearn Vault with ready-made yield strategies."}),"\n",(0,a.jsx)(t.p,{children:"The easiest way to get started using the factory is through the User Interface:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://yearn.fi/vaults/factory",children:"https://yearn.fi/vaults/factory"})," - ",(0,a.jsx)(t.a,{href:"#create-with-ui",children:"Tutorial"})]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"The current version of the Vault Factory works with the following:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"#Curve-LP-Tokens",children:"Curve LP Tokens"})}),"\n",(0,a.jsx)(t.li,{children:"Balancer LP Tokens (soon)"}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"The Vault Factory is a massive step forward in automation. We're significantly reducing our operational costs for all vaults deployed with this new method. Here's the fee structure for them:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"0% management fee (previously 2%)"}),"\n",(0,a.jsx)(t.li,{children:"10% performance fee (previously 20%)"}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["Performance fees for every type of yVault go straight to Yearn treasury (",(0,a.jsx)(t.a,{href:"https://etherscan.io/address/0x93a62da5a14c80f265dabc077fcee437b1a0efde",children:"treasury.ychad.eth"}),") and are calculated only on top of harvest profits. The current fee structure for each yVault can be seen directly on the new ",(0,a.jsx)(t.a,{href:"https://yearn.fi/vaults",children:"yearn.fi"})," website by clicking on the vault."]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/0QIydKb.png",width:"500"}),"\n",(0,a.jsx)(t.p,{children:'Only one factory vault can be live for each token, so the Vault Factory will only deploy a new yVault if there is no vault for that token already deployed (excluding "legacy" vaults, though factory versions of these must be deployed from one of Yearn\'s multisigs).'}),"\n",(0,a.jsx)(t.h2,{id:"harvests-traditional-vs-factory-strategies",children:"Harvests: Traditional vs. Factory Strategies"}),"\n",(0,a.jsx)(t.p,{children:"Factory vaults introduced a key change in the harvest process, enabling permissionless harvests (meaning anyone willing to pay transaction costs can perform them). Here is how harvests work in each case:"}),"\n",(0,a.jsx)(t.h3,{id:"traditional-strategies",children:"Traditional Strategies"}),"\n",(0,a.jsx)(t.p,{children:"Traditional strategies have the token swap logic directly embedded in them. As a result, a harvest call simultaneously performs debt rebalances and converts them into realized profits in one transaction."}),"\n",(0,a.jsx)(t.h3,{id:"factory-strategies",children:"Factory Strategies"}),"\n",(0,a.jsx)(t.p,{children:"Factory strategies separate swap logic from the strategy, executing it in a different transaction from the harvest. This ensures that swap transactions remain permissioned, safeguarding them from Miner Extractable Value (MEV) attacks."}),"\n",(0,a.jsxs)(t.p,{children:["Harvests in factory strategies still rebalance debt between strategies and allocate idle funds to strategies, pulling accumulated rewards into the strategy contract to be swapped by the ySwaps team. Once swaps are completed, which may take several days, anyone can call harvest a second time to acknowledge the profit generated by the swap and distribute it to the vault, making ",(0,a.jsx)(t.code,{children:"pricePerShare"})," increase."]}),"\n",(0,a.jsx)(t.p,{children:"Although harvests will be permissionless for this specific group of vaults, Yearn will continue utilizing standard keeper automation to call harvests, even if no one else does. These automated harvests are run by keep3r.network and often depend on network congestion and transaction viability. For example, if the network conditions are consistently unfavorable, harvests may have delays."}),"\n",(0,a.jsx)(t.h3,{id:"calling-harvest",children:"Calling Harvest"}),"\n",(0,a.jsxs)(t.p,{children:["To call the ",(0,a.jsx)(t.code,{children:"harvest()"})," function on a Yearn strategy, you need to interact with the keeper contract found at ",(0,a.jsx)(t.a,{href:"https://etherscan.io/address/keeper.factory.ychad.eth#writeContract",children:"keeper.factory.ychad.eth"})," using the strategy address. Ensure you're calling ",(0,a.jsx)(t.code,{children:"harvest()"})," on the correct contract: ",(0,a.jsx)(t.strong,{children:"You MUST use the strategy address, NOT the vault address"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"If you're unsure how to find the strategy address, the best method is to visit the Yearn vault's detail page and look under the \"Strategies\" section. This section provides information on the debt ratios and the addresses for all strategies attached to the vault."}),"\n",(0,a.jsxs)(t.p,{children:["For example, if you're interested in the vault at address ",(0,a.jsx)(t.code,{children:"0xFfA0F0616229eE2aC08FA4C358D23b18D980134B"})," you can see the list of strategies addresses at ",(0,a.jsx)(t.a,{href:"https://yearn.fi/vaults/1/0xFfA0F0616229eE2aC08FA4C358D23b18D980134B?tab=strategies",children:"yearn.fi/vaults/1/0xFfA0F0616229eE2aC08FA4C358D23b18D980134B?tab=strategies"}),":"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:"https://i.imgur.com/LO6E8hw.png",alt:"Strategy Address Location"})}),"\n",(0,a.jsxs)(t.p,{children:["Once you have the correct strategy address, go to the keeper contract on Etherscan, connect your wallet, enter the strategy address into the ",(0,a.jsx)(t.code,{children:"harvest()"})," function, and execute the transaction by clicking \u201cWrite\u201d."]}),"\n",(0,a.jsx)(t.h2,{id:"curve-lp-tokens",children:"Curve LP Tokens"}),"\n",(0,a.jsx)(t.p,{children:"The first Vault Factory deployed live on Ethereum is the Curve LP Token Vault Factory. This factory allows users to deploy yVaults for any Curve LP token representing a Curve pool with an active gauge (allowing it to receive CRV emissions)."}),"\n",(0,a.jsx)(t.h3,{id:"curve-strategies",children:"Curve Strategies"}),"\n",(0,a.jsx)(t.p,{children:"Factory-deployed yVaults for Curve LP tokens contain up to three ready-made yield strategies:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:"StrategyCurveBoostedFactory"}),"\n",(0,a.jsx)(t.li,{children:"StrategyConvexFactory"}),"\n",(0,a.jsx)(t.li,{children:"StrategyConvexFraxFactory"}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"StrategyCurveBoostedFactory"})," uses Yearn's veCRV balance (currently ",(0,a.jsx)(t.a,{href:"https://yearn.fi/ycrv",children:"62.8m"}),") to give users the maximum 2.5x boost on their CRV rewards."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"StrategyConvexFactory"})," supplies any additional Curve LP tokens (beyond which would receive the maximum 2.5x boost via the Curve strategy) to Convex Finance to earn CRV rewards (boosted by Convex's veCRV balance) and CVX rewards."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"StrategyConvexFraxFactory"})," will only be added to the vault if the Curve LP token of the vault can be staked in Convex for Frax (currently available for over 20 Curve LPs). This ConvexFrax strategy will be used instead of the standard Convex strategy to earn additional FXS rewards (on top of the standard CRV and CVX rewards)."]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/oJdwz6n.png"}),"\n",(0,a.jsx)(t.p,{children:"In all three strategies, any earned tokens are regularly claimed, sold for more of the underlying Curve LP token, and then deposited back into the strategy to compound the yield."}),"\n",(0,a.jsx)(t.h2,{id:"velodrome-lp-tokens",children:"Velodrome LP Tokens"}),"\n",(0,a.jsx)(t.p,{children:"On Optimism, we have deployed the Velodrome LP Token Vault Factory. Several vaults have already been deployed and users can now permissionlessly deploy a new vault for any Velodrome V2 pool. The strategy collects VELO emissions from gauge incentives, swaps them for the LP token making auto-compounding effortless! At the moment, harvests for the Velodrome Vault Factory are permissioned and called regularly by keepers."}),"\n",(0,a.jsx)(t.h2,{id:"balancer-lp-tokens",children:"Balancer LP Tokens"}),"\n",(0,a.jsx)(t.p,{children:"Balancer is another protocol we have integrated with our Vault Factory. The process is nearly identical to the Curve integration, with a few key differences relating to the unique features of Balancer."}),"\n",(0,a.jsx)(t.h3,{id:"balancer-strategies",children:"Balancer Strategies"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"StrategyAuraFactory"})," is currently the only strategy used for Balancer factory vaults. It leverages the Aura rewards program on Balancer to earn additional yield."]}),"\n",(0,a.jsx)(t.p,{children:"The main difference between Balancer and Curve lies in their respective veTokens. Balancer's veBAL is their LP token (an 80/20 BAL/WETH pair), and their maximum lock duration is 1 year (compared to 4 on Curve). Unlike our Curve strategies where we use our veCRV balance to boost rewards, we currently do not have a large amount of veBAL in the treasury. Therefore, the strategy focuses on earning Aura rewards."}),"\n",(0,a.jsx)(t.h2,{id:"aerodrome-lp-tokens",children:"Aerodrome LP Tokens"}),"\n",(0,a.jsx)(t.p,{children:"On Base, we have deployed the Aerodrome LP Token Vault Factory. Aerodrome is a fork of Velodrome V2 and was deployed by the Velodrome team on Base."}),"\n",(0,a.jsx)(t.p,{children:"The Aerodrome Vault Factory works identically to the Velodrome Factory. It allows users to deploy new vaults permissionlessly for any Aerodrome V2 pool. The strategy collects AERO emissions from gauge incentives, which are sold for the LP token, making auto-compounding effortless."}),"\n",(0,a.jsx)(t.p,{children:"Like with the Velodrome Vault Factory, harvests for the Aerodrome Vault Factory are permissioned and regularly called by keepers."}),"\n",(0,a.jsx)(t.h2,{id:"determine-accumulated-rewards",children:"Determine Accumulated Rewards"}),"\n",(0,a.jsxs)(t.p,{children:["This section helps you know how much profit has accumulated, but calling harvest will ",(0,a.jsx)(t.strong,{children:"not"})," recognize profits unless they are sitting in the strategy's contract address. Also if there are reward tokens in the strategy's contract, those values should be added to your calculation in the section below."]}),"\n",(0,a.jsx)(t.h3,{id:"curve-strategy",children:"Curve Strategy"}),"\n",(0,a.jsxs)(t.p,{children:["For curve strategies, you can view how much rewards have accumulated for that vault by using Curve.Fi's ",(0,a.jsx)(t.a,{href:"https://curve.fi/#/ethereum/dashboard",children:"dashboard"})," and putting in Yearn's Curve Voter Proxy address ",(0,a.jsx)(t.code,{children:"0xF147b8125d2ef93FB6965Db97D6746952a133934"})," (curve-voter.ychad.eth). This will show you the dollar amount accumulated in the strategy for all factory vaults."]}),"\n",(0,a.jsx)(t.h3,{id:"convex-and-convex-frax-strategies",children:"Convex and Convex Frax Strategies"}),"\n",(0,a.jsx)(t.p,{children:"For Convex and Convex Frax you can view how much rewards have accumulated in USD by viewing claimableProfitInUsdc() on the strategy under the Read Contract tab."}),"\n",(0,a.jsx)(t.h2,{id:"contracts",children:"Contracts"}),"\n",(0,a.jsx)(t.h3,{id:"ethereum",children:"Ethereum"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Curve LP Factory Address: ",(0,a.jsx)(t.a,{href:"https://etherscan.io/address/0x21b1FC8A52f179757bf555346130bF27c0C2A17A#readContract",children:"0x21b1FC8A52f179757bf555346130bF27c0C2A17A"})]}),"\n",(0,a.jsxs)(t.li,{children:["Balancer LP Factory Address: ",(0,a.jsx)(t.a,{href:"https://etherscan.io/address/0x06393857db733b76dd3ec91f3681ce85db275438#readContract",children:"0x06393857dB733b76DD3ec91F3681cE85db275438"})]}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"optimism",children:"Optimism"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Velodrome LP Factory Address: ",(0,a.jsx)(t.a,{href:"https://optimistic.etherscan.io/address/0x8eb53a4fD9D2727a49E9e68a32108C18049bFf86#readContract",children:"0x8eb53a4fD9D2727a49E9e68a32108C18049bFf86"})]}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"base",children:"Base"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Aerodrome LP Factory Address: ",(0,a.jsx)(t.a,{href:"https://basescan.org/address/0x2d12caffa46ab3b6c5ceb224620de8b4de3cdff1#readContract",children:"0x2d12caFfa46ab3b6c5cEb224620de8b4DE3cDff1"})]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"The LP Factory contract provides a few main functions:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:"allDeployedVaults()"}),": returns an array of all the deployed vaults."]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:"numVaults()"}),": returns the number of vaults deployed."]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:"canCreateVaultPermissionlessly()"}),": takes in an address for a gauge and returns a boolean that indicates whether a vault can be created permissionlessly."]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:"createNewVaultsAndStrategies()"}),": takes in an address for a gauge and a boolean that determines whether duplicate vaults are allowed, and creates a new vault and strategy."]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:"latestDefaultOrAutomatedVaultFromGauge()"}),": takes in an address for a gauge and returns the latest default or automated vault from that gauge."]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:"~StrategyImplementation()"}),": Has the name of the strategy in front of ",(0,a.jsx)(t.code,{children:"StrategyImplmentation"})," and returns the strategy contract template address used in the vault factory each factory will have at least one."]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"create-with-ui",children:"Create with UI"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["User Interface: ",(0,a.jsx)(t.a,{href:"https://yearn.fi/vaults/factory",children:"https://yearn.fi/vaults/factory"})]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"Follow these steps to create a new vault with the UI:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:"Make sure your wallet is connected"}),"\n"]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/EKqOla1.png"}),"\n",(0,a.jsxs)(t.ol,{start:"2",children:["\n",(0,a.jsx)(t.li,{children:"Chose a token to create a vault for"}),"\n"]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/nIt8h8v.png",width:"500"}),"\n",(0,a.jsxs)(t.ol,{start:"3",children:["\n",(0,a.jsx)(t.li,{children:'Review details and click "Create Vault"'}),"\n"]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/l7Z7oYm.png"}),"\n",(0,a.jsxs)(t.ol,{start:"4",children:["\n",(0,a.jsxs)(t.li,{children:["Sign the transaction and the vault will be created (the signing interface is specific to your wallet provider, this one is ",(0,a.jsx)(t.a,{href:"https://frame.sh/",children:"Frame"}),")"]}),"\n"]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/uRhX2VB.png",width:"280"}),"\n",(0,a.jsx)(t.h2,{id:"create-from-contract",children:"Create from Contract"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:["Open the contract at etherscan: ",(0,a.jsx)(t.a,{href:"https://etherscan.io/address/0x21b1FC8A52f179757bf555346130bF27c0C2A17A#writeContract",children:"0x21b1FC8A52f179757bf555346130bF27c0C2A17A"})]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsxs)(t.p,{children:["Call ",(0,a.jsx)(t.code,{children:"canCreateVaultPermissionlessly()"})," function to make sure that a vault does not already exist for the gauge you want to create"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/RBS2DIq.png",width:"500"}),"\n",(0,a.jsxs)(t.ol,{start:"3",children:["\n",(0,a.jsxs)(t.li,{children:["Call ",(0,a.jsx)(t.code,{children:"createNewVaultsAndStrategies()"})," to create a new permissionless vault."]}),"\n"]}),"\n",(0,a.jsx)("img",{src:"https://i.imgur.com/2bMxjU0.png",width:"500"}),"\n",(0,a.jsxs)(t.ol,{start:"4",children:["\n",(0,a.jsx)(t.li,{children:"Now your new Yearn Vault will be deployed and you can sit back while it auto-compounds your rewards into more of your Curve lp position."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},28453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>i});var a=r(96540);const s={},n=a.createContext(s);function o(e){const t=a.useContext(n);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(n.Provider,{value:t},e.children)}}}]);