(function() {
  var example = document.querySelector('#AppBar');
  var appBar = document.querySelector('forge-app-bar#forge-app-bar-example');
  var appBarSearch = appBar.querySelector('forge-app-bar-search#app-bar-search');
  var appBarSearchDisabledCheckbox = example.querySelector('#app-bar-search-disabled-checkbox');
  var appBarAvatar = appBar.querySelector('forge-app-bar-profile-button');
  var appBarMenuButton = appBar.querySelector('#forge-app-bar-example-menu-button');
  var appBarHelpButton = appBar.querySelector('forge-app-bar-help-button');
  var appBarAppLauncherButton = appBar.querySelector('forge-app-bar-app-launcher-button');

  appBarHelpButton.options = [
    { value: 'help', label: 'Help', icon: 'help_outline', required: false },
    { value: 'knowledgebase', label: 'Knowledgebase', icon: 'description', required: false },
    { value: 'tyler-community', label: 'Tyler Community', icon: 'people', required: true },
    { value: 'tyler-university', label: 'Tyler University', icon: 'school', required: true },
    { divider: true },
    { value: 'my-view', label: 'My View', icon: 'videocam', required: true },
    { value: 'tyler-support', label: 'Tyler Support', icon: 'headset_mic', required: true },
    { divider: true },
    { value: 'enhancments', label: 'Ehancements', icon: 'stars', required: false },
    { value: 'about', label: 'About', icon: 'info_outline', required: true }
  ];
  appBarHelpButton.addEventListener('forge-menu-select', function(evt) {
    console.log('[forge-menu-select]', evt.detail);
  });

  var appLauncherOptions;

  appBarAppLauncherButton.optionsCallback = function() {
    if (appLauncherOptions) {
      return appLauncherOptions;
    }
    return new Promise(function(resolve, reject) {
      // reject('Error');
      // return;
      setTimeout(function() {
        appLauncherOptions = TEST_APP_LAUNCHER_OPTIONS;
        resolve(appLauncherOptions);
      }, 2000);
    });
  };
  appBarAppLauncherButton.addEventListener('forge-app-launcher-select', function(evt) {
    // evt.preventDefault();
    console.log('forge-app-launcher-select', evt.detail);
  });

  appBarMenuButton.addEventListener('click', onMenuClick);
  appBar.addEventListener('forge-app-bar-search-input', onSearch);

  function onMenuClick(evt) {
    console.log('menu-clicked', evt.detail);

    var toast = document.createElement('forge-toast');
    toast.message = 'Menu clicked';
    document.body.appendChild(toast);
  }

  function onSearch(evt) {
    console.log('forge-app-bar-search: ', evt.detail);

    var toast = document.createElement('forge-toast');
    toast.message = 'Search text: ' + evt.detail.value;
    document.body.appendChild(toast);
  }

  // Controls showing/hiding the app-bar menu button
  var showAppBarMenuCheckbox = example.querySelector('#app-bar-menu-checkbox');
  showAppBarMenuCheckbox.checked = true;
  showAppBarMenuCheckbox.addEventListener('change', function (evt) {
    showAppBarMenuCheckbox.checked ? appBarMenuButton.style.removeProperty('display') : appBarMenuButton.style.display = 'none';
  });

  // Controls showing/hiding the app-bar search
  var showAppBarSearchCheckbox = example.querySelector('#app-bar-search-checkbox');
  showAppBarSearchCheckbox.checked = true;
  showAppBarSearchCheckbox.addEventListener('change', function (evt) {
    appBarSearch.style.display = showAppBarSearchCheckbox.checked ? 'block' : 'none';
    appBarSearchDisabledCheckbox.disabled = !showAppBarSearchCheckbox.checked;
  });

  // Controls toggling the disabled field on the app-bar search component
  appBarSearchDisabledCheckbox.disabled = !showAppBarSearchCheckbox.checked;
  appBarSearchDisabledCheckbox.addEventListener('change', function (evt) {
    appBarSearch.disabled = appBarSearchDisabledCheckbox.checked;
  });

  // Controls whether to use the app-bar profile card builder
  var useProfileCardBuilderCheckbox = example.querySelector('#app-bar-profile-card-builder-checkbox');
  useProfileCardBuilderCheckbox.checked = false;
  useProfileCardBuilderCheckbox.addEventListener('change', function (evt) {
    appBarAvatar.profileCardBuilder = useProfileCardBuilderCheckbox.checked ? profileCardBuilder : undefined;
  });
  function buildListItemElement(text, icon, value) {
    const listItemElement = document.createElement('forge-list-item');
    listItemElement.value = value;
    const iconElement = document.createElement('span');
    iconElement.classList.add('tyler-icons');
    iconElement.slot = 'leading';
    iconElement.innerText = icon;
    listItemElement.appendChild(iconElement);
    const textElement = document.createElement('span');
    textElement.innerText = text;
    listItemElement.appendChild(textElement);
    return listItemElement;
  }
  function profileCardBuilder() {
    var listElement = document.createElement('forge-list');
    listElement.addEventListener('forge-list-item-select', function(evt) {
      console.log('[profile-card] Selected custom item:', evt.detail.value);
    });
    listElement.style.setProperty('--forge-list-padding', '0');
    listElement.appendChild(document.createElement('forge-divider'));
    listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
    listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
    listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
    listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
    return listElement;
  }

  // Controls the app-bar prominent state
  var appBarProminentCheckbox = example.querySelector('#app-bar-prominent-checkbox');
  appBarProminentCheckbox.addEventListener('change', function (evt) {
    appBar.prominent = appBarProminentCheckbox.checked;
  });

  // Controls the app-bar global state
  var appBarGlobalCheckbox = example.querySelector('#app-bar-global-checkbox');
  appBarGlobalCheckbox.addEventListener('change', function (evt) {
    appBarSearch.global = appBarGlobalCheckbox.checked;
  });

  // Controls the app-bar combined state
  var appBarCombinedCheckbox = example.querySelector('#app-bar-combined-checkbox');
  appBarCombinedCheckbox.addEventListener('change', function (evt) {
    appBarSearch.combined = appBarCombinedCheckbox.checked;
  });

  // Controls the app-bar raised state
  var appBarRaisedCheckbox = example.querySelector('#app-bar-raised-checkbox');
  appBarRaisedCheckbox.checked = true;
  appBarRaisedCheckbox.addEventListener('change', function (evt) {
    appBar.raised = appBarRaisedCheckbox.checked;
  });

  // Updates the app-bar title
  var appBarTitleTextbox = example.querySelector('#app-bar-title-input');
  appBarTitleTextbox.addEventListener('input', function (evt) {
    appBar.titleText = evt.target.value;
  });

  var appBarThemeSelect = example.querySelector('#app-bar-theme-select');
  appBarThemeSelect.addEventListener('change', function (evt) {
    if (evt.target.value) {
      appBar.setAttribute('theme', evt.target.value);
    } else {
      appBar.removeAttribute('theme');
    }
  });
})();