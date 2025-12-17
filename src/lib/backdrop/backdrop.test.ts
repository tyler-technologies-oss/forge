import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { sendMouse } from '@web/test-runner-commands';
import { IBackdropComponent } from '../backdrop';
import { task } from '../core/utils/utils';

import './backdrop';

describe('Backdrop', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.backdropElement.shadowRoot).to.not.be.null;
  });

  it('should be hidden by default', async () => {
    const harness = await createFixture();

    expect(harness.isVisible).to.be.false;
  });

  it('should show when visible by default', async () => {
    const harness = await createFixture({ visible: true });

    expect(harness.backdropElement.visible).to.be.true;
  });

  it('should show when visible property is set', async () => {
    const harness = await createFixture();

    harness.backdropElement.visible = true;
    await elementUpdated(harness.backdropElement);
    await harness.enterAnimation();

    expect(harness.isVisible).to.be.true;
  });

  it('should show when visible attribute is set', async () => {
    const harness = await createFixture();

    harness.backdropElement.setAttribute('visible', '');
    await elementUpdated(harness.backdropElement);
    await harness.enterAnimation();

    expect(harness.isVisible).to.be.true;
  });

  it('should hide when visible attribute is removed', async () => {
    const harness = await createFixture({ visible: true });

    harness.backdropElement.removeAttribute('visible');
    await elementUpdated(harness.backdropElement);
    await harness.exitAnimation();

    expect(harness.isVisible).to.be.false;
  });

  it('should fade in', async () => {
    const harness = await createFixture();

    expect(harness.isVisible).to.be.false;

    await harness.fadeIn();

    expect(harness.isVisible).to.be.true;
    expect(harness.backdropElement.matches(':state(exiting)')).to.be.false;
  });

  it('should fade out', async () => {
    const harness = await createFixture({ visible: true });

    expect(harness.isVisible).to.be.true;

    await harness.fadeOut();
    await harness.exitAnimation();

    expect(harness.isVisible).to.be.false;
    expect(harness.backdropElement.matches(':state(exiting)')).to.be.false;
  });

  it('should show immediately when calling show() method', async () => {
    const harness = await createFixture();

    harness.backdropElement.show();
    await elementUpdated(harness.backdropElement);
    await harness.enterAnimation();

    expect(harness.isVisible).to.be.true;
  });

  it('should hide immediately when calling hide() method', async () => {
    const harness = await createFixture({ visible: true });

    harness.backdropElement.hide();
    await elementUpdated(harness.backdropElement);
    await harness.exitAnimation();

    expect(harness.isVisible).to.be.false;
  });

  it('should set fixed by default', async () => {
    const harness = await createFixture({ fixed: true });

    expect(harness.backdropElement.fixed).to.be.true;
    expect(harness.backdropElement.hasAttribute('fixed')).to.be.true;
  });

  it('should toggle fixed attribute', async () => {
    const harness = await createFixture();

    harness.backdropElement.fixed = true;
    await elementUpdated(harness.backdropElement);

    expect(harness.backdropElement.fixed).to.be.true;
    expect(harness.backdropElement.hasAttribute('fixed')).to.be.true;

    harness.backdropElement.fixed = false;
    await elementUpdated(harness.backdropElement);

    expect(harness.backdropElement.fixed).to.be.false;
    expect(harness.backdropElement.hasAttribute('fixed')).to.be.false;
  });
});

class BackdropHarness {
  constructor(public backdropElement: IBackdropComponent) {}

  public get rootElement(): HTMLElement {
    return getShadowElement(this.backdropElement, '.forge-backdrop');
  }

  public get isVisible(): boolean {
    return this.backdropElement.visible && this.backdropElement.hasAttribute('visible') && getComputedStyle(this.rootElement).opacity === '0.54';
  }

  public async fadeIn(): Promise<void> {
    await this.backdropElement.fadeIn();
  }

  public async fadeOut(): Promise<void> {
    await this.backdropElement.fadeOut();
  }

  public async click(): Promise<void> {
    const { x, y, height, width } = this.backdropElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public enterAnimation(): Promise<void> {
    return task(300);
  }

  public exitAnimation(): Promise<void> {
    return task(300);
  }
}

interface IBackdropFixtureConfig {
  visible?: boolean;
  fixed?: boolean;
}

async function createFixture({ visible, fixed }: IBackdropFixtureConfig = {}): Promise<BackdropHarness> {
  const el = await fixture<IBackdropComponent>(html`<forge-backdrop ?visible=${visible} ?fixed=${fixed}></forge-backdrop>`);
  return new BackdropHarness(el);
}
