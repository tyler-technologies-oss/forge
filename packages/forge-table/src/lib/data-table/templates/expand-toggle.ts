import { html, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@tylertech/forge/icon-button';
import '@tylertech/forge/open-icon';

export interface ExpandToggleOptions {
  expanded: boolean;
  label: string;
  onToggle: () => void;
  id?: string;
  labelledBy?: string;
}

/**
 * Renders the icon button that expands and collapses a row, with an open icon that reflects the expanded state.
 *
 * The click is stopped from reaching the row so toggling does not also trigger row click handlers.
 */
export function renderExpandToggle({ expanded, label, onToggle, id, labelledBy }: ExpandToggleOptions): TemplateResult {
  const onClick = (evt: Event): void => {
    evt.stopPropagation();
    onToggle();
  };

  return html`
    <forge-icon-button
      class="group-toggle"
      part="group-toggle"
      shape="squared"
      dense
      id=${ifDefined(id)}
      aria-label=${label}
      aria-labelledby=${ifDefined(labelledBy)}
      aria-expanded=${String(expanded)}
      @click=${onClick}>
      <forge-open-icon ?open=${expanded} orientation="horizontal" rotation="half"></forge-open-icon>
    </forge-icon-button>
  `;
}
