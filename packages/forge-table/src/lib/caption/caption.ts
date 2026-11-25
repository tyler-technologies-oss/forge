import { html, LitElement, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataTableElement } from '../data-table/data-table.js';
import { CAPTION_TAG_NAME } from './constants.js';

import styles from './caption.scss';

/**
 * A caption or note to display alongside a `forge-data-table`.
 *
 * Connect a data table by setting `table` to its id, or by assigning the element to `tableElement`. The caption's content becomes the
 * table's accessible description by adding itself to the table's `ariaDescribedByElements`, so it is announced with the table.
 *
 * @tag forge-data-table-caption
 *
 * @slot - The caption content.
 */
@customElement(CAPTION_TAG_NAME)
export class CaptionElement extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * The id of the data table that the caption describes. The table is looked up in the same root as the caption and assigned to `tableElement`.
   */
  @property()
  public table: string | undefined;

  /**
   * The data table that the caption describes. Set by `table`, or assign it directly.
   */
  @property({ attribute: false })
  public tableElement: DataTableElement<any> | null = null;

  #describedTable: DataTableElement<any> | undefined;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#describe(this.tableElement);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#describe(null);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }
    const elementAssigned = changedProperties.has('tableElement') && this.tableElement !== null;
    if (changedProperties.has('table') && !elementAssigned) {
      this.tableElement = this.#findTable();
    }
    if (this.tableElement !== this.#describedTable) {
      this.#describe(this.tableElement);
    }
  }

  public override render(): TemplateResult {
    return html`<slot></slot>`;
  }

  #findTable(): DataTableElement<any> | null {
    if (!this.table) {
      return null;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    return (root.getElementById?.(this.table) as DataTableElement<any> | null) ?? null;
  }

  #describe(table: DataTableElement<any> | null): void {
    if (this.#describedTable) {
      this.#setDescribedBy(this.#describedTable, this.#describedTable.ariaDescribedByElements?.filter(element => element !== this) ?? []);
    }
    this.#describedTable = table ?? undefined;
    if (table) {
      this.#setDescribedBy(table, [...(table.ariaDescribedByElements?.filter(element => element !== this) ?? []), this]);
    }
  }

  #setDescribedBy(table: DataTableElement<any>, elements: Element[]): void {
    table.ariaDescribedByElements = elements.length ? elements : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CAPTION_TAG_NAME]: CaptionElement;
  }
}
