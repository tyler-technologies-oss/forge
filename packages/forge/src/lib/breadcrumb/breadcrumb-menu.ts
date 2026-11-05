import { TemplateResult, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { PopoverComponent } from '../popover/popover.js';

import '../popover/popover.js';

/**
 * Renders the popover menu shared by the breadcrumb overflow menu and breadcrumb items with child
 * items, and closes it when a link is activated or focus leaves the host.
 */
export class BreadcrumbMenuController {
  constructor(private readonly _host: HTMLElement) {}

  public renderPopover(anchorId: string, slotName?: string): TemplateResult {
    return html`
      <forge-popover
        part="popover"
        class="popover"
        anchor=${anchorId}
        placement="bottom-start"
        preset="list"
        @click=${this.#handleClick}
        @focusout=${this.#handleFocusOut}>
        <div class="list" role="list"><slot name=${ifDefined(slotName)}></slot></div>
      </forge-popover>
    `;
  }

  get #popover(): PopoverComponent | null {
    return this._host.shadowRoot?.querySelector<PopoverComponent>('forge-popover') ?? null;
  }

  #handleClick = (evt: Event): void => {
    if (this.#popover && evt.composedPath().some(el => el instanceof HTMLAnchorElement)) {
      this.#popover.open = false;
    }
  };

  #handleFocusOut = (evt: FocusEvent): void => {
    const { relatedTarget } = evt;
    if (this.#popover && !(relatedTarget instanceof Node && this._host.contains(relatedTarget))) {
      this.#popover.open = false;
    }
  };
}
