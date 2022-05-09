import { addClass, getShadowElement, removeClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { ForgeRipple, ForgeRippleAdapter, ForgeRippleCapableSurface, ForgeRippleFoundation } from '../ripple';
import { ICheckboxComponent } from './checkbox';
import { CHECKBOX_CONSTANTS } from './checkbox-constants';

type PropertyDescriptorGetter = (() => unknown) | undefined;

export interface ICheckboxAdapter extends IBaseAdapter {
  forceLayout(): void;
  isAttachedToDOM(): boolean;
  isDisabled(): boolean;
  isChecked(): boolean;
  isIndeterminate(): boolean;
  setRootClass(classes: string | string[]): void;
  removeRootClass(classes: string | string[]): void;
  setWrapperClass(classes: string | string[]): void;
  removeWrapperClass(classes: string | string[]): void;
  setDense(value: boolean): void;
  initialize(): void;
  disconnect(): void;
  // Sets attributes on the native checkbox element
  setNativeAttribute(qualifiedName: string, value: string): void;
  removeNativeAttribute(qualifiedName: string): void;
  listen(qualifiedName: string, callback: () => void, onRoot?: boolean): void;
  unlisten(qualifiedName: string, callback: () => void, onRoot?: boolean): void;
  installPropertyChangeHooks(callback: () => void): void;
  uninstallPropertyChangeHooks(): void;
  setInputAttributeObserver(listener: (name: string, value: string) => void): void;
}

export class CheckboxAdapter extends BaseAdapter<ICheckboxComponent> implements ICheckboxAdapter, ForgeRippleCapableSurface {
  private _wrapperElement: HTMLElement;
  private _rootElement: HTMLElement;
  private _inputElement: HTMLInputElement;
  private _labelElement: HTMLLabelElement;
  private _inputFocusHandler: () => void;
  private _inputBlurHandler: () => void;
  private _inputMutationObserver: MutationObserver;
  private _rippleInstance: ForgeRipple;

  constructor(component: ICheckboxComponent) {
    super(component);
  }

  // ForgeRippleCapableSurface
  public get root(): Element {
    return this._rootElement;
  }

  public get unbounded(): boolean | undefined {
    return true;
  }

  public get disabled(): boolean | undefined {
    return this.isDisabled();
  }

  public initialize(): void {
    this._configureElements();
    this._attachInternalInputListeners();
    this._rippleInstance = this._createRipple();

    requestAnimationFrame(() => {
      if (this._rippleInstance) {
        this._rippleInstance.layout();
      }
    });
  }

  public setDense(value: boolean | undefined): void {
    if (value) {
      this._setHostAttribute(CHECKBOX_CONSTANTS.attributes.DENSE);
      this.setRootClass(CHECKBOX_CONSTANTS.classes.CHECKBOX_DENSE);
    } else {
      this._removeHostAttribute(CHECKBOX_CONSTANTS.attributes.DENSE);
      this.removeRootClass(CHECKBOX_CONSTANTS.classes.CHECKBOX_DENSE);
    }
  }

  public forceLayout(): void {
    this._rippleInstance.layout();
  }

  public isAttachedToDOM(): boolean {
    return Boolean(this._component.parentNode);
  }

  private _configureElements(): void {
    this._inputElement = this._component.querySelector(CHECKBOX_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._wrapperElement = getShadowElement(this._component, CHECKBOX_CONSTANTS.selectors.WRAPPER);
    this._rootElement = getShadowElement(this._component, CHECKBOX_CONSTANTS.selectors.ROOT);
    this._labelElement = this._component.querySelector(CHECKBOX_CONSTANTS.selectors.LABEL) as HTMLLabelElement;

    if (this._labelElement) {
      this._labelElement.setAttribute(CHECKBOX_CONSTANTS.attributes.SLOT, CHECKBOX_CONSTANTS.selectors.LABEL);
    }
    if (this._inputElement) {
      this._inputElement.setAttribute(CHECKBOX_CONSTANTS.attributes.SLOT, CHECKBOX_CONSTANTS.selectors.INPUT);
    }
    addClass(CHECKBOX_CONSTANTS.classes.UPGRADED, this._rootElement);
  }

  private _setHostAttribute(name: string, value = ''): void {
    this._component.setAttribute(name, value);
  }

  private _removeHostAttribute(name: string): void {
    this._component.removeAttribute(name);
  }

  public disconnect(): void {
    if (this._labelElement) {
      this._labelElement.removeAttribute(CHECKBOX_CONSTANTS.attributes.SLOT);
    }

    if (this._inputElement) {
      this._inputElement.removeAttribute(CHECKBOX_CONSTANTS.attributes.SLOT);
    }

    if (this._inputMutationObserver) {
      this._inputMutationObserver.disconnect();
    }

    this._detachInternalInputListeners();

    if (this._rippleInstance) {
      this._rippleInstance.destroy();
    }
  }

  public setRootClass(classes: string | string[]): void {
    if (this._rootElement) {
      addClass(classes, this._rootElement);
    }
  }

  public removeRootClass(classes: string | string[]): void {
    if (this._rootElement) {
      removeClass(classes, this._rootElement);
    }
  }

  public setWrapperClass(classes: string | string[]): void {
    if (this._wrapperElement) {
      addClass(classes, this._wrapperElement);
    }
  }

  public removeWrapperClass(classes: string | string[]): void {
    if (this._wrapperElement) {
      removeClass(classes, this._wrapperElement);
    }
  }

  public setNativeAttribute(qualifiedName: string, value: string): void {
    this._inputElement.setAttribute(qualifiedName, value);
  }

  public isDisabled(): boolean {
    return this._inputElement.disabled;
  }

  public isChecked(): boolean {
    return this._inputElement && this._inputElement.checked;
  }
  public isIndeterminate(): boolean {
    return this._inputElement && this._inputElement.indeterminate;
  }

  public removeNativeAttribute(qualifiedName: string): void {
    this._inputElement.removeAttribute(qualifiedName);
  }

  public installPropertyChangeHooks(callback: () => void): void {
    const nativeCb = this._inputElement;
    const cbProto = Object.getPrototypeOf(nativeCb);

    CHECKBOX_CONSTANTS.CB_PROTO_PROPS.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (!this._validDescriptor(desc)) {
        return;
      }

      // Type cast is needed for compatibility with Closure Compiler.
      const nativeGetter = (desc as { get: PropertyDescriptorGetter }).get;

      if (desc) {
        const nativeCbDesc = {
          configurable: desc.configurable,
          enumerable: desc.enumerable,
          get: nativeGetter,
          set: (state: boolean) => {
            desc.set?.call(nativeCb, state);
            callback();
          }
        };
        Object.defineProperty(nativeCb, controlState, nativeCbDesc);
      }
    });
  }

  public listen(qualifiedName: string, callback: () => void, onRoot = false): void {
    if (onRoot) {
      this._rootElement.addEventListener(qualifiedName, callback);
    } else {
      this._inputElement.addEventListener(qualifiedName, callback);
    }
  }

  public unlisten(qualifiedName: string, callback: () => void, onRoot = false): void {
    if (!this._inputElement) {
      return;
    }

    if (onRoot) {
      this._rootElement.removeEventListener(qualifiedName, callback);
    } else {
      this._inputElement.removeEventListener(qualifiedName, callback);
    }
  }

  public uninstallPropertyChangeHooks(): void {
    if (!this._inputElement) {
      return;
    }

    const nativeCb = this._inputElement;
    const cbProto = Object.getPrototypeOf(nativeCb);

    CHECKBOX_CONSTANTS.CB_PROTO_PROPS.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
      if (!this._validDescriptor(desc)) {
        return;
      }
      Object.defineProperty(nativeCb, controlState, desc);
    });
  }

  public setInputAttributeObserver(listener: (name: string, value: string) => void): void {
    this._inputMutationObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.attributeName) {
          listener(mutation.attributeName, this._inputElement.getAttribute(mutation.attributeName) as string);
        }
      }
    });
    this._inputMutationObserver.observe(this._inputElement, {
      attributes: true,
      attributeFilter: ['disabled', 'checked']
    });
  }

  private _validDescriptor(inputPropDesc: PropertyDescriptor | undefined): inputPropDesc is PropertyDescriptor {
    return !!inputPropDesc && typeof inputPropDesc.set === 'function';
  }

  private _attachInternalInputListeners(): void {
    this._inputFocusHandler = () => this._handleInputFocusListener();
    this._inputBlurHandler = () => this._handleInputBlurListener();
    this._inputElement.addEventListener('focus', this._inputFocusHandler);
    this._inputElement.addEventListener('blur', this._inputBlurHandler);
  }

  private _detachInternalInputListeners(): void {
    removeEventListener('focus', this._inputFocusHandler);
    removeEventListener('blur', this._inputBlurHandler);
  }

  private _handleInputFocusListener(): void {
    addClass(CHECKBOX_CONSTANTS.classes.FOCUSED, this._rootElement);
  }

  private _handleInputBlurListener(): void {
    removeClass(CHECKBOX_CONSTANTS.classes.FOCUSED, this._rootElement);
  }

  private _createRipple(): ForgeRipple {
    const adapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      deregisterInteractionHandler: (evtType, handler) => this._inputElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions),
      isSurfaceActive: () => this._inputElement.matches(':active'),
      isUnbounded: () => Boolean(this.unbounded),
      registerInteractionHandler: (evtType, handler) => this._inputElement.addEventListener(evtType, handler, { passive: true }),
      isSurfaceDisabled: () => this._inputElement.disabled,
      addClass: (className: string) => addClass(className, this._rootElement),
      removeClass: (className: string) => removeClass(className, this._rootElement),
      updateCssVariable: (varName: string, value: string | null) => this._rootElement.style.setProperty(varName, value)
    };
    const ripple = new ForgeRipple(this._rootElement, new ForgeRippleFoundation(adapter));
    return ripple;
  }
}
