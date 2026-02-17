interface IComponent extends HTMLElement {
  [CORE_PROPERTY_NAME]?: { [key: string]: any } | undefined;
}

export interface ICorePropertyOptions {
  /**
   * Allow Binding to a different naming convention in the core
   * @example coreProperty({name: '_foo'}) foo;
   */
  name?: string;

  /**
   * When false, skips calling the core property setter
   * @default true
   * @example coreProperty({set: true}) foo;
   */
  set?: boolean;

  /**
   * When false, skips calling the core property getter
   * @default true
   * @example coreProperty({get: true}) foo;
   */
  get?: boolean;
}

class CorePropertyOptions implements ICorePropertyOptions {
  public name: string;
  public get = true;
  public set = true;

  constructor(options?: ICorePropertyOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

const CORE_PROPERTY_NAME = '_core';

const corePropertyNotFoundMessage = (className: string, propertyName: string): string => `${className}'s core does not contain the property "${propertyName}"`;
const coreNotFoundMessage = (className: string): string => `${className} does not have a core`;

function runIfVerified(target: IComponent, propertyName: string, action: () => any | void): any {
  if (target[CORE_PROPERTY_NAME]) {
    if (propertyName in target[CORE_PROPERTY_NAME]) {
      return action();
    } else {
      throw new Error(corePropertyNotFoundMessage(target.localName, propertyName));
    }
  } else {
    throw new Error(coreNotFoundMessage(target.localName));
  }
}

/**
 * This decorator is intended to be used on properties of a class that extends `HTMLElement` to dynamically
 * create getters and setters that interact with the `_core` member of the class.
 *
 * @param options The core property options.
 * @returns
 */
export function coreProperty(options?: ICorePropertyOptions): any {
  const allOptions = new CorePropertyOptions(options);

  return (target: IComponent, name: string | symbol, descriptor: PropertyDescriptor | undefined) => {
    let defaultGet: (() => any) | undefined;
    let defaultSet: ((v: any) => void) | undefined;
    const propertyName: string | symbol = name;
    const corePropertyName = ((options && options.name) || name).toString();

    if (descriptor) {
      defaultGet = descriptor.get;
      defaultSet = descriptor.set;
      descriptor.configurable = true;
      descriptor.enumerable = true;
      if (allOptions.set) {
        descriptor.set = function (value: any) {
          return wireDescriptorSet(
            this,
            corePropertyName,
            attributes => {
              const desc = Object.getOwnPropertyDescriptor(target, corePropertyName) as PropertyDescriptor;
              desc.set = attributes.set;
              Reflect.defineProperty(target, propertyName, desc);
              attributes.set(value);
            },
            defaultSet
          );
        };
      }
      if (allOptions.get) {
        descriptor.get = function () {
          return wireDescriptorGet(
            this,
            corePropertyName,
            attributes => {
              const desc = Object.getOwnPropertyDescriptor(target, corePropertyName) as PropertyDescriptor;
              desc.get = attributes.get;
              Reflect.defineProperty(target, propertyName, desc);
              return attributes.get();
            },
            defaultGet
          );
        };
      }
    } else {
      if (allOptions.set || allOptions.get) {
        const attributes = { configurable: true, enumerable: true };

        const get = {
          get(this: IComponent) {
            return wireDescriptorGet(this, corePropertyName, attrs => {
              let setter: any;
              if (allOptions.set) {
                setter = { ...set };
              }
              Reflect.defineProperty(this, corePropertyName, { configurable: true, enumerable: true, ...attrs, ...setter });
              return attrs.get();
            });
          }
        };

        const set = {
          set(this: IComponent, value: any) {
            return wireDescriptorSet(this, corePropertyName, attrs => {
              let getter: any;
              if (allOptions.get) {
                getter = { ...get };
              }
              Reflect.defineProperty(this, corePropertyName, { configurable: true, enumerable: true, ...attrs, ...getter });
              attrs.set(value);
            });
          }
        };

        if (allOptions.get) {
          Object.assign(attributes, { ...get });
        }

        if (allOptions.set) {
          Object.assign(attributes, { ...set });
        }

        Reflect.defineProperty(target, propertyName, attributes);
      }
    }
  };
}

function setCoreProperty(target: IComponent, value: any, propertyName: string): void {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target[CORE_PROPERTY_NAME]![propertyName] = value;
}

function getCoreProperty(target: IComponent, propertyName: string): any {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return target[CORE_PROPERTY_NAME]![propertyName];
}

function wireDescriptorSet(
  target: IComponent,
  propertyName: string,
  wireAction: (attributes: { set: (value: any) => void }) => void | any,
  defaultSet?: (value: any) => void
): any {
  let attributes: { set: (value: any) => void };

  if (defaultSet) {
    attributes = {
      set(value: any) {
        defaultSet.call(target, value);
        setCoreProperty(target, value, propertyName);
      }
    };
  } else {
    attributes = {
      set(value: any) {
        setCoreProperty(target, value, propertyName);
      }
    };
  }

  return runIfVerified(target, propertyName, () => wireAction(attributes));
}

function wireDescriptorGet(target: IComponent, propertyName: string, wireAction: (attributes: { get: () => any }) => void | any, defaultGet?: () => void): any {
  let attributes: { get: () => any };

  if (defaultGet) {
    attributes = {
      get() {
        defaultGet.call(target);
        return getCoreProperty(target, propertyName);
      }
    };
  } else {
    attributes = {
      get() {
        return getCoreProperty(target, propertyName);
      }
    };
  }

  return runIfVerified(target, propertyName, () => wireAction(attributes));
}
