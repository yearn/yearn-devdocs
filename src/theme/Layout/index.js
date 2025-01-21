import React from 'react'
import Layout from '@theme-original/Layout'

/** This component lives right below the Root component.
 * It loads for each plugin so each docs section will re-render this element.
 * Edit this component if you want to change the main layout of your site
 */
export default function LayoutWrapper(props) {
  return <Layout {...props} />
}
