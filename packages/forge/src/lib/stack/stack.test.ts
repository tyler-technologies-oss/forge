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
    await el.updateComplete;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.INLINE)).toBe(true);
  });

  it('should update the wrap attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.wrap = true;
    await el.updateComplete;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.WRAP)).toBe(true);
  });

  it('should update the stretch attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.stretch = true;
    await el.updateComplete;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.STRETCH)).toBe(true);
  });

  it('should update the gap attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.gap = '32';
    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('32');
  });

  it('should update the alignment attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.alignment = 'center';
    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.ALIGNMENT)).toBe('center');
  });

  it('should update the justify attribute when the property is set ', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.justify = 'center';
    await el.updateComplete;
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
    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('100');
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 100px)');

    el.gap = '100px';

    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('100px');
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 100px)');

    el.gap = '2rem';

    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('2rem');
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 2rem)');
  });

  it('should append px when the gap is a decimal or padded unitless number', async () => {
    const screen = render(html`<forge-stack gap="8.5"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 8.5px)');

    el.gap = ' 12 ';
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 12px)');
  });

  it('should map a size name to the matching spacing token when gap is a size', async () => {
    const screen = render(html`<forge-stack gap="xxxs"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, var(--forge-spacing-xxxsmall))');

    el.gap = 'ml';
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, var(--forge-spacing-medium-large))');
  });

  it('should not set an inline gap style when the gap is whitespace only', async () => {
    const screen = render(html`<forge-stack gap="  "></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('');
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

  it('should not reflect default values to attributes', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(el.getAttributeNames()).toEqual([]);
  });

  it('should keep an explicit start alignment attribute and align children to the start', async () => {
    const screen = render(html`<forge-stack alignment="start"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.ALIGNMENT)).toBe('start');
    expect(getComputedStyle(getRootEl(el)).alignItems).toBe('start');
  });

  it('should align children to the start when alignment is set back to start', async () => {
    const screen = render(html`<forge-stack alignment="center"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.alignment = 'start';
    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.ALIGNMENT)).toBe('start');
    expect(getComputedStyle(getRootEl(el)).alignItems).toBe('start');
  });

  it('should keep an explicit start justify attribute', async () => {
    const screen = render(html`<forge-stack justify="start"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(el.getAttribute(STACK_CONSTANTS.attributes.JUSTIFY)).toBe('start');
    expect(getComputedStyle(getRootEl(el)).justifyContent).toBe('start');
  });

  it('should reset alignment to the default when the attribute is removed', async () => {
    const screen = render(html`<forge-stack alignment="end"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    el.removeAttribute(STACK_CONSTANTS.attributes.ALIGNMENT);
    await el.updateComplete;
    expect(el.alignment).toBe('start');
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.ALIGNMENT)).toBe(false);
  });

  it('should toggle the inline, wrap, and stretch custom states when the properties change', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(el.matches(':state(inline)')).toBe(false);
    expect(el.matches(':state(wrap)')).toBe(false);
    expect(el.matches(':state(stretch)')).toBe(false);

    el.inline = true;
    el.wrap = true;
    el.stretch = true;
    await el.updateComplete;
    expect(el.matches(':state(inline)')).toBe(true);
    expect(el.matches(':state(wrap)')).toBe(true);
    expect(el.matches(':state(stretch)')).toBe(true);
    expect(getComputedStyle(getRootEl(el)).flexDirection).toBe('row');
    expect(getComputedStyle(getRootEl(el)).flexWrap).toBe('wrap');

    el.inline = false;
    await el.updateComplete;
    expect(el.matches(':state(inline)')).toBe(false);
    expect(getComputedStyle(getRootEl(el)).flexDirection).toBe('column');
  });

  it('should append px when the gap is set to a number', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    (el as unknown as { gap: number }).gap = 8;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 8px)');
  });

  it('should not set an inline gap style when using the default gap', async () => {
    const screen = render(html`<forge-stack></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('');
  });

  it('should not set an inline gap style when the gap attribute is set to the default', async () => {
    const screen = render(html`<forge-stack gap="16"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('');
  });

  it('should remove the inline gap style when the gap is set back to the default', async () => {
    const screen = render(html`<forge-stack gap="32"></forge-stack>`);
    const el = screen.container.querySelector('forge-stack') as IStackComponent;
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('var(--forge-stack-gap, 32px)');

    el.gap = '16';
    await el.updateComplete;
    expect(getRootEl(el).style.gap).toBe('');
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).toBe('16');
  });
});

function getRootEl(el: IStackComponent): HTMLElement {
  return el.shadowRoot?.firstElementChild as HTMLElement;
}
