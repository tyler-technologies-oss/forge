import { LitElement, html, type TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './ai-dropdown-menu-separator.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-dropdown-menu-separator': ForgeAiDropdownMenuSeparatorComponent;
  }
}

/**
 * @summary A separator component for dividing sections within ai-dropdown-menu.
 *
 * @description
 * This component renders a horizontal divider to visually separate groups of items
 * within a dropdown menu. It uses the forge-divider styling.
 */
@customElement('forge-ai-dropdown-menu-separator')
export class ForgeAiDropdownMenuSeparatorComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  public override connectedCallback(): void {
    super.connectedCallback();
  }

  public override render(): TemplateResult {
    return html`<div class="forge-divider" role="separator"></div>`;
  }
}
