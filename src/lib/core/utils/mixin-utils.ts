import { MixinBase, MixinReturn } from '../../constants';
import { BaseComponent } from '../base/base-component';

type MixinBaseType = MixinBase<BaseComponent>;
type MixinType = (base: MixinBaseType) => MixinReturn<MixinBaseType, object>;
type MixinReturnType = MixinReturn<MixinBaseType, object>;

/**
 * Combines multiple mixins into a single component class.
 * 
 * @param base - The base mixin to start with.
 * @param mixins - The mixins to combine.
 * @returns The combined component class.
 */
export function combineMixins(base: MixinBaseType, ...mixins: MixinType[]): MixinReturnType {
  return mixins.reduce((acc: MixinReturnType, cur: MixinType) => cur(acc), base);
}
