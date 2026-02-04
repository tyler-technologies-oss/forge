# Tyler Forge™ Components

Welcome to Tyler Forge™, a design system and component library for building modern web applications.

Tyler Forge provides a set of UI components and styles that can be used to create consistent and accessible user interfaces. Forge is built using [Web Components][2],
which are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages just as you would with any other
built-in HTML element. Web components are based on existing web standards, and can be used with any modern web framework or no framework at all.

Forge components are an implementation of the [Tyler Forge™ design system][1], which provides the design language that can be used to create a consistent look and
feel across your products and applications. The design system is a derivative of [Material Design][3], but has been tailored to the needs of Tyler Technologies
and its broad customer base.

[![NPM Version](https://img.shields.io/npm/v/%40tylertech%2Fforge?style=for-the-badge)](https://www.npmjs.com/package/@tylertech/forge)
[![NPM Downloads](https://img.shields.io/npm/dt/%40tylertech%2Fforge?style=for-the-badge)](https://www.npmjs.com/package/@tylertech/forge)

## Important links

- [Documentation][4]
- [Forge 2.x Documentation](https://forge.tylerdev.io/version-2)
- [Contributing][5]
- [Changelog][6]

## Local development

To develop locally, fork this repository, and then run the following commands from the root of the project to view the dev site:

```bash
pnpm install
pnpm run dev:forge
```

You can also view the Storybook documentation site by running:

```bash
pnpm run storybook:forge
```

## Release Process

This repository uses [Auto](https://intuit.github.io/auto/) for it's release process. This tool relies on conventional commits to determine the next version number
and changelog entries, as well as GitHub labels to determine the semantic version release type.

When creating a pull request, please ensure that you follow the [conventional commit guidelines](https://www.conventionalcommits.org/en/v1.0.0/) and use the appropriate labels
for the type of change you are making.

Semantic labels:

- `patch`: A bug fix that does not break any existing functionality.
- `minor`: A new feature that does not break any existing functionality.
- `major`: A breaking change that requires changes to existing code. This will bump the major version number and create a new version branch for the current major version.
- `skip-release`: Add this label when merging a PR that either does not require a release, or if you need to batch multiple changes together where only the last one merged
  triggers the release.

When you are ready to release, make sure that the `skip-release` label does **not** exist on the PR, and that it contains one of the other semantic version labels noted above.
When that PR is merged, Auto will automatically create a new release and publish it to NPM. The release will be tagged with the version number, and a new [GitHub release][8] will
be created with the changelog entries for that release. Additionally, we also have a GitHub Action that pushes the bundled library code to the Forge CDN. Keep an eye on the
[GitHub Actions tab][7] to see the progress of the release, and if there are any issues with the process.

## Need help?

Please [create](https://github.com/tyler-technologies-oss/forge/issues/new/choose) a GitHub issue with any questions and we'll be glad to help!

[1]: https://forge.tylertech.com/
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[3]: https://m2.material.io/
[4]: https://forge.tylerdev.io/
[5]: https://github.com/tyler-technologies-oss/forge/blob/main/CONTRIBUTING.md
[6]: https://github.com/tyler-technologies-oss/forge/blob/main/CHANGELOG.md
[7]: https://github.com/tyler-technologies-oss/forge/actions
[8]: https://github.com/tyler-technologies-oss/forge/releases

