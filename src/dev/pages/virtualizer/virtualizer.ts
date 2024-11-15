import '$src/shared';
import '@tylertech/forge/virtualizer';
import './virtualizer.scss';
import { VirtualItem } from '@tanstack/virtual-core';
import { IVirtualItemComponent, IVirtualizerComponent, Virtualizer } from '@tylertech/forge/virtualizer';
import { throttle } from '@tylertech/forge-core';


const data = Array.from({ length: 10000 }, (_, index) => {
  const randomWord = Math.random().toString(36).substring(7);
  return { index, value: randomWord }
});

// Imperative
const virtualizer = document.getElementById('virtualizer') as IVirtualizerComponent;
virtualizer.count = data.length;
virtualizer.estimateSize = () => 48;
virtualizer.itemBuilder = memoize((row: VirtualItem): HTMLElement => {
  const div = document.createElement('div');
  const item = data[row.index];
  div.textContent = `${item.index + 1}: ${item.value}`;
  div.style.boxSizing = 'border-box';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.blockSize = '100%';
  div.style.inlineSize = '100%';
  div.style.paddingInline = '16px';
  return div;
});

// Declarative
const declarativeVirtualizer = document.getElementById('declarative-virtualizer') as IVirtualizerComponent;
const throttleChangeHandler = throttle((evt: Event) => {
  const target = evt.target as IVirtualizerComponent;
  const items = target.items;
  const elements = items.map(item => {
    const element = document.createElement('forge-virtual-item') as IVirtualItemComponent;
    const div = document.createElement('div');
    const dataItem = data[item.index];
    element.item = item;
    element.append(div);
    div.textContent = `${dataItem.index + 1}: ${dataItem.value}`;
    div.classList.add('item');
    return element;
  });
  target.replaceChildren(...elements);
}, 10);
declarativeVirtualizer.count = data.length;
declarativeVirtualizer.estimateSize = () => 48;
declarativeVirtualizer.addEventListener('change', throttleChangeHandler, { passive: true });

// Horizontal
const horizontalVirtualizer = document.getElementById('horizontal-virtualizer') as IVirtualizerComponent;
horizontalVirtualizer.count = data.length;
horizontalVirtualizer.estimateSize = () => 48;
horizontalVirtualizer.itemBuilder = memoize((row: VirtualItem): HTMLElement => {
  const div = document.createElement('div');
  const item = data[row.index];
  div.textContent = `${item.index + 1}: ${item.value}`;
  div.style.boxSizing = 'border-box';
  div.style.writingMode = 'tb';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.blockSize = '100%';
  div.style.inlineSize = '100%';
  div.style.paddingInline = '16px';
  return div;
});

// Dynamic
const dynamicVirtualizer = document.getElementById('dynamic-virtualizer') as IVirtualizerComponent;
const dynamicData = data.map(item => ({ ...item, size: Math.floor(Math.random() * 80) + 20 }));
dynamicVirtualizer.count = dynamicData.length;
dynamicVirtualizer.estimateSize = () => 100;
dynamicVirtualizer.itemBuilder = memoize((row: VirtualItem): HTMLElement => {
  const div = document.createElement('div');
  const item = dynamicData[row.index];
  div.textContent = `${item.index + 1}: ${item.value} (${item.size}px)`;
  div.style.boxSizing = 'border-box';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.blockSize = item.size + 'px';
  div.style.inlineSize = '100%';
  div.style.paddingInline = '16px';
  div.style.borderBlockEnd = '1px solid var(--forge-theme-outline)';
  return div;
});

// Headless
const headlessVirtualizerEl = document.getElementById('headless-virtualizer') as HTMLElement;
const headlessScrollerEl = document.getElementById('headless-scroller') as HTMLElement;
const onChange = (v: Virtualizer): void => {
  headlessScrollerEl.style.blockSize = v.totalSize + 'px';
  const items = v.items.map(item => {
    const div = document.createElement('div');
    const dataItem = data[item.index];
    div.textContent = `${dataItem.index + 1}: ${dataItem.value}`;
    div.classList.add('headless-item');
    Virtualizer.positionItem(item, div, v.direction);
    return div;
  });
  headlessScrollerEl.replaceChildren(...items);
};
new Virtualizer({
  scrollElement: headlessVirtualizerEl,
  count: data.length,
  estimateSize: () => 48,
  onChange
});

// Memoize utility
function memoize<T>(fn: (...args: unknown[]) => T): any {
  const cache = {};
  return function(...args: any[]) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
