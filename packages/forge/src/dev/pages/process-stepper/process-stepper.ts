import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/process-stepper';
import '@tylertech/forge/avatar';

const outputs: Record<string, string> = {
  '#clickable-stepper': '#clickable-output',
  '#clickable-vertical-stepper': '#clickable-vertical-output'
};

Object.entries(outputs).forEach(([stepperSelector, outputSelector]) => {
  const stepper = document.querySelector(stepperSelector);
  const output = document.querySelector(outputSelector);

  stepper?.addEventListener('forge-process-stepper-change', (evt: Event) => {
    const { index, step } = (evt as CustomEvent).detail;
    if (output) {
      output.textContent = `Selected step ${index + 1}: ${step.labelText}`;
    }
  });
});
