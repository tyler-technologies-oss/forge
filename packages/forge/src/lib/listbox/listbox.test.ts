import { getShadowElement } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { TestHarness } from '../core/testing/test-harness.js';
import { task } from '../core/utils/utils.js';
import { OptionComponent } from '../option/option/option.js';
import { OptionGroupComponent } from '../option/option-group/option-group.js';
import type { IListboxDropData } from './listbox.js';
import { ListboxComponent } from './listbox.js';

import './listbox.js';
import '../option/option/option.js';
import '../option/option-group/option-group.js';

class ListboxHarness extends TestHarness<ListboxComponent> {
  public rootElement!: HTMLElement;

  constructor(el: ListboxComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, '[part="root"]');
  }

  public get options(): OptionComponent[] {
    return Array.from(this.element.querySelectorAll<OptionComponent>('forge-option'));
  }

  public get groups(): OptionGroupComponent[] {
    return Array.from(this.element.querySelectorAll<OptionGroupComponent>('forge-option-group'));
  }
}

function createDataTransfer(): DataTransfer {
  return new DataTransfer();
}

function dispatchDrag(target: EventTarget, type: string, options: Partial<DragEventInit> = {}): void {
  target.dispatchEvent(
    new DragEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      dataTransfer: options.dataTransfer ?? createDataTransfer(),
      clientX: options.clientX ?? 0,
      clientY: options.clientY ?? 0
    })
  );
}

/** Returns a `clientY` value that will resolve to the given insertion index within `container`. */
function clientYForIndex(container: HTMLElement, index: number): number {
  const items = Array.from(container.querySelectorAll<HTMLElement>('forge-option'));
  if (!items.length) {
    return 0;
  }
  if (index >= items.length) {
    return items[items.length - 1].getBoundingClientRect().bottom + 1;
  }
  return items[index].getBoundingClientRect().top - 1;
}

async function createFixture(
  template = html`
    <forge-listbox>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2">Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  `
): Promise<ListboxHarness> {
  const screen = render(template);
  const el = screen.container.querySelector('forge-listbox') as ListboxComponent;
  await el.updateComplete;
  return new ListboxHarness(el);
}

