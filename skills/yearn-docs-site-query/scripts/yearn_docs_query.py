#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import pathlib
import re
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Any, Dict, Iterable, List, Optional, Tuple


def _normalize_base(base: str) -> str:
    base = base.strip()
    if not base:
        raise ValueError("BASE is empty")
    if not base.startswith("http://") and not base.startswith("https://"):
        base = "https://" + base
    return base.rstrip("/")


def _sha256_hex(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


def _default_cache_dir() -> pathlib.Path:
    # Prefer XDG cache.
    xdg = os.environ.get("XDG_CACHE_HOME")
    if xdg:
        return pathlib.Path(xdg) / "yearn-docs-site-query"

    home = os.path.expanduser("~")
    if home and home != "~":
        return pathlib.Path(home) / ".cache" / "yearn-docs-site-query"

    # Fallback: local relative cache.
    return pathlib.Path(".yearn-docs-cache")


def _read_text(path: pathlib.Path) -> Optional[str]:
    try:
        return path.read_text("utf-8")
    except FileNotFoundError:
        return None


def _write_text(path: pathlib.Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def _read_json(path: pathlib.Path) -> Optional[Dict[str, Any]]:
    raw = _read_text(path)
    if raw is None:
        return None
    return json.loads(raw)


def _write_json(path: pathlib.Path, obj: Dict[str, Any]) -> None:
    _write_text(path, json.dumps(obj, indent=2, sort_keys=True) + "\n")


def _http_get(
    url: str,
    *,
    headers: Optional[Dict[str, str]] = None,
    timeout_s: int = 30,
) -> Tuple[int, Dict[str, str], bytes]:
    req = urllib.request.Request(url, headers=headers or {}, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout_s) as resp:
            status = getattr(resp, "status", 200)
            resp_headers = {k.lower(): v for k, v in resp.headers.items()}
            body = resp.read()
            return status, resp_headers, body
    except urllib.error.HTTPError as e:
        status = e.code
        resp_headers = {k.lower(): v for k, v in e.headers.items()} if e.headers else {}
        body = e.read() if hasattr(e, "read") else b""
        return status, resp_headers, body


def _save_bytes(path: pathlib.Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def _load_bytes(path: pathlib.Path) -> Optional[bytes]:
    try:
        return path.read_bytes()
    except FileNotFoundError:
        return None


def _tokenize(query: str) -> List[str]:
    query = query.lower().strip()
    if not query:
        return []
    return [t for t in re.split(r"[^\w]+", query) if t]


@dataclass
class SearchHit:
    score: int
    title: str
    url: str
    route: str
    snippet: str


def _score_record(record: Dict[str, Any], tokens: List[str]) -> Tuple[int, str]:
    title = (record.get("title") or "").lower()
    headings = " ".join((h.get("text") or "") for h in (record.get("headings") or [])).lower()
    text = (record.get("text") or "").lower()

    score = 0
    coverage = 0
    for tok in tokens:
        in_title = title.count(tok)
        in_headings = headings.count(tok)
        in_text = text.count(tok)

        if in_title or in_headings or in_text:
            coverage += 1

        score += 10 * in_title
        score += 6 * in_headings
        score += 1 * in_text

    # Prefer documents that match more distinct query tokens, and penalize partial matches.
    score += 200 * coverage
    missing = max(0, len(tokens) - coverage)
    score -= 300 * missing

    snippet = ""
    if tokens:
        tok = tokens[0]
        idx = text.find(tok)
        if idx >= 0:
            start = max(0, idx - 120)
            end = min(len(text), idx + 240)
            snippet = (record.get("text") or "")[start:end].replace("\n", " ").strip()
    return score, snippet


def _iter_jsonl(path: pathlib.Path) -> Iterable[Dict[str, Any]]:
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)


def _fetch_corpus(
    *,
    base: str,
    cache_dir: pathlib.Path,
    refresh: bool,
    offline: bool,
    check_updates: bool,
    auto_update: bool,
) -> Tuple[pathlib.Path, Dict[str, Any]]:
    base_key = _sha256_hex(base)[:12]
    root = cache_dir / base_key
    root.mkdir(parents=True, exist_ok=True)

    manifest_path = root / "manifest.json"
    docs_path = root / "docs.jsonl"
    meta_path = root / "meta.json"

    meta = _read_json(meta_path) or {}

    if offline:
        manifest = _read_json(manifest_path)
        if manifest is None:
            raise SystemExit(f"Offline mode: missing cached manifest at {manifest_path}")
        if not docs_path.exists():
            raise SystemExit(f"Offline mode: missing cached corpus at {docs_path}")
        return docs_path, manifest

    # Cache-first: avoid network if we already have a corpus and aren't asked to check/refresh.
    cached_manifest = _read_json(manifest_path)
    if (
        not refresh
        and not check_updates
        and not auto_update
        and cached_manifest is not None
        and docs_path.exists()
    ):
        return docs_path, cached_manifest

    # Determine the docs.jsonl URL without necessarily fetching the manifest.
    docs_rel = (cached_manifest or {}).get("docsJsonlPath") or meta.get("docsRel") or "/ai/docs.jsonl"
    if not str(docs_rel).startswith("/"):
        docs_rel = "/" + str(docs_rel)
    docs_url = f"{base}{docs_rel}"

    # Auto-update: do a conditional GET against docs.jsonl (ETag / Last-Modified) and download only if changed.
    if auto_update and not refresh and docs_path.exists():
        headers: Dict[str, str] = {}
        if meta.get("etag"):
            headers["If-None-Match"] = meta["etag"]
        if meta.get("lastModified"):
            headers["If-Modified-Since"] = meta["lastModified"]

        if headers:
            status, resp_headers, body = _http_get(docs_url, headers=headers, timeout_s=60)
            if status == 304:
                meta["checkedAt"] = int(time.time())
                _write_json(meta_path, meta)
                return docs_path, cached_manifest or {}
            if status == 200:
                _save_bytes(docs_path, body)
                meta["etag"] = resp_headers.get("etag", meta.get("etag"))
                meta["lastModified"] = resp_headers.get("last-modified", meta.get("lastModified"))
                meta["fetchedAt"] = int(time.time())
                meta["checkedAt"] = meta["fetchedAt"]
                meta["docsUrl"] = docs_url
                meta["docsRel"] = docs_rel
                _write_json(meta_path, meta)
                return docs_path, cached_manifest or {}

            # If the update check fails, fall back to cached data instead of failing the whole query.
            if cached_manifest is not None and docs_path.exists():
                print(f"warning: update check failed ({status}); using cached corpus", file=sys.stderr)
                meta["checkedAt"] = int(time.time())
                _write_json(meta_path, meta)
                return docs_path, cached_manifest

    manifest_url = f"{base}/ai/manifest.json"
    manifest: Dict[str, Any]
    if check_updates or refresh or cached_manifest is None:
        status, _headers, body = _http_get(manifest_url, timeout_s=30)
        if status != 200:
            raise SystemExit(f"Failed to fetch manifest ({status}): {manifest_url}")
        _save_bytes(manifest_path, body)
        manifest = json.loads(body.decode("utf-8"))
        meta["manifestGeneratedAt"] = manifest.get("generatedAt")
        meta["manifestDocCount"] = manifest.get("docCount")
        meta["manifestUrl"] = manifest_url
    else:
        manifest = cached_manifest

    docs_rel = manifest.get("docsJsonlPath") or docs_rel or "/ai/docs.jsonl"
    if not str(docs_rel).startswith("/"):
        docs_rel = "/" + str(docs_rel)
    docs_url = f"{base}{docs_rel}"
    meta["docsUrl"] = docs_url
    meta["docsRel"] = docs_rel

    if not refresh and docs_path.exists():
        etag = meta.get("etag")
        if etag:
            status2, headers2, body2 = _http_get(
                docs_url,
                headers={"If-None-Match": etag},
                timeout_s=60,
            )
            if status2 == 304:
                meta["checkedAt"] = int(time.time())
                _write_json(meta_path, meta)
                return docs_path, manifest
            if status2 == 200:
                _save_bytes(docs_path, body2)
                meta["etag"] = headers2.get("etag", etag)
                meta["lastModified"] = headers2.get("last-modified", meta.get("lastModified"))
                meta["fetchedAt"] = int(time.time())
                meta["checkedAt"] = meta["fetchedAt"]
                _write_json(meta_path, meta)
                return docs_path, manifest
            raise SystemExit(f"Failed to refresh corpus ({status2}): {docs_url}")

        # No etag: keep cached unless forced.
        return docs_path, manifest

    status3, headers3, body3 = _http_get(docs_url, timeout_s=120)
    if status3 != 200:
        raise SystemExit(f"Failed to fetch corpus ({status3}): {docs_url}")
    _save_bytes(docs_path, body3)
    meta["etag"] = headers3.get("etag")
    meta["lastModified"] = headers3.get("last-modified")
    meta["fetchedAt"] = int(time.time())
    meta["checkedAt"] = meta["fetchedAt"]
    _write_json(meta_path, meta)
    return docs_path, manifest


def _cmd_search(args: argparse.Namespace) -> int:
    base = _normalize_base(args.base)
    cache_dir = pathlib.Path(args.cache_dir) if args.cache_dir else _default_cache_dir()

    docs_path, _manifest = _fetch_corpus(
        base=base,
        cache_dir=cache_dir,
        refresh=args.refresh,
        offline=args.offline,
        check_updates=args.check_updates,
        auto_update=args.auto_update,
    )

    tokens = _tokenize(args.query)
    if not tokens:
        print("Empty query.")
        return 2

    hits: List[SearchHit] = []
    for record in _iter_jsonl(docs_path):
        score, snippet = _score_record(record, tokens)
        if score <= 0:
            continue
        hits.append(
            SearchHit(
                score=score,
                title=record.get("title") or "",
                url=record.get("url") or "",
                route=record.get("route") or "",
                snippet=snippet,
            )
        )

    hits.sort(key=lambda h: h.score, reverse=True)
    hits = hits[: args.max_results]

    if args.format == "json":
        print(
            json.dumps(
                [h.__dict__ for h in hits],
                indent=2,
            )
        )
        return 0

    for i, h in enumerate(hits, 1):
        print(f"{i}. {h.title}")
        print(f"   url: {h.url}")
        print(f"   route: {h.route}")
        print(f"   score: {h.score}")
        if h.snippet:
            print(f"   snippet: {h.snippet}")
    return 0


def _cmd_get(args: argparse.Namespace) -> int:
    base = _normalize_base(args.base)
    cache_dir = pathlib.Path(args.cache_dir) if args.cache_dir else _default_cache_dir()

    docs_path, _manifest = _fetch_corpus(
        base=base,
        cache_dir=cache_dir,
        refresh=args.refresh,
        offline=args.offline,
        check_updates=args.check_updates,
        auto_update=args.auto_update,
    )

    target_route = args.route.strip()
    if not target_route.startswith("/"):
        target_route = "/" + target_route

    for record in _iter_jsonl(docs_path):
        if (record.get("route") or "") == target_route:
            if args.format == "json":
                print(json.dumps(record, indent=2))
            else:
                print(record.get("text") or "")
            return 0

    print(f"Not found: {target_route}")
    return 1


def _cmd_cleanup(args: argparse.Namespace) -> int:
    base = _normalize_base(args.base)
    cache_dir = pathlib.Path(args.cache_dir) if args.cache_dir else _default_cache_dir()
    base_key = _sha256_hex(base)[:12]
    root = cache_dir / base_key
    if root.exists():
        for p in sorted(root.rglob("*"), reverse=True):
            if p.is_file():
                p.unlink()
            elif p.is_dir():
                try:
                    p.rmdir()
                except OSError:
                    pass
        try:
            root.rmdir()
        except OSError:
            pass
        print(f"Removed cache: {root}")
    else:
        print(f"No cache found: {root}")
    return 0


def _cmd_status(args: argparse.Namespace) -> int:
    base = _normalize_base(args.base)
    cache_dir = pathlib.Path(args.cache_dir) if args.cache_dir else _default_cache_dir()
    base_key = _sha256_hex(base)[:12]
    root = cache_dir / base_key
    manifest_path = root / "manifest.json"
    docs_path = root / "docs.jsonl"
    meta_path = root / "meta.json"

    meta = _read_json(meta_path) or {}
    manifest = _read_json(manifest_path) or {}

    def fmt_age(ts: Optional[int]) -> str:
        if not ts:
            return "unknown"
        age = int(time.time()) - int(ts)
        if age < 60:
            return f"{age}s"
        if age < 3600:
            return f"{age//60}m"
        if age < 86400:
            return f"{age//3600}h"
        return f"{age//86400}d"

    exists = root.exists() and docs_path.exists() and manifest_path.exists()
    print(f"base: {base}")
    print(f"cacheDir: {root}")
    print(f"cached: {exists}")
    if exists:
        print(f"etag: {meta.get('etag') or ''}")
        print(f"fetchedAt: {meta.get('fetchedAt') or ''} (age {fmt_age(meta.get('fetchedAt'))})")
        if meta.get("checkedAt"):
            print(f"checkedAt: {meta.get('checkedAt')} (age {fmt_age(meta.get('checkedAt'))})")
        if manifest.get("generatedAt"):
            print(f"manifest.generatedAt: {manifest.get('generatedAt')}")
        if manifest.get("docCount") is not None:
            print(f"manifest.docCount: {manifest.get('docCount')}")

    if args.check_updates:
        # Touch the network once and update cache if needed.
        _fetch_corpus(
            base=base,
            cache_dir=cache_dir,
            refresh=args.refresh,
            offline=False,
            check_updates=True,
            auto_update=False,
        )
        print("updateCheck: done")
    return 0


def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(
        prog="yearn_docs_query",
        description="Fetch and query Yearn hosted docs AI corpus (docs.jsonl) with local caching.",
    )
    parser.add_argument(
        "--base",
        default=os.environ.get("BASE", "https://docs.yearn.fi"),
        help="Docs site origin (e.g. https://docs.yearn.fi or a Vercel preview). Defaults to https://docs.yearn.fi (or BASE env var if set).",
    )
    parser.add_argument(
        "--cache-dir",
        default="",
        help="Override cache directory (default: XDG cache or ~/.cache/yearn-docs-site-query).",
    )
    parser.add_argument(
        "--offline",
        action="store_true",
        help="Do not make network requests; require cached files to exist.",
    )
    parser.add_argument(
        "--refresh",
        action="store_true",
        help="Force refresh of cached corpus (ignore existing cache / etag).",
    )
    parser.add_argument(
        "--check-updates",
        action="store_true",
        help="Revalidate cached corpus against the remote (may download if changed).",
    )
    parser.add_argument(
        "--auto-update",
        action="store_true",
        default=True,
        help="Check remote docs.jsonl via conditional request and download only if changed (default: on).",
    )
    parser.add_argument(
        "--no-auto-update",
        dest="auto_update",
        action="store_false",
        help="Do not check the remote; use cached corpus if present (unless --refresh/--check-updates).",
    )

    sub = parser.add_subparsers(dest="cmd", required=True)

    p_search = sub.add_parser("search", help="Search the corpus and print best matches.")
    p_search.add_argument("query", help="Search query.")
    p_search.add_argument("--max-results", type=int, default=8)
    p_search.add_argument("--format", choices=["text", "json"], default="text")
    p_search.set_defaults(func=_cmd_search)

    p_get = sub.add_parser("get", help="Get a page by route and print its text (or full JSON).")
    p_get.add_argument("route", help="Route path, e.g. /developers/security/multisig")
    p_get.add_argument("--format", choices=["text", "json"], default="text")
    p_get.set_defaults(func=_cmd_get)

    p_cleanup = sub.add_parser("cleanup", help="Delete cached corpus for this BASE.")
    p_cleanup.set_defaults(func=_cmd_cleanup)

    p_status = sub.add_parser("status", help="Show cache status; optionally check for updates.")
    p_status.set_defaults(func=_cmd_status)

    args = parser.parse_args(argv)
    # If the user explicitly passed an empty --base (common shell one-liner footgun),
    # fall back to the BASE env var.
    if not (args.base or "").strip():
        args.base = os.environ.get("BASE", "https://docs.yearn.fi")

    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
