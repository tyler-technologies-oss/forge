import { addClass, removeClass } from '@tylertech/forge-core';
import { ForgeRippleCapableSurface, ForgeRipple, ForgeRippleAdapter, ForgeRippleFoundation } from '../ripple';

export class SliderHandleRipple implements ForgeRippleCapableSurface {
  private _rippleInstance: ForgeRipple | undefined;

  constructor(private _root: HTMLElement, private _inputElement: HTMLInputElement) {
    const adapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      registerInteractionHandler: (evtType, handler) => this._inputElement.addEventListener(evtType, handler, { passive: true }),
      deregisterInteractionHandler: (evtType, handler) => this._inputElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions),
      isSurfaceActive: () => this._inputElement.matches(':active'),
      isUnbounded: () => this.unbounded,
      isSurfaceDisabled: () => this.disabled,
      addClass: (className: string) => addClass(className, this._root),
      removeClass: (className: string) => removeClass(className, this._root),
      updateCssVariable: (varName: string, value: string | null) => this._root.style.setProperty(varName, value)
    };
    this._rippleInstance = new ForgeRipple(this._root, new ForgeRippleFoundation(adapter));
  }

  public destroy(): void {
    this._rippleInstance?.destroy();
    this._rippleInstance = undefined;
  }

  public emulateFocus(): void {
    this._rippleInstance?.handleFocus();
  }

  public emulateBlur(): void {
    this._rippleInstance?.handleBlur();
  }

  public get root(): Element {
    return this._root;
  }

  public get unbounded(): boolean {
    return true;
  }

  public get disabled(): boolean {
    return this._inputElement.disabled;
  }
}
