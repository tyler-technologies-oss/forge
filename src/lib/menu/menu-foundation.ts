import { ICustomElementFoundation, isArray, randomChars } from '@tylertech/forge-core';
import { ICON_CLASS_NAME } from '../constants';
import { PositionPlacement } from '../core/utils/position-utils';
import { CascadingListDropdownAwareFoundation, IListDropdownCascadingElementFactoryConfig, IListDropdownConfig, ListDropdownAsyncStyle, ListDropdownType } from '../list-dropdown';
import { isListDropdownOptionType, ListDropdownOptionType } from '../list-dropdown/list-dropdown-utils';
import type { IOverlayOffset } from '../overlay/overlay-constants';
import { IMenuOption } from './index';
import { IMenuAdapter } from './menu-adapter';
import { IMenuActiveChangeEventData, IMenuOptionGroup, IMenuSelectEventData, MenuMode, MenuOptionBuilder, MenuOptionFactory, MENU_CONSTANTS } from './menu-constants';

export interface IMenuFoundation extends ICustomElementFoundation {
  initialize(): void;
  disconnect(): void;
  onKeydown(evt: KeyboardEvent): void;
  open: boolean;
  options: Array<IMenuOption | IMenuOptionGroup>;
  optionsFactory: MenuOptionFactory | undefined;
  selectedIndex: number;
  selectedValue: any;
  placement: PositionPlacement;
  fallbackPlacements: PositionPlacement[];
  dense: boolean;
  iconClass: string;
  persistSelection: boolean;
  mode: MenuMode;
  popupOffset: IOverlayOffset;
  optionBuilder: MenuOptionBuilder | undefined;
  activateFirstOption(): void;
}

export class MenuFoundation extends CascadingListDropdownAwareFoundation<IMenuOption | IMenuOptionGroup> implements IMenuFoundation {
  private _optionsFactory: MenuOptionFactory | undefined;
  private _placement: PositionPlacement = 'bottom-start';
  private _fallbackPlacements: PositionPlacement[] = [];
  private _dense = false;
  private _selectedValue: any;
  private _iconClass = ICON_CLASS_NAME;
  private _persistSelection = false;
  private _mode: MenuMode = 'click';
  private _popupOffset: IOverlayOffset;
  private _optionBuilder: MenuOptionBuilder | undefined;
  private _identifier: string;
  private _clickListener: (evt: MouseEvent) => void;
  private _blurListener: (evt: MouseEvent) => void;
  private _selectListener: (value: any) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _activeChangeListener: (id: string) => void;
  
  constructor(private _adapter: IMenuAdapter) {
    super({
      popupTimeout: MENU_CONSTANTS.numbers.POPUP_MOUSE_LEAVE_TIMEOUT,
      targetTimeout: MENU_CONSTANTS.numbers.CHILD_MOUSE_LEAVE_TIMEOUT
    });
    this._identifier = randomChars();
    this._clickListener = evt => this._onTargetClick(evt);
    this._blurListener = evt => this._onTargetBlur(evt);
    this._selectListener = value => this._handleSelectEvent(value);
    this._keydownListener = evt => this.onKeydown(evt);
    this._activeChangeListener = id => this._onActiveOptionChanged(id);
  }

  public initialize(): void {
    this._adapter.initializeTarget();
    this._adapter.initializeAccessibility(this._identifier);
    this._initializeInteractionListeners();
  }

  public disconnect(): void {
    this._closeMenu({ destroy: true });
    this._destroyInteractionListeners();
  }

  public activateFirstOption(): void {
    this._adapter.activateFirstOption();
  }

  private _applyMode(): void {
    if (!this._adapter.hasTargetElement()) {
      return;
    }

    if (this._mode !== 'cascade') {
      this._adapter.addTargetListener('click', this._clickListener);
    } else {
      this._attachCascadingListeners();
    }
  }

  private _initializeInteractionListeners(): void {
    if (!this._adapter.hasTargetElement()) {
      return;
    }
    this._applyMode();
    this._adapter.addTargetListener('keydown', this._keydownListener, true);
    this._adapter.addTargetListener('focusout', this._blurListener);
  }

