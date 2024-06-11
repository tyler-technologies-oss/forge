import { ICustomElementCore } from '@tylertech/forge-core';
import { IChipAdapter } from './chip-adapter';
import { ChipTheme, ChipType, CHIP_CONSTANTS, IChipDeleteEventData, IChipNavigateEventData, IChipSelectEventData } from './chip-constants';

export interface IChipCore extends ICustomElementCore {
  type: ChipType;
  value: unknown;
  selected: boolean;
  invalid: boolean;
  disabled: boolean;
  dense: boolean;
  theme: ChipTheme;
  href: string;
  target: string;
  download: string;
  rel: string;
  focus(options?: FocusOptions): void;
  focusRemoveButton(): void;
  click(): void;
}

export class ChipCore implements IChipCore {
  private _type: ChipType = CHIP_CONSTANTS.defaults.TYPE;
  private _value: unknown;
  private _selected = false;
  private _invalid = false;
  private _disabled = false;
  private _dense = false;
  private _theme = CHIP_CONSTANTS.defaults.THEME;
  private _href: string;
  private _target: string;
  private _download: string;
  private _rel: string;

  private _clickListener: EventListener = this._onClick.bind(this);
  private _keydownListener: EventListener = this._onKeydown.bind(this);

  constructor(private _adapter: IChipAdapter) {}

  public initialize(): void {
    this._attachListeners();
    this._tryInheritChipSetState();
  }

  public focus(options?: FocusOptions): void {
    this._adapter.focusTrigger(options);
  }

  public focusRemoveButton(): void {
    this._adapter.removeButtonElement?.focus();
  }

  public click(): void {
    this._adapter.clickTrigger();
  }

  private _attachListeners(): void {
    this._adapter.addRootListener('click', this._clickListener);
    this._adapter.addRootListener('keydown', this._keydownListener);
  }

  private _detachListeners(): void {
    this._adapter.removeRootListener('click', this._clickListener);
    this._adapter.removeRootListener('keydown', this._keydownListener);
  }

  private _tryInheritChipSetState(): void {
    // Attempt to inherit state from the parent chip-set component
    // Note: this should only inherit properties that need to be the same across the chips within a set
    const chipSetState = this._adapter.getChipSetState();
    if (chipSetState) {
      if (chipSetState.type !== undefined) {
        this.type = chipSetState.type;
      }
      if (chipSetState.disabled !== undefined) {
        this.disabled = chipSetState.disabled;
      }
      if (chipSetState.dense !== undefined) {
        this.dense = chipSetState.dense;
      }
    }
  }

