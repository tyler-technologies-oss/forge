import { internals, MixinBase, setDefaultAria, AbstractConstructor } from '../../constants';
import {
  ARIAAttribute,
  ariaAttributeToProperty,
  ARIAMixinStrict,
  DefaultAriaOptions,
  restoreDefaultAria as restoreDefaultAriaUtil,
  setDefaultAria as setDefaultAriaUtil
} from '../utils/a11y-utils';
import { supportsElementInternalsAria } from '../utils/feature-detection';
import { IBaseComponent } from './base-component';

/**
 * A component with attached Element Internals.
 */
export interface IWithElementInternals extends IBaseComponent {
  /**
   * The Element Internals of the component.
   */
  readonly [internals]: ElementInternals;

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

export declare abstract class WithElementInternalsContract {
  public readonly [internals]: ElementInternals;
  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  public [setDefaultAria](properties: Partial<ARIAMixinStrict>, options?: DefaultAriaOptions): void;
}

/**
 * Mixes in Element Internals functionality into a base component.
 * 
 * @param base The base component to mix into.
 * @param observedAria An array of ARIA attributes to observe for changes. If an observed attribute
 * is removed, the default ARIA will be restored. This is only used if Element Internals is not
 * supported.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithElementInternals<TBase extends MixinBase>(base: TBase, observedAria?: ARIAAttribute[]) {
  abstract class ElementInternalsComponent extends base implements IWithElementInternals {
    public readonly [internals]: ElementInternals;

    constructor(...args: any[]) {
      super(...args);
      this[internals] = this.attachInternals();
    }

    public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
      super.attributeChangedCallback?.(name, oldValue, newValue);

      // If Element Internals is supported our default ARIA is never set as an attribute, so
      // there's nothing to do here.
      if (!observedAria || supportsElementInternalsAria()) {
        return;
      }

      // If the observed attribute is removed, restore the default ARIA.
      if (observedAria.includes(name as ARIAAttribute) && !newValue) {
        const ariaPropertyName = ariaAttributeToProperty(name as ARIAAttribute);
        this._restoreDefaultAria(ariaPropertyName);
      }
    }

    public [setDefaultAria](properties: Partial<ARIAMixinStrict>, options?: DefaultAriaOptions): void {
      setDefaultAriaUtil(this, this[internals], properties, options);
    }

    private _restoreDefaultAria(name: keyof ARIAMixinStrict): void {
      restoreDefaultAriaUtil(this, name);
    }
  }

  return ElementInternalsComponent as AbstractConstructor<WithElementInternalsContract> & TBase;
}
