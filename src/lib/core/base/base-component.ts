export interface IBaseComponent extends HTMLElement {}

/** Any Custom HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
export abstract class BaseComponent extends HTMLElement implements IBaseComponent {}
