import { emitEvent, toggleAttribute } from '@tylertech/forge-core';
import { IBaseComponent } from './base-component';

export interface IBaseAdapter<T extends HTMLElement = HTMLElement> {
  readonly hostElement: T;
  readonly isConnected: boolean;
  removeHostAttribute(name: string): void;
  getHostAttribute(name: string): string | null;
  setHostAttribute(name: string, value?: string): void;
  toggleHostAttribute(name: string, hasAttribute: boolean, value?: string): void;
  emitHostEvent(type: string, data?: any, bubble?: boolean, cancelable?: boolean): boolean;
  addHostListener(event: string, callback: (event: Event) => void, options?: boolean | AddEventListenerOptions): void;
  removeHostListener(event: string, callback: (event: Event) => void): void;
  addWindowListener(event: string, callback: (event: Event) => void, options?: boolean | AddEventListenerOptions): void;
  removeWindowListener(event: string, callback: (event: Event) => void, options?: boolean | EventListenerOptions): void;
  addDocumentListener(event: string, callback: (event: Event) => void, options?: boolean | AddEventListenerOptions): void;
  removeDocumentListener(event: string, callback: (event: Event) => void, options?: boolean | EventListenerOptions): void;
  getScreenWidth(): number;
  setBodyAttribute(name: string, value: string): void;
  removeBodyAttribute(name: string): void;
  redispatchEvent(event: Event, options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean }): boolean;
}

export class BaseAdapter<T extends IBaseComponent> implements IBaseAdapter<T> {
  constructor(protected _component: T) {}

  public get hostElement(): T {
    return this._component;
  }

  public getHostAttribute(name: string): string | null {
    return this._component.getAttribute(name);
  }

  public setHostAttribute(name: string, value = ''): void {
    this._component.setAttribute(name, value);
  }

  public removeHostAttribute(name: string): void {
    this._component.removeAttribute(name);
  }

  public toggleHostAttribute(name: string, hasAttribute: boolean, value?: string): void {
    toggleAttribute(this._component, hasAttribute, name, value);
  }

  public emitHostEvent(type: string, data: any = null, bubble = true, cancelable?: boolean): boolean {
    return emitEvent(this._component, type, data, bubble, cancelable);
  }

  public addHostListener(event: string, callback: (event: Event) => void, options?: boolean | AddEventListenerOptions): void {
    this._component.addEventListener(event, callback, options);
  }

  public removeHostListener(event: string, callback: (event: Event) => void): void {
    this._component.removeEventListener(event, callback);
  }

  public addWindowListener(event: string, callback: (event: Event) => void, options?: boolean | AddEventListenerOptions): void {
    window.addEventListener(event, callback, options);
  }

  public removeWindowListener(event: string, callback: (event: Event) => void, options?: boolean | EventListenerOptions): void {
    window.removeEventListener(event, callback, options);
  }

  public addDocumentListener(event: string, callback: (event: Event) => void, options?: boolean | AddEventListenerOptions): void {
    document.addEventListener(event, callback, options);
  }

  public removeDocumentListener(event: string, callback: (event: Event) => void, options?: boolean | EventListenerOptions): void {
    document.removeEventListener(event, callback, options);
  }

  public getScreenWidth(): number {
    return window.innerWidth;
  }

  public setBodyAttribute(name: string, value: string): void {
    document.body.setAttribute(name, value);
  }

  public removeBodyAttribute(name: string): void {
    document.body.removeAttribute(name);
  }

  public get isConnected(): boolean {
    return this._component.isConnected;
  }

  public redispatchEvent(event: CustomEvent, options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean }): boolean {
    const isFromLightDom = !((event.target as HTMLElement)?.getRootNode() instanceof ShadowRoot);
    if (event.bubbles && (event.composed || isFromLightDom)) {
      event.stopPropagation();
    }
    
    const eventCopy = {
      ...event,
      detail: event.detail ?? null,
      bubbles: options?.bubbles ?? event.bubbles,
      cancelable: options?.cancelable ?? event.cancelable,
      composed: options?.composed ?? event.composed
    };
    const newEvent = Reflect.construct(event.constructor, [event.type, eventCopy]);
    const isCancelled = !this._component.dispatchEvent(newEvent);
    if (isCancelled) {
      event.preventDefault();
    }
    return !isCancelled;
  }
}
