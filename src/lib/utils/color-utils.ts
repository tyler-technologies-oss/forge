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
