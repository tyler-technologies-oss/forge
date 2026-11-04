# Forge v3 Upgrade Guide - LLM Reference

This document describes all component and API changes required to upgrade from Forge v2 to v3. Use this as a reference for transforming code during upgrades.

---

## Global API Migrations

### Typography Classes
- **Remove**: `forge-typography` class from all elements
- **Pattern Replacement**: Remove `class="forge-typography"` attribute entirely

### Typography CSS Class Mappings
- `forge-typography--body1` → `forge-typography--temp-body2` → `forge-typography--body2` (3-step replacement)
- `forge-typography--body2` → `forge-typography--body1`
- `forge-typography--caption` → `forge-typography--label1`
- `forge-typography--subtitle1-secondary` → `forge-typography--heading2`
- `forge-typography--subtitle1` → `forge-typography--subheading2`
- `forge-typography--subtitle2-secondary` → `forge-typography--subheading1`
- `forge-typography--subtitle2` → `forge-typography--heading1`
- `forge-typography--headline1` → `forge-typography--display6`
- `forge-typography--headline2` → `forge-typography--heading8`
- `forge-typography--headline3` → `forge-typography--subheading7`
- `forge-typography--headline4` → `forge-typography--subheading5`
- `forge-typography--headline5` → `forge-typography--heading4`
- `forge-typography--headline6` → `forge-typography--subheading2`
- `forge-typography--title` → `forge-typography--subheading4`

### Import Path Updates
- `@tylertech/forge/styles/` → `@tylertech/forge/sass/`

### Foundation to Core Migration
- `['_foundation']` → `['_core']`
- `._foundation` → `._core`

### Popup to Popover Migration
- `forge-popup` → `forge-popover`
- `forgePopup` → `forgePopover`
- `ForgePopupModule` → `ForgePopoverModule`
- `PopupService` → `PopoverService`
- `PopupDirective` → `PopoverDirective`

### Float Label Changes
- `float-label-type="always"` → `float-label`
- `floatLabelType = 'always'` → `floatLabel = true`
- `floatLabelType = "always"` → `floatLabel = true`

### Event Name Changes
- `forge-switch-select` → `forge-switch-change`
- `forge-tab-bar-activate` → `forge-tab-bar-change`
- `ITabBarActivateEventData` → `ITabBarChangeEventData`
- `forge-tab-interacted` → `forge-tab-select`
- `IPaginatorChangeEvent` → `IPaginatorChangeEventData`

### CSS Variable Updates
#### Theme Variables
- `--mdc-theme-primary` → `--forge-theme-primary`
- `--mdc-theme-on-primary` → `--forge-theme-on-primary`
- `--mdc-theme-secondary` → `--forge-theme-secondary`
- `--mdc-theme-on-secondary` → `--forge-theme-on-secondary`
- `--mdc-theme-background` → `--forge-theme-surface-dim`
- `--mdc-theme-surface` → `--forge-theme-surface`
- `--mdc-theme-on-surface` → `--forge-theme-on-surface`
- `--mdc-theme-error` → `--forge-theme-error`
- `--mdc-theme-on-error` → `--forge-theme-on-error`

#### Text Color Variables
- `--mdc-theme-text-primary-on-background` → `--forge-theme-text-high`
- `--mdc-theme-text-secondary-on-background` → `--forge-theme-text-medium`
- `--mdc-theme-text-hint-on-background` → `--forge-theme-text-low`
- `--mdc-theme-text-disabled-on-background` → `--forge-theme-text-lowest`
- `--mdc-theme-text-icon-on-background` → `--forge-theme-text-medium`
- `--mdc-theme-text-primary-on-light` → `--forge-theme-text-high`
- `--mdc-theme-text-secondary-on-light` → `--forge-theme-text-medium`
- `--mdc-theme-text-disabled-on-light` → `--forge-theme-text-low`
- `--mdc-theme-text-primary-on-dark` → `--forge-theme-text-high-inverse`

