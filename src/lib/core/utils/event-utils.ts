/**
 * Proxies a `scroll` event from an element and dispatches it from another element.
 * Typically used when proxying the event from an element within a shadow root from its host element in the light dom.
 * @param originalEl The element that the `scroll` event originated from.
 * @param targetEl The element to manually dispatch (proxy) the `scroll` event from.
 */
export function proxyShadowScrollEvent(shadowEl: Node, proxyEl: Node): () => void {
  const scrollListenerFn = (): boolean => proxyEl.dispatchEvent(new Event('scroll'));
  shadowEl.addEventListener('scroll', scrollListenerFn, true);
  return () => shadowEl.removeEventListener('scroll', scrollListenerFn, true);
}

export function eventIncludesArrowKey(evt: KeyboardEvent): boolean {
  return evt.key === 'ArrowLeft' || evt.key === 'ArrowRight' || evt.key === 'ArrowUp' || evt.key === 'ArrowDown';
}
