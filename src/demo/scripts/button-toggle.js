(function() {
  var example = document.querySelector('#ButtonToggle');
  var defaultGroup = example.querySelector('#button-toggle-group');
  var dynamicGroup = example.querySelector('#button-toggle-group-dynamic');
  var multipleCheckbox = example.querySelector('#button-toggle-multiple');
  var mandatoryCheckbox = example.querySelector('#button-toggle-mandatory');
  var verticalCheckbox = example.querySelector('#button-toggle-vertical');
  var stretchCheckbox = example.querySelector('#button-toggle-stretch');
  var denseCheckbox = example.querySelector('#button-toggle-dense');
  var disabledCheckbox = example.querySelector('#button-toggle-disabled');

  dynamicGroup.options = [
    { label: 'Left', value: 'left', leadingIcon: 'star' },
    { label: 'Middle', value: 'middle', leadingIcon: 'favorite' },
    { label: 'Right', value: 'right', trailingIcon: 'person' }
  ];
  
  defaultGroup.addEventListener('forge-button-toggle-group-change', function(evt) {
    console.log('[forge-button-toggle-group-change]', evt.detail);
  });
  defaultGroup.addEventListener('forge-button-toggle-select', function(evt) {
    console.log('[forge-button-toggle-select]', evt.detail);
  });

  dynamicGroup.addEventListener('forge-button-toggle-group-change', function(evt) {
    console.log('[forge-button-toggle-group-change][dynamic]', evt.detail);
  });
  dynamicGroup.addEventListener('forge-button-toggle-select', function(evt) {
    console.log('[forge-button-toggle-select][dynamic]', evt.detail);
  });

  multipleCheckbox.addEventListener('change', function(evt) {
    defaultGroup.multiple = evt.target.checked;
    dynamicGroup.multiple = evt.target.checked;
  });

  mandatoryCheckbox.addEventListener('change', function(evt) {
    defaultGroup.mandatory = evt.target.checked;
    dynamicGroup.mandatory = evt.target.checked;
  });

  verticalCheckbox.addEventListener('change', function(evt) {
    defaultGroup.vertical = evt.target.checked;
    dynamicGroup.vertical = evt.target.checked;
  });

  stretchCheckbox.addEventListener('change', function(evt) {
    defaultGroup.stretch = evt.target.checked;
    dynamicGroup.stretch = evt.target.checked;
  });

  denseCheckbox.addEventListener('change', function(evt) {
    defaultGroup.dense = evt.target.checked;
    dynamicGroup.dense = evt.target.checked;
  });

  disabledCheckbox.addEventListener('change', function(evt) {
    defaultGroup.disabled = evt.target.checked;
    dynamicGroup.disabled = evt.target.checked;
  });
})();
