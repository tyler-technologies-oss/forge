/**
 * Render a custom element story using the provided tag name and props.
 * @param tagName {keyof HTMLElementTagNameMap} - The tag name of the component to render
 * @param props {Partial<HTMLElementTagNameMap[T]>} - The props to pass to the component
 * @returns {HTMLElement} - The rendered element.
 */
export function customElementStoryRenderer<T extends keyof HTMLElementTagNameMap>(tagName: T, props: Partial<HTMLElementTagNameMap[T]>): HTMLElement {
  const element = document.createElement(tagName);

  Object.keys(props).forEach((key) => {
    if (key.startsWith('--')) {
      // Set CSS custom properties via inline style
      element.style.setProperty(key, props[key]);
    } else if (key.includes('-')) {
      // Args with dashes in the name are considered HTML attributes
      element.setAttribute(key, props[key]);
    } else if (key in element) {
      // Everything else is considered a JavaScript property if it exists on the element
      element[key] = props[key];
    }
  });

  return element;
}
