(function() {
  var example = document.getElementById('Autocomplete');
  var autocompleteComponent = example.querySelector('#autocomplete-default');
  var autocompleteMultipleComponent = example.querySelector('#autocomplete-multiple');
  var debounceThresholdInput = example.querySelector('#autocomplete-debounce');
  var optionLimitInput = example.querySelector('#autocomplete-option-limit');
  var filterOnFocusCheckbox = example.querySelector('#autocomplete-filter-on-focus');
  var itemBuilderCheckbox = example.querySelector('#autocomplete-item-builder');
  var simulateAsyncCheckbox = example.querySelector('#autocomplete-simulate-async');
  var groupCheckbox = example.querySelector('#autocomplete-group');
  var groupHeaderBuilderCheckbox = example.querySelector('#autocomplete-group-header-builder');
  var allowUnmatchedCheckbox = example.querySelector('#autocomplete-allow-unmatched');
  var selectedTextBuilderCheckbox = example.querySelector('#autocomplete-selected-text-builder');
  var scrollObserverCheckbox = example.querySelector('#autocomplete-scroll-observer');
  var syncPopupWidthCheckbox = example.querySelector('#autocomplete-sync-popup-width');
  var headerBuilderCheckbox = example.querySelector('#autocomplete-header-builder');
  var footerBuilderCheckbox = example.querySelector('#autocomplete-footer-builder');
  var valueContainer = example.querySelector('#autocomplete-value');
  var autocompleteModeSelect = example.querySelector('#autocomplete-mode');
  var asyncFilter = true;
  var useGroupedData = false;
  var useGroupHeaderBuilder = false;
  var filterCache = new Map();
  var data = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Lousiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' }
  ];

  debounceThresholdInput.value = 500;
  debounceThresholdInput.addEventListener('input', function(evt) {
    autocompleteComponent.debounce = +evt.target.value;
    autocompleteMultipleComponent.debounce = +evt.target.value;
  });

  autocompleteModeSelect.value = 'default';
  autocompleteModeSelect.addEventListener('change', function(evt) {
    autocompleteComponent.mode = evt.detail;
    autocompleteMultipleComponent.mode = evt.detail;
  });

  optionLimitInput.value = '0';
  optionLimitInput.addEventListener('input', function(evt) {
    autocompleteComponent.optionLimit = +evt.target.value;
    autocompleteMultipleComponent.optionLimit = +evt.target.value;
  });

  filterOnFocusCheckbox.checked = true;
  filterOnFocusCheckbox.addEventListener('change', function(evt) {
    autocompleteComponent.filterOnFocus = evt.target.checked;
    autocompleteMultipleComponent.filterOnFocus = evt.target.checked;
  });

  itemBuilderCheckbox.checked = false;
  itemBuilderCheckbox.addEventListener('change', function(evt) {
    var builder = evt.target.checked ? itemBuilder : undefined;
    autocompleteComponent.optionBuilder = builder;
    autocompleteMultipleComponent.optionBuilder = builder;
  });

  simulateAsyncCheckbox.checked = asyncFilter;
  simulateAsyncCheckbox.addEventListener('change', function(evt) {
    asyncFilter = evt.target.checked;
  });

  groupCheckbox.checked = false;
  groupCheckbox.addEventListener('change', function(evt) {
    useGroupedData = evt.target.checked;
  });

  groupHeaderBuilderCheckbox.checked = false;
  groupHeaderBuilderCheckbox.addEventListener('change', function(evt) {
    useGroupHeaderBuilder = evt.target.checked;
  });

  allowUnmatchedCheckbox.checked = false;
  allowUnmatchedCheckbox.addEventListener('change', function(evt) {
    autocompleteComponent.allowUnmatched = allowUnmatchedCheckbox.checked;
    autocompleteMultipleComponent.allowUnmatched = allowUnmatchedCheckbox.checked;
  });

  selectedTextBuilderCheckbox.checked = false;
  selectedTextBuilderCheckbox.addEventListener('change', function(evt) {
    var builder = evt.target.checked ? selectedTextBuilder : undefined;
    autocompleteComponent.selectedTextBuilder = builder;
    autocompleteMultipleComponent.selectedTextBuilder = builder;
  });

  scrollObserverCheckbox.checked = false;
  scrollObserverCheckbox.addEventListener('change', function(evt) {
    autocompleteComponent.observeScroll = evt.target.checked;
    autocompleteMultipleComponent.observeScroll = evt.target.checked;
  });

  syncPopupWidthCheckbox.checked = false;
  syncPopupWidthCheckbox.addEventListener('change', function(evt) {
    autocompleteComponent.syncPopupWidth = evt.target.checked;
    autocompleteMultipleComponent.syncPopupWidth = evt.target.checked;
  });

  headerBuilderCheckbox.checked = false;
  headerBuilderCheckbox.addEventListener('change', function(evt) {
    autocompleteComponent.popupHeaderBuilder = evt.target.checked ? headerBuilderCallback : undefined;
    autocompleteMultipleComponent.popupHeaderBuilder = evt.target.checked ? headerBuilderCallback : undefined;
  });

  footerBuilderCheckbox.checked = false;
  footerBuilderCheckbox.addEventListener('change', function(evt) {
    autocompleteComponent.popupFooterBuilder = evt.target.checked ? footerBuilderCallback : undefined;
    autocompleteMultipleComponent.popupFooterBuilder = evt.target.checked ? footerBuilderCallback : undefined;
  });

  autocompleteComponent.filter = filterOptions;
  autocompleteMultipleComponent.filter = filterOptions;

  autocompleteComponent.options = data;
  autocompleteMultipleComponent.options = data;

  autocompleteComponent.addEventListener('forge-autocomplete-change', function(evt) {
    console.log('forge-autocomplete-change:', evt.detail);
    valueContainer.textContent = evt.detail ? JSON.stringify(evt.detail, null, '  ') : 'No value selected';
  });
  autocompleteComponent.addEventListener('forge-autocomplete-select', function(evt) {
    console.log('forge-autocomplete-suggestion:', evt.detail.value);
    alert('You chose: ' + evt.detail.value);
  });
  autocompleteMultipleComponent.addEventListener('forge-autocomplete-change', function(evt) {
    console.log('forge-autocomplete-change [multiple]:', evt.detail);
    valueContainer.textContent = evt.detail ? JSON.stringify(evt.detail, null, '  ') : 'No value selected';
  });
  autocompleteMultipleComponent.addEventListener('forge-autocomplete-select', function(evt) {
    console.log('forge-autocomplete-suggestion [multiple]:', evt.detail.value);
  });
  autocompleteComponent.addEventListener('forge-autocomplete-scrolled-bottom', function() {
    console.log('forge-autocomplete-scrolled-bottom');
    const options = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' }
    ];
    autocompleteComponent.appendOptions(options);
  });
  autocompleteMultipleComponent.addEventListener('forge-autocomplete-scrolled-bottom', function() {
    console.log('forge-autocomplete-scrolled-bottom [multiple]');
    const options = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' }
    ];
    autocompleteMultipleComponent.appendOptions(options);
  });

  function itemBuilder(option, filterText, listItem) {
    var item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';

    var avatar = document.createElement('forge-avatar');
    avatar.style.fontSize = '12px';
    avatar.style.setProperty('--forge-avatar-font-size', '12px');
    avatar.text = option.value;
    avatar.style.marginRight = '8px';
    item.appendChild(avatar);

    var label = document.createElement('div');
    label.style.flex = '1';
    label.appendChild(highlightText(option, filterText));
    item.appendChild(label);

    return item;
  }

  function selectedTextBuilder(selectedOptions) {
    return selectedOptions.map(function (o) { return o.label }).join(', ');
  }

  function filterOptions(filter, value) {
    console.log('[autocomplete] filter:', filter || null, value);

    if (asyncFilter) {
      // Uncomment to simulate caching filter requests
      // var cachedData = filterCache.get(filter);
      // if (cachedData) {
      //   return useGroupedData ? groupOptions(cachedData) : cachedData;
      // }

      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          var options = executeFilter(filter);
          resolve(useGroupedData ? groupOptions(options) : options);
        }, randomTimeout(250, 1500));
      });
    }
    var options = executeFilter(filter);
    return useGroupedData ? groupOptions(options) : options;
  }

  function executeFilter(filter) {
    var filteredData = data.filter(function(item) {
      return item.label.toLowerCase().includes(filter.toLowerCase());
    });

    if (asyncFilter) {
      if (filterCache.size > 10) {
        Array.from(filterCache.keys())
          .filter(function(key) { return !!key; })
          .slice(0, 4)
          .forEach(function(key) {
            filterCache.delete(key);
          });
      }
      filterCache.set(filter, filteredData);
    } else {
      filterCache.clear();
    }

    return filteredData;
  }

  function groupOptions(options) {
    return options.reduce(function(prev, curr) {
      console.log(prev, curr);
      var firstChar = curr.label[0].toUpperCase();
      var existingGroup = prev.find(function(group) { return group.text === firstChar; });
      if (existingGroup) {
        existingGroup.options.push(curr);
      } else {
        var optionGroup = { text: firstChar, options: [curr] };
        if (useGroupHeaderBuilder) {
          optionGroup.builder = groupHeaderBuilder;
        }
        prev.push(optionGroup);
      }
      return prev;
    }, []);
  }

  function groupHeaderBuilder(group) {
    var div = document.createElement('div');
    var avatar = document.createElement('forge-avatar');
    avatar.text = group.text;
    avatar.style.fontSize = '12px';
    avatar.style.setProperty('--forge-avatar-font-size', '12px');
    div.appendChild(avatar);
    return div;
  }

  function highlightText(option, filterText) {
    var text = option.label.toLowerCase();
    var startIndex = text.indexOf(filterText.toLowerCase());
    var endIndex = startIndex + filterText.length;
    var span = document.createElement('span');
    span.innerHTML = option.label.substring(0, startIndex) + '<b>' + option.label.substring(startIndex, endIndex) + '</b>' + option.label.substring(endIndex);
    return span;
  }

  function randomTimeout(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function headerBuilderCallback() {
    const div = document.createElement('div');
    div.style.padding = '16px';
    div.style.display = 'flex';
    div.style.alignItems = 'center';

    const input = document.createElement('input');
    input.type = 'text';

    const textField = document.createElement('forge-text-field');
    textField.appendChild(input);

    const button = document.createElement('button');
    button.style.marginLeft = '8px';
    button.type = 'button';
    button.classList.add('tyler-icons');
    button.textContent = 'close';
    button.addEventListener('click', function() {
      autocompleteComponent.open = false;
      autocompleteMultipleComponent.open = false;
    });

    const iconButton = document.createElement('forge-icon-button');
    iconButton.appendChild(button);
    window.requestAnimationFrame(function() {
      iconButton.layout();
    });
    
    div.appendChild(textField);
    div.appendChild(iconButton);

    return div;
  }

  function footerBuilderCallback() {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.padding = '16px';

    const span = document.createElement('span');
    span.textContent = 'Footer element';
    div.appendChild(span);

    return div;
  }
})();