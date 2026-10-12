# Karm Patel Portfolio

A premium dark-editorial portfolio for Karm Patel, focused on full-stack mobile engineering: Flutter product experiences, REST API integration, and .NET backend systems.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP + Lenis
- Motion
- React Three Fiber + Drei + Three.js
- Lucide icons

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production build

```bash
npm run build
```

The build writes a static site to `out/` for GitHub Pages. Preview it locally with a static file server, for example `npx serve out`.

## Contact form

The contact form uses Formspree. Create a Formspree form and set its form ID in `.env.local`:

```bash
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id
```

Copy `.env.example` as a starting point. Until the ID is configured, the mailto link remains available as a fallback.

## Scripts

- `npm run dev` – local development server
- `npm run build` – generate the static production site in `out/`
- `npm run lint` – ESLint validation
- `npm run typecheck` – TypeScript validation

## Notes

- This portfolio is designed for static export and GitHub Pages deployment.
- The GitHub Actions workflow runs lint, typecheck, and the static production build.
- Content is intentionally structured for future case studies and portfolio expansion.
- Add approved project preview images before launch.
- Resume downloads are intentionally omitted.
