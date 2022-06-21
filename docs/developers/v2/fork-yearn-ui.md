# Fork Yearn UI

This is a step-by-step guide on how to fork and customize [Macarena Finance](https://github.com/yearn/macarena-finance) which is a yearn UI made to be forked. Deploying your own UI makes you eligible to receive partner [profit-sharing](https://docs.yearn.finance/partners/introduction#profit-share-model) fees.

*Table of Conent*
- [Installing required software](#installing-required-software)
- [Cloning Macarena Finance](#cloning-macarena-finance)
- [Customizing appearence](#customizing-appearence)
  - [Change Vaults Filter](#change-vaults-filter)
  - [Change Theme](#change-theme)
- [Applying to receive partner fees](#applying-to-receive-partner-fees)

## Installing required software

To follow all steps you need to install the following dependencies:

1. **git**
    - https://git-scm.com/downloads
2. **node.js**
    - https://nodejs.org/en/download/
3. Open a terminal window and set up Yarn (used to install dependencies)
    - open terminal **Windows**: Windows + R -> type `cmd` -> Enter
    - open terminal **Mac**: CMD + Space -> type `Terminal` -> Enter
    - set up yearn: `npm install --global yarn`

## Cloning Macarena Finance

1. Fork Macarena Finance
    - https://github.com/yearn/macarena-finance/fork
2. Open terminal and clone your fork
    - `git clone git@github.com:YOUR_GITHUB_NAME/macarena-finance.git`
    - `cd macarena-finance` to enter project folder after cloning
3. Install dependencies 
    - `yarn install`
4. Run developer environment
    - `yarn dev`

## Customizing appearence

### Change Vaults Filter

For this example we will make an UI focused on stablecoins, so we will add only vaults that deal with stablecoins and allow users to filter them by collateralization properties

* Open `contexts/useYearn.tsx` and edit `endorsedVaults` to contain the vaults you want. In this example we will add only vaults that receive stablecoins.

To add new vaults head to [yearn.finance](https://yearn.finance/#/vaults), click a vault, and copy the address in the URL to add to our list. Here is how it looks like after adding all addresses for stablecoins:

```js
// contexts/useYearn.tsx line 61

const endorsedVaults: {[key: number]: string[]} = {
	1: [
		toAddress('0xdA816459F1AB5631232FE5e97a05BBBb94970c95'), //yvDAI
		toAddress('0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE'), //yvUSDC
		toAddress('0x7Da96a3891Add058AdA2E826306D812C638D87a7'), //yvUSDT
		toAddress('0xFD0877d9095789cAF24c98F7CCe092fa8E120775'), //yvTUSD
		toAddress('0x378cb52b00F9D0921cb46dFc099CFf73b42419dC'), //yvLUSD
	],
	250 : [
		toAddress('0xEF0210eB96c7EB36AF8ed1c20306462764935607'), // yvUSDC
		toAddress('0x637eC617c86D24E421328e6CAEa1d92114892439'), // yvDAI
		toAddress('0x148c05caf1Bb09B5670f00D511718f733C54bC4c'), // yvUSDT
		toAddress('0x0A0b23D9786963DE69CB2447dC125c49929419d8'), // yvMIM
	]
};
```

We will also label the vaults depending on collateralization properties. To do that we will change vault labels still at `contexts/useYearn.tsx` creating the following categories for filtering stablecoins:

* **all** -> all vaults (default homepage selection)
* **fiat_backed** -> collateralized by fiat assets
* **crypto_backed** -> collateralized by crypto assets
* **decentralized** -> decentralized emission and redeeming
* **centralized** -> centralized emission and redeeming


```js
// contexts/useYearn.tsx line 158
vault.categories = ['all'];
vault.chainID = chainID;
if (chainID === 1 || chainID === 1337) {
  if (toAddress(vault.address) === toAddress('0xdA816459F1AB5631232FE5e97a05BBBb94970c95')) //DAI
    vault.categories = ['all', 'decentralized', 'crypto_backed', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE')) //usdc
    vault.categories = ['all', 'centralized', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0x7Da96a3891Add058AdA2E826306D812C638D87a7')) //usdt
    vault.categories = ['all', 'centralized', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0xFD0877d9095789cAF24c98F7CCe092fa8E120775')) //yvTUSD
    vault.categories = ['all', 'centralized', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0x378cb52b00F9D0921cb46dFc099CFf73b42419dC')) //yvLUSD
    vault.categories = ['all', 'decentralized', 'crypto_backed'];
} else if (chainID === 250) {
  if (toAddress(vault.address) === toAddress('0xEF0210eB96c7EB36AF8ed1c20306462764935607')) //yvUSDC
    vault.categories = ['all', 'centralized', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0x637eC617c86D24E421328e6CAEa1d92114892439')) //yvDAI
    vault.categories = ['all', 'decentralized', 'crypto_backed', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0x148c05caf1Bb09B5670f00D511718f733C54bC4c')) //yvUSDT
    vault.categories = ['all', 'centralized', 'fiat_backed'];
  if (toAddress(vault.address) === toAddress('0x0A0b23D9786963DE69CB2447dC125c49929419d8')) //yvMIM
    vault.categories = ['all', 'decentralized', 'crypto_backed'];
}
_vaults.push(vault);
```

and finally also change the filter in the frontend:

```jsx
// pages/index.tsx at line  95
const	defaultSelectedCategories = {all: false, fiatBacked: false, cryptoBacked: false, centralized: false, decentralized: false};

//line  98
const	[selectedCategories, set_selectedCategories] = React.useState({...defaultSelectedCategories, all: true});

// then at line 108
(selectedCategories.all && vault.categories.includes('all'))
|| (selectedCategories.fiatBacked && vault.categories.includes('fiat_backed'))
|| (selectedCategories.cryptoBacked && vault.categories.includes('crypto_backed'))
|| (selectedCategories.centralized && vault.categories.includes('centralized'))
|| (selectedCategories.decentralized && vault.categories.includes('decentralized'))

// lastly at line 124
<div aria-label={'filters'} className={'flex flex-row justify-center items-center mb-7 -ml-1 space-x-2 md:ml-0'}>
  <button
    aria-selected={selectedCategories.all}
    onClick={(): void => set_selectedCategories({...defaultSelectedCategories, all: true})}
    className={'flex justify-center items-center px-2 h-8 border transition-colors cursor-pointer rounded-default macarena--filter'}>
    <p className={'text-xs md:text-base'}>{'All Vaults'}</p>
  </button>
  <button
    aria-selected={selectedCategories.fiatBacked}
    onClick={(): void => set_selectedCategories({...defaultSelectedCategories, fiatBacked: true})}
    className={'flex justify-center items-center px-2 h-8 border transition-colors cursor-pointer rounded-default macarena--filter'}>
    <p className={'text-xs md:text-base'}>{'Fiat Backed'}</p>
  </button>
  <button
    aria-selected={selectedCategories.cryptoBacked}
    onClick={(): void => set_selectedCategories({...defaultSelectedCategories, cryptoBacked: true})}
    className={'flex justify-center items-center px-2 h-8 border transition-colors cursor-pointer rounded-default macarena--filter'}>
    <p className={'text-xs md:text-base'}>{'Crypto Backed'}</p>
  </button>
  <button
    aria-selected={selectedCategories.decentralized}
    onClick={(): void => set_selectedCategories({...defaultSelectedCategories, decentralized: true})}
    className={'flex justify-center items-center px-2 h-8 border transition-colors cursor-pointer rounded-default macarena--filter'}>
    <p className={'text-xs md:text-base'}>{'Decentralized'}</p>
  </button>
  <button
    aria-selected={selectedCategories.centralized}
    onClick={(): void => set_selectedCategories({...defaultSelectedCategories, centralized: true})}
    className={'flex justify-center items-center px-2 h-8 border transition-colors cursor-pointer rounded-default macarena--filter'}>
    <p className={'text-xs md:text-base'}>{'Centralized'}</p>
  </button>
</div>
```

Here is what the new customized filtering should look like after applying all above changes:

![](https://i.imgur.com/cLfcNr4.png)

### Change Theme

Replace the logo image with either another image or a simple text:

```jsx
// pagex/app.tsx line 71
<h1>Cozy Stables Finance</h1>
```

Changing the above line will make the page header look like this now:

![](https://i.imgur.com/Lt0kFQM.png)

To change the color scheme we go to `style.css` at line 9

```css
	--default-rounded: 2px;
	--color-neutral-0: 279 37% 17%;
	--color-neutral-100: 279 36% 27%;
	--color-neutral-200: 279 36% 34%;
	--color-neutral-300: 279 36% 40%;
	--color-neutral-400: 279 37% 17%;
	--color-neutral-500: 0 0% 90%;
	--color-neutral-700: 0 0% 100%;

	--color-primary-100: 279 36% 34%;
	--color-primary-200: 279 36% 32%;
	--color-primary-500: 49 100% 50%;
	--color-primary-600: 49 100% 47%;
	--color-accent-500: 49 100% 50%;
	--color-accent-600: 49 100% 47%;
```

## Applying to receive partner fees