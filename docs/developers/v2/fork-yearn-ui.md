# Fork Yearn UI

This is a step-by-step guide on how to fork and customize [Macarena Finance](https://github.com/yearn/macarena-finance) which is a yearn UI made to be forked. Deploying your own UI makes you eligible to receive partner [profit-sharing](https://docs.yearn.finance/partners/introduction#profit-share-model) fees.

*Table of Conent*
- [Install required software](#install-required-software)
- [Clone Macarena Finance](#clone-macarena-finance)
- [Change Vaults Filter](#change-vaults-filter)
- [Change Logo](#change-logo)
- [Change Colors](#change-colors)
- [Change SEO settings](#change-seo-settings)
- [Apply to receive partner fees](#apply-to-receive-partner-fees)

## Install required software

To follow all steps you need to install the following dependencies:

1. **git**
    - https://git-scm.com/downloads
2. **node.js**
    - https://nodejs.org/en/download/
3. Open a terminal window and set up Yarn (used to install dependencies)
    - open terminal **Windows**: Windows + R -> type `cmd` -> Enter
    - open terminal **Mac**: CMD + Space -> type `Terminal` -> Enter
    - set up yearn: `npm install --global yarn`

## Clone Macarena Finance

1. Fork Macarena Finance
    - https://github.com/yearn/macarena-finance/fork
2. Open terminal and clone your fork
    - `git clone git@github.com:YOUR_GITHUB_NAME/macarena-finance.git`
    - `cd macarena-finance` to enter project folder after cloning
3. Install dependencies 
    - `yarn install`
4. Run developer environment
    - `yarn dev`

## Change Vaults Filter

For this example we will make an UI focused on stablecoins, so we will add only vaults that deal with stablecoins and allow users to filter them by collateralization properties

* Open `contexts/useYearn.tsx` and edit `endorsedVaults` to contain the vaults you want. In this example we will add only vaults that receive stablecoins.

To add new vaults head to [yearn.finance](https://yearn.finance/#/vaults), click a vault, and copy the address in the URL to add to our list. Here is how it looks like after adding all addresses for stablecoins:

```js
// contexts/useYearn.tsx line 67

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
// contexts/useYearn.tsx line 17
defaultCategories: ['All', 'Crypto Backed', 'Fiat Backed', 'Decentralized', 'Centralized']
// contexts/useYearn.tsx line 165
vault.categories = ['All'];
vault.chainID = chainID;
if (chainID === 1 || chainID === 1337) {
  if (toAddress(vault.address) === toAddress('0xdA816459F1AB5631232FE5e97a05BBBb94970c95')) //DAI
    vault.categories = ['All', 'Decentralized', 'Crypto Backed', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE')) //usdc
    vault.categories = ['All', 'Centralized', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0x7Da96a3891Add058AdA2E826306D812C638D87a7')) //usdt
    vault.categories = ['All', 'Centralized', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0xFD0877d9095789cAF24c98F7CCe092fa8E120775')) //yvTUSD
    vault.categories = ['All', 'Centralized', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0x378cb52b00F9D0921cb46dFc099CFf73b42419dC')) //yvLUSD
    vault.categories = ['All', 'Decentralized', 'Crypto Backed'];
} else if (chainID === 250) {
  if (toAddress(vault.address) === toAddress('0xEF0210eB96c7EB36AF8ed1c20306462764935607')) //yvUSDC
    vault.categories = ['All', 'Centralized', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0x637eC617c86D24E421328e6CAEa1d92114892439')) //yvDAI
    vault.categories = ['All', 'Decentralized', 'Crypto Backed', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0x148c05caf1Bb09B5670f00D511718f733C54bC4c')) //yvUSDT
    vault.categories = ['All', 'Centralized', 'Fiat Backed'];
  if (toAddress(vault.address) === toAddress('0x0A0b23D9786963DE69CB2447dC125c49929419d8')) //yvMIM
    vault.categories = ['All', 'Decentralized', 'Crypto Backed'];
}
_vaults.push(vault);
```

Here is what the new customized filtering should look like after applying all the above changes:

![](https://i.imgur.com/cLfcNr4.png)

## Change Logo

Replace the logo image with either another image or a simple text:

```jsx
// pagex/app.tsx line 71
<h1>Cozy Stables Finance</h1>
```

Changing the above line will make the page header look like this now:

![](https://i.imgur.com/Lt0kFQM.png)

## Change Colors

The default color theme uses HSL, this allows for quicker customization of the entire theme with less variables, a quick primer on HSL:

**HSL** stands for Hue, Saturation, Lightness and is represented on tailwind like this:

```css
--variable: 200 100% 50%;
```

which will be compiled to:

```css
--variable: hsl(200, 100%, 50%);
```

**Hue** is measured in degrees:
- 0° is red
- 120° is green
- 240° is blue.

![hue examples](https://i.imgur.com/ddaVLBc.png)

**Saturation** is how colorful or vivid a color looks:
- 0% saturation is grey (no color)
- 100% saturation is vibrant and intense.

![saturation examples](https://i.imgur.com/PkTorUr.png)

**Lightness** measures how close a color is to black or white:
- 0% lightness is pure black
- 50% lightness is a pure color at the given hue.
- 100% lightness is pure white

![lightness examples](https://i.imgur.com/A8coxLo.png)

<br />

To change the color scheme go to `style.css` at line 9 and change to something like:

```css
/* style.css line 9 */

--theme-primary-color: 180; /* teal */
--theme-secondary-color: 120; /* green */
--theme-text-color: 45; /* yellow */

--default-rounded: 2px;
--color-neutral-0: var(--theme-primary-color) 37% 17%;
--color-neutral-100: var(--theme-primary-color) 36% 27%;
--color-neutral-200: var(--theme-primary-color) 36% 34%;
--color-neutral-300: var(--theme-primary-color) 36% 40%;
--color-neutral-400: var(--theme-primary-color) 37% 17%;
--color-neutral-500: var(--theme-text-color) 100% 30%;
--color-neutral-700: var(--theme-text-color) 100% 50%;

--color-primary-100: var(--theme-primary-color) 36% 34%;
--color-primary-200: var(--theme-primary-color) 36% 32%;

--color-primary-500: var(--theme-secondary-color) 100% 50%;
--color-primary-600: var(--theme-secondary-color) 100% 47%;
--color-accent-500: var(--theme-secondary-color) 100% 50%;
--color-accent-600: var(--theme-secondary-color) 100% 47%;
```

and the page should now look like this:

![](https://i.imgur.com/r5Docla.png)

## Change SEO settings

- Change SEO settings at `next.config.js` line 29:

```js
WEBSITE_URI: 'https://cozy-stables.finance/',
WEBSITE_NAME: 'Cozy Stables Finance',
WEBSITE_TITLE: 'Cozy Stables Finance',
WEBSITE_DESCRIPTION: 'Cozy Stables Finance, a place for everyone to sit comfy on their stables',
PROJECT_GITHUB_URL: 'https://github.com/MarcoWorms/macarena-finance',
```

- and at `public/manifest.json`:
```js
{
	"name": "Cozy Stables Finance",
	"description": "Cozy Stables Finance, a place for everyone to sit comfy on their stables",
	"iconPath": "/favicons/favicon.svg"
}
```

- Change social media links at `/pages/_app.tsx` [lines 217-L243](https://github.com/yearn/macarena-finance/blob/main/pages/_app.tsx#L217-L243)

- Change favico image at `public/favicons/`

## Apply to receive partner fees

1. At `next.config.js` change `PARTNER_ID_ADDRESS` to the address that should receive the partner fees

```js
PARTNER_ID_ADDRESS: '0x_WALLET_ADDRESS_TO_RECEIVE_FEES',
```

2. Fill up [this template issue](https://github.com/yearn/macarena-finance/issues/new?assignees=&labels=partnership+request&template=partnership-request.yml) to request Yearn to enable the configured ID to receive partner program profit-sharing fees