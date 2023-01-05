(function() {
  var dialogExample = document.querySelector('#Dialog');
  var dialogElement = dialogExample.querySelector('forge-dialog');
  var dialogTemplateToolbars = dialogExample.querySelector('#forge-dialog-template-toolbars');
  var dialogTemplateScrolling = dialogExample.querySelector('#forge-dialog-template-scrolling');
  var dialogFullscreenCheckbox = dialogExample.querySelector('#dialog-fullscreen');
  var dialogMoveCheckbox = dialogExample.querySelector('#dialog-move');
  var dialogCustomPositionCheckbox = dialogExample.querySelector('#dialog-custom-position');
  var dialogMovedPreventCheckbox = dialogExample.querySelector('#dialog-prevent-moved');
  
  var showDialogButton = dialogExample.querySelector('#show-dialog-button');
  showDialogButton.addEventListener('click', function() {
    openDialog();
  });

  var showDialogButtonToolbars = dialogExample.querySelector('#show-dialog-button-toolbars');
  showDialogButtonToolbars.addEventListener('click', function() {
    openDialogToolbars();
  })

  var showDialogButtonScrolling = dialogExample.querySelector('#show-dialog-button-scrolling');
  showDialogButtonScrolling.addEventListener('click', function() {
    openDialogScrolling();
  })
  
  dialogFullscreenCheckbox.addEventListener('change', evt => {
    dialogElement.fullscreen = dialogFullscreenCheckbox.checked;
  });
  
  dialogMoveCheckbox.addEventListener('change', evt => {
    dialogElement.moveable = dialogMoveCheckbox.checked;
  });
  
  dialogCustomPositionCheckbox.addEventListener('change', evt => {
    dialogElement.positionX = dialogCustomPositionCheckbox.checked ? 100 : null;
    dialogElement.positionY = dialogCustomPositionCheckbox.checked ? 100 : null;
  });
  
  var acceptButton = dialogElement.querySelector('#accept-button');
  acceptButton.addEventListener('click', function() {
    dialogElement.open = false;
  });

  var cancelButton = dialogElement.querySelector('#cancel-button');
  cancelButton.addEventListener('click', function() {
    dialogElement.open = false;
  });

  dialogElement.addEventListener('forge-dialog-close', function (evt) {
    console.log('[dialogElement] forge-dialog-close');
    dialogElement.open = false;
  });

  dialogElement.addEventListener('forge-dialog-ready', function (evt) {
    console.log('[forge-dialog] ready');
  });

  dialogElement.addEventListener('forge-dialog-move', function (evt) {
    console.log('[forge-dialog] move', evt.detail);
    if (dialogMovedPreventCheckbox.checked) {
      evt.preventDefault();
      console.log('[forge-dialog] move prevented');
      return;
    }
  });

  dialogElement.addEventListener('forge-dialog-move-end', function (evt) {
    console.log('[forge-dialog] move end');
  });

  function openDialog() {
    dialogElement.open = true;
  }

  function openDialogToolbars () {
    var toolbarDialogElement = document.createElement('forge-dialog');
    toolbarDialogElement.fullscreen = dialogFullscreenCheckbox.checked;
    toolbarDialogElement.moveable = dialogMoveCheckbox.checked;
    
    var content = dialogTemplateToolbars.content.cloneNode(true);
    toolbarDialogElement.appendChild(content);
    
    var closeButton = toolbarDialogElement.querySelector('#close-button-toolbars');
    closeButton.addEventListener('click', function() {
      toolbarDialogElement.hide(true);
    })

    var acceptButton = toolbarDialogElement.querySelector('#accept-button-toolbars');
    acceptButton.addEventListener('click', function() {
      toolbarDialogElement.hide(true);
    });

    var cancelButton = toolbarDialogElement.querySelector('#cancel-button-toolbars');
    cancelButton.addEventListener('click', function() {
      toolbarDialogElement.hide(true);
    });

    toolbarDialogElement.addEventListener('forge-dialog-close', function (evt) {
      console.log('[toolbarDialogElement] forge-dialog-close');
      toolbarDialogElement.hide(true);
    });

    toolbarDialogElement.show();
  }

  function openDialogScrolling () {
    var scrollableDialogElement = document.createElement('forge-dialog');
    scrollableDialogElement.fullscreen = dialogFullscreenCheckbox.checked;
    scrollableDialogElement.moveable = dialogMoveCheckbox.checked;
    scrollableDialogElement.classList.add('forge-dialog--scrollable');

    if (!dialogFullscreenCheckbox.checked) {
      scrollableDialogElement.classList.add('forge-dialog--small');
    }
    
    var content = dialogTemplateScrolling.content.cloneNode(true);
    scrollableDialogElement.appendChild(content);

    var acceptButton = scrollableDialogElement.querySelector('#accept-button-scrolling');
    acceptButton.addEventListener('click', function() {
      scrollableDialogElement.hide(true);
    });

    var cancelButton = scrollableDialogElement.querySelector('#cancel-button-scrolling');
    cancelButton.addEventListener('click', function() {
      scrollableDialogElement.hide(true);
    });

    scrollableDialogElement.addEventListener('forge-dialog-close', function (evt) {
      console.log('[scrollableDialogElement] forge-dialog-close');
      scrollableDialogElement.hide(true);
    });

    scrollableDialogElement.show();
  }
})();
