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
  render: args => {
    const timeline = document.createElement('forge-timeline');
    applyArgs(timeline, args);

    const events = [
      { content: 'Project kickoff meeting completed', timestamp: '9:00 AM' },
      { content: 'Initial design mockups reviewed', timestamp: '10:30 AM' },
      { content: 'API endpoints finalized', timestamp: '2:00 PM' },
      { content: 'Code review session', timestamp: '4:30 PM' }
    ];

    events.forEach(event => {
      const item = document.createElement('forge-timeline-item');
      item.textContent = event.content;

      const timestamp = document.createElement('span');
      timestamp.textContent = event.timestamp;
      timestamp.slot = 'timestamp';
      item.appendChild(timestamp);

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
        <div>
          <strong>Feature Added</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">User authentication system implemented</div>
        </div>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <forge-badge slot="marker" theme="error">Error</forge-badge>
        <div>
          <strong>Build Failed</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Compilation error in main.ts line 42</div>
        </div>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <forge-badge slot="marker" theme="success">Done</forge-badge>
        <div>
          <strong>Tests Passed</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">All 127 tests completed successfully</div>
        </div>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const WithBreak: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item>
        <div>
          <strong>Recent Activity</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Updated documentation</div>
        </div>
        <span slot="timestamp">Today 9:30 AM</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <div>
          <strong>Code Review</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Reviewed PR #123</div>
        </div>
        <span slot="timestamp">Today 8:00 AM</span>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <div>
          <strong>Previous Activity</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Fixed bug in user service</div>
        </div>
        <span slot="timestamp">Yesterday</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <div>
          <strong>Initial Commit</strong>
          <div style="color: var(--forge-theme-text-medium); margin-top: 4px;">Set up project structure</div>
        </div>
        <span slot="timestamp">Last week</span>
      </forge-timeline-item>
    </forge-timeline>
  `
};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-timeline>
      <forge-timeline-item theme="primary">
        <span>Primary themed event</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <span>Success themed event</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <span>Warning themed event</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <span>Error themed event</span>
      </forge-timeline-item>
      <forge-timeline-item theme="info">
        <span>Info themed event</span>
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
        <div>
          <div style="font-weight: 500; margin-bottom: 8px;">Deployment Successful</div>
          <div style="color: var(--forge-theme-text-medium); font-size: 0.875rem; line-height: 1.5;">
            Version 2.0.0 has been successfully deployed to production. All services are running normally and health checks are passing.
          </div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <forge-badge>Production</forge-badge>
            <forge-badge theme="success">v2.0.0</forge-badge>
          </div>
        </div>
        <span slot="timestamp" style="white-space: nowrap;">2 hours ago</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <div>
          <div style="font-weight: 500; margin-bottom: 8px;">Maintenance Scheduled</div>
          <div style="color: var(--forge-theme-text-medium); font-size: 0.875rem; line-height: 1.5;">
            Database migration scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.
          </div>
        </div>
        <span slot="timestamp" style="white-space: nowrap;">1 day ago</span>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <div>
          <div style="font-weight: 500; margin-bottom: 8px;">Code Review Completed</div>
          <div style="color: var(--forge-theme-text-medium); font-size: 0.875rem;">Pull request #456 has been reviewed and approved by 3 team members.</div>
        </div>
        <span slot="timestamp" style="white-space: nowrap;">3 days ago</span>
      </forge-timeline-item>
    </forge-timeline>
  `
};
