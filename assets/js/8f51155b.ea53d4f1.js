"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[4660],{76195:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var i=t(74848),s=t(28453);const r={},a="Ledger Plugin",l={id:"v2/ledger-plugin",title:"Ledger Plugin",description:"The plugin allows you to interact with the Yearn website directly from your Ledger Live application, and to be able to see what you sign on your device.",source:"@site/docs/developers/v2/ledger-plugin.md",sourceDirName:"v2",slug:"/v2/ledger-plugin",permalink:"/developers/v2/ledger-plugin",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1638434104e3,frontMatter:{},sidebar:"mySidebar",previous:{title:"Naming Conventions",permalink:"/developers/v2/naming-convention"},next:{title:"Overview",permalink:"/developers/v2/yearn-data"}},d={},o=[{value:"Setup your environment",id:"setup-your-environment",level:2},{value:"Start coding",id:"start-coding",level:2},{value:"Testing",id:"testing",level:2}];function c(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"ledger-plugin",children:"Ledger Plugin"}),"\n",(0,i.jsx)(n.p,{children:"The plugin allows you to interact with the Yearn website directly from your Ledger Live application, and to be able to see what you sign on your device."}),"\n",(0,i.jsxs)(n.p,{children:["Every addition, deletion, and modification of a Vault should be reflected in this plugin and will require a verification by the Ledger's Team based on a new pull request on the ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn",children:"LedgerHQ/app-plugin-yearn"})," repository."]}),"\n",(0,i.jsx)(n.p,{children:"This guide provides an easy step by step to add a new vault."}),"\n",(0,i.jsx)(n.h2,{id:"setup-your-environment",children:"Setup your environment"}),"\n",(0,i.jsx)(n.p,{children:"You should follow the following official ledger instructions to set up your environment:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://developers.ledger.com/docs/nano-app/introduction/",children:"Developing and submitting a Nano app"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://hackmd.io/300Ukv5gSbCbVcp3cZuwRQ",children:"Plugin dev process"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This is a very large step that requires a full setup and the installation of a lot of packages. If you are working with Mac or Windows, you should consider a Virtual Machine to be able to test the plugin."}),"\n",(0,i.jsxs)(n.p,{children:["Then, you should clone the ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn",children:"plugin"})," repository."]}),"\n",(0,i.jsx)(n.h2,{id:"start-coding",children:"Start coding"}),"\n",(0,i.jsx)(n.p,{children:"Here are the modifications you should do :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn/blob/main/src/yearn_plugin.h#L51",children:"src/yearn_plugin.h"})," which contains a ",(0,i.jsx)(n.code,{children:"NUM_YEARN_VAULTS"})," parameter that defines the number of vaults in the plugin mapping. You should just increment that by the number of vaults you want to add."]}),"\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn/blob/main/src/main.c#L57",children:"src/main.c"})," which contains a ",(0,i.jsx)(n.code,{children:"YEARN_VAULTS"})," mapping with the details of all the vaults. You should add a new line with the corresponding details of the new vault. Params are, in order: [",(0,i.jsx)(n.code,{children:"vault_address"}),", ",(0,i.jsx)(n.code,{children:"underlying_token_symbol"}),", ",(0,i.jsx)(n.code,{children:"vault_symbol"}),", ",(0,i.jsx)(n.code,{children:"number_of_decimals"}),"]."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-c",children:'    // For the address `0xbfa4d8aa6d8a379abfe7793399d3ddacc5bbecbb`, just add `0x` every 2 characters.\n    {{0xbf, 0xa4, 0xd8, 0xaa, 0x6d, 0x8a, 0x37, 0x9a, 0xbf, 0xe7,\n      0x79, 0x33, 0x99, 0xd3, 0xdd, 0xac, 0xc5, 0xbb, 0xec, 0xbb},\n     "DAI",\n     "yvDAI",\n     18},\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn/blob/main/tests/yearn/b2c.json",children:"tests/yearn/b2c.json"})," you should add a new element in the JSON file, with the vault address ",(0,i.jsx)(n.strong,{children:"in lowercase"}),", the vault name, and an array of selectors. For V0.4.3, you should copy the selectors in the example below."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n\t"address": "address_of_the_new_vault_in_lowercase",\n\t"contractName": "name_of_the_vault",\n\t"selectors": {\n\t\t"0xd0e30db0": {"erc20OfInterest": [], "method": "deposit_all", "plugin": "Yearn"},\n\t\t"0xb6b55f25": {"erc20OfInterest": [], "method": "deposit", "plugin": "Yearn"},\n\t\t"0x6e553f65": {"erc20OfInterest": [], "method": "deposit_to", "plugin": "Yearn"},\n\t\t"0x3ccfd60b": {"erc20OfInterest": [], "method": "withdraw_all", "plugin": "Yearn"},\n\t\t"0x2e1a7d4d": {"erc20OfInterest": [], "method": "withdraw", "plugin": "Yearn"},\n\t\t"0x00f714ce": {"erc20OfInterest": [], "method": "withdraw_to", "plugin": "Yearn"},\n\t\t"0xe63697c8": {"erc20OfInterest": [], "method": "withdraw_to_with_slippage", "plugin": "Yearn"}\n\t}\n}\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn/tree/main/tests/yearn/abis",children:"tests/yearn/abis/"})," add a new file in the format ",(0,i.jsx)(n.code,{children:"address_of_the_new_vault_in_lowercase.json"})," with the abi of the new vault in it."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"testing",children:"Testing"}),"\n",(0,i.jsxs)(n.p,{children:["As there is no change in the plugin itself, tests may not be updated.",(0,i.jsx)(n.br,{}),"\n","However, this is a good practice to test the plugin. Theoretically, you should test all the selectors for both the Nano S and the Nano X.\nYou can check the tests in ",(0,i.jsx)(n.a,{href:"https://github.com/LedgerHQ/app-plugin-yearn/tree/main/tests/src",children:"tests/src/"})," and update the ",(0,i.jsx)(n.code,{children:"contractAddr"})," variable in:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"deposit_18_decimals.test.js"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"deposit_18_decimals_to.test.js"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"deposit_all.test.js"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"withdraw_18_decimals.test.js"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"withdraw_18_decimals_to.test.js"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"withdraw_18_decimals_to_slippage.test.js"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"withdraw_all.test.js"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["You can check the process to execute the tests ",(0,i.jsx)(n.a,{href:"https://hackmd.io/300Ukv5gSbCbVcp3cZuwRQ#Testing",children:"here"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>l});var i=t(96540);const s={},r=i.createContext(s);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);