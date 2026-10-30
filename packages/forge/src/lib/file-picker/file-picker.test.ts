import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { IFilePickerChangeEventData } from './file-picker-constants.js';
import type { IFilePickerComponent } from './file-picker.js';
import '../button/button.js';
import './file-picker.js';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants.js';

describe('File Picker', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    await expect(el).toBeAccessible();
  });

  it('should contain the file select button', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    expect(input).toBeTruthy();
  });

  it('should initialize with no accept value', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    expect(el.accept).toBeNull();
  });

  it('should initialize with no capture value', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    expect(el.capture).toBeNull();
  });

  it('should initialize with multiple set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    expect(el.multiple).toBe(false);
  });

  it('should initialize with disabled set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    expect(el.disabled).toBe(false);
  });

  it('should initialize with compact set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    expect(el.compact).toBe(false);
  });

  it('should allow accept to be set to null', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.accept = '.png';
    el.accept = null;
    expect(el.accept).toBeNull();
  });

  it('should allow capture to be set to null', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.capture = 'user';
    el.capture = null;
    expect(el.capture).toBeNull();
  });

  it('should allow multiple to be set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.multiple = true;
    el.multiple = false;
    expect(el.multiple).toBe(false);
  });

  it('should allow disabled to be set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.disabled = true;
    el.disabled = false;
    expect(el.disabled).toBe(false);
  });

  it('should allow compact to be set to false', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.compact = true;
    el.compact = false;
    expect(el.compact).toBe(false);
  });

  it('should update the accept value when the accept attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT, '.png');
    expect(el.accept).toBe('.png');
  });

  it('should update the capture value when the capture attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.CAPTURE, 'user');
    expect(el.capture).toBe('user');
  });

  it('should update the multiple value when the multiple attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.MULTIPLE, '');
    expect(el.multiple).toBe(true);
  });

  it('should update the disabled value when the disabled attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.DISABLED, '');
    expect(el.disabled).toBe(true);
  });

  it('should update the compact value when the compact attribute is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT, '');
    expect(el.compact).toBe(true);
  });

  it('should set the accept attribute on the input when accept is set', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    el.accept = '.png';
    await el.updateComplete;
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    expect(input.getAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT)).toBe('.png');
  });

  it('should activate a click on the file input when the select button is clicked', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    const clickSpy = vi.fn();
    input.addEventListener('click', clickSpy);
    input.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should trigger a change event when the file input is triggered', async () => {
    const screen = render(html`<forge-file-picker></forge-file-picker>`);
    const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
    await el.updateComplete;
    const changeSpy = vi.fn();
    el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(changeSpy).toHaveBeenCalledOnce();
  });

  describe('drag and drop', () => {
    const createDropEvent = (...files: File[]): DragEvent => {
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      return new DragEvent('drop', { dataTransfer, bubbles: true, cancelable: true });
    };

    const setup = async (template = html`<forge-file-picker></forge-file-picker>`): Promise<{ el: IFilePickerComponent; form: HTMLElement }> => {
      const screen = render(template);
      const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
      await el.updateComplete;
      const form = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.CONTAINER);
      return { el, form };
    };

    it('should dispatch the dropped files as legal files', async () => {
      const { el, form } = await setup();
      const changeSpy = vi.fn();
      el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);

      form.dispatchEvent(createDropEvent(new File(['a'], 'a.png', { type: 'image/png' })));

      const detail = changeSpy.mock.calls[0][0].detail as IFilePickerChangeEventData;
      expect(detail.legalFiles?.map(f => f.name)).toEqual(['a.png']);
      expect(detail.illegalFiles).toEqual([]);
    });

    it('should separate files that do not match the accept value', async () => {
      const { el, form } = await setup(html`<forge-file-picker accept=".png, application/pdf"></forge-file-picker>`);
      const changeSpy = vi.fn();
      el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);

      form.dispatchEvent(
        createDropEvent(
          new File(['a'], 'a.png', { type: 'image/png' }),
          new File(['b'], 'b.pdf', { type: 'application/pdf' }),
          new File(['c'], 'c.txt', { type: 'text/plain' })
        )
      );

      const detail = changeSpy.mock.calls[0][0].detail as IFilePickerChangeEventData;
      expect(detail.legalFiles?.map(f => f.name)).toEqual(['a.png', 'b.pdf']);
      expect(detail.illegalFiles?.map(f => f.name)).toEqual(['c.txt']);
    });

    it('should separate files that are larger than the max size', async () => {
      const { el, form } = await setup(html`<forge-file-picker max-size="2"></forge-file-picker>`);
      const changeSpy = vi.fn();
      el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);

      form.dispatchEvent(createDropEvent(new File(['a'], 'small.txt'), new File(['abc'], 'large.txt')));

      const detail = changeSpy.mock.calls[0][0].detail as IFilePickerChangeEventData;
      expect(detail.legalFiles?.map(f => f.name)).toEqual(['small.txt']);
      expect(detail.illegalFiles?.map(f => f.name)).toEqual(['large.txt']);
    });

    it('should highlight while files are dragged over and remove it when they leave', async () => {
      const { el, form } = await setup();

      form.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      expect(form.classList.contains(FILE_PICKER_CONSTANTS.classes.HIGHLIGHT)).toBe(true);

      form.dispatchEvent(new DragEvent('dragleave', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      expect(form.classList.contains(FILE_PICKER_CONSTANTS.classes.HIGHLIGHT)).toBe(false);
    });

    it('should not dispatch a change event when files are dropped while compact', async () => {
      const { el, form } = await setup(html`<forge-file-picker compact></forge-file-picker>`);
      const changeSpy = vi.fn();
      el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);

      form.dispatchEvent(createDropEvent(new File(['a'], 'a.png')));

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch a change event when files are dropped while disabled', async () => {
      const { el, form } = await setup(html`<forge-file-picker disabled></forge-file-picker>`);
      const changeSpy = vi.fn();
      el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy);

      form.dispatchEvent(createDropEvent(new File(['a'], 'a.png')));

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('should disable the slotted button', async () => {
      const screen = render(html`<forge-file-picker><forge-button>Select</forge-button></forge-file-picker>`);
      const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
      const button = el.querySelector('forge-button') as HTMLElement;
      await el.updateComplete;

      el.disabled = true;
      await el.updateComplete;
      expect(button.hasAttribute('disabled')).toBe(true);

      el.disabled = false;
      await el.updateComplete;
      expect(button.hasAttribute('disabled')).toBe(false);
    });

    it('should open the file chooser when clicked', async () => {
      const screen = render(html`<forge-file-picker><forge-button>Select</forge-button></forge-file-picker>`);
      const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
      await el.updateComplete;
      const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
      const clickSpy = vi.fn();
      input.addEventListener('click', clickSpy);

      (el.querySelector('forge-button') as HTMLElement).click();

      expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('should not open the file chooser when disabled', async () => {
      const screen = render(html`<forge-file-picker disabled><forge-button>Select</forge-button></forge-file-picker>`);
      const el = screen.container.querySelector('forge-file-picker') as IFilePickerComponent;
      await el.updateComplete;
      const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
      const clickSpy = vi.fn();
      input.addEventListener('click', clickSpy);

      getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.CONTAINER).click();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});
