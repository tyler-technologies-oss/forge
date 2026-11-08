import { LitElement, TemplateResult, html, unsafeCSS, nothing, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import type { Agent } from '../types/index.js';
import { toggleState } from '../utils/dom.js';

import '../core/popover/popover.js';
import '../core/tooltip/tooltip.js';

import styles from './ai-agent-selector.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-agent-selector': AiAgentSelectorComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-agent-selector-change': CustomEvent<ForgeAiAgentSelectorChangeEventData>;
  }
}

export interface ForgeAiAgentSelectorChangeEventData {
  agent: Agent | undefined;
  previousAgentId: string | undefined;
}

export const AiAgentSelectorComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-agent-selector';

const MIN_AGENTS_FOR_FILTER = 5;

/**
 * @summary Agent selector component for switching between AI agents.
 *
 * @description
 * Displays the current agent name with a dropdown to select from available agents.
 * When no agents are provided, displays static title text.
 *
 * @tag forge-ai-agent-selector
 *
 * @property {Agent[]} agents - Array of available agents
 * @property {string} selectedAgentId - ID of the currently selected agent
 * @property {string} titleText - Fallback text when no agent is selected
 * @property {boolean} disabled - Disables the selector (e.g., during streaming)
 *
 * @event forge-ai-agent-selector-change - Fired when an agent is selected
 */
