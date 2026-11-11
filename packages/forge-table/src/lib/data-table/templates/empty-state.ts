import '@tylertech/forge/button';
import { html, TemplateResult } from 'lit';

export interface EmptyStateConfig {
  colSpan: number;
  filtered: boolean;
  onClearFilters: () => void;
}

export function renderEmptyState({ colSpan, filtered, onClearFilters }: EmptyStateConfig): TemplateResult {
  return html`<tbody class="empty-tbody">
    <tr part="empty-state-tr">
      <td colspan=${colSpan} part="empty-state-cell">
        <div class="empty-state" part="empty-state">
          ${filtered
            ? html`
                <p class="empty-state-message">No rows match your filter</p>
                <forge-button type="button" variant="outlined" @click=${onClearFilters}>Clear filters</forge-button>
              `
            : html`<p class="empty-state-message">There are no rows to display</p>`}
        </div>
      </td>
    </tr>
  </tbody>`;
}
