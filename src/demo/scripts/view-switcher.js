(function() {
  var example = document.getElementById('ViewSwitcher');
  var viewSwitcherComponent = example.querySelector('forge-view-switcher');
  var tabBarComponent = example.querySelector('forge-tab-bar');
  var typeRadioGroup = example.querySelector('[role=radiogroup]');
  var noneRadio = example.querySelector('#view-switcher-animation-type-none');
  noneRadio.checked = true;

  tabBarComponent.addEventListener('forge-tab-bar-activate', function(evt) {
    viewSwitcherComponent.index = evt.detail.index;
  });

  typeRadioGroup.addEventListener('change', function(evt) {
    viewSwitcherComponent.animationType = evt.target.value;
  });
})();