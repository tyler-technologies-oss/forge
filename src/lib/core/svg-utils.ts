/**
 * Creates an SVG element from a string.
 */
export function createSvgFromString(svgContent: string, defaultViewBox?: string): SVGSVGElement | null {
  const div = document.createElement('div');
  div.innerHTML = svgContent;

  // Remove all non-svg child nodes
  for (let i = div.childNodes.length - 1; i >= 0; i--) {
    if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
      div.removeChild(div.childNodes[i]);
    }
  }

  const svgElm = div.firstElementChild as SVGSVGElement;
  if (svgElm && svgElm.nodeName.toLowerCase() === 'svg' && isSafeSvg(svgElm)) {
    // Check if a custom viewbox value was provided and use that if so
    if (defaultViewBox) {
      svgElm.setAttribute('viewBox', defaultViewBox);
    }

    // Force a default viewBox if one doesn't exist (this ensures our icon is scalable)
    if (!svgElm.hasAttribute('viewBox') && defaultViewBox) {
      svgElm.setAttribute('viewBox', defaultViewBox);
    }

    // Remove any height and width attributes to ensure that the icon is properly scalable
    svgElm.removeAttribute('height');
    svgElm.removeAttribute('width');

    return svgElm;
  }

  return null;
}

/**
 * Determines if the provided element is a safe SVG to use.
 * @param el The element reference to test.
 */
export function isSafeSvg(el: Element): boolean {
  if (el.nodeType !== 1) {
    return true;
  }

  // Validate no <script> tags exist
  if (el.nodeName.toLowerCase() === 'script') {
    return false;
  }

  // Ensure there are no inline listeners
  const attributes = Array.from(el.attributes);
  for (const attr of attributes) {
    if (typeof attr.name === 'string' && attr.name.toLowerCase().startsWith('on')) {
      return false;
    }
  }

  // Ensure all child nodes are valid
  const childNodes = Array.from(el.childNodes) as Element[];
  for (const node of childNodes) {
    if (!isSafeSvg(node)) {
      return false;
    }
  }

  return true;
}
