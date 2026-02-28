# Unit Test Writer — Agent Memory

## Framework
- Vitest is NOT pre-installed in this project. Install with: `npm install --save-dev vitest`
- Installed version: vitest 4.x (latest)
- No vitest config file needed for pure data/utility tests
- Run tests: `npx vitest run <path-to-test-file>`

## Import Conventions
- Test files co-located with source: `src/data/concepts.test.ts` imports `./concepts`
- Do NOT use `../src/data/concepts` — the test is already inside `src/`
- The `@/*` alias (maps to `src/*`) does NOT resolve in Vitest without a vite/vitest config — use relative paths instead

## Test Structure Patterns
- `describe` blocks by concern: `difficultyBadgeStyles`, `ALL_CATEGORIES`, `concepts array`, `spot-checks`
- Use `it.each(array)` with `"$fieldName"` interpolation for parameterized tests over data arrays
- For nested validation (sections, screenshots inside concepts), use nested `for...of` loops with `it(...)` inside to generate individual test cases — each gets a unique name including index
- Optional fields: guard with `if (field !== undefined)` before generating tests for them

## Project-Specific Notes
- `src/data/concepts.ts` — pure static data, no mocking needed
- Concepts have optional: `released`, `releaseDate`, `references`, `bullets`, `code`, `screenshots`, `carousel`, `table`
- `carousel: true` sections must also have a `screenshots` array (invariant enforced in tests)
- 16 concepts total as of this writing: 12 released, 4 unreleased (skills, worktrees, mcp, settings)
- References only on: `cli-commands`, `settings-json`

## File Naming
- Co-located test files: `*.test.ts` (not `*.spec.ts`)
- Place at same path as source: `src/data/concepts.ts` -> `src/data/concepts.test.ts`
