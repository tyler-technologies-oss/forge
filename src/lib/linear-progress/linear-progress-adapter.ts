import { getShadowElement } from "@tylertech/forge-core";
import { ILinearProgressComponent } from "./linear-progress";
import { ILinearProgressResizeObserver, LinearProgressResizeObserverCallback, IWithLinearProgressResizeObserver, LINEAR_PROGRESS_CONSTANTS } from "./linear-progress-constants";

export interface ILinearProgressAdapter {
  addClass(name: string): void;
  attachResizeObserver(callback: LinearProgressResizeObserverCallback): ILinearProgressResizeObserver | null;
  forceLayout(): void;
  setBufferBarStyle(property: string, value: string): void;
  setPrimaryBarStyle(property: string, value: string): void;
  setStyle(property: string, value: string): void;
  getWidth(): number;
  hasClass(name: string): boolean;
  removeClass(name: string): void;
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
}

export class LinearProgressAdapter implements ILinearProgressAdapter {
  private _rootElement: HTMLElement;

  constructor(private _component: ILinearProgressComponent) {
    this._rootElement = getShadowElement(this._component, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
  }

  public addClass(name: string): void {
    this._rootElement.classList.add(name);
  }

  public forceLayout(): void {
    this._rootElement.getBoundingClientRect();
  }

  public setBufferBarStyle(property: string, value: string): void {
    const bufferBar = this._rootElement.querySelector<HTMLElement>(
        LINEAR_PROGRESS_CONSTANTS.selectors.BUFFER_BAR_SELECTOR);
    if (bufferBar) {
      bufferBar.style.setProperty(property, value);
    }
  }

  public setPrimaryBarStyle(property: string, value: string): void {
    const primaryBar = this._rootElement.querySelector<HTMLElement>(
        LINEAR_PROGRESS_CONSTANTS.selectors.PRIMARY_BAR_SELECTOR);
    if (primaryBar) {
      primaryBar.style.setProperty(property, value);
    }
  }

  public hasClass(name: string): boolean {
    return this._rootElement.classList.contains(name);
  }

  public removeAttribute(name: string): void {
    this._rootElement.removeAttribute(name);
  }

  public removeClass(name: string): void {
    this._rootElement.classList.remove(name);
  }

  public setAttribute(name: string, value: string): void {
    this._rootElement.setAttribute(name, value);
  }

  public setStyle(name: string, value: string): void {
    (this._rootElement as HTMLElement).style.setProperty(name, value);
  }

  public attachResizeObserver(callback: LinearProgressResizeObserverCallback): ILinearProgressResizeObserver | null {
    const RO = (window as unknown as IWithLinearProgressResizeObserver).ResizeObserver;
    if (RO) {
      const ro = new RO(callback);
      ro.observe(this._rootElement);
      return ro;
    }

    return null;
  }

  public getWidth(): number {
    return (this._rootElement as HTMLElement).offsetWidth;
  }
}
