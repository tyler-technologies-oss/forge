import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconClear } from '@tylertech/tyler-icons';
import { BASE_FIELD_CONSTANTS, FieldComponent } from '../field';
import { BaseField, IBaseField } from '../field/base/base-field';
import { IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { TooltipComponent } from '../tooltip';
import { TextFieldAdapter } from './text-field-adapter';
import { TEXT_FIELD_CONSTANTS } from './text-field-constants';
import { TextFieldCore } from './text-field-core';

import template from './text-field.html';
import styles from './text-field.scss';

export interface ITextFieldComponent extends IBaseField {
  showClear: boolean;
  readonly popoverTargetElement: HTMLElement;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-text-field': ITextFieldComponent;
  }

  interface HTMLElementEventMap {
    'forge-text-field-clear': CustomEvent<void>;
  }
}

/**
 * @tag forge-text-field
 *
 * @summary The Forge Text Field component is an input field used to capture user text input. It requires a child `<input>` or `<textarea>` element to function properly, and an optional `<label>` element can be used to provide a label for the `<input>`.
 *
 * @dependency forge-field
 * @dependency forge-icon-button
 * @dependency forge-tooltip
 *
 * @property {boolean} [showClear=false] - Whether the clear button appears when text has been entered.
 * @property {HTMLElement} popoverTargetElement - Gets a reference to the element that the popover should target for best alignment.
 *
 * @attribute {boolean} [show-clear=false] - Whether the clear button appears when text has been entered.
 *
 * @globalconfig labelPosition
 * @globalconfig variant
 *
 * @event {CustomEvent<void>} forge-text-field-clear - Dispatched when the clear button is clicked.
 *
 * @csspart root - The root container element.
 * @csspart label - The label element.
 * @csspart container - The container element surrounding the input.
 * @csspart input - The element containing te input slot.
 * @csspart start - The element containing the start slot.
 * @csspart end - The element containing the end slot.
 * @csspart popover-icon - The popover icon element.
 * @csspart accessory - The element containing the accessory slot.
 * @csspart support-text - The support text element.
 * @csspart support-text - The element containing the support text slot.
 * @csspart support-text-end - The element containing the support text end slot.
 * @csspart outline - The element containing the forge-focus-indicator element.
 * @csspart focus-indicator - The focus indicator element.
 *
 * @slot - The default/unnamed slot for the field's input.
 * @slot label - Renders its content as a positioned label.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 * @slot clear-button - Content slotted here replaces the default clear button.
 * @slot clear-button-tooltip - Sets the text content of the clear button's tooltip and accessible label.
 * @slot accessory - Used for content such as a button that is logically connected to the field but should appear distinct from the input.
 * @slot support-text - Used for content that provides additional information about the field. Aligns to the inline start of the field.
 * @slot support-text-end - Used for content that provides additional information about the field. Aligns to the inline end of the field.
 */

@customElement({
  name: TEXT_FIELD_CONSTANTS.elementName,
  dependencies: [FieldComponent, IconButtonComponent, TooltipComponent]
})
export class TextFieldComponent extends BaseField<TextFieldCore> implements ITextFieldComponent {
  public static get observedAttributes(): string[] {
    return [...Object.values(BASE_FIELD_CONSTANTS.observedAttributes), ...Object.values(TEXT_FIELD_CONSTANTS.observedAttributes)];
  }

  protected readonly _core: TextFieldCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new TextFieldCore(new TextFieldAdapter(this));
    IconRegistry.define(tylIconClear);
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case TEXT_FIELD_CONSTANTS.attributes.SHOW_CLEAR:
        this.showClear = coerceBoolean(newValue);
        break;
    }
  }

  public get popoverTargetElement(): HTMLElement {
    return this._core.popoverTargetElement;
  }

  @coreProperty()
  declare public showClear: boolean;
}
