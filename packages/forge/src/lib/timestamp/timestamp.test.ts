import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { TimestampComponent } from './timestamp.js';

import './timestamp.js';
import '../timeline/timeline/timeline.js';
import '../timeline/timeline-item/timeline-item.js';

describe('Timestamp', () => {
  describe('instantiation', () => {
    it('should instantiate', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      expect(el).toBeInstanceOf(TimestampComponent);
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should render time element in shadow root', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl).toBeTruthy();
      expect(timeEl?.tagName).toBe('TIME');
    });
  });

  describe('datetime property', () => {
    it('should have default datetime as empty string', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      expect(el.datetime).toBe('');
    });

    it('should accept Date object and format correctly', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(testDate);
      expect(timeEl?.textContent).toBe('05/15/2024');
    });

    it('should accept ISO string and format correctly', async () => {
      const isoString = '2024-05-15T12:00:00';
      const screen = render(html`<forge-timestamp datetime=${isoString}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(isoString);
      expect(timeEl?.textContent).toBe('05/15/2024');
    });

    it('should parse ISO date string without timezone as local time', async () => {
      const isoDateOnly = '2024-05-15';
      const screen = render(html`<forge-timestamp datetime=${isoDateOnly}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(isoDateOnly);
      expect(timeEl?.textContent).toBe('05/15/2024');
    });

    it('should parse ISO datetime string without timezone as local time', async () => {
      const isoDateTime = '2024-05-15T14:30:45';
      const screen = render(html`<forge-timestamp datetime=${isoDateTime} format="MM/dd/yyyy HH:mm"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(isoDateTime);
      expect(timeEl?.textContent).toBe('05/15/2024 14:30');
    });

    it('should parse ISO datetime with milliseconds without timezone as local time', async () => {
      const isoDateTime = '2024-05-15T14:30:45.123';
      const screen = render(html`<forge-timestamp datetime=${isoDateTime}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(isoDateTime);
      expect(timeEl?.textContent).toBe('05/15/2024');
    });

    it('should respect explicit timezone in ISO string', async () => {
      const isoWithTimezone = '2024-05-15T12:00:00Z';
      const screen = render(html`<forge-timestamp datetime=${isoWithTimezone}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(isoWithTimezone);
      expect(timeEl?.textContent).toBeTruthy();
    });

    it('should respect timezone offset in ISO string', async () => {
      const isoWithOffset = '2024-05-15T12:00:00-05:00';
      const screen = render(html`<forge-timestamp datetime=${isoWithOffset}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.datetime).toBe(isoWithOffset);
      expect(timeEl?.textContent).toBeTruthy();
    });

    it('should render empty when datetime is empty string', async () => {
      const screen = render(html`<forge-timestamp .datetime=${''}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('');
      expect(timeEl?.hasAttribute('datetime')).toBe(false);
    });

    it('should update datetime dynamically', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      el.datetime = new Date(2024, 4, 15);
      await el.updateComplete;

      const timeEl = el.shadowRoot?.querySelector('time');
      expect(timeEl?.textContent).toBe('05/15/2024');
    });

    it('should handle invalid date string gracefully', async () => {
      const screen = render(html`<forge-timestamp datetime="invalid-date"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('invalid-date');
      expect(timeEl?.getAttribute('datetime')).toBe('invalid-date');
    });

    it('should handle Date object that creates invalid date', async () => {
      const invalidDate = new Date('not a date');
      const screen = render(html`<forge-timestamp .datetime=${invalidDate}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toContain('Invalid Date');
    });
  });

  describe('format property', () => {
    it('should have default format as MM/dd/yyyy', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      expect(el.format).toBe('MM/dd/yyyy');
    });

    it('should format with yyyy-MM-dd', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate} format="yyyy-MM-dd"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('2024-05-15');
    });

    it('should format with dd/MMM/yyyy', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate} format="dd/MMM/yyyy"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('15/May/2024');
    });

    it('should format with dd.MM.yyyy', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate} format="dd.MM.yyyy"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('15.05.2024');
    });

    it('should update format dynamically', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;

      el.format = 'yyyy-MM-dd';
      await el.updateComplete;

      const timeEl = el.shadowRoot?.querySelector('time');
      expect(timeEl?.textContent).toBe('2024-05-15');
    });
  });

  describe('datetime attribute', () => {
    it('should have valid ISO string in datetime attribute', async () => {
      const testDate = new Date(2024, 4, 15, 14, 30, 0);
      const screen = render(html`<forge-timestamp .datetime=${testDate}></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.hasAttribute('datetime')).toBe(true);
      expect(timeEl?.getAttribute('datetime')).toContain('2024-05-15');
    });

    it('should not have datetime attribute when datetime is empty', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.hasAttribute('datetime')).toBe(false);
    });

    it('should preserve invalid date strings in datetime attribute', async () => {
      const screen = render(html`<forge-timestamp datetime="some text"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.getAttribute('datetime')).toBe('some text');
    });
  });

  describe('CSS parts', () => {
    it('should expose root part', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const root = el.shadowRoot?.querySelector('[part="root"]');

      expect(root).toBeTruthy();
      expect(root?.tagName).toBe('TIME');
    });
  });

  describe('locale property', () => {
    it('should have default locale from navigator', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      expect(el.locale).toBe(navigator.language);
    });

    it('should use custom locale', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate} locale="de-DE" format="dd MMMM yyyy"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(el.locale).toBe('de-DE');
      expect(timeEl?.textContent).toContain('Mai');
    });

    it('should update locale dynamically', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`<forge-timestamp .datetime=${testDate} format="MMMM"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;

      el.locale = 'fr-FR';
      await el.updateComplete;

      const timeEl = el.shadowRoot?.querySelector('time');
      expect(timeEl?.textContent).toBe('mai');
    });
  });

  describe('role assignment', () => {
    it('should have listitem role when inside timeline', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timestamp datetime="2024-05-15"></forge-timestamp>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;

      expect(el.getAttribute('role')).toBe('listitem');
    });

    it('should have listitem role when inside timeline-item', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <forge-timestamp slot="end" datetime="2024-05-15"></forge-timestamp>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;

      expect(el.getAttribute('role')).toBe('listitem');
    });

    it('should have presentation role when standalone', async () => {
      const screen = render(html`<forge-timestamp datetime="2024-05-15"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;

      expect(el.getAttribute('role')).toBe('presentation');
    });
  });

  describe('separator property', () => {
    it('should have default separator as none', async () => {
      const screen = render(html`<forge-timestamp></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      expect(el.separator).toBe('none');
    });

    it('should not apply separator class when separator is none', async () => {
      const screen = render(html`<forge-timestamp datetime="2024-05-15"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.classList.contains('separator-none')).toBe(false);
      expect(timeEl?.classList.contains('separator-start')).toBe(false);
      expect(timeEl?.classList.contains('separator-end')).toBe(false);
    });

    it('should apply separator-start class when separator is start', async () => {
      const screen = render(html`<forge-timestamp datetime="2024-05-15" separator="start"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.classList.contains('separator-start')).toBe(true);
      expect(timeEl?.classList.contains('separator-end')).toBe(false);
    });

    it('should apply separator-end class when separator is end', async () => {
      const screen = render(html`<forge-timestamp datetime="2024-05-15" separator="end"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.classList.contains('separator-end')).toBe(true);
      expect(timeEl?.classList.contains('separator-start')).toBe(false);
    });

    it('should update separator dynamically', async () => {
      const screen = render(html`<forge-timestamp datetime="2024-05-15"></forge-timestamp>`);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;

      el.separator = 'start';
      await el.updateComplete;

      const timeEl = el.shadowRoot?.querySelector('time');
      expect(timeEl?.classList.contains('separator-start')).toBe(true);

      el.separator = 'end';
      await el.updateComplete;

      expect(timeEl?.classList.contains('separator-end')).toBe(true);
      expect(timeEl?.classList.contains('separator-start')).toBe(false);

      el.separator = 'none';
      await el.updateComplete;

      expect(timeEl?.classList.contains('separator-end')).toBe(false);
      expect(timeEl?.classList.contains('separator-start')).toBe(false);
    });

    it('should support all separator positions', async () => {
      const positions: Array<'start' | 'end' | 'none'> = ['start', 'end', 'none'];

      for (const position of positions) {
        const screen = render(html`<forge-timestamp datetime="2024-05-15" separator=${position}></forge-timestamp>`);
        const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
        await el.updateComplete;
        const timeEl = el.shadowRoot?.querySelector('time');

        expect(el.separator).toBe(position);

        if (position !== 'none') {
          expect(timeEl?.classList.contains(`separator-${position}`)).toBe(true);
        } else {
          expect(timeEl?.classList.contains('separator-none')).toBe(false);
        }

        screen.unmount();
      }
    });

    it('should apply separator class when inside timeline', async () => {
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <forge-timestamp slot="end" datetime="2024-05-15" separator="start"></forge-timestamp>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.classList.contains('separator-start')).toBe(true);
      expect(el.getAttribute('role')).toBe('listitem');
    });
  });

  describe('integration', () => {
    it('should work inside timeline-item', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`
        <forge-timeline>
          <forge-timeline-item>
            <span>Event description</span>
            <forge-timestamp slot="end" .datetime=${testDate}></forge-timestamp>
          </forge-timeline-item>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('05/15/2024');
      expect(el.getAttribute('role')).toBe('listitem');
    });

    it('should work as direct child of timeline', async () => {
      const testDate = new Date(2024, 4, 15);
      const screen = render(html`
        <forge-timeline>
          <forge-timestamp .datetime=${testDate}></forge-timestamp>
        </forge-timeline>
      `);
      const el = screen.container.querySelector('forge-timestamp') as TimestampComponent;
      await el.updateComplete;
      const timeEl = el.shadowRoot?.querySelector('time');

      expect(timeEl?.textContent).toBe('05/15/2024');
      expect(el.getAttribute('role')).toBe('listitem');
    });
  });
});
