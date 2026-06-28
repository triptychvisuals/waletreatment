# Overthink — Music Video Treatment (Next.js)

A vertical (9:16) music-video treatment for Wale — "Overthink", with **drag-and-drop image slots**.

## Run it

```bash
cd nextjs-app
npm install
npm run dev
```

Open http://localhost:3000

## Using the slots

- **Drop** a photo or GIF onto any slot (or click it to browse). PNG / JPEG / WebP / AVIF / **animated GIF** are supported — GIFs keep animating.
- **Double-click** a filled slot to reposition: **drag** to move the image within the frame, **scroll** to zoom. Double-click again (or it auto-saves) when done.
- **Replace / Remove** buttons appear on a filled slot.
- Every drop is saved in the browser (localStorage), keyed by slot id, so it survives reloads. Clearing site data resets the slots.

## Structure

- `app/page.tsx` — the 10 treatment slides.
- `components/ImageSlot.tsx` — the drag-drop / reposition / persistence component.
- `app/globals.css` — all styling (type scales with each slide via CSS container units).

Fonts (Archivo + Space Mono) load from Google Fonts.
