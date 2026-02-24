import fs from 'fs'
import path from 'path'
import { Address, PublicClient, getAddress } from 'viem'
import * as constants from './constants'
import { readSafeOwners } from './multisigCalls'

const MULTISIG_DOCS_PATH = 'docs/developers/security/multisig.md'

const extractMembersSection = (markdown: string) => {
  const parts = markdown.split(/^## Members\s*$/m)
  const afterMembersHeading = parts[1]
  if (!afterMembersHeading) {
    throw new Error('Failed to find "## Members" section in multisig docs')
  }
  const nextHeadingIndex = afterMembersHeading.search(/^##\s/m)
  if (nextHeadingIndex === -1) {
    return afterMembersHeading
  }
  return afterMembersHeading.slice(0, nextHeadingIndex)
}

const extractAddressesFromMembersTable = (section: string) => {
  const addresses: string[] = []
  for (const line of section.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue
    const matches = line.match(/0x[a-fA-F0-9]{40}/g)
    if (!matches || matches.length === 0) continue
    addresses.push(matches[0])
  }
  return addresses
}

const getDuplicates = (addresses: Address[]) => {
  const seen = new Set<Address>()
  const duplicates = new Set<Address>()
  for (const address of addresses) {
    if (seen.has(address)) {
      duplicates.add(address)
      continue
    }
    seen.add(address)
  }
  return [...duplicates]
}

export const checkYearnMultisigMembers = async (
  publicClient: PublicClient,
  checkFlag: boolean | undefined,
  failedChecks: string[]
) => {
  const multisigAddress = getAddress(constants.yearnV3ContractsMainnet.daddy)
  const docsPath = path.resolve(MULTISIG_DOCS_PATH)

  console.log('validating Yearn multisig members...')

  let docsMembersSectionParsed = true
  let docsAddressesValid = true
  let docsOwnerCountMatch = true
  let docsUniqueOwnersCheck = true
  let onChainUniqueOwnersCheck = true
  let exactMembersMatch = true

  let docsMemberAddressesRaw: string[] = []
  let docsMemberAddresses: Address[] = []

  try {
    const markdown = fs.readFileSync(docsPath, 'utf8')
    const membersSection = extractMembersSection(markdown)
    docsMemberAddressesRaw = extractAddressesFromMembersTable(membersSection)
  } catch (error) {
    docsMembersSectionParsed = false
    exactMembersMatch = false
    failedChecks.push('yearnMultisig docs members section parse failed')
    console.error(error)
  }

  if (docsMembersSectionParsed) {
    try {
      docsMemberAddresses = docsMemberAddressesRaw.map((address) =>
        getAddress(address)
      )
    } catch (error) {
      docsAddressesValid = false
      exactMembersMatch = false
      failedChecks.push('yearnMultisig docs contains invalid address')
      console.error(error)
    }
  }

  const onChainOwners = (await readSafeOwners(multisigAddress, publicClient)).map(
    (address) => getAddress(address)
  )

  if (docsAddressesValid) {
    docsOwnerCountMatch = docsMemberAddresses.length === onChainOwners.length
    if (!docsOwnerCountMatch) {
      failedChecks.push(
        `yearnMultisig owner count mismatch (docs=${docsMemberAddresses.length}, onchain=${onChainOwners.length})`
      )
    }

    const docsDuplicates = getDuplicates(docsMemberAddresses)
    const onChainDuplicates = getDuplicates(onChainOwners)
    docsUniqueOwnersCheck = docsDuplicates.length === 0
    onChainUniqueOwnersCheck = onChainDuplicates.length === 0

    for (const duplicate of docsDuplicates) {
      failedChecks.push(`yearnMultisig duplicate docs member: ${duplicate}`)
    }
    for (const duplicate of onChainDuplicates) {
      failedChecks.push(`yearnMultisig duplicate onchain owner: ${duplicate}`)
    }

    const docsSet = new Set(docsMemberAddresses)
    const onChainSet = new Set(onChainOwners)
    const missingInDocs = onChainOwners.filter((owner) => !docsSet.has(owner))
    const extraInDocs = docsMemberAddresses.filter(
      (owner) => !onChainSet.has(owner)
    )

    if (missingInDocs.length > 0 || extraInDocs.length > 0) {
      exactMembersMatch = false
    }

    for (const owner of missingInDocs) {
      failedChecks.push(`yearnMultisig missing in docs: ${owner}`)
    }
    for (const owner of extraInDocs) {
      failedChecks.push(`yearnMultisig extra in docs: ${owner}`)
    }
  }

  if (
    !docsMembersSectionParsed ||
    !docsAddressesValid ||
    !docsOwnerCountMatch ||
    !docsUniqueOwnersCheck ||
    !onChainUniqueOwnersCheck ||
    !exactMembersMatch
  ) {
    checkFlag = false
  }

  console.log('Yearn multisig member validation complete. \n')

  return {
    addresses: {
      multisigAddress,
      docsMemberAddresses,
      onChainOwners,
      docsSourcePath: MULTISIG_DOCS_PATH,
    },
    checks: {
      docsMembersSectionParsed,
      docsAddressesValid,
      docsOwnerCountMatch,
      docsUniqueOwnersCheck,
      onChainUniqueOwnersCheck,
      exactMembersMatch,
    },
    checkFlag,
  }
}
