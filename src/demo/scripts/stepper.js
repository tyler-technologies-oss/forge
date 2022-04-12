(function () {
  var stepperExample = document.querySelector('#Stepper');

  var stepperLinearCheckbox = stepperExample.querySelector('#stepperLinearCheckbox');
  stepperLinearCheckbox.checked = false;
  stepperLinearCheckbox.addEventListener('change', function () {
    stepper.linear = stepperLinearCheckbox.checked;
  });

  var stepperAlternativeCheckbox = stepperExample.querySelector('#stepperAlternativeCheckbox');
  stepperAlternativeCheckbox.checked = false;
  stepperAlternativeCheckbox.addEventListener('change', function () {
    stepper.alternative = stepperAlternativeCheckbox.checked;
  });

  var stepperDisableStepOneCheckbox = stepperExample.querySelector('#stepperDisableStepOneCheckbox');
  stepperDisableStepOneCheckbox.checked = false;
  stepperDisableStepOneCheckbox.addEventListener('change', function () {
    stepperExample.querySelector('#stepper-step-one').disabled = stepperDisableStepOneCheckbox.checked;
  });

  var stepperLayoutModeSelect = stepperExample.querySelector('#stepperLayoutModeSelect');
  stepperLayoutModeSelect.addEventListener('change', function (evt) {
    stepper.layoutMode = evt.target.value;

    stepperLayoutAlignSelect.disabled = evt.target.value !== 'clustered';
    stepper.layoutAlign = stepperLayoutAlignSelect.value;
  });

  var stepperLayoutAlignSelect = stepperExample.querySelector('#stepperLayoutAlignSelect');
  stepperLayoutAlignSelect.addEventListener('change', function (evt) {
    stepper.layoutAlign = evt.target.value;
  });
  stepperLayoutAlignSelect.disabled = true;

  var stepper = stepperExample.querySelector('forge-stepper');
  stepper.selectedIndex = 2;

  stepper.addEventListener('forge-step-selected', function (evt) {
    stepper.selectedIndex = evt.detail;
    console.log('[stepper] Step selected: ', evt.detail);
  });

  var steps = [
    { label: 'Step one Step one', completed: true },
    { label: 'Step two', optionalLabel: 'Optional', completed: true, editable: true },
    { label: 'Step three', editable: true },
    { label: 'Step three', editable: true, error: true },
    { label: 'Step four', editable: true, completed: true },
    { label: 'Done' }
  ];
  const stepperByConfig = stepperExample.querySelector('#StepperByConfig');
  stepperByConfig.steps = steps;
  setTimeout(() => {
    var slotContent = document.createElement('div');
    slotContent.setAttribute('slot', 'expansion-content');
    slotContent.innerHTML = '<div style="padding: 24px;">Slotted Content</div>';
    document.querySelector('#StepSetContentAfter').appendChild(slotContent);

  }, 500)

})();
