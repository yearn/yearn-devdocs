---
title: Submit a Pull Request
---

The final step to be added to the partnership program is to submit a pull request to be added to the list of partners. You should submit a request to add yourself to [partners.py](https://github.com/yearn/yearn-exporter/blob/master/yearn/partners/partners.py)

First, you have to fork the repository into your account, make the modifications to update the file, and then submit the pull request to the main repo.

Below you will find the specification for the file and some examples.

## Partner

The file consists of an array of `Partner` objects. Each `Partner` has the following attributes:

- `name`: Descriptive name for the partner.
- `start_date`: Date of the PR that fee-sharing will start. In the format date(yyyy, mm, dd).
- `treasury`: Address where you want to receive the shared fees.
- `wrappers`: Array of objects that contain the addresses that will hold the vault tokens. It's an array of `Wrapper` or `WildcardWrapper` objects

## Wrapper Class

`Wrapper` should be used when only one yVault token is going to be held in that address.

`Wrapper` has the following attributes:

- `name`: Descriptive name for this wrapper. It's recommended to use the vault name as part of it.
- `vault`: Address of the vault whose tokens are going to be held here.
- `wrapper`: Address that is going to be holding the tokens.

## WildcardWrapper Class

`WilcardWrapper` should be used when one address is going to hold more than one yVault token. 

`WildcardWrapper` has the following attributes:

- `name`: Descriptive name for this wrapper.
- `wrapper`: Address that is going to be holding the tokens.
  
## Assets

Add your protocol's logo via a pull request so they can be referenced easily. 

- Make a folder in the protocols section in our [yearn-assets](https://github.com/yearn/yearn-assets/tree/master/icons/protocols) repository using the name you entered in the `name` field above.
- Add your logo as an svg titled `logo.svg` in the newly created folder.
- Add your logo sized 32x32 as a png titled `logo-32.png`.
- Add your logo sized 128x128 as a png titled `logo-128.png`.
- If you have a banner feel free to add that as a png or svg as well, name it `banner`.

## Full Example

### Wrapper

Below there's an example from one of our partners who have multiple addresses for multiple vaults. It's done using the `Wrapper` class.

```python
Partner(
    name='partner-wrapper',
    treasury='0x8392F6669292fA56123F71949B52d883aE57e225',
    wrappers=[
        Wrapper(
            name='dai 0.3.0',
            vault='0x19D3364A399d251E894aC732651be8B0E4e85001',
            wrapper='0x014dE182c147f8663589d77eAdB109Bf86958f13',
        ),
        Wrapper(
            name='dai 0.3.0 t',
            vault='0x19D3364A399d251E894aC732651be8B0E4e85001',
            wrapper='0x491EAFC47D019B44e13Ef7cC649bbA51E15C61d7',
        ),
        Wrapper(
            name='dai 0.4.3',
            vault='0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
            wrapper='0xb039eA6153c827e59b620bDCd974F7bbFe68214A',
        ),
        Wrapper(
            name='dai 0.4.3 t',
            vault='0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
            wrapper='0x6Fe02BE0EC79dCF582cBDB936D7037d2eB17F661',
        ),
        Wrapper(
            name='weth 0.4.2',
            vault='0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
            wrapper='0x546E6711032Ec744A7708D4b7b283A210a85B3BC',
        ),
        Wrapper(
            name='weth 0.4.2 t',
            vault='0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
            wrapper='0x6d75657771256C7a8CB4d475fDf5047B70160132',
        ),
    ],
),
```

### WildcardWrapper

Below you will find a partner that uses WildcardWrapper because each address is going to hold multiple different yVault tokens.

```python
Partner(
    name='partner-wildcardwrapper',
    treasury='0x7301C46be73bB04847576b6Af107172bF5e8388e',
    wrappers=[
        WildcardWrapper(
            name='bdi',
            wrapper='0x0309c98B1bffA350bcb3F9fB9780970CA32a5060',
        ),
        WildcardWrapper(
            name='bmi',
            wrapper='0x0aC00355F80E289f53BF368C9Bdb70f5c114C44B',
        ),
    ],
),
```
