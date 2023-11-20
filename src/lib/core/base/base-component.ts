export interface IBaseComponent extends HTMLElement {}

export abstract class BaseComponent extends HTMLElement implements IBaseComponent {
  // We provide default implementation of these methods so that they can be extended by other
  // classes.
  public connectedCallback(): void {}
  public attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {}
}
