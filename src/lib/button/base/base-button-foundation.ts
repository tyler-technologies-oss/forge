import { getEventPath, ICustomElementFoundation } from '@tylertech/forge-core';
import { IBaseButtonAdapter } from './base-button-adapter';
import { BASE_BUTTON_CONSTANTS, ButtonType } from './base-button-constants';

export interface IBaseButtonFoundation extends ICustomElementFoundation {
  type: ButtonType;
  disabled: boolean;
  href: string;
  target: string;
  download: string;
  rel: string;
  dense: boolean;
  click(): void;
}

export abstract class BaseButtonFoundation<T extends IBaseButtonAdapter> implements IBaseButtonFoundation {
  private _type: ButtonType = 'button';
  private _disabled = false;
  private _href = '';
  private _target = '';
  private _download = '';
  private _rel = '';
  private _dense = false;

  private _clickListener: EventListener;
  private _keydownListener: EventListener;
  private _anchorFocusListener: EventListener;

  private get _hasHref(): boolean {
    return typeof this._href === 'string' && !!this._href && this._href.trim().length > 0;
  }

  constructor(protected _adapter: T) {
    this._clickListener = (evt: MouseEvent) => this._onClick(evt);
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
    this._anchorFocusListener = () => this._adapter.focusHost();
    this._adapter.addHostListener('keydown', this._keydownListener);
  }

  public initialize(): void {
    this._adapter.initialize();

    if (this._hasHref) {
      this._adapter.addAnchorEventListener('focus', this._anchorFocusListener);
    } else {
      this._adapter.addHostListener('click', this._clickListener);
    }
  }

  public click(): void {
    if (this._hasHref) {
      this._adapter.clickAnchor();
    } else {
      this._adapter.clickHost();
    }
  }

  private async _onClick(evt: MouseEvent): Promise<void> {
    // Wait a cycle to allow the click event to propagate
    await new Promise<void>(resolve => setTimeout(() => resolve()));

    if (evt.defaultPrevented) {
      return;
    }

    this._handleClick({ proxyClick: false });
  }

  private _handleClick({ proxyClick = true } = {}): void {
    if (this._disabled) {
      return;
    }

    if (this._hasHref) {
      this._adapter.clickAnchor();
      return;
    }

    if (this._type !== 'button') {
      this._adapter.clickFormButton(this._type);
    }

    if (this._adapter.hasPopoverTarget()) {
      this._adapter.tryShowPopover();
    }

    if (proxyClick) {
      this._adapter.clickHost();
    }
  }

  private async _onKeydown(evt: KeyboardEvent): Promise<void> {
    // Wait a cycle for the keydown event to propagate
    await new Promise<void>(resolve => setTimeout(() => resolve()));

    if (evt.defaultPrevented) {
      return;
    }
    
    if (evt.key === 'Enter' || (evt.key === ' ' && !this._hasHref)) {
      if (this._hasHref) {
        this._adapter.clickAnchor();
      } else {
        this.click();
      }
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
    if (this._hasHref) {
      value = false;
    }
    value = Boolean(value);
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.DISABLED, value);
    }
  }

  public get href(): string {
    return this._href;
  }
  public set href(value: string) {
    value = (value ?? '').trim();
    if (this._href !== value) {
      this._href = value;
      this._adapter.setAnchorHref(this._href, this._target);

      if (this._hasHref) {
        this._adapter.removeHostListener('click', this._clickListener);
        this._adapter.addAnchorEventListener('focus', this._anchorFocusListener);
      } else {
        this._adapter.addHostListener('click', this._clickListener);
        this._adapter.removeAnchorEventListener('focus', this._anchorFocusListener);
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
      this._adapter.setAnchorTarget(value);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.TARGET, !!this._target, this._target);
    }
  }

  public get download(): string {
    return this._download;
  }
  public set download(value: string) {
    if (this._download !== value) {
      this._download = value;
      this._adapter.setAnchorDownload(this._download);
      this._adapter.toggleHostAttribute(BASE_BUTTON_CONSTANTS.attributes.DOWNLOAD, !!this._download, this._download);
    }
  }

  public get rel(): string {
    return this._rel;
  }
  public set rel(value: string) {
    if (this._rel !== value) {
      this._rel = value;
      this._adapter.setAnchorRel(this._rel);
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
