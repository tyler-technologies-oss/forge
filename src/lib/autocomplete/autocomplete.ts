import { attachShadowTemplate, coerceBoolean, coerceNumber, customElement, ensureChild, coreProperty } from '@tylertech/forge-core';
import { tylIconArrowDropDown, tylIconCheckBox, tylIconCheckBoxOutlineBlank } from '@tylertech/tyler-icons/standard';
import { DividerComponent } from '../divider';
import { IconComponent, IconRegistry } from '../icon';
import { LinearProgressComponent } from '../linear-progress';
import { ListComponent, ListItemComponent } from '../list';
import { IListDropdownAware, ListDropdownAware } from '../list-dropdown/list-dropdown-aware';
import { PopoverComponent } from '../popover/popover';
import { SkeletonComponent } from '../skeleton';
import { TextFieldComponent } from '../text-field';
import { AutocompleteAdapter } from './autocomplete-adapter';
import {
  AutocompleteFilterCallback,
  AutocompleteMode,
  AutocompleteOptionBuilder,
  AutocompleteSelectedTextBuilder,
  AUTOCOMPLETE_CONSTANTS,
  IAutocompleteForceFilterOptions,
  IAutocompleteOption,
  IAutocompleteOptionGroup,
  IAutocompleteSelectEventData
} from './autocomplete-constants';
import { AutocompleteCore } from './autocomplete-core';

import template from './autocomplete.html';
import styles from './autocomplete.scss';

export interface IAutocompleteComponent extends IListDropdownAware {
  mode: `${AutocompleteMode}`;
  multiple: boolean;
  value: any;
  debounce: number;
  filterOnFocus: boolean;
  filterFocusFirst: boolean;
  allowUnmatched: boolean;
  matchKey: string | null | undefined;
  popupTarget: string;
  filterText: string;
  filter: AutocompleteFilterCallback | null | undefined;
  optionBuilder: AutocompleteOptionBuilder | null | undefined;
  selectedTextBuilder: AutocompleteSelectedTextBuilder;
  popupElement: HTMLElement | null;
  beforeValueChange: (value: any) => boolean | Promise<boolean>;
  isInitialized: boolean;
  open: boolean;
  appendOptions(options: IAutocompleteOption[] | IAutocompleteOptionGroup[]): void;
  openDropdown(): void;
  closeDropdown(): void;
  forceFilter(opts?: IAutocompleteForceFilterOptions): void;
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
 * @tag forge-autocomplete
 *
 * @event {CustomEvent<any>} forge-autocomplete-change - Fired when the value changes.
 * @event {CustomEvent<IAutocompleteSelectEventData>} forge-autocomplete-select -  Fired when an option is selected. Only applies when in "stateless" `mode`.
 * @event {CustomEvent<void>} forge-autocomplete-scrolled-bottom - Fired when the dropdown is scrolled to the bottom. Only applies when `observe-scroll` is enabled.
 */
@customElement({
  name: AUTOCOMPLETE_CONSTANTS.elementName,
  dependencies: [
    TextFieldComponent,
    PopoverComponent,
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
      AUTOCOMPLETE_CONSTANTS.attributes.FILTER_FOCUS_FIRST,
      AUTOCOMPLETE_CONSTANTS.attributes.ALLOW_UNMATCHED,
      AUTOCOMPLETE_CONSTANTS.attributes.POPUP_TARGET,
      AUTOCOMPLETE_CONSTANTS.attributes.POPUP_CLASSES,
      AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL,
      AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD,
      AUTOCOMPLETE_CONSTANTS.attributes.OPTION_LIMIT,
      AUTOCOMPLETE_CONSTANTS.attributes.SYNC_POPUP_WIDTH,
      AUTOCOMPLETE_CONSTANTS.attributes.OPEN,
      AUTOCOMPLETE_CONSTANTS.attributes.MATCH_KEY,
      AUTOCOMPLETE_CONSTANTS.attributes.FILTER_TEXT
    ];
  }

  private _core: AutocompleteCore;

  constructor() {
    super();
    IconRegistry.define([tylIconArrowDropDown, tylIconCheckBox, tylIconCheckBoxOutlineBlank]);
    attachShadowTemplate(this, template, styles);
    this._core = new AutocompleteCore(new AutocompleteAdapter(this));
  }

  public connectedCallback(): void {
    if (this.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.INPUT)) {
      this._core.initialize();
    } else {
      ensureChild(this, AUTOCOMPLETE_CONSTANTS.selectors.INPUT).then(() => this._core.initialize());
    }
  }

