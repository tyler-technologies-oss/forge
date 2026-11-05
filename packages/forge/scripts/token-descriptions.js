const CATEGORY_DESCRIPTIONS = {
  color: 'Opacity levels applied to the on-surface color to create varying levels of visual emphasis.',
  animation: 'The duration and easing of animations used throughout the design system.',
  border: 'The width of borders and outlines used throughout the design system.',
  elevation: 'The shadow and depth of elements. Each token is a specific height on the z-axis; higher levels appear higher.',
  layering:
    'The `z-index` order in which elements are stacked on top of each other. Override these to integrate with another library that uses different z-index values.',
  shape: 'The border radius used throughout the design system. All shape tokens scale relative to `--forge-shape-factor` (default `1`).',
  spacing: 'The spacing used between content, such as padding, margins, and gaps.',
  brand: 'The brand identity color, typically used for app bars and other prominent elements.',
  primary: 'The main colors used throughout the design system, typically for key interactive elements such as buttons and links.',
  secondary: 'Colors that complement the primary colors and provide additional visual interest.',
  tertiary: 'Colors for less prominent elements that still complement the primary color.',
  surface: 'Background colors for content areas and containers.',
  text: 'Text colors with varying levels of emphasis.',
  success: 'Colors that indicate successful actions or states.',
  error: 'Colors that indicate errors or failed actions or states.',
  warning: 'Colors that indicate warnings or cautionary actions or states.',
  info: 'Colors that indicate informational actions or states.',
  outline: 'Colors for outlines and borders of elements with varying levels of emphasis.'
};

const ROLE_DESCRIPTIONS = {
  primary: 'The primary accent color. Use it for the main interactive elements and to mark active or selected states.',
  secondary: 'The secondary accent color. Use it for supporting accents that complement the primary color.',
  tertiary: 'The tertiary accent color. Use it for less prominent accents and indicators that complement the primary color.',
  success: 'The color that conveys success or a positive state, such as a completed action or valid input.',
  error: 'The color that conveys an error or a destructive action, such as invalid input or a failure.',
  warning: 'The color that conveys a warning or a cautionary state that needs attention but is not an error.',
  info: 'The color that conveys neutral, informational content.'
};

const THEME_DESCRIPTIONS = {
  '--forge-theme-brand': 'The brand identity color. Use it for prominent branded areas such as headers.',
  '--forge-theme-on-brand': 'The color for content, such as text and icons, placed on the brand color.',
  '--forge-theme-surface': 'The default background color for content areas such as pages, cards, and panels.',
  '--forge-theme-surface-dim': 'A subdued background color for areas that sit behind or below surfaces, creating contrast with them.',
  '--forge-theme-surface-bright': 'A brighter background color for elevated or floating surfaces such as dialogs and popovers.',
  '--forge-theme-surface-bright-shadow': 'The shadow color or elevation to pair with bright floating surfaces.',
  '--forge-theme-surface-inverse': 'An inverted background color for surfaces that need strong contrast with the rest of the page, such as transient messages.',
  '--forge-theme-surface-container': 'The standard background color for grouping content within a surface.',
  '--forge-theme-surface-container-minimum':
    'The lowest emphasis container background, barely distinguishable from the surface. Use it for subtle grouping and hover fills.',
  '--forge-theme-surface-container-low': 'A low emphasis container background. Use it for subtle fills such as tonal inputs, tracks, and chips.',
  '--forge-theme-surface-container-medium': 'A medium emphasis container background for fills that need more separation from the surface.',
  '--forge-theme-surface-container-high':
    'A high emphasis container background for fills that need to stand out clearly from the surface, such as hovered handles.',
  '--forge-theme-on-surface': 'The color for content, such as text and icons, placed on a surface. Also the base color for hover and focus state layers.',
  '--forge-theme-on-surface-inverse': 'The color for content, such as text and icons, placed on an inverse surface.',
  '--forge-theme-text-high': 'The high emphasis text color. Use it for headings, input values, and other primary content.',
  '--forge-theme-text-high-inverse': 'The high emphasis text color for use on dark or inverse backgrounds.',
  '--forge-theme-text-medium': 'The medium emphasis text color. Use it for body text, labels, and secondary content.',
  '--forge-theme-text-medium-inverse': 'The medium emphasis text color for use on dark or inverse backgrounds.',
  '--forge-theme-text-low': 'The low emphasis text color. Use it for supporting text, captions, and disabled text.',
  '--forge-theme-text-low-inverse': 'The low emphasis text color for use on dark or inverse backgrounds.',
  '--forge-theme-text-lowest': 'The lowest emphasis text color. Use it for the most subdued text and decorative content.',
  '--forge-theme-text-lowest-inverse': 'The lowest emphasis text color for use on dark or inverse backgrounds.',
  '--forge-theme-outline': 'The standard outline color. Use it for dividers, borders, and separators.',
  '--forge-theme-outline-low': 'A low emphasis outline color for subtle borders and separators.',
  '--forge-theme-outline-medium': 'A medium emphasis outline color for borders that need to be clearly visible, such as unselected controls.',
  '--forge-theme-outline-high': 'A high emphasis outline color for borders that must stand out, such as hovered or focused inputs and tick marks.'
};

