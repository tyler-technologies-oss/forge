import { ForgeRippleCapableSurface, ForgeRipple, ForgeRippleAdapter, ForgeRippleFoundation } from '../../ripple';

export class TabRipple implements ForgeRippleCapableSurface {
  public rippleInstance: ForgeRipple | undefined;

  constructor(private _surfaceElement: HTMLElement, private _buttonElement: HTMLButtonElement) {
    const rippleAdapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      registerInteractionHandler: (evtType, handler) => this._buttonElement.addEventListener(evtType, handler, { passive: true }),
      deregisterInteractionHandler: (evtType, handler) => this._buttonElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions),
      isSurfaceActive: () => this._buttonElement.matches(':active'),
      isUnbounded: () => this.unbounded,
      addClass: (className: string) => this._surfaceElement.classList.add(className),
      removeClass: (className: string) => this._surfaceElement.classList.remove(className),
      updateCssVariable: (varName: string, value: string) => this._surfaceElement.style.setProperty(varName, value)
    };
    const rippleFoundation = new ForgeRippleFoundation(rippleAdapter);
    this.rippleInstance = new ForgeRipple(this._buttonElement, rippleFoundation);
  }

  public destroy(): void {
    this.rippleInstance?.destroy();
    this.rippleInstance = undefined;
  }

  public emulateFocus(): void {
    this.rippleInstance?.handleFocus();
  }

  public get root(): Element {
    return this._buttonElement;
  }

  public get unbounded(): boolean {
    return false;
  }

  public get disabled(): boolean {
    return this._buttonElement.disabled;
  }
}
