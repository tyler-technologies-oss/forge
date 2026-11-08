import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { classMap } from 'lit/directives/class-map.js';
import { KeyboardNavigationController } from '../utils/keyboard-navigation-controller.js';
import type { SlashCommand, ForgeAiSlashCommandMenuSelectEventData } from '../types/index.js';

import styles from './ai-slash-command-menu.scss?inline';

import '../ai-dropdown-menu/ai-dropdown-menu-item.js';
import '../core/popover/popover.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-slash-command-menu': AiSlashCommandMenuComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-slash-command-menu-select': CustomEvent<ForgeAiSlashCommandMenuSelectEventData>;
    'forge-ai-slash-command-menu-close': CustomEvent<void>;
  }
}

export const AiSlashCommandMenuComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-slash-command-menu';

/**
 * @tag forge-ai-slash-command-menu
 *
 * @event {CustomEvent<ForgeAiSlashCommandMenuSelectEventData>} forge-ai-slash-command-menu-select - Fired when a command is selected.
 * @event {CustomEvent<void>} forge-ai-slash-command-menu-close - Fired when the menu should close.
 */
@customElement(AiSlashCommandMenuComponentTagName)
export class AiSlashCommandMenuComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: Array, attribute: false })
  public commands: SlashCommand[] = [];

  @property({ type: String, attribute: 'filter-query' })
  public filterQuery = '';

  @property({ type: Boolean })
  public open = false;

  @property({ type: Object, attribute: false })
  public anchor: HTMLElement | null = null;

  @property({ type: Object, attribute: false })
  public widthReference: HTMLElement | null = null;

  @state()
  private _filteredCommands: SlashCommand[] = [];

  #slashNavController!: KeyboardNavigationController;

  constructor() {
    super();
    this.#slashNavController = new KeyboardNavigationController({
      onSelect: index => this.#executeSlashCommand(index),
      onClose: () => this.#closeMenu(),
      onNavigate: () => this.requestUpdate()
    });
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('commands') || changedProperties.has('filterQuery') || changedProperties.has('open')) {
      if (this.open) {
        this.#filterCommands();
      } else {
        this._filteredCommands = [];
        this.#slashNavController.reset();
      }
    }
  }

  #filterCommands(): void {
    if (!this.filterQuery) {
      this._filteredCommands = [...this.commands];
    } else {
      const lowerQuery = this.filterQuery.toLowerCase();
      this._filteredCommands = this.commands.filter((cmd: SlashCommand) => cmd.name.toLowerCase().includes(lowerQuery));
    }
    this.#slashNavController.reset();
  }

  #executeSlashCommand(index: number): void {
    const command = this._filteredCommands[index];
    if (!command) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('forge-ai-slash-command-menu-select', {
        detail: {
          command,
          index
        },
        bubbles: true,
        composed: true
      })
    );
  }

  #closeMenu(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-slash-command-menu-close', {
        bubbles: true,
        composed: true
      })
    );
  }

  #handlePopoverToggle(event: CustomEvent): void {
    if (!event.detail.open && this.open) {
      this.#closeMenu();
    }
  }

  get #menuWidth(): number {
    return this.widthReference?.offsetWidth ?? this.anchor?.offsetWidth ?? 300;
  }

  get #menuItems(): TemplateResult {
    if (this._filteredCommands.length === 0) {
      return html` <div class="slash-command-menu__empty">No commands found</div> `;
    }

    const commandsByGroup = new Map<string, SlashCommand[]>();
    this._filteredCommands.forEach(cmd => {
      if (!commandsByGroup.has(cmd.group)) {
        commandsByGroup.set(cmd.group, []);
      }
      const groupCommands = commandsByGroup.get(cmd.group);
      if (groupCommands) {
        groupCommands.push(cmd);
      }
    });

    const groups = Array.from(commandsByGroup.entries());

    return html`
      ${groups.map(
        ([group, commands], groupIndex) => html`
          ${groupIndex > 0 ? html`<div class="slash-command-menu__divider"></div>` : nothing}
          <div class="slash-command-menu__group">
            <div class="slash-command-menu__group-label">${group}</div>
            ${commands.map(cmd => {
              const globalIndex = this._filteredCommands.indexOf(cmd);
              const isSelected = globalIndex === this.#slashNavController.selectedIndex;
              return html`
                <forge-ai-dropdown-menu-item
                  class=${classMap({ selected: isSelected })}
                  .value=${cmd.name}
                  selection-mode="none"
                  @click=${() => this.#executeSlashCommand(globalIndex)}>
                  ${cmd.name}
                </forge-ai-dropdown-menu-item>
              `;
            })}
          </div>
        `
      )}
    `;
  }

  public handleKeyDown(event: KeyboardEvent): boolean {
    return this.#slashNavController.handleKeyDown(event, this._filteredCommands.length);
  }

  public reset(): void {
    this.#slashNavController.reset();
  }

  public override render(): TemplateResult {
    return html`
      ${when(
        this.open && this.anchor,
        () => html`
          <forge-ai-popover
            .anchor=${this.anchor}
            placement="top-start"
            .open=${this.open}
            dismiss-mode="manual"
            .offset=${{ mainAxis: 8, crossAxis: -14 }}
            @forge-ai-popover-toggle=${this.#handlePopoverToggle}>
            <div class="slash-command-menu__header">
              <span>Slash Commands</span>
              <button @click=${this.#closeMenu} aria-label="Close menu" class="forge-icon-button forge-icon-button--small ai-icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div class="slash-command-menu" style="width: ${this.#menuWidth}px">${this.#menuItems}</div>
          </forge-ai-popover>
        `
      )}
    `;
  }
}
