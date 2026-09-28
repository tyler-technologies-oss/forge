---
'@tylertech/forge': minor
---

Export `VirtualElement` from the public API. It was previously only reachable through the
`@tylertech/forge/esm/core/utils/position-utils` deep path, which does not resolve under
`NodeNext` module resolution.
