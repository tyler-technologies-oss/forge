import { CurrencyFormatter, DateFormatter, NumberFormatter } from '@tylertech/forge-core';

type FormatterConstructor = abstract new (...args: never[]) => object;

export const FORMATTER_ATTRIBUTES: ReadonlyArray<readonly [FormatterConstructor, string]> = [
  [NumberFormatter, 'data-number-format'],
  [CurrencyFormatter, 'data-currency-format'],
  [DateFormatter, 'data-date-format']
];

export function getFormatterAttribute(format: unknown): string | undefined {
  return FORMATTER_ATTRIBUTES.find(([formatter]) => format instanceof formatter)?.[1];
}
