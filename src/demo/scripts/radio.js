(function () {
  var example = document.querySelector('#Radio');
  var radioGroup = example.querySelector('#example-radio-group');
  var selectNextButton = example.querySelector('#radio-select-next-btn');
  var addRadioButton = example.querySelector('#radio-select-add-btn');
  var removeRadioButton = example.querySelector('#radio-select-remove-btn');

  selectNextButton.addEventListener('click', selectNext);
  addRadioButton.addEventListener('click', addRadio);
  removeRadioButton.addEventListener('click', removeRadio);

  function selectNext() {
    const radioInputs = getRadioInputs();
    
    var i = 0;
    for (i; i < radioInputs.length; i++) {
      var radio = radioInputs[i];
      if (radio.checked) {
        break;
      }
    }

    selectedIndex = i + 1;
    if (selectedIndex > radioInputs.length - 1) {
      selectedIndex = 0;
    }

    radioInputs[selectedIndex].checked = true;
  }

  function addRadio() {
    const radioInputs = getRadioInputs();
    const newId = radioInputs.length + 1;
    const newRadio = document.createElement('forge-radio');

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'radio');
    newInput.setAttribute('id', `input-radio-example-${newId}`);
    newInput.setAttribute('name', 'radios-example');
    newRadio.append(newInput);

    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', `input-radio-example-${newId}`);
    newLabel.innerHTML = `Option ${newId}`;
    newRadio.append(newLabel);

    radioGroup.append(newRadio);
  }

  function removeRadio() {
    const radios = radioGroup.querySelectorAll('forge-radio');
    radios[radios.length - 1].remove();
  }

  function getRadioInputs() {
    return [...radioGroup.querySelectorAll('input[type=radio]')];
  }
  
})();
