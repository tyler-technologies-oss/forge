/**
 * Converts a JavaScript object to a URI encoded query string.
 * @param {any} obj The parameters for the query string.
 */
export function createQueryString(obj: any): string | null {
  if (!obj || obj.length === 0) {
    return null;
  }

  const params: string[] = [];

  for (const property in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, property)) {
      continue;
    }

    if (obj[property] instanceof Array) {
      for (const index in obj[property]) {
        if (Object.prototype.hasOwnProperty.call(obj[property], index)) {
          params.push(
            encodeURIComponent(property) +
              '=' +
              (obj[property][index] !== null && typeof obj[property][index] !== 'undefined' ? encodeURIComponent(obj[property][index]) : '')
          );
        }
      }
    } else {
      params.push(
        encodeURIComponent(property) + '=' + (obj[property] !== null && typeof obj[property] !== 'undefined' ? encodeURIComponent(obj[property]) : '')
      );
    }
  }

  return '?' + params.join('&');
}
