import { Formatter } from './formatter.js';

export interface CurrencyFormatterOptions {
  locale?: string;
  currency?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  currencySign?: 'standard' | 'accounting';
}

export class CurrencyFormatter extends Formatter<number, CurrencyFormatterOptions, string> {
  protected _defaultOptions: CurrencyFormatterOptions = {
    locale: 'en-US',
    currency: 'USD',
    currencyDisplay: 'symbol',
    currencySign: 'standard'
  };

  public format(value: number): string {
    const { locale, currency, currencySign, currencyDisplay } = this._options;
    return new Intl.NumberFormat(locale, { style: 'currency', currency, currencySign, currencyDisplay }).format(value);
  }
}
