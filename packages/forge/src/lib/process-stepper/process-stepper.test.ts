import { LiveAnnouncer } from '@tylertech/forge-core';
import { html } from 'lit';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { ProcessStepComponent } from './process-step/process-step.js';
import { ProcessStepperComponent } from './process-stepper/process-stepper.js';

import './process-step/process-step.js';
import './process-stepper/process-stepper.js';
import '../focus-indicator/focus-indicator.js';

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

    it('should not be compact when the stepper is vertical', async () => {
      const { stepper } = await createSized('320px', 'vertical');

      expect(stepper.compact).toBe(false);
    });
  });

  describe('selection', () => {
    it('should dispatch a change event when an interactive step is activated', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step>One</forge-process-step>
          <forge-process-step><button>Two</button></forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      steps[1].querySelector('button')?.click();

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].target).toBe(stepper);
    });

    it('should expose the activated step as the selected step', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step><button>One</button></forge-process-step>
          <forge-process-step><button>Two</button></forge-process-step>
        </forge-process-stepper>
      `);
      let selected: ProcessStepComponent | null = null;
      stepper.addEventListener('change', evt => (selected = (evt.target as ProcessStepperComponent).selectedStep));

      steps[1].querySelector('button')?.click();

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
          <forge-process-step><button>One</button></forge-process-step>
        </forge-process-stepper>
      `);

      steps[0].querySelector('button')?.click();
      steps[0].remove();

      expect(stepper.selectedStep).toBeNull();
    });

    it('should dispatch a change event for a slotted link', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step><a href="#cart">One</a></forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('change', spy);

      steps[0].querySelector('a')?.addEventListener('click', evt => evt.preventDefault());
      steps[0].querySelector('a')?.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should not dispatch a change event when a step has no interactive element', async () => {
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
            <button slot="actions">Advance</button>
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

  it('should render the label and description', async () => {
    const step = await createStep(html`<forge-process-step description="Optional">Fees paid</forge-process-step>`);

    expect(step.labelText).toBe('Fees paid');
    expect(step.shadowRoot?.querySelector('.description')?.textContent).toBe('Optional');
  });

  it('should scope the label text to the label slot', async () => {
    const step = await createStep(html`
      <forge-process-step>
        Suspension
        <span slot="meta">Started:</span>
        <span slot="meta">02/03/2026</span>
        <input slot="additional-content" />
        <button slot="actions">Advance</button>
      </forge-process-step>
    `);

    expect(step.labelText).toBe('Suspension');
  });

  it('should not render a description element when no description is set', async () => {
    const step = await createStep(html`<forge-process-step>Fees paid</forge-process-step>`);

    expect(step.shadowRoot?.querySelector('.description')).toBeNull();
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
    step.noninteractive = true;
    await step.updateComplete;

    expect(step.hasAttribute('state')).toBe(false);
    expect(step.hasAttribute('noninteractive')).toBe(false);
  });

  it('should match the disabled state when disabled', async () => {
    const step = await createStep(html`<forge-process-step></forge-process-step>`);

    step.state = 'disabled';
    await step.updateComplete;

    expect(step.matches(':state(disabled)')).toBe(true);
    expect(getComputedStyle(step.shadowRoot?.querySelector('.forge-process-step') as HTMLElement).opacity).toBe('0.38');
  });

  describe('marker', () => {
    it('should render a check icon when completed', async () => {
      const step = await createStep(html`<forge-process-step state="completed"></forge-process-step>`);
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('filled')).toBe(true);
      expect(marker?.querySelector('forge-icon')?.getAttribute('name')).toBe('check');
    });

    it('should render an exclamation icon when in an error state', async () => {
      const step = await createStep(html`<forge-process-step state="error"></forge-process-step>`);
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('error')).toBe(true);
      expect(marker?.querySelector('forge-icon')?.getAttribute('name')).toBe('exclamation');
    });

    it('should render a partial marker when current', async () => {
      const step = await createStep(html`<forge-process-step state="current"></forge-process-step>`);
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('partial')).toBe(true);
      expect(marker?.querySelector('forge-icon')).toBeNull();
    });

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

    it('should render an empty dashed marker when not started', async () => {
      const step = await createStep(html`<forge-process-step state="not-started"></forge-process-step>`);
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('dashed')).toBe(true);
      expect(marker?.textContent?.trim()).toBe('');
    });

    it('should render the position in the marker when numbered', async () => {
      const step = await createNumberedStep('not-started');
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('dashed')).toBe(true);
      expect(marker?.textContent?.trim()).toBe('2');
    });

    it('should render the icon rather than the position for a completed numbered step', async () => {
      const step = await createNumberedStep('completed');
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.querySelector('forge-icon')?.getAttribute('name')).toBe('check');
      expect(marker?.textContent?.trim()).toBe('');
    });

    it('should mark the icon as decorative', async () => {
      const step = await createStep(html`<forge-process-step state="completed"></forge-process-step>`);

      expect(step.shadowRoot?.querySelector('.marker')?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('progress line', () => {
    it('should fill the line for completed, current, and in-progress states', async () => {
      for (const state of ['completed', 'current', 'in-progress']) {
        const step = await createStep(html`<forge-process-step state=${state}></forge-process-step>`);

        expect(step.lineActive, state).toBe(true);
        expect(step.shadowRoot?.querySelector('.line')?.classList.contains('active')).toBe(true);
      }
    });

    it('should not fill the line for upcoming states', async () => {
      for (const state of ['not-started', 'skipped', 'blocked', 'error']) {
        const step = await createStep(html`<forge-process-step state=${state}></forge-process-step>`);

        expect(step.lineActive, state).toBe(false);
        expect(step.shadowRoot?.querySelector('.line')?.classList.contains('active')).toBe(false);
      }
    });
  });

  describe('interactive', () => {
    it('should not be interactive when the label is plain text', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);

      expect(step.interactive).toBe(false);
      expect(step.shadowRoot?.querySelector('forge-focus-indicator')).toBeNull();
    });

    it('should be interactive when the label contains a button', async () => {
      const step = await createStep(html`<forge-process-step><button>One</button></forge-process-step>`);

      expect(step.interactive).toBe(true);
    });

    it('should be interactive when the label contains a link', async () => {
      const step = await createStep(html`<forge-process-step><a href="#one">One</a></forge-process-step>`);

      expect(step.interactive).toBe(true);
    });

    it('should prefer a slotted link over a slotted button', async () => {
      const step = await createStep(html`
        <forge-process-step>
          <button>Button</button>
          <a href="#one">Link</a>
        </forge-process-step>
      `);
      const indicator = step.shadowRoot?.querySelector('forge-focus-indicator');

      expect((indicator as unknown as { targetElement: HTMLElement }).targetElement).toBe(step.querySelector('a'));
    });

    it('should ignore interactive content in the other slots', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <button slot="actions">Advance</button>
          <button slot="additional-content">Nested</button>
        </forge-process-step>
      `);

      expect(step.interactive).toBe(false);
    });

    it('should not be interactive when noninteractive is set', async () => {
      const step = await createStep(html`<forge-process-step noninteractive><button>One</button></forge-process-step>`);

      expect(step.interactive).toBe(false);
      expect(step.shadowRoot?.querySelector('forge-focus-indicator')).toBeNull();
    });

    it('should dispatch a select event when the interactive element is activated', async () => {
      const step = await createStep(html`<forge-process-step><button>One</button></forge-process-step>`);
      const spy = vi.fn();
      step.addEventListener('forge-process-step-select', spy);

      step.querySelector('button')?.click();

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0]).not.toBeInstanceOf(CustomEvent);
    });

    it('should render a state layer targeting the interactive element', async () => {
      const step = await createStep(html`<forge-process-step><button>One</button></forge-process-step>`);
      const stateLayer = step.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
      expect((stateLayer as unknown as { targetElement: HTMLElement }).targetElement).toBe(step.querySelector('button'));
    });

    it('should not render a state layer when the step is not interactive', async () => {
      const step = await createStep(html`<forge-process-step>One</forge-process-step>`);

      expect(step.shadowRoot?.querySelector('forge-state-layer')).toBeNull();
    });

    it('should disable the state layer when the step is disabled', async () => {
      const step = await createStep(html`<forge-process-step state="disabled"><button>One</button></forge-process-step>`);
      const stateLayer = step.shadowRoot?.querySelector('forge-state-layer') as unknown as { disabled: boolean };

      expect(stateLayer.disabled).toBe(true);
    });

    it('should render a focus indicator targeting the interactive element', async () => {
      const step = await createStep(html`<forge-process-step><button>One</button></forge-process-step>`);
      const indicator = step.shadowRoot?.querySelector('forge-focus-indicator');

      expect(indicator).toBeTruthy();
      expect((indicator as unknown as { targetElement: HTMLElement }).targetElement).toBe(step.querySelector('button'));
    });

    it('should keep the focus indicator out of the progress line and content', async () => {
      const step = await createStep(html`<forge-process-step><button>One</button></forge-process-step>`);
      const indicator = step.shadowRoot?.querySelector('forge-focus-indicator');

      expect(indicator?.closest('[part="label"]')).toBeTruthy();
    });

    it('should size the focus indicator to the label rather than the label cell', async () => {
      const step = await createStep(html`<forge-process-step><button>One</button></forge-process-step>`);
      const label = step.shadowRoot?.querySelector('.label') as HTMLElement;
      const cell = step.shadowRoot?.querySelector('[part="label"]') as HTMLElement;

      expect(step.shadowRoot?.querySelector('forge-focus-indicator')?.closest('.label')).toBe(label);
      expect(label.getBoundingClientRect().width).toBeLessThan(cell.getBoundingClientRect().width);
    });

    /** Tabs onto the first step's slotted control so that it matches `:focus-visible`. */
    async function focusStepControl(template: ReturnType<typeof html>): Promise<{ step: ProcessStepComponent; control: HTMLElement }> {
      const screen = render(html`<div><button id="sentinel">Sentinel</button>${template}</div>`);
      const stepper = screen.container.querySelector('forge-process-stepper') as ProcessStepperComponent | null;
      await stepper?.updateComplete;
      const step = screen.container.querySelector('forge-process-step') as ProcessStepComponent;
      await step.updateComplete;

      (screen.container.querySelector('#sentinel') as HTMLButtonElement).focus();
      await userEvent.tab();

      const control = step.querySelector('button') as HTMLElement;
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
      const { step } = await focusStepControl(html`<forge-process-step><button>One</button></forge-process-step>`);
      const stateLayer = step.shadowRoot?.querySelector('forge-state-layer') as HTMLElement;
      const ring = await settledRing(step);

      expect(stateLayer.getBoundingClientRect().toJSON()).toEqual(ring.box.toJSON());
      expect(getComputedStyle(stateLayer).borderTopLeftRadius).toBe(getComputedStyle(ring.element).borderTopLeftRadius);
    });

    it('should round the corners of the focus ring', async () => {
      const { step } = await focusStepControl(html`<forge-process-step><button>One</button></forge-process-step>`);
      const ring = await settledRing(step);

      expect(ring.outlineWidth).toBeGreaterThan(0);
      expect(parseFloat(getComputedStyle(ring.element).borderTopLeftRadius)).toBeGreaterThan(4);
    });

    it('should replace the native focus outline with the focus ring', async () => {
      const { control } = await focusStepControl(html`<forge-process-step><button>One</button></forge-process-step>`);

      expect(getComputedStyle(control).outlineStyle).toBe('none');
    });

    it('should offset the focus ring further from the label along the inline axis', async () => {
      const { step } = await focusStepControl(html`<forge-process-step><button>One</button></forge-process-step>`);
      const label = (step.shadowRoot?.querySelector('.label') as HTMLElement).getBoundingClientRect();
      const { box } = await settledRing(step);

      const inlineOffset = label.left - box.left;
      const blockOffset = label.top - box.top;

      expect(blockOffset).toBeGreaterThan(0);
      expect(inlineOffset).toBeGreaterThan(blockOffset);
    });

    it.each(['vertical', 'horizontal'])('should keep the focus ring clear of the marker when %s', async orientation => {
      const { step } = await focusStepControl(html`
        <forge-process-stepper orientation=${orientation}>
          <forge-process-step state="completed"><button>One</button></forge-process-step>
          <forge-process-step state="current"><button>Two</button></forge-process-step>
        </forge-process-stepper>
      `);
      const marker = (step.shadowRoot?.querySelector('.marker') as HTMLElement).getBoundingClientRect();
      const { box, outlineWidth } = await settledRing(step);

      // The gap has to be visible rather than merely non-overlapping, so it is checked against the
      // smallest spacing step rather than zero.
      const clearance = orientation === 'vertical' ? box.left - outlineWidth - marker.right : box.top - outlineWidth - marker.bottom;

      expect(clearance).toBeGreaterThanOrEqual(4);
    });

    it('should keep the focus ring clear of the step content', async () => {
      const { step } = await focusStepControl(html`
        <forge-process-stepper>
          <forge-process-step state="current" description="Assigned to J. Rivera"><button>One</button></forge-process-step>
        </forge-process-stepper>
      `);
      const description = (step.shadowRoot?.querySelector('.description') as HTMLElement).getBoundingClientRect();
      const { box, outlineWidth } = await settledRing(step);

      expect(description.top - (box.bottom + outlineWidth)).toBeGreaterThanOrEqual(4);
    });

    it('should keep the native focus outline when the step is not interactive', async () => {
      const { step, control } = await focusStepControl(html`<forge-process-step noninteractive><button>One</button></forge-process-step>`);

      expect(step.shadowRoot?.querySelector('forge-focus-indicator')).toBeNull();
      expect(getComputedStyle(control).outlineStyle).not.toBe('none');
    });
  });

  describe('slots', () => {
    it('should render slotted meta, additional, and action content', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <span slot="meta" id="meta">Jul 17, 2026</span>
          <button slot="actions" id="action">Advance</button>
          <input slot="additional-content" id="extra" />
        </forge-process-step>
      `);
      const assigned = (name: string): Element | undefined => step.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)?.assignedElements()[0];

      expect(assigned('meta')?.id).toBe('meta');
      expect(assigned('actions')?.id).toBe('action');
      expect(assigned('additional-content')?.id).toBe('extra');
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

    it('should drop the generated marker treatment when a marker is slotted', async () => {
      const step = await createStep(html`
        <forge-process-step state="current">
          <forge-icon slot="marker" name="check"></forge-icon>
        </forge-process-step>
      `);
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('custom')).toBe(true);
      expect(marker?.classList.contains('partial')).toBe(false);
      expect(marker?.classList.contains('dashed')).toBe(false);
    });

    it('should keep the generated marker treatment when no marker is slotted', async () => {
      for (const state of ['not-started', 'current', 'completed', 'error']) {
        const step = await createStep(html`<forge-process-step state=${state}></forge-process-step>`);
        const marker = step.shadowRoot?.querySelector('.marker');

        expect(marker?.classList.contains('custom'), state).toBe(false);
      }
    });
  });
});
