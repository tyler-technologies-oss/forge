import '$src/shared';
import '@tylertech/forge/date-range-picker';
import '@tylertech/forge/label-value';
import './date-range-picker.scss';
import { IDateRangePickerComponent } from '@tylertech/forge/date-range-picker';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

const dateRangePicker = document.querySelector('#demo-date-range-picker') as IDateRangePickerComponent;
const datePickerChangeStatusElement = document.querySelector('#date-range-picker-change-status');
const dateRangePickerFromInputValueElement = document.querySelector('#date-range-picker-from-input-value');
const dateRangePickerToInputValueElement = document.querySelector('#date-range-picker-to-input-value');
const dateRangePickerFromInput = dateRangePicker.querySelectorAll('input')[0];
const dateRangePickerToInput = dateRangePicker.querySelectorAll('input')[1];

datePickerChangeStatusElement.textContent = 'null';

dateRangePicker.addEventListener('forge-date-picker-open', () => {
  console.log('forge-date-picker-open');
});

dateRangePicker.addEventListener('forge-date-picker-close', () => {
  console.log('forge-date-picker-close');
});

dateRangePicker.addEventListener('forge-calendar-month-change', evt => {
  console.log('[forge-calendar-month-change]', evt);
});

dateRangePicker.addEventListener('forge-date-range-picker-change', evt => {
  console.log('[forge-date-range-picker-change]', evt);
  datePickerChangeStatusElement.textContent = ((evt.detail && evt.detail.from) || 'null') + ' - ' + ((evt.detail && evt.detail.to) || 'null');
});

dateRangePickerFromInput.addEventListener('input', () => {
  dateRangePickerFromInputValueElement.textContent = dateRangePickerFromInput.value;
});

dateRangePickerToInput.addEventListener('input', () => {
  dateRangePickerToInputValueElement.textContent = dateRangePickerToInput.value;
});

const valueModeSelect = document.getElementById('opt-value-mode') as ISelectComponent;
valueModeSelect.addEventListener('change', () => {
  dateRangePicker.valueMode = valueModeSelect.value;
});

const dateFormatSelect = document.getElementById('opt-date-format') as ISelectComponent;
dateFormatSelect.addEventListener('change', () => {
  dateRangePicker.dateFormat = dateFormatSelect.value;
  dateRangePickerToInput.placeholder = dateFormatSelect.value;
  dateRangePickerFromInput.placeholder = dateFormatSelect.value;
});

const disabledDaysSelect = document.getElementById('opt-disabled-days') as ISelectComponent;
disabledDaysSelect.addEventListener('change', () => {
  dateRangePicker.disabledDaysOfWeek = Array.isArray(disabledDaysSelect.value) ? disabledDaysSelect.value.map(v => +v) : [];
});

const maskedToggle = document.getElementById('opt-masked') as ISwitchComponent;
maskedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.masked = selected;
});

const showMaskFormat = document.getElementById('opt-show-mask-format') as ISwitchComponent;
showMaskFormat.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.showMaskFormat = selected;
});

const minDateToggle = document.getElementById('opt-min-date') as ISwitchComponent;
minDateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.min = selected ? new Date(Date.now() - 86400000) : null;
});

const maxDateToggle = document.getElementById('opt-max-date') as ISwitchComponent;
maxDateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.max = selected ? new Date(Date.now() + 86400000) : null;
});

const disabledToggle = document.getElementById('opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.disabled = selected;
});

const allowInvalidDateToggle = document.getElementById('opt-allow-invalid-date') as ISwitchComponent;
allowInvalidDateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.allowInvalidDate = selected;
});

const dateRangePickerShowTodayToggle = document.querySelector('#opt-show-today') as ISwitchComponent;
dateRangePickerShowTodayToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.showToday = selected;
});

const dateRangePickerShowClearToggle = document.querySelector('#opt-show-clear') as ISwitchComponent;
dateRangePickerShowClearToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dateRangePicker.showClear = selected;
});

const disableDayCallbackToggle = document.getElementById('opt-disable-day-callback') as ISwitchComponent;
disableDayCallbackToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    dateRangePicker.disableDayCallback = date => date.toLocaleDateString() === new Date().toLocaleDateString();
  } else {
    dateRangePicker.disableDayCallback = null;
  }
});

const toggleDropdownOpenButton = document.getElementById('opt-toggle-dropdown-open') as HTMLButtonElement;
toggleDropdownOpenButton.addEventListener('click', () => {
  dateRangePicker.open = !dateRangePicker.open;
});
