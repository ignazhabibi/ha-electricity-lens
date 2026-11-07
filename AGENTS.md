# AGENTS.md

## Scope and Priorities

Follow runtime instructions first, then this file, then the repository's
configured tooling. Treat the implementation and configuration as newer than
examples or assumptions in documentation.

Keep changes small and directly related to the request. Do not refactor or
clean up unrelated code. State assumptions and tradeoffs when they materially
affect the solution.

## Project Context

- This is a Home Assistant custom integration with its own Lit cards and
  dashboard strategy, installed as one package through HACS.
- Integration code is in `custom_components/electricity_lens/`; tests are in
  `tests/`; card and strategy sources are in `card/src/`.
- **The integration computes, the cards show.** Every figure is computed once,
  hour by hour, and kept as a statistic (`coordinator.py`, `calculation.py`).
  Cards and strategy only add up statistics over a period, take one sum from
  another, and divide two sums (`card/src/figures.ts`, tested in `card/test/`),
  so two cards always agree. Rules and valuations, such as what a kWh costs or
  what counts as a saving, belong to the integration. The one exception is the
  power right now (`card/src/flow.ts`): the power flow card adds up and takes
  apart the current states of the energy dashboard's power sensors, which the
  integration names in `electricity_lens/figures`.
- **Two questions, two numbers.** Costs count a device's solar power at the lost
  feed-in compensation. Savings give the benefit of solar power to the PV plant
  alone and count a device's electricity at the hour's price, so that the three
  savings add up to the balance. Heating and Charging show a device's saving
  with its solar power and name the part by solar power.
- Bad readings are never filtered. They are fixed in Home Assistant's statistics
  tools, then recomputed. A new household rule raises
  `HOUSEHOLD_CALCULATION_VERSION`, which recomputes all statistics on the next
  start; a new rule only for the categories raises
  `CATEGORY_CALCULATION_VERSION`, which spares the household's many statistics.
- Distances are estimates from the charged energy and the entered consumption.
  The dashboard does not show them; the saving against a combustion car rests
  on them.
- Use what the energy dashboard knows, and ask the user only for what Home
  Assistant cannot know. A field appears only when this household needs it.
- The strategy has no settings: it shows what the integration's areas allow.
  After "Take control", a dashboard keeps its stored views, so a new layout does
  not reach it. Check `lovelace/config` for `strategy` before suspecting a deploy.
- Generated and committed: `custom_components/electricity_lens/translations/`
  from `scripts/translations.py`, and `custom_components/electricity_lens/frontend/`
  from `card/src/`. HACS installs exactly what is published. Edit the sources and
  regenerate; the quality gate fails when the generated files are stale.
- User-facing text exists in English and German. Card texts are in
  `card/src/localize.ts`. Keep names short, and use the words users know from
  their bills and devices.
- Prefer public Home Assistant interfaces. Where none exists, isolate the
  dependency (`sources.py`) and fail with a clear repair notice instead of wrong
  numbers.

## Python and Tests

For Python implementation, test, or review work, read
[CONTRIBUTING.md](CONTRIBUTING.md) before starting.

## Local Quality Gate

Before proposing a commit or push, run the complete quality gate. For
development setup and commands, read [CONTRIBUTING.md](CONTRIBUTING.md).

Stage generated files before running it: it compares them with the Git index.

## Checking Changes

Card changes have no local preview. Check them in a Home Assistant instance after
installing a release, in light and dark themes and at phone and desktop widths.
Say what was not checked. Check changes to costs, mix, or savings against older
periods too, not only against recent days.

## Git, Pull Requests, and Releases

- `main` is protected. Use short-lived branches and pull requests; never
  commit or merge directly to `main` without an explicitly confirmed emergency
  bypass.
- When a pull request implements an issue, include `Closes #<issue-number>` in
  its body so GitHub closes the issue when the pull request merges.
- Stage only requested files. Before committing, show the files, summary, and
  proposed Conventional Commit message; no additional confirmation is needed.
- Wait for the GitHub `quality-check`, `hassfest`, and `hacs` jobs before
  treating a PR as merge-ready.
  Use GitHub squash merge only with explicit authorization.
- For multi-line GitHub issue or PR bodies, use a heredoc or `--body-file` so
  GitHub receives real newlines, then verify the rendered body.
- After a merge, fast-forward local `main` and delete the confirmed merged
  local branch.
- Releases must keep `manifest.json`, `pyproject.toml`, and `card/package.json`
  versions aligned; the cards load the bundle by this version.
  For a release, analyze commits since the previous tag, propose the semantic
  version bump and changelog, and wait for confirmation. Land the version bump
  and the confirmed changelog as `release-notes/vX.Y.Z.md` through a PR, then
  create the tag on the merged `main` commit, for example on the GitHub
  release page: stable releases use `vX.Y.Z`, prereleases use
  `vX.Y.Z-alpha.N`, `-beta.N`, or `-rc.N`. The tag workflow publishes that
  file as the GitHub Release body; without it, it falls back to an annotated
  tag's message. A release is live only after both its `main` and tag
  workflows pass; then verify the published GitHub release body.
- Write release notes as `# Changelog`, followed by only the applicable
  sections in this order: `### Breaking Changes 🚨`, `### New Features 💫`,
  `### Other Changes ☀️`, and `### Bug Fixes 🐞`. Omit empty sections instead
  of adding `None` entries. Each entry is
  ``- `short-sha` Summary. ([#PR](https://github.com/owner/repo/pull/PR))``.
- Write GitHub issues and pull requests in English, even when the surrounding
  conversation is in another language.

## Documentation

`README.md` is for users, `CONTRIBUTING.md` for contributors, and this file for
agents. There is no other documentation; do not add concept or design documents.

After changes to architecture, dependencies, setup, tests, CI, GitHub policy,
or releases, check `README.md`, `CONTRIBUTING.md`, `AGENTS.md`,
`pyproject.toml`, and relevant `.github/workflows/` files. Update affected
documentation in the same change, or explicitly state that no update was
needed.
