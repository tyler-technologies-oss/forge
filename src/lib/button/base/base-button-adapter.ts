import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { IBaseButton } from './base-button';
import { BASE_BUTTON_CONSTANTS } from './base-button-constants';
import { BUTTON_FORM_ATTRIBUTES, cloneAttributes } from '../../core/utils/reflect-utils';
import { internals } from '../../constants';
import { supportsPopover } from '../../core/utils/feature-detection';

export interface IBaseButtonAdapter extends IBaseAdapter {
  initialize(): void;
  setAnchorHref(href: string): void;
  setAnchorTarget(target: string): void;
  setAnchorDownload(value: string): void;
  setAnchorRel(value: string): void;
  setDisabled(value: boolean): void;
  ensureAnchorEnabled(value: boolean): void;
  clickAnchor(): void;
  clickHost(): void;
  clickFormButton(type: string): void;
  addAnchorEventListener(type: string, listener: EventListener): void;
  removeAnchorEventListener(type: string, listener: EventListener): void;
  hasPopoverTarget(): boolean;
  tryShowPopover(): void;
  toggleDefaultPopoverIcon(value: boolean): void;
}

export abstract class BaseButtonAdapter extends BaseAdapter<IBaseButton> implements IBaseButtonAdapter {
  protected _rootElement: HTMLElement;
  protected _anchorElement: HTMLAnchorElement | undefined;
  protected _focusIndicatorElement: IFocusIndicatorComponent;
  protected _stateLayerElement: IStateLayerComponent;
  protected _endSlotElement: HTMLSlotElement;

  constructor(component: IBaseButton) {
    super(component);
    this._rootElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.ROOT) as HTMLButtonElement;
    this._focusIndicatorElement = getShadowElement(this._component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
    this._endSlotElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
  }

  public initialize(): void {
    this._applyHostSemantics();
  }

  public setAnchorHref(href: string): void {
    const hasHref = typeof href === 'string' && !!href && href.trim().length > 0;
    if (hasHref) {
      if (!this._anchorElement) {
        this._anchorElement = this._createAnchorRootElement();
        this._rootElement.insertAdjacentElement('afterend', this._anchorElement);
      }
      this._anchorElement.href = href;
    } else {
      this._anchorElement?.remove();
      this._anchorElement = undefined;
    }
    this._applyHostSemantics();
  }

  public setAnchorTarget(target: string): void {
    if (this._anchorElement) {
      this._anchorElement.target = target;
    }
  }

  public setAnchorDownload(value: string): void {
    if (this._anchorElement) {
      this._anchorElement.download = value;
    }
  }

  public setAnchorRel(value: string): void {
    if (this._anchorElement) {
      this._anchorElement.rel = value;
    }
  }

  public setDisabled(value: boolean): void {
    if (this._anchorElement) {
      return; // Cannot disable an anchor element
    }
    this.ensureAnchorEnabled(value);
  }

  public ensureAnchorEnabled(value: boolean): void {
    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }

    this._component.tabIndex = value ? -1 : 0;
    toggleAttribute(this._component, value, 'aria-disabled', 'true');
  }

  public clickAnchor(): void {
    this._anchorElement?.click();
  }

  public clickHost(): void {
    HTMLElement.prototype.click.call(this._component);
  }

  public clickFormButton(type: string): void {
    if (!this._component.form) {
      return; // Nothing for us to do if there is no form element associated to us
    }

    if (type === 'submit') {
      this._component[internals].setFormValue(this._component.value);

      // We don't use a real <button> since the host is the semantic button, so for
      // the "submit" button type we need to create a temporary button and click it
      // to trigger the form submission
      const tempBtn = document.createElement('button');
      tempBtn.type = type;
      cloneAttributes(this._component, tempBtn, BUTTON_FORM_ATTRIBUTES);

      // form.requestSubmit(submitter) does not work with form associated custom
      // elements. This patches the dispatched submit event to add the correct `submitter`.
      // See https://github.com/WICG/webcomponents/issues/814
      this._component.form.addEventListener('submit', evt => {
        Object.defineProperty(evt, 'submitter', {
          configurable: true,
          enumerable: true,
          get: () => this._component
        });
      }, { capture: true, once: true });

      this._component.insertAdjacentElement('afterend', tempBtn);
      tempBtn.click();
      tempBtn.remove();
    } else if (type === 'reset') {
      this._component.form?.reset();
    }
  }

  public addAnchorEventListener(type: string, listener: EventListener): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeAnchorEventListener(type: string, listener: EventListener): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public hasPopoverTarget(): boolean {
    return this._component.hasAttribute('popovertarget');
  }

  public tryShowPopover(): void {
    if (!this.hasPopoverTarget() || !supportsPopover()) {
      return;
    }

    const doc = this._component.ownerDocument.getRootNode() as Document | ShadowRoot;
    if (!doc) {
      return;
    }
    const targetId = this._component.getAttribute('popovertarget');
    const popoverTargetElement = doc.querySelector(`#${targetId}`);
    (popoverTargetElement as any)?.showPopover(); // TODO: remove `any` when TypeScript version is upgraded
  }

  public toggleDefaultPopoverIcon(value: boolean): void {
    if (value) {
      const hasIcon = this._endSlotElement.querySelector('forge-icon');
      if (!hasIcon) {
        const icon = document.createElement('forge-icon');
        icon.name = tylIconArrowDropDown.name;
        this._endSlotElement.append(icon);
      }
    } else {
      const icon = this._endSlotElement.querySelector('forge-icon');
      icon?.remove();
    }
  }

  private _applyHostSemantics(): void {
    const role = this._component.getAttribute('role');
    if (!role || ['button', 'link'].includes(role)) {
      this._component.role = this._anchorElement ? 'link' : 'button';
    }
    this._component.tabIndex = !this._anchorElement && this._component.disabled ? -1 : 0;
  }

  private _createAnchorRootElement(): HTMLAnchorElement {
    const a = document.createElement('a');
    a.setAttribute('aria-hidden', 'true');
    a.tabIndex = -1;
    a.target = this._component.target;
    a.download = this._component.download;
    a.rel = this._component.rel;
    return a;
  }
}
