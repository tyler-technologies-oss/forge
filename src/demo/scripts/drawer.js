(function() {
  var example = document.querySelector('#Drawer');
  var dismissibleAppBarMenuButton = example.querySelector('#drawer-dismissible-app-bar-menu-button');
  var dismissibleRightAppBarMenuButton = example.querySelector('#drawer-dismissible-right-app-bar-menu-button');
  var modalAppBarMenuButton = example.querySelector('#drawer-modal-app-bar-menu-button');
  var dismissibleDrawer = example.querySelector('forge-drawer#dismissible-drawer');
  var dismissibleRightDrawer = example.querySelector('forge-drawer#dismissible-drawer-right');
  var modalDrawer = example.querySelector('forge-modal-drawer');

  dismissibleDrawer.addEventListener('forge-drawer-after-close', function() {
    console.log('[dismissible drawer] forge-drawer-after-close');
  });
  
  dismissibleDrawer.addEventListener('forge-drawer-after-open', function() {
    console.log('[dismissible drawer] forge-drawer-after-open');
  });

  dismissibleAppBarMenuButton.addEventListener('click', function() {
    dismissibleDrawer.open = !dismissibleDrawer.open;
  });

  dismissibleRightAppBarMenuButton.addEventListener('click', function () {
    dismissibleRightDrawer.open = !dismissibleRightDrawer.open;
  });

  modalAppBarMenuButton.addEventListener('click', function() {
    modalDrawer.open = !modalDrawer.open;
  });
})();