# v2.11.0 (Tue Dec 06 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Josh Pierro ([@joshpierro](https://github.com/joshpierro)), for all your work!

#### 🚀 Enhancement

- feat(badge): added leading and trailing slots with support for icons [#185](https://github.com/tyler-technologies-oss/forge/pull/185) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(field): fixed incorrect checking for presence of input/textarea [#195](https://github.com/tyler-technologies-oss/forge/pull/195) ([@fallXone](https://github.com/fallXone))
- fix(button-toggle-group): fixed `forge-button-toggle-group-change` typings [#190](https://github.com/tyler-technologies-oss/forge/pull/190) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: update templates and fix license text in sb [#193](https://github.com/tyler-technologies-oss/forge/pull/193) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(legal): use forge logo and add license info [#192](https://github.com/tyler-technologies-oss/forge/pull/192) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(button-toggle): corrects spelling error [#189](https://github.com/tyler-technologies-oss/forge/pull/189) ([@joshpierro](https://github.com/joshpierro))
- chore: update Angular framework usage [#182](https://github.com/tyler-technologies-oss/forge/pull/182) ([@MikeMatusz](https://github.com/MikeMatusz))

#### 📝 Documentation

- docs(app-bar): fixed app-bar-profile-button references to use correct element name [#187](https://github.com/tyler-technologies-oss/forge/pull/187) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 5

- Conner Fallone ([@fallXone](https://github.com/fallXone))
- Josh Pierro ([@joshpierro](https://github.com/joshpierro))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.10.1 (Thu Nov 03 2022)

#### 🐛 Bug Fix

- fix(slider): fixed propagation to underlying implementation state for `min`, `max`, and `step` properties [#180](https://github.com/tyler-technologies-oss/forge/pull/180) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.10.0 (Fri Oct 28 2022)

#### 🚀 Enhancement

- feat: expand nullable types to allow undefined [#160](https://github.com/tyler-technologies-oss/forge/pull/160) ([@MikeMatusz](https://github.com/MikeMatusz))

#### 🐛 Bug Fix

- fix(table): fixed default select height in column filter [#176](https://github.com/tyler-technologies-oss/forge/pull/176) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(paginator): fixed change event state reconciliation [#172](https://github.com/tyler-technologies-oss/forge/pull/172) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore(build): update Forge CLI to enable ESM minification [#173](https://github.com/tyler-technologies-oss/forge/pull/173) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(keyboard-shortcut): add storybook docs for keyboard shortcuts [#174](https://github.com/tyler-technologies-oss/forge/pull/174) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- chore: optimize pr-check workflow to limit dependency installation to [#171](https://github.com/tyler-technologies-oss/forge/pull/171) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: fix actions workflow deprecations [#170](https://github.com/tyler-technologies-oss/forge/pull/170) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.9.0 (Wed Oct 19 2022)

#### 🚀 Enhancement

- create new split view component [#2](https://github.com/tyler-technologies-oss/forge/pull/2) ([@samrichardsontylertech](https://github.com/samrichardsontylertech) [@DRiFTy17](https://github.com/DRiFTy17))
- feat(app-bar-profile-button): allow for customizing the text on the sign out and profile buttons [#167](https://github.com/tyler-technologies-oss/forge/pull/167) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(table): ignore filter row checkboxes when toggling select column state [#169](https://github.com/tyler-technologies-oss/forge/pull/169) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip): change default `height` style to use `auto` to accommodate content height [#166](https://github.com/tyler-technologies-oss/forge/pull/166) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: fixed duplicate asterisk characters on required form field labels in Safari [#168](https://github.com/tyler-technologies-oss/forge/pull/168) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): fixed a bug where opening the dropdown via down arrow key would not activate the selected option [#163](https://github.com/tyler-technologies-oss/forge/pull/163) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fix to ensure `--forge-select-font-size` CSS custom prop… [#164](https://github.com/tyler-technologies-oss/forge/pull/164) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-picker): _onToday zeros out time values [#162](https://github.com/tyler-technologies-oss/forge/pull/162) ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))
- chore: support node 16 [#157](https://github.com/tyler-technologies-oss/forge/pull/157) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: post release notes to slack [#156](https://github.com/tyler-technologies-oss/forge/pull/156) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Jake Crawford ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.8.0 (Tue Oct 11 2022)

#### 🚀 Enhancement

- feat: showHourOptions for time-picker [#149](https://github.com/tyler-technologies-oss/forge/pull/149) ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))

#### 🐛 Bug Fix

- fix(drawer): fixes drawer initialization state when defaulting to closed [#150](https://github.com/tyler-technologies-oss/forge/pull/150) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(file-picker): fix helper text slotted styles and dimensions [#155](https://github.com/tyler-technologies-oss/forge/pull/155) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(table): add checkbox to component dependencies [#152](https://github.com/tyler-technologies-oss/forge/pull/152) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(inline-message): set host to be a block level element [#151](https://github.com/tyler-technologies-oss/forge/pull/151) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Jake Crawford ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.7.0 (Fri Sep 30 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Zachary Silverman ([@zacharysilverman](https://github.com/zacharysilverman)), for all your work!

#### 🚀 Enhancement

- feat: allow cancellation of pagination [#145](https://github.com/tyler-technologies-oss/forge/pull/145) ([@zacharysilverman](https://github.com/zacharysilverman) [@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(button-toggle-group): allow falsy values in change event [#143](https://github.com/tyler-technologies-oss/forge/pull/143) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(chip-field): add missing slot docs [#142](https://github.com/tyler-technologies-oss/forge/pull/142) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Zachary Silverman ([@zacharysilverman](https://github.com/zacharysilverman))

---

# v2.6.0 (Tue Sep 06 2022)

#### 🚀 Enhancement

- feat(metadata): Update Forge CLI and add JSDoc for Custom Elements Manifest [#138](https://github.com/tyler-technologies-oss/forge/pull/138) ([@MikeMatusz](https://github.com/MikeMatusz))

#### 📝 Documentation

- chore(docs): fix css custom prop docs for floating action button [#137](https://github.com/tyler-technologies-oss/forge/pull/137) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))

---

# v2.5.0 (Tue Aug 23 2022)

#### 🚀 Enhancement

- fix(select): fix a11y when navigating options via keyboard and screen reader [#135](https://github.com/tyler-technologies-oss/forge/pull/135) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(drawer): fixed popup positioning within scrollable drawer content [#134](https://github.com/tyler-technologies-oss/forge/pull/134) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: fix broken links [#131](https://github.com/tyler-technologies-oss/forge/pull/131) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(theme): use hex value without opacity for `border-color` theme style [#126](https://github.com/tyler-technologies-oss/forge/pull/126) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(label-value): remove explicit `line-height` to support wrapping value text [#127](https://github.com/tyler-technologies-oss/forge/pull/127) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed placeholder text alignment when no label is set [#129](https://github.com/tyler-technologies-oss/forge/pull/129) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.4.0 (Tue Aug 09 2022)

#### 🚀 Enhancement

- feat(storybook): add GA code snippet [#120](https://github.com/tyler-technologies-oss/forge/pull/120) ([@nickonometry](https://github.com/nickonometry))

#### 🐛 Bug Fix

- fix(theme): Fix elevation references in shadow mixin [#125](https://github.com/tyler-technologies-oss/forge/pull/125) ([@MikeMatusz](https://github.com/MikeMatusz))

#### ⚠️ Pushed to `main`

- chore: added note to roadmap about current state of library ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: add note about dense attribute in icon button docs ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v2.3.0 (Mon Jul 18 2022)

#### 🚀 Enhancement

- revert(circular-progress): reverted changes to radius customization t… [#119](https://github.com/tyler-technologies-oss/forge/pull/119) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.2.1 (Mon Jul 18 2022)

#### 🐛 Bug Fix

- fix(circular-progress): fixed visibility of component on Firefox and Safari [#118](https://github.com/tyler-technologies-oss/forge/pull/118) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.2.0 (Fri Jul 15 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Nick Andrews ([@nickonometry](https://github.com/nickonometry)), for all your work!

#### 🚀 Enhancement

- feat: added tooltips to the paginator and updated dependencies [#99](https://github.com/tyler-technologies-oss/forge/pull/99) ([@nickonometry](https://github.com/nickonometry) [@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(circular-progress): fixed default radius of circle to fill available height and width [#116](https://github.com/tyler-technologies-oss/forge/pull/116) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(label-value): fixed label and value alignment [#114](https://github.com/tyler-technologies-oss/forge/pull/114) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: update CDN deployment strategy [#107](https://github.com/tyler-technologies-oss/forge/pull/107) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🏎 Performance

- perf: deferred ripple instantiation in icon-button and button until first user interaction [#115](https://github.com/tyler-technologies-oss/forge/pull/115) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- chore(storybook): docs updates [#109](https://github.com/tyler-technologies-oss/forge/pull/109) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v2.1.0 (Thu Jun 30 2022)

#### 🚀 Enhancement

- feat: include bundled ESM JavaScript sources in distirbution npm package `dist/esm/` directory [#106](https://github.com/tyler-technologies-oss/forge/pull/106) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- chore: simplify build-pr workflow when determing wf-config as we don'… [#104](https://github.com/tyler-technologies-oss/forge/pull/104) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: make pr builds smarter by only performing tasks if relevant files change [#103](https://github.com/tyler-technologies-oss/forge/pull/103) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: update shared workflow versions [#102](https://github.com/tyler-technologies-oss/forge/pull/102) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: enable storybook automation [#101](https://github.com/tyler-technologies-oss/forge/pull/101) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.0.0 (Fri Jun 24 2022)

#### 🚀 Enhancement

- feat: oss prep [#100](https://github.com/tyler-technologies-oss/forge/pull/100) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

