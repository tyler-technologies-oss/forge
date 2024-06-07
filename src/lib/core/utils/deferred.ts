/**
 * Represents a deferred promise.
 *
 * Use deferred promises when you need to return a promise but you don't have the result yet.
 */
export class Deferred<T = void> {
  /**
   * The promise to be resolved or rejected.
   */
  public readonly promise: Promise<T>;

  private _resolveFn: (value: T | PromiseLike<T>) => void;
  private _rejectFn: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolveFn = resolve;
      this._rejectFn = reject;
    });
  }

  /**
   * Resolves the promise.
   * @param param The value to resolve the promise with.
   */
  public resolve(param: T): void {
    this._resolveFn(param);
  }

  /**
   * Rejects the promise.
   * @param reason The reason for rejecting the promise.
   */
  public reject(reason?: any): void {
    this._rejectFn(reason);
  }
}
