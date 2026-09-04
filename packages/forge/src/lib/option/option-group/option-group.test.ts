import { html } from 'lit';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { ListboxComponent } from '../../listbox/listbox.js';
import { OptionGroupComponent } from './option-group.js';

import './option-group.js';
import '../option/option.js';
import '../../listbox/listbox.js';

async function createStandaloneFixture(template = html`<forge-option-group label="Group"></forge-option-group>`): Promise<OptionGroupComponent> {
  const screen = render(template);
  const group = screen.container.querySelector('forge-option-group') as OptionGroupComponent;
  await group.updateComplete;
  return group;
}

async function createListboxFixture(
  template = html`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Group label</div>
        <forge-option value="1">Option 1</forge-option>
      </forge-option-group>
    </forge-listbox>
  `
): Promise<{ listbox: ListboxComponent; group: OptionGroupComponent }> {
  const screen = render(template);
  const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;
  await listbox.updateComplete;
  const group = listbox.querySelector('forge-option-group') as OptionGroupComponent;
  await group.updateComplete;
  return { listbox, group };
}

describe('OptionGroup', () => {
  it('should render with correct default values', async () => {
    const screen = render(html`<forge-option-group></forge-option-group>`);
    const group = screen.container.querySelector('forge-option-group') as OptionGroupComponent;
    await group.updateComplete;

    expect(group.label).toBe('');
    expect(group.text).toBe('');
    expect(group.options).toBeUndefined();
    expect(group.builder).toBeUndefined();
    expect(group.value).toBeUndefined();
  });

  describe('config-only mode (standalone)', () => {
    it('should render in light DOM without a shadow root', async () => {
      const group = await createStandaloneFixture();
      expect(group.shadowRoot).toBeNull();
    });

    it('should not throw when connected outside of a listbox', async () => {
      const group = await createStandaloneFixture();
      expect(group.label).toBe('Group');
    });

    it('should accept an options array, builder, and value programmatically', async () => {
      const group = await createStandaloneFixture();
      const options = [{ label: 'A', value: 'a' }];
      const builder = (): HTMLElement => document.createElement('div');

      group.options = options;
      group.builder = builder;
      group.value = 'group-value';

      expect(group.options).toBe(options);
      expect(group.builder).toBe(builder);
      expect(group.value).toBe('group-value');
    });
  });

  describe('label and text', () => {
    it('should accept a label attribute', async () => {
      const group = await createStandaloneFixture();
      expect(group.label).toBe('Group');
      expect(group.getAttribute('label')).toBe('Group');
    });

    it('should reflect label changes to the attribute', async () => {
      const group = await createStandaloneFixture();
      group.label = 'Updated';
      await group.updateComplete;
      expect(group.getAttribute('label')).toBe('Updated');
    });

    it('should get and set label via the text alias', async () => {
      const group = await createStandaloneFixture();
      expect(group.text).toBe('Group');

      group.text = 'Via text setter';
      expect(group.label).toBe('Via text setter');
      expect(group.text).toBe('Via text setter');
    });
  });

  describe('shadow DOM mode (within a listbox)', () => {
    it('should render a shadow root', async () => {
      const { group } = await createListboxFixture();
      expect(group.shadowRoot).not.toBeNull();
    });

    it('should set role to group', async () => {
      const { group } = await createListboxFixture();
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should render the slotted label content', async () => {
      const { group } = await createListboxFixture();
      const labelContainer = group.shadowRoot?.querySelector('.label');
      const slot = labelContainer?.querySelector('slot[name="label"]') as HTMLSlotElement;

      expect(labelContainer?.getAttribute('role')).toBe('presentation');
      expect(slot).toBeTruthy();
      const assigned = slot.assignedElements();
      expect(assigned[0].textContent).toBe('Group label');
    });

    it('should render a label element to associate with the group', async () => {
      const { group } = await createListboxFixture();
      const labelElement = group.shadowRoot?.querySelector('#label');
      expect(labelElement).toBeTruthy();
    });

    it('should render slotted options', async () => {
      const { group } = await createListboxFixture();
      const option = group.querySelector('forge-option');
      expect(option?.textContent).toBe('Option 1');
    });
  });
});
