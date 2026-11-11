import { LitElement, TemplateResult, html, unsafeCSS, PropertyValues } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import type { AiModalComponent } from '../ai-modal/index.js';
import type { Agent, HeadingLevel } from '../types/index.js';
import type { ForgeAiAgentSelectorChangeEventData } from '../ai-agent-selector/index.js';
import '../ai-icon/ai-icon.js';
import '../core/tooltip/tooltip.js';
import '../ai-dropdown-menu/ai-dropdown-menu.js';
import '../ai-dropdown-menu/ai-dropdown-menu-item.js';
import '../ai-dropdown-menu/ai-dropdown-menu-separator.js';
import '../ai-modal/ai-modal.js';
import '../ai-agent-info/ai-agent-info.js';
import '../ai-agent-selector/ai-agent-selector.js';

import styles from './ai-chat-header.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-chat-header': AiChatHeaderComponent;
  }
}

export const AiChatHeaderComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-chat-header';

declare global {
  interface HTMLElementEventMap {
    'forge-ai-chat-header-expand': CustomEvent<void>;
    'forge-ai-chat-header-minimize': CustomEvent<void>;
    'forge-ai-chat-header-clear': CustomEvent<void>;
    'forge-ai-chat-header-export': CustomEvent<void>;
    'forge-ai-chat-header-agent-change': CustomEvent<ForgeAiChatHeaderAgentChangeEventData>;
    'forge-ai-chat-header-conversations-toggle': CustomEvent<void>;
  }
}

export interface ForgeAiChatHeaderAgentChangeEventData {
  agent: Agent | undefined;
  previousAgentId: string | undefined;
}

export type MinimizeIconType = 'default' | 'panel';

export type OptionState = 'enabled' | 'off';

export interface AgentInfo {
  name?: string;
  description?: string;
  identifier?: string;
  version?: string;
  model?: string;
  lastUpdated?: string;
}

/**
 * @summary AI chat header component with accessible tooltips
 *
 * @description
 * A header component for AI chat interfaces that includes an AI icon, title,
 * and action buttons (info, expand/collapse, minimize) with integrated tooltips
 * for improved accessibility and user experience.
 *
 * @tag forge-ai-chat-header
 *
 * @slot icon - Slot for custom icon (default: forge-ai-icon)
 * @slot header-actions - Slot for custom header action buttons (rendered before built-in header actions)
 * @slot thread-name - Slot for content to be rendered after the title
 *
 * @property {HeadingLevel} headingLevel - Controls the heading level for the title content (default: 2)
 * @property {string} titleText - The title text to display in the header (default: 'AI Assistant')
 * @property {boolean} hasConversationsError - Shows an error badge on the conversations button, indicating a failure inside the conversations panel (default: false)
 *
 * @cssproperty --forge-ai-chat-header-title-color - The color of the title text. Defaults to `currentColor`.
 *
 * @event {CustomEvent<void>} forge-ai-chat-header-expand - Fired when the expand button is clicked
 * @event {CustomEvent<void>} forge-ai-chat-header-minimize - Fired when the minimize button is clicked
 * @event {CustomEvent<void>} forge-ai-chat-header-clear - Fired when the clear chat option is selected
 * @event {CustomEvent<void>} forge-ai-chat-header-export - Fired when the export option is selected
 * @event {CustomEvent<ForgeAiChatHeaderAgentChangeEventData>} forge-ai-chat-header-agent-change - Fired when an agent is selected
 * @event {CustomEvent<void>} forge-ai-chat-header-conversations-toggle - Fired when the conversations button is clicked
 */
