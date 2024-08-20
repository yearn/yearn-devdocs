"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[9907],{48710:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>o,frontMatter:()=>n,metadata:()=>a,toc:()=>h});var r=s(74848),i=s(28453);const n={},c="Multisig",a={id:"security/multisig",title:"Multisig",description:"How it works",source:"@site/docs/developers/security/multisig.md",sourceDirName:"security",slug:"/security/multisig",permalink:"/developers/security/multisig",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1724183848e3,frontMatter:{},sidebar:"developers",previous:{title:"Security Home",permalink:"/developers/security/"},next:{title:"Risk Scores",permalink:"/developers/security/risks/risk-score"}},d={},h=[{value:"How it works",id:"how-it-works",level:2},{value:"Members",id:"members",level:2},{value:"History",id:"history",level:2}];function l(e){const t={a:"a",br:"br",h1:"h1",h2:"h2",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"multisig",children:"Multisig"}),"\n",(0,r.jsx)(t.h2,{id:"how-it-works",children:"How it works"}),"\n",(0,r.jsxs)(t.p,{children:["The multisig is implemented by a 6-of-9 multi-signature wallet. The members of the multi-signature wallet were voted in by YFI holders and are subject to change from future governance votes. Specific powers are delegated to the governance multisig, as defined by ",(0,r.jsx)(t.a,{href:"https://gov.yearn.fi/t/yip-41-temporarily-empower-multisig/3630",children:"Governance 2.0"}),". More information about Yearn governance and how it interacts with the multisig can be found on the ",(0,r.jsx)(t.a,{href:"https://docs.yearn.fi/resources/faq#governance",children:"FAQ"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["The multisig is implemented as a Gnosis Safe. The multisig's assets, transactions, and signers can be viewed using ",(0,r.jsx)(t.a,{href:"https://app.safe.global/home?safe=eth:0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52",children:"Gnosis's Web UI"}),". If there is a need to trustlessly audit Yearn's multisig (without trusting the Gnosis site), the Gnosis Safe web app source code can be found on Github ",(0,r.jsx)(t.a,{href:"https://github.com/gnosis/safe-react",children:"here"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"members",children:"Members"}),"\n",(0,r.jsxs)(t.p,{children:["Multisig membership can be validated from the Gnosis UI ",(0,r.jsx)(t.a,{href:"https://app.safe.global/settings/setup?safe=eth:0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52",children:"here"}),".",(0,r.jsx)(t.br,{}),"\n","Cryptographic membership attestations can be validated against the PGP keys in the ",(0,r.jsx)(t.a,{href:"https://github.com/yearn/yearn-security/tree/master/keys",children:"yearn-security"})," repository."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Address"}),(0,r.jsx)(t.th,{children:"Member Name"}),(0,r.jsx)(t.th,{children:"Membership Attestation"}),(0,r.jsx)(t.th,{children:"Etherscan"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x0Cec743b8CE4Ef8802cAc0e5df18a180ed8402A7"}),(0,r.jsx)(t.td,{children:"Milkyklim (Yearn Finance)"}),(0,r.jsx)(t.td,{children:"keybase://public/milkyklim/yearn-social-proof.txt"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x0Cec743b8CE4Ef8802cAc0e5df18a180ed8402A7",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6"}),(0,r.jsx)(t.td,{children:"Mariano Conti (nanexcool.com, prev. MakerDAO)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/nanexcool/status/1491900804223041540",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x7321ED86B0Eb914b789D6A4CcBDd3bB10f367153"}),(0,r.jsx)(t.td,{children:"Leo Cheng (C.R.E.A.M. Finance)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/lumbergdoteth/status/1492736002724876291",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x7321ED86B0Eb914b789D6A4CcBDd3bB10f367153",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x74630370197b4c4795bFEeF6645ee14F8cf8997D"}),(0,r.jsx)(t.td,{children:"cp287 (cp0x.com)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/kaplansky1/status/1285427247286046725",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x74630370197b4c4795bFEeF6645ee14F8cf8997D",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x7A1057E6e9093DA9C1D4C1D049609B6889fC4c67"}),(0,r.jsx)(t.td,{children:"Banteg (Yearn Finance)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/bantg/status/1285426492906909696",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x7A1057E6e9093DA9C1D4C1D049609B6889fC4c67",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3"}),(0,r.jsx)(t.td,{children:"Daryl Lau (Not3Lau Capital)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/Daryllautk/status/1285434908383444992",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0xf5D3dbda5F41A0E26D71B948e29522398e71cFaE"}),(0,r.jsx)(t.td,{children:"0xngmi (DefiLlama)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/0xngmi/status/1590047391797088257",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0xf5D3dbda5F41A0E26D71B948e29522398e71cFaE",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x1496546f89fc1605880e556c9a1d6c5e2409fb0a"}),(0,r.jsx)(t.td,{children:"monoloco (Yearn Finance)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://gist.github.com/therealmonoloco/306ffd61c46c662bb7f8d7a09b2ffb02",children:"Gist"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x1496546f89fc1605880e556c9a1d6c5e2409fb0a",children:"Etherscan"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12"}),(0,r.jsx)(t.td,{children:"Lefteris Karapetsas (rotkiapp)"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://twitter.com/LefterisJP/status/1590083336210644992",children:"Twitter"})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.a,{href:"https://etherscan.io/address/0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12",children:"Etherscan"})})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"history",children:"History"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["June 2022 - ",(0,r.jsx)(t.a,{href:"https://gov.yearn.fi/t/yip-68-rotate-multisig-signers/12582",children:"YIP-68: Change Three Multisig signers"})]}),"\n",(0,r.jsxs)(t.li,{children:["May 2021 - ",(0,r.jsx)(t.a,{href:"https://gov.yearn.fi/t/yip-62-change-two-multisig-signers/10758",children:"YIP-62: Change Two Multisig Signers"})]}),"\n",(0,r.jsxs)(t.li,{children:["April 2021 - ",(0,r.jsx)(t.a,{href:"https://gov.yearn.fi/t/yip-61-governance-2-0/10460",children:"YIP-61: Governance 2.0"})]}),"\n",(0,r.jsxs)(t.li,{children:["August 2020 - ",(0,r.jsx)(t.a,{href:"https://gov.yearn.fi/t/yip-41-temporarily-empower-multisig/3630",children:"YIP-41: Temporarily Empower Multisig"})]}),"\n",(0,r.jsxs)(t.li,{children:["August 2020 - ",(0,r.jsx)(t.a,{href:"https://yips.yearn.fi/YIPS/yip-40",children:"YIP-40: Replace inactive multisig signers"})]}),"\n"]})]})}function o(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>c,x:()=>a});var r=s(96540);const i={},n=r.createContext(i);function c(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);