import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { task } from '../core/utils/utils.js';
import { getShadowElement } from '@tylertech/forge-core';
import type { IAvatarComponent } from './avatar.js';

import './avatar.js';

describe('Avatar', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-avatar></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    await expect(el).toBeAccessible();
  });

  it('should set slot text content to first characters of text attribute', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    expect(el.text).toBe('Tyler Forge');
    expect(getDefaultSlotEl(el).textContent).toBe('TF');
  });

  it('should set letter count when attribute set', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge" letter-count="2"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    el.setAttribute('letter-count', '1');
    await el.updateComplete;

    expect(getDefaultSlotEl(el).textContent).toBe('T');
  });

  it('should set letter count when the property is set ', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge Avatar"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    el.letterCount = 3;
    await el.updateComplete;

    expect(getDefaultSlotEl(el).textContent).toBe('TFA');
  });

  it('should change background image when set via attribute', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    const url = 'https://cdn.forge.tylertech.com/v1/images/branding/tyler/talking-t-logo.svg';
    el.setAttribute('image-url', url);
    const root = getRootEl(el);
    await task(1800);

    expect(root.hasAttribute('style')).toBe(true);
    expect(root.style.backgroundImage).toBe(`url("${url}")`);
  });

  it('should hide text when image url is set', async () => {
    const screen = render(
      html`<forge-avatar text="Tyler Forge" image-url="https://cdn.forge.tylertech.com/v1/images/branding/tyler/talking-t-logo.svg"></forge-avatar>`
    );
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    await task(1800);

    expect(getDefaultSlotEl(el).textContent).toBe('');

    el.imageUrl = '';
    await el.updateComplete;

    expect(getDefaultSlotEl(el).textContent).toBe('TF');
  });

  it('should change text when set via attribute', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    el.setAttribute('text', 'New Value');
    await el.updateComplete;

    expect(getDefaultSlotEl(el).textContent).toBe('NV');
  });

  it('should render text when image url fails to load an image with 500 error', async () => {
    const screen = render(html`<forge-avatar image-url="https://httpstat.us/500" text="Invalid Url"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;
    const root = getRootEl(el);

    await task(300);

    expect(getDefaultSlotEl(el).textContent).toBe('IU');
    expect(root.hasAttribute('style')).toBe(false);
  });

  it('should render text when image url fails to load an image with 404 error', async () => {
    const screen = render(html`<forge-avatar image-url="https://httpstat.us/404" text="Invalid Url"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;
    const root = getRootEl(el);

    await task(300);

    expect(getDefaultSlotEl(el).textContent).toBe('IU');
    expect(root.hasAttribute('style')).toBe(false);
  });

  it('should have proper default values', async () => {
    const screen = render(html`<forge-avatar></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;

    expect(el.text).toBe('');
    expect(el.letterCount).toBe(2);
    expect(el.imageUrl).toBe('');
  });

  it('should render empty image by default', async () => {
    const screen = render(html`<forge-avatar></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    const emptyImage = getShadowElement(el, '.empty-image');
    expect(emptyImage).not.toBeNull();
    expect(emptyImage?.querySelector('svg')).not.toBeNull();
  });

  it('should render slotted content in place of text content', async () => {
    const screen = render(html`<forge-avatar text="attribute text">Slotted Content</forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;
    const defaultSlot = getDefaultSlotEl(el);

    expect(defaultSlot.textContent).toBe('AT');
    expect(defaultSlot.assignedNodes().length).toBe(1);
  });

  it('should render first character of each word when letter count is greater than number of words', async () => {
    const screen = render(html`<forge-avatar text="some long string with spaces" letter-count="6">Slotted Content</forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;
    const defaultSlot = getDefaultSlotEl(el);

    expect(defaultSlot.textContent).toBe('SLSWS');
  });

  it('should render empty image when no text or image url is provided', async () => {
    const screen = render(html`<forge-avatar></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    const emptyImage = getShadowElement(el, '.empty-image');

    expect(emptyImage).not.toBeNull();
    expect(emptyImage?.querySelector('svg')).not.toBeNull();
  });

  it('should not render empty image when text is provided', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    const emptyImage = getShadowElement(el, '.empty-image');

    expect(emptyImage).toBeNull();
    expect(getDefaultSlotEl(el).textContent).toBe('TF');
  });

  it('should not render empty image when image url is provided', async () => {
    const screen = render(html`<forge-avatar image-url="https://cdn.forge.tylertech.com/v1/images/branding/tyler/talking-t-logo.svg"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;
    await task(1800);

    const emptyImage = getShadowElement(el, '.empty-image');

    expect(emptyImage).toBeNull();
  });

  it('should render empty image when image url fails to load', async () => {
    const screen = render(html`<forge-avatar image-url="https://httpstat.us/404"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;
    await task(300);

    const emptyImage = getShadowElement(el, '.empty-image');

    expect(emptyImage).not.toBeNull();
    expect(emptyImage?.querySelector('svg')).not.toBeNull();
  });

  it('should render text instead of empty image when text is added', async () => {
    const screen = render(html`<forge-avatar></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    expect(getShadowElement(el, '.empty-image')).not.toBeNull();

    el.text = 'Tyler Forge';
    await el.updateComplete;

    expect(getShadowElement(el, '.empty-image')).toBeNull();
    expect(getDefaultSlotEl(el).textContent).toBe('TF');
  });

  it('should render empty image when text is removed', async () => {
    const screen = render(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);
    const el = screen.container.querySelector('forge-avatar') as IAvatarComponent;
    await el.updateComplete;

    expect(getShadowElement(el, '.empty-image')).toBeNull();

    el.text = '';
    await el.updateComplete;

    const emptyImage = getShadowElement(el, '.empty-image');
    expect(emptyImage).not.toBeNull();
    expect(emptyImage?.querySelector('svg')).not.toBeNull();
  });

  function getRootEl(el: IAvatarComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getDefaultSlotEl(el: IAvatarComponent): HTMLSlotElement {
    return getShadowElement(el, 'slot:not([name])') as HTMLSlotElement;
  }
});
