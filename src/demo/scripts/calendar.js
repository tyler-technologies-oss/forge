(function() {
  var example = document.querySelector('#Calendar');
  var calendar = example.querySelector('forge-calendar');
  var keyHandlerButton = example.querySelector('#key-handler');
  var todayCheckbox = example.querySelector('#calendar-today');
  var otherMonthsCheckbox = example.querySelector('#calendar-other-months');
  var readonlyCheckbox = example.querySelector('#calendar-readonly');
  var showHeaderCheckbox = example.querySelector('#calendar-show-header');
  var clearButtonCheckbox = example.querySelector('#calendar-clear-button');
  var todayButtonCheckbox = example.querySelector('#calendar-today-button');
  var fixedHeightCheckbox = example.querySelector('#calendar-fixed-height');
  var eventsCheckbox = example.querySelector('#calendar-events');
  var modeSelect = example.querySelector('#calendar-mode');
  var singleDateRangeCheckbox = example.querySelector('#calendar-single-date-range');
  var firstDaySelect = example.querySelector('#calendar-first-day');
  var localeTextField = example.querySelector('#calendar-locale');
  var weekendTextField = example.querySelector('#calendar-weekend');
  var keyHandlerCheckbox = example.querySelector('#calendar-key-handler');
  var preventFocusCheckbox = example.querySelector('#calendar-prevent-focus');
  var minTextField = example.querySelector('#calendar-min');
  var maxTextField = example.querySelector('#calendar-max');
  var yearRangeTextField = example.querySelector('#calendar-year-range');
  var constrainNavCheckbox = example.querySelector('#calendar-constrain-nav');
  var listYearsCheckbox = example.querySelector('#calendar-list-years');
  var widthTextField = example.querySelector('#calendar-width');
  var testDisabledCheckbox = example.querySelector('#calendar-test-disabled');
  
  todayCheckbox.checked = calendar.showToday;
  todayCheckbox.addEventListener('change', function() {
      calendar.showToday = todayCheckbox.checked;
  });

  otherMonthsCheckbox.checked = calendar.showOtherMonths;
  otherMonthsCheckbox.addEventListener('change', function() {
      calendar.showOtherMonths = otherMonthsCheckbox.checked;
  });
  
  readonlyCheckbox.checked = calendar.readonly;
  readonlyCheckbox.addEventListener('change', function() {
    calendar.readonly = readonlyCheckbox.checked;
  });

  showHeaderCheckbox.checked = calendar.showHeader;
  showHeaderCheckbox.addEventListener('change', function() {
      calendar.showHeader = showHeaderCheckbox.checked;
  });

  clearButtonCheckbox.checked = calendar.clearButton;
  clearButtonCheckbox.addEventListener('change', function() {
      calendar.clearButton = clearButtonCheckbox.checked;
  });

  todayButtonCheckbox.checked = calendar.todayButton;
  todayButtonCheckbox.addEventListener('change', function() {
      calendar.todayButton = todayButtonCheckbox.checked;
  });

  fixedHeightCheckbox.checked = calendar.fixedHeight;
  fixedHeightCheckbox.addEventListener('change', function() {
      calendar.fixedHeight = fixedHeightCheckbox.checked;
  });

  singleDateRangeCheckbox.checked = calendar.allowSingleDateRange;
  singleDateRangeCheckbox.addEventListener('change', function() {
      calendar.allowSingleDateRange = singleDateRangeCheckbox.checked;
  });

  modeSelect.addEventListener('change', function (evt) {
    calendar.mode = evt.target.value;
  });

  firstDaySelect.addEventListener('change', function (evt) {
    calendar.firstDayOfWeek = +evt.target.value;
  });

  localeTextField.value = calendar.locale ?? '';
  localeTextField.addEventListener('change', function() {
      calendar.locale = localeTextField.value;
  });

  weekendTextField.value = calendar.weekendDays?.toString() ?? '';
  weekendTextField.addEventListener('change', function() {
      if (weekendTextField.value?.length) {
        let value = weekendTextField.value.split(',');
        value.map(v => +(v.trim()));
        calendar.weekendDays = value;
      } else {
        calendar.weekendDays = null;
      }
  });

  // calendar.disabledDates = [new Date('2/15/2022'), new Date('2/16/2022')];
  // calendar.disabledDaysOfWeek = [0, 6];
  // calendar.min = -5;
  // calendar.maxD = new Date('2/23/2022');

  // calendar.disabledDateBuilder =() => Math.floor(Math.random() * 3) < 2;

  // calendar.dayBuilder = (day, el) => {
  //   el.textContent = el.textContent.toUpperCase();
  //   return el;
  // };

  // calendar.dateBuilder = (date, el) => {
  //   console.log(date);
  //   el.firstElementChild.textContent = 'hw';
  //   return el;
  // }

  var eventBasePalette = {
    blue: 'blue',
    lightGreen: 'light-green',
    cyan: 'cyan',
    teal: 'teal',
    orange: 'orange',
    blueGrey: 'blue-grey',
    grey: 'grey'
  }

  eventsCheckbox.checked = false;
  eventsCheckbox.addEventListener('change', function() {
    if (eventsCheckbox.checked === false) {
      calendar.eventBuilder = null;
    } else {
      calendar.eventBuilder = (date) => {
        var numberOfEvents = Math.floor(Math.random() * 5);
        var events = [];
        for (var i = 1; i <= numberOfEvents; i++) {
          var colorKeys = Object.keys(eventBasePalette);
          var colorIndex = Math.floor(Math.random() * colorKeys.length);
          var color = eventBasePalette[colorKeys[colorIndex]];
          events.push({date, label: `Event ${i}`, color});
        }
        return events;
      }
    }
  });

  keyHandlerButton.addEventListener('keydown', function(evt) {
    calendar.handleKey(evt);
  });

  keyHandlerCheckbox.checked = false;
  keyHandlerCheckbox.addEventListener('change', function() {
    console.log(keyHandlerButton);
    keyHandlerButton.parentElement.style.setProperty('display', keyHandlerCheckbox.checked ? 'block' : 'none');
  })

  preventFocusCheckbox.checked = calendar.preventFocus;
  preventFocusCheckbox.addEventListener('change', function() {
    calendar.preventFocus = preventFocusCheckbox.checked;
  });

  minTextField.value = calendar.min?.toDateString() ?? '';
  minTextField.addEventListener('change', function() {
    calendar.min = minTextField.value;
  });
  
  maxTextField.value = calendar.max?.toDateString() ?? '';
  maxTextField.addEventListener('change', function() {
    calendar.max = maxTextField.value;
  });

  yearRangeTextField.value = calendar.yearRange ?? '';
  yearRangeTextField.addEventListener('change', function() {
    calendar.yearRange = yearRangeTextField.value;
  });

  constrainNavCheckbox.checked = calendar.constrainToEnabled;
  constrainNavCheckbox.addEventListener('change', function() {
    calendar.constrainToEnabled = constrainNavCheckbox.checked;
  });

  listYearsCheckbox.checked = calendar.listYears;
  listYearsCheckbox.addEventListener('change', function() {
    calendar.listYears = listYearsCheckbox.checked;
  });

  widthTextField.value = '400px';
  widthTextField.addEventListener('change', function() {
    calendar.style.setProperty('--calendar-width', widthTextField.value);
  });

  testDisabledCheckbox.checked = !!calendar.disabledDateBuilder;
  testDisabledCheckbox.addEventListener('change', function() {
    if (testDisabledCheckbox.checked) {
      calendar.disabledDateBuilder = date => date.getDate() % 2 === 0;
    } else {
      calendar.disabledDateBuilder = undefined;
    }
  })

  // calendar.addEventListener('forge-calendar-date-select', function (evt) {
  //   console.log(evt.detail);
  // });

  // calendar.addEventListener('forge-calendar-month-change', function (evt) {
  //   console.log(evt.detail);
  // });

  // calendar.addEventListener('forge-calendar-view-change', function (evt) {
  //   console.log(evt.detail);
  // });

  // calendar.addEventListener('forge-calendar-focus-change', function(evt) {
  //   console.log(evt.detail);
  // });
})();