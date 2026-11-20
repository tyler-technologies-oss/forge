import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { action } from 'storybook/actions';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/icon';
import { tylIconBarChart, tylIconTable } from '@tylertech/tyler-icons';

import '@tylertech/forge-ai/ai-artifact-card';
import '@tylertech/forge-ai/ai-artifact-card-group';

IconRegistry.define([tylIconBarChart, tylIconTable]);

const component = 'forge-ai-artifact-card-group';

const storyStyles = html`<style>
  .artifact-card-group-story {
    max-inline-size: 480px;
  }
</style>`;

const results = [
  {
    title: 'Traffic collisions by intersection',
    subtitle: 'Table · 2024 Collision Records · 1,284 rows',
    icon: 'table'
  },
  { title: 'Collisions by month', subtitle: 'Chart · 2024 Collision Records', icon: 'bar_chart' },
  { title: 'Injury collisions near schools', subtitle: 'Table · 2024 Collision Records · 212 rows', icon: 'table' },
  { title: 'Q4 collision summary', subtitle: 'Report · 4 charts', icon: 'bar_chart' },
  { title: 'Pedestrian collisions by district', subtitle: 'Table · 2024 Collision Records · 96 rows', icon: 'table' },
  { title: 'Collisions by weather condition', subtitle: 'Chart · 2024 Collision Records', icon: 'bar_chart' }
];

function renderCards(count: number, activeIndex = -1): TemplateResult[] {
  return results.slice(0, count).map(
    (result, index) => html`
      <forge-ai-artifact-card
        title-text=${result.title}
        subtitle-text=${result.subtitle}
        asset-id="result-${index + 1}"
        ?active=${index === activeIndex}
        @forge-ai-artifact-card-open=${action('forge-ai-artifact-card-open')}>
        <forge-icon slot="icon" name=${result.icon}></forge-icon>
      </forge-ai-artifact-card>
    `
  );
}

const meta = {
  title: 'Components/Artifacts/Artifact Card Group',
  render: args => html`
    ${storyStyles}
    <forge-ai-artifact-card-group
      class="artifact-card-group-story"
      visible-count=${args.visibleCount}
      ?expanded=${args.expanded}
      show-more-text=${args.showMoreText}
      show-less-text=${args.showLessText}
      @forge-ai-artifact-card-group-toggle=${action('forge-ai-artifact-card-group-toggle')}>
      ${renderCards(args.cardCount)}
    </forge-ai-artifact-card-group>
  `,
  component,
  argTypes: {
    cardCount: {
      control: { type: 'range', min: 1, max: results.length },
      description: 'Story only: how many cards to render'
    },
    visibleCount: {
      control: { type: 'number', min: 1 },
      description: 'How many cards show while the list is collapsed'
    },
    expanded: {
      control: 'boolean',
      description: 'Whether every card is showing'
    },
    showMoreText: {
      control: 'text',
      description: 'Label of the toggle while collapsed. `{count}` is replaced with the number of hidden cards'
    },
    showLessText: {
      control: 'text',
      description: 'Label of the toggle while expanded'
    }
  },
  args: {
    cardCount: 6,
    visibleCount: 3,
    expanded: false,
    showMoreText: '{count} more',
    showLessText: 'Show less'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const FitsWithoutToggle: Story = {
  args: {
    cardCount: 3
  }
};

export const Expanded: Story = {
  args: {
    expanded: true
  }
};

export const ActiveRow: Story = {
  render: () => html`${storyStyles}<forge-ai-artifact-card-group class="artifact-card-group-story">${renderCards(3, 1)}</forge-ai-artifact-card-group> `
};
