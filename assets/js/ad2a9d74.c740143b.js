"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[6801],{93919:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var s=r(74848),t=r(28453);const a={},o="Subgraph Queries",i={id:"data-services/queries",title:"Subgraph Queries",description:"Below are some sample queries you can use to gather information from the Yearn contracts.",source:"@site/docs/developers/data-services/queries.md",sourceDirName:"data-services",slug:"/data-services/queries",permalink:"/developers/data-services/queries",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1724183848e3,frontMatter:{},sidebar:"developers",previous:{title:"entities",permalink:"/developers/data-services/entities"},next:{title:"Yearn Lens",permalink:"/developers/data-services/yearn-lens"}},c={},d=[];function l(n){const e={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,t.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"subgraph-queries",children:"Subgraph Queries"}),"\n",(0,s.jsx)(e.p,{children:"Below are some sample queries you can use to gather information from the Yearn contracts."}),"\n",(0,s.jsxs)(e.p,{children:["You can build your own queries using a ",(0,s.jsx)(e.a,{href:"https://graphiql-online.com/graphiql",children:"GraphQL Explorer"})," and enter your endpoint to limit the data to exactly what you need."]}),"\n",(0,s.jsx)(e.h1,{id:"get-account-info-by-id",children:"Get Account info by ID"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-graphql",children:'{\r\n  accounts(where: { id: "0x19d3364a399d251e894ac732651be8b0e4e85001" }) {\r\n    id\r\n    withdrawals {\r\n      id\r\n      timestamp\r\n      vault {\r\n        shareToken {\r\n          symbol\r\n        }\r\n        token {\r\n          symbol\r\n        }\r\n      }\r\n      tokenAmount\r\n      sharesBurnt\r\n    }\r\n  }\r\n}\n'})}),"\n",(0,s.jsx)(e.h1,{id:"get-account-vault-positions-by-id",children:"Get Account Vault Positions by ID"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-graphql",children:'{\r\n  accountVaultPositions(\r\n    where: { account: "0x05f9e07afccd4ea69310e316f4c5ef81ed3ed9c8" }\r\n  ) {\r\n    token {\r\n      symbol\r\n    }\r\n    shareToken {\r\n      symbol\r\n    }\r\n    vault {\r\n      id\r\n      token {\r\n        symbol\r\n      }\r\n      shareToken {\r\n        symbol\r\n      }\r\n    }\r\n    account {\r\n      id\r\n    }\r\n    balanceShares\r\n    balanceTokens\r\n    balancePosition\r\n    updates(orderBy: blockNumber, orderDirection: desc) {\r\n      id\r\n      blockNumber\r\n      transaction {\r\n        event\r\n        hash\r\n      }\r\n      deposits\r\n      withdrawals\r\n      sharesMinted\r\n      sharesBurnt\r\n      tokensSent\r\n      tokensReceived\r\n      sharesSent\r\n      sharesReceived\r\n    }\r\n    latestUpdate {\r\n      id\r\n    }\r\n    transaction {\r\n      hash\r\n    }\r\n  }\r\n}\n'})}),"\n",(0,s.jsx)(e.h1,{id:"get-account-vault-position-updates",children:"Get Account Vault Position Updates"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-graphql",children:'{\r\n  accounts(where: { id: "0xfddb9ea284e486579c010a75b551614525ad014f" }) {\r\n    id\r\n    vaultPositions {\r\n      id\r\n      token {\r\n        symbol\r\n      }\r\n      shareToken {\r\n        symbol\r\n      }\r\n      vault {\r\n        id\r\n      }\r\n      balanceShares\r\n      balanceTokens\r\n      balancePosition\r\n      updates {\r\n        id\r\n        transaction {\r\n          event\r\n          hash\r\n        }\r\n        deposits\r\n        withdrawals\r\n        sharesMinted\r\n        sharesBurnt\r\n        tokensSent\r\n        tokensReceived\r\n        sharesSent\r\n        sharesReceived\r\n      }\r\n    }\r\n  }\r\n}\n'})}),"\n",(0,s.jsx)(e.h1,{id:"get-all-accounts",children:"Get all Accounts"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-graphql",children:"{\r\n  accounts {\r\n    id\r\n    sharesSent {\r\n      id\r\n      shareToken {\r\n        symbol\r\n      }\r\n      token {\r\n        symbol\r\n      }\r\n      amount\r\n      tokenAmount\r\n    }\r\n  }\r\n}\n"})})]})}function u(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},28453:(n,e,r)=>{r.d(e,{R:()=>o,x:()=>i});var s=r(96540);const t={},a=s.createContext(t);function o(n){const e=s.useContext(a);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),s.createElement(a.Provider,{value:e},n.children)}}}]);