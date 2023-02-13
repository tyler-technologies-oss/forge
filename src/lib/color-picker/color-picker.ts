import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconUnfoldMore } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { TooltipComponent } from '../tooltip';
import { ColorPickerAdapter } from './color-picker-adapter';
import { COLOR_PICKER_CONSTANTS, IColorPickerChangeEventData, IHSVA, IRGBA } from './color-picker-constants';
import { ColorPickerFoundation } from './color-picker-foundation';

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
 * The web component class behind the `<forge-color-picker>` custom element.
 * 
 * @tag forge-color-picker
 */
@CustomElement({
  name: COLOR_PICKER_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent,
    TooltipComponent,
    IconComponent
  ]
})
export class ColorPickerComponent extends BaseComponent implements IColorPickerComponent {
  public static get observedAttributes(): string[] {
    return [
      COLOR_PICKER_CONSTANTS.attributes.VALUE,
      COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY,
      COLOR_PICKER_CONSTANTS.attributes.DEBOUNCE_CHANGE_EVENT
    ];
  }

  private _foundation: ColorPickerFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconUnfoldMore);
    attachShadowTemplate(this, template, styles);
    this._foundation = new ColorPickerFoundation(new ColorPickerAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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
  @FoundationProperty()
  public declare value: string | null | undefined;

  /** Gets/sets the value using rgba format. */
  @FoundationProperty()
  public declare rgba: IRGBA | null | undefined;

  /** Gets/sets the value using hsva format. */
  @FoundationProperty()
  public declare hsva: IHSVA | null | undefined;

  /** Gets/sets the opacity value, if `allowOpacity` is true. */
  @FoundationProperty()
  public declare opacity: number | null | undefined;

  /** Gets/sets whether opacity is displayed and allowed be to changed. */
  @FoundationProperty()
  public declare allowOpacity: boolean;

  /** Gets/sets whether change event has a debounce applied to avoid successive updates. Defaults to `false`. */
  @FoundationProperty()
  public declare debounceChangeEvent: boolean;
}
