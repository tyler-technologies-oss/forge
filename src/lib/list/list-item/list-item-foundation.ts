import { ICustomElementFoundation, matchesSelectors } from '@tylertech/forge-core';
import { ForgeRipple } from '../../ripple';
import { IListItemAdapter } from './list-item-adapter';
import { LIST_ITEM_CONSTANTS, IListItemSelectEventData } from './list-item-constants';

export interface IListItemFoundation extends ICustomElementFoundation {
  static: boolean;
  twoLine: boolean;
  threeLine: boolean;
  active: boolean;
  selected: boolean;
  value: any;
  href: string;
  target: string;
  ripple: boolean;
  disabled: boolean;
  dense: boolean;
  wrap: boolean;
  setFocus(): void;
}

/**
 * The foundation class behind the `<forge-list-item>` component.
 */
export class ListItemFoundation implements IListItemFoundation {
  private _ripple = true;
  private _rippleInstance: ForgeRipple;
  private _static = false;
  private _twoLine = false;
  private _threeLine = false;
  private _active = false;
  private _selected = false;
  private _value: any;
  private _href: string;
  private _target: string;
  private _disabled = false;
  private _dense = false;
  private _propagateClick = true;
  private _indented = false;
  private _wrap = false;
  private _clickListener: (evt: MouseEvent) => void;
  private _mouseDownListener: (evt: MouseEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;

  constructor(private _adapter: IListItemAdapter) {
    this._clickListener = (evt: MouseEvent) => this._onClick(evt);
    this._mouseDownListener = (evt: MouseEvent) => this._onMouseDown(evt);
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
  }

  public initialize(): void {
    this._adapter.initializeAccessibility();
    this._setRipple();
    this._adapter.setStatic(this._static);
    this._adapter.setDense(this._dense);
    this._adapter.setDisabled(this._disabled);
    this._adapter.setIndented(this._indented);
    this._adapter.setWrap(this._wrap);

    if (!this._static) {
      this._adapter.addListener('click', this._clickListener);
      this._adapter.addListener('mousedown', this._mouseDownListener, { passive: false, capture: true });
      this._adapter.addListener('keydown', this._keydownListener);
    }

    if (this._threeLine) {
      this._adapter.setThreeLine(this._threeLine);
    } else if (this.twoLine) {
      this._adapter.setTwoLine(this._twoLine);
    }

    const isSelected = this._adapter.trySelect(this._value);
    if(isSelected != null) {
      this._selected = isSelected;
    }
  }

  public disconnect(): void {
    if (this._rippleInstance) {
      this._rippleInstance.destroy();
      this._rippleInstance = undefined as any;
    }
  }

  private _onMouseDown(evt: MouseEvent): void {
    if (this._adapter.hasFocus() || !this._propagateClick) {
      evt.preventDefault();
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      if (evt.key === ' ') {
        evt.preventDefault();
      }
      this._select(evt.target as HTMLElement);
    }
  }

  /**
   * Handles clicking a list item.
   * @param evt
   */
  private _onClick(evt: MouseEvent): void {
    this._select(evt.target as HTMLElement);
  }

  private _select(targetElement: HTMLElement): void {
    const ignoreElement = targetElement?.hasAttribute(LIST_ITEM_CONSTANTS.attributes.IGNORE);
    if (this._static || this._disabled || ignoreElement) {
      return;
    }

    if (!this._adapter.hasFocus() && this._propagateClick) {
      this.setFocus();
    }

    if (this._href) {
      if (this._target) {
        window.open(this._href, this._target);
      } else {
        document.location.href = this._href;
      }
      return;
    }

    // If the target was not a checkbox or radio button, attempt to find one and toggle its checked state
    if (!matchesSelectors(targetElement, LIST_ITEM_CONSTANTS.selectors.CHECKBOX_RADIO_SELECTOR)) {
      this._adapter.tryToggleCheckboxRadio();
    }

    const data: IListItemSelectEventData = {
      value: this._value,
      listItem: this._adapter.getListItem()
    };
    this._adapter.emitHostEvent(LIST_ITEM_CONSTANTS.events.SELECT, data);
  }

  /** Gets/sets whether the list item has a ripple or not. */
  public get ripple(): boolean {
    return this._ripple;
  }
  public set ripple(value: boolean) {
    if (this._ripple !== value) {
      // We don't attach ripples to static items
      if (value && this._static) {
        return;
      }
      this._ripple = value;
      this._setRipple();

      this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.RIPPLE, String(this._ripple));
    }
  }

