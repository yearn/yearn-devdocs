import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@site/src/components/shadcn/button/button'
import styles from '@site/src/css/docCopyButton.module.css'
import { Check, Copy, AlertTriangle } from 'lucide-react'

const RESET_DELAY_MS = 2200

const cleanupDocContent = (root: HTMLElement) => {
  const selectorsToRemove = [
    '.hash-link',
    '.theme-code-block__copy-button',
    '.theme-code-block__button',
    'button',
    'svg',
    'style',
    'script',
    'input',
    'textarea',
    'select',
  ]

  root.querySelectorAll(selectorsToRemove.join(',')).forEach((node) => {
    node.remove()
  })
}

const getCodeLanguage = (codeEl: HTMLElement | null) => {
  if (!codeEl) return ''
  const direct =
    codeEl.getAttribute('data-language') ||
    codeEl.parentElement?.getAttribute('data-language')
  if (direct) return direct
  const className = codeEl.getAttribute('class') || ''
  const match = className.match(/language-([^\s]+)/)
  return match ? match[1] : ''
}

const toMarkdown = async (root: HTMLElement) => {
  const [turndownModule, gfmModule] = await Promise.all([
    import('turndown'),
    import('turndown-plugin-gfm'),
  ])
  const TurndownService =
    (turndownModule as any).default || (turndownModule as any)
  const turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
    headingStyle: 'atx',
    bulletListMarker: '-',
  })
  const gfm =
    (gfmModule as any).gfm || (gfmModule as any).default || (gfmModule as any)
  if (gfm) {
    turndownService.use(gfm)
  }

  turndownService.addRule('fencedCodeBlockWithLanguage', {
    filter: (node) => {
      if (!(node instanceof HTMLElement)) return false
      return (
        node.nodeName === 'PRE' &&
        node.firstElementChild?.nodeName === 'CODE'
      )
    },
    replacement: (_content, node) => {
      const pre = node as HTMLElement
      const code = pre.querySelector('code')
      const language = getCodeLanguage(code)
      const text = code?.textContent || pre.textContent || ''
      const trimmed = text.replace(/\n$/, '')
      const fence = '```'
      return `\n\n${fence}${language ? language : ''}\n${trimmed}\n${fence}\n\n`
    },
  })

  const markdown = turndownService.turndown(root)
  return markdown.trim()
}

const writeToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  const success = document.execCommand('copy')
  textarea.remove()
  if (!success) {
    throw new Error('Clipboard copy failed')
  }
}

const DocMarkdownCopyButton = () => {
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>(
    'idle'
  )
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const resetStatus = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setStatus('idle')
    }, RESET_DELAY_MS)
  }

  const handleCopy = useCallback(async () => {
    try {
      setStatus('copying')
      const docContent = document.querySelector(
        '.theme-doc-markdown'
      ) as HTMLElement | null
      if (!docContent) {
        throw new Error('Doc content not found')
      }
      const clone = docContent.cloneNode(true) as HTMLElement
      cleanupDocContent(clone)
      const markdown = await toMarkdown(clone)
      await writeToClipboard(markdown)
      setStatus('copied')
      resetStatus()
    } catch (error) {
      console.error('Failed to copy markdown', error)
      setStatus('error')
      resetStatus()
    }
  }, [])

  const label =
    status === 'copying'
      ? 'Copying...'
      : status === 'copied'
      ? 'Copied markdown'
      : status === 'error'
      ? 'Copy failed'
      : 'Copy page as Markdown'

  const Icon =
    status === 'copied'
      ? Check
      : status === 'error'
      ? AlertTriangle
      : Copy

  return (
    <div className={styles.copyToolbar}>
      <Button
        type="button"
        variant="link"
        onClick={handleCopy}
        className={styles.copyButton}
        aria-live="polite"
      >
        <Icon size={16} aria-hidden="true" />
        <span>{label}</span>
      </Button>
    </div>
  )
}

export default DocMarkdownCopyButton