  private _destroyInteractionListeners(): void {
    if (!this._adapter.hasTargetElement()) {
      return;
    }
    this._adapter.removeTargetListener('keydown', this._clickListener);
    this._adapter.removeTargetListener('focusout', this._blurListener);
    this._adapter.removeTargetListener('click', this._clickListener);
    this._detachCascadingListeners();
  }

  protected _attachCascadingListeners(): void {
    this._adapter.addTargetListener('mouseenter', this._targetMouseEnterListener);
    this._adapter.addTargetListener('mouseleave', this._targetMouseLeaveListener);

    // We listen for document mousemove events only to track mouse coords for use when determining
    // if popups should open/close after specific delays
    this._adapter.addDocumentListener('mousemove', this._documentMouseMoveListener);
  }

  protected _detachCascadingListeners(): void {
    this._adapter.removeTargetListener('mouseenter', this._targetMouseEnterListener);
    this._adapter.removeTargetListener('mouseleave', this._targetMouseLeaveListener);
    this._adapter.removeDocumentListener('mousemove', this._documentMouseMoveListener);
  }

  private get _nonDividerOptions(): IMenuOption[] {
    return this._flatOptions.filter(o => !o.divider);
  }

  private get _flatOptions(): IMenuOption[] {
    return this._flattenOptions(this._options);
  }

  private _flattenOptions(options: Array<IMenuOption | IMenuOptionGroup>): IMenuOption[] {
    if (isListDropdownOptionType(options, ListDropdownOptionType.Group)) {
      return (options as IMenuOptionGroup[])
        .reduce((previousValue, currentValue) => {
          return currentValue.options ? previousValue.concat(currentValue.options) : previousValue;
        }, [] as IMenuOption[]);
    }
    return options as IMenuOption[];
  }

  private _onTargetClick(evt: MouseEvent): void {
    if (this._open) {
      this._closeDropdown();
      return;
    }
    this.open = !this._open;
    if (this._open) {
      this._adapter.focusTarget();
    }
  }

  private _onTargetBlur(evt: Event): void {
    if (this._open) {
      this._closeDropdown();
    }
  }

  private _onActiveOptionChanged(id: string): void {
    // We need to dispatch an event when the active descendant changes to propagate that to the proper target element
    const data: IMenuActiveChangeEventData = { id };
    const canSetActiveDescendant = this._adapter.emitHostEvent(MENU_CONSTANTS.events.ACTIVE_CHANGE, data, true, true);
    if (this._mode !== 'cascade' && canSetActiveDescendant) {
      this._adapter.updateActiveDescendant(id);
    }
  }

