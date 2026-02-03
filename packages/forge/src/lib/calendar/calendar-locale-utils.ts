// TODO: implement year before month support
// TODO: use a more robust strategy to get language and region parts from a locale, like the Intl API (in TypeScript 4.1.2 and es2020.intl)

import { DayOfWeek } from './calendar-constants';

/** Returns a localized day name. */
export function getLocalizedDayOfWeek(day: DayOfWeek, format: 'long' | 'short' | 'narrow' | undefined, locale?: string): string {
  if (!locale) {
    locale = navigator.language;
  }
  // January 2017 starts on a Sunday
  return new Date(2017, 0, day + 1).toLocaleString(locale, { weekday: format });
}

/** Returns a localized date of the month. */
export function getLocalizedDayOfMonth(date: number, format: 'numeric' | '2-digit' | undefined, locale?: string): string {
  if (!locale) {
    locale = navigator.language;
  }
  return new Date(1970, 0, date).toLocaleDateString(locale, { day: format });
}

/** Returns a localized month name. */
export function getLocalizedMonth(month: number, format: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined, locale?: string): string {
  if (!locale) {
    locale = navigator.language;
  }
  return new Date(1970, month, 1).toLocaleString(locale, { month: format });
}

/** Returns a localized year name. */
export function getLocalizedYear(year: number, format: 'numeric' | '2-digit' | undefined, locale?: string): string {
  if (!locale) {
    locale = navigator.language;
  }
  return new Date(year, 0, 1).toLocaleDateString(locale, { year: format });
}

/** Returns the first day of week for a locale. */
export function getFirstDayOfWeekForLocale(locale?: string): DayOfWeek {
  if (!locale) {
    locale = navigator.language;
  }
  const localeParts = locale.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);
  if (!localeParts || !localeParts.length) {
    return DayOfWeek.Monday;
  }

  const language = localeParts[1];
  const region = localeParts[4];
  const saturdayRegions = 'AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g);
  const sundayRegions = 'AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(/../g);
  const saturdayLanguages = ['ar', 'arq', 'arz', 'fa'];
  const sundayLanguages = 'amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu'.match(/../g);

  if (region) {
    if (sundayRegions && sundayRegions.includes(region)) {
      return DayOfWeek.Sunday;
    } else if (saturdayRegions && saturdayRegions.includes(region)) {
      return DayOfWeek.Saturday;
    } else {
      return DayOfWeek.Monday;
    }
  } else {
    if (sundayLanguages && sundayLanguages.includes(language)) {
      return DayOfWeek.Sunday;
    } else if (saturdayLanguages && saturdayLanguages.includes(language)) {
      return DayOfWeek.Saturday;
    } else {
      return DayOfWeek.Monday;
    }
  }
}

/** Returns an array of weekend days for a locale. */
export function getWeekendDaysForLocale(locale?: string): DayOfWeek[] {
  if (!locale) {
    locale = navigator.language;
  }
  const region: string = locale.split('-')[1];
  switch (region) {
    case 'DZ':
    case 'BH':
    case 'BD':
    case 'EG':
    case 'IQ':
    case 'IL':
    case 'JO':
    case 'KW':
    case 'LY':
    case 'MV': // Not consistent across Malaysia
    case 'MR':
    case 'NP':
    case 'OM':
    case 'QA':
    case 'SA':
    case 'SD':
    case 'SY':
    case 'AE': // Not consistent across UAE
    case 'YE':
    case 'AF': // Thursday morning is a workday
    case 'IR': // Thursday morning is a workday
      return [DayOfWeek.Thursday, DayOfWeek.Friday];
    case 'BN':
      return [DayOfWeek.Sunday, DayOfWeek.Friday];
    default:
      return [DayOfWeek.Sunday, DayOfWeek.Saturday];
  }
}

/** Returns whether a language is written right-to-left. */
export function isRtlLocale(locale?: string): boolean {
  if (!locale) {
    locale = navigator.language;
  }
  const rtlLocales: string[] = ['ar', 'arc', 'ckb', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ps', 'sd', 'ur', 'uz-AF', 'yi'];
  return rtlLocales.some(l => (locale ? locale.startsWith(l) : false));
}
