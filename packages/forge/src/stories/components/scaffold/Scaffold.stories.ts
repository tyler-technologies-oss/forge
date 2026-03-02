import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { storyStyles } from '../../decorators.js';

import '@tylertech/forge/scaffold';
import styles from './Scaffold.scss?inline';

const component = 'forge-scaffold';

const meta = {
  title: 'Components/Scaffold',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-scaffold class="scaffold-example" style=${style} .viewport=${args.viewport}>
        <div slot="left">left</div>
        <div slot="header">header</div>
        <div slot="body-header">body-header</div>
        <div slot="body-left">body-left</div>
        <div slot="body">body</div>
        <div slot="body-right">body-right</div>
        <div slot="body-footer">body-footer</div>
        <div slot="footer">footer</div>
        <div slot="right">right</div>
      </forge-scaffold>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  decorators: [storyStyles(styles)],
  argTypes: {
    ...generateCustomElementArgTypes({ tagName: component })
  },
  args: {
    viewport: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CSSOnly: Story = {
  render: ({ viewport, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'scaffold-example': true,
      'forge-scaffold': true,
      'forge-button--viewport': viewport
    };
    return html`
      <div class=${classMap(classes)} style=${style}>
        <div class="forge-scaffold__left">left</div>
        <div class="forge-scaffold__header">header</div>
        <div class="forge-scaffold__body">
          <div class="forge-scaffold">
            <div class="forge-scaffold__left">
              <div>Body Left</div>
            </div>
            <div class="forge-scaffold__right">
              <div>Body Right</div>
            </div>
            <div class="forge-scaffold__header">
              <div>Body Header</div>
            </div>
            <div class="forge-scaffold__body" tabindex="0">
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
              </div>
            </div>
            <div class="forge-scaffold__footer">
              <div>Body Footer</div>
            </div>
          </div>
        </div>
        <div class="forge-scaffold__footer">footer</div>
        <div class="forge-scaffold__right">right</div>
      </div>
    `;
  }
};
