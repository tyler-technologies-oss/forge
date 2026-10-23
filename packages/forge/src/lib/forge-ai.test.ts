import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import aiStyles from './forge-ai.scss';
import darkThemeStyles from './forge-dark.scss';

import './checkbox/checkbox.js';
import './radio/radio/radio.js';
import './switch/switch.js';

type Rgb = [number, number, number];

const MINIMUM_CONTRAST = 3;
const COLOR_PATTERN = /color\([^)]*\)|rgba?\([^)]*\)/g;
const colorContext = document.createElement('canvas').getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;

const toRgb = (color: string): Rgb => {
  if (!CSS.supports('color', color)) {
    throw new Error(`"${color}" is not a color`);
  }
  colorContext.fillStyle = color;
  colorContext.fillRect(0, 0, 1, 1);
  const [red, green, blue] = colorContext.getImageData(0, 0, 1, 1).data;
  return [red, green, blue];
};

const colorsIn = (value: string): Rgb[] => {
  const colors = (value.match(COLOR_PATTERN) ?? []).map(toRgb);
  if (!colors.length) {
    throw new Error(`"${value}" does not contain a color`);
  }
  return colors;
};

const luminance = (rgb: Rgb): number => {
  const [red, green, blue] = rgb.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrast = (first: Rgb, second: Rgb): number => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

const lowestContrast = (foregrounds: Rgb[], backgrounds: Rgb[]): number =>
  Math.min(...foregrounds.flatMap(foreground => backgrounds.map(background => contrast(foreground, background))));

const surfaceColor = (): Rgb => {
  const probe = document.body.appendChild(document.createElement('div'));
  probe.style.background = 'var(--forge-theme-surface, #fff)';
  const color = toRgb(getComputedStyle(probe).backgroundColor);
  probe.remove();
  return color;
};

const renderControl = <T extends HTMLElement>(template: ReturnType<typeof html>, selector: string): T =>
  render(template).container.querySelector(selector) as T;

describe.each([
  { theme: 'light', themeStyles: '' },
  { theme: 'dark', themeStyles: darkThemeStyles }
])('AI controls in the $theme theme', ({ themeStyles }) => {
  const styleElements: HTMLStyleElement[] = [];

  beforeAll(() => {
    [themeStyles, aiStyles].forEach(css => {
      const style = document.head.appendChild(document.createElement('style'));
      style.textContent = css;
      styleElements.push(style);
    });
  });

  afterAll(() => styleElements.forEach(style => style.remove()));

  it('should contrast the checkbox border with the surface when unchecked', async () => {
    const checkbox = renderControl(html`<forge-checkbox class="forge-ai"></forge-checkbox>`, 'forge-checkbox');
    const background = getShadowElement(checkbox, '[part="background"]');

    await expect.poll(() => lowestContrast([toRgb(getComputedStyle(background).borderTopColor)], [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
  });

  it('should contrast the checkbox fill with the surface and checkmark when checked', async () => {
    const checkbox = renderControl(html`<forge-checkbox class="forge-ai" checked></forge-checkbox>`, 'forge-checkbox');
    const background = getShadowElement(checkbox, '[part="background"]');
    const checkmark = getShadowElement(checkbox, '[part="checkmark"]');
    const fill = (): Rgb[] => colorsIn(getComputedStyle(background).backgroundImage);

    await expect.poll(() => lowestContrast(fill(), [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    await expect.poll(() => lowestContrast([toRgb(getComputedStyle(checkmark).stroke)], fill())).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
  });

  it('should contrast the radio border with the surface when unchecked', async () => {
    const radio = renderControl(html`<forge-radio class="forge-ai"></forge-radio>`, 'forge-radio');
    const background = getShadowElement(radio, '[part="background"]');

    await expect.poll(() => lowestContrast([toRgb(getComputedStyle(background).borderTopColor)], [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
  });

  it('should contrast the radio border and mark with the surface when checked', async () => {
    const radio = renderControl(html`<forge-radio class="forge-ai" checked></forge-radio>`, 'forge-radio');
    const background = getShadowElement(radio, '[part="background"]');
    const mark = (): Rgb[] => colorsIn(getComputedStyle(background, '::after').backgroundImage);

    await expect.poll(() => lowestContrast([toRgb(getComputedStyle(background).borderTopColor)], [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    await expect.poll(() => lowestContrast(mark(), [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
  });

  it('should contrast the switch handle with the surface and track when off', async () => {
    const element = renderControl(html`<forge-switch class="forge-ai"></forge-switch>`, 'forge-switch');
    const handle = getShadowElement(element, '[part="handle"]');
    const track = getShadowElement(element, '[part="track"]');
    const icon = getShadowElement(element, '[part="icon-off"]');
    const handleColor = (): Rgb => toRgb(getComputedStyle(handle, '::before').backgroundColor);

    await expect
      .poll(() => lowestContrast([handleColor()], [surfaceColor(), toRgb(getComputedStyle(track).backgroundColor)]))
      .toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    await expect.poll(() => lowestContrast([toRgb(getComputedStyle(icon).color)], [handleColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
  });

  it('should contrast the switch track with the surface and separate the handle from it when on', async () => {
    const element = renderControl(html`<forge-switch class="forge-ai" on></forge-switch>`, 'forge-switch');
    const handle = getShadowElement(element, '[part="handle"]');
    const track = getShadowElement(element, '[part="track"]');
    const icon = getShadowElement(element, '[part="icon-on"]');
    const trackColors = (): Rgb[] => colorsIn(getComputedStyle(track).backgroundImage);
    const handleColor = (): Rgb => toRgb(getComputedStyle(handle, '::before').backgroundColor);
    const ringColor = (): Rgb => colorsIn(getComputedStyle(handle, '::before').boxShadow)[0];

    await expect.poll(() => lowestContrast(trackColors(), [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    await expect.poll(() => lowestContrast([handleColor()], [surfaceColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    await expect.poll(() => lowestContrast([ringColor()], [handleColor(), ...trackColors()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    await expect.poll(() => lowestContrast([toRgb(getComputedStyle(icon).color)], [handleColor()])).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
  });

  it('should use the same handle color in the on and off positions', async () => {
    const off = renderControl(html`<forge-switch class="forge-ai"></forge-switch>`, 'forge-switch');
    const on = renderControl(html`<forge-switch class="forge-ai" on></forge-switch>`, 'forge-switch');
    const handleColor = (element: HTMLElement): Rgb => toRgb(getComputedStyle(getShadowElement(element, '[part="handle"]'), '::before').backgroundColor);

    await expect.poll(() => handleColor(on)).toEqual(handleColor(off));
  });
});
