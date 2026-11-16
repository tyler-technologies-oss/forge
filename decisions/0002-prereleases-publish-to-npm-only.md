# ADR-0002: Prereleases from `next` are published to npm only, not the CDN

## Status

Accepted

## Context

Forge publishes stable releases from `main` to npm under the `latest` dist-tag.
Each release of `@tylertech/forge` also deploys a self-contained set of
browser assets to the production CDN (`https://cdn.forge.tylertech.com`) so
that teams without a build step can load Forge with a `<script type="module">`
tag. The release workflow (`.github/workflows/changesets.yml`) syncs
`packages/forge/cdn/` to the CDN bucket with
`Cache-Control: public, max-age=31536000, immutable`.

Assets are written to a path that includes the package version:
`v1/libs/@tylertech/forge@<version>/`. A release never overwrites another
version's files, and the sync does not delete anything.

The next major is developed on a long-running `next` branch and published as
prereleases (for example `4.0.0-next.3`) under the `next` npm dist-tag using
changesets pre mode. Left alone, the release workflow would also deploy each
prerelease's assets to the production CDN, because it deploys whenever a
`@tylertech/forge@<version>` tag points at the released commit.

Deploying prereleases is technically safe, since each lands in its own
versioned directory. The question is whether unstable builds belong on the
official production CDN domain.

## Options considered

### Deploy prereleases to the CDN under their versioned path

Teams without a build step could try the next major from a script tag. The
immutable cache header is correct for a unique version. But every prerelease
accumulates permanently on the production domain, anyone can load an
unstable build from the official CDN, and a `forge@4.0.0-next.N` URL can be
mistaken for a supported release.

### Deploy prereleases to a separate CDN prefix

Keeps prereleases visibly apart from stable assets. It needs a new URL scheme
consumers can rely on and different cache rules (immutable is wrong for a
prefix that is expected to churn), which is more design than there is current
demand for.

### Publish prereleases to npm only

Consumers install with `@next`. Nothing unstable reaches the production CDN.
Teams that only load Forge from the CDN cannot try the next major.

## Decision

Prereleases from `next` are published to npm only. The `Configure AWS
Credentials` and `Deploy CDN Assets` steps in the release workflow are skipped
when the workflow runs on the `next` branch. `main` and `release/**` branches
deploy to the CDN as before.

## Consequences

- Teams try the next major with `pnpm add @tylertech/forge@next` (and the
  matching adapter `@next` tags). Snapshot releases from `main` are also npm
  only.
- A team that can only consume Forge from the CDN cannot test `next`. If a
  consumer needs that, reverse this decision: removing the
  `github.ref_name != 'next'` condition from the two steps deploys prereleases
  to their versioned paths with no other change. The first option's
  accumulation and mistaken-for-supported concerns would then need an answer,
  such as periodic cleanup of old prerelease directories or documenting the
  versions as unsupported. A separate prefix is the alternative if those
  concerns outweigh the demand.
- The gate has no effect until `next` is added to the workflow's branch
  triggers. Confirm the AWS steps are skipped on the first prerelease run.
- To change course, write a new ADR that supersedes this one rather than
  editing the decision above.
