import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { SlotTextController, hideWhenEmpty } from '../core/utils/lit-utils.js';
import { toggleState } from '../core/utils/utils.js';
import { CardComponent } from '../card/index.js';
import { TooltipComponent } from '../tooltip/index.js';
import { COUNT_CARD_THEME_STATES, CountCardTheme } from './count-card-constants.js';

import '../card/card.js';
import '../tooltip/tooltip.js';

import styles from './count-card.scss';

export interface ICountCardComponent extends BaseLitElement {
  theme: CountCardTheme;
  noBorder: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-count-card': ICountCardComponent;
  }
}

export const COUNT_CARD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-count-card';

/**
 * @tag forge-count-card
 *
 * @summary A card component for displaying a count or metric with an icon and label.
 *
 * @meta extended
 *
 * @dependency forge-card
 * @dependency forge-tooltip
 *
 * @slot icon - The icon displayed at the start of the card header.
 * @slot label - The label text displayed next to the icon.
 * @slot header-end - Optional content at the end of the header, ideal for badges or small accessories.
 * @slot action - Optional slot for a `forge-icon-button`. Use this instead of `header-end` for icon buttons, as it provides proper alignment for the 48x48 touch target.
 * @slot count - The main count or value displayed prominently below the header.
 * @slot count-end - Optional content displayed after the count, ideal for units or secondary values.
 * @slot body - Optional content below the count for additional details or secondary information.
 * @slot full-width - Optional full-width content below the primary card content, ideal for sparklines, meters, or progress indicators.
 *
 * @cssproperty --forge-count-card-icon-background - Controls the background color of the icon container. Defaults to Forge's surface-container color.
 * @cssproperty --forge-count-card-icon-color - Controls the color of the icon. Defaults to Forge's on-surface color.
 * @cssproperty --forge-count-card-icon-container-size - Controls the size of the icon container. Defaults to `32px`.
 * @cssproperty --forge-count-card-icon-size - Controls the size of the icon itself. Defaults to `24px`.
 * @cssproperty --forge-count-card-color - Controls the text color of the label and count. Inherited from theme when a theme is applied.
 *
 * @state none - Applied when the theme is set to `none`. Uses the default card styling.
 * @state primary - Applied when the theme is set to `primary`.
 * @state secondary - Applied when the theme is set to `secondary`.
 * @state tertiary - Applied when the theme is set to `tertiary`.
 * @state success - Applied when the theme is set to `success`.
 * @state error - Applied when the theme is set to `error`.
 * @state warning - Applied when the theme is set to `warning`.
 * @state info - Applied when the theme is set to `info`.
 * @state info-secondary - Applied when the theme is set to `info-secondary`. Provides a subtle tonal style.
 * @state no-border - Applied when the `noBorder` property is `true`.
 * @state has-action - Applied when content is slotted into the `action` slot.
 */
@customElement(COUNT_CARD_TAG_NAME)
export class CountCardComponent extends BaseLitElement implements ICountCardComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = COUNT_CARD_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [CardComponent, TooltipComponent];

  public static styles = unsafeCSS(styles);

  /** The theme variant applied to the card. */
  @property({ type: String })
  public theme: CountCardTheme = 'none';

  /** Whether to hide the card border. */
  @property({ type: Boolean, attribute: 'no-border' })
  public noBorder = false;

  @queryAssignedNodes({ slot: 'action', flatten: true })
  private readonly _actionSlotNodes!: Node[];

  readonly #internals: ElementInternals;
  readonly #labelController = new SlotTextController(this, { slotName: 'label' });
  readonly #countController = new SlotTextController(this, { slotName: 'count' });

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('theme')) {
      for (const themeState of COUNT_CARD_THEME_STATES) {
        toggleState(this.#internals, themeState, this.theme === themeState);
      }
    }
    if (changedProperties.has('noBorder')) {
      toggleState(this.#internals, 'no-border', this.noBorder);
    }
  }

  public render(): TemplateResult {
    return html`
      <forge-card>
        <div class="outer-container">
          <div class="header">
            <div class="header-start">
              <div class="icon-container" ${hideWhenEmpty()}>
                <slot name="icon"></slot>
              </div>
              <div class="label" ${hideWhenEmpty()}>
                <slot name="label" @slotchange=${this.#labelController.handleSlotChange}></slot>
              </div>
              ${this.#labelController.text ? html`<forge-tooltip>${this.#labelController.text}</forge-tooltip>` : nothing}
            </div>
            <div class="header-end" ${hideWhenEmpty()}>
              <slot name="header-end"></slot>
            </div>
            <div class="action" ${hideWhenEmpty()}>
              <slot name="action" @slotchange=${this.#handleActionSlotChange}></slot>
            </div>
          </div>
          <div class="inner-container">
            <div class="count-container" ${hideWhenEmpty()}>
              <div class="count">
                <slot name="count" @slotchange=${this.#countController.handleSlotChange}></slot>
              </div>
              ${this.#countController.text ? html`<forge-tooltip>${this.#countController.text}</forge-tooltip>` : nothing}
              <slot name="count-end"></slot>
            </div>
            <div ${hideWhenEmpty()}>
              <slot name="body"></slot>
            </div>
          </div>
          <div ${hideWhenEmpty()}>
            <slot name="full-width"></slot>
          </div>
        </div>
      </forge-card>
    `;
  }

  #handleActionSlotChange(): void {
    toggleState(this.#internals, 'has-action', this._actionSlotNodes.length > 0);
  }
}
