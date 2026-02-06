import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { task } from '../core/utils/utils';

import './backdrop';

// Animation duration for enter/exit transitions
const ANIMATION_TIMEOUT = 300;

describe('Backdrop', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.backdropElement.shadowRoot).not.toBeNull();
  });

  it('should be hidden by default', async () => {
    const harness = await createFixture();

    expect(harness.isVisible).toBe(false);
  });

  it('should show when visible by default', async () => {
    const harness = await createFixture({ visible: true });

    expect(harness.backdropElement.visible).toBe(true);
  });

  it('should show when visible property is set', async () => {
    const harness = await createFixture();

    harness.backdropElement.visible = true;
    await harness.enterAnimation();

    expect(harness.isVisible).toBe(true);
  });

  it('should show when visible attribute is set', async () => {
    const harness = await createFixture();

    harness.backdropElement.setAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, '');
    await harness.enterAnimation();

    expect(harness.isVisible).toBe(true);
  });

  it('should hide when visible attribute is removed', async () => {
    const harness = await createFixture({ visible: true });

    harness.backdropElement.removeAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE);
    await harness.exitAnimation();

    expect(harness.isVisible).toBe(false);
  });

  it('should fade in', async () => {
    const harness = await createFixture();

    expect(harness.isVisible).toBe(false);

    await harness.fadeIn();

    expect(harness.isVisible).toBe(true);
    expect(harness.rootElement.classList.contains(BACKDROP_CONSTANTS.classes.EXITING)).toBe(false);
  });

  it('should fade out', async () => {
    const harness = await createFixture({ visible: true });

    expect(harness.isVisible).toBe(true);

    await harness.fadeOut();
    await harness.exitAnimation();

    expect(harness.isVisible).toBe(false);
    expect(harness.rootElement.classList.contains(BACKDROP_CONSTANTS.classes.EXITING)).toBe(false);
  });

  it('should show immediately when calling show() method', async () => {
    const harness = await createFixture();

    harness.backdropElement.show();
    await harness.enterAnimation();

    expect(harness.isVisible).toBe(true);
  });

  it('should hide immediately when calling hide() method', async () => {
    const harness = await createFixture({ visible: true });

    harness.backdropElement.hide();
    await harness.exitAnimation();

    expect(harness.isVisible).toBe(false);
  });

  it('should set fixed by default', async () => {
    const harness = await createFixture({ fixed: true });

    expect(harness.backdropElement.fixed).toBe(true);
    expect(harness.backdropElement.hasAttribute(BACKDROP_CONSTANTS.attributes.FIXED)).toBe(true);
  });

  it('should toggle fixed attribute', async () => {
    const harness = await createFixture();

    harness.backdropElement.fixed = true;

    expect(harness.backdropElement.fixed).toBe(true);
    expect(harness.backdropElement.hasAttribute(BACKDROP_CONSTANTS.attributes.FIXED)).toBe(true);

    harness.backdropElement.fixed = false;

    expect(harness.backdropElement.fixed).toBe(false);
    expect(harness.backdropElement.hasAttribute(BACKDROP_CONSTANTS.attributes.FIXED)).toBe(false);
  });
});

class BackdropHarness {
  constructor(public backdropElement: IBackdropComponent) {}

  public get rootElement(): HTMLElement {
    return getShadowElement(this.backdropElement, BACKDROP_CONSTANTS.selectors.ROOT);
  }

  public get isVisible(): boolean {
    return (
      this.backdropElement.visible &&
      this.backdropElement.hasAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE) &&
      getComputedStyle(this.rootElement).opacity === '0.54'
    );
  }

  public fadeIn(): Promise<void> {
    this.backdropElement.fadeIn();
    return this.enterAnimation();
  }

  public fadeOut(): Promise<void> {
    this.backdropElement.fadeOut();
    return this.exitAnimation();
  }

  public enterAnimation(): Promise<void> {
    return task(ANIMATION_TIMEOUT);
  }

  public exitAnimation(): Promise<void> {
    return task(ANIMATION_TIMEOUT);
  }
}

interface IBackdropFixtureConfig {
  visible?: boolean;
  fixed?: boolean;
}

async function createFixture({ visible, fixed }: IBackdropFixtureConfig = {}): Promise<BackdropHarness> {
  const screen = render(html`<forge-backdrop ?visible=${visible} ?fixed=${fixed}></forge-backdrop>`);
  const el = screen.container.querySelector('forge-backdrop') as IBackdropComponent;
  return new BackdropHarness(el);
}