const STATIC_DESCRIPTIONS = {
  '--forge-color-emphasis-highest': 'The highest emphasis opacity, for content that should be nearly fully opaque.',
  '--forge-color-emphasis-inverse': 'The emphasis opacity for content on inverse or dark backgrounds.',
  '--forge-color-emphasis-higher': 'A higher emphasis opacity, for content slightly softened from full emphasis.',
  '--forge-color-emphasis-high': 'A high emphasis opacity, for content that is softened but still prominent, such as pressed states.',
  '--forge-color-emphasis-medium-high': 'An opacity between medium and high emphasis.',
  '--forge-color-emphasis-medium': 'A medium emphasis opacity, for muted content, scrims, and dimmed elements.',
  '--forge-color-emphasis-medium-low': 'A medium-low emphasis opacity. Use it for disabled elements.',
  '--forge-color-emphasis-low': 'A low emphasis opacity, for faint content.',
  '--forge-color-emphasis-lower': 'A lower emphasis opacity, for very faint content such as disabled tracks.',
  '--forge-color-emphasis-lowest': 'The lowest practical emphasis opacity. Use it for subtle tints such as selected-state overlays.',
  '--forge-color-emphasis-minimum': 'The minimum emphasis opacity, for the faintest overlays.',
  '--forge-border-thin': 'A thin border width for standard borders, outlines, and dividers.',
  '--forge-border-medium': 'A medium border width for borders and indicators that need more presence, such as control borders and focus rings.',
  '--forge-border-thick': 'A thick border width for strong borders and handles.',
  '--forge-z-index-surface': 'The base layer for surfaces that sit above page content, such as sticky headers and side panels.',
  '--forge-z-index-header': 'The layer for page headers, above surfaces so that they stay visible while content scrolls.',
  '--forge-z-index-backdrop': 'The layer for scrims behind modal content, above headers and surfaces.',
  '--forge-z-index-dialog': 'The layer for modal content such as dialogs and modal panels, above the backdrop.',
  '--forge-z-index-notification': 'The layer for notifications, above modal content.',
  '--forge-z-index-popup': 'The layer for popups such as menus, popovers, and dropdowns, above modal content.',
  '--forge-z-index-tooltip': 'The layer for tooltips, the highest layer so they are never obscured.',
  '--forge-spacing-xxxsmall': 'Minimal spacing for fine adjustments and hairline gaps.',
  '--forge-spacing-xxsmall': 'Very small spacing for tight layouts, such as the gap between an icon and its label.',
  '--forge-spacing-xsmall': 'Small spacing for compact layouts, such as gaps between related items.',
  '--forge-spacing-small': 'Small to medium spacing for the internal padding and gaps of compact containers.',
  '--forge-spacing-medium': 'Standard spacing and the most commonly used, for padding and gaps in most layouts.',
  '--forge-spacing-medium-large': 'Medium to large spacing, between standard and generous.',
  '--forge-spacing-large': 'Large spacing for generous padding and separation between groups.',
  '--forge-spacing-xlarge': 'Extra large spacing for separating sections and sizing roomy targets.',
  '--forge-spacing-xxlarge': 'Very large spacing for major sections and large insets.',
  '--forge-spacing-xxxlarge': 'Maximum spacing for page-level separation.',
  '--forge-animation-duration-short1': 'The shortest duration, for near-instant feedback.',
  '--forge-animation-duration-short2': 'A short duration for quick exits and small state changes.',
  '--forge-animation-duration-short3': 'A short duration for hover, press, and other small interaction feedback.',
  '--forge-animation-duration-short4': 'A short duration and the most commonly used, for small transitions that should feel responsive.',
  '--forge-animation-duration-medium1': 'A medium duration for elements entering the screen.',
  '--forge-animation-duration-medium2': 'A medium duration for fades and transitions of moderately sized elements.',
  '--forge-animation-duration-medium3': 'A medium duration for transitions that cover a moderate area.',
  '--forge-animation-duration-medium4': 'The longest medium duration, for expanding and collapsing content.',
  '--forge-animation-duration-long1': 'A long duration for larger transitions.',
  '--forge-animation-duration-long2': 'A long duration for larger transitions that cover more of the screen.',
  '--forge-animation-duration-long3': 'A long duration for large, deliberate transitions.',
  '--forge-animation-duration-long4': 'The longest long duration, for slow, deliberate motion.',
  '--forge-animation-duration-extra-long1': 'An extra long duration for ambient or large-scale motion.',
  '--forge-animation-duration-extra-long2': 'An extra long duration for ambient or large-scale motion.',
  '--forge-animation-duration-extra-long3': 'An extra long duration for ambient or large-scale motion.',
  '--forge-animation-duration-extra-long4': 'The longest duration, for ambient or full-screen motion.',
  '--forge-animation-easing-linear': 'Constant speed with no acceleration. Use it for opacity and color changes.',
  '--forge-animation-easing-standard': 'The default easing for elements that begin and end at rest.',
  '--forge-animation-easing-accelerate': 'Easing for elements that exit, starting slowly and ending quickly.',
  '--forge-animation-easing-decelerate': 'Easing for elements that enter, starting quickly and ending slowly.',
  '--forge-animation-easing-emphasized': 'A more expressive version of standard easing, for prominent transitions.',
  '--forge-animation-easing-emphasized-accelerate': 'A more expressive version of accelerate easing, for prominent exits.',
  '--forge-animation-easing-emphasized-decelerate': 'A more expressive version of decelerate easing, for prominent entrances.',
  '--forge-elevation-0': 'No elevation. A flat element with no shadow.',
  '--forge-elevation-1': 'A very low elevation for elements that sit barely above the surface.',
  '--forge-elevation-2': 'A low elevation for resting raised elements.',
  '--forge-elevation-3': 'A low-to-medium elevation for elements that float above content.',
  '--forge-elevation-4': 'A medium elevation for raised elements in their hovered state and for persistent bars.',
  '--forge-elevation-6': 'A medium-high elevation for transient elements that overlay content.',
  '--forge-elevation-8': 'A high elevation for raised elements in their pressed or dragged state.',
  '--forge-elevation-24': 'The highest elevation, for modal content that sits above everything else.',
  '--forge-shape-extra-small': 'The extra small border radius, for subtle rounding.',
  '--forge-shape-small': 'The small border radius, for small controls and indicators.',
  '--forge-shape-medium': 'The medium border radius and the most commonly used, for standard controls and containers.',
  '--forge-shape-large': 'The large border radius, for larger containers and groups.',
  '--forge-shape-extra-large': 'The extra large border radius, for prominent rounded containers.',
  '--forge-shape-full': 'A fully rounded (pill) border radius that follows the element height.',
  '--forge-shape-round': 'A circular border radius, for elements that should be perfectly round.'
};

