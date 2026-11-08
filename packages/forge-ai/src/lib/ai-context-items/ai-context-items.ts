import { LitElement, TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ContextItem } from '../types/index.js';

import '../ai-context-chip';
import styles from './ai-context-items.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-context-items': AiContextItemsComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-context-items-remove': CustomEvent<{ id: string; item: ContextItem }>;
  }
}

export const AiContextItemsComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-context-items';

@customElement(AiContextItemsComponentTagName)
export class AiContextItemsComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public items: ContextItem[] = [];

  #handleChipRemove(evt: CustomEvent<{ id: string; item: ContextItem }>): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-context-items-remove', {
        detail: { id: evt.detail.id, item: evt.detail.item },
        bubbles: true,
        composed: true
      })
    );
  }

  get #contextChips(): TemplateResult {
    return html`
      ${this.items.map(
        item => html`
          <forge-ai-context-chip
            .id=${item.id}
            .label=${item.label}
            .sublabel=${item.sublabel}
            .type=${item.type}
            ?loading=${item.loading ?? false}
            ?removable=${item.removable ?? true}
            @forge-ai-context-chip-remove=${this.#handleChipRemove}>
          </forge-ai-context-chip>
        `
      )}
    `;
  }

  public override render(): TemplateResult | typeof nothing {
    if (this.items.length === 0) {
      return nothing;
    }

    return html`
      <div class="context-items">
        <div class="context-list">${this.#contextChips}</div>
      </div>
    `;
  }
}
