## Exploration: redesign-portfolio

### Current State

The project is a **single-page static portfolio** built with Astro 4.3.2 and TypeScript 5.3.3 (strict mode). It uses a JSON-driven content architecture (`cv.json` / `cv_english.json`) following a JSONResume-like schema. There is no CSS framework — all styling is vanilla CSS scoped within `.astro` component `<style>` blocks.

**Architecture summary:**
- **Routing**: Single page (`src/pages/index.astro`) — no multi-page routing exists. It's an MPA that happens to be one page.
- **Layout**: `Layout.astro` wraps everything with basic HTML shell, global CSS, and meta tags.
- **Sections**: 6 components under `src/components/sections/` — Hero, About, Projects, Education, Skills, Experience. Only 5 are rendered in `index.astro`; **Experience is completely unused**.
- **Content**: JSON files (`cv.json`, `cv_english.json`) imported via `@cv` path alias. No mechanism to switch between languages.
- **Keyboard palette**: `KeyboardManager.astro` uses `hotkeypad` library for a Cmd+K command palette (print + social links).
- **Icons**: 28 SVG/Astro icon files in `src/icons/` — includes Sol/Luna (theme toggle) that have no functional logic.
- **Public assets**: Profile photo (`117424457.jpg`), favicon, CV PDF, and 4 project images in `public/projects/`.

**Critical issues found:**

1. **Placeholder content**: `cv.json` uses midudev's template data (work history at "midudev", "Adevinta", "Hubii" — none are the user's real experience). The English file (`cv_english.json`) is even more obviously midudev's data ("Miguel Angel Duran").
2. **Identity mismatch**: `label` says "Backend Developer con mas de 2 anos de experiencia" — does not reflect Blockchain/DevOps expertise.
3. **Skills don't match target identity**: Only generic web skills (HTML, CSS, JS, React, Node, MySQL, Tailwind, Next.js, Swift, Kotlin, Flutter). Zero DevOps (Docker, Kubernetes, CI/CD, Terraform, AWS) or Blockchain (Solidity, Web3, Smart Contracts) skills.
4. **Experience section exists but is NOT rendered** in `index.astro` — invisible to users.
5. **Project image paths are wrong**: `/public/projects/...` should be `/projects/...` (Astro serves `public/` at root).
6. **Theme toggle is dead**: Sol/Luna icons exist as `<a href="Sol">` and `<a href="Luna">` — they navigate to non-existent routes, not toggle anything.
7. **No responsive navigation**: No nav bar, no mobile menu. The keyboard palette is the only navigation aid.
8. **CSS is scattered**: Each component has its own `<style>` block. No design tokens, no CSS custom properties, no shared variables. Duplicated patterns (e.g., `@media (width <= 700px)` appears in 5+ components).
9. **Types incomplete**: `cv.d.ts` has `Projects` interface missing `images` field (used in Projects.astro but not typed). `Highlight` uses `Array<String>` (capital S — should be `string`).
10. **No View Transitions configured**: `astro.config.mjs` is empty — no `experimental: { clientPrerender: true }` or View Transitions setup.
11. **No test infrastructure**: No testing framework configured.
12. **Generic AI design patterns**: Monospace font everywhere, 1px gray borders, basic `#eee` backgrounds, `transition: all 0.3s ease`, generic card borders, no visual hierarchy, no design system.

### Affected Areas

- `astro.config.mjs` — needs View Transitions configuration
- `src/layouts/Layout.astro` — needs design tokens, theme system, font imports, View Transitions markup
- `src/pages/index.astro` — needs Experience section added, navigation, View Transitions annotations
- `src/components/Section.astro` — needs redesign with design tokens
- `src/components/sections/Hero.astro` — needs theme toggle logic, identity update, premium redesign
- `src/components/sections/About.astro` — minimal, needs visual treatment
- `src/components/sections/Projects.astro` — needs image path fixes, card redesign, scroll animations
- `src/components/sections/Education.astro` — needs timeline-style redesign
- `src/components/sections/Skills.astro` — needs DevOps/Blockchain skills, categorized display
- `src/components/sections/Experience.astro` — needs to be added to index.astro, timeline redesign
- `src/components/KeyboardManager.astro` — needs theme toggle integration
- `cv.json` — needs real Blockchain/DevOps content
- `cv_english.json` — needs real English content
- `src/cv.d.ts` — needs `images` field on Projects, type fixes
- `src/types.d.ts` — needs proper type definitions
- `public/` — needs proper project images, potentially new assets
- `src/icons/` — needs DevOps/Blockchain icons (Docker, Kubernetes, Solidity, etc.)

