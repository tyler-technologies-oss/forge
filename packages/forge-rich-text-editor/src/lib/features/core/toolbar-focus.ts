import { createContext } from '@lit/context';
import type { RteToolButtonComponent } from './rte-tool-button.js';

const TOOL_BUTTON_TAG_NAME = 'forge-rte-tool-button';

/** What a tool button inside a managed toolbar needs from it. Internal to this package. */
export interface IRteToolbarFocus {
  /** Whether `button` is the toolbar's single tab stop. */
  isTabStop(button: RteToolButtonComponent): boolean;
  /** Tells the toolbar its set of buttons, or one button's disabled state, has changed. */
  requestSync(): void;
}

/**
 * Provided by `forge-rich-text-toolbar` to the tool buttons inside it. A tool button with no
 * provider - one placed in a plain container in a composed layout, for example - keeps its default
 * tab stop.
 */
export const rteToolbarFocusContext = createContext<IRteToolbarFocus | undefined>('forge-rte-toolbar-focus');

/**
 * Roving tabindex for the editor toolbar, following the WAI-ARIA toolbar pattern: the toolbar is a
 * single tab stop, and ArrowLeft/ArrowRight, Home and End move between its buttons.
 *
 * This deliberately does not use forge's `focus-group` utility. That utility finds its items with a
 * selector over its host's shadow root and slotted light DOM, and cannot reach tool buttons nested
 * inside feature shadow roots; teaching it to would couple this package to a new forge release.
 * If `focus-group` gains a way to supply its items, or moves into a shared package, this should be
 * replaced by it.
 *
 * Disabled buttons are skipped, consistent with forge's buttons, which drop their tabindex when
 * disabled. The WAI-ARIA toolbar pattern also allows keeping disabled items focusable in the arrow
 * sequence so they can be discovered; revisit if that is wanted.
 */
export class RteToolbarFocus implements IRteToolbarFocus {
  #toolbar: HTMLElement | undefined;
  #tabStop: RteToolButtonComponent | null = null;
  #syncQueued = false;

  public attach(toolbar: HTMLElement): void {
    this.#toolbar = toolbar;
    this.requestSync();
  }

  public isTabStop(button: RteToolButtonComponent): boolean {
    return button === this.#tabStop;
  }

  public requestSync(): void {
    if (this.#syncQueued) {
      return;
    }
    this.#syncQueued = true;
    queueMicrotask(() => {
      this.#syncQueued = false;
      this.#sync();
    });
  }

  public handleFocusIn(evt: FocusEvent): void {
    const button = this.#buttonInPath(evt);
    if (button && button !== this.#tabStop) {
      this.#setTabStop(button);
    }
  }

  public handleKeydown(evt: KeyboardEvent): void {
    // Only keys pressed on a tool button. Keys typed into a feature's popover, such as the link
    // URL field, must keep their normal meaning.
    const current = this.#buttonInPath(evt);
    if (!current) {
      return;
    }

    const buttons = this.#enabledButtons();
    const index = buttons.indexOf(current);
    const isRtl = getComputedStyle(this.#toolbar ?? current).direction === 'rtl';
    const next = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const previous = isRtl ? 'ArrowRight' : 'ArrowLeft';

    let target: RteToolButtonComponent | undefined;
    switch (evt.key) {
      case next:
        target = buttons[Math.min(index + 1, buttons.length - 1)];
        break;
      case previous:
        target = buttons[Math.max(index - 1, 0)];
        break;
      case 'Home':
        target = buttons[0];
        break;
      case 'End':
        target = buttons.at(-1);
        break;
      default:
        return;
    }

    evt.preventDefault();
    if (target && target !== current) {
      this.#setTabStop(target);
      target.focus();
    }
  }

  #sync(): void {
    const buttons = this.#enabledButtons();
    if (!this.#tabStop || !buttons.includes(this.#tabStop)) {
      this.#tabStop = buttons[0] ?? null;
    }
    this.#allButtons().forEach(button => button.requestUpdate());
  }

  #setTabStop(button: RteToolButtonComponent): void {
    const previous = this.#tabStop;
    this.#tabStop = button;
    previous?.requestUpdate();
    button.requestUpdate();
  }

  #buttonInPath(evt: Event): RteToolButtonComponent | undefined {
    const buttons = this.#allButtons();
    return evt.composedPath().find((node): node is RteToolButtonComponent => buttons.includes(node as RteToolButtonComponent));
  }

  #enabledButtons(): RteToolButtonComponent[] {
    return this.#allButtons().filter(button => !button.disabled);
  }

  /** Every tool button under the toolbar, in the order they are laid out. */
  #allButtons(): RteToolButtonComponent[] {
    const found: RteToolButtonComponent[] = [];
    const visit = (node: Element): void => {
      if (node.localName === TOOL_BUTTON_TAG_NAME) {
        found.push(node as RteToolButtonComponent);
        return;
      }
      if (node instanceof HTMLSlotElement) {
        node.assignedElements({ flatten: true }).forEach(visit);
        return;
      }
      Array.from((node.shadowRoot ?? node).children).forEach(visit);
    };
    if (this.#toolbar) {
      visit(this.#toolbar);
    }
    return found;
  }
}
