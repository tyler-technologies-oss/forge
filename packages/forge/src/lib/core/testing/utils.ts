export function tryCleanupPopovers(): void {
  const popovers = Array.from(document.querySelectorAll('forge-popover')) as HTMLElement[];
  popovers.forEach(p => p.remove());
}

export function isVisibleInScrollContainer(scrollContainer: HTMLElement, element: HTMLElement): boolean {
  const elemTop = element.offsetTop - scrollContainer.offsetTop;
  const elemBottom = elemTop + element.offsetHeight;
  return elemTop >= scrollContainer.scrollTop && elemBottom <= scrollContainer.scrollTop + scrollContainer.offsetHeight;
}
