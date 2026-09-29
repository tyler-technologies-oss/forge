# Restoring component doc examples with blockUrl

This is the handoff for the "Component blocks gap" doc. Every gap that had a real Forge
component behind it now has a published block in this repo. For each MDX file below, replace
the removed nested-HTML `<Example>` with the `<Example description="..." blockUrl="..." />`
form shown.

`blockUrl` values follow: `https://forge.tylerdev.io/blocks/v1/components/<block-path>.html`
(confirmed against `Example.astro`'s prop shape and real usages elsewhere in the docs site).

Two sections are **not** included below — `app-launcher.mdx` "Custom links" and all three
`busy-indicator.mdx` sections (Mode, Variant, Cancelable) — because `forge-app-launcher`,
`forge-app-launcher-link`, and `forge-busy-indicator` don't exist yet in `packages/forge`.
Don't restore those MDX sections until the components ship; the original removed markup is
still recoverable from git history on this doc's source commit in the meantime.

Two sections already had a matching block before this pass and are included for completeness
so you can restore them in the same sweep — flagged inline where the existing block's content
differs from what the original doc example showed.

---

## autocomplete.mdx

**Multi-select**
```astro
<Example
  description="Multiple lets a user select more than one option."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/autocomplete/multi-select/multi-select.html"
/>
```

**Empty state**
```astro
<Example
  description="A custom emptyStateBuilder renders rich HTML when no options match the filter."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/autocomplete/empty-state/empty-state.html"
/>
```

## avatar.mdx

**With an image** — already had a matching block (`avatar/with-image`), no new block needed.
```astro
<Example
  description="An avatar showing a photo instead of initials."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/avatar/with-image/with-image.html"
/>
```

## badge.mdx

**Dot**
```astro
<Example
  description="A dot badge signals unread content without a count."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/badge/dot/dot.html"
/>
```

## banner.mdx

**Persistent**
```astro
<Example
  description="A persistent banner has no built-in dismiss button."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/banner/persistent/persistent.html"
/>
```

## button-toggle.mdx

_"Selection" (multiple selection) was already restored with an existing blockUrl — no action needed there._

**Outline**
```astro
<Example
  description="Outlined (default) compared to no-outline."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/button-toggle/outline/outline.html"
/>
```

**With icons**
```astro
<Example
  description="A leading icon reinforces each option's label."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/button-toggle/with-icons/with-icons.html"
/>
```

**Dense and vertical**
```astro
<Example
  description="A dense, vertical button toggle group."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/button-toggle/dense-and-vertical/dense-and-vertical.html"
/>
```

## button.mdx

**With an icon** — a block already existed here (`button/with-icon`), but it only demonstrates
one icon+slot combination, not the three-button (start/end slot, outlined, raised) comparison
the original doc example showed. Restoring as-is will show a narrower example than before;
flag for a follow-up block if you want full parity.
```astro
<Example
  description="Icons go in the start slot for actions, end slot for directional cues."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/button/with-icon/with-icon.html"
/>
```

**Disabled**
```astro
<Example
  description="Every variant supports disabled."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/button/disabled/disabled.html"
/>
```

## calendar.mdx

_"Selection mode" (Multiple / Range) was already restored with an existing blockUrl — no action needed there._

**Constraints**
```astro
<Example
  description="A calendar bounded to a range, with weekends disabled."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/calendar/constraints/constraints.html"
/>
```

**Views**
```astro
<Example
  description="Opening directly into the year view."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/calendar/views/views.html"
/>
```

**Header controls**
```astro
<Example
  description="Today and clear shortcuts in the calendar's header."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/calendar/header-controls/header-controls.html"
/>
```

**Readonly**
```astro
<Example
  description="A readonly calendar shows the selection without allowing changes."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/calendar/readonly/readonly.html"
/>
```

## card.mdx

**Raised**
```astro
<Example
  description="A raised card sits above its surroundings with a stronger shadow."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/card/raised/raised.html"
/>
```

## checkbox.mdx

**Indeterminate**
```astro
<Example
  description="Checked and indeterminate render distinct marks."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/checkbox/indeterminate/indeterminate.html"
/>
```

**Label position**
```astro
<Example
  description="label-position controls whether the label sits before or after the checkbox."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/checkbox/label-position/label-position.html"
/>
```

**Dense**
```astro
<Example
  description="Dense reduces the checkbox's size for compact layouts."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/checkbox/dense/dense.html"
/>
```

**Disabled and readonly**
```astro
<Example
  description="Disabled excludes the checkbox from the form; readonly keeps it in the form but locks its value."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/checkbox/disabled-and-readonly/disabled-and-readonly.html"
/>
```

## chip-field.mdx

**Confirm on blur**
```astro
<Example
  description="add-on-blur confirms a chip when focus leaves the field, not just on Enter."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/chip-field/confirm-on-blur/confirm-on-blur.html"
/>
```

**Disabled**
```astro
<Example
  description="A disabled chip field with existing members."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/chip-field/disabled/disabled.html"
/>
```

## chip.mdx

**Choice and filter**
```astro
<Example
  description="Choice chips (single selection) and filter chips (narrowing content) share the same selected state."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/chips/choice-and-filter/choice-and-filter.html"
/>
```

**Removable**
```astro
<Example
  description="Input chips render a built-in remove control."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/chips/removable/removable.html"
/>
```

**Dense**
```astro
<Example
  description="Dense reduces height and padding for compact layouts."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/chips/dense/dense.html"
/>
```

## circular-progress.mdx

**Determinate**
```astro
<Example
  description="A determinate indicator showing a specific completion percentage."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/circular-progress/determinate/determinate.html"
/>
```

**Theme and track**
```astro
<Example
  description="A themed indicator with its track visible."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/circular-progress/theme-and-track/theme-and-track.html"
/>
```

## color-picker.mdx

**Opacity**
```astro
<Example
  description="allow-opacity adds an alpha slider to the picker."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/color-picker/opacity/opacity.html"
/>
```

**In a popover or dialog**
```astro
<Example
  description="A swatch button opens the color picker in a popover instead of showing it inline."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/color-picker/popover/popover.html"
/>
```

**Debounced updates**
```astro
<Example
  description="debounce-change-event collapses rapid drags into a single change event."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/color-picker/debounced-updates/debounced-updates.html"
/>
```

## date-picker.mdx

**Constraints**
```astro
<Example
  description="A date picker bounded to a range, with weekends disabled."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-picker/constraints/constraints.html"
/>
```

**Shortcuts, today, and clear**
```astro
<Example
  description="Shortcuts for today and a clear button, alongside the default quick-entry shortcuts."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-picker/shortcuts/shortcuts.html"
/>
```

**Disabled**
```astro
<Example
  description="A disabled date picker."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-picker/disabled/disabled.html"
/>
```

## date-range-picker.mdx

**Constraints**
```astro
<Example
  description="A date range picker bounded to a min/max range."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-range-picker/constraints/constraints.html"
/>
```

**Masking**
```astro
<Example
  description="A masked date range picker showing its format as a placeholder."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-range-picker/masking/masking.html"
/>
```

**Today and clear shortcuts**
```astro
<Example
  description="Disabling the Today shortcut for a future-only range."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-range-picker/shortcuts/shortcuts.html"
/>
```

**Disabled**
```astro
<Example
  description="A disabled date range picker."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/date-range-picker/disabled/disabled.html"
/>
```

## dialog.mdx

**Confirmation dialog**
```astro
<Example
  description="A pre-built confirmation dialog handles the title, message, and button slots."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/dialog/confirmation-dialog/confirmation-dialog.html"
/>
```

## divider.mdx

_"Basic usage" (horizontal) was already covered by the existing `divider/demo` block — no action needed there._

**Vertical**
```astro
<Example
  description="A vertical divider separating two inline items."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/divider/vertical/vertical.html"
/>
```

## fab.mdx

**Density**
```astro
<Example
  description="Small, medium (default), and large density."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/floating-action-button/density/density.html"
/>
```

## file-picker.mdx

**Constraints**
```astro
<Example
  description="Accept and max-size restrict which files can be chosen; helper text states the limits."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/file-picker/constraints/constraints.html"
/>
```

**Compact**
```astro
<Example
  description="Compact removes the drag-and-drop target, leaving only the trigger button."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/file-picker/compact/compact.html"
/>
```

**Borderless**
```astro
<Example
  description="Borderless drops the picker's own border, for use inside another bordered container."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/file-picker/borderless/borderless.html"
/>
```

**Disabled**
```astro
<Example
  description="A disabled file picker can't be interacted with."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/file-picker/disabled/disabled.html"
/>
```

## icon.mdx

_Both "Basic usage" and "Lazy loading" were already covered by existing blocks
(`icon/demo` and `icon/lazy`) — no action needed there._

## label-value.mdx

**Empty**
```astro
<Example
  description="Empty gives a missing value distinct styling instead of leaving it blank."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/label-value/empty/empty.html"
/>
```

**Ellipsis**
```astro
<Example
  description="Ellipsis truncates a value that's too long for its container."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/label-value/ellipsis/ellipsis.html"
/>
```

## linear-progress.mdx

**Theme**
```astro
<Example
  description="A themed linear progress indicator."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/linear-progress/theme/theme.html"
/>
```

## radio.mdx

**Label position**
```astro
<Example
  description="Label position set to start."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/radio/label-position/label-position.html"
/>
```

**Disabled and read-only**
```astro
<Example
  description="Disabled radios (left) can't be focused; read-only radios (right) can be focused but not changed."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/radio/disabled-and-readonly/disabled-and-readonly.html"
/>
```

**Dense**
```astro
<Example
  description="Dense reduces the radio's size and spacing."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/radio/dense/dense.html"
/>
```

## scaffold.mdx

**Full page layout**
```astro
<Example
  description="An app bar, a drawer, and page content, laid out with a scaffold."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/scaffold/full-page-layout/full-page-layout.html"
/>
```

## select.mdx

**Grouped options**
```astro
<Example
  description="Related options grouped under a labeled forge-option-group."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/select/grouped-options/grouped-options.html"
/>
```

**Select dropdown**
```astro
<Example
  description="A forge-select-dropdown attached to a button trigger instead of a field."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/select/select-dropdown/select-dropdown.html"
/>
```

## slider.mdx

**Tickmarks**
```astro
<Example
  description="Tickmarks spaced by step give the handle discrete stops to snap to."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/slider/tickmarks/tickmarks.html"
/>
```

**Disabled and readonly**
```astro
<Example
  description="Disabled excludes the slider from the form; readonly keeps it in the form but locks its value."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/slider/disabled-and-readonly/disabled-and-readonly.html"
/>
```

**Custom labels**
```astro
<Example
  description="A custom label captions the handle instead of a bare number."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/slider/custom-labels/custom-labels.html"
/>
```

## split-button.mdx

**Multiple actions**
```astro
<Example
  description="Three related buttons rendered as one segmented group."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/split-button/multiple-actions/multiple-actions.html"
/>
```

**Dense and pill**
```astro
<Example
  description="A dense, pill-shaped split button."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/split-button/dense-and-pill/dense-and-pill.html"
/>
```

## split-view.mdx

**Vertical**
```astro
<Example
  description="Panels stacked vertically instead of side by side."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/split-view/vertical/vertical.html"
/>
```

## switch.mdx

**Label position**
```astro
<Example
  description="label-position controls whether the label sits before or after the switch."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/switch/label-position/label-position.html"
/>
```

**Dense**
```astro
<Example
  description="Dense reduces the switch's size."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/switch/dense/dense.html"
/>
```

**Icons**
```astro
<Example
  description="Custom icons passed through the icon-on and icon-off slots."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/switch/icons/icons.html"
/>
```

**Disabled and readonly**
```astro
<Example
  description="Disabled excludes the switch from the form; readonly keeps it in the form but locks its value."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/switch/disabled-and-readonly/disabled-and-readonly.html"
/>
```

## text-field.mdx

**Variant**
```astro
<Example
  description="All five field variants."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/text-field/variant/variant.html"
/>
```

**Helper text and validation**
```astro
<Example
  description="Helper text, a required field, and an invalid field with error text."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/text-field/helper-text-and-validation/helper-text-and-validation.html"
/>
```

**Clear button**
```astro
<Example
  description="A clear button appears once the field has a value."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/text-field/clear-button/clear-button.html"
/>
```

**Disabled and readonly**
```astro
<Example
  description="A disabled field."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/text-field/disabled-and-readonly/disabled-and-readonly.html"
/>
```

## time-picker.mdx

**Format**
```astro
<Example
  description="12-hour (default) and 24-hour formats."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/time-picker/format/format.html"
/>
```

**Now and hour shortcuts**
```astro
<Example
  description="Shortcuts for the current time and whole-hour options."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/time-picker/shortcuts/shortcuts.html"
/>
```

**Constraints**
```astro
<Example
  description="A time picker bounded to a range, in 30-minute steps."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/time-picker/constraints/constraints.html"
/>
```

**Masking and input**
```astro
<Example
  description="A masked time picker showing its format as a placeholder."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/time-picker/masking/masking.html"
/>
```

**Disabled**
```astro
<Example
  description="A disabled time picker."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/time-picker/disabled/disabled.html"
/>
```

## toast.mdx

**Placement**
```astro
<Example
  description="A toast placed at the top of the viewport instead of the default bottom."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/toast/placement/placement.html"
/>
```

**Theme**
```astro
<Example
  description="A success-themed toast."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/toast/theme/theme.html"
/>
```

## tooltip.mdx

**Placement**
```astro
<Example
  description="A tooltip placed above its anchor instead of the default right."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/tooltip/placement/placement.html"
/>
```

**Trigger type**
```astro
<Example
  description="A tooltip that opens on focus instead of hover."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/tooltip/trigger-type/trigger-type.html"
/>
```

**Type**
```astro
<Example
  description="A presentation tooltip (default) carries no accessibility association with its anchor."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/tooltip/type/type.html"
/>
```

## view-switcher.mdx

**Basic usage**
```astro
<Example
  description="A tab bar drives which view is active in the switcher below it."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/view-switcher/basic-usage/basic-usage.html"
/>
```

**Animation**
```astro
<Example
  description="A fade transition between views instead of a hard cut."
  blockUrl="https://forge.tylerdev.io/blocks/v1/components/view-switcher/animation/animation.html"
/>
```

---

## Not restored — components don't exist yet

## app-launcher.mdx

**Custom links** — blocked on `forge-app-launcher` / `forge-app-launcher-link` shipping in `packages/forge`.

## busy-indicator.mdx

**Mode**, **Variant**, **Cancelable** — blocked on `forge-busy-indicator` shipping in `packages/forge`.
