
A basic guest list contract for testing.

For a Vyper implementation of this contract containing additional
functionality, see https://github.com/banteg/guest-list/blob/master/contracts/GuestList.vy

## Functions
### constructor
```solidity
  function constructor(
  ) public
```
Create the test guest list, setting the message sender as
`bouncer`.

Note that since this is just for testing, you're unable to change
`bouncer`.


### setGuests
```solidity
  function setGuests(
    address[] _guests,
    bool[] _invited
  ) external
```
Invite guests or kick them from the party.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_guests` | address[] | The guests to add or update.
|`_invited` | bool[] | A flag for each guest at the matching index, inviting or
uninviting the guest.

### authorized
```solidity
  function authorized(
    address _guest,
    uint256 _amount
  ) external returns (bool)
```
Check if a guest with a bag of a certain size is allowed into
the party.

Note that `_amount` isn't checked to keep test setup simple, since
from the vault tests' perspective this is a pass/fail call anyway.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_guest` | address | The guest's address to check.
|`_amount` | uint256 | Not used. The amount of tokens the guest is bringing.

