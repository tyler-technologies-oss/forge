(function() {
    var example = document.getElementById('Footer');
    var footer = example.querySelector('#footer-component');
    var layoutSelect = example.querySelector('#footer-layout-select');
    var layoutBreakpointInput = example.querySelector('#footer-layout-breakpoint-input');
  
    layoutSelect.value = footer.layout;
    layoutSelect.addEventListener('change', function(evt) {
        footer.layout = evt.detail;
    });

    layoutBreakpointInput.value = footer.layoutBreakpoint;
    layoutBreakpointInput.addEventListener('keyup', function() {
        footer.layoutBreakpoint = layoutBreakpointInput.value;
    });
  })();