#### Component-Specific Variables
- `--forge-drawer-mini-width` → `--forge-mini-drawer-width`
- `--forge-file-picker-max-content-width` → `--forge-file-picker-max-width`
- `--forge-inline-message-background-color` → `--forge-inline-message-background`
- `--forge-avatar-theme-background` → `--forge-avatar-background`
- `--forge-icon-theme-color` → `--forge-icon-color`
- `--forge-tooltip-theme-background` → `--forge-tooltip-background`
- `--forge-page-state-vertical-margin` → `--forge-page-state-spacing`
- `--forge-theme-danger` → `--forge-theme-error`

### Density System Changes
- `density="roomy"` → `density="extra-large"`
- `density="dense"` → `dense` (attribute only, remove density attribute)
- `density="default"` → Remove `density` attribute entirely

---

## Component-Specific Migrations

### forge-badge
**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`

**Examples:**
```html
<!-- Old -->
<forge-badge>
  <forge-icon slot="leading" name="star"></forge-icon>
  Badge Text
  <forge-icon slot="trailing" name="close"></forge-icon>
</forge-badge>

<!-- New -->
<forge-badge>
  <forge-icon slot="start" name="star"></forge-icon>
  Badge Text
  <forge-icon slot="end" name="close"></forge-icon>
</forge-badge>
```

### forge-button
**Nested Element Removal:**
- Remove nested `<button>` elements, move all attributes and children to `<forge-button>`
- Remove nested `<a>` elements, move attributes to `<forge-button>`

**Type to Variant Migration:**
- `type="dense"` → `dense` attribute
- `type="unelevated"` → `variant="filled"`
- `type="text|outlined|tonal|filled|raised|link"` → `variant="{value}"`
- Remove `type="button"` from nested buttons (default behavior)

**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`

**Tooltip Migration:**
- Move nested `<forge-tooltip>` elements outside and after the button element

**Examples:**
```html
<!-- Old: Nested button with type -->
<forge-button type="unelevated-dense">
  <button type="button" onclick="handleClick()">
    <forge-icon slot="leading" name="add"></forge-icon>
    Click me
    <forge-tooltip>Button tooltip</forge-tooltip>
  </button>
</forge-button>

<!-- New: Flattened structure -->
<forge-button variant="filled" dense onclick="handleClick()">
  <forge-icon slot="start" name="add"></forge-icon>
  Click me
</forge-button>
<forge-tooltip>Button tooltip</forge-tooltip>

<!-- Old: Nested anchor -->
<forge-button>
  <a href="/path" target="_blank">Link Button</a>
</forge-button>

<!-- New: Flattened -->
<forge-button href="/path" target="_blank">Link Button</forge-button>
```

### forge-icon-button
**Toggle Button Changes:**
- `forge-icon-button-on` attribute → `slot="on"`
- `is-on` attribute → `on` attribute
- `[isOn]` binding → `[on]` binding

**Density Level Mapping:**
- `density-level="1"` → `density="large"`
- `density-level="2|3"` → `density="medium"`
- `density-level="4|5|6"` → `dense` attribute

**Nested Element Removal:**
- Same as forge-button: remove nested button/anchor elements

**Examples:**
```html
<!-- Old: Toggle icon button -->
<forge-icon-button toggle is-on density-level="4">
  <forge-icon name="favorite_border"></forge-icon>
  <forge-icon forge-icon-button-on name="favorite"></forge-icon>
</forge-icon-button>

<!-- New: Updated toggle structure -->
<forge-icon-button toggle on dense>
  <forge-icon name="favorite_border"></forge-icon>
  <forge-icon slot="on" name="favorite"></forge-icon>
</forge-icon-button>

<!-- Old: Nested button -->
<forge-icon-button>
  <button type="button" aria-label="Menu">
    <forge-icon name="menu"></forge-icon>
  </button>
</forge-icon-button>

<!-- New: Flattened -->
<forge-icon-button aria-label="Menu">
  <forge-icon name="menu"></forge-icon>
</forge-icon-button>
```

