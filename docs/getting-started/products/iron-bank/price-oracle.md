# Price oracle

We have Chainlink as our main price oracle

## Chainlink

For the following tokens, we use price feed provided by Chainlink:

* WETH
* BTC
* DAI
* LINK
* YFI
* SNX
* DPI
* USDT
* USDC
* UNI
* SUSHI
* BUSD
* sUSD
* CRV
* AAVE
* MIM

For the following BTC-pegged token, we use BTC price instead:

* WBTC

For the following fiat stable coins, we use fiat price instead:

* EURS
* sEUR
* EUR
* KRW
* JPY
* AUD
* GBP
* CHF
* ZAR

### Contract

For the following token, we fetch price from contracts directly:

* y3Crv

### Price Oracle Address

| Contract             | Address                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| PriceOracleProxy     | [0xde19f5a7cF029275Be9cEC538E81Aa298E297266](https://etherscan.io/address/0xde19f5a7cF029275Be9cEC538E81Aa298E297266) |
| V1PriceOracle        | [0x3aBce8F1DB258fBc64827b0926e14A0F90525CF7](https://etherscan.io/address/0x3abce8f1db258fbc64827b0926e14a0f90525cf7) |
