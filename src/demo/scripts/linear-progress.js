(function() {
  var example = document.querySelector('#LinearProgress');
  var linearProgress = example.querySelector('forge-linear-progress');
  var visibleCheckbox = example.querySelector('#linear-progress-visibility-checkbox');

  var modeSelect = example.querySelector('#progress-linear-mode');
  modeSelect.value = 'indeterminate';
  modeSelect.addEventListener('change', function(evt) {
    var value = evt.target.value;
    if (value === 'determinate' || value === 'indeterminate') {
      linearProgress.determinate = value === 'determinate';
      linearProgress.buffer = 1;

      if (value === 'indeterminate') {
        linearProgress.progress = 0;
      } else {
        linearProgress.progress = 0.25;
      }
    } else {
      linearProgress.determinate = true;
      linearProgress.progress = 0.50;
      linearProgress.buffer = 0.75;
    }
  });

  visibleCheckbox.addEventListener('change', function() {
    linearProgress.visible = visibleCheckbox.checked;
  });
})();