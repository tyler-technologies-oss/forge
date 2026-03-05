import { LitElement, noChange, supportsAdoptingStyleSheets } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { directive, ElementPart } from 'lit/directive.js';

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

/**
 * Creates a reference object that can be used to track the hidden state of an element when using the `hideWhenEmpty` directive.
 * @returns A reference object with a `hidden` property that indicates whether the element is hidden.
 */
export const createHideRef = (): HideRef => new HideRef();

class HideRef {
  public readonly hidden: boolean;
}

interface HideRefInternal {
  hidden: boolean;
}

class HideWhenEmptyDirective extends AsyncDirective {
  #ref?: HideRef;
  #isInitialized = false;

  public update(part: ElementPart, [ref]: Parameters<this['render']>): void {
    const refChanged = ref !== this.#ref;
    if (refChanged) {
      this.#ref = ref;
    }

    if (this.#isInitialized) {
      return;
    }
    const element = part.element as HTMLElement;
    element.addEventListener('slotchange', () => {
      this.#toggleHidden(element);
      this.#requestUpdate(part);
    });

    this.#toggleHidden(element);
    this.#requestUpdate(part);
    this.#isInitialized = true;
  }

  public render(_ref?: HideRef): typeof noChange {
    return noChange;
  }

  #hasAssignedNodes(element: HTMLElement): boolean {
    const slots = element.querySelectorAll('slot');
    return Array.from(slots).some(slot => slot.assignedNodes().length > 0);
  }

  #toggleHidden(element: HTMLElement): void {
    const hasAssignedNodes = this.#hasAssignedNodes(element);
    if (!hasAssignedNodes) {
      element.style.display = 'none';
    } else {
      element.style.removeProperty('display');
    }

    if (this.#ref) {
      (this.#ref as HideRefInternal).hidden = !hasAssignedNodes;
    }
  }

  #requestUpdate(part: ElementPart): void {
    try {
      (part.options?.host as unknown as LitElement).requestUpdate();
    } catch {
      console.warn('Unable to request update on host element. Ensure that the directive is being used within a LitElement context.');
    }
  }
}

/**
 * Sets the display of an element to 'none' when it has no assigned nodes in its slots, and restores the display when nodes are assigned. A reference object may be used to track the hidden state.
 * @example
 * ```ts
 * const hideRef = createHideRef();
 * // In the template:
 * html`<div ${hideWhenEmpty(hideRef)}><slot></slot></div>`
 *
 * // The hideRef.hidden property will be true when there are no assigned nodes, and false when there are assigned nodes.
 * ```
 */
export const hideWhenEmpty = directive(HideWhenEmptyDirective);
