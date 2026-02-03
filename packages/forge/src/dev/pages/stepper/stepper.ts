import '$src/shared';
import '@tylertech/forge/stepper';
import './stepper.scss';
import { IStepperComponent, IStepConfiguration, IStepComponent } from '@tylertech/forge/stepper';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

const stepper = document.querySelector('#demo-stepper') as IStepperComponent;
stepper.selectedIndex = 2;

stepper.addEventListener('forge-step-selected', ({ detail }) => {
  stepper.selectedIndex = detail;
  console.log('[forge-step-selected]: ', detail);
});

const steps: IStepConfiguration[] = [
  { label: 'Step one Step one', completed: true },
  { label: 'Step two', optionalLabel: 'Optional', completed: true, editable: true },
  { label: 'Step three', editable: true },
  { label: 'Step three', editable: true, error: true },
  { label: 'Step four', editable: true, completed: true },
  { label: 'Done' }
];

const stepperByConfig = document.querySelector('#demo-config-stepper') as IStepperComponent;
stepperByConfig.steps = steps;

const slotContent = document.createElement('div');
slotContent.setAttribute('slot', 'expansion-content');
slotContent.innerHTML = '<div style="padding: 24px;">Slotted content</div>';
document.querySelector('#vertical-stepper-content').appendChild(slotContent);

const layoutModeSelect = document.querySelector('#opt-layout-mode') as ISelectComponent;
layoutModeSelect.addEventListener('change', () => {
  stepper.layoutMode = layoutModeSelect.value;

  layoutAlignSelect.disabled = layoutModeSelect.value !== 'clustered';
  stepper.layoutAlign = layoutAlignSelect.value;
});

const layoutAlignSelect = document.querySelector('#opt-layout-align') as ISelectComponent;
layoutAlignSelect.addEventListener('change', () => {
  stepper.layoutAlign = layoutAlignSelect.value;
});

const linearToggle = document.querySelector('#opt-linear') as ISwitchComponent;
linearToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stepper.linear = selected;
});

const alternativeToggle = document.querySelector('#opt-alternative') as ISwitchComponent;
alternativeToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stepper.alternative = selected;
});

const firstStepDisabledToggle = document.querySelector('#opt-first-step-disabled') as ISwitchComponent;
firstStepDisabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const firstStep = document.querySelector('#stepper-step-one') as IStepComponent;
  firstStep.disabled = selected;
});
