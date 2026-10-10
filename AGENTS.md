# AGENTS.md — governed-autonomy

The customer-facing Governed Autonomy page. What it is and how to view it is in
[README.md](README.md); this file is what an agent changing it must know.

## Rules

- Lead with outcomes. Internal project names and implementation vocabulary (orchestration, policy
  engines, DSLs, runtimes, planning stores) never appear on the page.
- No company or customer names other than Beyond10x.
- `site/` stays static: plain HTML, CSS and `case.js`. No framework, no build step, no package
  manager.
- No third-party requests from the page: no web fonts, CDNs, analytics or embeds. System font stack
  only.
- All links and asset paths stay relative, so the page works both from `file://` and under
  `/governed-autonomy/`.
- The hero animation (`case.js`) keeps its `prefers-reduced-motion` path, which renders the final
  state without motion.
- Check layout at 1440 px and 390 px wide before publishing
  (`google-chrome-stable --headless=new --window-size=<w>,<h> --screenshot=<file> <url>`).

## Delivery

- Publication is `.github/workflows/pages.yml` alone: Pages source is GitHub Actions, and the
  workflow uploads `site/` unchanged. This repository is independent of the organization Website
  build.
- Every commit and push is `b10x-bot[bot]`'s, through `b10x-gates bot`. Every GitHub write
  (settings, dispatches, pull requests) goes through `b10x-gates api`, never `gh`.
- Actions are pinned to full commit SHAs and every job declares its permissions.

## Serves

This repository advances these objectives from `atlas/ROADMAP.md`:

- O1: states governed reach for customers: agents act only within authority the organization declares, and need approval for what it reserves.
- O2: states decisions as data with evidence: protocols declare what must be true, and work counts as done only when evidence proves it.
- O5: is the public entry point of the customer-facing agent platform, presenting the Autonomous Workforce offer and early access.