  private _onClick(evt: MouseEvent): void {
    if (this._isRemoveButton(evt)) {
      evt.stopImmediatePropagation();
      this._dispatchDeleteEvent();
    } else {
      this._handleSelectInteraction();
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'Delete':
      case 'Backspace':
        if (this._type === 'input') {
          evt.preventDefault();
          this._dispatchDeleteEvent();
        }
        break;
      case 'Enter':
      case ' ':
        evt.preventDefault();
        if (this._isRemoveButton(evt)) {
          evt.stopImmediatePropagation();
          if (evt.key === 'Enter') {
            this._adapter.clickRemoveButton();
          }
        } else {
          this.click();
          if (this._adapter.isAnchor) {
            this._adapter.animateStateLayer();
          }
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this._tryNavigate(evt);
        break;
      case 'Tab':
        if (this._type === 'input' && this._isRemoveButton(evt)) {
          this._tryNavigate(evt);
        }
        break;
    }
  }

  private _tryNavigate(evt: KeyboardEvent): void {
    if (this._type === 'input') {
      const isRemoveButtonFocused = !!this._adapter.removeButtonElement?.matches(':focus');
      if (isRemoveButtonFocused) {
        evt.stopPropagation();
        evt.preventDefault();

        if (evt.key === 'ArrowLeft') {
          this._adapter.focusTrigger();
          return;
        }
      } else if (evt.key === 'ArrowRight') {
        this._adapter.tryFocusRemoveButton();
        return;
      }
    }

    const detail: IChipNavigateEventData = {
      direction: evt.key === 'ArrowRight' || evt.key === 'Tab' ? 'next' : 'previous'
    };
    this._adapter.dispatchHostEvent(new CustomEvent(CHIP_CONSTANTS.events.NAVIGATE, { bubbles: true, detail }));
  }

  private _isRemoveButton(evt: Event): boolean {
    return !!this._adapter.removeButtonElement && evt.composedPath().includes(this._adapter.removeButtonElement);
  }

  private _handleSelectInteraction(): void {
    const originalSelected = this._selected;
    this._selected = !this._selected;

    const wasDefaultPrevented = this._dispatchSelectEvent();
    this._selected = originalSelected;

    const isSelectableType = ['filter', 'choice', 'input'].includes(this._type);
    if (!wasDefaultPrevented && isSelectableType) {
      this._selected = !this._selected;
      this._applySelected();
    }
  }

  private _dispatchSelectEvent(): boolean {
    const detail: IChipSelectEventData = {
      selected: this._selected,
      value: this._value
    };
    const event = new CustomEvent(CHIP_CONSTANTS.events.SELECT, { detail, bubbles: true, cancelable: true });
    this._adapter.dispatchHostEvent(event);
    return event.defaultPrevented;
  }

  private _dispatchDeleteEvent(): void {
    const detail: IChipDeleteEventData = { value: this._value };
    this._adapter.dispatchHostEvent(new CustomEvent(CHIP_CONSTANTS.events.DELETE, { detail, bubbles: true }));
  }

  private _applyType(): void {
    const showDeleteButton = this._type === 'input' || this._type === 'field';
    this._adapter.setDeleteButtonVisibility(showDeleteButton);

    this._adapter.setCheckmarkVisibility(this._type === 'filter');
    this._adapter.setStartSlotVisibility(!this._selected);
    this._adapter.toggleFieldVariant(this._type !== 'field');
    this._applySelected();

    this._adapter.setHostAttribute(CHIP_CONSTANTS.attributes.TYPE, this._type);
  }

  private _applySelected(): void {
    this._adapter.setSelected(this._selected);

    // If using the filter type, we need to hide the leading slot to ensure that
    // the checkmark shows in place of any leading elements
    if (this._type === 'filter') {
      this._adapter.setStartSlotVisibility(!this._selected);
    }

    this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.SELECTED, this._selected);
  }

  public get type(): ChipType {
    return this._type;
  }
  public set type(value: ChipType) {
    if (this._type !== value) {
      this._type = value;

      const isValidType = ['action', 'choice', 'filter', 'input', 'field'].includes(this._type);
      if (!isValidType) {
        this._type = 'action';
      }

      this._applyType();
    }
  }

  public get value(): unknown {
    return this._value;
  }
  public set value(value: unknown) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.setHostAttribute(CHIP_CONSTANTS.attributes.VALUE, String(this._value));
    }
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    value = Boolean(value);
    if (this._selected !== value) {
      this._selected = value;
      this._applySelected();
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    value = Boolean(value);
    if (this._invalid !== value) {
      this._invalid = value;
      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.INVALID, value);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);

      if (this._adapter.isConnected) {
        if (this._disabled) {
          this._detachListeners();
        } else {
          this._attachListeners();
        }
      }

      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    value = Boolean(value);
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get theme(): ChipTheme {
    return this._theme;
  }
  public set theme(value: ChipTheme) {
    if (this._theme !== value) {
      this._theme = value ?? CHIP_CONSTANTS.defaults.THEME;
      this._adapter.setHostAttribute(CHIP_CONSTANTS.attributes.THEME, this._theme);
    }
  }

  public get href(): string {
    return this._href;
  }
  public set href(value: string) {
    if (this._href !== value) {
      this._href = value;

      const hasHref = !!this._href?.trim();
      this._adapter.setAnchor(hasHref);

      if (hasHref && this._disabled) {
        this._adapter.setDisabled(false);
      }

      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.HREF, hasHref, this._href);
    }
  }

  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;
      this._adapter.setAnchorProperty('target', value);
      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.TARGET, !!this._target?.trim(), this._target);
    }
  }

  public get download(): string {
    return this._download;
  }
  public set download(value: string) {
    if (this._download !== value) {
      this._download = value;
      this._adapter.setAnchorProperty('download', value);
      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.DOWNLOAD, !!this._download?.trim(), this._download);
    }
  }

  public get rel(): string {
    return this._rel;
  }
  public set rel(value: string) {
    if (this._rel !== value) {
      this._rel = value;
      this._adapter.setAnchorProperty('rel', value);
      this._adapter.toggleHostAttribute(CHIP_CONSTANTS.attributes.REL, !!this._rel?.trim(), this._rel);
    }
  }
}