  public onKeydown(evt: KeyboardEvent): void {
    // If we have any child menus open, we need to proxy the keyboard events to those and exit
    if (this._childOpen) {
      this._adapter.proxyKeyboardEventToChild(evt, this._identifier);
      return;
    }

    switch (evt.code) {
      case 'Escape':
        if (this._open) {
          evt.preventDefault();
          evt.stopPropagation();
          this._closeDropdown();
        }
        break;
      case 'Space':
        evt.preventDefault();

        if (this._open) {
          this._closeDropdown();
        } else {
          this._openDropdown({ fromKeyboard: true });
        }
        break;
      case 'Home':
      case 'End':
        if (this._open) {
          evt.preventDefault();
          this._adapter.propagateKey(evt.code);
        }
        break;
      case 'Enter':
        evt.preventDefault();

        if (!this._open) {
          evt.preventDefault();
          this._openDropdown({ fromKeyboard: true });
          return;
        }

        evt.stopImmediatePropagation();

        this._adapter.propagateKey(evt.code);

        // Check if we need to toggle the child menu open state
        const activeIndex = this._adapter.getActiveOptionIndex();
        const activeOption = this._nonDividerOptions[activeIndex];
        if (activeOption && activeOption.options && activeOption.options.length) {
          this._adapter.toggleChildMenu(activeIndex);
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        if (this._open) {
          evt.stopImmediatePropagation();
        }

        evt.preventDefault();

        if (!this._open && evt.code === 'ArrowDown') {
          this._openDropdown({ fromKeyboard: true });
          this._adapter.activateFirstOption();
          return;
        }

        this._adapter.propagateKey(evt.code);
        break;
      case 'ArrowLeft':
        if (this._open) {
          evt.stopImmediatePropagation();
        }
        if (this._mode === 'cascade' && this._open) {
          this._closeDropdown();
        }
        break;
      case 'ArrowRight':
        if (this._open) {
          evt.stopImmediatePropagation();
        }
        if (!this._open) {
          return;
        }
        const hoveredIndex = this._adapter.getActiveOptionIndex();
        const hoveredOption = this._nonDividerOptions[hoveredIndex];
        if (hoveredOption && hoveredOption.options) {
          this._adapter.toggleChildMenu(hoveredIndex, evt.code === 'ArrowRight');
          return;
        }
        break;
    }
  }

  private async _openMenu({ fromKeyboard }: { fromKeyboard?: boolean } = {}): Promise<void> {
    this._open = true;
    let options: IMenuOption[] = [];

    if (typeof this._optionsFactory === 'function') {
      this._loadOptionsAsync();
      this._options = [];
    } else {
      if (!this._options || !this._options.length) {
        return;
      }
      options = this._options as IMenuOption[];
    }

    if (!this._persistSelection) {
      options.forEach(o => o.selected = false);
    }

    this._mapIconToLeadingIcon();

    const selectedValues = this._persistSelection ? this._getSelectedValues() : [];

    const config: IListDropdownConfig = {
      id: this._identifier,
      type: ListDropdownType.Menu,
      options: this._options,
      selectedValues,
      iconClass: this._iconClass,
      dense: this._dense,
      multiple: false,
      popupStatic: true,
      allowBusy: true,
      asyncStyle: ListDropdownAsyncStyle.Spinner,
      optionBuilder: this._optionBuilder,
      optionLimit: this._optionLimit,
      headerBuilder: this._popupHeaderBuilder,
      footerBuilder: this._popupFooterBuilder,
      observeScroll: this._observeScroll,
      observeScrollThreshold: this._observeScrollThreshold,
      popupPlacement: this._placement,
      popupFallbackPlacements: this._fallbackPlacements,
      activeStartIndex: fromKeyboard ? 0 : undefined,
      popupClasses: [
        MENU_CONSTANTS.classes.POPUP,
        MENU_CONSTANTS.classes.MENU,
        ...this._popupClasses as string[]
      ],
      syncWidth: this._syncPopupWidth,
      activeChangeCallback: this._activeChangeListener,
      selectCallback: this._selectListener,
      popupOffset: this._popupOffset,
      cascadingElementFactory: params => this._createCascadingElement(params)
    };

    this._adapter.setHostAttribute(MENU_CONSTANTS.attributes.OPEN, '');
    this._adapter.attachMenu(config);

    // If this menu is in a hover mode, we need to listen for mouse enter/leave events to know when the user is hovering over the popup
    if (this._mode === 'cascade') {
      this._adapter.addDropdownListener('mouseenter', this._childPopupMouseEnterListener);
      this._adapter.addDropdownListener('mouseleave', this._childPopupMouseLeaveListener);
    }
    
    this._adapter.addDropdownListener(MENU_CONSTANTS.events.ACTIVE_CHANGE, (evt: CustomEvent<IMenuActiveChangeEventData>) => {
      this._onActiveOptionChanged(evt.detail.id);
    });
    this._adapter.emitHostEvent(MENU_CONSTANTS.events.OPEN);
  }

  private _closeMenu({ destroy = false } = {}): void {
    this._open = false;
    this._childOpen = false;

    if (destroy) {
      this._adapter.destroyListDropdown();
    } else {
      this._adapter.detachMenu();
    }

    if (this._activeMouseLeaveTimeout !== undefined) {
      window.clearTimeout(this._activeMouseLeaveTimeout);
    }

    this._adapter.removeHostAttribute(MENU_CONSTANTS.attributes.OPEN);
    this._adapter.emitHostEvent(MENU_CONSTANTS.events.CLOSE);
  }

  private _loadOptionsAsync(): Promise<void> {
    if (!this._optionsFactory) {
      if (this._open) {
        this._closeMenu();
      }
      return Promise.resolve();
    }

    return Promise.resolve(this._optionsFactory())
      .then(results => {
        if (!this._persistSelection) {
          const flatResults = this._flattenOptions(results);
          flatResults.filter(o => o.selected).forEach(o => o.selected = false);
        }

        if (this._open) {
          if (results && isArray(results) && results.length) {
            this._options = results;
            this._mapIconToLeadingIcon();
            this._adapter.setOptions(results);
            const selectedValues = this._getSelectedValues();
            if (selectedValues.length) {
              this._adapter.setSelectedValues(selectedValues);
            }
          } else if (this._open) {
            this._closeDropdown();
          }
        }
      })
      .catch(e => {
        console.error('An unexpected error ocurred while opening the menu:', e);
        if (this._open) {
          this._closeDropdown();
        }
      });
  }

  private _handleSelectEvent(value: any): void {
    const index = this._nonDividerOptions.findIndex(o => o.value === value);
    if (index < 0) {
      return;
    }
    this._selectOptionByIndex(index);
  }

  private _selectActiveOption(): void {
    const index = this._adapter.getActiveOptionIndex();
    if (index >= 0 && this._nonDividerOptions[index]) {
      this._selectOptionByIndex(index);
    }
  }

  private _selectOptionByIndex(index: number): void {
    const { options, value } = this._nonDividerOptions[index];

    // We ignore selections if the option has child options
    if (options) {
      this._adapter.setActiveOption(index);
      return;
    }

    this._closeDropdown();
    
    const data: IMenuSelectEventData = { index, value };
    const isCancelled = !this._adapter.emitHostEvent(MENU_CONSTANTS.events.SELECT, data, true, true);
    if (!isCancelled) {
      this._selectedValue = this._persistSelection ? value : undefined;
    }
  }

  private _getSelectedValues(): any[] {
    const values = this._flatOptions.filter(o => o.selected).map(o => o.value);
    if (this._selectedValue !== undefined) {
      values.push(this._selectedValue);
    }
    return values;
  }

  /** Called when a child menu option is selected. */
  protected _onCascadingOptionSelected(data: IMenuSelectEventData): void {
    if (this._persistSelection) {
      this._selectedValue = data.value;
    }
    this._adapter.emitHostEvent(MENU_CONSTANTS.events.SELECT, data);
    this._closeDropdown();
  }

  /** Called when a child menu is opened off of one of our menu options. */
  protected _onCascadingChildOpen(index: number): void {
    super._clearMouseLeaveTimeout();
    this._adapter.closeOtherChildMenus(index);
    this._childOpen = true;
    this._adapter.setActiveOption(index);
  }

  /** Called when a child menu is closed off of one of our menu options. */
  protected _onCascadingChildClose(index: number): void {
    this._childOpen = false;
  }

  protected _closeDropdown(): void {
    this._closeMenu();
  }

  protected _openDropdown({ fromKeyboard }: { fromKeyboard?: boolean } = {}): void {
    this._openMenu({ fromKeyboard });
  }

  protected _setCascadeTargetInactive(): void {
    this._adapter.setCascadeTargetInactive();
  }

  protected _isOwnElement(element: Element): boolean {
    return this._adapter.isOwnElement(element);
  }

  private _createCascadingElement({ index, options, parentValue }: IListDropdownCascadingElementFactoryConfig): HTMLElement {
    const menu = this._adapter.createChildMenu(
      index,
      parentValue,
      this._onCascadingChildOpen.bind(this),
      this._onCascadingChildClose.bind(this),
      this._onCascadingOptionSelected.bind(this)
    );
    menu.mode = 'cascade';
    menu.popupOffset = { mainAxis: 0, crossAxis: -8 };
    menu.dense = this._dense;
    menu.placement = 'right-start';
    menu.fallbackPlacements = ['left-start', 'right-start']; // Cascading menus should only fallback to left or right placement if needed
    menu.persistSelection = this._persistSelection;
    if (this._persistSelection) {
      menu.selectedValue = this._selectedValue;
    }
    menu.options = options;
    menu.optionBuilder = this._optionBuilder;
    menu.iconClass = this._iconClass;

    return menu;
  }

  private _mapIconToLeadingIcon(): void {
    // For backwards compatibility with old API, map the old "icon" property to the new "leadingIcon" property (if exists)
    this._flatOptions.filter(o => o.icon).forEach(o => o.leadingIcon = o.icon);
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      if (value) {
        this._openDropdown();
      } else {
        this._closeDropdown();
      }
    }
  }

