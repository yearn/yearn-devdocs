"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[6332],{71054:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var s=n(74848),r=n(28453);const a={},l="Vault Tokens",i={id:"products/yvaults/vault-tokens",title:"Vault Tokens",description:"yVault Tokens are like a deposit receipt. They represent a user's share of the yVault that they are participating in.",source:"@site/docs/getting-started/products/yvaults/vault-tokens.md",sourceDirName:"products/yvaults",slug:"/products/yvaults/vault-tokens",permalink:"/getting-started/products/yvaults/vault-tokens",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1708445498e3,frontMatter:{},sidebar:"mySidebar",previous:{title:"Overview",permalink:"/getting-started/products/yvaults/overview"},next:{title:"Overview",permalink:"/getting-started/products/yvaults/v3"}},o={},c=[{value:"V1 yVault Tokens",id:"v1-yvault-tokens",level:2},{value:"V2 yVault Tokens",id:"v2-yvault-tokens",level:2},{value:"V3 yVault Tokens",id:"v3-yvault-tokens",level:2}];function u(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"vault-tokens",children:"Vault Tokens"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://docs.yearn.fi/resources/defi-glossary#ytoken",children:"yVault Tokens"})," are like a deposit receipt. They represent a user's share of the yVault that they are participating in."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"For example"}),", if you deposit YFI in a yVault you will receive yvYFI in return. yvYFI would be the yVault Token."]}),"\n",(0,s.jsx)(t.p,{children:"If your yVault generates profit, the share price of your yVault tokens will increase. This happens because more underlying tokens are in the yVault to redeem upon withdrawal."}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.img,{src:"https://i.imgur.com/3zkSnoE.png",alt:""}),"\n",(0,s.jsx)(t.img,{src:"https://i.imgur.com/yrGEVCr.png",alt:""})]}),"\n",(0,s.jsxs)(t.p,{children:["Once a user's liquidity is withdrawn from the yVault, their yVault Token will be burned. yVault Tokens are ",(0,s.jsx)(t.a,{href:"https://ethereum.org/en/developers/docs/standards/tokens/erc-20/",children:"ERC-20"}),", meaning they can be transferred and traded as any other common Ethereum token."]}),"\n",(0,s.jsx)(t.p,{children:"The vault tokens have evolved between v1, v2, and v3, here are a couple of main differences:"}),"\n",(0,s.jsx)(t.h2,{id:"v1-yvault-tokens",children:"V1 yVault Tokens"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Each vault contract can use only 1 yield strategy contract."}),"\n",(0,s.jsxs)(t.li,{children:["Vault tokens are prefixed with a leading ",(0,s.jsx)(t.code,{children:"y"}),", so a v1 vault for USDC gives the user yUSDC."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"v2-yvault-tokens",children:"V2 yVault Tokens"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Each vault contract can use up to 20 yield strategy contracts."}),"\n",(0,s.jsxs)(t.li,{children:["Vault tokens are prefixed with ",(0,s.jsx)(t.code,{children:"yv"}),", so a v2 vault for USDC gives the user yvUSDC."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"v3-yvault-tokens",children:"V3 yVault Tokens"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["The strategy contract is ",(0,s.jsx)(t.a,{href:"https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/",children:"ERC-4626"}),' compliant (we call it a "Tokenized Strategy").']}),"\n",(0,s.jsx)(t.li,{children:"A strategy can act as a vault with only 1 strategy."}),"\n",(0,s.jsx)(t.li,{children:"A strategy can act as a vault for many strategies."}),"\n",(0,s.jsxs)(t.li,{children:["Vault tokens are still prefixed with ",(0,s.jsx)(t.code,{children:"yv"}),", so a v3 vault for USDC gives the user yvUSDC."]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>i});var s=n(96540);const r={},a=s.createContext(r);function l(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);