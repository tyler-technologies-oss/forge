import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiFilePickerComponent, type AiFilePickerVariant, type ForgeAiFilePickerChangeEventData, type ForgeAiFilePickerErrorEventData } from './index.js';

const TAG = 'forge-ai-file-picker';

function createElement(template = html`<forge-ai-file-picker></forge-ai-file-picker>`): Promise<AiFilePickerComponent> {
  return renderFixture<AiFilePickerComponent>(template, TAG);
}

function getInput(el: AiFilePickerComponent): HTMLInputElement {
  return el.shadowRoot!.querySelector<HTMLInputElement>('input[type="file"]')!;
}

function getButton(el: AiFilePickerComponent): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
}

function makeFile(name: string, size = 10): File {
  return new File([new Uint8Array(size)], name, { type: 'text/plain' });
}

function selectFiles(el: AiFilePickerComponent, files: File[]): void {
  const input = getInput(el);
  const transfer = new DataTransfer();
  files.forEach(file => transfer.items.add(file));
  input.files = transfer.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

function dropFiles(el: AiFilePickerComponent, files: File[]): DragEvent {
  const transfer = new DataTransfer();
  files.forEach(file => transfer.items.add(file));
  const event = new DragEvent('drop', { bubbles: true, composed: true, cancelable: true, dataTransfer: transfer });
  el.dispatchEvent(event);
  return event;
}

const flush = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0));