  public set options(options: IMenuOption[]) {
    if (typeof options === 'function') {
      this.optionsFactory = options;
    } else {
      this.optionsFactory = undefined;
      // Intentional shallow copy of member properties. These member objects have properties that are references to functions.
      this._options = options.map(o => ({ ...o }));
      
      if (this._open) {
        this._mapIconToLeadingIcon();
        this._adapter.setOptions(this._options as IMenuOption[]);
        if (this._persistSelection) {
          const selectedValues = this._getSelectedValues();
          if (selectedValues.length) {
            this._adapter.setSelectedValues(selectedValues);
          }
        }
      }
    }
  }
  public get options(): IMenuOption[] {
    if (!this._options) {
      return [];
    }

    // Intentional shallow copy of member properties. These member objects have properties that are references to functions.
    return this._flatOptions.map(o => ({ ...o }));
  }

  public set optionsFactory(factory: MenuOptionFactory | undefined) {
    this._optionsFactory = factory;
  }

  public set selectedIndex(value: number) {
    const option = this._nonDividerOptions[value];
    if (option && option.value !== this._selectedValue) {
      this.selectedValue = option.value;
    }
  }
  public get selectedIndex(): number {
    return this._selectedValue !== undefined ? this._nonDividerOptions.findIndex(o => o.value === this._selectedValue) : -1;
  }

