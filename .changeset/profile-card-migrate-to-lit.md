---
'@tylertech/forge': major
---

feat(profile-card): migrate to Lit

**BREAKING CHANGE:** `forge-profile-card` now extends `BaseLitElement` instead of `BaseComponent`. The `fullName`, `email`, `signOut`, `profile`, `signOutText`, `profileText`, `avatarText`, `avatarIcon`, `avatarImageUrl`, and `avatarLetterCount` properties, and the `forge-profile-card-sign-out` and `forge-profile-card-profile` events are unchanged.

- `ProfileCardCore` and `ProfileCardAdapter` have been removed.
- `IProfileCardComponent` is deprecated and now extends `BaseLitElement`.
- Property changes are now applied as part of Lit's asynchronous update cycle. Await `updateComplete` before expecting the rendered content to reflect a property change.
- The `sign-out` attribute is now reflected as `sign-out=""` when the sign out button is shown by default.
- The avatar now falls back to the full name when `avatarText` is cleared.
