export const StepperConfigurationHtml = () => `
<forge-stepper></forge-stepper>
`;

export const StepperConfigurationTs = () => `
const stepper = document.querySelector('forge-stepper');
stepper.selectedIndex = 2;
stepper.current.steps = [
  { label: 'Step one', completed: true },
  { label: 'Step two', optionalLabel: 'Optional', completed: true, editable: true },
  { label: 'Step three' },
  { label: 'Step four' },
  { label: 'Done' }
];

// Listen for the event to know when a new step is selected
stepper.addEventListener('forge-stepper-select', evt => {
  stepper.selectedIndex = evt.detail; // The detail property contains the selected index.
});
`;
