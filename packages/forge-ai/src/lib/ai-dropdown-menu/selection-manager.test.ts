import { describe, expect, it } from 'vitest';
import { SelectionManager, type DropdownChangeEventDetail, type DropdownMenuSelectionMode } from './selection-manager.js';
import type { ForgeAiDropdownMenuItemComponent } from './ai-dropdown-menu-item.js';

function makeItems(values: string[]): ForgeAiDropdownMenuItemComponent[] {
  return values.map(
    value => ({ value, selected: false, selectionMode: 'none', labelText: value.toUpperCase() }) as unknown as ForgeAiDropdownMenuItemComponent
  );
}

function setup(
  mode: DropdownMenuSelectionMode,
  config: { closeOnSingleSelect?: boolean; showSelectionCount?: boolean } = {}
): { items: ForgeAiDropdownMenuItemComponent[]; manager: SelectionManager; changes: DropdownChangeEventDetail[] } {
  const items = makeItems(['a', 'b', 'c']);
  const changes: DropdownChangeEventDetail[] = [];
  const manager = new SelectionManager(
    () => items,
    detail => changes.push(detail),
    { mode, ...config }
  );
  return { items, manager, changes };
}

describe('SelectionManager', () => {
  it('should expose the configured selection mode and update items when it changes', () => {
    const { manager, items } = setup('single');
    expect(manager.selectionMode).toBe('single');

    manager.selectionMode = 'multi';

    expect(manager.selectionMode).toBe('multi');
    expect(items.every(i => i.selectionMode === 'multi')).toBe(true);
  });

  it('should apply selected state to items when value is set', () => {
    const { manager, items } = setup('multi');

    manager.value = ['a', 'c'];

    expect(items.map(i => i.selected)).toEqual([true, false, true]);
    expect(manager.value).toEqual(['a', 'c']);
  });

  it('should apply a string value to items', () => {
    const { manager, items } = setup('single');

    manager.value = 'b';

    expect(items.map(i => i.selected)).toEqual([false, true, false]);
  });

  it('should emit an action detail and request close in none mode', () => {
    const { manager, items, changes } = setup('none');

    const result = manager.selectItem(items[1]);

    expect(result.shouldClose).toBe(true);
    expect(changes[0]).toMatchObject({ selectionMode: 'none', value: 'b', selectedItem: items[1] });
  });

  it('should treat an empty item value as an empty string', () => {
    const { manager, items, changes } = setup('none');
    items[0].value = '';

    manager.selectItem(items[0]);

    expect(changes[0]).toMatchObject({ value: '' });
  });

  it('should not close after single selection when closeOnSingleSelect is false', () => {
    const { manager, items } = setup('single', { closeOnSingleSelect: false });

    expect(manager.selectItem(items[0]).shouldClose).toBe(false);
  });

  it('should close after single selection by default', () => {
    const { manager, items } = setup('single');

    expect(manager.selectItem(items[0]).shouldClose).toBe(true);
  });

  it('should track the previous value across single selections', () => {
    const { manager, items, changes } = setup('single');

    manager.selectItem(items[0]);
    manager.selectItem(items[1]);

    expect(changes[1]).toMatchObject({ value: 'b', previousValue: 'a' });
  });

  it('should add and remove values in multi mode and keep the menu open', () => {
    const { manager, items, changes } = setup('multi');

    expect(manager.selectItem(items[0]).shouldClose).toBe(false);
    manager.selectItem(items[1]);
    manager.selectItem(items[0]);

    expect(manager.value).toEqual(['b']);
    expect(changes[2]).toMatchObject({ selectionMode: 'multi', value: ['b'], removedItems: [items[0]] });
    expect((changes[2] as { addedItems?: unknown }).addedItems).toBeUndefined();
  });

  it('should return no text in none mode', () => {
    const { manager } = setup('none');
    manager.value = 'a';

    expect(manager.getSelectedText()).toBe('');
    expect(manager.shouldShowSelectedText()).toBe(false);
  });

  it('should return an empty string when nothing is selected', () => {
    const { manager } = setup('single');

    expect(manager.getSelectedText()).toBe('');
    expect(manager.shouldShowSelectedText()).toBe(false);
  });

  it('should return the selected label in single mode', () => {
    const { manager } = setup('single');
    manager.value = 'b';

    expect(manager.getSelectedText()).toBe('B');
    expect(manager.shouldShowSelectedText()).toBe(true);
  });

  it('should return counts in multi mode', () => {
    const { manager } = setup('multi');
    manager.value = ['a'];
    expect(manager.getSelectedText()).toBe('1 option selected');
    manager.value = ['a', 'b'];
    expect(manager.getSelectedText()).toBe('2 options selected');
  });

  it('should return no text in multi mode when showSelectionCount is off', () => {
    const { manager } = setup('multi', { showSelectionCount: false });
    manager.value = ['a'];

    expect(manager.getSelectedText()).toBe('');
    expect(manager.shouldShowSelectedText()).toBe(false);
  });

  it('should return the selected items', () => {
    const { manager, items } = setup('multi');
    manager.value = ['a', 'c'];

    expect(manager.getSelectedItems()).toEqual([items[0], items[2]]);
  });

  it('should merge config through updateConfig', () => {
    const { manager, items } = setup('single');
    manager.updateConfig({ mode: 'multi' });

    expect(manager.selectionMode).toBe('multi');
    expect(items.every(i => i.selectionMode === 'multi')).toBe(true);
  });

  it('should clear the value on reset', () => {
    const { manager, items } = setup('multi');
    manager.value = ['a'];

    manager.reset();

    expect(manager.value).toBeNull();
    expect(items.every(i => !i.selected)).toBe(true);
  });

  it('should do nothing for an unknown selection mode', () => {
    const { manager, items, changes } = setup('none');
    manager.updateConfig({ mode: 'bogus' as DropdownMenuSelectionMode });

    const result = manager.selectItem(items[0]);

    expect(result.shouldClose).toBe(false);
    expect(changes).toHaveLength(0);
  });
});
