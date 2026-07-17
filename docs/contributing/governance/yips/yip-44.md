---
title: "YIP-44: Improve YIP categories"
hide_title: true
sidebar_position: -44
---

# YIP-44: Improve YIP categories

| Metadata | Details |
| --- | --- |
| YIP | 44 |
| Outcome | **Passed** |
| Authors | sambacha |
| Created | 2020-08-31 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-44-improve-yip-categories/3608) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-44.md) |

## Simple Summary



Add new `status`(s) to `YIPs` so that author(s) may better manage their `YIPs` in the context of community collaboration and so that governance is given the proper procedures to foster community cooperation.

## Abstract



This will _only_ add to the current state of `proposal YIPs` in that it only changes the _potential_ `statuses` available of a `YIP`. It does not add any `protocol` changes: only documentation and governance procedures (off chain only).

I proposal the following changes to reflect a new state of possible 'YIPs':

1. Modifying YIP Templates
2. Modifying YIP Validator Gemfile
3. Modifying YIP README file

## Motivation



> The current state of procedures for `YIPS` is inadequate as it unnecessarily limits the possible outcomes of a proposed `YIP` while not affording both the author(s) nor the governance council flexibility in being able to deal with community driven `YIPs`

This is a _documentation_ and _procedure_ change. In fact there is no explicit description for proposing such changes in governance _(that I could find)._

This change is needed as it better explains the _intent_ of the YIP format to author(s). It also provides for governance additional functionality in their procedures so as to not potentially 'alienate' author(s) by rejecting a YIP when it could have been withdrawn. This ensures that also the author(s) are active in the process of their submitted proposal and in the larger community (in so far as they are knowledgable about other potentially competing YIPS.)

## Specification

_Additions in 'BOLD'_

Proposed - a YIP that is ready to be reviewed in a governance call.
Approved - a YIP that has been accepted for implementation by the Yearn community.
Implemented - a YIP that has been released to mainnet.
Rejected - a YIP that has been rejected.
**Withdrawn - a YIP that has been withdrawn by the author(s).**
**Deferred - a YIP that governance has decided to wait for another YIP/some other change that should be bundled with it together**
**Moribund - a YIP that was once Implemented. It is now Obsolete 'AND' requires no explicit replacement.**

The "Withdrawn" status is similar - it means that the YIP author has decided that the YIP is actually a 'bad' idea, or has accepted that a competing proposal is a better alternative.

### Workflow Specification

```
Proposed -> Approved -> Implemented
  ^                     |
  +----> Rejected       +----> Moribund
  |
  +----> Withdrawn
  v
Deferred
```

#### New Statuses for YIPs

> To be added are the following

- Withdrawn
- Moribund
- Deferred

### Overview



#### New YIP statuses

- Withdrawn
  Means that the YIP author has decided that the YIP is actually a bad idea, or has accepted that a competing proposal is a better alternative.
- Moribund
  Obsolete and requires no explicit replacement, it SHOULD be marked "Moribund"
- Deferred
  Governance placed status upon a YIP that means that they would like to know more information, or that they would like to see if the author(s) can work with another proposed YIP and combine it into a single YIP, etc.

### Rationale

The reasoning behind this is that it is unclear what will happen to a YIP should material facts change during its initial formal proposal and when its actually voted on by governance. Changes may be introduced between then, and the author may want to withdraw the proposal. This also frees up the governance council in that they are no longer obligated to reject every single YIP that may no longer be relevant, instead sharing the responsibility with the actual author(s).

### Technical Specification



Technical implementation involves:

- changes in the validation Gemfile
- changes in the template `.md` file

#### Changes in Template `.md` file

Below is a sample `.yaml` file to illustrate the _new_ header that should be used in the `yip-template.md` file

```yaml
---
YIP: `<YIP number>`
Title: `<YIP title>`
Author: `<username>`
Type: `<Informational | Standards Track>`
Status: <WIP | Proposed | Approved | Deferred | Withdrawn | Rejected |
           Implemented | Replaced | Moribund>
    Version: `<major>`[.`<minor>`]
    Created: `<date created on, in ISO 8601 (yyyy-mm-dd) format>`
    Requires (*optional): `<YIP number(s)>`
    Implementation (*optional): `<Added if YIP passes>`

Discussions-to: `<Create a new thread on https://gov.yearn.fi/ and drop the link here>`

* Requires: `<YIP numbers>`
* Replaces: `<YIP numbers>`
* Replaced-By: `<YIP number>`
---
```

#### YIP Validator (Ruby Gem)

> current version: `1.0.2`, should be bumped to `1.1.0`
> Changes located [github.com/yearn/yip_validator/blob/master/lib/yip_validator/validator.rb#L25](https://github.com/yearn/yip_validator/blob/master/lib/yip_validator/validator.rb#L25)

```ruby
    validates_inclusion_of :status, in: ['WIP', 'Proposed', 'Approved', 'Implemented', 'Rejected']
```

```ruby
    validates_inclusion_of :status, in: ['WIP', 'Proposed', 'Approved', 'Implemented', 'Rejected', 'Withdrawn', 'Deferred', 'Moribund']
```

See Files Changed here [https://github.com/sambacha/yip_validator/tree/YIP-Proposed](https://github.com/sambacha/yip_validator/tree/YIP-Proposed)

### Test Cases

See `travis-ci` logs for the `Rub Gem` update here [https://travis-ci.com/github/sambacha/yip_validator/builds/181226022](https://travis-ci.com/github/sambacha/yip_validator/builds/181226022)

```bash
total:2, valid:2, invalid:0, errors:0
	statuses: [["Withdrawn", 1], ["Implemented", 1]]
  raises exception if it includes invalid yips
spec/fixtures/invalid/yip-7.md is NOT valid:	 {:status=>["is not included in the list"]}

```
