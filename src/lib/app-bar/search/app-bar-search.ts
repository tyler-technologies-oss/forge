import { customElement, attachShadowTemplate, coerceBoolean, coreProperty, ensureInputElement } from '@tylertech/forge-core';
import { tylIconSearch } from '@tylertech/tyler-icons';
import { AppBarSearchCore } from './app-bar-search-core';
import { AppBarSearchAdapter } from './app-bar-search-adapter';
import { IAppBarSearchInputEventData, APP_BAR_SEARCH_CONSTANTS } from './app-bar-search-constants';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { IconComponent, IconRegistry } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './app-bar-search.html';
import styles from './app-bar-search.scss';

export interface IAppBarSearchComponent extends IBaseComponent {
  disabled: boolean;
  value: string;
  placeholder: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-search': IAppBarSearchComponent;
  }

  interface HTMLElementEventMap {
    'forge-app-bar-search-input': CustomEvent<IAppBarSearchInputEventData>;
  }
}

/**
 * @tag forge-app-bar-search
 *
 * @slot - The default (unnamed) slot is where child `<input>` elements will be placed.
 * @slot action - Places actions at the end of the input.
 *
 * @attribute {boolean} [disabled=false] - A boolean attribute that, if present, indicates that the input should be disabled.
 * @attribute {string} value - The value of the input.
 * @attribute {string} placeholder - The placeholder text of the input.
 *
 * @property {boolean} [disabled=false] - A boolean property that, if true, indicates that the input should be disabled.
 * @property {string} value - The value of the input.
 * @property {string} placeholder - The placeholder text of the input.
 *
 * @csspart root - The root element
 * @csspart container - The input container element.
 * @csspart icon-container - The icon container element.
 * @csspart icon - The <forge-icon> element.
 * @csspart context - The context container element.
 * @csspart context-divider - The context divider element.
 * @csspart context-button - The context button element.
 * @csspart context-button-text - The context button text element.
 * @csspart context-button-icon - The context button icon element.
 * @csspart global-icon-container - The global icon container element.
 * @csspart global-icon - The global icon <forge-icon> element.
 * @csspart actions-container - The action container element around the slot.
 *
 * @cssproperty --forge-theme-on-primary - Controls the border-color of the container outline, the font-color, and icon color.
 * @cssproperty --forge-theme-on-surface - Controls the font color of the buttons.
 * @cssproperty --forge-theme-text-medium - Controls the placeholder font color.
 * @cssproperty --forge-app-bar-search-theme-background - Controls the background-color of the container.
 * @cssproperty --forge-app-bar-search-theme-background-focused - Controls the focused background-color of the container.
 * @cssproperty --forge-app-bar-search-theme-hover-opacity - Controls the hover opacity of the outline.
 * @cssproperty --forge-app-bar-search-theme-disabled-opacity - Controls the disabled opacity of the component.
 *
 * @event {CustomEvent<IAppBarSearchInputEventData>} forge-app-bar-search-input - Emits when the users executes the search via pressing the Enter key while the `<input>` has focus.
 */
@customElement({
  name: APP_BAR_SEARCH_CONSTANTS.elementName,
  dependencies: [IconComponent, FocusIndicatorComponent]
})
export class AppBarSearchComponent extends BaseComponent implements IAppBarSearchComponent {
  public static get observedAttributes(): string[] {
    return [APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED, APP_BAR_SEARCH_CONSTANTS.attributes.VALUE, APP_BAR_SEARCH_CONSTANTS.attributes.PLACEHOLDER];
  }

  private _core: AppBarSearchCore;

  constructor() {
    super();
    IconRegistry.define(tylIconSearch);
    attachShadowTemplate(this, template, styles);
    this._core = new AppBarSearchCore(new AppBarSearchAdapter(this));
  }

  public connectedCallback(): void {
    if (this.querySelector(APP_BAR_SEARCH_CONSTANTS.selectors.INPUT)) {
      this._core.initialize();
    } else {
      ensureInputElement(this).then(() => this._core.initialize());
    }
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case APP_BAR_SEARCH_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case APP_BAR_SEARCH_CONSTANTS.attributes.PLACEHOLDER:
        this.placeholder = newValue;
        break;
    }
  }

  @coreProperty()
  declare public value: string;

  @coreProperty()
  declare public disabled: boolean;

  @coreProperty()
  declare public placeholder: string;
}
