"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[2007],{39476:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>c,metadata:()=>i,toc:()=>u});var n=r(74848),s=r(28453),o=r(3514);const c={},a="V2 yVault Smart Contracts",i={id:"smart-contracts/V2/index",title:"V2 yVault Smart Contracts",description:"Current v2 yVault API version is 0.4.6",source:"@site/docs/developers/smart-contracts/V2/index.md",sourceDirName:"smart-contracts/V2",slug:"/smart-contracts/V2/",permalink:"/developers/smart-contracts/V2/",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1725283479e3,frontMatter:{},sidebar:"developers",previous:{title:"Yearn4626RouterBase.sol",permalink:"/developers/smart-contracts/V3/deprecated/version-3.0.2/periphery/Yearn4626Router/Yearn4626RouterBase"},next:{title:"BaseStrategy.sol",permalink:"/developers/smart-contracts/V2/BaseStrategy"}},l={},u=[];function d(e){const t={admonition:"admonition",h1:"h1",header:"header",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"v2-yvault-smart-contracts",children:"V2 yVault Smart Contracts"})}),"\n",(0,n.jsxs)(t.admonition,{type:"info",children:[(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"Current v2 yVault API version is 0.4.6"})}),(0,n.jsx)(t.p,{children:'older versions will be located in the "Deprecated" Folder if they exist.'})]}),"\n","\n",(0,n.jsx)(o.A,{})]})}function m(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},3514:(e,t,r)=>{r.d(t,{A:()=>v});r(96540);var n=r(18215),s=r(44718),o=r(28774),c=r(53465),a=r(16654),i=r(21312),l=r(51107);const u={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=r(74848);function m(e){let{href:t,children:r}=e;return(0,d.jsx)(o.A,{href:t,className:(0,n.A)("card padding--lg",u.cardContainer),children:r})}function p(e){let{href:t,icon:r,title:s,description:o}=e;return(0,d.jsxs)(m,{href:t,children:[(0,d.jsxs)(l.A,{as:"h2",className:(0,n.A)("text--truncate",u.cardTitle),title:s,children:[r," ",s]}),o&&(0,d.jsx)("p",{className:(0,n.A)("text--truncate",u.cardDescription),title:o,children:o})]})}function h(e){let{item:t}=e;const r=(0,s.Nr)(t),n=function(){const{selectMessage:e}=(0,c.W)();return t=>e(t,(0,i.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return r?(0,d.jsx)(p,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??n(t.items.length)}):null}function f(e){let{item:t}=e;const r=(0,a.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",n=(0,s.cC)(t.docId??void 0);return(0,d.jsx)(p,{href:t.href,icon:r,title:t.label,description:t.description??n?.description})}function x(e){let{item:t}=e;switch(t.type){case"link":return(0,d.jsx)(f,{item:t});case"category":return(0,d.jsx)(h,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function g(e){let{className:t}=e;const r=(0,s.$S)();return(0,d.jsx)(v,{items:r.items,className:t})}function v(e){const{items:t,className:r}=e;if(!t)return(0,d.jsx)(g,{...e});const o=(0,s.d1)(t);return(0,d.jsx)("section",{className:(0,n.A)("row",r),children:o.map(((e,t)=>(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(x,{item:e})},t)))})}},53465:(e,t,r)=>{r.d(t,{W:()=>l});var n=r(96540),s=r(44586);const o=["zero","one","two","few","many","other"];function c(e){return o.filter((t=>e.includes(t)))}const a={locale:"en",pluralForms:c(["one","other"]),select:e=>1===e?"one":"other"};function i(){const{i18n:{currentLocale:e}}=(0,s.A)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:c(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),a}}),[e])}function l(){const e=i();return{selectMessage:(t,r)=>function(e,t,r){const n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const s=r.select(t),o=r.pluralForms.indexOf(s);return n[Math.min(o,n.length-1)]}(r,t,e)}}},28453:(e,t,r)=>{r.d(t,{R:()=>c,x:()=>a});var n=r(96540);const s={},o=n.createContext(s);function c(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);