import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { IconRegistry, type IIconProperties } from '@tylertech/forge/icon';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

import '@tylertech/forge/icon';

const component = 'forge-icon';

IconRegistry.define(tylIconForgeLogo);

const meta = {
  title: 'Components/Icon',
  render: args => customElementStoryRenderer(component, { ...args, name: tylIconForgeLogo.name }),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: /theme|^--/i,
      controls: {
        theme: { control: 'select', options: [...GLOBAL_THEME_OPTIONS, 'text-medium', 'text-low'] }
      }
    })
  }
} satisfies Meta<IIconProperties>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CustomSVG: Story = {
  ...standaloneStoryParams,
  render: () =>
    customElementStoryRenderer(component, {
      '--forge-icon-size': '100px',
      src: '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 92 92"><defs><style>.cls-1{fill:none;}.cls-2,.cls-5{fill:#d0dbf4;}.cls-2{fill-rule:evenodd;}.cls-3,.cls-4{fill:#5cc5cd;}.cls-3,.cls-4,.cls-6,.cls-7{stroke:#586ab1;stroke-width:2px;}.cls-3,.cls-6{stroke-miterlimit:10;}.cls-4,.cls-7{stroke-linecap:round;stroke-linejoin:round;}.cls-6,.cls-7{fill:#fff;}</style></defs><title>artistry-spot</title><rect class="cls-1" x="0.09" y="0.05" width="92" height="92"/><path class="cls-2" d="M46.1,82a36,36,0,1,0-36-36A36,36,0,0,0,46.1,82Z"/><path class="cls-3" d="M85.36,35.34C85,32.61,83.07,26.41,77.77,29c-5.66,2.81-14,3.28-14,3.28l-1.36,0S53.5,32,48.12,29.61,41,33.37,40.64,36.12c-.58,4.73-.76,30,20.14,33.54a14.62,14.62,0,0,0,5.44.09C87.08,65.84,86,40.06,85.36,35.34Zm-39.09,8.1c0-3.47,3.18-6.27,7.1-6.26s7.1,2.81,7.09,6.27-3.55.67-7.47.66S46.26,46.9,46.27,43.44Zm16.9,8c6.46.09,11.64,4.27,11.57,9.34-.09,1.3-5.2-2.89-11.66-3s-11.83,4.46-11.73,2.66C51.42,55.38,56.71,51.34,63.17,51.44Zm9.23-8c-3.92,0-6.73,2.78-6.72-.68s3.18-6.26,7.1-6.26,7.1,2.82,7.09,6.28S76.32,43.45,72.4,43.45Z"/><path class="cls-4" d="M59.22,48.8s-1.51,2-1,2.64,4.56,1.61,4.56,1.61a3.57,3.57,0,0,0,1.91-.23s3.15-1.38,3.7-2.07-.92-2.53-.92-2.53"/><path class="cls-5" d="M35.34,49.33l5.89-2.7A2.67,2.67,0,0,1,42,49.9c-1,1.82-5.05,5.27-5.05,5.27Z"/><path class="cls-5" d="M36.08,29.79c1.66.29,8.89.77,9.92,3.61s0,4.57-1.84,4.07S36,35.87,36,35.87Z"/><path class="cls-6" d="M52.14,28.59c-.36-2.81-2.24-9.17-7.69-6.54-5.82,2.8-14.39,3.18-14.39,3.18l-1.39,0s-9.07-.35-14.53-2.9-7.35,3.76-7.73,6.57c-.65,4.83-1.13,30.67,20.2,34.52a14.74,14.74,0,0,0,5.56.15C53.55,59.79,52.77,33.41,52.14,28.59ZM12.08,36.4c0-3.53,3.32-6.36,7.33-6.31s7.22,3,7.18,6.5-3.64.63-7.65.58S12,39.94,12.08,36.4ZM29.52,57.27c-7,0-12.77-4.4-12.8-9.92.07-1.42,5.72,3,12.76,3S42.27,45.23,42.2,47.2C42.23,52.72,36.55,57.23,29.52,57.27Zm9.27-20.55c-4,0-6.91,2.77-6.86-.77s3.33-6.37,7.33-6.32,7.23,3,7.18,6.5S42.8,36.77,38.79,36.72Z"/><path class="cls-7" d="M25.26,42s-1.57,2-1,2.68,4.65,1.7,4.65,1.7a3.63,3.63,0,0,0,1.95-.21s3.24-1.38,3.81-2.07-.91-2.6-.91-2.6"/></svg>'
    } as any)
};

export const External: Story = {
  ...standaloneStoryParams,
  render: () =>
    customElementStoryRenderer(component, {
      external: true,
      externalType: 'custom',
      name: 'action_launcher'
    })
};

export const Lazy: Story = {
  ...standaloneStoryParams,
  render: () =>
    customElementStoryRenderer(component, {
      lazy: true,
      name: tylIconForgeLogo.name
    })
};