describe('Listbox', () => {
  it('should contain shadow root', async () => {
    const ctx = await createFixture();
    expect(ctx.element.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const ctx = await createFixture(html`
      <forge-listbox aria-label="Options">
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2" selected>Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
      </forge-listbox>
    `);
    await expect(ctx.element).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const ctx = await createFixture();
    expect(ctx.element.value).toBe('');
    expect(ctx.element.name).toBe('');
    expect(ctx.element.required).toBe(false);
    expect(ctx.element.readonly).toBe(false);
    expect(ctx.element.multiple).toBe(false);
    expect(ctx.element.reorderable).toBe(false);
    expect(ctx.element.allowDragOut).toBe(false);
    expect(ctx.element.allowDropFrom).toBe('');
    expect(ctx.element.disabled).toBe(false);
    expect(ctx.element.allowDeselect).toBe(false);
    expect(ctx.element.orientation).toBe('vertical');
  });

  describe('aria', () => {
    it('should set role to listbox', async () => {
      const ctx = await createFixture();
      expect(ctx.element.getAttribute('role')).toBe('listbox');
    });

    it('should set aria-multiselectable when multiple', async () => {
      const ctx = await createFixture();
      expect(ctx.element.getAttribute('aria-multiselectable')).toBeNullable();

      ctx.element.multiple = true;
      await ctx.element.updateComplete;
      expect(ctx.element.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should set aria-orientation when horizontal', async () => {
      const ctx = await createFixture();
      expect(ctx.element.getAttribute('aria-orientation')).toBeNullable();

      ctx.element.orientation = 'horizontal';
      await ctx.element.updateComplete;
      expect(ctx.element.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should set aria-disabled when disabled', async () => {
      const ctx = await createFixture();
      ctx.element.disabled = true;
      await ctx.element.updateComplete;
      expect(ctx.element.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set aria-readonly when readonly', async () => {
      const ctx = await createFixture();
      ctx.element.readonly = true;
      await ctx.element.updateComplete;
      expect(ctx.element.getAttribute('aria-readonly')).toBe('true');
    });
  });

  describe('descendant options', () => {
    it('should disable descendant options when disabled', async () => {
      const ctx = await createFixture(html`
        <forge-listbox disabled>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.options.forEach(option => expect(option.disabled).toBe(true));
    });

    it('should show a checkbox on options when multiple', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      await Promise.all(ctx.options.map(option => option.updateComplete));

      ctx.options.forEach(option => {
        expect(getShadowElement(option, '.checkbox')).toBeTruthy();
      });
    });

    it('should show a checkmark on the selected option when single-select', async () => {
      const ctx = await createFixture();
      ctx.element.value = '2';
      await Promise.all(ctx.options.map(option => option.updateComplete));

      const selected = ctx.options.find(option => option.value === '2')!;
      expect(getShadowElement(selected, '.checkmark')).toBeTruthy();
    });

    it('should render a drag handle on options when reorderable', async () => {
      const ctx = await createFixture();
      ctx.element.reorderable = true;
      await Promise.all(ctx.options.map(option => option.updateComplete));

      ctx.options.forEach(option => {
        expect(getShadowElement(option, '.drag-handle')).toBeTruthy();
      });
    });
  });

  describe('single-select', () => {
    it('should select option when clicked', async () => {
      const ctx = await createFixture();
      await userEvent.click(ctx.options[0]);

      expect(ctx.element.value).toBe('1');
      expect(ctx.options[0].selected).toBe(true);
    });

    it('should deselect the previous option when a different option is clicked', async () => {
      const ctx = await createFixture();
      await userEvent.click(ctx.options[0]);
      await userEvent.click(ctx.options[1]);

      expect(ctx.element.value).toBe('2');
      expect(ctx.options[0].selected).toBe(false);
      expect(ctx.options[1].selected).toBe(true);
    });

    it('should not deselect when the same option is clicked and allow-deselect is false', async () => {
      const ctx = await createFixture();
      await userEvent.click(ctx.options[0]);
      await userEvent.click(ctx.options[0]);

      expect(ctx.element.value).toBe('1');
      expect(ctx.options[0].selected).toBe(true);
    });

    it('should deselect when the same option is clicked and allow-deselect is true', async () => {
      const ctx = await createFixture();
      ctx.element.allowDeselect = true;
      await userEvent.click(ctx.options[0]);
      await userEvent.click(ctx.options[0]);

      expect(ctx.element.value).toBe('');
      expect(ctx.options[0].selected).toBe(false);
    });

    it('should not select a disabled option when clicked', async () => {
      const ctx = await createFixture();
      ctx.options[0].disabled = true;
      await userEvent.click(ctx.options[0], { force: true });

      expect(ctx.element.value).toBe('');
    });

    it('should not change selection when readonly', async () => {
      const ctx = await createFixture();
      ctx.element.readonly = true;
      await userEvent.click(ctx.options[0]);

      expect(ctx.element.value).toBe('');
      expect(ctx.options[0].selected).toBe(false);
    });

    it('should not change selection when disabled', async () => {
      const ctx = await createFixture();
      ctx.element.disabled = true;
      await userEvent.click(ctx.options[0], { force: true });

      expect(ctx.element.value).toBe('');
    });
  });

  describe('multi-select', () => {
    it('should toggle option selection independently', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;

      await userEvent.click(ctx.options[0]);
      await userEvent.click(ctx.options[2]);

      expect(ctx.element.value).toEqual(['1', '3']);
      expect(ctx.options[0].selected).toBe(true);
      expect(ctx.options[1].selected).toBe(false);
      expect(ctx.options[2].selected).toBe(true);
    });

    it('should remove option from value when selected option is clicked again', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;

      await userEvent.click(ctx.options[0]);
      await userEvent.click(ctx.options[0]);

      expect(ctx.element.value).toEqual([]);
      expect(ctx.options[0].selected).toBe(false);
    });
  });

  describe('keyboard interaction', () => {
    it('should move the active descendant with ArrowDown/ArrowUp and wrap', async () => {
      const ctx = await createFixture();
      ctx.element.focus();
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[0].id);

      await userEvent.keyboard('{ArrowDown}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[1].id);

      await userEvent.keyboard('{ArrowDown}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[2].id);

      await userEvent.keyboard('{ArrowDown}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[0].id);

      await userEvent.keyboard('{ArrowUp}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[2].id);
    });

    it('should move to first/last option with Home/End', async () => {
      const ctx = await createFixture();
      ctx.element.focus();

      await userEvent.keyboard('{End}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[2].id);

      await userEvent.keyboard('{Home}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[0].id);
    });

    it('should select the active option with the Space key', async () => {
      const ctx = await createFixture();
      ctx.element.focus();
      await userEvent.keyboard(' ');

      expect(ctx.element.value).toBe('1');
    });

    it('should select the active option with the Enter key', async () => {
      const ctx = await createFixture();
      ctx.element.focus();
      await userEvent.keyboard('{Enter}');

      expect(ctx.element.value).toBe('1');
    });

    it('should select all options with Ctrl+A when multiple', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.focus();

      await userEvent.keyboard('{Control>}a{/Control}');

      expect(ctx.element.value).toEqual(['1', '2', '3']);
    });

    it('should deselect all options with Ctrl+A when all are already selected', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.value = ['1', '2', '3'];
      ctx.element.focus();

      await userEvent.keyboard('{Control>}a{/Control}');

      expect(ctx.element.value).toEqual([]);
    });

    it('should not select all when not multiple', async () => {
      const ctx = await createFixture();
      ctx.element.focus();

      await userEvent.keyboard('{Control>}a{/Control}');

      expect(ctx.element.value).toBe('');
    });

    it('should move the active descendant onto a disabled option', async () => {
      const ctx = await createFixture();
      ctx.options[1].disabled = true;
      ctx.element.focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[1].id);
    });

    it('should focus a matching option via type-ahead search', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="a">Apple</forge-option>
          <forge-option value="b">Banana</forge-option>
          <forge-option value="c">Cherry</forge-option>
        </forge-listbox>
      `);
      ctx.element.focus();

      await userEvent.keyboard('c');

      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[2].id);
    });
  });

  describe('value synchronization', () => {
    it('should select the matching option when value is set programmatically', async () => {
      const ctx = await createFixture();
      ctx.element.value = '2';
      await ctx.element.updateComplete;

      expect(ctx.options[1].selected).toBe(true);
      expect(ctx.options[0].selected).toBe(false);
    });

    it('should update value when an option is selected directly', async () => {
      const ctx = await createFixture();
      ctx.options[1].selected = true;
      await ctx.options[1].updateComplete;

      expect(ctx.element.value).toBe('2');
    });

    it('should apply last-wins semantics when multiple options are selected directly in single-select mode', async () => {
      const ctx = await createFixture();
      ctx.options[0].selected = true;
      await ctx.options[0].updateComplete;
      ctx.options[1].selected = true;
      await ctx.options[1].updateComplete;

      expect(ctx.element.value).toBe('2');
    });

    it('should update value array when options are selected directly in multi-select mode', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.options[0].selected = true;
      ctx.options[2].selected = true;
      await Promise.all(ctx.options.map(option => option.updateComplete));

      expect(ctx.element.value).toEqual(['1', '3']);
    });

    it('should update value when a selected option is removed', async () => {
      const ctx = await createFixture();
      ctx.element.value = '2';
      ctx.options[1].remove();
      await task();

      expect(ctx.element.value).toBe('');
    });

    it('should update value when a selected option is added', async () => {
      const ctx = await createFixture();
      const newOption = document.createElement('forge-option') as OptionComponent;
      newOption.value = '4';
      newOption.selected = true;
      ctx.element.appendChild(newOption);
      await task();

      expect(ctx.element.value).toBe('4');
    });
  });

  describe('form association', () => {
    it('should return form element', async () => {
      const screen = render(html`
        <form>
          <forge-listbox></forge-listbox>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;

      expect(listbox.form).toBe(form);
    });

    it('should return associated labels', async () => {
      const screen = render(html`
        <label>
          Options
          <forge-listbox></forge-listbox>
        </label>
      `);
      const label = screen.container.querySelector('label') as HTMLLabelElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;

      expect(listbox.labels.length).toBe(1);
      expect(listbox.labels[0]).toBe(label);
    });

    it('should accept a name', async () => {
      const ctx = await createFixture(html`
        <forge-listbox name="test">
          <forge-option value="1">Option 1</forge-option>
        </forge-listbox>
      `);
      expect(ctx.element.name).toBe('test');

      ctx.element.name = 'updated';
      expect(ctx.element.name).toBe('updated');
    });

    it('should be invalid when required with no selection and valid once selected (single)', async () => {
      const ctx = await createFixture(html`
        <forge-listbox required>
          <forge-option value="1">Option 1</forge-option>
        </forge-listbox>
      `);

      expect(ctx.element.checkValidity()).toBe(false);
      expect(ctx.element.validationMessage).not.toBe('');

      ctx.element.value = '1';
      await ctx.element.updateComplete;
      expect(ctx.element.checkValidity()).toBe(true);
      expect(ctx.element.validationMessage).toBe('');
    });

    it('should be invalid when required with an empty array and valid once selected (multi)', async () => {
      const ctx = await createFixture(html`
        <forge-listbox required multiple>
          <forge-option value="1">Option 1</forge-option>
        </forge-listbox>
      `);

      expect(ctx.element.checkValidity()).toBe(false);

      ctx.element.value = ['1'];
      await ctx.element.updateComplete;
      expect(ctx.element.checkValidity()).toBe(true);
    });

    it('should support setting a custom validity message', async () => {
      const ctx = await createFixture();
      ctx.element.setCustomValidity('Custom error');

      expect(ctx.element.checkValidity()).toBe(false);
      expect(ctx.element.validationMessage).toBe('Custom error');

      ctx.element.setCustomValidity('');
      expect(ctx.element.checkValidity()).toBe(true);
    });

    it('should submit selected value via FormData (single)', async () => {
      const screen = render(html`
        <form>
          <forge-listbox name="choice"></forge-listbox>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;

      let formData = new FormData(form);
      expect(formData.get('choice')).toBeNull();

      listbox.value = '1';
      await listbox.updateComplete;
      formData = new FormData(form);
      expect(formData.get('choice')).toBe('1');
    });

    it('should submit selected values via FormData (multi)', async () => {
      const screen = render(html`
        <form>
          <forge-listbox name="choices" multiple></forge-listbox>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;

      listbox.value = ['a', 'b'];
      await listbox.updateComplete;
      const formData = new FormData(form);

      expect(formData.getAll('choices')).toEqual(['a', 'b']);
    });

    it('should disable when a containing fieldset is disabled', async () => {
      const screen = render(html`
        <form>
          <fieldset>
            <forge-listbox>
              <forge-option value="1">Option 1</forge-option>
            </forge-listbox>
          </fieldset>
        </form>
      `);
      const fieldset = screen.container.querySelector('fieldset') as HTMLFieldSetElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;

      fieldset.disabled = true;
      expect(listbox.disabled).toBe(true);

      fieldset.disabled = false;
      expect(listbox.disabled).toBe(false);
    });

    it('should reset to the declared value attribute on form reset', async () => {
      const screen = render(html`
        <form>
          <forge-listbox value="1">
            <forge-option value="1" selected>Option 1</forge-option>
            <forge-option value="2">Option 2</forge-option>
          </forge-listbox>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;
      await task();

      listbox.value = '2';
      form.reset();

      expect(listbox.value).toBe('1');
    });

    it('should reset to declaratively selected options when no value attribute is present', async () => {
      const screen = render(html`
        <form>
          <forge-listbox>
            <forge-option value="1">Option 1</forge-option>
            <forge-option value="2" selected>Option 2</forge-option>
          </forge-listbox>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;
      await task();

      listbox.value = '1';
      form.reset();

      expect(listbox.value).toBe('2');
    });

    it('should restore form state (single)', async () => {
      const ctx = await createFixture();
      const state = new FormData();
      state.append('multiple', 'false');
      state.append('value', '2');

      ctx.element.formStateRestoreCallback(state, 'restore');

      expect(ctx.element.multiple).toBe(false);
      expect(ctx.element.value).toBe('2');
    });

    it('should restore form state (multi)', async () => {
      const ctx = await createFixture();
      const state = new FormData();
      state.append('multiple', 'true');
      state.append('value', '1');
      state.append('value', '3');

      ctx.element.formStateRestoreCallback(state, 'restore');

      expect(ctx.element.multiple).toBe(true);
      expect(ctx.element.value).toEqual(['1', '3']);
    });
  });

  describe('change event', () => {
    it('should dispatch change event when an option is clicked', async () => {
      const ctx = await createFixture();
      const changeSpy = vi.fn();
      ctx.element.addEventListener('change', changeSpy);

      await userEvent.click(ctx.options[0]);

      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch change event on keyboard selection', async () => {
      const ctx = await createFixture();
      const changeSpy = vi.fn();
      ctx.element.addEventListener('change', changeSpy);
      ctx.element.focus();

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard(' ');

      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch change event when selecting all via Ctrl+A', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      const changeSpy = vi.fn();
      ctx.element.addEventListener('change', changeSpy);
      ctx.element.focus();

      await userEvent.keyboard('{Control>}a{/Control}');

      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should not dispatch change event when value is set programmatically', async () => {
      const ctx = await createFixture();
      const changeSpy = vi.fn();
      ctx.element.addEventListener('change', changeSpy);

      ctx.element.value = '1';

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('allowDropFromElements', () => {
    it('should compute allowed drop sources from the allow-drop-from attribute', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source-a"></forge-listbox>
          <forge-listbox id="target" allow-drop-from="source-a"></forge-listbox>
        </div>
      `);
      const source = screen.container.querySelector('#source-a') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;

      expect(target.allowDropFromElements).toEqual([source]);
    });

    it('should prefer explicitly set allowDropFromElements over the attribute-derived list', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source-a"></forge-listbox>
          <forge-listbox id="source-b"></forge-listbox>
          <forge-listbox id="target" allow-drop-from="source-a"></forge-listbox>
        </div>
      `);
      const sourceB = screen.container.querySelector('#source-b') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;

      target.allowDropFromElements = [sourceB];

      expect(target.allowDropFromElements).toEqual([sourceB]);
    });
  });

  describe('drag and drop', () => {
    it('should dispatch forge-listbox-drop and forge-listbox-drag-out when reordering within a reorderable listbox', async () => {
      const ctx = await createFixture();
      ctx.element.reorderable = true;
      await ctx.element.updateComplete;

      const dropSpy = vi.fn();
      const dragOutSpy = vi.fn();
      ctx.element.addEventListener('forge-listbox-drop', dropSpy);
      ctx.element.addEventListener('forge-listbox-drag-out', dragOutSpy);

      const dataTransfer = createDataTransfer();
      const targetY = clientYForIndex(ctx.element, 3);

      dispatchDrag(ctx.options[0], 'dragstart', { dataTransfer });
      dispatchDrag(ctx.element, 'dragenter', { dataTransfer, clientY: targetY });
      dispatchDrag(ctx.element, 'dragover', { dataTransfer, clientY: targetY });
      dispatchDrag(ctx.element, 'drop', { dataTransfer, clientY: targetY });

      expect(dropSpy).toHaveBeenCalledOnce();
      expect(dragOutSpy).toHaveBeenCalledOnce();

      const detail = dropSpy.mock.calls[0][0].detail as IListboxDropData;
      expect(detail.option).toBe(ctx.options[0]);
      expect(detail.source).toBe(ctx.element);
    });

    it('should show a placeholder while dragging over the listbox and remove it on drag leave', async () => {
      const ctx = await createFixture();
      ctx.element.reorderable = true;
      await ctx.element.updateComplete;

      const dataTransfer = createDataTransfer();
      dispatchDrag(ctx.options[0], 'dragstart', { dataTransfer });
      dispatchDrag(ctx.element, 'dragenter', { dataTransfer, clientY: clientYForIndex(ctx.element, 1) });

      expect(ctx.element.querySelector('.forge-listbox-placeholder')).toBeTruthy();

      dispatchDrag(ctx.element, 'dragleave', { dataTransfer });

      expect(ctx.element.querySelector('.forge-listbox-placeholder')).toBeNullable();

      dispatchDrag(ctx.options[0], 'dragend', { dataTransfer });
    });

    it('should include the target group when dropping over an option group', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">Option 1</forge-option>
          <forge-option-group>
            <div slot="label">Group</div>
            <forge-option value="2">Option 2</forge-option>
            <forge-option value="3">Option 3</forge-option>
          </forge-option-group>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      const dropSpy = vi.fn();
      ctx.element.addEventListener('forge-listbox-drop', dropSpy);

      const group = ctx.groups[0];
      const groupRect = group.getBoundingClientRect();
      const dataTransfer = createDataTransfer();

      dispatchDrag(ctx.options[0], 'dragstart', { dataTransfer });
      dispatchDrag(ctx.element, 'dragenter', {
        dataTransfer,
        clientX: groupRect.left + 1,
        clientY: groupRect.top + 1
      });
      dispatchDrag(ctx.element, 'drop', {
        dataTransfer,
        clientX: groupRect.left + 1,
        clientY: groupRect.top + 1
      });

      const detail = dropSpy.mock.calls[0][0].detail as IListboxDropData;
      expect(detail.group).toBe(group);
    });

    it('should not allow a drop from a listbox that is not an allowed source', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source">
            <forge-option value="1">Option 1</forge-option>
          </forge-listbox>
          <forge-listbox id="target" reorderable>
            <forge-option value="a">Option A</forge-option>
          </forge-listbox>
        </div>
      `);
      const source = screen.container.querySelector('#source') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;
      await Promise.all([source.updateComplete, target.updateComplete]);

      const dropSpy = vi.fn();
      target.addEventListener('forge-listbox-drop', dropSpy);

      const sourceOption = source.querySelector('forge-option') as OptionComponent;
      const dataTransfer = createDataTransfer();

      dispatchDrag(sourceOption, 'dragstart', { dataTransfer });
      dispatchDrag(target, 'dragenter', { dataTransfer, clientY: clientYForIndex(target, 0) });
      dispatchDrag(target, 'drop', { dataTransfer, clientY: clientYForIndex(target, 0) });
      dispatchDrag(sourceOption, 'dragend', { dataTransfer });

      expect(dropSpy).not.toHaveBeenCalled();
    });

    it('should allow drag out to a listbox that permits drops from the source', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source" allow-drag-out>
            <forge-option value="1">Option 1</forge-option>
          </forge-listbox>
          <forge-listbox id="target">
            <forge-option value="a">Option A</forge-option>
          </forge-listbox>
        </div>
      `);
      const source = screen.container.querySelector('#source') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;
      await Promise.all([source.updateComplete, target.updateComplete]);
      target.allowDropFromElements = [source];
      await target.updateComplete;

      const dropSpy = vi.fn();
      target.addEventListener('forge-listbox-drop', dropSpy);

      const sourceOption = source.querySelector('forge-option') as OptionComponent;
      const dataTransfer = createDataTransfer();
      const targetY = clientYForIndex(target, 1);

      dispatchDrag(sourceOption, 'dragstart', { dataTransfer });
      dispatchDrag(target, 'dragenter', { dataTransfer, clientY: targetY });
      dispatchDrag(target, 'drop', { dataTransfer, clientY: targetY });

      expect(dropSpy).toHaveBeenCalledOnce();
      const detail = dropSpy.mock.calls[0][0].detail as IListboxDropData;
      expect(detail.source).toBe(source);
      expect(detail.option).toBe(sourceOption);
    });
  });
});
