import React from 'react'
import clsx from 'clsx'
import { useWindowSize } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocVersionBanner from '@theme/DocVersionBanner'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocItemFooter from '@theme/DocItem/Footer'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemContent from '@theme/DocItem/Content'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import ContentVisibility from '@theme/ContentVisibility'
import { ContractDataProvider } from '@site/src/context/ContractDataContext'
import DocMarkdownCopyButton from '@site/src/components/DocMarkdownCopyButton'
import styles from './styles.module.css'

const useDocTOC = () => {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()

  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0

  const mobile = canRender ? <DocItemTOCMobile /> : undefined

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined

  return {
    hidden,
    mobile,
    desktop,
  }
}

const DocItemLayoutContent = ({ children }) => {
  const docTOC = useDocTOC()
  const { metadata } = useDoc()

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            {docTOC.mobile && (
              <div className={styles.mobileCopyButton}>
                <DocMarkdownCopyButton />
              </div>
            )}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && (
        <div className={clsx('col col--3', styles.docSidebar)}>
          <DocMarkdownCopyButton />
          {docTOC.desktop}
        </div>
      )}
    </div>
  )
}

export default function DocItemLayoutWrapper(props) {
  const { frontMatter } = useDoc()
  const content = <DocItemLayoutContent {...props} />

  return frontMatter.rpcCalls ? (
    <ContractDataProvider contractParams={frontMatter.rpcCalls}>
      {content}
    </ContractDataProvider>
  ) : (
    content
  )
}
