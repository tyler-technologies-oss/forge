import{j as t,M as s,i as h}from"./blocks-DCVl9FwS.js";import{useMDXComponents as n}from"./index-Dfkfbl4d.js";import"./iframe-B-vVoffa.js";import"./_commonjsHelpers-CqkleIqs.js";const l=`# v3.9.2 (Wed Jul 02 2025)

:tada: This release contains work from a new contributor! :tada:

Thank you, Rob Jacobs ([@RobJacobs](https://github.com/RobJacobs)), for all your work!

#### 🐛 Bug Fix

- fix(expansion-panel): trigger toggle from keyup event [#955](https://github.com/tyler-technologies-oss/forge/pull/955) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: use modern styles for visually hidden content [#956](https://github.com/tyler-technologies-oss/forge/pull/956) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(overlay): do not hide overlay by default when clipped by ancestors [#952](https://github.com/tyler-technologies-oss/forge/pull/952) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-picker): remove timestamp when setting "today" date [#954](https://github.com/tyler-technologies-oss/forge/pull/954) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-picker): toggle button will inherit density of text field if necessary [#953](https://github.com/tyler-technologies-oss/forge/pull/953) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(badge): update gap spacing [#938](https://github.com/tyler-technologies-oss/forge/pull/938) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(table): remove head cell filter vertical align style (#915) [#948](https://github.com/tyler-technologies-oss/forge/pull/948) ([@RobJacobs](https://github.com/RobJacobs))
- chore: eslint v9 upgrade [#950](https://github.com/tyler-technologies-oss/forge/pull/950) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(typography): add link docs [#945](https://github.com/tyler-technologies-oss/forge/pull/945) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: update storybook [#944](https://github.com/tyler-technologies-oss/forge/pull/944) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Rob Jacobs ([@RobJacobs](https://github.com/RobJacobs))

---

# v3.9.1 (Thu Jun 12 2025)

#### 🐛 Bug Fix

- fix(tooltip): do not render empty tooltips [#942](https://github.com/tyler-technologies-oss/forge/pull/942) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(color-picker): fixed a bug related to the hex format and gradient cursor position [#941](https://github.com/tyler-technologies-oss/forge/pull/941) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(menu): use \`arrow_right_alt\` icon for cascading menus with v2 icons [#940](https://github.com/tyler-technologies-oss/forge/pull/940) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.9.0 (Mon Jun 09 2025)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Joe Nunnelley ([@JoeNunnelley](https://github.com/JoeNunnelley))

:heart: Beau Christian ([@bctt](https://github.com/bctt))

#### 🚀 Enhancement

- chore(deps-dev): bump eazy-logger from 4.0.1 to 4.1.0 [#927](https://github.com/tyler-technologies-oss/forge/pull/927) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump koa from 2.15.3 to 2.16.1 [#925](https://github.com/tyler-technologies-oss/forge/pull/925) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- feat: update dependencies [#933](https://github.com/tyler-technologies-oss/forge/pull/933) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(popover): added new \`distinct\` API to support popover groups [#929](https://github.com/tyler-technologies-oss/forge/pull/929) ([@DRiFTy17](https://github.com/DRiFTy17))
- Feat/table before render event [#930](https://github.com/tyler-technologies-oss/forge/pull/930) ([@eliganemtyler](https://github.com/eliganemtyler))
- feat: upgrade tyler-icons to consolidated v2.x version [#911](https://github.com/tyler-technologies-oss/forge/pull/911) ([@DRiFTy17](https://github.com/DRiFTy17))
- Feat/table render event [#919](https://github.com/tyler-technologies-oss/forge/pull/919) ([@eliganemtyler](https://github.com/eliganemtyler))

#### 🐛 Bug Fix

- fix(dialog): fixed a bug where the backdrop could still be clicked if persistent is set after open [#937](https://github.com/tyler-technologies-oss/forge/pull/937) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: silence mixed-decls warning in vite [#934](https://github.com/tyler-technologies-oss/forge/pull/934) ([@DRiFTy17](https://github.com/DRiFTy17))
- Security Code Scanning - configuration files [#923](https://github.com/tyler-technologies-oss/forge/pull/923) ([@JoeNunnelley](https://github.com/JoeNunnelley))
- Dependency reviewer [#920](https://github.com/tyler-technologies-oss/forge/pull/920) ([@JoeNunnelley](https://github.com/JoeNunnelley))
- fix(popover): fixed a bug where popovers open after current were closing when hovered [#931](https://github.com/tyler-technologies-oss/forge/pull/931) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: consolidating various defineXComponent calls to use the standard forge-core defineCustomElement call [#912](https://github.com/tyler-technologies-oss/forge/pull/912) ([@bctt](https://github.com/bctt))
- fix(view-switcher): output height and width tokens on host element [#917](https://github.com/tyler-technologies-oss/forge/pull/917) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(toolbar): Apply min-width to grid center slots to allow overflows [#909](https://github.com/tyler-technologies-oss/forge/pull/909) ([@Alanoll](https://github.com/Alanoll))

#### 📝 Documentation

- Storybook v9 upgrade [#939](https://github.com/tyler-technologies-oss/forge/pull/939) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: add required field markup section for accessibility in TextFiel… [#936](https://github.com/tyler-technologies-oss/forge/pull/936) ([@Ross-Blakeney](https://github.com/Ross-Blakeney))
- docs(menu): add code snippet for setting up cascading menus [#932](https://github.com/tyler-technologies-oss/forge/pull/932) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 8

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@Ross-Blakeney](https://github.com/Ross-Blakeney)
- Alan Collins ([@Alanoll](https://github.com/Alanoll))
- Beau Christian ([@bctt](https://github.com/bctt))
- Eli Ganem ([@eliganemtyler](https://github.com/eliganemtyler))
- Joe Nunnelley ([@JoeNunnelley](https://github.com/JoeNunnelley))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.8.1 (Wed Apr 09 2025)

#### 🐛 Bug Fix

- fix(expansion-panel): fix connected check [#904](https://github.com/tyler-technologies-oss/forge/pull/904) ([@eliganemtyler](https://github.com/eliganemtyler) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): fixed a bug where multiple clicks on the interactive element could occur [#905](https://github.com/tyler-technologies-oss/forge/pull/905) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore(dialog): remove unused slide direction values from \`DialogAnimationType\` [#906](https://github.com/tyler-technologies-oss/forge/pull/906) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(paginator): add missing slot docs [#907](https://github.com/tyler-technologies-oss/forge/pull/907) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Eli Ganem ([@eliganemtyler](https://github.com/eliganemtyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.8.0 (Thu Apr 03 2025)

:tada: This release contains work from a new contributor! :tada:

Thank you, Eli Ganem ([@eliganemtyler](https://github.com/eliganemtyler)), for all your work!

#### 🚀 Enhancement

- feat: expose popover APIs in select, autocomplete, and menu [#899](https://github.com/tyler-technologies-oss/forge/pull/899) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(app-bar): remove default auto-theming in favor of scoped CSS variables and theme attribute [#894](https://github.com/tyler-technologies-oss/forge/pull/894) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(scrollbar): add \`variable\` mixin for consistent usage with other modules [#897](https://github.com/tyler-technologies-oss/forge/pull/897) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(dialog): add "reason" for why dialog is about to close to event \`detail\` [#875](https://github.com/tyler-technologies-oss/forge/pull/875) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(badge): refactor to use Lit [#879](https://github.com/tyler-technologies-oss/forge/pull/879) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(card): refactor to use Lit [#874](https://github.com/tyler-technologies-oss/forge/pull/874) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(dialog): automatically apply \`height: auto\` to slotted \`<forge-scaffold>\` [#866](https://github.com/tyler-technologies-oss/forge/pull/866) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: update imask dependency from 6.6.1 to 7.1.3 [#870](https://github.com/tyler-technologies-oss/forge/pull/870) ([@DRiFTy17](https://github.com/DRiFTy17))
- Feat/expansion panel target button [#775](https://github.com/tyler-technologies-oss/forge/pull/775) ([@eliganemtyler](https://github.com/eliganemtyler) [@DRiFTy17](https://github.com/DRiFTy17))
- chore: upgrade typescript to 5.8.2 [#871](https://github.com/tyler-technologies-oss/forge/pull/871) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix: readopt styles in Lit-based components when adopted [#900](https://github.com/tyler-technologies-oss/forge/pull/900) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(app-bar): remove default width to allow for wider logos without overriding styles [#896](https://github.com/tyler-technologies-oss/forge/pull/896) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(table): fixed a bug where the table head cell border could be hidden [#895](https://github.com/tyler-technologies-oss/forge/pull/895) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: updated how overlay positioning is handled when overflowing the viewport bounds [#883](https://github.com/tyler-technologies-oss/forge/pull/883) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): update accessible label and description handling for improved ARIA support [#888](https://github.com/tyler-technologies-oss/forge/pull/888) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: enable Lit-based component compatibility with Forge \`@customElement\` decorator [#889](https://github.com/tyler-technologies-oss/forge/pull/889) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fix duplicate \`label\` CSS part [#892](https://github.com/tyler-technologies-oss/forge/pull/892) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore(stepper-constants): fix to set explicit index type for compatibility [#887](https://github.com/tyler-technologies-oss/forge/pull/887) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): fixed an issue where aria-controls attr was being removed when the popover closed [#882](https://github.com/tyler-technologies-oss/forge/pull/882) ([@nickonometry](https://github.com/nickonometry))
- fix(table): fixed a bug where pressing space key would not trigger row selection handling [#877](https://github.com/tyler-technologies-oss/forge/pull/877) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(switch): improve contrast when disabled [#885](https://github.com/tyler-technologies-oss/forge/pull/885) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): fix regression related to slotted \`<button>\` width applying to other child elements [#884](https://github.com/tyler-technologies-oss/forge/pull/884) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(profile-card): focus profile button before sign out button if available [#881](https://github.com/tyler-technologies-oss/forge/pull/881) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(app-bar-profile-button): adjust default tooltip placement [#880](https://github.com/tyler-technologies-oss/forge/pull/880) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): use capturing keydown listener [#869](https://github.com/tyler-technologies-oss/forge/pull/869) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(button): use grid layout instead of flex to avoid text nodes collapsing [#867](https://github.com/tyler-technologies-oss/forge/pull/867) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: revert \`eslint-config-prettier\` version upgrade [#876](https://github.com/tyler-technologies-oss/forge/pull/876) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(avatar): hide text when image is rendered [#863](https://github.com/tyler-technologies-oss/forge/pull/863) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: move \`toggleState()\` helper to general utils and export from lib [#864](https://github.com/tyler-technologies-oss/forge/pull/864) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: bump dependency versions [#873](https://github.com/tyler-technologies-oss/forge/pull/873) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(paginator): add docs about the alternative variant [#878](https://github.com/tyler-technologies-oss/forge/pull/878) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: demo cleanup [#886](https://github.com/tyler-technologies-oss/forge/pull/886) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: improve documentation across various pages [#865](https://github.com/tyler-technologies-oss/forge/pull/865) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: fix demo style code formatting [#872](https://github.com/tyler-technologies-oss/forge/pull/872) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🔩 Dependency Updates

- chore: fix lint warning due to typescript compatibility with legacy shared lint rules package [#890](https://github.com/tyler-technologies-oss/forge/pull/890) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Eli Ganem ([@eliganemtyler](https://github.com/eliganemtyler))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v3.7.0 (Fri Mar 07 2025)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: John Bowen ([@jm-boop](https://github.com/jm-boop))

:heart: Scott Shirley ([@ScottTylerTech](https://github.com/ScottTylerTech))

#### 🚀 Enhancement

- feat(field): expose \`class="outline"\` element as a CSS part [#846](https://github.com/tyler-technologies-oss/forge/pull/846) ([@jm-boop](https://github.com/jm-boop))
- feat(menu): added support for option tooltips [#851](https://github.com/tyler-technologies-oss/forge/pull/851) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: add support for grouped menu options in documentation and stories [#858](https://github.com/tyler-technologies-oss/forge/pull/858) ([@ScottTylerTech](https://github.com/ScottTylerTech))

#### 🐛 Bug Fix

- fix(tabs): fixed a bug where the scroll buttons were not being shown/hidden when tabs are dynamically added/removed [#859](https://github.com/tyler-technologies-oss/forge/pull/859) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): improve overflow handling on slotted \`<button>\` elements [#860](https://github.com/tyler-technologies-oss/forge/pull/860) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): do not show required asterisk if no label is present [#861](https://github.com/tyler-technologies-oss/forge/pull/861) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): ensure that enabled field inputs use the text cursor [#856](https://github.com/tyler-technologies-oss/forge/pull/856) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(popover): enable compatibility with older browsers if \`checkVisibility()\` API is not available [#857](https://github.com/tyler-technologies-oss/forge/pull/857) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): fixed a bug where the inset label would not float if the value was set while the dropdown is open [#849](https://github.com/tyler-technologies-oss/forge/pull/849) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(time-picker): remove extra icon margin [#853](https://github.com/tyler-technologies-oss/forge/pull/853) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- chore: make storybook deployment dependent on release succeeding [#843](https://github.com/tyler-technologies-oss/forge/pull/843) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(design-tokens): rename "Theme" tokens page to "Color" [#854](https://github.com/tyler-technologies-oss/forge/pull/854) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(tooltip): improve anchoring docs [#850](https://github.com/tyler-technologies-oss/forge/pull/850) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: upgrade storybook to v8.6.0 [#848](https://github.com/tyler-technologies-oss/forge/pull/848) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 4

- John Bowen ([@jm-boop](https://github.com/jm-boop))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- Scott Shirley ([@ScottTylerTech](https://github.com/ScottTylerTech))

---

# v3.6.4 (Mon Feb 24 2025)

#### 🐛 Bug Fix

- fix(expansion-panel): fixed a rendering artifact caused by CSS animation [#844](https://github.com/tyler-technologies-oss/forge/pull/844) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.6.3 (Thu Feb 20 2025)

#### 🐛 Bug Fix

- fix(dialog): only force-capture focus when modal [#825](https://github.com/tyler-technologies-oss/forge/pull/825) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): only apply hover state when cursor is over container [#842](https://github.com/tyler-technologies-oss/forge/pull/842) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(field): apply default min height to slotted support text elements [#840](https://github.com/tyler-technologies-oss/forge/pull/840) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore(select): fix test syntax [#826](https://github.com/tyler-technologies-oss/forge/pull/826) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(badge): remove unnecessary style in demo code snippet [#841](https://github.com/tyler-technologies-oss/forge/pull/841) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.6.2 (Fri Feb 14 2025)

#### 🐛 Bug Fix

- fix(text-field): fixed a bug where the internal value change listener was not safely guarding types [#824](https://github.com/tyler-technologies-oss/forge/pull/824) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): fixed escape key bug when persistent and improved destroy logic [#823](https://github.com/tyler-technologies-oss/forge/pull/823) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.6.1 (Wed Feb 12 2025)

#### 🐛 Bug Fix

- fix(autocomplete): traverse composed slots when locating input element [#819](https://github.com/tyler-technologies-oss/forge/pull/819) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): reuse internal accessible elements if \`label\` or \`description\` change dynamically [#820](https://github.com/tyler-technologies-oss/forge/pull/820) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.6.0 (Tue Feb 11 2025)

#### 🚀 Enhancement

- feat(icon-button): add new \`pressed\` property/attribute and deprecate \`on\` property [#817](https://github.com/tyler-technologies-oss/forge/pull/817) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(switch): add new \`checked\` property/attribute and deprecate \`on\` property [#815](https://github.com/tyler-technologies-oss/forge/pull/815) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(dialog): add \`mode\` to global configuration [#816](https://github.com/tyler-technologies-oss/forge/pull/816) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(dialog): adjust default a11y semantics and add new \`label\` and \`description\` APIs for providing ARIA info [#810](https://github.com/tyler-technologies-oss/forge/pull/810) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(avatar): convert to Lit [#812](https://github.com/tyler-technologies-oss/forge/pull/812) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(tab-bar): setting \`activeTab\` property will no longer focus the tab [#814](https://github.com/tyler-technologies-oss/forge/pull/814) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(button-area): force root element to match size of host [#809](https://github.com/tyler-technologies-oss/forge/pull/809) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(split-view): skip attempting to refit closed panels [#807](https://github.com/tyler-technologies-oss/forge/pull/807) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix: exposed \`align\` token and fixed layout bug with long labels for checkbox, radio, and switch [#803](https://github.com/tyler-technologies-oss/forge/pull/803) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(toolbar): move internal \`tablist\` role to host element [#811](https://github.com/tyler-technologies-oss/forge/pull/811) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(table): only apply \`aria-hidden\` on \`<th>\` elements if \`headerTemplate\` is not used [#801](https://github.com/tyler-technologies-oss/forge/pull/801) ([@nickonometry](https://github.com/nickonometry))
- docs: fix google analytics tracking for preview pages [#806](https://github.com/tyler-technologies-oss/forge/pull/806) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(vue): add compiler config [#813](https://github.com/tyler-technologies-oss/forge/pull/813) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(view-all): fix exception in view-all hidden docs page [#804](https://github.com/tyler-technologies-oss/forge/pull/804) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🧪 Tests

- chore: remove unintentional \`fit\` usage [#818](https://github.com/tyler-technologies-oss/forge/pull/818) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore(test): filter Lit dev mode warning from test output [#802](https://github.com/tyler-technologies-oss/forge/pull/802) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.5.1 (Fri Jan 31 2025)

#### 🐛 Bug Fix

- fix(defineComponents): fixed an exception caused by lit-based components being incompatible with internal Forge API during element definition [#800](https://github.com/tyler-technologies-oss/forge/pull/800) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): fixed a bug where the selected state overlay could render on top of slotted elements [#799](https://github.com/tyler-technologies-oss/forge/pull/799) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.5.0 (Thu Jan 30 2025)

#### 🚀 Enhancement

- feat(meter): add meter component [#795](https://github.com/tyler-technologies-oss/forge/pull/795) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(button-toggle): no longer reflects the \`value\` attribute to allow for non-string values to be set via JS property [#788](https://github.com/tyler-technologies-oss/forge/pull/788) ([@DRiFTy17](https://github.com/DRiFTy17))
- Fix/icon button badge dense [#791](https://github.com/tyler-technologies-oss/forge/pull/791) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(label-value): allow for content to wrap long words without overflowing [#790](https://github.com/tyler-technologies-oss/forge/pull/790) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(file-picker): cleanup callback to avoid reference being held which can leak [#792](https://github.com/tyler-technologies-oss/forge/pull/792) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(autocomplete): fixed a bug where the \`wrapOptionText\` property was not being set on the list dropdown [#794](https://github.com/tyler-technologies-oss/forge/pull/794) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(app-bar-search): fixed a color contrast issue by increasing the color emphasis on the placeholder text due to the transparent background [#798](https://github.com/tyler-technologies-oss/forge/pull/798) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(design-tokens): add elevation tokens page [#789](https://github.com/tyler-technologies-oss/forge/pull/789) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(table): add action logging for \`forge-table-select-all\` event [#793](https://github.com/tyler-technologies-oss/forge/pull/793) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(button-area): add required slotted button to demo [#797](https://github.com/tyler-technologies-oss/forge/pull/797) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.4.2 (Fri Jan 17 2025)

#### 🐛 Bug Fix

- fix(split-view-panel): fixed a bug relating to the open animation direction [#787](https://github.com/tyler-technologies-oss/forge/pull/787) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: reduce usage of \`contain\` style to only required instances [#785](https://github.com/tyler-technologies-oss/forge/pull/785) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(drawer): fixed a bug where the drawer would not repaint after transitioning in Safari [#784](https://github.com/tyler-technologies-oss/forge/pull/784) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore(eslint): remove duplicate eslint rules [#782](https://github.com/tyler-technologies-oss/forge/pull/782) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(toolbar): fix token names [#781](https://github.com/tyler-technologies-oss/forge/pull/781) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.4.1 (Wed Jan 08 2025)

#### 🐛 Bug Fix

- fix(tooltip): fixed a bug where visually hidden content could cause inadvertent page scrolling [#780](https://github.com/tyler-technologies-oss/forge/pull/780) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(radio): simplify check animation to reduce jitter [#773](https://github.com/tyler-technologies-oss/forge/pull/773) ([@samrichardsontylertech](https://github.com/samrichardsontylertech) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(text-field): label will now float when invalid chars are entered in number inputs [#778](https://github.com/tyler-technologies-oss/forge/pull/778) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): adjust input transition to avoid jittery movement when decelerating [#777](https://github.com/tyler-technologies-oss/forge/pull/777) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(text-field): ensure cleanup logic runs when element is disconnected [#776](https://github.com/tyler-technologies-oss/forge/pull/776) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- Docs fixes [#779](https://github.com/tyler-technologies-oss/forge/pull/779) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.4.0 (Tue Dec 10 2024)

#### 🚀 Enhancement

- feat(tabs): deprecate \`secondary\` prop/attr and update default design to use full width tab indicator [#766](https://github.com/tyler-technologies-oss/forge/pull/766) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(typography): add new \`label3\` style [#770](https://github.com/tyler-technologies-oss/forge/pull/770) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(app-bar): make columns customizable [#768](https://github.com/tyler-technologies-oss/forge/pull/768) ([@samrichardsontylertech](https://github.com/samrichardsontylertech) [@DRiFTy17](https://github.com/DRiFTy17))
- feat(toolbar): make columns customizable [#771](https://github.com/tyler-technologies-oss/forge/pull/771) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- [icon-button] improve docs for toggle mode + background color for "icon" variant when toggled on [#767](https://github.com/tyler-technologies-oss/forge/pull/767) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix: update checkbox, radio, switch label typography to use \`label2\` (13px) typography by default [#769](https://github.com/tyler-technologies-oss/forge/pull/769) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(popover): delay visibility check when hiding by a frame to ensure style calculation has enough time to execute [#765](https://github.com/tyler-technologies-oss/forge/pull/765) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.3.6 (Fri Nov 22 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Anthony Hancock ([@geraltofrivendell](https://github.com/geraltofrivendell)), for all your work!

#### 🐛 Bug Fix

- perf: update forge-core to optimize attachShadowTemplate [#757](https://github.com/tyler-technologies-oss/forge/pull/757) ([@MikeMatusz](https://github.com/MikeMatusz) [@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): fix input size/animation when floating label with inset variant [#763](https://github.com/tyler-technologies-oss/forge/pull/763) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(popover): fixed a bug where the popover would stay connected if hidden at time of exit animation [#760](https://github.com/tyler-technologies-oss/forge/pull/760) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(time-picker): gracefully handle input element reference being undefined [#748](https://github.com/tyler-technologies-oss/forge/pull/748) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): constrain input to grid area to prevent icons from being pushed out of view [#754](https://github.com/tyler-technologies-oss/forge/pull/754) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(dialog): fixed a bug where the dialog surface would render incorrectly if set to fullscreen after moving [#761](https://github.com/tyler-technologies-oss/forge/pull/761) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(select): elementAttributes are now applied to select options [#759](https://github.com/tyler-technologies-oss/forge/pull/759) ([@geraltofrivendell](https://github.com/geraltofrivendell))
- fix(autocomplete): preventDefault on popover-icon mousedown instead of click [#746](https://github.com/tyler-technologies-oss/forge/pull/746) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(field): set \`aria-hidden="true"\` on popover icon \`<svg>\` [#747](https://github.com/tyler-technologies-oss/forge/pull/747) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs: upgrade Storybook and other dependencies [#764](https://github.com/tyler-technologies-oss/forge/pull/764) ([@DRiFTy17](https://github.com/DRiFTy17))
- Origin/fix docs component attrs [#753](https://github.com/tyler-technologies-oss/forge/pull/753) ([@nickonometry](https://github.com/nickonometry))

#### Authors: 4

- Anthony Hancock ([@geraltofrivendell](https://github.com/geraltofrivendell))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v3.3.5 (Thu Nov 14 2024)

#### 🐛 Bug Fix

- fix(text-field): fixed a bug where the input container would lock its width if there is no floating label to animate [#744](https://github.com/tyler-technologies-oss/forge/pull/744) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.3.4 (Thu Nov 14 2024)

#### 🐛 Bug Fix

- fix(text-field): clear button not emitting input event [#742](https://github.com/tyler-technologies-oss/forge/pull/742) ([@conner-fallone](https://github.com/conner-fallone))

#### Authors: 1

- Conner Fallone ([@conner-fallone](https://github.com/conner-fallone))

---

# v3.3.3 (Tue Nov 12 2024)

#### 🐛 Bug Fix

- fix(text-field): fixed a regression where the input container \`width\` could be set to \`0px\` if hidden while attempting to float the label or set a value [#741](https://github.com/tyler-technologies-oss/forge/pull/741) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(popover): gracefully handle how popovers are positioned when their dimensions are clipped by the viewport to ensure access to the content [#740](https://github.com/tyler-technologies-oss/forge/pull/740) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.3.2 (Thu Nov 07 2024)

#### 🐛 Bug Fix

- fix(accordion): always dispatch \`forge-expansion-panel-toggle\` event on panels that are closing in response to a user toggling another panel [#733](https://github.com/tyler-technologies-oss/forge/pull/733) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix: allow overflowing content in card, scaffold, and expansion panel [#736](https://github.com/tyler-technologies-oss/forge/pull/736) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): fixed a bug where the width could collapse while the inset label animation is executing [#730](https://github.com/tyler-technologies-oss/forge/pull/730) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): hide required asterisk at extra-small density [#731](https://github.com/tyler-technologies-oss/forge/pull/731) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(TextFieldComponentDelegate): fix duplicate \`id\` being set when provided via options [#732](https://github.com/tyler-technologies-oss/forge/pull/732) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip-field): fixed a bug where the dropdown would close immediately if clicking directly on the \`<input>\` element [#738](https://github.com/tyler-technologies-oss/forge/pull/738) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(toolbar): fixed "after-section-end" part name [#739](https://github.com/tyler-technologies-oss/forge/pull/739) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(FAQ): added a new FAQ page describing how to handle focus indicator clipping [#737](https://github.com/tyler-technologies-oss/forge/pull/737) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.3.1 (Wed Oct 30 2024)

#### 🐛 Bug Fix

- fix(field): use error color for support text when field is invalid [#720](https://github.com/tyler-technologies-oss/forge/pull/720) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix: fixed a composition/initialization bug for \`<forge-autocomplete>\` and \`<forge-app-bar-search>\` [#725](https://github.com/tyler-technologies-oss/forge/pull/725) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(dialog): expose CSS-only stylesheet [#721](https://github.com/tyler-technologies-oss/forge/pull/721) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(button): fixed inline padding on all non-text variants [#727](https://github.com/tyler-technologies-oss/forge/pull/727) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(expansion-panel): added the "With Card" story to the "Docs" page to allow for viewing the HTML used [#726](https://github.com/tyler-technologies-oss/forge/pull/726) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 2

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.3.0 (Tue Oct 22 2024)

#### 🚀 Enhancement

- fix(skip-link): allow focusing without url navigation [#704](https://github.com/tyler-technologies-oss/forge/pull/704) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(tab-bar): allow individually disabled tabs with enabled tab-bar [#717](https://github.com/tyler-technologies-oss/forge/pull/717) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(field): fixed a rare bug where the inset label state was not initializing properly based on the existence of slotted content [#710](https://github.com/tyler-technologies-oss/forge/pull/710) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): extend box to include outline [#703](https://github.com/tyler-technologies-oss/forge/pull/703) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(autocomplete): properly reflect dropdown open state if dismissed by anchor click [#706](https://github.com/tyler-technologies-oss/forge/pull/706) ([@MikeMatusz](https://github.com/MikeMatusz))
- fix(base-button): fixed a bug where calling \`.click()\` on a button before it's connected would result in an exception [#713](https://github.com/tyler-technologies-oss/forge/pull/713) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(paginator): append select popover to shadow root to attach IDREFs [#718](https://github.com/tyler-technologies-oss/forge/pull/718) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(circular-progress): updated the host element to set \`block-size\` and \`inline-size\` explicitly [#711](https://github.com/tyler-technologies-oss/forge/pull/711) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(inline-message): fix content alignment [#708](https://github.com/tyler-technologies-oss/forge/pull/708) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(chip-field): add \`focus-indicator-color\` token to chips to fix themed "field" chips [#705](https://github.com/tyler-technologies-oss/forge/pull/705) ([@DRiFTy17](https://github.com/DRiFTy17))

#### 📝 Documentation

- docs(app-bar): add missing description for \`target\` property & attribute [#714](https://github.com/tyler-technologies-oss/forge/pull/714) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(page-state): apply CSS var controls to default demo story [#719](https://github.com/tyler-technologies-oss/forge/pull/719) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 3

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.2.0 (Wed Oct 02 2024)

#### 🚀 Enhancement

- feat(calendar): enable UI text customization [#701](https://github.com/tyler-technologies-oss/forge/pull/701) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 🐛 Bug Fix

- fix(chip): remove attribute syncing to prevent value being forced to string [#700](https://github.com/tyler-technologies-oss/forge/pull/700) ([@MikeMatusz](https://github.com/MikeMatusz))

#### Authors: 2

- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.1.3 (Thu Sep 26 2024)

#### 🐛 Bug Fix

- fix(list-item): fixed a bug where focus was being forced to propagate to the interactive element when used within a list dropdown [#698](https://github.com/tyler-technologies-oss/forge/pull/698) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(date-range-picker): fixed a bug where multiple input separators could be added [#697](https://github.com/tyler-technologies-oss/forge/pull/697) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 1

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))

---

# v3.1.2 (Fri Sep 20 2024)

:tada: This release contains work from a new contributor! :tada:

Thank you, Sriram Danturthi ([@sriramasdanturthi](https://github.com/sriramasdanturthi)), for all your work!

#### 🐛 Bug Fix

- fix(date-picker): ensure that time portion of \`Date\` value is preserved during initial render and dropdown calendar selection [#688](https://github.com/tyler-technologies-oss/forge/pull/688) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): use \`layout\` containment on the text-container part to ensure that slotted elements (specifically tooltips) do no affect the layout [#692](https://github.com/tyler-technologies-oss/forge/pull/692) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(stepper): remove the internal \`z-index\` style and fix overflowing content [#691](https://github.com/tyler-technologies-oss/forge/pull/691) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-dropdown): restore display of secondaryLabel [#690](https://github.com/tyler-technologies-oss/forge/pull/690) ([@MikeMatusz](https://github.com/MikeMatusz))

#### 📝 Documentation

- docs: removed DialogConfig [#693](https://github.com/tyler-technologies-oss/forge/pull/693) ([@sriramasdanturthi](https://github.com/sriramasdanturthi))

#### Authors: 3

- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Sriram Danturthi ([@sriramasdanturthi](https://github.com/sriramasdanturthi))

---

# v3.1.1 (Wed Sep 18 2024)

#### 🐛 Bug Fix

- feat: handle non-string values in checkbox, switch, and radio [#687](https://github.com/tyler-technologies-oss/forge/pull/687) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- fix(date-picker): prevent toggle from being added to tab order after enabling the date picker [#686](https://github.com/tyler-technologies-oss/forge/pull/686) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- Origin/feat/create view all stories page [#684](https://github.com/tyler-technologies-oss/forge/pull/684) ([@nickonometry](https://github.com/nickonometry))

#### Authors: 2

- Nick Andrews ([@nickonometry](https://github.com/nickonometry))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v3.1.0 (Mon Sep 09 2024)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: null[@Ross-Blakeney](https://github.com/Ross-Blakeney)

:heart: Scott Shirley ([@ScottTylerTech](https://github.com/ScottTylerTech))

#### 🚀 Enhancement

- feat: bump to latest Forge CLI [#681](https://github.com/tyler-technologies-oss/forge/pull/681) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(shape): enable use of \`--forge-shape-factor\` to uniformly control shape tokens via multiplier [#675](https://github.com/tyler-technologies-oss/forge/pull/675) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat: opt-in global stylesheets to allow for CSS-only component styling [#633](https://github.com/tyler-technologies-oss/forge/pull/633) ([@DRiFTy17](https://github.com/DRiFTy17) [@samrichardsontylertech](https://github.com/samrichardsontylertech))
- feat: allow for \`variant\` property on field, text-field, and select to be globally configurable [#674](https://github.com/tyler-technologies-oss/forge/pull/674) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(skip-link): add inline variant and style tweaks [#665](https://github.com/tyler-technologies-oss/forge/pull/665) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- feat(skip-link): create skip link component [#661](https://github.com/tyler-technologies-oss/forge/pull/661) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- feat(dialog): automatically switch to fullscreen at the new \`fullscreenThreshold\` property value [#658](https://github.com/tyler-technologies-oss/forge/pull/658) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(tokens): include color-emphasis tokens as part of the \`forge-tokens.css\` stylesheet [#657](https://github.com/tyler-technologies-oss/forge/pull/657) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat(select): native form association and label awareness [#636](https://github.com/tyler-technologies-oss/forge/pull/636) ([@samrichardsontylertech](https://github.com/samrichardsontylertech) [@DRiFTy17](https://github.com/DRiFTy17))

#### 🐛 Bug Fix

- fix(autocomplete): focus \`<input>\` popover icon is clicked if composed with a \`<forge-text-field popover-icon>\` [#680](https://github.com/tyler-technologies-oss/forge/pull/680) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list): fix spacing token [#672](https://github.com/tyler-technologies-oss/forge/pull/672) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(app-bar): add "custom" to \`AppBarTheme\` type to fix typings compatibility with docs [#676](https://github.com/tyler-technologies-oss/forge/pull/676) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(checkbox, radio, switch, field): remove opacity on field labels when disabled [#678](https://github.com/tyler-technologies-oss/forge/pull/678) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: updated \`@tylertech-eslint/eslint-plugin\` to latest [#673](https://github.com/tyler-technologies-oss/forge/pull/673) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(button-toggle): relax the generic type on the event data interfaces to \`any\` [#667](https://github.com/tyler-technologies-oss/forge/pull/667) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): reduce font size when dense/extra-small [#666](https://github.com/tyler-technologies-oss/forge/pull/666) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: add \`generate:component\` npm script for scaffolding a new component [#663](https://github.com/tyler-technologies-oss/forge/pull/663) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(tab): add missing inline padding [#660](https://github.com/tyler-technologies-oss/forge/pull/660) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(select): update incorrect slot docs [#654](https://github.com/tyler-technologies-oss/forge/pull/654) ([@Ross-Blakeney](https://github.com/Ross-Blakeney))
- fix(theme): use correct error theme color in dark theme [#656](https://github.com/tyler-technologies-oss/forge/pull/656) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: fix compatibility with windows systems to use normalized file paths in CLI and build-tools deps as well as line endings in eslint [#655](https://github.com/tyler-technologies-oss/forge/pull/655) ([@DRiFTy17](https://github.com/DRiFTy17))
- refactor: add unique identifier to table data items [#652](https://github.com/tyler-technologies-oss/forge/pull/652) ([@ScottTylerTech](https://github.com/ScottTylerTech))
- fix(select): temp fix to remove disabled property from form associated mixin for TS2611 until TypeScript fixes accessor union bug [#649](https://github.com/tyler-technologies-oss/forge/pull/649) ([@DRiFTy17](https://github.com/DRiFTy17))
- feat: readopt constructed stylesheets [#641](https://github.com/tyler-technologies-oss/forge/pull/641) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: migrate legacy tests and clean up [#642](https://github.com/tyler-technologies-oss/forge/pull/642) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(list-item): separate the foreground and background selected state tokens [#638](https://github.com/tyler-technologies-oss/forge/pull/638) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(app-bar-notification-button): fixed a bug where the count could incorrectly display when in dot mode if not changed from default [#639](https://github.com/tyler-technologies-oss/forge/pull/639) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(icon-button): fix to properly default \`theme\` to "default" to allow for "primary" to be used like other themes [#644](https://github.com/tyler-technologies-oss/forge/pull/644) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(button): fix to properly wire up raised variant-specific tokens [#645](https://github.com/tyler-technologies-oss/forge/pull/645) ([@DRiFTy17](https://github.com/DRiFTy17))
- chore: remove legacy \`@tylertech/forge-testing\` dependency [#629](https://github.com/tyler-technologies-oss/forge/pull/629) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(tab-bar): move ARIA attributes to internal scroll container for tab bar [#626](https://github.com/tyler-technologies-oss/forge/pull/626) ([@DRiFTy17](https://github.com/DRiFTy17))
- fix(field): slotted elements can fill entire block size of field [#625](https://github.com/tyler-technologies-oss/forge/pull/625) ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

#### 📝 Documentation

- docs(menu): add note/code snippet about using JS to set options [#677](https://github.com/tyler-technologies-oss/forge/pull/677) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: fix event types [#650](https://github.com/tyler-technologies-oss/forge/pull/650) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: add temporary banner with link to v2.x docs [#646](https://github.com/tyler-technologies-oss/forge/pull/646) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs(app-bar): add content and demo regarding custom theming support [#647](https://github.com/tyler-technologies-oss/forge/pull/647) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: improve API docs, content, and demos [#634](https://github.com/tyler-technologies-oss/forge/pull/634) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: fix image paths and CSS formatting in doc block code snippets [#628](https://github.com/tyler-technologies-oss/forge/pull/628) ([@DRiFTy17](https://github.com/DRiFTy17))
- docs: add chips docs [#627](https://github.com/tyler-technologies-oss/forge/pull/627) ([@DRiFTy17](https://github.com/DRiFTy17))

#### Authors: 4

- [@Ross-Blakeney](https://github.com/Ross-Blakeney)
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))
- Scott Shirley ([@ScottTylerTech](https://github.com/ScottTylerTech))

---

# v3.0.0 (Tue Jun 11 2024)

:tada: This release contains work from new contributors! :tada:

Thanks for all your work!

:heart: Jonathan Earl ([@whattheearl](https://github.com/whattheearl))

:heart: Paul Lapczynski ([@tyl-paul-lapczynski](https://github.com/tyl-paul-lapczynski))

#### 💥 Breaking Change

- feat: prepare GA 3.0 release [#624](https://github.com/tyler-technologies-oss/forge/pull/624) ([@DRiFTy17](https://github.com/DRiFTy17) [@samrichardsontylertech](https://github.com/samrichardsontylertech) [@MikeMatusz](https://github.com/MikeMatusz) [@whattheearl](https://github.com/whattheearl) [@nickonometry](https://github.com/nickonometry) [@tyl-paul-lapczynski](https://github.com/tyl-paul-lapczynski) [@derekmoss](https://github.com/derekmoss))

#### Authors: 7

- Derek Moss ([@derekmoss](https://github.com/derekmoss))
- Jonathan Earl ([@whattheearl](https://github.com/whattheearl))
- Kieran Nichols ([@DRiFTy17](https://github.com/DRiFTy17))
- Mike Matuszak ([@MikeMatusz](https://github.com/MikeMatusz))
- Nick Andrews ([@nickonometry](https://github.com/nickonometry))
- Paul Lapczynski ([@tyl-paul-lapczynski](https://github.com/tyl-paul-lapczynski))
- Sam Richardson ([@samrichardsontylertech](https://github.com/samrichardsontylertech))

---

# v2.24.2 (Tue Jun 11 2024)

#### 🐛 Bug Fix

- Origin/fix tab accessibility issues [#621](https://github.com/tyler-technologies-oss/forge/pull/621) ([@nickonometry](https://github.com/nickonometry))
- fix: fixed accessibility issues with popups [#616](https://github.com/tyler-technologies-oss/forge/pull/616) ([@nickonometry](https://github.com/nickonometry))

#### Authors: 1

- Nick Andrews ([@nickonometry](https://github.com/nickonometry))

---

# v2.24.1 (Tue May 21 2024)

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
`})]})}function g(e={}){const{wrapper:o}={...n(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(i,{...e})}):i(e)}export{g as default};
