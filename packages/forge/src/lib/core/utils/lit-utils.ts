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
