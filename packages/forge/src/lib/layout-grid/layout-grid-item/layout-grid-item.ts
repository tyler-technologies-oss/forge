import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import {
  LayoutGridAlignment,
  LayoutGridSpan,
  parseLayoutGridSpan,
  renderInstanceStyles,
  toLayoutGridKeyword,
  toLayoutGridPlacement
} from '../layout-grid-constants.js';

import styles from './layout-grid-item.scss';

export const LAYOUT_GRID_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-layout-grid-item';

const spanConverter = {
  fromAttribute: parseLayoutGridSpan,
  toAttribute: (value: LayoutGridSpan | undefined): string | null => (value == null ? null : String(value))
};

/**
 * @tag forge-layout-grid-item
 *
 * @summary An optional wrapper for content inside a `forge-layout-grid` that controls where it is placed and how many
 * tracks it spans. Any element can be a grid item without it by using `data-column-span` and related attributes.
 *
 * @slot - The content of the grid item.
 */
export class LayoutGridItemComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LAYOUT_GRID_ITEM_TAG_NAME;

  /**
   * The number of columns the item spans, or `full` to span every column.
   * @attribute column-span
   */
  @property({ attribute: 'column-span', reflect: true, converter: spanConverter })
  public columnSpan?: LayoutGridSpan;

  /**
   * The number of rows the item spans, or `full` to span every row.
   * @attribute row-span
   */
  @property({ attribute: 'row-span', reflect: true, converter: spanConverter })
  public rowSpan?: LayoutGridSpan;

  /**
   * The column line the item starts at. Negative numbers count back from the last line.
   * @attribute column-start
   */
  @property({ attribute: 'column-start', type: Number, reflect: true })
  public columnStart?: number;

  /**
   * The row line the item starts at. Negative numbers count back from the last line.
   * @attribute row-start
   */
  @property({ attribute: 'row-start', type: Number, reflect: true })
  public rowStart?: number;

  /**
   * How the item is aligned vertically within its grid area. Overrides the grid's `align-items`.
   * @attribute align-self
   */
  @property({ attribute: 'align-self', reflect: true })
  public alignSelf?: LayoutGridAlignment;

  /**
   * How the item is aligned horizontally within its grid area. Overrides the grid's `justify-items`.
   * @attribute justify-self
   */
  @property({ attribute: 'justify-self', reflect: true })
  public justifySelf?: LayoutGridAlignment;

  @state() private _instanceStyles = '';

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.size) {
      this._instanceStyles = this.#buildInstanceStyles();
    }
  }

  public render(): TemplateResult {
    return html`${renderInstanceStyles(this._instanceStyles)}<slot></slot>`;
  }

  #buildInstanceStyles(): string {
    const alignSelf = toLayoutGridKeyword(this.alignSelf);
    const justifySelf = toLayoutGridKeyword(this.justifySelf);
    const declarations = [
      ...toLayoutGridPlacement('column', this.columnStart, this.columnSpan),
      ...toLayoutGridPlacement('row', this.rowStart, this.rowSpan),
      ...(alignSelf ? [`align-self: ${alignSelf}`] : []),
      ...(justifySelf ? [`justify-self: ${justifySelf}`] : [])
    ];
    return declarations.length ? `:host { ${declarations.join('; ')}; }` : '';
  }
}

tryDefine(LAYOUT_GRID_ITEM_TAG_NAME, LayoutGridItemComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-layout-grid-item': LayoutGridItemComponent;
  }
}
