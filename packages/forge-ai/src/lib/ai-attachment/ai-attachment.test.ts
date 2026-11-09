import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiAttachmentComponent, AiAttachmentComponentTagName, type ForgeAiAttachmentRemoveEventData } from './ai-attachment.js';

const TAG = 'forge-ai-attachment';

function createElement(template = html`<forge-ai-attachment></forge-ai-attachment>`): Promise<AiAttachmentComponent> {
  return renderFixture<AiAttachmentComponent>(template, TAG);
}

function removeButton(el: AiAttachmentComponent): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('button');
}

function sizeText(el: AiAttachmentComponent): string {
  return el.shadowRoot!.querySelector('.attachment-size')!.textContent!.trim();
}

describe('AiAttachmentComponent', () => {
  it('should be registered under the forge-ai-attachment tag', async () => {
    const el = await createElement();

    expect(AiAttachmentComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiAttachmentComponent);
    expect(el).toBeInstanceOf(AiAttachmentComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('defaults', () => {
    it('should have the expected default property values', async () => {
      const el = await createElement();

      expect(el.filename).toBe('');
      expect(el.size).toBe(0);
      expect(el.removable).toBe(false);
      expect(el.uploading).toBe(false);
      expect(el.progress).toBeUndefined();
    });
  });

  describe('attributes', () => {
    it('should read all properties from attributes', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.pdf" size="2048" removable uploading progress="40"></forge-ai-attachment>`);

      expect(el.filename).toBe('a.pdf');
      expect(el.size).toBe(2048);
      expect(el.removable).toBe(true);
      expect(el.uploading).toBe(true);
      expect(el.progress).toBe(40);
    });
  });

  describe('filename', () => {
    it('should render the filename', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="report.pdf"></forge-ai-attachment>`);

      expect(el.shadowRoot!.querySelector('.attachment-filename')!.textContent).toBe('report.pdf');
    });

    it('should expose a labelled group for assistive technology', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="report.pdf"></forge-ai-attachment>`);

      const group = el.shadowRoot!.querySelector('[role="group"]')!;

      expect(group.getAttribute('aria-label')).toBe('File attachment: report.pdf');
    });

    it('should update the rendered filename when the property changes', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.txt"></forge-ai-attachment>`);

      el.filename = 'b.txt';
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.attachment-filename')!.textContent).toBe('b.txt');
    });

    it('should sanitize special characters when generating the internal id', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="my file (1).pdf"></forge-ai-attachment>`);

      expect(el.shadowRoot!.querySelector('[role="group"]')!.id).toBe('attachment-my-file--1--pdf');
    });
  });

  describe('size', () => {
    it('should format sizes under 1KB in bytes', async () => {
      const el = await createElement(html`<forge-ai-attachment size="512"></forge-ai-attachment>`);

      expect(sizeText(el)).toBe('512 bytes');
    });

    it('should format zero as bytes', async () => {
      const el = await createElement();

      expect(sizeText(el)).toBe('0 bytes');
    });

    it('should format sizes in KB', async () => {
      const el = await createElement(html`<forge-ai-attachment size="2048"></forge-ai-attachment>`);

      expect(sizeText(el)).toBe('2 KB');
    });

    it('should format sizes in MB with one decimal', async () => {
      const el = await createElement(html`<forge-ai-attachment size="${1.5 * 1024 * 1024}"></forge-ai-attachment>`);

      expect(sizeText(el)).toBe('1.5 MB');
    });

    it('should switch to MB at exactly 1024 KB', async () => {
      const el = await createElement(html`<forge-ai-attachment size="${1024 * 1024}"></forge-ai-attachment>`);

      expect(sizeText(el)).toBe('1.0 MB');
    });
  });

  describe('removable', () => {
    it('should not render a remove button by default', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.pdf"></forge-ai-attachment>`);

      expect(removeButton(el)).toBeNull();
    });

    it('should render a labelled remove button when removable', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.pdf" removable></forge-ai-attachment>`);

      expect(removeButton(el)!.getAttribute('aria-label')).toBe('Remove a.pdf');
    });

    it('should label the button as cancel upload while uploading', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.pdf" removable uploading></forge-ai-attachment>`);

      expect(removeButton(el)!.getAttribute('aria-label')).toBe('Cancel upload of a.pdf');
    });

    it('should dispatch a remove event with the filename when the button is clicked', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.pdf" removable></forge-ai-attachment>`);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiAttachmentRemoveEventData>) => void>();
      el.addEventListener('forge-ai-attachment-remove', listener);

      removeButton(el)!.click();

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ filename: 'a.pdf' });
    });

    it('should dispatch a remove event that bubbles and is composed', async () => {
      const el = await createElement(html`<forge-ai-attachment filename="a.pdf" removable></forge-ai-attachment>`);
      const listener = vi.fn<(evt: CustomEvent) => void>();
      document.body.addEventListener('forge-ai-attachment-remove', listener);

      removeButton(el)!.click();
      document.body.removeEventListener('forge-ai-attachment-remove', listener);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });
  });

  describe('uploading', () => {
    it('should render a spinner while uploading', async () => {
      const el = await createElement(html`<forge-ai-attachment uploading></forge-ai-attachment>`);

      expect(el.shadowRoot!.querySelector('forge-ai-spinner')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('svg.file-icon')).toBeNull();
    });

    it('should render a file icon when not uploading', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('forge-ai-spinner')).toBeNull();
      expect(el.shadowRoot!.querySelector('svg.file-icon')).toBeTruthy();
    });

    it('should swap the file icon for a spinner when uploading toggles on', async () => {
      const el = await createElement();

      el.uploading = true;
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('forge-ai-spinner')).toBeTruthy();
    });
  });

  it('should render upload progress when uploading with a progress value', async () => {
    const el = await createElement(html`<forge-ai-attachment filename="a.pdf" uploading progress="40"></forge-ai-attachment>`);

    const bar = el.shadowRoot!.querySelector('[role="progressbar"]');

    expect(bar).toBeTruthy();
    expect(bar!.getAttribute('aria-valuenow')).toBe('40');
  });

  it('should size the progress fill from the progress value', async () => {
    const el = await createElement(html`<forge-ai-attachment filename="a.pdf" uploading progress="40"></forge-ai-attachment>`);

    const bar = el.shadowRoot!.querySelector<HTMLElement>('[role="progressbar"]')!;
    const fill = bar.querySelector<HTMLElement>('.progress-fill')!;

    expect(bar.style.getPropertyValue('--_progress')).toBe('40%');
    expect(fill.getBoundingClientRect().width / bar.getBoundingClientRect().width).toBeCloseTo(0.4, 1);
  });

  it('should not render upload progress when not uploading', async () => {
    const el = await createElement(html`<forge-ai-attachment filename="a.pdf" progress="40"></forge-ai-attachment>`);

    expect(el.shadowRoot!.querySelector('[role="progressbar"]')).toBeNull();
  });

  it('should not render upload progress when progress is undefined', async () => {
    const el = await createElement(html`<forge-ai-attachment filename="a.pdf" uploading></forge-ai-attachment>`);

    expect(el.shadowRoot!.querySelector('[role="progressbar"]')).toBeNull();
  });

  it('should clamp progress between 0 and 100', async () => {
    const el = await createElement(html`<forge-ai-attachment filename="a.pdf" uploading progress="150"></forge-ai-attachment>`);

    expect(el.shadowRoot!.querySelector('[role="progressbar"]')!.getAttribute('aria-valuenow')).toBe('100');

    el.progress = -5;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[role="progressbar"]')!.getAttribute('aria-valuenow')).toBe('0');
  });
});
