import { Subject } from '../observable/index.js';
import { getBooleanValue, getMatchingValue, getMatchingValues, getRangeQuery, validateName } from './media-observer-utils.js';
import {
  BooleanMediaFeature,
  IMediaObserverOptions,
  IMediaRange,
  ManagedMediaQuery,
  MediaFeature as DiscreteMediaFeature,
  mediaFeatureValues,
  MediaQueryHandler,
  NamedMediaQuery,
  RangeMediaFeature
} from './types.js';

/**
 * A Subject that tracks the value of a media feature and exposes it synchronously and
 * asynchronously.
 */
export abstract class MediaObserver<T> extends Subject<T> {
  /**
   * STATIC MEMBERS
   */

  /** A collection of all managed media observers. */
  private static _observers: { [key: string]: MediaObserver<any> } = {};

  /**
   * Returns a new media observer tracking a discrete feature.
   * @param feature The name of a discrete media feature.
   * @param options An options object with the following properties:
   * - `name`: The name to track the observer by. The feature name is used if unsupplied.
   * - `track`: Whether to make the observer available globally.
   * @returns A `DiscreteMediaObserver` tracking the given feature.
   */
  public static observeDiscrete(feature: DiscreteMediaFeature, options?: IMediaObserverOptions): DiscreteMediaObserver {
    const name = validateName(options?.name) ?? feature;
    const existing = MediaObserver._getObserver<DiscreteMediaObserver, string>(name);
    if (existing && options?.track !== false) {
      return existing;
    }

    return DiscreteMediaObserver.create(feature);
  }

  /** Returns a media observer tracking a range feature. */
  /**
   * Returns a new media observer tracking a range feature.
   * @param feature The name of a range media feature.
   * @param constraints One or more ranges to track. A range includes the following properties:
   * - `name`: A label for the range used to set the observer's value.
   * - `min`: The lowest value in the range (optional).
   * - `max`: The highest value in the range (optional).
   * - `equals`: A single value to match, supersedes `min` and `max` (optional).
   * @param options An options object with the following properties:
   * - `name`: The name to track the observer by. The feature name is used if unsupplied.
   * - `track`: Whether to make the observer available globally.
   * @returns A `RangeMediaObserver` tracking the given feature.
   */
  public static observeRange(feature: RangeMediaFeature, constraints: IMediaRange | IMediaRange[], options?: IMediaObserverOptions): RangeMediaObserver {
    const name = validateName(options?.name) ?? feature;
    const existing = MediaObserver._getObserver<RangeMediaObserver, string[]>(name);
    if (existing && options?.track !== false) {
      return existing;
    }

    return RangeMediaObserver.create(feature, Array.isArray(constraints) ? constraints : [constraints], options);
  }

  /**
   * Returns a media observer tracking a feature that evaluates to a boolean value.
   * @param feature The name of a media feature that can be expressed as a boolean.
   * @param options An options object with the following properties:
   * - `name`: The name to track the observer by. The feature name plus '-bool' is used if unsupplied.
   * - `track`: Whether to make the observer available globally.
   * @returns A `BooleanMediaObserver` tracking the given feature.
   */
  public static observeBoolean(feature: BooleanMediaFeature, options?: IMediaObserverOptions): BooleanMediaObserver {
    const name = validateName(options?.name) ?? `${feature}-bool`;
    const existing = MediaObserver._getObserver<BooleanMediaObserver, boolean>(name);
    if (existing && options?.track !== false) {
      return existing;
    }

    return BooleanMediaObserver.create(feature, options);
  }

  /** Returns a media observer tracking any media query. */
  /**
   * Returns a media observer tracking any media query.
   * @param query Any media query.
   * @param options An options object with the following properties:
   * - `name`: The name to track the observer by. The entire query string is used if unsupplied.
   * - `track`: Whether to make the observer available globally.
   * @returns A `CustomMediaObserver` tracking the given query.
   */
  public static observeCustom(query: string, options?: IMediaObserverOptions): CustomMediaObserver {
    const name = validateName(options?.name) ?? query;
    const existing = MediaObserver._getObserver<CustomMediaObserver, MediaQueryList | MediaQueryListEvent>(name);
    if (existing && options?.track !== false) {
      return existing;
    }

    return CustomMediaObserver.create(query, options);
  }

  private static _getObserver<TObserver extends MediaObserver<U>, U>(name: string): TObserver | undefined {
    const existing = MediaObserver._observers[name];
    if (existing) {
      return existing as TObserver;
    }
    return undefined;
  }

  /**
   * INSTANCE MEMBERS
   */

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _queries: ManagedMediaQuery[] = [];

