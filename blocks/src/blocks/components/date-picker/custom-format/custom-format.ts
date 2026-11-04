import { IconRegistry } from '@tylertech/forge/icon';
import type { IDatePickerComponent } from '@tylertech/forge/date-picker';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconInsertInvitation]);

const monthMap: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

function parseCallback(str: string): Date | null {
  if (!str) {
    return null;
  }
  const match = str.match(/(\w{3}) (\d{2}), (\d{4})/);
  if (!match || match.length !== 4) {
    return null;
  }
  const monthStr = match[1];
  const day = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  const month = monthMap[monthStr];
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }
  const date = new Date(year, month, day);
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }
  return date;
}

function formatCallback(date: Date | null): string {
  if (!date) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
}

const datePicker = document.querySelector<IDatePickerComponent>('forge-date-picker');
if (datePicker) {
  datePicker.parseCallback = parseCallback;
  datePicker.formatCallback = formatCallback;
}
