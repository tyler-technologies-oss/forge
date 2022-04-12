(function () {
  var example = document.querySelector('#ProductIcon');
  var productIcon = example.querySelectorAll('forge-product-icon');
  var productIconTylerIconSpan = example.querySelector('forge-product-icon span.tyler-icons');
  var productIconFontAwesomeIcon = example.querySelector('forge-product-icon i');
  var productIconTextSpan = example.querySelector('forge-product-icon span[slot="text"]');
  var colorPaletteSelect = example.querySelector('#forge-product-icon-color');
  var colorVariantSelect = example.querySelector('#forge-product-icon-variant');
  var iconNameInput = example.querySelector('#forge-product-icon-name');
  var fontAwsomeClassNameInput = example.querySelector('#forge-product-font-awesome-name');
  var textValueInput = example.querySelector('#forge-product-text-value');
  var iterationsInput = example.querySelector('#forge-product-icon-iterations');
  var circleSizeInput = example.querySelector('#forge-product-icon-circle-size');
  var customIconSizeInput = example.querySelector('#forge-product-icon-custom-size');
  var shadowToggle = example.querySelector('#forge-product-icon-shadow');

  colorPaletteSelect.addEventListener('change', function (evt) {
    applyColor();
  });

  colorVariantSelect.addEventListener('change', function (evt) {
    applyColor();
  });

  circleSizeInput.addEventListener('input', function (evt) {
    productIcon.forEach(function(e) { e.size = evt.target.value; });
  });

  iconNameInput.addEventListener('input', function (evt) {
    productIconTylerIconSpan.textContent = evt.target.value;
  });

  customIconSizeInput.addEventListener('input', function (evt) {
    productIconTylerIconSpan.style.setProperty('--forge-product-icon-font-size', String(evt.target.value) + 'px');
    productIconFontAwesomeIcon.style.setProperty('--forge-product-icon-font-size', String(evt.target.value) + 'px');
    productIconTextSpan.style.setProperty('--forge-product-icon-font-size', String(evt.target.value) + 'px');
  });

  fontAwsomeClassNameInput.addEventListener('input', function (evt) {
    productIconFontAwesomeIcon.className = evt.target.value;
  });

  textValueInput.addEventListener('input', function (evt) {
    productIconTextSpan.textContent = evt.target.value;
  });

  iterationsInput.addEventListener('input', function (evt) {
    productIcon.forEach(function(e) { e.iterations = evt.target.value; });
  });

  shadowToggle.addEventListener('forge-switch-select', function (evt) {
    productIcon.forEach(function(e) { e.shadow = evt.detail; });
  });

  function applyColor() {
    // Format the color palette value and variants
    var cp = colorPaletteSelect.value;
    var cv = colorVariantSelect.value;

    // Creates the friendly string to pass into the attribute
    var colorString = cp + '-' + cv;

    // Update the component
    productIcon.forEach(function(e) { e.color = colorString; });
  }
})();
