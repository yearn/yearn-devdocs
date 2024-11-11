"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[2900],{96182:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>a});var n=s(74848),r=s(28453);const i={},l=void 0,c={id:"smart-contracts/deprecated/V2/version-0.3.4/test/TestGuestList",title:"TestGuestList",description:"A basic guest list contract for testing.",source:"@site/docs/developers/smart-contracts/deprecated/V2/version-0.3.4/test/TestGuestList.md",sourceDirName:"smart-contracts/deprecated/V2/version-0.3.4/test",slug:"/smart-contracts/deprecated/V2/version-0.3.4/test/TestGuestList",permalink:"/developers/smart-contracts/deprecated/V2/version-0.3.4/test/TestGuestList",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1731361534e3,frontMatter:{},sidebar:"developers",previous:{title:"AffiliateToken",permalink:"/developers/smart-contracts/deprecated/V2/version-0.3.4/test/AffiliateToken"},next:{title:"TestStrategy",permalink:"/developers/smart-contracts/deprecated/V2/version-0.3.4/test/TestStrategy"}},d={},a=[{value:"Functions",id:"functions",level:2},{value:"constructor",id:"constructor",level:3},{value:"setGuests",id:"setguests",level:3},{value:"Parameters:",id:"parameters",level:4},{value:"authorized",id:"authorized",level:3},{value:"Parameters:",id:"parameters-1",level:4}];function o(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"A basic guest list contract for testing."}),"\n",(0,n.jsxs)(t.p,{children:["For a Vyper implementation of this contract containing additional\nfunctionality, see ",(0,n.jsx)(t.a,{href:"https://github.com/banteg/guest-list/blob/master/contracts/GuestList.vy",children:"https://github.com/banteg/guest-list/blob/master/contracts/GuestList.vy"})]}),"\n",(0,n.jsx)(t.h2,{id:"functions",children:"Functions"}),"\n",(0,n.jsx)(t.h3,{id:"constructor",children:"constructor"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-solidity",children:"  function constructor(\n  ) public\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Create the test guest list, setting the message sender as\n",(0,n.jsx)(t.code,{children:"bouncer"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Note that since this is just for testing, you're unable to change\n",(0,n.jsx)(t.code,{children:"bouncer"}),"."]}),"\n",(0,n.jsx)(t.h3,{id:"setguests",children:"setGuests"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-solidity",children:"  function setGuests(\n    address[] _guests,\n    bool[] _invited\n  ) external\n"})}),"\n",(0,n.jsx)(t.p,{children:"Invite guests or kick them from the party."}),"\n",(0,n.jsx)(t.h4,{id:"parameters",children:"Parameters:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:(0,n.jsx)(t.code,{children:"_guests"})}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"address[]"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The guests to add or update."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:(0,n.jsx)(t.code,{children:"_invited"})}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"bool[]"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"A flag for each guest at the matching index, inviting or"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"uninviting the guest."}),(0,n.jsx)(t.td,{style:{textAlign:"left"}}),(0,n.jsx)(t.td,{style:{textAlign:"left"}})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"authorized",children:"authorized"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-solidity",children:"  function authorized(\n    address _guest,\n    uint256 _amount\n  ) external returns (bool)\n"})}),"\n",(0,n.jsx)(t.p,{children:"Check if a guest with a bag of a certain size is allowed into\nthe party."}),"\n",(0,n.jsxs)(t.p,{children:["Note that ",(0,n.jsx)(t.code,{children:"_amount"})," isn't checked to keep test setup simple, since\nfrom the vault tests' perspective this is a pass/fail call anyway."]}),"\n",(0,n.jsx)(t.h4,{id:"parameters-1",children:"Parameters:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:(0,n.jsx)(t.code,{children:"_guest"})}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"address"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The guest's address to check."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:(0,n.jsx)(t.code,{children:"_amount"})}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"uint256"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Not used. The amount of tokens the guest is bringing."})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>l,x:()=>c});var n=s(96540);const r={},i=n.createContext(r);function l(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);