import { readoptStyles } from '@tylertech/forge-core';

export interface IBaseComponent extends HTMLElement {
  initializedCallback?(): void;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
  adoptedCallback(): void;
}

export abstract class BaseComponent extends HTMLElement implements IBaseComponent {
  public adoptedCallback(): void {
    // Attempt to readopt constructed CSSStyleSheet instances to the shadow root to ensure that
    // they are created against the new document because CSSStyleSheet instances cannot be shared
    // across documents.
    if (this.shadowRoot) {
      readoptStyles(this);
    }
  }
}
