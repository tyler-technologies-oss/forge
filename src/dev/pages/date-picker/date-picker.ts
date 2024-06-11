import '$src/shared';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/label-value';
import './date-picker.scss';
import { IDatePickerComponent } from '@tylertech/forge/date-picker';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

const datePicker = document.querySelector('forge-date-picker#demo-date-picker') as IDatePickerComponent;
const datePickerInput = datePicker.querySelector('input');
const datePickerChangeStatusElement = document.querySelector('#date-picker-change-status') as HTMLElement;
const datePickerInputValueElement = document.querySelector('#date-picker-input-value') as HTMLElement;

datePicker.addEventListener('forge-date-picker-open', () => {
  console.log('forge-date-picker-open');
});

datePicker.addEventListener('forge-date-picker-close', () => {
  console.log('forge-date-picker-close');
});

datePicker.addEventListener('forge-calendar-month-change', (evt) => {
  console.log('[forge-calendar-month-change]', evt);
});

datePicker.addEventListener('forge-date-picker-change', (evt) => {
  console.log('[forge-date-picker-change]', evt);
  datePickerChangeStatusElement.textContent = String(evt.detail) || 'null';
});

datePickerInput.addEventListener('input', () => {
  datePickerInputValueElement.textContent = datePickerInput.value ?? '""';
});

const localeSelect = document.getElementById('opt-locale') as ISelectComponent;
localeSelect.addEventListener('change', () => {
  datePicker.locale = localeSelect.value;
});

const valueModeSelect = document.getElementById('opt-value-mode') as ISelectComponent;
valueModeSelect.addEventListener('change', () => {
  datePicker.valueMode = valueModeSelect.value;
});

const disabledDaysSelect = document.getElementById('opt-disabled-days') as ISelectComponent;
disabledDaysSelect.addEventListener('change', () => {
  datePicker.disabledDaysOfWeek = Array.isArray(disabledDaysSelect.value) ? disabledDaysSelect.value.map(v => +v) : [];
});

const maskedToggle = document.getElementById('opt-masked') as ISwitchComponent;
maskedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.masked = selected;
});

const showMaskFormat = document.getElementById('opt-show-mask-format') as ISwitchComponent;
showMaskFormat.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.showMaskFormat = selected;
});

const minDateToggle = document.getElementById('opt-min-date') as ISwitchComponent;
minDateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.min = selected ? new Date(Date.now() - 86400000) : null;
});

const maxDateToggle = document.getElementById('opt-max-date') as ISwitchComponent;
maxDateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.max = selected ? new Date(Date.now() + 86400000) : null;
});

const disabledToggle = document.getElementById('opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.disabled = selected;
});

const allowInvalidDateToggle = document.getElementById('opt-allow-invalid-date') as ISwitchComponent;
allowInvalidDateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.allowInvalidDate = selected;
});

const showTodayToggle = document.getElementById('opt-show-today') as ISwitchComponent;
showTodayToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.showToday = selected;
});

const showClearToggle = document.getElementById('opt-show-clear') as ISwitchComponent;
showClearToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  datePicker.showClear = selected;
});

const disableDayCallbackToggle = document.getElementById('opt-disable-day-callback') as ISwitchComponent;
disableDayCallbackToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    datePicker.disableDayCallback = (date) => date.toLocaleDateString() === new Date().toLocaleDateString();
  } else {
    datePicker.disableDayCallback = null;
  }
});

const toggleDropdownOpenButton = document.getElementById('opt-toggle-dropdown-open') as HTMLButtonElement;
toggleDropdownOpenButton.addEventListener('click', () => {
  datePicker.open = !datePicker.open;
});

const customCallbackToggle = document.getElementById('opt-custom-callbacks') as ISwitchComponent;
customCallbackToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    datePickerInput.placeholder = 'yyyy-mm-dd';
    datePicker.maskFormat = 'YYYY-MM-DD';
    datePicker.formatCallback = date => {
      return date ? date.toISOString().split('T')[0] : null;
    };
    datePicker.parseCallback = str => {
      if (str) {
        const split = str.split('-');

        if (split.length !== 3) {
          return null;
        }

        const yyyy = +split[0];
        const mm = +split[1];
        const dd = split[2].indexOf('T') ? +split[2].split('T')[0] : +split[2];

        if (!yyyy || isNaN(yyyy) || !mm || isNaN(mm) || !dd || isNaN(dd)) {
          return null;
        }

        return new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
      }

      return null;
    };
  } else {
    datePickerInput.placeholder = 'mm/dd/yyyy';
    datePicker.maskFormat = null;
    datePicker.formatCallback = null;
    datePicker.parseCallback = null;
  }
});
