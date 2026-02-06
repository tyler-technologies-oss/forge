# Contributing

We welcome contributions to Tyler Forge! Whether it's bug fixes, new features, or documentation improvements, we appreciate your help.

## Setup

```bash
git clone https://github.com/tyler-technologies-oss/forge.git
pnpm install
pnpm run dev:forge
```

Requires Node 22.12+ and pnpm 10+.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev:forge` | Start dev server |
| `pnpm run storybook:forge` | Start Storybook |
| `pnpm run build` | Production build |
| `pnpm run test` | Run tests |
| `pnpm run lint` | Lint code |

## Pull Requests

1. Create a GitHub issue first to discuss your proposed change
2. Fork the repo and create a feature branch
3. Make your changes and add/update tests as needed
4. Run `pnpm changeset` to create a changeset (see below)
5. Submit your PR and fill out the template

Please validate your build locally before pushing to avoid CI iteration.

## Changesets

This project uses [changesets](https://github.com/changesets/changesets) for versioning and changelog generation. When submitting a PR that changes published packages, run:

```bash
pnpm changeset
```

Follow the prompts to describe your change and select the appropriate semver bump (patch/minor/major).

## Commits

Use [conventional commits](https://conventionalcommits.org) format. A pre-commit hook enforces this via commitlint.

Examples:
- `feat(button): add loading state`
- `fix(dialog): correct focus trap behavior`
- `docs: update README`

## Issues and Bugs

Found a bug? [Create an issue](https://github.com/tyler-technologies-oss/forge/issues/new/choose) with reproduction steps. PRs with fixes are even better!

## Feature Requests

Have an idea? Open an issue to discuss it first. The Forge team uses a governance model to ensure new features align with the library's vision.
