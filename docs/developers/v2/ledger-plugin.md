# Ledger Plugin

The Yearn Ledger Plugin allows you to interact with the Yearn website directly from your Ledger Live application and to be able to see what you sign on your device. Every addition, deletation and modification of a Vault should be reflected in this plugin and will require a verification by the Ledger's Team based on a new Pull Request on the [LedgerHQ/app-plugin-yearn](https://github.com/LedgerHQ/app-plugin-yearn) repository.  
This guide will essentially be a _TLDR;_ and provide the easy steps to add a new vault.

## Setup your environment 

You should follow the following official ledger instructions to setup your environment:
- [Developing and submitting a Nano app](https://developers.ledger.com/docs/nano-app/introduction/)
- [Plugin dev process](https://hackmd.io/300Ukv5gSbCbVcp3cZuwRQ)  

This is a very large step that require a full setup and the installation of a lot of dependencies and package. If you are working with Mac or Windows, you should consider a Virtual Machine to be able to test the plugin.  

Then, you should clone the [plugin](https://github.com/LedgerHQ/app-plugin-yearn).

## Start coding

Here are the modifications you should do :

- In [src/yearn_plugin.h](https://github.com/LedgerHQ/app-plugin-yearn/blob/main/src/yearn_plugin.h#L51) which contains a `NUM_YEARN_VAULTS` parameter that defines the number of vaults in the plugin mapping. You should just increment that by the number of vaults you want to add.  
- In [src/main.c](https://github.com/LedgerHQ/app-plugin-yearn/blob/main/src/main.c#L57) which contains a `YEARN_VAULTS` mapping with the details of all the vaults. You should add a new line with the corresponding details of the new vault. Params are, in order: [`vault_address`, `underlying_token_symbol`, `vault_symbol`, `number_of_decimals`].

```c
	// For the address `0xbfa4d8aa6d8a379abfe7793399d3ddacc5bbecbb`, just add `0x` every 2 characters.
    {{0xbf, 0xa4, 0xd8, 0xaa, 0x6d, 0x8a, 0x37, 0x9a, 0xbf, 0xe7,
      0x79, 0x33, 0x99, 0xd3, 0xdd, 0xac, 0xc5, 0xbb, 0xec, 0xbb},
     "DAI",
     "yvDAI",
     18},
```

- In [tests/yearn/b2c.json](https://github.com/LedgerHQ/app-plugin-yearn/blob/main/tests/yearn/b2c.json) you should add a new element in the JSON file, with the vault address **in lowercase**, the vault name and an array of selectors. For V0.4.3, you should copy the selectors in the example bellow.

```json
{
	"address": "address_of_the_new_vault_in_lowercase",
	"contractName": "name_of_the_vault",
	"selectors": {
		"0xd0e30db0": {"erc20OfInterest": [], "method": "deposit_all", "plugin": "Yearn"},
		"0xb6b55f25": {"erc20OfInterest": [], "method": "deposit", "plugin": "Yearn"},
		"0x6e553f65": {"erc20OfInterest": [], "method": "deposit_to", "plugin": "Yearn"},
		"0x3ccfd60b": {"erc20OfInterest": [], "method": "withdraw_all", "plugin": "Yearn"},
		"0x2e1a7d4d": {"erc20OfInterest": [], "method": "withdraw", "plugin": "Yearn"},
		"0x00f714ce": {"erc20OfInterest": [], "method": "withdraw_to", "plugin": "Yearn"},
		"0xe63697c8": {"erc20OfInterest": [], "method": "withdraw_to_with_slippage", "plugin": "Yearn"}
	}
}
```

- In [tests/yearn/abis/](https://github.com/LedgerHQ/app-plugin-yearn/tree/main/tests/yearn/abis) add a new file in the format `address_of_the_new_vault_in_lowercase.json` with the abi of the new vault in it.

## Testing
As there is no change in the plugin itself, tests may not be updated.  
However this is a good practice to test the plugin. Theoretically, you should test all the selectors for both the NanoS and the NanoX.
You can check the tests in [tests/src/](https://github.com/LedgerHQ/app-plugin-yearn/tree/main/tests/src) and update the `contractAddr` variable in: 
- `deposit_18_decimals.test.js`
- `deposit_18_decimals_to.test.js`
- `deposit_all.test.js`
- `withdraw_18_decimals.test.js`
- `withdraw_18_decimals_to.test.js`
- `withdraw_18_decimals_to_slippage.test.js`
- `withdraw_all.test.js`

You can check the process to execute the tests [here](https://hackmd.io/300Ukv5gSbCbVcp3cZuwRQ#Testing).