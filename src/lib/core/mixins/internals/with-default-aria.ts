import { internals, MixinBase, setDefaultAria, AbstractConstructor } from '../../../constants';
import { ARIAMixinStrict, setDefaultAria as setDefaultAriaUtil, DefaultAriaOptions } from '../../utils/a11y-utils';
import { IBaseComponent } from '../../base/base-component';

/**
 * A component with support for setting default ARIA.
 */
export interface IWithDefaultAria extends IBaseComponent {
  /**
   * Sets the default ARIA of the component using Element Internals if supported or sprouting
   * ARIA attributes if not.
   *
   * @param properties The ARIA properties and values to set.
   * @param options Whether or not to overwrite existing ARIA attributes. This only takes effect
   * if Element Internals are not supported and a new attribute will be sprouted.
   */
  [setDefaultAria](properties: Partial<ARIAMixinStrict>, options?: DefaultAriaOptions): void;
}

export declare abstract class WithDefaultAriaContract {
  public [setDefaultAria](properties: Partial<ARIAMixinStrict>, options?: DefaultAriaOptions): void;
}

/**
 * Mixes in Element Internals functionality into a base component.
 *
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithDefaultAria<TBase extends MixinBase>(base: TBase) {
  abstract class DefaultAria extends base implements IWithDefaultAria {
    public [setDefaultAria](properties: Partial<ARIAMixinStrict>, options?: DefaultAriaOptions): void {
      setDefaultAriaUtil(this, this[internals], properties, options);
    }
  }

  return DefaultAria as AbstractConstructor<WithDefaultAriaContract> & TBase;
}
