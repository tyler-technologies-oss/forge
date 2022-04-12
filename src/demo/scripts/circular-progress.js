(function () {
  var determinateIntervalTimer;

  var circularProgressExample = document.querySelector('#CircularProgress');
  var circularProgress = circularProgressExample.querySelector('forge-circular-progress');

  var circularProgressOpenCheckbox = circularProgressExample.querySelector('#circular-progress-open');
  circularProgressOpenCheckbox.addEventListener('change', function(evt) {
    circularProgress.open = circularProgressOpenCheckbox.checked;
  });

  var circularProgressShowTrackCheckbox = circularProgressExample.querySelector('#circular-progress-show-track');
  circularProgressShowTrackCheckbox.addEventListener('change', function(evt) {
    if (circularProgressShowTrackCheckbox.checked) {
      circularProgress.style.setProperty('--forge-circular-progress-track-color', 'var(--mdc-theme-text-disabled-on-background)');
    } else {
      circularProgress.style.removeProperty('--forge-circular-progress-track-color');
    }
  });

  var circularProgressShowPercentCheckbox = circularProgressExample.querySelector('#circular-progress-show-percent');
  circularProgressShowPercentCheckbox.addEventListener('change', function(evt) {
    circularProgress.textContent = circularProgressShowPercentCheckbox.checked ? '0%' : '';
  });

  var circularProgressOpenCheckbox = circularProgressExample.querySelector('#circular-progress-open');
  circularProgressOpenCheckbox.addEventListener('change', function(evt) {
    circularProgress.open = circularProgressOpenCheckbox.checked;
  });

  var circularProgressModeDropdown = circularProgressExample.querySelector('#circular-progress-mode');
  circularProgressModeDropdown.addEventListener('change', function (evt) {
    circularProgress.determinate = evt.target.value === 'determinate';
    
    circularProgressShowTrackCheckbox.disabled = !circularProgress.determinate;
    circularProgressShowPercentCheckbox.disabled = !circularProgress.determinate;

    if (!circularProgress.determinate) {
      circularProgress.textContent = '';
    }

    if (determinateIntervalTimer) {
      clearInterval(determinateIntervalTimer);
    }

    if (circularProgress.determinate) {
      circularProgress.progress = 0;
      determinateIntervalTimer = setInterval(function () {
        circularProgress.progress += 0.005;
        if (circularProgress.progress >= 1) {
          circularProgress.progress = 0;
        }
        if (circularProgressShowPercentCheckbox.checked) {
          var percent = parseInt(parseFloat(circularProgress.progress.toFixed(2)) * 100);
          circularProgress.textContent = percent + '%';
        }
      }, 100);
    }
  });

  var circularProgressColorDropdown = circularProgressExample.querySelector('#circular-progress-color');
  circularProgressColorDropdown.addEventListener('change', function (evt) {
    if (evt.target.value === 'tertiary') {
      circularProgress.style.removeProperty('--forge-theme-tertiary');
    } else {
      circularProgress.style.setProperty('--forge-theme-tertiary', 'var(--mdc-theme-' + evt.target.value + ')');
    }
  });

  var circularProgressSizeInput = circularProgressExample.querySelector('#circular-progress-size');
  circularProgressSizeInput.addEventListener('input', function (evt) {
    if (!evt.target.value) {
      circularProgress.style.removeProperty('--forge-circular-progress-size');
    } else {
      circularProgress.style.setProperty('--forge-circular-progress-size', evt.target.value);
    }
  });

  var circularProgressStrokeWidthInput = circularProgressExample.querySelector('#circular-progress-stroke-width');
  circularProgressStrokeWidthInput.addEventListener('input', function (evt) {
    if (!evt.target.value) {
      circularProgress.style.removeProperty('--forge-circular-progress-stroke-width');
    } else {
      circularProgress.style.setProperty('--forge-circular-progress-stroke-width', evt.target.value);
    }
  });
})();
