import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import type { IPaginatorComponent } from '@tylertech/forge/paginator';

import '@tylertech/forge/paginator';

const component = 'forge-paginator';

const changeAction = action('forge-paginator-change');

const meta = {
  title: 'Components/Paginator',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.addEventListener('forge-paginator-change', changeAction);
    return el;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['rangeLabelCallback'],
      controls: {
        pageSizeOptions: { control: 'object' }
      }
    })
  },
  args: {
    pageIndex: 0,
    pageSize: 25,
    pageSizeOptions: [5, 15, 25, 50, 100],
    offset: 0,
    total: 100,
    label: 'Rows per page:',
    firstLast: false,
    first: false,
    disabled: false,
    alternative: false
  }
} satisfies Meta<Partial<IPaginatorComponent>>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Alternative: Story = {
  ...standaloneStoryParams,
  args: {
    pageSize: 1,
    pageSizeOptions: [1],
    total: 10,
    alternative: true
  }
};
