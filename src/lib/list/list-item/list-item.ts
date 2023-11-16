import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { ListItemAdapter } from './list-item-adapter';
import { ListItemFoundation } from './list-item-foundation';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS } from './list-item-constants';
import { StateLayerComponent } from '../../state-layer';
import { FocusIndicatorComponent } from '../../focus-indicator';

import template from './list-item.html';
import styles from './list-item.scss';

export interface IListItemComponent<T = unknown> extends ICustomElement {
  href: string;
  target: string;
  download: string;
  rel: string;
  /** @deprecated Use nonInteractive instead. */
  static: boolean;
  nonInteractive: boolean;
  disabled: boolean;
  selected: boolean;
  active: boolean;
  value: T;
  dense: boolean;
  propagateClick: boolean;
  indented: boolean;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-list-item': IListItemComponent;
  }

  interface HTMLElementEventMap {
    'forge-list-item-select': CustomEvent<IListItemSelectEventData>;
  }
}

/**
 * @tag forge-list-item
 * 
 * @summary List items are individual rows of content inside of a list.
 * 
 * @property {string} href - The href of the anchor. This forces the list item to render as an anchor element.
 * @property {string} target - The target of the anchor when an `href` is set. Defaults to `'_blank'`.
 * @property {boolean} download - The anchor download attribute.
 * @property {boolean} rel - The anchor rel attribute.
 * @property {string} target - The target of the list item when an `href` is set. Defaults to `'_blank'`.
 * @property {boolean} nonInteractive - If true, the list item will not be interactive.
 * @property {boolean} static - If true, the list item will not be interactive. Deprecated use `nonInteractive` instead.
 * @property {boolean} disabled - Disables the list item.
 * @property {boolean} selected - Applies the selected state to the list item.
 * @property {boolean} active - Applies the active state to the list item by emulating its focused state.
 * @property {unknown} value - The unique value of the list item.
 * @property {boolean} dense - Applies the dense state to the list item.
 * @property {boolean} propagateClick - If true, the list item will not propagate click events to itself and therefore cannot receive focus.
 * @property {boolean} indented - Applies the indented state by adding margin to the start of the list item.
 * @property {boolean} twoLine - Sets the list item height to support at least two lines of text.
 * @property {boolean} threeLine - Sets the list item height to support at least three lines of text.
 * @property {boolean} wrap - Sets the list item to wrap its text content.
 * 
 * @attribute {string} href - The href of the anchor This forces the list item to render as an anchor element.
 * @attribute {string} target - The target of the anchor when an `href` is set. Defaults to `'_blank'`.
 * @attribute {boolean} download - The anchor download attribute.
 * @attribute {boolean} rel - The anchor rel attribute.
 * @attribute {string} target - The target of the list item when an `href` is set. Defaults to `'_blank'`.
 * @attribute {boolean} non-interactive - If true, the list item will not be interactive.
 * @attribute {boolean} static - If true, the list item will not be interactive. Deprecated use `non-interactive` instead.
 * @attribute {boolean} disabled - Disables the list item.
 * @attribute {boolean} selected - Applies the selected state to the list item.
 * @attribute {boolean} active - Applies the active state to the list item by emulating its focused state.
 * @attribute {unknown} value - The unique value of the list item.
 * @attribute {boolean} dense - Applies the dense state to the list item.
 * @attribute {boolean} propagate-click - If applied, the list item will not propagate click events to itself and therefore cannot receive focus.
 * @attribute {boolean} indented - Applies the indented state by adding margin to the start of the list item.
 * @attribute {boolean} two-line - Sets the list item height to support at least two lines of text.
 * @attribute {boolean} three-line - Sets the list item height to support at least three lines of text.
 * @attribute {boolean} wrap - Sets the list item to wrap its text content.
 * 
 * @event {CustomEvent<IListItemSelectEventData>} forge-list-item-select - Fires when the list item is selected.
 * 
 * @slot - The primary text.
 * @slot primary-text - The primary text. A named alias for the default slot.
 * @slot secondary-text - The secondary text.
 * @slot tertiary-text - The tertiary text.
 * @slot title - The title element. An alias for the primary-text slot for backwards compatibility.
 * @slot subtitle - The subtitle element. An alias for the secondary-text slot for backwards compatibility.
 * @slot tertiary-title - The tertiary title element. An alias for the tertiary-text slot for backwards compatibility.
 * @slot leading - The leading content.
 * @slot trailing - The trailing element.
 * @slot avatar - The avatar content.
 * 
 * @csspart root - The root container element.
 * @csspart text-container - The container for the text content.
 * @csspart focus-indicator - The forwarded focus indicator's internal indicator element.
 * @csspart state-layer - The forwarded state layer's internal surface element.
 * 
 * @cssprop --forge-list-item-background-color - The background color.
 * @cssprop --forge-list-item-shape - The shape of the list item.
 * @cssprop --forge-list-item-padding - The padding inside of the container element.
 * @cssprop --forge-list-item-margin - The margin around the host element.
 * @cssprop --forge-list-item-height - The height of the container.
 * @cssprop --forge-list-item-dense-height - The height when in the dense state.
 * @cssprop --forge-list-item-indent - The margin inline state when in the indented state.
 * @cssprop --forge-list-item-supporting-text-color - The text color of the supporting text.
 * @cssprop --forge-list-item-supporting-line-height - The line height of the supporting text.
 * @cssprop --forge-list-item-selected-color - The color when in the selected state.
 * @cssprop --forge-list-item-opacity - The opacity of the background color when in the disabled state.
 * @cssprop --forge-list-item-selected-leading-color - The color of the leading content when in the selected state.
 * @cssprop --forge-list-item-selected-trailing-color - The color of the trailing content when in the selected state.
 * @cssprop --forge-list-item-selected-supporting-text-color - The color of the supporting text when in the selected state.
 * @cssprop --forge-list-item-disabled-opacity - The opacity of the element when in the disabled state.
 * @cssprop --forge-list-item-disabled-cursor - The cursor when in the disabled state.
 * @cssprop --forge-list-item-one-line-height - The line height when in the one/single line state.
 * @cssprop --forge-list-item-two-line-height - The line height when in the two line state.
 * @cssprop --forge-list-item-three-line-height - The line height when in the three line state.
 * @cssprop --forge-list-item-dense-one-line-height - The line height when in the dense one/single line state.
 * @cssprop --forge-list-item-dense-two-line-height - The line height when in the dense two line state.
 * @cssprop --forge-list-item-dense-three-line-height - The line height when in the dense three line state.
 * @cssprop --forge-list-item-dense-font-size - The font size when in the dense state.
 * @cssprop --forge-list-item-dense-indent - The margin inline state when in the dense indented state.
 * @cssprop --forge-list-item-dense-leading-margin-end - The margin end of the leading content when in the dense state.
 * @cssprop --forge-list-item-dense-trailing-margin-start - The margin start of the trailing content when in the dense state.
 * @cssprop --forge-list-item-leading-margin-start - The margin start of the leading content.
 * @cssprop --forge-list-item-leading-margin-end - The margin end of the leading content.
 * @cssprop --forge-list-item-leading-selected-color - The color of the leading content when in the selected state.
 * @cssprop --forge-list-item-trailing-margin-start - The margin start of the trailing content.
 * @cssprop --forge-list-item-trailing-margin-end - The margin end of the trailing content.
 * @cssprop --forge-list-item-trailing-selected-color - The color of the trailing content when in the selected state.
 * @cssprop --forge-list-item-avatar-background-color - The background color of the avatar container.
 * @cssprop --forge-list-item-avatar-color - The foreground color of the avatar container.
 * @cssprop --forge-list-item-avatar-shape - The shape of the avatar container.
 * @cssprop --forge-list-item-avatar-margin-start - The margin start of the avatar container.
 * @cssprop --forge-list-item-avatar-margin-end - The margin end of the avatar container.
 * @cssprop --forge-list-item-avatar-size - The height & width of the avatar container.
 */
