# Hidden Trails · 隐山小径 — Zhangjiajie Landing Page

A single-page React landing site for a private, small-group Zhangjiajie tour, built with
React + Tailwind CSS + Framer Motion. Bilingual (English / 中文) via the toggle in the navbar.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Deploy the `dist/` output to any static host (Vercel, Netlify, etc.) — or connect this
repository directly to Vercel/Netlify for automatic builds on every push to `main`.

## Structure

- `src/HiddenTrailsLanding.jsx` — the landing page component (all sections)
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind entry point

## Photography

Hero and journey photography are real, publicly licensed Zhangjiajie photographs from
Wikimedia Commons (CC BY 2.0 / CC BY-SA 2.5) — see the on-image credit captions and
`PHOTOS` object in `HiddenTrailsLanding.jsx` for sources. Replace with brand photography
before a permanent public launch.
