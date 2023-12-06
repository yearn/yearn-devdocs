"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[1375],{3905:(t,e,a)=>{a.d(e,{kt:()=>u});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function d(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var p=n.createContext({}),o=function(t){var e=n.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},k=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,k=d(t,["components","mdxType","originalType","parentName"]),u=o(a),s=r,N=u["".concat(p,".").concat(s)]||u[s]||m[s]||l;return a?n.createElement(N,i(i({ref:e},k),{},{components:a})):n.createElement(N,i({ref:e},k))}));function u(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=k;var d={};for(var p in e)hasOwnProperty.call(e,p)&&(d[p]=e[p]);d.originalType=t,d.mdxType="string"==typeof t?t:r,i[1]=d;for(var o=2;o<l;o++)i[o]=a[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},3440:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>k,frontMatter:()=>l,metadata:()=>d,toc:()=>o});var n=a(7462),r=(a(7294),a(3905));const l={},i="Yearn API",d={unversionedId:"yearn-api",id:"version-0.4.3/yearn-api",title:"Yearn API",description:"Production Endpoint",source:"@site/versioned_docs/version-0.4.3/yearn-api.md",sourceDirName:".",slug:"/yearn-api",permalink:"/vaults/0.4.3/yearn-api",draft:!1,editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/versioned_docs/version-0.4.3/yearn-api.md",tags:[],version:"0.4.3",frontMatter:{},sidebar:"version-0.4.3/mySidebar",previous:{title:"Yearn Stack + FE Features",permalink:"/vaults/0.4.3/yearn-sdk/yearn-stack"},next:{title:"Yearn Lens",permalink:"/vaults/0.4.3/yearn-lens/"}},p={},o=[{value:"Production Endpoint",id:"production-endpoint",level:3},{value:"API Schema",id:"api-schema",level:3}],m={toc:o};function k(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"yearn-api"},"Yearn API"),(0,r.kt)("h3",{id:"production-endpoint"},"Production Endpoint"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://api.yearn.fi/v1/chains/1/vaults/all"},"https://api.yearn.fi/v1/chains/1/vaults/all")),(0,r.kt)("h3",{id:"api-schema"},"API Schema"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Field"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"address")),(0,r.kt)("td",{parentName:"tr",align:null},"Checksummed address of the vault")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"inception")),(0,r.kt)("td",{parentName:"tr",align:null},"The block number a vault was created at")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"symbol")),(0,r.kt)("td",{parentName:"tr",align:null},"Vault token symbol (used primarily in metamask)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"name")),(0,r.kt)("td",{parentName:"tr",align:null},"Vault token name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"display_name")),(0,r.kt)("td",{parentName:"tr",align:null},"Vault name as displayed in UI (usually based on underlying symbol)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"icon")),(0,r.kt)("td",{parentName:"tr",align:null},"Vault token icon url")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying vault token metadata")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token.name")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying token name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token.symbol")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying token symbol")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token.address")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying token address")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token.decimals")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying token decimal amount")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token.display_name")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying token display name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"token.icon")),(0,r.kt)("td",{parentName:"tr",align:null},"Underlying token icon (usually used as vault dispaly icon)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"tvl")),(0,r.kt)("td",{parentName:"tr",align:null},"TVL information about a vault")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"tvl.total_assets")),(0,r.kt)("td",{parentName:"tr",align:null},"TVL in underlying token denomination")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"tvl.price")),(0,r.kt)("td",{parentName:"tr",align:null},"Token price in USD")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"tvl.tvl")),(0,r.kt)("td",{parentName:"tr",align:null},"TVL in USD")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy")),(0,r.kt)("td",{parentName:"tr",align:null},"Vault APY metadata")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.type")),(0,r.kt)("td",{parentName:"tr",align:null},"APY type. Options are ",(0,r.kt)("inlineCode",{parentName:"td"},"v2:simple"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"v2:averaged"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"v1:simple"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"crv"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.gross_apr")),(0,r.kt)("td",{parentName:"tr",align:null},"Uncompounded gross APR before fees")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.net_apy")),(0,r.kt)("td",{parentName:"tr",align:null},"Net APY (compounded) after fees. This is what the UI shows")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.fees")),(0,r.kt)("td",{parentName:"tr",align:null},"Fee structure breakdown for a vault")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.fees.performance")),(0,r.kt)("td",{parentName:"tr",align:null},"Performance fee in bips")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.fees.withdrawal")),(0,r.kt)("td",{parentName:"tr",align:null},"Withdrawal fee in bips")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.fees.management")),(0,r.kt)("td",{parentName:"tr",align:null},"Management fee in bips")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.fees.keep_crv")),(0,r.kt)("td",{parentName:"tr",align:null},"Amount of CRV to keep upon harvest for curve vaults in bips")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.fees.cvx_keep_crv")),(0,r.kt)("td",{parentName:"tr",align:null},"Amount of CRV to keep upon harvest for curve convex vaults in bips")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.points")),(0,r.kt)("td",{parentName:"tr",align:null},"APY samples for various timeframes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.points.week_ago")),(0,r.kt)("td",{parentName:"tr",align:null},"APY calculated from one week sample of pricePerShare")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.points.month_ago")),(0,r.kt)("td",{parentName:"tr",align:null},"APY calculated from one month sample of pricePerShare")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.points.month_ago")),(0,r.kt)("td",{parentName:"tr",align:null},"APY calculated from inception block sample of pricePerShare")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite")),(0,r.kt)("td",{parentName:"tr",align:null},"Complex APY breakdown (for curve vaults)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite.boost")),(0,r.kt)("td",{parentName:"tr",align:null},"Current boost of the strategies")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite.pool_apy")),(0,r.kt)("td",{parentName:"tr",align:null},"APY of the Curve LP position")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite.base_apr")),(0,r.kt)("td",{parentName:"tr",align:null},"Base APR of Curve emissions")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite.boosted_apr")),(0,r.kt)("td",{parentName:"tr",align:null},"Boosted APR of Curve emissions")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite.cvx_apr")),(0,r.kt)("td",{parentName:"tr",align:null},"APR of Convex rewards")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apy.composite.rewards_apr")),(0,r.kt)("td",{parentName:"tr",align:null},"APR of additional pool rewards")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"strategies")),(0,r.kt)("td",{parentName:"tr",align:null},"A list of active vault strategies")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"strategies[idx].address")),(0,r.kt)("td",{parentName:"tr",align:null},"Address of an active strategy")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"strategies[idx].name")),(0,r.kt)("td",{parentName:"tr",align:null},"Name of an active strategy")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"endorsed")),(0,r.kt)("td",{parentName:"tr",align:null},"True if the vault is an endorsed production vault. Do not show the vault if it's not endorsed")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"version")),(0,r.kt)("td",{parentName:"tr",align:null},"API version of the vault")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"decimals")),(0,r.kt)("td",{parentName:"tr",align:null},"Number of decimals for the vault token")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"type")),(0,r.kt)("td",{parentName:"tr",align:null},"High level vault classification. Valid options are v1 and v2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"emergency_shutdown")),(0,r.kt)("td",{parentName:"tr",align:null},"If true the vault is in shut down mode and no new deposits should be accepted")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"updated")),(0,r.kt)("td",{parentName:"tr",align:null},"Unix timestamp of the last vault update")))))}k.isMDXComponent=!0}}]);