### forge-fab
**Nested Element Removal:**
- Same as forge-button: remove nested button/anchor elements

### forge-button-toggle
**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`

### forge-card
**Attribute Changes:**
- Remove `outlined` attribute entirely
- Added a new `raised` attribute for elevated cards if desired
- `has-padding="false"` → `no-padding` attribute

**Examples:**
```html
<!-- Old -->
<forge-card outlined has-padding="false">
  Card content
</forge-card>

<!-- New -->
<forge-card no-padding>
  Card content
</forge-card>
```

### forge-checkbox
**Nested Element Removal:**
- Remove nested `<input>` elements, move attributes to `<forge-checkbox>`
- Remove nested `<label>` elements, move children to `<forge-checkbox>`
- Remove `type` attribute from parent element

**Examples:**
```html
<!-- Old -->
<forge-checkbox>
  <input type="checkbox" id="cb1" name="option1" checked>
  <label for="cb1">Check me</label>
</forge-checkbox>

<!-- New -->
<forge-checkbox id="cb1" name="option1" checked>Check me</forge-checkbox>
```

### forge-radio
**Nested Element Removal:**
- Remove nested `<input>` elements, move attributes to `<forge-radio>`
- Remove nested `<label>` elements, move children to `<forge-radio>`
- Remove `type` attribute from parent element

**Examples:**
```html
<!-- Old -->
<forge-radio>
  <input type="radio" id="r1" name="group1" value="option1">
  <label for="r1">Option 1</label>
</forge-radio>

<!-- New -->
<forge-radio id="r1" name="group1" value="option1">
  Option 1
</forge-radio>
```

### forge-switch
**Attribute Changes:**
- `selected` attribute → `on` attribute

**Examples:**
```html
<!-- Old -->
<forge-switch selected></forge-switch>

<!-- New -->
<forge-switch on></forge-switch>
```

### forge-text-field
**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`
- `slot="addon-end"` → `slot="accessory"`
- `slot="helper-text"` → `slot="support-text"`

**Examples:**
```html
<!-- Old -->
<forge-text-field>
  <forge-icon slot="leading" name="search"></forge-icon>
  <input type="text" placeholder="Search...">
  <forge-button slot="trailing" type="button">Clear</forge-button>
  <forge-button slot="addon-end" type="button">Submit</forge-button>
  <span slot="helper-text">Enter search terms</span>
</forge-text-field>

<!-- New -->
<forge-text-field>
  <forge-icon slot="start" name="search"></forge-icon>
  <input type="text" placeholder="Search...">
  <forge-button slot="end" type="button">Clear</forge-button>
  <forge-button slot="accessory" type="button">Submit</forge-button>
  <span slot="support-text">Enter search terms</span>
</forge-text-field>
```

### forge-select
**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`
- `slot="addon-end"` → `slot="accessory"`
- `slot="helper-text"` → `slot="support-text"`

**Examples:**
```html
<!-- Old -->
<forge-select>
  <forge-icon slot="leading" name="category"></forge-icon>
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
  <forge-icon slot="trailing" name="expand_more"></forge-icon>
  <span slot="helper-text">Choose an option</span>
</forge-select>

<!-- New -->
<forge-select>
  <forge-icon slot="start" name="category"></forge-icon>
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
  <forge-icon slot="end" name="expand_more"></forge-icon>
  <span slot="support-text">Choose an option</span>
</forge-select>
```

### forge-label-value
**Attribute Changes:**
- `dense` attribute → `inline` attribute

### forge-list
**Attribute Changes:**
- Remove `static` attribute (now default behavior)
- Add `navlist` attribute when inside drawer components (`forge-drawer`, `forge-modal-drawer`, `forge-mini-drawer`)

**Examples:**
```html
<!-- Old: Static list in drawer -->
<forge-drawer>
  <forge-list static>
    <forge-list-item>Item 1</forge-list-item>
    <forge-list-item>Item 2</forge-list-item>
  </forge-list>
