function formatDoc(str) {
  if (str === undefined) {
    return undefined
  }
  return newlineOnTag(removeNoticeTag(str))
}

function removeNoticeTag(str) {
  return str.replace(/@notice(\s)*/gm, '')
}

// Inserts an additional new line before tags (e.g. @notice, @dev)
function newlineOnTag(str) {
  return str.replace(/\n(\s)*@/gm, '\n\n@')
}

export default {
  formatDoc,
}
