import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/secret';
import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/icon';
import '@tylertech/forge/state-layer';
import '@tylertech/forge/tooltip';

const component = 'forge-secret';

const meta = {
  title: 'Components/Secret',
  render: args => {
    const el = customElementStoryRenderer(component, args);

    // Handle label slot
    if (args.label) {
      const labelEl = document.createElement('span');
      labelEl.setAttribute('slot', 'label');
      labelEl.textContent = args.label;
      el.appendChild(labelEl);
    }

    // Handle custom icons
    if (args.customIcons) {
      const hiddenIcon = document.createElement('span');
      hiddenIcon.setAttribute('slot', 'hidden-icon');
      hiddenIcon.textContent = '🔒';
      el.appendChild(hiddenIcon);

      const visibleIcon = document.createElement('span');
      visibleIcon.setAttribute('slot', 'visible-icon');
      visibleIcon.textContent = '🔓';
      el.appendChild(visibleIcon);
    }

    // Set text content
    el.appendChild(document.createTextNode(args.text || 'Secret content'));

    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        visible: { control: 'boolean' },
        variant: { control: 'select', options: ['blur', 'dots'] },
        showOnHover: { control: 'boolean' },
        icon: { control: 'boolean' },
        name: { control: 'text' }
      },
      exclude: ['customIcons', 'label', 'text']
    }),
    text: { control: 'text', description: 'The secret text content' },
    label: { control: 'text', description: 'Optional label text (label slot)' },
    customIcons: { control: 'boolean', description: 'Use custom icons via slots' }
  },
  args: {
    visible: false,
    variant: 'blur',
    showOnHover: false,
    icon: false,
    name: '',
    text: 'Secret content',
    label: '',
    customIcons: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  args: {
    text: 'This is secret content',
    icon: true
  }
};

export const BlurVariant: Story = {
  args: {
    text: 'This content is blurred when hidden',
    variant: 'blur',
    icon: true
  }
};

export const DotsVariant: Story = {
  args: {
    text: 'This content is replaced by dots when hidden',
    variant: 'dots',
    icon: true
  }
};

export const WithLabel: Story = {
  args: {
    label: 'Password: ',
    text: 'my_secret_password',
    icon: true
  }
};

export const ShowOnHover: Story = {
  args: {
    text: 'Hover over me to reveal',
    showOnHover: true,
    icon: true
  }
};

export const CustomIcons: Story = {
  args: {
    text: 'Secret with custom icons',
    icon: true,
    customIcons: true
  }
};

export const NoIcon: Story = {
  args: {
    text: 'Secret without visible icon',
    icon: false
  }
};

export const ProgrammaticControl: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const secret = document.createElement('forge-secret');
    secret.setAttribute('icon', '');
    secret.textContent = 'Programmable secret content';

    const button = document.createElement('button');
    button.textContent = 'Toggle Visibility';
    button.style.width = 'fit-content';
    button.onclick = () => {
      (secret as any).visible = !(secret as any).visible;
    };

    container.appendChild(button);
    container.appendChild(secret);

    return container;
  }
};

export const RadioGroup: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '12px';
    container.innerHTML = `
      <p>Click on any secret to reveal it. Only one can be visible at a time:</p>
      <div>
        <strong>Username:</strong>
        <forge-secret name="credentials" icon>john_doe</forge-secret>
      </div>
      <div>
        <strong>Password:</strong>
        <forge-secret name="credentials" icon>my_secret_password</forge-secret>
      </div>
      <div>
        <strong>API Key:</strong>
        <forge-secret name="credentials" icon>sk_test_1234567890abcdef</forge-secret>
      </div>
    `;
    return container;
  }
};

export const InlineUsage: Story = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <p>
        The user's email is
        <forge-secret icon>user@example.com</forge-secret>
        and their phone number is
        <forge-secret icon variant="dots">555-1234</forge-secret>.
      </p>
    `;
    return container;
  }
};

export const LongContent: Story = {
  args: {
    text: 'This is a much longer secret that contains sensitive information which should be carefully protected and only revealed when the user explicitly requests it.',
    variant: 'blur',
    icon: true
  }
};

export const MultipleVariants: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.innerHTML = `
      <div>
        <strong>Blur variant:</strong>
        <forge-secret variant="blur" icon>secret_blur</forge-secret>
      </div>
      <div>
        <strong>Dots variant:</strong>
        <forge-secret variant="dots" icon>secret_dots</forge-secret>
      </div>
      <div>
        <strong>Hover reveal (blur):</strong>
        <forge-secret variant="blur" show-on-hover icon>hover_me_blur</forge-secret>
      </div>
      <div>
        <strong>Hover reveal (dots):</strong>
        <forge-secret variant="dots" show-on-hover icon>hover_me_dots</forge-secret>
      </div>
    `;
    return container;
  }
};
