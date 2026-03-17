export interface IEvent<T> {
  type: string;
  data: T | undefined;
}

export interface IEventAware {
  hasListeners(type?: string): boolean;
  addListener(type: string, listener: (evt: IEvent<any>) => void): void;
  removeListener(type: string, listener: (evt: IEvent<any>) => void): void;
}

export abstract class EventAware implements IEventAware {
  private _listenerMap = new Map<string, Array<(evt: IEvent<any>) => void>>();

  protected _emit<T>(type: string, data?: T): void {
    const listeners = this._listenerMap.get(type);
    if (listeners && listeners.length) {
      listeners.forEach(cb => cb({ type, data } as IEvent<T>));
    }
  }

  public hasListeners(type?: string): boolean {
    return type ? this._listenerMap.has(type) : this._listenerMap.size > 0;
  }

  public addListener(type: string, listener: (evt: IEvent<any>) => void): void {
    if (!this._listenerMap.has(type)) {
      this._listenerMap.set(type, [listener]);
    } else {
      const listeners = this._listenerMap.get(type);
      if (listeners) {
        listeners.push(listener);
      }
    }
  }

  public removeListener(type: string, listener: (evt: IEvent<any>) => void): void {
    const listeners = this._listenerMap.get(type);
    if (listeners && listeners.length && listeners.includes(listener)) {
      listeners.splice(listeners.indexOf(listener), 1);
      if (!listeners.length) {
        this._listenerMap.delete(type);
      }
    }
  }
}
