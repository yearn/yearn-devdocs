import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

type Heading = {
  level: number
  id?: string
  text: string
}

type DocRecordV1 = {
  schemaVersion: 2
  url: string
  canonicalUrl?: string
  route: string
  title: string
  headings: Heading[]
  text: string
  sha256: string
  updatedAt: string
  source: {
    htmlPath: string
    rawPath?: string
  }
}

type ManifestV1 = {
  schemaVersion: 2
  generatedAt: string
  siteOrigin: string
  docCount: number
  docsJsonlPath: string
  rawDocsPath: string
}

function ensureDir(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function decodeHtmlEntities(input: string) {
  const named: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
  }

  return input
    .replace(/&([a-zA-Z]+);/g, (match, name: string) => named[name] ?? match)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#([0-9]+);/g, (_, num: string) =>
      String.fromCodePoint(Number.parseInt(num, 10))
    )
}

function stripTags(input: string) {
  return input.replace(/<[^>]+>/g, '')
}

function normalizeText(input: string) {
  return input
    .replace(/\r\n/g, '\n')
    .replace(/\u200B|\u200C|\u200D|\uFEFF/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function extractAttr(tagAttrs: string, name: string) {
  const re = new RegExp(
    `${name}=(?:"([^"]+)"|'([^']+)'|([^\\s>]+))`,
    'i'
  )
  const match = tagAttrs.match(re)
  return match?.[1] ?? match?.[2] ?? match?.[3]
}

function absoluteUrl(origin: string, href: string, pageUrl?: string) {
  if (!href) return href
  if (href.startsWith('http://') || href.startsWith('https://')) return href
  if (href.startsWith('//')) return `https:${href}`
  if (href.startsWith('/')) return `${origin}${href}`
  if (href.startsWith('#') && pageUrl) return `${pageUrl}${href}`
  return href
}

function extractCanonicalUrl(html: string) {
  const match = html.match(/<link[^>]*rel=canonical[^>]*>/i)
  if (!match) return undefined
  const href = extractAttr(match[0], 'href')
  return href
}

function resolveSiteOrigin() {
  const explicit = process.env.DOCS_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')

  return 'https://docs.yearn.fi'
}

function extractDocHtml(html: string) {
  const start = html.indexOf('<div class="theme-doc-markdown markdown">')
  if (start < 0) return undefined

  const divTagRe = /<\/?div\b[^>]*>/gi
  divTagRe.lastIndex = start

  let depth = 0
  let contentStart = -1

  let match: RegExpExecArray | null
  while ((match = divTagRe.exec(html))) {
    const tag = match[0] ?? ''
    const isOpen = /^<div\b/i.test(tag)
    const isClose = /^<\/div\b/i.test(tag)
    if (!isOpen && !isClose) continue

    if (isOpen) {
      depth += 1
      if (depth === 1) contentStart = divTagRe.lastIndex
      continue
    }

    depth -= 1
    if (depth === 0 && contentStart >= 0) {
      const contentEnd = match.index
      return html.slice(contentStart, contentEnd)
    }
  }

  return undefined
}

function extractHeadings(docHtml: string) {
  const headings: Heading[] = []
  const re = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi
  let match: RegExpExecArray | null

  while ((match = re.exec(docHtml))) {
    const level = Number.parseInt(match[1] ?? '0', 10)
    const attrs = match[2] ?? ''
    const inner = (match[3] ?? '').replace(
      /<a[^>]*class=hash-link[^>]*>[\s\S]*?<\/a>/gi,
      ''
    )
    const text = normalizeText(decodeHtmlEntities(stripTags(inner)))
    if (!text) continue
    const id = extractAttr(attrs, 'id')
    headings.push({ level, id, text })
  }

  return headings
}

function extractTitle(html: string, docHtml?: string) {
  if (docHtml) {
    const h1 = docHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    if (h1?.[1]) return normalizeText(decodeHtmlEntities(stripTags(h1[1])))
  }
  const ogTitle = html.match(/<meta[^>]*property=og:title[^>]*>/i)
  if (ogTitle) {
    const content = extractAttr(ogTitle[0], 'content')
    if (content) return normalizeText(decodeHtmlEntities(content))
  }
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (title?.[1]) return normalizeText(decodeHtmlEntities(stripTags(title[1])))
  return 'Untitled'
}

function htmlToPlainText(docHtml: string, origin: string, pageUrl: string) {
  let s = docHtml

  s = s.replace(
    /<a[^>]*class=hash-link[^>]*>[\s\S]*?<\/a>/gi,
    ''
  )

  s = s.replace(
    /<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, codeAttrs: string, codeInner: string) => {
      const classAttr = extractAttr(codeAttrs ?? '', 'class') ?? ''
      const langMatch = classAttr.match(/language-([a-zA-Z0-9_-]+)/)
      const lang = langMatch?.[1] ?? ''
      const code = normalizeText(decodeHtmlEntities(stripTags(codeInner)))
      const fence = lang ? `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n` : `\n\n\`\`\`\n${code}\n\`\`\`\n\n`
      return fence
    }
  )

  s = s.replace(/<img([^>]*)>/gi, (_, attrs: string) => {
    const alt = decodeHtmlEntities(extractAttr(attrs ?? '', 'alt') ?? 'image')
    const src = extractAttr(attrs ?? '', 'src') ?? ''
    const abs = absoluteUrl(origin, src, pageUrl)
    return `\n\n![${alt}](${abs})\n\n`
  })

  s = s.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, lvl: string, _attrs: string, inner: string) => {
    const level = Number.parseInt(lvl, 10)
    const text = normalizeText(decodeHtmlEntities(stripTags(inner)))
    if (!text) return ''
    const hashes = '#'.repeat(Math.min(Math.max(level, 1), 6))
    return `\n\n${hashes} ${text}\n\n`
  })

  s = s.replace(/<a([^>]*)>([\s\S]*?)<\/a>/gi, (_, attrs: string, inner: string) => {
    const text = normalizeText(decodeHtmlEntities(stripTags(inner)))
    const href = extractAttr(attrs ?? '', 'href') ?? ''
    if (!href) return text
    const abs = absoluteUrl(origin, href, pageUrl)
    if (!text) return abs
    if (text === abs) return abs
    return `${text} (${abs})`
  })

  s = s.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, inner: string) => {
    const text = normalizeText(decodeHtmlEntities(stripTags(inner)))
    if (!text) return ''
    return `\`${text}\``
  })

  s = s.replace(/<\/(p|div|section|article)>/gi, '\n\n')
  s = s.replace(/<(p|div|section|article)[^>]*>/gi, '\n\n')
  s = s.replace(/<br\s*\/?\s*>/gi, '\n')

  s = s.replace(/<li[^>]*>/gi, '\n- ')
  s = s.replace(/<\/li>/gi, '\n')

  s = s.replace(/<\/tr>/gi, '\n')
  s = s.replace(/<\/t[hd]>/gi, ' | ')

  s = decodeHtmlEntities(stripTags(s))
  return normalizeText(s)
}

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

