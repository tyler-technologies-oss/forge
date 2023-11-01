import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { replaceElement } from '../../core/utils/utils';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { IBaseButton } from './base-button';
import { BASE_BUTTON_CONSTANTS } from './base-button-constants';
import { BUTTON_FORM_ATTRIBUTES, cloneAttributes } from '../../core/utils/reflect-utils';

export interface IBaseButtonAdapter extends IBaseAdapter {
  initialize(): void;
  setAnchorHref(href: string, target: string): void;
  setAnchorTarget(target: string): void;
  setAnchorDownload(value: string): void;
  setAnchorRel(value: string): void;
  setDisabled(value: boolean): void;
  clickAnchor(): void;
  clickHost(): void;
  clickFormButton(type: string): void;
  addAnchorEventListener(type: string, listener: EventListener): void;
  removeAnchorEventListener(type: string, listener: EventListener): void;
  hasPopoverTarget(): boolean;
  tryShowPopover(): void;
}

export abstract class BaseButtonAdapter extends BaseAdapter<IBaseButton> implements IBaseButtonAdapter {
  protected _rootElement: HTMLElement | HTMLAnchorElement;
  protected _focusIndicatorElement: IFocusIndicatorComponent;
  protected _stateLayerElement: IStateLayerComponent;

  private get _isAnchor(): boolean {
    return this._rootElement.tagName === 'A';
  }

  constructor(component: IBaseButton) {
    super(component);
    this._rootElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.ROOT) as HTMLButtonElement | HTMLAnchorElement;
    this._focusIndicatorElement = getShadowElement(this._component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public initialize(): void {
    this._applyHostSemantics();
  }

  public setAnchorHref(href: string, target: string): void {
    const hasHref = typeof href === 'string' && !!href && href.trim().length > 0;
    if (hasHref) {
      if (!this._isAnchor) {
        const anchor = this._createAnchorRootElement(target);
        this._rootElement = replaceElement(this._rootElement, anchor) as HTMLAnchorElement;
      }
      (this._rootElement as HTMLAnchorElement).href = href;
    } else if (this._isAnchor) {
      const defaultEl = this._createDefaultRootElement();
      this._rootElement = replaceElement(this._rootElement, defaultEl) as HTMLElement;
    }
    this._applyHostSemantics();
  }

  public setAnchorTarget(target: string): void {
    if (this._isAnchor) {
      (this._rootElement as HTMLAnchorElement).target = target;
    }
  }

  public setAnchorDownload(value: string): void {
    if (this._isAnchor) {
      (this._rootElement as HTMLAnchorElement).download = value;
    }
  }

  public setAnchorRel(value: string): void {
    if (this._isAnchor) {
      (this._rootElement as HTMLAnchorElement).rel = value;
    }
  }

  public setDisabled(value: boolean): void {
    if (this._isAnchor) {
      return; // Cannot disable an anchor element
    }

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
    if (this._isAnchor) {
      (this._rootElement as HTMLAnchorElement).click();
    }
  }

  public clickHost(): void {
    HTMLElement.prototype.click.call(this._component);
  }

  public clickFormButton(type: string): void {
    if (!this._component.form) {
      return; // Nothing for us to do if there is no form element associated to us
    }

    if (type === 'submit') {
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
    if (!this._component.hasAttribute('popovertarget') || !HTMLElement.prototype.hasOwnProperty('popover')) {
      return;
    }

    const doc = this._component.ownerDocument.getRootNode() as Document | ShadowRoot;
    if (!doc || !this._component.hasAttribute('popovertarget')) {
      return;
    }
    const targetId = this._component.getAttribute('popovertarget');
    const popoverTargetElement = doc.querySelector(`#${targetId}`);
    (popoverTargetElement as any)?.showPopover();
  }

  private _applyHostSemantics(): void {
    this._component.role = this._isAnchor ? 'link' : 'button';
    this._component.tabIndex = !this._isAnchor && this._component.disabled ? -1 : 0;
  }

  private _createAnchorRootElement(target: string): HTMLAnchorElement {
    const a = document.createElement('a');
    a.classList.add(BASE_BUTTON_CONSTANTS.classes.ROOT);
    a.setAttribute('part', 'root');
    a.setAttribute('aria-hidden', 'true');
    a.tabIndex = -1;
    a.target = target;
    return a;
  }

  private _createDefaultRootElement(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add(BASE_BUTTON_CONSTANTS.classes.ROOT);
    div.setAttribute('part', 'root');
    return div;
  }
}
