import { DatetimeFormatOptions, formatDate } from '../utils/date-utils.js';
import { Formatter } from './formatter.js';

export interface DateFormatterOptions extends DatetimeFormatOptions {
  pattern?: string;
}

export class DateFormatter extends Formatter<Date | string | number, DateFormatterOptions, string> {
  protected _defaultOptions: DateFormatterOptions = {
    locale: 'en-US',
    pattern: 'MM/dd/yyyy'
  };

  public format(value: Date | string | number): string {
    const { pattern, ...formatOptions } = this._options;
    return formatDate(value instanceof Date ? value : new Date(value), pattern as string, formatOptions);
  }
}
