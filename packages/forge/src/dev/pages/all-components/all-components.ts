import '$src/shared';
import './all-components.scss';
import '@tylertech/forge/chips';
import blocks from 'virtual:forge-blocks';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconOpenInNew, tylIconSearch } from '@tylertech/tyler-icons';
import { BLOCK_HEIGHT_MESSAGE, BLOCK_THEME_MESSAGE, type BlockFrameMessage, type BlockTheme } from '$src/block-frame-messages';
import componentPages from '$src/components.json';

IconRegistry.define([tylIconOpenInNew, tylIconSearch]);

interface IForgeBlock {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  url: string;
}

interface IComponentPage {
  label: string;
  path: string;
}

const CATEGORY_ORDER = ['actions', 'forms', 'data-display', 'feedback', 'layout', 'navigation', 'utilities', 'other'];
const CATEGORY_LABELS: Record<string, string> = {
  actions: 'Actions',
  forms: 'Forms',
  'data-display': 'Data display',
  feedback: 'Feedback',
  layout: 'Layout',
  navigation: 'Navigation',
  utilities: 'Utilities',
  other: 'Other'
};
const DARK_STYLE_ID = 'forge-dark-style';
const FRAME_MIN_HEIGHT = 64;
const FRAME_PRELOAD_MARGIN = '600px 0px';
const MAX_CONCURRENT_FRAME_LOADS = 4;

const filterInput = document.getElementById('all-components-filter-input') as HTMLInputElement;
const filterField = document.getElementById('all-components-filter') as HTMLElement;
const countElement = document.getElementById('all-components-count') as HTMLElement;
const navElement = document.getElementById('all-components-nav') as HTMLElement;
const sectionsElement = document.getElementById('all-components-sections') as HTMLElement;
const emptyElement = document.getElementById('all-components-empty') as HTMLElement;

const allBlocks = blocks as IForgeBlock[];
const devPages = new Map((componentPages as IComponentPage[]).map(({ label, path }) => [normalize(label), path]));

const currentTheme = (): BlockTheme => (document.getElementById(DARK_STYLE_ID) ? 'dark' : 'light');

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

function sectionId(category: string): string {
  return `category-${category}`;
}

const frameQueue: HTMLIFrameElement[] = [];
let activeFrameLoads = 0;

function loadNextFrames(): void {
  while (activeFrameLoads < MAX_CONCURRENT_FRAME_LOADS && frameQueue.length) {
    const frame = frameQueue.shift() as HTMLIFrameElement;
    activeFrameLoads++;
    frame.addEventListener(
      'load',
      () => {
        activeFrameLoads--;
        loadNextFrames();
      },
      { once: true }
    );
    frame.src = `${frame.dataset.src}?theme=${currentTheme()}`;
    delete frame.dataset.src;
  }
}

const frameLoader = new IntersectionObserver(
  entries => {
    for (const { isIntersecting, target } of entries) {
      const frame = target as HTMLIFrameElement;
      if (isIntersecting && frame.dataset.src) {
        frameLoader.unobserve(frame);
        frameQueue.push(frame);
      }
    }
    loadNextFrames();
  },
  { rootMargin: FRAME_PRELOAD_MARGIN }
);

function createFrame(block: IForgeBlock): HTMLIFrameElement {
  const frame = createElement('iframe', 'component-tile__frame');
  frame.title = `${block.name} demo`;
  frame.dataset.src = block.url;
  frame.style.blockSize = `${FRAME_MIN_HEIGHT}px`;
  frameLoader.observe(frame);
  return frame;
}

function findFrame(source: MessageEventSource | null): HTMLIFrameElement | undefined {
  return [...sectionsElement.querySelectorAll<HTMLIFrameElement>('.component-tile__frame')].find(frame => frame.contentWindow === source);
}

