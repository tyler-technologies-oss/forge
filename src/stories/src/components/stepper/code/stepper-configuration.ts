export const StepperConfigurationHtml = () =>
  `
<forge-stepper alternative></forge-stepper>
`.trim();

export const StepperConfigurationTs = () => `
stepper.current.steps = [
  { label: 'Step one', completed: true },
  { label: 'Step two', optionalLabel: 'Optional', completed: true, editable: true },
  { label: 'Step three' },
  { label: 'Step four' },
  { label: 'Done' }
];

stepper.selectedIndex = 2;
// Listen for the event to know when a new step is selected
stepper.addEventListener('forge-stepper-select', evt => {
  stepper.selectedIndex = evt.detail; // The detail property contains the selected index.
});
`;

export const StepperConfigurationBlazor = () =>`
<ForgeStepper Alternative="@true" Steps="MySteps" />

@code {
  List<StepConfiguration> MySteps = new List<StepConfiguration>()
  {
    new StepConfiguration() { Label = "Step one", Completed = true },
    new StepConfiguration() { Label = "Step two", OptionalLabel = "Optional", Editable = true, Completed = true },
    new StepConfiguration() { Label = "Step three" },
    new StepConfiguration() { Label = "Step four" },
    new StepConfiguration() { Label = "Done" },
  }
}
`;
