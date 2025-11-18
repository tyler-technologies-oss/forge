import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { ISecretComponent } from './secret';

import './secret';

describe('Secret', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    await expect(el).to.be.accessible();
  });

  it('should have default property values', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

    expect(el.visible).to.be.false;
    expect(el.variant).to.equal('blur');
    expect(el.showOnHover).to.be.false;
    expect(el.icon).to.be.false;
    expect(el.name).to.equal('');
  });

  it('should toggle visible state on click', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;

    expect(el.visible).to.be.false;

    button.click();
    await elementUpdated(el);

    expect(el.visible).to.be.true;

    button.click();
    await elementUpdated(el);

    expect(el.visible).to.be.false;
  });

  it('should toggle visible state on Enter key', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;

    button.focus();
    expect(el.visible).to.be.false;

    await sendKeys({ press: 'Enter' });
    await elementUpdated(el);

    expect(el.visible).to.be.true;
  });

  it('should toggle visible state on Space key', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;

    button.focus();
    expect(el.visible).to.be.false;

    await sendKeys({ press: ' ' });
    await elementUpdated(el);

    expect(el.visible).to.be.true;
  });

  it('should update custom state when visible changes', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

    expect(el.matches(':state(visible)')).to.be.false;

    el.visible = true;
    await elementUpdated(el);

    expect(el.matches(':state(visible)')).to.be.true;
  });

  it('should update aria-expanded when visible changes', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-expanded')).to.equal('false');

    el.visible = true;
    await elementUpdated(el);

    expect(button.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should toggle inert attribute on content', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const content = el.shadowRoot?.querySelector('.content') as HTMLElement;

    expect(content.inert).to.be.true;

    el.visible = true;
    await elementUpdated(el);

    expect(content.inert).to.be.false;
  });

  it('should dispatch forge-secret-change event on toggle', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    let eventDetail: any;

    el.addEventListener('forge-secret-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });

    button.click();
    await elementUpdated(el);

    expect(eventDetail).to.deep.equal({ visible: true });
  });

  it('should show blur variant by default', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

    expect(el.hasAttribute('variant-blur')).to.be.true;
    expect(el.hasAttribute('variant-dots')).to.be.false;
  });

  it('should apply dots variant when set', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

    el.variant = 'dots';
    await elementUpdated(el);

    expect(el.hasAttribute('variant-blur')).to.be.false;
    expect(el.hasAttribute('variant-dots')).to.be.true;
  });

  it('should apply show-on-hover attribute when property is true', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

    expect(el.hasAttribute('show-on-hover')).to.be.false;

    el.showOnHover = true;
    await elementUpdated(el);

    expect(el.hasAttribute('show-on-hover')).to.be.true;
  });

  it('should render icon when icon property is true', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret icon>Secret content</forge-secret>`);
    const icon = el.shadowRoot?.querySelector('.icon');

    expect(icon).to.exist;
  });

  it('should not render icon when icon property is false', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const icon = el.shadowRoot?.querySelector('.icon');

    expect(icon).to.be.null;
  });

  it('should render default hidden icon when not visible', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret icon>Secret content</forge-secret>`);
    const iconElement = el.shadowRoot?.querySelector('forge-icon');

    expect(iconElement?.getAttribute('name')).to.equal('eye');
  });

  it('should render default visible icon when visible', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret icon visible>Secret content</forge-secret>`);
    await elementUpdated(el);
    const iconElement = el.shadowRoot?.querySelector('forge-icon');

    expect(iconElement?.getAttribute('name')).to.equal('eye_off');
  });

  it('should render custom hidden icon from slot', async () => {
    const el = await fixture<ISecretComponent>(html`
      <forge-secret icon>
        <span slot="hidden-icon">🔒</span>
        Secret content
      </forge-secret>
    `);
    const slot = el.shadowRoot?.querySelector('slot[name="hidden-icon"]') as HTMLSlotElement;
    const slottedContent = slot?.assignedNodes()[0] as HTMLElement;

    expect(slottedContent?.textContent).to.equal('🔒');
  });

  it('should render label slot before default content', async () => {
    const el = await fixture<ISecretComponent>(html`
      <forge-secret>
        <span slot="label">Label: </span>
        Secret content
      </forge-secret>
    `);
    const content = el.shadowRoot?.querySelector('.content') as HTMLElement;
    const labelSlot = content.querySelector('slot[name="label"]') as HTMLSlotElement;
    const defaultSlot = content.querySelector('slot:not([name])') as HTMLSlotElement;

    expect(labelSlot).to.exist;
    expect(defaultSlot).to.exist;

    // Verify label slot comes before default slot
    const slots = Array.from(content.querySelectorAll('slot'));
    expect(slots[0]).to.equal(labelSlot);
    expect(slots[1]).to.equal(defaultSlot);
  });

  it('should hide other secrets with same name when revealed', async () => {
    const container = await fixture(html`
      <div>
        <forge-secret name="group1">Secret 1</forge-secret>
        <forge-secret name="group1">Secret 2</forge-secret>
        <forge-secret name="group2">Secret 3</forge-secret>
      </div>
    `);

    const secret1 = container.querySelector('forge-secret:nth-child(1)') as ISecretComponent;
    const secret2 = container.querySelector('forge-secret:nth-child(2)') as ISecretComponent;
    const secret3 = container.querySelector('forge-secret:nth-child(3)') as ISecretComponent;

    // Reveal secret 1
    secret1.visible = true;
    await elementUpdated(secret1);

    expect(secret1.visible).to.be.true;
    expect(secret2.visible).to.be.false;
    expect(secret3.visible).to.be.false;

    // Reveal secret 2 (should hide secret 1)
    secret2.visible = true;
    await elementUpdated(secret2);

    expect(secret1.visible).to.be.false;
    expect(secret2.visible).to.be.true;
    expect(secret3.visible).to.be.false;

    // Reveal secret 3 (should not affect group1)
    secret3.visible = true;
    await elementUpdated(secret3);

    expect(secret1.visible).to.be.false;
    expect(secret2.visible).to.be.true;
    expect(secret3.visible).to.be.true;
  });

  it('should not affect other secrets without same name', async () => {
    const container = await fixture(html`
      <div>
        <forge-secret name="group1">Secret 1</forge-secret>
        <forge-secret>Secret 2</forge-secret>
      </div>
    `);

    const secret1 = container.querySelector('forge-secret:nth-child(1)') as ISecretComponent;
    const secret2 = container.querySelector('forge-secret:nth-child(2)') as ISecretComponent;

    secret1.visible = true;
    await elementUpdated(secret1);

    secret2.visible = true;
    await elementUpdated(secret2);

    expect(secret1.visible).to.be.true;
    expect(secret2.visible).to.be.true;
  });

  it('should contain forge-state-layer', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

    expect(stateLayer).to.exist;
  });

  it('should contain forge-focus-indicator', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const focusIndicator = el.shadowRoot?.querySelector('forge-focus-indicator');

    expect(focusIndicator).to.exist;
  });

  it('should have aria-live region for announcements', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const liveRegion = el.shadowRoot?.querySelector('[aria-live="polite"]');

    expect(liveRegion).to.exist;
  });

  it('should announce content when revealed', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
    const liveRegion = el.shadowRoot?.querySelector('[aria-live="polite"]') as HTMLElement;

    expect(liveRegion.textContent).to.equal('');

    el.visible = true;
    await elementUpdated(el);

    expect(liveRegion.textContent).to.equal('Secret content');
  });

  it('should clear live region when hidden', async () => {
    const el = await fixture<ISecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
    const liveRegion = el.shadowRoot?.querySelector('[aria-live="polite"]') as HTMLElement;

    await elementUpdated(el);
    expect(liveRegion.textContent).to.equal('Secret content');

    el.visible = false;
    await elementUpdated(el);

    expect(liveRegion.textContent).to.equal('');
  });
});
