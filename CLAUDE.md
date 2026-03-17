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
- Prettier (config in root `.prettierrc`)
- Stylelint for SCSS

DO NOT add comments unless code is complex. Defer to configs.

### Syntax Preferences

- MUST use modern ESM (.js) extensions for all imports/exports
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
- Always use braces for control structures, even for single statements
- Use consistent indentation (2 spaces) and line breaks for readability
- Avoid using magic numbers, use constants or enums instead
- Use descriptive variable and function names that clearly communicate their purpose
- Avoid deep nesting of code, refactor into smaller functions if necessary

## Testing

- Avoid accessing and/or testing internal implementation details, focus on behavior and user interactions, and test through public APIs and events.
- DO NOT access private properties or methods in tests, use public APIs to verify behavior.
  - If you find yourself needing to access private members, consider if the class design can be improved to expose necessary functionality through public methods.
- Use descriptive test names that clearly communicate the behavior being tested, following the pattern `should do something when condition`.

## Commits

- Conventional commits REQUIRED (commitlint enforced)
- Changesets for versioning - run `pnpm changeset` for changes

## Packages

- `packages/forge` - Web components library (see its CLAUDE.md)
