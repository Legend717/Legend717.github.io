import re
import json
from pathlib import Path

try:
    import markdown
except Exception:
    raise SystemExit("Missing dependency: install with `python -m pip install markdown`.")

def parse_front_matter(text: str):
    """Return (front_matter_dict, rest_text). Only supports list fields in [a, b] form."""
    m = re.match(r"^---\s*\n([\s\S]*?)\n---\s*\n?", text)
    if not m:
        return {}, text
    fm_text = m.group(1)

    def parse_list(name: str):
        p = re.search(rf"^{name}\s*:\s*\[(.*?)\]", fm_text, re.MULTILINE)
        if not p:
            return None
        raw = p.group(1)
        items = [s.strip() for s in raw.split(',') if s.strip()]
        return items or None

    fm = {
        'tags': parse_list('tags'),
        'tags_zh': parse_list('tags_zh'),
        'tags_en': parse_list('tags_en'),
    }
    rest = text[m.end():]
    return fm, rest

def convert_md_to_html(md_path: Path) -> Path:
    raw = md_path.read_text(encoding="utf-8")
    fm, body = parse_front_matter(raw)
    html = markdown.markdown(body, extensions=["fenced_code", "tables"])
    prefix = ""
    # Embed front matter as a non-rendered JSON block for clients to parse
    if any(v for v in fm.values() if v):
        prefix = f'<script type="application/json" data-front-matter>' \
                 f'{json.dumps({k: v for k, v in fm.items() if v}, ensure_ascii=False)}' \
                 f'</script>\n'
    out_text = prefix + html
    out_path = md_path.with_suffix(".html")
    out_path.write_text(out_text, encoding="utf-8")
    return out_path

def main():
    blog_dir = Path("blog")
    if not blog_dir.exists():
        raise SystemExit("`blog/` directory not found.")
    md_files = list(blog_dir.glob("*.md")) + list(blog_dir.glob("*.en.md"))
    if not md_files:
        print("No markdown files found in blog/.")
        return
    generated = []
    for md in md_files:
        out = convert_md_to_html(md)
        generated.append(out)
    print(f"Generated {len(generated)} HTML files:")
    for p in generated:
        print(f" - {p}")

if __name__ == "__main__":
    main()