function walkFiles(dirPath: string) {
  const results: string[] = []
  const stack = [dirPath]

  while (stack.length) {
    const current = stack.pop()
    if (!current) continue
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else if (entry.isFile()) results.push(full)
    }
  }

  return results
}

function copyRawDocs(docsDir: string, rawOutDir: string) {
  if (!fs.existsSync(docsDir)) return
  const files = walkFiles(docsDir)
  for (const src of files) {
    const ext = path.extname(src).toLowerCase()
    if (ext !== '.md' && ext !== '.mdx') continue
    const rel = path.relative(docsDir, src)
    const dest = path.join(rawOutDir, rel)
    ensureDir(path.dirname(dest))
    fs.copyFileSync(src, dest)
  }
}

function findRawSourceRelativePath(docsDir: string, relHtmlPath: string) {
  const rel = relHtmlPath.replace(/\\/g, '/')

  const candidates: string[] = []
  if (rel.endsWith('/index.html')) {
    const dir = rel.slice(0, -'/index.html'.length)
    candidates.push(`${dir}.md`, `${dir}.mdx`, `${dir}/index.md`, `${dir}/index.mdx`)
  } else if (rel.endsWith('index.html')) {
    const base = rel.slice(0, -'index.html'.length).replace(/\/+$/, '')
    candidates.push(`${base}.md`, `${base}.mdx`, `${base}/index.md`, `${base}/index.mdx`)
  }

  for (const candidate of candidates) {
    const full = path.join(docsDir, candidate)
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return candidate
  }

  return undefined
}

