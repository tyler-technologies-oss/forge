import { GlobalConfiguration } from '../configuration/global-configuration.js';
import { IBaseAdapter } from '../base/base-adapter.js';

interface CoreWithAdapter {
  _adapter?: IBaseAdapter;
}

/**
 * A decorator that automatically applies global configuration values to a property.
 *
 * When the property is first accessed, the decorator will look up the tag name and property name
 * in the global configuration object and set the initial value from it. If not found in the
 * global configuration, it will use the provided default value.
 *
 * Works with both HTMLElement instances (Lit components) and Core classes (legacy pattern).
 * For Core classes, requires an `_adapter` property that provides access to the host element.
 *
 * @param defaultValue The default value to use if no global configuration is found
 * @throws {TypeError} If the default value type doesn't match the property type
 *
 * @example
 * ```typescript
 * // On a Lit component
 * @globalConfig(false)
 * public someProperty: boolean;
 *
 * // On a Core class
 * @globalConfig('outlined')
 * private _variant!: FieldVariant;
 * ```
 */
export function globalConfig<T>(defaultValue: T): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    if (typeof propertyKey === 'symbol') {
      throw new TypeError('globalConfig decorator cannot be used on symbol properties');
    }

    const privateKey = Symbol(`__globalConfig_${propertyKey}`);

    Object.defineProperty(target, propertyKey, {
      get(this: (HTMLElement | CoreWithAdapter) & Record<symbol, any>): T {
        // If we haven't initialized yet, check global config
        if (!(privateKey in this)) {
          let initialValue = defaultValue;

          // Get tag name based on whether this is an HTMLElement or a Core class
          let tagName: string | undefined;

          if (this instanceof HTMLElement) {
            // Direct HTMLElement access (Lit components)
            tagName = this.localName || this.tagName?.toLowerCase();
          } else if ('_adapter' in this && this._adapter?.hostElement) {
            // Core class with adapter (legacy pattern)
            const hostElement = this._adapter.hostElement;
            tagName = hostElement.localName || hostElement.tagName?.toLowerCase();
          }

          // Remove leading underscore from property key for lookup (private properties like _variant -> variant)
          const lookupKey = propertyKey.replace(/^_/, '');

          if (tagName) {
            const entry = GlobalConfiguration.get(tagName as keyof HTMLElementTagNameMap);

            if (entry?.has(lookupKey as any)) {
              const configValue = entry.valueOf(lookupKey as any);
              if (configValue !== undefined) {
                // Type check: ensure the global config value matches the default value type
                const defaultType = typeof defaultValue;
                const configType = typeof configValue;

                if (defaultType !== configType && defaultValue !== null && configValue !== null) {
                  throw new TypeError(
                    `Type mismatch for property "${propertyKey}" on ${tagName}: ` + `expected ${defaultType} but global configuration provided ${configType}`
                  );
                }

                initialValue = configValue as T;
              }
            }
          }

          this[privateKey] = initialValue;
        }

        return this[privateKey];
      },
      set(this: Record<symbol, any>, value: T): void {
        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true
    });
  };
}
