"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[9328],{21107:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var s=n(74848),r=n(28453);const a={},o="yVaults",i={id:"products/yvaults/overview",title:"yVaults",description:"Yearn Vaults are like crypto savings accounts in cyberspace. You deposit your assets, and Yearn's smart contracts put them to work within the DeFi ecosystem, returning the earned yield back to you.",source:"@site/docs/getting-started/products/yvaults/overview.md",sourceDirName:"products/yvaults",slug:"/products/yvaults/overview",permalink:"/getting-started/products/yvaults/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/yearn/yearn-devdocs/edit/master/website/docs/getting-started/products/yvaults/overview.md",tags:[],version:"current",frontMatter:{},sidebar:"userDocsSidebar",previous:{title:"Yearn Products",permalink:"/getting-started/intro"},next:{title:"yVaults V3",permalink:"/getting-started/products/yvaults/v3"}},l={},d=[{value:"yVault Types",id:"yvault-types",level:2},{value:"yVault Fee Structure",id:"yvault-fee-structure",level:2}];function c(e){const t={a:"a",admonition:"admonition",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components},{PrettyLink:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("PrettyLink",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"yvaults",children:"yVaults"})}),"\n",(0,s.jsxs)(t.admonition,{title:"WHAT IS A yVAULT ANYWAY?",type:"yearn",children:[(0,s.jsx)(t.p,{children:"Yearn Vaults are like crypto savings accounts in cyberspace. You deposit your assets, and Yearn's smart contracts put them to work within the DeFi ecosystem, returning the earned yield back to you."}),(0,s.jsx)(t.p,{children:"However, unlike a bank account - none of this takes place behind closed doors (no offense to doors). Decentralized Finance uses public blockchains, meaning you are in control of your assets and can see where they are at all times. Nothing is hidden and everything is auditable by anyone, at any time."}),(0,s.jsx)(t.p,{children:"With the advent of v3, Vaults can now be made out of a single strategy for your assets, or a collection of multiple strategies which balance your funds between them. Users now have more control over where they want their funds to go and a wider range of risk appetites."}),(0,s.jsx)(t.p,{children:"Go you!"})]}),"\n",(0,s.jsx)(n,{children:(0,s.jsx)(t.a,{href:"yvaults-faq#yvaults-eli-5",children:"Still Confused? Click here for an ELI-5 explainer"})}),"\n",(0,s.jsx)(t.h2,{id:"yvault-types",children:"yVault Types"}),"\n",(0,s.jsx)(t.p,{children:"Over the years, Yearn has developed 3 versions of the yVault products: v1, v2, and v3. Super creative, we know!"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"../../../developers/v1/introduction",children:(0,s.jsx)(t.strong,{children:"v1 yVaults"})})," are the OG vaults and are mostly phased out (",(0,s.jsx)(t.em,{children:"deprecated"})," in developer-speak)."]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"./v2",children:(0,s.jsx)(t.strong,{children:"v2 yVaults"})})," are the reliable, workhorse vaults that you know and love. They started focused on the Curve ecosystem and are still used when creating vaults for Curve pools."]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"./v3",children:(0,s.jsx)(t.strong,{children:"v3 yVaults"})})," are the new cool vaults on the block. They are designed to interoperate using the ERC-4626 standard and have several new features to make them safer and easier to use and create."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"yvault-fee-structure",children:"yVault Fee Structure"}),"\n",(0,s.jsx)(t.p,{children:"yVaults have 2 potential fees that can be charged on deposited funds:"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Performance Fee"}),": Deducted from yield earned every time a vault harvests a strategy."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Management Fee"}),": Flat rate taken from vault deposits over a year. The fee is extracted by minting new shares of the vault, thereby diluting vault participants. This is done at the time of harvest, and calculated based on time since the previous harvest."]}),"\n",(0,s.jsxs)(t.p,{children:["Prior to ",(0,s.jsx)(t.a,{href:"https://gov.yearn.fi/t/yip-69-reduce-and-cap-fees-through-yrates/12588",children:"YIP-69"}),", vaults had 20% performance fees and 2% management fees, but this has changed and yVaults now have a dynamic fee structure."]}),"\n",(0,s.jsxs)(t.p,{children:["Single asset vaults generally have no management fee. Fee values for all yVaults can be checked in real-time at ",(0,s.jsx)(t.a,{href:"https://yearn.fi/",children:"yearn.fi"})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["On the ",(0,s.jsx)(t.a,{href:"https://yearn.fi/",children:"yearn.fi"})," user interface, yield is displayed as net APY. This means that both fees and compounding returns are taken into consideration in the rates presented. Since harvests don't occur on a set basis, yield is usually estimated based on historical data. For more information, see ",(0,s.jsx)(t.a,{href:"../../guides/how-apy-works",children:"How to Understand yVault ROI"})]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["For vaults deployed by the vault ",(0,s.jsx)(t.a,{href:"/developers/v2/vault-factory",children:"factory"})," the performance fee is 10% instead of 20%."]}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>i});var s=n(96540);const r={},a=s.createContext(r);function o(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);