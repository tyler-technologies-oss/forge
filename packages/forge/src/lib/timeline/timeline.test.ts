import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { TimelineComponent } from './timeline/timeline.js';
import { TimelineItemComponent } from './timeline-item/timeline-item.js';
import { TimelineBreakComponent } from './timeline-break/timeline-break.js';

import './timeline/timeline.js';
import './timeline-item/timeline-item.js';
import './timeline-break/timeline-break.js';

describe('Timeline', () => {
  describe('timeline container', () => {
    it('should instantiate', async () => {
      const screen = render(html`<forge-timeline></forge-timeline>`);
      const el = screen.container.querySelector('forge-timeline') as TimelineComponent;

      expect(el).toBeInstanceOf(TimelineComponent);
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should render with correct structure', async () => {
      const screen = render(html`<forge-timeline></forge-timeline>`);
      const el = screen.container.querySelector('forge-timeline') as TimelineComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('.forge-timeline');

      expect(root).toBeTruthy();
      expect(root?.tagName).toBe('DIV');
    });

    it('should have list role', async () => {
      const screen = render(html`<forge-timeline></forge-timeline>`);
      const el = screen.container.querySelector('forge-timeline') as TimelineComponent;

      expect(el.getAttribute('role')).toBe('list');
    });

    it('should render slotted content', async () => {
      const screen = render(html`
        <forge-timeline>
          <div id="test-content">Test content</div>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline') as TimelineComponent;
      const slottedContent = el.querySelector('#test-content');

      expect(slottedContent).toBeTruthy();
      expect(slottedContent?.textContent).toBe('Test content');
    });
  });

  describe('timeline item', () => {
    it('should instantiate', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

      expect(el).toBeInstanceOf(TimelineItemComponent);
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should render with correct structure', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('.forge-timeline-item');
      const marker = el.shadowRoot?.querySelector('.marker');
      const content = el.shadowRoot?.querySelector('.content');

      expect(root).toBeTruthy();
      expect(marker).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it('should have listitem role', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

      expect(el.getAttribute('role')).toBe('listitem');
    });

    it('should render default marker when no marker slot provided', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
      await el.updateComplete;
      const defaultMarker = el.shadowRoot?.querySelector('.default-marker');

      expect(defaultMarker).toBeTruthy();
    });

    it('should render slotted content', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <span id="test-content">Test content</span>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
      const slottedContent = el.querySelector('#test-content');

      expect(slottedContent).toBeTruthy();
      expect(slottedContent?.textContent).toBe('Test content');
    });

    it('should render slotted marker', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <span slot="marker" id="custom-marker">✓</span>
            <span>Content</span>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
      const customMarker = el.querySelector('#custom-marker');

      expect(customMarker).toBeTruthy();
      expect(customMarker?.textContent).toBe('✓');
    });

    it('should have default theme as empty string', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

      expect(el.theme).toBe('');
    });

    it('should apply theme property', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item theme="primary"></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

      expect(el.theme).toBe('primary');
    });

    it('should apply theme class when theme is set', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item theme="success"></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('.forge-timeline-item');

      expect(root?.classList.contains('success')).toBe(true);
    });

    it('should not apply theme class when theme is empty', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('.forge-timeline-item');

      expect(root?.classList.contains('primary')).toBe(false);
      expect(root?.classList.contains('success')).toBe(false);
    });

    it('should update theme dynamically', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item></forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

      el.theme = 'error';
      await el.updateComplete;

      const root = el.shadowRoot?.querySelector('.forge-timeline-item');
      expect(root?.classList.contains('error')).toBe(true);
    });

    it('should support all theme variants', async () => {
      const themes = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];

      for (const theme of themes) {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item theme=${theme}></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const root = el.shadowRoot?.querySelector('.forge-timeline-item');

        expect(root?.classList.contains(theme)).toBe(true);
        screen.unmount();
      }
    });
  });

  describe('timeline break', () => {
    it('should instantiate', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;

      expect(el).toBeInstanceOf(TimelineBreakComponent);
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should render with correct structure', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('.forge-timeline-break');

      expect(root).toBeTruthy();
      expect(root?.tagName).toBe('DIV');
    });

    it('should have aria-hidden attribute', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;

      expect(el.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not have semantic role', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;

      expect(el.getAttribute('role')).toBeNull();
    });

    it('should render without slots', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;
      const slots = el.shadowRoot?.querySelectorAll('slot');

      expect(slots?.length).toBe(0);
    });
  });

  describe('accessibility', () => {
    it('should be accessible with timeline only', async () => {
      const screen = render(html`<forge-timeline></forge-timeline>`);
      const el = screen.container.querySelector('forge-timeline') as TimelineComponent;

      await expect(el).toBeAccessible();
    });

    it('should be accessible with timeline items', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>Item 1</forge-timeline-item>
          <forge-timeline-item>Item 2</forge-timeline-item>
        </forge-timeline>
      `);
      const timeline = screen.container.querySelector('forge-timeline');

      await expect(timeline).toBeAccessible();
    });

    it('should be accessible with content', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <span>Event description</span>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const timeline = screen.container.querySelector('forge-timeline');

      await expect(timeline).toBeAccessible();
    });

    it('should be accessible with custom marker', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <span slot="marker">✓</span>
            <span>Completed task</span>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const timeline = screen.container.querySelector('forge-timeline');

      await expect(timeline).toBeAccessible();
    });

    it('should be accessible with timeline break', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>Item 1</forge-timeline-item>
          <forge-timeline-break></forge-timeline-break>
          <forge-timeline-item>Item 2</forge-timeline-item>
        </forge-timeline>
      `);
      const timeline = screen.container.querySelector('forge-timeline');

      await expect(timeline).toBeAccessible();
    });

    it('should be accessible with break standalone', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;

      await expect(el).toBeAccessible();
    });
  });
});
