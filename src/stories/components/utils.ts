import { getCustomElements, type StoryObj } from '@storybook/web-components';

/**
 * Common default parameters for a standalone story.
 */
export const standaloneStoryParams: StoryObj = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  },
};

/**
 * Transforms the CSS properties of a custom element into controls for Storybook.
 * @param tagName {string} - The tag name of the custom element
 * @returns {object} - The controls object for Storybook
 */
export function transformCssPropsToControls(tagName: string) {
  const cem = getCustomElements();
  const declaration = cem.modules.flatMap((module: any) => module.declarations).find((declaration: any) => declaration.tagName === tagName);
  return declaration.cssProperties.reduce((acc: object, prop: any) => {
    acc[prop.name] = { control: 'text' };
    return acc;
  }, {});
}

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
