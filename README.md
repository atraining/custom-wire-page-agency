# BRUTAL. — A Brutalist Agency Site Built with Wire

**Live site:** https://atraining.github.io/custom-wire-page-agency/

A creative agency landing page built entirely with [Wire](https://wire.wise-relations.com/), the content site CLI. This project stress-tests Wire's component system by pushing every built-in component into a brutalist visual direction — using only CSS overrides and zero custom HTML templates.

## What This Demonstrates

- **10 Wire components** styled to their limit: cards, stats, steps, split, badges, testimonial, faq, alert, banner, cta
- **0 lint errors, 0 warnings** across 12 pages with 91 automated quality checks
- **Brutalist aesthetic** achieved through ~250 lines of CSS overrides on top of Wire's default `wire.css`
- **Mondrian color system** (red, blue, yellow, black) applied consistently to every component
- **Full SEO compliance** — proper titles, descriptions, heading hierarchy, internal/external links, JSON-LD, sitemap, RSS

## Pages

| Page | Type | Components Used |
|------|------|----------------|
| Homepage | Landing | cta, badges, stats, cards ×2, steps, split + alert, testimonial ×2, faq |
| Work | Landing | banner, cards, stats, cta |
| Services | Landing | steps, cards, testimonial, stats, cta |
| About | Landing | stats, split, badges, cards, testimonial, cta |
| Contact | Landing | split + alert, faq, stats, cta |
| 4× Case Studies | Article | stats, badges, testimonial or alert, banner |
| Imprint, Privacy, Terms | Page | Standard content pages |

## Project Structure

```
docs/                    # Markdown source (Wire content)
  index.md               # Homepage
  work/                  # Case studies
  services/              # Services landing
  about/                 # About landing
  contact/               # Contact landing
  assets/css/
    brutal.css           # Component overrides (~200 lines)
    brutal-visuals.css   # Decorative SVG marks and visual accents (~150 lines)
wire.yml                 # Wire configuration
site/                    # Built output (on gh-pages branch)
```

## How to Build

Requires [Wire](https://wire.wise-relations.com/guides/getting-started/) installed:

```bash
python -m wire.build
python -m wire.build --serve --port 8080
```

## Visual QA

Requires Playwright:

```bash
pip install playwright && python -m playwright install chromium
python -m wire.qa --site site --screenshots
```

## Inspiration

- Original template reference: [uupm.cc/demo/creative-agency](https://www.uupm.cc/demo/creative-agency)
- Brutalist design philosophy: [brutalistwebsites.com](https://brutalistwebsites.com/)
- Wire docs: [wire.wise-relations.com](https://wire.wise-relations.com/)
