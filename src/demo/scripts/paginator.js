(function (forge) {
  var example = document.querySelector('#Paginator');
  var paginator = document.querySelector('forge-paginator#forge-paginator-example');

  paginator.addEventListener('forge-paginator-change', evt => {
    console.log(evt.detail);
  });

  // Controls showing/hiding of the page size options
  var showPaginatorPageSizeOptionsCheckbox = example.querySelector('#paginator-page-size-options-checkbox');
  showPaginatorPageSizeOptionsCheckbox.checked = true;
  showPaginatorPageSizeOptionsCheckbox.addEventListener('change', function (evt) {
    paginator.pageSizeOptions = showPaginatorPageSizeOptionsCheckbox.checked ? forge.PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS : false;
  });

  // Controls showing/hiding of the first button
  var showPaginatorFirstCheckbox = example.querySelector('#paginator-first-checkbox');
  showPaginatorFirstCheckbox.addEventListener('change', function (evt) {
    paginator.first = showPaginatorFirstCheckbox.checked;
  });

  // Controls showing/hiding of the first last buttons
  var showPaginatorFirstLastCheckbox = example.querySelector('#paginator-first-last-checkbox');
  showPaginatorFirstLastCheckbox.addEventListener('change', function (evt) {
    paginator.firstLast = showPaginatorFirstLastCheckbox.checked;
  });

  // Controls showing/hiding of the label
  var labelCheckbox = example.querySelector('#paginator-label-checkbox');
  labelCheckbox.checked = true;
  labelCheckbox.addEventListener('change', function (evt) {
    paginator.label = labelCheckbox.checked ? forge.PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL : null;
  });

  // Controls the disabled state
  var disabledCheckbox = example.querySelector('#paginator-disabled-checkbox');
  disabledCheckbox.addEventListener('change', function (evt) {
    paginator.disabled = disabledCheckbox.checked;
  });


  // Controls the alignment
  var alignmentSelect = example.querySelector('#paginator-alignment-select');
  alignmentSelect.addEventListener('change', function (evt) {
    paginator.alignment = alignmentSelect.value;
  });

// Controls the alternative mode
  var alternativeCheckbox = example.querySelector('#paginator-alternative');
  alternativeCheckbox.addEventListener('change', function (evt) {
    paginator.alternative = alternativeCheckbox.checked;

    if (alternativeCheckbox.checked) {
      alignmentSelect.style.display = '';
    } else {
      alignmentSelect.style.display = 'none';
    }
  });

  alternativeCheckbox.dispatchEvent(new Event('change'));

})(window.Forge.lib);