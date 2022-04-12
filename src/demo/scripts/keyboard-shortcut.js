(function () {
  var example = document.querySelector('#KeyboardShortcut');
  var buttonShortcut = example.querySelector('#button-shortcut');
  var textFieldShortcut = example.querySelector('#text-field-shortcut');
  var keyTextField = example.querySelector('#keyboard-shortcut-key');
  var globalCheckbox = example.querySelector('#keyboard-shortcut-global-checkbox');
  var allowWhileTypingCheckbox = example.querySelector('#keyboard-shortcut-allow-while-typing-checkbox');
  var preventDefaultCheckbox = example.querySelector('#keyboard-shortcut-prevent-default-checkbox');
  var useCodeCheckbox = example.querySelector('#keyboard-shortcut-use-code-checkbox');
  var disabledCheckbox = example.querySelector('#keyboard-shortcut-disabled-checkbox');

  buttonShortcut.addEventListener('forge-keyboard-shortcut-activate', function (event) {
    alert('Button shortcut works');
    console.log(event);
  });

  textFieldShortcut.addEventListener('forge-keyboard-shortcut-activate', function (event) {
    alert('Text field shortcut works');
    console.log(event);
  });

  keyTextField.value = 'a';
  buttonShortcut.key = keyTextField.value;
  textFieldShortcut.key = keyTextField.value;
  keyTextField.addEventListener('change', function (event) {
    buttonShortcut.key = event.target.value;
    textFieldShortcut.key = event.target.value;
  });

  globalCheckbox.checked = false;
  globalCheckbox.addEventListener('change', function () {
    buttonShortcut.global = globalCheckbox.checked;
    textFieldShortcut.global = globalCheckbox.checked;
  });

  allowWhileTypingCheckbox.checked = false;
  allowWhileTypingCheckbox.addEventListener('change', function () {
    buttonShortcut.allowWhileTyping = allowWhileTypingCheckbox.checked;
    textFieldShortcut.allowWhileTyping = allowWhileTypingCheckbox.checked;
  });

  preventDefaultCheckbox.checked = true;
  preventDefaultCheckbox.addEventListener('change', function () {
    buttonShortcut.preventDefault = preventDefaultCheckbox.checked;
    textFieldShortcut.preventDefault = preventDefaultCheckbox.checked;
  });

  useCodeCheckbox.checked = false;
  useCodeCheckbox.addEventListener('change', function () {
    buttonShortcut.useCode = useCodeCheckbox.checked;
    textFieldShortcut.useCode = useCodeCheckbox.checked;
  });

  disabledCheckbox.checked = false;
  disabledCheckbox.addEventListener('change', function () {
    buttonShortcut.disabled = disabledCheckbox.checked;
    textFieldShortcut.disabled = disabledCheckbox.checked;
  });
})();
