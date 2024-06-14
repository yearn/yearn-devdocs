"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[6912],{68349:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=n(74848),i=n(28453);const r={},o="Testing",a={id:"testing",title:"Testing",description:"It is best practice for smart contracts planned to be deployed to production to be thoroughly tested. This is especially true for smart contracts that handle user funds. A good functioning test suite is highly encouraged before sending your smart contract for security review or audits.",source:"@site/docs/security/testing.md",sourceDirName:".",slug:"/testing",permalink:"/security/testing",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1705978271e3,frontMatter:{},sidebar:"mySidebar",previous:{title:"Multisig",permalink:"/security/multisig"}},c={},l=[{value:"Best Practices",id:"best-practices",level:2},{value:"General Resources",id:"general-resources",level:2},{value:"Fuzzing and Invariant Test Resources",id:"fuzzing-and-invariant-test-resources",level:2}];function d(e){const t={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"testing",children:"Testing"}),"\n",(0,s.jsx)(t.p,{children:"It is best practice for smart contracts planned to be deployed to production to be thoroughly tested. This is especially true for smart contracts that handle user funds. A good functioning test suite is highly encouraged before sending your smart contract for security review or audits."}),"\n",(0,s.jsx)(t.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Test coverage of 100% is not required, but it is encouraged. The more coverage, the more confidence in the code."}),"\n",(0,s.jsx)(t.li,{children:"Unit tests should be written for all state-changing functions, view functions, and modifiers. Using mocks and stubs is recommended for faster testing."}),"\n",(0,s.jsx)(t.li,{children:"Integration tests should be written for all functions interacting with other contracts and main use cases covering the user interactions with the smart contract. Should include tests for all possible failure scenarios."}),"\n",(0,s.jsx)(t.li,{children:"It is recommended to have complete testing coverage on the failure scenarios of your smart contracts. As a rule of thumb the failure scenarios should have more tests than the happy paths."}),"\n",(0,s.jsx)(t.li,{children:"Fuzz tests should be written for all functions that handle user funds. Fuzz tests should be run on a fork of mainnet to ensure the smart contract behaves as expected in a production environment with as many inputs and states."}),"\n",(0,s.jsx)(t.li,{children:"Invariant tests or property tests are recommended to document and write down the important invariants your smart contract should hold in all states and validate the contract handles as expected."}),"\n",(0,s.jsx)(t.li,{children:"A good CI pipeline is recommended to run all tests on every commit and pull request. This ensures the code is always tested and no new code is merged without passing all tests."}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"general-resources",children:"General Resources"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://ethereum.org/en/developers/docs/smart-contracts/testing",children:"Testing Smart Contracts"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://book.getfoundry.sh/forge/writing-tests",children:"Writing Tests in Foundry"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://book.getfoundry.sh/forge/cheatcodes",children:"Foundry cheat codes"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://book.getfoundry.sh/forge/fork-testing",children:"Foundry Fork Testing"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://docs.apeworx.io/ape/stable/userguides/testing.html",children:"Testing with ape framework"})}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"fuzzing-and-invariant-test-resources",children:"Fuzzing and Invariant Test Resources"}),"\n",(0,s.jsx)(t.p,{children:"Links:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.nascent.xyz/idea/youre-writing-require-statements-wrong",children:"You\u2019re Writing Require Statements Wrong"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.rareskills.io/post/invariant-testing-solidity",children:"Invariant Testing Solidity"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://dacian.me/exploiting-precision-loss-via-fuzz-testing",children:"Exploiting Precision Loss via Fuzz Testing"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://book.getfoundry.sh/forge/fuzz-testing",children:"Foundry Fuzzing"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://book.getfoundry.sh/forge/invariant-testing",children:"Foundry Invariant Testing"})}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Videos:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.youtube.com/watch?v=juyY-CTolac&t=300s",children:"Intro to Fuzz and Invariant Testing"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.youtube.com/watch?v=YAF79t_Sfiw",children:"Invariant Testing Workshop"})}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://www.youtube.com/watch?v=QofNQxW_K08&list=PLciHOL_J7Iwqdja9UH4ZzE8dP1IxtsBXI",children:"TOB Playlist on Echidna"})," (helps think about testing invariants and also fuzzing)"]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var s=n(96540);const i={},r=s.createContext(i);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);