# Timestamp

Timestamps display a formatted, localized date, time, or duration value using the native time element.

## Usage

`forge-timestamp` renders a `<time>` element from a `datetime` value, formatted through `format` (a CLDR date/time pattern), `locale`, and `separator`. Set `datetime` to a `Date`, a date-convertible string, or any value the native `<time>` element's `datetime` attribute accepts; that value drives both the accessible meaning and, for full dates, the automatic formatting. A dateless time, timezone offset, or duration value is used as-is for accessibility but isn't auto-formatted — pass custom content in the default slot for those cases. Use it anywhere a date or time needs consistent, localized formatting, including inside a [timeline](./timeline.md) item.

## Rules

**Do**

- Always set datetime to the underlying date/time value, even when the visible format only shows part of it.
- Use a CLDR format string in format rather than pre-formatting the value yourself.
- Set locale explicitly when a timestamp shouldn't follow the user's browser locale.

**Don't**

- Don't rely on automatic formatting for a dateless time, timezone offset, or duration — supply custom content in the default slot instead.
- Don't hardcode a display string when the value is a real date — let format handle it so it stays localized.

## Formatting

Set `format` to any valid CLDR date/time pattern to control how the timestamp displays.

```html
<!-- Hour and minute -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm"></forge-timestamp>

<!-- Day and month -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="MMMM dd"></forge-timestamp>

<!-- With additional text -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="'Today' • MMMM dd, yyyy"></forge-timestamp>
```

## Locale

Set `locale` to format the timestamp for a specific locale instead of following the user's browser locale.

```html
<forge-timestamp datetime="2024-03-15T14:30:00" locale="fr-FR"></forge-timestamp>
```

## Separators

Set `separator` to `before` or `after` to place a dot next to the timestamp, visually separating it from adjacent inline content. The default is `none`.

Example (A timestamp with a leading separator dot, next to other inline content.): `get_forge_blocks(blockId: "components/timestamp/separators/separators")`

## Accessibility

### Accessible value

`forge-timestamp` renders a native `<time>` element, which already carries semantic meaning for assistive technology. Set `datetime` to the real underlying value — screen readers and other assistive technology read from that attribute, not from the formatted text, to announce the timestamp accurately.
