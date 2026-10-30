# Timeline

Timelines display a list of events in chronological order, showing the sequence and relationship between events over time.

## Usage

`forge-timeline` connects a series of `forge-timeline-item` children with a vertical line through their markers. Each item's main content goes in its default slot, with `start` and `end` slots on either side, a `marker` slot for the indicator, and a `detail` slot below for extra context. Use `forge-timeline-break` between items to visually separate non-sequential groups. Reach for a plain [list](./list.md) instead when order and time aren't meaningful to the content.

## Rules

**Do**

- Include timing information — a date, a relative time, or a plain sequence — whenever when an event happened matters.
- Give each item enough detail to be understood on its own, without relying on neighboring items for context.
- Treat marker icons as decorative — put the information that actually matters in the item's own content, not the icon.

**Don't**

- Don't use a timeline for content that has no real chronological or sequential relationship.
- Don't rely on marker color alone to communicate an item's status — pair it with text or an icon.

## Basic usage

Each `forge-timeline-item` shows a default circular marker, and its main content goes in the default slot.

Example (A timeline of items connected by a vertical line through their markers.): `get_forge_blocks(blockId: "components/timeline/demo/demo")`

## Icons

Slot a `forge-icon` into `marker` to replace an item's default circular indicator. Treat the icon as decorative, since the item's own content should carry the meaning.

Example (Timeline items with an icon in the marker slot in place of the default marker.): `get_forge_blocks(blockId: "components/timeline/with-icons/with-icons")`

## Badges

Slot a `forge-badge` into `marker` for a short text label, and theme the item and badge together to reflect its status.

Example (Timeline items with a badge in the marker slot, themed to match each item's status.): `get_forge_blocks(blockId: "components/timeline/with-badges/with-badges")`

## Breaks

Add a `forge-timeline-break` between items to show a gap, separating non-sequential groups of events.

Example (A break separating recent activity from earlier activity.): `get_forge_blocks(blockId: "components/timeline/with-break/with-break")`

## Sidebar lines

An item's `sidebar` defaults to `auto`, which draws its connecting line above and below its marker, automatically omitting whichever side doesn't apply to the first or last item. Set `sidebar` to `start`, `end`, `both`, or `none` to control this manually — useful for implying items exist before or after what's actually rendered.

Example (Each sidebar value on a timeline item: auto, none, start, end, and both.): `get_forge_blocks(blockId: "components/timeline/sidebar-options/sidebar-options")`

## Theme

Set `theme` on an item to color its default marker. Use the `marker` slot instead when the item needs an icon or badge.

Example (Timeline items using each marker theme.): `get_forge_blocks(blockId: "components/timeline/themed/themed")`

## Detail

Put extra context for an item in its `detail` slot, below its main content. Wrap the detail in a `forge-card` when it needs visual grouping, like a summary with badges.

Example (Timeline items with extra context in the detail slot, one of them in a card.): `get_forge_blocks(blockId: "components/timeline/with-detail/with-detail")`

## Timestamps

Place a [timestamp](./timestamp.md) as a direct child of the timeline to show it as a date heading for the items below it. Inside an item, a timestamp renders inline with the content, and `separator` adds a dot between them. Put item timestamps in the `start` slot when they should line up across items.

Example (Timestamps as date headings between items, and as times before, after, or inside an item's detail.): `get_forge_blocks(blockId: "components/timeline/with-timestamps/with-timestamps")`

## Accessibility

### Structure

A timeline is rendered as a semantic list — `role="list"` on the timeline itself, `role="listitem"` on each timeline item — so assistive technology announces it as a real list of events, not arbitrary markup.

### Markers and breaks

Marker icons should be decorative, since the surrounding item content already provides the necessary context — don't make a marker icon the only place meaning lives. A `forge-timeline-break` is purely visual and is marked `aria-hidden="true"` for that reason; it carries no content of its own to announce.

### Color contrast

When using `theme` to color a marker, make sure that color still meets WCAG contrast requirements against its background.
