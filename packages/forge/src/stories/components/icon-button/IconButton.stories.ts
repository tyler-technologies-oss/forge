import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { standaloneStoryParams, customElementStoryRenderer, generateCustomElementArgTypes, GLOBAL_THEME_OPTIONS } from '../../utils';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { tylIconForgeLogo, tylIconFavorite, tylIconFavoriteBorder, tylIconNotifications, tylIconOpenInNew, tylIconSettings } from '@tylertech/tyler-icons';
import { classMap } from 'lit/directives/class-map.js';

import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/circular-progress';
import '@tylertech/forge/badge';
import '@tylertech/forge/label';

const component = 'forge-icon-button';

IconRegistry.define([tylIconForgeLogo, tylIconFavorite, tylIconFavoriteBorder, tylIconOpenInNew, tylIconNotifications, tylIconSettings]);

const clickAction = action('click');

const meta = {
  title: 'Components/Icon Button',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.addEventListener('click', clickAction);

    if (args.toggle) {
      el.setAttribute('aria-label', 'Toggle icon button demo');

      const onEl = document.createElement('forge-icon');
      onEl.name = tylIconFavorite.name;
      onEl.slot = 'on';
      el.appendChild(onEl);

      const offEl = document.createElement('forge-icon');
      offEl.name = tylIconFavoriteBorder.name;
      el.appendChild(offEl);
    } else {
      el.setAttribute('aria-label', 'Icon button demo');

      const icon = document.createElement('forge-icon');
      icon.name = tylIconForgeLogo.name;
      el.appendChild(icon);
    }

    return el;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['form', 'name', 'value', 'type', 'on'],
      controls: {
        variant: { control: { type: 'select' }, options: ['icon', 'outlined', 'tonal', 'filled', 'raised'] },
        theme: { control: { type: 'select' }, options: GLOBAL_THEME_OPTIONS },
        shape: { control: { type: 'select' }, options: ['circular', 'squared'] },
        density: { control: { type: 'select' }, options: ['small', 'medium', 'large'] }
      }
    })
  },
  args: {
    variant: 'icon',
    theme: 'default',
    disabled: false,
    dense: false,
    toggle: false,
    pressed: false,
    shape: 'circular',
    density: 'large',
    popoverIcon: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Variants: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-icon-button aria-label="Default icon button">
      <forge-icon name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button variant="outlined" aria-label="Outlined icon button">
      <forge-icon name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button variant="tonal" aria-label="Tonal icon button">
      <forge-icon name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button variant="filled" aria-label="Filled icon button">
      <forge-icon name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button variant="raised" aria-label="Raised icon button">
      <forge-icon name="favorite"></forge-icon>
    </forge-icon-button>
  `
};

export const Toggle: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-icon-button toggle aria-label="Default toggle icon button">
      <forge-icon name="favorite_border"></forge-icon>
      <forge-icon slot="on" name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button toggle variant="outlined" aria-label="Outlined toggle icon button">
      <forge-icon name="favorite_border"></forge-icon>
      <forge-icon slot="on" name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button toggle variant="tonal" aria-label="Tonal toggle icon button">
      <forge-icon name="favorite_border"></forge-icon>
      <forge-icon slot="on" name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button toggle variant="filled" aria-label="Filled toggle icon button">
      <forge-icon name="favorite_border"></forge-icon>
      <forge-icon slot="on" name="favorite"></forge-icon>
    </forge-icon-button>

    <forge-icon-button toggle variant="raised" aria-label="Raised toggle icon button">
      <forge-icon name="favorite_border"></forge-icon>
      <forge-icon slot="on" name="favorite"></forge-icon>
    </forge-icon-button>
  `
};

export const Anchor: Story = {
  parameters: {
    controls: { include: ['variant'] }
  },
  render: ({ variant }) => html`
    <forge-icon-button .variant=${variant}>
      <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
        <forge-icon .name=${tylIconOpenInNew.name}></forge-icon>
      </a>
    </forge-icon-button>
  `
};

export const Themed: Story = {
  parameters: {
    controls: { include: ['variant'] }
  },
  render: ({ variant }) => html`
    <forge-icon-button variant=${variant} aria-label="Default theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="primary" aria-label="Primary theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="secondary" aria-label="Secondary theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="tertiary" aria-label="Tertiary theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="success" aria-label="Success theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="warning" aria-label="Warning theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="error" aria-label="Error theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${variant} theme="info" aria-label="Info theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
  `
};

export const WithBadge: Story = {
  parameters: {
    controls: { exclude: ['toggle', 'on', 'popoverIcon'] }
  },
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.setAttribute('aria-label', 'Icon button with badge');

    const icon = document.createElement('forge-icon');
    icon.name = tylIconNotifications.name;
    el.appendChild(icon);

    const badge = document.createElement('forge-badge');
    badge.textContent = '3';
    badge.slot = 'badge';
    el.appendChild(badge);

    return el;
  }
};

export const WithCircularProgress: Story = {
  parameters: {
    controls: { include: ['variant', 'theme', 'disabled'] }
  },
  render: ({ variant, theme, disabled }) => html`
    <forge-icon-button .variant=${variant} .theme=${theme} ?disabled=${disabled} aria-label="Loading">
      <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
    </forge-icon-button>
  `
};

export const WithLabel: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
      <forge-icon-button>
        <forge-icon name=${tylIconSettings.name}></forge-icon>
      </forge-icon-button>
      <span>Settings</span>
    </forge-label>
  `
};

export const CSSOnly: Story = {
  parameters: {
    controls: { include: ['variant', 'density', 'disabled', 'shape'] }
  },
  args: {
    variant: 'icon',
    density: 'large',
    disabled: false,
    shape: 'circular'
  },
  render: ({ variant, density, disabled, shape }) => {
    const classes = {
      'forge-icon-button': true,
      'forge-icon-button--outlined': variant === 'outlined',
      'forge-icon-button--tonal': variant === 'tonal',
      'forge-icon-button--filled': variant === 'filled',
      'forge-icon-button--raised': variant === 'raised',
      'forge-icon-button--small': density === 'small',
      'forge-icon-button--medium': density === 'medium',
      'forge-icon-button--large': density === 'large',
      'forge-icon-button--squared': shape === 'squared'
    };
    return html`<button class=${classMap(classes)} ?disabled=${disabled} aria-label="My CSS-only icon button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>`;
  }
};
