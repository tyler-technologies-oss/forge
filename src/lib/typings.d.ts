// Allow for importing from .html files
declare module '*.html' {
  const value: string;
  export default value;
}

// Allow for importing from .scss files
declare module '*.scss' {
  const css: string;
  export default css;
}

// Patch HTMLElement to add popover methods. Remove this when TypeScript is updated.
interface HTMLElement {
  popoverTargetElement: HTMLElement | null;
  popover: 'manual' | 'auto' | null | undefined;
  showPopover(): void;
  hidePopover(): void;
  togglePopover(): boolean;
}
