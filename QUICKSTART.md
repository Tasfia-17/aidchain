# Quick Start Guide

## Run Locally

```bash
cd aidchain
npm install
npm run dev
```

Open: http://localhost:5173

## Build for Production

```bash
npm run build
```

Output: `dist/` folder

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy (auto-detects Vite)

## Deploy to Netlify

1. Push to GitHub
2. New site from Git
3. Build: `npm run build`
4. Publish: `dist`

## Project Structure

```
/                    → Landing page
/platform            → Technical overview
/how-it-works        → Process explanation
/dashboard           → Interactive demo
```

## Dashboard Demo Flow

1. **Donor tab** → Fill form → Deploy escrow
2. **Field Worker tab** → Upload evidence → Scan biometrics
3. **Monitor tab** → Approve milestone → Funds release
4. Watch **Activity Log** for real-time updates

## Key Files

- `src/pages/Landing.jsx` — Home page
- `src/pages/Dashboard.jsx` — Main demo
- `src/index.css` — Monad design tokens
- `README.md` — Project overview

## Design Tokens

```css
--color-ink: #000000
--color-paper-canvas: #f6f3f1
--color-off-black: #242424
--color-atmosphere-wash: #cfdaf5
--spacing-40: 40px
--radius-buttons: 100px
--radius-cards: 40px
```

## Fonts

- IBM Plex Mono (UI)
- Noto Serif (headings)
- Inter (body alternative)

## Status

✅ Build successful
✅ All pages working
✅ Design system implemented
✅ Ready for demo

---

**Need help?** Check ARCHITECTURE.md for technical details or DEMO_SCRIPT.md for presentation guide.
