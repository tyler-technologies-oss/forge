import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { applyArgs, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';
import { html } from 'lit';

import '@tylertech/forge/timeline';
import '@tylertech/forge/icon';
import '@tylertech/forge/badge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconCheckCircle, tylIconSchedule, tylIconStar, tylIconError } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconCheckCircle, tylIconSchedule, tylIconStar, tylIconError]);

const component = 'forge-timeline';

const meta = {
  title: 'Components/Timeline',
  tags: ['new'],
  render: args => {
    const timeline = document.createElement('forge-timeline');
    applyArgs(timeline, args);

    const events = [
      { content: 'Project kickoff meeting completed' },
      { content: 'Initial design mockups reviewed' },
      { content: 'API endpoints finalized' },
      { content: 'Code review session' }
    ];

    events.forEach(event => {
      const item = document.createElement('forge-timeline-item');
      item.textContent = event.content;
      timeline.appendChild(item);
    });

    return timeline;
  },
  component,
  subcomponents: {
    ['Timeline Item']: 'forge-timeline-item',
    ['Timeline Break']: 'forge-timeline-break'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithIcons: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item theme="success">
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <span>Feature deployment completed successfully</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <span>Scheduled maintenance at 3:00 PM</span>
      </forge-timeline-item>
      <forge-timeline-item theme="primary">
        <forge-icon slot="marker" name="star"></forge-icon>
        <span>Product launch</span>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const WithBadges: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item>
        <forge-badge slot="marker">New</forge-badge>
        <strong>Feature Added</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">User authentication system implemented</div>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <forge-badge slot="marker" theme="error">Error</forge-badge>
        <strong>Build Failed</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Compilation error in main.ts line 42</div>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <forge-badge slot="marker" theme="success">Done</forge-badge>
        <strong>Tests Passed</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">All 127 tests completed successfully</div>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const WithBreak: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item>
        <strong>Recent Activity</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Updated documentation</div>
      </forge-timeline-item>
      <forge-timeline-item>
        <strong>Code Review</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Reviewed PR #123</div>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <strong>Previous Activity</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Fixed bug in user service</div>
      </forge-timeline-item>
      <forge-timeline-item>
        <strong>Initial Commit</strong>
        <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Set up project structure</div>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item theme="primary">
        <span>Primary</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <span>Success</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <span>Warning</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <span>Error</span>
      </forge-timeline-item>
      <forge-timeline-item theme="info">
        <span>Info</span>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const RichContent: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item theme="success">
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <div style="font-weight: 500; margin-bottom: 8px;">Deployment Successful</div>
        <div style="color: var(--forge-theme-text-medium); font-size: 0.875rem; line-height: 1.5;">
          Version 2.0.0 has been successfully deployed to production. All services are running normally and health checks are passing.
        </div>
        <div style="margin-top: 8px; display: flex; gap: 8px;">
          <forge-badge>Production</forge-badge>
          <forge-badge theme="success">v2.0.0</forge-badge>
        </div>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <div style="font-weight: 500; margin-bottom: 8px;">Maintenance Scheduled</div>
        <div style="color: var(--forge-theme-text-medium); font-size: 0.875rem; line-height: 1.5;">
          Database migration scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.
        </div>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <div style="font-weight: 500; margin-bottom: 8px;">Code Review Completed</div>
        <div style="color: var(--forge-theme-text-medium); font-size: 0.875rem;">Pull request #456 has been reviewed and approved by 3 team members.</div>
      </forge-timeline-item>
    </forge-timeline>
  `
};