### Approaches

#### Approach 1: "Terminal/Cyberpunk Professional"

**Visual language**: Refined terminal aesthetic with cryptographic undertones. Dark-first design with deep charcoal (`#0a0a0f`), subtle matrix-green accent (`#00ff88` desaturated to `#34d399`), monospace headers paired with a clean sans-serif body. Network topology visualizations as background textures. Subtle scan-line or grid patterns.

**Typography**: `JetBrains Mono` or `Fira Code` for display/headings (terminal DNA), `Inter` or `Geist` for body text (readability). Tabular nums for data.

**Color palette**:
- Background: `#0a0a0f` (near-black with blue tint)
- Surface: `#12121a` (elevated cards)
- Border: `#1e1e2e` (subtle hairlines)
- Text primary: `#e4e4e7`
- Text secondary: `#71717a`
- Accent: `#34d399` (emerald — blockchain/crypto association)
- Accent glow: `rgba(52, 211, 153, 0.15)` (subtle glow effects)

**Motion language**: Typewriter-style text reveals, terminal cursor blink on hero, smooth section transitions via View Transitions API, staggered card entries with spring physics, hover states with subtle glow (not color fills).

**Component design**: Cards with double-bezel nested architecture (outer shell + inner core), monospace data labels, terminal-style code blocks for project descriptions, network-graph SVG backgrounds at low opacity.

**Pros**:
- Strongly communicates blockchain/DevOps identity (terminal = infrastructure)
- Highly differentiated from generic portfolios
- Natural fit for showing code, APIs, infrastructure work
- View Transitions API works beautifully with dark-to-dark page transitions
- Premium feel without being flashy

**Cons**:
- Risk of looking "too hacker" if overdone — needs restraint
- Terminal aesthetic can feel cold; needs warmth through typography and spacing
- Requires careful balance: professional, not gimmicky

**Effort**: High — full design system, new fonts, custom CSS architecture, View Transitions, theme system, content rewrite

#### Approach 2: "Data-Driven Minimalist"

**Visual language**: Clean, data-forward design inspired by blockchain explorers and monitoring dashboards. Light-first with dark mode option. Lots of whitespace, structured grids, data visualization motifs (subtle charts, node graphs as decorative elements). Think Vercel/Linear aesthetic applied to a portfolio.

**Typography**: `Geist` or `Plus Jakarta Sans` for everything — clean, modern, tech-forward. Monospace only for code snippets and data values.

**Color palette**:
- Background: `#fafafa` (warm white)
- Surface: `#ffffff`
- Border: `#e4e4e7`
- Text primary: `#09090b`
- Text secondary: `#52525b`
- Accent: `#6366f1` (indigo — professional, tech)
- Dark mode: inverted with `#09090b` background

**Motion language**: Subtle fade-up on scroll, View Transitions for any navigation, hover states with border illumination (spotlight effect), smooth theme toggle with CSS transition.

**Component design**: Asymmetric bento grid for projects, timeline with connecting lines for experience/education, skill pills grouped by category (DevOps, Blockchain, Languages, Tools), data-dense but breathable cards.

**Pros**:
- Universally professional — works for any senior developer
- Easier to execute well (less risk of over-styling)
- Light mode is more accessible by default
- Linear/Vercel aesthetic is proven premium
- View Transitions API integrates cleanly

**Cons**:
- Less differentiated — many portfolios use this aesthetic
- Doesn't specifically signal "blockchain" identity visually
- May feel too safe/generic for someone wanting to "stand out"

**Effort**: Medium-High — design system, fonts, View Transitions, theme system, content rewrite, but fewer custom visual elements

#### Approach 3: "Blockchain Network Visualizer" (Hybrid)

**Visual language**: Dark-first with an interactive network topology as the hero background. Nodes and connections that subtly animate (CSS-only, no JS library). The network motif carries through as a design language — connected nodes for skills, pipeline visualization for experience, block-chain-style cards for projects.

**Typography**: `Space Grotesk` for headings (geometric, tech-forward), `IBM Plex Mono` for data/labels, `Inter` for body.

