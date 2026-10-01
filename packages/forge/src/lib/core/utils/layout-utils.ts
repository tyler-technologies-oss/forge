/**
 * Determines whether the inline-end edge of one element is overlapping (or within `buffer` pixels of) the inline-start edge of another.
 * @param first The element expected to come first.
 * @param second The element expected to come after `first`.
 * @param buffer The minimum space required between the two elements.
 */
export function isOverlapping(first: Element | null | undefined, second: Element | null | undefined, buffer = 0): boolean {
  const firstEnd = first?.getBoundingClientRect().right ?? 0;
  const secondStart = second?.getBoundingClientRect().left ?? 0;
  return firstEnd + buffer >= secondStart;
}

/** Determines whether an element's content is clipped by its own box (e.g. truncated text). */
export function isTruncated(element: Element | null | undefined): boolean {
  return !!element && element.scrollWidth > element.clientWidth;
}
