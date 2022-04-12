(function() {
  var example = document.getElementById('Card');
  var card = example.querySelector('forge-card');
  var outlinedCheckbox = example.querySelector('#card-outlined');

  outlinedCheckbox.addEventListener('change', function() {
    card.outlined = outlinedCheckbox.checked;
  });
})();