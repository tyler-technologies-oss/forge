(function() {
  var busyIndicatorExample = document.querySelector('#BusyIndicator');

  // Options
  var titleTextbox = busyIndicatorExample.querySelector('#busy-indicator-title-input');
  var messageTextbox = busyIndicatorExample.querySelector('#busy-indicator-message-input');
  var fixedCheckbox = busyIndicatorExample.querySelector('#busy-indicator-fixed');
  var showCancelCheckbox = busyIndicatorExample.querySelector('#busy-indicator-cancel');
  var useCustomWidthCheckbox = busyIndicatorExample.querySelector('#busy-indicator-width');
  var showSpinnerCheckbox = busyIndicatorExample.querySelector('#busy-indicator-spinner');
  showSpinnerCheckbox.checked = true;
  var showProgressBarCheckbox = busyIndicatorExample.querySelector('#busy-indicator-progress-bar');
  var progressBarModeDropdown = busyIndicatorExample.querySelector('#busy-indicator-progress-mode');
  var progressBarDirection = busyIndicatorExample.querySelector('#busy-indicator-direction');

  // Show busy indicator button
  var showBusyIndicatorButton = busyIndicatorExample.querySelector('#show-busy-indicator-button');
  showBusyIndicatorButton.addEventListener('click', showBusyIndicator);

  function showBusyIndicator () {
    var busyIndicatorElement = createBusyIndicatorFromOptions();
    busyIndicatorElement.fixed = fixedCheckbox.checked;
    parent = fixedCheckbox.checked ? document.body : busyIndicatorExample.querySelector('#busy-indicator-host');
    parent.appendChild(busyIndicatorElement);

    if (busyIndicatorElement.cancel) {
      busyIndicatorElement.addEventListener('forge-busy-indicator-cancel', function (evt) {
        setTimeout(function () {
          busyIndicatorElement.hide(true);
        }, 1000);
      });
    }

    if (showProgressBarCheckbox.checked && progressBarModeDropdown.value === 'determinate' || progressBarModeDropdown.value === 'buffer') {
      var progressInterval = setInterval(function () {
        if (!busyIndicatorElement.isConnected) {
          return clearInterval(progressInterval);
        }
        busyIndicatorElement.progress += 0.02;
        if (busyIndicatorElement.progress > 1) {
          clearInterval(progressInterval);
          if (busyIndicatorElement.isConnected) {
            busyIndicatorElement.hide();
          }
        }
      }, 100);

      if (progressBarModeDropdown.value === 'buffer') {
        var bufferInterval = setInterval(function () {
          if (!busyIndicatorElement.isConnected) {
            return clearInterval(progressInterval);
          }
          busyIndicatorElement.buffer += 0.03;
          if (busyIndicatorElement.progress > 1 || busyIndicatorElement.buffer > 1) {
            clearInterval(bufferInterval);
          }
        }, 100);
      }
    } else {
      setTimeout(() => busyIndicatorElement.hide(), 3000);
    }
  }

  /** Creates a new busy indicator element. */
  function createBusyIndicatorFromOptions () {
    var busyIndicatorElement = document.createElement('forge-busy-indicator');

    busyIndicatorElement.titleText = titleTextbox.value;
    busyIndicatorElement.message = messageTextbox.value;
    busyIndicatorElement.cancel = showCancelCheckbox.checked;
    busyIndicatorElement.spinner = showSpinnerCheckbox.checked;
    busyIndicatorElement.progressBar = showProgressBarCheckbox.checked;
    busyIndicatorElement.progressBarDeterminate = progressBarModeDropdown.value === 'determinate' || progressBarModeDropdown.value === 'buffer';
    busyIndicatorElement.direction = progressBarDirection.value;

    if (progressBarModeDropdown.value !== 'buffer') {
      busyIndicatorElement.buffer = 1;
    }

    if (useCustomWidthCheckbox.checked) {
      busyIndicatorElement.width = 500;
    }

    return busyIndicatorElement;
  }
})();
