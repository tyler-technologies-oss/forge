import { CustomElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { OPTION_GROUP_CONSTANTS } from './option-group-constants';

export interface IOptionGroupComponent extends IBaseComponent {
  label: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option-group': IOptionGroupComponent;
  }
}

/**
 * The custom element class behind the `<forge-option-group>` element.
 * 
 * @tag forge-option-group
 */
@CustomElement({
  name: OPTION_GROUP_CONSTANTS.elementName
})
export class OptionGroupComponent extends BaseComponent implements IOptionGroupComponent {
  public static get observedAttributes(): string[] {
    return [
      OPTION_GROUP_CONSTANTS.attributes.LABEL
    ];
  }

  private _label: string;

  constructor() {
    super();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case OPTION_GROUP_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        break;
    }
  }

  /** Gets/sets the label of this option group. */
  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value || '';
      this.setAttribute(OPTION_GROUP_CONSTANTS.attributes.LABEL, this._label);
    }
  }
}
