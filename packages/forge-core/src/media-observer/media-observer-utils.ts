import { ALL_MEDIA_FEATURES, IMediaRange, MediaFeature, NamedMediaQuery, RangeMediaFeature } from './types.js';

/** Returns the names of all queries that match. Used for range media features. */
export function getMatchingValues(namedQueries: NamedMediaQuery[]): string[] {
  const values: string[] = [];
  for (const namedQuery of namedQueries) {
    const queryList = window.matchMedia(namedQuery.query);
    if (queryList.matches) {
      values.push(namedQuery.name);
    }
  }
  return values;
}

/** Returns the name of one query that matches. Used for discrete media features. */
export function getMatchingValue(namedQueries: NamedMediaQuery[]): string {
  for (const namedQuery of namedQueries) {
    const queryList = window.matchMedia(namedQuery.query);
    if (queryList.matches) {
      return namedQuery.name;
    }
  }
  // We can assume that at least one query will match, this fallback is mostly to satisfy TypeScript
  console.warn(`No media query returned a match, falling back to ${namedQueries[0].name}.`);
  return namedQueries[0].name;
}

/** Returns whether a query matches. */
export function getBooleanValue(query: NamedMediaQuery): boolean {
  return window.matchMedia(query.query).matches;
}

/** Returns a CSS media query string from a range. */
export function getRangeQuery(feature: RangeMediaFeature, range: IMediaRange): string {
  if (range.equals !== undefined) {
    return `(${feature}: ${range.equals})`;
  }

  const rules: string[] = [];
  if (range.min !== undefined) {
    rules.push(`(min-${feature}: ${range.min})`);
  }
  if (range.max !== undefined) {
    rules.push(`(max-${feature}: ${range.max})`);
  }
  return rules.join(' and ');
}

/** Whether a string is the name of a media feature. */
export function isMediaFeature(value: string): value is MediaFeature {
  return ALL_MEDIA_FEATURES.includes(value as MediaFeature);
}

/** Return `undefined` if the name is a reserved media feature. */
export function validateName(name?: string): string | undefined {
  if (!name) {
    return undefined;
  }

  if (isMediaFeature(name)) {
    console.error(`${name} is a disallowed media observer name.`);
    return undefined;
  }

  return name;
}
