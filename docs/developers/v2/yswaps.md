# ySwaps

ySwaps is used to **abstract** the token trading logic from the strategies harvest method, which means strategies can focus on farming tokens and don't have to handle tokens trading logic and paths. The "swappers" smart contracts allows trading optimizations and new paths to be added since the code is not hardcoded in strategies.

- [ySwaps contracts repository](https://github.com/yearn/yswaps)
- [ySwaps scripts repository](https://github.com/yearn/yswaps-app)

![yswaps-intro-diagram](https://i.imgur.com/VynhCU4.png)

## Glossary
- `sms`: Strategists multisig
- `tokenIn`:  Token we have and we want to trade/swap
- `toeknOut`: Token we want to obtain on the swap
- `hopToken`: Token we use as a middle step between tokenIn and tokenOut
- `tf`: Trade Factory

## Components

- [Swappers](#swappers)
- [Trade Factory](#trade-factory)
- [Solvers](#solvers)
- [Dexes Libraries](#dexes-libraries)
- [Execute script](#execute-script)
- [Extra toolings](#extra-toolings)
- [Procedures](#procedures)
- [Keep3r Jobs](#keep3r-jobs)


### Swappers

Contracts in charge of making the swaps (uniswap, balancer, sushiswap, solidly and more). We can separated them in two types:

#### Single swapper

Uniswap, balancer, sushiswap, etc. These are straighforward contracts that will make a simple swap on these dexes (`token A` to `token B`). It is also worth to mention that these swappers take care of few extra stuff like: `approval needed to make the swap`, `transfering final tokens to strategy if needed`.

#### Multicall swapper

This contract will receive a bundle of transactions that are required to aquire the wanted token/tokens. This is used in specific cases where trade can not be made in a normal exchange due to liquidity issues, dex not having that token or route, needing extra steps to aquire the token such as depositing or withdrawing, and more. It is important to mention that this swapper does NOT take care of things like approvals, or transfers (important difference with `single swappers`).

#### Swappers Usage

**Single swapper example:** We have `tokenIn` and `tokenOut` and we know that we can go straight to sushiswap that has enought liquidity to make the trade with good conditions.

**Multicall example:** We have a `tokenIn` and we want a `tokenOut`. But theres no path on any dex to do the trade directly, so we need to split the swap in two steps:  
1. Step 1: `tokenIn` for `hopToken`.  
2. Step 2: `hopToken` for `tokenOut`.  

For this example we are gonna assume that we will need to use two different dexes for each step. Since we are gonna split the trade in two different transactions and the main objective is to use TWO DIFFERENT dexes, this is where we use the `Multicall Swapper`.Everything that requires more than just a single swap tx, will use multicall dexes.

#### Swapper Contracts (version 0.2.0)

##### Ethereum

- MultiCallOptimizedSwapper: [0x711d1D8E8B2b468c92c202127A2BBFEFC14bf105](https://etherscan.io/address/0x711d1D8E8B2b468c92c202127A2BBFEFC14bf105)
- ZRX [0xE32dd1F66365289b7fe14e503CBB336cD5D13F09](https://etherscan.io/address/0xE32dd1F66365289b7fe14e503CBB336cD5D13F09)
- AsyncBancor [0xf13b8F103690FD74B5F137eC3CF679a9D1B4BA95](https://etherscan.io/address/0xf13b8F103690FD74B5F137eC3CF679a9D1B4BA95)
- AsyncSushiswap [0x408Ec47533aEF482DC8fA568c36EC0De00593f44](https://etherscan.io/address/0x408Ec47533aEF482DC8fA568c36EC0De00593f44)
- AsyncUniswapV2 [0xA780b6A733D06dFf526A84c4258616b75279C763](https://etherscan.io/address/0xA780b6A733D06dFf526A84c4258616b75279C763)
- OneInchAggregator [0x934D1c4ba7DF902d6cd0803882876e3C999cb406](https://etherscan.io/address/0x934D1c4ba7DF902d6cd0803882876e3C999cb406)

##### Fantom

- ZRX: [0x0a94017DF3f8981Da97D79c28b103bAbDa0D67C7](https://ftmscan.com/address/0x0a94017DF3f8981Da97D79c28b103bAbDa0D67C7)
- MultiCallOptimizedSwapper: [0x590B3e12Ded77dE66CBF45050cD07a65d1F51dDD](https://ftmscan.com/address/0x590B3e12Ded77dE66CBF45050cD07a65d1F51dDD)
- AsyncSolidly: [0x2cb391afd5180a31d01bE95Bd61A757594C9295a](https://ftmscan.com/address/0x2cb391afd5180a31d01bE95Bd61A757594C9295a)
- AsyncSpiritswap: [0x8d2aFF696F14b287a6E759F4bfFB6f08E92DFD20](https://ftmscan.com/address/0x8d2aFF696F14b287a6E759F4bfFB6f08E92DFD20)
- AsyncSpookyswap: [0x86ee473C2eE7eB97Ee0276bE43427a6CF0cC6348](https://ftmscan.com/address/0x86ee473C2eE7eB97Ee0276bE43427a6CF0cC6348)
- SyncSpiritswap: [0x923D22FE66C77E2fea215050F088AE26186F96aE](https://ftmscan.com/address/0x923D22FE66C77E2fea215050F088AE26186F96aE)
- SyncSpookyswap: [0xcD00a47D9fB36B0B37D589E20fE4fB7e2D9d9e8A](https://ftmscan.com/address/0xcD00a47D9fB36B0B37D589E20fE4fB7e2D9d9e8A)

### Trade Factory

- This contract has the `enabled trades` that each strategy can make. Enabled trades are just a list of possible swaps that a strategy can make. So it only contains three variables: `strategyAddress`, `tokenIn`, `tokenOut`. We have these enabled trades to know which swaps can/should be made with each strategy.

- This contract is also in changer of verifying the trades. To do that it will use the different `execute` methods in it and call the `swapper contracts` that needs to use. Remember that `swappers` are the contracts responsible to making the actual swap.

- When we execute the swap its important to point out that this  takes care of: `transfering tokenIn from strat to swapper`, `make final the check if the amount received > minAmountOut`.

#### Trade Factory Contracts (version 0.2.0)

##### Ethereum

- TradeFactory: [0x7BAF843e06095f68F4990Ca50161C2C4E4e01ec6](https://etherscan.io/address/0x7BAF843e06095f68F4990Ca50161C2C4E4e01ec6)

##### Fantom

- TradeFactory: [0xD3f89C21719Ec5961a3E6B0f9bBf9F9b4180E9e9](https://ftmscan.com/address/0xD3f89C21719Ec5961a3E6B0f9bBf9F9b4180E9e9)

### Solvers Scripts

Scripts in charge of providing the swap transaction that will be used and sent to `Trade Factory contract`.

- **Custom solvers**: There are custom solvers for specific cases/strategies that will need to make multiple transactions for a specific swap. Each of these scripts aims to an specific strategy and trade that needs to be made. Some examples (`ThreePoolCrvMulticall.ts`). This is for specific strategies's trades that will need to swap tokens that can not be swaped/resolved on a single dex swap. The tx provided by this solver is gonna be used with the `Multicall swapper`.

- **Dexes solvers**: this script is used for situations where the trade can be resolved with a normal swap on an exchange and does NOT require multiple tx to ensure the trade is possible. Different to `Custom Solvers`, this can be used in a generic way for different strategies/swaps. This script checks with every DeX and chooses the best one to make the trade. The tx provided by this solver is gonna be used with the `Single swapper`.

- **Multicall Dexes solvers**: This solver is gonna split the trade in different steps using the `hopTokens` provided by us. Each step of the swap will loop between every dexes library and will take the best dex for each step of the trade. This solver generally will be using the `MulticallSwapper` since we are doing 2 steps or tx for the swap. But it is also possible to use the `SingleSwapper` because if both steps of the trade are using the same Dex, we should merge them into one for gas efficiency. We will be transformir `2 tx` into `1 tx` so we can use the `SingleSwapper`.

<br />

- [All Solvers](https://github.com/yearn/yswaps-app/tree/main/scripts/libraries/solvers)
- [Dexes Solver](https://github.com/yearn/yswaps-app/blob/main/scripts/libraries/solvers/Dexes.ts)
- [Multicall Dexes Solver](https://github.com/yearn/yswaps-app/blob/main/scripts/libraries/solvers/MulticallDexes.ts)

### Dexes Libraries 

There is one dex library per dex (uniswap, bancor, ...). They are in charge of getting the trade information of each Dex and returning all the data needed on the `Solvers`.

> NOTE: The libraries contemplate the hopTokens too.

- [All Dexes Libraries](https://github.com/yearn/yswaps-app/tree/main/scripts/libraries/dexes)
- [Bancor Dex Library](https://github.com/yearn/yswaps-app/blob/main/scripts/libraries/dexes/bancor.ts)
- [UniswapV2 Dex Library](https://github.com/yearn/yswaps-app/blob/main/scripts/libraries/dexes/uniswap-v2.ts)

### Execute script

This is where everything starts. Here we will grab all the enabled trades, loop and use logic to determinate if:

1) Should the trade by executed?  
2) If so, what solver should we use?   
3) Once we have the solver response, execute the swap transaction provided by the solver.  

<br />

- [Execute Mainnet pending trades](https://github.com/yearn/yswaps-app/blob/main/scripts/execute-mainnet-pending-trades.ts)
- [Execute Fantom pending trades](https://github.com/yearn/yswaps-app/blob/main/scripts/execute-fantom-pending-trades.ts)

#### Execute pending trades: What exactly happens?

1. Script execute-mainnet-pending-trades  
  1.1. Identify "pending trades"  
  1.2. Determinate which solver to use.  
  1.3. Solver determinates best Dex and returns the swap tx  
  1.3. Execute swap tx provided by the solver.  

2. Call the execute in Trade Factory  
  2.1. Contract validates the data and that trade in configuration is valid.  
  2.2 Moves the funds directly from the strategy to the swapper.  
  2.3 Calls `swapper.swap()` to execute the trade.  
  2.4 Check that amount received by strategy > minAmountOut provided by us.  

3. Swapper executes the trade  
  3.1. Validates some data.  
  3.2. Executes the trade  
  3.3. Send funds directly to the strategy.  

### Extra toolings

- **Gas service**: provides the correct params for gas options for each network  
- **Price service**: we use providers as CoinGecko API to normilize the `tokenInAmount` and `tokenOutAmount` in USD so we can verify that we are not getting a bad price from the Dex we ended up using.

<br />

- [Link to services scripts](https://github.com/yearn/yswaps-app/tree/main/scripts/libraries/utils)
  
## Procedures

### Add new strategy

1. Add `STRATEGY` role on Trade factory contract. From yMech.  
2. Add `enable trades` on Trade factory contract. From strategy.  
3. Add `enable trade` on ySwap repo config (`fantom.ts` `mainnet.ts`)  
    3.1 To add it to the config we also need to know what solver we are going to use. It would be `Dexes.ts` which is a generic solver or it would have its own `Custom Solver`  
    3.2 In case of need a `Custom Solver`, we need to code it.  
4. Once added to config, we are ready to execute the script to swap available trades.  

### Remove strategy

1. Revoke role from MS.  
2. Remove from network config file.  
3. OPTIONAL: remove custom solver if it has one.  

## Keep3r jobs

Previous knowledge about how `Keeper Network` works is needed.

### Procedures

#### Add strategy fantom keeper harvest job

##### A)
 1. Go straight to ftmscan harvest job and add the strategy manually by a yMech.  
 2. Add strategy to v2-ftm-strategies.ts config with `added: true`  

##### B) (safest way to have everything added)
 1. Review and merge pr from strategists to add new strategies.  
 2. On  packages/strategies-keep3r Execute script: `npx hardhat run scripts/jobs/detached/01-v2-harvest-ftm-detached-job-add-strategies.ts --network fantom`  
 3. On config file strategies-keep3r/utils/v2-ftm-strategies.ts change once again  strategies property added to true  
 4. Push changes.

#### Remove strategy fantom keeper harvest job
1. Go to ftmscan `Harvest Job SC` and remove the strategy manually using method `removeStrategies`. Call with a mechanic.  
2. Remove strategy from `v2-NETWORK-strategies.json` file.
