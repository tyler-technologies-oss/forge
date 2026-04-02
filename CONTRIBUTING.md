# Contributing

We welcome contributions to Tyler Forge! Whether it's bug fixes, new features, or documentation improvements, we appreciate your help.

- [Documentation](https://forge.tylerdev.io/)
- [Security Policy](./SECURITY.md)

## Repository Overview

Tyler Forge is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces) and [Turbo](https://turborepo.org/).

| Package | Description |
|---------|-------------|
| [@tylertech/forge](./packages/forge) | Web components library |
| [@tylertech/forge-core](./packages/forge-core) | Core utilities and base classes |

## Requirements

- Node.js 22.12+
- pnpm 10+

## Setup

```bash
git clone https://github.com/tyler-technologies-oss/forge.git
cd forge
pnpm install
pnpm dev:forge
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev:forge` | Start dev server |
| `pnpm storybook:forge` | Start Storybook |
| `pnpm build` | Build all packages |
| `pnpm test` | Run tests |
| `pnpm lint` | Lint code (ESLint + Stylelint) |
| `pnpm format` | Format code (Prettier) |

**Running commands for a specific package:**

```bash
pnpm run --filter @tylertech/forge <command>
pnpm run --filter @tylertech/forge-core <command>
```

**Running tests for a specific path (relative to the package root):**

```bash
pnpm run --filter @tylertech/forge test src/lib/button/
pnpm run --filter @tylertech/forge test dialog
```

## Development Workflow

- **Testing**: [Vitest](https://vitest.dev/) in browser mode with Playwright. Run `pnpm test` to execute all tests.
- **Linting**: ESLint for TypeScript/JavaScript, Stylelint for SCSS. Configs are in the root and package directories.
- **Formatting**: Prettier with config in `.prettierrc`. Run `pnpm format` to auto-format.

## Pull Requests

1. **Open an issue first** to discuss your proposed change
2. Fork the repo and create a feature branch
3. Make your changes with tests as needed
4. Run `pnpm changeset` to create a changeset (see [Versioning](#versioning--releases))
5. Validate locally: `pnpm build && pnpm test && pnpm lint`
6. Submit your PR

## Versioning & Releases

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation.

**For contributors:**

When submitting a PR that changes published packages, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to:
1. Select affected packages
2. Choose the semver bump type:
   - `patch` - Bug fixes, minor tweaks
   - `minor` - New features, non-breaking changes
   - `major` - Breaking changes
3. Write a description of your change

**Release process:**

Releases are automated via GitHub Actions. When PRs with changesets are merged to `main`:
1. A "Version Bump" PR is automatically created
2. When merged, packages are published to npm
3. Changelogs are updated automatically

## Commit Guidelines

Use [Conventional Commits](https://conventionalcommits.org) format (enforced by commitlint).

```
<type>(<scope>): <description>
```

Examples:
- `feat(button): add loading state`
- `fix(dialog): correct focus trap behavior`
- `docs: update README`
- `chore: update dependencies`

Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`

## Reporting Issues

- **Bugs**: [Create an issue](https://github.com/tyler-technologies-oss/forge/issues/new/choose) with reproduction steps
- **Feature requests**: Open an issue to discuss first. New features go through a governance process to ensure alignment with the library's vision.
- **Questions**: Use [GitHub Discussions](https://github.com/tyler-technologies-oss/forge/discussions)

## License

Tyler Forge is licensed under the [Apache 2.0 License](./LICENSE).
