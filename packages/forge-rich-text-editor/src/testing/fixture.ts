import { render } from 'vitest-browser-lit';
import type { LitElement } from 'lit';

/**
 * Renders a Lit template and resolves once the requested element has completed its first update.
 *
 * This mirrors the behavior that `@open-wc/testing`'s `fixture()` provided, which
 * `vitest-browser-lit`'s synchronous `render()` does not.
 *
 * @param template The Lit template to render.
 * @param tagName The tag name of the element to return from the rendered template.
 * @returns The rendered element, after its first update has completed.
 */
export async function renderFixture<T extends LitElement>(template: unknown, tagName: string): Promise<T> {
  const element = render(template).container.querySelector<T>(tagName);
  if (!element) {
    throw new Error(`renderFixture: no <${tagName}> found in the rendered template`);
  }
  await element.updateComplete;
  return element;
}