**Color palette**:
- Background: `#08080c` (deep space)
- Surface: `#101018`
- Border: `#1a1a28`
- Text primary: `#f0f0f5`
- Text secondary: `#6b6b80`
- Accent: `#818cf8` (indigo-violet — blockchain network feel)
- Secondary accent: `#34d399` (emerald — success/active states)

**Motion language**: Network nodes pulse gently (CSS animation), View Transitions between sections, staggered reveals, hover states that "activate" node connections, smooth theme toggle.

**Component design**: Cards styled as "blocks" with hash-like IDs, experience as a pipeline/chain, skills as connected nodes, projects as data cards with metrics.

**Pros**:
- Most visually distinctive — literally shows blockchain as a design language
- Tells the story through design, not just words
- Premium and memorable
- CSS-only network animation is feasible and performant

**Cons**:
- Highest risk of being "too much" — needs careful restraint
- Network animation requires careful CSS (or lightweight JS)
- May distract from content if overdone
- Most complex to implement well

**Effort**: High — custom network visualization, full design system, View Transitions, theme system, content rewrite

### Recommendation

**Approach 1 (Terminal/Cyberpunk Professional)** with elements of Approach 3.

Here's why: The user is a **Blockchain/DevOps developer**. The terminal aesthetic is the most authentic visual language for this identity — it screams "I work with infrastructure, servers, smart contracts, and command lines." It's not gimmicky if executed with restraint: monospace for headings only, generous whitespace, subtle green accent (not full matrix), and professional card layouts.

The network topology from Approach 3 can be used as a **subtle hero background** (CSS-only, low opacity) to add the blockchain visual language without overwhelming the design.

**Key execution principles:**
1. **Dark-first, light-mode capable** — terminal aesthetic is inherently dark; light mode should feel like a "documentation site" (clean, readable)
2. **Design tokens via CSS custom properties** — single source of truth for colors, spacing, typography
3. **View Transitions API** — configure in `astro.config.mjs`, add `transition:animate` to Layout, use `transition:name()` for section transitions
4. **Theme toggle with localStorage + prefers-color-scheme** — proper implementation, not dead links
5. **Content rewrite is mandatory** — the JSON data must reflect real Blockchain/DevOps experience
6. **Experience section must be rendered** — it's the most important section for a senior developer
7. **Asymmetric project grid** — break the equal-card pattern, use bento-style layout
8. **No CSS framework** — keep vanilla CSS but organize it properly with design tokens

### Risks

1. **Content is the biggest risk**: The entire `cv.json` is placeholder data. Without real Blockchain/DevOps experience, projects, and skills, the redesign is purely cosmetic. The user MUST provide real content.
2. **Over-styling**: Terminal/cyberpunk aesthetic can easily become cartoonish. Must maintain professional restraint — this is a senior developer portfolio, not a gaming site.
3. **View Transitions on a single page**: Since this is a single-page portfolio (no multi-page routing), View Transitions API benefits are limited. However, Astro's View Transitions also support **scroll-driven transitions** between sections, which can still add polish.
4. **Performance**: CSS-only network animations must be GPU-safe (transform + opacity only). No `will-change` abuse, no blur on scrolling content.
5. **Accessibility**: Dark-first design needs sufficient contrast ratios. Terminal fonts can be harder to read at small sizes — body text must use a readable sans-serif.
6. **Scope creep**: This is a full redesign touching every file. Must be broken into focused tasks: design system first, then components, then View Transitions, then content.
7. **No test infrastructure**: Any changes to the JSON schema or component props risk breaking silently. Consider adding at least `astro check` as a gate.

### Ready for Proposal

**Yes** — this exploration is complete and actionable. The orchestrator should:

1. Present the three approaches to the user and confirm the recommended direction (Terminal/Cyberpunk Professional with subtle blockchain network motifs)
2. Confirm that the user will provide real Blockchain/DevOps content (experience, skills, projects) — this is a hard dependency
3. Once confirmed, proceed to the **propose** phase to create a structured change plan with scoped tasks
4. The change should be broken into these phases:
   - Phase 1: Design system (CSS tokens, fonts, theme toggle, Layout overhaul)
   - Phase 2: Component redesign (Hero, About, Experience, Projects, Education, Skills)
   - Phase 3: View Transitions API integration
   - Phase 4: Content migration (real Blockchain/DevOps data into cv.json)
   - Phase 5: Polish (responsive nav, accessibility, performance, icons)
