---
title: "YIP-0: YIP Purpose and Guidelines"
hide_title: true
sidebar_position: -0
---

# YIP-0: YIP Purpose and Guidelines

| Metadata | Details |
| --- | --- |
| YIP | 0 |
| Outcome | **Passed** |
| Authors | Yearn Community |
| Created | 2020-07-22 |
| Forum discussion | [View discussion](https://gov.yearn.fi/) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-0.md) |

## What is an YIP?

YIP stands for Yearn Improvement Proposal, it has been adapted from the SIP (Synthetix Improvement Proposal). The purpose of this process is to ensure changes to Yearn are transparent and well governed. An YIP is a design document providing information to the Yearn community about a proposed change to the system. The author is responsible for building consensus within the community and documenting dissenting opinions.

## YIP Rationale

We intend YIPs to be the primary mechanisms for proposing new features, collecting community input on an issue, and for documenting the design decisions for changes to Yearn. Because they are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

It is highly recommended that a single YIP contain a single key proposal or new idea. The more focused the YIP, the more successful it is likely to be.

An YIP must meet certain minimum criteria. It must be a clear and complete description of the proposed enhancement. The enhancement must represent a net improvement.

## YIP Work Flow

Parties involved in the process are the _author_, the [_YIP editors_](#yip-editors), and the Yearn community.

:warning: Before you begin, vet your idea, this will save you time. Ask the Yearn community first if an idea is original to avoid wasting time on something that will be rejected based on prior research (searching the Internet does not always do the trick). It also helps to make sure the idea is applicable to the entire community and not just the author. Just because an idea sounds good to the author does not mean it will have the intend effect. The appropriate public forum to gauge interest around your YIP is [the unofficial Yearn Discord] or [the unofficial Yearn Telegram].

Your role as the champion is to write the YIP using the style and format described below, shepherd the discussions in the appropriate forums, and build community consensus around the idea. Following is the process that a successful YIP will move along:

```
Proposed -> Approved -> Implemented
  ^                     |
  +----> Rejected       +----> Moribund
  |
  +----> Withdrawn
  v
Deferred
```

Each status change is requested by the YIP author and reviewed by the YIP editors. Use a pull request to update the status. Please include a link to where people should continue discussing your YIP. The YIP editors will process these requests as per the conditions below.

- **Work in progress (WIP)** -- Once the champion has asked the Yearn community whether an idea has any chance of support, they will write a draft YIP as a [pull request]. Consider including an implementation if this will aid people in studying the YIP.
- **Proposed** If agreeable, YIP editor will assign the YIP a number (generally the issue or PR number related to the YIP) and merge your pull request. The YIP editor will not unreasonably deny an YIP. Proposed YIPs will be discussed on governance calls and in Discord. If there is a reasonable level of consensus around the change on the governance call the change will be moved to approved. If the change is contentious a vote of token holders may be held to resolve the issue or approval may be delayed until consensus is reached.
- **Approved** -- This YIP has passed community governance and is now being prioritised for development.
- **Implemented** -- This YIP has been implemented and deployed to mainnet.
- **Rejected** -- This YIP has failed to reach community consensus.
- **Withdrawn** -- This YIP has has been withdrawn by the author(s).
- **Deferred** -- This YIP is pending another YIP/some other change that should be bundled with it together.
- **Moribund** -- This YIP has been implemented and is now obsolete and requires no explicit replacement.

## What belongs in a successful YIP?

Each YIP should have the following parts:

- Preamble - RFC 822 style headers containing metadata about the YIP, including the YIP number, a short descriptive title (limited to a maximum of 44 characters), and the author details.
- Simple Summary - “If you can’t explain it simply, you don’t understand it well enough.” Provide a simplified and layman-accessible explanation of the YIP.
- Abstract - a short (~200 word) description of the technical issue being addressed.
- Motivation (\*optional) - The motivation is critical for YIPs that want to change Yearn. It should clearly explain why the existing specification is inadequate to address the problem that the YIP solves. YIP submissions without sufficient motivation may be rejected outright.
- Specification - The technical specification should describe the syntax and semantics of any new feature.
- Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale may also provide evidence of consensus within the community, and should discuss important objections or concerns raised during discussion.
- Test Cases - Test cases may be added during the implementation phase but are required before implementation.
- Copyright Waiver - All YIPs must be in the public domain. See the bottom of this YIP for an example copyright waiver.

## YIP Formats and Templates

YIPs should be written in [markdown] format.
Image files should be included in a subdirectory of the `assets` folder for that YIP as follows: `assets/yip-X` (for yip **X**). When linking to an image in the YIP, use relative links such as `../assets/yip-X/image.png`.

## YIP Header Preamble

Each YIP must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order. Headers marked with "\*" are optional and are described below. All other headers are required.

`yip:` `<YIP number>` (this is determined by the YIP editor)

`title:` `<YIP title>`

`author:` `<a list of the author's or authors' username(s). Details are below.>`

`* discussions-to:` `<a url pointing to the official discussion thread at gov.yearn.finance>`

`status:` `< WIP | PROPOSED | APPROVED | IMPLEMENTED >`

`created:` `<date created on>`

`* updated:` `<comma separated list of dates>`

`* requires:` `<YIP number(s)>`

`* resolution:` `<a url pointing to the resolution of this YIP>`

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

#### `author` header

The `author` header lists the usernames of the authors/owners of the YIP. The format of the author header value must be:

> username

Use commas to separate multiple authors.

#### `discussions-to` header

While an YIP is in WIP or Proposed status, a `discussions-to` header will indicate the URL at [gov.yearn.finance](https://gov.yearn.fi/) where the YIP is being discussed.

#### `created` header

The `created` header records the date that the YIP was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

#### `updated` header

The `updated` header records the date(s) when the YIP was updated with "substantial" changes. This header is only valid for YIPs of Draft and Active status.

#### `requires` header

YIPs may have a `requires` header, indicating the YIP numbers that this YIP depends on.

## Auxiliary Files

YIPs may include auxiliary files such as diagrams. Such files must be named YIP-XXXX-Y.ext, where “XXXX” is the YIP number, “Y” is a serial number (starting at 1), and “ext” is replaced by the actual file extension (e.g. “png”).

## YIP Editors

The current YIP editors are:

`* banteg`

`* Cooopahtroopa`

`* Daryllautk`

`* milkyklim`

`* alphastorm`

## YIP Editor Responsibilities

For each new YIP that comes in, an editor does the following:

- Read the YIP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
- The title should accurately describe the content.
- Check the YIP for language (spelling, grammar, sentence structure, etc.), markup (Github flavored Markdown), code style

If the YIP isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the YIP is ready for the repository, the YIP editor will:

- Assign an YIP number (generally the PR number or, if preferred by the author, the Issue # if there was discussion in the Issues section of this repository about this YIP)

- Merge the corresponding pull request

- Send a message back to the YIP author with the next step.

The YIP editors monitor YIP changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on YIPs. We merely do the administrative & editorial part.

## History

The YIP document was derived heavily from the SIP Synthetix Improvement Proposal document in many places text was simply copied and modified. Any comments about the YIP document should be directed to the YIP editors.

### Bibliography

[the unofficial yearn discord]: https://discord.com/invite/3AGgWxy
[the unofficial yearn telegram]: https://t.me/yearnfinance
[pull request]: https://github.com/yearn/YIPS/pulls
[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
