---
name: update-docs
description: Check README.md, the CLAUDE.md files, .env.template and CLAUDE.local.md against what changed since the last check and update whatever is out of date. Pass "full" to check everything. Run manually.
disable-model-invocation: true
---

# Update documentation

Bring the project documentation in line with the current state of the repository. Only fix what is out of date; don't rewrite text that is still correct.

The current state is the project as it will be after the next commit: committed files plus staged changes. Unstaged changes and untracked files are not part of it, because they won't be committed. For a file with unstaged changes, read the staged version with `git show :<path>` instead of the file on disk.

## 1. Choose the mode

The last checked commit is stored in `private/update-docs-last` (gitignored).

Run a **full** check when any of these is true:
- the argument is `full`
- the repository has no commits yet (`git rev-parse --verify HEAD` fails)
- `private/update-docs-last` is missing
- its commit no longer exists (`git cat-file -e <hash>` fails, e.g. after a rebase)

Otherwise run an **incremental** check against that commit (`<hash>` below).

## 2a. Incremental check

- Start with `git diff --cached --stat <hash>`. It covers commits since the last check (pushed or not) plus staged changes.
- Map each changed path to the docs in the table below and skip docs whose areas didn't change. A changed path that matches no row: decide which doc it affects; don't skip it.
- Read only the hunks the mapping points to (`git diff --cached <hash> -- <path>`). When the diff is large, read only hunks that touch build files, configuration, environment reads, commands or public interfaces.
- Environment variables: `git diff --cached --name-only -G 'getenv|\$\{[A-Z_]+' <hash>`, then read only the matching hunks. Spring can also bind environment variables to `@ConfigurationProperties` without any `${...}`, so check `.env.template` whenever `application*.properties` or a `@ConfigurationProperties` class changed.

| Changed path | Doc to check |
|---|---|
| `backend/**` | `backend/CLAUDE.md`; README roadmap |
| `backend/pom.xml`, `backend/.mvn/**` | versions in `backend/CLAUDE.md` and README |
| `backend/src/main/resources/application*.properties`, `**/.env.template` | README Configuration, `.env.template`, `backend/CLAUDE.md` Database |
| `frontend/**` | `frontend/CLAUDE.md`; README roadmap |
| `frontend/package.json` | versions in `frontend/CLAUDE.md` and README requirements and tech stack |
| `.github/workflows/**` | Layout and Workflow rules in root `CLAUDE.md` |
| `.githooks/**`, `.claude/**`, top-level files and folders | Layout in root `CLAUDE.md`, README structure and Getting started |
| build, test or verify commands | Commands in the area `CLAUDE.md`, "Before saying a task is done" in root `CLAUDE.md`, allow rules in `.claude/settings.json` |

## 2b. Full check

Don't read source files; use `git ls-files` for the layout and `git grep` to look things up.

- **`README.md`**: structure tree matches the top-level layout; Getting started (setup steps including `git config core.hooksPath .githooks`, commands, ports, required versions) matches `backend/pom.xml`, `frontend/package.json` and the wrappers; tech stack has nothing planned that now exists and nothing that was removed; roadmap items that are done are ticked; Configuration mentions every environment variable.
- **Root `CLAUDE.md`**: Layout matches the folders, workflows and hooks.
- **`backend/CLAUDE.md`, `frontend/CLAUDE.md`**: commands, versions, conventions and file paths are accurate.
- **`.env.template`** files: every environment variable the code reads has a placeholder.

## 3. Always

- **Root `CLAUDE.md`**: the Status line matches the README roadmap. Decision log: if the changes contain a notable technical decision with no entry, propose one (date, decision, reason). Don't invent decisions; ask if unsure.
- **`CLAUDE.local.md`** (personal, gitignored; only if it exists): tick or remove pending items that are done, and note new open questions. Never copy its content into committed files.
- Never read `.env` files, only `.env.template`.

## 4. Finish

- Make the edits. Don't stage, commit or push.
- Write `git rev-parse HEAD` to `private/update-docs-last` (create `private/` if missing). If the repository has no commits yet, skip this; the next run is full again.
- Report in a short list: the mode (incremental since `<hash>`, or full and why), what was updated per file, and anything you weren't sure about and left unchanged. End with: "If you discard these edits, run `/update-docs full` next time."
