import { isNumber } from '@tylertech/forge-core';

import { IRGBA, IHSVA } from './color-picker-constants';

/**
 * Calcuates coordinates relative to the provided element based on absolute coordinates.
 * @param absX The x coordinate in screen space.
 * @param absY The y coordinate in screen space.
 * @param element The element to calculate the relative coordinates from.
 */
export function relativeCoords(absX: number, absY: number, element: HTMLElement): { x: number; y: number; height: number; width: number } {
  const bounds = element.getBoundingClientRect();
  let x = absX - bounds.left;
  let y = absY - bounds.top;

  if (x > bounds.width) {
    x = bounds.width;
  } else if (x < 0) {
    x = 0;
  }

  if (y > bounds.height) {
    y = bounds.height;
  } else if (y < 0) {
    y = 0;
  }

  return { x, y, height: bounds.height, width: bounds.width };
}

export function hsvaToRgba(hsva: IHSVA): IRGBA {
  let r: number;
  let g: number;
  let b: number;
  const h = hsva.h / 60;
  const s = hsva.s / 100;
  const v = hsva.v / 100;

  if (s === 0) {
    r = g = b = v;
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: hsva.a
    };
  }

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default:
      r = v;
      g = p;
      b = q;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsva.a
  };
}

export function rgbaToHex(rgba: IRGBA): string {
  return toHex(rgba.r) + toHex(rgba.g) + toHex(rgba.b) + (Math.round(rgba.a * 255) + 0x10000).toString(16).substr(-2);
}

export function toHex(x: number): string {
  return ('0' + x.toString(16)).slice(-2);
}

export function hexToRgba(hex: string): IRGBA {
  const isShorthand = hex.length === 3 || hex.length === 4;
  const hexR = isShorthand ? `${hex.slice(0, 1)}${hex.slice(0, 1)}` : hex.slice(0, 2);
  const hexG = isShorthand ? `${hex.slice(1, 2)}${hex.slice(1, 2)}` : hex.slice(2, 4);
  const hexB = isShorthand ? `${hex.slice(2, 3)}${hex.slice(2, 3)}` : hex.slice(4, 6);
  const hexA = (isShorthand ? `${hex.slice(3, 4)}${hex.slice(3, 4)}` : hex.slice(6, 8)) || 'ff';

  return {
    r: parseInt(hexR, 16),
    g: parseInt(hexG, 16),
    b: parseInt(hexB, 16),
    a: parseFloat((parseInt(hexA, 16) / 255).toFixed(2))
  };
}

export function formatRgba(rgba: IRGBA): string {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export function formatHex(value: string, allowOpacity: boolean): string {
  let hex = value.replace(/^#/, '');

  if (!allowOpacity) {
    if (hex.length === 4) {
      hex = hex.substring(0, 3);
    } else if (hex.length === 8) {
      hex = hex.substring(0, 6);
    }
  }

  return `#${hex}`;
}

export function rgbaToHsva(rgba: IRGBA): IHSVA {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = max;
  let s = max;
  const v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a: rgba.a
  };
}

/**
 * Determines if the provided hex color string is valid.
 * @param value The hex color string.
 */
export function isValidHex(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }

  if (value.substring(0, 1) === '#') {
    value = value.substring(1);
  }

  switch (value.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(value);
    case 4:
      return /^[0-9A-F]{4}$/i.test(value);
    case 6:
      return /^[0-9A-F]{6}$/i.test(value);
    case 8:
      return /^[0-9A-F]{8}$/i.test(value);
    default:
      return false;
  }
}

/**
 * Determines if the provided RGBA values are valid.
 * @param value The RGBA color values.
 */
export function isValidRGBA(value: IRGBA): boolean {
  return (
    isNumber(value.r) &&
    value.r >= 0 &&
    value.r <= 255 &&
    isNumber(value.g) &&
    value.g >= 0 &&
    value.g <= 255 &&
    isNumber(value.b) &&
    value.b >= 0 &&
    value.b <= 255 &&
    isNumber(value.a) &&
    value.a >= 0 &&
    value.a <= 1
  );
}

/**
 * Determines if the provided HSVA values are valid.
 * @param value The HSVA color values.
 */
export function isValidHSVA(value: IHSVA): boolean {
  return (
    isNumber(value.h) &&
    value.h >= 0 &&
    value.h <= 360 &&
    isNumber(value.s) &&
    value.s >= 0 &&
    value.s <= 100 &&
    isNumber(value.v) &&
    value.v >= 0 &&
    value.v <= 100 &&
    isNumber(value.a) &&
    value.a >= 0 &&
    value.a <= 1
  );
}
