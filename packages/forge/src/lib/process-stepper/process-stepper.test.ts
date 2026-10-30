import { LiveAnnouncer } from '@tylertech/forge-core';
import { html } from 'lit';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { supportsElementInternalsAria } from '../core/utils/feature-detection.js';
import { ProcessStepComponent } from './process-step/process-step.js';
import { ProcessStepperComponent } from './process-stepper/process-stepper.js';

import './process-step/process-step.js';
import './process-stepper/process-stepper.js';
import '../focus-indicator/focus-indicator.js';

vi.mock('../core/utils/feature-detection.js', async importOriginal => {
  const actual = await importOriginal<typeof import('../core/utils/feature-detection.js')>();
  return { ...actual, supportsElementInternalsAria: vi.fn(actual.supportsElementInternalsAria) };
});

interface IHarness {
  stepper: ProcessStepperComponent;
  steps: ProcessStepComponent[];
}

async function createFixture(
  template = html`
    <forge-process-stepper>
      <forge-process-step state="completed">One</forge-process-step>
      <forge-process-step state="current">Two</forge-process-step>
      <forge-process-step>Three</forge-process-step>
    </forge-process-stepper>
  `
): Promise<IHarness> {
  const screen = render(template);
  const stepper = screen.container.querySelector('forge-process-stepper') as ProcessStepperComponent;
  await stepper.updateComplete;
  const steps = Array.from(screen.container.querySelectorAll('forge-process-step')) as ProcessStepComponent[];
  await Promise.all(steps.map(step => step.updateComplete));

  return { stepper, steps };
}

function getControl(step: ProcessStepComponent): HTMLElement {
  return step.shadowRoot?.querySelector('.control') as HTMLElement;
}

