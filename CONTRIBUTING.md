# Contributing

## Setup

You need Python 3.14 and Node.js 22.

```bash
python3.14 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install '.[dev]'
npm --prefix card ci
pre-commit install --install-hooks
```

## Quality Checks

```bash
python scripts/quality_check.py

# Run the same gate manually through pre-commit.
pre-commit run --all-files
```

The gate runs Ruff, Pyright, pytest on all CPU cores, and the card's type check,
and regenerates the translations and the card. It also checks that:

- each integration module exceeds 95% line coverage, and `config_flow.py`
  stays at 100%;
- the generated files match the Git index, so stage them first;
- `manifest.json`, `pyproject.toml`, and `card/package.json` have the same
  version.

CI runs the same gate, and validates the integration with Home Assistant's
`hassfest` and the HACS action.

## Generated Files

Both are committed, because HACS installs exactly what is published.

- **Translations:** edit `scripts/translations.py`, then run it.
- **Card:** edit `card/src/`, then run `npm --prefix card run build`.

The sums over a period, the key figures' arithmetic, the history chart's stacks,
the power flow, and the dashboard's views have tests in `card/test/`, run with
`npm --prefix card test` and by the quality gate.

## Texts

Every text a user sees follows [CONTEXT.md](CONTEXT.md): its terms, the terms
by area, and the space of each place. `card/test/wording.test.ts` and
`tests/test_translations.py` check the words it rules out and the widths;
`card/test/titles.test.ts` writes every title of the dashboard, for households
of every kind, to `card/test/titles.snapshot.md`. After an intended change of a
title, run `UPDATE_SNAPSHOT=1 npm --prefix card test` and review the diff.

## Python

- Python 3.14+ is the project baseline. Follow the Ruff and Pyright
  configuration in `pyproject.toml`; do not duplicate their mechanically
  enforceable rules here.
- The complete production integration directory and `scripts` are checked
  with Pyright strict; tests remain in standard type-checking mode. Where Home
  Assistant's own types are incomplete, use a targeted
  `# pyright: ignore[<rule>]` on that line. The cached-property override
  documented in `pyproject.toml` is the only project-wide exception.
- Prefer precise types and built-in generics. Avoid expanding `Any` usage;
  tighten existing typing incrementally.
- Use specific exceptions and EAFP where appropriate. Do not catch bare
  `Exception`.
- Use descriptive identifiers. Avoid single-letter local variables except for
  conventional, short-lived uses; name booleans with `is_`, `has_`, or
  `should_`. Sort collections when their order has no semantic meaning.
- Use `pathlib.Path` for filesystem paths. Keep log messages free of trailing
  periods.
- Start every Python file, including test files, with a concise module docstring
  describing its purpose.

## Cards

- Cards read statistics and show them. Calculations belong to the integration.
  Only the power flow card reads current states: the power sensors the energy
  dashboard knows.
- Colors live in `card/src/colors.ts`, texts in `card/src/localize.ts`, in English
  and German.
- The cards follow Home Assistant's energy cards, in light and dark themes, on
  phones and desktops, and by keyboard and screen reader.
- There is no local preview. Check a change in a Home Assistant instance.

## Documentation and Comments

- Use Google-style docstrings for public classes, functions, and methods.
  Describe their purpose and externally observable behavior. Explain design
  rationale or constraints when they are not apparent from the code. Do not
  repeat parameter or return types already present in annotations.
- Include a `Raises:` section for exceptions that are intentionally raised,
  translated, or form a relevant part of the callable's public contract. Do
  not list incidental implementation exceptions that callers cannot reasonably
  handle. Test functions do not require docstrings when their name and
  Arrange-Act-Assert structure describe the scenario clearly.
- Keep comments meaningful and scenario-specific. Explain non-obvious reasons
  and constraints; omit code paraphrases, agent reasoning notes, and abandoned
  implementation plans.

## Tests

- Use pytest functions and the Home Assistant test stack. Use `make_entry` and
  `setup_entry` from `tests/conftest.py` to set up the integration, and
  `import_hourly` for statistics.
- Structure every test according to Arrange-Act-Assert. Add explicit,
  test-specific `# Arrange:`, `# Act:`, and `# Assert:` comments when the test
  is long enough that its phases are not immediately apparent, or when it has
  multiple phases, state transitions, concurrent operations, or substantial
  fixture and mock setup. Do not add comments that merely restate obvious code.
  Use native `assert` statements for values and state, mock assertion helpers
  for interactions, and `pytest.raises` for expected exceptions.
  Exception-focused tests may use `# Act and assert: ...` when separating the
  phases would be artificial. In multi-step scenarios, label each additional
  phase explicitly; do not place new mock setup or actions under an Assert
  comment.

## Pull Requests and Releases

`main` is protected: changes land through pull requests with a Conventional
Commit title, once `quality-check` passes. [AGENTS.md](AGENTS.md) describes the
release process, which applies to people too.
