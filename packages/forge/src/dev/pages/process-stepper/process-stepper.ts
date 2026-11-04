import '$src/shared';
import '@tylertech/forge/avatar';
import '@tylertech/forge/button';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/inline-message';
import '@tylertech/forge/label-value';
import '@tylertech/forge/process-stepper';
import type { ProcessStepperComponent } from '@tylertech/forge/process-stepper';
import './process-stepper.scss';

const outputs: Record<string, string> = {
  '#clickable-stepper': '#clickable-output',
  '#clickable-vertical-stepper': '#clickable-vertical-output'
};

Object.entries(outputs).forEach(([stepperSelector, outputSelector]) => {
  const stepper = document.querySelector<ProcessStepperComponent>(stepperSelector);
  const output = document.querySelector(outputSelector);

  stepper?.addEventListener('change', () => {
    const step = stepper.selectedStep;
    if (output && step) {
      output.textContent = `Selected step ${stepper.steps.indexOf(step) + 1}: ${step.labelText}`;
    }
  });
});
