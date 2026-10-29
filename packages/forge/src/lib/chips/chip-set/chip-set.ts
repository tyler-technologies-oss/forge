import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { removeDefaultAttribute } from '../../core/utils/lit-utils.js';
import { ChipComponent, IChipComponent } from '../chip/chip.js';
import { ChipTheme, ChipType, CHIP_CONSTANTS, IChipNavigateEventData } from '../chip/chip-constants.js';
import { CHIP_SET_CONSTANTS } from './chip-set-constants.js';

import styles from './chip-set.scss';

/** @deprecated - This will be removed in the future. Please switch to using ChipSetComponent. */
export interface IChipSetComponent extends BaseLitElement {
  vertical: boolean;
  type: ChipType;
  dense: boolean;
  disabled: boolean;
  invalid: boolean;
  theme: ChipTheme;
}

type SyncedChipProperty = 'type' | 'dense' | 'disabled' | 'invalid' | 'theme';

const SYNCED_CHIP_PROPERTIES: SyncedChipProperty[] = ['type', 'dense', 'disabled', 'invalid', 'theme'];

const SYNCED_CHIP_DEFAULTS: Record<SyncedChipProperty, IChipSetComponent[SyncedChipProperty]> = {
  type: CHIP_CONSTANTS.defaults.TYPE,
  dense: false,
  disabled: false,
  invalid: false,
  theme: CHIP_CONSTANTS.defaults.THEME
};

/**
 * @tag forge-chip-set
 *
 * @summary Chip sets are used to group multiple chips together and orchestrate their behavior.
 *
 * @cssproperty --forge-chip-set-spacing - The spacing between chips.
 *
 * @csspart root - The component's root element.
 *
 * @cssfilepath chips/forge-chips.css
 * @cssclass forge-chip-set - The chip container element.
 * @cssclass forge-chip-set--vertical - Renders the chips vertically.
 *
 * @slot - The chips to display in the chip set.
 */
export class ChipSetComponent extends BaseLitElement implements IChipSetComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CHIP_SET_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ChipComponent];

  /**
   * Whether the chip set is vertically oriented.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  /**
   * The type of chips.
   * @default 'action'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: ChipType) => removeDefaultAttribute(value, CHIP_CONSTANTS.defaults.TYPE) }
  })
  public type: ChipType = CHIP_CONSTANTS.defaults.TYPE;

  /**
   * Whether all chips in the chip set are dense.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  /**
   * Whether all chips in the chip set are disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether all chips in the chip set are invalid.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * The theme of the chips.
   * @default 'primary'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: ChipTheme) => removeDefaultAttribute(value, CHIP_CONSTANTS.defaults.THEME) }
  })
  public theme: ChipTheme = CHIP_CONSTANTS.defaults.THEME;

  #chipNavigateListener = (evt: Event): void => this.#handleChipNavigate(evt as CustomEvent<IChipNavigateEventData>);

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(CHIP_CONSTANTS.events.NAVIGATE, this.#chipNavigateListener);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(CHIP_CONSTANTS.events.NAVIGATE, this.#chipNavigateListener);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    for (const prop of SYNCED_CHIP_PROPERTIES) {
      if (changedProperties.has(prop) && (this.hasUpdated || this[prop] !== SYNCED_CHIP_DEFAULTS[prop])) {
        this.#syncChipsProperty(prop, this[prop]);
      }
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-chip-set" part="root">
        <slot></slot>
      </div>
    `;
  }

  #handleChipNavigate(evt: CustomEvent<IChipNavigateEventData>): void {
    const focusableChips = this.#findChipDescendants().filter(chip => !chip.disabled);
    const activeChipIndex = focusableChips.findIndex(chip => chip === evt.target);
    let index = evt.detail.direction === 'previous' ? activeChipIndex - 1 : activeChipIndex + 1;
    if (index > focusableChips.length - 1) {
      index = 0;
    }

    const nextChip = focusableChips.at(index);

    if (nextChip?.type === 'input' && evt.detail.direction === 'previous') {
      nextChip.focusRemoveButton();
    } else {
      nextChip?.focus();
    }
  }

  #findChipDescendants(): IChipComponent[] {
    return Array.from(this.querySelectorAll(CHIP_CONSTANTS.elementName));
  }

  #syncChipsProperty<T extends keyof IChipComponent>(prop: T, value: IChipComponent[T]): void {
    this.#findChipDescendants().forEach(chip => (chip[prop] = value));
  }
}

tryDefine(CHIP_SET_CONSTANTS.elementName, ChipSetComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip-set': IChipSetComponent;
  }
}
