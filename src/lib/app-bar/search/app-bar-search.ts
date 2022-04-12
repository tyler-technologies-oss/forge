import { CustomElement, attachShadowTemplate, ensureChildren, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { tylIconArrowDropDown, tylIconLanguage, tylIconSearch } from '@tylertech/tyler-icons/standard';
import { AppBarSearchFoundation } from './app-bar-search-foundation';
import { AppBarSearchAdapter } from './app-bar-search-adapter';
import { IAppBarSearchInputEventData, APP_BAR_SEARCH_CONSTANTS } from './app-bar-search-constants';
import { IOption } from '../../select';
import { TooltipComponent } from '../../tooltip';
import { IconComponent, IconRegistry } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './app-bar-search.html';
import styles from './app-bar-search.scss';

export interface IAppBarSearchComponent extends IBaseComponent {
  disabled: boolean;
  value: string;
  placeholder: string;
  combined: boolean;
  combinedOptions: IOption[];
  selectedCombinedOption: string;
  global: boolean;
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
 * The web component class behind the `<forge-app-bar-search>` custom element.
 */
@CustomElement({
  name: APP_BAR_SEARCH_CONSTANTS.elementName,
  dependencies: [
    TooltipComponent,
    IconComponent
  ]
})
export class AppBarSearchComponent extends BaseComponent implements IAppBarSearchComponent {
  public static get observedAttributes(): string[] {
    return [
      APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED,
      APP_BAR_SEARCH_CONSTANTS.attributes.VALUE,
      APP_BAR_SEARCH_CONSTANTS.attributes.PLACEHOLDER,
      APP_BAR_SEARCH_CONSTANTS.attributes.COMBINED,
      APP_BAR_SEARCH_CONSTANTS.attributes.GLOBAL
    ];
  }

  /** The foundation class that handles business logic for this component. */
  private _foundation: AppBarSearchFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconSearch, tylIconArrowDropDown, tylIconLanguage]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new AppBarSearchFoundation(new AppBarSearchAdapter(this));
  }

  public connectedCallback(): void {
    if (this.children.length) {
      this._initialize();
    } else {
      ensureChildren(this).then(() => this._initialize());
    }
  }

  private _initialize(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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
      case APP_BAR_SEARCH_CONSTANTS.attributes.COMBINED:
        this.combined = coerceBoolean(newValue);
        break;
      case APP_BAR_SEARCH_CONSTANTS.attributes.GLOBAL:
        this.global = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets/sets the value. */
  @FoundationProperty()
  public value: string;

  /** Gets/sets the disabled state of the search input. */
  @FoundationProperty()
  public disabled: boolean;
  
  /** Gets/sets whether this is a combined search box with search options. */
  @FoundationProperty()
  public combined: boolean;
  
  /** Gets/sets seelcted option for the combined search dropdown. */
  @FoundationProperty()
  public combinedOptions: IOption[];
  
  /** Gets/sets selected option for the combined search dropdown. */
  @FoundationProperty()
  public selectedCombinedOption: string;
  
  /** Gets/sets whether the global icon is displayed at the end of the input. */
  @FoundationProperty()
  public global: boolean;

  /** Sets the input placeholder value. */
  public set placeholder(value: string) {
    this._foundation.placeholder = value;
  }
}
