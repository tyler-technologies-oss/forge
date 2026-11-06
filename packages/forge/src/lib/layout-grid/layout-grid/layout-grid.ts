import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import {
  LayoutGridAlignment,
  LayoutGridFlow,
  LayoutGridGap,
  LayoutGridTracks,
  renderInstanceStyles,
  toLayoutGridColumns,
  toLayoutGridGap,
  toLayoutGridKeyword,
  toLayoutGridTracks
} from '../layout-grid-constants.js';

import styles from './layout-grid.scss';

export const LAYOUT_GRID_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-layout-grid';

const ATTRIBUTE_VARIABLES = ['columns', 'rows', 'gap', 'column-gap', 'row-gap', 'align-items', 'justify-items', 'flow'] as const;

const toAttributeVariable = (name: (typeof ATTRIBUTE_VARIABLES)[number]): string => `--_layout-grid-${name}-attr`;

/**
 * The attribute-driven variables are registered as non-inheriting so a nested grid never picks up the values of the
 * grid around it.
 */
const registerAttributeVariables = (): void => {
  if (typeof CSS === 'undefined' || !('registerProperty' in CSS)) {
    return;
  }
  for (const name of ATTRIBUTE_VARIABLES) {
    try {
      CSS.registerProperty({ name: toAttributeVariable(name), syntax: '*', inherits: false });
    } catch {
      // Already registered
    }
  }
};

/**
 * @tag forge-layout-grid
 *
 * @summary A layout utility that arranges its direct children in a CSS grid. Any element can be a grid item, and
 * children can span tracks with `data-column-span`/`data-row-span` attributes or by wrapping them in a
 * `forge-layout-grid-item`.
 *
 * @cssproperty --forge-layout-grid-columns - The `grid-template-columns` value. Overrides the `columns` and `min-column-width` attributes.
 * @cssproperty --forge-layout-grid-rows - The `grid-template-rows` value. Overrides the `rows` attribute.
 * @cssproperty --forge-layout-grid-gap - The gap between rows and columns. Overrides the `gap` attribute.
 * @cssproperty --forge-layout-grid-column-gap - The gap between columns. Defaults to the gap.
 * @cssproperty --forge-layout-grid-row-gap - The gap between rows. Defaults to the gap.
 * @cssproperty --forge-layout-grid-align-items - The `align-items` value.
 * @cssproperty --forge-layout-grid-justify-items - The `justify-items` value.
 * @cssproperty --forge-layout-grid-flow - The `grid-auto-flow` value.
 *
 * @slot - The grid items. Every direct child is placed in the grid.
 *
 * @cssclass forge-layout-grid - Applies grid layout to an element without the custom element.
 * @cssclass forge-layout-grid--columns-{1-12} - Sets the number of equal-width columns for a CSS-only grid.
 */
export class LayoutGridComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LAYOUT_GRID_TAG_NAME;

  static {
    registerAttributeVariables();
  }

  /**
   * The columns of the grid. A whole number creates that many equal-width columns, and any other value is used as a
   * CSS `grid-template-columns` track list. When `min-column-width` is also set, a whole number is the maximum number
   * of columns.
   * @attribute
   */
  @property({ reflect: true })
  public columns?: LayoutGridTracks;

  /**
   * The rows of the grid. A whole number creates that many equal-height rows, and any other value is used as a CSS
   * `grid-template-rows` track list.
   * @attribute
   */
  @property({ reflect: true })
  public rows?: LayoutGridTracks;

  /**
   * The narrowest a column can get before the grid moves items onto a new row. Accepts a CSS length or a unitless
   * pixel number. Combine with a whole-number `columns` value to also cap the number of columns.
   * @attribute min-column-width
   */
  @property({ attribute: 'min-column-width', reflect: true })
  public minColumnWidth?: string;

  /**
   * The gap between rows and columns. Accepts a CSS length, a unitless pixel number, or a spacing token size (`xxxs`,
   * `xxs`, `xs`, `s`, `m`, `ml`, `l`, `xl`, `xxl`, `xxxl`) which maps to `--forge-spacing-*`.
   * @attribute
   */
  @property({ reflect: true })
  public gap?: LayoutGridGap;

  /**
   * The gap between columns. Accepts the same values as `gap` and overrides it for columns.
   * @attribute column-gap
   */
  @property({ attribute: 'column-gap', reflect: true })
  public columnGap?: LayoutGridGap;

  /**
   * The gap between rows. Accepts the same values as `gap` and overrides it for rows.
   * @attribute row-gap
   */
  @property({ attribute: 'row-gap', reflect: true })
  public rowGap?: LayoutGridGap;

  /**
   * How items are aligned vertically within their grid area.
   * @attribute align-items
   */
  @property({ attribute: 'align-items', reflect: true })
  public alignItems?: LayoutGridAlignment;

  /**
   * How items are aligned horizontally within their grid area.
   * @attribute justify-items
   */
  @property({ attribute: 'justify-items', reflect: true })
  public justifyItems?: LayoutGridAlignment;

  /**
   * How auto-placed items flow into the grid. `dense` fills earlier gaps, which can make the visual order differ from
   * the reading order.
   * @attribute
   */
  @property({ reflect: true })
  public flow?: LayoutGridFlow;

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
    const values: Record<(typeof ATTRIBUTE_VARIABLES)[number], string | undefined> = {
      columns: toLayoutGridColumns(this.columns, this.minColumnWidth),
      rows: toLayoutGridTracks(this.rows),
      gap: toLayoutGridGap(this.gap),
      'column-gap': toLayoutGridGap(this.columnGap),
      'row-gap': toLayoutGridGap(this.rowGap),
      'align-items': toLayoutGridKeyword(this.alignItems),
      'justify-items': toLayoutGridKeyword(this.justifyItems),
      flow: toLayoutGridKeyword(this.flow)
    };
    const declarations = ATTRIBUTE_VARIABLES.filter(name => values[name]).map(name => `${toAttributeVariable(name)}: ${values[name]}`);
    return declarations.length ? `:host { ${declarations.join('; ')}; }` : '';
  }
}

tryDefine(LAYOUT_GRID_TAG_NAME, LayoutGridComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-layout-grid': LayoutGridComponent;
  }
}