</forge-drawer>

<!-- New: Navlist in drawer -->
<forge-drawer>
  <forge-list navlist>
    <forge-list-item>Item 1</forge-list-item>
    <forge-list-item>Item 2</forge-list-item>
  </forge-list>
</forge-drawer>
```

### forge-list-item
**Attribute Changes:**
- Remove `static` attribute (now default behavior)

**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`
- `slot="title"` → Remove slot attribute (becomes default slot)
- `slot="subtitle"` → `slot="secondary-text"`
- `slot="tertiary-title"` → `slot="tertiary-text"`
- `slot="avatar"` → `slot="leading"`

**Examples:**
```html
<!-- Old -->
<forge-list-item static>
  <forge-avatar slot="avatar" text="AB"></forge-avatar>
  <span slot="leading">📧</span>
  <span slot="title">Primary Text</span>
  <span slot="subtitle">Secondary text</span>
  <span slot="tertiary-title">Tertiary text</span>
  <forge-icon slot="trailing" name="more_vert"></forge-icon>
</forge-list-item>

<!-- New -->
<forge-list-item>
  <forge-avatar slot="leading" text="AB"></forge-avatar>
  <span slot="start">📧</span>
  <span>Primary Text</span>
  <span slot="secondary-text">Secondary text</span>
  <span slot="tertiary-text">Tertiary text</span>
  <forge-icon slot="end" name="more_vert"></forge-icon>
</forge-list-item>
```

**v2 Approach (Built-in Interactivity):**
```html
<!-- Interactive behavior built-in -->
<forge-list>
  <forge-list-item>Interactive List Item</forge-list-item>
  <forge-list-item href="/">Anchor List Item</forge-list-item>
</forge-list>
```

**v3 Approach (Explicit Interactivity):**
```html
<!-- Must provide interactive elements -->
<forge-list>
  <forge-list-item>
    <button type="button">Interactive List Item</button>
  </forge-list-item>
  <forge-list-item>
    <a href="/">Anchor List Item</a>
  </forge-list-item>
</forge-list>
```

### forge-tab
**Slot Name Changes:**
- `slot="leading"` → `slot="start"`
- `slot="trailing"` → `slot="end"`

### forge-tooltip
**Attribute Changes:**
- `target` attribute → `anchor` attribute (remove leading # if present)
- `position` attribute → `placement` attribute

**Examples:**
```html
<!-- Old -->
<forge-tooltip target="#my-button" position="top">Tooltip text</forge-tooltip>
<forge-button id="my-button">Hover me</forge-button>

<!-- New -->
<forge-tooltip anchor="my-button" placement="top">Tooltip text</forge-tooltip>
<forge-button id="my-button">Hover me</forge-button>
```

---

## JavaScript API Changes

### Dialog Options
**Property Changes:**
- When `escapeClose: false` or `backdropClose: false` are present, add `persistent: true`
- Remove `escapeClose` and `backdropClose` properties entirely

---

## Migration Patterns

### Slot Renaming Pattern
Most components follow this pattern for slot name changes:
- `leading` → `start`
- `trailing` → `end`
- `addon-end` → `accessory`
- `helper-text` → `support-text`

### Attribute Removal Pattern
Many components remove nested HTML elements:
- Extract attributes from nested elements to parent Forge component
- Move children from nested elements to parent Forge component
- Remove the nested HTML element entirely

### Density Migration Pattern
- `density="roomy"` → `density="extra-large"`
- `density="dense"` → `dense` (boolean attribute)
- `density="default"` → Remove attribute

### Type to Variant Pattern
Button components migrate `type` to `variant`:
- `type="unelevated"` → `variant="filled"`
- `type` containing "dense" → Add `dense` attribute
- Valid variants: `text`, `outlined`, `tonal`, `filled`, `raised`, `link`