  protected constructor(name: string, namedQueries: NamedMediaQuery[], value: T, track = true) {
    super(value);
    this._name = name;
    this._queries = this._attachMediaQueries(namedQueries);

    if (track) {
      MediaObserver._observers[name] = this;
    }
  }

  /** Removes the `MediaObserver` and all created event listeners. */
  public destroy(): void {
    for (const query of this._queries) {
      query.queryList.removeEventListener('change', query.handler);
    }
    this._queries = [];
    delete MediaObserver._observers[this.name];
  }

  private _attachMediaQueries(namedQueries: NamedMediaQuery[]): ManagedMediaQuery[] {
    return namedQueries.map(({ name, query }) => {
      const queryList = window.matchMedia(query);
      const handler: MediaQueryHandler = event => this.setValue(event, name);
      handler(queryList);
      queryList.addEventListener('change', handler);
      return { queryList, handler };
    });
  }

  protected abstract setValue(value: MediaQueryList | MediaQueryListEvent, name: string): void;
}

/**
 * A media observer that tracks one feature with multiple discrete keyword values.
 */
export class DiscreteMediaObserver extends MediaObserver<string> {
  public static create(feature: DiscreteMediaFeature, options?: IMediaObserverOptions): DiscreteMediaObserver {
    const namedQueries: NamedMediaQuery[] = mediaFeatureValues[feature as keyof typeof mediaFeatureValues].map(featureValue => ({
      name: featureValue.toString(),
      query: `(${feature}: ${featureValue})`
    }));
    const value = getMatchingValue(namedQueries);
    const name = validateName(options?.name) ?? feature;
    return new DiscreteMediaObserver(name, namedQueries, value, options?.track !== false);
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override setValue(value: MediaQueryList | MediaQueryListEvent, name: string): void {
    if (!value.matches) {
      return;
    }
    this.next(name);
  }
}

/**
 * A media observer that tracks one feature with comparable range values.
 */
export class RangeMediaObserver extends MediaObserver<string[]> {
  public static create(feature: RangeMediaFeature, constraints: IMediaRange[], options?: IMediaObserverOptions): RangeMediaObserver {
    const namedQueries: NamedMediaQuery[] = constraints.map(constraint => ({ query: getRangeQuery(feature, constraint), name: constraint.name }));
    const value = getMatchingValues(namedQueries);
    const name = validateName(options?.name) ?? feature;
    return new RangeMediaObserver(name, namedQueries, value, options?.track !== false);
  }

  private _isAwaitingQueries: boolean;
  private _valueQueue: string[];
  private _isInitialized: boolean;

  private constructor(name: string, namedQueries: NamedMediaQuery[], value: string[], track = true) {
    super(name, namedQueries, value, track);
    this._isAwaitingQueries = false;
    this._valueQueue = [];
    this._isInitialized = true;
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override setValue(value: MediaQueryList | MediaQueryListEvent, name: string): void {
    if (!this._isInitialized) {
      return;
    }

    if (!this._isAwaitingQueries) {
      setTimeout(() => {
        this.next([...this._valueQueue]);
        this._valueQueue = [];
        this._isAwaitingQueries = false;
      });
      this._valueQueue = [...this.source];
      this._isAwaitingQueries = true;
    }

    const index = this._valueQueue.findIndex(queued => queued === name);
    if (value.matches && index === -1) {
      this._valueQueue.push(name);
    } else if (!value.matches && index > -1) {
      this._valueQueue.splice(index, 1);
    }
  }
}

/**
 * A media observer that tracks one feature that can be coerced to a boolean value. `none` and 0
 * values evaluate to `true`.
 */
export class BooleanMediaObserver extends MediaObserver<boolean> {
  public static create(feature: BooleanMediaFeature, options?: IMediaObserverOptions): BooleanMediaObserver {
    const namedQuery: NamedMediaQuery[] = [{ query: `(${feature})`, name: '' }];
    const value = getBooleanValue(namedQuery[0]);
    const name = validateName(options?.name) ?? `${feature}-bool`;
    return new BooleanMediaObserver(name, namedQuery, value, options?.track !== false);
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override setValue(value: MediaQueryList | MediaQueryListEvent, _: never): void {
    this.next(value.matches);
  }
}

/**
 * A media observer that tracks any query.
 */
export class CustomMediaObserver extends MediaObserver<MediaQueryList | MediaQueryListEvent> {
  public static create(query: string, options?: IMediaObserverOptions): CustomMediaObserver {
    const namedQuery: NamedMediaQuery[] = [{ query, name: '' }];
    const value = window.matchMedia(query);
    const name = validateName(options?.name) ?? query;
    return new CustomMediaObserver(name, namedQuery, value, options?.track !== false);
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override setValue(value: MediaQueryList | MediaQueryListEvent, _: never): void {
    this.next(value);
  }
}
