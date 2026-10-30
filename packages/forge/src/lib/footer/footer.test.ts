import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { IFooterComponent } from './footer.js';

import './footer.js';
import './footer-item/footer-item.js';

describe('Footer', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should contain shadow root', async () => {
    const element = await createFixture();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should have role="contentinfo"', async () => {
    const element = await createFixture();
    expect(element.getAttribute('role')).toBe('contentinfo');
  });

  it('should be accessible', async () => {
    const element = await createFixture(
      html`<forge-footer
        ><forge-footer-item><a href="#">Link</a></forge-footer-item></forge-footer
      >`
    );
    await expect(element).toBeAccessible();
  });

  it('should define sub-component dependencies', async () => {
    await createFixture();
    expect(window.customElements.get('forge-footer-item')).toBeTruthy();
  });

  it('should have default layoutBreakpoint value of 900', async () => {
    const element = await createFixture();
    expect(element.layoutBreakpoint).toBe(900);
  });

  it('should resolve auto layout to "alternative" when viewport is narrow', async () => {
    stubMatchMedia(true);
    const element = await createFixture();
    expect(element.matches(':state(alternative)')).toBe(true);
  });

  it('should resolve auto layout to "standard" when viewport is wide', async () => {
    stubMatchMedia(false);
    const element = await createFixture();
    expect(element.matches(':state(standard)')).toBe(true);
  });

  it('should set layout attribute to "standard"', async () => {
    const element = await createFixture(html`<forge-footer layout="standard"></forge-footer>`);
    expect(element.layout).toBe('standard');
    expect(element.getAttribute('layout')).toBe('standard');
  });

  it('should set layout state to "auto"', async () => {
    stubMatchMedia(false);
    const element = await createFixture(html`<forge-footer layout="auto"></forge-footer>`);
    expect(element.layout).toBe('auto');
    expect(element.matches(':state(auto)')).toBe(true);
  });

  it('should update layout state when property changes', async () => {
    const element = await createFixture(html`<forge-footer layout="standard"></forge-footer>`);
    element.layout = 'alternative';
    await element.updateComplete;
    expect(element.matches(':state(alternative)')).toBe(true);
  });

  it('should transition layout states correctly when layout changes from standard to alternative', async () => {
    const element = await createFixture(html`<forge-footer layout="standard"></forge-footer>`);
    expect(element.matches(':state(standard)')).toBe(true);

    element.layout = 'alternative';
    await element.updateComplete;

    expect(element.matches(':state(alternative)')).toBe(true);
    expect(element.matches(':state(standard)')).toBe(false);
  });

  it('should update layoutBreakpoint value when the property is set', async () => {
    stubMatchMedia(false);
    const element = await createFixture(html`<forge-footer layout="auto"></forge-footer>`);

    element.layoutBreakpoint = 500;
    await element.updateComplete;

    expect(element.layoutBreakpoint).toBe(500);
  });

  it('should not affect layout when layoutBreakpoint changes and layout is not in auto mode', async () => {
    const element = await createFixture(html`<forge-footer layout="standard"></forge-footer>`);

    element.layoutBreakpoint = 500;
    await element.updateComplete;

    expect(element.matches(':state(standard)')).toBe(true);
  });

  it('should render container element', async () => {
    const element = await createFixture();
    expect(getShadowElement(element, '.container')).toBeTruthy();
  });

  it('should render div with role="list"', async () => {
    const element = await createFixture();
    const listContainer = getShadowElement(element, 'div[role="list"]');
    expect(listContainer).toBeTruthy();
  });

  it('should render slot for content projection', async () => {
    const element = await createFixture();
    expect(getShadowElement(element, 'slot')).toBeTruthy();
  });

  it('should project slotted content', async () => {
    const element = await createFixture(html`<forge-footer><a href="#">Link 1</a><a href="#">Link 2</a></forge-footer>`);
    const slot = getShadowElement(element, 'slot') as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned.length).toBe(2);
    expect(assigned[0].tagName).toBe('A');
  });

  it('should render graphic slot', async () => {
    const element = await createFixture(html`<forge-footer><img slot="graphic" src="logo.png" /></forge-footer>`);
    const graphicSlot = getShadowElement(element, 'slot[name="graphic"]') as HTMLSlotElement;
    expect(graphicSlot).toBeTruthy();
    expect(graphicSlot.assignedElements().length).toBe(1);
  });

  it('should expose root part', async () => {
    const element = await createFixture();
    expect(element.shadowRoot!.querySelector('[part="root"]')).toBeTruthy();
  });

  it('should expose content part', async () => {
    const element = await createFixture();
    const content = element.shadowRoot!.querySelector('[part="content"]');
    expect(content).toBeTruthy();
    expect(content?.getAttribute('role')).toBe('list');
  });
});

function stubMatchMedia(matches: boolean): void {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  } as unknown as MediaQueryList);
}

async function createFixture(template: ReturnType<typeof html> = html`<forge-footer></forge-footer>`): Promise<IFooterComponent> {
  const screen = render(template);
  const element = screen.container.querySelector('forge-footer') as IFooterComponent;
  await element.updateComplete;
  return element;
}
