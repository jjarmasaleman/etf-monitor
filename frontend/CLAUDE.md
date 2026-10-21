# Frontend

Angular 22, TypeScript ~6.0, Chart.js 4. Edited in VS Code.

## Commands

Run from `frontend/`.

- `npm start`: dev server on :4200 (start the backend first)
- `npm run build`: production build
- `npm test`: Vitest (CI sets `CI=true` for a single non-watch run)

## Angular conventions

- Standalone components only, no NgModules. Component selector prefix: `app`.
- The app is zoneless (no `zone.js`). Use signals for state (`signal`, `computed`, `input()`, `output()`); don't add zone.js.
- Component styles are SCSS. Global styles go in `src/styles.scss`.
- Call the backend with relative `/api/...` URLs; the dev server proxies them (`proxy.conf.json`). Never hardcode `localhost:8080`.
- Don't do financial calculations here: the backend computes, the frontend formats (`Intl.NumberFormat` with currency `EUR`).
- Production budgets: initial bundle 500 kB warning / 1 MB error; component styles 4 kB / 8 kB.

## Tests

- Vitest through `@angular/build:unit-test`, jsdom environment. `describe`, `it` and `expect` are globals (`vitest/globals`); don't import them.

## Formatting

- Prettier: `printWidth` 100, single quotes, Angular parser for `.html` (`.prettierrc`).
- A Claude Code hook (`.claude/hooks/format-frontend.mjs`) runs Prettier on every frontend file Claude edits, so formatting doesn't need to be done by hand.

## Assets

- Brand images are in `public/brand/` (logo and brand, light and dark-background variants, SVG and PNG).
