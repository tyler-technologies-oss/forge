import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { task } from '../core/utils/utils';
import type { IStepComponent } from './step/step';
import type { IStepperComponent } from './stepper/stepper';
import type { IExpansionPanelComponent } from '../expansion-panel/expansion-panel';
import type { IIconComponent } from '../icon/icon';
import { IStepConfiguration, IStepperConfiguration, STEPPER_CONSTANTS } from './stepper/stepper-constants';
import { STEP_CONSTANTS } from './step/step-constants';
import { StepperUtils } from './core/stepper-utils';

import './stepper/stepper';
import './step/step';

const DEFAULT_STEP_COUNT = 5;
const DEFAULT_STEPS: IStepConfiguration[] = [
  { label: 'Step one', completed: true },
  { label: 'Step two', optionalLabel: 'Optional' },
  { label: 'Step three', completed: true, editable: true }
];

describe('StepperComponent', () => {
  it('should be instantiated', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    expect(harness.stepperElement).to.exist;
    expect(harness.stepperElement.shadowRoot).to.exist;
  });

  it('should have proper default values', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    expect(harness.stepperElement.steps).to.deep.equal([]);
    expect(harness.stepperElement.selectedIndex).to.equal(0);
    expect(harness.stepperElement.linear).to.be.false;
    expect(harness.stepperElement.alternative).to.be.false;
    expect(harness.stepperElement.layoutMode).to.equal('fixed');
    expect(harness.stepperElement.layoutAlign).to.equal('center');
  });

  it('should reflect attributes to component properties', async () => {
    const cmp = await fixture<IStepperComponent>(html`
      <forge-stepper selected-index="1" linear="true" alternative="true" layout-mode="fixed" layout-align="left"> </forge-stepper>
    `);

    expect(cmp.selectedIndex).to.equal(1);
    expect(cmp.linear).to.be.true;
    expect(cmp.alternative).to.be.true;
    expect(cmp.layoutMode).to.equal('fixed');
    expect(cmp.layoutAlign).to.equal('left');
  });

  it('should handle invalid selectedIndex', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.selectedIndex = 'a' as any;
    expect(harness.stepperElement.selectedIndex).to.equal(0);

    harness.stepperElement.selectedIndex = '1' as any;
    expect(harness.stepperElement.selectedIndex).to.equal(1);
  });

  it('should render the linear mode', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    const stepperRoot = harness.getRootElement();

    harness.stepperElement.linear = true;
    expect(harness.stepperElement.getAttribute(STEPPER_CONSTANTS.attributes.LINEAR)).to.equal('true');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.LINEAR)).to.be.true;

    harness.stepperElement.linear = false;
    expect(harness.stepperElement.getAttribute(STEPPER_CONSTANTS.attributes.LINEAR)).to.equal('false');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.LINEAR)).to.be.false;
  });

  it('should render the alternative mode', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    const stepperRoot = harness.getRootElement();

    harness.stepperElement.alternative = true;
    expect(harness.stepperElement.getAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE)).to.equal('true');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE)).to.be.true;

    harness.stepperElement.alternative = false;
    expect(harness.stepperElement.getAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE)).to.equal('false');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE)).to.be.false;
  });

  it('should render the layoutMode', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    const stepperRoot = harness.getRootElement();

    harness.stepperElement.layoutMode = 'clustered';
    expect(harness.stepperElement.getAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_MODE)).to.equal('clustered');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)).to.be.true;

    harness.stepperElement.layoutMode = 'fixed';
  });

  it('should not update layout align if invalid value', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutAlign = 'start' as any;
    expect(harness.stepperElement.layoutAlign).to.equal('center');
  });

  it('should not update layout mode if invalid value', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutMode = 'stretched-all-to-hell' as any;
    expect(harness.stepperElement.layoutMode).to.equal('fixed');
  });

  it('should set left align by attribute', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutAlign = 'left';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_LEFT)).to.be.true;
  });

  it('should set center align by attribute', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutAlign = 'center';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_CENTER)).to.be.true;
  });

  it('should set right align by attribute', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutAlign = 'right';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)).to.be.true;
  });

  it('should remove all other alignment classes on change', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutAlign = 'right';
    harness.stepperElement.layoutAlign = 'center';
    harness.stepperElement.layoutAlign = 'left';
    harness.stepperElement.layoutAlign = 'right';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)).to.be.true;
  });

  it('should remove all other layout mode classes on change', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    harness.stepperElement.layoutMode = 'clustered';
    harness.stepperElement.layoutMode = 'fixed';
    harness.stepperElement.layoutMode = 'clustered';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)).to.be.true;
  });

  it('should not allow selection when stepper is set to linear', async () => {
    const harness = await createFixture({ append: false, stepCount: DEFAULT_STEP_COUNT });
    harness.stepperElement.linear = true;
    harness.append();
    await task();
    const originalSelectedIndex = harness.stepperElement.selectedIndex;
    const stepOne = harness.getSteps()[1];
    stepOne.click();
    await task();

    expect(stepOne.selected).to.be.false;
    expect(harness.stepperElement.selectedIndex).to.equal(originalSelectedIndex);
  });

  it('should disable all steps if stepper set to disabled by property', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    await task();
    harness.stepperElement.disabled = true;
    expect(harness.getSteps().every(s => s.disabled)).to.be.true;
  });

  it('should enable all steps if stepper set to disabled by property', async () => {
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });

    await task();
    harness.stepperElement.setAttribute('disabled', '');
    await task();
    harness.stepperElement.removeAttribute('disabled');

    expect(harness.getSteps().every(s => s.disabled)).to.be.false;
  });

  it('should not allow selected event to fire when disabled', async () => {
    const selectSpy = spy();
    const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
    harness.stepperElement.addEventListener(STEP_CONSTANTS.events.SELECT, selectSpy);

    await task();
    const stepOne = harness.getSteps()[1];
    stepOne.disabled = true;

    stepOne.click();

    expect(selectSpy).not.to.have.been.called;
  });

  describe('events', () => {
    it('should set selected by default when step is clicked', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      stepOne.click();
      expect(stepOne.selected).to.be.true;
    });

    it('should focus next step when arrow right keys are used', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const stepTwo = stepElements[1];
      stepOne.focus();
      stepOne.click();
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      await task();

      expect(stepTwo.matches(':focus-within')).to.be.true;
    });

    it('should focus the last step when arrow left key is used at the start', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const lastStep = stepElements[stepElements.length - 1];
      stepOne.focus();
      stepOne.click();
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_LEFT_KEY }));
      await task();

      expect(lastStep.matches(':focus-within')).to.be.true;
    });

    it('should focus the last step when end key is used at the start', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const lastStep = stepElements[stepElements.length - 1];
      stepOne.focus();
      stepOne.click();
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.END_KEY }));
      await task();

      expect(lastStep.matches(':focus-within')).to.be.true;
    });

    it('should focus the last step when home key is used at the start', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const stepThree = stepElements[2];
      stepThree.focus();
      stepThree.click();
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.HOME_KEY }));
      await task();

      expect(stepOne.matches(':focus-within')).to.be.true;
    });

    it('should only allow keys from the accepted list', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepThree = stepElements[2];
      stepThree.click();
      stepThree.focus();
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrorUp' }));
      await task();

      expect(stepThree.matches(':focus-within')).to.be.true;
    });

    it('should not allow keyboard keys when linear is enabled', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEP_COUNT });
      harness.stepperElement.linear = true;
      harness.append();
      await task();

      const stepElements = harness.getSteps();
      const stepThree = stepElements[2];
      stepThree.click();
      stepThree.focus();
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      harness.stepperElement.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      await task();

      expect(stepThree.matches(':focus-within')).to.be.true;
    });
  });

  describe('construction by html', () => {
    it('should render two steps', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);
      const step2 = StepperUtils.createStepElement({ label: 'Step Two', editable: true, optionalLabel: 'Getter Duuuun' }, 1, stepperConfig);

      harness.stepperElement.appendChild(step1);
      harness.stepperElement.appendChild(step2);
      harness.append();

      await task();

      expect(step1.hasAttribute(STEP_CONSTANTS.attributes.FIRST)).to.be.true;
      expect(step2.hasAttribute(STEP_CONSTANTS.attributes.LAST)).to.be.true;
    });

    it('should auto select when selected-index is set', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEP_COUNT });
      harness.stepperElement.selectedIndex = 1;
      harness.append();
      await task();
      const stepTwo = harness.getSteps()[1];
      expect(stepTwo.selected).to.be.true;
    });

    it('should not select anything if selected index is undefined', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEP_COUNT });
      harness.stepperElement.selectedIndex = undefined as any;
      harness.append();
      await task();
      const stepTwo = harness.getSteps()[1];
      expect(stepTwo.selected).to.be.false;
    });

    it('should unselect any selected steps when a new step is selected', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      harness.stepperElement.selectedIndex = 1;
      await task();
      harness.stepperElement.selectedIndex = 2;
      const stepElements = harness.getSteps();
      expect(stepElements[1].selected).to.be.false;
      expect(stepElements[2].selected).to.be.true;
    });
  });

  describe('construction by configuration', () => {
    it('should render steps', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEPS.length });
      harness.stepperElement.steps = DEFAULT_STEPS;
      await task();
      expect(harness.getSteps().length).to.equal(DEFAULT_STEPS.length);
      expect(harness.getSteps()[0].textContent).to.equal('Step one');
      expect(harness.getSteps()[0].completed).to.be.true;
      expect(harness.getSteps()[0].alternative).to.be.false;
      expect(harness.getSteps()[0].editable).to.be.false;
    });

    it('should not render steps if not an array or is empty', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEP_COUNT });
      harness.stepperElement.steps = undefined as any;
      await task();
      expect(harness.getSteps().length).to.equal(DEFAULT_STEP_COUNT);

      harness.stepperElement.steps = [];
      await task();
      expect(harness.getSteps().length).to.equal(DEFAULT_STEP_COUNT);
    });

    it('should set step one to error', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].error = true;
      harness.stepperElement.steps = newSteps;
      harness.append();
      await task();
      const stepOne = harness.getSteps()[0];
      expect(stepOne.error).to.be.true;
    });

    it('should have correct icon when completed', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      harness.stepperElement.steps = newSteps;
      harness.append();
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;

      expect(icon.name).to.equal('check');
    });

    it('should have correct icon when completed and editable', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      newSteps[0].editable = true;
      harness.stepperElement.steps = newSteps;
      harness.append();
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;

      expect(icon.name).to.equal('mode_edit');
    });

    it('should have correct icon when completed and disabled', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      newSteps[0].disabled = true;
      harness.stepperElement.steps = newSteps;
      harness.append();
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;

      expect(icon.name).to.equal('check');
    });

    it('should have correct icon when disabled', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].disabled = true;
      newSteps[0].completed = false;
      harness.stepperElement.steps = newSteps;
      harness.append();
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;
      await task();

      expect(icon.name).to.equal('block');
    });

    it('should have correct icon when editable and selected', async () => {
      const harness = await createFixture({ append: false, stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].editable = true;
      newSteps[0].completed = false;
      harness.stepperElement.selectedIndex = 0;
      harness.stepperElement.steps = newSteps;
      harness.append();
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;
      await task();

      expect(icon.name).to.equal('mode_edit');
    });

    it('should set steps to vertical', async () => {
      const harness = await createFixture({ append: true, stepCount: DEFAULT_STEPS.length });
      harness.stepperElement.vertical = true;
      harness.stepperElement.steps = DEFAULT_STEPS;
      await task();

      harness.stepperElement.steps = [...DEFAULT_STEPS];

      expect(harness.getSteps().every(step => step.vertical)).to.be.true;
    });
  });

  describe('vertical stepper', () => {
    it('should set vertical in component', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      harness.stepperElement.vertical = true;
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);
      const step2 = StepperUtils.createStepElement({ label: 'Step Two', editable: true, optionalLabel: 'Getter Duuuun' }, 1, stepperConfig);

      harness.stepperElement.appendChild(step1);
      harness.stepperElement.appendChild(step2);
      harness.append();

      await task();
      const root = getShadowElement(harness.stepperElement, STEPPER_CONSTANTS.selectors.STEPPER);
      expect(harness.stepperElement.vertical).to.be.true;
      expect(root!.classList.contains(STEPPER_CONSTANTS.classes.VERTICAL)).to.be.true;
    });

    it('should set expansion panel to open', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      harness.stepperElement.vertical = true;
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: [],
        vertical: true
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, expanded: true, vertical: true }, 0, stepperConfig);
      addStepExpandContent(step1);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();
      await task();

      const expander = getShadowElement(
        harness.stepperElement.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander.open).to.be.true;
    });

    it('should expand when step is clicked', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      harness.stepperElement.vertical = true;
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: [],
        vertical: true
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, vertical: true }, 0, stepperConfig);
      addStepExpandContent(step1);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();
      await task();

      step1.click();

      const expander = getShadowElement(
        harness.stepperElement.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander.open).to.be.true;
    });

    it('should ignore user expansion when clicked', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      harness.stepperElement.vertical = true;
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: [],
        vertical: true
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, vertical: true, ignoreUserExpansion: true }, 0, stepperConfig);
      addStepExpandContent(step1);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();
      await task();

      step1.click();

      const expander = getShadowElement(
        harness.stepperElement.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander.open).to.be.false;
    });

    it('should not display expander when not expandable', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      harness.stepperElement.vertical = true;
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: [],
        vertical: true
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, vertical: true }, 0, stepperConfig);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();

      const expander = getShadowElement(
        harness.stepperElement.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(getComputedStyle(expander).display).to.equal('none');
    });

    it('should include expander if not vertical', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();

      const expander = getShadowElement(
        harness.stepperElement.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander).to.not.exist;
    });

    it('should not include expander if not vertical', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();
      harness.stepperElement.vertical = true;
      await task();
      harness.stepperElement.vertical = false;
      await task();

      const expander = getShadowElement(
        harness.stepperElement.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander).to.not.exist;
    });

    it('should not include expander icon if not vertical', async () => {
      const harness = await createFixture({ append: false, stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      harness.stepperElement.appendChild(step1);
      harness.append();

      await task();
      harness.stepperElement.vertical = true;
      await task();
      harness.stepperElement.vertical = false;
      await task();

      const icon = getShadowElement(harness.stepperElement.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_ICON) as HTMLElement;
      expect(icon).to.not.exist;
    });
  });
});