function main() {
  const workspaceRoot = process.cwd()
  const buildDir = path.join(workspaceRoot, 'build')
  const outDir = path.join(buildDir, 'ai')
  const rawOutDir = path.join(outDir, 'raw')
  const docsDir = path.join(workspaceRoot, 'docs')

  if (!fs.existsSync(buildDir)) {
    throw new Error(
      `Missing ${buildDir}. Run \`bun run build\` before generating AI artifacts.`
    )
  }

  const siteOrigin = resolveSiteOrigin()

  fs.rmSync(outDir, { recursive: true, force: true })
  ensureDir(outDir)
  ensureDir(rawOutDir)

  const htmlFiles = walkFiles(buildDir).filter((p) => {
    if (!p.endsWith('index.html')) return false
    const rel = path.relative(buildDir, p).replace(/\\/g, '/')
    if (rel.startsWith('assets/') || rel.startsWith('fonts/')) return false
    return true
  })

  const docsJsonlPath = path.join(outDir, 'docs.jsonl')
  const docsJsonlStream = fs.createWriteStream(docsJsonlPath, {
    encoding: 'utf-8',
  })

  let docCount = 0
  for (const htmlPath of htmlFiles) {
    const html = fs.readFileSync(htmlPath, 'utf-8')
    if (!html.includes('docs-doc-page')) continue
    if (!html.includes('theme-doc-markdown')) continue

    const canonicalUrl = extractCanonicalUrl(html)

    const relHtmlPath = path.relative(buildDir, htmlPath).replace(/\\/g, '/')

    const route =
      canonicalUrl && canonicalUrl.startsWith(siteOrigin)
        ? canonicalUrl.slice(siteOrigin.length) || '/'
        : (() => {
            const rel = relHtmlPath.replace(/index\.html$/i, '')
            return `/${rel}`.replace(/\\/g, '/').replace(/\/+$/, '') || '/'
          })()

    const docHtml = extractDocHtml(html)
    if (!docHtml) continue

    const title = extractTitle(html, docHtml)
    const headings = extractHeadings(docHtml)
    const url = absoluteUrl(siteOrigin, route)
    const rawRel = findRawSourceRelativePath(docsDir, relHtmlPath)
    const rawPath = rawRel ? `/ai/raw/${rawRel}` : undefined
    const text = htmlToPlainText(docHtml, siteOrigin, url)
    const stat = fs.statSync(htmlPath)

    const record: DocRecordV1 = {
      schemaVersion: 2,
      url,
      canonicalUrl: canonicalUrl && canonicalUrl.startsWith('http') ? canonicalUrl : undefined,
      route,
      title,
      headings,
      text,
      sha256: sha256(text),
      updatedAt: stat.mtime.toISOString(),
      source: { htmlPath: relHtmlPath, rawPath },
    }

    docsJsonlStream.write(`${JSON.stringify(record)}\n`)
    docCount += 1
  }

  docsJsonlStream.end()

  copyRawDocs(docsDir, rawOutDir)

  const manifest: ManifestV1 = {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    siteOrigin,
    docCount,
    docsJsonlPath: '/ai/docs.jsonl',
    rawDocsPath: '/ai/raw/',
  }
  fs.writeFileSync(
    path.join(outDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`
  )

  fs.writeFileSync(
    path.join(buildDir, 'llms.txt'),
    [
      '# Yearn Docs',
      '',
      `Site: ${siteOrigin}`,
      '',
      'AI-readable exports:',
      '- Manifest: /ai/manifest.json',
      '- Plaintext corpus (JSONL): /ai/docs.jsonl',
      '- Raw docs sources (MD/MDX): /ai/raw/ (mirrors repository `docs/`)',
      '',
      'Notes:',
      '- Prefer citing canonical page URLs on https://docs.yearn.fi',
      '- Use plaintext for retrieval; fall back to raw MDX/MD for exact formatting/quotes',
      '',
    ].join('\n')
  )

  // eslint-disable-next-line no-console
  console.log(`Generated AI artifacts: ${docCount} docs -> ${path.relative(workspaceRoot, outDir)}`)
}

main()
