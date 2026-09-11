# Hidden Trails · 隐山小径 — Zhangjiajie Landing Page

A single-page React landing site for a private, small-group Zhangjiajie tour, built with
React + Tailwind CSS + Framer Motion. Bilingual (English / Italiano) via the toggle in the
navbar — a single `lang` state selects the copy from the `content = { en, it }` object in
`HiddenTrailsLanding.jsx`, with a light fade transition on switch.

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

- `src/HiddenTrailsLanding.jsx` — the landing page component (all sections + bilingual content)
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind entry point

## Photography

Hero and journey imagery use Unsplash License photos (free for commercial use, no
attribution required) — see the `IMG_*` constants at the top of `HiddenTrailsLanding.jsx`
for the source URLs.
