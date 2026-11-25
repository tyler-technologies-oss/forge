import { IconRegistry } from '@tylertech/forge';
import { tylIconFilterList, tylIconViewColumn } from '@tylertech/tyler-icons';
import { html, LitElement, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import type { DataTableElement } from '../data-table/data-table.js';
import { TOOL_PANEL_TAG_NAME, TOOL_PANEL_TOOL_ICONS, TOOL_PANEL_TOOL_LABELS, TOOL_PANEL_TOOLS } from './constants.js';

import '@tylertech/forge/card';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/tooltip';

import styles from './tool-panel.scss';

/**
 * A panel of tools for a `forge-data-table`.
 *
 * Renders a card with a vertical stack of icon buttons, one for each tool: columns and filters.
 * Connect a data table by setting `table` to its id, or by assigning the element to `tableElement`.
 *
 * @tag forge-data-table-tool-panel
 */
@customElement(TOOL_PANEL_TAG_NAME)
export class ToolPanelElement extends LitElement {
  static {
    IconRegistry.define([tylIconFilterList, tylIconViewColumn]);
  }

  public static override styles = unsafeCSS(styles);

  /**
   * The id of the data table that the tool panel controls. The table is looked up in the same root as the tool panel and assigned to `tableElement`.
   */
  @property()
  public table: string | undefined;

  /**
   * The data table that the tool panel controls. Set by `table`, or assign it directly.
   */
  @property({ attribute: false })
  public tableElement: DataTableElement<any> | null = null;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }
    const elementAssigned = changedProperties.has('tableElement') && this.tableElement !== null;
    if (changedProperties.has('table') && !elementAssigned) {
      this.tableElement = this.#findTable();
    }
  }

  public override render(): TemplateResult {
    return html`
      <forge-card>
        <div class="tools" role="group" aria-label="Table tools">
          ${map(
            TOOL_PANEL_TOOLS,
            tool => html`
              <forge-icon-button id=${`${tool}-button`} shape="squared">
                <forge-icon .name=${TOOL_PANEL_TOOL_ICONS[tool]}></forge-icon>
              </forge-icon-button>
              <forge-tooltip type="label" placement="left" anchor=${`${tool}-button`}>${TOOL_PANEL_TOOL_LABELS[tool]}</forge-tooltip>
            `
          )}
        </div>
      </forge-card>
    `;
  }

  #findTable(): DataTableElement<any> | null {
    if (!this.table) {
      return null;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    return (root.getElementById?.(this.table) as DataTableElement<any> | null) ?? null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TOOL_PANEL_TAG_NAME]: ToolPanelElement;
  }
}