class StepperHarness {
  public container: HTMLElement;

  constructor(
    public stepperElement: IStepperComponent,
    container: HTMLElement,
    private _appended: boolean
  ) {
    this.container = container;
  }

  public getSteps(): IStepComponent[] {
    return Array.from(this.stepperElement.querySelectorAll(STEP_CONSTANTS.elementName)) as IStepComponent[];
  }

  public getRootElement(): HTMLElement {
    return getShadowElement(this.stepperElement, STEPPER_CONSTANTS.selectors.STEPPER)!;
  }

  public append(): void {
    if (!this._appended) {
      document.body.appendChild(this.container);
      this._appended = true;
    }
  }

  public destroy(): void {
    this.container.remove();
  }
}

interface IStepperFixtureConfig {
  append?: boolean;
  stepCount?: number;
}

async function createFixture({ append = false, stepCount = 0 }: IStepperFixtureConfig = {}): Promise<StepperHarness> {
  const container = document.createElement('div');
  const stepper = createStepperComponent(stepCount);
  container.appendChild(stepper);

  if (append) {
    document.body.appendChild(container);
  }

  return new StepperHarness(stepper, container, append);
}

function createStepperComponent(numberOfSteps: number): IStepperComponent {
  const stepper = document.createElement(STEPPER_CONSTANTS.elementName) as IStepperComponent;
  const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [] };
  new Array(numberOfSteps).fill(0).forEach((value, index) => {
    const step = StepperUtils.createStepElement({ label: `Step ${index}` }, index, stepperConfig);
    stepper.appendChild(step);
  });
  return stepper;
}

function addStepExpandContent(step: IStepComponent): void {
  const div = document.createElement('div');
  div.setAttribute('slot', STEP_CONSTANTS.strings.EXPANSION_CONTENT_SLOT_NAME);
  div.textContent = 'Test';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'expanded-input';
  div.appendChild(input);
  step.appendChild(div);
}