describe('ProcessStepper', () => {
  describe('stepper container', () => {
    it('should instantiate', async () => {
      const { stepper } = await createFixture();

      expect(stepper).toBeInstanceOf(ProcessStepperComponent);
      expect(stepper.shadowRoot).not.toBeNull();
    });

    it('should have list role', async () => {
      const { stepper } = await createFixture();

      expect(stepper.getAttribute('role')).toBe('list');
    });

    it('should match the vertical state by default', async () => {
      const { stepper } = await createFixture();

      expect(stepper.matches(':state(vertical)')).toBe(true);
      expect(stepper.matches(':state(horizontal)')).toBe(false);
    });

    it('should match the horizontal state when the orientation is horizontal', async () => {
      const { stepper } = await createFixture();

      stepper.orientation = 'horizontal';
      await stepper.updateComplete;

      expect(stepper.matches(':state(horizontal)')).toBe(true);
      expect(stepper.matches(':state(vertical)')).toBe(false);
    });

    it('should match the readonly state only when readonly', async () => {
      const { stepper } = await createFixture();
      expect(stepper.matches(':state(readonly)')).toBe(false);

      stepper.readonly = true;
      await stepper.updateComplete;
      expect(stepper.matches(':state(readonly)')).toBe(true);

      stepper.readonly = false;
      await stepper.updateComplete;
      expect(stepper.matches(':state(readonly)')).toBe(false);
    });

    it('should default to the vertical orientation', async () => {
      const { stepper } = await createFixture();

      expect(stepper.orientation).toBe('vertical');
      expect(stepper.shadowRoot?.querySelector('.forge-process-stepper.vertical')).toBeTruthy();
    });

    it('should render the horizontal orientation when set', async () => {
      const { stepper } = await createFixture(html`
        <forge-process-stepper orientation="horizontal">
          <forge-process-step>One</forge-process-step>
        </forge-process-stepper>
      `);

      expect(stepper.shadowRoot?.querySelector('.forge-process-stepper.horizontal')).toBeTruthy();
    });

    it('should expose its steps', async () => {
      const { stepper, steps } = await createFixture();

      expect(stepper.steps).toEqual(steps);
    });

    it('should report progress as the fraction of completed steps', async () => {
      const { stepper } = await createFixture();

      expect(stepper.progress).toBeCloseTo(1 / 3);
    });

    it('should report zero progress when there are no steps', async () => {
      const { stepper } = await createFixture(html`<forge-process-stepper></forge-process-stepper>`);

      expect(stepper.progress).toBe(0);
    });
  });

  describe('step synchronization', () => {
    function markerText(step: ProcessStepComponent): string {
      return step.shadowRoot?.querySelector('.marker')?.textContent?.trim() ?? '';
    }

    it('should number each step by its position when numbered', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper numbered>
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
          <forge-process-step>Three</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.map(markerText)).toEqual(['1', '2', '3']);
    });

    it('should not number steps by default', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.map(markerText)).toEqual(['', '']);
    });

    it('should renumber the steps when a step is added', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper numbered>
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);

      const added = document.createElement('forge-process-step');
      stepper.insertBefore(added, steps[0]);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await Promise.all([added, ...steps].map(step => step.updateComplete));

      expect([added, ...steps].map(markerText)).toEqual(['1', '2', '3']);
    });

    it('should lay out each step in the orientation of the stepper', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper orientation="horizontal">
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.every(step => step.shadowRoot?.querySelector('.forge-process-step.horizontal'))).toBe(true);

      stepper.orientation = 'vertical';
      await stepper.updateComplete;
      await Promise.all(steps.map(step => step.updateComplete));

      expect(steps.every(step => step.shadowRoot?.querySelector('.forge-process-step.vertical'))).toBe(true);
    });

    it('should not overwrite positional aria attributes set on a step', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step aria-posinset="4" aria-setsize="10">Four</forge-process-step>
          <forge-process-step aria-posinset="5" aria-setsize="10">Five</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.map(step => step.getAttribute('aria-posinset'))).toEqual(['4', '5']);
      expect(steps.map(step => step.getAttribute('aria-setsize'))).toEqual(['10', '10']);
    });

    it('should number a step from its aria-posinset when set', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper numbered>
          <forge-process-step aria-posinset="4">Four</forge-process-step>
          <forge-process-step aria-posinset="5">Five</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.map(markerText)).toEqual(['4', '5']);
    });
  });

  describe('progress announcements', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should not announce anything on the initial render', async () => {
      const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');

      await createFixture();

      expect(announceSpy).not.toHaveBeenCalled();
    });

    it('should announce the step the process moves to', async () => {
      const { steps } = await createFixture();
      const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');

      steps[1].state = 'completed';
      steps[2].state = 'current';
      await steps[2].updateComplete;

      expect(announceSpy).toHaveBeenCalledOnce();
      expect(announceSpy).toHaveBeenCalledWith('Step 3 of 3: Three', 'polite');
    });

    it('should announce the position when a step has no label', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step state="current"></forge-process-step>
          <forge-process-step></forge-process-step>
        </forge-process-stepper>
      `);
      const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');

      steps[0].state = 'completed';
      steps[1].state = 'current';
      await steps[1].updateComplete;

      expect(announceSpy).toHaveBeenCalledWith('Step 2 of 2', 'polite');
    });

    it('should announce the position from aria-posinset and aria-setsize when set', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step aria-posinset="4" aria-setsize="10" state="current">Four</forge-process-step>
          <forge-process-step aria-posinset="5" aria-setsize="10">Five</forge-process-step>
        </forge-process-stepper>
      `);
      const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');

      steps[0].state = 'completed';
      steps[1].state = 'current';
      await steps[1].updateComplete;

      expect(announceSpy).toHaveBeenCalledWith('Step 5 of 10: Five', 'polite');
    });

    it('should not announce a step that is not within a stepper', async () => {
      const screen = render(html`<forge-process-step>One</forge-process-step>`);
      const step = screen.container.querySelector('forge-process-step') as ProcessStepComponent;
      await step.updateComplete;
      const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');

      step.state = 'current';
      await step.updateComplete;

      expect(announceSpy).not.toHaveBeenCalled();
    });
  });

  describe('compact layout', () => {
    /** Waits for the resize observer to report a width change and the stepper to settle. */
    async function settle(stepper: ProcessStepperComponent, expected: boolean): Promise<void> {
      for (let i = 0; i < 30 && stepper.compact !== expected; i++) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      await stepper.updateComplete;
    }

    async function createSized(width: string, orientation = 'horizontal'): Promise<IHarness & { host: HTMLElement }> {
      const screen = render(html`
        <div style="width: ${width}">
          <forge-process-stepper orientation=${orientation}>
            <forge-process-step state="completed">One</forge-process-step>
            <forge-process-step state="current">Two</forge-process-step>
            <forge-process-step>Three</forge-process-step>
            <forge-process-step>Four</forge-process-step>
          </forge-process-stepper>
        </div>
      `);
      const host = screen.container.querySelector('div') as HTMLElement;
      const stepper = screen.container.querySelector('forge-process-stepper') as ProcessStepperComponent;
      const steps = Array.from(screen.container.querySelectorAll('forge-process-step')) as ProcessStepComponent[];

      await settle(stepper, orientation === 'horizontal' && width === '320px');
      await Promise.all(steps.map(step => step.updateComplete));

      return { host, stepper, steps };
    }

    it('should not be compact in a wide container', async () => {
      const { stepper } = await createSized('900px');

      expect(stepper.compact).toBe(false);
      expect(stepper.shadowRoot?.querySelector('.forge-process-stepper.horizontal')).toBeTruthy();
    });

    it('should collapse to the vertical layout in a narrow container', async () => {
      const { stepper, steps } = await createSized('320px');

      expect(stepper.compact).toBe(true);
      expect(stepper.shadowRoot?.querySelector('.forge-process-stepper.vertical.compact')).toBeTruthy();
      expect(steps.every(step => step.shadowRoot?.querySelector('.forge-process-step.vertical'))).toBe(true);
    });

    it('should keep the orientation attribute unchanged when compact', async () => {
      const { stepper } = await createSized('320px');

      expect(stepper.orientation).toBe('horizontal');
    });

    it('should return to the horizontal layout when the container widens', async () => {
      const { host, stepper } = await createSized('320px');
      expect(stepper.compact).toBe(true);

      host.style.width = '900px';
      await settle(stepper, false);

      expect(stepper.compact).toBe(false);
      expect(stepper.shadowRoot?.querySelector('.forge-process-stepper.horizontal')).toBeTruthy();
      await Promise.all(stepper.steps.map(step => step.updateComplete));
      expect(stepper.steps.every(step => step.shadowRoot?.querySelector('.forge-process-step.horizontal'))).toBe(true);
    });

    it('should keep its layout when the container is hidden', async () => {
      const { host, stepper } = await createSized('320px');
      expect(stepper.compact).toBe(true);

      host.style.display = 'none';
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }

      expect(stepper.compact).toBe(true);
    });

    it('should not be compact when the stepper is vertical', async () => {
      const { stepper } = await createSized('320px', 'vertical');

      expect(stepper.compact).toBe(false);
    });
  });

  describe('selection', () => {
    it('should dispatch a change event when a step is activated', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      getControl(steps[1]).click();

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].target).toBe(stepper);
    });

    it('should expose the activated step as the selected step', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);
      let selected: ProcessStepComponent | null = null;
      stepper.addEventListener('change', evt => (selected = (evt.target as ProcessStepperComponent).selectedStep));

      getControl(steps[1]).click();

      expect(selected).toBe(steps[1]);
      expect(stepper.selectedStep).toBe(steps[1]);
    });

    it('should not have a selected step before a step is activated', async () => {
      const { stepper } = await createFixture();

      expect(stepper.selectedStep).toBeNull();
    });

    it('should clear the selected step when it is removed', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step>One</forge-process-step>
        </forge-process-stepper>
      `);

      getControl(steps[0]).click();
      steps[0].remove();

      expect(stepper.selectedStep).toBeNull();
    });

    it('should dispatch a change event for a link step', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step href="#cart">One</forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      getControl(steps[0]).addEventListener('click', evt => evt.preventDefault());
      getControl(steps[0]).click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should not dispatch a change event for a select event from an element that is not a step', async () => {
      const { stepper } = await createFixture();
      const spy = vi.fn();
      stepper.addEventListener('change', spy);
      const other = document.createElement('div');
      stepper.append(other);

      other.dispatchEvent(new Event('forge-process-step-select', { bubbles: true }));

      expect(spy).not.toHaveBeenCalled();
      expect(stepper.selectedStep).toBeNull();
    });

    it('should not dispatch a change event when a disabled step is clicked', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step href="#cart" disabled>One</forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      getControl(steps[0]).click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not dispatch a change event when the step is clicked outside its control', async () => {
      const { stepper, steps } = await createFixture();
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      steps[0].click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not dispatch a change event for content outside the label', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step>
            One
            <button slot="detail">Advance</button>
          </forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      steps[0].querySelector('button')?.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('ProcessStep', () => {
  async function createStep(template: ReturnType<typeof html>): Promise<ProcessStepComponent> {
    const screen = render(template);
    const step = screen.container.querySelector('forge-process-step') as ProcessStepComponent;
    await step.updateComplete;
    return step;
  }

  it('should instantiate', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    expect(step).toBeInstanceOf(ProcessStepComponent);
    expect(step.shadowRoot).not.toBeNull();
  });

  it('should have listitem role', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    expect(step.getAttribute('role')).toBe('listitem');
  });

  it('should default to the not-started state', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    expect(step.state).toBe('not-started');
  });

  it('should render the label', async () => {
    const step = await createStep(html`<forge-process-step>Fees paid</forge-process-step>`);

    expect(step.labelText).toBe('Fees paid');
  });

  it('should scope the label text to the label slot', async () => {
    const step = await createStep(html`
      <forge-process-step>
        Suspension
        <span slot="detail">Started: 02/03/2026</span>
        <button slot="detail">Advance</button>
      </forge-process-step>
    `);

    expect(step.labelText).toBe('Suspension');
  });

  it('should set aria-current when the step is current', async () => {
    const step = await createStep(html`<forge-process-step state="current"></forge-process-step>`);

    expect(step.getAttribute('aria-current')).toBe('step');
  });

  it('should not set aria-current when the step is not current', async () => {
    const step = await createStep(html`<forge-process-step state="completed"></forge-process-step>`);

    expect(step.hasAttribute('aria-current')).toBe(false);
  });

  it('should not reflect its properties to attributes', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    step.state = 'completed';
    step.href = '#one';
    step.disabled = true;
    await step.updateComplete;

    expect(step.hasAttribute('state')).toBe(false);
    expect(step.hasAttribute('href')).toBe(false);
    expect(step.hasAttribute('disabled')).toBe(false);
  });

  it('should keep the marker icon of its state when disabled', async () => {
    const step = await createStep(html`<forge-process-step state="completed" disabled></forge-process-step>`);

    expect(step.shadowRoot?.querySelector('.marker forge-icon')?.getAttribute('name')).toBe('check_circle');
  });

  it.each(['not-started', 'current', 'in-progress', 'completed', 'critical'] as const)('should match only the %s state when in that state', async state => {
    const step = await createStep(html`<forge-process-step .state=${state}></forge-process-step>`);
    const states = ['not-started', 'current', 'in-progress', 'completed', 'critical'];

    states.forEach(other => expect(step.matches(`:state(${other})`)).toBe(other === state));
  });

  it('should update the matched state when the state changes', async () => {
    const step = await createStep(html`<forge-process-step state="current"></forge-process-step>`);

    step.state = 'completed';
    await step.updateComplete;

    expect(step.matches(':state(current)')).toBe(false);
    expect(step.matches(':state(completed)')).toBe(true);
  });

  it('should match the readonly state only when the stepper is readonly', async () => {
    const { stepper, steps } = await createFixture();
    const [step] = steps;
    expect(step.matches(':state(readonly)')).toBe(false);

    stepper.readonly = true;
    await stepper.updateComplete;
    await step.updateComplete;
    expect(step.matches(':state(readonly)')).toBe(true);

    stepper.readonly = false;
    await stepper.updateComplete;
    await step.updateComplete;
    expect(step.matches(':state(readonly)')).toBe(false);
  });

  it('should not match the readonly state when not in a stepper', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    expect(step.matches(':state(readonly)')).toBe(false);
  });

  it('should match the vertical state when not in a stepper', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    expect(step.matches(':state(vertical)')).toBe(true);
    expect(step.matches(':state(horizontal)')).toBe(false);
  });

  it.each(['vertical', 'horizontal'] as const)('should match the %s state when the stepper has that orientation', async orientation => {
    const screen = render(html`
      <forge-process-stepper .orientation=${orientation}>
        <forge-process-step>One</forge-process-step>
      </forge-process-stepper>
    `);
    const step = screen.container.querySelector('forge-process-step') as ProcessStepComponent;
    await step.updateComplete;

    expect(step.matches(':state(vertical)')).toBe(orientation === 'vertical');
    expect(step.matches(':state(horizontal)')).toBe(orientation === 'horizontal');
  });

  it('should match the disabled state when disabled', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    step.disabled = true;
    await step.updateComplete;

    expect(step.matches(':state(disabled)')).toBe(true);
    expect(getComputedStyle(step.shadowRoot?.querySelector('.header') as HTMLElement).opacity).toBe('0.38');
    expect(getComputedStyle(step.shadowRoot?.querySelector('.detail') as HTMLElement).opacity).toBe('0.38');
  });

  it('should return an empty label before it is connected', () => {
    const step = document.createElement('forge-process-step');

    expect(step.labelText).toBe('');
  });

  it('should keep working after being moved within the DOM', async () => {
    const { stepper, steps } = await createFixture(html`
      <forge-process-stepper>
        <forge-process-step>One</forge-process-step>
        <forge-process-step>Two</forge-process-step>
      </forge-process-stepper>
    `);
    const spy = vi.fn();
    stepper.addEventListener('change', spy);

    stepper.append(steps[0]);
    await steps[0].updateComplete;
    getControl(steps[0]).click();

    expect(spy).toHaveBeenCalledOnce();
  });

  describe('positional aria without element internals support', () => {
    afterEach(() => {
      vi.mocked(supportsElementInternalsAria).mockRestore();
    });

    it('should leave the positional aria attributes set on the step unchanged', async () => {
      vi.mocked(supportsElementInternalsAria).mockReturnValue(false);

      const step = await createStep(html`<forge-process-step aria-posinset="4" aria-setsize="10">Four</forge-process-step>`);

      expect(step.getAttribute('aria-posinset')).toBe('4');
      expect(step.getAttribute('aria-setsize')).toBe('10');
    });
  });

  describe('disabled', () => {
    it('should disable the button when the step is disabled', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);

      step.disabled = true;
      await step.updateComplete;

      expect((getControl(step) as HTMLButtonElement).disabled).toBe(true);
    });

    it('should enable the button when the step is enabled', async () => {
      const step = await createStep(html`<forge-process-step disabled>One</forge-process-step>`);

      step.disabled = false;
      await step.updateComplete;

      expect((getControl(step) as HTMLButtonElement).disabled).toBe(false);
    });

    it('should set aria-disabled and remove the href of the link when the step is disabled', async () => {
      const step = await createStep(html`<forge-process-step href="#one">One</forge-process-step>`);

      step.disabled = true;
      await step.updateComplete;

      expect(getControl(step).getAttribute('aria-disabled')).toBe('true');
      expect(getControl(step).getAttribute('role')).toBe('link');
      expect(getControl(step).hasAttribute('href')).toBe(false);
    });

    it('should restore the link when the step is enabled', async () => {
      const step = await createStep(html`<forge-process-step href="#one" disabled>One</forge-process-step>`);

      step.disabled = false;
      await step.updateComplete;

      expect(getControl(step).hasAttribute('aria-disabled')).toBe(false);
      expect(getControl(step).hasAttribute('role')).toBe(false);
      expect(getControl(step).getAttribute('href')).toBe('#one');
    });
  });

  describe('marker', () => {
    const markerIcon = (step: ProcessStepComponent): string | null | undefined => step.shadowRoot?.querySelector('.marker forge-icon')?.getAttribute('name');

    async function createNumberedStep(state: string): Promise<ProcessStepComponent> {
      const screen = render(html`
        <forge-process-stepper numbered>
          <forge-process-step>One</forge-process-step>
          <forge-process-step state=${state}>Two</forge-process-step>
        </forge-process-stepper>
      `);
      const stepper = screen.container.querySelector('forge-process-stepper') as ProcessStepperComponent;
      await stepper.updateComplete;
      const step = stepper.steps[1];
      await step.updateComplete;
      return step;
    }

    it.each([
      ['not-started', 'circle_dotted'],
      ['completed', 'check_circle'],
      ['current', 'circle_half_full'],
      ['in-progress', 'circle_half_full'],
      ['critical', 'alert_circle_outline']
    ])('should render the icon for the %s state', async (state, icon) => {
      const step = await createStep(html`<forge-process-step state=${state}></forge-process-step>`);

      expect(markerIcon(step)).toBe(icon);
    });

    it('should render no icon for an unknown state', async () => {
      const step = await createStep(html`<forge-process-step state="unknown"></forge-process-step>`);

      expect(step.shadowRoot?.querySelector('.marker forge-icon')).toBeNull();
    });

    it('should update the icon when the state changes', async () => {
      const step = await createStep(html`<forge-process-step></forge-process-step>`);

      step.state = 'completed';
      await step.updateComplete;

      expect(markerIcon(step)).toBe('check_circle');
    });

    it('should not render the position in the marker by default', async () => {
      const step = await createStep(html`<forge-process-step></forge-process-step>`);

      expect(step.shadowRoot?.querySelector('.marker-number')).toBeNull();
    });

    it('should render the position in the marker when numbered', async () => {
      const step = await createNumberedStep('not-started');

      expect(step.shadowRoot?.querySelector('.marker-number')?.textContent?.trim()).toBe('2');
    });

    it.each(['completed', 'current', 'in-progress', 'critical'])(
      'should render the icon rather than the position for a numbered step in the %s state',
      async state => {
        const step = await createNumberedStep(state);

        expect(step.shadowRoot?.querySelector('.marker-number')).toBeNull();
        expect(step.shadowRoot?.querySelector('.marker forge-icon')).toBeTruthy();
      }
    );
  });

  describe('progress line', () => {
    const isTouched = (step: ProcessStepComponent): boolean => step.shadowRoot?.querySelector('.forge-process-step')?.classList.contains('touched') ?? false;
    const settleSteps = async (steps: ProcessStepComponent[]): Promise<void> => {
      await Promise.all(steps.map(step => step.updateComplete));
      await Promise.all(steps.map(step => step.updateComplete));
    };

    it('should not fill the line of a standalone step that is not current', async () => {
      for (const state of ['completed', 'in-progress', 'not-started', 'critical']) {
        const step = await createStep(html`<forge-process-step state=${state}></forge-process-step>`);

        expect(step.touched, state).toBe(false);
        expect(isTouched(step), state).toBe(false);
      }
    });

    it('should fill the line of a standalone step in the current state', async () => {
      const step = await createStep(html`<forge-process-step state="current"></forge-process-step>`);

      expect(step.touched).toBe(true);
      expect(isTouched(step)).toBe(true);
    });

    it('should fill the line of the current step and every step before it regardless of state', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step state="not-started">One</forge-process-step>
          <forge-process-step state="critical">Two</forge-process-step>
          <forge-process-step state="current">Three</forge-process-step>
          <forge-process-step state="completed">Four</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.map(step => step.touched)).toEqual([true, true, true, false]);
      expect(steps.map(isTouched)).toEqual([true, true, true, false]);
    });

    it('should not fill the line of any step when no step is current', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step state="completed">One</forge-process-step>
          <forge-process-step state="not-started">Two</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.map(step => step.touched)).toEqual([false, false]);
    });

    it('should update the filled lines when the current step changes', async () => {
      const { steps } = await createFixture();

      steps.forEach(step => (step.state = 'not-started'));
      steps[2].state = 'current';
      await settleSteps(steps);

      expect(steps.map(step => step.touched)).toEqual([true, true, true]);

      steps[2].state = 'not-started';
      steps[0].state = 'current';
      await settleSteps(steps);

      expect(steps.map(step => step.touched)).toEqual([true, false, false]);
      expect(steps.map(isTouched)).toEqual([true, false, false]);
    });
  });

  describe('readonly', () => {
    const readonlyFixture = (): Promise<IHarness> =>
      createFixture(html`
        <forge-process-stepper readonly>
          <forge-process-step href="#one">One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);

    it('should not render a control, state layer, or focus indicator when the stepper is readonly', async () => {
      const { steps } = await readonlyFixture();

      for (const step of steps) {
        expect(step.shadowRoot?.querySelector('.control')).toBeNull();
        expect(step.shadowRoot?.querySelector('forge-state-layer')).toBeNull();
        expect(step.shadowRoot?.querySelector('forge-focus-indicator')).toBeNull();
      }
    });

    it('should still render the label when the stepper is readonly', async () => {
      const { steps } = await readonlyFixture();

      expect(steps[0].labelText).toBe('One');
      expect(steps[0].shadowRoot?.querySelector('.label slot')).toBeTruthy();
    });

    it('should not dispatch a change event when a step is clicked in a readonly stepper', async () => {
      const { stepper, steps } = await readonlyFixture();
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      steps[0].click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should render the controls when readonly is removed', async () => {
      const { stepper, steps } = await readonlyFixture();

      stepper.readonly = false;
      await stepper.updateComplete;
      await Promise.all(steps.map(step => step.updateComplete));

      expect(getControl(steps[0])).toBeInstanceOf(HTMLAnchorElement);
      expect(getControl(steps[1])).toBeInstanceOf(HTMLButtonElement);
      expect(steps[1].shadowRoot?.querySelector('forge-state-layer')).toBeTruthy();
      expect(steps[1].shadowRoot?.querySelector('forge-focus-indicator')).toBeTruthy();
    });

    it('should remove the controls when readonly is set', async () => {
      const { stepper, steps } = await createFixture();

      stepper.readonly = true;
      await stepper.updateComplete;
      await Promise.all(steps.map(step => step.updateComplete));

      expect(steps[0].shadowRoot?.querySelector('.control')).toBeNull();
    });

    it('should not be readonly by default', async () => {
      const { stepper } = await createFixture();

      expect(stepper.readonly).toBe(false);
    });
  });

  describe('control', () => {
    it('should render a button by default', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);
      const control = getControl(step);

      expect(control).toBeInstanceOf(HTMLButtonElement);
      expect((control as HTMLButtonElement).type).toBe('button');
    });

    it('should render a link when href is set', async () => {
      const step = await createStep(html`<forge-process-step href="#one">One</forge-process-step>`);
      const control = getControl(step);

      expect(control).toBeInstanceOf(HTMLAnchorElement);
      expect(control.getAttribute('href')).toBe('#one');
    });

    it('should switch between a button and a link when href changes', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);

      step.href = '#one';
      await step.updateComplete;
      expect(getControl(step)).toBeInstanceOf(HTMLAnchorElement);

      step.href = undefined;
      await step.updateComplete;
      expect(getControl(step)).toBeInstanceOf(HTMLButtonElement);
    });

    it.each([
      ['button', html`<forge-process-step state="current">One</forge-process-step>`],
      ['link', html`<forge-process-step state="current" href="#one">One</forge-process-step>`]
    ])('should set aria-current on the %s when the step is current', async (_, template) => {
      const step = await createStep(template);

      expect(getControl(step).getAttribute('aria-current')).toBe('step');
    });

    it.each([
      ['button', html`<forge-process-step state="completed">One</forge-process-step>`],
      ['link', html`<forge-process-step state="completed" href="#one">One</forge-process-step>`]
    ])('should not set aria-current on the %s when the step is not current', async (_, template) => {
      const step = await createStep(template);

      expect(getControl(step).hasAttribute('aria-current')).toBe(false);
    });

    it('should render the slotted label inside the control', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);
      const slot = getControl(step).querySelector('slot');

      expect(slot?.assignedNodes().map(node => node.textContent?.trim())).toEqual(['One']);
    });

    it('should not render the content of the details slot inside the control', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <button slot="detail">Advance</button>
        </forge-process-step>
      `);

      expect(getControl(step).querySelector('slot[name="detail"]')).toBeNull();
    });

    it('should dispatch a select event when the control is activated', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);
      const spy = vi.fn();
      step.addEventListener('forge-process-step-select', spy);

      getControl(step).click();

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0]).not.toBeInstanceOf(CustomEvent);
    });

    it('should render a state layer targeting the control', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);
      const stateLayer = step.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
      expect((stateLayer as unknown as { targetElement: HTMLElement }).targetElement).toBe(getControl(step));
    });

    it('should disable the state layer when the step is disabled', async () => {
      const step = await createStep(html`<forge-process-step disabled>One</forge-process-step>`);
      const stateLayer = step.shadowRoot?.querySelector('forge-state-layer') as unknown as { disabled: boolean };

      expect(stateLayer.disabled).toBe(true);
    });

    it('should render a focus indicator targeting the control', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);
      const indicator = step.shadowRoot?.querySelector('forge-focus-indicator');

      expect(indicator).toBeTruthy();
      expect((indicator as unknown as { targetElement: HTMLElement }).targetElement).toBe(getControl(step));
    });

    it('should place the focus indicator and state layer in the header', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);
      const header = step.shadowRoot?.querySelector('.header');

      expect(step.shadowRoot?.querySelector('forge-focus-indicator')?.parentElement).toBe(header);
      expect(step.shadowRoot?.querySelector('forge-state-layer')?.parentElement).toBe(header);
    });

    it.each([
      ['button', html`<forge-process-step state="completed">One<span slot="support-text">Due</span></forge-process-step>`],
      ['link', html`<forge-process-step state="completed" href="#one">One<span slot="support-text">Due</span></forge-process-step>`]
    ])('should make the entire header the hit target of the %s', async (_, template) => {
      const step = await createStep(template);
      const control = getControl(step);
      const header = (step.shadowRoot?.querySelector('.header') as HTMLElement).getBoundingClientRect();
      const marker = (step.shadowRoot?.querySelector('.marker') as HTMLElement).getBoundingClientRect();
      const supportText = (step.shadowRoot?.querySelector('.support-text') as HTMLElement).getBoundingClientRect();

      const points = [
        [header.left + 1, header.top + 1],
        [header.right - 1, header.bottom - 1],
        [marker.left + marker.width / 2, marker.top + marker.height / 2],
        [supportText.left + supportText.width / 2, supportText.top + supportText.height / 2]
      ];

      for (const [x, y] of points) {
        expect(step.shadowRoot?.elementFromPoint(x, y)).toBe(control);
      }
    });

    it('should not extend the hit target of the control over the detail', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <span slot="detail">Assigned to J. Rivera</span>
        </forge-process-step>
      `);
      const detail = (step.shadowRoot?.querySelector('.detail') as HTMLElement).getBoundingClientRect();

      expect(step.shadowRoot?.elementFromPoint(detail.left + 1, detail.top + 1)).not.toBe(getControl(step));
    });

    it('should not stretch the hit target of the control when the step is disabled', async () => {
      const step = await createStep(html`<forge-process-step disabled>One</forge-process-step>`);
      const marker = (step.shadowRoot?.querySelector('.marker') as HTMLElement).getBoundingClientRect();

      expect(step.shadowRoot?.elementFromPoint(marker.left + marker.width / 2, marker.top + marker.height / 2)).not.toBe(getControl(step));
    });

    /** Tabs onto the first step's control so that it matches `:focus-visible`. */
    async function focusStepControl(template: ReturnType<typeof html>): Promise<{ step: ProcessStepComponent; control: HTMLElement }> {
      const screen = render(html`<div><button id="sentinel">Sentinel</button>${template}</div>`);
      const stepper = screen.container.querySelector('forge-process-stepper') as ProcessStepperComponent | null;
      await stepper?.updateComplete;
      const step = screen.container.querySelector('forge-process-step') as ProcessStepComponent;
      await step.updateComplete;

      (screen.container.querySelector('#sentinel') as HTMLButtonElement).focus();
      await userEvent.tab();

      const control = getControl(step);
      expect(control.matches(':focus-visible')).toBe(true);

      return { step, control };
    }

    /**
     * Returns the visible ring of a focused step once its grow animation has finished, along with
     * the width of its outline. The outline is painted outside the ring's box, so every clearance
     * measurement has to count it in.
     */
    async function settledRing(step: ProcessStepComponent): Promise<{ box: DOMRect; outlineWidth: number; element: HTMLElement }> {
      const indicator = step.shadowRoot?.querySelector('forge-focus-indicator') as HTMLElement;
      const element = indicator.shadowRoot?.querySelector('[part="indicator"]') as HTMLElement;
      await Promise.all(element.getAnimations().map(animation => animation.finished));

      return { box: element.getBoundingClientRect(), outlineWidth: parseFloat(getComputedStyle(element).outlineWidth), element };
    }

    it('should fill the state layer to the focus ring', async () => {
      const { step } = await focusStepControl(html`<forge-process-step>One</forge-process-step>`);
      const stateLayer = step.shadowRoot?.querySelector('forge-state-layer') as HTMLElement;
      const ring = await settledRing(step);

      expect(stateLayer.getBoundingClientRect().toJSON()).toEqual(ring.box.toJSON());
    });

    it('should render the focus ring inside the entire header', async () => {
      const { step } = await focusStepControl(html`<forge-process-step>One</forge-process-step>`);
      const header = (step.shadowRoot?.querySelector('.header') as HTMLElement).getBoundingClientRect();
      const { box, outlineWidth } = await settledRing(step);
      const inset = box.left - header.left;

      expect(outlineWidth).toBeGreaterThan(0);
      expect(inset).toBeGreaterThanOrEqual(0);
      expect(box.top - header.top).toBeCloseTo(inset);
      expect(header.right - box.right).toBeCloseTo(inset);
      expect(header.bottom - box.bottom).toBeCloseTo(inset);
    });

    it('should replace the native focus outline with the focus ring', async () => {
      const { control } = await focusStepControl(html`<forge-process-step>One</forge-process-step>`);

      expect(getComputedStyle(control).outlineStyle).toBe('none');
    });

    it('should keep the focus ring clear of the step detail', async () => {
      const { step } = await focusStepControl(html`
        <forge-process-stepper>
          <forge-process-step state="current">
            One
            <span slot="detail">Assigned to J. Rivera</span>
          </forge-process-step>
        </forge-process-stepper>
      `);
      const detail = (step.shadowRoot?.querySelector('.detail') as HTMLElement).getBoundingClientRect();
      const { box, outlineWidth } = await settledRing(step);

      expect(detail.top).toBeGreaterThanOrEqual(box.bottom - outlineWidth);
    });
  });

  describe('slots', () => {
    it('should render slotted details content', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <span slot="detail" id="date">Jul 17, 2026</span>
          <button slot="detail" id="action">Advance</button>
        </forge-process-step>
      `);
      const assigned = step.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="detail"]')?.assignedElements() ?? [];

      expect(assigned.map(el => el.id)).toEqual(['date', 'action']);
    });

    it('should allow the marker to be replaced', async () => {
      const step = await createStep(html`
        <forge-process-step>
          <forge-icon slot="marker" name="check" id="custom-marker"></forge-icon>
        </forge-process-step>
      `);
      const slot = step.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="marker"]');

      expect(slot?.assignedElements()[0]?.id).toBe('custom-marker');
    });

    it('should render slotted support text', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <span slot="support-text" id="due">Due Friday</span>
        </forge-process-step>
      `);
      const assigned = step.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="support-text"]')?.assignedElements() ?? [];

      expect(assigned.map(el => el.id)).toEqual(['due']);
    });

    it('should render the generated marker when no marker is slotted', async () => {
      const step = await createStep(html`<forge-process-step state="completed"></forge-process-step>`);
      const slot = step.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="marker"]');

      expect(slot?.assignedElements()).toEqual([]);
      expect(slot?.querySelector('forge-icon')).toBeTruthy();
    });
  });
});
