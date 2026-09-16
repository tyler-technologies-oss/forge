import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/process-stepper';
import '@tylertech/forge/avatar';

const stepper = document.querySelector('#clickable-stepper');
const output = document.querySelector('#clickable-output');

stepper?.addEventListener('forge-process-stepper-change', (evt: Event) => {
  const { index, step } = (evt as CustomEvent).detail;
  if (output) {
    output.textContent = `Selected step ${index + 1}: ${step.label}`;
  }
});
