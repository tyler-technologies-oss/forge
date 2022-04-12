(function () {
  var bannerCard = document.querySelector('#Banner');

  var bannerExample = bannerCard.querySelector('#exampleBanner');
  var demoLeadingIcon = bannerExample.querySelector('#demo-leading-icon');
  var demoText = bannerExample.querySelector('#demo-text');
  var demoAction = bannerExample.querySelector('#demo-action');
  var demoActionButton = bannerExample.querySelector('#demo-action-button');

  var dialogTemplate = bannerCard.querySelector('#forge-dialog-banner-template');

  var bannerApiActions = bannerCard.querySelector('#banner-api-actions');
  var dismissBtn = bannerApiActions.querySelector('#prg-dismiss-btn');
  var undismissBtn = bannerApiActions.querySelector('#prg-undismiss-btn');
  var resultSpan = bannerApiActions.querySelector('#dismissed-result');
  var includeLeadingIcon = bannerApiActions.querySelector('#include-leading-icon');
  var includeAction = bannerApiActions.querySelector('#include-action');
  var showDismiss = bannerApiActions.querySelector('#show-dismiss');
  var useMoreText = bannerApiActions.querySelector('#use-more-text');
  var bannerTheme = bannerApiActions.querySelector('#banner-theme');

  dismissBtn.addEventListener('click', dismiss);
  undismissBtn.addEventListener('click', undismiss);
  demoActionButton.addEventListener('click', showDetails);
  bannerExample.addEventListener('forge-banner-dismissed', setDismissedText);
  bannerExample.addEventListener('forge-banner-undismissed', setUndismissedText);

  includeLeadingIcon.checked = true;
  includeAction.checked = true;
  showDismiss.checked = true;
  useMoreText.checked = false;

  includeLeadingIcon.addEventListener('change', updateBanner);
  includeAction.addEventListener('change', updateBanner);
  showDismiss.addEventListener('change', updateBanner);
  useMoreText.addEventListener('change', updateBanner);
  bannerTheme.addEventListener('change', updateBanner)

  setUndismissedText();
  updateBanner();

  function dismiss() {
    bannerExample.dismissed = true;
  }

  function undismiss() {
    bannerExample.dismissed = false;
  }

  function showDetails() {
    openDialog();
  }

  function setDismissedText() {
    resultSpan.textContent = 'dismissed';
  }

  function setUndismissedText() {
    resultSpan.textContent = 'undismissed';
  }

  function openDialog () {
    var dialogElement = document.createElement('forge-dialog');
    var content = dialogTemplate.content.cloneNode(true);
    dialogElement.appendChild(content);
    
    var acceptButton = dialogElement.querySelector('#bnr-dlg-accept-button');
    acceptButton.addEventListener('click', function() {
      dialogElement.open = false;
    });

    dialogElement.addEventListener('forge-dialog-close', function (evt) {
      dialogElement.open = false;
      dialogElement = undefined;
      dismiss();
    });

    dialogElement.open = true;
  }

  function updateBanner() {
    bannerExample.canDismiss = showDismiss.checked;
    
    if (useMoreText.checked) {
      demoText.innerHTML = 'Irure quis reprehenderit magna deserunt culpa voluptate officia. Ut ea quis irure cupidatat velit in ullamco excepteur aliquip elit reprehenderit aliquip mollit. Deserunt sit proident nulla consectetur aliquip elit culpa esse ad minim aliquip.';
    } else {
      demoText.innerHTML = 'Esse enim fugiat qui sit nisi fugiat ad velit incididunt laborum cillum non consequat ipsum.';
    }

    if (includeAction.checked) {
      demoAction.style.display = 'block';
    } else {
      demoAction.style.display = 'none';
    }

    if (includeLeadingIcon.checked) {
      demoLeadingIcon.style.display = 'block';
    } else {
      demoLeadingIcon.style.display = 'none';
    }

    if (bannerTheme.value === '' || !bannerTheme.value) {
      bannerExample.removeAttribute('theme');
    } else {
      bannerExample.setAttribute('theme', bannerTheme.value);
    }

  }
})();
