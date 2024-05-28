import '$src/shared';
import '@tylertech/forge/time-picker';
import '@tylertech/forge/label-value';
import type { ITimePickerComponent, ITimePickerOption } from '@tylertech/forge/time-picker';
import './time-picker.scss';
import { ISwitchComponent } from '@tylertech/forge/switch';

const CUSTOM_OPTIONS: ITimePickerOption[] = [
  {
    label: '+45 minutes',
    value: 45 * 60 * 1000,
    toMilliseconds: value => {
      console.log('[TimePicker] +45 mins custom option: ', value);
      return currentTimeOfDayMillis() + value;
    }
  },
  {
    label: '+1 hour',
    value: 1 * 60 * 60 * 1000,
    toMilliseconds: value => {
      console.log('[TimePicker] +1 hour custom option: ', value);
      return currentTimeOfDayMillis() + value;
    }
  }
];
const RESTRICTED_TIMES = [
  '8:00',
  '12:30:07',
  '2:13',
  '22:00'
];


const timePicker = document.querySelector('forge-time-picker#time-picker') as ITimePickerComponent;
const timePickerInput = timePicker.querySelector('input') as HTMLInputElement;
const opt24HourToggle = document.querySelector('#opt-time-picker-24-hour') as ISwitchComponent;
const optSecondsToggle = document.querySelector('#opt-time-picker-seconds') as ISwitchComponent;
const optMaskedToggle = document.querySelector('#opt-time-picker-masked') as ISwitchComponent;
const optShowMaskFormatToggle = document.querySelector('#opt-time-picker-mask-format') as ISwitchComponent;
const optShowNowToggle = document.querySelector('#opt-time-picker-now') as ISwitchComponent;
const optShowHourOptionsToggle = document.querySelector('#opt-time-picker-hour-options') as ISwitchComponent;
const optUseCustomOptionsToggle = document.querySelector('#opt-time-picker-custom-options') as ISwitchComponent;
const optUseCustomCallbacksToggle = document.querySelector('#opt-time-picker-custom-callbacks') as ISwitchComponent;
const optAllowDropdownToggle = document.querySelector('#opt-time-picker-allow-dropdown') as ISwitchComponent;
const optAllowInputToggle = document.querySelector('#opt-time-picker-allow-input') as ISwitchComponent;
const optAllowInvalidTimeToggle = document.querySelector('#opt-time-picker-allow-invalid') as ISwitchComponent;
const optUseRestrictedTimesToggle = document.querySelector('#opt-time-picker-allow-restricted') as ISwitchComponent;
const optUseCoercionCallbackToggle = document.querySelector('#opt-time-picker-coercion') as ISwitchComponent;
const optDisabledToggle = document.querySelector('#opt-time-picker-disabled') as ISwitchComponent;
const optValueTimePicker = document.querySelector('#opt-time-picker-value') as ITimePickerComponent;
const optMinTimePicker = document.querySelector('#opt-time-picker-min') as ITimePickerComponent;
const optMaxTimePicker = document.querySelector('#opt-time-picker-max') as ITimePickerComponent;
const optStartTimePicker = document.querySelector('#opt-time-picker-start') as ITimePickerComponent;
const modelValueElement = document.querySelector('#time-picker-model-value');
const inputValueElement = document.querySelector('#time-picker-input-value');


timePicker.addEventListener('forge-time-picker-change', ({ detail }) => {
  console.log('[TimePicker] change', detail);
  modelValueElement.textContent = detail || 'null';
});
timePicker.addEventListener('forge-time-picker-input', () => {
  inputValueElement.textContent = timePickerInput.value || '""';
});

opt24HourToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.use24HourTime = selected;
});
optSecondsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.allowSeconds = selected;
});
optMaskedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.masked = selected;
});
optShowMaskFormatToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.showMaskFormat = selected;
});
optShowNowToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.showNow = selected;
});
optShowHourOptionsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.showHourOptions = selected;
});
optUseCustomOptionsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.customOptions = selected ? CUSTOM_OPTIONS : [];
});
optUseCustomCallbacksToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.validationCallback = selected ? validationCallback : null;
  timePicker.parseCallback = selected ? parseCallback : null;
  timePicker.formatCallback = selected ? formatCallback : null;
});
optAllowDropdownToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.allowDropdown = selected;
});
optAllowInputToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.allowInput = selected;
});
optAllowInvalidTimeToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.allowInvalidTime = selected;
});
optUseRestrictedTimesToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.restrictedTimes = selected ? RESTRICTED_TIMES : [];
});
optUseCoercionCallbackToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.coercionCallback = selected ? coercionCallback : undefined;
});
optDisabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  timePicker.disabled = selected;
});
optValueTimePicker.addEventListener('forge-time-picker-change', ({ detail }) => {
  timePicker.value = detail;
  modelValueElement.textContent = timePicker.value;
});
optMinTimePicker.addEventListener('forge-time-picker-change', ({ detail }) => {
  timePicker.min = detail;
});
optMaxTimePicker.addEventListener('forge-time-picker-change', ({ detail }) => {
  timePicker.max = detail;
});
optStartTimePicker.addEventListener('forge-time-picker-change', ({ detail }) => {
  timePicker.startTime = detail;
});

function validationCallback(value): boolean {
  return /[1-9]/.test(value);
}

function parseCallback(value): number {
  if (!value || !value.length) {
    return null;
  }
  return +value[0] * 60 * 60 * 1000;
}

function formatCallback(value): string {
  const hours = value / (1000 * 60 * 60);
  return String(hours)[0] + ' hours';
}

function coercionCallback(rawValue, coercedValue, allowSeconds): string {
  // Capturing a special case that we'd like to coerce values to
  if (rawValue === '120' || rawValue === '12:0') {
    let result = '01:20';
    if (allowSeconds) {
      result += ':00';
    }
    return result;
  }
  return coercedValue;
}

function currentTimeOfDayMillis(): number {
  const date = new Date();
  const hourMillis = date.getHours() * 60 * 60 * 1000;
  const minuteMillis = date.getMinutes() * 60 * 1000;
  const secondMillis = optSecondsToggle.selected ? date.getSeconds() * 1000 : 0;
  return hourMillis + minuteMillis + secondMillis;
}
