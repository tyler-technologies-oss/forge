(function () {
  var tabsExample = document.querySelector('#TabBar');
  var tabBar = tabsExample.querySelector('forge-tab-bar');
  var tabContent = tabsExample.querySelector('.tab-content');
  var layoutModeSelect = tabsExample.querySelector('#tab-bar-layout-mode');
  var layoutAlignSelect = tabsExample.querySelector('#tab-bar-layout-align');
  var showUnderlineCheckbox = tabsExample.querySelector('#tab-bar-underline');
  var stackedCheckbox = tabsExample.querySelector('#tab-bar-stacked');
  var autoActivateCheckbox = tabsExample.querySelector('#tab-bar-auto-activate');
  var focusOnActivateCheckbox = tabsExample.querySelector('#tab-bar-focus-on-activate');
  var allowScrollButtonsCheckbox = tabsExample.querySelector('#tab-bar-scroll-buttons');
  var forceScrollButtonsCheckbox = tabsExample.querySelector('#tab-bar-force-scroll-buttons');
  var firstTab = tabsExample.querySelector('forge-tab:first-child');

  tabBar.activeTab = 0;

  tabBar.addEventListener('forge-tab-bar-activate', function (evt) {
    setTabContent(evt.detail.index);
  });

  layoutModeSelect.addEventListener('change', function (evt) {
    tabBar.layoutMode = layoutModeSelect.value;
  });

  layoutAlignSelect.addEventListener('change', function (evt) {
    tabBar.layoutAlign = layoutAlignSelect.value;
  });

  showUnderlineCheckbox.addEventListener('change', function (evt) {
    tabBar.underline = showUnderlineCheckbox.checked;
  });

  stackedCheckbox.addEventListener('change', function (evt) {
    tabBar.stacked = stackedCheckbox.checked;
    if (stackedCheckbox.checked) {
      var i = document.createElement('i');
      i.classList.add('tyler-icons');
      i.textContent = 'favorite';
      i.slot = 'top';
      i.setAttribute('aria-hidden', 'true');
      firstTab.appendChild(i);
    } else {
      var i = firstTab.querySelector('i');
      if (i) {
        firstTab.removeChild(i);
      }
    }
  });

  autoActivateCheckbox.addEventListener('change', function (evt) {
    tabBar.autoActivate = autoActivateCheckbox.checked;
  });

  focusOnActivateCheckbox.addEventListener('change', function (evt) {
    tabBar.focusOnActivate = focusOnActivateCheckbox.checked;
  });

  allowScrollButtonsCheckbox.addEventListener('change', function (evt) {
    tabBar.scrollButtons = allowScrollButtonsCheckbox.checked;
  });

  forceScrollButtonsCheckbox.addEventListener('change', function (evt) {
    tabBar.forceScrollButtons = forceScrollButtonsCheckbox.checked;
  });

  function setTabContent(index) {
    tabContent.innerHTML = 'Content for tab index: ' + index;
  }

  setTabContent(0);
})();
