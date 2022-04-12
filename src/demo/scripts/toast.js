(function () {
  var toastExample = document.querySelector('#Toast');

  var messageInput = toastExample.querySelector('#toastMessage');
  var actionTextInput = toastExample.querySelector('#toastActionText');
  var toastDurationInput = toastExample.querySelector('#toastDuration');
  var toastCloseCheckbox = toastExample.querySelector('#toastCloseCheckbox');
  var toastBuilderCheckbox = toastExample.querySelector('#toastBuilderCheckbox');
  var horizontalInput = toastExample.querySelector('#toastMarginHorizontal');
  var verticalInput = toastExample.querySelector('#toastMarginVertical');

  var toastPlacementSelect = toastExample.querySelector('#toastPlacement');
  var showButton = toastExample.querySelector('#showToastButton');
  const defaultMargin = 24;

  toastPlacementSelect.addEventListener('change', function () {
    placementChanged();
  });

  toastPlacementSelect.dispatchEvent(new Event('change'));

  showButton.addEventListener('click', function () {
    showToast();
  });

  function showToast() {
    var toast = document.createElement('forge-toast');
    toast.message = messageInput.value;
    toast.actionText = actionTextInput.value;
    toast.placement = toastPlacementSelect.value;
    toast.showClose = toastCloseCheckbox.checked;
    applyCustomStyleOverrides(toast);

    if (toastBuilderCheckbox.checked) {
      toast.builder = function () {
        var container = document.createElement('div');
        container.classList.add('custom-toast');

        var left = document.createElement('div');
        left.textContent = 'Custom template!';
        container.appendChild(left);

        var right = document.createElement('div');
        right.textContent = '400px wide';
        container.appendChild(right);

        return container;
      };
    }

    if (toastDurationInput.value) {
      toast.duration = toastDurationInput.value;
    }

    var actionHandler = function () {
      console.log('[toast] Action button clicked.');
      toast.hide();
    };
    if (actionTextInput.value) {
      toast.addEventListener('forge-toast-action', actionHandler);
    }

    var closeHandler = function () {
      console.log('[toast] Closed.');
      if (actionHandler) {
        toast.removeEventListener('action', actionHandler);
      }
      toast.removeEventListener('forge-toast-close', closeHandler);
    };
    toast.addEventListener('forge-toast-close', closeHandler);

    document.body.appendChild(toast);
  }

  function applyCustomStyleOverrides(toast) {
    if (horizontalInput.value || verticalInput.value) {
      if (toastPlacementSelect.value === 'bottom') {
        toast.style.setProperty('--forge-toast-bottom-margin-bottom', (verticalInput.value || '0') + 'px');
        return;
      }

      if (toastPlacementSelect.value === 'top') {
        toast.style.setProperty('--forge-toast-top-margin-top', (verticalInput.value || '0') + 'px');
        return;
      }

      if (toastPlacementSelect.value.includes('bottom')) {
        if (toastPlacementSelect.value.includes('right')) {
          toast.style.setProperty('--forge-toast-bottom-right-margin-right', (horizontalInput.value || defaultMargin) + 'px');
          toast.style.setProperty('--forge-toast-bottom-right-margin-bottom', (verticalInput.value || defaultMargin) + 'px');
        } else {
          toast.style.setProperty('--forge-toast-bottom-left-margin-left', (horizontalInput.value || defaultMargin) + 'px');
          toast.style.setProperty('--forge-toast-bottom-left-margin-bottom', (verticalInput.value || defaultMargin) + 'px');
        }
      } else {
        if (toastPlacementSelect.value.includes('right')) {
          toast.style.setProperty('--forge-toast-top-right-margin-right', (horizontalInput.value || defaultMargin) + 'px');
          toast.style.setProperty('--forge-toast-top-right-margin-top', (verticalInput.value || defaultMargin) + 'px');
        } else {
          toast.style.setProperty('--forge-toast-top-left-margin-left', (horizontalInput.value || defaultMargin) + 'px');
          toast.style.setProperty('--forge-toast-top-left-margin-top', (verticalInput.value || defaultMargin) + 'px');
        }
      }
    }
  }
  function placementChanged() {
    if (toastPlacementSelect.value === 'bottom' || toastPlacementSelect.value === 'top') {
      horizontalInput.disabled = true;
    } else {
      horizontalInput.disabled = false;
    }
  }
})();
