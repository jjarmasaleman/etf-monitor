# CLAUDE.md

ETF Monitor: personal ETF portfolio tracker. Fetches daily ETF prices on a schedule, stores their history, computes returns and portfolio value, and shows them in a web dashboard.

Setup and run instructions for humans are in README.md. Area-specific rules live in `backend/CLAUDE.md` and `frontend/CLAUDE.md`.

## Layout

- `backend/`: Spring Boot 4 API (Java 21, Maven wrapper), port 8080
- `frontend/`: Angular 22 app, port 4200, proxies `/api` to the backend
- `.github/workflows/`: `backend.yml`, `frontend.yml`, `conventions.yml`
- `.githooks/`: `commit-msg` (Conventional Commits check) and `pre-commit`; both reject commits containing a value from a local `.env` file (`check-env-secrets`)
- `.claude/`: shared Claude Code settings, hooks and skills (`/update-docs` checks the docs against the committed and staged state; run it manually)

## Status

Skeletons only. Next roadmap step: data ingestion (fetch daily prices on a schedule and store them). Full roadmap is in README.md; tick items there when done and update this line.

## Domain rules

- Base currency is **EUR**. All portfolio values and returns are reported in EUR.
- Money and prices are `BigDecimal` in Java, never `double` or `float`. Rounding rules are in `backend/CLAUDE.md`.
- The backend does all financial calculations. The frontend only formats and displays numbers it receives.

## Before saying a task is done

- Backend change: run `./mvnw -B verify` in `backend/` (on Windows PowerShell: `.\mvnw.cmd -B verify`).
- Frontend change: run `npm run build` and `npm test` in `frontend/`.
- Report failures with their output; don't claim success without running these.

## Workflow

- `develop` is the integration branch; `master` is releases only. Never commit to `master`.
- Start new work on a branch from `develop`: `type/short-description`, where type is `feature`, `fix`, `chore`, `docs`, `refactor`, `test` or `hotfix` (lowercase, hyphens). Releases use `release/x.y.z`.
- Commits and PR titles: Conventional Commits, `type(scope): description`, imperative, first line at most 72 characters. Types: `feat fix docs style refactor perf test build ci chore revert`. Usual scopes: `backend`, `frontend`, `ci`, `readme`. Example: `feat(backend): add EtfPrice entity`.
- Only commit, push or open PRs when asked. PRs target `develop`.
- CI checks branch names, PR titles and commit messages (`conventions.yml`). Keep workflows on `ubuntu-24.04` and actions at `@v5`.

## Files and secrets

- UTF-8, LF line endings (CRLF only for `*.bat`/`*.cmd`), 2-space indentation; see `.editorconfig` and `.gitattributes`.
- Never commit secrets. `.env`, `.env.*` and `*.pem` are gitignored; only `.env.template` is committed, with placeholder values. New secrets (e.g. the Alpha Vantage API key) go in `.env.template` as placeholders and are read from environment variables.
- `CLAUDE.local.md` is personal and gitignored; never copy its content into committed files.

## Decision log

Add an entry (date, decision, reason) when a notable technical decision is made.

- 2026-10-20: Monorepo with Spring Boot 4 backend and Angular 22 frontend; CI per part plus a conventions workflow; Conventional Commits; Git Flow style branches.
- 2026-10-20: H2 in-memory database until PostgreSQL and Docker are set up.
- 2026-10-21: Base currency EUR. Money as `BigDecimal`, full precision in storage and calculations, rounding only at the API/display boundary with `HALF_EVEN`.
- 2026-10-21: All financial calculations happen in the backend; the frontend only displays.
- 2026-10-22: Claude Code may not read secret files (`Read` deny rules in `.claude/settings.json`), and git hooks reject commits containing a local `.env` value. Reason: keep secrets out of commits and out of the AI context.
- 2026-10-22: Machine-specific Claude Code config (IDE MCP servers, their permission rules) lives in personal config, not in the repo; `.mcp.json` is gitignored. Reason: forks shouldn't inherit one developer's setup.
