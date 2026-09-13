#!/usr/bin/env python3
"""Přepíše absolutní odkazy https://ongy.cz/<cesta>/ na relativní, pokud cílová stránka existuje v dist/.
Odkazy na dosud nepostavené stránky nechá na živém webu."""
import re, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist" if (ROOT / "dist").exists() else ROOT
pat = re.compile(r'(<a\b[^>]*?)href="https://ongy\.cz/([^"#]*?)/?(#[^"]*)?"')
changed = 0
for f in DIST.rglob("*.html"):
    if "build" in f.relative_to(DIST).parts or ".git" in f.relative_to(DIST).parts: continue
    depth = len(f.relative_to(DIST).parts) - 1
    r = "../" * depth
    def sub(m):
        global changed
        pre, path, frag = m.group(1), m.group(2), m.group(3) or ""
        if path == "":
            target = f"{r}index.html" if depth else "index.html"
        elif (DIST / path / "index.html").exists():
            target = f"{r}{path}/"
        else:
            return m.group(0)
        changed += 1
        return f'{pre}href="{target}{frag}"'
    s = f.read_text(encoding="utf-8"); n = pat.sub(sub, s)
    if n != s: f.write_text(n, encoding="utf-8")
print(f"relink: {changed} odkazů přepsáno na relativní")
