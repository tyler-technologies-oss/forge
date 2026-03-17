export * from './decorators/index.js';
export * from './component-utils.js';
export * from './constants.js';

export interface ICustomElement extends HTMLElement {
  initializedCallback?: () => void;
  connectedCallback?: () => void;
  disconnectedCallback?: () => void;
  attributeChangedCallback?: (name: string, oldValue: string, newValue: string) => void;
  adoptedCallback?: () => void;
}

export interface ICustomElementCore {
  initialize?: () => void;
  connect?: () => void;
  disconnect?: () => void;
}
