import { addClass, getShadowElement, removeClass, toggleAttribute } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IAppBarSearchComponent } from './app-bar-search';
import { APP_BAR_SEARCH_CONSTANTS } from './app-bar-search-constants';

export interface IAppBarSearchAdapter extends IBaseAdapter {
  initialize(): void;
  addInputEventListener(type: string, listener: (evt: Event) => void): void;
  removeInputEventListener(type: string, listener: (evt: Event) => void): void;
  setInputProperty<T extends keyof HTMLInputElement>(name: T, value: HTMLInputElement[T]): void;
  getInputProperty<T extends keyof HTMLInputElement>(name: T): HTMLInputElement[T];
}

export class AppBarSearchAdapter extends BaseAdapter<IAppBarSearchComponent> implements IAppBarSearchAdapter {
  private _rootElement: HTMLElement;
  private _inputElement: HTMLInputElement;

  constructor(component: IAppBarSearchComponent) {
    super(component);
    this._rootElement = getShadowElement(component, APP_BAR_SEARCH_CONSTANTS.selectors.ROOT);
  }

  public initialize(): void {
    const inputElement = this._component.querySelector(APP_BAR_SEARCH_CONSTANTS.selectors.INPUT);
    if (inputElement) {
      this._inputElement = inputElement as HTMLInputElement;

      if (!this._inputElement.hasAttribute('slot')) {
        this._inputElement.slot = 'input';
      }

      const focusIndicator = document.createElement('forge-focus-indicator');
      focusIndicator.targetElement = this._inputElement;
      this._rootElement.appendChild(focusIndicator);
    }
  }

  public addInputEventListener(type: string, listener: (evt: Event) => void): void {
    this._inputElement?.addEventListener(type, listener);
  }

  public removeInputEventListener(type: string, listener: (evt: Event) => void): void {
    this._inputElement?.removeEventListener(type, listener);
  }

  public setInputProperty<T extends keyof HTMLInputElement>(name: T, value: HTMLInputElement[T]): void {
    if (this._inputElement) {
      this._inputElement[name] = value;
    }
  }

  public getInputProperty<T extends keyof HTMLInputElement>(name: T): HTMLInputElement[T] {
    return this._inputElement?.[name];
  }
}
