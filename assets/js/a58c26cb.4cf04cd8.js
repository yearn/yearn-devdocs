"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[9277],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(r),m=a,h=p["".concat(s,".").concat(m)]||p[m]||d[m]||i;return r?n.createElement(h,o(o({ref:t},c),{},{components:r})):n.createElement(h,o({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},5207:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return u},default:function(){return d}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o={},l="Getting Started with Vaults",s={unversionedId:"getting-started",id:"version-0.4.2/getting-started",isDocsHomePage:!1,title:"Getting Started with Vaults",description:"This is a collection of resources that aim to be an introduction to how yVaults V2 work.",source:"@site/versioned_docs/version-0.4.2/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/yearn-devdocs/v2/0.4.2/getting-started",editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/versioned_docs/version-0.4.2/getting-started.md",tags:[],version:"0.4.2",frontMatter:{},sidebar:"version-0.4.2/mySidebar",next:{title:"Deploying a Vault and Strategy V2",permalink:"/yearn-devdocs/v2/0.4.2/process-and-procedures/deployment"}},u=[{value:"Introduction",id:"introduction",children:[]},{value:"Start coding",id:"start-coding",children:[]},{value:"Other reading material",id:"other-reading-material",children:[]}],c={toc:u};function d(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"getting-started-with-vaults"},"Getting Started with Vaults"),(0,i.kt)("p",null,"This is a collection of resources that aim to be an introduction to how yVaults V2 work."),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"The best introduction to V2 is the workshop did by ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/storming0x/"},"Storming0x"),". It's security focused but nevertheless a great introduction to yVaults V2."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=C0fsYiCI54g"},"Video")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.google.com/presentation/d/1NsePa_hXV1vsbMixTSRsPKYBHYvmVQf7IvpI_8k4p_k/edit#slide=id.p"},"Slides")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/storming0x/yearn-vaults-v2-intro/tree/feat/kernel-session"},"Repository")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://medium.com/yearn-state-of-the-vaults/the-vaults-at-yearn-9237905ffed3"},"Yearn State of the Vaults"))),(0,i.kt)("h2",{id:"start-coding"},"Start coding"),(0,i.kt)("p",null,"When you decide to start, this reading material is going to come handy:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/yearn/brownie-strategy-mix"},"Template for Strategies")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/yearn/yearn-vaults"},"Vaults V2 Repository")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://sambacha.github.io/yearn-vaults/index.html"},"How to set up coding environment for Yearn Strategies")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://medium.com/ethereum-grid/forking-ethereum-mainnet-mint-your-own-dai-d8b62a82b3f7"},"Mint your own DAI"))),(0,i.kt)("p",null,"Once you have the strategy ready. This will guide you further down the road."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/yearn/yearn-assets/blob/master/naming-standard.md"},"Vault naming standard")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/yearn/yearn-devdocs/blob/master/docs/developers/v2/OPERATIONS.md"},"Release process")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.google.com/document/d/1hBKB73kJPQM71enrG8xoSFj7wxYmczUlgigyq2KkcTE/edit#heading=h.4ieoeyetfrxm"},"Security check"))),(0,i.kt)("h2",{id:"other-reading-material"},"Other reading material"),(0,i.kt)("p",null,"This is complement to the others but it's not directly related to creating strategies."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://macarse.medium.com/the-keep3r-network-experiment-bb1c5182bda3"},"The Keep3r Network")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613"},"Andre intro to Yearn Vaults")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://medium.com/iearn/delegated-vaults-explained-fa81f1c3fce2"},"Delegated vaults explanation"))))}d.isMDXComponent=!0}}]);