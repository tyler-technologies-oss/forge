import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, ensureChild, FoundationProperty } from '@tylertech/forge-core';
import { tylIconCheckBox, tylIconCheckBoxOutlineBlank } from '@tylertech/tyler-icons/standard';
import { DividerComponent } from '../divider';
import { IconComponent, IconRegistry } from '../icon';
import { LinearProgressComponent } from '../linear-progress';
import { ListComponent, ListItemComponent } from '../list';
import { IListDropdownAware, ListDropdownAware } from '../list-dropdown/list-dropdown-aware';
import { PopupComponent } from '../popup';
import { IOption } from '../select';
import { SkeletonComponent } from '../skeleton';
import { TextFieldComponent } from '../text-field';
import { AutocompleteAdapter } from './autocomplete-adapter';
import { AutocompleteFilterCallback, AutocompleteMode, AutocompleteOptionBuilder, AutocompleteSelectedTextBuilder, AUTOCOMPLETE_CONSTANTS, IAutocompleteOptionGroup, IAutocompleteSelectEventData } from './autocomplete-constants';
import { AutocompleteFoundation } from './autocomplete-foundation';

import template from './autocomplete.html';
import styles from './autocomplete.scss';

export interface IAutocompleteComponent extends IListDropdownAware {
  mode: `${AutocompleteMode}`;
  multiple: boolean;
  value: any;
  debounce: number;
  filterOnFocus: boolean;
  allowUnmatched: boolean;
  matchKey: string | null | undefined;
  popupTarget: string;
  filter: AutocompleteFilterCallback | null | undefined;
  optionBuilder: AutocompleteOptionBuilder | null | undefined;
  selectedTextBuilder: AutocompleteSelectedTextBuilder;
  popupElement: HTMLElement | null;
  beforeValueChange: (value: any) => boolean | Promise<boolean>;
  isInitialized: boolean;
  open: boolean;
  appendOptions(options: IOption[] | IAutocompleteOptionGroup[]): void;
  openDropdown(): void;
  closeDropdown(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-autocomplete': IAutocompleteComponent;
  }

  interface HTMLElementEventMap {
    'forge-autocomplete-change': CustomEvent<any>;
    'forge-autocomplete-select': CustomEvent<IAutocompleteSelectEventData>;
    'forge-autocomplete-scrolled-bottom': CustomEvent<void>;
  }
}

/**
 * The custom element class behind the `<forge-autocomplete>` element.
 * 
 * @tag forge-autocomplete
 */
@CustomElement({
  name: AUTOCOMPLETE_CONSTANTS.elementName,
  dependencies: [
    TextFieldComponent,
    PopupComponent,
    ListComponent,
    ListItemComponent,
    DividerComponent,
    SkeletonComponent,
    LinearProgressComponent,
    IconComponent
  ]
})
export class AutocompleteComponent extends ListDropdownAware implements IAutocompleteComponent {
  public static get observedAttributes(): string[] {
    return [
      AUTOCOMPLETE_CONSTANTS.attributes.MODE,
      AUTOCOMPLETE_CONSTANTS.attributes.MULTIPLE,
      AUTOCOMPLETE_CONSTANTS.attributes.DEBOUNCE,
      AUTOCOMPLETE_CONSTANTS.attributes.FILTER_ON_FOCUS,
      AUTOCOMPLETE_CONSTANTS.attributes.ALLOW_UNMATCHED,
      AUTOCOMPLETE_CONSTANTS.attributes.POPUP_TARGET,
      AUTOCOMPLETE_CONSTANTS.attributes.POPUP_CLASSES,
      AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL,
      AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD,
      AUTOCOMPLETE_CONSTANTS.attributes.OPTION_LIMIT,
      AUTOCOMPLETE_CONSTANTS.attributes.SYNC_POPUP_WIDTH,
      AUTOCOMPLETE_CONSTANTS.attributes.OPEN,
      AUTOCOMPLETE_CONSTANTS.attributes.MATCH_KEY
    ];
  }

