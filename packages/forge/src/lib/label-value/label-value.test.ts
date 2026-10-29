import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ILabelValueComponent } from './label-value.js';

import './label-value.js';
import { LABEL_VALUE_CONSTANTS } from './label-value-constants.js';

describe('Label Value', () => {
  it('should use shadow DOM', async () => {
    const el = await createFixture();

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const el = await createFixture();

    await expect(el).toBeAccessible();
  });

  it('should have expected default state', async () => {
    const el = await createFixture();

    expect(el.empty).toBe(false);
    expect(el.ellipsis).toBe(false);
    expect(el.inline).toBe(false);
    expect(el.dense).toBe(false);
  });

  it('should set empty via attribute', async () => {
    const el = await createFixture({ empty: true });

    expect(el.empty).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY)).toBe(true);
  });

  it('should set empty via property', async () => {
    const el = await createFixture();

    el.empty = true;
    await el.updateComplete;

    expect(el.empty).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY)).toBe(true);
  });

  it('should set ellipsis via attribute', async () => {
    const el = await createFixture({ ellipsis: true });

    expect(el.ellipsis).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS)).toBe(true);
  });

  it('should set ellipsis via property', async () => {
    const el = await createFixture();

    el.ellipsis = true;
    await el.updateComplete;

    expect(el.ellipsis).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS)).toBe(true);
  });

  it('should set inline via attribute', async () => {
    const el = await createFixture({ inline: true });

    expect(el.dense).toBe(true);
    expect(el.inline).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).toBe(true);
  });

  it('should set inline via property', async () => {
    const el = await createFixture();

    el.inline = true;
    await el.updateComplete;

    expect(el.inline).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).toBe(true);
  });

  it('should set inline via deprecated dense property', async () => {
    const el = await createFixture();

    el.dense = true;
    await el.updateComplete;

    expect(el.dense).toBe(true);
    expect(el.inline).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).toBe(true);
  });

  it('should unset inline when deprecated dense attribute is removed', async () => {
    const el = await createFixture();

    el.setAttribute(LABEL_VALUE_CONSTANTS.attributes.DENSE, '');
    await el.updateComplete;
    el.removeAttribute(LABEL_VALUE_CONSTANTS.attributes.DENSE);
    await el.updateComplete;

    expect(el.dense).toBe(false);
    expect(el.inline).toBe(false);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).toBe(false);
  });

  it('should set inline via deprecated dense attribute', async () => {
    const el = await createFixture();

    el.setAttribute(LABEL_VALUE_CONSTANTS.attributes.DENSE, '');
    await el.updateComplete;

    expect(el.dense).toBe(true);
    expect(el.inline).toBe(true);
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).toBe(true);
  });
});

async function createFixture({ empty = false, ellipsis = false, inline = false } = {}): Promise<ILabelValueComponent> {
  const screen = render(html`
    <forge-label-value ?empty=${empty} ?ellipsis=${ellipsis} ?inline=${inline}>
      <span slot="label">Label</span>
      <span slot="value">Value</span>
    </forge-label-value>
  `);
  const el = screen.container.querySelector('forge-label-value') as ILabelValueComponent;
  await el.updateComplete;
  return el;
}
