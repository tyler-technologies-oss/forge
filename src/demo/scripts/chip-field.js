(function () {
  var example = document.querySelector('#ChipField');

  //
  // Simple example
  //

  var simpleExampleIds = [
    '#chip-field-element-default',
    '#chip-field-element-default-leading',
    '#chip-field-element-default-trailing',
    '#chip-field-element-default-add-on',
    '#chip-field-element-default-leading-trailing',
    '#chip-field-element-default-leading-add-on',

    '#chip-field-element-dense',
    '#chip-field-element-dense-leading',
    '#chip-field-element-dense-trailing',
    '#chip-field-element-dense-add-on',
    '#chip-field-element-dense-leading-trailing',
    '#chip-field-element-dense-leading-add-on',

    '#chip-field-element-shape-rounded',
    '#chip-field-element-shape-rounded-leading',
    '#chip-field-element-shape-rounded-trailing',
    '#chip-field-element-shape-rounded-add-on',
    '#chip-field-element-shape-rounded-leading-trailing',
    '#chip-field-element-shape-rounded-leading-add-on',

    '#chip-field-element-shape-rounded-dense',
    '#chip-field-element-shape-rounded-dense-leading',
    '#chip-field-element-shape-rounded-dense-trailing',
    '#chip-field-element-shape-rounded-dense-add-on',
    '#chip-field-element-shape-rounded-dense-leading-trailing',
    '#chip-field-element-shape-rounded-dense-leading-add-on',

    '#chip-field-addon-end',
    '#chip-field-long-label',
    '#chip-field-roomy',
    '#chip-field-dense',
    '#chip-field-dense-no-label',
    '#chip-field-invalid',
    '#chip-field-disabled',
    '#chip-field-disabled-with-data',
    '#chip-field-helper',
    '#chip-field-placeholder',
    '#chip-field-always-float',
    '#chip-field-leading-icon',
    '#chip-field-trailing-icon',
    '#chip-field-rounded',
    '#chip-field-rounded-leading',
    '#chip-field-rounded-trailing',
    '#chip-field-rounded-leading-trailing',
    '#chip-field-textarea',
    '#chip-field-textarea-disabled',
    '#chip-field-textarea-disabled-with-data',
    '#chip-field-textarea-disabled-scroll-with-data',
  ];
  
  var simpleChipFields = simpleExampleIds.map(id => example.querySelector(id));
  simpleChipFields.forEach(el => {
    el.addEventListener('forge-chip-field-member-added', evt => onAddMemberEvent_simple(evt, el));
    el.addEventListener('forge-chip-field-member-removed', onRemoveMemberEvent_simple)
  });

  function onAddMemberEvent_simple(event, chipFieldElement) {
    const name = event.detail;
    const newChip = document.createElement('forge-chip');
    newChip.setAttribute('slot', 'member');
    newChip.setAttribute('type', 'field');
    newChip.setAttribute('dense', '');
    newChip.addEventListener('forge-chip-delete', onRemoveMemberEventByRemoveButton_simple);
    newChip.value = name;
    newChip.textContent = name;

    chipFieldElement.appendChild(newChip);
  };

  function onRemoveMemberEvent_simple(evt) {
    evt.detail.parentNode.removeChild(evt.detail);
  }

  function onRemoveMemberEventByRemoveButton_simple(event) {
    if (event.target.disabled) {
      return;
    }

    event.target.parentNode.removeChild(event.target);
  }

  //
  // Auto complete example
  //

  var chipField = example.querySelector('#auto-complete-chip-field-element');
  var chipFieldInput = example.querySelector('#autocomplete-chip-field-input');
  var requiredCheckbox = example.querySelector('#required-chip-field');
  var invalidCheckbox = example.querySelector('#invalid-chip-field');
  var disabledCheckbox = example.querySelector('#disabled-chip-field');
  var denseCheckbox = example.querySelector('#dense-chip-field');
  var aBunchButton = example.querySelector('#chip-field-bunch-btn');
  var clearButton = example.querySelector('#chip-field-clear-btn');
  var autocompleteComponent = example.querySelector('#autocomplete-chip-field');

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

  autocompleteComponent.filter = filterOptions;
  autocompleteComponent.options = data;
  autocompleteComponent.addEventListener('forge-autocomplete-change', updateSelection);

  function filterOptions(filter, value) {
    var options = executeFilter(filter);
    return options;
  }

  function executeFilter(filter) {
    var filteredData = data.filter(function (item) {
      return item.label.toLowerCase().includes(filter.toLowerCase());
    });

    return filteredData;
  }

  function updateSelection(evt) {
    var currentValues = Array.from(chipField.querySelectorAll('forge-chip')).map(function (x) { return x.value });
    var newValues = evt.detail;

    var valuesToAdd = newValues.filter(function (x) { return !currentValues.includes(x) });
    var valuesToRemove = currentValues.filter(function (x) { return !newValues.includes(x) });

    valuesToRemove.forEach(removeMember);
    valuesToAdd.forEach(addMember);
  }

  requiredCheckbox.addEventListener('change', updateRequiredState);
  invalidCheckbox.addEventListener('change', updateInvalidState);
  disabledCheckbox.addEventListener('change', updateDisabledState);
  denseCheckbox.addEventListener('change', updateDenseState);
  aBunchButton.addEventListener('click', addABunchOfMembers);
  clearButton.addEventListener('click', removeAllMembers);

  chipField.addEventListener('forge-chip-field-member-added', onAddMemberEvent);
  chipField.addEventListener('forge-chip-field-member-removed', onRemoveMember);

  function onAddMemberEvent(event) {
    if (!data.includes(function (x) { return x.value === event.detail })) {
      return;
    }

    addMember(event.detail);
  };

  function onRemoveMember(evt) {
    removeMember(evt.detail.value)
  }

  function onRemoveMemberEvent(event) {
    if (event.target.disabled) {
      return;
    }

    removeMember(event.target.value)
  }

  function addAutocompleteMember(value) {
    if (!autocompleteComponent) {
      return;
    }

    if (!autocompleteComponent.value) {
      autocompleteComponent.value = [];
    }

    const selectedOptions = autocompleteComponent.value;
    if (selectedOptions.includes(value)) {
      return;
    }

    selectedOptions.push(value);
    autocompleteComponent.value = selectedOptions;
  }

  function addChipFieldMember(name) {
    var existingValues = Array.from(chipField.querySelectorAll('forge-chip')).map(function (x) { return x.value });
    if (existingValues.includes(name)) {
      return;
    }

    const newChip = document.createElement('forge-chip');
    newChip.setAttribute('slot', 'member');
    newChip.setAttribute('type', 'field');
    if (denseCheckbox.checked) {
      newChip.setAttribute('dense', '');
    }

    if (invalidCheckbox.checked) {
      newChip.setAttribute('invalid', '');
    }

    newChip.addEventListener('forge-chip-delete', onRemoveMemberEvent);
    newChip.value = name;
    newChip.textContent = name;

    const icon = document.createElement('i');
    icon.classList.add('tyler-icons');
    icon.setAttribute('slot', 'leading');
    icon.innerHTML = 'place';

    newChip.appendChild(icon);
    chipField.appendChild(newChip);
  }

  function addMember(name) {
    addChipFieldMember(name);
    addAutocompleteMember(name);
  }

  function removeAutocompleteMember(value) {
    if (!autocompleteComponent) {
      return;
    }

    if (!autocompleteComponent.value) {
      autocompleteComponent.value = [];
    }

    const selectedOptions = autocompleteComponent.value;
    const index = selectedOptions.indexOf(value);
    if (index < 0) {
      return;
    }

    selectedOptions.splice(index, 1);
    autocompleteComponent.value = selectedOptions;
  }

  function removeChipFieldMember(name) {
    var elementToRemove = Array.from(chipField.querySelectorAll('forge-chip')).find(function (x) { return x.value === name });
    if (elementToRemove) {
      elementToRemove.parentNode.removeChild(elementToRemove);
    }
  }

  function removeMember(name) {
    removeChipFieldMember(name);
    removeAutocompleteMember(name);
  }

  function populateMembers(numberOfMembers) {
    removeAllMembers();
    let count = 0;
    while (count < numberOfMembers) {
      addMember(data[count].value);
      count++;
    }

    setChipsDisabledState(chipFieldInput.disabled);
  }

  function removeAllMembers() {
    autocompleteComponent.value = [];
    chipField.querySelectorAll('forge-chip').forEach(function (x) { x.parentNode.removeChild(x) });
  }

  function updateRequiredState(event) {
    chipField.required = event.target.checked;
  }

  function updateInvalidState(event) {
    const isInvalid = event.target.checked;
    chipField.invalid = isInvalid;
    const chips = chipField.querySelectorAll('forge-chip');
    chips.forEach(function (x) { x.invalid = isInvalid });
  }

  function updateDisabledState(event) {
    chipFieldInput.disabled = event.target.checked;
    setChipsDisabledState(chipFieldInput.disabled);
  }

  function updateDenseState(event) {
    setChipsDenseState(event.target.checked);
  }

  function setChipsDisabledState(isDisabled) {
    const chips = chipField.querySelectorAll('forge-chip');
    chips.forEach(function (x) { x.disabled = isDisabled });
  }

  function setChipsDenseState(isDense) {
    const chips = chipField.querySelectorAll('forge-chip');
    chips.forEach(function (x) { x.dense = isDense });
  }

  function addABunchOfMembers() {
    populateMembers(45);
  }

  populateMembers(7);
})();
