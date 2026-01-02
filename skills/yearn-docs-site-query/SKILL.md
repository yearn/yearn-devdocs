---
name: yearn-docs-site-query
description: Query and cite Yearn documentation via the hosted docs site's AI exports (llms.txt, /ai/manifest.json, /ai/docs.jsonl, and optional /ai/raw/). Use when answering questions from docs.yearn.fi (or a Vercel preview) without cloning the repo, and when you need reliable retrieval + citations from the published docs.
---

# Yearn Docs: hosted retrieval

## Inputs

- `BASE` (optional): The docs site origin to query (e.g. a Vercel preview). Defaults to `https://docs.yearn.fi`.

Example:

```text
BASE=https://docs.yearn.fi
```

Tip: if you use a bash one-liner like `BASE=... python3 ... --base "$BASE" ...`, `$BASE` expands before the assignment takes effect. Prefer either `--base 'https://...'` directly, or `export BASE=...` first, or omit `--base` and rely on the default.

## One-approval workflow (recommended)

To avoid repeated network approvals in restricted environments, use the bundled helper. It auto-checks for updates (conditional request) and only downloads `docs.jsonl` when it has changed, so you typically need only **one approval per invocation**:

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" search "yCHAD multisig signers"
```

If you want absolutely no network calls, force offline mode (no network at all):

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" --offline search "veYFI gauge"
```

To fetch a page by route:

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" get /developers/security/multisig
```

To clear cached files for that `BASE`:

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" cleanup
```

To see whether your cached data is stale (age/etag/manifest info):

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" status
```

To check the remote for updates and refresh the cache if needed (will require network approval in restricted environments):

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" --check-updates status
```

To skip update checks and use cached data (if present):

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" --no-auto-update search "multisig signers"
```

To force a full re-download (even if unchanged):

```bash
python3 skills/yearn-docs-site-query/scripts/yearn_docs_query.py --base "$BASE" --refresh status
```

## Endpoints (relative to `BASE`)

- `GET /llms.txt` — human/agent pointer file.
- `GET /ai/manifest.json` — machine-readable pointers (paths, counts, origin).
- `GET /ai/docs.jsonl` — plaintext corpus (JSON Lines: 1 JSON object per doc page).
- `GET /ai/raw/...` — optional raw `.md`/`.mdx` source mirror (if present in corpus records).

## Retrieval workflow

1. Fetch `GET {BASE}/ai/manifest.json` and `GET {BASE}/llms.txt`.
2. Download `GET {BASE}/ai/docs.jsonl` and parse it as JSONL (stream line-by-line).
3. Rank candidate records for the user query:
   - Tokenize the query and score matches.
   - Boost matches in `title` and `headings[].text` over matches in `text`.
4. Select the top records (e.g. 3–8), then select the best sections:
   - Split `text` by headings and keep the most relevant chunks.
5. Answer using only the selected chunks (don’t hallucinate fields not present in the docs).

## Record shape (docs.jsonl)

Expect at least:

- `title`: page title
- `headings`: array of `{ level, id?, text }`
- `text`: extracted plaintext (may include fenced code blocks)
- `route`: the path on the site host (e.g. `/developers/addresses`)
- `url`: canonical URL for the page (often on `https://docs.yearn.fi/...`)
- `source.htmlPath`: where it came from in the static build

Optional/newer:

- `canonicalUrl`
- `source.rawPath`: path under `/ai/raw/...` for exact `.md`/`.mdx`

## Citing and linking

- Prefer citing the canonical URL in the record:
  - Use `canonicalUrl` if present, else `url`.
- If `url` points to the wrong origin for the environment you’re using, cite `BASE + route`.

## Exact-source fallback (for precise quotes/formatting)

When you need exact formatting, tables, or the original MDX:

1. If `source.rawPath` exists: `GET {BASE}{source.rawPath}` and quote from that.
2. Otherwise fetch the rendered page: `GET {BASE}{route}` and extract the relevant section from HTML.

## Caching

- Cache `GET {BASE}/ai/docs.jsonl` per session.
- If you can, revalidate with `ETag`/`If-None-Match` on subsequent runs.
