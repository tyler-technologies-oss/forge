import { MixinBase } from '../../constants.js';

type MixinFunction<T extends MixinBase = MixinBase, R extends T = T & MixinBase> = (Base: T) => R;
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
type MixinReturnValue<T extends MixinFunction<any, any>[]> = UnionToIntersection<
  { [K in keyof T]: T[K] extends MixinFunction<any, infer U> ? U : never }[number]
>;

/**
 * Combines multiple mixins into a single component class.
 *
 * @param base - The base mixin to start with.
 * @param mixins - The mixins to combine.
 * @returns The combined component class.
 */
export function combineMixins<T extends MixinBase, K extends MixinFunction<T, any>[]>(base: T, ...mixins: K): MixinReturnValue<K> {
  return mixins.reduce((acc, cur) => cur(acc), base) as MixinReturnValue<K>;
}
