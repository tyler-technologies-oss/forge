(function() {
  var dialogExample = document.querySelector('#Dialog');
  var dialogTemplate = dialogExample.querySelector('#forge-dialog-template');
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
  

  function openDialog () {
    var dialogElement = document.createElement('forge-dialog');
    dialogElement.fullscreen = dialogFullscreenCheckbox.checked;
    dialogElement.moveable = dialogMoveCheckbox.checked;

    if (dialogCustomPositionCheckbox.checked) {
      dialogElement.positionX = 100;
      dialogElement.positionY = 100;
    }
    
    var content = dialogTemplate.content.cloneNode(true);
    dialogElement.appendChild(content);
    
    var acceptButton = dialogElement.querySelector('#accept-button');
    acceptButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    var cancelButton = dialogElement.querySelector('#cancel-button');
    cancelButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    dialogElement.addEventListener('forge-dialog-close', function (evt) {
      dialogElement.open = false;
      dialogElement = undefined;
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

    dialogElement.open = true;
  }

  function openDialogToolbars () {
    var dialogElement = document.createElement('forge-dialog');
    dialogElement.fullscreen = dialogFullscreenCheckbox.checked;
    dialogElement.moveable = dialogMoveCheckbox.checked;
    
    var content = dialogTemplateToolbars.content.cloneNode(true);
    dialogElement.appendChild(content);
    
    var closeButton = dialogElement.querySelector('#close-button-toolbars');
    closeButton.addEventListener('click', function() {
      dialogElement.open = false;
    })

    var acceptButton = dialogElement.querySelector('#accept-button-toolbars');
    acceptButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    var cancelButton = dialogElement.querySelector('#cancel-button-toolbars');
    cancelButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    dialogElement.addEventListener('forge-dialog-close', function (evt) {
      dialogElement.open = false;
      dialogElement = undefined;
    });

    dialogElement.open = true;
  }

  function openDialogScrolling () {
    var dialogElement = document.createElement('forge-dialog');
    dialogElement.fullscreen = dialogFullscreenCheckbox.checked;
    dialogElement.moveable = dialogMoveCheckbox.checked;
    dialogElement.classList.add('forge-dialog--scrollable');

    if (!dialogFullscreenCheckbox.checked) {
      dialogElement.classList.add('forge-dialog--small');
    }
    
    var content = dialogTemplateScrolling.content.cloneNode(true);
    dialogElement.appendChild(content);

    var acceptButton = dialogElement.querySelector('#accept-button-scrolling');
    acceptButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    var cancelButton = dialogElement.querySelector('#cancel-button-scrolling');
    cancelButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    dialogElement.addEventListener('forge-dialog-close', function (evt) {
      dialogElement.open = false;
      dialogElement = undefined;
    });

    dialogElement.open = true;
  }
})();