  public set selectedValue(value: any) {
    if (this._selectedValue !== value) {
      this._selectedValue = value;
      this._adapter.setSelectedValues(this._selectedValue);
    }
  }
  public get selectedValue(): any {
    return this._selectedValue;
  }

  public get placement(): PositionPlacement {
    return this._placement;
  }
  public set placement(value: PositionPlacement) {
    if (this._placement !== value) {
      this._placement = value || 'bottom-start';
      this._adapter.setHostAttribute(MENU_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }

  public get fallbackPlacements(): PositionPlacement[] {
    return this._fallbackPlacements;
  }
  public set fallbackPlacements(value: PositionPlacement[]) {
    this._fallbackPlacements = Array.isArray(value) ? value : [];
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    this._dense = value;
  }

  public get iconClass(): string {
    return this._iconClass;
  }
  public set iconClass(value: string) {
    this._iconClass = value;
  }

  public get persistSelection(): boolean {
    return this._persistSelection;
  }
  public set persistSelection(value: boolean) {
    if (this._persistSelection === value) {
      return;
    }

    this._persistSelection = value;
    this._adapter.toggleHostAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION, this._persistSelection);

    if (!this._persistSelection) {
      this._flatOptions.forEach(o => o.selected = false);
      this._selectedValue = undefined;
    }
  }

  public get mode(): MenuMode {
    return this._mode;
  }
  public set mode(value: MenuMode) {
    if (this._mode !== value) {
      this._mode = value;
      this._destroyInteractionListeners();
      this._applyMode();
      this._adapter.setHostAttribute(MENU_CONSTANTS.attributes.MODE, this._mode);
    }
  }

  public get popupOffset(): IOverlayOffset {
    return this._popupOffset;
  }
  public set popupOffset(value: IOverlayOffset) {
    this._popupOffset = value;
  }

  public get optionBuilder(): MenuOptionBuilder | undefined {
    return this._optionBuilder;
  }
  public set optionBuilder(cb: MenuOptionBuilder | undefined) {
    this._optionBuilder = cb;
  }

  public get popupElement(): HTMLElement | null {
    return this._adapter.getDropdownElement();
  }
}