const CONTAINER_USAGE = {
  primary: 'tonal fills and selected states',
  secondary: 'tonal fills for secondary accents',
  tertiary: 'tonal fills for tertiary accents and tracks',
  success: 'success messaging and states',
  error: 'error messaging and states',
  warning: 'warning messaging and states',
  info: 'informational messaging and states'
};

const CONTAINER_LEVELS = {
  minimum: 'minimum emphasis',
  low: 'low emphasis',
  medium: 'medium emphasis',
  high: 'high emphasis'
};

const THEME_CONTAINER_PATTERN = /^--forge-theme-(on-)?([a-z]+)-container(?:-(minimum|low|medium|high))?$/;
const THEME_ON_PATTERN = /^--forge-theme-on-([a-z]+)$/;
const ELEVATION_PATTERN = /^--forge-elevation-(\d+)$/;
const SHAPE_PATTERN = /^--forge-shape-(extra-small|small|medium|large|extra-large)(?:-(block-start|block-end|inline-start|inline-end))?$/;

function describeThemeToken(name) {
  const container = name.match(THEME_CONTAINER_PATTERN);
  if (container) {
    const [, on, role, level] = container;
    const emphasis = level ? CONTAINER_LEVELS[level] : 'standard emphasis';
    if (on) {
      return `The color for content, such as text and icons, placed on the ${emphasis} ${role} container.`;
    }
    const usage = CONTAINER_USAGE[role];
    return `The ${emphasis} ${role} container background color${usage ? `, for ${usage}` : ''}.`;
  }

  const on = name.match(THEME_ON_PATTERN);
  if (on && ROLE_DESCRIPTIONS[on[1]]) {
    return `The color for content, such as text and icons, placed on the ${on[1]} color.`;
  }

  return ROLE_DESCRIPTIONS[name.slice('--forge-theme-'.length)];
}