function createTile(block: IForgeBlock): HTMLElement {
  const tile = createElement('forge-card', 'component-tile');
  tile.dataset.search = normalize([block.name, block.id, block.category, ...block.tags].join(' '));

  const header = createElement('div', 'component-tile__header');
  const heading = createElement('h3', 'forge-typography--heading2 component-tile__title', block.name);
  header.append(heading);

  const devPage = devPages.get(normalize(block.name));
  if (devPage) {
    const link = createElement('a', 'component-tile__link');
    link.href = devPage;
    link.setAttribute('aria-label', `Open the ${block.name} dev page`);
    const icon = createElement('forge-icon');
    icon.setAttribute('name', 'open_in_new');
    link.append(icon);
    header.append(link);
  }

  const id = createElement('code', 'forge-typography--label1 component-tile__id', block.id);
  tile.append(header, id, createFrame(block));
  return tile;
}

function groupByCategory(items: IForgeBlock[]): Map<string, IForgeBlock[]> {
  const groups = new Map<string, IForgeBlock[]>(CATEGORY_ORDER.map(category => [category, []]));
  for (const block of items) {
    const category = groups.has(block.category) ? block.category : 'other';
    groups.get(category)?.push(block);
  }
  return new Map([...groups].filter(([, members]) => members.length > 0));
}

function render(): void {
  const groups = groupByCategory(allBlocks);

  const navChips = [...groups].map(([category, members]) => {
    const chip = createElement('forge-chip', undefined, `${CATEGORY_LABELS[category] ?? category} (${members.length})`);
    chip.setAttribute('href', `#${sectionId(category)}`);
    chip.dataset.category = category;
    return chip;
  });
  const chipSet = createElement('forge-chip-set');
  chipSet.append(...navChips);
  navElement.replaceChildren(chipSet);

  const sections = [...groups].map(([category, members]) => {
    const section = createElement('section', 'component-category');
    section.id = sectionId(category);
    section.dataset.category = category;
    const heading = createElement('h2', 'forge-typography--heading4 component-category__title', CATEGORY_LABELS[category] ?? category);
    const grid = createElement('div', 'component-category__grid');
    grid.append(...members.map(createTile));
    section.append(heading, grid);
    return section;
  });
  sectionsElement.replaceChildren(...sections);
}

function applyFilter(query: string): void {
  const term = normalize(query);
  let visibleCount = 0;

  sectionsElement.querySelectorAll<HTMLElement>('.component-category').forEach(section => {
    let sectionVisible = 0;
    section.querySelectorAll<HTMLElement>('.component-tile').forEach(tile => {
      const matches = !term || (tile.dataset.search ?? '').includes(term);
      tile.hidden = !matches;
      sectionVisible += matches ? 1 : 0;
    });
    section.hidden = sectionVisible === 0;
    navElement.querySelector<HTMLElement>(`[data-category="${section.dataset.category}"]`)?.toggleAttribute('hidden', sectionVisible === 0);
    visibleCount += sectionVisible;
  });

  emptyElement.hidden = visibleCount > 0;
  countElement.textContent = term ? `${visibleCount} of ${allBlocks.length} components` : `${allBlocks.length} components`;

  const url = new URL(location.href);
  if (term) {
    url.searchParams.set('q', query);
  } else {
    url.searchParams.delete('q');
  }
  history.replaceState(null, '', url);
}

function broadcastTheme(): void {
  const message: BlockFrameMessage = { type: BLOCK_THEME_MESSAGE, theme: currentTheme() };
  sectionsElement.querySelectorAll<HTMLIFrameElement>('.component-tile__frame').forEach(frame => frame.contentWindow?.postMessage(message, location.origin));
}

window.addEventListener('message', ({ source, origin, data }: MessageEvent<BlockFrameMessage>) => {
  if (origin !== location.origin || data?.type !== BLOCK_HEIGHT_MESSAGE) {
    return;
  }
  const frame = findFrame(source);
  if (frame) {
    frame.style.blockSize = `${Math.max(data.height, FRAME_MIN_HEIGHT)}px`;
  }
});

new MutationObserver(broadcastTheme).observe(document.head, { childList: true });

filterInput.addEventListener('input', () => applyFilter(filterInput.value));
filterField.addEventListener('forge-text-field-clear', () => {
  filterInput.value = '';
  applyFilter('');
});

render();
filterInput.value = new URL(location.href).searchParams.get('q') ?? '';
applyFilter(filterInput.value);
