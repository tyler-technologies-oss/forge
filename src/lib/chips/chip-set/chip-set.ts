import { attachShadowTemplate, coerceBoolean, customElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ChipComponent, IChipComponent } from '../chip/chip';
import { ChipTheme, ChipType, CHIP_CONSTANTS, IChipNavigateEventData } from '../chip/chip-constants';
import { CHIP_SET_CONSTANTS } from './chip-set-constants';

import template from './chip-set.html';
import styles from './chip-set.scss';

export interface IChipSetComponent extends IBaseComponent {
  vertical: boolean;
  type: ChipType;
  dense: boolean;
  disabled: boolean;
  invalid: boolean;
  theme: ChipTheme;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip-set': IChipSetComponent;
  }
}

/**
 * @tag forge-chip-set
 *
 * @summary Chips sets are used to group multiple chips together and orchestrate their behavior.
 *
 * @property {boolean} [vertical=false] - Whether the chip set is vertical.
 * @property {ChipType} [type='action'] - The type of chip.
 * @property {boolean} [dense=false] - Whether the chip set is dense.
 * @property {boolean} [disabled=false] - Whether the chip set is disabled.
 * @property {boolean} [invalid=false] - Whether the chip set is invalid.
 * @property {ChipTheme} [theme='primary'] - The theme of the chip set.
 *
 * @attribute {boolean} [vertical] - Whether the chip set is vertically oriented.
 * @attribute {ChipType} [type] - The type of chips.
 * @attribute {boolean} [dense] - Whether all chips in the chip set are dense.
 * @attribute {boolean} [disabled] - Whether all chips in the chip set are disabled.
 * @attribute {boolean} [invalid] - Whether all chips in the chip set are invalid.
 * @attribute {ChipTheme} [theme] - The theme of the chips.
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
@customElement({
  name: CHIP_SET_CONSTANTS.elementName,
  dependencies: [ChipComponent]
})
export class ChipSetComponent extends BaseComponent implements IChipSetComponent {
  public static get observedAttributes(): string[] {
    return Object.values(CHIP_SET_CONSTANTS.observedAttributes);
  }

  private _vertical = false;
  private _type = CHIP_CONSTANTS.defaults.TYPE;
  private _dense = false;
  private _disabled = false;
  private _invalid = false;
  private _theme = CHIP_CONSTANTS.defaults.THEME;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public connectedCallback(): void {
    this.addEventListener(CHIP_CONSTANTS.events.NAVIGATE, this._onChipNavigate.bind(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHIP_SET_CONSTANTS.observedAttributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case CHIP_SET_CONSTANTS.observedAttributes.TYPE:
        this.type = newValue as ChipType;
        break;
      case CHIP_SET_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case CHIP_SET_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case CHIP_SET_CONSTANTS.observedAttributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case CHIP_SET_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as ChipTheme;
        break;
    }
  }

  private _onChipNavigate(evt: CustomEvent<IChipNavigateEventData>): void {
    const focusableChips = this._findChipDescendants().filter(chip => !chip.disabled);
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

  private _findChipDescendants(): IChipComponent[] {
    return Array.from(this.querySelectorAll(CHIP_CONSTANTS.elementName));
  }

  private _syncChipsProperty<T extends keyof IChipComponent>(property: T, value: IChipComponent[T]): void {
    const chips = this._findChipDescendants();
    chips.forEach(c => (c[property] = value));
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    value = Boolean(value);
    if (this._vertical !== value) {
      this._vertical = value;
      this.toggleAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL, this._vertical);
    }
  }

  public get type(): ChipType {
    return this._type;
  }
  public set type(value: ChipType) {
    if (this._type !== value) {
      this._type = value;
      this._syncChipsProperty('type', this._type);
      this.setAttribute(CHIP_SET_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    value = Boolean(value);
    if (this._dense !== value) {
      this._dense = value;
      this._syncChipsProperty('dense', this._dense);
      this.toggleAttribute(CHIP_SET_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);
    if (this._disabled !== value) {
      this._disabled = value;
      this._syncChipsProperty('disabled', this._disabled);
      this.toggleAttribute(CHIP_SET_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    value = Boolean(value);
    if (this._invalid !== value) {
      this._invalid = value;
      this._syncChipsProperty('invalid', this._invalid);
      this.toggleAttribute(CHIP_SET_CONSTANTS.attributes.INVALID, this._invalid);
    }
  }

  public get theme(): ChipTheme {
    return this._theme;
  }
  public set theme(value: ChipTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._syncChipsProperty('theme', this._theme);
      this.setAttribute(CHIP_SET_CONSTANTS.attributes.THEME, this._theme);
    }
  }
}
