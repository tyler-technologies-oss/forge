import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconUnfoldMore } from '@tylertech/tyler-icons';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { TooltipComponent } from '../tooltip';
import { ColorPickerAdapter } from './color-picker-adapter';
import { COLOR_PICKER_CONSTANTS, IColorPickerChangeEventData, IHSVA, IRGBA } from './color-picker-constants';
import { ColorPickerCore } from './color-picker-core';

import template from './color-picker.html';
import styles from './color-picker.scss';
export interface IColorPickerComponent extends IBaseComponent {
  value: string | null | undefined;
  rgba: IRGBA | null | undefined;
  hsva: IHSVA | null | undefined;
  opacity: number | null | undefined;
  allowOpacity: boolean;
  debounceChangeEvent: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-color-picker': IColorPickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-color-picker-change': CustomEvent<IColorPickerChangeEventData>;
  }
}

/**
 * @tag forge-color-picker
 *
 * @property {boolean} [allowOpacity=false] Gets/sets whether opacity is displayed and allowed be to changed.
 * @property {boolean} [debounceChangeEvent=false] Gets/sets whether change event has a debounce applied to avoid successive updates.
 * @property {string | null | undefined} value Gets/sets the value using hex format only.
 * @property {IRGBA | null | undefined} rgba Gets/sets the value using rgba format.
 * @property {IHSVA | null | undefined} hsva Gets/sets the value using hsva format.
 * @property {number | null | undefined} [opacity=1] Gets/sets the opacity value, if `allowOpacity` is true.
 *
 * @attribute {boolean} [allow-opacity=false] Gets/sets whether opacity is displayed and allowed be to changed.
 * @attribute {boolean} [debounce-change-event=false] Gets/sets whether change event has a debounce applied to avoid successive updates.
 * @attribute {string | null | undefined} value Gets/sets the value using hex format only.
 *
 * @event {CustomEvent<IColorPickerChangeEventData>} forge-color-picker-change - Emits when the color value changed.
 */
@customElement({
  name: COLOR_PICKER_CONSTANTS.elementName,
  dependencies: [IconButtonComponent, TooltipComponent, IconComponent]
})
export class ColorPickerComponent extends BaseComponent implements IColorPickerComponent {
  public static get observedAttributes(): string[] {
    return [COLOR_PICKER_CONSTANTS.attributes.VALUE, COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, COLOR_PICKER_CONSTANTS.attributes.DEBOUNCE_CHANGE_EVENT];
  }

  private _core: ColorPickerCore;

  constructor() {
    super();
    IconRegistry.define(tylIconUnfoldMore);
    attachShadowTemplate(this, template, styles);
    this._core = new ColorPickerCore(new ColorPickerAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case COLOR_PICKER_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY:
        this.allowOpacity = coerceBoolean(newValue);
        break;
      case COLOR_PICKER_CONSTANTS.attributes.DEBOUNCE_CHANGE_EVENT:
        this.debounceChangeEvent = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets/sets the value using hex format only. */
  @coreProperty()
  declare public value: string | null | undefined;

  /** Gets/sets the value using rgba format. */
  @coreProperty()
  declare public rgba: IRGBA | null | undefined;

  /** Gets/sets the value using hsva format. */
  @coreProperty()
  declare public hsva: IHSVA | null | undefined;

  /** Gets/sets the opacity value, if `allowOpacity` is true. */
  @coreProperty()
  declare public opacity: number | null | undefined;

  /** Gets/sets whether opacity is displayed and allowed be to changed. */
  @coreProperty()
  declare public allowOpacity: boolean;

  /** Gets/sets whether change event has a debounce applied to avoid successive updates. Defaults to `false`. */
  @coreProperty()
  declare public debounceChangeEvent: boolean;
}
