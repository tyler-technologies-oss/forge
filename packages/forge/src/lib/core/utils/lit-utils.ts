import { LitElement, supportsAdoptingStyleSheets } from 'lit';

/**
 * Readopts styles for the given element in the context of its new window.
 * @param element The element to readopt styles for.
 */
export function readoptLitElementStyles(element: LitElement): void {
  const shadowRoot = element.shadowRoot;
  const styles = (element.constructor as typeof LitElement).styles;
  const defaultView = element.ownerDocument.defaultView;

  if (!supportsAdoptingStyleSheets || !shadowRoot || !styles || !defaultView) {
    return;
  }

  if (Array.isArray(styles) && styles.length) {
    const sheets = styles.map(s => {
      const sheet = new defaultView.CSSStyleSheet();
      sheet.replaceSync(s.toString());
      return sheet;
    });
    shadowRoot.adoptedStyleSheets = sheets;
  } else {
    const sheet = new defaultView.CSSStyleSheet();
    sheet.replaceSync(styles.toString());
    shadowRoot.adoptedStyleSheets = [sheet];
  }
}

/**
 * Converts empty string values to null for reflected attributes, signaling to Lit that the attribute should be removed.
 * @param value The value to check.
 * @returns The original value if it's not an empty string, otherwise null.
 */
export function removeEmptyAttribute<T extends string>(value: T): T | null {
  return value || null;
}

/**
 * Converts a value to null if it matches the provided default value, signaling to Lit that the attribute should be removed.
 * @param value The value to check.
 * @param defaultValue The default value to compare against.
 * @returns The original value if it doesn't match the default value, otherwise null.
 */
export function removeDefaultAttribute<T extends string>(value: T, defaultValue: T): T | null {
  return !value || value === defaultValue ? null : value;
}
