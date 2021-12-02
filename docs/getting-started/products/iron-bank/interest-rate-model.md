# Interest rate model

## APY function

> BlocksPerYear = 2,102,400 (15 sec per block)

### Borrow APY

$$\Bigg[1 + Base + Multiplier * min(UtilizationRate, Kink1)\\

+\\

max(JumpMultiplier * UtilizationRate - Kink2, 0)\Bigg]^{BlocksPerYear} - 1$$

### Supply APY

$${Interest Paid by Borrowers Per Block - Reserve}\\[5pt]

{\Darr}\\[5pt]

{[(1 + Borrow APY) ^ {(\frac{1}{BlocksPerYear})} - 1] *Total Borrow* (1 - Reserve Factor)}\\[5pt]

{\Darr}\\[5pt]

{[(1 + Borrow APY) ^ {(\frac{1}{BlocksPerYear})} - 1]*Total Borrow*(1 - Reserve Factor) / Total Supply}\\[5pt]

{\Darr}\\[5pt]

{{[1 + [(1 + Borrow APY) ^ {(\frac{1}{BlocksPerYear})} - 1]*Total Borrow*(1 - Reserve Factor) / Total Supply}] ^ {BlocksPerYear} - 1}\\[5pt]

{\Darr}\\[5pt]

\large\bold{{{[1+[(1+Borrow APY) ^ {(\frac{1}{BlocksPerYear})}-1]*(1-Reserve Factor)*Utilization Rate}]^{BlocksPerYear}-1}}\\$$

### Major

&nbsp;

| Parameter        | Value                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Tokens           | WETH, WBTC                                                                                                                 |
| Base             | 0%                                                                                                                         |
| Multiplier       | 17.5%                                                                                                                      |
| JumpMultiplier   | 200%                                                                                                                       |
| Kink 1           | 80%                                                                                                                        |
| Kink 2           | 90%                                                                                                                        |
| Contract Address | [0x61e9a6aB4923F5046C0Fb80E5c9F98afc9995fad](https://etherscan.io/address/0x61e9a6ab4923f5046c0fb80e5c9f98afc9995fad#code) |

### Stable

&nbsp;

| Parameter        | Value                                                                                                                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens           | y3Crv, sUSD, mUSD, DUSD, EURS, sEUR, BUSD, cDAI, cUSDT, cUSDC, USDP, EUR, KRW, JPY, AUD, GBP, CHF, MIM, ZAR                                                                                                                                                                         |
| Base             | 0%                                                                                                                                                                                                                                                                                  |
| Multiplier       | 13%                                                                                                                                                                                                                                                                                 |
| JumpMultiplier   | 800%                                                                                                                                                                                                                                                                                |
| Kink 1           | 80%                                                                                                                                                                                                                                                                                 |
| Kink 2           | 90%                                                                                                                                                                                                                                                                                 |
| Contract Address | <p><a href="https://etherscan.io/address/0xd6C04cF463A52A9C929D434F9F84ee70c1c0Ac6F#code">0xd6C04cF463A52A9C929D434F9F84ee70c1c0Ac6F</a></p><p><a href="https://etherscan.io/address/0x26c325C8880FfE5a5744fF667ba7D8651B868710">0x26c325C8880FfE5a5744fF667ba7D8651B868710</a></p> |

### 3 Stables

&nbsp;

| Parameter        | Value                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Tokens           | DAI, USDC, USDT                                                                                                       |
| Base             | 0%                                                                                                                    |
| Multiplier       | 13%                                                                                                                   |
| JumpMultiplier   | 800%                                                                                                                  |
| Kink 1           | 80%                                                                                                                   |
| Kink 2           | 90%                                                                                                                   |
| Contract Address | [0x1B0c2586Df3daAd42aC2FDCaA0f6B91623747556](https://etherscan.io/address/0x1B0c2586Df3daAd42aC2FDCaA0f6B91623747556) |

### Governance

&nbsp;

| Parameter        | Value                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Tokens           | LINK, YFI, SNX, DPI, UNI, SUSHI, CRV, YFI, AAVE                                                                     |
| Base             | 0%                                                                                                                    |
| Multiplier       | 27%                                                                                                                   |
| JumpMultiplier   | 900%                                                                                                                  |
| Kink 1           | 80%                                                                                                                   |
| Kink 2           | 90%                                                                                                                   |
| Contract Address | [0xD369E8eaa0d2665Dfea6eb51fF2ADFca4EAA7891](https://etherscan.io/address/0xD369E8eaa0d2665Dfea6eb51fF2ADFca4EAA7891) |
