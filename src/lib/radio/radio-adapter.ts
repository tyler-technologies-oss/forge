import { addClass, getShadowElement, removeClass, getActiveElement } from '@tylertech/forge-core';
import { IRadioComponent } from './radio';
import { RADIO_CONSTANTS } from './radio-constants';
import { ForgeRipple, ForgeRippleAdapter, ForgeRippleCapableSurface, ForgeRippleFoundation } from '../ripple';
import { userInteractionListener } from '../core/utils';

export interface IRadioAdapter {
  connect(): void;
  deferRippleInitialization(): Promise<void>;
  destroyRipple(): void;
  setHostAttribute(name: string, value?: string): void;
  removeHostAttribute(name: string): void;
  addRootClass(className: string): void;
  removeRootClass(className: string): void;
  addContainerClass(className: string): void;
  removeContainerClass(className: string): void;
  syncCheckedStateWithInput(): void;
  syncFocusedStateWithInput(): void;
  syncDisabledStateWithInput(): void;
  addInputEventListener(event: string, callback: (event: Event) => void): void;
  removeInputEventListener(event: string, callback: (event: Event) => void): void;
  addInputDisabledAttributeChangeListener(callback: () => void): void;
  removeInputDisabledAttributeChangeListener(): void;
  extendNativeInputSetter(callback: () => void): void;
  revertNativeInputSetter(): void;
  syncRadiogroupCheckStyles(): void;
}

export class RadioAdapter implements IRadioAdapter, ForgeRippleCapableSurface {
  private _rootElement: HTMLElement;
  private _containerElement: HTMLElement;
  private _nativeInputElement: HTMLInputElement | null;
  private _inputAttributeMutationObserver?: MutationObserver;
  private _rippleInstance: ForgeRipple | undefined;

  constructor(private _component: IRadioComponent) {
    this._rootElement = getShadowElement(this._component, RADIO_CONSTANTS.selectors.RADIO);
    this._containerElement = getShadowElement(this._component, RADIO_CONSTANTS.selectors.WRAPPER);
  }

  // ForgeRippleCapableSurface
  public get root(): Element {
    return this._rootElement;
  }

  public get unbounded(): boolean | undefined {
    return true;
  }

  public get disabled(): boolean | undefined {
    return this._isDisabled();
  }

