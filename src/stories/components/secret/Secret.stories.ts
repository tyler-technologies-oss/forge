import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { SecretComponent } from '@tylertech/forge/secret';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/secret';
import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/icon';
import '@tylertech/forge/state-layer';
import '@tylertech/forge/tooltip';

const component = 'forge-secret';

const meta = {
  title: 'Components/Secret',
  render: args => {
    const { text, label, ...componentArgs } = args;

    return html`
      <forge-secret
        ?visible=${componentArgs.visible}
        variant=${componentArgs.variant}
        ?show-on-hover=${componentArgs.showOnHover}
        ?no-label=${componentArgs.noLabel}
        name=${componentArgs.name || nothing}>
        ${label ? html`<span slot="label">${label}</span>` : nothing} ${text}
      </forge-secret>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['text', 'label'],
      controls: {
        visible: { control: 'boolean' },
        variant: { control: 'inline-radio', options: ['blur', 'dots'] },
        showOnHover: { control: 'boolean' },
        noLabel: { control: 'boolean' },
        name: { control: 'text' }
      }
    }),
    text: {
      control: 'text',
      description: 'The secret text content'
    },
    label: {
      control: 'text',
      description: 'Optional label text (label slot)'
    }
  },
  args: {
    visible: false,
    variant: 'blur',
    showOnHover: false,
    noLabel: false,
    name: '',
    text: 'Secret content',
    label: ''
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  args: {
    text: 'This is secret content'
  }
};

export const Blur: Story = {
  parameters: {
    controls: { include: ['text', 'visible'] }
  },
  args: {
    text: 'This content is blurred when hidden',
    variant: 'blur'
  }
};

export const Dots: Story = {
  parameters: {
    controls: { include: ['text', 'visible'] }
  },
  args: {
    text: 'This content is replaced by dots when hidden',
    variant: 'dots'
  }
};

export const WithLabel: Story = {
  parameters: {
    controls: { include: ['text', 'label', 'visible'] }
  },
  args: {
    label: 'Password',
    text: 'my_secret_password'
  }
};

export const ShowOnHover: Story = {
  parameters: {
    controls: { include: ['text', 'showOnHover'] }
  },
  args: {
    text: 'Hover over me to reveal',
    showOnHover: true
  }
};

export const LinkedGroup: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p>Click on any secret to reveal it. Only one can be visible at a time:</p>
        <div>
          <p class="forge-typography--label1">Username</p>
          <forge-secret name="credentials">john_doe</forge-secret>
        </div>
        <div>
          <p class="forge-typography--label1">Password</p>
          <forge-secret name="credentials">my_secret_password</forge-secret>
        </div>
        <div>
          <p class="forge-typography--label1">API Key</p>
          <forge-secret name="credentials">sk_test_1234567890abcdef</forge-secret>
        </div>
      </div>
    `;
  }
};

export const InlineUsage: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <p>
        The user's email is
        <forge-secret>user@example.com</forge-secret>
        and their phone number is
        <forge-secret variant="dots">555-1234</forge-secret>.
      </p>
    `;
  }
};

export const Programmatic: Story = {
  ...standaloneStoryParams,
  render: () => {
    const handleToggle = (event: Event) => {
      const button = event.target as HTMLButtonElement;
      const secret = button.nextElementSibling as SecretComponent;
      secret.visible = !secret.visible;
    };

    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible: boolean }>;
      console.log('Visibility changed:', customEvent.detail.visible);
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <button @click=${handleToggle} style="width: fit-content;">Toggle Visibility</button>
        <forge-secret no-label style="width: fit-content;" @forge-secret-change=${handleChange}>Programmable secret content</forge-secret>
      </div>
    `;
  }
};