@customElement(AiAgentSelectorComponentTagName)
export class AiAgentSelectorComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @property({ attribute: false })
  public agents: Agent[] = [];

  @property({ attribute: 'selected-agent-id' })
  public selectedAgentId?: string;

  @property({ attribute: 'title-text' })
  public titleText = 'AI Assistant';

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @state()
  private _open = false;

  @state()
  private _focusedIndex = -1;

  @state()
  private _isTextOverflowing = false;

  @state()
  private _filterValue = '';

  @query('#agent-selector-trigger')
  private _triggerButton?: HTMLButtonElement;

  @query('.agent-list')
  private _agentList?: HTMLElement;

  @query('.filter-input')
  private _filterInput?: HTMLInputElement;

  get #selectedAgent(): Agent | undefined {
    return this.agents.find(a => a.id === this.selectedAgentId);
  }

  get #effectiveTitleText(): string {
    return this.titleText || 'AI Assistant';
  }

  get #displayText(): string {
    return this.#selectedAgent?.name ?? this.#effectiveTitleText;
  }

  get #hasAgents(): boolean {
    return this.agents.length > 0;
  }

  get #shouldShowFilter(): boolean {
    return this.agents.length > MIN_AGENTS_FOR_FILTER;
  }

  get #filteredAgents(): Agent[] {
    if (!this._filterValue.trim()) {
      return this.agents;
    }
    const searchQuery = this._filterValue.toLowerCase();
    return this.agents.filter(agent => agent.name.toLowerCase().includes(searchQuery));
  }

  get #tooltipContent(): string {
    const agent = this.#selectedAgent;
    if (!agent) {
      return this.#effectiveTitleText;
    }
    return agent.description ? `${agent.name}\n${agent.description}` : agent.name;
  }

  public override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('_open')) {
      toggleState(this.#internals, 'open', this._open);
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('selectedAgentId') || changedProperties.has('titleText') || changedProperties.has('agents')) {
      this.#checkTextOverflow();
    }
  }

  #checkTextOverflow(): void {
    requestAnimationFrame(() => {
      const textElement = this.shadowRoot?.querySelector('.trigger-text, .title-text') as HTMLElement;
      if (textElement) {
        const isOverflowing = textElement.scrollWidth > textElement.offsetWidth;
        if (this._isTextOverflowing !== isOverflowing) {
          this._isTextOverflowing = isOverflowing;
        }
      }
    });
  }

  #handleTriggerClick(): void {
    if (this.disabled) {
      return;
    }
    this._open = !this._open;
    if (this._open) {
      this._focusedIndex = -1;
    }
  }

  #handlePopoverToggle(event: CustomEvent<{ open: boolean }>): void {
    this._open = event.detail.open;
    if (!this._open) {
      this._focusedIndex = -1;
      this._filterValue = '';
      this._triggerButton?.focus();
    } else {
      this.#scrollToSelectedOrTop();
      this.#focusFilterOrFirstItem();
    }
  }

  #handleFilterInput(event: InputEvent): void {
    this._filterValue = (event.target as HTMLInputElement).value;
    this._focusedIndex = -1;
  }

  #handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (event.target === this._triggerButton) {
          event.preventDefault();
          this._open = true;
        } else if (event.key === 'Enter' && this._open) {
          event.preventDefault();
          if (this._focusedIndex === -1) {
            this.#handleDefaultClick();
          } else if (this._focusedIndex >= 0) {
            this.#selectAgent(this.#filteredAgents[this._focusedIndex]);
          }
        }
        break;

      case 'Escape':
        if (this._open) {
          event.preventDefault();
          event.stopPropagation();
          this._open = false;
          this._triggerButton?.focus();
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (this._open) {
          this.#moveSelection(1);
        } else if (event.target === this._triggerButton) {
          this._open = true;
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this._open) {
          this.#moveSelection(-1);
        }
        break;

      case 'Home':
        if (this._open) {
          event.preventDefault();
          this._focusedIndex = -1; // Default option
          this.#updateItemFocus();
        }
        break;

      case 'End':
        if (this._open) {
          event.preventDefault();
          this._focusedIndex = this.#filteredAgents.length - 1;
          this.#updateItemFocus();
        }
        break;
    }
  }

  #moveSelection(direction: number): void {
    const agents = this.#filteredAgents;

    // -1 = default option, 0+ = agent indices
    let newIndex = this._focusedIndex + direction;

    if (newIndex < -1) {
      newIndex = agents.length - 1; // Wrap to last agent
    } else if (newIndex >= agents.length) {
      newIndex = -1; // Wrap to default
    }

    this._focusedIndex = newIndex;
    this.#updateItemFocus();
  }

  #updateItemFocus(): void {
    const items = this._agentList?.querySelectorAll('.agent-item') as NodeListOf<HTMLElement>;
    const filterHasFocus = this.shadowRoot?.activeElement === this._filterInput;
    // DOM index 0 = default option (_focusedIndex -1), DOM index 1+ = agents (_focusedIndex 0+)
    const domIndex = this._focusedIndex + 1;
    items?.forEach((item, index) => {
      item.setAttribute('tabindex', index === domIndex ? '0' : '-1');
      if (index === domIndex) {
        item.scrollIntoView({ block: 'nearest' });
        if (!filterHasFocus) {
          item.focus();
        }
      }
    });
  }

  #focusFilterOrFirstItem(): void {
    requestAnimationFrame(() => {
      if (this.#shouldShowFilter && this._filterInput) {
        this._filterInput.focus();
      } else {
        this._focusedIndex = -1; // Start at default option
        this.#updateItemFocus();
      }
    });
  }

  async #scrollToSelectedOrTop(): Promise<void> {
    await this.updateComplete;
    if (!this._agentList) {
      return;
    }
    const selectedItem = this._agentList.querySelector('.agent-item--selected') as HTMLElement;
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    } else {
      this._agentList.scrollTop = 0;
    }
  }

  #selectAgent(agent: Agent): void {
    const previousAgentId = this.selectedAgentId;
    if (agent.id === previousAgentId) {
      this._open = false;
      return;
    }

    this.dispatchEvent(
      new CustomEvent('forge-ai-agent-selector-change', {
        detail: { agent, previousAgentId },
        bubbles: true,
        composed: true
      })
    );

    this._open = false;
  }

  #handleAgentClick(agent: Agent): void {
    this.#selectAgent(agent);
  }

  #handleDefaultClick(): void {
    if (this.#isDefaultSelected) {
      this._open = false;
      return;
    }

    this.dispatchEvent(
      new CustomEvent('forge-ai-agent-selector-change', {
        detail: { agent: undefined, previousAgentId: this.selectedAgentId },
        bubbles: true,
        composed: true
      })
    );

    this._open = false;
  }

  get #triggerTemplate(): TemplateResult {
    return html`
      <button
        class="forge-button trigger-button"
        id="agent-selector-trigger"
        ?disabled=${this.disabled}
        aria-haspopup="listbox"
        aria-expanded=${this._open}
        @click=${this.#handleTriggerClick}
        @keydown=${this.#handleKeyDown}>
        <slot name="icon"></slot>
        <span class="trigger-text">${this.#displayText}</span>
        <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
    `;
  }

  get #tooltipTemplate(): TemplateResult | typeof nothing {
    if (!this._isTextOverflowing) {
      return nothing;
    }
    return html` <forge-ai-tooltip for="agent-selector-trigger" placement="bottom"> ${this.#tooltipContent} </forge-ai-tooltip> `;
  }

  get #filterFieldTemplate(): TemplateResult {
    return html`
      <div class="filter-field">
        <div class="forge-field forge-field--small">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="search-icon" aria-hidden="true">
            <path
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
          </svg>
          <input
            type="text"
            class="filter-input"
            placeholder="Search agents..."
            .value=${this._filterValue}
            @input=${this.#handleFilterInput}
            @keydown=${this.#handleKeyDown} />
        </div>
      </div>
    `;
  }

  get #isDefaultSelected(): boolean {
    return this.selectedAgentId === undefined;
  }

  get #defaultOptionTemplate(): TemplateResult {
    const isDefaultFocused = this._focusedIndex === -1 && this._open;
    return html`
      <div
        class=${classMap({
          'agent-item': true,
          'agent-item--default': true,
          'agent-item--focused': isDefaultFocused,
          'agent-item--selected': this.#isDefaultSelected
        })}
        role="option"
        tabindex=${isDefaultFocused ? '0' : '-1'}
        aria-selected=${this.#isDefaultSelected}
        @click=${this.#handleDefaultClick}>
        <span class="agent-item__selection-icon">
          ${when(
            this.#isDefaultSelected,
            () => html`
              <svg class="selection-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
              </svg>
            `
          )}
        </span>
        <span class="agent-name">${this.#effectiveTitleText} (default)</span>
      </div>
      <div class="agent-list-separator" aria-hidden="true"></div>
    `;
  }

  get #agentListTemplate(): TemplateResult | typeof nothing {
    const agents = this.#filteredAgents;
    if (agents.length === 0) {
      return html`<div class="no-results">No agents found</div>`;
    }
    return html`
      ${agents.map(
        (agent, index) => html`
          <div
            class=${classMap({
              'agent-item': true,
              'agent-item--focused': index === this._focusedIndex,
              'agent-item--selected': agent.id === this.selectedAgentId
            })}
            role="option"
            tabindex=${index === this._focusedIndex ? '0' : '-1'}
            aria-selected=${agent.id === this.selectedAgentId}
            @click=${() => this.#handleAgentClick(agent)}>
            <span class="agent-item__selection-icon">
              ${when(
                agent.id === this.selectedAgentId,
                () => html`
                  <svg class="selection-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
                  </svg>
                `
              )}
            </span>
            <span class="agent-name">${agent.name}</span>
          </div>
        `
      )}
    `;
  }

  get #dropdownTemplate(): TemplateResult {
    return html`
      <forge-ai-popover
        .anchor=${this._triggerButton ?? null}
        placement="bottom-start"
        ?open=${this._open}
        .offset=${{ mainAxis: 4 }}
        flip
        shift
        @forge-ai-popover-toggle=${this.#handlePopoverToggle}>
        <div class="dropdown-header">Switch to another agent</div>
        ${when(this.#shouldShowFilter, () => this.#filterFieldTemplate)}
        <div class="agent-list" role="listbox" aria-label="Select an agent" @keydown=${this.#handleKeyDown}>
          ${this.#defaultOptionTemplate} ${this.#agentListTemplate}
        </div>
      </forge-ai-popover>
    `;
  }

  get #staticTitleTemplate(): TemplateResult {
    return html`<span class="title-text" id="agent-selector-trigger">${this.titleText}</span>`;
  }

  public override render(): TemplateResult {
    return html`
      ${when(
        this.#hasAgents,
        () => html` ${this.#triggerTemplate} ${this.#tooltipTemplate} ${this.#dropdownTemplate} `,
        () => this.#staticTitleTemplate
      )}
    `;
  }
}
