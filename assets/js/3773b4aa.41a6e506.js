"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[9838],{3905:function(e,t,o){o.d(t,{Zo:function(){return d},kt:function(){return v}});var r=o(7294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function n(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,r,a=function(e,t){if(null==e)return{};var o,r,a={},n=Object.keys(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},d=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var o=e.components,a=e.mdxType,n=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),h=u(o),v=a,p=h["".concat(l,".").concat(v)]||h[v]||c[v]||n;return o?r.createElement(p,i(i({ref:t},d),{},{components:o})):r.createElement(p,i({ref:t},d))}));function v(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=o.length,i=new Array(n);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var u=2;u<n;u++)i[u]=o[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}h.displayName="MDXCreateElement"},1500:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return c}});var r=o(7462),a=o(3366),n=(o(7294),o(3905)),i={},s="How Yearn Boosts Yield",l={unversionedId:"how-boost-works",id:"version-0.4.3/how-boost-works",isDocsHomePage:!1,title:"How Yearn Boosts Yield",description:"This is an overview of how Yearn investment strategies takes advantage of CRV vote locking on Curve Finance in order to increase yield.",source:"@site/versioned_docs/version-0.4.3/how-boost-works.md",sourceDirName:".",slug:"/how-boost-works",permalink:"/yearn-devdocs/v2/how-boost-works",editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/versioned_docs/version-0.4.3/how-boost-works.md",tags:[],version:"0.4.3",frontMatter:{},sidebar:"version-0.4.3/mySidebar",previous:{title:"Getting Started with Vaults",permalink:"/yearn-devdocs/v2/getting-started"},next:{title:"Deploying a Vault and Strategy V2",permalink:"/yearn-devdocs/v2/process-and-procedures/deployment"}},u=[{value:"CRV vote locking",id:"crv-vote-locking",children:[{value:"Voting",id:"voting",children:[]},{value:"Staking",id:"staking",children:[]},{value:"Boosting",id:"boosting",children:[]}]},{value:"The yveCRV yVault",id:"the-yvecrv-yvault",children:[]},{value:"The yvBoost yVault",id:"the-yvboost-yvault",children:[{value:"Locking CRV for veCRV",id:"locking-crv-for-vecrv",children:[]}]},{value:"CRV Vote Locking in Yearn",id:"crv-vote-locking-in-yearn",children:[{value:"Enter Yearn\u2019s yveCRV and yveBOOST vaults",id:"enter-yearns-yvecrv-and-yveboost-vaults",children:[]}]},{value:"More information",id:"more-information",children:[]}],d={toc:u};function c(e){var t=e.components,o=(0,a.Z)(e,["components"]);return(0,n.kt)("wrapper",(0,r.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"how-yearn-boosts-yield"},"How Yearn Boosts Yield"),(0,n.kt)("p",null,"This is an overview of how Yearn investment strategies takes advantage of CRV vote locking on Curve Finance in order to increase yield."),(0,n.kt)("h2",{id:"crv-vote-locking"},"CRV vote locking"),(0,n.kt)("p",null,'Vote locking, "Boosties", or "Vote boosting" is a Curve Finance feature where CRV is locked into the Curve DAO.'),(0,n.kt)("p",null,"Vote locking CRV rewards yields ",(0,n.kt)("strong",{parentName:"p"},"veCRV")," (voting escrow CRV tokens). The longer time period that CRV is locked for, the more veCRVs are received. The minimum locking period is 1 week and the maximum period is 4 years."),(0,n.kt)("p",null,"veCRV enables its holders to:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"vote")," in Curve governance"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"stake")," to earn trading fees and"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"boost")," rewards from liquidity provided")),(0,n.kt)("h3",{id:"voting"},"Voting"),(0,n.kt)("p",null,"Once CRV holders vote-lock their CRV, changing it into veCRV, they can then vote on various DAO proposals and pool parameter changes which are proposed, or propose their own changes."),(0,n.kt)("p",null,"It is worth noting that native veCRV cannot be transferred, and the only way to obtain it is by vote-locking CRV."),(0,n.kt)("p",null,"You can stake CRV on ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi")," and actively manage your boosts for Liquidity Pools yourself, or you can let Yearn take care of CRV staking for you with our dedicated vaults: yveCRV, and yvBOOST. Also our yVault tokens are tradeable and transferable unlike staking CRV at ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi"),"."),(0,n.kt)("h3",{id:"staking"},"Staking"),(0,n.kt)("p",null,"veCRV (staked CRV), receives a share of trading fees from the Curve protocol (50% of all trading fees generated, from Sept. 19, 2020 - onwards). Those fees are collected and used to buy 3CRV, the LP token for the TriPool (DAI+USDC+USDT), which are then distributed to veCRV holders."),(0,n.kt)("h4",{id:"earning-trading-fees"},"Earning Trading fees"),(0,n.kt)("p",null,"Based on Yearn's share of the total veCRV, 50% of trading fees will be claimed as CRV, out of which 10% will in turn be locked into the Curve DAO for more veCRV."),(0,n.kt)("h3",{id:"boosting"},"Boosting"),(0,n.kt)("p",null,"Beyond staking, another major incentive for CRV is the ability to boost your rewards on provided liquidity. Vote locking CRV allows you to acquire voting power to participate in the DAO and direct CRV reward allocations towards selected pools, earning a boost of up to ",(0,n.kt)("strong",{parentName:"p"},"2.5x")," on the liquidity you are providing."),(0,n.kt)("p",null,"The actual boost multiplier is determined by a formula that depends on the current pool gauge liquidity as a fraction out of the total amount of liquidity provided in Curve pools by Yearn, and the fraction of voting power that the veCRV constitutes out of the total (i.e. its share of the current total of veCRV issued)."),(0,n.kt)("p",null,'A "Yearn boost" tool displaying Yearn\'s current active and potential boost is available ',(0,n.kt)("a",{parentName:"p",href:"https://crv.ape.tax/"},"here"),"."),(0,n.kt)("p",null,"See the ",(0,n.kt)("a",{parentName:"p",href:"https://resources.curve.fi/guides/boosting-your-crv-rewards"},"Curve Guide")," for more details on the formula and its calculation."),(0,n.kt)("h2",{id:"the-yvecrv-yvault"},"The yveCRV yVault"),(0,n.kt)("p",{align:"center"},(0,n.kt)("img",{src:"https://miro.medium.com/max/115/0*OsdD6266-e0jWcVH.png"})),(0,n.kt)("h4",{id:"earn-crv-with-a-better-boost"},"Earn CRV with a better boost"),(0,n.kt)("p",null,"When a user deposits CRV into the vault, that CRV is locked on the ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi")," platform as veCRV and the user is returned a tokenized version of veCRV, yveCRV. This vault earns you a continuous share of Curve\u2019s trading fees. Every week, these rewards can be claimed as 3Crv (Curve\u2019s 3pool LP token)."),(0,n.kt)("p",null,"You could do this yourself directly on the ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi"),", but there is a very good reason one would prefer to use the yveCRV yVault: ",(0,n.kt)("strong",{parentName:"p"},"more rewards!")),(0,n.kt)("p",null,"How much more? Your rewards through this vault can be more than double! Yearn achieves this because it periodically donates 10% of the farmed CRV it earns through all ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi")," based strategies to this yveCRV vault and allows yveCRV vault depositors to claim Yearn\u2019s share of Curve protocol fees. This means we give all of Yearn\u2019s rewards, which we could have claimed for the protocol, to yveCRV depositors, boosting their weekly rewards."),(0,n.kt)("p",null,"Locking your CRV tokens into the vault means that you delegate your ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi")," voting power to yearn. Yearn constantly runs simulations to optimize its voting allocations which maximizes yield across all vaults, benefiting your deposits in other vaults!"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"You can now claim your rewards and spend that money on mojitos while you enjoy retirement.")," Though, another option you might want instead is to add your rewards back into the vault to compound your gains and you can even find a \u201cRestake\u201d button to do just that. You could very well do this manually, but Yearn has you covered here with \u2026"),(0,n.kt)("h2",{id:"the-yvboost-yvault"},"The yvBoost yVault"),(0,n.kt)("p",{align:"center"},(0,n.kt)("img",{src:"https://miro.medium.com/max/115/0*Xr6RMWyDc6gmZnKw.png"})),(0,n.kt)("h4",{id:"earn-boosted-crv-with-compounding"},"Earn boosted CRV with compounding"),(0,n.kt)("p",null,"The yvBOOST yVault is a fully automated and compounding version of the yveCRV yVault explained above."),(0,n.kt)("p",null,"To put it simply, this vault claims your weekly 3CRV rewards automatically and uses them to acquire more yveCRV (either via market-buy or mint, depending on which is most efficient at time of harvest)."),(0,n.kt)("p",null,"Once deposited, just as in the yveCRV yVault, your CRV tokens\u2019s voting power is handled and optimized by Yearn. You do not need to worry about claiming ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi"),"\u2019s weekly protocol fees, the vault does this for you!"),(0,n.kt)("p",null,"This is a \u201cset-and-forget\u201d vault where your CRV tokens grow exponentially, harnessing the power of compound interest!"),(0,n.kt)("p",null,"Now you might be wondering how one would extract any gains made from your CRV tokens in the vault, when as mentioned earlier, any CRV deposited into either the yveCRV or the yvBOOST are locked. While you cannot withdraw from the yveCRV vault, you can actually swap both of these vault tokens on Sushiswap. This is because Yearn and its users provide liquidity on Sushiswap to allow swapping of your yveCRV and yvBOOST tokens for ETH (or anything, really)."),(0,n.kt)("h4",{id:"a-little-alpha"},"A little alpha."),(0,n.kt)("p",null,"Yearn buys yvBOOST from the market, unwraps it into yveCRV, and donates that yveCRV into the yvBOOST vault, increasing the underlying value of yvBOOST."),(0,n.kt)("h3",{id:"locking-crv-for-vecrv"},"Locking CRV for veCRV"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"10% of all CRV earned")," by the strategies are ",(0,n.kt)("strong",{parentName:"p"},"locked up for 4 years")," in the Curve DAO in order to get the maximum reward ratio of 1:1 CRV:veCRV."),(0,n.kt)("p",null,"Actual veCRV distribution has not yet begun, with a date for this still to be announced by Curve Finance."),(0,n.kt)("h2",{id:"crv-vote-locking-in-yearn"},"CRV Vote Locking in Yearn"),(0,n.kt)("p",null,"Staking your CRV directly on the ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi")," platform means locking your CRV token in exchange for a non-transferrable veCRV token that allows you to manually claim a share of the protocol\u2019s fee (3CRV). You can use this veCRV token to manually rebalance your votes to obtain a boost on your provided liquidity to the ",(0,n.kt)("a",{parentName:"p",href:"https://curve.fi/"},"Curve.fi")," platform."),(0,n.kt)("p",null,"Yearn deploys a single CRV vote locking strategy that is shared across its general Curve strategies:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://etherscan.io/address/0x112570655b32a8c747845e0215ad139661e66e7f#code"},"StrategyCurveYBUSDVoterProxy")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://etherscan.io/address/0x6d6c1ad13a5000148aa087e7cbfb53d402c81341#code"},"StrategyCurveBTCVoterProxy")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://etherscan.io/address/0x07db4b9b3951094b9e278d336adf46a036295de7#code"},"StrategyCurveYVoterProxy")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://etherscan.io/address/0xC59601F0CC49baa266891b7fc63d2D5FE097A79D#code"},"StrategyCurve3CrvVoterProxy"))),(0,n.kt)("h3",{id:"enter-yearns-yvecrv-and-yveboost-vaults"},"Enter Yearn\u2019s yveCRV and yveBOOST vaults"),(0,n.kt)("p",null,"Both of these Yearn vaults reward CRV stakers with a share of the CRV locked by Yearn, making it an ideal destination for those who wish to stake CRV whilst remaining liquid:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Earn a share of trading fees from the ",(0,n.kt)("a",{parentName:"li",href:"https://curve.fi/"},"Curve.fi")," protocol (3Crv), automatically reinvested (for the yvBOOST vault)."),(0,n.kt)("li",{parentName:"ul"},"Earn a share of Yearn\u2019s claim of ",(0,n.kt)("a",{parentName:"li",href:"https://curve.fi/"},"Curve.fi")," protocol fees, on top of your own rewards (more 3CRV!), automatically reinvested (for the yvBOOST vault)."),(0,n.kt)("li",{parentName:"ul"},"The collective voting power of the veCRV tokens is optimized and rebalanced automatically to maximize rewards in all of Yearn\u2019s Curve Pool vaults."),(0,n.kt)("li",{parentName:"ul"},"Receive yveCRV or yvBOOST tokens for your deposited CRV, allowing you to easily extract profit or exit your staked CRV position")),(0,n.kt)("p",null,"Yearn\u2019s work to automate the yield generation and rebalancing of your crypto assets is especially true in the case of your CRV holdings, and Yearn\u2019s yveCRV or yvBOOST offers a powerful, compounding, \u201cset-and-forget\u201d place to stake your CRV!"),(0,n.kt)("h2",{id:"more-information"},"More information"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.curve.fi/usecrv"},"curve.fi")," webpage"),(0,n.kt)("li",{parentName:"ul"},"Curve ",(0,n.kt)("a",{parentName:"li",href:"https://resources.curve.fi/guides/staking-your-crv"},"Guide")," for staking CRV"),(0,n.kt)("li",{parentName:"ul"},"Curve ",(0,n.kt)("a",{parentName:"li",href:"https://resources.curve.fi/guides/boosting-your-crv-rewards"},"Guide")," for vote locking"),(0,n.kt)("li",{parentName:"ul"},"Curve ",(0,n.kt)("a",{parentName:"li",href:"https://resources.curve.fi/faq/vote-locking-boost"},"FAQ")),(0,n.kt)("li",{parentName:"ul"},"deFinn ",(0,n.kt)("a",{parentName:"li",href:"https://drive.google.com/uc?export=download&id=1DvytXXS0WXmJ65X4jg8vfuT-zWXFxxSk"},"Infographic")," on CRV Voting Boost and formula"),(0,n.kt)("li",{parentName:"ul"},"Boost ",(0,n.kt)("a",{parentName:"li",href:"https://dao.curve.fi/minter/calc"},"calculator")),(0,n.kt)("li",{parentName:"ul"},"Yearn CurveDAO proxy strategy ",(0,n.kt)("a",{parentName:"li",href:"https://twitter.com/bantg/status/1308680661801340929"},"diagram"))))}c.isMDXComponent=!0}}]);