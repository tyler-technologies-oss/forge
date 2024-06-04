import{j as t}from"./jsx-runtime-BAS5-Ho0.js";import{u as n}from"./index-DwjBEu7l.js";import{M as s,f as h}from"./index-DVRoCKGW.js";import"./iframe-D-hFddMM.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";const l=`# v2.24.1 (Tue May 21 2024)

#### 🐛 Bug Fix

- fix(menu): fixed a bug where pressing the tab key would select the active option [#573](https://github.com/tyler-technologies-oss/forge/pull/573) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(app-bar-notification-button): fixed a bug where the badge count could not be unset and updated the logic to not render the count [#567](https://github.com/tyler-technologies-oss/forge/pull/567) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.24.0 (Mon May 13 2024)

#### 🚀 Enhancement

- feat(list-item): add \`deactivateRipple()\` method to allow for manually removing the "pressed" ripple state if needed [#559](https://github.com/tyler-technologies-oss/forge/pull/559) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(table): fixed a bug where the table sort icon rotation could get out sync [#558](https://github.com/tyler-technologies-oss/forge/pull/558) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.23.1 (Thu May 02 2024)

#### 🐛 Bug Fix

- fix(list-item): removed legacy internal mousedown handler that was preventing pointer events if already focused [#551](https://github.com/tyler-technologies-oss/forge/pull/551) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(badge): fixed a bug where badge text would not ellipse when overflowing [#552](https://github.com/tyler-technologies-oss/forge/pull/552) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.23.0 (Thu Apr 25 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Van Do ([@vando94](https://github.com/vando94)), for all your work!

#### 🚀 Enhancement

- feat: added month change event for date-picker and date-range-picker [#543](https://github.com/tyler-technologies-oss/forge/pull/543) ([@vando94](https://github.com/vando94))

#### 🐛 Bug Fix

- fix(text-field): remove legacy \`<label>\` & \`<input>\` DOM order manipulation [#544](https://github.com/tyler-technologies-oss/forge/pull/544) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Van Do ([@vando94](https://github.com/vando94))

---

# v2.22.1 (Mon Apr 01 2024)

#### 🐛 Bug Fix

- fix(list-item): fixed a bug where clicking list items would uncheck slotted radio buttons [#516](https://github.com/tyler-technologies-oss/forge/pull/516) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.22.0 (Fri Mar 22 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, null[@kevaltyler](https://github.com/kevaltyler), for all your work!

#### 🚀 Enhancement

- feat:  update \`forge-hyperlink\` CSS class to use \`text-decoration: underline\` [#499](https://github.com/tyler-technologies-oss/forge/pull/499) ([@kevaltyler](https://github.com/kevaltyler))

#### Authors: 1

- [@kevaltyler](https://github.com/kevaltyler)

---

# v2.21.3 (Thu Feb 22 2024)

#### 🐛 Bug Fix

- chore: upgrade auto to fix release [#479](https://github.com/tyler-technologies-oss/forge/pull/479) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat: bump \`@tylertech/forge-core\` to \`2.3.1\` to use constructable stylesheets by default [#475](https://github.com/tyler-technologies-oss/forge/pull/475) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.21.2 (Thu Feb 15 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Eli Ganem ([@eliganemtyler](https://github.com/eliganemtyler)), for all your work!

#### 🐛 Bug Fix

- fix(date-picker): open calendar on min enabled month when current month is after max date [#472](https://github.com/tyler-technologies-oss/forge/pull/472) ([@samrichardsontylertech](https://github.com/samrichardsontylertech) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(menu): map deprecated \`icon\` property to \`leadingIcon\` when options are loaded from factory [#461](https://github.com/tyler-technologies-oss/forge/pull/461) ([@eliganemtyler](https://github.com/eliganemtyler))
- fix(paginator): revert naive focus management changes in favor of default browser implementation when focused elements are disabled [#468](https://github.com/tyler-technologies-oss/forge/pull/468) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list): fixed a bug where keyboard navigation was not scoped within sub-lists [#458](https://github.com/tyler-technologies-oss/forge/pull/458) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): fixed a bug where opening dialogs with focused Forge elements that use the ripple could be misaligned [#457](https://github.com/tyler-technologies-oss/forge/pull/457) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(open-icon): auto-register correct "horizontal" icon [#449](https://github.com/tyler-technologies-oss/forge/pull/449) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: identify readonly properties in custom elements manifest [#465](https://github.com/tyler-technologies-oss/forge/pull/465) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(calendar): fixed a bug where the calendar would not reflect the correct month if the max date is before the current the month [#448](https://github.com/tyler-technologies-oss/forge/pull/448) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 4

- Eli Ganem ([@eliganemtyler](https://github.com/eliganemtyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.21.1 (Thu Dec 14 2023)

#### 🐛 Bug Fix

- fix(date-range-picker): fixed a bug where the "to" value was not being rendered in \`<input>\` when initialized with a default value [#446](https://github.com/tyler-technologies-oss/forge/pull/446) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(expansion-panel): remove invalid \`aria-expanded\` attribute set on header [#443](https://github.com/tyler-technologies-oss/forge/pull/443) ([@samrichardsontylertech](https://github.com/samrichardsontylertech) [@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.21.0 (Mon Nov 27 2023)

#### 🚀 Enhancement

- feat(paginator): added new \`rangeLabelCallback\` property to allow for controlling range label text externally [#436](https://github.com/tyler-technologies-oss/forge/pull/436) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(menu): fixed \`MenuOptionFactory\` typings to support \`IMenuOptionGroup\` [#428](https://github.com/tyler-technologies-oss/forge/pull/428) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(button-area): add header slot to expansion panel example [#429](https://github.com/tyler-technologies-oss/forge/pull/429) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.20.1 (Thu Nov 09 2023)

#### 🐛 Bug Fix

- fix: updated immutability patterns [#425](https://github.com/tyler-technologies-oss/forge/pull/425) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.20.0 (Fri Oct 27 2023)

#### 🚀 Enhancement

- feat(chip field): add member on blur [#408](https://github.com/tyler-technologies-oss/forge/pull/408) ([@nickonometry](https://github.com/nickonometry) [@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(paginator): fix focus management to properly account for state updates while the element is already focused [#415](https://github.com/tyler-technologies-oss/forge/pull/415) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(table): sortable column headers will now use \`<button>\` element for a11y purposes [#416](https://github.com/tyler-technologies-oss/forge/pull/416) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed a bug where options that contain leading whitespace could not be selected via keyboard filtering [#414](https://github.com/tyler-technologies-oss/forge/pull/414) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v2.19.1 (Thu Oct 19 2023)

#### 🐛 Bug Fix

- chore(button-area): add build file and jsdoc [#412](https://github.com/tyler-technologies-oss/forge/pull/412) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 1

- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.19.0 (Thu Oct 12 2023)

#### 🚀 Enhancement

- feat(button-area): create button area component [#326](https://github.com/tyler-technologies-oss/forge/pull/326) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(expansion-panel): fixed a bug where calling \`setOpenImmediate()\` while an expand/collapse animation is already running would not cancel the active animation [#406](https://github.com/tyler-technologies-oss/forge/pull/406) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(text-field): fixed a bug where the label was not being initialized properly when toggling density dynamically [#404](https://github.com/tyler-technologies-oss/forge/pull/404) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(paginator): fixed how \`offset\` updates \`pageIndex\` along with updates to focus management [#402](https://github.com/tyler-technologies-oss/forge/pull/402) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.18.1 (Wed Oct 04 2023)

#### 🐛 Bug Fix

- fix(paginator): fixed a bug where focus was lost when disabling the page buttons dynamically [#398](https://github.com/tyler-technologies-oss/forge/pull/398) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(icon): move aria-hidden from host element to svg [#396](https://github.com/tyler-technologies-oss/forge/pull/396) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.18.0 (Wed Sep 27 2023)

#### 🚀 Enhancement

- feat(autocomplete): added new \`forceFilter()\` method to allow for dynamically updating the options of an autocomplete [#391](https://github.com/tyler-technologies-oss/forge/pull/391) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(list-dropdown): added configuration for setting secondary labels and for providing additional configuration to leading/trailing icon component elements [#393](https://github.com/tyler-technologies-oss/forge/pull/393) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(keyboard-shortcut): add activate callback [#367](https://github.com/tyler-technologies-oss/forge/pull/367) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(autocomplete): fixed a bug where the filter text was not getting removed when the clear button is clicked [#390](https://github.com/tyler-technologies-oss/forge/pull/390) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(calendar): fixed a bug where an exception was being thrown if min/max was set and caused the current month to have no selectable dates. The calendar will now automatically move to the closest month with a selectable date [#392](https://github.com/tyler-technologies-oss/forge/pull/392) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip-field): don't wrap leading/trailing icons [#386](https://github.com/tyler-technologies-oss/forge/pull/386) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(date-picker, time-picker, date-range-picker): select mask on focus if shown [#385](https://github.com/tyler-technologies-oss/forge/pull/385) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(chip-field): don't propagate click if disabled [#384](https://github.com/tyler-technologies-oss/forge/pull/384) ([@MikeMatusz](https://github.com/MikeMatusz))

#### Authors: 3

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.17.0 (Tue Aug 29 2023)

#### 🚀 Enhancement

- feat(popup): add popup ref to close event, emit from host [#365](https://github.com/tyler-technologies-oss/forge/pull/365) ([@MikeMatusz](https://github.com/MikeMatusz))

#### Authors: 1

- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))

---

# v2.16.6 (Mon Aug 21 2023)

#### 🐛 Bug Fix

- fix(list-item): fixed a bug where setting \`dense\` wasn't applying the correct height [#358](https://github.com/tyler-technologies-oss/forge/pull/358) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: fixed a bug where detecting the active element after being adopted into a new document could incorrectly reflect the wrong element [#355](https://github.com/tyler-technologies-oss/forge/pull/355) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.16.5 (Wed Jul 26 2023)

#### 🐛 Bug Fix

- fix(chip-field): fix floating label state [#350](https://github.com/tyler-technologies-oss/forge/pull/350) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.16.4 (Mon Jul 24 2023)

#### 🐛 Bug Fix

- fix(date-picker): fixed a bug where the \`locale\` of the calendar could not be set through the date picker element [#344](https://github.com/tyler-technologies-oss/forge/pull/344) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(color-picker): fixed a bug where manually entering a hex value would not accept characters until a valid hex string value and length was reached [#346](https://github.com/tyler-technologies-oss/forge/pull/346) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(stepper): fixed a bug where the vertical state was not being applied if the \`steps\` property was changed dynamically [#345](https://github.com/tyler-technologies-oss/forge/pull/345) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chips): fixed a bug where the text was not centered if the width was less than than the min-width of the chip [#347](https://github.com/tyler-technologies-oss/forge/pull/347) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.16.3 (Fri Jun 23 2023)

#### 🐛 Bug Fix

- fix(paginator): fixed a bug where the paginator was not reflecting the current page size after selection in the page size select [#333](https://github.com/tyler-technologies-oss/forge/pull/333) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(text-to-color): convert text input to uppercase [#334](https://github.com/tyler-technologies-oss/forge/pull/334) ([@zacharysilverman](https://github.com/zacharysilverman))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Zachary Silverman ([@zacharysilverman](https://github.com/zacharysilverman))

---

# v2.16.2 (Thu Jun 22 2023)

#### 🐛 Bug Fix

- fix(autocomplete): fixed a bug where selecting appended options in multiple mode would incorrectly select the wrong options in the UI dropdown [#330](https://github.com/tyler-technologies-oss/forge/pull/330) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.16.1 (Wed Jun 14 2023)

#### 🐛 Bug Fix

- fix(split-view): query only immediate child panels [#328](https://github.com/tyler-technologies-oss/forge/pull/328) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(date-picker): always dispatch the change event when a valid date is entered if \`allowInvalidDate\` is \`true\` [#325](https://github.com/tyler-technologies-oss/forge/pull/325) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.16.0 (Thu Jun 08 2023)

#### 🚀 Enhancement

- fix(expansion-panel): remove internal a11y attributes [#322](https://github.com/tyler-technologies-oss/forge/pull/322) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- feat(autocomplete): add \`filterFocusFirst\` property [#313](https://github.com/tyler-technologies-oss/forge/pull/313) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(masks): time-picker, date-picker, date-range-picker > updates to mask behavior [#318](https://github.com/tyler-technologies-oss/forge/pull/318) ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(select, autocomplete): show option label when one option is selected in multiple mode [#320](https://github.com/tyler-technologies-oss/forge/pull/320) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed a bug where filtering options with uppercase letters was not working [#319](https://github.com/tyler-technologies-oss/forge/pull/319) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(stack): fix stretch styles [#321](https://github.com/tyler-technologies-oss/forge/pull/321) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(stack): fix to allow string values to be provided to the \`alignment\` property/attribute (instead of just an \`enum\` value) when strict typing is used [#317](https://github.com/tyler-technologies-oss/forge/pull/317) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Jake Crawford ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.15.0 (Tue May 23 2023)

#### 🚀 Enhancement

- feat(app-bar-profile-button): added new \`avatarIcon\` property to allow for rendering an icon from the \`IconRegistry\` instead of text [#312](https://github.com/tyler-technologies-oss/forge/pull/312) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- Feat/stack component documentation [#311](https://github.com/tyler-technologies-oss/forge/pull/311) ([@nickonometry](https://github.com/nickonometry))

#### ⚠️ Pushed to \`main\`

- chore: fixup changelog ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v2.14.0 (Tue May 16 2023)

#### 🚀 Enhancement

- feat: created new \`<forge-stack>\` component [#280](https://github.com/tyler-technologies-oss/forge/pull/280) ([@nickonometry](https://github.com/nickonometry))
- feat(view-switcher): added new \`--forge-view-switcher-width\` CSS custom property [#295](https://github.com/tyler-technologies-oss/forge/pull/295) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(autocomplete): added new \`filterText\` property/attribute to allow for setting the filter text state manually (only applies when \`allowUnmatched\` is enabled) [#294](https://github.com/tyler-technologies-oss/forge/pull/294) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat: added CSS custom property for controlling the internal \`border-style\` on select, text-field, and chip-field [#286](https://github.com/tyler-technologies-oss/forge/pull/286) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(toolbar): various toolbar improvements [#283](https://github.com/tyler-technologies-oss/forge/pull/283) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(table): added new method \`isColumnHidden()\` [#279](https://github.com/tyler-technologies-oss/forge/pull/279) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(table): provided the column index to the \`TableTemplateBuilder\` [#278](https://github.com/tyler-technologies-oss/forge/pull/278) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat: allow for using \`<a>\` element in place of \`<button>\` in \`<forge-button>\`, \`<forge-icon-button>\` and \`<forge-fab>\` components [#276](https://github.com/tyler-technologies-oss/forge/pull/276) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(select): added the ability to specify if option text should wrap in the dropdown, and updated the default popup behavior to set a \`max-width: 100vw\` style to ensure that the popup cannot be larger than the width of screen (which allows for options to wrap if necessary) [#266](https://github.com/tyler-technologies-oss/forge/pull/266) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(app-bar-notification-button): allow icon to be set to a user specified icon [#259](https://github.com/tyler-technologies-oss/forge/pull/259) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix: reference \`@material/*\` packages instead of \`material-components-web\` meta package to avoid dependency conflicts [#307](https://github.com/tyler-technologies-oss/forge/pull/307) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(time-picker): improve input mask usability [#306](https://github.com/tyler-technologies-oss/forge/pull/306) ([@DRiFTy17](https://github.com/DRiFTy17))
- perf: checkbox, radio, and switch will now instantiate ripple upon first user interaction [#285](https://github.com/tyler-technologies-oss/forge/pull/285) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-range-picker): allow for setting \`value\` to \`null\` to clear the component value [#265](https://github.com/tyler-technologies-oss/forge/pull/265) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): always define the \`arrow_drop_down\` icon [#262](https://github.com/tyler-technologies-oss/forge/pull/262) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: separate temp storybook deployment from build-pr workflow [#237](https://github.com/tyler-technologies-oss/forge/pull/237) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-picker): fixed a bug where a 4-digit year was not correctly being masked with a leading 0 [#236](https://github.com/tyler-technologies-oss/forge/pull/236) ([@Lillious](https://github.com/Lillious) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(busy-indicator): fixed various accessibility issues [#298](https://github.com/tyler-technologies-oss/forge/pull/298) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip): fixed accessibility issues [#201](https://github.com/tyler-technologies-oss/forge/pull/301) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): fixed a bug where moving the dialog within a scroll container would calculate an incorrect position [#308](https://github.com/tyler-technologies-oss/forge/pull/308) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: stop propagation on \`Escape\` key events [#302](https://github.com/tyler-technologies-oss/forge/pull/302) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(quantity-field): remove increment and decrement buttons from the tab order by default [#297](https://github.com/tyler-technologies-oss/forge/pull/297) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip-field): fixed a bug where addon-end slot was not expanding full height as the field grew [#290](https://github.com/tyler-technologies-oss/forge/pull/290) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(menu): fixed toggle element initialization [#293](https://github.com/tyler-technologies-oss/forge/pull/293) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(menu): fixed a bug where cascading child menus would overlap when clipped [#261](https://github.com/tyler-technologies-oss/forge/pull/261) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip-field): fixed a bug where clicking on the field would not propagate the click event [#289](https://github.com/tyler-technologies-oss/forge/pull/289) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): remove unused \`::before\` pseudo element from slotted elements [#284](https://github.com/tyler-technologies-oss/forge/pull/284) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(file-picker): allow for setting disabled state before child \`<button>\` is in DOM [#281](https://github.com/tyler-technologies-oss/forge/pull/281) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed a bug where the option group \`builder\` property was not being called [#274](https://github.com/tyler-technologies-oss/forge/pull/274) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): keep dropdown open when selecting items in stateless + multiple mode [#269](https://github.com/tyler-technologies-oss/forge/pull/269) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed a bug where the dropdown was not opening when pressing up/down arrow keys, and fixed a11y announcements when the value text changes [#264](https://github.com/tyler-technologies-oss/forge/pull/264) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(table): fixed a bug where the \`pointer\` cursor could be lost when \`allowRowClick\` is enabled [#288](https://github.com/tyler-technologies-oss/forge/pull/288) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(linear-progress): updated the default \`buffer\` state to be \`1\` instead of \`0\` [#282](https://github.com/tyler-technologies-oss/forge/pull/282) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): fixed a bug where the \`wrap\` property in list-item component was not allowing for text to wrap on slotted elements [#266](https://github.com/tyler-technologies-oss/forge/pull/266) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): fixed typings and leading icon render order [#273](https://github.com/tyler-technologies-oss/forge/pull/273) ([@Alex-Oxthorn](https://github.com/Alex-Oxthorn))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))
- Alex Oxthorn ([@Alex-Oxthorn](https://github.com/Alex-Oxthorn))
- Logan Brown ([@Lillious](https://github.com/Lillious))

---

# v2.13.2 (Tue Feb 14 2023)

#### 🐛 Bug Fix

- bug: number pad enter for time-picker [#233](https://github.com/tyler-technologies-oss/forge/pull/233) ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))
- use Vite for local dev [#234](https://github.com/tyler-technologies-oss/forge/pull/234) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Jake Crawford ([@jake-crawford-tyler](https://github.com/jake-crawford-tyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.13.1 (Fri Feb 10 2023)

#### 🐛 Bug Fix

- perf(list-item): delay ripple creation [#231](https://github.com/tyler-technologies-oss/forge/pull/231) ([@MikeMatusz](https://github.com/MikeMatusz))

#### Authors: 1

- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))

---

# v2.13.0 (Wed Feb 08 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Alan Collins ([@Alanoll](https://github.com/Alanoll)), for all your work!

#### 🚀 Enhancement

- feat(list): added a badge demo to the list [#224](https://github.com/tyler-technologies-oss/forge/pull/224) ([@nickonometry](https://github.com/nickonometry))

#### 🐛 Bug Fix

- fix(list-item): fixed a bug where the UI could incorrectly reflect the component state [#225](https://github.com/tyler-technologies-oss/forge/pull/225) ([@Alanoll](https://github.com/Alanoll) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-range-picker): fixed a bug that allowed invalid date ranges [#226](https://github.com/tyler-technologies-oss/forge/pull/226) ([@Lillious](https://github.com/Lillious))

#### Authors: 4

- Alan Collins ([@Alanoll](https://github.com/Alanoll))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Logan Brown ([@Lillious](https://github.com/Lillious))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v2.12.4 (Sat Feb 04 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Logan Brown ([@Lillious](https://github.com/Lillious)), for all your work!

#### 🐛 Bug Fix

- fix(date-range-picker): fixed a bug that caused the end date to reset upon pressing t with the calendar open and end date selected ([@Lillious](https://github.com/Lillious))
- fix(field): fixed a bug where height of helper-text element was incorrect [#222](https://github.com/tyler-technologies-oss/forge/pull/222) ([@Lillious](https://github.com/Lillious) [@DRiFTy17](https://github.com/DRiFTy17))

#### ⚠️ Pushed to \`main\`

- Merge branch 'main' of https://github.com/tyler-technologies-oss/forge ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Logan Brown ([@Lillious](https://github.com/Lillious))

---

# v2.12.3 (Fri Feb 03 2023)

#### 🐛 Bug Fix

- fix(split-view): added an overlay while dragging to maintain listeners and cursor styles [#220](https://github.com/tyler-technologies-oss/forge/pull/220) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(switch): fixed a bug where the UI could incorrectly reflect the component state [#215](https://github.com/tyler-technologies-oss/forge/pull/215) ([@DRiFTy17](https://github.com/DRiFTy17))

#### ⚠️ Pushed to \`main\`

- chore(auto-pr-check): use \`pull_request_target\` ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.12.2 (Wed Jan 11 2023)

#### 🐛 Bug Fix

- fix(select): fixed a bug where the UI was not reflecting the selected value if the option values are changed after the component value is set [#212](https://github.com/tyler-technologies-oss/forge/pull/212) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.12.1 (Wed Jan 04 2023)

#### 🐛 Bug Fix

- Fix/popup position [#208](https://github.com/tyler-technologies-oss/forge/pull/208) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.12.0 (Tue Jan 03 2023)

#### 🐛 Bug Fix

- fix(split-view): avoid updating size and accessibility of closed panels [#202](https://github.com/tyler-technologies-oss/forge/pull/202) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- docs(split-view): add JSDoc for manifest [#205](https://github.com/tyler-technologies-oss/forge/pull/205) ([@MikeMatusz](https://github.com/MikeMatusz))

#### Authors: 2

- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.11.0 (Tue Dec 06 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Josh Pierro ([@joshpierro](https://github.com/joshpierro)), for all your work!

#### 🚀 Enhancement

- feat(badge): added leading and trailing slots with support for icons [#185](https://github.com/tyler-technologies-oss/forge/pull/185) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(field): fixed incorrect checking for presence of input/textarea [#195](https://github.com/tyler-technologies-oss/forge/pull/195) ([@fallXone](https://github.com/fallXone))
- fix(button-toggle-group): fixed \`forge-button-toggle-group-change\` typings [#190](https://github.com/tyler-technologies-oss/forge/pull/190) ([@DRiFTy17](https://github.com/DRiFTy17))
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

- fix(slider): fixed propagation to underlying implementation state for \`min\`, \`max\`, and \`step\` properties [#180](https://github.com/tyler-technologies-oss/forge/pull/180) ([@DRiFTy17](https://github.com/DRiFTy17))

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
- fix(chip): change default \`height\` style to use \`auto\` to accommodate content height [#166](https://github.com/tyler-technologies-oss/forge/pull/166) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: fixed duplicate asterisk characters on required form field labels in Safari [#168](https://github.com/tyler-technologies-oss/forge/pull/168) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): fixed a bug where opening the dropdown via down arrow key would not activate the selected option [#163](https://github.com/tyler-technologies-oss/forge/pull/163) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fix to ensure \`--forge-select-font-size\` CSS custom prop… [#164](https://github.com/tyler-technologies-oss/forge/pull/164) ([@DRiFTy17](https://github.com/DRiFTy17))
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
- fix(theme): use hex value without opacity for \`border-color\` theme style [#126](https://github.com/tyler-technologies-oss/forge/pull/126) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(label-value): remove explicit \`line-height\` to support wrapping value text [#127](https://github.com/tyler-technologies-oss/forge/pull/127) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed placeholder text alignment when no label is set [#129](https://github.com/tyler-technologies-oss/forge/pull/129) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v2.4.0 (Tue Aug 09 2022)

#### 🚀 Enhancement

- feat(storybook): add GA code snippet [#120](https://github.com/tyler-technologies-oss/forge/pull/120) ([@nickonometry](https://github.com/nickonometry))

#### 🐛 Bug Fix

- fix(theme): Fix elevation references in shadow mixin [#125](https://github.com/tyler-technologies-oss/forge/pull/125) ([@MikeMatusz](https://github.com/MikeMatusz))

#### ⚠️ Pushed to \`main\`

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

- feat: include bundled ESM JavaScript sources in distirbution npm package \`dist/esm/\` directory [#106](https://github.com/tyler-technologies-oss/forge/pull/106) ([@DRiFTy17](https://github.com/DRiFTy17))

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

`;function i(e){const o={h1:"h1",hr:"hr",...n(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{title:"About/Changelog"}),`
`,t.jsx(o.h1,{id:"changelog",children:"Changelog"}),`
`,t.jsx(o.hr,{}),`
`,t.jsx("br",{}),`
`,t.jsx(h,{children:l}),`
`,t.jsx("style",{children:`
  .sbdocs-content ~ div:has(.toc-wrapper) {
    display: none;
  }
`})]})}function f(e={}){const{wrapper:o}={...n(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(i,{...e})}):i(e)}export{f as default};
