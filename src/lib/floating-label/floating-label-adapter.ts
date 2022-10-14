import { addClass, calcSizeUnattached, removeClass } from '@tylertech/forge-core';

export interface IFloatingLabelAdapter {
  addLabelClass(className: string): void;
  removeLabelClass(className: string): void;
  hasLabelClass(className: string): boolean;
  getWidth(): number;
  addLabelListener(type: string, listener: (evt: Event) => void): void;
  removeLabelListener(type: string, listener: (evt: Event) => void): void;
}

export class FloatingLabelAdapter implements IFloatingLabelAdapter {

  constructor(private _labelElement: HTMLLabelElement) {}

  public addLabelClass(className: string): void {
    addClass(className, this._labelElement);
  }

  public removeLabelClass(className: string): void {
    removeClass(className, this._labelElement);
  }

  public hasLabelClass(className: string): boolean {
    return this._labelElement.classList.contains(className);
  }

  public getWidth(): number {
    if (this._labelElement.offsetParent != null) {
      return this._labelElement.scrollWidth;
    }
    return calcSizeUnattached(this._labelElement).width;
  }

  public addLabelListener(type: string, listener: (evt: Event) => void): void {
    this._labelElement.addEventListener(type, listener);
  }

  public removeLabelListener(type: string, listener: (evt: Event) => void): void {
    this._labelElement.removeEventListener(type, listener);
  }
}
