"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[5903],{3905:function(e,t,r){r.d(t,{kt:function(){return c}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),d=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=d(r),m=a,f=c["".concat(s,".").concat(m)]||c[m]||p[m]||i;return r?n.createElement(f,l(l({ref:t},u),{},{components:r})):n.createElement(f,l({ref:t},u))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var d=2;d<i;d++)l[d]=r[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4903:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return o},metadata:function(){return d},toc:function(){return u}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),l=["components"],o={},s=void 0,d={unversionedId:"smart-contracts/test/AffiliateToken",id:"version-0.3.3/smart-contracts/test/AffiliateToken",title:"AffiliateToken",description:"Functions",source:"@site/versioned_docs/version-0.3.3/smart-contracts/test/AffiliateToken.md",sourceDirName:"smart-contracts/test",slug:"/smart-contracts/test/AffiliateToken",permalink:"/vaults/0.3.3/smart-contracts/test/AffiliateToken",draft:!1,editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/versioned_docs/version-0.3.3/smart-contracts/test/AffiliateToken.md",tags:[],version:"0.3.3",frontMatter:{},sidebar:"version-0.3.3/mySidebar",previous:{title:"Registry.vy",permalink:"/vaults/0.3.3/smart-contracts/registry"},next:{title:"TestGuestList",permalink:"/vaults/0.3.3/smart-contracts/test/TestGuestList"}},p={},u=[{value:"Functions",id:"functions",level:2},{value:"constructor",id:"constructor",level:3},{value:"_getChainId",id:"_getchainid",level:3},{value:"setAffiliate",id:"setaffiliate",level:3},{value:"acceptAffiliate",id:"acceptaffiliate",level:3},{value:"_shareValue",id:"_sharevalue",level:3},{value:"pricePerShare",id:"pricepershare",level:3},{value:"_sharesForValue",id:"_sharesforvalue",level:3},{value:"deposit",id:"deposit",level:3},{value:"deposit",id:"deposit-1",level:3},{value:"withdraw",id:"withdraw",level:3},{value:"withdraw",id:"withdraw-1",level:3},{value:"migrate",id:"migrate",level:3},{value:"migrate",id:"migrate-1",level:3},{value:"migrate",id:"migrate-2",level:3},{value:"permit",id:"permit",level:3},{value:"Parameters:",id:"parameters",level:4}],c={toc:u};function m(e){var t=e.components,r=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function constructor(\n  ) public\n")),(0,i.kt)("h3",{id:"_getchainid"},"_getChainId"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function _getChainId(\n  ) internal returns (uint256)\n")),(0,i.kt)("h3",{id:"setaffiliate"},"setAffiliate"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function setAffiliate(\n  ) external\n")),(0,i.kt)("h3",{id:"acceptaffiliate"},"acceptAffiliate"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function acceptAffiliate(\n  ) external\n")),(0,i.kt)("h3",{id:"_sharevalue"},"_shareValue"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function _shareValue(\n  ) internal returns (uint256)\n")),(0,i.kt)("h3",{id:"pricepershare"},"pricePerShare"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function pricePerShare(\n  ) external returns (uint256)\n")),(0,i.kt)("h3",{id:"_sharesforvalue"},"_sharesForValue"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function _sharesForValue(\n  ) internal returns (uint256)\n")),(0,i.kt)("h3",{id:"deposit"},"deposit"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function deposit(\n  ) external returns (uint256)\n")),(0,i.kt)("h3",{id:"deposit-1"},"deposit"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function deposit(\n  ) public returns (uint256 deposited)\n")),(0,i.kt)("h3",{id:"withdraw"},"withdraw"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function withdraw(\n  ) external returns (uint256)\n")),(0,i.kt)("h3",{id:"withdraw-1"},"withdraw"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function withdraw(\n  ) public returns (uint256)\n")),(0,i.kt)("h3",{id:"migrate"},"migrate"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function migrate(\n  ) external returns (uint256)\n")),(0,i.kt)("h3",{id:"migrate-1"},"migrate"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function migrate(\n  ) external returns (uint256)\n")),(0,i.kt)("h3",{id:"migrate-2"},"migrate"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function migrate(\n  ) external returns (uint256)\n")),(0,i.kt)("h3",{id:"permit"},"permit"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  function permit(\n    address owner,\n    address spender,\n    uint256 amount,\n    uint256 deadline,\n    uint8 v,\n    bytes32 r,\n    bytes32 s\n  ) external\n")),(0,i.kt)("p",null,"Triggers an approval from owner to spends"),(0,i.kt)("h4",{id:"parameters"},"Parameters:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"owner")),(0,i.kt)("td",{parentName:"tr",align:"left"},"address"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The address to approve from")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"spender")),(0,i.kt)("td",{parentName:"tr",align:"left"},"address"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The address to be approved")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"amount")),(0,i.kt)("td",{parentName:"tr",align:"left"},"uint256"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The number of tokens that are approved (2^256-1 means infinite)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"deadline")),(0,i.kt)("td",{parentName:"tr",align:"left"},"uint256"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The time at which to expire the signature")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"v")),(0,i.kt)("td",{parentName:"tr",align:"left"},"uint8"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The recovery byte of the signature")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"r")),(0,i.kt)("td",{parentName:"tr",align:"left"},"bytes32"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Half of the ECDSA signature pair")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"s")),(0,i.kt)("td",{parentName:"tr",align:"left"},"bytes32"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Half of the ECDSA signature pair")))))}m.isMDXComponent=!0}}]);