  public disconnectedCallback(): void {
    this._core.destroy();
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
      case AUTOCOMPLETE_CONSTANTS.attributes.FILTER_FOCUS_FIRST:
        this.filterFocusFirst = coerceBoolean(newValue);
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
      case AUTOCOMPLETE_CONSTANTS.attributes.FILTER_TEXT:
        this.filterText = newValue;
        break;
    }
  }

  /**
   * Gets/sets the interaction mode.
   * @default 'default'
   * @attribute
   */
  @coreProperty()
  public declare mode: `${AutocompleteMode}`;

  /**
   * Gets/sets the multi-select state.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare multiple: boolean;

  /**
   * Gets/sets the value.
   */
  @coreProperty()
  public declare value: any;

  /**
   * Gets/sets the debounce delay (milliseconds) for keyboard events.
   * @default 500
   * @attribute
   */
  @coreProperty()
  public declare debounce: number;

  /**
   * Gets/sets filter on focus settings which controls whether the dropdown displays automatically when focused.
   * @default true
   * @attribute filter-on-focus
   */
  @coreProperty()
  public declare filterOnFocus: boolean;

  /**
   * Gets/sets whether the first option in the dropdown will be focused automatically when opened or not.
   * @default true
   * @attribute filter-focus-first
   */
  @coreProperty()
  public declare filterFocusFirst: boolean;

  /**
   * Controls whether unmatched text entered by the user will stay visible an option in the dropdown is not found.
   * @default false
   * @attribute allow-unmatched
   */
  @coreProperty()
  public declare allowUnmatched: boolean;

  /**
   * Gets/sets the selector that will be used to find an element to attach the popup to. Defaults to the input element.
   * @attribute popup-target
   */
  @coreProperty()
  public declare popupTarget: string;

  /**
   * Gets/sets the filter text.
   *
   * Setting the filter text only applies when allowUnmatched is enabled.
   */
  @coreProperty()
  public declare filterText: string;

  /** Sets the option builder callback that will be executed when building the option list in the dropdown. */
  @coreProperty()
  public declare optionBuilder: AutocompleteOptionBuilder | null | undefined;

  /** Sets the filter callback that will be executed when fetching options for the autocomplete dropdown. */
  @coreProperty()
  public declare filter: AutocompleteFilterCallback | null | undefined;

  /** Sets the selected text builder callback that will be executed when getting the selected text. */
  @coreProperty()
  public declare selectedTextBuilder: AutocompleteSelectedTextBuilder;

  /**
   * Controls the open state of the dropdown.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare open: boolean;

  /**
   * Gets/sets the property key to match the value to an option.
   * @attribute match-key
   */
  @coreProperty()
  public declare matchKey: string | null | undefined;

  /**
   * Returns whether the component has been initialized or not yet.
   * @readonly
   */
  @coreProperty({ set: false })
  public declare isInitialized: boolean;

  /**
   * Gets the currently active popup element when the dropdown is open.
   * @readonly
   */
  @coreProperty({ set: false })
  public declare popupElement: HTMLElement | null;

  /** Sets the callback to be executed when the user selects an option, before the UI is updated to allow for validation. */
  @coreProperty()
  public declare beforeValueChange: (value: any) => boolean | Promise<boolean>;

  /** Adds options to the dropdown while it is open. Has no effect if the dropdown is closed.  */
  public appendOptions(options: IAutocompleteOption[] | IAutocompleteOptionGroup[]): void {
    this._core.appendOptions(options);
  }

  /** Opens the dropdown. */
  public openDropdown(): void {
    this.open = true;
  }

  /** Closes the dropdown. */
  public closeDropdown(): void {
    this.open = false;
  }

  /**
   * Forces the filter callback to be executed to update the current selection state with new options.
   */
  public forceFilter(opts: IAutocompleteForceFilterOptions = { preserveValue: false }): void {
    this._core.forceFilter(opts);
  }
}
