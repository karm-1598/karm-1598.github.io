# karm-portfolio: master brief

PROJECT
A full redesign of Karm Patel's portfolio (Flutter Developer | .NET Backend Engineer) as an animated, scroll-driven 3D website. Discard the old visual design. Keep only: typed content in /data/portfolio.ts, the SEO/metadata work, and the Next.js 16 / React 19 / TypeScript / Tailwind v4 setup.

CORE CONCEPT: "THE DESCENT"
One glowing object (a data packet / crystal) falls through the page from top to bottom as the user scrolls. The 3D world is a fixed full-screen canvas behind the page. HTML sections scroll over it as glass panels. Scroll progress (0 to 1) drives the object's position along a curved path, the camera, lighting, and background color.
The world is divided into zones that match my real workflow, each aligned with a page section:
 1. Hero: the packet appears at the surface (the "idea"). Dark void, soft particles.
 2. Selected Work: Flutter UI layer. Floating phone-like panels and glass cards the packet passes between.
 3. Capabilities: REST API layer. Glowing nodes and lines the packet travels along.
 4. How I Build / Experience: .NET backend layer. Structured grid, server-rack-like geometry, data streams.
 5. Database layer: stacked translucent discs/cylinders the packet passes through.
 6. Contact: Release. The packet lands, bursts into light, calm ending.
All wording about me comes from /data/portfolio.ts. Never invent facts.

STACK
Next.js 16 App Router, React 19, TypeScript (no `any`), Tailwind v4, React Three Fiber + drei + three, GSAP + ScrollTrigger + @gsap/react, Lenis, Motion (motion/react), lucide-react.

ANIMATION OWNERSHIP
- Lenis: smooth scroll. GSAP ScrollTrigger: scroll progress and scroll-linked timelines. R3F: reads progress from one shared store (a ref or small zustand store, not React state, so no re-render per frame).
- Motion: component-level interactions (hover, menus, reveals, page transitions).
- Never animate the same element with two libraries.

21ST.DEV USAGE (via the 21st MCP tools)
- Always fetch real component code, not just metadata, before choosing one.
- 21st components are 2D. They must sit on top of the 3D canvas, so adapt them: transparent or glass backgrounds, no opaque full-page backgrounds, remove their own background effects when they clash with the 3D scene.
- Adapt every component to Tailwind v4, React 19, and my design tokens. Remove unused dependencies. Report what was installed and why.
- Propose the component and wait for my approval before installing.

DESIGN
Dark, cinematic, premium. One accent color with a secondary glow. One display font + one body font via next/font. Consistent radii, borders, and spacing so it looks like one site. Glass panels with subtle borders and blur. Grain overlay.

PERFORMANCE AND ACCESSIBILITY (non-negotiable)
- One Canvas only, fixed, pointer-events none, dynamically imported (ssr: false) with a lightweight CSS gradient fallback.
- Cap DPR (max 1.5 desktop, 1 mobile). Use instancing for particles. No heavy post-processing on mobile or low-power devices (detect via hardwareConcurrency, deviceMemory, and screen width).
- prefers-reduced-motion: disable the fall animation, show a static scene, keep content readable.
- Pause rendering when the tab is hidden. Dispose geometries and materials on unmount.
- Content must be fully readable and navigable without WebGL. Semantic landmarks, skip link, visible focus rings, AA contrast. Responsive from 360px.
- No custom cursor on touch devices.

RULES
- Never invent projects, metrics, companies, dates or links. Omit unavailable details and list what information is still needed.
- Run `npm run lint` and `npm run build` after every step and fix errors.
- Work in phases. At the end of each phase, summarize and STOP for my approval.
- Deployment target may be GitHub Pages (static export). Avoid server-only features unless I confirm Vercel.