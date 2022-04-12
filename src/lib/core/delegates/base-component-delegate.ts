import { removeElement } from '@tylertech/forge-core';

export type BaseComponentDelegateProps<T extends HTMLElement> = Partial<T>;

export interface IBaseComponentDelegateOptions {
  style?: Partial<CSSStyleDeclaration>;
  attributes?: { [key: string]: string } | Map<string, string>;
  parent?: HTMLElement;
}

export interface IBaseComponentDelegateConfig<T extends HTMLElement, K extends IBaseComponentDelegateOptions> {
  props?: BaseComponentDelegateProps<T>;
  options?: K;
}

export interface IBaseComponentDelegate<T> {
  element: T;
  destroy(): void;
  disconnect(): void;
}

export abstract class BaseComponentDelegate<T extends HTMLElement, K extends IBaseComponentDelegateOptions> implements IBaseComponentDelegate<T> {
  protected _element: T;

  public get element(): T {
    return this._element;
  }

  constructor(protected _config: IBaseComponentDelegateConfig<T, K> = {}) {
    this._initialize();
  }

  public destroy(): void {
    this.disconnect();
  }

  public disconnect(): void {
    if (!this._element.isConnected) {
      return;
    }
    removeElement(this._element);
  }

  private _initialize(): void {
    this._element = this._build();

    if (!this._element) {
      throw new Error(`Invalid component instance: ${this._element}`);
    }

    this._applyProps();
    this._applyStyle();
    this._applyAttrs();
    this._config.options?.parent?.append(this._element);
    this._elementReady?.();
  }

  private _applyProps(): void {
    if (this._config.props) {
      Object.assign(this._element, this._config.props);
    }
  }

  private _applyStyle(): void {
    if (this._config.options?.style) {
      Object.assign(this._element.style, this._config.options.style);
    }
  }

  private _applyAttrs(): void {
    if (this._config.options?.attributes) {
      if (this._config.options.attributes instanceof Map) {
        for (const [key, value] of Array.from(this._config.options.attributes)) {
          this._element.setAttribute(key, value);
        }
      } else {
        const keys = Object.keys(this._config.options.attributes);
        for (const key of keys) {
          this._element?.setAttribute(key, this._config.options.attributes[key]);
        }
      }
    }
  }

  protected abstract _build(): T;
  protected _elementReady?(): void;
}
