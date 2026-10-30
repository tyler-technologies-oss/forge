import { coerceBoolean, coerceNumber } from '@tylertech/forge-core';

export const booleanAttributeConverter = {
  fromAttribute: (value: string | null): boolean => coerceBoolean(value as string),
  toAttribute: (value: boolean): string | null => (value ? '' : null)
};

export const numberAttributeConverter = {
  fromAttribute: (value: string | null): number => coerceNumber(value as string),
  toAttribute: (value: number): string | null => (value ? `${value}` : null)
};
