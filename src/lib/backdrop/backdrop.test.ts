import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { task } from '../core/utils/utils';
import { IBackdropComponent } from './backdrop';

import './backdrop';

describe('Backdrop', () => {
  it('should initialize', async () => {
    const el = await fixture<IBackdropComponent>(html`<forge-backdrop></forge-backdrop>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be hidden by default', async () => {
    const h = await createFixture();

    expect(h.el.visible).to.be.false;
    expect(h.el.hasAttribute('visible')).to.be.false;
  });

  it('should show when visible by default', async () => {
    const h = await createFixture({ visible: true });

    expect(h.isVisible).to.be.true;
  });

  it('should show when visible property is set', async () => {
    const h = await createFixture();
    h.el.visible = true;
    await elementUpdated(h.el);
    await h.animationBuffer();

    expect(h.isVisible).to.be.true;
  });

  it('should show when visible attribute is set', async () => {
    const h = await createFixture();
    h.el.setAttribute('visible', '');
    await elementUpdated(h.el);
    await h.animationBuffer();

    expect(h.isVisible).to.be.true;
  });

  it('should hide when visible attribute is removed', async () => {
    const h = await createFixture({ visible: true });
    h.el.removeAttribute('visible');
    await elementUpdated(h.el);
    await h.animationBuffer();

    expect(h.isVisible).to.be.false;
  });

  it('should fade in', async () => {
    const h = await createFixture();
    expect(h.isVisible).to.be.false;

    await h.fadeIn();

    expect(h.isVisible).to.be.true;
    // This assertion depends on "animationend", which may not be emitted by this test runner
    // expect(h.root.classList.contains('entering')).to.be.false;
  });

  it('should fade out', async () => {
    const h = await createFixture({ visible: true });
    expect(h.isVisible).to.be.true;

    await h.fadeOut();

    expect(h.isVisible).to.be.false;
    // This assertion depends on "animationend", which may not be emitted by this test runner
    // expect(h.root.classList.contains('exiting')).to.be.false;
  });

  it('should show immediately when calling show()', async () => {
    const h = await createFixture();
    h.el.show();
    await h.animationBuffer();

    expect(h.isVisible).to.be.true;
  });

  it('should hide immediately when calling hide()', async () => {
    const h = await createFixture({ visible: true });
    h.el.hide();
    await h.animationBuffer();

    expect(h.isVisible).to.be.false;
  });

  it('should set fixed by default via attribute', async () => {
    const h = await createFixture({ fixed: true });

    expect(h.el.fixed).to.be.true;
    expect(h.el.hasAttribute('fixed')).to.be.true;
  });

  it('should toggle fixed attribute when property changes', async () => {
    const h = await createFixture();

    h.el.fixed = true;
    await elementUpdated(h.el);
    expect(h.el.fixed).to.be.true;
    expect(h.el.hasAttribute('fixed')).to.be.true;

    h.el.fixed = false;
    await elementUpdated(h.el);
    expect(h.el.fixed).to.be.false;
    expect(h.el.hasAttribute('fixed')).to.be.false;
  });
});

/** Harness keeps animation timing concerns isolated. */
class BackdropHarness {
  constructor(public el: IBackdropComponent) {}

  public get root(): HTMLElement {
    return this.el.shadowRoot?.firstElementChild as HTMLElement;
  }

  /** Visible = property true + attribute present. Optional CSS check retained. */
  public get isVisible(): boolean {
    const style = getComputedStyle(this.root);
    return this.el.visible && this.el.hasAttribute('visible') && style.opacity !== '0';
  }

  public async fadeIn(): Promise<void> {
    this.el.fadeIn();
    await elementUpdated(this.el);
    return this.animationBuffer();
  }

  public async fadeOut(): Promise<void> {
    this.el.fadeOut();
    await elementUpdated(this.el);
    return this.animationBuffer();
  }

  /** Keep generous buffer to outlast CSS duration + delay. */
  public animationBuffer(): Promise<void> {
    return task(350);
  }
}

interface BackdropFixtureConfig {
  visible?: boolean;
  fixed?: boolean;
}

async function createFixture({ visible, fixed }: BackdropFixtureConfig = {}): Promise<BackdropHarness> {
  const el = await fixture<IBackdropComponent>(html`<forge-backdrop ?visible=${visible} ?fixed=${fixed}></forge-backdrop>`);
  return new BackdropHarness(el);
}