describe('AiFilePickerComponent', () => {
  describe('registration', () => {
    it('should be registered under the forge-ai-file-picker tag', async () => {
      const el = await createElement();

      expect(customElements.get(TAG)).toBe(AiFilePickerComponent);
      expect(el).toBeInstanceOf(AiFilePickerComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement();

      expect(el.variant).toBe('icon-button');
      expect(el.disabled).toBe(false);
      expect(el.accept).toBe('');
      expect(el.multiple).toBe(false);
      expect(el.maxSize).toBe(10485760);
      expect(el.selectedFiles).toEqual([]);
    });

    it('should reflect disabled to the attribute', async () => {
      const el = await createElement();

      el.disabled = true;
      await el.updateComplete;

      expect(el.hasAttribute('disabled')).toBe(true);
      expect(getButton(el).disabled).toBe(true);
    });

    it('should read the disabled attribute', async () => {
      const el = await createElement(html`<forge-ai-file-picker disabled></forge-ai-file-picker>`);

      expect(el.disabled).toBe(true);
      expect(getButton(el).disabled).toBe(true);
    });

    it('should pass accept to the file input', async () => {
      const el = await createElement(html`<forge-ai-file-picker accept=".png,.jpg"></forge-ai-file-picker>`);

      expect(getInput(el).accept).toBe('.png,.jpg');
    });

    it('should omit accept on the file input when empty', async () => {
      const el = await createElement();

      expect(getInput(el).hasAttribute('accept')).toBe(false);
    });

    it('should pass multiple to the file input', async () => {
      const el = await createElement(html`<forge-ai-file-picker multiple></forge-ai-file-picker>`);

      expect(el.multiple).toBe(true);
      expect(getInput(el).multiple).toBe(true);
    });

    it('should read the max-size attribute', async () => {
      const el = await createElement(html`<forge-ai-file-picker max-size="2048"></forge-ai-file-picker>`);

      expect(el.maxSize).toBe(2048);
    });

    it('should hide the file input from assistive technology and tab order', async () => {
      const el = await createElement();
      const input = getInput(el);

      expect(input.getAttribute('aria-hidden')).toBe('true');
      expect(input.tabIndex).toBe(-1);
    });
  });

  describe('variant', () => {
    it('should render the icon-button variant with a tooltip and default icon', async () => {
      const el = await createElement();
      const button = getButton(el);

      expect(button.classList.contains('forge-icon-button')).toBe(true);
      expect(button.classList.contains('forge-button')).toBe(false);
      expect(button.querySelector('svg')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent!.trim()).toBe('Add file(s)');
    });

    it('should render the button variant with default text and no tooltip', async () => {
      const variant: AiFilePickerVariant = 'button';
      const el = await createElement(html`<forge-ai-file-picker variant=${variant}></forge-ai-file-picker>`);
      const button = getButton(el);

      expect(button.classList.contains('forge-button')).toBe(true);
      expect(button.classList.contains('forge-icon-button')).toBe(false);
      expect(button.textContent!.trim()).toBe('Choose File');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')).toBeNull();
    });

    it('should project default slot content in the button variant', async () => {
      const el = await createElement(html`<forge-ai-file-picker variant="button"><span id="label">Upload</span></forge-ai-file-picker>`);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;

      expect(slot.assignedElements()).toEqual([el.querySelector('#label')]);
    });

    it('should project icon slot content in the icon-button variant', async () => {
      const el = await createElement(html`<forge-ai-file-picker><svg slot="icon" id="custom"></svg></forge-ai-file-picker>`);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!;

      expect(slot.assignedElements()).toEqual([el.querySelector('#custom')]);
    });

    it('should label the button for assistive technology', async () => {
      const el = await createElement();

      expect(getButton(el).getAttribute('aria-label')).toBe('Select file to upload');
      expect(getButton(el).type).toBe('button');
    });
  });

  describe('button click', () => {
    it('should open the file chooser by clicking the hidden input', async () => {
      const el = await createElement();
      const inputClick = vi.fn((event: Event) => event.preventDefault());
      getInput(el).addEventListener('click', inputClick);

      getButton(el).click();

      expect(inputClick).toHaveBeenCalledTimes(1);
    });

    it('should not open the file chooser when disabled', async () => {
      const el = await createElement(html`<forge-ai-file-picker disabled></forge-ai-file-picker>`);
      const inputClick = vi.fn((event: Event) => event.preventDefault());
      getInput(el).addEventListener('click', inputClick);

      getButton(el).click();

      expect(inputClick).not.toHaveBeenCalled();
    });
  });

  describe('file selection', () => {
    it('should dispatch a change event for the selected file', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiFilePickerChangeEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-change', listener);
      const file = makeFile('a.txt');

      selectFiles(el, [file]);
      await flush();

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail.file).toBe(file);
      expect(typeof event.detail.timestamp).toBe('number');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should clear the input value after processing', async () => {
      const el = await createElement();

      selectFiles(el, [makeFile('a.txt')]);
      await flush();

      expect(getInput(el).files!.length).toBe(0);
    });

    it('should only emit the first file when multiple is false', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiFilePickerChangeEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-change', listener);

      selectFiles(el, [makeFile('a.txt'), makeFile('b.txt')]);
      await flush();

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.file.name).toBe('a.txt');
    });

    it('should emit every file when multiple is true', async () => {
      const el = await createElement(html`<forge-ai-file-picker multiple></forge-ai-file-picker>`);
      const listener = vi.fn<(event: CustomEvent<ForgeAiFilePickerChangeEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-change', listener);

      selectFiles(el, [makeFile('a.txt'), makeFile('b.txt')]);
      await flush();

      expect(listener.mock.calls.map(call => call[0].detail.file.name)).toEqual(['a.txt', 'b.txt']);
    });

    it('should ignore a change event with no files', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-file-picker-change', listener);

      getInput(el).dispatchEvent(new Event('change', { bubbles: true }));
      await flush();

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('should dispatch a duplicate error for a file already in selectedFiles', async () => {
      const el = await createElement(html`<forge-ai-file-picker .selectedFiles=${['a.txt']}></forge-ai-file-picker>`);
      const change = vi.fn();
      const error = vi.fn<(event: CustomEvent<ForgeAiFilePickerErrorEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-change', change);
      el.addEventListener('forge-ai-file-picker-error', error);

      selectFiles(el, [makeFile('a.txt')]);
      await flush();

      expect(change).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalledTimes(1);
      const event = error.mock.calls[0][0];
      expect(event.detail).toEqual({ type: 'duplicate', message: 'File "a.txt" is already selected', filename: 'a.txt' });
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should dispatch a size error for a file larger than maxSize', async () => {
      const el = await createElement(html`<forge-ai-file-picker .maxSize=${1024 * 1024}></forge-ai-file-picker>`);
      const change = vi.fn();
      const error = vi.fn<(event: CustomEvent<ForgeAiFilePickerErrorEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-change', change);
      el.addEventListener('forge-ai-file-picker-error', error);

      selectFiles(el, [makeFile('big.bin', 2 * 1024 * 1024)]);
      await flush();

      expect(change).not.toHaveBeenCalled();
      expect(error.mock.calls[0][0].detail).toEqual({
        type: 'size',
        message: 'File "big.bin" (2.0MB) exceeds maximum size of 1.0MB',
        filename: 'big.bin'
      });
    });

    it('should accept a file exactly at maxSize', async () => {
      const el = await createElement(html`<forge-ai-file-picker .maxSize=${100}></forge-ai-file-picker>`);
      const change = vi.fn();
      el.addEventListener('forge-ai-file-picker-change', change);

      selectFiles(el, [makeFile('edge.bin', 100)]);
      await flush();

      expect(change).toHaveBeenCalledTimes(1);
    });

    it('should skip invalid files but still emit valid ones when multiple is true', async () => {
      const el = await createElement(html`<forge-ai-file-picker multiple .selectedFiles=${['dup.txt']}></forge-ai-file-picker>`);
      const change = vi.fn<(event: CustomEvent<ForgeAiFilePickerChangeEventData>) => void>();
      const error = vi.fn();
      el.addEventListener('forge-ai-file-picker-change', change);
      el.addEventListener('forge-ai-file-picker-error', error);

      selectFiles(el, [makeFile('dup.txt'), makeFile('ok.txt')]);
      await flush();

      expect(error).toHaveBeenCalledTimes(1);
      expect(change).toHaveBeenCalledTimes(1);
      expect(change.mock.calls[0][0].detail.file.name).toBe('ok.txt');
    });

    it('should report duplicates before size errors', async () => {
      const el = await createElement(html`<forge-ai-file-picker .maxSize=${1} .selectedFiles=${['a.txt']}></forge-ai-file-picker>`);
      const error = vi.fn<(event: CustomEvent<ForgeAiFilePickerErrorEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-error', error);

      selectFiles(el, [makeFile('a.txt', 100)]);
      await flush();

      expect(error.mock.calls[0][0].detail.type).toBe('duplicate');
    });
  });

  describe('drag and drop', () => {
    it('should mark the button as drag-over on dragover', async () => {
      const el = await createElement();
      const event = new DragEvent('dragover', { bubbles: true, composed: true, cancelable: true });

      el.dispatchEvent(event);
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(true);
      expect(getButton(el).classList.contains('ai-file-picker--drag-over')).toBe(true);
    });

    it('should clear drag-over when leaving outside the bounds', async () => {
      const el = await createElement();
      el.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, cancelable: true }));
      await el.updateComplete;

      const rect = el.getBoundingClientRect();
      el.dispatchEvent(new DragEvent('dragleave', { bubbles: true, composed: true, cancelable: true, clientX: rect.right + 50, clientY: rect.bottom + 50 }));
      await el.updateComplete;

      expect(getButton(el).classList.contains('ai-file-picker--drag-over')).toBe(false);
    });

    it('should keep drag-over when leaving within the bounds', async () => {
      const el = await createElement();
      el.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, cancelable: true }));
      await el.updateComplete;

      const rect = el.getBoundingClientRect();
      el.dispatchEvent(new DragEvent('dragleave', { bubbles: true, composed: true, cancelable: true, clientX: rect.left + 1, clientY: rect.top + 1 }));
      await el.updateComplete;

      expect(getButton(el).classList.contains('ai-file-picker--drag-over')).toBe(true);
    });

    it('should emit a change event and clear drag-over on drop', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiFilePickerChangeEventData>) => void>();
      el.addEventListener('forge-ai-file-picker-change', listener);
      el.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, cancelable: true }));
      await el.updateComplete;

      const event = dropFiles(el, [makeFile('dropped.txt')]);
      await flush();
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(true);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.file.name).toBe('dropped.txt');
      expect(getButton(el).classList.contains('ai-file-picker--drag-over')).toBe(false);
    });

    it('should validate dropped files', async () => {
      const el = await createElement(html`<forge-ai-file-picker .selectedFiles=${['dup.txt']}></forge-ai-file-picker>`);
      const error = vi.fn();
      el.addEventListener('forge-ai-file-picker-error', error);

      dropFiles(el, [makeFile('dup.txt')]);
      await flush();

      expect(error).toHaveBeenCalledTimes(1);
    });

    it('should ignore a drop with no files', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-file-picker-change', listener);

      dropFiles(el, []);
      await flush();

      expect(listener).not.toHaveBeenCalled();
    });

    it('should ignore drag and drop interactions when disabled', async () => {
      const el = await createElement(html`<forge-ai-file-picker disabled></forge-ai-file-picker>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-file-picker-change', listener);

      const over = new DragEvent('dragover', { bubbles: true, composed: true, cancelable: true });
      el.dispatchEvent(over);
      el.dispatchEvent(new DragEvent('dragleave', { bubbles: true, composed: true, cancelable: true, clientX: -10, clientY: -10 }));
      const drop = dropFiles(el, [makeFile('x.txt')]);
      await flush();
      await el.updateComplete;

      expect(over.defaultPrevented).toBe(false);
      expect(drop.defaultPrevented).toBe(false);
      expect(listener).not.toHaveBeenCalled();
      expect(getButton(el).classList.contains('ai-file-picker--drag-over')).toBe(false);
    });

    it('should stop handling drops after being disconnected', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-file-picker-change', listener);

      el.remove();
      dropFiles(el, [makeFile('x.txt')]);
      await flush();

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
