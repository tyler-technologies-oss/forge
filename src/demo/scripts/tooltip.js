(function() {
  var tooltipExample = document.querySelector('#Tooltip');
  var tooltip = tooltipExample.querySelector('#the-tooltip');

  tooltip.textContent = 'Hey I\'m useful tooltip text';  

  var textInput = tooltipExample.querySelector('#tooltip-text');
  var delayInput = tooltipExample.querySelector('#tooltip-delay');
  var positionSelect = tooltipExample.querySelector('#tooltip-position');
  var useBuilderCheckbox = tooltipExample.querySelector('#tooltip-builder');

  textInput.value = tooltip.textContent;
  textInput.addEventListener('input', function(evt) { 
    tooltip.textContent = textInput.value;
  });

  delayInput.value = tooltip.delay;
  delayInput.addEventListener('input', function(evt) {
    tooltip.delay = delayInput.value || 0;
  });

  positionSelect.value = 'right';
  positionSelect.addEventListener('change', function() {
    tooltip.position = positionSelect.value;
  });

  useBuilderCheckbox.checked = false;
  useBuilderCheckbox.addEventListener('change', function() {
    tooltip.builder = useBuilderCheckbox.checked ? tooltipBuilder : undefined;
  });

  function tooltipBuilder() {
    const avatar = document.createElement('forge-avatar');
    avatar.letterCount = 1;
    avatar.text = 'Tyler Technologies';
    return avatar;
  };
})();