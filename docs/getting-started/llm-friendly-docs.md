# LLM Friendly Documentation

This page makes it easy to share Yearn docs with an LLM using machine-readable endpoints built from the docs site.

## Canonical endpoints

- https://docs.yearn.fi/llms.txt
- https://docs.yearn.fi/ai/manifest.json
- https://docs.yearn.fi/ai/docs.jsonl
- https://docs.yearn.fi/ai/raw/

`/ai/raw/` is the landing page for the raw markdown mirror. Use the exact `source.rawPath` values from `docs.jsonl` when you need a specific `.md` or `.mdx` source file.

## Example prompt

```text
Use https://docs.yearn.fi/llms.txt as the entry point. Read the linked AI endpoints to answer my question, and cite canonical Yearn docs URLs from https://docs.yearn.fi in your response.
```

## Install the Yearn Docs Skill

You can also install the Yearn docs skill, which is published from this docs site and gives instructions to query the docs:

- https://docs.yearn.fi/skills/yearn-docs-site-query/SKILL.md
- https://docs.yearn.fi/skills/yearn-docs-site-query/scripts/yearn_docs_query.py

### Codex

Give this to Codex as the steps to install:

```bash
SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/yearn-docs-site-query"
mkdir -p "$SKILL_DIR/scripts"
curl -fsSL https://docs.yearn.fi/skills/yearn-docs-site-query/SKILL.md -o "$SKILL_DIR/SKILL.md"
curl -fsSL https://docs.yearn.fi/skills/yearn-docs-site-query/scripts/yearn_docs_query.py -o "$SKILL_DIR/scripts/yearn_docs_query.py"
chmod +x "$SKILL_DIR/scripts/yearn_docs_query.py"
```

Restart Codex after installation so the new skill is loaded.

### Claude Code

Give this to Claude as the steps to install:

```bash
SKILL_DIR="$HOME/.claude/skills/yearn-docs-site-query"
mkdir -p "$SKILL_DIR/scripts"
curl -fsSL https://docs.yearn.fi/skills/yearn-docs-site-query/SKILL.md -o "$SKILL_DIR/SKILL.md"
curl -fsSL https://docs.yearn.fi/skills/yearn-docs-site-query/scripts/yearn_docs_query.py -o "$SKILL_DIR/scripts/yearn_docs_query.py"
chmod +x "$SKILL_DIR/scripts/yearn_docs_query.py"
```

In Claude Code, run `/help` and look for `/yearn-docs-site-query`.

## Install the Yearn Kong Skill

For Yearn vault catalog, snapshot, timeseries, and report queries, install the Kong skill published from this docs site:

- https://docs.yearn.fi/skills/yearn-kong-query/SKILL.md
- https://docs.yearn.fi/skills/yearn-kong-query/scripts/yearn_kong_query.py

### Codex

```bash
SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/yearn-kong-query"
mkdir -p "$SKILL_DIR/scripts"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/SKILL.md -o "$SKILL_DIR/SKILL.md"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/scripts/yearn_kong_query.py -o "$SKILL_DIR/scripts/yearn_kong_query.py"
chmod +x "$SKILL_DIR/scripts/yearn_kong_query.py"
```

### Claude Code

```bash
SKILL_DIR="$HOME/.claude/skills/yearn-kong-query"
mkdir -p "$SKILL_DIR/scripts"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/SKILL.md -o "$SKILL_DIR/SKILL.md"
curl -fsSL https://docs.yearn.fi/skills/yearn-kong-query/scripts/yearn_kong_query.py -o "$SKILL_DIR/scripts/yearn_kong_query.py"
chmod +x "$SKILL_DIR/scripts/yearn_kong_query.py"
```

The skill's `catalog` command applies the current website-style Yearn filter, so agents can start from a Yearn-only catalog instead of the full multi-origin Kong feed.
