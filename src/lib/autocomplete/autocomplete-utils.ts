import { IAutocompleteOption, IAutocompleteOptionGroup } from './autocomplete-constants';
import { isDefined, isObject, isDeepEqual } from '@tylertech/forge-core';

/** The available option types. */
export enum OptionType {
  Option,
  Group
}

/**
 * Determines if the provided options are of the specified type.
 * @param options The options either grouped or individual.
 * @param type The type of option to detect.
 */
export function isOptionType(options: IAutocompleteOption[] | IAutocompleteOptionGroup[], type: OptionType): boolean {
  const isOptionGroups = options.some(
    (o: IAutocompleteOption | IAutocompleteOptionGroup) =>
      isDefined(o) && isObject(o) && o.hasOwnProperty('options') && (o.hasOwnProperty('text') || o.hasOwnProperty('builder'))
  );
  const isOptionTypes = options.some(
    (o: IAutocompleteOption | IAutocompleteOptionGroup) => isDefined(o) && isObject(o) && o.hasOwnProperty('label') && o.hasOwnProperty('value')
  );
  return (isOptionGroups && type === OptionType.Group) || (isOptionTypes && type === OptionType.Option);
}

/** A utility function to find the matching option in the provided options by the value provided. */
export function getSelectedOption(options: IAutocompleteOption[], value: string): IAutocompleteOption | undefined {
  return options.find(o => o.value === value);
}

/** A predicate function that will determine if an option value is equal regardless of primitive type or complex object type. */
export function optionEqualPredicate(option: IAutocompleteOption, value: any, property: string | null = null): boolean {
  if (property) {
    if (!(property in option.value) || !(property in value)) {
      return false;
    }
    return isDeepEqual(option.value[property], value[property]);
  }
  return isDeepEqual(option.value, value);
}
