import { IconRegistry } from './icon-registry';
import { ICON_CONSTANTS } from './icon-constants';
import { createSvgFromString } from '../core/utils/svg-utils';

const _activeIconRequests = new Map<string, Promise<any>>();

/** Determines if the provided SVG icon content is valid */
export function sanitizeSvgContent(svgContent: string | undefined, customViewBox?: string, usePartAttrs = true): string {
  if (!svgContent || !svgContent.includes('svg')) {
    return '';
  }
  
  if (!customViewBox && !svgContent.includes('viewBox')) {
    customViewBox = `0 0 ${ICON_CONSTANTS.numbers.DEFAULT_WIDTH} ${ICON_CONSTANTS.numbers.DEFAULT_HEIGHT}`;
  }

  const svgElement = createSvgFromString(svgContent, customViewBox);

  if (usePartAttrs && svgElement) {
    svgElement.setAttribute('part', 'svg');
    svgElement.querySelectorAll('path').forEach(node => {
      node.setAttribute('part', node.tagName.toLowerCase());
    });
  }

  return svgElement ? svgElement.outerHTML : '';
}

export function getCachedIcon(key: string): string | undefined {
  return IconRegistry.get(key);
}

export function awaitIconDefinition(key: string, listener: () => void): void {
  IconRegistry.awaitIcon(key, listener);
}

export function removeIconListener(key: string, listener: () => void): void {
  IconRegistry.removeListener(key, listener);
}

export function fetchIconContent(url: string, name: string): Promise<string> {
  // Check if we already have an active request for this URL
  let request = _activeIconRequests.get(url);

  if (!request) {
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
      // we don't already have a request
      request = fetch(url).then(async response => {
        if (response.ok) {
          const data = await response.text() || '';
          IconRegistry.define({ name, data });
          _activeIconRequests.delete(url);
          return data;
        }
        IconRegistry.define({ name, data: '' });
        return '';
      });

      // Cache this request in case of duplicate requests
      _activeIconRequests.set(url, request);
    } else {
      // set to empty for ssr scenarios and resolve promise
      IconRegistry.define({ name, data: '' });
      return Promise.resolve('');
    }
  }

  return request || Promise.resolve('');
}

export function sanitizeExternalType(type: string): string {
  const isValidType = ['standard', 'extended', 'custom'].includes(type);
  return isValidType ? type : '';
}
