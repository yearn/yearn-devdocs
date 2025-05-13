# Yearn Multisig

## How it works

The multisig is implemented by a 6-of-9 multi-signature wallet. The members of the multi-signature wallet were voted in by YFI holders and are subject to change from future governance votes. Specific powers are delegated to the governance multisig, as defined by [Governance 2.0](https://gov.yearn.fi/t/yip-41-temporarily-empower-multisig/3630).

The multisig is implemented as a Gnosis Safe. The multisig's assets, transactions, and signers can be viewed using [Gnosis's Web UI](https://app.safe.global/home?safe=eth:0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52). If there is a need to trustlessly audit Yearn's multisig (without trusting the Gnosis site), the Gnosis Safe web app source code can be found on Github [here](https://github.com/safe-global/safe-wallet-web).

## Protocol Guardian Role

Per [YIP-81](https://snapshot.box/#/s:veyfi.eth/proposal/0x6f3082db2cef3e0c254e569580d063cb14130a92d0bf1729bef342a386e419f2), the Yearn Multisig (AKA yChad) serves in the Guardian role to steward and protect the Yearn Protocol and its participants. The Guardian role is defined as being able to **"nullify a proposal or governance decision but cannot make proposals"**.

## Members

Multisig membership can be validated from the Gnosis UI [here](https://app.safe.global/settings/setup?safe=eth:0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52).  
Cryptographic membership attestations can be validated against the PGP keys in the [yearn-security](https://github.com/yearn/yearn-security/tree/master/keys) repository.

| Address           | Member Name          | Membership Attestation       |
|-------------------|----------------------|------------------------------|
| [0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6](https://etherscan.io/address/0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6) | Mariano Conti (nanexcool.com, prev. MakerDAO) | [Twitter](https://x.com/nanexcool/status/1491900804223041540) |
| [0xeA6c0837fef621E77329f85820F503cA09f2B3a9](https://etherscan.io/address/0xeA6c0837fef621E77329f85820F503cA09f2B3a9) | Leo Cheng (C.R.E.A.M. Finance) | [Twitter](https://x.com/lumbergdoteth/status/1492736002724876291) |
| [0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3](https://etherscan.io/address/0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3) | Daryl Lau (Not3Lau Capital) | [Twitter](https://x.com/Daryllautk/status/1285434908383444992) |
| [0xf5D3dbda5F41A0E26D71B948e29522398e71cFaE](https://etherscan.io/address/0xf5D3dbda5F41A0E26D71B948e29522398e71cFaE) | 0xngmi (DefiLlama) | [Twitter](https://x.com/0xngmi/status/1590047391797088257) |
| [0x5Db9926c93085a92F14A85daBF6FF27b07362Cae](https://etherscan.io/address/0x5Db9926c93085a92F14A85daBF6FF27b07362Cae) | Ephy (Sky/MakerDAO) | [Twitter]() |
| [0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12](https://etherscan.io/address/0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12) | Lefteris Karapetsas (rotkiapp) | [Twitter](https://x.com/LefterisJP/status/1590083336210644992) |
| [0xFe45baf0F18c207152A807c1b05926583CFE2e4b](https://etherscan.io/address/0xFe45baf0F18c207152A807c1b05926583CFE2e4b) | Michael Egorov (Curve) | [Twitter](https://x.com/newmichwill/status/1849912651163250755) |
| [0x962228a90eaC69238c7D1F216d80037e61eA9255](https://etherscan.io/address/0x962228a90eaC69238c7D1F216d80037e61eA9255) | CryptoHarry (Inverse) | [Twitter](https://x.com/0xCryptoHarry/status/1848394875659776430) |
| [0x700F1a984C962b447CcDb95c4c2D8074C65098a3](https://etherscan.io/address/0x700F1a984C962b447CcDb95c4c2D8074C65098a3) | Tapir (Yearn) | [Github Gist](https://gist.github.com/tapired/3b26a56b8847dc6f608edb9403dfc61d) |

## History

- April 2025 - [YIP-84: Proposal to rotate multisig signer](https://snapshot.box/#/s:veyfi.eth/proposal/0xeecd2a9ca79f9b22071d79d436a7e5ccc56593eb4c3bc8ef1b57c8389809a101)
- October 2024 - [YIP-79: Proposal to rotate multisig signers and provide compensation](https://snapshot.org/#/veyfi.eth/proposal/0xc7ded2863a10154b6b520921af4ada48d64d74e5b7989f98cdf073542b2e4411)
- June 2022 - [YIP-68: Change Three Multisig signers](https://gov.yearn.fi/t/yip-68-rotate-multisig-signers/12582)
- May 2021 - [YIP-62: Change Two Multisig Signers](https://gov.yearn.fi/t/yip-62-change-two-multisig-signers/10758)
- April 2021 - [YIP-61: Governance 2.0](https://gov.yearn.fi/t/yip-61-governance-2-0/10460)
- August 2020 - [YIP-41: Temporarily Empower Multisig](https://gov.yearn.fi/t/yip-41-temporarily-empower-multisig/3630)
- August 2020 - [YIP-40: Replace inactive multisig signers](https://yips.yearn.fi/YIPS/yip-40)
