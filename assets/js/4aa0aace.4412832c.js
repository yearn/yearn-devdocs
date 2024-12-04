"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[5755],{34289:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>o,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var s=n(74848),i=n(28453);const r={},d="DebtAllocator.sol",a={id:"smart-contracts/deprecated/V3/version-3.0.2/periphery/DebtAllocator",title:"DebtAllocator.sol",description:"Git Source",source:"@site/docs/developers/smart-contracts/deprecated/V3/version-3.0.2/periphery/DebtAllocator.md",sourceDirName:"smart-contracts/deprecated/V3/version-3.0.2/periphery",slug:"/smart-contracts/deprecated/V3/version-3.0.2/periphery/DebtAllocator",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/periphery/DebtAllocator",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1731361534e3,frontMatter:{},sidebar:"developers",previous:{title:"CommonReportTrigger.sol",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/periphery/CommonReportTrigger"},next:{title:"Governance.sol",permalink:"/developers/smart-contracts/deprecated/V3/version-3.0.2/periphery/Governance"}},l={},c=[{value:"State Variables",id:"state-variables",level:2},{value:"MAX_BPS",id:"max_bps",level:3},{value:"factory",id:"factory",level:3},{value:"vault",id:"vault",level:3},{value:"minimumWait",id:"minimumwait",level:3},{value:"minimumChange",id:"minimumchange",level:3},{value:"totalDebtRatio",id:"totaldebtratio",level:3},{value:"maxDebtUpdateLoss",id:"maxdebtupdateloss",level:3},{value:"managers",id:"managers",level:3},{value:"_configs",id:"_configs",level:3},{value:"Functions",id:"functions",level:2},{value:"onlyGovernance",id:"onlygovernance",level:3},{value:"onlyManagers",id:"onlymanagers",level:3},{value:"onlyKeepers",id:"onlykeepers",level:3},{value:"_isGovernance",id:"_isgovernance",level:3},{value:"_isManager",id:"_ismanager",level:3},{value:"_isKeeper",id:"_iskeeper",level:3},{value:"constructor",id:"constructor",level:3},{value:"initialize",id:"initialize",level:3},{value:"update_debt",id:"update_debt",level:3},{value:"shouldUpdateDebt",id:"shouldupdatedebt",level:3},{value:"increaseStrategyDebtRatio",id:"increasestrategydebtratio",level:3},{value:"decreaseStrategyDebtRatio",id:"decreasestrategydebtratio",level:3},{value:"setStrategyDebtRatio",id:"setstrategydebtratio",level:3},{value:"setStrategyDebtRatio",id:"setstrategydebtratio-1",level:3},{value:"removeStrategy",id:"removestrategy",level:3},{value:"setMinimumChange",id:"setminimumchange",level:3},{value:"setMaxDebtUpdateLoss",id:"setmaxdebtupdateloss",level:3},{value:"setMinimumWait",id:"setminimumwait",level:3},{value:"setManager",id:"setmanager",level:3},{value:"getConfig",id:"getconfig",level:3},{value:"getStrategyTargetRatio",id:"getstrategytargetratio",level:3},{value:"getStrategyMaxRatio",id:"getstrategymaxratio",level:3},{value:"Events",id:"events",level:2},{value:"UpdateStrategyDebtRatio",id:"updatestrategydebtratio",level:3},{value:"StrategyChanged",id:"strategychanged",level:3},{value:"UpdateMinimumWait",id:"updateminimumwait",level:3},{value:"UpdateMinimumChange",id:"updateminimumchange",level:3},{value:"UpdateManager",id:"updatemanager",level:3},{value:"UpdateMaxDebtUpdateLoss",id:"updatemaxdebtupdateloss",level:3},{value:"Structs",id:"structs",level:2},{value:"Config",id:"config",level:3},{value:"Enums",id:"enums",level:2},{value:"Status",id:"status",level:3}];function h(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"debtallocatorsol",children:"DebtAllocator.sol"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://github.com/yearn/vault-periphery/blob/master/contracts/debtAllocators/DebtAllocator.sol",children:"Git Source"})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Author:"}),"\nyearn.finance"]}),"\n",(0,s.jsxs)(t.p,{children:["This Debt Allocator is meant to be used alongside\na Yearn V3 vault to provide the needed triggers for a keeper\nto perform automated debt updates for the vaults strategies.\nEach allocator contract will serve one Vault and each strategy\nthat should be managed by this allocator will need to be added\nmanually by setting a ",(0,s.jsx)(t.code,{children:"targetRatio"})," and ",(0,s.jsx)(t.code,{children:"maxRatio"}),".\nThe allocator aims to allocate debt between the strategies\nbased on their set target ratios. Which are denominated in basis\npoints and represent the percent of total assets that specific\nstrategy should hold.\nThe trigger will attempt to allocate up to the ",(0,s.jsx)(t.code,{children:"maxRatio"})," when\nthe strategy has ",(0,s.jsx)(t.code,{children:"minimumChange"})," amount less than the ",(0,s.jsx)(t.code,{children:"targetRatio"}),".\nAnd will pull funds from the strategy when it has ",(0,s.jsx)(t.code,{children:"minimumChange"}),"\nmore than its ",(0,s.jsx)(t.code,{children:"maxRatio"}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"state-variables",children:"State Variables"}),"\n",(0,s.jsx)(t.h3,{id:"max_bps",children:"MAX_BPS"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"uint256 internal constant MAX_BPS = 10_000;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"factory",children:"factory"}),"\n",(0,s.jsx)(t.p,{children:"Address to get permissioned roles from."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"address public immutable factory;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"vault",children:"vault"}),"\n",(0,s.jsx)(t.p,{children:"Address of the vault this serves as allocator for."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"address public vault;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"minimumwait",children:"minimumWait"}),"\n",(0,s.jsx)(t.p,{children:"Time to wait between debt updates in seconds."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"uint256 public minimumWait;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"minimumchange",children:"minimumChange"}),"\n",(0,s.jsx)(t.p,{children:"The minimum amount denominated in asset that will"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"uint256 public minimumChange;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"totaldebtratio",children:"totalDebtRatio"}),"\n",(0,s.jsx)(t.p,{children:"Total debt ratio currently allocated in basis points."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"uint256 public totalDebtRatio;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"maxdebtupdateloss",children:"maxDebtUpdateLoss"}),"\n",(0,s.jsx)(t.p,{children:"Max loss to accept on debt updates in basis points."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"uint256 public maxDebtUpdateLoss;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"managers",children:"managers"}),"\n",(0,s.jsx)(t.p,{children:"Mapping of addresses that are allowed to update debt ratios."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"mapping(address => bool) public managers;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"_configs",children:"_configs"}),"\n",(0,s.jsx)(t.p,{children:"Mapping of strategy => its config."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"mapping(address => Config) internal _configs;\n"})}),"\n",(0,s.jsx)(t.h2,{id:"functions",children:"Functions"}),"\n",(0,s.jsx)(t.h3,{id:"onlygovernance",children:"onlyGovernance"}),"\n",(0,s.jsx)(t.p,{children:"Make sure the caller is governance."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"modifier onlyGovernance();\n"})}),"\n",(0,s.jsx)(t.h3,{id:"onlymanagers",children:"onlyManagers"}),"\n",(0,s.jsx)(t.p,{children:"Make sure the caller is governance or a manager."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"modifier onlyManagers();\n"})}),"\n",(0,s.jsx)(t.h3,{id:"onlykeepers",children:"onlyKeepers"}),"\n",(0,s.jsx)(t.p,{children:"Make sure the caller is a keeper"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"modifier onlyKeepers();\n"})}),"\n",(0,s.jsx)(t.h3,{id:"_isgovernance",children:"_isGovernance"}),"\n",(0,s.jsx)(t.p,{children:"Check the Factories governance address."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function _isGovernance() internal view virtual;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"_ismanager",children:"_isManager"}),"\n",(0,s.jsx)(t.p,{children:"Check is either factories governance or local manager."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function _isManager() internal view virtual;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"_iskeeper",children:"_isKeeper"}),"\n",(0,s.jsx)(t.p,{children:"Check is one of the allowed keepers."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function _isKeeper() internal view virtual;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"constructor",children:"constructor"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"constructor();\n"})}),"\n",(0,s.jsx)(t.h3,{id:"initialize",children:"initialize"}),"\n",(0,s.jsx)(t.p,{children:"Initializes the debt allocator."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Should be called atomically after cloning."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function initialize(address _vault, uint256 _minimumChange) public virtual;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_vault"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the vault this allocates debt for."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_minimumChange"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The minimum in asset that must be moved."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"update_debt",children:"update_debt"}),"\n",(0,s.jsx)(t.p,{children:"Debt update wrapper for the vault."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"This can be used if a minimum time between debt updates\nis desired to be used for the trigger and to enforce a max loss.\nThis contract must have the DEBT_MANAGER role assigned to them.\nThe function signature matches the vault so no update to the\ncall data is required.\nThis will also run checks on losses realized during debt\nupdates to assure decreases did not realize profits outside\nof the allowed range."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function update_debt(address _strategy, uint256 _targetDebt) public virtual onlyKeepers;\n"})}),"\n",(0,s.jsx)(t.h3,{id:"shouldupdatedebt",children:"shouldUpdateDebt"}),"\n",(0,s.jsx)(t.p,{children:"Check if a strategy's debt should be updated."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"This should be called by a keeper to decide if a strategies\ndebt should be updated and if so by how much."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function shouldUpdateDebt(address _strategy) public view virtual returns (bool, bytes memory);\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the strategy to check."})]})})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Returns"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"<none>"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"bool"})}),(0,s.jsx)(t.td,{children:". Bool representing if the debt should be updated."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"<none>"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"bytes"})}),(0,s.jsxs)(t.td,{children:[". Calldata if ",(0,s.jsx)(t.code,{children:"true"})," or reason if ",(0,s.jsx)(t.code,{children:"false"}),"."]})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"increasestrategydebtratio",children:"increaseStrategyDebtRatio"}),"\n",(0,s.jsx)(t.p,{children:"Increase a strategies target debt ratio."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:[(0,s.jsx)(t.code,{children:"setStrategyDebtRatio"})," functions will do all needed checks."]})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function increaseStrategyDebtRatio(address _strategy, uint256 _increase) external virtual;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"The address of the strategy to increase the debt ratio for."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_increase"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The amount in Basis Points to increase it."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"decreasestrategydebtratio",children:"decreaseStrategyDebtRatio"}),"\n",(0,s.jsx)(t.p,{children:"Decrease a strategies target debt ratio."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function decreaseStrategyDebtRatio(address _strategy, uint256 _decrease) external virtual;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"The address of the strategy to decrease the debt ratio for."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_decrease"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The amount in Basis Points to decrease it."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"setstrategydebtratio",children:"setStrategyDebtRatio"}),"\n",(0,s.jsx)(t.p,{children:"Sets a new target debt ratio for a strategy."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"This will default to a 20% increase for max debt."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setStrategyDebtRatio(address _strategy, uint256 _targetRatio) public virtual;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the strategy to set."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_targetRatio"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"Amount in Basis points to allocate."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"setstrategydebtratio-1",children:"setStrategyDebtRatio"}),"\n",(0,s.jsx)(t.p,{children:"Sets a new target debt ratio for a strategy."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["A ",(0,s.jsx)(t.code,{children:"minimumChange"})," for that strategy must be set first.\nThis is to prevent debt from being updated too frequently."]})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setStrategyDebtRatio(address _strategy, uint256 _targetRatio, uint256 _maxRatio) public virtual onlyManagers;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the strategy to set."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_targetRatio"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"Amount in Basis points to allocate."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_maxRatio"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"Max ratio to give on debt increases."})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"removestrategy",children:"removeStrategy"}),"\n",(0,s.jsx)(t.p,{children:"Remove a strategy from this debt allocator."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Will delete the full config for the strategy"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function removeStrategy(address _strategy) external virtual onlyManagers;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the address ro remove."})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"setminimumchange",children:"setMinimumChange"}),"\n",(0,s.jsx)(t.p,{children:"Set the minimum change variable for a strategy."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"This is the minimum amount of debt to be\nadded or pulled for it to trigger an update."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setMinimumChange(uint256 _minimumChange) external virtual onlyGovernance;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_minimumChange"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The new minimum to set for the strategy."})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"setmaxdebtupdateloss",children:"setMaxDebtUpdateLoss"}),"\n",(0,s.jsx)(t.p,{children:"Set the max loss in Basis points to allow on debt updates."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsxs)(t.em,{children:["Withdrawing during debt updates use ",(0,s.jsx)(t.code,{children:"redeem"})," which allows for 100% loss.\nThis can be used to assure a loss is not realized on redeem outside the tolerance."]})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setMaxDebtUpdateLoss(uint256 _maxDebtUpdateLoss) external virtual onlyGovernance;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_maxDebtUpdateLoss"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The max loss to accept on debt updates."})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"setminimumwait",children:"setMinimumWait"}),"\n",(0,s.jsx)(t.p,{children:"Set the minimum time to wait before re-updating a strategies debt."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"This is only enforced per strategy."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setMinimumWait(uint256 _minimumWait) external virtual onlyGovernance;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_minimumWait"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The minimum time in seconds to wait."})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"setmanager",children:"setManager"}),"\n",(0,s.jsx)(t.p,{children:"Set if a manager can update ratios."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function setManager(address _address, bool _allowed) external virtual onlyGovernance;\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_address"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"The address to set mapping for."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_allowed"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"bool"})}),(0,s.jsxs)(t.td,{children:["If the address can call ",(0,s.jsx)(t.a,{href:"#update_debt",children:"update_debt"}),"."]})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"getconfig",children:"getConfig"}),"\n",(0,s.jsx)(t.p,{children:"Get a strategies full config."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Used for customizations by inheriting the contract."})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function getConfig(address _strategy) public view virtual returns (Config memory);\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the strategy."})]})})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Returns"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"<none>"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"Config"})}),(0,s.jsx)(t.td,{children:"The strategies current Config."})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"getstrategytargetratio",children:"getStrategyTargetRatio"}),"\n",(0,s.jsx)(t.p,{children:"Get a strategies target debt ratio."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function getStrategyTargetRatio(address _strategy) external view virtual returns (uint256);\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the strategy."})]})})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Returns"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"<none>"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The strategies current targetRatio."})]})})]}),"\n",(0,s.jsx)(t.h3,{id:"getstrategymaxratio",children:"getStrategyMaxRatio"}),"\n",(0,s.jsx)(t.p,{children:"Get a strategies max debt ratio."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"function getStrategyMaxRatio(address _strategy) external view virtual returns (uint256);\n"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Parameters"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"_strategy"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"address"})}),(0,s.jsx)(t.td,{children:"Address of the strategy."})]})})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Returns"})}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"<none>"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"uint256"})}),(0,s.jsx)(t.td,{children:"The strategies current maxRatio."})]})})]}),"\n",(0,s.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(t.h3,{id:"updatestrategydebtratio",children:"UpdateStrategyDebtRatio"}),"\n",(0,s.jsx)(t.p,{children:"An event emitted when a strategies debt ratios are Updated."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"event UpdateStrategyDebtRatio(\n    address indexed strategy, uint256 newTargetRatio, uint256 newMaxRatio, uint256 newTotalDebtRatio\n);\n"})}),"\n",(0,s.jsx)(t.h3,{id:"strategychanged",children:"StrategyChanged"}),"\n",(0,s.jsx)(t.p,{children:"An event emitted when a strategy is added or removed."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"event StrategyChanged(address indexed strategy, Status status);\n"})}),"\n",(0,s.jsx)(t.h3,{id:"updateminimumwait",children:"UpdateMinimumWait"}),"\n",(0,s.jsx)(t.p,{children:"An event emitted when the minimum time to wait is updated."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"event UpdateMinimumWait(uint256 newMinimumWait);\n"})}),"\n",(0,s.jsx)(t.h3,{id:"updateminimumchange",children:"UpdateMinimumChange"}),"\n",(0,s.jsx)(t.p,{children:"An event emitted when the minimum change is updated."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"event UpdateMinimumChange(uint256 newMinimumChange);\n"})}),"\n",(0,s.jsx)(t.h3,{id:"updatemanager",children:"UpdateManager"}),"\n",(0,s.jsx)(t.p,{children:"An event emitted when a keeper is added or removed."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"event UpdateManager(address indexed manager, bool allowed);\n"})}),"\n",(0,s.jsx)(t.h3,{id:"updatemaxdebtupdateloss",children:"UpdateMaxDebtUpdateLoss"}),"\n",(0,s.jsx)(t.p,{children:"An event emitted when the max debt update loss is updated."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"event UpdateMaxDebtUpdateLoss(uint256 newMaxDebtUpdateLoss);\n"})}),"\n",(0,s.jsx)(t.h2,{id:"structs",children:"Structs"}),"\n",(0,s.jsx)(t.h3,{id:"config",children:"Config"}),"\n",(0,s.jsx)(t.p,{children:"Struct for each strategies info."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"struct Config {\n    bool added;\n    uint16 targetRatio;\n    uint16 maxRatio;\n    uint96 lastUpdate;\n    uint120 open;\n}\n"})}),"\n",(0,s.jsx)(t.h2,{id:"enums",children:"Enums"}),"\n",(0,s.jsx)(t.h3,{id:"status",children:"Status"}),"\n",(0,s.jsx)(t.p,{children:"Status when a strategy is added or removed from the allocator."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-solidity",children:"enum Status {\n    NULL,\n    ADDED,\n    REMOVED\n}\n"})})]})}function o(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>a});var s=n(96540);const i={},r=s.createContext(i);function d(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);