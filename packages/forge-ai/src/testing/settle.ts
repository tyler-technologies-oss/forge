const nextFrame = (): Promise<void> => new Promise(resolve => requestAnimationFrame(() => resolve()));

/**
 * Waits for the element's pending update, then two animation frames so queued popover `toggle`
 * events have been delivered.
 *
 * @param el The element to wait on.
 */
export async function settle(el: { updateComplete: Promise<unknown> }): Promise<void> {
  await el.updateComplete;
  await nextFrame();
  await nextFrame();
}
