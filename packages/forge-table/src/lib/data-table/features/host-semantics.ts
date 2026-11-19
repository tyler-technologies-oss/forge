import { toggleState } from '@tylertech/forge';
import type { DataTableElement } from '../data-table.js';

type CustomStateRule = readonly [property: string, state: string, isActive: (host: DataTableElement<any>) => boolean];

const CUSTOM_STATE_RULES: readonly CustomStateRule[] = [
  ['resizable', 'resizable', host => host.resizable],
  ['filterable', 'filterable', host => host.filterable],
  ['rowSelection', 'row-selection', host => host.rowSelection !== 'off'],
  ['cellSelection', 'cell-selection', host => host.cellSelection],
  ['hover', 'hover', host => host.hover],
  ['striped', 'striped', host => host.striped],
  ['bordered', 'bordered', host => host.bordered],
  ['compact', 'compact', host => host.compact],
  ['allowRowClick', 'allow-row-click', host => host.allowRowClick],
  ['stickyHeader', 'sticky-header', host => host.stickyHeader],
  ['stickyFooter', 'sticky-footer', host => host.stickyFooter],
  ['virtualized', 'virtualized', host => host.virtualized]
];

/**
 * Keeps the host's `role`, `aria-multiselectable` and custom states in sync with its properties.
 */
export class HostSemantics {
  readonly #host: DataTableElement<any>;
  readonly #internals: ElementInternals;
  #managedRole: string | undefined;

  constructor(host: DataTableElement<any>, internals: ElementInternals) {
    this.#host = host;
    this.#internals = internals;
  }

  public updateRole(): void {
    const role = this.#host.getAttribute('role');
    if (role === null || role === this.#managedRole) {
      this.#managedRole = this.#host.cellSelection ? 'grid' : 'table';
      this.#host.setAttribute('role', this.#managedRole);
    }
    this.#internals.ariaMultiSelectable = this.#host.cellSelection ? 'true' : null;
  }

  public updateStates(changedProperties: ReadonlyMap<PropertyKey, unknown>): void {
    CUSTOM_STATE_RULES.forEach(([property, state, isActive]) => {
      if (changedProperties.has(property)) {
        toggleState(this.#internals, state, isActive(this.#host));
      }
    });
  }
}
