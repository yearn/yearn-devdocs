"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[6243],{3905:(e,t,a)=>{a.d(t,{kt:()=>d});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),u=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=u(a),h=n,m=d["".concat(l,".").concat(h)]||d[h]||p[h]||s;return a?r.createElement(m,i(i({ref:t},c),{},{components:a})):r.createElement(m,i({ref:t},c))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,i=new Array(s);i[0]=c;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var u=2;u<s;u++)i[u]=a[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}c.displayName="MDXCreateElement"},5064:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>u});var r=a(7462),n=(a(7294),a(3905));const s={},i="Overview",o={unversionedId:"products/yvaults/overview",id:"products/yvaults/overview",title:"Overview",description:"&nbsp;",source:"@site/docs/getting-started/products/yvaults/overview.md",sourceDirName:"products/yvaults",slug:"/products/yvaults/overview",permalink:"/getting-started/products/yvaults/overview",draft:!1,tags:[],version:"current",lastUpdatedAt:1690583644,formattedLastUpdatedAt:"7/28/2023",frontMatter:{},sidebar:"mySidebar",previous:{title:"Using Yearn",permalink:"/getting-started/using-yearn"},next:{title:"Vaults and Strategies",permalink:"/getting-started/products/yvaults/vaults-and-strategies"}},l={},u=[{value:"What are yVaults?",id:"what-are-yvaults",level:2},{value:"yVault Fee Structure",id:"yvault-fee-structure",level:2},{value:"v2 yVault Improvements",id:"v2-yvault-improvements",level:2},{value:"v3 yVaults",id:"v3-yvaults",level:2}],p={toc:u};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"overview"},"Overview"),(0,n.kt)("h2",{id:"what-are-yvaults"},"What are yVaults?"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://yearn.finance/vaults"},"yVaults")," are like savings accounts for your crypto assets. They accept your deposit, then route it through strategies which seek out the highest yield available in DeFi."),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://github.com/yearn/yearn-devdocs/assets/7863230/af161f3d-ed71-4010-84ba-e1bfab66d782",alt:"image"})),(0,n.kt)("h2",{id:"yvault-fee-structure"},"yVault Fee Structure"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Performance Fee"),": Deducted from yield earned every time a vault harvests a strategy. "),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Management Fee"),": Flat rate taken from vault deposits over a year. The fee is extracted by minting new shares of the vault, thereby diluting vault participants. This is done at the time of harvest, and calculated based on time since the previous harvest."),(0,n.kt)("p",null,"The old structure used before the changes brought by ",(0,n.kt)("a",{parentName:"p",href:"https://gov.yearn.finance/t/yip-69-reduce-and-cap-fees-through-yrates/12588"},"YIP-69")," was 20% performance fees and 2% management fees, but this has changed and vaults now have a dynamic fee structure. Single asset vaults have no management fee. Fee values for all yVaults can be checked in real-time at ",(0,n.kt)("a",{parentName:"p",href:"https://yearn.watch/"},"yearn.watch")),(0,n.kt)("p",null,(0,n.kt)("em",{parentName:"p"},"Example YFI yVault fee structure at the time of writing:"),"  "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Fee Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Value"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Management Fee"),(0,n.kt)("td",{parentName:"tr",align:null},"0%")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Performance Fee"),(0,n.kt)("td",{parentName:"tr",align:null},"20%")))),(0,n.kt)("p",null,"On the ",(0,n.kt)("a",{parentName:"p",href:"https://yearn.finance/"},"yearn.finance")," user interface, yield is displayed as net APY. This means that both fees and compounding returns are taken into consideration in the rates presented. Since harvests don't occur on a set basis, yield is estimated based on historical data. For more information, see ",(0,n.kt)("a",{parentName:"p",href:"https://docs.yearn.finance/getting-started/guides/how-to-understand-yvault-roi"},"How to Understand yVault ROI")),(0,n.kt)("h2",{id:"v2-yvault-improvements"},"v2 yVault Improvements"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Up to 20 strategies per vault:")," This will increase the flexibility to manage capital efficiently during different market scenarios. Each strategy has a capital cap. This is useful to avoid over-allocating funds to a strategy that cannot increase APY anymore."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Strategist and Guardian are the new Controllers:")," The Controller concept is not available in V2 yVaults and has been replaced by a Guardian and the Strategy creator ","(","strategist",")",". These 2 actors oversee strategy performance and are empowered to take action to improve capital management or act on critical situations."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Automated vault housekeeping ","(","Keep3r network",")",":")," ",(0,n.kt)("inlineCode",{parentName:"li"},"harvest()")," and ",(0,n.kt)("inlineCode",{parentName:"li"},"earn()")," calls are now automated through the Keep3r bots network. These 2 function calls are used to purchase new underlying collateral by selling the earned tokens while moving the profits back to the vault and later into strategies. The keep3r network takes the heavy lifting of doing these calls and running with the gas costs in exchange for keep3r tokens. This approach unloads humans from these housekeeping tasks."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"No Withdrawal Fee"),": The one-time fee charged on balance upon withdrawal has been turned off for all vaults and only existed in the v1 iteration.")),(0,n.kt)("h2",{id:"v3-yvaults"},"v3 yVaults"),(0,n.kt)("p",null,"The newest version of yVaults are EIP-4626 compatible and allow for tokenized strategies, read more: ",(0,n.kt)("a",{parentName:"p",href:"https://docs.yearn.finance/getting-started/products/yvaults/v3"},"https://docs.yearn.finance/getting-started/products/yvaults/v3")))}c.isMDXComponent=!0}}]);