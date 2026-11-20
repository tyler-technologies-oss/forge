import { consume } from '@lit/context';
import { CSSResultGroup, html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { ARIARole, setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import {
  DROPDOWN_MENU_DENSE,
  DROPDOWN_MENU_ITEM_SELECT_EVENT,
  DROPDOWN_MENU_SUBMENU_CONTENT_SELECTOR,
  IDropdownMenuItemSelectEventData
} from '../dropdown-menu-constants.js';
import { getEnabledSiblingItems, getRootMenu, isDropdownMenuItem, isDropdownMenuSubmenuItem } from '../dropdown-menu-utils.js';

import '../../focus-indicator/focus-indicator.js';
import '../../state-layer/state-layer.js';

import styles from './base-dropdown-menu-item.scss';

/**
 * The base class for all items that can be placed in a `<forge-dropdown-menu>`.
 *
 * Items are styled to match `<forge-option>` and are themed with the same `--forge-option-*` custom properties.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @event {CustomEvent<IDropdownMenuItemSelectEventData>} forge-dropdown-menu-item-select - Dispatched when the user
 * selects an item. Cancel the event to keep the menu open.
 *
 * @slot - The default slot for the item's label.
 * @slot start - Content placed at the start of the item.
 * @slot secondary - Content placed below the item's label.
 * @slot tertiary - Content placed below the item's secondary content.
 * @slot end - Content placed at the end of the item.
 *
 * @state disabled - Applied when the item is disabled.
 *
 * @csspart root - The root element of the item.
 * @csspart label - The element containing the label and supporting text.
 * @csspart focus-indicator - The focus indicator of the item.
 * @csspart state-layer - The state layer of the item.
 */
export abstract class BaseDropdownMenuItem extends BaseLitElement {
  public static styles: CSSResultGroup = unsafeCSS(styles);

  /**
   * The value of the item, provided in the detail of the select event.
   * @default undefined
   * @attribute
   */
  @property()
  public value: unknown;

  /**
   * Whether the item is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Sets the item's height to fit two lines of text.
   * @default false
   * @attribute two-line
   */
  @property({ type: Boolean, attribute: 'two-line' })
  public twoLine = false;

  /**
   * Sets the item's height to fit three lines of text.
   * @default false
   * @attribute three-line
   */
  @property({ type: Boolean, attribute: 'three-line' })
  public threeLine = false;

  /**
   * Whether the item uses a dense layout. Provided by the menu's `dense` property.
   * @default false
   * @attribute
   */
  @consume({ context: DROPDOWN_MENU_DENSE, subscribe: true })
  @property({ type: Boolean })
  public dense = false;

  /**
   * The text of the item's label, excluding any submenu items.
   */
  public get label(): string {
    return Array.from(this.childNodes)
      .filter(
        node =>
          node.nodeType === Node.TEXT_NODE || (node instanceof Element && !node.hasAttribute('slot') && !node.matches(DROPDOWN_MENU_SUBMENU_CONTENT_SELECTOR))
      )
      .map(node => node.textContent ?? '')
      .join('')
      .trim();
  }

  protected abstract readonly _defaultRole: ARIARole;

  protected readonly _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, { role: this._defaultRole });
    this.tabIndex = -1;
    this.addEventListener('click', this.#handleClick);
    this.addEventListener('focus', this.#handleFocus);
    this.addEventListener('pointerenter', this.#handlePointerEnter);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#handleClick);
    this.removeEventListener('focus', this.#handleFocus);
    this.removeEventListener('pointerenter', this.#handlePointerEnter);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      setDefaultAria(this, this._internals, { ariaDisabled: this.disabled ? 'true' : null });
      toggleState(this._internals, 'disabled', this.disabled);
    }
  }

  public render(): TemplateResult {
    const content = html`
      <slot name="start"></slot>
      <div id="label" class="label" part="label">
        <slot></slot>
        <slot name="secondary"></slot>
        <slot name="tertiary"></slot>
      </div>
      <slot name="end"></slot>
      ${this._renderIndicator()}
      <forge-focus-indicator part="focus-indicator" target=":host" focus-mode="focus" inward></forge-focus-indicator>
      ${this.disabled ? nothing : html`<forge-state-layer exportparts="surface:state-layer"></forge-state-layer>`}
    `;

    return html`${this._renderRoot(content)}${this._renderOverlay()}`;
  }

  /** Renders the root element wrapping the item's content. Extend to render a different type of element. */
  protected _renderRoot(content: TemplateResult): TemplateResult {
    return html`<div class=${classMap(this._getRootClasses())} part="root">${content}</div>`;
  }

  /** Classes applied to the root element. Extend to add classes for additional states. */
  protected _getRootClasses(): ClassInfo {
    return {
      'forge-option': true,
      disabled: this.disabled,
      'two-line': this.twoLine && !this.threeLine,
      'three-line': this.threeLine,
      dense: this.dense
    };
  }

  /** Renders content at the end of the root element, such as a checkmark. */
  protected _renderIndicator(): TemplateResult | typeof nothing {
    return nothing;
  }

  /** Renders content outside of the root element, such as a submenu. */
  protected _renderOverlay(): TemplateResult | typeof nothing {
    return nothing;
  }

  /** The data provided in the detail of the select event. */
  protected _getSelectEventData(): IDropdownMenuItemSelectEventData {
    return { value: this.value };
  }

  /** Called when the user activates the item. Selects the item by default. */
  protected _activate(_evt: MouseEvent): void {
    this._select();
  }

  /** Dispatches the select event and closes the menu unless the event is canceled. */
  protected _select(): void {
    const selectEvent = new CustomEvent<IDropdownMenuItemSelectEventData>(DROPDOWN_MENU_ITEM_SELECT_EVENT, {
      bubbles: true,
      cancelable: true,
      detail: this._getSelectEventData()
    });
    if (this.dispatchEvent(selectEvent)) {
      const menu = getRootMenu(this);
      if (menu) {
        menu.open = false;
      }
    }
  }

  #closeSiblingSubmenus(): void {
    getEnabledSiblingItems(this)
      .filter(item => item !== this)
      .filter(isDropdownMenuSubmenuItem)
      .forEach(item => (item.open = false));
  }

  #handleClick = (evt: MouseEvent): void => {
    // Clicks from nested items bubble through their ancestors, so only handle the clicks that started in this item
    if (evt.composedPath().find(isDropdownMenuItem) !== this || this.disabled) {
      return;
    }

    this._activate(evt);
  };

  #handleFocus = (): void => {
    this.#closeSiblingSubmenus();
  };

  #handlePointerEnter = (evt: PointerEvent): void => {
    if (evt.pointerType !== 'touch') {
      this.#closeSiblingSubmenus();
    }
  };
}
