(function () {
  var popupTemplate = document.querySelector('#forge-popup-template');
  var popupElement;
  var popupPlacement = 'bottom-start';
  var childPopupElement;

  var addChildPopup = function (parentElement) {
    var _popupTarget = parentElement.querySelector('button');
    var _popupElement;

    if (_popupTarget) {
      _popupElement = document.createElement('forge-popup');
      _popupElement.targetElement = _popupTarget;
      _popupElement.placement = popupPlacement;
      _popupElement.appendChild(popupTemplate.content.cloneNode(true));
      _popupElement.querySelector('h3').innerText = 'Child popup';
      _popupElement.open = true;
    }

    return _popupElement;
  };

  var closePopup = function () {
    if (popupElement) {
      popupElement.open = false;
      childPopupElement = undefined;
      popupElement = undefined;
    }
  };

  function blurListener(evt) {
    // evt.preventDefault(); // This will causes the popup to not close when focus is outside of the popup
    console.log(evt);
  }

  function positionListener(evt) {
    console.log(evt.detail);
  }

  var popupTarget = document.querySelector('#forge-popup-example');
  if (popupTarget) {
    popupTarget.addEventListener('click', function () {
      if (!popupElement) {
        popupElement = document.createElement('forge-popup');
        popupElement.targetElement = popupTarget;
        popupElement.placement = popupPlacement;
        popupElement.appendChild(popupTemplate.content.cloneNode(true));
        popupElement.open = true;
        popupTarget.addEventListener('forge-popup-blur', blurListener);
        popupTarget.addEventListener('forge-popup-position', positionListener);
        var childButton = popupElement.querySelector('button');
        if (childButton) {
          childButton.addEventListener('click', function () {
            if (!childPopupElement) {
              childPopupElement = addChildPopup(popupElement);
              childPopupElement.targetElement.addEventListener('forge-popup-close', function () {
                childPopupElement = undefined;
              });
            } else {
              childPopupElement.open = false;
              childPopupElement = undefined;
            }
          });
        }
      } else {
        closePopup();
      }
    });

    popupTarget.addEventListener('forge-popup-close', function(evt) {
      closePopup();
    });
  }

  var popupExampleSelect = document.querySelector('#forge-popup-example-placement');
  if (popupExampleSelect) {
    popupExampleSelect.addEventListener('change', function (evt) {
      if (popupElement && popupElement.open) {
        closePopup();
      }
      popupPlacement = popupExampleSelect.value;
    });
  }
})();
