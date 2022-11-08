# Multisig

## How it works

The Multisig is implemented by a 6-of-9 multi-signature wallet. The members of the multi-signature wallet were voted in by YFI holders and are subject to change from future governance votes. Specific powers are delegated to the governance Multisig, as defined by [Governance 2.0](https://gov.yearn.finance/t/yip-41-temporarily-empower-multisig/3630). More information about Yearn governance and how it interacts with the Multisig can be found on the [FAQ](https://docs.yearn.finance/resources/faq#governance).

The multisig is implemented as a Gnosis Safe. The multisig's assets, transactions, and signers can be viewed using [Gnosis's Web UI](https://gnosis-safe.io/app/eth:0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52/balances). If there is a need to trustlessly audit Yearn's multisig (without trusting the Gnosis site), the Gnosis Safe web app source code can be found on Github [here](https://github.com/gnosis/safe-react). 

## Members

Multisig membership can be validated from the Gnosis UI [here](https://gnosis-safe.io/app/eth:0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52/settings/owners).  
Cryptographic membership attestations can be validated against the PGP keys in the [yearn-security](https://github.com/yearn/yearn-security/tree/master/keys) repository.


**0x0Cec743b8CE4Ef8802cAc0e5df18a180ed8402A7** - Milkyklim (Yearn Finance)  
[Membership attestation](https://milkyklim.keybase.pub/yearn-social-proof.txt) - [Etherscan](https://etherscan.io/address/0x0Cec743b8CE4Ef8802cAc0e5df18a180ed8402A7)

**0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6** - Mariano Conti (nanexcool.com, prev. MakerDAO)  
[Membership attestation](https://twitter.com/nanexcool/status/1491900804223041540) - [Etherscan](https://etherscan.io/address/0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6)

**0x7321ED86B0Eb914b789D6A4CcBDd3bB10f367153** - Leo Cheng (C.R.E.A.M. Finance)  
[Membership Attestation](https://twitter.com/lumbergdoteth/status/1492736002724876291) - [Etherscan](https://etherscan.io/address/0x7321ED86B0Eb914b789D6A4CcBDd3bB10f367153)

**0x74630370197b4c4795bFEeF6645ee14F8cf8997D** - cp287 (cp0x.com)  
[Membership attestation](https://twitter.com/kaplansky1/status/1285427247286046725) - [Etherscan](https://etherscan.io/address/0x74630370197b4c4795bFEeF6645ee14F8cf8997D)

**0x7A1057E6e9093DA9C1D4C1D049609B6889fC4c67** - Banteg (Yearn Finance)  
[Membership attestation](https://twitter.com/bantg/status/1285426492906909696) - [Etherscan](https://etherscan.io/address/0x7A1057E6e9093DA9C1D4C1D049609B6889fC4c67)

**0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3** - Daryl Lau (Not3Lau Capital)  
[Membership attestation](https://twitter.com/Daryllautk/status/1285434908383444992) - [Etherscan](https://etherscan.io/address/0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3)

**0xf5D3dbda5F41A0E26D71B948e29522398e71cFaE** - 0xngmi (DefiLlama)
[Membership attestation](https://twitter.com/0xngmi/status/1590047391797088257) - [Etherscan](https://etherscan.io/address/0xf5D3dbda5F41A0E26D71B948e29522398e71cFaE)

**0x1496546f89fc1605880e556c9a1d6c5e2409fb0a** - monoloco (Yearn Finance)
[Membership attestation](https://therealmonoloco.keybase.pub/yearn-social-proof.txt) - [Etherscan](https://etherscan.io/address/0x1496546f89fc1605880e556c9a1d6c5e2409fb0a)

**0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12** - Lefteris Karapetsas (rotkiapp)
[Etherscan](0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12)


## History

- June 2022 - [YIP-68: Change Three Multisig signers](https://gov.yearn.finance/t/yip-68-rotate-multisig-signers/12582)
- May 2021 - [YIP-62: Change Two Multisig Signers](https://gov.yearn.finance/t/yip-62-change-two-multisig-signers/10758)
- April 2021 - [YIP-61: Governance 2.0](https://gov.yearn.finance/t/yip-61-governance-2-0/10460)
- August 2020 - [YIP-41: Temporarily Empower Multisig](https://gov.yearn.finance/t/yip-41-temporarily-empower-multisig/3630)
- August 2020 - [YIP-40: Replace inactive multisig signers](https://yips.yearn.finance/YIPS/yip-40)