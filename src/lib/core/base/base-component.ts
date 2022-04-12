import { ICustomElement } from '@tylertech/forge-core';

export interface IBaseComponent extends ICustomElement {}

/** Any Custom HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
export abstract class BaseComponent extends HTMLElement implements IBaseComponent {}
