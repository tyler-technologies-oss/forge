export class InputAdapter {
  private _el: HTMLInputElement;
  private _attachCallback: (newEl: HTMLInputElement, oldEl?: HTMLInputElement) => void;

  public get el(): HTMLInputElement {
    return this._el;
  }

  constructor() {}

  public initialize(el: HTMLInputElement, attachCallback: (newEl: HTMLInputElement, oldEl?: HTMLInputElement) => void): void {
    this._attachCallback = attachCallback;
    this._attachCallback(el, this._el);
    this._el = el;
  }

  public attachInput(el: HTMLInputElement): void {
    this._attachCallback(el, this._el);
    this._el = el;
  }
}
