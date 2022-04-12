(function () {
  var example = document.getElementById('DateRangePicker');
  var dateRangePicker = document.querySelector('forge-date-range-picker');
  var datePickerChangeStatusElement = example.querySelector('#date-range-picker-change-status');
  var dateRangePickerFromInputValueElement = example.querySelector('#date-range-picker-from-input-value');
  var dateRangePickerToInputValueElement = example.querySelector('#date-range-picker-to-input-value');
  var dateRangePickerFromInput = dateRangePicker.querySelectorAll('input')[0];
  var dateRangePickerToInput = dateRangePicker.querySelectorAll('input')[1];
  var dateRangePickerShowTodayCheckbox = example.querySelector('#date-range-picker-show-today-checkbox');
  var dateRangePickerShowClearCheckbox = example.querySelector('#date-range-picker-show-clear-checkbox');

  datePickerChangeStatusElement.textContent = 'null';

  dateRangePicker.addEventListener('forge-date-range-picker-change', function (evt) {
    datePickerChangeStatusElement.textContent = ((evt.detail && evt.detail.from) || 'null') + ' - ' + ((evt.detail && evt.detail.to) || 'null');
  });

  dateRangePickerFromInput.addEventListener('input', function (event) {
    dateRangePickerFromInputValueElement.textContent = dateRangePickerFromInput.value;
  });

  dateRangePickerToInput.addEventListener('input', function (event) {
    dateRangePickerToInputValueElement.textContent = dateRangePickerToInput.value;
  });

  dateRangePickerShowTodayCheckbox.checked = false;
  dateRangePickerShowTodayCheckbox.addEventListener('change', function(evt) {
    dateRangePicker.showToday = dateRangePickerShowTodayCheckbox.checked;
  });

  dateRangePickerShowClearCheckbox.checked = false;
  dateRangePickerShowClearCheckbox.addEventListener('change', function(evt) {
    dateRangePicker.showClear = dateRangePickerShowClearCheckbox.checked;
  });
})();
