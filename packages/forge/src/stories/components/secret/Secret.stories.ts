import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { standaloneStoryParams, customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ref, createRef, type Ref } from 'lit/directives/ref.js';

import '@tylertech/forge/secret';
import '@tylertech/forge/secret/forge-secret.scss';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/button';
import '@tylertech/forge/tooltip';

const component = 'forge-secret';

const meta = {
  title: 'Components/Secret',
  tags: ['new'],
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const el = customElementStoryRenderer(component, args);
    el.textContent = args.text;
    if (style) {
      el.setAttribute('style', String(style));
    }
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['name'],
      controls: {
        variant: { control: 'select', options: ['blur', 'masked', 'noise'] },
        buttonPosition: { control: 'select', options: ['start', 'end'] }
      }
    }),
    text: { control: 'text' }
  },
  args: {
    text: 'Secret content here',
    open: false,
    variant: 'blur',
    mask: '',
    maskCharacter: '●',
    allow: '',
    block: false,
    buttonPosition: 'end',
    showOnHover: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const NamedGroup: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">Consectetur adipiscing elit</forge-secret>
    </div>
  `
};

export const Block: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  `
};

export const CssOnly: Story = {
  ...standaloneStoryParams,
  render: () => {
    const secretRef: Ref<HTMLElement> = createRef();
    const buttonRef: Ref<HTMLElement> = createRef();

    const handleClick = (): void => {
      const secret = secretRef.value;
      const button = buttonRef.value;
      if (!secret || !button) {
        return;
      }

      const isExpanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', isExpanded.toString());

      const content = secret.querySelector('.forge-secret__content');
      if (content) {
        content.toggleAttribute('inert', !isExpanded);
      }

      const icon = button.querySelector('forge-icon');
      if (icon) {
        icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
      }

      const tooltip = secret.querySelector('forge-tooltip');
      if (tooltip) {
        tooltip.textContent = isExpanded ? 'Hide' : 'Show';
      }
    };

    return html`
      <span ${ref(secretRef)} class="forge-secret forge-secret--blur" id="css-only-secret" role="group" aria-label="Secret">
        <span class="forge-secret__content" inert>Secret content here</span>
        <forge-icon-button
          ${ref(buttonRef)}
          @click=${handleClick}
          class="forge-secret__button"
          aria-labelledby="css-only-secret"
          aria-expanded="false"
          aria-controls="css-only-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
        </forge-icon-button>
        <forge-tooltip position="top">Show</forge-tooltip>
      </span>
    `;
  }
};

export const CssOnlyBlock: Story = {
  ...standaloneStoryParams,
  render: () => {
    const secretRef: Ref<HTMLElement> = createRef();
    const buttonRef: Ref<HTMLElement> = createRef();

    const handleClick = (): void => {
      const secret = secretRef.value;
      const button = buttonRef.value;
      if (!secret || !button) {
        return;
      }

      const isExpanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', isExpanded.toString());

      const content = secret.querySelector('.forge-secret__content');
      if (content) {
        content.toggleAttribute('inert', !isExpanded);
      }

      const icon = button.querySelector('forge-icon');
      if (icon) {
        icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
      }

      const span = button.querySelector('span');
      if (span) {
        span.textContent = isExpanded ? 'Hide' : 'Show';
      }
    };

    return html`
      <div ${ref(secretRef)} class="forge-secret forge-secret--block forge-secret--blur" id="css-only-block-secret" role="group" aria-label="Secret">
        <div class="forge-secret__content" inert>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <forge-button ${ref(buttonRef)} @click=${handleClick} class="forge-secret__text-button" aria-expanded="false" aria-controls="css-only-block-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
          <span>Show</span>
        </forge-button>
      </div>
    `;
  }
};
