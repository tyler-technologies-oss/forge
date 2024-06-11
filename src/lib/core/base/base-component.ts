export interface IBaseComponent extends HTMLElement {
  initializedCallback?(): void;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
  adoptedCallback?(): void;
}

export abstract class BaseComponent extends HTMLElement implements IBaseComponent {}
