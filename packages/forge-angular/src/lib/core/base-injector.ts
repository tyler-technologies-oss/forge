import { Injector } from '@angular/core';

export class BaseInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    private _additionalTokens: WeakMap<any, any>
  ) {}

  public get(token: any, notFoundValue?: any): void {
    const value = this._additionalTokens.get(token);
    if (value) {
      return value;
    }
    return this._parentInjector.get<any>(token, notFoundValue);
  }
}
