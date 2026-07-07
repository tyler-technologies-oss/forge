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

    it('should expose root part', async () => {
      const screen = render(html`<forge-timeline></forge-timeline>`);
      const el = screen.container.querySelector('forge-timeline') as TimelineComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('[part="root"]');

      expect(root).toBeTruthy();
    });
  });

  describe('timeline item', () => {
    describe('instantiation', () => {
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
        const sidebar = el.shadowRoot?.querySelector('.sidebar');
        const marker = el.shadowRoot?.querySelector('.marker');
        const summary = el.shadowRoot?.querySelector('.summary');
        const detail = el.shadowRoot?.querySelector('.detail');

        expect(root).toBeTruthy();
        expect(sidebar).toBeTruthy();
        expect(marker).toBeTruthy();
        expect(summary).toBeTruthy();
        expect(detail).toBeTruthy();
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
    });

    describe('marker slot', () => {
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
    });

    describe('content slots', () => {
      it('should render default slot content in center', async () => {
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

      it('should render start slot content', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item>
              <span slot="start" id="start-content">Start</span>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        const startContent = el.querySelector('#start-content');

        expect(startContent).toBeTruthy();
        expect(startContent?.textContent).toBe('Start');
      });

      it('should render end slot content', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item>
              <span slot="end" id="end-content">End</span>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        const endContent = el.querySelector('#end-content');

        expect(endContent).toBeTruthy();
        expect(endContent?.textContent).toBe('End');
      });

      it('should render detail slot content', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item>
              <span>Summary</span>
              <div slot="detail" id="detail-content">Detail content</div>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        const detailContent = el.querySelector('#detail-content');

        expect(detailContent).toBeTruthy();
        expect(detailContent?.textContent).toBe('Detail content');
      });

      it('should render all slots together', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item>
              <span slot="start">Start</span>
              <span>Center</span>
              <span slot="end">End</span>
              <div slot="detail">Detail</div>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        expect(el.querySelector('[slot="start"]')?.textContent).toBe('Start');
        expect(el.querySelector(':not([slot])')?.textContent).toBe('Center');
        expect(el.querySelector('[slot="end"]')?.textContent).toBe('End');
        expect(el.querySelector('[slot="detail"]')?.textContent).toBe('Detail');
      });
    });

    describe('theme property', () => {
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

    describe('sidebar property', () => {
      it('should have default sidebar value as auto', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        expect(el.sidebar).toBe('auto');
      });

      it('should apply sidebar property', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item sidebar="start"></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        expect(el.sidebar).toBe('start');
      });

      it('should apply sidebar class when sidebar is set', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item sidebar="both"></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const marker = el.shadowRoot?.querySelector('.marker');

        expect(marker?.classList.contains('sidebar-both')).toBe(true);
      });

      it('should update sidebar dynamically', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item sidebar="auto"></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        el.sidebar = 'none';
        await el.updateComplete;

        const marker = el.shadowRoot?.querySelector('.marker');
        expect(marker?.classList.contains('sidebar-none')).toBe(true);
      });

      it('should support all sidebar variants', async () => {
        const variants = ['auto', 'start', 'end', 'both', 'none'];

        for (const variant of variants) {
          const screen = render(html`
            <forge-timeline>
              <forge-timeline-item sidebar=${variant}></forge-timeline-item>
            </forge-timeline>
          `);
          const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
          await el.updateComplete;
          const marker = el.shadowRoot?.querySelector('.marker');

          expect(marker?.classList.contains(`sidebar-${variant}`)).toBe(true);
          screen.unmount();
        }
      });
    });

    describe('detailVariant property', () => {
      it('should have default detailVariant as default', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        expect(el.detailVariant).toBe('default');
      });

      it('should apply detailVariant property', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item detail-variant="card"></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        expect(el.detailVariant).toBe('card');
      });

      it('should apply card class when detailVariant is card', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item detail-variant="card">
              <span>Summary</span>
              <div slot="detail">Detail</div>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const detail = el.shadowRoot?.querySelector('.detail');

        expect(detail?.classList.contains('card')).toBe(true);
      });

      it('should not apply card class when detailVariant is default', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item>
              <span>Summary</span>
              <div slot="detail">Detail</div>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const detail = el.shadowRoot?.querySelector('.detail');

        expect(detail?.classList.contains('card')).toBe(false);
      });

      it('should update detailVariant dynamically', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item>
              <span>Summary</span>
              <div slot="detail">Detail</div>
            </forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;

        el.detailVariant = 'card';
        await el.updateComplete;

        const detail = el.shadowRoot?.querySelector('.detail');
        expect(detail?.classList.contains('card')).toBe(true);
      });
    });

    describe('CSS parts', () => {
      it('should expose root part', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const root = el.shadowRoot?.querySelector('[part="root"]');

        expect(root).toBeTruthy();
      });

      it('should expose marker part', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const marker = el.shadowRoot?.querySelector('[part="marker"]');

        expect(marker).toBeTruthy();
      });

      it('should expose default-marker part', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const defaultMarker = el.shadowRoot?.querySelector('[part="default-marker"]');

        expect(defaultMarker).toBeTruthy();
      });

      it('should expose summary part', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const summary = el.shadowRoot?.querySelector('[part="summary"]');

        expect(summary).toBeTruthy();
      });

      it('should expose detail part', async () => {
        const screen = render(html`
          <forge-timeline>
            <forge-timeline-item></forge-timeline-item>
          </forge-timeline>
        `);
        const el = screen.container.querySelector('forge-timeline-item') as TimelineItemComponent;
        await el.updateComplete;
        const detail = el.shadowRoot?.querySelector('[part="detail"]');

        expect(detail).toBeTruthy();
      });
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

    it('should expose root part', async () => {
      const screen = render(html`<forge-timeline-break></forge-timeline-break>`);
      const el = screen.container.querySelector('forge-timeline-break') as TimelineBreakComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('[part="root"]');

      expect(root).toBeTruthy();
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
