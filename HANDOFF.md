# Handoff — Wale "Overthink" treatment (for Claude Code)

This is a Next.js 14 (App Router, TypeScript) app that renders a vertical **9:16** music-video treatment. Every image is a **drag-and-drop slot** identified by a stable `id`.

## What you're getting
- `app/page.tsx` — the 10 slides, in order. Each image is `<Frame id="…" />` which renders an `<ImageSlot>`.
- `components/ImageSlot.tsx` — drag-drop + reposition (double-click → drag to pan, scroll to zoom) + localStorage persistence. Falls back to a bundled `src` when no user drop exists.
- `app/globals.css` — all styling; type scales with each slide via CSS container units (`cqw`).
- `public/gifs/` — one media file per slot. **`/gifs/<id>.gif`** for every slot except `rs_b1_venue` → `.webp`. See `public/gifs/manifest.json`.

## Which GIF goes where
`public/gifs/manifest.json` is the source of truth: it maps every slot `id` → `file` → `slide` → `caption`. The 25 media files are named **exactly** by slot id, so they drop into `public/gifs/` with no renaming.

`Frame` (in `app/page.tsx`) derives each slot's media automatically:
```ts
const src = id === "rs_b1_venue" ? "/gifs/rs_b1_venue.webp" : `/gifs/${id}.gif`;
```
So adding a file named `<id>.gif` to `public/gifs/` is all it takes for that slot to show it.

## Run
```bash
npm install
npm run dev   # http://localhost:3000
```

## Notes for further work
- The GIFs are large (≈30–60 MB each, ~460 MB total). For production, transcode to MP4/WebM (`<video autoplay muted loop playsinline>`) or compress; the slot ids/layout stay the same.
- A user drop overrides the bundled file and is saved to `localStorage` under `overthink-slot:<id>`. "Remove" reverts to the bundled `/gifs/<id>` file.
- Slide order, captions, and copy live inline in `app/page.tsx`. Editing text there is safe and isolated per slide.
