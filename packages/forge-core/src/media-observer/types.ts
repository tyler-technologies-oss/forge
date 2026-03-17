export const DISCRETE_MEDIA_FEATURES = [
  'any-hover',
  'any-pointer',
  'color-gamut',
  'display-mode',
  'dynamic-range',
  'forced-colors',
  'grid',
  'hover',
  'inverted-colors',
  'orientation',
  'overflow-block',
  'overflow-inline',
  'pointer',
  'prefers-contrast',
  'prefers-color-scheme',
  'prefers-reduced-motion',
  'scripting',
  'update',
  'video-dynamic-range'
] as const;
export const RANGE_MEDIA_FEATURES = ['aspect-ratio', 'color', 'color-index', 'height', 'monochrome', 'resolution', 'width'] as const;
export const ALL_MEDIA_FEATURES = [...DISCRETE_MEDIA_FEATURES, ...RANGE_MEDIA_FEATURES];

export const BOOLEAN_MEDIA_FEATURES = [
  'any-hover',
  'any-pointer',
  'color',
  'color-index',
  'dynamic-range',
  'forced-colors',
  'grid',
  'height',
  'hover',
  'inverted-colors',
  'monochrome',
  'overflow-block',
  'overflow-inline',
  'pointer',
  'prefers-contrast',
  'prefers-reduced-motion',
  'scripting',
  'update',
  'video-dynamic-range',
  'width'
] as const;

export type DiscreteMediaFeature = (typeof DISCRETE_MEDIA_FEATURES)[number];
export type RangeMediaFeature = (typeof RANGE_MEDIA_FEATURES)[number];
export type MediaFeature = DiscreteMediaFeature | RangeMediaFeature;
export type BooleanMediaFeature = (typeof BOOLEAN_MEDIA_FEATURES)[number];

export const colorGamutValues = ['srbg', 'p3', 'rec2020'] as const;
export const displayModeValues = ['fullscreen', 'standalone', 'minimal-ui', 'browser', 'window-controls-overlay'] as const;
export const dynamicRangeValues = ['standard', 'high'] as const;
export const forcedColorsValues = ['none', 'active'] as const;
export const gridValues = [0, 1] as const;
export const hoverValues = ['none', 'hover'] as const;
export const invertedColorsValues = ['none', 'inverted'] as const;
export const orientationValues = ['portrait', 'landscape'] as const;
export const overflowBlockValues = ['none', 'scroll', 'optional-paged', 'paged'] as const;
export const overflowInlineValues = ['none', 'scroll'] as const;
export const pointerValues = ['none', 'coarse', 'fine'] as const;
export const prefersContrastValues = ['no-preference', 'more', 'less', 'custom'] as const;
export const prefersColorSchemeValues = ['light', 'dark'] as const;
export const prefersReducedMotionValues = ['no-preference', 'reduce'] as const;
export const scriptingValues = ['none', 'initial-only', 'enabled'] as const;
export const updateValues = ['none', 'slow', 'fast'] as const;
export const videoDynamicRangeValues = ['standard', 'high'] as const;

export type ColorGamutValue = (typeof colorGamutValues)[number];
export type DisplayModeValue = (typeof displayModeValues)[number];
export type DynamicRangeValue = (typeof dynamicRangeValues)[number];
export type ForcedColorsValue = (typeof forcedColorsValues)[number];
export type GridValue = (typeof gridValues)[number];
export type HoverValue = (typeof hoverValues)[number];
export type InvertedColorsValue = (typeof invertedColorsValues)[number];
export type OrientationValue = (typeof orientationValues)[number];
export type OverflowBlockValue = (typeof overflowBlockValues)[number];
export type OverflowInlineValue = (typeof overflowInlineValues)[number];
export type PointerValue = (typeof pointerValues)[number];
export type PrefersContrastValue = (typeof prefersContrastValues)[number];
export type PrefersColorSchemeValue = (typeof prefersColorSchemeValues)[number];
export type PrefersReducedMotionValue = (typeof prefersReducedMotionValues)[number];
export type ScriptingValue = (typeof scriptingValues)[number];
export type UpdateValue = (typeof updateValues)[number];
export type VideoDynamicRangeValue = (typeof videoDynamicRangeValues)[number];

export interface NamedMediaQuery {
  name: string;
  query: string;
}
export interface ManagedMediaQuery {
  queryList: MediaQueryList;
  handler: MediaQueryHandler;
}
export type MediaQueryHandler = (event: MediaQueryList | MediaQueryListEvent) => void;

export const mediaFeatureValues = {
  'any-hover': Array.from(hoverValues.values()),
  'any-pointer': Array.from(pointerValues.values()),
  'color-gamut': Array.from(colorGamutValues.values()),
  'display-mode': Array.from(displayModeValues.values()),
  'dynamic-range': Array.from(dynamicRangeValues.values()),
  'forced-colors': Array.from(forcedColorsValues.values()),
  grid: Array.from(gridValues.values()),
  hover: Array.from(hoverValues.values()),
  'inverted-colors': Array.from(invertedColorsValues.values()),
  orientation: Array.from(orientationValues.values()),
  'overflow-block': Array.from(overflowBlockValues.values()),
  'overflow-inline': Array.from(overflowInlineValues.values()),
  pointer: Array.from(pointerValues.values()),
  'prefers-contrast': Array.from(prefersContrastValues.values()),
  'prefers-color-scheme': Array.from(prefersColorSchemeValues.values()),
  'prefers-reduced-motion': Array.from(prefersReducedMotionValues.values()),
  scripting: Array.from(scriptingValues.values()),
  update: Array.from(updateValues.values()),
  'video-dynamic-range': Array.from(videoDynamicRangeValues.values())
};

export interface IMediaObserverOptions {
  name?: string;
  track?: boolean;
}

export interface IMediaRange {
  name: string;
  min?: string | number;
  max?: string | number;
  equals?: string | number;
}
