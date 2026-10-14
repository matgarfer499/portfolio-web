---
name: portfolio-review
description: Use when reviewing, QA-ing, auditing or "passing a review over" a phase, branch or diff of portfolio v4 (PR Board) — before tagging a phase, before pushing, after an implementation plan finishes, or when asked "revísalo", "haz QA", "is this ready?".
---

# Portfolio review + QA

Two halves that need each other: read the code against the project's written rules, then use the
built site until every touched screen has been seen at every size, theme and language. Fix only
when the task says so (the v4 loop does: fix every confirmed finding, rerun until clean).

## 0. Scope

- Base = previous phase tag: `git describe --tags --abbrev=0 --match 'v4-p*' || echo v3`.
  `git log --oneline BASE..HEAD`, `git diff --stat BASE...HEAD`.
- Read only what the range touches, in this order: `CLAUDE.md`, `AGENTS.md` (Next 16: check
  `node_modules/next/dist/docs/` before judging a Next API), `docs/architecture.md`, `DESIGN.md`,
  the phase spec + plan in `docs/redesign/v4/{specs,plans}/` — the plan's **Review Focus** lists
  the failure modes its tests don't cover: check each on purpose.

## 1. Gates

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
bash .claude/skills/portfolio-review/scripts/pattern-scan.sh          # base auto-detected
pnpm content:pending                                                   # from P2: what the owner must fill
```

Redirect long output to a file and read its tail. A red gate is a Critical finding by itself.
Every pattern-scan hit is a lead: open the line and decide. With the production server running,
`node scripts/bundle-size.mjs` records the home's first-load JS (owner budget 130 kB gz; the
Next 16 + React 19 floor is ≈142 kB gz, so report the number and the app's share).

## 2. Code review

Read every changed file against `references/checklist.md` (read it once per review). The areas
most likely to bite this project: content hidden before hydration, motion without a reduced-motion
path, a feature importing another feature instead of the trophy bus, untranslated strings,
invented career facts instead of `pending()`, env reads outside `src/server`, hex values, layout
shift from images/fonts.

## 3. Simplification pass

Dispatch the `code-simplifier:code-simplifier` agent on the changed files in **report-only** mode
and merge its output with your own pass (`references/checklist.md` § Simplification). Each
simplification is a finding with the concrete smaller version.

## 4. QA

Follow `references/qa.md`: production build, the QA matrix (9 widths × light/dark × en/es) with
screenshots you actually look at, keyboard walk, reduced motion, no-JS, e2e (+ axe). Run the
`web-design-guidelines` skill on the changed UI files; DESIGN.md wins on visual values.

## 5. Report

Write it to `docs/redesign/v4/reviews/pN.md` (Spanish prose for the owner, findings in English
`file:line` form):

```
# Review + QA: v4 PN (<base>..<head>)
## Verdict — Ready / Ready after fixes / Not ready — one sentence
## Gates — format · lint · typecheck · test · build · pattern-scan · first-load JS
## Findings — ### Critical / ### Important / ### Minor: path:line — what — failure — fix
## Simplification — path:line — current → simpler (why equivalent)
## QA matrix — screen × width × theme × locale: ✓ / ✗ / not reached (why), screenshot paths
## Not covered — what could not be checked, and why (→ verify/pN.md)
```

Severity is what a visitor gets if it ships: Critical = broken page, content invisible, secret
leak, a11y blocker, red gate; Important = wrong behaviour in a reachable state, rule violation that
will spread, missing test for logic; Minor = polish.

## Fixing

Critical and Important first. Logic fixes get a test that fails before and passes after; UI fixes
re-run the QA step that showed the bug and replace its screenshot. Gates after the pass, one commit
per fix (`fix(<scope>): …`), then rerun the review until nothing confirmed remains.
