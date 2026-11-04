import { Formatter } from './formatter.js';

export interface NumberFormatterOptions {
  locale?: string;
  percentage?: boolean;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  compactDisplay?: 'short' | 'long';
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
  useGrouping?: Intl.NumberFormatOptions['useGrouping'];
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}

export class NumberFormatter extends Formatter<number, NumberFormatterOptions, string> {
  protected _defaultOptions: NumberFormatterOptions = {
    locale: 'en-US',
    percentage: false,
    notation: 'standard',
    compactDisplay: 'short',
    signDisplay: 'auto'
  };

  public format(value: number): string {
    const { locale, percentage, ...formatOptions } = this._options;
    return new Intl.NumberFormat(locale, { ...formatOptions, style: percentage ? 'percent' : 'decimal' }).format(value);
  }
}