@CustomElement({
  name: LIST_ITEM_CONSTANTS.elementName,
  dependencies: [
    StateLayerComponent,
    FocusIndicatorComponent
  ]
})
export class ListItemComponent extends HTMLElement implements IListItemComponent {
  public static get observedAttributes(): string[] {
    return [
      LIST_ITEM_CONSTANTS.observedAttributes.HREF,
      LIST_ITEM_CONSTANTS.observedAttributes.TARGET,
      LIST_ITEM_CONSTANTS.observedAttributes.DOWNLOAD,
      LIST_ITEM_CONSTANTS.observedAttributes.REL,
      LIST_ITEM_CONSTANTS.observedAttributes.STATIC,
      LIST_ITEM_CONSTANTS.observedAttributes.NON_INTERACTIVE,
      LIST_ITEM_CONSTANTS.observedAttributes.DISABLED,
      LIST_ITEM_CONSTANTS.observedAttributes.SELECTED,
      LIST_ITEM_CONSTANTS.observedAttributes.ACTIVE,
      LIST_ITEM_CONSTANTS.observedAttributes.VALUE,
      LIST_ITEM_CONSTANTS.observedAttributes.DENSE,
      LIST_ITEM_CONSTANTS.observedAttributes.PROPAGATE_CLICK,
      LIST_ITEM_CONSTANTS.observedAttributes.INDENTED,
      LIST_ITEM_CONSTANTS.observedAttributes.TWO_LINE,
      LIST_ITEM_CONSTANTS.observedAttributes.THREE_LINE,
      LIST_ITEM_CONSTANTS.observedAttributes.WRAP
    ];
  }

  private _foundation: ListItemFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ListItemFoundation(new ListItemAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_ITEM_CONSTANTS.observedAttributes.HREF:
        this.href = newValue;
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.TARGET:
        this.target = newValue;
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.DOWNLOAD:
        this.download = newValue;
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.REL:
        this.rel = newValue;
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.NON_INTERACTIVE:
      case LIST_ITEM_CONSTANTS.observedAttributes.STATIC:
        this.nonInteractive = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.ACTIVE:
        this.active = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.VALUE:
        this.value = newValue;
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.PROPAGATE_CLICK:
        this.propagateClick = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.INDENTED:
        this.indented = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.TWO_LINE:
        this.twoLine = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.THREE_LINE:
        this.threeLine = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.observedAttributes.WRAP:
        this.wrap = coerceBoolean(newValue);
        break;
    }
  }

  public override focus(): void {
    this._foundation.setFocus();
  }

  @FoundationProperty()
  public declare href: string;

  @FoundationProperty()
  public declare target: string;

  @FoundationProperty()
  public declare download: string;

  @FoundationProperty()
  public declare rel: string;

  /** @deprecated Use nonInteractive instead. */
  @FoundationProperty()
  public declare static: boolean;

  @FoundationProperty()
  public declare nonInteractive: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare selected: boolean;

  @FoundationProperty()
  public declare active: boolean;

  @FoundationProperty()
  public declare value: unknown;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare propagateClick: boolean;

  @FoundationProperty()
  public declare indented: boolean;

  @FoundationProperty()
  public declare twoLine: boolean;

  @FoundationProperty()
  public declare threeLine: boolean;

  @FoundationProperty()
  public declare wrap: boolean;

  public override click(): void {
    this._foundation.click();
  }
}
