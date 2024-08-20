"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[8576],{85205:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>o});var t=r(74848),a=r(28453);const s={},i="PeripheryPayments.sol",l={id:"smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router/PeripheryPayments",title:"PeripheryPayments.sol",description:"Immutable state used by periphery contracts",source:"@site/docs/developers/smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router/PeripheryPayments.md",sourceDirName:"smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router",slug:"/smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router/PeripheryPayments",permalink:"/developers/smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router/PeripheryPayments",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1722959028e3,frontMatter:{},sidebar:"developers",previous:{title:"Multicall",permalink:"/developers/smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router/Multicall"},next:{title:"SelfPermit.sol",permalink:"/developers/smart-contracts/V3/Current-v3.0.2/\ud83d\udcc4 Periphery/Yearn4626Router/SelfPermit"}},c={},o=[{value:"State Variables",id:"state-variables",level:2},{value:"WETH9",id:"weth9",level:3},{value:"Functions",id:"functions",level:2},{value:"constructor",id:"constructor",level:3},{value:"receive",id:"receive",level:3},{value:"approve",id:"approve",level:3},{value:"unwrapWETH9",id:"unwrapweth9",level:3},{value:"wrapWETH9",id:"wrapweth9",level:3},{value:"pullToken",id:"pulltoken",level:3},{value:"sweepToken",id:"sweeptoken",level:3},{value:"refundETH",id:"refundeth",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"peripherypaymentssol",children:"PeripheryPayments.sol"}),"\n",(0,t.jsxs)(n.p,{children:["Immutable state used by periphery contracts\nLargely Forked from ",(0,t.jsx)(n.a,{href:"https://github.com/Uniswap/v3-periphery/blob/main/contracts/base/PeripheryPayments.sol",children:"https://github.com/Uniswap/v3-periphery/blob/main/contracts/base/PeripheryPayments.sol"}),"\nChanges:\nno interface\nno inheritdoc\nadd immutable WETH9 in constructor instead of PeripheryImmutableState\nreceive from any address\nSolmate interfaces and transfer lib\ncasting\nadd approve, wrapWETH9 and pullToken"]}),"\n",(0,t.jsx)(n.h2,{id:"state-variables",children:"State Variables"}),"\n",(0,t.jsx)(n.h3,{id:"weth9",children:"WETH9"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"IWETH9 public immutable WETH9;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,t.jsx)(n.h3,{id:"constructor",children:"constructor"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"constructor(IWETH9 _WETH9);\n"})}),"\n",(0,t.jsx)(n.h3,{id:"receive",children:"receive"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"receive() external payable;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"approve",children:"approve"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"function approve(ERC20 token, address to, uint256 amount) public payable;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"unwrapweth9",children:"unwrapWETH9"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"function unwrapWETH9(uint256 amountMinimum, address recipient) public payable;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"wrapweth9",children:"wrapWETH9"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"function wrapWETH9() public payable;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"pulltoken",children:"pullToken"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"function pullToken(ERC20 token, uint256 amount, address recipient) public payable;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"sweeptoken",children:"sweepToken"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"function sweepToken(ERC20 token, uint256 amountMinimum, address recipient) public payable;\n"})}),"\n",(0,t.jsx)(n.h3,{id:"refundeth",children:"refundETH"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-solidity",children:"function refundETH() external payable;\n"})})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>l});var t=r(96540);const a={},s=t.createContext(a);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);