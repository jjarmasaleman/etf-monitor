---
name: update-docs
description: Check README.md, the CLAUDE.md files and CLAUDE.local.md against the current changes and update whatever is out of date. Run manually before committing.
disable-model-invocation: true
---

# Update documentation

Bring the project documentation in line with the current state of the repository. Only fix what is out of date; don't rewrite text that is still correct.

## 1. What counts as the current state

Compare the docs with the project as it will be after the next commit: committed files plus staged changes. Unstaged changes and untracked files are not part of it, because they won't be committed.

- List files with `git ls-files`, not the file system; it includes staged files and skips untracked ones.
- `git status --short` shows which files have unstaged changes. For those, read the staged version with `git show :<path>` instead of the file on disk.
- As a hint for where to look first (not a limit on what to check): `git diff --cached --stat` and `git log --oneline -15`. Docs can be out of date because of older commits too.

## 2. Check each file

**`README.md`** (for humans)
- Project structure tree matches the real top-level layout.
- Getting started: setup steps (including `git config core.hooksPath .githooks`), commands, ports and required versions match `pom.xml`, `package.json` and the wrappers.
- Tech stack table: nothing planned that now exists, nothing listed that was removed.
- Roadmap: tick items that are done.
- Configuration: new environment variables are mentioned.

**`CLAUDE.md`** (root)
- Layout section matches the real folders, workflows and hooks.
- Status line matches the README roadmap.
- Decision log: if the changes contain a notable technical decision with no entry, propose one (date, decision, reason). Don't invent decisions; ask if unsure.

**`backend/CLAUDE.md`, `frontend/CLAUDE.md`**
- Commands, versions, conventions and file paths are still accurate for the code in that folder.

**`.env.template`** files
- Every new environment variable the code reads has a placeholder entry. Read only the templates, never `.env` files.

**`CLAUDE.local.md`** (personal, gitignored; only if it exists)
- Tick or remove pending items that the changes have completed, and note new open questions that came up.
- Never copy its content into committed files.

## 3. Finish

- Make the edits. Don't stage, commit or push.
- Report in a short list: what was updated per file, and anything you weren't sure about and left unchanged.
