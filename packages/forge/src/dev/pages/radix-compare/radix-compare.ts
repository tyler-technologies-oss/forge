import '$src/shared';
import './radix-compare.scss';

import componentsJson from '$src/components.json';
import '@tylertech/forge/select';
import '@tylertech/forge/switch';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';

type CompareView = 'side-by-side' | 'difference';

interface IComponentIdentifier {
  label: string;
  path: string;
}

const SELF_PATH = '/pages/radix-compare/radix-compare.html';
const DEFAULT_PAGE_PATH = '/pages/card/card.html';
const DEFAULT_VIEW: CompareView = 'side-by-side';
const DEFAULT_WIDTH = 'fit';
const CAPTIONS: Record<CompareView, string> = {
  'side-by-side': 'The same page with the default theme on the left and the Radix theme on the right.',
  difference: 'Pixels that differ between the default and Radix themes light up. Black means identical. Interactions apply to the Radix frame only.'
};

const compare = document.querySelector('#compare') as HTMLElement;
const caption = document.querySelector('#compare-caption') as HTMLElement;
const defaultFrame = document.querySelector('#frame-default') as HTMLIFrameElement;
const radixFrame = document.querySelector('#frame-radix') as HTMLIFrameElement;
const pageSelect = document.querySelector('#opt-page') as ISelectComponent;
const viewSelect = document.querySelector('#opt-view') as ISelectComponent;
const widthSelect = document.querySelector('#opt-width') as ISelectComponent;
const darkSwitch = document.querySelector('#opt-dark') as ISwitchComponent;
const syncSwitch = document.querySelector('#opt-sync') as ISwitchComponent;

const params = new URLSearchParams(window.location.search);
const pages = (componentsJson as IComponentIdentifier[]).filter(({ path }) => path !== SELF_PATH);

const state = {
  page: params.get('page') ?? DEFAULT_PAGE_PATH,
  view: (params.get('view') as CompareView | null) ?? DEFAULT_VIEW,
  width: params.get('width') ?? DEFAULT_WIDTH,
  dark: params.get('dark') === '1',
  sync: params.get('sync') !== '0'
};

function populatePageSelect(): void {
  for (const { label, path } of pages) {
    const option = document.createElement('forge-option');
    option.setAttribute('value', path);
    option.textContent = label;
    pageSelect.appendChild(option);
  }
  pageSelect.value = state.page;
}

function getFrameUrl(radix: boolean): string {
  const url = new URL(state.page, window.location.origin);
  url.searchParams.set('radix', radix ? '1' : '0');
  url.searchParams.set('dark', state.dark ? '1' : '0');
  return `${url.pathname}${url.search}`;
}

function reloadFrames(): void {
  defaultFrame.src = getFrameUrl(false);
  radixFrame.src = getFrameUrl(true);
}

function applyLayout(): void {
  compare.dataset.view = state.view;
  compare.style.setProperty('--compare-frame-width', state.width === DEFAULT_WIDTH ? '100%' : `${state.width}px`);
  caption.textContent = CAPTIONS[state.view];
}

function updateAddressBar(): void {
  const url = new URL(window.location.href);
  url.search = new URLSearchParams({
    page: state.page,
    view: state.view,
    width: state.width,
    dark: state.dark ? '1' : '0',
    sync: state.sync ? '1' : '0'
  }).toString();
  window.history.replaceState(null, '', url);
}

function findScroller(frame: HTMLIFrameElement): Element | null {
  const doc = frame.contentDocument;
  if (!doc) {
    return null;
  }
  let element: Element | null = doc.querySelector('main.content');
  while (element) {
    const { overflowY } = frame.contentWindow!.getComputedStyle(element);
    if ((overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight) {
      return element;
    }
    element = element.parentElement ?? (element.getRootNode() as ShadowRoot).host ?? null;
  }
  return doc.scrollingElement;
}

function mirrorScroll(from: HTMLIFrameElement, to: HTMLIFrameElement): void {
  if (!state.sync) {
    return;
  }
  const source = findScroller(from);
  const target = findScroller(to);
  if (!source || !target || (source.scrollTop === target.scrollTop && source.scrollLeft === target.scrollLeft)) {
    return;
  }
  target.scrollTo({ top: source.scrollTop, left: source.scrollLeft });
}

function listenForScroll(frame: HTMLIFrameElement, other: HTMLIFrameElement): void {
  frame.addEventListener('load', () => {
    const doc = frame.contentDocument;
    if (!doc) {
      return;
    }
    const handler = (): void => mirrorScroll(frame, other);
    doc.addEventListener('scroll', handler, true);
    doc.querySelectorAll('forge-scaffold').forEach(scaffold => scaffold.shadowRoot?.addEventListener('scroll', handler, true));
  });
}

function initializeControls(): void {
  populatePageSelect();
  viewSelect.value = state.view;
  widthSelect.value = state.width;
  darkSwitch.on = state.dark;
  syncSwitch.on = state.sync;

  pageSelect.addEventListener('change', () => {
    state.page = pageSelect.value as string;
    updateAddressBar();
    reloadFrames();
  });
  viewSelect.addEventListener('change', () => {
    state.view = viewSelect.value as CompareView;
    updateAddressBar();
    applyLayout();
  });
  widthSelect.addEventListener('change', () => {
    state.width = widthSelect.value as string;
    updateAddressBar();
    applyLayout();
  });
  darkSwitch.addEventListener('forge-switch-change', ({ detail: selected }) => {
    state.dark = selected;
    updateAddressBar();
    reloadFrames();
  });
  syncSwitch.addEventListener('forge-switch-change', ({ detail: selected }) => {
    state.sync = selected;
    updateAddressBar();
  });
}

initializeControls();
listenForScroll(defaultFrame, radixFrame);
listenForScroll(radixFrame, defaultFrame);
applyLayout();
reloadFrames();
