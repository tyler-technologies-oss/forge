/**
 * Adds a class that starts CSS animations on an element and waits for them to finish.
 *
 * Only animations on the element itself are awaited, so animations on descendants don't end it early.
 * Resolves `true` right away when the class starts no animations, such as when the element is hidden or
 * animations are turned off.
 *
 * @param element The element to animate.
 * @param className The class that starts the animations.
 * @param options.remove Whether to remove the class once the animations finish.
 * @returns `true` if the animations finished, or `false` if any was cancelled, such as when the class
 * was removed or the element was hidden before they finished.
 */
export async function playClassAnimation(element: Element, className: string, { remove = true } = {}): Promise<boolean> {
  element.classList.add(className);

  const animations = element.getAnimations().filter(animation => animation instanceof CSSAnimation);

  try {
    await Promise.all(animations.map(animation => animation.finished));
  } catch {
    return false;
  }

  if (remove) {
    element.classList.remove(className);
  }
  return true;
}
