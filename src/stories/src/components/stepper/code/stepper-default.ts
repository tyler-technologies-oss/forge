export const StepperDefaultHtml = () => `
<forge-stepper>
  <forge-step>Step One</forge-step>
  <forge-step>
    Step Two
    <span slot="optional">Optional</span>
  </forge-step>
  <forge-step>Step Three</forge-step>
  <forge-step>Step Four</forge-step>
  <forge-step>Done</forge-step>
</forge-stepper>
`;
