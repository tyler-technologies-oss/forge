import { html, nothing, TemplateResult } from 'lit';
import { isStackGapSize, STACK_GAP_SIZE_TOKENS, StackGapSize } from '../stack/stack-constants.js';

export type LayoutGridGapSize = StackGapSize;

export type LayoutGridGap = LayoutGridGapSize | (string & {});

/** A whole number of equal-width tracks, or any CSS track list such as `240px 1fr` or `subgrid`. */
export type LayoutGridTracks = number | (string & {});

export type LayoutGridAlignment = 'start' | 'center' | 'end' | 'stretch';

export type LayoutGridFlow = 'row' | 'column' | 'dense' | 'row dense' | 'column dense';

/** A whole number of tracks to span, or `full` to span from the first line to the last. */
export type LayoutGridSpan = number | 'full';

type CssInput = string | number | null | undefined;

const UNITLESS_NUMBER_PATTERN = /^\d+(\.\d+)?$/;
const UNSAFE_CSS_CHARACTERS = /[;{}<>]/g;

const normalize = (value: CssInput): string => (value == null ? '' : String(value).replace(UNSAFE_CSS_CHARACTERS, '').trim());

const toTrackCount = (value: CssInput): number | undefined => {
  const count = Number(normalize(value));
  return Number.isInteger(count) && count > 0 ? count : undefined;
};

/**
 * Converts a gap value into a CSS length. Size names map to `--forge-spacing-*` tokens and unitless numbers are treated
 * as pixels.
 */
export const toLayoutGridGap = (value: CssInput): string | undefined => {
  const gap = normalize(value);
  if (!gap) {
    return undefined;
  }
  if (isStackGapSize(gap)) {
    return `var(--forge-spacing-${STACK_GAP_SIZE_TOKENS[gap]})`;
  }
  return UNITLESS_NUMBER_PATTERN.test(gap) ? `${gap}px` : gap;
};

/** Converts a unitless number to pixels and passes any other CSS length through untouched. */
export const toLayoutGridLength = (value: CssInput): string | undefined => {
  const length = normalize(value);
  if (!length) {
    return undefined;
  }
  return UNITLESS_NUMBER_PATTERN.test(length) ? `${length}px` : length;
};

/** Converts a track value into a `grid-template-*` value, expanding whole numbers into equal-width tracks. */
export const toLayoutGridTracks = (value: CssInput): string | undefined => {
  const count = toTrackCount(value);
  if (count) {
    return `repeat(${count}, minmax(0, 1fr))`;
  }
  return normalize(value) || undefined;
};

/**
 * Builds the `grid-template-columns` value.
 *
 * When `minColumnWidth` is set the grid fills as many columns as fit without any column getting narrower than that
 * width. A whole-number `columns` value caps how many columns that can be: each column is held at no less than
 * `(100% - gap * columns) / columns`, so at most `columns` tracks fit. Subtracting `gap * columns` rather than
 * `gap * (columns - 1)` gives the browser a sliver of room so rounding never drops or adds a track.
 */
export const toLayoutGridColumns = (columns: CssInput, minColumnWidth: CssInput): string | undefined => {
  const minWidth = toLayoutGridLength(minColumnWidth);
  const count = toTrackCount(columns);
  if (minWidth && count) {
    const cappedWidth = `calc((100% - var(--_layout-grid-column-gap) * ${count}) / ${count})`;
    return `repeat(auto-fill, minmax(min(100%, max(${minWidth}, ${cappedWidth})), 1fr))`;
  }
  if (minWidth && !normalize(columns)) {
    return `repeat(auto-fill, minmax(min(100%, ${minWidth}), 1fr))`;
  }
  return toLayoutGridTracks(columns);
};

/** Passes a keyword value through with unsafe characters removed. */
export const toLayoutGridKeyword = (value: CssInput): string | undefined => normalize(value) || undefined;

/** Builds the `grid-{axis}-start` and `grid-{axis}-end` declarations for a start line and span. */
export const toLayoutGridPlacement = (axis: 'column' | 'row', start: CssInput, span: CssInput): string[] => {
  if (normalize(span) === 'full') {
    return [`grid-${axis}-start: 1`, `grid-${axis}-end: -1`];
  }
  const declarations: string[] = [];
  const startLine = Number(normalize(start));
  if (normalize(start) && Number.isInteger(startLine) && startLine !== 0) {
    declarations.push(`grid-${axis}-start: ${startLine}`);
  }
  const spanCount = toTrackCount(span);
  if (spanCount) {
    declarations.push(`grid-${axis}-end: span ${spanCount}`);
  }
  return declarations;
};

/**
 * Renders per-instance declarations as a `<style>` element in the shadow root, so the host's `style` attribute stays
 * entirely under the consumer's control.
 */
export const renderInstanceStyles = (css: string): TemplateResult | typeof nothing =>
  css
    ? html`<style>
        ${css}
      </style>`
    : nothing;

/** Parses a span attribute into a number or `full`. */
export const parseLayoutGridSpan = (value: string | null): LayoutGridSpan | undefined => {
  const span = value?.trim();
  if (!span) {
    return undefined;
  }
  return span === 'full' ? 'full' : Number(span);
};
