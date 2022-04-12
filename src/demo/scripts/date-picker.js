(function() {
  var example = document.getElementById('DatePicker');
  var datePicker = example.querySelector('forge-date-picker');
  var datePickerOpenButton = example.querySelector('#date-picker-open');
  var datePickerChangeStatusElement = example.querySelector('#date-picker-change-status');
  var datePickerInputValueElement = example.querySelector('#date-picker-input-value');
  var datePickerValueModeSelect = example.querySelector('#date-picker-value-mode-select');
  var datePickerDisableDaysOfWeekSelect = example.querySelector('#date-picker-disable-days-of-week-select');
  var datePickerDisabledCheckbox = example.querySelector('#date-picker-disabled-checkbox');
  var datePickerMinCheckbox = example.querySelector('#date-picker-min-checkbox');
  var datePickerMaxCheckbox = example.querySelector('#date-picker-max-checkbox');
  var datePickerDisabledCheckbox = example.querySelector('#date-picker-disabled-checkbox');
  var datePickerCustomCheckbox = example.querySelector('#date-picker-custom-checkbox');
  var datePickerMaskedCheckbox = example.querySelector('#date-picker-masked-checkbox');
  var datePickerShowMaskFormatCheckbox = example.querySelector('#date-picker-show-mask-format-checkbox');
  var datePickerAllowInvalidDateCheckbox = example.querySelector('#date-picker-allow-invalid-date-checkbox');
  var datePickerShowTodayCheckbox = example.querySelector('#date-picker-show-today-checkbox');
  var datePickerShowClearCheckbox = example.querySelector('#date-picker-show-clear-checkbox');
  var datePickerDisableCallbackCheckbox = example.querySelector('#date-picker-disabled-callback-checkbox');

  var datePickerInput = datePicker.querySelector('input');

  datePickerChangeStatusElement.textContent = 'null';

  datePickerValueModeSelect.value = 'object';
  datePickerValueModeSelect.addEventListener('change', function(evt) {
    datePicker.valueMode = datePickerValueModeSelect.value;
  });

  datePickerDisableDaysOfWeekSelect.addEventListener('change', function(evt) {
    datePicker.disabledDaysOfWeek = evt.detail;
  });

  datePickerDisabledCheckbox.checked = false;
  datePickerDisabledCheckbox.addEventListener('change', function(evt) {
    if (datePickerDisabledCheckbox.checked) {
      const currentDate = new Date();
      const prevDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
      const nextDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
      datePicker.disabledDates = [prevDay, nextDay];
    } else {
      datePicker.disabledDates = null;
    }
  });

  datePickerMinCheckbox.checked = false;
  datePickerMinCheckbox.addEventListener('change', function(evt) {
    datePicker.min = datePickerMinCheckbox.checked ? new Date() : null;
  });

  datePickerMaxCheckbox.checked = false;
  datePickerMaxCheckbox.addEventListener('change', function(evt) {
    datePicker.max = datePickerMaxCheckbox.checked ? new Date() : null;
  });

  datePickerDisabledCheckbox.checked = false;
  datePickerDisabledCheckbox.addEventListener('change', function(evt) {
    datePicker.disabled = datePickerDisabledCheckbox.checked;
  });

  datePickerCustomCheckbox.checked = false;
  datePickerCustomCheckbox.addEventListener('change', function(evt) {
    if (datePickerCustomCheckbox.checked) {
      datePickerInput.placeholder = 'yyyy-mm-dd';
      datePicker.maskFormat = 'YYYY-MM-DD';
      datePicker.formatCallback = function(date) {
        return date ? date.toISOString().split('T')[0] : null;
      };
      datePicker.parseCallback = function(str) {
        if (str) {
          const split = str.split('-');

          if (split.length !== 3) {
            return null;
          }

          const yyyy = +split[0];
          const mm = +split[1];
          const dd = split[2].indexOf('T') ? +(split[2].split('T')[0]) : +split[2];

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

  datePickerMaskedCheckbox.addEventListener('change', function(evt) {
    datePicker.masked = datePickerMaskedCheckbox.checked;
  });

  datePickerShowMaskFormatCheckbox.checked = false;
  datePickerShowMaskFormatCheckbox.addEventListener('change', function(evt) {
    datePicker.showMaskFormat = datePickerShowMaskFormatCheckbox.checked;
  });

  datePickerAllowInvalidDateCheckbox.checked = false;
  datePickerAllowInvalidDateCheckbox.addEventListener('change', function(evt) {
    datePicker.allowInvalidDate = datePickerAllowInvalidDateCheckbox.checked;
  });

  datePickerShowTodayCheckbox.checked = false;
  datePickerShowTodayCheckbox.addEventListener('change', function(evt) {
    datePicker.showToday = datePickerShowTodayCheckbox.checked;
  });

  datePickerShowClearCheckbox.checked = false;
  datePickerShowClearCheckbox.addEventListener('change', function(evt) {
    datePicker.showClear = datePickerShowClearCheckbox.checked;
  });

  datePickerDisableCallbackCheckbox.checked = false;
  datePickerDisableCallbackCheckbox.addEventListener('change', function(evt) {
    if (datePickerDisableCallbackCheckbox.checked) {
      datePicker.disableDayCallback = (date) => date.toLocaleDateString() === new Date().toLocaleDateString();
    } else {
      datePicker.disableDayCallback = null;
    }
  });

  datePickerOpenButton.addEventListener('click', function(evt) {
    datePicker.open = true;
    setTimeout(function() {
      datePicker.open = false;
    }, 5000);
  });

  datePicker.addEventListener('forge-date-picker-open', function(evt) {
    console.log('[date picker] opened');
  });

  datePicker.addEventListener('forge-date-picker-close', function(evt) {
    console.log('[date picker] closed');
  });

  datePicker.addEventListener('forge-date-picker-change', function(evt) {
    datePickerChangeStatusElement.textContent = evt.detail || 'null';
  });

  datePickerInput.addEventListener('input', function(evt) {
    datePickerInputValueElement.textContent = datePickerInput.value || "\"\"";
  });
})();