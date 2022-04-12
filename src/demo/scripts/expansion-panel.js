(function () {
  var expansionPanelExample = document.querySelector('#ExpansionPanel');

  var basicExpansionPanel = expansionPanelExample.querySelector('#expansion-panel-basic');
  var cardExpansionPanel = expansionPanelExample.querySelector('#expansion-panel-card');
  var useAnimationCheckbox = expansionPanelExample.querySelector('#expansion-panel-animation-checkbox');

  useAnimationCheckbox.checked = true;
  useAnimationCheckbox.addEventListener('change', function() {
    basicExpansionPanel.useAnimations = useAnimationCheckbox.checked;
    cardExpansionPanel.useAnimations = useAnimationCheckbox.checked;
  });
})();
