(function () {
  var btn = document.querySelector('#button-action');
  if (btn) {
    btn.addEventListener('click', function (evt) {
      // var elem = document.querySelector('#forge-menu-example');
      // if (elem) {
      //   if (elem.hasAttribute('open')) {
      //     elem.removeAttribute('open');
      //   } else {
      //     elem.setAttribute('open', '');
      //   }
      // }

      // var elem = document.querySelector('#input-switch-01');
      // if (elem) {
      //   elem.hasAttribute('checked') ? elem.removeAttribute('checked') : elem.setAttribute('checked', '');
      // }

      var elem = document.querySelector('#forge-tab-bar-01');
      if (elem) {
        var tabBtn = document.createElement('button');
        tabBtn.innerText = 'new button';
        elem.appendChild(tabBtn);
      }
    });
  }

  var menu = document.querySelector('#forge-menu-example');
  if (menu) {
    const options = [
      { value: 'back', label: 'Back', icon: 'arrow_back' },
      { value: 'forward', label: 'Forward', icon: 'arrow_forward', disabled: true },
      { value: 'reload', label: 'Reload', icon: 'loop', selected: true },
      { divider: true },
      { value: 'help', label: 'Help & Feedback', icon: 'help' },
      { value: 'settings', label: 'Settings', icon: 'settings' }
    ];

    menu.options = options;
    menu.addEventListener('forge-menu-select', function (evt) {
      console.log(evt);
    });
  }
})();
