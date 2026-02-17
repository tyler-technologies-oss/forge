/**
 * This method will find a value in a JavaScript object using a string path.
 * Example:
 *   var obj = { one: 1, two: { twoOne: 21, twoTwo: 22, twoThree: [{ threeOne: 31 }] } };
 *   getPropertyValue(obj, 'two.twoOne'); // 21
 *   getPropertyValue(obj, 'one'); // 1
 *   getPropertyValue(obj, 'two.twoThree[0].threeOne'); // 31
 *
 * Inspired by "Alnitak"'s answer on stack overflow:
 * http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
 */
export function getPropertyValue(obj: any, inPath: string): any {
  let path = inPath.replace(/\[(\w+)\]/g, '.$1'); // Convert indexes to properties
  path = path.replace(/^\./, ''); // Strip a leading dot
  const ary = path.split('.');

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < ary.length; ++i) {
    const property = ary[i];
    if (obj && typeof obj === 'object' && property in obj) {
      obj = obj[property];
    } else {
      obj = '';
      break;
    }
  }

  return obj;
}

/**
 * A wrapper around Array.prototype.find to allow for passing in a predicate.
 * @param {any[]} ary The array to search.
 * @param {any} predicate The predicate.
 */
export function findWhere(ary: any[], predicate: any): any {
  return ary.find(item => matchesPredicate(item, predicate));
}

/**
 * A wrapper around Array.prototype.findIndex to allow for passing in a predicate.
 * @param {any[]} ary The array to search.
 * @param {any} predicate The predicate.
 */
export function findIndexWhere(ary: any[], predicate: any): any {
  return ary.findIndex(item => matchesPredicate(item, predicate));
}

/**
 * This function will create a predicate in the form of "{ [property name]: [value] }" where the square brackets are
 * replaced with the actual property name and value for the data.
 */
export function createPredicate(key: string[], data: any): any {
  if (!key || !key.length) {
    throw new Error('Invalid key');
  }

  const predicate: any = {};

  for (const propertyName of key) {
    if (Object.prototype.hasOwnProperty.call(data, propertyName)) {
      predicate[propertyName] = data[propertyName];
    } else {
      throw new Error(`Invalid key. The property "${propertyName}" does not exist in the data.`);
    }
  }

  return predicate;
}

/**
 * Determines if an object matches a predicate.
 */
export function matchesPredicate(obj: any, predicate: any): boolean {
  return Object.keys(predicate).every(key => obj[key] === predicate[key]);
}

/**
 * Decorates an object by overriding its property descriptor to add a listener invocation in its dynamically created setter.
 * Note: This does retain existing functionality, and will only work with configurable properties.
 * @param context The `this` context to use for the listener.
 * @param obj The object to decorate.
 * @param prop The property to override.
 * @param listener The listener function that will be executed when the property values changes.
 * @returns A function that can be invoked to return the property to its original property descriptor.
 */
export function listenOwnProperty(context: any, obj: any, prop: string, listener: (value: any) => void): () => void {
  let propObj = obj;
  if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
    propObj = Object.getPrototypeOf(obj);
  }
  const originalValueDescriptor = Object.getOwnPropertyDescriptor(propObj, prop) as PropertyDescriptor;

  if (!originalValueDescriptor) {
    throw new Error(`Property ${prop} does not exist.`);
  }

  Object.defineProperty(obj, prop, {
    configurable: true,
    get() {
      return originalValueDescriptor.get ? originalValueDescriptor.get.call(this) : undefined;
    },
    set(value: any) {
      if (originalValueDescriptor.set) {
        originalValueDescriptor.set.call(this, value);
      }
      listener.call(context, value);
    }
  });

  return () => Object.defineProperty(obj, prop, originalValueDescriptor);
}

/**
 * Recursively searches for a value within an object, optionally limited to keys names present in the limitProps string array.
 * @param value The value to search for.
 * @param target The object to search through.
 * @param limitProps An optional string array of property name to limit the search to.
 * @returns A boolean value indicating if the value exists within the object (limited to limitProps keys if given) regardless of depth.
 */
export function deepSearchByValuePredicate(value: string, target: { [key: string]: any }, limitProps: string[] = []): boolean {
  value = value.toLowerCase();
  let result = false;
  for (const k in target) {
    if (limitProps?.length > 0) {
      const found = Object.keys(target).filter(element => limitProps.includes(element));
      if (found.includes(k)) {
        const filteredObj = Object.fromEntries(Object.entries(target).filter(([key]) => limitProps.includes(key)));
        result = result ? result : deepValueExistsPredicate(value, Object.values(filteredObj));
      }
      if (target[k] && typeof target[k] === 'object') {
        result = result ? result : deepSearchByValuePredicate(value, target[k], limitProps);
      }
    } else {
      if (target[k] && (typeof target[k] === 'string' || typeof target[k] === 'number' || Array.isArray(target[k]))) {
        result = result ? result : deepValueExistsPredicate(value, target[k]);
      }
      if (target[k] && typeof target[k] === 'object') {
        result = result ? result : deepSearchByValuePredicate(value, target[k], limitProps);
      }
    }
  }
  return result;
}

/**
 * Tests for a value present in a number, string or arrays of either type.
 * @param value The value to search for.
 * @param target The string/number/array to search against.
 * @returns A boolean value indicating if the value exists within the target.
 */
export function deepValueExistsPredicate(value: string, target: string | number | Array<string> | Array<number>): boolean {
  value = value.toLocaleLowerCase();
  if (typeof target === 'string') {
    return target.toLowerCase().includes(value);
  }
  if (typeof target === 'number') {
    return target.toString().includes(value);
  }
  if (Array.isArray(target)) {
    return target.some(y => deepValueExistsPredicate(value, y));
  }
  return false;
}
