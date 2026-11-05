# Divider

A thin line that visually separates groups of related content, horizontally or vertically.

## Overview

Dividers are visual elements used to separate and organize related content within an interface. They can be oriented horizontally or vertically to create clear distinctions between different sections, groups, or categories of information. Dividers help establish visual hierarchy and improve content scannability by providing clear boundaries between related elements. Vertical dividers can be used within toolbars to separate sections of icons.

## Usage

`forge-divider` draws a thin separating line through a single `vertical` attribute — horizontal by default. Reach for it when content is complex enough that a visible line reads more clearly than whitespace alone; for simpler groupings, like a few related form fields, prefer spacing over a divider.

## Rules

**Do**

- Use a divider when content is complex enough that a visible separator reads more clearly than whitespace.
- Prefer whitespace over a divider for simpler groupings, like a handful of related form fields.
- Use a vertical divider inside a toolbar to separate clusters of icons or actions.

**Don't**

- Don't add a divider between every single element — reserve it for real section boundaries.
- Don't use a divider as a substitute for consistent spacing throughout a layout.

## Basic usage

A horizontal line is the default — use it to separate stacked content.

Example (A horizontal divider separating stacked content.): `get_forge_blocks(blockId: "components/divider/demo/demo")`

## Vertical

Set `vertical` for a divider that separates inline items side by side instead of stacked ones.

Example (A vertical divider separating two inline items.): `get_forge_blocks(blockId: "components/divider/vertical/vertical")`

## Accessibility

### Screen reader behavior

`forge-divider` automatically applies `role="separator"`. If the divider is purely decorative in a given context and shouldn't be announced at all, add `aria-hidden="true"` to remove it from the accessibility tree.
