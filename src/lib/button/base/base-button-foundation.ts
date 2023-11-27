import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ExperimentalFocusOptions } from '../../constants';
import { IBaseButtonAdapter } from './base-button-adapter';
import { BASE_BUTTON_CONSTANTS, ButtonClickOptions, ButtonType } from './base-button-constants';

export interface IBaseButtonFoundation extends ICustomElementFoundation {
  type: ButtonType;
  disabled: boolean;
  popoverIcon: boolean;
  anchor: boolean;
  href: string;
  target: string;
  download: string;
  rel: string;
  dense: boolean;
  click(options: ButtonClickOptions): void;
  focus(options?: ExperimentalFocusOptions): void;
  proxyLabel(label: string | null): void;
}

export abstract class BaseButtonFoundation<T extends IBaseButtonAdapter> implements IBaseButtonFoundation {
  private _type: ButtonType = 'button'; // We default our buttons to the "button" type instead of "submit" as that is more common
  private _disabled = false;
  private _popoverIcon = false;
  private _anchor = false;
  private _href = '';
  private _target = '';
  private _download = '';
  private _rel = '';
  private _dense = false;

  private _clickListener: EventListener;
  private _keydownListener: EventListener;
  private _anchorFocusListener: EventListener;

  constructor(protected _adapter: T) {
    this._clickListener = (evt: MouseEvent) => this._onClick(evt);
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
    this._anchorFocusListener = () => this._adapter.focusHost(); // Always ensure our host is focused when the anchor is focused
    this._adapter.addHostListener('keydown', this._keydownListener);
  }

  public initialize(): void {
    this._adapter.initialize();

    if (this._anchor) {
      // When we're in anchor mode, we swap to us an `<a>` internally as the root. Since the `<a>`
      // element is interactive by default, we can remove our click listener since the anchor will
      // take over the default interaction handling
      this._adapter.addAnchorEventListener('focus', this._anchorFocusListener);
    } else {
      // When we're in button mode, we need to handle the click event on the host element
      this._adapter.addHostListener('click', this._clickListener);
    }
  }

  /**
   * Handles overriding the the `click()` method on the HTMLElement instance
   */
  public click({ animateStateLayer = false }: ButtonClickOptions = {}): void {
    if (this._disabled) {
      return;
    }

    if (this._anchor) {
      this._adapter.clickAnchor();
    } else {
      this._adapter.clickHost();
    }

    if (animateStateLayer) {
      this._adapter.animateStateLayer();
    }
  }

  public focus(options?: ExperimentalFocusOptions): void {
    this._adapter.focusHost(options);

    if (options?.focusVisible) {
      this._adapter.forceFocusVisible();
    }
  }

  public proxyLabel(label: string | null): void {
    this._adapter.proxyLabel(label);
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
    // Handle the special case for the space key (when not an anchor) to avoid
    // scrolling when triggered
    if (evt.key === ' ' && !this._anchor) {
      evt.preventDefault();
      this.click();
      return;
    }

    // Wait a cycle for the keydown event to propagate
    await new Promise<void>(resolve => setTimeout(resolve));

    if (evt.defaultPrevented || this._disabled) {
      return;
    }
    
    if (evt.key === 'Enter') {
      if (this._anchor) {
        this._adapter.clickAnchor();
      } else {
        this.click();
      }
    }
  }

  private _toggleAnchor(): void {
    if (this._anchor) {
      this._adapter.initializeAnchor();
      this._manageAnchorListeners();
      this.disabled = false; // Anchor elements are always enabled
    } else {
      this._adapter.removeAnchor();
      this._manageAnchorListeners();
    }
  }

  private _manageAnchorListeners(): void {
    if (this._anchor) {
      this._adapter.removeHostListener('click', this._clickListener);
      this._adapter.addAnchorEventListener('focus', this._anchorFocusListener);
    } else {
      this._adapter.addHostListener('click', this._clickListener);
      this._adapter.removeAnchorEventListener('focus', this._anchorFocusListener);
    }
  }

  public get type(): ButtonType {
    return this._type;
  }
  public set type(type: ButtonType) {
    if (this._type !== type) {
      this._type = type;
      this._adapter.setHostAttribute(BASE_BUTTON_CONSTANTS.attributes.TYPE, type);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    // If we're in anchor mode, we need to ensure that the anchor is always enabled
    if (this._anchor) {
      if (this._disabled) {
        this._adapter.syncDisabled(false);
      }
      value = false;
    }

    value = Boolean(value);

    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.DISABLED, value);
    }
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

  /**
   * Anchor properties
   */

  public get anchor(): boolean {
    return this._anchor;
  }
  public set anchor(value: boolean) {
    value = Boolean(value);
    if (this._anchor !== value) {
      this._anchor = value;
      this._toggleAnchor();
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.ANCHOR, value);
    }
  }

  public get href(): string {
    return this._href;
  }
  public set href(value: string) {
    value = (value ?? '').trim();
    if (this._href !== value) {
      this._href = value;
      this.anchor = this._href.length > 0;
      if (this._anchor) {
        this._adapter.setAnchorProperty('href', this._href);
      }
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.HREF, !!this._href, this._href);
    }
  }

  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value ?? '_self';
      this._adapter.setAnchorProperty('target', value);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.TARGET, !!this._target, this._target);
    }
  }

  public get download(): string {
    return this._download;
  }
  public set download(value: string) {
    if (this._download !== value) {
      this._download = value;
      this._adapter.setAnchorProperty('download', this._download);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.DOWNLOAD, !!this._download, this._download);
    }
  }

  public get rel(): string {
    return this._rel;
  }
  public set rel(value: string) {
    if (this._rel !== value) {
      this._rel = value;
      this._adapter.setAnchorProperty('rel', this._rel);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.REL, !!this._rel, this._rel);
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