@customElement(AiChatHeaderComponentTagName)
export class AiChatHeaderComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * Controls whether the expand button is visible
   */
  @property({ type: Boolean, attribute: 'show-expand-button' })
  public showExpandButton = false;

  /**
   * Controls whether the minimize button is visible
   */
  @property({ type: Boolean, attribute: 'show-minimize-button' })
  public showMinimizeButton = false;

  /**
   * Indicates the current expanded state for displaying the appropriate expand/collapse icon
   */
  @property({ type: Boolean })
  public expanded = false;

  /**
   * Controls which minimize icon to display
   */
  @property({ attribute: 'minimize-icon' })
  public minimizeIcon: MinimizeIconType = 'default';

  /**
   * Agent information to display in the info dialog
   */
  @property({ type: Object, attribute: false })
  public agentInfo?: AgentInfo;

  /**
   * Controls state of the options dropdown menu
   */
  @property()
  public options: OptionState = 'enabled';

  /**
   * Controls state of the export option
   */
  @property({ attribute: 'export-option' })
  public exportOption: OptionState = 'enabled';

  /**
   * Controls state of the clear chat option
   */
  @property({ attribute: 'clear-option' })
  public clearOption: OptionState = 'enabled';

  /**
   * Controls the heading level for the title content
   */
  @property({ attribute: 'heading-level', type: Number })
  public headingLevel: HeadingLevel = 2;

  /**
   * The title text to display in the header
   */
  @property({ attribute: 'title-text' })
  public titleText = 'AI Assistant';

  /**
   * Array of available agents for the agent selector
   */
  @property({ attribute: false })
  public agents: Agent[] = [];

  /**
   * ID of the currently selected agent
   */
  @property({ attribute: 'selected-agent-id' })
  public selectedAgentId?: string;

  /**
   * Disables the agent selector (e.g., during streaming)
   */
  @property({ type: Boolean, attribute: 'disable-agent-selector' })
  public disableAgentSelector = false;

  /**
   * Shows the conversations button (hamburger menu) for accessing conversation history
   */
  @property({ type: Boolean, attribute: 'show-conversations-button' })
  public showConversationsButton = false;

  /**
   * Shows an error badge on the conversations button, indicating a failure inside the conversations panel
   */
  @property({ type: Boolean, attribute: 'has-conversations-error' })
  public hasConversationsError = false;

  #agentInfoModalRef: Ref<AiModalComponent> = createRef();

  @state()
  private _isTitleOverflowing = false;

  public override updated(changedProperties: PropertyValues<this>): void {
    if ((changedProperties.has('titleText') || changedProperties.has('headingLevel')) && this.agents.length === 0) {
      this.#checkTitleOverflow();
    }
  }

  get #hasAvailableOptions(): boolean {
    return this.exportOption === 'enabled' || this.clearOption === 'enabled' || !!this.agentInfo;
  }

  get #titleElement(): TemplateResult {
    if (this.agents.length) {
      return html`
        <forge-ai-agent-selector
          .agents=${this.agents}
          .selectedAgentId=${this.selectedAgentId}
          .titleText=${this.titleText}
          ?disabled=${this.disableAgentSelector}
          @forge-ai-agent-selector-change=${this.#handleAgentChange}>
          <slot name="icon" slot="icon">
            <forge-ai-icon></forge-ai-icon>
          </slot>
        </forge-ai-agent-selector>
      `;
    }

    const tagName = unsafeStatic(`h${this.headingLevel}`);
    return staticHtml`
      <slot name="icon" slot="icon">
        <forge-ai-icon></forge-ai-icon>
      </slot>
      <${tagName} class="title" id="title-container">${this.titleText}</${tagName}>
      ${when(this._isTitleOverflowing, () => html`<forge-ai-tooltip for="title-container" placement="bottom">${this.titleText}</forge-ai-tooltip>`)}
    `;
  }

  public override render(): TemplateResult {
    return html`
      <div class="header">
        <div class="start" id="title-container">
          ${when(
            this.showConversationsButton,
            () => html`
              <button
                id="conversations-button"
                @click=${this.#handleConversationsToggle}
                aria-label=${this.hasConversationsError ? 'Toggle conversations panel - Failed to load' : 'Toggle conversations panel'}
                class="conversations-button forge-icon-button forge-icon-button--medium ai-icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                </svg>
                ${when(this.hasConversationsError, () => html`<span class="forge-badge forge-badge--dot conversations-button__error-badge"></span>`)}
              </button>
            `
          )}
          ${this.#titleElement}
          <slot name="thread-name"></slot>
        </div>
        <div class="end">
          <slot name="header-actions"></slot>
          ${when(
            this.showMinimizeButton,
            () => html`
              <button
                id="minimize-button"
                @click=${this.#handleMinimizeClick}
                aria-label="Minimize chat window"
                class="forge-icon-button forge-icon-button--medium ai-icon-button">
                ${when(
                  this.minimizeIcon === 'default',
                  () => html`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M6 19h12v2H6z" />
                    </svg>
                  `,
                  () => html`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <defs>
                        <style>
                          .cls-1 {
                            fill: none;
                          }
                        </style>
                      </defs>
                      <path d="M0 0h24v24H0Z" class="cls-1" />
                      <path d="M0 0h24v24H0Z" class="cls-1" />
                      <path d="M0 0h24v24H0Z" class="cls-1" />
                      <path d="M15.89 5H3v14h12.89ZM7.65 15.46l2.58-2.59H4.56v-2h5.67L7.65 8.28l1.41-1.41 5 5-5 5ZM17.89 4.98H21v14.04h-3.11z" class="cls-1" />
                      <path d="M9.06 6.87 7.65 8.28l2.58 2.59H4.56v2h5.67l-2.58 2.59 1.41 1.41 5-5z" />
                      <path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M3 5h12.89v14H3Zm18 14h-3.11V5H21Z" />
                    </svg>
                  `
                )}
              </button>
              <forge-ai-tooltip id="minimize-tooltip" for="minimize-button" placement="bottom"> Minimize chat to taskbar </forge-ai-tooltip>
            `
          )}
          ${when(
            this.showExpandButton,
            () => html`
              <button
                id="expand-button"
                @click=${this.#handleExpandClick}
                aria-label=${this.expanded ? 'Collapse chat window' : 'Expand chat window'}
                class="forge-icon-button forge-icon-button--medium ai-icon-button">
                ${when(
                  this.expanded,
                  () => html`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 14h5v2h-3v3h-2zm-9 0h5v5H8v-3H5zm3-9h2v5H5V8h3zm11 3v2h-5V5h2v3z" />
                    </svg>
                  `,
                  () => html`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zm3 9h2v5h-5v-2h3zm-7 3v2H5v-5h2v3z" />
                    </svg>
                  `
                )}
              </button>
              <forge-ai-tooltip id="expand-tooltip" for="expand-button" placement="bottom">
                ${this.expanded ? 'Collapse to smaller window' : 'Expand to full window'}
              </forge-ai-tooltip>
            `
          )}
          ${when(
            this.options === 'enabled' && this.#hasAvailableOptions,
            () => html`
              <forge-ai-dropdown-menu
                variant="icon-button"
                popover-placement="bottom-end"
                selection-mode="none"
                trigger-label="More options"
                @forge-ai-dropdown-menu-change=${this.#handleDropdownChange}>
                <svg slot="trigger-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="forge-icon ai-icon-button">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
                </svg>
                ${when(
                  this.exportOption === 'enabled',
                  () => html`
                    <forge-ai-dropdown-menu-item value="export">
                      <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                        <path d="m15.61 8.92 1.41-1.41-5-5-5 5 1.41 1.41 2.59-2.58v9.67h2V6.34z" />
                        <path d="M19.05 14.06V19h-14v-4.94h-2V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.94z" />
                      </svg>
                      <span>Export current chat</span>
                    </forge-ai-dropdown-menu-item>
                  `
                )}
                ${when(
                  this.agentInfo,
                  () => html`
                    <forge-ai-dropdown-menu-item value="info">
                      <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8" />
                      </svg>
                      <span>Info</span>
                    </forge-ai-dropdown-menu-item>
                  `
                )}
                ${when(
                  this.clearOption === 'enabled' && (this.agentInfo || this.exportOption === 'enabled'),
                  () => html`<forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>`
                )}
                ${when(
                  this.clearOption === 'enabled',
                  () => html`
                    <forge-ai-dropdown-menu-item value="clear-chat">
                      <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                      <span>Clear chat</span>
                    </forge-ai-dropdown-menu-item>
                  `
                )}
              </forge-ai-dropdown-menu>
            `
          )}
        </div>
      </div>
      ${when(
        this.agentInfo,
        () => html`
          <forge-ai-modal ${ref(this.#agentInfoModalRef)} label="Agent Information">
            <div class="forge-scaffold">
              <div class="forge-scaffold__header">
                <div class="forge-toolbar">
                  <h2 class="forge-toolbar__start agent-info-title">Agent Information</h2>
                  <div class="forge-toolbar__end">
                    <button
                      class="forge-icon-button forge-icon-button--medium ai-icon-button close-button"
                      @click=${this.#handleModalClose}
                      aria-label="Close agent information dialog">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="forge-scaffold__body">
                <div class="agent-info-content">
                  <forge-ai-agent-info .agentInfo=${this.agentInfo}></forge-ai-agent-info>
                </div>
              </div>
              <div class="forge-scaffold__footer">
                <div class="forge-toolbar forge-toolbar--inverted">
                  <button class="forge-button forge-button--filled forge-toolbar__end" autofocus @click=${this.#handleModalClose}>Close</button>
                </div>
              </div>
            </div>
          </forge-ai-modal>
        `
      )}
    `;
  }

  #checkTitleOverflow(): void {
    const titleElement = this.shadowRoot?.querySelector('.title') as HTMLElement;
    if (titleElement) {
      const isOverflowing = titleElement.scrollWidth > titleElement.offsetWidth;
      if (this._isTitleOverflowing !== isOverflowing) {
        this._isTitleOverflowing = isOverflowing;
      }
    }
  }

  #handleExpandClick(): void {
    const event = new CustomEvent('forge-ai-chat-header-expand', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleMinimizeClick(): void {
    const event = new CustomEvent('forge-ai-chat-header-minimize', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleDropdownChange(event: CustomEvent): void {
    const value = event.detail.value;

    switch (value) {
      case 'export':
        this.dispatchEvent(
          new CustomEvent('forge-ai-chat-header-export', {
            bubbles: true,
            composed: true
          })
        );
        break;
      case 'info':
        this.#agentInfoModalRef.value?.show();
        break;
      case 'clear-chat':
        this.dispatchEvent(
          new CustomEvent('forge-ai-chat-header-clear', {
            bubbles: true,
            composed: true
          })
        );
        break;
    }
  }

  #handleModalClose(): void {
    this.#agentInfoModalRef.value?.close();
  }

  #handleAgentChange(event: CustomEvent<ForgeAiAgentSelectorChangeEventData>): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-chat-header-agent-change', {
        detail: event.detail,
        bubbles: true,
        composed: true
      })
    );
  }

  #handleConversationsToggle(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-chat-header-conversations-toggle', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Shows the agent info modal
   */
  public showAgentInfo(): void {
    this.#agentInfoModalRef.value?.show();
  }
}
