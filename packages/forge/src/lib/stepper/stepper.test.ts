import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { task } from '../core/utils/utils.js';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IStepComponent } from './step/step.js';
import type { IStepperComponent } from './stepper/stepper.js';
import type { IExpansionPanelComponent } from '../expansion-panel/expansion-panel.js';
import type { IIconComponent } from '../icon/icon.js';
import { IStepConfiguration, IStepperConfiguration, STEPPER_CONSTANTS } from './stepper/stepper-constants.js';
import { STEP_CONSTANTS } from './step/step-constants.js';
import { StepperUtils } from './core/stepper-utils.js';

import './stepper/stepper.js';
import './step/step.js';

const DEFAULT_STEP_COUNT = 5;
const DEFAULT_STEPS: IStepConfiguration[] = [
  { label: 'Step one', completed: true },
  { label: 'Step two', optionalLabel: 'Optional' },
  { label: 'Step three', completed: true, editable: true }
];

describe('StepperComponent', () => {
  it('should be instantiated', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    expect(harness.element).toBeTruthy();
    expect(harness.element.shadowRoot).toBeTruthy();
  });

  it('should have proper default values', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    expect(harness.element.steps).toEqual([]);
    expect(harness.element.selectedIndex).toBe(0);
    expect(harness.element.linear).toBe(false);
    expect(harness.element.alternative).toBe(false);
    expect(harness.element.layoutMode).toBe('fixed');
    expect(harness.element.layoutAlign).toBe('center');
  });

  it('should reflect attributes to component properties', async () => {
    const screen = render(html` <forge-stepper selected-index="1" linear="true" alternative="true" layout-mode="fixed" layout-align="left"> </forge-stepper> `);
    const el = screen.container.querySelector('forge-stepper') as IStepperComponent;

    expect(el.selectedIndex).toBe(1);
    expect(el.linear).toBe(true);
    expect(el.alternative).toBe(true);
    expect(el.layoutMode).toBe('fixed');
    expect(el.layoutAlign).toBe('left');
  });

  it('should handle invalid selectedIndex', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.selectedIndex = 'a' as any;
    expect(harness.element.selectedIndex).toBe(0);

    harness.element.selectedIndex = '1' as any;
    expect(harness.element.selectedIndex).toBe(1);
  });

  it('should render the linear mode', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    const stepperRoot = harness.getRootElement();

    harness.element.linear = true;
    expect(harness.element.getAttribute(STEPPER_CONSTANTS.attributes.LINEAR)).toBe('true');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.LINEAR)).toBe(true);

    harness.element.linear = false;
    expect(harness.element.getAttribute(STEPPER_CONSTANTS.attributes.LINEAR)).toBe('false');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.LINEAR)).toBe(false);
  });

  it('should render the alternative mode', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    const stepperRoot = harness.getRootElement();

    harness.element.alternative = true;
    expect(harness.element.getAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE)).toBe('true');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE)).toBe(true);

    harness.element.alternative = false;
    expect(harness.element.getAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE)).toBe('false');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE)).toBe(false);
  });

  it('should render the layoutMode', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    const stepperRoot = harness.getRootElement();

    harness.element.layoutMode = 'clustered';
    expect(harness.element.getAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_MODE)).toBe('clustered');
    expect(stepperRoot.classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)).toBe(true);

    harness.element.layoutMode = 'fixed';
  });

  it('should not update layout align if invalid value', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutAlign = 'start' as any;
    expect(harness.element.layoutAlign).toBe('center');
  });

  it('should not update layout mode if invalid value', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutMode = 'stretched-all-to-hell' as any;
    expect(harness.element.layoutMode).toBe('fixed');
  });

  it('should set left align by attribute', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutAlign = 'left';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_LEFT)).toBe(true);
  });

  it('should set center align by attribute', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutAlign = 'center';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_CENTER)).toBe(true);
  });

  it('should set right align by attribute', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutAlign = 'right';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)).toBe(true);
  });

  it('should remove all other alignment classes on change', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutAlign = 'right';
    harness.element.layoutAlign = 'center';
    harness.element.layoutAlign = 'left';
    harness.element.layoutAlign = 'right';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)).toBe(true);
  });

  it('should remove all other layout mode classes on change', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    harness.element.layoutMode = 'clustered';
    harness.element.layoutMode = 'fixed';
    harness.element.layoutMode = 'clustered';
    await task();
    expect(harness.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)).toBe(true);
  });

  it('should not allow selection when stepper is set to linear', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT, linear: true });
    await task();
    const originalSelectedIndex = harness.element.selectedIndex;
    const stepOne = harness.getSteps()[1];
    stepOne.click();
    await task();

    expect(stepOne.selected).toBe(false);
    expect(harness.element.selectedIndex).toBe(originalSelectedIndex);
  });

  it('should disable all steps if stepper set to disabled by property', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    await task();
    harness.element.disabled = true;
    expect(harness.getSteps().every(s => s.disabled)).toBe(true);
  });

  it('should enable all steps if stepper set to disabled by property', async () => {
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });

    await task();
    harness.element.setAttribute('disabled', '');
    await task();
    harness.element.removeAttribute('disabled');

    expect(harness.getSteps().every(s => s.disabled)).toBe(false);
  });

  it('should not allow selected event to fire when disabled', async () => {
    const selectSpy = vi.fn();
    const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
    harness.element.addEventListener(STEP_CONSTANTS.events.SELECT, selectSpy);

    await task();
    const stepOne = harness.getSteps()[1];
    stepOne.disabled = true;

    stepOne.click();

    expect(selectSpy).not.toHaveBeenCalled();
  });

  describe('events', () => {
    it('should set selected by default when step is clicked', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      stepOne.click();
      expect(stepOne.selected).toBe(true);
    });

    it('should focus next step when arrow right keys are used', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const stepTwo = stepElements[1];
      stepOne.focus();
      stepOne.click();
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      await task();

      expect(stepTwo.matches(':focus-within')).toBe(true);
    });

    it('should focus the last step when arrow left key is used at the start', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const lastStep = stepElements[stepElements.length - 1];
      stepOne.focus();
      stepOne.click();
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_LEFT_KEY }));
      await task();

      expect(lastStep.matches(':focus-within')).toBe(true);
    });

    it('should focus the last step when end key is used at the start', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const lastStep = stepElements[stepElements.length - 1];
      stepOne.focus();
      stepOne.click();
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.END_KEY }));
      await task();

      expect(lastStep.matches(':focus-within')).toBe(true);
    });

    it('should focus the last step when home key is used at the start', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepOne = stepElements[0];
      const stepThree = stepElements[2];
      stepThree.focus();
      stepThree.click();
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.HOME_KEY }));
      await task();

      expect(stepOne.matches(':focus-within')).toBe(true);
    });

    it('should only allow keys from the accepted list', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      await task();

      const stepElements = harness.getSteps();
      const stepThree = stepElements[2];
      stepThree.click();
      stepThree.focus();
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrorUp' }));
      await task();

      expect(stepThree.matches(':focus-within')).toBe(true);
    });

    it('should not allow keyboard keys when linear is enabled', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT, linear: true });
      await task();

      const stepElements = harness.getSteps();
      const stepThree = stepElements[2];
      stepThree.click();
      stepThree.focus();
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      harness.element.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      await task();

      expect(stepThree.matches(':focus-within')).toBe(true);
    });
  });

  describe('construction by html', () => {
    it('should render two steps', async () => {
      const harness = await createFixture({ stepCount: 0 });
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

      harness.element.appendChild(step1);
      harness.element.appendChild(step2);

      await task();

      expect(step1.hasAttribute(STEP_CONSTANTS.attributes.FIRST)).toBe(true);
      expect(step2.hasAttribute(STEP_CONSTANTS.attributes.LAST)).toBe(true);
    });

    it('should auto select when selected-index is set', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT, selectedIndex: 1 });
      await task();
      const stepTwo = harness.getSteps()[1];
      expect(stepTwo.selected).toBe(true);
    });

    it('should not select anything if selected index is undefined', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT, selectedIndex: undefined as any });
      await task();
      const stepTwo = harness.getSteps()[1];
      expect(stepTwo.selected).toBe(false);
    });

    it('should unselect any selected steps when a new step is selected', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      harness.element.selectedIndex = 1;
      await task();
      harness.element.selectedIndex = 2;
      const stepElements = harness.getSteps();
      expect(stepElements[1].selected).toBe(false);
      expect(stepElements[2].selected).toBe(true);
    });
  });

  describe('construction by configuration', () => {
    it('should render steps', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      harness.element.steps = DEFAULT_STEPS;
      await task();
      expect(harness.getSteps().length).toBe(DEFAULT_STEPS.length);
      expect(harness.getSteps()[0].textContent).toBe('Step one');
      expect(harness.getSteps()[0].completed).toBe(true);
      expect(harness.getSteps()[0].alternative).toBe(false);
      expect(harness.getSteps()[0].editable).toBe(false);
    });

    it('should not render steps if not an array or is empty', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEP_COUNT });
      harness.element.steps = undefined as any;
      await task();
      expect(harness.getSteps().length).toBe(DEFAULT_STEP_COUNT);

      harness.element.steps = [];
      await task();
      expect(harness.getSteps().length).toBe(DEFAULT_STEP_COUNT);
    });

    it('should set step one to error', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].error = true;
      harness.element.steps = newSteps;
      await task();
      const stepOne = harness.getSteps()[0];
      expect(stepOne.error).toBe(true);
    });

    it('should have correct icon when completed', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      harness.element.steps = newSteps;
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;

      expect(icon.name).toBe('check');
    });

    it('should have correct icon when completed and editable', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      newSteps[0].editable = true;
      harness.element.steps = newSteps;
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;

      expect(icon.name).toBe('mode_edit');
    });

    it('should have correct icon when completed and disabled', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      newSteps[0].disabled = true;
      harness.element.steps = newSteps;
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;

      expect(icon.name).toBe('check');
    });

    it('should have correct icon when disabled', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].disabled = true;
      newSteps[0].completed = false;
      harness.element.steps = newSteps;
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;
      await task();

      expect(icon.name).toBe('block');
    });

    it('should have correct icon when editable and selected', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length, selectedIndex: 0 });
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].editable = true;
      newSteps[0].completed = false;
      harness.element.steps = newSteps;
      await task();
      const stepOne = harness.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP)!.querySelector('forge-icon') as IIconComponent;
      await task();

      expect(icon.name).toBe('mode_edit');
    });

    it('should set steps to vertical', async () => {
      const harness = await createFixture({ stepCount: DEFAULT_STEPS.length });
      harness.element.vertical = true;
      harness.element.steps = DEFAULT_STEPS;
      await task();

      harness.element.steps = [...DEFAULT_STEPS];

      expect(harness.getSteps().every(step => step.vertical)).toBe(true);
    });
  });

  describe('vertical stepper', () => {
    it('should set vertical in component', async () => {
      const harness = await createFixture({ stepCount: 0, vertical: true });
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

      harness.element.appendChild(step1);
      harness.element.appendChild(step2);

      await task();
      const root = getShadowElement(harness.element, STEPPER_CONSTANTS.selectors.STEPPER);
      expect(harness.element.vertical).toBe(true);
      expect(root!.classList.contains(STEPPER_CONSTANTS.classes.VERTICAL)).toBe(true);
    });

    it('should set expansion panel to open', async () => {
      const harness = await createFixture({ stepCount: 0, vertical: true });
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

      harness.element.appendChild(step1);

      await task();
      await task();

      const expander = getShadowElement(
        harness.element.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander.open).toBe(true);
    });

    it('should expand when step is clicked', async () => {
      const harness = await createFixture({ stepCount: 0, vertical: true });
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

      harness.element.appendChild(step1);

      await task();
      await task();

      step1.click();

      const expander = getShadowElement(
        harness.element.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander.open).toBe(true);
    });

    it('should ignore user expansion when clicked', async () => {
      const harness = await createFixture({ stepCount: 0, vertical: true });
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

      harness.element.appendChild(step1);

      await task();
      await task();

      step1.click();

      const expander = getShadowElement(
        harness.element.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander.open).toBe(false);
    });

    it('should not display expander when not expandable', async () => {
      const harness = await createFixture({ stepCount: 0, vertical: true });
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

      harness.element.appendChild(step1);

      await task();

      const expander = getShadowElement(
        harness.element.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(getComputedStyle(expander).display).toBe('none');
    });

    it('should include expander if not vertical', async () => {
      const harness = await createFixture({ stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      harness.element.appendChild(step1);

      await task();

      const expander = getShadowElement(
        harness.element.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander).toBeFalsy();
    });

    it('should not include expander if not vertical', async () => {
      const harness = await createFixture({ stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      harness.element.appendChild(step1);

      await task();
      harness.element.vertical = true;
      await task();
      harness.element.vertical = false;
      await task();

      const expander = getShadowElement(
        harness.element.querySelector('forge-step') as HTMLElement,
        STEP_CONSTANTS.selectors.EXPANSION_PANEL
      ) as IExpansionPanelComponent;
      expect(expander).toBeFalsy();
    });

    it('should not include expander icon if not vertical', async () => {
      const harness = await createFixture({ stepCount: 0 });
      const stepperConfig: IStepperConfiguration = {
        alternative: false,
        layoutAlign: 'center',
        layoutMode: 'fixed',
        selectedIndex: -1,
        linear: false,
        steps: []
      };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      harness.element.appendChild(step1);

      await task();
      harness.element.vertical = true;
      await task();
      harness.element.vertical = false;
      await task();

      const icon = getShadowElement(harness.element.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_ICON) as HTMLElement;
      expect(icon).toBeFalsy();
    });
  });
});

class StepperHarness extends TestHarness<IStepperComponent> {
  public initElementRefs(): void {}

  public getSteps(): IStepComponent[] {
    return Array.from(this.element.querySelectorAll(STEP_CONSTANTS.elementName)) as IStepComponent[];
  }

  public getRootElement(): HTMLElement {
    return getShadowElement(this.element, STEPPER_CONSTANTS.selectors.STEPPER)!;
  }
}

interface IStepperFixtureConfig {
  stepCount?: number;
  linear?: boolean;
  vertical?: boolean;
  selectedIndex?: number;
}

async function createFixture({ stepCount = 0, linear, vertical, selectedIndex }: IStepperFixtureConfig = {}): Promise<StepperHarness> {
  const stepper = createStepperComponent(stepCount);
  if (linear !== undefined) {
    stepper.linear = linear;
  }
  if (vertical !== undefined) {
    stepper.vertical = vertical;
  }
  if (selectedIndex !== undefined) {
    stepper.selectedIndex = selectedIndex;
  }

  const screen = render(html`<div></div>`);
  screen.container.querySelector('div')!.appendChild(stepper);

  return new StepperHarness(stepper);
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
