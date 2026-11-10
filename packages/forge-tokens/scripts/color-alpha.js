import Color from 'colorjs.io';

export const EXTENSION_NAMESPACE = 'com.tylertech.forge';
export const COLOR_ALPHA_TRANSFORM = 'forge/color/alpha';

const LIGHTNESS_PRECISION = 4;
const CHROMA_PRECISION = 4;
const HUE_PRECISION = 2;
const PERCENT = 100;

// Achromatic colors have no hue, which colorjs.io reports as null or NaN
const round = (value, precision) => Number((Number.isFinite(value) ? value : 0).toFixed(precision));

/**
 * Returns the alpha set on a token through the Forge `$extensions` namespace, or `undefined` if there is none.
 * @param {object} token - The Style Dictionary token.
 * @returns {number | undefined}
 */
export const getTokenAlpha = token => token.$extensions?.[EXTENSION_NAMESPACE]?.alpha;

/**
 * Converts a CSS color to an `oklch()` string with the given alpha, formatted to match the Radix palette tokens.
 * @param {string} value - Any CSS color the `colorjs.io` parser accepts.
 * @param {number} alpha - The alpha, from 0 to 1.
 * @returns {string}
 */
export const applyAlpha = (value, alpha) => {
  if (alpha < 0 || alpha > 1) {
    throw new Error(`Alpha must be between 0 and 1, received ${alpha}.`);
  }
  const [l, c, h] = new Color(value).to('oklch').coords;
  return `oklch(${round(l, LIGHTNESS_PRECISION)} ${round(c, CHROMA_PRECISION)} ${round(h, HUE_PRECISION)} / ${round(alpha * PERCENT, 2)}%)`;
};

/**
 * A transitive value transform that applies the `$extensions` alpha to the resolved color, so a token can alias a
 * palette color and set its opacity.
 */
export const colorAlphaTransform = {
  name: COLOR_ALPHA_TRANSFORM,
  type: 'value',
  transitive: true,
  filter: token => getTokenAlpha(token) !== undefined,
  transform: token => applyAlpha(token.$value ?? token.value, getTokenAlpha(token))
};