  public connect(): void {
    const labelElement = this._component.querySelector(RADIO_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
    if (labelElement) {
      labelElement.setAttribute(RADIO_CONSTANTS.attributes.SLOT, RADIO_CONSTANTS.selectors.LABEL);
    }
  }

  public async deferRippleInitialization(): Promise<void> {
    const type = await userInteractionListener(this._rootElement);
    if (!this._rippleInstance) {
      this._rippleInstance = this._createRipple();
      if (type === 'focusin') {
        this._rippleInstance.handleFocus();
      }
    }
  }

  public destroyRipple(): void {
    this._rippleInstance?.destroy();
    this._rippleInstance = undefined;
  }

  public setHostAttribute(name: string, value = ''): void {
    this._component.setAttribute(name, value);
  }

  public removeHostAttribute(name: string): void {
    this._component.removeAttribute(name);
  }

  public addRootClass(className: string): void {
    this._rootElement.classList.add(className);
  }

  public removeRootClass(className: string): void {
    this._rootElement.classList.remove(className);
  }

  public addContainerClass(className: string): void {
    this._containerElement.classList.add(className);
  }

  public removeContainerClass(className: string): void {
    this._containerElement.classList.remove(className);
  }

  public syncDisabledStateWithInput(): void {
    if (this.inputDisabled) {
      this.addRootClass(RADIO_CONSTANTS.classes.DISABLED);
      this.removeRootClass(RADIO_CONSTANTS.classes.ENABLED);
      this.addContainerClass(RADIO_CONSTANTS.classes.WRAPPER_DISABLED);
    } else {
      this.addRootClass(RADIO_CONSTANTS.classes.ENABLED);
      this.removeRootClass(RADIO_CONSTANTS.classes.DISABLED);
      this.removeContainerClass(RADIO_CONSTANTS.classes.WRAPPER_DISABLED);
    }
  }

  public syncFocusedStateWithInput(): void {
    if (getActiveElement() === this._inputElement) {
      this.addRootClass(RADIO_CONSTANTS.classes.FOCUSED);
    } else {
      this.removeRootClass(RADIO_CONSTANTS.classes.FOCUSED);
    }
  }

  public syncCheckedStateWithInput(): void {
    if (this.inputChecked) {
      this.addRootClass(RADIO_CONSTANTS.classes.CHECKED);
    } else {
      this.removeRootClass(RADIO_CONSTANTS.classes.CHECKED);
    }
  }

  public addInputEventListener(event: string, callback: (event: Event) => void): void {
    if (!this._inputElement) {
      return;
    }

    this._inputElement.addEventListener(event, callback);
  }

  public removeInputEventListener(event: string, callback: (event: Event) => void): void {
    if (!this._inputElement) {
      return;
    }

    this._inputElement.removeEventListener(event, callback);
  }

  public addInputDisabledAttributeChangeListener(callback: () => void): void {
    this._setupInputDisabledAttributeMutationObserver(callback);
  }

  public removeInputDisabledAttributeChangeListener(): void {
    this._cleanupInputDisabledAttributeMutationObserver();
  }

  // Get the collection of all forge-radios under the containing radiogroup ancestor.
  public getRadiosFromContainingRadiogroup(): NodeListOf<IRadioComponent> | null {
    const radioGroup = this._getContainingRadioGroup(this._component);
    if (radioGroup == null) {
      return null;
    }

    return radioGroup.querySelectorAll(RADIO_CONSTANTS.elementName);
  }

  public syncRadiogroupCheckStyles(): void {
    const radios = this.getRadiosFromContainingRadiogroup();
    if (radios) {
      radios.forEach(x => x.syncCheckedState());
    }
  }

  public extendNativeInputSetter(callback: () => void): void {
    if (!this._inputElement) {
      return;
    }

    const nativeInput = this._inputElement;
    const inputProto = Object.getPrototypeOf(nativeInput);
    RADIO_CONSTANTS.inputProperties.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(inputProto, controlState) as PropertyDescriptor;
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (!this._validPropertyDescriptor(desc)) {
        return;
      }

      if (desc) {
        const nativeInputDesc = {
          configurable: desc.configurable,
          enumerable: desc.enumerable,
          get: desc.get,
          set: (state: boolean) => {
            desc.set?.call(nativeInput, state);
            callback();
          }
        };
        Object.defineProperty(nativeInput, controlState, nativeInputDesc);
      }
    });
  }

  public revertNativeInputSetter(): void {
    if (!this._inputElement) {
      return;
    }

    const nativeInput = this._inputElement;
    const inputProto = Object.getPrototypeOf(nativeInput);
    RADIO_CONSTANTS.inputProperties.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(inputProto, controlState) as PropertyDescriptor;
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (!this._validPropertyDescriptor(desc)) {
        return;
      }
      Object.defineProperty(nativeInput, controlState, desc);
    });
  }

  private _validPropertyDescriptor(inputPropDesc: PropertyDescriptor | undefined): boolean {
    return !!inputPropDesc && typeof inputPropDesc.set === 'function';
  }

  // Recursively crawl up the node tree looking for the containing radiogroup ancestor element.
  private _getContainingRadioGroup(element: HTMLElement): HTMLElement | null {
    if (!element || !element.parentElement) {
      throw new Error('Unable to locate ancestor element with role="radiogroup". When using radios, a parent with this attribute must be applied.');
    }

    const parentElement = element.parentElement;
    const roleValue = parentElement.getAttribute(RADIO_CONSTANTS.attributes.ROLE);
    if (!!roleValue && roleValue.toLocaleLowerCase() === RADIO_CONSTANTS.attributes.RADIOGROUP_ROLE.toLocaleLowerCase()) {
      return parentElement;
    }

    return this._getContainingRadioGroup(parentElement);
  }

  private _setupInputDisabledAttributeMutationObserver(callback: () => void): void {
    if (!this._inputElement) {
      return;
    }

    this._cleanupInputDisabledAttributeMutationObserver();
    const mutationCallback = (mutationRecords: MutationRecord[]): void => this._inputDisabledAttributeMutationCallback(mutationRecords, callback);
    this._inputAttributeMutationObserver = new MutationObserver(mutationCallback);
    const mutationOptions: MutationObserverInit = {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['disabled']
    };
    this._inputAttributeMutationObserver.observe(this._inputElement, mutationOptions);
  }

  private _cleanupInputDisabledAttributeMutationObserver(): void {
    if (this._inputAttributeMutationObserver) {
      this._inputAttributeMutationObserver.disconnect();
      delete this._inputAttributeMutationObserver;
    }
  }

  private _inputDisabledAttributeMutationCallback(mutationRecords: MutationRecord[], callback: () => void): void {
    for (const mutationRecord of mutationRecords) {
      // Skip:
      //   - Non-attribute mutations.
      //   - Mutations without an attribute name.
      //   - Mutations without a matching attribute name.
      //   - Mutations that did not change the attribute value.
      if (mutationRecord.type !== 'attributes'
        || !mutationRecord.attributeName
        || mutationRecord.attributeName !== 'disabled'
        || mutationRecord.target[mutationRecord.attributeName] === mutationRecord.oldValue) {
        continue;
      }

      callback();
    }
  }

  public get inputDisabled(): boolean {
    if (!this._inputElement) {
      return false;
    }

    return this._inputElement.disabled;
  }

  public get inputChecked(): boolean {
    if (!this._inputElement) {
      return false;
    }

    return this._inputElement.checked;
  }

  private get _inputElement(): HTMLInputElement | null {
    if (!this._nativeInputElement) {
      this._nativeInputElement = this._component.querySelector<HTMLInputElement>(RADIO_CONSTANTS.selectors.RADIO_INPUT);
    }

    return this._nativeInputElement;
  }

  private _isDisabled(): boolean {
    return this._inputElement ? this._inputElement.disabled : false;
  }

  private _createRipple(): ForgeRipple {
    const adapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      deregisterInteractionHandler: (evtType, handler) => {
        if (this._inputElement) {
          this._inputElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions);
        }
      },
      isSurfaceActive: () => this._inputElement ? this._inputElement.matches(':active') : false,
      isUnbounded: () => Boolean(this.unbounded),
      registerInteractionHandler: (evtType, handler) => {
        if (this._inputElement) {
          this._inputElement.addEventListener(evtType, handler, { passive: true });
        }
      },
      isSurfaceDisabled: () => this._inputElement ? this._inputElement.disabled : false,
      addClass: (className: string) => addClass(className, this._rootElement),
      removeClass: (className: string) => removeClass(className, this._rootElement),
      updateCssVariable: (varName: string, value: string | null) => this._rootElement.style.setProperty(varName, value)
    };
    return new ForgeRipple(this._rootElement, new ForgeRippleFoundation(adapter));
  }
}
