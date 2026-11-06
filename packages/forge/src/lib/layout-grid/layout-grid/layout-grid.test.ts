import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, TemplateResult } from 'lit';
import { LayoutGridComponent } from './layout-grid.js';

import './layout-grid.js';
import '../layout-grid-item/layout-grid-item.js';

const GRID_WIDTH = 600;

async function createGrid(template: TemplateResult): Promise<LayoutGridComponent> {
  const screen = render(html`<div style="width: ${GRID_WIDTH}px">${template}</div>`);
  const el = screen.container.querySelector('forge-layout-grid') as LayoutGridComponent;
  await el.updateComplete;
  return el;
}

const columnCount = (el: HTMLElement): number => getComputedStyle(el).gridTemplateColumns.split(' ').length;

const columnWidths = (el: HTMLElement): number[] =>
  getComputedStyle(el)
    .gridTemplateColumns.split(' ')
    .map(width => parseFloat(width));

const boxes = (count: number): TemplateResult[] => Array.from({ length: count }, (_, i) => html`<div>${i + 1}</div>`);

describe('LayoutGrid', () => {
  it('should render a shadow root', async () => {
    const el = await createGrid(html`<forge-layout-grid></forge-layout-grid>`);
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="2">${boxes(2)}</forge-layout-grid>`);
    await expect(el).toBeAccessible();
  });

  it('should display as a grid', async () => {
    const el = await createGrid(html`<forge-layout-grid></forge-layout-grid>`);
    expect(getComputedStyle(el).display).toBe('grid');
  });

  it('should not set any attributes by default', async () => {
    const el = await createGrid(html`<forge-layout-grid></forge-layout-grid>`);
    expect(el.getAttributeNames()).toEqual([]);
  });

  it('should create equal-width columns when columns is a whole number', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="3" gap="0">${boxes(3)}</forge-layout-grid>`);
    expect(columnWidths(el)).toEqual([200, 200, 200]);
  });

  it('should use columns as a track list when it is not a whole number', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="100px 1fr" gap="0">${boxes(2)}</forge-layout-grid>`);
    expect(columnWidths(el)).toEqual([100, 500]);
  });

  it('should keep columns equal width when content is wider than a column', async () => {
    const el = await createGrid(html`
      <forge-layout-grid columns="2" gap="0">
        <div style="white-space: nowrap">${'wide content '.repeat(20)}</div>
        <div></div>
      </forge-layout-grid>
    `);
    expect(columnWidths(el)).toEqual([300, 300]);
  });

  it('should update the columns when the property changes', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="2">${boxes(4)}</forge-layout-grid>`);
    el.columns = 4;
    await el.updateComplete;
    expect(el.getAttribute('columns')).toBe('4');
    expect(columnCount(el)).toBe(4);
  });

  it('should create equal-height rows when rows is a whole number', async () => {
    const el = await createGrid(html`<forge-layout-grid rows="2" gap="0" style="height: 200px">${boxes(2)}</forge-layout-grid>`);
    expect(getComputedStyle(el).gridTemplateRows).toBe('100px 100px');
  });

  it('should fit as many columns as the min column width allows when columns is not set', async () => {
    const el = await createGrid(html`<forge-layout-grid min-column-width="200" gap="0">${boxes(6)}</forge-layout-grid>`);
    expect(columnCount(el)).toBe(3);
  });

  it('should cap the number of columns when columns and min column width are both set', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="2" min-column-width="100">${boxes(6)}</forge-layout-grid>`);
    expect(columnCount(el)).toBe(2);
  });

  it('should drop below the column cap when the min column width does not fit', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="4" min-column-width="250">${boxes(4)}</forge-layout-grid>`);
    expect(columnCount(el)).toBe(2);
  });

  it('should collapse to a single column when the min column width is wider than the grid', async () => {
    const el = await createGrid(html`<forge-layout-grid min-column-width="1000px">${boxes(2)}</forge-layout-grid>`);
    expect(columnWidths(el)).toEqual([GRID_WIDTH]);
  });

  it('should map a gap size name to the matching spacing token', async () => {
    const el = await createGrid(html`<forge-layout-grid gap="xl" style="--forge-spacing-xlarge: 40px"></forge-layout-grid>`);
    expect(getComputedStyle(el).columnGap).toBe('40px');
    expect(getComputedStyle(el).rowGap).toBe('40px');
  });

  it('should treat a unitless gap as pixels', async () => {
    const el = await createGrid(html`<forge-layout-grid gap="12"></forge-layout-grid>`);
    expect(getComputedStyle(el).columnGap).toBe('12px');
  });

  it('should default the gap to the medium spacing token', async () => {
    const el = await createGrid(html`<forge-layout-grid style="--forge-spacing-medium: 18px"></forge-layout-grid>`);
    expect(getComputedStyle(el).columnGap).toBe('18px');
  });

  it('should override the gap per axis when column gap and row gap are set', async () => {
    const el = await createGrid(html`<forge-layout-grid gap="8" column-gap="24" row-gap="4"></forge-layout-grid>`);
    expect(getComputedStyle(el).columnGap).toBe('24px');
    expect(getComputedStyle(el).rowGap).toBe('4px');
  });

  it('should apply alignment and flow', async () => {
    const el = await createGrid(html`<forge-layout-grid align-items="center" justify-items="end" flow="column dense"></forge-layout-grid>`);
    const style = getComputedStyle(el);
    expect(style.alignItems).toBe('center');
    expect(style.justifyItems).toBe('end');
    expect(style.gridAutoFlow).toBe('column dense');
  });

  it('should let the public custom property override the columns attribute', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="2" style="--forge-layout-grid-columns: repeat(5, 1fr)">${boxes(5)}</forge-layout-grid>`);
    expect(columnCount(el)).toBe(5);
  });

  it('should let page styles override the layout', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="3" style="grid-template-columns: 1fr">${boxes(3)}</forge-layout-grid>`);
    expect(columnCount(el)).toBe(1);
  });

  it('should not pass its settings to a nested grid', async () => {
    const el = await createGrid(html`
      <forge-layout-grid columns="3" gap="40">
        <forge-layout-grid id="inner">${boxes(2)}</forge-layout-grid>
      </forge-layout-grid>
    `);
    const inner = el.querySelector('#inner') as LayoutGridComponent;
    await inner.updateComplete;
    expect(getComputedStyle(inner).gridTemplateColumns).not.toContain(' ');
    expect(getComputedStyle(inner).columnGap).not.toBe('40px');
  });

  it('should reset the layout when an attribute is removed', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="3">${boxes(3)}</forge-layout-grid>`);
    el.removeAttribute('columns');
    await el.updateComplete;
    expect(el.columns).toBeNull();
    expect(columnCount(el)).toBe(1);
  });

  it('should ignore values that would break out of the declaration', async () => {
    const el = await createGrid(html`<forge-layout-grid columns="2; } :host { display: none">${boxes(2)}</forge-layout-grid>`);
    expect(getComputedStyle(el).display).toBe('grid');
  });

  describe('child placement with data attributes', () => {
    it('should span columns on any child element', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="4" gap="0">
          <button data-column-span="2">Wide</button>
          <div></div>
        </forge-layout-grid>
      `);
      const button = el.querySelector('button') as HTMLElement;
      expect(button.getBoundingClientRect().width).toBe(300);
    });

    it('should span every column when the span is full', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="3" gap="0">
          <div></div>
          <div id="full" data-column-span="full"></div>
        </forge-layout-grid>
      `);
      const full = el.querySelector('#full') as HTMLElement;
      expect(full.getBoundingClientRect().width).toBe(GRID_WIDTH);
      expect(full.getBoundingClientRect().left).toBe(el.getBoundingClientRect().left);
    });

    it('should place a child at a start column', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="3" gap="0">
          <div id="placed" data-column-start="3"></div>
        </forge-layout-grid>
      `);
      const placed = el.querySelector('#placed') as HTMLElement;
      expect(placed.getBoundingClientRect().left - el.getBoundingClientRect().left).toBe(400);
    });

    it('should span rows on any child element', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="2" rows="2" gap="0" style="height: 200px">
          <div id="tall" data-row-span="2"></div>
          <div></div>
          <div></div>
        </forge-layout-grid>
      `);
      const tall = el.querySelector('#tall') as HTMLElement;
      expect(tall.getBoundingClientRect().height).toBe(200);
    });
  });

  describe('forge-layout-grid-item', () => {
    it('should span columns and rows', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="4" rows="2" gap="0" style="height: 200px">
          <forge-layout-grid-item column-span="3" row-span="2"></forge-layout-grid-item>
        </forge-layout-grid>
      `);
      const item = el.querySelector('forge-layout-grid-item') as HTMLElement;
      const rect = item.getBoundingClientRect();
      expect(rect.width).toBe(450);
      expect(rect.height).toBe(200);
    });

    it('should combine a start column and a span', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="4" gap="0">
          <forge-layout-grid-item column-start="2" column-span="2"></forge-layout-grid-item>
        </forge-layout-grid>
      `);
      const item = el.querySelector('forge-layout-grid-item') as HTMLElement;
      const rect = item.getBoundingClientRect();
      expect(rect.left - el.getBoundingClientRect().left).toBe(150);
      expect(rect.width).toBe(300);
    });

    it('should span every column when the span is full', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="3" gap="0">
          <forge-layout-grid-item column-span="full"></forge-layout-grid-item>
        </forge-layout-grid>
      `);
      const item = el.querySelector('forge-layout-grid-item') as HTMLElement;
      expect(item.getBoundingClientRect().width).toBe(GRID_WIDTH);
    });

    it('should update its placement when the span property changes', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="4" gap="0">
          <forge-layout-grid-item></forge-layout-grid-item>
        </forge-layout-grid>
      `);
      const item = el.querySelector('forge-layout-grid-item') as HTMLElement & { columnSpan?: number | 'full' };
      item.columnSpan = 2;
      await (item as unknown as LayoutGridComponent).updateComplete;
      expect(item.getAttribute('column-span')).toBe('2');
      expect(item.getBoundingClientRect().width).toBe(300);
    });

    it('should align itself within its grid area', async () => {
      const el = await createGrid(html`
        <forge-layout-grid columns="1">
          <forge-layout-grid-item align-self="center" justify-self="end"></forge-layout-grid-item>
        </forge-layout-grid>
      `);
      const item = el.querySelector('forge-layout-grid-item') as HTMLElement;
      expect(getComputedStyle(item).alignSelf).toBe('center');
      expect(getComputedStyle(item).justifySelf).toBe('end');
    });

    it('should parse the full span attribute', async () => {
      const el = await createGrid(html`
        <forge-layout-grid>
          <forge-layout-grid-item column-span="full"></forge-layout-grid-item>
        </forge-layout-grid>
      `);
      const item = el.querySelector('forge-layout-grid-item') as HTMLElement & { columnSpan?: number | 'full' };
      expect(item.columnSpan).toBe('full');
    });
  });
});
