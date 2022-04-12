(function() {
  var example = document.querySelector('#Menu');
  var menu = example.querySelector('#forge-menu-example');
  var complexCheckbox = example.querySelector('#menu-complex-checkbox');
  var denseCheckbox = example.querySelector('#menu-dense-checkbox');
  var asyncCheckbox = example.querySelector('#menu-async-checkbox');
  var optionBuilderCheckbox = example.querySelector('#menu-option-builder');
  var persistentSelectionCheckbox = example.querySelector('#menu-allow-persistent-menu-item-selection-checkbox');
  var cancelSelectEventCheckbox = example.querySelector('#menu-cancel-select-event-checkbox');
  var setSelectedOptionButton = example.querySelector('#menu-set-selected-option-button');
  var selectedComplexOptionIndex = 4;
  var selectedComplexChildOptionIndex = 4;
  var selectedComplexGrandchildOptionIndex = 1;
  var selectedSimpleOptionIndex = 2;
  var complexOptions = [
    { value: 'back', label: 'Back', icon: 'arrow_back' },
    { value: 'forward', label: 'Forward', icon: 'arrow_forward', disabled: true },
    { value: 'reload', label: 'Reload', icon: 'loop' },
    { divider: true },
    { 
      value: { action: 'settings' },
      label: 'Settings',
      icon: 'settings',
      options: [
        { value: 'one', label: 'One'},
        { value: 'two', label: 'Two', disabled: true },
        { 
          value: 'three',
          label: 'Three',
          options: [
            { value: 'five', label: 'Five'},
            { value: 'six', label: 'Six'},
            { value: 'seven', label: 'Seven'},
          ]
        },
        { divider: true },
        { value: 'four', label: 'Four' }
      ]
    },
    { value: 'account', label: 'Account', icon: 'person' },
    { value: 'help', label: 'Help & Feedback', icon: 'help', options: [{ label: 'Test one', value: 'test-one' }, { label: 'Test two', value: 'test-two' }] }
  ];
  var simpleOptions = [
    { value: 'back', label: 'Back' },
    { value: 'forward', label: 'Forward' },
    { value: 'reload', label: 'Reload' },
    { value: 'help', label: 'Help & Feedback' },
    { value: 'settings', label: 'Settings' }
  ];

  menu.options = simpleOptions;
  menu.placement = 'bottom-start';
  menu.addEventListener('forge-menu-select', function (evt) {
    if (cancelSelectEventCheckbox.checked) {
      evt.preventDefault();
    }
    console.log(evt.detail);
  });

  var menuPlacement = document.querySelector('#forge-menu-example-placement');
  if (menuPlacement) {
    menuPlacement.addEventListener('change', function () {
      menu.placement = menuPlacement.value;
    });
  }

  complexCheckbox.addEventListener('change', function(evt) {
    setOptions();
  });
  denseCheckbox.addEventListener('change', function(evt) {
    menu.dense = denseCheckbox.checked ? true : false;
  });
  asyncCheckbox.addEventListener('change', function(evt) {
    if (asyncCheckbox.checked) {
      menu.options = asyncOptions;
    } else {
      menu.options = complexCheckbox.checked ? complexOptions : simpleOptions;
    }
  });
  optionBuilderCheckbox.addEventListener('change', function(evt) {
    menu.optionBuilder = optionBuilderCheckbox.checked ? optionBuilderCallback : undefined;
  });

  persistentSelectionCheckbox.addEventListener('change', function(evt) {
    menu.persistSelection = persistentSelectionCheckbox.checked;
    setSelectedOptionButton.disabled = !persistentSelectionCheckbox.checked;
  });

  setSelectedOptionButton.addEventListener('click', function(evt) {
    complexOptions.forEach(function(option) { option.selected = false; });
    simpleOptions.forEach(function(option) { option.selected = false; });
    complexOptions[selectedComplexOptionIndex].selected = true;
    var firstParent = complexOptions.find(x => x.options?.length > 0);
    firstParent.options[selectedComplexChildOptionIndex].selected = true;
    var firstSubParent = firstParent.options.find(x => x.options?.length > 0);
    firstSubParent.options[selectedComplexGrandchildOptionIndex].selected = true;
    simpleOptions[selectedSimpleOptionIndex].selected = true;
    setOptions();
  });

  function setOptions() {
    if (!asyncCheckbox.checked) {
      menu.options = complexCheckbox.checked ? complexOptions : simpleOptions;
    }
  }

  function asyncOptions() {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(complexCheckbox.checked ? complexOptions : simpleOptions);
      }, randomTimeout(250, 1500));
    });
  }

  function randomTimeout(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function optionBuilderCallback(option, listItem) {
    var div = document.createElement('div');

    var prefixSpan = document.createElement('span');
    prefixSpan.style.fontWeight = 'bold';
    prefixSpan.textContent = 'Custom option: ';
    div.appendChild(prefixSpan);
    
    var labelSpan = document.createElement('span');
    labelSpan.style.fontStyle = 'italic';
    labelSpan.textContent = option.label;
    div.appendChild(labelSpan);

    return div;
  }
})();