  /** Gets/sets whether the static state of this list item. */
  public get static(): boolean {
    return this._static;
  }
  public set static(value: boolean) {
    if (this._static !== value) {
      this._static = value;
      this._adapter.setStatic(this._static);

      // Ensure we either add or remove the ripple
      this._setRipple();

      // Toggle the click listener
      if (this._static) {
        this._adapter.removeListener('click', this._clickListener);
      } else {
        this._adapter.addListener('click', this._clickListener);
      }

      if (this._static) {
        this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC);
      } else {
        this._adapter.removeHostAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC);
      }
    }
  }

  /** Gets/sets whether the list item displays two lines of text. */
  public get twoLine(): boolean {
    return this._twoLine;
  }
  public set twoLine(value: boolean) {
    if (this._twoLine !== value) {
      this._twoLine = value;
      this._adapter.setTwoLine(this._twoLine);

      if (this._twoLine) {
        this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE);
      } else {
        this._adapter.removeHostAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE);
      }
    }
  }

  /** Gets/sets whether the list item displays two lines of text. */
  public get threeLine(): boolean {
    return this._threeLine;
  }
  public set threeLine(value: boolean) {
    if (this._threeLine !== value) {
      this._threeLine = value;

      if (this._threeLine) {
        this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE);
      } else {
        this._adapter.removeHostAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE);
      }

      if (this._threeLine) {
        this._twoLine = false;
      }

      this._adapter.setTwoLine(this._twoLine);
      this._adapter.setThreeLine(this._threeLine);
    }
  }

  /** Gets/sets whether the list item is active or not. */
  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    if (this._active !== value) {
      this._active = value;
      this._adapter.setActive(this._active);
      if (this._active) {
        this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE);
      } else {
        this._adapter.removeHostAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE);
      }
    }
  }

  /** Gets/sets whether the list item is selected or not. */
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.setSelected(this._selected);
      this._adapter.tryToggleCheckboxRadio(this._selected);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED, this._selected);
    }
  }

  /** Gets/sets the unique value for this list item. */
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    const isSelected = this._adapter.trySelect(this._value);
    if(isSelected != null) {
      this._selected = isSelected;
    }
  }

  /** Gets/sets the href link that this list item will send the browser to when clicked. */
  public get href(): string {
    return this._href;
  }
  public set href(value: string) {
    if (this._href !== value) {
      this._href = value;
      if (this._href) {
        this._adapter.setRole(LIST_ITEM_CONSTANTS.roles.LINK);
      } else {
        this._adapter.setRole(LIST_ITEM_CONSTANTS.roles.LIST_ITEM);
      }
      this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.HREF, this._href);
    }
  }

  /** Gets/sets the href link target. */
  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    this._target = value;
  }

  /** Gets/sets the disabled state. */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  /** Gets/sets the dense state. */
  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setDense(this._dense);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  /** Gets/sets the dense state. */
  public get propagateClick(): boolean {
    return this._propagateClick;
  }
  public set propagateClick(value: boolean) {
    if (this._propagateClick !== value) {
      this._propagateClick = value;
      this._adapter.setHostAttribute(LIST_ITEM_CONSTANTS.attributes.PROPAGATE_CLICK, '' + !!this._propagateClick);
    }
  }

  public get indented(): boolean {
    return this._indented;
  }
  public set indented(value: boolean) {
    if (this._indented !== value) {
      this._indented = value;
      this._adapter.setIndented(this._indented);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED, this._indented);
    }
  }

  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.setWrap(this._wrap);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP, this._wrap);
    }
  }

  private async _setRipple(): Promise<void> {
    if (this._ripple && !this._static && !this._rippleInstance) {
      const type = await this._adapter.userInteractionListener();
      if (this._ripple && !this._static && !this._rippleInstance) { // need to re-check after await
        this._rippleInstance = this._adapter.createRipple();
        if (type === 'focusin') {
          this._rippleInstance.handleFocus();
        }
      }
    } else if ((!this._ripple || this._static) && this._rippleInstance) {
      this._rippleInstance.destroy();
      this._rippleInstance = undefined as any;
    }
  }

  /**
   * Sets focus to this list item.
   */
  public setFocus(): void {
    this._adapter.setFocus();
  }
}
