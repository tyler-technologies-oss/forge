(function() {
  var example = document.querySelector('#TimePicker');
  var timePicker = example.querySelector('forge-time-picker');
  var timePickerInput = example.querySelector('forge-time-picker input');
  var use24HourTimeCheckbox = example.querySelector('#time-picker-24-hour');
  var showSecondsCheckbox = example.querySelector('#time-picker-show-seconds');
  var maskedCheckbox = example.querySelector('#time-picker-masked');
  var showMaskFormatCheckbox = example.querySelector('#time-picker-show-mask-format');
  var showNowCheckbox = example.querySelector('#time-picker-show-now');
  var showHourOptionsCheckbox = example.querySelector('#time-picker-show-hour-option');
  var useCustomOptionsCheckbox = example.querySelector('#time-picker-custom-options');
  var useCustomCallbacksCheckbox = example.querySelector('#time-picker-custom-callbacks');
  var allowDropdownCheckbox = example.querySelector('#time-picker-allow-dropdown');
  var allowInputCheckbox = example.querySelector('#time-picker-allow-input');
  var allowInvalidTimeCheckbox = example.querySelector('#time-picker-allow-invalid-time');
  var useRestrictedTimesCheckbox = example.querySelector('#time-picker-use-restricted-times');
  var useCoercionCallbackCheckbox = example.querySelector('#time-picker-use-coercion-callback');
  var disabledCheckbox = example.querySelector('#time-picker-disabled');
  var valueTimePicker = example.querySelector('#time-picker-value-field');
  var minTimePicker = example.querySelector('#time-picker-min-field');
  var maxTimePicker = example.querySelector('#time-picker-max-field');
  var startTimePicker = example.querySelector('#time-picker-start-field');
  var modelValueElement = example.querySelector('#time-picker-model-value');
  var inputValueElement = example.querySelector('#time-picker-input-value');

  var CUSTOM_OPTIONS = [
    {
      label: '+45 minutes',
      value: 45 * 60 * 1000,
      toMilliseconds: function(value) {
        console.log('[TimePicker] +45 mins custom option: ', value);
        return currentTimeOfDayMillis() + value;
      }
    },
    {
      label: '+1 hour',
      value: 1 * 60 * 60 * 1000,
      toMilliseconds: function(value) {
        console.log('[TimePicker] +1 hour custom option: ', value);
        return currentTimeOfDayMillis() + value;
      }
    }
  ];
  var RESTRICTED_TIMES = [
    '8:00',
    '12:30:07',
    '2:13',
    '22:00'
  ];

  timePicker.addEventListener('forge-time-picker-change', function(evt) {
    console.log('[TimePicker] change', evt.detail);
    modelValueElement.textContent = evt.detail || 'null';
  });
  timePicker.addEventListener('forge-time-picker-input', function(evt) {
    inputValueElement.textContent = timePickerInput.value || '""';
  });

  use24HourTimeCheckbox.addEventListener('change', function() {
    timePicker.use24HourTime = use24HourTimeCheckbox.checked;
  });
  showSecondsCheckbox.addEventListener('change', function() {
    timePicker.allowSeconds = showSecondsCheckbox.checked;
  });
  maskedCheckbox.addEventListener('change', function() {
    timePicker.masked = maskedCheckbox.checked;
  });
  showMaskFormatCheckbox.addEventListener('change', function() {
    timePicker.showMaskFormat = showMaskFormatCheckbox.checked;
  });
  showNowCheckbox.addEventListener('change', function() {
    timePicker.showNow = showNowCheckbox.checked;
  });
  showHourOptionsCheckbox.addEventListener('change', function() {
    timePicker.showHourOptions = showHourOptionsCheckbox.checked;
  });
  useCustomOptionsCheckbox.addEventListener('change', function() {
    timePicker.customOptions = useCustomOptionsCheckbox.checked ? CUSTOM_OPTIONS : [];
  });
  useCustomCallbacksCheckbox.addEventListener('change', function() {
    timePicker.validationCallback = useCustomCallbacksCheckbox.checked ? validationCallback : null;
    timePicker.parseCallback = useCustomCallbacksCheckbox.checked ? parseCallback : null;
    timePicker.formatCallback = useCustomCallbacksCheckbox.checked ? formatCallback : null;
  });
  allowDropdownCheckbox.addEventListener('change', function() {
    timePicker.allowDropdown = allowDropdownCheckbox.checked;
  });
  allowInputCheckbox.addEventListener('change', function() {
    timePicker.allowInput = allowInputCheckbox.checked;
  });
  allowInvalidTimeCheckbox.addEventListener('change', function() {
    timePicker.allowInvalidTime = allowInvalidTimeCheckbox.checked;
  });
  useRestrictedTimesCheckbox.addEventListener('change', function() {
    timePicker.restrictedTimes = useRestrictedTimesCheckbox.checked ? RESTRICTED_TIMES : [];
  });
  useCoercionCallbackCheckbox.addEventListener('change', function() {
    timePicker.coercionCallback = useCoercionCallbackCheckbox.checked ? coercionCallback : undefined;
  });
  disabledCheckbox.addEventListener('change', function() {
    timePicker.disabled = disabledCheckbox.checked;
  });
  valueTimePicker.addEventListener('forge-time-picker-change', function(evt) {
    timePicker.value = evt.detail;
    modelValueElement.textContent = timePicker.value;
  });
  minTimePicker.addEventListener('forge-time-picker-change', function(evt) {
    timePicker.min = evt.detail;
  });
  maxTimePicker.addEventListener('forge-time-picker-change', function(evt) {
    timePicker.max = evt.detail;
  });
  startTimePicker.addEventListener('forge-time-picker-change', function(evt) {
    timePicker.startTime = evt.detail;
  });

  function validationCallback(value) {
    return /[1-9]/.test(value);
  }

  function parseCallback(value) {
    if (!value || !value.length) {
      return null;
    }
    return +(value[0]) * 60 * 60 * 1000;
  }

  function formatCallback(value, use24HourTime, allowSeconds) {
    var hours = value / (1000 * 60 * 60);
    return String(hours)[0] + ' hours';
  }

  function coercionCallback(rawValue, coercedValue, allowSeconds) {
    // Capturing a special case that we'd like to coerce values to
    if (rawValue === '120' || rawValue === '12:0') {
      const result = '01:20';
      if (allowSeconds) {
        result += ':00';
      }
      return result;
    }
    return coercedValue;
  }

  function currentTimeOfDayMillis() {
    var date = new Date();
    var hourMillis = date.getHours() * 60 * 60 * 1000;
    var minuteMillis = date.getMinutes() * 60 * 1000;
    var secondMillis = showSecondsCheckbox.checked ? date.getSeconds() * 1000 : 0;
    return hourMillis + minuteMillis + secondMillis;
  }
})();