# Timeline

**In this file:**
- [Markers](#markers)
- [Details](#details)
- [Timeline break](#timeline-break)
- [Theming](#theming)
- [Timestamps](#timestamps)
- [Sidebar Control](#sidebar-control)
- [Notes](#notes)

Timelines display a list of events in chronological order. Use `<forge-timeline>` as the container and `<forge-timeline-item>` for each event.

## Markers

Timeline items display a default circular marker when no custom marker is provided. The marker can be customized by providing content in the marker slot, such as icons or badges.

## Details

Use the detail slot of a timeline item to provide additional information or context for the event. Consider using card component to visually group and separate detail content from the item's summary.

## Timeline break

Use the `<forge-timeline-break>` component to provide visual separation between non-sequential groups of timeline items.

## Theming

Set the theme of a timeline item to control the color of the marker.

## Timestamps

The `<forge-timestamp>` component can be used to display a timestamp in a timeline. Timestamps placed as a direct child of a timeline display as a heading alongside the timeline items. Placing a timestamp within a timeline item renders it as body text.

## Sidebar Control

The `sidebar` attribute controls which parts of the connecting line appear on an item. Values: `auto` (default), `start`, `end`, `both`, `none`. Useful for isolating the first/last item or breaking the line manually.

## Notes

- `<forge-timeline>` is a layout container — put `<forge-timeline-item>` and optional `<forge-timeline-break>` children in the default slot.
- Every timeline item renders a default dot marker unless a custom marker is provided via the `marker` slot.
- Use `theme` on an item to semantically color the default marker; use the `marker` slot when you need an icon or richer visual.
- The connecting line between items is drawn automatically — override individual items with `sidebar` only when the default is wrong (e.g. mid-timeline manual break).
- For long timestamps or metadata, put the timestamp in `slot="start"` so it aligns consistently across items.
