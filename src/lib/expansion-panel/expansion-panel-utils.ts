import { getEventPath } from '@tylertech/forge-core';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

export function eventPathIncludesIgnoredElement(evt: Event): boolean {
  const path = getEventPath(evt);
  return path.some(p => p.matches?.(EXPANSION_PANEL_CONSTANTS.selectors.IGNORE));
}

export function createButtonElement(expanded: boolean): HTMLButtonElement {
  const el = document.createElement('button');
  el.classList.add(EXPANSION_PANEL_CONSTANTS.classes.BUTTON);
  el.setAttribute('type', 'button');
  el.setAttribute('part', 'button');
  el.setAttribute('aria-controls', EXPANSION_PANEL_CONSTANTS.ids.CONTENT);
  el.setAttribute('aria-expanded', expanded.toString());
  return el;
}
