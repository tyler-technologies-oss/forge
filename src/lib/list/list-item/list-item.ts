import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { ListItemAdapter } from './list-item-adapter';
import { ListItemFoundation } from './list-item-foundation';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS } from './list-item-constants';
import { StateLayerComponent } from '../../state-layer';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { BaseComponent } from '../../core/base/base-component';

import template from './list-item.html';
import styles from './list-item.scss';

export interface IListItemProperties<T = unknown> {
  selected: boolean;
  active: boolean;
  value: T;
  dense: boolean;
  indented: boolean;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
  noninteractive: boolean;
}

export interface IListItemComponent<T = unknown> extends IListItemProperties<T>, IWithElementInternals, IWithDefaultAria {}

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
 * @property {boolean} selected - Applies the selected state to the list item.
 * @property {boolean} active - Applies the active state to the list item by emulating its focused state.
 * @property {unknown} value - The unique value of the list item.
 * @property {boolean} dense - Applies the dense state to the list item.
 * @property {boolean} indented - Applies the indented state by adding margin to the start of the list item.
 * @property {boolean} twoLine - Sets the list item height to support at least two lines of text.
 * @property {boolean} threeLine - Sets the list item height to support at least three lines of text.
 * @property {boolean} wrap - Sets the list item to wrap its text content.
 * @property {boolean} noninteractive - Controls whether the list item will automatically attach itself to interactive slotted elements or not.
 *
 * @attribute {boolean} selected - Applies the selected state to the list item.
 * @attribute {boolean} active - Applies the active state to the list item by emulating its focused state.
 * @attribute {unknown} value - The unique value of the list item.
 * @attribute {boolean} dense - Applies the dense state to the list item.
 * @attribute {boolean} indented - Applies the indented state by adding margin to the start of the list item.
 * @attribute {boolean} two-line - Sets the list item height to support at least two lines of text.
 * @attribute {boolean} three-line - Sets the list item height to support at least three lines of text.
 * @attribute {boolean} wrap - Sets the list item to wrap its text content.
 * @attribute {boolean} noninteractive - Controls whether the list item will automatically attach itself to interactive slotted elements or not.
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
 * @cssproperty --forge-list-item-background - The background color.
 * @cssproperty --forge-list-item-shape - The shape of the list item.
 * @cssproperty --forge-list-item-padding - The padding inside of the container element.
 * @cssproperty --forge-list-item-wrap-padding - The padding inside of the container element when `wrap` is enabled.
 * @cssproperty --forge-list-item-margin - The margin around the host element.
 * @cssproperty --forge-list-item-height - The height of the container.
 * @cssproperty --forge-list-item-dense-height - The height when in the dense state.
 * @cssproperty --forge-list-item-indent - The margin inline state when in the indented state.
 * @cssproperty --forge-list-item-cursor - The cursor when interactive.
 * @cssproperty --forge-list-item-gap - The gap between the slotted content.
 * @cssproperty --forge-list-item-text-color - The text color of the text.
 * @cssproperty --forge-list-item-text-font-size - The font size of the text.
 * @cssproperty --forge-list-item-text-font-weight - The font weight of the text.
 * @cssproperty --forge-list-item-text-line-height - The line height of the text.
 * @cssproperty --forge-list-item-selected-color - The color when in the selected state.
 * @cssproperty --forge-list-item-opacity - The opacity of the background color when in the disabled state.
 * @cssproperty --forge-list-item-selected-leading-color - The color of the leading content when in the selected state.
 * @cssproperty --forge-list-item-selected-trailing-color - The color of the trailing content when in the selected state.
 * @cssproperty --forge-list-item-selected-text-color - The color of the text when in the selected state.
 * @cssproperty --forge-list-item-disabled-opacity - The opacity of the element when in the disabled state.
 * @cssproperty --forge-list-item-disabled-cursor - The cursor when in the disabled state.
 * @cssproperty --forge-list-item-one-line-height - The line height when in the one/single line state.
 * @cssproperty --forge-list-item-two-line-height - The line height when in the two line state.
 * @cssproperty --forge-list-item-three-line-height - The line height when in the three line state.
 * @cssproperty --forge-list-item-dense-one-line-height - The line height when in the dense one/single line state.
 * @cssproperty --forge-list-item-dense-two-line-height - The line height when in the dense two line state.
 * @cssproperty --forge-list-item-dense-three-line-height - The line height when in the dense three line state.
 * @cssproperty --forge-list-item-dense-font-size - The font size when in the dense state.
 * @cssproperty --forge-list-item-dense-indent - The margin inline state when in the dense indented state.
 * @cssproperty --forge-list-item-dense-gap - The gap between the slotted content when in the dense state.
 * @cssproperty --forge-list-item-leading-selected-color - The color of the leading content when in the selected state.
 * @cssproperty --forge-list-item-trailing-selected-color - The color of the trailing content when in the selected state.
 * @cssproperty --forge-list-item-avatar-background-color - The background color of the avatar container.
 * @cssproperty --forge-list-item-avatar-color - The foreground color of the avatar container.
 * @cssproperty --forge-list-item-avatar-shape - The shape of the avatar container.
 * @cssproperty --forge-list-item-avatar-size - The height & width of the avatar container.
 */
@CustomElement({
  name: LIST_ITEM_CONSTANTS.elementName,
  dependencies: [
    StateLayerComponent,
    FocusIndicatorComponent
  ]
})
export class ListItemComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements IListItemComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LIST_ITEM_CONSTANTS.observedAttributes);
  }

  private _foundation: ListItemFoundation;
  private _adapter: ListItemAdapter;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._adapter = new ListItemAdapter(this);
    this._foundation = new ListItemFoundation(this._adapter);
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
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
      case LIST_ITEM_CONSTANTS.observedAttributes.NONINTERACTIVE:
        this.noninteractive = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare selected: boolean;

  @FoundationProperty()
  public declare active: boolean;

  @FoundationProperty()
  public declare value: unknown;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare indented: boolean;

  @FoundationProperty()
  public declare twoLine: boolean;

  @FoundationProperty()
  public declare threeLine: boolean;

  @FoundationProperty()
  public declare wrap: boolean;

  @FoundationProperty()
  public declare noninteractive: boolean;
}
