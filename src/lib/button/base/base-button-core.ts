import { ICustomElementCore } from '@tylertech/forge-core';
import { ExperimentalFocusOptions } from '../../constants';
import { task } from '../../core/utils/utils';
import { IBaseButtonAdapter } from './base-button-adapter';
import { BASE_BUTTON_CONSTANTS, ButtonClickOptions, ButtonType } from './base-button-constants';
import { IBaseButton } from './base-button';

export interface IBaseButtonCore extends ICustomElementCore {
  type: ButtonType;
  disabled: boolean;
  popoverIcon: boolean;
  dense: boolean;
  click(options: ButtonClickOptions): void;
  focus(options?: ExperimentalFocusOptions): void;
}

export abstract class BaseButtonCore<T extends IBaseButtonAdapter<IBaseButton>> implements IBaseButtonCore {
  private _type: ButtonType = 'button'; // We default our buttons to the "button" type instead of "submit" as that is more common
  private _disabled = false;
  private _popoverIcon = false;
  private _dense = false;

  private _clickListener: EventListener = this._onClick.bind(this);
  private _keydownListener: EventListener = this._onKeydown.bind(this);
  private _slotChangeListener: EventListener = () => this._detectSlottedAnchor();

  constructor(protected _adapter: T) {}

  public initialize(): void {
    this._detectSlottedAnchor();
    this._adapter.addDefaultSlotChangeListener(this._slotChangeListener);
    if (this._type !== 'button') {
      this._adapter.addNativeButton(this._type as 'submit' | 'reset');
    }
  }

  /**
   * Handles overriding the the `click()` method on the HTMLElement instance
   */
  public click({ animateStateLayer = false }: ButtonClickOptions = {}): void {
    if (this._disabled) {
      return;
    }

    this._adapter.clickHost();

    if (animateStateLayer) {
      this._adapter.animateStateLayer();
    }
  }

  public focus(options?: ExperimentalFocusOptions): void {
    this._adapter.focusHost(options);

    if (options?.focusVisible !== false) {
      this._adapter.forceFocusVisible();
    }
  }

  protected async _onClick(evt: MouseEvent): Promise<void> {
    const isFormType = this._type === 'submit' || this._type === 'reset';

    // Custom elements do not work with the popover* attributes by default so we need to manually
    // manage the popover functionality for now...
    if (!isFormType && this._adapter.hasPopoverTarget()) {
      const isOpen = this._adapter.managePopover();

      // If the popover was opened successfully we can stop here since there is no need to
      // handle any other scenarios
      if (isOpen) {
        return;
      }
    }

    // Wait a cycle to allow the click event to propagate
    await new Promise<void>(resolve => setTimeout(resolve));

    // We allow for our click event to bubble first before we handle it in case the developer
    // wants to prevent the default behavior
    if (evt.defaultPrevented || this._disabled) {
      return;
    }

    // For button types of submit or reset, we need to manually submit or reset the form
    // since the click event doesn't do that for us with custom elements
    if (isFormType) {
      this._adapter.clickFormButton(this._type);
    }
  }

  /**
   * Handle keydown events on the host element to manually trigger click events.
   */
  private async _onKeydown(evt: KeyboardEvent): Promise<void> {
    // Handle the special case for the space key to avoid scrolling when triggered
    if (evt.key === ' ') {
      evt.preventDefault();
      this.click();
      return;
    }

    // Wait a cycle for the keydown event to propagate
    await task();

    if (evt.defaultPrevented || this._disabled) {
      return;
    }

    if (evt.key === 'Enter') {
      this.click();
    }
  }

  private _detectSlottedAnchor(): void {
    if (this._adapter.hasSlottedAnchor) {
      this.disabled = false;
      this._adapter.removeHostListener('click', this._clickListener);
      this._adapter.removeHostListener('keydown', this._keydownListener);
    } else {
      this._adapter.addHostListener('click', this._clickListener);
      this._adapter.addHostListener('keydown', this._keydownListener);
    }
    this._adapter.initialize();
  }

  public get type(): ButtonType {
    return this._type;
  }
  public set type(type: ButtonType) {
    if (this._type !== type) {
      this._type = type;
      this._adapter.setHostAttribute(BASE_BUTTON_CONSTANTS.attributes.TYPE, type);

      if (this.type !== 'button') {
        this._adapter.addNativeButton(type as 'submit' | 'reset');
      } else {
        this._adapter.removeNativeButton();
      }
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);

    if (this._disabled === value) {
      return;
    }

    if (this._adapter.hasSlottedAnchor) {
      value = false;
    }

    this._disabled = value;
    this._adapter.setDisabled(this._disabled);
    this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.DISABLED, value);
  }

  public get popoverIcon(): boolean {
    return this._popoverIcon;
  }
  public set popoverIcon(value: boolean) {
    value = Boolean(value);
    if (this._popoverIcon !== value) {
      this._popoverIcon = value;
      this._adapter.toggleDefaultPopoverIcon(this._popoverIcon);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.POPOVER_ICON, value);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    value = Boolean(value);
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.DENSE, value);
    }
  }
}
