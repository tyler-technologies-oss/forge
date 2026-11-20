export abstract class Formatter<TValue = unknown, TOptions = Record<string, unknown>, TReturn = unknown> {
  public static isFormatter(value: unknown): value is Formatter {
    return value instanceof Formatter;
  }

  protected abstract _defaultOptions: TOptions;

  #userOptions?: TOptions;
  #resolvedOptions?: TOptions;

  protected get _options(): TOptions {
    if (!this.#resolvedOptions) {
      this.#resolvedOptions = { ...this._defaultOptions, ...this.#userOptions };
    }
    return this.#resolvedOptions;
  }

  constructor(options?: TOptions) {
    this.#userOptions = options ? { ...options } : undefined;
  }

  public abstract format(value: TValue): TReturn;
}
