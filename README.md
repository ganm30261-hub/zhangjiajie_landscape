# Quartz Peaks · 石峰之旅 — Zhangjiajie Landing Page

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

- `src/QuartzPeaksLanding.jsx` — the landing page component (all sections)
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind entry point

## Photography

Hero and journey photography are real, publicly licensed photographs of the actual
itinerary stops (Zhangjiajie National Forest Park, Tianmen Mountain, Wulingyuan /
Tianzi Mountain, the Grand Canyon Glass Bridge, Huanglong Cave), sourced from Wikimedia
Commons (CC BY 2.0 / CC BY-SA / public domain) — see the on-image credit captions and
`PHOTOS` object in `QuartzPeaksLanding.jsx` for sources. Replace with brand photography
before a permanent public launch.
