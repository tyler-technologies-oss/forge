(function() {
  var example = document.querySelector('#Button');
  var disabledCheckbox = example.querySelector('#button-disabled');

  disabledCheckbox.addEventListener('change', function(evt) {
    setButtonsDisabled(disabledCheckbox.checked);
  });

  function setButtonsDisabled(value) {
    var buttons = example.querySelectorAll('button');
    buttons.forEach(b => b.disabled = value);
  }
})();