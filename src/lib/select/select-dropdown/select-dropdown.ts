import { customElement, coreProperty, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';

import { SelectDropdownCore } from './select-dropdown-core';
import { SELECT_DROPDOWN_CONSTANTS } from './select-dropdown-constants';
import { IBaseSelectComponent, BaseSelectComponent } from '../core/base-select';
import { BASE_SELECT_CONSTANTS } from '../core/base-select-constants';
import { SelectDropdownAdapter } from './select-dropdown-adapter';
import { OptionComponent } from '../option';
import { OptionGroupComponent } from '../option-group';
import { ListComponent, ListItemComponent } from '../../list';
import { CircularProgressComponent } from '../../circular-progress';
import { ScaffoldComponent } from '../../scaffold';
import { ToolbarComponent } from '../../toolbar';
import { IconButtonComponent } from '../../icon-button';
import { PopoverComponent } from '../../popover/popover';

import template from './select-dropdown.html';
import styles from './select-dropdown.scss';

export interface ISelectDropdownComponent extends IBaseSelectComponent {
  target: string;
  selectedTextTarget: string;
  syncSelectedText: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-select-dropdown': ISelectDropdownComponent;
  }

  interface HTMLElementEventMap {
    'forge-select-dropdown-scrolled-bottom': CustomEvent<void>;
  }
}

/**
 * @tag forge-select-dropdown
 *
 * @summary A dropdown variant of the select component that renders options in a popover.
 */
@customElement({
  name: SELECT_DROPDOWN_CONSTANTS.elementName,
  dependencies: [
    OptionComponent,
    OptionGroupComponent,
    PopoverComponent,
    ListComponent,
    ListItemComponent,
    CircularProgressComponent,
    ScaffoldComponent,
    ToolbarComponent,
    IconButtonComponent
  ]
})
export class SelectDropdownComponent extends BaseSelectComponent<SelectDropdownCore> implements ISelectDropdownComponent {
  public static get observedAttributes(): string[] {
    return [
      SELECT_DROPDOWN_CONSTANTS.attributes.TARGET,
      SELECT_DROPDOWN_CONSTANTS.attributes.SELECTED_TEXT_TARGET,
      SELECT_DROPDOWN_CONSTANTS.attributes.SYNC_SELECTED_TEXT,
      BASE_SELECT_CONSTANTS.attributes.VALUE,
      BASE_SELECT_CONSTANTS.attributes.MULTIPLE,
      BASE_SELECT_CONSTANTS.attributes.OBSERVE_SCROLL,
      BASE_SELECT_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD,
      BASE_SELECT_CONSTANTS.attributes.POPUP_CLASSES,
      BASE_SELECT_CONSTANTS.attributes.OPTION_LIMIT,
      BASE_SELECT_CONSTANTS.attributes.SYNC_POPUP_WIDTH
    ];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new SelectDropdownCore(new SelectDropdownAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SELECT_DROPDOWN_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        return;
      case SELECT_DROPDOWN_CONSTANTS.attributes.SELECTED_TEXT_TARGET:
        this.selectedTextTarget = newValue;
        return;
      case SELECT_DROPDOWN_CONSTANTS.attributes.SYNC_SELECTED_TEXT:
        this.syncSelectedText = coerceBoolean(newValue);
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /** Sets the target element CSS selector */
  @coreProperty()
  declare public target: string;

  /** Sets the selected text element CSS selector */
  @coreProperty()
  declare public selectedTextTarget: string;

  /** Controls whether the selected text is synchronized to the target elements' text content. Default is false. */
  @coreProperty()
  declare public syncSelectedText: boolean;
}
