import { defineCustomElement } from '../component-utils.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY, CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY } from '../constants.js';

declare global {
  interface Window {
    __forgeFlags__autoDefine: any;
    __forgeFlags__useConstructableStyleSheets: boolean | undefined;
  }

  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }

  interface CSSStyleSheet {
    replaceSync(cssText: string): void;
  }
}

export interface ICustomElementConfig {
  /** The name of the custom element tag. */
  name: string;
  /** Components that are dependencies of this component */
  dependencies?: any[];
  /** Configures if the element will be automatically defined in the custom element registry. Default is `true` */
  define?: boolean;
}

/**
 * This decorator is intended to be used on classes that extend `HTMLElement` to
 * extend/modify the behavior of a custom element.
 * @param {ICustomElementConfig} [config={}] The custom element configuration.
 */
export function customElement({ name, dependencies, define = true }: ICustomElementConfig): any {
  return (ctor: HTMLElement) => {
    patchConnectedCallback(ctor);

    if (name) {
      ctor[CUSTOM_ELEMENT_NAME_PROPERTY] = name;
    }

    if (dependencies && dependencies.length) {
      ctor[CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = dependencies;
    }

    if (window.__forgeFlags__autoDefine !== false && define) {
      defineCustomElement(ctor);
    }
  };
}

function patchConnectedCallback(ctor: any): void {
  const originalConnectedCallback = ctor.prototype.connectedCallback;
  ctor.prototype.connectedCallback = function () {
    if (!this.isConnected) {
      return;
    }
    if (!this._isInitialized) {
      tryUpgradeOwnProperties(this);
      if (typeof this.initializedCallback === 'function') {
        this.initializedCallback.apply(this);
      }
      this._isInitialized = true;
    }
    if (typeof originalConnectedCallback === 'function') {
      originalConnectedCallback.apply(this);
    }
  };
}

function tryUpgradeOwnProperties(instance: any): void {
  // We ignore our properties that start with an underscore as those are considered "internal"
  // and are not auto-upgraded for us
  const ownProperties = Object.getOwnPropertyNames(instance).filter(p => !p.startsWith('_'));
  for (const property of ownProperties) {
    const value = instance[property];
    delete instance[property];
    instance[property] = value;
  }
}
