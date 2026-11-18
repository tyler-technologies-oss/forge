# Tyler Forge™ Upgrade Utility

This utility can be used to aid in the upgrade process for Tyler Forge™ based projects.

It executed run a find/replace and code migrations on all files within the provided `--path`, and attempt to perform any
automated replacements that it can for known upgrade migrations.

> Manual evaluation should **always** be done after running this utility, and if you use a code formatter such as Prettier,
> it is advised to run it after the utility has completed.

## Usage

Run the utility using `npx`:

```bash
npx @tylertech/forge-upgrade@latest
```

> **Important:** You must be on NodeJS version 20 or later.

## Configurations

Upgrades are run from a "configuration" file within this utility. The table below will help you decide which configuration to
use based on the version of Tyler Forge™ that your project is currently using prior to the upgrade:

| From                        | To                       | Configuration                                              |
| --------------------------- | ------------------------ | ---------------------------------------------------------- |
| Forge 2.x                   | Forge 3.0                | `forge-3.0` **(latest)**                                   |
| Forge 2.x                   | Forge 3.0 (deprecations) | `forge-3.0-deprecated`                                     |
| TCW 1.x                     | Forge 2.0                | `forge-2.0`                                                |
| TCW 1.x                     | Forge 3.0                | First run with `forge-2.0` then run again with `forge-3.0` |
| `@tylertech/forge-extended` | `@tylertech/forge`       | `forge-extended-migration`                                 |

> Additional manual upgrades may be required, see version announcement and/or release notes for further information.

### `forge-extended-migration`

`@tylertech/forge-extended` (and its Angular/React wrappers) are being retired — every component they
shipped now lives in `@tylertech/forge`/`@tylertech/forge-angular`/`@tylertech/forge-react` directly, with
no API changes. This configuration:

- Replaces the `@tylertech/forge-extended`, `@tylertech/forge-extended-angular`, and
  `@tylertech/forge-extended-react` entries in `package.json` (`dependencies`, `devDependencies`, or
  `peerDependencies`) with their `@tylertech/forge`/`@tylertech/forge-angular`/`@tylertech/forge-react`
  equivalents.
- Rewrites `@tylertech/forge-extended` imports to the matching `@tylertech/forge/<component>` subpath
  import, and removes now-unnecessary `defineXComponent()` calls (the new subpath imports register the
  element as a side effect).
- Rewrites `@tylertech/forge-extended-angular` imports to `@tylertech/forge-angular`, renaming each
  `ForgeExtendedXModule` to `ForgeXModule` (component/service/ref class names are unchanged).
- Rewrites `@tylertech/forge-extended-react` imports to `@tylertech/forge-react` (a pure package rename —
  wrapper component and prop-type names are unchanged).

Anything not covered by the verified mapping (e.g. the `*ProxyModule` classes or the package-wide
`ForgeExtendedModule` catch-all in the Angular wrapper, which have no direct equivalent) is left untouched
with a console warning rather than guessed at — review those manually.

### Options

The utility will accept the following arguments:

| Option                   | Description                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `--path <path>`          | Accepts a relative path from the current directory to the source directory where the upgrade should begin from.            |
| `--configuration <name>` | The name of the upgrade configuration to use. Defaults to most recent configuration.                                       |
| `--no-replace`           | Disables replace operations.                                                                                               |
| `--no-migrate`           | Disables code migrations.                                                                                                  |
| `--dry-run`              | Runs the utility without modifying any files and prints out what it would do if ran without this flag.                     |
| `--ignore`               | Paths or globs of files to ignore. (ex. `--ignore "**/*/my-directory/**/*"`). Note: separate multiple values with a comma. |
| `--verbose`              | Enables verbose logging.                                                                                                   |
| `--help`                 | Prints the help manual.                                                                                                    |