  private _foundation: AutocompleteFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconCheckBox, tylIconCheckBoxOutlineBlank]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new AutocompleteFoundation(new AutocompleteAdapter(this));
  }

  public connectedCallback(): void {
    if (this.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.INPUT)) {
      this._foundation.initialize();
    } else {
      ensureChild(this, AUTOCOMPLETE_CONSTANTS.selectors.INPUT).then(() => this._foundation.initialize());
    }
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case AUTOCOMPLETE_CONSTANTS.attributes.MODE:
        this.mode = newValue as AutocompleteMode;
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.MULTIPLE:
        this.multiple = coerceBoolean(newValue);
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.DEBOUNCE:
        this.debounce = coerceNumber(newValue);
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.FILTER_ON_FOCUS:
        this.filterOnFocus = coerceBoolean(newValue);
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.ALLOW_UNMATCHED:
        this.allowUnmatched = coerceBoolean(newValue);
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.POPUP_TARGET:
        this.popupTarget = newValue;
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case AUTOCOMPLETE_CONSTANTS.attributes.MATCH_KEY:
        this.matchKey = newValue;
        break;
    }
  }

  /** Gets/sets the interaction mode. */
  @FoundationProperty()
  public declare mode: `${AutocompleteMode}`;

  /** Gets/sets the multi-select state. */
  @FoundationProperty()
  public declare multiple: boolean;

  /** Gets/sets the value. */
  @FoundationProperty()
  public declare value: any;

  /** Gets/sets the debounce delay (milliseconds) for keyboard events. */
  @FoundationProperty()
  public declare debounce: number;

  /** Gets/sets filter on focus settings which controls whether the dropdown displays automatically when focused. */
  @FoundationProperty()
  public declare filterOnFocus: boolean;

  /** Controls whether unmatched text entered by the user will stay visible an option in the dropdown is not found. */
  @FoundationProperty()
  public declare allowUnmatched: boolean;

  /** Gets/sets the selector that will be used to find an element to attach the popup to. Defaults to the input element. */
  @FoundationProperty()
  public declare popupTarget: string;

  /** Sets the option builder callback that will be executed when building the option list in the dropdown. */
  @FoundationProperty()
  public declare optionBuilder: AutocompleteOptionBuilder | null | undefined;

  /** Sets the filter callback that will be executed when fetching options for the autocomplete dropdown. */
  @FoundationProperty()
  public declare filter: AutocompleteFilterCallback | null | undefined;

  /** Sets the selected text builder callback that will be executed when getting the selected text. */
  @FoundationProperty()
  public declare selectedTextBuilder: AutocompleteSelectedTextBuilder;

  /** Controls the open state of the dropdown. */
  @FoundationProperty()
  public declare open: boolean;

  /** Gets/sets the property key to match the value to an option. */
  @FoundationProperty()
  public declare matchKey: string | null | undefined;

  /** Returns whether the component has been initialized or not yet. */
  @FoundationProperty({ set: false })
  public declare isInitialized: boolean;

  /** Gets the currently active popup element when the dropdown is open. */
  @FoundationProperty({ set: false })
  public declare popupElement: HTMLElement | null;

  /** Sets the callback to be executed when the user selects an option, before the UI is updated to allow for validation. */
  @FoundationProperty()
  public declare beforeValueChange: (value: any) => boolean | Promise<boolean>;

  /** Adds options to the dropdown while it is open. Has no effect if the dropdown is closed.  */
  public appendOptions(options: IOption[] | IAutocompleteOptionGroup[]): void {
    this._foundation.appendOptions(options);
  }

  /** Opens the dropdown. */
  public openDropdown(): void {
    this.open = true;
  }

  /** Closes the dropdown. */
  public closeDropdown(): void {
    this.open = false;
  }
}
