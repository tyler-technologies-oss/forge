import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { LISTBOX_TAG_NAME } from '../../listbox/listbox.js';
import { IOptionGroupConfigComponent, OptionGroupConfigComponent } from './option-group-config.js';
import { OPTION_GROUP_CONSTANTS } from './option-group-constants.js';

import { classMap } from 'lit/directives/class-map.js';
import styles from './option-group.scss';

/** @deprecated - This will be removed in the future. Please switch to using OptionGroupComponent. */
export interface IOptionGroupComponent extends IOptionGroupConfigComponent {}

/**
 * @tag forge-option-group
 *
 * @summary Groups related options together with an optional label within select components.
 */
@customElement(OPTION_GROUP_CONSTANTS.elementName)
export class OptionGroupComponent extends OptionGroupConfigComponent implements IOptionGroupComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = OPTION_GROUP_CONSTANTS.elementName;

  @query('#label', true)
  private _labelElement!: HTMLElement;

  #internals: ElementInternals;
  #configOnly = true;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    // Check if this option group should render its own DOM
    this.#configOnly = !this.closest(LISTBOX_TAG_NAME);

    if (this.#configOnly) {
      return this; // Light DOM for config-only option group
    }

    this.#setupAria();
    return super.createRenderRoot();
  }

  public firstUpdated(): void {
    if (!this.#configOnly) {
      this.#internals.ariaLabelledByElements = [this._labelElement];
    }
  }

  public render(): TemplateResult {
    // Only render template when using shadow root (within listbox)
    if (this.#configOnly) {
      return html``;
    }

    const classes = {
      'forge-option-group': true
    };

    return html`
      <div class=${classMap(classes)}>
        <div id="label" class="label" part="label" role="presentation">
          <slot name="label"></slot>
        </div>
        <slot></slot>
      </div>
    `;
  }

  #setupAria(): void {
    if (this.isConnected) {
      setDefaultAria(this, this.#internals, { role: 'group' });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option-group': OptionGroupComponent;
  }
}
