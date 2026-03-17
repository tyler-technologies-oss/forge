/** Generates random characters. Defaults to a length of 5. */
export function randomChars(length = 5): string {
  const skip = 2; // Skip the first two chars which are always "0."
  return Math.random()
    .toString(36)
    .substring(skip, skip + length);
}

/**
 * Checks if an object is undefined or null.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isDefined(obj: any): boolean {
  return typeof obj !== 'undefined' && obj !== null;
}

/**
 * Checks if an object is a string.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isString(obj: any): obj is string {
  return typeof obj === 'string';
}

/**
 * Checks if an object is a boolean.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isBoolean(obj: any): obj is boolean {
  return typeof obj === 'boolean';
}

/**
 * Checks if an object is a number.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isNumber(obj: any): obj is number {
  return typeof obj === 'number';
}

/** Determines if the provided string value can be parsed into a valid numeric value. */
export function isNumeric(str: string): boolean {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(str as any) && !isNaN(parseFloat(str));
}

/**
 * Checks if an object is a date.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isDate(obj: any): obj is Date {
  return obj instanceof Date;
}

/**
 * Checks if an object is a date and is a valid date.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isValidDate(obj: any): obj is Date {
  if (!isDate(obj)) {
    return false;
  }

  return !isNaN((obj as Date).getTime());
}

/**
 * Checks if an object is a function.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isFunction(obj: any): boolean {
  return typeof obj === 'function';
}

/**
 * Checks if an object is an array.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isArray(obj: any): boolean {
  return obj instanceof Array;
}

/**
 * Checks if an object is an object.
 * @param {object} obj The object to test.
 * @returns {boolean}
 */
export function isObject(obj: any): boolean {
  return obj instanceof Object;
}

/**
 * Coerces a string to a boolean.
 * @param {string} value The value to convert.
 * @returns {boolean}
 */
export function coerceBoolean(value: string): boolean {
  return value != null && '' + value !== 'false';
}

/**
 * Coerces a string to a number.
 * @param {string} value The value to convert.
 * @returns {number}
 */
export function coerceNumber(value: string): number {
  return +value;
}

/** Coerces a string representation of an array of numbers, for example: `"[1,2,3]"`, to an array instance. */
export function coerceNumberArray(strOrNumOrArray: string | Array<string | number>): number[] {
  if (!strOrNumOrArray) {
    return [];
  }

  if (typeof strOrNumOrArray === 'string') {
    return strOrNumOrArray
      .replace(/ |\[|]|"/g, '')
      .split(',')
      .map(n => Number(n));
  } else if (typeof strOrNumOrArray === 'number') {
    return [strOrNumOrArray];
  } else {
    return strOrNumOrArray.map(n => Number(n));
  }
}

/**
 * Compares two objects for deep equality.
 * @param a
 * @param b
 */
export function isDeepEqual(a: any, b: any): boolean {
  return a === b || (typeof a === 'object' && typeof b === 'object' && JSON.stringify(a) === JSON.stringify(b));
}

/**
 * Debounce method.
 * @param {function} func The function to call.
 * @param {number} wait The amount of time (milliseconds) to wait.
 * @param {boolean} [immediate=false] Should the callback be executed once immeadiately.
 */
export function debounce(func: any, wait: number, immediate: boolean = false): () => any {
  let context: any;
  let args: any;
  let result: any;
  let timeout: any;
  let timestamp = 0;

  const later: () => void = () => {
    const last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function (this: any, ...restArgs: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = restArgs;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * Throttle method.
 * @param {function} func The function to call.
 * @param {number} wait The amount of time (milliseconds) to wait.
 * @param {object=} options An options object with the following properties
 *   <ul>
 *     <li>**leading**: Should the callback be executed once immediately.</li>
 *     <li>**trailing**: Should the callback be executed once after the throttle completes.</li>
 *   </ul>
 */
export function throttle(func: any, wait: number, options?: any): () => any {
  let context: any;
  let args: any;
  let result: any;
  let timeout: any;
  let timestamp = 0;

  options = options || {};

  const later: () => void = () => {
    timestamp = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  return function (this: any, ...restArgs: any[]) {
    const now = Date.now();
    if (!timestamp && options.leading === false) {
      timestamp = now;
    }
    const remaining = wait - (now - timestamp);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = restArgs;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timestamp = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}

/**
 * A minification-safe nameof function for retrieving the name of a property or method at runtime.
 * Note: this function only works with properties/methods on an object. To get the name of a variable,
 *       you will need to wrap it within an object.
 * @param {Function} fn A function the returns a property or method that will be stringified.
 */
export function nameof(fn: () => any): string {
  const fnString = fn.toString();

  // fnString should look something like: function () { return _this.canActivate; }
  // When minified fnString will look something like: function(){return a.canActivate}
  const nameofRegExp = /[^.]\.([^;}\s]+)(?:[;}\s])/; // Get everything after first dot and before the end of the statement
  const match: RegExpExecArray | null = nameofRegExp.exec(fnString);

  if (!match) {
    throw new Error(`Could not parse nameof string: ${fnString}`);
  }

  return match[1];
}

/*
 * Watches for user events to detect if browser is idle.
 *
 * @param callback The function to call when the browser becomes idle.
 * @param timespan The time to wait before the browser is considered idle.
 */
export function idleWatch(callback: () => void, timespan: number): void {
  const events = ['mousedown', 'mousemove', 'touchstart', 'touchmove', 'keydown', 'wheel', 'resize'];

  events.forEach(e => {
    window.addEventListener(
      e,
      throttle(
        (event: Event) => {
          if (timeoutId) {
            window.clearTimeout(timeoutId);
          }
          timeoutId = window.setTimeout(callback, timespan);
        },
        1000,
        true
      ),
      true
    );
  });

  let timeoutId = window.setTimeout(callback, timespan);
}
