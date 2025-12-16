# Curating On Morpho

![image](/img/curating/morpho.jpg)

Morpho was the first chapter of our curation story. It has been a successful one, and will not be the last.

- $200M+ in assets. More info on [DefiLlama](https://defillama.com/protocol/yearn-curating)
- 10+ vaults on 4 chains
- 5+ custom markets created

## Morpho Vaults

Morpho is a permissionless, isolated money market protocol where each market consists of a single collateral and a single loan asset. Morpho Vaults follow the ERC-4626 standard and lend deposited assets into these underlying Morpho markets. The markets are selected by the curator of the vault, who has the ability to reallocate funds, set supply caps, and add or remove markets.

### Roles

Yearn's Morpho vaults are managed by role:

- `Owner`: This role, which can update vault configurations, is assigned to Yearn's Security and Monitoring (SAM) 4/7 multisig, which has members from Yearn's different teams and is globally distributed.
- `Curator`: The curator role is set to a multisig 2/3 to enable flexibility and speed in managing the vaults.
- `Guardian`: This role that has the ability to pause a vault in case of emergency. Yearn's yChad multisig is the guardian for all our vaults. yChad is an optimal guardian because it has extensive experience managing similar, crucial roles for the rest of the Yearn ecosystem.
- `Reallocator`: This role that has the ability to reallocate the vault's assets. Our bots (managed by EOA) hold the `reallocator` role.
- `Timelock`: set to 72 hours to enable the Guardian and users to react if needed.

## User Flow

Users can engage with Yearn-curated Morpho Vaults in three ways:

1. **Direct Deposit to Yearn-curated Morpho Vaults**: Users can deposit directly (typically via the Morpho UI) into a Yearn-curated Morpho Vault.

   - They earn **native lending APY** on their assets
   - Plus **MORPHO rewards**
   - Performance fees is 5-10% of the native lending APY, excluding rewards APY.

2. **Deposit into Yearn Morpho Lender Strategies**: These are a Yearn strategies that lend to Yearn-curated Morpho Vaults and **auto-compound MORPHO rewards**.

   - Users earn **native lending APY**
   - Plus **additional yield from compounded MORPHO**, converted into more of the underlying asset
   - No additional performance fees are charged.

3. **Deposit into Yearn V3 Allocator Vaults**: Users can also deposit into a single-asset Yearn V3 Vault that dynamically allocates across multiple strategies.

   - One of these strategies will be a **Yearn Morpho Lender** (from #2)
   - This means their deposits ultimately flow into the Yearn-curated Morpho Vault
   - They benefit from **native lending APY** and **compounded MORPHO rewards**, all wrapped inside a diversified yield-optimized strategy
   - Yearn V3 vaults have a 10% performance fee because vaults funds are managed between multiple strategies and protocols. More info on [Yearn V3 vaults](/getting-started/products/yvaults/v3).

### Yearn Morpho Lender Strategies

To enjoy maximum yield, users can deposit into the Yearn Morpho Lender Strategy. Check out [Yearn Morpho Compounder strategies](https://yearn.fi/v3?types=single&search=morpho%20yearn) and deposit to earn juicy yields.

### Live Morpho Vaults

 If you prefer depositing directly into the Morpho vaults, we are live on the following chains:

- [Mainnet](https://app.morpho.org/ethereum/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)
- [Katana](https://app.morpho.org/katana/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)
- [Base](https://app.morpho.org/base/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)
- [Arbitrum](https://app.morpho.org/arbitrum/earn?curatorAddressesFilter=0xe5e2Baf96198c56380dDD5E992D7d1ADa0e989c0%2C0xFEaE2F855250c36A77b8C68dB07C4dD9711fE36F%2C0x518C21DC88D9780c0A1Be566433c571461A70149%2C0xfd99a19Fcf577Be92fDAB4ef162c1644BB056885)

### YFI Maxi

For Yearn lovers and YFI holders, we have a special [Morpho Market YFI/USDC](https://app.morpho.org/ethereum/market/0x973e9dd45799efe8775417bcc420a3ab84a583587b2108985746e2fe201d0c83/yfi-usdc) where users can deposit YFI as collateral and borrow USDC.
