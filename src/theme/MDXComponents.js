import React from 'react'
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import PrettyLink from '@site/src/components/PrettyLink'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<PrettyLink>" tag to our PrettyLink component
  // `PrettyLink` will receive all props that were passed to `<PrettyLink>` in MDX
  PrettyLink,
}
