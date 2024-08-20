"use strict";(self.webpackChunkyearn_devdocs=self.webpackChunkyearn_devdocs||[]).push([[6134],{82037:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var n=a(74848),s=a(28453);const o={},r="Deploying and Managing a V3 Vault",i={id:"v3/vault_management",title:"Deploying and Managing a V3 Vault",description:"V3 makes it as simple as possible for anyone to deploy and manage their Vaults. No longer will Yearn be the only manager of Vaults, gate-keeping who can be a debt allocator, or what strategies should be added to a vault. Now, anyone can deploy, manage, and earn fees from their vision and preferences on everything from risk profile, fee model, decentralization, etc.",source:"@site/docs/developers/v3/vault_management.md",sourceDirName:"v3",slug:"/v3/vault_management",permalink:"/developers/v3/vault_management",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedAt:1718899246e3,frontMatter:{},sidebar:"developers",previous:{title:'Guide to creating V3 "Tokenized Strategies"',permalink:"/developers/v3/strategy_writing_guide"},next:{title:"Periphery",permalink:"/developers/v3/periphery"}},l={},d=[{value:"Definitions",id:"definitions",level:2},{value:"Deployment",id:"deployment",level:2},{value:"Setup",id:"setup",level:2},{value:"Roles",id:"roles",level:3},{value:"Deposit Limit",id:"deposit-limit",level:3},{value:"Miscellaneous",id:"miscellaneous",level:3},{value:"Running the Vault",id:"running-the-vault",level:2},{value:"Strategy Management",id:"strategy-management",level:3},{value:"Debt Updates",id:"debt-updates",level:3},{value:"Reporting",id:"reporting",level:3},{value:"Customization",id:"customization",level:2},{value:"Accountant",id:"accountant",level:3},{value:"Deposit/Withdraw Limit Modules",id:"depositwithdraw-limit-modules",level:4},{value:"Default Queue",id:"default-queue",level:4},{value:"Good to Know",id:"good-to-know",level:2},{value:"What Tokens Not to Use",id:"what-tokens-not-to-use",level:3}];function c(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"deploying-and-managing-a-v3-vault",children:"Deploying and Managing a V3 Vault"}),"\n",(0,n.jsx)(t.p,{children:"V3 makes it as simple as possible for anyone to deploy and manage their Vaults. No longer will Yearn be the only manager of Vaults, gate-keeping who can be a debt allocator, or what strategies should be added to a vault. Now, anyone can deploy, manage, and earn fees from their vision and preferences on everything from risk profile, fee model, decentralization, etc."}),"\n",(0,n.jsx)(t.p,{children:'In V3 our "Allocator Vaults" or "Meta of Vaults" are designed to be efficient 4626 compliant debt allocators that can have many different "strategies" attached to them and will direct funds to these strategies based on the vault\'s management choice. The vaults are built to be "plug and play" meaning managers can simply deploy, add their strategies, and start the yield generation. But they also hold many customization factors, allowing different managers to differentiate themselves and experiment with different optionality.'}),"\n",(0,n.jsx)(t.p,{children:"Running your vault requires no need to know how to code. Anyone desiring to manage their strategies and allocations can simply deploy and run their vault."}),"\n",(0,n.jsx)(t.h2,{id:"definitions",children:"Definitions"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"vault (allocator)"}),": ERC-4626 compliant contract that accepts deposits, issues shares, and allocates funds to different strategies to earn yield."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"shares"}),": A tokenized representation of a depositor's share of the underlying balance of a vault."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"strategy"}),": Any ERC-4626 compliant contract that can be added to an allocator vault that earns yield on an underlying asset."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"debt"}),": The amount of the underlying asset that an allocator vault has sent to a strategy to earn yield."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"report"}),": The function where a vault accounts for any profits or losses a strategy has accrued, charges applicable fees, and locks profit to be distributed to depositors."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"deployment",children:"Deployment"}),"\n",(0,n.jsx)(t.p,{children:'Each release of the vaults will have its own "Vault Factory" deployed to make it as simple and trustless as possible to deploy your vault. The vault factory allows anyone to trustlessly deploy their own vault which is an exact copy of the previously deployed "original" vault for that specific version.'}),"\n",(0,n.jsx)(t.p,{children:"**Vaults not deployed through the factory will not be recognized as part of the Yearn ecosystem and may experience issues during runtime."}),"\n",(0,n.jsxs)(t.p,{children:["To deploy your vault, simply find the factory's address for the most recent release ",(0,n.jsx)(t.a,{href:"/developers/v3/overview",children:"here"})," and call ",(0,n.jsx)(t.code,{children:"Factory.deploy_new_vault(params)"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"The needed parameters are:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"asset"}),": The address of an ERC-20 compliant token used as the underlying asset to earn yield for the vault."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"name"}),": The name for your vault that will apply to the token issues to depositors."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"symbol"}),": The symbol the token issued to depositors will use."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"role_manager"}),": The address in charge of giving permissions to other addresses which allow access to certain permissioned functions."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"profit_max_unlock_time"}),": In seconds, profits reported from strategies will be unlocked."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Once deployed, you can get your vault's address from either the Factory function's return value or the ",(0,n.jsx)(t.code,{children:"NewVault"})," event emitted by the factory."]}),"\n",(0,n.jsxs)(t.p,{children:["The vault should be automatically verified when deployed. However, if it is not you can follow the ",(0,n.jsx)(t.a,{href:"https://etherscan.io/verifyContract",children:"verification steps"})," on Etherscan using the ",(0,n.jsx)(t.a,{href:"https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy",children:"VaultV3.vy"})," for your specific API Version."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"NOTE"}),": The vault factory utilizes ",(0,n.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-1014",children:"create2"})," opcode to deploy vaults to deterministic addresses. This means the same address can not deploy two vaults with the same default parameters for 'asset', 'name' and 'symbol'."]}),"\n",(0,n.jsx)(t.h2,{id:"setup",children:"Setup"}),"\n",(0,n.jsx)(t.p,{children:"Once deployed, additional setup steps and variables can be configured if desired."}),"\n",(0,n.jsx)(t.h3,{id:"roles",children:"Roles"}),"\n",(0,n.jsxs)(t.p,{children:["The first is to set up the Roles for your specific vault. The vaults use a role-based system for access control to the permissioned functions. The roles are a ",(0,n.jsx)(t.a,{href:"https://docs.vyperlang.org/en/stable/types.html#enums",children:"Vyper Enumerator"})," pattern based on Pythons."]}),"\n",(0,n.jsxs)(t.p,{children:['Each permissioned function in the Vaults has its own "role" that can call that specific function. For example, to call ',(0,n.jsx)(t.code,{children:"add_strategy(new_strategy: address)"})," the address must have the ",(0,n.jsx)(t.code,{children:"ADD_STRATEGY_MANAGER"})," role. Roles can be held by any number of addresses or by no address."]}),"\n",(0,n.jsx)(t.p,{children:"The same address can hold every role, each role can be held by a different address or any combination desired."}),"\n",(0,n.jsxs)(t.p,{children:["The address sent during deployment as ",(0,n.jsx)(t.code,{children:"role_manager"})," is in charge of assigning roles to different addresses."]}),"\n",(0,n.jsxs)(t.p,{children:["A full explanation of ",(0,n.jsx)(t.a,{href:"https://docs.python.org/3/howto/enum.html",children:"python enumerators"})," is beyond the scope of this doc, but the corresponding int to each role can be viewed ",(0,n.jsx)(t.a,{href:"https://github.com/yearn/yearn-vaults-v3/blob/master/tests/utils/constants.py#L12",children:"here"})]}),"\n",(0,n.jsxs)(t.p,{children:["To give an account a specific role you can simply call ",(0,n.jsx)(t.code,{children:"vault.set_role(account, role)"})," where 'role' is the int representing all the roles you would like the 'account' to hold. This will override all roles previously held by the address."]}),"\n",(0,n.jsxs)(t.p,{children:["The role manager can also use ",(0,n.jsx)(t.code,{children:"vault.add_role(account, role_to_add)"})," to only add 1 new role to the existing roles that account already has. Or ",(0,n.jsx)(t.code,{children:"vault.remove_role(account, role_to_remove)"})," to remove just one role without overriding the full bitmap."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-solidity",metastring:'title="Examples"',children:"# Set `account` to be the ADD_STRATEGY_MANAGER\nvault.set_role(account, 1)\n\n# Set `account` to be both the ADD_STRATEGY_MANAGER and REVOKE_STRATEGY_MANAGER\nvault.set_role(account, 3)\n\n# Add the REPORTING_MANAGER role to the accounts already held roles.\nvault.add_role(account, 32)\n\n# Remove just the REVOKE_STRATEGY_MANAGER role.\nvault.remove_role(account, 2)\n\n# Set `account` to hold every role\nvault.set_role(account, 16383)\n\n# Set `account` to hold no roles\nvault.set_role(account, 0)\n"})}),"\n",(0,n.jsxs)(t.p,{children:["NOTE: The vault ",(0,n.jsx)(t.code,{children:"role_manager"})," can not call any permissioned function by default, and would have to give itself any roles that it should have."]}),"\n",(0,n.jsx)(t.h3,{id:"deposit-limit",children:"Deposit Limit"}),"\n",(0,n.jsx)(t.p,{children:"Each vault will default to have a deposit limit set to 0. Which means all deposits will revert."}),"\n",(0,n.jsx)(t.p,{children:"Once ready, the address with the DEPOSIT_LIMIT_MANAGER will need to either set a deposit_limit > 0 or add a deposit_limit_module."}),"\n",(0,n.jsx)(t.h3,{id:"miscellaneous",children:"Miscellaneous"}),"\n",(0,n.jsx)(t.p,{children:"There are other options that a vault manager can set that are not necessary for the vault to function but may be desired for further customization."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"minimum_total_idle"}),": An amount specified in the underlying asset that the vault will force to remain free in the vault during debt updates to make servicing withdraws cheaper."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"profit_max_unlock_time"}),": The time in which profits reported by the strategies will be distributed to depositors. This can be adjusted to match the current report cycle of the vault's strategies to create a continuous stream of APY paid out to depositors."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"running-the-vault",children:"Running the Vault"}),"\n",(0,n.jsx)(t.h3,{id:"strategy-management",children:"Strategy Management"}),"\n",(0,n.jsx)(t.p,{children:"The job of a vault is to manage debt between strategies that do the yield generation. 3 roles control what strategies are added to the vault, ADD_STRATEGY_MANAGER, REVOKE_STRATEGY_MANAGER, and FORCE_REVOKE_MANAGER."}),"\n",(0,n.jsxs)(t.p,{children:["A strategy can be any contract that has the needed ",(0,n.jsx)(t.a,{href:"https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultV3.vy#L39",children:"4626 interface"})," for the vault to interact with it. This includes Tokenized Strategies, 3rd party 4626 vaults, and other  allocator vaults."]}),"\n",(0,n.jsxs)(t.p,{children:["To add a strategy first call ",(0,n.jsx)(t.code,{children:"vault.add_strategy(strategy_address)"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Each strategy gets added with a default 'max_debt' of 0. This means the MAX_DEBT_MANAGER will need to call ",(0,n.jsx)(t.code,{children:"vault.update_max_debt_for_strategy(strategy, max_debt)"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Once a strategy has been added and given a max_debt, the DEBT_MANAGER role can allocate funds."}),"\n",(0,n.jsxs)(t.p,{children:["To remove a strategy, first remove all the debt from the strategy and then call ",(0,n.jsx)(t.code,{children:"vault.revoke_strategy(strategy)"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["If a strategy has issues and cannot pay all of its debt back ",(0,n.jsx)(t.code,{children:"vault.force_revoke_strategy(strategy)"})," can be used to forcefully remove the strategy."]}),"\n",(0,n.jsx)(t.p,{children:"NOTE: Forcefully removing a strategy that still has debt will cause a loss to be recorded and a reduction of Price Per Share."}),"\n",(0,n.jsx)(t.h3,{id:"debt-updates",children:"Debt Updates"}),"\n",(0,n.jsx)(t.p,{children:"The DEBT_MANAGER role is in charge of allocating funds between the strategies added to a vault."}),"\n",(0,n.jsxs)(t.p,{children:["All debt updates are denominated in the underlying asset and are restricted by the ",(0,n.jsx)(t.code,{children:"max_debt"})," for each strategy and the ",(0,n.jsx)(t.code,{children:"minimum_total_idle"})," for the specific vault."]}),"\n",(0,n.jsxs)(t.p,{children:["Debt updates will also respect the strategies specific ",(0,n.jsx)(t.code,{children:"maxRedeem"})," and ",(0,n.jsx)(t.code,{children:"maxDeposit"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["To deposit or withdraw vault funds from a strategy simply call ",(0,n.jsx)(t.code,{children:"vault.update_debt(strategy, desired_debt)"})," where desired debt is the end amount denominated in the underlying asset that the strategy should have after the full debt update."]}),"\n",(0,n.jsxs)(t.p,{children:["Debt updates also come with an optional ",(0,n.jsx)(t.code,{children:"max_loss"})," parameter that is recommended to be used on debt decreases. It works just like the withdraw/redeem parameter of the same name and assures any losses realized on debt decreases are within the expected bounds."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"NOTE"}),": If a strategy has unrealized losses you cannot lower its debt."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"NOTE"}),": It is recommended to report a strategy's gain before withdrawing 100% of debt from the strategy."]}),"\n",(0,n.jsx)(t.h3,{id:"reporting",children:"Reporting"}),"\n",(0,n.jsxs)(t.p,{children:['To properly record any profits/losses from a strategy, charge fees, and lock profits for distribution to depositors, the REPORTING_MANAGER will need to "report" for each strategy via ',(0,n.jsx)(t.code,{children:"vault.process_report(strategy)"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["This function will trigger all necessary logic to record a strategy's gain since the last report and begin distributing that profit to depositors over the vault's specific ",(0,n.jsx)(t.code,{children:"profit_max_unlock_time"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"NOTE: To charge fees you will need first to have added an 'accountant' to your vault that will hold the fee logic and receive the fees that are charged."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"NOTE: All profit and loss calculations use the strategies 'convertToAssets' function. If this function can be manipulated it can lead to incorrect profits or losses being recorded by the vault"})}),"\n",(0,n.jsx)(t.h2,{id:"customization",children:"Customization"}),"\n",(0,n.jsx)(t.h3,{id:"accountant",children:"Accountant"}),"\n",(0,n.jsx)(t.p,{children:"You will need to add a separate contract as the vault's 'accountant' to charge fees."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"vault.set_accountant(accountant)"})}),"\n",(0,n.jsxs)(t.p,{children:["The accountant is called by the vault during every ",(0,n.jsx)(t.code,{children:"report"})," with the strategy that is reporting and the gain or loss it's reporting. The accountant will then return the total fees or refunds that should be charged by the vault during that report and paid to the accountant."]}),"\n",(0,n.jsx)(t.p,{children:"Accountants can hold any logic that vault managers want to dictate fees or simply charge normal performance or management fees. A ready-to-use Accountant can easily be used with any vault for those who wish just to charge standard fees."}),"\n",(0,n.jsxs)(t.p,{children:["See Here: ",(0,n.jsx)(t.a,{href:"https://github.com/yearn/vault-periphery/blob/master/contracts/accountants/Accountant.sol",children:"https://github.com/yearn/vault-periphery/blob/master/contracts/accountants/Accountant.sol"})]}),"\n",(0,n.jsx)(t.h4,{id:"depositwithdraw-limit-modules",children:"Deposit/Withdraw Limit Modules"}),"\n",(0,n.jsx)(t.p,{children:"Each vault comes with default deposit and withdraw limits that can be used for out of the box 4626 compliant functionality. However, these limits can also be completely customized for full programmability by adding a deposit_limit_module or withdraw_limit_module respectively."}),"\n",(0,n.jsx)(t.p,{children:"These modules are stand-alone smart contracts similar to the accountant that if added will be used by the vault to enforce any custom deposit or withdraw limits."}),"\n",(0,n.jsx)(t.p,{children:"This can be used to enforce a whitelist of depositors, minimum or maximum deposit sizes, liquidity constraints etc."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Note"}),": To set a deposit_limit_module the DEPOSIT_LIMIT_MANAGER will either need to use the optional ",(0,n.jsx)(t.code,{children:"override"})," flag or first need to set the vaults default ",(0,n.jsx)(t.code,{children:"deposit_limit"})," to uint256 max. And will not be able to change the ",(0,n.jsx)(t.code,{children:"deposit_limit"})," without the same flag or unless the deposit_limit_module is removed and set to address(0)."]}),"\n",(0,n.jsx)(t.h4,{id:"default-queue",children:"Default Queue"}),"\n",(0,n.jsxs)(t.p,{children:["Each vault has a ",(0,n.jsx)(t.code,{children:"default_queue"})," based on the strategies added and removed from the vault. The ",(0,n.jsx)(t.code,{children:"default_queue"})," is used to service withdraws when no custom queue is passed. This queue is simply ordered by the time when strategies were added: where the oldest strategy is at the beginning of the queue."]}),"\n",(0,n.jsxs)(t.p,{children:["There is an optional parameter in ",(0,n.jsx)(t.code,{children:"add_strategy"})," of ",(0,n.jsx)(t.code,{children:"add_to_queue"})," that defaults to True, but can be set to False if you do not want to add the strategy to the ",(0,n.jsx)(t.code,{children:"default_queue"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"If a different ordering is desired or management wants to remove a certain strategy from the default queue, the QUEUE_MANAGER role can set a new queue."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:"vault.set_default_queue(new_default_queue)"})}),"\n",(0,n.jsxs)(t.p,{children:["Where ",(0,n.jsx)(t.code,{children:"new_default_queue"})," is an array of strategies with a max length of 10, in which all strategies are currently active in the vault."]}),"\n",(0,n.jsxs)(t.p,{children:["The vaults QUEUE_MANAGER can also choose to not allow custom queues to be passed into the vault on withdraws at any time by turning on the 'use_default_queue' flag by calling, ",(0,n.jsx)(t.code,{children:"vault.set_use_default_queue(True)"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"good-to-know",children:"Good to Know"}),"\n",(0,n.jsx)(t.h3,{id:"what-tokens-not-to-use",children:"What Tokens Not to Use"}),"\n",(0,n.jsx)(t.p,{children:"There are certain tokens whose native behavior makes them incompatible with being the underlying asset of a vault and should be avoided."}),"\n",(0,n.jsx)(t.p,{children:"A few examples of this are:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Rebasing Tokens"}),"\n",(0,n.jsx)(t.li,{children:"Fee on Transfer"}),"\n",(0,n.jsx)(t.li,{children:"Reentrancy Tokens (ERC-777)"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Any token whose normal functionality breaks the ERC-20 standard may not be compatible with V3 vaults."})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>i});var n=a(96540);const s={},o=n.createContext(s);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);