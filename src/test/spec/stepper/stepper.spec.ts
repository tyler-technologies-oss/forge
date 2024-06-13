import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { frame } from '@tylertech/forge/core/utils/utils';
import { IExpansionPanelComponent, IIconComponent } from '@tylertech/forge';
import {
  defineStepComponent,
  defineStepperComponent,
  IStepComponent,
  IStepConfiguration,
  IStepperComponent,
  IStepperConfiguration,
  STEPPER_CONSTANTS,
  STEP_CONSTANTS
} from '@tylertech/forge/stepper';
import { StepperUtils } from '@tylertech/forge/stepper/core/stepper-utils';

const DEFAULT_STEP_COUNT = 5;
const DEFAULT_STEPS: IStepConfiguration[] = [
  { label: 'Step one', completed: true },
  { label: 'Step two', optionalLabel: 'Optional' },
  { label: 'Step three', completed: true, editable: true }
];

interface ITestContext {
  context: ITestStepperContext
}

interface ITestStepperContext {
  component: IStepperComponent;
  getSteps(): IStepComponent[];
  getRootElement(): HTMLElement;
  append(): void;
  destroy(): void;
}

describe('StepperComponent', function (this: ITestContext) {
  beforeAll(function (this: ITestContext) {
    defineStepComponent();
    defineStepperComponent();
  });

  afterEach(function (this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
    expect(this.context.component).toBeDefined();
    expect(this.context.component.shadowRoot).toBeDefined();
  });

  it('should have proper default values', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
    expect(this.context.component.steps).toEqual([], 'Expected steps to be an empty array');
    expect(this.context.component.selectedIndex).toBe(0, 'Expected selectedIndex to be 0');
    expect(this.context.component.linear).toBe(false, 'Expected linear to be false');
    expect(this.context.component.alternative).toBe(false, 'Expected alternative to be false');
    expect(this.context.component.layoutMode).toBe('fixed', 'Expected layoutMode to be fixed');
    expect(this.context.component.layoutAlign).toBe('center', 'Expected layoutAlign to be center');
  });

  it('should reflect attributes to component properties', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    let cmp = document.createElement(STEPPER_CONSTANTS.elementName) as IStepperComponent;
    cmp.setAttribute(STEPPER_CONSTANTS.attributes.SELECTED_INDEX, '1');
    cmp.setAttribute(STEPPER_CONSTANTS.attributes.LINEAR, 'true');
    cmp.setAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE, 'true');
    cmp.setAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_MODE, 'fixed');
    cmp.setAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_ALIGN, 'left');

    document.body.appendChild(cmp);
    expect(cmp.selectedIndex).toBe(1);
    expect(cmp.linear).toBe(true);
    expect(cmp.alternative).toBe(true);
    expect(cmp.layoutMode).toBe('fixed');
    expect(cmp.layoutAlign).toBe('left');
    cmp.remove();
    cmp = undefined as any;
  });

  it('should handle invalid selectedIndex', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.selectedIndex = 'a' as any;
    expect(this.context.component.selectedIndex).toBe(0);

    this.context.component.selectedIndex = '1' as any;
    expect(this.context.component.selectedIndex).toBe(1);
  });

  it('should render the linear mode', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    const stepper = getShadowElement(this.context.component, STEPPER_CONSTANTS.selectors.STEPPER);

    this.context.component.linear = true;
    expect(this.context.component.getAttribute(STEPPER_CONSTANTS.attributes.LINEAR)).toBe('true');
    expect(stepper.classList.contains(STEPPER_CONSTANTS.classes.LINEAR)).toBe(true);

    this.context.component.linear = false;
    expect(this.context.component.getAttribute(STEPPER_CONSTANTS.attributes.LINEAR)).toBe('false');
    expect(stepper.classList.contains(STEPPER_CONSTANTS.classes.LINEAR)).toBe(false);
  });

  it('should render the alternative mode', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    const stepper = getShadowElement(this.context.component, STEPPER_CONSTANTS.selectors.STEPPER);

    this.context.component.alternative = true;
    expect(this.context.component.getAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE)).toBe('true');
    expect(stepper.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE)).toBe(true);

    this.context.component.alternative = false;
    expect(this.context.component.getAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE)).toBe('false');
    expect(stepper.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE)).toBe(false);
  });

  it('should render the layoutMode', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    const stepper = getShadowElement(this.context.component, STEPPER_CONSTANTS.selectors.STEPPER);

    this.context.component.layoutMode = 'clustered';
    expect(this.context.component.getAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_MODE)).toBe('clustered');
    expect(stepper.classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)).toBe(true);

    this.context.component.layoutMode = 'fixed';
  });

  it('should not update layout align if invalid value', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutAlign = 'start' as any;
    expect(this.context.component.layoutAlign).toBe('center');
  });

  it('should not update layout mode if invalid value', function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutMode = 'stretched-all-to-hell' as any;
    expect(this.context.component.layoutMode).toBe('fixed', 'has invalid layout mode');
  });

  it('should set left align by attribute', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutAlign = 'left';
    await frame();
    expect(this.context.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_LEFT)).toBe(true, 'did not correctly set alignment class');
  });

  it('should set center align by attribute', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutAlign = 'center';
    await frame();
    expect(this.context.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_CENTER)).toBe(true, 'did not correctly set alignment class');
  });

  it('should set right align by attribute', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutAlign = 'right';
    await frame();
    expect(this.context.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)).toBe(true, 'did not correctly set alignment class');
  });

  it('should remove all other alignment classes on change', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutAlign = 'right';
    this.context.component.layoutAlign = 'center';
    this.context.component.layoutAlign = 'left';
    this.context.component.layoutAlign = 'right';
    await frame();
    expect(this.context.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)).toBe(true, 'did not correctly set alignment class');
  });

  it('should remove all other layout mode classes on change', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    this.context.component.layoutMode = 'clustered';
    this.context.component.layoutMode = 'fixed';
    this.context.component.layoutMode = 'clustered';
    await frame();
    expect(this.context.getRootElement().classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)).toBe(true, 'did not correctly set layout class');
  });

  it('should not allow selection when stepper is set to linear', async function (this: ITestContext) {
    this.context = setupTestContext(false, DEFAULT_STEP_COUNT);
    this.context.component.linear = true;
    this.context.append();
    await frame();
    const originalSelectedIndex = this.context.component.selectedIndex;
    const stepOne = this.context.getSteps()[1];
    stepOne.click();
    await frame();

    expect(stepOne.selected).toBe(false, 'should not be selected when stepper is set to linear');
    expect(this.context.component.selectedIndex).toBe(originalSelectedIndex, 'expected stepper selected index to not have changed');
  });

  it('should disable all steps if stepper set to disabled by property', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    await frame();
    this.context.component.disabled = true;
    expect(this.context.getSteps().map(s => s.disabled).reduce((next, previous) => next && previous)).toBe(true, 'not all steps are disabled')
  });

  it('should enable all steps if stepper set to disabled by property', async function (this: ITestContext) {
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);

    await frame();
    this.context.component.setAttribute('disabled', '');
    await frame();
    this.context.component.removeAttribute('disabled');

    expect(this.context.getSteps().map(s => s.disabled).reduce((next, previous) => next && previous)).toBe(false, 'all steps are still disabled')
  });

  it('should not allow selected event to fire when disabled', async function (this: ITestContext) {
    const spy = jasmine.createSpy('selected spy');
    this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
    this.context.component.addEventListener(STEP_CONSTANTS.events.SELECT, spy);

    await frame();
    const stepOne = this.context.getSteps()[1];
    stepOne.disabled = true;

    stepOne.click();

    expect(spy).not.toHaveBeenCalled();

    this.context.component.removeEventListener(STEP_CONSTANTS.events.SELECT, spy);
  });

  describe('events', function (this: ITestContext) {
    it('should set selected by default when step is clicked', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      await frame();

      const stepElements = this.context.getSteps();
      const stepOne = stepElements[0];
      stepOne.click();
      expect(stepOne.selected).toBe(true, 'the step was not selected when it should be');
    });

    it('should focus next step when arrow right keys are used', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      await frame();

      const stepElements = this.context.getSteps();
      const stepOne = stepElements[0];
      const stepTwo = stepElements[1];
      stepOne.focus();
      stepOne.click();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      await frame();

      expect(stepTwo.matches(':focus-within')).toBeTrue();
    });

    it('should focus the last step when arrow left key is used at the start', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      await frame();

      const stepElements = this.context.getSteps();
      const stepOne = stepElements[0];
      const lastStep = stepElements[stepElements.length - 1];
      stepOne.focus();
      stepOne.click();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_LEFT_KEY }));
      await frame();

      expect(lastStep.matches(':focus-within')).toBeTrue();
    });

    it('should focus the last step when end key is used at the start', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      await frame();

      const stepElements = this.context.getSteps();
      const stepOne = stepElements[0];
      const lastStep = stepElements[stepElements.length - 1];
      stepOne.focus();
      stepOne.click();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.END_KEY }));
      await frame();

      expect(lastStep.matches(':focus-within')).toBeTrue();
    });

    it('should focus the last step when home key is used at the start', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      await frame();

      const stepElements = this.context.getSteps();
      const stepOne = stepElements[0];
      const stepThree = stepElements[2];
      stepThree.focus();
      stepThree.click();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.HOME_KEY }));
      await frame();

      expect(stepOne.matches(':focus-within')).toBeTrue();
    });

    it('should only allow keys from the accepted list', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      await frame();

      const stepElements = this.context.getSteps();
      const stepThree = stepElements[2];
      stepThree.click();
      stepThree.focus();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrorUp' }));
      await frame();

      expect(stepThree.matches(':focus-within')).toBeTrue();
    });

    it('should not allow keyboard keys when linear is enabled', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEP_COUNT);
      this.context.component.linear = true;
      this.context.append();
      await frame();

      const stepElements = this.context.getSteps();
      const stepThree = stepElements[2];
      stepThree.click();
      stepThree.focus();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY }));
      await frame();

      expect(stepThree.matches(':focus-within')).toBeTrue();
    });
  });

  describe('construction by html', function (this: ITestContext) {
    it('should render two steps', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [] };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);
      const step2 = StepperUtils.createStepElement({ label: 'Step Two', editable: true, optionalLabel: 'Getter Duuuun' }, 1, stepperConfig);

      this.context.component.appendChild(step1);
      this.context.component.appendChild(step2);
      this.context.append();

      await frame();

      expect(step1.hasAttribute(STEP_CONSTANTS.attributes.FIRST)).toBe(true, 'Did not get the attribute "first" when initialized');
      expect(step2.hasAttribute(STEP_CONSTANTS.attributes.LAST)).toBe(true, 'Did not get the attribute "last" when initialized');
    });

    it('should auto select when selected-index is set', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEP_COUNT);
      this.context.component.selectedIndex = 1;
      this.context.append();
      await frame();
      const stepTwo = this.context.getSteps()[1];
      expect(stepTwo.selected).toBe(true, ' was not auto selected by the stepper selected index');
    });

    it('should not select anything if selected index is undefined', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEP_COUNT);
      this.context.component.selectedIndex = undefined as any;
      this.context.append();
      await frame();
      const stepTwo = this.context.getSteps()[1];
      expect(stepTwo.selected).toBe(false, 'step two should not have been selected');
    });

    it('should unselect any selected steps when a new step is selected', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      this.context.component.selectedIndex = 1;
      await frame();
      this.context.component.selectedIndex = 2;
      const stepElements = this.context.getSteps();
      expect(stepElements[1].selected).toBe(false, 'should have deselected step two');
      expect(stepElements[2].selected).toBe(true, 'should have selected step trhee');
    });
  });

  describe('construction by configuration', function (this: ITestContext) {
    it('should render steps', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEPS.length);
      this.context.component.steps = DEFAULT_STEPS;
      await frame();
      expect(this.context.getSteps().length).toBe(DEFAULT_STEPS.length, 'should overwrite any existing steps');
      expect(this.context.getSteps()[0].textContent).toBe('Step one', 'should have the correct label configuration');
      expect(this.context.getSteps()[0].completed).toBe(true, 'should have the correct completed configuration');
      expect(this.context.getSteps()[0].alternative).toBe(false, 'should have the correct alternate configuration');
      expect(this.context.getSteps()[0].editable).toBe(false, 'should have the correct editable configuration');
    });

    it('should not render steps if not an array or is empty', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEP_COUNT);
      this.context.component.steps = undefined as any;
      await frame();
      expect(this.context.getSteps().length).toBe(DEFAULT_STEP_COUNT, 'should not overwrite any existing steps');

      this.context.component.steps = [];
      await frame();
      expect(this.context.getSteps().length).toBe(DEFAULT_STEP_COUNT, 'should not overwrite any existing steps');
    });

    it('should set step one to error', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEPS.length);
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].error = true;
      this.context.component.steps = newSteps;
      this.context.append();
      await frame();
      const stepOne = this.context.getSteps()[0];
      expect(stepOne.error).toBe(true, 'did not correctly get set as an error state');
    });

    it('should have correct icon when completed', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEPS.length);
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      this.context.component.steps = newSteps;
      this.context.append();
      await frame();
      const stepOne = this.context.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP).querySelector('forge-icon') as IIconComponent;

      expect(icon.name).toBe('check', 'Should have a check when completed');
    });


    it('should have correct icon when completed and editable', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEPS.length);
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      newSteps[0].editable = true;
      this.context.component.steps = newSteps;
      this.context.append();
      await frame();
      const stepOne = this.context.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP).querySelector('forge-icon') as IIconComponent;

      expect(icon.name).toBe('mode_edit', 'Should have a edit when completed and editable');
    });

    it('should have correct icon when completed and disabled', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEPS.length);
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].completed = true;
      newSteps[0].disabled = true;
      this.context.component.steps = newSteps;
      this.context.append();
      await frame();
      const stepOne = this.context.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP).querySelector('forge-icon') as IIconComponent;

      expect(icon.name).toBe('check', 'Should have a check when completed and disabled');
    });

    it('should have correct icon when disabled', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEPS.length);
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].disabled = true;
      newSteps[0].completed = false;
      this.context.component.steps = newSteps;
      this.context.append();
      await frame();
      const stepOne = this.context.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP).querySelector('forge-icon') as IIconComponent;
      await frame();

      expect(icon.name).toBe('block', 'Should have a block when disabled');
    });

    it('should have correct icon when editable and selected', async function (this: ITestContext) {
      this.context = setupTestContext(false, DEFAULT_STEPS.length);
      const newSteps = [...DEFAULT_STEPS.map(s => ({ ...s }))];
      newSteps[0].editable = true;
      newSteps[0].completed = false;
      this.context.component.selectedIndex = 0;
      this.context.component.steps = newSteps;
      this.context.append();
      await frame();
      const stepOne = this.context.getSteps()[0];
      const icon = getShadowElement(stepOne, STEP_CONSTANTS.selectors.STEP).querySelector('forge-icon') as IIconComponent;
      await frame();

      expect(icon.name).toBe('mode_edit', 'Should have a edit when selected and editable');
    });

    it('should set steps to vertical', async function (this: ITestContext) {
      this.context = setupTestContext(true, DEFAULT_STEPS.length);
      this.context.component.vertical = true;
      this.context.component.steps = DEFAULT_STEPS;
      await frame();

      this.context.component.steps = [...DEFAULT_STEPS];

      expect(this.context.getSteps().every(step => step.vertical)).toBeTrue();
    });
  });

  describe('vertical stepper', function (this: ITestContext) {
    it('should set vertical in component', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      this.context.component.vertical = true;
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [], };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);
      const step2 = StepperUtils.createStepElement({ label: 'Step Two', editable: true, optionalLabel: 'Getter Duuuun' }, 1, stepperConfig);

      this.context.component.appendChild(step1);
      this.context.component.appendChild(step2);
      this.context.append();

      await frame();
      const root = getShadowElement(this.context.component, STEPPER_CONSTANTS.selectors.STEPPER);
      expect(this.context.component.vertical).toBe(true);
      expect(root.classList.contains(STEPPER_CONSTANTS.classes.VERTICAL)).toBe(true);
    });

    it('should set expansion panel to open', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      this.context.component.vertical = true;
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [], vertical: true };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, expanded: true, vertical: true }, 0, stepperConfig);
      addStepExpandContent(step1);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();
      await frame();

      const expander = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_PANEL) as IExpansionPanelComponent;
      expect(expander.open).toBe(true);
    });

    it('should expand when step is clicked', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      this.context.component.vertical = true;
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [], vertical: true };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, vertical: true, }, 0, stepperConfig);
      addStepExpandContent(step1);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();
      await frame();

      step1.click();

      const expander = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_PANEL) as IExpansionPanelComponent;
      expect(expander.open).toBeTrue();
    });

    it('should ignore user expansion when clicked', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      this.context.component.vertical = true;
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [], vertical: true };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, vertical: true, ignoreUserExpansion: true }, 0, stepperConfig);
      addStepExpandContent(step1);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();
      await frame();

      step1.click();

      const expander = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_PANEL) as IExpansionPanelComponent;
      expect(expander.open).toBe(false);
    });

    it('should not display expander when not expandable', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      this.context.component.vertical = true;
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [], vertical: true };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false, vertical: true }, 0, stepperConfig);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();

      const expander = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_PANEL) as IExpansionPanelComponent;
      expect(getComputedStyle(expander).display).toBe('none');
    });

    it('should include expander if not vertical', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [] };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();

      const expander = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_PANEL) as IExpansionPanelComponent;
      expect(expander).toBeFalsy();
    });

    it('should not include expander if not vertical', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [] };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();
      this.context.component.vertical = true;
      await frame();
      this.context.component.vertical = false;
      await frame();

      const expander = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_PANEL) as IExpansionPanelComponent;
      expect(expander).toBeFalsy();
    });

    it('should not include expander icon if not vertical', async function (this: ITestContext) {
      this.context = setupTestContext(false, 0);
      const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [] };

      const step1 = StepperUtils.createStepElement({ label: 'Step One', completed: false }, 0, stepperConfig);

      this.context.component.appendChild(step1);
      this.context.append();

      await frame();
      this.context.component.vertical = true;
      await frame();
      this.context.component.vertical = false;
      await frame();

      const icon = getShadowElement(this.context.component.querySelector('forge-step') as HTMLElement, STEP_CONSTANTS.selectors.EXPANSION_ICON) as HTMLElement;
      expect(icon).toBeFalsy();
    });
  });

  function setupTestContext(append = false, numberOfSteps: number): ITestStepperContext {
    const fixture = document.createElement('div');
    fixture.id = 'stepper-test-fixture';
    const component = createStepperComponent(numberOfSteps);
    fixture.appendChild(component);
    if (append) document.body.appendChild(fixture);
    return {
      component,
      getSteps: () => Array.from(component.querySelectorAll(STEP_CONSTANTS.elementName)) as IStepComponent[],
      getRootElement: () => getShadowElement(component, STEPPER_CONSTANTS.selectors.STEPPER),
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }

  function createStepperComponent(numberOfSteps: number) {
    const stepper = document.createElement(STEPPER_CONSTANTS.elementName) as IStepperComponent;
    const stepperConfig: IStepperConfiguration = { alternative: false, layoutAlign: 'center', layoutMode: 'fixed', selectedIndex: -1, linear: false, steps: [] };
    new Array(numberOfSteps).fill(0).forEach((value, index) => {
      const step = StepperUtils.createStepElement({ label: `Step ${index}` }, index, stepperConfig);
      stepper.appendChild(step);
    });
    return stepper;
  }

  function addStepExpandContent(step: IStepComponent) {
    const div = document.createElement('div');
    div.setAttribute('slot', STEP_CONSTANTS.strings.EXPANSION_CONTENT_SLOT_NAME);
    div.textContent = 'Test';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'expanded-input';
    div.appendChild(input);
    step.appendChild(div);
  }
});
