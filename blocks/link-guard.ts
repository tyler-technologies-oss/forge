/**
 * Link guard for blocks.
 *
 * Blocks set `<base href>` to the blocks root, so placeholder links like `href="#"` (and
 * fragment links rendered inside shadow roots, e.g. breadcrumb items) resolve against it and
 * navigate the frame away from the block. Cancel fragment-only navigation instead, scrolling
 * to the target element when there is one, and cancel the app bar's title link navigation.
 */

const APP_BAR_NAVIGATE_EVENT = 'forge-app-bar-navigate';

const findAnchor = (event: Event): HTMLAnchorElement | undefined =>
  event.composedPath().find((target): target is HTMLAnchorElement => target instanceof HTMLAnchorElement);

document.addEventListener('click', event => {
  if (event.defaultPrevented) {
    return;
  }

  const href = findAnchor(event)?.getAttribute('href');
  if (!href?.startsWith('#')) {
    return;
  }

  event.preventDefault();
  const id = decodeURIComponent(href.slice(1));
  if (id) {
    document.getElementById(id)?.scrollIntoView();
  }
});

document.addEventListener(APP_BAR_NAVIGATE_EVENT, event => event.preventDefault());
