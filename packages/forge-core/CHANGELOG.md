# @tylertech/forge-core

## 3.2.0

:tada: This release contains work from a new contributor! :tada:

Thank you, Beau Christian ([@bctt](https://github.com/bctt)), for all your work!

### 🚀 Enhancement

- Bump dependencies to latest [#23](https://github.com/tyler-technologies-oss/forge-core/pull/23) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(component-utils): add dedicated function to check for a registered custom element [#22](https://github.com/tyler-technologies-oss/forge-core/pull/22) ([@bctt](https://github.com/bctt))

### Authors: 2

- Beau Christian ([@bctt](https://github.com/bctt))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.1.0 (Wed Nov 20 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz)), for all your work!

#### 🚀 Enhancement

- feat(component-utils): cache parsed templates to optimize rendering [#21](https://github.com/tyler-technologies-oss/forge-core/pull/21) ([@MikeMatusz](https://github.com/MikeMatusz))

#### 🐛 Bug Fix

- fix(readoptStyles): only attempt to readopt constructed stylesheets if the element instance has an `ownerDocument.defaultView` value set [#20](https://github.com/tyler-technologies-oss/forge-core/pull/20) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))

---

# v3.0.1 (Wed Aug 21 2024)

#### 🐛 Bug Fix

- fix: revert package exports and type for legacy tooling compatibility and remove invalid sourcemaps [#19](https://github.com/tyler-technologies-oss/forge-core/pull/19) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: remove node engine from package.json [#18](https://github.com/tyler-technologies-oss/forge-core/pull/18) ([@DRiFTy17](https://github.com/DRiFTy17))

#### ⚠️ Pushed to `main`

- chore: allow `package.json` changes to trigger build ([@DRiFTy17](https://github.com/DRiFTy17))
- Merge branch 'main' of https://github.com/tyler-technologies-oss/forge-core ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.0.0 (Mon Jun 10 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Alex Oxthorn ([@Alex-Oxthorn](https://github.com/Alex-Oxthorn)), for all your work!

#### 💥 Breaking Change

- feat: initial 3.0 GA release [#17](https://github.com/tyler-technologies-oss/forge-core/pull/17) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🚀 Enhancement

- feat(custom-elements): add new `readoptStyles()` helper and adjust how CSS is applied to shadow roots [#14](https://github.com/tyler-technologies-oss/forge-core/pull/14) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(deepSearchByValuePredicate): adds deepSearchByValuePredicate object util function [#8](https://github.com/tyler-technologies-oss/forge-core/pull/8) ([@Alex-Oxthorn](https://github.com/Alex-Oxthorn))

#### 🐛 Bug Fix

- fix: don't create version branch ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: trigger release workflow ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: upgrade auto to fix release failure [#13](https://github.com/tyler-technologies-oss/forge-core/pull/13) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Alex Oxthorn ([@Alex-Oxthorn](https://github.com/Alex-Oxthorn))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# (Wed Feb 21 2024)

#### 🐛 Bug Fix

- feat(component-utils): prefer `adoptedStyleSheets` if supported, fall back to `<style>` when unsupported while also allowing for `nonce` to be provided now [#11](https://github.com/tyler-technologies-oss/forge-core/pull/11) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.3.0 (Fri Aug 04 2023)

#### 🚀 Enhancement

- feat(dom-utils): allow for specifying `document` instance in `getActiveElement()` [#9](https://github.com/tyler-technologies-oss/forge-core/pull/9) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.2.2 (Mon Feb 27 2023)

#### 🐛 Bug Fix

- fix(media-observer): maintain untouched values in range media observer [#7](https://github.com/tyler-technologies-oss/forge-core/pull/7) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 1

- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.2.1 (Thu Feb 23 2023)

#### 🐛 Bug Fix

- fix(media-observer): add missing features to boolean media feature type [#6](https://github.com/tyler-technologies-oss/forge-core/pull/6) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 1

- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.2.0 (Wed Feb 22 2023)

#### 🚀 Enhancement

- feat(media-observer): create media observer [#5](https://github.com/tyler-technologies-oss/forge-core/pull/5) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 1

- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.1.0 (Thu Aug 18 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech)), for all your work!

#### 🚀 Enhancement

- feat(resize): create forge resize observer [#4](https://github.com/tyler-technologies-oss/forge-core/pull/4) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(automation): update to use oss shared workflows ([@DRiFTy17](https://github.com/DRiFTy17))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/tyler-technologies-oss/forge-core ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.0.0 (Fri Jun 24 2022)

#### 🚀 Enhancement

- feat: oss prep [#3](https://github.com/tyler-technologies-oss/forge-core/pull/3) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
