(function() {
  var example = document.querySelector('#Chips');
  var chipsDenseCheckbox = example.querySelector('#chips-dense');
  var chipsDisabledCheckbox = example.querySelector('#chips-disabled');

  // Action example
  var actionExample = example.querySelector('#chips-action');
  var actionChipSet = actionExample.querySelector('forge-chip-set');
  actionChipSet.addEventListener('forge-chip-select', function(evt) {
    showToast('Action Chip Selected: ' + evt.detail.value);
  });

  // Input example
  var deletedChips = [];
  var inputExample = example.querySelector('#chips-input');  
  var inputChipSet = inputExample.querySelector('forge-chip-set[type=input]');
  inputChipSet.addEventListener('forge-chip-delete', function(evt) {
    deletedChips.push(evt.target);
    evt.target.parentElement.removeChild(evt.target);
  });
  var refreshButton = inputExample.querySelector('forge-icon-button > button');
  refreshButton.addEventListener('click', function() {
    deletedChips.forEach(function(chip) {
      inputChipSet.appendChild(chip);
    });
    deletedChips = [];
  });

  // Dense toggling
  chipsDenseCheckbox.addEventListener('change', function(evt) {
    var chipSets = example.querySelectorAll('forge-chip-set');
    for (var i = 0; i < chipSets.length; i++) {
      chipSets[i].dense = evt.target.checked;
    }
  });

  // Disabled toggling
  chipsDisabledCheckbox.addEventListener('change', function(evt) {
    var chipSets = example.querySelectorAll('forge-chip-set');
    for (var i = 0; i < chipSets.length; i++) {
      chipSets[i].disabled = evt.target.checked;
    }
  });

  function showToast(msg) {
    var toast = document.createElement('forge-toast');
    toast.duration = 1500;
    toast.message = msg;
    document.body.appendChild(toast);
  }
})();
