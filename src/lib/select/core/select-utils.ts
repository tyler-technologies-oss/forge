import { isDefined, isObject } from '@tylertech/forge-core';
import { ISelectOption, ISelectOptionGroup } from './base-select-constants';

export enum SelectOptionType { Option, Group }

/**
 * Determines if the provided options are of the specified type.
 * @param options The options either grouped or individual.
 * @param type The type of option to detect.
 */
export function isSelectOptionType(options: ISelectOption[] | ISelectOptionGroup[], type: SelectOptionType): boolean {
  const isOptionGroups = options.some((o: ISelectOption | ISelectOptionGroup) => isOptionGroupObject(o));
  const isOptionTypes = options.some((o: ISelectOption | ISelectOptionGroup) => isOptionObject(o));
  return (isOptionGroups && type === SelectOptionType.Group) || (isOptionTypes && type === SelectOptionType.Option);
}

export function isOptionGroupObject(o: ISelectOption | ISelectOptionGroup): o is ISelectOptionGroup {
  return isDefined(o) && isObject(o) && o.hasOwnProperty('options') && o.hasOwnProperty('text');
}

export function isOptionObject(o: ISelectOption | ISelectOptionGroup): o is ISelectOption {
  return isDefined(o) && isObject(o) && o.hasOwnProperty('label') && o.hasOwnProperty('value');
}
