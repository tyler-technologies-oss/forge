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

function dispatchCommand(target: EventTarget, command: string): void {
  const event = new Event('command', { bubbles: true, cancelable: true }) as Event & { command: string };
  event.command = command;
  target.dispatchEvent(event);
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
    expect(ctx.element.dragLink).toBe('');
    expect(ctx.element.dragLink).toBe('');
    expect(ctx.element.disabled).toBe(false);
    expect(ctx.element.allowDeselect).toBe(false);
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

    it('should set aria-orientation to vertical to match actual keyboard navigation behavior', async () => {
      const ctx = await createFixture();
      expect(ctx.element.getAttribute('aria-orientation')).toBe('vertical');
    });
  });

  describe('tabindex', () => {
    it('should be focusable by default', async () => {
      const ctx = await createFixture();
      expect(ctx.element.tabIndex).toBe(0);
    });

    it('should not be focusable when disabled', async () => {
      const ctx = await createFixture();
      ctx.element.disabled = true;
      await ctx.element.updateComplete;

      expect(ctx.element.tabIndex).toBe(-1);
    });

    it('should be focusable again when re-enabled', async () => {
      const ctx = await createFixture();
      ctx.element.disabled = true;
      await ctx.element.updateComplete;
      ctx.element.disabled = false;
      await ctx.element.updateComplete;

      expect(ctx.element.tabIndex).toBe(0);
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

    it('should expose the prospective value to change listeners before the selection is committed', async () => {
      const ctx = await createFixture();
      let valueDuringChange: string | string[] | undefined;
      ctx.element.addEventListener('change', () => {
        valueDuringChange = ctx.element.value;
      });

      await userEvent.click(ctx.options[0]);

      expect(valueDuringChange).toBe('1');
    });

    it('should revert the selection when change is cancelled', async () => {
      const ctx = await createFixture();
      ctx.element.addEventListener('change', evt => evt.preventDefault());

      await userEvent.click(ctx.options[0]);

      expect(ctx.element.value).toBe('');
      expect(ctx.options[0].selected).toBe(false);
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

    it('should move focus to and toggle selection of the next option with Shift+ArrowDown', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.focus();

      await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[1].id);
      expect(ctx.element.value).toEqual(['2']);

      await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[2].id);
      expect(ctx.element.value).toEqual(['2', '3']);
    });

    it('should move focus to and toggle selection of the previous option with Shift+ArrowUp', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.focus();

      await userEvent.keyboard('{End}');
      await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[1].id);
      expect(ctx.element.value).toEqual(['2']);
    });

    it('should not toggle selection with Shift+ArrowDown/Up when not multiple', async () => {
      const ctx = await createFixture();
      ctx.element.focus();

      await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');

      expect(ctx.element.value).toBe('');
    });

    it('should select contiguous items from the last selected item to the focused item with Shift+Space', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.focus();

      await userEvent.keyboard(' ');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Shift>} {/Shift}');

      expect(ctx.element.value).toEqual(['1', '2', '3']);
    });

    it('should revert a range selection when change is cancelled', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.addEventListener('change', evt => evt.preventDefault());
      ctx.element.focus();

      await userEvent.keyboard(' ');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Shift>} {/Shift}');

      expect(ctx.element.value).toBe('');
    });

    it('should dispatch input and revert selection when Ctrl+A change is cancelled', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      const inputSpy = vi.fn();
      ctx.element.addEventListener('input', inputSpy);
      ctx.element.addEventListener('change', evt => evt.preventDefault());
      ctx.element.focus();

      await userEvent.keyboard('{Control>}a{/Control}');

      expect(inputSpy).toHaveBeenCalledOnce();
      expect(ctx.element.value).toBe('');
    });

    it('should select the focused option and all options up to the first with Ctrl+Shift+Home', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.focus();

      await userEvent.keyboard('{End}');
      await userEvent.keyboard('{Control>}{Shift>}{Home}{/Shift}{/Control}');

      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[0].id);
      expect(ctx.element.value).toEqual(['1', '2', '3']);
    });

    it('should select the focused option and all options down to the last with Ctrl+Shift+End', async () => {
      const ctx = await createFixture();
      ctx.element.multiple = true;
      ctx.element.focus();

      await userEvent.keyboard('{Control>}{Shift>}{End}{/Shift}{/Control}');

      expect(ctx.element.getAttribute('aria-activedescendant')).toBe(ctx.options[2].id);
      expect(ctx.element.value).toEqual(['1', '2', '3']);
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

    it('should not wipe a declared value attribute when no option is declaratively selected', async () => {
      const screen = render(html`
        <forge-listbox value="2">
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;
      await task();

      expect(listbox.value).toBe('2');
      const options = Array.from(listbox.querySelectorAll<OptionComponent>('forge-option'));
      expect(options[1].selected).toBe(true);
      expect(options[0].selected).toBe(false);
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

    it('should retain a custom validity message across unrelated value/required/name updates', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1">Option 1</forge-option>
        </forge-listbox>
      `);
      ctx.element.setCustomValidity('Custom error');

      ctx.element.required = true;
      await ctx.element.updateComplete;

      expect(ctx.element.checkValidity()).toBe(false);
      expect(ctx.element.validationMessage).toBe('Custom error');
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

    it('should not submit an empty-name entry when the listbox has no name', async () => {
      const screen = render(html`
        <form>
          <forge-listbox></forge-listbox>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;

      listbox.value = '1';
      await listbox.updateComplete;
      const formData = new FormData(form);

      expect(Array.from(formData.keys())).not.toContain('');
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

  describe('dragLinkElements', () => {
    it('should compute allowed drop sources from the drag-link attribute', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source-a"></forge-listbox>
          <forge-listbox id="target" drag-link="source-a"></forge-listbox>
        </div>
      `);
      const source = screen.container.querySelector('#source-a') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;

      expect(target.dragLinkElements).toEqual([source]);
    });

    it('should prefer explicitly set dragLinkElements over the attribute-derived list', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source-a"></forge-listbox>
          <forge-listbox id="source-b"></forge-listbox>
          <forge-listbox id="target" drag-link="source-a"></forge-listbox>
        </div>
      `);
      const sourceB = screen.container.querySelector('#source-b') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;

      target.dragLinkElements = [sourceB];

      expect(target.dragLinkElements).toEqual([sourceB]);
    });

    it('should not throw and return an empty array for a whitespace-only drag-link value', async () => {
      const ctx = await createFixture(html`<forge-listbox drag-link="   "></forge-listbox>`);

      expect(() => ctx.element.dragLinkElements).not.toThrow();
      expect(ctx.element.dragLinkElements).toEqual([]);
    });

    it('should reconfigure the drop controller when dragLink is set after connection', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source-a"></forge-listbox>
          <forge-listbox id="target"></forge-listbox>
        </div>
      `);
      const source = screen.container.querySelector('#source-a') as ListboxComponent;
      const target = screen.container.querySelector('#target') as ListboxComponent;
      await target.updateComplete;

      target.dragLink = 'source-a';
      await target.updateComplete;

      expect(target.dragLinkElements).toEqual([source]);
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

    it('should compute the insertion index from direct children, not nested descendants', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">
            <forge-icon name="star" slot="start"></forge-icon>
            <span slot="secondary-label">Secondary</span>
            Option 1
          </forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      const dropSpy = vi.fn();
      ctx.element.addEventListener('forge-listbox-drop', dropSpy);

      const dataTransfer = createDataTransfer();
      const targetY = clientYForIndex(ctx.element, 2);

      dispatchDrag(ctx.options[2], 'dragstart', { dataTransfer });
      dispatchDrag(ctx.element, 'dragenter', { dataTransfer, clientY: targetY });
      dispatchDrag(ctx.element, 'drop', { dataTransfer, clientY: targetY });

      const detail = dropSpy.mock.calls[0][0].detail as IListboxDropData;
      expect(detail.index).toBe(2);
    });

    it('should not count the placeholder itself when recalculating the insertion index on dragover', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      const dropSpy = vi.fn();
      ctx.element.addEventListener('forge-listbox-drop', dropSpy);

      const dataTransfer = createDataTransfer();
      const targetY = clientYForIndex(ctx.element, 2);

      dispatchDrag(ctx.options[0], 'dragstart', { dataTransfer });
      dispatchDrag(ctx.element, 'dragenter', { dataTransfer, clientY: targetY });
      // The placeholder is now a direct child of the listbox; a subsequent dragover at the same
      // position should still resolve to the same index, not be shifted by the placeholder itself.
      dispatchDrag(ctx.element, 'dragover', { dataTransfer, clientY: targetY });
      dispatchDrag(ctx.element, 'drop', { dataTransfer, clientY: targetY });

      const detail = dropSpy.mock.calls[0][0].detail as IListboxDropData;
      expect(detail.index).toBe(2);
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

    it('should allow drag out when both the source and target mutually opt in via dropLink/dragLink', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source">
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
      source.dragLinkElements = [target];
      target.dropLinkElements = [source];
      await Promise.all([source.updateComplete, target.updateComplete]);

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

    it('should not allow drag out when only the target opts in via dragLink but the source does not opt in via dropLink', async () => {
      const screen = render(html`
        <div>
          <forge-listbox id="source">
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
      target.dragLinkElements = [source];
      await target.updateComplete;

      const dropSpy = vi.fn();
      target.addEventListener('forge-listbox-drop', dropSpy);

      const sourceOption = source.querySelector('forge-option') as OptionComponent;
      const dataTransfer = createDataTransfer();
      const targetY = clientYForIndex(target, 1);

      dispatchDrag(sourceOption, 'dragstart', { dataTransfer });
      dispatchDrag(target, 'dragenter', { dataTransfer, clientY: targetY });
      dispatchDrag(target, 'drop', { dataTransfer, clientY: targetY });

      expect(dropSpy).not.toHaveBeenCalled();
    });
  });

  describe('shiftSelectedOptionUp/Down', () => {
    it('should do nothing when no option is selected', async () => {
      const ctx = await createFixture();

      expect(() => ctx.element.shiftSelectedOptionUp()).not.toThrow();
      expect(() => ctx.element.shiftSelectedOptionDown()).not.toThrow();
      expect(ctx.options.map(opt => opt.value)).toEqual(['1', '2', '3']);
    });

    it('should swap a selected option with its previous sibling when shifting up', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionUp();

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['2', '1', '3']);
    });

    it('should swap a selected option with its next sibling when shifting down', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionDown();

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '3', '2']);
    });

    it('should do nothing when shifting up a selected option that is already first', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1" selected>Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionUp();

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '2', '3']);
    });

    it('should do nothing when shifting down a selected option that is already last', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3" selected>Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionDown();

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '2', '3']);
    });

    it('should move a selected option out of its group when shifting up from the first position in the group', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1">Option 1</forge-option>
          <forge-option-group>
            <div slot="label">Group</div>
            <forge-option value="2" selected>Option 2</forge-option>
            <forge-option value="3">Option 3</forge-option>
          </forge-option-group>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionUp();

      const topLevel = Array.from(ctx.element.children);
      expect(topLevel.map(el => el.tagName.toLowerCase())).toEqual(['forge-option', 'forge-option', 'forge-option-group']);
      expect((topLevel[1] as OptionComponent).value).toBe('2');
      expect(ctx.groups[0].querySelectorAll('forge-option')).toHaveLength(1);
      expect((ctx.groups[0].querySelector('forge-option') as OptionComponent).value).toBe('3');
    });

    it('should move a selected option out of its group when shifting down from the last position in the group', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option-group>
            <div slot="label">Group</div>
            <forge-option value="1">Option 1</forge-option>
            <forge-option value="2" selected>Option 2</forge-option>
          </forge-option-group>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionDown();

      const topLevel = Array.from(ctx.element.children);
      expect(topLevel.map(el => el.tagName.toLowerCase())).toEqual(['forge-option-group', 'forge-option', 'forge-option']);
      expect((topLevel[1] as OptionComponent).value).toBe('2');
      expect(ctx.groups[0].querySelectorAll('forge-option')).toHaveLength(1);
      expect((ctx.groups[0].querySelector('forge-option') as OptionComponent).value).toBe('1');
    });

    it('should move a selected option into the previous group as its last option when shifting up', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option-group>
            <div slot="label">Group</div>
            <forge-option value="1">Option 1</forge-option>
            <forge-option value="2">Option 2</forge-option>
          </forge-option-group>
          <forge-option value="3" selected>Option 3</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionUp();

      expect(Array.from(ctx.element.children).map(el => el.tagName.toLowerCase())).toEqual(['forge-option-group']);
      const groupOptions = Array.from(ctx.groups[0].querySelectorAll('forge-option')).map(opt => (opt as OptionComponent).value);
      expect(groupOptions).toEqual(['1', '2', '3']);
    });

    it('should move a selected option into the next group as its first option when shifting down', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1" selected>Option 1</forge-option>
          <forge-option-group>
            <div slot="label">Group</div>
            <forge-option value="2">Option 2</forge-option>
            <forge-option value="3">Option 3</forge-option>
          </forge-option-group>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionDown();

      expect(Array.from(ctx.element.children).map(el => el.tagName.toLowerCase())).toEqual(['forge-option-group']);
      const groupOptions = Array.from(ctx.groups[0].querySelectorAll('forge-option')).map(opt => (opt as OptionComponent).value);
      expect(groupOptions).toEqual(['1', '2', '3']);
    });

    it('should shift a contiguous block of selected options up together, preserving their relative order', async () => {
      const ctx = await createFixture(html`
        <forge-listbox multiple>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3" selected>Option 3</forge-option>
          <forge-option value="4">Option 4</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionUp();

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['2', '3', '1', '4']);
    });

    it('should shift a contiguous block of selected options down together, preserving their relative order', async () => {
      const ctx = await createFixture(html`
        <forge-listbox multiple>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3" selected>Option 3</forge-option>
          <forge-option value="4">Option 4</forge-option>
        </forge-listbox>
      `);

      ctx.element.shiftSelectedOptionDown();

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '4', '2', '3']);
    });
  });

  describe('--shift-up/--shift-down commands', () => {
    it('should shift the selected option up when a --shift-up command is received while reorderable', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      dispatchCommand(ctx.element, '--shift-up');

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['2', '1', '3']);
    });

    it('should shift the selected option down when a --shift-down command is received while reorderable', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      dispatchCommand(ctx.element, '--shift-down');

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '3', '2']);
    });

    it('should ignore unrelated command values', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      dispatchCommand(ctx.element, '--toggle');

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '2', '3']);
    });

    it('should not respond to --shift-up/--shift-down commands when not reorderable', async () => {
      const ctx = await createFixture(html`
        <forge-listbox>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      dispatchCommand(ctx.element, '--shift-up');
      dispatchCommand(ctx.element, '--shift-down');

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '2', '3']);
    });

    it('should stop responding to commands after reorderable is turned off', async () => {
      const ctx = await createFixture(html`
        <forge-listbox reorderable>
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2" selected>Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      `);
      await ctx.element.updateComplete;

      ctx.element.reorderable = false;
      await ctx.element.updateComplete;

      dispatchCommand(ctx.element, '--shift-up');

      expect(Array.from(ctx.element.children).map(el => (el as OptionComponent).value)).toEqual(['1', '2', '3']);
    });
  });
});
