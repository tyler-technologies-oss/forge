import { Observer } from './types.js';

export class Subject<T> {
  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected source: T;
  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected subscribers: Subscription<T>[] = [];
  public get value(): T {
    return this.source;
  }

  constructor(value: T) {
    this.source = value;
  }

  public subscribe(observer?: Observer<T>): Subscription<T> {
    const subscription = new Subscription(this.subscribers, observer);
    this.subscribers.push(subscription);
    observer?.(this.source);
    return subscription;
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected next(value: T): void {
    this.source = value;
    for (const subscriber of this.subscribers) {
      subscriber.observer?.(value);
    }
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected complete(): void {
    this.subscribers = [];
  }
}

export class Subscription<T> {
  public readonly observer?: Observer<T>;
  private _parent: Subscription<T>[];

  private _closed = false;
  public get closed(): boolean {
    return this._closed;
  }

  constructor(parent: Subscription<T>[], observer?: Observer<T>) {
    this.observer = observer;
    this._parent = parent;
  }

  public unsubscribe(): void {
    if (this._closed) {
      return;
    }

    const index = this._parent.findIndex(subscription => subscription === this);
    if (index > -1) {
      this._parent.splice(index, 1);
      this._closed = true;
      return;
    }

    console.error('Subscription is not present in parent array.', { subscription: this, parent: this._parent });
  }
}
