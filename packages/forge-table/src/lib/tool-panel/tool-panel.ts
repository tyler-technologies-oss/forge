import { IconRegistry, type ITreeItemReorderEventData, type TreeItemComponent } from '@tylertech/forge';
import { tylIconFilterList, tylIconViewColumn } from '@tylertech/tyler-icons';
import { html, LitElement, nothing, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import { COLUMN_ORDER_EVENT, COLUMN_VISIBILITY_EVENT, COLUMNS_CHANGE_EVENT } from '../data-table/constants.js';
import type { DataTableElement } from '../data-table/data-table.js';
import { buildColumnTree, type ColumnTreeNode, findColumnTreeNode, getColumnTreeIds, getLeafNodes, moveColumnTreeNode } from './column-tree.js';
import { TOOL_PANEL_DEFAULT_TOOL, TOOL_PANEL_TAG_NAME, TOOL_PANEL_TOOL_ICONS, TOOL_PANEL_TOOL_LABELS, TOOL_PANEL_TOOLS } from './constants.js';

import '@tylertech/forge/card';
import '@tylertech/forge/icon';
import '@tylertech/forge/tabs';
import '@tylertech/forge/tooltip';
import '@tylertech/forge/tree';

import styles from './tool-panel.scss';

/**
 * A panel of tools for a `forge-data-table`.
 *
 * Renders a card with a vertical tab bar of icon tabs, one for each tool: columns and filters. The columns tab controls a tab panel, to the left of the
 * tab bar, that holds a tree of the table's columns; it is the active tab at first. The tree nests the columns of a column group under it, and its checkboxes show and hide the columns: checking or unchecking a group does
 * so for all of its columns. Reordering the items reorders the columns within their group; a column can't be moved out of its group or into another one.
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

  #observedTable: DataTableElement<any> | undefined;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#observe(this.tableElement);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#observe(null);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }
    const elementAssigned = changedProperties.has('tableElement') && this.tableElement !== null;
    if (changedProperties.has('table') && !elementAssigned) {
      this.tableElement = this.#findTable();
    }
    if (this.tableElement !== this.#observedTable) {
      this.#observe(this.tableElement);
    }
  }

  public override render(): TemplateResult {
    return html`
      <forge-card>
        <div class="content">
          ${this.#renderColumnTree()}
          <forge-tab-bar class="tools" vertical active-tab-name=${TOOL_PANEL_DEFAULT_TOOL} aria-label="Table tools" inverted>
            ${map(
              TOOL_PANEL_TOOLS,
              tool => html`
                <forge-tab id=${`${tool}-tab`} name=${tool} aria-label=${TOOL_PANEL_TOOL_LABELS[tool]}>
                  <forge-icon slot="start" .name=${TOOL_PANEL_TOOL_ICONS[tool]}></forge-icon>
                </forge-tab>
              `
            )}
          </forge-tab-bar>
          ${map(
            TOOL_PANEL_TOOLS,
            tool => html`<forge-tooltip type="label" placement="left" anchor=${`${tool}-tab`}>${TOOL_PANEL_TOOL_LABELS[tool]}</forge-tooltip>`
          )}
        </div>
      </forge-card>
    `;
  }

  #renderColumnTree(): TemplateResult | typeof nothing {
    const table = this.tableElement;
    if (!table) {
      return nothing;
    }
    const tree = this.#getColumnTree();
    const hasGroups = tree.some(node => node.children.length > 0);
    return html`
      <forge-tab-panel class="column-panel" for="columns-tab">
        <forge-tree
          class=${hasGroups ? 'column-tree' : 'column-tree no-groups'}
          mode="multiple"
          reorderable
          aria-label="Columns"
          @forge-tree-item-select=${this.#onColumnSelect}
          @forge-tree-item-reorder=${this.#onColumnReorder}>
          ${repeat(
            tree,
            node => node.id,
            node => this.#renderColumnNode(node, table)
          )}
        </forge-tree>
      </forge-tab-panel>
    `;
  }

  #renderColumnNode(node: ColumnTreeNode, table: DataTableElement<any>): TemplateResult {
    if (!node.children.length) {
      return html`
        <forge-tree-item .value=${node.id} .selected=${live(table.columnVisibility[node.id] !== false)} ?disabled=${!node.hideable}>
          ${node.label}
        </forge-tree-item>
      `;
    }
    return html`
      <forge-tree-item .value=${node.id} ?disabled=${!node.hideable} open>
        ${node.label}
        ${repeat(
          node.children,
          child => child.id,
          child => this.#renderColumnNode(child, table)
        )}
      </forge-tree-item>
    `;
  }

  #getColumnTree(): ColumnTreeNode[] {
    const table = this.tableElement;
    return table ? buildColumnTree(table.columns, table.columnOrder) : [];
  }

  #onColumnSelect = (evt: CustomEvent<unknown>): void => {
    const table = this.tableElement;
    const item = evt.target as TreeItemComponent;
    const node = findColumnTreeNode(this.#getColumnTree(), String(evt.detail));
    if (!table || !node) {
      return;
    }
    getLeafNodes(node).forEach(({ id }) => (item.selected ? table.showColumn(id) : table.hideColumn(id)));
    this.requestUpdate();
  };

  #onColumnReorder = async (evt: CustomEvent<ITreeItemReorderEventData>): Promise<void> => {
    evt.preventDefault();
    const table = this.tableElement;
    const { item, parent, previousParent } = evt.detail;
    if (!table) {
      return;
    }
    const tree = this.#getColumnTree();
    const getParentId = (element: Element): string | undefined => (element === evt.currentTarget ? undefined : String((element as TreeItemComponent).value));
    const parentId = getParentId(parent);
    const previousParentId = getParentId(previousParent);
    const id = String(item.value);
    const siblings = (previousParentId === undefined ? tree : (findColumnTreeNode(tree, previousParentId)?.children ?? [])).map(node => node.id);

    let index = evt.detail.index;
    if (parent !== previousParent) {
      if (parentId === undefined || !siblings.includes(parentId)) {
        return;
      }
      index = siblings.indexOf(parentId);
    }

    const ids = getColumnTreeIds(moveColumnTreeNode(tree, previousParentId, id, index));
    const treeIds = new Set(ids);
    const hadFocus = item.matches(':focus-within');
    table.setColumnOrder([...table.columnOrder.filter(columnId => !treeIds.has(columnId)), ...ids]);
    if (hadFocus) {
      await this.updateComplete;
      item.focus();
    }
  };

  #observe(table: DataTableElement<any> | null): void {
    this.#observedTable?.removeEventListener(COLUMNS_CHANGE_EVENT, this.#onTableColumnsChange);
    this.#observedTable?.removeEventListener(COLUMN_VISIBILITY_EVENT, this.#onTableColumnsChange);
    this.#observedTable?.removeEventListener(COLUMN_ORDER_EVENT, this.#onTableColumnsChange);
    this.#observedTable = table ?? undefined;
    table?.addEventListener(COLUMNS_CHANGE_EVENT, this.#onTableColumnsChange);
    table?.addEventListener(COLUMN_VISIBILITY_EVENT, this.#onTableColumnsChange);
    table?.addEventListener(COLUMN_ORDER_EVENT, this.#onTableColumnsChange);
  }

  #onTableColumnsChange = (): void => this.requestUpdate();

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
