# Tyler Forge Monorepo

## Stack

- **Package manager**: pnpm 10.28.2+ (workspaces in `packages/*`)
- **Task runner**: Turbo
- **Node**: 22.12+

## Commands

Run from root via turbo:

```bash
pnpm build        # Build all packages
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Run all tests
```

## Code Style

- ESLint 9 flat config (`eslint.config.js`)
- Prettier via `@repo/prettier-config`
- Stylelint for SCSS

DO NOT add comments unless code is complex. Defer to configs.

### Syntax Preferences

- Use `const` by default, only use `let` if reassignment is needed
- Use arrow functions for callbacks and methods where appropriate
- Use template literals for string concatenation
- Use object and array destructuring for cleaner code
- Use optional chaining and nullish coalescing for safer property access
- Use async/await for asynchronous code instead of promises
- Use default parameters and rest/spread syntax for cleaner function signatures
- Use concise object literal syntax when property names match variable names
- Use ternary operators for simple conditional expressions
- Use early returns to reduce nesting and improve readability
- Use JSDoc comments for complex functions and public APIs
- Always use visibility modifiers (public/private/protected) in TypeScript classes
- Use consistent naming conventions (camelCase for variables/functions, PascalCase for classes/types)
- Avoid using `any` in TypeScript unless necessary, prefer specific types or generics
- Use `readonly` for properties that should not be reassigned

## Commits

- Conventional commits REQUIRED (commitlint enforced)
- Changesets for versioning - run `pnpm changeset` for changes

## Packages

- `packages/forge` - Web components library (see its CLAUDE.md)
- `packages/prettier-config` - Shared prettier config
