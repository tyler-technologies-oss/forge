import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';

import './stack.js';
import { IStackComponent } from './stack.js';
import { STACK_CONSTANTS } from './stack-constants.js';

describe('Stack', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await expect(el).toBeAccessible();
  });

  it('should update the inline attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.inline = true;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.INLINE)).toBe(true);
  });

  it('should update the wrap attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.wrap = true;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.WRAP)).toBe(true);
  });

  it('should update the stretch attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.stretch = true;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.STRETCH)).toBe(true);
  });

  it('should update the gap attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.gap = '32';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('32');
  });

  it('should update the alignment attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.alignment = 'center';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.ALIGNMENT)).toBe('center');
  });

  it('should update the justify attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.justify = 'center';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.JUSTIFY)).toBe('center');
  });

  it('should change the inline property when set via attribute', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.setAttribute(STACK_CONSTANTS.attributes.INLINE, 'true');
    expect(el.inline).toBe(true);
  });

  it('should change the wrap property when set via attribute', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.setAttribute(STACK_CONSTANTS.attributes.WRAP, 'true');
    expect(el.wrap).toBe(true);
  });

  it('should change the stretch property when set via attribute', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.setAttribute(STACK_CONSTANTS.attributes.STRETCH, 'true');
    expect(el.stretch).toBe(true);
  });

  it('should change the gap property when set via attribute', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.setAttribute(STACK_CONSTANTS.attributes.GAP, '100');
    expect(el.gap).toBe('100');
  });

  it('should change the alignment property when set via attribute', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.setAttribute(STACK_CONSTANTS.attributes.ALIGNMENT, 'end');
    expect(el.alignment).toBe('end');
  });

  it('should change the justify property when set via attribute', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.setAttribute(STACK_CONSTANTS.attributes.JUSTIFY, 'end');
    expect(el.justify).toBe('end');
  });

  it('should set the gap property to the value provided verbatim', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.gap = '100';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('100');
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 100px)');

    el.gap = '100px';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('100px');
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 100px)');

    el.gap = '2rem';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('2rem');
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 2rem)');
  });

  it('should set default values when no attributes are applied', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    expect(el.inline).toBe(false);
    expect(el.wrap).toBe(false);
    expect(el.stretch).toBe(false);
    expect(el.gap).toBe('16');
    expect(el.alignment).toBe('start');
    expect(el.justify).toBe('start');
  });
});

function getRootEl(el: IStackComponent): HTMLElement {
  return el.shadowRoot?.firstElementChild as HTMLElement;
}
