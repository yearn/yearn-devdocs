# Curating On Morpho

![image](/img/curating/morpho.jpg)

Morpho was our first step into curating story... and it is a succesful one. More to come in the future.

- $200M+ in assets, more info on [DefiLlama](https://defillama.com/protocol/yearn-curating)
- 12 vaults on 4 chains
- 7 custom markets created

## Morpho Vaults

Morpho is a permissionless, isolated money market protocol where each market consists of a single collateral and a single loan asset. Morpho Vaults follow the ERC-4626 standard and lend deposited assets into these underlying Morpho markets. The markets are selected by the curator of the vault, who has the ability to reallocate funds, set supply caps, and add or remove markets. This piece explains why Yearn should take the lead in becoming a curator in the Morpho ecosystem.

### Roles

Our Morpho vaults are managed by a team of roles:

- Owner: This role, which can update vault configurations, is assigned to the Yearn's SAM(Security and Monitoring) team 4/7 multisig, which has members from Yearn's different teams and is globally distributed.
- Curator: Is set to address zero because all vault management will be handled by Owner role.
- Guardian: A role that has the ability to pause the vault in case of emergency. yChad multisig is the guardian. There is no better multisig to serve as the guardian because it also manages all crucial roles for the Yearn ecosystem.
- Reallocator: A role that has the ability to reallocate the vault's assets. Our bots(EOA) will be the reallocators.
- Timelock: set to 72 hours to enable guardain and users to react if needed.

### Live Morpho Vaults

- [Mainnet](https://app.morpho.org/ethereum/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)
- [Katana](https://app.morpho.org/katana/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)
- [Base](https://app.morpho.org/base/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)
- [Arbitrum](https://app.morpho.org/arbitrum/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)

## User Flow

Users can engage with Yearn-curated Morpho Vaults in three ways:

1. **Direct Deposit to Yearn-curated Morpho Vault**
   These users deposit directly (typically via the Morpho UI) into a Yearn-curated Morpho Vault.
   - They earn **native lending APY** on their assets
   - Plus **MORPHO rewards**

2. **Deposit into Yearn Morpho Lender Strategy**
   This is a Yearn strategy that lends to the Yearn-curated Morpho Vault and **auto-compounds MORPHO rewards**.
   - Users earn **native lending APY**
   - Plus **additional yield from compounded MORPHO**, converted into more of the underlying asset

3. **Deposit into Yearn V3 Allocator Vault**
   These users deposit into a Yearn V3 Vault that dynamically allocates across multiple strategies.
   - One of these strategies will be the **Yearn Morpho Lender** (from #2)
   - This means their deposits ultimately flow into the Yearn-curated Morpho Vault
   - And they benefit from **native lending APY** and **compounded MORPHO rewards**, all wrapped inside a diversified yield-optimized strategy

## YFI Maxi

For Yearn lovers and YFI holders, we have a special [Morpho Market YFI/USDC](https://app.morpho.org/ethereum/market/0x973e9dd45799efe8775417bcc420a3ab84a583587b2108985746e2fe201d0c83/yfi-usdc) where users can
