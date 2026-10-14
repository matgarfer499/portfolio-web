# ADR 0001 — Portfolio as an explorable 3D game with a parallel fast layer

- **Status:** Superseded by 0004 (2026-10-14)
- **Date:** 2026-06
- **Scope:** Portfolio v3 (branch `v3`, full rebuild)

## Context

The goal of this portfolio is memorability: recruiters/HR first, then tech leads/CTOs, then
freelance clients, with the takeaway "this person delivers and clearly knows their craft." A
generic long-scroll site does not differentiate; the brief calls for something friki and fun that
visitors remember and that demonstrates engineering range on its own.

The chosen concept is a low-poly, cel-shaded 3D world explored with a keyboard-driven avatar, where
each zone maps to a portfolio section and walking into zones unlocks achievements (toast + sound).
This is built on WebGL via React Three Fiber, drei, and Rapier physics.

A WebGL-only experience carries real risks that directly conflict with the audience and the quality
bars:

- **SEO** — search crawlers do not run the game loop or read content rendered inside a `<canvas>`.
  A canvas-only site is effectively empty to indexers, which sinks the "be found" goal.
- **Accessibility** — a canvas is opaque to screen readers and assistive tech; keyboard-only and
  reduced-motion users cannot be served a game-first flow.
- **Mobile / low-power** — a 3D scene is heavy, awkward to drive without a keyboard, and hostile to
  a recruiter skimming on a phone.
- **Time-to-content** — recruiters often have seconds; forcing everyone through a 3D load before any
  content is visible loses them.

These constraints cannot be waived: the audience is dominated by people who will arrive via search,
on mobile, or in a hurry.

## Decision

Build the portfolio as a 3D game **and** ship a parallel fast layer that renders the same content as
plain, crawlable, keyboard-navigable HTML. Both layers read from **one content source**
(`src/content`, plain typed TS — no CMS, no Zod), so there is no divergence between what the game
shows and what crawlers and mobile users get.

```
         PRESS START  (instant, SEO content in the DOM, i18n)
        /                                         \
 [ Enter the game ]                        [ Fast version ]
   GAME layer (WebGL)                        FAST layer (SSG HTML)
   3D world, avatar, physics,                same content, no 3D,
   achievements, audio                       semantic, keyboard, indexable, mobile
        \________________________  ________________________/
                                 \/
              one typed TS content source (src/content)
```

Concretely:

- **PRESS START** (`src/app/[locale]/page.tsx`) is a server-rendered route. It localizes content and
  renders an entry screen with content already in the DOM — instant, indexable, no WebGL.
- **The game is client-only and code-split.** `HomeExperience` owns the `entered` toggle and mounts
  `GameExperience` via `next/dynamic({ ssr: false })` only after the user clicks Enter. three.js
  never touches the server, so PRESS START stays instant.
- **The fast layer** (`src/app/[locale]/fast/page.tsx`) is a server component rendering static,
  semantic, crawlable HTML of the same content. This is what mobile and crawlers are served.
- **Bilingual** via next-intl: EN default (no URL prefix) + ES (`/es`), `localePrefix: 'as-needed'`.
  UI chrome strings live in `src/messages/{en,es}.json`; domain content lives in `src/content`.

The two layers solve the WebGL risk by construction: the heavy, non-indexable experience is opt-in,
and a fully indexable/accessible/mobile path exists for everyone who can't or won't run it.

## Consequences

### Positive

- SEO, a11y, and mobile are not afterthoughts — the fast layer is a first-class, always-available
  render of the real content, so crawlers and assistive tech get semantic HTML.
- PRESS START is instant: content is in the DOM on first paint and WebGL only loads on demand.
- Single content source removes drift between game and fast layer; one edit updates both.
- The game delivers the memorability/differentiation the brief demands without compromising reach.
- Layered quality bars become tractable: SEO/a11y/best-practices targeted at the fast layer; 60fps +
  progressive loading targeted at the game.

### Negative / risks

- **Two render paths to maintain.** Mitigated by the shared typed content source, but UI and
  interaction still exist twice and both must stay correct.
- **Larger scope** than a single static site (physics, controls, achievements, audio, art pipeline).
  Mitigated by vertical-slice-first delivery with review at each phase boundary.
- **WebGL performance** remains a hard problem for the game layer; mitigated by code-splitting,
  `ssr: false`, and (later) asset optimization. The fast layer absorbs anyone the game can't serve.
- **Discoverability of the fast layer** must be deliberate — it has to be reachable and obviously
  offered from PRESS START, or hurried visitors get stuck in the game.
- Current 3D is **placeholder primitives**; final art, palette, and typography land later with
  Matías, so the game's visual payoff is not yet realized.

## Alternatives considered

- **Classic long-scroll site.** Lowest risk on SEO/a11y/mobile and fastest to build, but generic —
  it fails the primary goal of being memorable and showcasing range. Rejected as the _primary_
  experience; effectively survives as the fast layer.
- **Terminal / CLI metaphor.** Distinctive and cheap, friki-adjacent, but a narrow gimmick that is
  awkward for non-technical recruiters/HR (the top audience) and still needs an a11y/SEO fallback.
  Rejected.
- **WebGL-only game, no fast layer.** Maximum wow, but forfeits SEO, accessibility, and the mobile
  audience — unacceptable given who the visitors are. Rejected; the parallel fast layer exists
  specifically to avoid this.
