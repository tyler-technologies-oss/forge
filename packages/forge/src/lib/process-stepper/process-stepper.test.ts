import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
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
    it('should assign a one-based index to each step', async () => {
      const { steps } = await createFixture();

      expect(steps.map(step => step.index)).toEqual([1, 2, 3]);
    });

    it('should assign the total step count to each step', async () => {
      const { steps } = await createFixture();

      expect(steps.every(step => step.count === 3)).toBe(true);
    });

    it('should mark only the final step as last', async () => {
      const { steps } = await createFixture();

      expect(steps.map(step => step.last)).toEqual([false, false, true]);
    });

    it('should propagate numbered to each step', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper numbered>
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.every(step => step.numbered)).toBe(true);
    });

    it('should not number steps by default', async () => {
      const { steps } = await createFixture();

      expect(steps.some(step => step.numbered)).toBe(false);
    });

    it('should propagate the orientation to each step', async () => {
      const { steps } = await createFixture(html`
        <forge-process-stepper orientation="horizontal">
          <forge-process-step>One</forge-process-step>
          <forge-process-step>Two</forge-process-step>
        </forge-process-stepper>
      `);

      expect(steps.every(step => step.orientation === 'horizontal')).toBe(true);
    });

    it('should set positional aria attributes on each step', async () => {
      const { steps } = await createFixture();

      expect(steps[1].getAttribute('aria-posinset')).toBe('2');
      expect(steps[1].getAttribute('aria-setsize')).toBe('3');
    });
  });

  describe('progress announcements', () => {
    async function settleFrames(): Promise<void> {
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => requestAnimationFrame(resolve));
    }

    function announcer(stepper: ProcessStepperComponent): Element | null {
      return stepper.shadowRoot?.querySelector('[part="announcer"]') ?? null;
    }

    it('should render a polite live region', async () => {
      const { stepper } = await createFixture();
      const region = announcer(stepper);

      expect(region).toBeTruthy();
      expect(region?.getAttribute('aria-live')).toBe('polite');
      expect(region?.getAttribute('role')).toBe('status');
    });

    it('should not announce anything on the initial render', async () => {
      const { stepper } = await createFixture();

      expect(announcer(stepper)?.textContent?.trim()).toBe('');
    });

    it('should announce the step the process moves to', async () => {
      const { stepper, steps } = await createFixture();

      steps[1].state = 'completed';
      steps[2].state = 'current';
      await settleFrames();
      await stepper.updateComplete;

      expect(announcer(stepper)?.textContent?.trim()).toBe('Step 3 of 3: Three');
    });

    it('should announce the position when a step has no label', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step state="current"></forge-process-step>
          <forge-process-step></forge-process-step>
        </forge-process-stepper>
      `);

      steps[0].state = 'completed';
      steps[1].state = 'current';
      await settleFrames();
      await stepper.updateComplete;

      expect(announcer(stepper)?.textContent?.trim()).toBe('Step 2 of 2');
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
      expect(steps.every(step => step.orientation === 'vertical')).toBe(true);
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
      expect(stepper.steps.every(step => step.orientation === 'horizontal')).toBe(true);
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
      stepper.addEventListener('forge-process-stepper-change', spy);

      steps[1].querySelector('button')?.click();

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].detail).toEqual({ index: 1, step: steps[1] });
    });

    it('should dispatch a change event for a slotted link', async () => {
      const { stepper, steps } = await createFixture(html`
        <forge-process-stepper>
          <forge-process-step><a href="#cart">One</a></forge-process-step>
        </forge-process-stepper>
      `);
      const spy = vi.fn();
      stepper.addEventListener('forge-process-stepper-change', spy);

      steps[0].querySelector('a')?.addEventListener('click', evt => evt.preventDefault());
      steps[0].querySelector('a')?.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should not dispatch a change event when a step has no interactive element', async () => {
      const { stepper, steps } = await createFixture();
      const spy = vi.fn();
      stepper.addEventListener('forge-process-stepper-change', spy);

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
      stepper.addEventListener('forge-process-stepper-change', spy);

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

    it('should render an empty dashed marker when not started', async () => {
      const step = await createStep(html`<forge-process-step state="not-started"></forge-process-step>`);
      step.index = 4;
      await step.updateComplete;
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('dashed')).toBe(true);
      expect(marker?.textContent?.trim()).toBe('');
    });

    it('should render the index in the marker when numbered', async () => {
      const step = await createStep(html`<forge-process-step state="not-started"></forge-process-step>`);
      step.index = 4;
      step.numbered = true;
      await step.updateComplete;
      const marker = step.shadowRoot?.querySelector('.marker');

      expect(marker?.classList.contains('dashed')).toBe(true);
      expect(marker?.textContent?.trim()).toBe('4');
    });

    it('should render the icon rather than the index for a completed numbered step', async () => {
      const step = await createStep(html`<forge-process-step state="completed"></forge-process-step>`);
      step.index = 4;
      step.numbered = true;
      await step.updateComplete;
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
  });

  describe('slots', () => {
    it('should render slotted meta, message, and action content', async () => {
      const step = await createStep(html`
        <forge-process-step>
          One
          <span slot="meta" id="meta">Jul 17, 2026</span>
          <span slot="message" id="message">Invalid</span>
          <button slot="actions" id="action">Advance</button>
          <input slot="additional-content" id="extra" />
        </forge-process-step>
      `);

      expect(step.querySelector('#meta')).toBeTruthy();
      expect(step.querySelector('#message')).toBeTruthy();
      expect(step.querySelector('#action')).toBeTruthy();
      expect(step.querySelector('#extra')).toBeTruthy();
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
