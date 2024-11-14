import '$src/shared';
import '@tylertech/forge/virtualizer';
import './virtualizer.scss';
import { VirtualItem } from '@tanstack/virtual-core';
import { IVirtualItemComponent, IVirtualizerComponent } from '@tylertech/forge/virtualizer';
import { throttle } from '@tylertech/forge-core';

const virtualizer = document.getElementById('virtualizer') as IVirtualizerComponent;
const declarativeVirtualizer = document.getElementById('declarative-virtualizer') as IVirtualizerComponent;
const horizontalVirtualizer = document.getElementById('horizontal-virtualizer') as IVirtualizerComponent;

const data = Array.from({ length: 1000 }, (_, index) => {
  const randomWord = Math.random().toString(36).substring(7);
  return { index, value: randomWord }
});
const estimateSize = (): number => 48;

// Procedural
virtualizer.count = data.length;
virtualizer.estimateSize = estimateSize;
virtualizer.itemBuilder = (row: VirtualItem): HTMLElement => {
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
};;

// Declarative
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
declarativeVirtualizer.estimateSize = estimateSize;
declarativeVirtualizer.addEventListener('change', throttleChangeHandler, { passive: true });

// Horizontal
horizontalVirtualizer.count = data.length;
horizontalVirtualizer.estimateSize = estimateSize;
horizontalVirtualizer.itemBuilder = (row: VirtualItem): HTMLElement => {
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
}
