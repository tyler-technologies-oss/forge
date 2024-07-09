import { customElement, attachShadowTemplate, coreProperty, coerceBoolean } from '@tylertech/forge-core';
import { ListItemAdapter } from './list-item-adapter';
import { ListItemCore } from './list-item-core';
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
 * @property {boolean} [selected=false] - Applies the selected state to the list item.
 * @property {boolean} [active=false] - Applies the active state to the list item by emulating its focused state.
 * @property {unknown} value - The unique value of the list item.
 * @property {boolean} [dense=false] - Applies the dense state to the list item.
 * @property {boolean} [indented=false] - Applies the indented state by adding margin to the start of the list item.
 * @property {boolean} [twoLine=false] - Sets the list item height to support at least two lines of text.
 * @property {boolean} [threeLine=false] - Sets the list item height to support at least three lines of text.
 * @property {boolean} [wrap=false] - Sets the list item to wrap its text content.
 * @property {boolean} [noninteractive=false] - Controls whether the list item will automatically attach itself to interactive slotted elements or not.
 *
 * @attribute {boolean} [selected=false] - Applies the selected state to the list item.
 * @attribute {boolean} [active=false] - Applies the active state to the list item by emulating its focused state.
 * @attribute {unknown} value - The unique value of the list item.
 * @attribute {boolean} [dense=false] - Applies the dense state to the list item.
 * @attribute {boolean} [indented=false] - Applies the indented state by adding margin to the start of the list item.
 * @attribute {boolean} [two-line=false] - Sets the list item height to support at least two lines of text.
 * @attribute {boolean} [three-line=false] - Sets the list item height to support at least three lines of text.
 * @attribute {boolean} [wrap=false] - Sets the list item to wrap its text content.
 * @attribute {boolean} [noninteractive=false] - Controls whether the list item will automatically attach itself to interactive slotted elements or not.
 *
 * @event {CustomEvent<IListItemSelectEventData>} forge-list-item-select - Fires when the list item is selected.
 *
 * @slot - The primary text.
 * @slot secondary-text - The secondary text.
 * @slot tertiary-text - The tertiary text.
 * @slot start - The start content.
 * @slot end - The end element.
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
 * @cssproperty --forge-list-item-indent - The margin inline state when in the indented state.
 * @cssproperty --forge-list-item-cursor - The cursor when interactive.
 * @cssproperty --forge-list-item-gap - The gap between the slotted content.
 * @cssproperty --forge-list-item-text-color - The text color of the text.
 * @cssproperty --forge-list-item-text-font-size - The font size of the text.
 * @cssproperty --forge-list-item-text-font-weight - The font weight of the text.
 * @cssproperty --forge-list-item-text-line-height - The line height of the text.
 * @cssproperty --forge-list-item-selected-color - The foreground color when in the selected state.
 * @cssproperty --forge-list-item-selected-background - The background color when in the selected state.
 * @cssproperty --forge-list-item-selected-opacity - The opacity of the background color when in the selected state.
 * @cssproperty --forge-list-item-start-selected-color - The color of the start content when in the selected state.
 * @cssproperty --forge-list-item-end-selected-color - The color of the end content when in the selected state.
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
 */
@customElement({
  name: LIST_ITEM_CONSTANTS.elementName,
  dependencies: [StateLayerComponent, FocusIndicatorComponent]
})
export class ListItemComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements IListItemComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LIST_ITEM_CONSTANTS.observedAttributes);
  }

  private _core: ListItemCore;
  private _adapter: ListItemAdapter;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._adapter = new ListItemAdapter(this);
    this._core = new ListItemCore(this._adapter);
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
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

  @coreProperty()
  public declare selected: boolean;

  @coreProperty()
  public declare active: boolean;

  @coreProperty()
  public declare value: unknown;

  @coreProperty()
  public declare dense: boolean;

  @coreProperty()
  public declare indented: boolean;

  @coreProperty()
  public declare twoLine: boolean;

  @coreProperty()
  public declare threeLine: boolean;

  @coreProperty()
  public declare wrap: boolean;

  @coreProperty()
  public declare noninteractive: boolean;
}
