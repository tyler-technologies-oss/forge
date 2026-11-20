import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { ifDefined } from 'lit/directives/if-defined.js';
import { frame } from '../core/utils/utils.js';
import type { IFocusIndicatorComponent } from './focus-indicator.js';

import './focus-indicator.js';
import '../text-field/text-field.js';

describe('FocusIndicator', () => {
  it('should contain shadow root', async () => {
    const { focusIndicator } = await createFixture();
    expect(focusIndicator.shadowRoot).not.toBeNull();
  });

  it('should be active on keyboard focus', async () => {
    const { detachedButton, button, focusIndicator } = await createFixture();

    expect(button.matches(':focus')).toBe(false);

    await focusKeyboard(detachedButton);

    expect(button.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
    expect(focusIndicator.hasAttribute('active')).toBe(true);
    expect(focusIndicator.matches(':state(active)')).toBe(true);
  });

  it('should not be active on pointer focus', async () => {
    const { button, focusIndicator } = await createFixture();

    expect(button.matches(':focus')).toBe(false);

    await focusPointer(button);

    expect(button.matches(':focus-visible')).toBe(false);
    expect(button.matches(':focus')).toBe(true);
    expect(focusIndicator.active).toBe(false);
    expect(focusIndicator.hasAttribute('active')).toBe(false);
    expect(focusIndicator.matches(':state(active)')).toBe(false);
  });

  it('should be active on pointer focus when allowFocus is true', async () => {
    const { button, focusIndicator } = await createFixture({ allowFocus: true });

    expect(button.matches(':focus')).toBe(false);

    await focusPointer(button);

    expect(button.matches(':focus-visible')).toBe(false);
    expect(button.matches(':focus')).toBe(true);
    expect(focusIndicator.active).toBe(true);
    expect(focusIndicator.hasAttribute('active')).toBe(true);
    expect(focusIndicator.matches(':state(active)')).toBe(true);
  });

  it('should attach to specific target via id', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture({ target: 'detached' });

    expect(focusIndicator.targetElement).toBe(detachedButton);

    button.focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(detachedButton.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should set target element manually', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).toBe(button);

    focusIndicator.targetElement = detachedButton;

    expect(focusIndicator.targetElement).toBe(detachedButton);

    button.focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(detachedButton.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should set inward', async () => {
    const { focusIndicator } = await createFixture({ inward: true });
    expect(focusIndicator.inward).toBe(true);
    expect(focusIndicator.hasAttribute('inward')).toBe(true);
  });

  it('should animate inward when active', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture({ inward: true });

    await focusKeyboard(detachedButton);

    const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
    const style = getComputedStyle(indicatorElement);

    expect(style.animationName).toBe('forge-focus-indicator-inward-grow, forge-focus-indicator-inward-shrink');
    expect(button.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should set circular', async () => {
    const { detachedButton, focusIndicator } = await createFixture({ circular: true });

    await focusKeyboard(detachedButton);

    const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
    const style = getComputedStyle(indicatorElement);

    expect(style.getPropertyValue('--_focus-indicator-shape')).toBe('50%');
    expect(focusIndicator.circular).toBe(true);
    expect(focusIndicator.hasAttribute('circular')).toBe(true);
  });

  it('should reattach listeners when moved in DOM', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).toBe(button);

    detachedButton.appendChild(focusIndicator);

    expect(focusIndicator.targetElement).toBe(detachedButton);

    button.focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(button.matches(':focus')).toBe(false);
    expect(detachedButton.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should release reference to target element when disconnected', async () => {
    const { button, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).toBe(button);

    button.remove();

    expect(focusIndicator.targetElement).toBeUndefined();
  });

  it('should locate target element when target is :host', async () => {
    class TestFocusIndicator extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = '<forge-focus-indicator target=":host"></forge-focus-indicator>';
      }
    }
    if (!customElements.get('test-focus-indicator-host')) {
      customElements.define('test-focus-indicator-host', TestFocusIndicator);
    }

    const screen = render(html`<test-focus-indicator-host></test-focus-indicator-host>`);
    const el = screen.container.querySelector('test-focus-indicator-host') as TestFocusIndicator;
    const focusIndicator = getShadowElement(el, 'forge-focus-indicator') as IFocusIndicatorComponent;

    expect(focusIndicator.targetElement).toBe(el);
  });

  it('should properly handle event listener attach/detach cycles', async () => {
    const { detachedButton, button, focusIndicator } = await createFixture();

    await focusKeyboard(detachedButton);
    expect(focusIndicator.active).toBe(true);

    button.blur();
    expect(focusIndicator.active).toBe(false);

    const newButton = document.createElement('button');
    newButton.textContent = 'New Button';
    document.body.appendChild(newButton);

    focusIndicator.targetElement = newButton;

    expect(focusIndicator.targetElement).toBe(newButton);

    detachedButton.focus();
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Tab}');

    expect(focusIndicator.active).toBe(true);

    newButton.remove();
  });

  describe('top layer (default)', () => {
    it('should render child element with popover by default', async () => {
      const { focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator');
      expect(indicatorElement).not.toBeNull();
      expect(indicatorElement?.getAttribute('popover')).toBe('manual');
    });

    it('should show popover when active', async () => {
      const { detachedButton, focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      expect(indicatorElement?.matches(':popover-open')).toBe(false);

      await focusKeyboard(detachedButton);

      expect(focusIndicator.active).toBe(true);
      expect(indicatorElement?.matches(':popover-open')).toBe(true);
    });

    it('should hide popover when active becomes false', async () => {
      const { detachedButton, button, focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      await focusKeyboard(detachedButton);
      expect(focusIndicator.active).toBe(true);
      expect(indicatorElement?.matches(':popover-open')).toBe(true);

      button.blur();
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(focusIndicator.active).toBe(false);
      expect(indicatorElement?.matches(':popover-open')).toBe(false);
    });

    it('should set CSS custom properties for positioning', async () => {
      const { detachedButton, button, focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      await focusKeyboard(detachedButton);
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(focusIndicator.active).toBe(true);
      expect(indicatorElement.matches(':popover-open')).toBe(true);

      const targetRect = button.getBoundingClientRect();
      const computedStyle = getComputedStyle(indicatorElement);

      expect(computedStyle.position).toBe('fixed');
      expect(indicatorElement.style.getPropertyValue('--_focus-indicator-top-layer-left')).toBe(`${targetRect.left}px`);
      expect(indicatorElement.style.getPropertyValue('--_focus-indicator-top-layer-top')).toBe(`${targetRect.top}px`);
      expect(indicatorElement.style.getPropertyValue('--_focus-indicator-top-layer-width')).toBe(`${targetRect.width}px`);
      expect(indicatorElement.style.getPropertyValue('--_focus-indicator-top-layer-height')).toBe(`${targetRect.height}px`);
    });

    it('should cleanup positioning on disconnect', async () => {
      const { detachedButton, focusIndicator } = await createFixture();

      await focusKeyboard(detachedButton);
      expect(focusIndicator.active).toBe(true);

      focusIndicator.remove();

      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
      expect(indicatorElement?.matches(':popover-open')).toBe(false);
    });

    it('should respect inward property', async () => {
      const { detachedButton, focusIndicator } = await createFixture({ inward: true });
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      await focusKeyboard(detachedButton);

      expect(focusIndicator.inward).toBe(true);
      expect(indicatorElement?.hasAttribute('inward')).toBe(true);
    });

    it('should respect circular property', async () => {
      const { detachedButton, focusIndicator } = await createFixture({ circular: true });
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      await focusKeyboard(detachedButton);

      expect(focusIndicator.circular).toBe(true);
      expect(indicatorElement?.hasAttribute('circular')).toBe(true);
    });

    it('should not be obscured when the target is visible', async () => {
      const { detachedButton, focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      await focusKeyboard(detachedButton);
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(indicatorElement.hasAttribute('obscured')).toBe(false);
      expect(getComputedStyle(indicatorElement).visibility).toBe('visible');
    });

    it('should hide when the target is completely covered by another element', async () => {
      const { detachedButton, button, focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
      const { left, top, width, height } = button.getBoundingClientRect();
      const cover = document.createElement('div');
      cover.style.cssText = `position:fixed;left:${left - 10}px;top:${top - 10}px;width:${width + 20}px;height:${height + 20}px;background:red;`;
      document.body.append(cover);

      await focusKeyboard(detachedButton);
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(focusIndicator.active).toBe(true);
      expect(indicatorElement.hasAttribute('obscured')).toBe(true);
      expect(getComputedStyle(indicatorElement).visibility).toBe('hidden');

      cover.remove();
    });

    it('should not be obscured when the anchor ignores pointer events and the target is visible', async () => {
      const screen = render(html`
        <button id="detached" type="button">Simple button</button>
        <div style="position:relative;display:inline-block;">
          <input id="input" type="text" style="display:block;box-sizing:border-box;width:200px;height:40px;margin:0;" />
          <div id="overlay" style="position:absolute;inset:0;pointer-events:none;">
            <forge-focus-indicator target="input"></forge-focus-indicator>
          </div>
        </div>
      `);
      const detachedButton = screen.container.querySelector('#detached') as HTMLButtonElement;
      const focusIndicator = screen.container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;

      await focusKeyboard(detachedButton);
      await new Promise(resolve => setTimeout(resolve, 50));
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      expect(focusIndicator.active).toBe(true);
      expect(indicatorElement.hasAttribute('obscured')).toBe(false);
      expect(getComputedStyle(indicatorElement).visibility).toBe('visible');
    });

    it('should not be obscured when a text field input is focused', async () => {
      const screen = render(html`
        <button id="detached" type="button">Simple button</button>
        <forge-text-field>
          <label for="field-input">Label</label>
          <input id="field-input" type="text" />
        </forge-text-field>
      `);
      const detachedButton = screen.container.querySelector('#detached') as HTMLButtonElement;
      const textField = screen.container.querySelector('forge-text-field') as HTMLElement;
      const fieldElement = textField.shadowRoot?.querySelector('forge-field') as HTMLElement;

      await focusKeyboard(detachedButton);
      await new Promise(resolve => setTimeout(resolve, 50));
      const focusIndicator = fieldElement.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

      expect(focusIndicator.active).toBe(true);
      expect(indicatorElement.hasAttribute('obscured')).toBe(false);
      expect(getComputedStyle(indicatorElement).visibility).toBe('visible');
    });

    it('should hide when the target is scrolled out of view', async () => {
      const { detachedButton, button, focusIndicator } = await createFixture();
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
      button.style.cssText = 'position:fixed;top:-500px;left:0;';

      await focusKeyboard(detachedButton);
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(indicatorElement.hasAttribute('obscured')).toBe(true);
    });

    describe('clipping', () => {
      it('should hide when the target is scrolled out of view inside a scroll container', async () => {
        const { scroller, indicatorElement, scrollTo } = await createScrollFixture();
        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(false);

        scrollTo({ left: 280, top: 0 });

        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(true);
        expect(scroller.scrollTop).toBe(0);
      });

      it('should hide when the target is scrolled out of view horizontally inside a scroll container', async () => {
        const { indicatorElement, scrollTo } = await createScrollFixture();
        scrollTo({ left: 1000, top: 280 });
        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(true);

        scrollTo({ left: 280, top: 280 });
        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(false);

        scrollTo({ left: 0, top: 280 });
        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(true);
      });

      it.each(['left', 'right', 'top', 'bottom'] as const)('should trim the %s side when the target is partially scrolled out of view', async side => {
        const { button, scroller, indicatorElement, scrollTo } = await createScrollFixture();
        const { offsetWidth: width, offsetHeight: height } = button;
        const scrollPositions = {
          left: { left: 300 + width / 2, top: 280 },
          right: { left: 300 + width / 2 - scroller.clientWidth, top: 280 },
          top: { left: 280, top: 300 + height / 2 },
          bottom: { left: 280, top: 300 + height / 2 - scroller.clientHeight }
        };

        scrollTo(scrollPositions[side]);

        await expect.poll(() => getTrimmedEdge(indicatorElement, side)).toBeCloseTo(getScrollerEdge(scroller, side), 0);
        expect(indicatorElement.hasAttribute('obscured')).toBe(false);
      });

      it('should trim an inward indicator at the scroll container edge', async () => {
        const { button, scroller, indicatorElement, scrollTo } = await createScrollFixture({ inward: true });

        scrollTo({ left: 300 + button.offsetWidth / 2, top: 280 });

        await expect.poll(() => getTrimmedEdge(indicatorElement, 'left')).toBeCloseTo(getScrollerEdge(scroller, 'left'), 0);
      });

      it('should not trim the indicator when the target is fully visible', async () => {
        const { indicatorElement, scrollTo } = await createScrollFixture();

        scrollTo({ left: 280, top: 280 });

        await expect.poll(() => getInsetValues(getComputedStyle(indicatorElement).clipPath).every(value => value < 0)).toBe(true);
      });

      it('should not trim a side the target overhangs by less than a pixel', async () => {
        const { button, scroller, indicatorElement, scrollTo } = await createScrollFixture();
        scrollTo({ left: 0, top: 280 });
        button.style.left = `${scroller.clientWidth - button.getBoundingClientRect().width + 0.4}px`;

        await expect.poll(() => button.getBoundingClientRect().right - getScrollerEdge(scroller, 'right')).toBeGreaterThan(0);
        await expect.poll(() => getInsetValues(getComputedStyle(indicatorElement).clipPath).every(value => value < 0)).toBe(true);
      });

      it('should clip a fixed positioned target by an ancestor that is its containing block', async () => {
        const { indicatorElement } = await createFixedFixture({ transform: true });

        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(true);
      });

      it('should not clip a fixed positioned target by an ancestor that is not its containing block', async () => {
        const { indicatorElement } = await createFixedFixture({ transform: false });

        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(false);
      });

      it('should not clip a target by an ancestor with display contents', async () => {
        const screen = render(html`
          <button id="detached" type="button">Simple button</button>
          <div style="display: contents; overflow: hidden; width: 20px; height: 10px;">
            <button id="attached" type="button">
              Button
              <forge-focus-indicator></forge-focus-indicator>
            </button>
          </div>
        `);
        const focusIndicator = await focusAttachedButton(screen.container);
        const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(false);
      });

      it('should clip a slotted target by an ancestor in the shadow tree that it is assigned into', async () => {
        const screen = render(html`
          <button id="detached" type="button">Simple button</button>
          <div id="host">
            <button id="attached" type="button" style="margin-left: 100px;">
              Button
              <forge-focus-indicator></forge-focus-indicator>
            </button>
          </div>
        `);
        const host = screen.container.querySelector('#host') as HTMLElement;
        host.attachShadow({ mode: 'open' }).innerHTML = '<div style="width: 60px; height: 40px; overflow: hidden;"><slot></slot></div>';
        const focusIndicator = await focusAttachedButton(screen.container);
        const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;

        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(true);
      });

      it('should not clip an absolutely positioned target by an ancestor that does not contain it', async () => {
        const screen = render(html`
          <button id="detached" type="button">Simple button</button>
          <div style="position: relative; width: 300px; height: 200px;">
            <div style="width: 100px; height: 50px; overflow: hidden;">
              <button id="attached" type="button" style="position: absolute; left: 150px; top: 100px;">
                Button
                <forge-focus-indicator></forge-focus-indicator>
              </button>
            </div>
          </div>
        `);
        const button = screen.container.querySelector('#attached') as HTMLButtonElement;
        const focusIndicator = screen.container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;

        await focusKeyboard(screen.container.querySelector('#detached') as HTMLButtonElement);
        button.focus();

        await expect.poll(() => focusIndicator.active).toBe(true);
        const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(false);
      });

      it('should not clip a target in the top layer that is not fixed positioned by an ancestor with overflow', async () => {
        const screen = render(html`
          <button id="detached" type="button">Simple button</button>
          <div style="width: 100px; height: 50px; overflow: hidden;">
            <div id="popover" popover="manual" style="position: absolute; inset: auto; top: 200px; left: 100px; margin: 0;">
              <button id="attached" type="button">
                Button
                <forge-focus-indicator></forge-focus-indicator>
              </button>
            </div>
          </div>
        `);
        const popover = screen.container.querySelector('#popover') as HTMLElement;
        const button = screen.container.querySelector('#attached') as HTMLButtonElement;
        const focusIndicator = screen.container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
        popover.showPopover();

        await focusKeyboard(screen.container.querySelector('#detached') as HTMLButtonElement);
        button.focus();

        await expect.poll(() => focusIndicator.active).toBe(true);
        const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
        await expect.poll(() => indicatorElement.hasAttribute('obscured')).toBe(false);
      });
    });

    it('should follow the anchor when the layout shifts after the target has resized', async () => {
      const screen = render(html`
        <button id="detached" type="button">Simple button</button>
        <div id="shifter" style="padding-left: 0;">
          <forge-text-field show-clear style="width: 300px;">
            <label for="field-input">Label</label>
            <input id="field-input" type="text" />
          </forge-text-field>
        </div>
      `);
      const shifter = screen.container.querySelector('#shifter') as HTMLElement;
      const textField = screen.container.querySelector('forge-text-field') as HTMLElement;
      const fieldElement = textField.shadowRoot?.querySelector('forge-field') as HTMLElement;

      await focusKeyboard(screen.container.querySelector('#detached') as HTMLButtonElement);
      const focusIndicator = fieldElement.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
      await expect.poll(() => focusIndicator.active).toBe(true);
      const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
      const anchor = (focusIndicator.parentElement ?? textField) as HTMLElement;

      await userEvent.keyboard('k');
      await expect.poll(() => textField.querySelector('input')?.value).toBe('k');
      await frame();
      await frame();
      const initialAnchorLeft = anchor.getBoundingClientRect().left;
      const initialIndicatorLeft = indicatorElement.getBoundingClientRect().left;

      shifter.style.paddingLeft = '8px';

      await expect.poll(() => anchor.getBoundingClientRect().left).toBe(initialAnchorLeft + 8);
      await expect.poll(() => indicatorElement.getBoundingClientRect().left).toBe(initialIndicatorLeft + 8);
    });
  });
});

interface FocusIndicatorFixtureConfig {
  target?: string;
  inward?: boolean;
  circular?: boolean;
  allowFocus?: boolean;
}

interface FocusIndicatorFixtureResult {
  detachedButton: HTMLButtonElement;
  button: HTMLButtonElement;
  focusIndicator: IFocusIndicatorComponent;
}

async function createFixture({ target, inward, circular, allowFocus }: FocusIndicatorFixtureConfig = {}): Promise<FocusIndicatorFixtureResult> {
  const screen = render(html`
    <div>
      <button id="detached" type="button">Simple button</button>
      <button id="attached" type="button">
        Button
        <forge-focus-indicator target=${ifDefined(target)} ?inward=${inward} ?circular=${circular} ?allow-focus=${allowFocus}> </forge-focus-indicator>
      </button>
    </div>
  `);
  const detachedButton = screen.container.querySelector('button#detached') as HTMLButtonElement;
  const button = screen.container.querySelector('button#attached') as HTMLButtonElement;
  const focusIndicator = screen.container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  return { detachedButton, button, focusIndicator };
}

async function createFixedFixture({ transform }: { transform: boolean }): Promise<{ indicatorElement: HTMLElement }> {
  const screen = render(html`
    <button id="detached" type="button">Simple button</button>
    <div style="width: 100px; height: 50px; overflow: hidden; ${transform ? 'transform: translateX(0);' : ''}">
      <button id="attached" type="button" style="position: fixed; left: 200px; top: 200px;">
        Button
        <forge-focus-indicator></forge-focus-indicator>
      </button>
    </div>
  `);
  const focusIndicator = await focusAttachedButton(screen.container);
  return { indicatorElement: focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement };
}

async function focusAttachedButton(container: HTMLElement): Promise<IFocusIndicatorComponent> {
  const button = container.querySelector('#attached') as HTMLButtonElement;
  const focusIndicator = container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  (container.querySelector('#detached') as HTMLButtonElement).focus();
  await userEvent.keyboard('{Shift>}{/Shift}');
  button.focus({ preventScroll: true });
  await expect.poll(() => focusIndicator.active).toBe(true);
  return focusIndicator;
}

async function createScrollFixture({ inward = false }: { inward?: boolean } = {}): Promise<ScrollFixtureResult> {
  const screen = render(html`
    <button id="detached" type="button">Simple button</button>
    <div id="scroller" style="width: 150px; height: 100px; overflow: auto;">
      <div style="position: relative; width: 1000px; height: 1000px;">
        <button id="attached" type="button" style="position: absolute; left: 300px; top: 300px;">
          Button
          <forge-focus-indicator ?inward=${inward}></forge-focus-indicator>
        </button>
      </div>
    </div>
  `);
  const scroller = screen.container.querySelector('#scroller') as HTMLElement;
  const button = screen.container.querySelector('#attached') as HTMLButtonElement;
  const focusIndicator = screen.container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;

  scroller.scrollTo({ left: 280, top: 280 });
  await focusKeyboard(screen.container.querySelector('#detached') as HTMLButtonElement);
  button.focus();
  await expect.poll(() => focusIndicator.active).toBe(true);
  const indicatorElement = focusIndicator.shadowRoot?.querySelector('.focus-indicator') as HTMLElement;
  const scrollTo = (position: { left: number; top: number }): void => scroller.scrollTo(position);
  return { scroller, button, indicatorElement, scrollTo };
}

interface ScrollFixtureResult {
  scroller: HTMLElement;
  button: HTMLButtonElement;
  indicatorElement: HTMLElement;
  scrollTo: (position: { left: number; top: number }) => void;
}

/** The viewport edge, in pixels, where the clip path cuts the indicator on the given side. */
function getTrimmedEdge(indicatorElement: HTMLElement, side: 'left' | 'right' | 'top' | 'bottom'): number {
  const [top, right, bottom, left] = getInsetValues(getComputedStyle(indicatorElement).clipPath);
  const rect = indicatorElement.getBoundingClientRect();
  return { left: rect.left + left, right: rect.right - right, top: rect.top + top, bottom: rect.bottom - bottom }[side];
}

/** The viewport edge, in pixels, of the scroller's padding box on the given side. */
function getScrollerEdge(scroller: HTMLElement, side: 'left' | 'right' | 'top' | 'bottom'): number {
  const rect = scroller.getBoundingClientRect();
  const left = rect.left + scroller.clientLeft;
  const top = rect.top + scroller.clientTop;
  return { left, right: left + scroller.clientWidth, top, bottom: top + scroller.clientHeight }[side];
}

function getInsetValues(clipPath: string): number[] {
  return (clipPath.match(/-?\d+(\.\d+)?px/g) ?? []).map(value => parseFloat(value));
}

async function focusKeyboard(startFocusEl: HTMLElement): Promise<void> {
  startFocusEl.focus();
  await userEvent.keyboard('{Tab}');
}

async function focusPointer(targetEl: HTMLElement): Promise<void> {
  await userEvent.click(targetEl);
}
