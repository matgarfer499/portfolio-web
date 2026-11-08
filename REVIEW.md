# Review guide

What matters when reviewing this repo. Reviewers read this before reporting.

## What counts as a failure here

- A career fact, metric or date in `src/content/` that the owner did not confirm, or a project credited to Matías that someone else built.
- The contact form losing or exposing a message: the server action in `src/server/contact/` failing silently, leaking env values, or skipping validation.
- A broken layout at phone width (375 px) or on large screens, or a page a recruiter lands on (home, `/projects/[slug]`, `/cv`) failing to render.
- Anything referencing `photos/mylove.webp`, a runtime font request, or a visual ban from `DESIGN.md`.

## How to report

- Report correctness, security and behaviour regressions; style, naming and formatting belong to the linters.
- Cite `file:line` from code you opened for every finding.
- Mark findings that predate this change as **pre-existing**.
- Open with a summary: the number of findings, or the line "No issues found."

## Ignore

- `pnpm-lock.yaml`, `next-env.d.ts`, `tsconfig.tsbuildinfo`, `test-results/`, `playwright-report/`, `public/` binaries, `shots/`

## Risky paths

Listed in `.github/risk-paths`. A PR touching them merges only with Matías's `human-ok` label.
