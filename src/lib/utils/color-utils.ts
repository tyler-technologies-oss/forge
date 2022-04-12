import { COLOR_CONSTANTS } from '../theme';

/**
 * Gets a random hex color.
 * @returns {string} The CSS-compatible hex color string.
 */
export function randomHexColor(): string {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

/**
 * Gets the color for the provided letter.
 */
export function getTextColor(text?: string): string {
  if (!text || typeof text !== 'string') {
    text = '';
  }

  let color: string;

  if (text.charCodeAt(0) < 65) {
    color = randomHexColor();
  } else {
    const colorIndex = Math.floor((text.charCodeAt(0) - 65) % COLOR_CONSTANTS.letterColors.length);
    color = COLOR_CONSTANTS.letterColors[colorIndex];
  }

  return color;
}