function describeShapeToken(name) {
  if (name === '--forge-shape-full') {
    return 'A fully rounded (pill) border radius.';
  }
  if (name === '--forge-shape-round') {
    return 'A circular border radius.';
  }

  const match = name.match(SHAPE_PATTERN);
  if (!match) {
    return undefined;
  }
  const [, size, side] = match;
  const label = size.replace('-', ' ');
  return side ? `The ${label} border radius, applied to the ${side.replace('-', ' ')} corners only.` : `The ${label} border radius.`;
}

/**
 * Gets the description for a category.
 *
 * @param {string} category The category name, such as `spacing`.
 * @returns {string | undefined} The description, or `undefined` when the category is unknown.
 */
export function describeCategory(category) {
  return CATEGORY_DESCRIPTIONS[category];
}

/**
 * Gets the description for a token, using an explicit description when there is one and otherwise deriving it from the token's naming pattern.
 *
 * @param {string} name The full custom property name, such as `--forge-theme-on-primary-container`.
 * @returns {string | undefined} The description, or `undefined` when the token is unknown.
 */
export function describeToken(name) {
  const explicit = STATIC_DESCRIPTIONS[name] ?? THEME_DESCRIPTIONS[name];
  if (explicit) {
    return explicit;
  }

  if (name.startsWith('--forge-theme-')) {
    return describeThemeToken(name);
  }
  if (name.startsWith('--forge-shape-')) {
    return describeShapeToken(name);
  }

  const elevation = name.match(ELEVATION_PATTERN);
  if (elevation) {
    return elevation[1] === '0' ? 'No elevation (flat).' : `Elevation level ${elevation[1]}. Higher levels cast larger shadows.`;
  }

  return undefined;
}
