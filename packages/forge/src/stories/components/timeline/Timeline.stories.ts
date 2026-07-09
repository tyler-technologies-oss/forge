import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import '@tylertech/forge/badge';
import '@tylertech/forge/card';
import '@tylertech/forge/icon';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/timeline';
import '@tylertech/forge/timestamp';
import { tylIconCheckCircle, tylIconError, tylIconSchedule, tylIconStar } from '@tylertech/tyler-icons';
import { html } from 'lit';
import { applyArgs, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils.js';

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
    ['Timeline Break']: 'forge-timeline-break',
    ['Timestamp']: 'forge-timestamp'
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
      <forge-timeline-item>
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <span>Feature deployment completed successfully</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <span>Scheduled maintenance at 3:00 PM</span>
      </forge-timeline-item>
      <forge-timeline-item>
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
        <span>Feature Added</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <forge-badge slot="marker" theme="error">Error</forge-badge>
        <span>Build Failed</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <forge-badge slot="marker" theme="success">Done</forge-badge>
        <span>Tests Passed</span>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const WithBreak: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item>
        <span>Recent Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Code Review</span>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <span>Previous Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Initial Commit</span>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const SidebarOptions: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item>
        <span>Auto sidebars</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="none">
        <span>No sidebars</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="start">
        <span>Start sidebar</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="end">
        <span>End sidebar</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="both">
        <span>Both sidebars</span>
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

export const WithDetail: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item theme="success">
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <strong>Deployment Successful</strong>
        <forge-card slot="detail">
          <div>Version 2.0.0 has been successfully deployed to production. All services are running normally and health checks are passing.</div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <forge-badge>Production</forge-badge>
            <forge-badge theme="success">v2.0.0</forge-badge>
          </div>
        </forge-card>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <strong>Maintenance Scheduled</strong>
        <div slot="detail">Database migration scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.</div>
      </forge-timeline-item>
      <forge-timeline-item>
        <strong>Code Review Completed</strong>
        <div slot="detail">Pull request #456 has been reviewed and approved by 3 team members.</div>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const WithTimestamps: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timestamp datetime="2024-03-15"></forge-timestamp>
      <forge-timeline-item>
        <span>Timestamp after</span>
        <forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm" separator="start"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-timestamp datetime="2024-03-15T12:15:00" format="HH:mm" separator="end"></forge-timestamp>
        <span>Timestamp before</span>
      </forge-timeline-item>
      <forge-timestamp datetime="2024-03-14"></forge-timestamp>
      <forge-timeline-item>
        <span>No timestamp separator</span>
        <forge-timestamp datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Timestamp in detail</span>
        <div slot="detail">Posted at <forge-timestamp slot="detail" datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp></div>
      </forge-timeline-item>
    </forge-timeline>
  `
};
