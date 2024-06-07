import { AbstractConstructor, internals, MixinBase } from '../../../constants';
import { IBaseComponent } from '../../base/base-component';

/**
 * A component with attached Element Internals.
 */
export interface IWithElementInternals extends IBaseComponent {
  /**
   * The Element Internals of the component.
   */
  readonly [internals]: ElementInternals;
}

export declare abstract class WithElementInternalsContract {
  public readonly [internals]: ElementInternals;
}

/**
 * Mixes in Element Internals functionality into a base component.
 *
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithElementInternals<TBase extends MixinBase>(base: TBase) {
  abstract class ElementInternalsComponent extends base implements IWithElementInternals {
    public readonly [internals]: ElementInternals;

    constructor(...args: any[]) {
      super(...args);
      this[internals] = this.attachInternals();
    }
  }

  return ElementInternalsComponent as AbstractConstructor<WithElementInternalsContract> & TBase;
}
