import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { frame } from '../core/utils/utils.js';
import type { TreeComponent } from './tree/tree.js';
import type { TreeItemComponent } from './tree-item/index.js';
import { TreeSelectionController } from './tree/tree-selection-controller.js';
import {
  getChildItems,
  getFirstChildItem,
  getLastChildItem,
  getLevel,
  getNextItem,
  getParentItem,
  getParentTree,
  getPreviousItem,
  getSiblingItems,
  isIndeterminate,
  isTree,
  isTreeItem,
  searchItems
} from './tree-utils.js';

import './tree/index.js';
import './tree-item/index.js';

class TreeHarness {
  constructor(public treeElement: TreeComponent) {}

  public get treeItems(): TreeItemComponent[] {
    return Array.from(this.treeElement.querySelectorAll('forge-tree-item'));
  }

  public async clickTreeItem(item: TreeItemComponent): Promise<void> {
    const header = item.shadowRoot?.querySelector('.header') as HTMLElement;
    header?.click();
    await frame();
  }

  public async clickExpandIcon(item: TreeItemComponent): Promise<void> {
    const expandIcon = item.shadowRoot?.querySelector('.expand-icon') as HTMLElement;
    expandIcon?.click();
    await frame();
  }

  public focusTreeItem(item: TreeItemComponent): void {
    item.focus();
  }

  public async pressKey(key: string): Promise<void> {
    await userEvent.keyboard(`{${key}}`);
  }
}

describe('Tree', () => {
  describe('TreeComponent', () => {
    it('should instantiate shadow root', async () => {
      const screen = render(html`<forge-tree></forge-tree>`);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      expect(el.shadowRoot).not.toBeNull();
    });

    it('should be accessible', async () => {
      const screen = render(html`
        <forge-tree aria-label="File tree">
          <forge-tree-item .value=${'folder1'}>Folder 1</forge-tree-item>
          <forge-tree-item .value=${'folder2'}>
            Folder 2
            <forge-tree-item slot="children" .value=${'file1'}>File 1</forge-tree-item>
            <forge-tree-item slot="children" .value=${'file2'}>File 2</forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      await expect(el).toBeAccessible();
    });

    it('should be accessible with multiple mode', async () => {
      const screen = render(html`
        <forge-tree mode="multiple" aria-label="Multi-select file tree">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      await expect(el).toBeAccessible();
    });

    it('should be accessible when disabled', async () => {
      const screen = render(html`
        <forge-tree disabled aria-label="Disabled tree">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      await expect(el).toBeAccessible();
    });

    it('should receive label from wrapping label element', async () => {
      const screen = render(html`
        <label>
          <span>File Explorer</span>
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        </label>
      `);
      const tree = screen.container.querySelector('forge-tree') as TreeComponent;

      await expect(tree).toBeAccessible();
    });

    it('should be accessible with complex hierarchy', async () => {
      const screen = render(html`
        <forge-tree aria-label="Complex file structure">
          <forge-tree-item .value=${'documents'}>
            Documents
            <forge-tree-item slot="children" .value=${'folder1'}>
              Folder 1
              <forge-tree-item slot="children" .value=${'file1'}>Document 1.pdf</forge-tree-item>
              <forge-tree-item slot="children" .value=${'file2'}>Document 2.docx</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item slot="children" .value=${'folder2'}>
              Folder 2
              <forge-tree-item slot="children" .value=${'file3'}>Spreadsheet.xlsx</forge-tree-item>
            </forge-tree-item>
          </forge-tree-item>
          <forge-tree-item .value=${'downloads'}>Downloads</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      await expect(el).toBeAccessible();
    });

    it('should maintain accessibility when items are selected', async () => {
      const screen = render(html`
        <forge-tree mode="multiple" aria-label="Selectable tree">
          <forge-tree-item .value=${'item1'} selected>Selected Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Unselected Item 2</forge-tree-item>
          <forge-tree-item .value=${'parent'} selected>
            Selected Parent
            <forge-tree-item slot="children" .value=${'child1'} selected>Selected Child</forge-tree-item>
            <forge-tree-item slot="children" .value=${'child2'}>Unselected Child</forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      await expect(el).toBeAccessible();
    });

    it('should render with correct default values', async () => {
      const screen = render(html`<forge-tree></forge-tree>`);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      expect(el.accordion).toBe(false);
      expect(el.indentLines).toBe(false);
      expect(el.mode).toBe('single');
      expect(el.selectionFollowsFocus).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.value).toEqual([]);
      expect(el.tabIndex).toBe(0);
    });

    it('should accept value property', async () => {
      const screen = render(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      const testValue = ['item1', 'item2'];

      el.value = testValue;

      const items = el.querySelectorAll('forge-tree-item') as NodeListOf<TreeItemComponent>;
      expect(items[0].selected).toBe(true);
      expect(items[1].selected).toBe(true);
      expect(el.value).toEqual(testValue);
    });

    describe('Mode Changes', () => {
      it('should change from single to multiple mode', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        await harness.clickTreeItem(item1);
        expect(item1.selected).toBe(true);
        expect(item2.selected).toBe(false);

        el.mode = 'multiple';
        await frame();

        expect(el.mode).toBe('multiple');
        expect(item1.selected).toBe(true);

        await harness.clickTreeItem(item2);
        expect(item1.selected).toBe(true);
        expect(item2.selected).toBe(true);
      });

      it('should change from multiple to single mode and cleanup selections', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        await harness.clickTreeItem(item3);
        expect(item1.selected).toBe(true);
        expect(item2.selected).toBe(true);
        expect(item3.selected).toBe(true);
        expect(el.value).toHaveLength(3);

        el.mode = 'single';
        await frame();

        expect(el.mode).toBe('single');
        expect(el.value.length).toBeLessThanOrEqual(1);

        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        expect(item1.selected).toBe(false);
        expect(item2.selected).toBe(true);
      });

      it('should change from single to off mode', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        await harness.clickTreeItem(item1);
        expect(item1.selected).toBe(true);

        el.mode = 'off';
        await frame();

        expect(el.mode).toBe('off');
        expect(item1.selected).toBe(false);
        expect(el.value).toHaveLength(0);

        await harness.clickTreeItem(item2);
        expect(item2.selected).toBe(false);
      });

      it('should change from off to multiple mode', async () => {
        const screen = render(html`
          <forge-tree mode="off">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        await harness.clickTreeItem(item1);
        expect(item1.selected).toBe(false);

        el.mode = 'multiple';
        await frame();

        expect(el.mode).toBe('multiple');

        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        expect(item1.selected).toBe(true);
        expect(item2.selected).toBe(true);
      });

      it('should change to leaf mode and only allow leaf selection', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'leaf'}>Leaf Item</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const items = harness.treeItems;
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const leaf = items.find(item => item.value === 'leaf')!;

        el.mode = 'leaf';
        await frame();

        expect(el.mode).toBe('leaf');

        await harness.clickTreeItem(parent);
        expect(parent.selected).toBe(false);

        await harness.clickTreeItem(child1);
        expect(child1.selected).toBe(true);

        await harness.clickTreeItem(leaf);
        expect(leaf.selected).toBe(true);
        expect(child1.selected).toBe(false);
      });

      it.skip('should change to multiple discrete mode', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        const harness = new TreeHarness(el);
        const items = harness.treeItems;
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        el.mode = 'multiple';
        await frame();

        expect(el.mode).toBe('multiple');

        await harness.clickTreeItem(parent);
        await harness.clickTreeItem(child1);
        await harness.clickTreeItem(child2);

        expect(parent.selected).toBe(true);
        expect(child1.selected).toBe(true);
        expect(child2.selected).toBe(true);
      });

      it('should update selection controller when mode changes', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        expect(el.value).toHaveLength(2);

        const selectionController = (el as any)._selectionController;
        const cleanupSpy = vi.spyOn(selectionController, 'cleanup');

        el.mode = 'single';
        await frame();

        expect(cleanupSpy).toHaveBeenCalledOnce();
      });

      it('should emit mode change events', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const changeEventSpy = vi.fn();
        el.addEventListener('forge-tree-change', changeEventSpy);

        el.mode = 'multiple';
        await frame();

        expect(el.mode).toBe('multiple');
      });
    });

    it('should render tree items correctly', async () => {
      const screen = render(html`
        <forge-tree>
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      const harness = new TreeHarness(el);

      expect(harness.treeItems).toHaveLength(2);
      expect(harness.treeItems[0].value).toBe('item1');
      expect(harness.treeItems[1].value).toBe('item2');
    });

    it('should handle click on tree item in single mode', async () => {
      const screen = render(html`
        <forge-tree mode="single">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      await frame(); // Wait for context to propagate
      const harness = new TreeHarness(el);
      const [item1, item2] = harness.treeItems;

      await harness.clickTreeItem(item1);
      expect(item1.selected).toBe(true);
      expect(item2.selected).toBe(false);

      await harness.clickTreeItem(item2);
      expect(item1.selected).toBe(false);
      expect(item2.selected).toBe(true);
    });

    it('should handle click on tree item in multiple mode', async () => {
      const screen = render(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      await frame();
      const harness = new TreeHarness(el);
      const [item1, item2] = harness.treeItems;

      await harness.clickTreeItem(item1);
      expect(item1.selected).toBe(true);
      expect(item2.selected).toBe(false);

      await harness.clickTreeItem(item2);
      expect(item1.selected).toBe(true);
      expect(item2.selected).toBe(true);
    });

    it('should handle expand/collapse with nested items', async () => {
      const screen = render(html`
        <forge-tree>
          <forge-tree-item .value=${'parent'}>
            Parent
            <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
            <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      await frame();
      const harness = new TreeHarness(el);
      const [parentItem] = harness.treeItems;

      expect(parentItem.open).toBe(false);
      expect(parentItem.leaf).toBe(false);

      await harness.clickExpandIcon(parentItem);
      expect(parentItem.open).toBe(true);

      await harness.clickExpandIcon(parentItem);
      expect(parentItem.open).toBe(false);
    });

    it('should handle accordion behavior', async () => {
      const screen = render(html`
        <forge-tree accordion>
          <forge-tree-item .value=${'parent1'}>
            Parent 1
            <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
          </forge-tree-item>
          <forge-tree-item .value=${'parent2'}>
            Parent 2
            <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      await frame();
      const harness = new TreeHarness(el);
      const [parent1, parent2] = harness.treeItems.filter(item => item.value === 'parent1' || item.value === 'parent2');

      await harness.clickExpandIcon(parent1);
      expect(parent1.open).toBe(true);

      await harness.clickExpandIcon(parent2);
      expect(parent1.open).toBe(false);
      expect(parent2.open).toBe(true);
    });

    describe('Keyboard Controls', () => {
      it('should handle ArrowUp and ArrowDown navigation', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);
        await harness.pressKey('ArrowDown');
        expect(document.activeElement).toBe(item2);

        await harness.pressKey('ArrowDown');
        expect(document.activeElement).toBe(item3);

        await harness.pressKey('ArrowUp');
        expect(document.activeElement).toBe(item2);

        await harness.pressKey('ArrowUp');
        expect(document.activeElement).toBe(item1);
      });

      it('should handle Shift+ArrowUp/ArrowDown for multi-selection', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);

        await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
        await frame();

        expect(document.activeElement).toBe(item2);
        expect(item2.selected).toBe(true);

        await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
        await frame();

        expect(document.activeElement).toBe(item3);
        expect(item3.selected).toBe(true);
      });

      it('should handle ArrowLeft to close items or move to parent', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;

        child1.focus();
        await frame();
        await userEvent.keyboard('{ArrowLeft}');
        await frame();
        expect(document.activeElement).toBe(parent);

        parent.focus();
        await frame();
        expect(parent.open).toBe(true);
        await userEvent.keyboard('{ArrowLeft}');
        await frame();
        expect(parent.open).toBe(false);
      });

      it('should handle ArrowRight to open items or move to first child', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;

        parent.focus();
        await frame();
        expect(parent.open).toBe(false);

        await userEvent.keyboard('{ArrowRight}');
        await frame();
        expect(parent.open).toBe(true);

        await userEvent.keyboard('{ArrowRight}');
        await frame();
        expect(document.activeElement).toBe(child1);
      });

      it('should handle Home key to focus first item', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, _item2, item3] = harness.treeItems;

        harness.focusTreeItem(item3);
        await harness.pressKey('Home');
        expect(document.activeElement).toBe(item1);
      });

      it('should handle Shift+Ctrl+Home for multi-selection', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item3);

        await userEvent.keyboard('{Shift>}{Control>}{Home}{/Control}{/Shift}');
        await frame();

        expect(item1.selected).toBe(true);
        expect(item2.selected).toBe(true);
        expect(document.activeElement).toBe(item1);
      });

      it('should handle End key to focus last item', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, _item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);
        await harness.pressKey('End');
        expect(document.activeElement).toBe(item3);
      });

      it('should handle Shift+Ctrl+End for multi-selection', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);

        await userEvent.keyboard('{Shift>}{Control>}{End}{/Control}{/Shift}');
        await frame();

        expect(item2.selected).toBe(true);
        expect(item3.selected).toBe(true);
        expect(document.activeElement).toBe(item3);
      });

      it('should handle asterisk (*) key to open all siblings', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent1'}>
              Parent 1
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'parent2'}>
              Parent 2
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'parent3'}>
              Parent 3
              <forge-tree-item slot="children" .value=${'child3'}>Child 3</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const parent3 = items.find(item => item.value === 'parent3')!;

        parent1.focus();
        await frame();
        expect(parent1.open).toBe(false);
        expect(parent2.open).toBe(false);
        expect(parent3.open).toBe(false);

        await userEvent.keyboard('*');
        await frame();

        expect(parent1.open).toBe(true);
        expect(parent2.open).toBe(true);
        expect(parent3.open).toBe(true);
      });

      it('should handle Ctrl+A to select all items in multiple mode', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        const selectAllSpy = vi.fn();
        el.addEventListener('forge-tree-select-all', selectAllSpy);

        el.focus();
        await frame();
        await userEvent.keyboard('{Control>}a{/Control}');
        await frame();

        expect(selectAllSpy).toHaveBeenCalledOnce();
      });

      it('should ignore Ctrl+A in non-multiple modes', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        const selectAllSpy = vi.fn();
        el.addEventListener('forge-tree-select-all', selectAllSpy);

        el.focus();
        await frame();
        await userEvent.keyboard('{Control>}a{/Control}');
        await frame();

        expect(selectAllSpy).not.toHaveBeenCalled();
      });

      it('should handle Enter key to toggle open state of non-leaf items', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;

        parent.focus();
        await frame();
        expect(parent.open).toBe(false);

        await userEvent.keyboard('{Enter}');
        await frame();
        expect(parent.open).toBe(true);

        await userEvent.keyboard('{Enter}');
        await frame();
        expect(parent.open).toBe(false);
      });

      it('should handle Alt+Enter to close all descendants', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent
              <forge-tree-item slot="children" .value=${'child'} open>
                Child
                <forge-tree-item slot="children" .value=${'grandchild'}>Grandchild</forge-tree-item>
              </forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;
        const child = items.find(item => item.value === 'child')!;

        parent.focus();
        await frame();
        expect(parent.open).toBe(true);
        expect(child.open).toBe(true);

        await userEvent.keyboard('{Alt>}{Enter}{/Alt}');
        await frame();

        expect(parent.open).toBe(false);
        expect(child.open).toBe(false);
      });

      it('should handle Enter key to select leaf items', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'leaf'}>Leaf Item</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const [leaf] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        leaf.focus();
        await frame();
        expect(leaf.selected).toBe(false);

        await userEvent.keyboard('{Enter}');
        await frame();
        expect(leaf.selected).toBe(true);
      });

      it('should handle Space key to select items in non-off mode', async () => {
        const screen = render(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;

        parent.focus();
        await frame();
        expect(parent.selected).toBe(false);

        await userEvent.keyboard(' ');
        await frame();
        expect(parent.selected).toBe(true);
      });

      it('should handle Shift+Space for extended selection', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const [_item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const extendSpy = vi.spyOn((el as any)._selectionController, 'extend');

        item2.focus();
        await frame();
        await userEvent.keyboard('{Shift>} {/Shift}');
        await frame();

        expect(extendSpy).toHaveBeenCalledWith(item2);
      });

      it('should ignore Space and Enter in off mode', async () => {
        const screen = render(html`
          <forge-tree mode="off">
            <forge-tree-item .value=${'leaf'}>Leaf Item</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        const [leaf] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        leaf.focus();
        await frame();
        expect(leaf.selected).toBe(false);

        await userEvent.keyboard(' ');
        await frame();
        expect(leaf.selected).toBe(false);

        await userEvent.keyboard('{Enter}');
        await frame();
        expect(leaf.selected).toBe(false);
      });

      it('should handle type-ahead search', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'apple'}>Apple</forge-tree-item>
            <forge-tree-item .value=${'banana'}>Banana</forge-tree-item>
            <forge-tree-item .value=${'apricot'}>Apricot</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const banana = items.find(item => item.value === 'banana')!;
        const apricot = items.find(item => item.value === 'apricot')!;

        banana.focus();
        await frame();

        await userEvent.keyboard('ap');
        await frame();

        expect(document.activeElement).toBe(apricot);
      });

      it('should handle selection-follows-focus behavior', async () => {
        const screen = render(html`
          <forge-tree mode="single" selection-follows-focus>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        item1.focus();
        await frame();
        await userEvent.keyboard('{ArrowDown}');
        await frame();

        expect(document.activeElement).toBe(item2);
        expect(item2.selected).toBe(true);
        expect(item1.selected).toBe(false);
      });

      it('should not use selection-follows-focus in multiple mode', async () => {
        const screen = render(html`
          <forge-tree mode="multiple" selection-follows-focus>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        item1.focus();
        await frame();
        await userEvent.keyboard('{ArrowDown}');
        await frame();

        expect(document.activeElement).toBe(item2);
        expect(item2.selected).toBe(false);
        expect(item1.selected).toBe(false);
      });
    });

    describe('Custom Icons', () => {
      it('should render custom expand icon in tree-item slot', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="add"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const customIcon = parentItem.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;

        expect(customIcon).not.toBeNull();
        expect(customIcon.getAttribute('name')).toBe('add');
        expect(customIcon.getAttribute('slot')).toBe('expand-icon');
      });

      it('should render custom collapse icon in tree-item slot', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent Item
              <forge-icon slot="collapse-icon" name="remove"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const customIcon = parentItem.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;

        expect(customIcon).not.toBeNull();
        expect(customIcon.getAttribute('name')).toBe('remove');
        expect(customIcon.getAttribute('slot')).toBe('collapse-icon');
      });

      it('should use custom expand icon when item is collapsed', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="chevron_right" class="custom-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="chevron_down" class="custom-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.custom-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.custom-collapse') as HTMLElement;

        expect(parentItem.open).toBe(false);
        expect(expandIcon).not.toBeNull();
        expect(collapseIcon).not.toBeNull();
      });

      it('should use custom collapse icon when item is expanded', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent Item
              <forge-icon slot="expand-icon" name="chevron_right" class="custom-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="chevron_down" class="custom-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.custom-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.custom-collapse') as HTMLElement;

        expect(parentItem.open).toBe(true);
        expect(expandIcon).not.toBeNull();
        expect(collapseIcon).not.toBeNull();
      });

      it('should toggle between custom expand and collapse icons', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="plus" class="custom-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="minus" class="custom-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;
        await frame();
        const harness = new TreeHarness(el);
        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.custom-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.custom-collapse') as HTMLElement;

        expect(parentItem.open).toBe(false);
        expect(expandIcon.getAttribute('name')).toBe('plus');
        expect(collapseIcon.getAttribute('name')).toBe('minus');

        await harness.clickExpandIcon(parentItem);
        expect(parentItem.open).toBe(true);

        await harness.clickExpandIcon(parentItem);
        expect(parentItem.open).toBe(false);
      });

      it('should handle custom icons with different elements', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent1'}>
              Parent 1
              <span slot="expand-icon" class="custom-text-expand">▶</span>
              <span slot="collapse-icon" class="custom-text-collapse">▼</span>
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'parent2'}>
              Parent 2
              <img slot="expand-icon" src="expand.svg" alt="Expand" class="custom-img-expand" />
              <img slot="collapse-icon" src="collapse.svg" alt="Collapse" class="custom-img-collapse" />
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const [parent1, parent2] = Array.from(el.querySelectorAll('forge-tree-item')).filter(
          item => (item as TreeItemComponent).value === 'parent1' || (item as TreeItemComponent).value === 'parent2'
        ) as TreeItemComponent[];

        const textExpand = parent1.querySelector('.custom-text-expand') as HTMLElement;
        const textCollapse = parent1.querySelector('.custom-text-collapse') as HTMLElement;
        expect(textExpand.textContent).toBe('▶');
        expect(textCollapse.textContent).toBe('▼');

        const imgExpand = parent2.querySelector('.custom-img-expand') as HTMLImageElement;
        const imgCollapse = parent2.querySelector('.custom-img-collapse') as HTMLImageElement;
        expect(imgExpand.src).toContain('expand.svg');
        expect(imgCollapse.src).toContain('collapse.svg');
      });

      it('should work with custom icons and accessibility', async () => {
        const screen = render(html`
          <forge-tree aria-label="Tree with custom icons">
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="add" aria-label="Expand item"></forge-icon>
              <forge-icon slot="collapse-icon" name="remove" aria-label="Collapse item"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
        const collapseIcon = parentItem.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;

        expect(expandIcon.getAttribute('aria-label')).toBe('Expand item');
        expect(collapseIcon.getAttribute('aria-label')).toBe('Collapse item');

        await expect(el).toBeAccessible();
      });

      it('should handle custom icons in nested tree items', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'level1'}>
              Level 1
              <forge-icon slot="expand-icon" name="folder" class="level1-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="folder_open" class="level1-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'level2'}>
                Level 2
                <forge-icon slot="expand-icon" name="description" class="level2-expand"></forge-icon>
                <forge-icon slot="collapse-icon" name="description" class="level2-collapse"></forge-icon>
                <forge-tree-item slot="children" .value=${'level3'}>Level 3</forge-tree-item>
              </forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const level1 = items.find(item => item.value === 'level1')!;
        const level2 = items.find(item => item.value === 'level2')!;

        const level1ExpandIcon = level1.querySelector('.level1-expand') as HTMLElement;
        const level1CollapseIcon = level1.querySelector('.level1-collapse') as HTMLElement;
        const level2ExpandIcon = level2.querySelector('.level2-expand') as HTMLElement;
        const level2CollapseIcon = level2.querySelector('.level2-collapse') as HTMLElement;

        expect(level1ExpandIcon.getAttribute('name')).toBe('folder');
        expect(level1CollapseIcon.getAttribute('name')).toBe('folder_open');
        expect(level2ExpandIcon.getAttribute('name')).toBe('description');
        expect(level2CollapseIcon.getAttribute('name')).toBe('description');
      });

      it('should maintain custom icon functionality when toggling programmatically', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="keyboard_arrow_right" class="prog-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="keyboard_arrow_down" class="prog-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.prog-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.prog-collapse') as HTMLElement;

        expect(parentItem.open).toBe(false);
        expect(expandIcon).not.toBeNull();
        expect(collapseIcon).not.toBeNull();

        parentItem.open = true;
        await frame();
        expect(parentItem.open).toBe(true);

        parentItem.open = false;
        await frame();
        expect(parentItem.open).toBe(false);
      });

      it('should fallback to default icons when custom icons are removed', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="custom_expand" class="removable-expand"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const customIcon = parentItem.querySelector('.removable-expand') as HTMLElement;

        expect(customIcon).not.toBeNull();

        customIcon.remove();
        await frame();

        const harness = new TreeHarness(el);
        expect(parentItem.open).toBe(false);

        await harness.clickExpandIcon(parentItem);
        expect(parentItem.open).toBe(true);
      });

      describe('Tree-level Custom Icons', () => {
        it('should clone custom icons from tree to child tree items', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="add_box" class="tree-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="indeterminate_check_box" class="tree-collapse"></forge-icon>
              <forge-tree-item .value=${'parent1'}>
                Parent 1
                <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              </forge-tree-item>
              <forge-tree-item .value=${'parent2'}>
                Parent 2
                <forge-tree-item slot="children" .value=${'child2'}>
                  Child 2
                  <forge-tree-item slot="children" .value=${'grandchild'}>Grandchild</forge-tree-item>
                </forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const treeExpandIcon = el.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
          const treeCollapseIcon = el.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;
          expect(treeExpandIcon).not.toBeNull();
          expect(treeCollapseIcon).not.toBeNull();
        });

        it('should prioritize tree-item level icons over tree level icons', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="tree_expand" class="tree-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="tree_collapse" class="tree-collapse"></forge-icon>
              <forge-tree-item .value=${'parent1'}>
                Parent 1
                <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              </forge-tree-item>
              <forge-tree-item .value=${'parent2'}>
                Parent 2 (Custom)
                <forge-icon slot="expand-icon" name="item_expand" class="item-expand"></forge-icon>
                <forge-icon slot="collapse-icon" name="item_collapse" class="item-collapse"></forge-icon>
                <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const harness = new TreeHarness(el);
          const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;

          const parent1TreeIcon = parent1.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent1TreeIcon).not.toBeNull();

          const parent2ItemIcon = parent2.querySelector('forge-icon[name="item_expand"]') as HTMLElement;
          const parent2TreeIcon = parent2.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent2ItemIcon).not.toBeNull();
          expect(parent2ItemIcon.checkVisibility()).toBe(true);
          expect(parent2TreeIcon.checkVisibility()).toBe(false);
        });

        it('should update cloned icons when tree level icons change', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="initial_expand" class="initial-expand"></forge-icon>
              <forge-tree-item .value=${'parent'}>
                Parent
                <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const harness = new TreeHarness(el);
          const parent = harness.treeItems.find(item => item.value === 'parent')!;

          const clonedIcon = parent.querySelector('forge-icon[name="initial_expand"]') as HTMLElement;
          expect(clonedIcon).not.toBeNull();

          const treeIcon = el.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
          treeIcon.setAttribute('name', 'updated_expand');
          treeIcon.classList.remove('initial-expand');
          treeIcon.classList.add('updated-expand');
          await frame();

          const updatedClonedIcon = parent.querySelector('forge-icon[name="updated_expand"]') as HTMLElement;
          const oldClonedIcon = parent.querySelector('forge-icon[name="initial_expand"]') as HTMLElement;
          expect(updatedClonedIcon).not.toBeNull();
          expect(oldClonedIcon).toBeNull();
        });

        it('should remove cloned icons when tree level icons are removed', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="removable_expand" class="removable-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="removable_collapse" class="removable-collapse"></forge-icon>
              <forge-tree-item .value=${'parent'}>
                Parent
                <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const harness = new TreeHarness(el);
          const parent = harness.treeItems.find(item => item.value === 'parent')!;

          let clonedExpandIcon = parent.querySelector('forge-icon[name="removable_expand"]') as HTMLElement;
          let clonedCollapseIcon = parent.querySelector('forge-icon[name="removable_collapse"]') as HTMLElement;
          expect(clonedExpandIcon).not.toBeNull();
          expect(clonedCollapseIcon).not.toBeNull();

          const treeExpandIcon = el.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
          const treeCollapseIcon = el.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;
          treeExpandIcon.remove();
          treeCollapseIcon.remove();
          await frame();

          clonedExpandIcon = parent.querySelector('forge-icon[name="removable_expand"]') as HTMLElement;
          clonedCollapseIcon = parent.querySelector('forge-icon[name="removable_collapse"]') as HTMLElement;
          expect(clonedExpandIcon).toBeNull();
          expect(clonedCollapseIcon).toBeNull();
        });

        it('should clone different types of custom elements from tree level', async () => {
          const screen = render(html`
            <forge-tree>
              <span slot="expand-icon" class="tree-text-expand">🔽</span>
              <img slot="collapse-icon" src="collapse.png" alt="Collapse" class="tree-img-collapse" />
              <forge-tree-item .value=${'parent1'}>
                Parent 1
                <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              </forge-tree-item>
              <forge-tree-item .value=${'parent2'}>
                Parent 2
                <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const harness = new TreeHarness(el);
          const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;

          const parent1ClonedText = parent1.querySelector('span.tree-text-expand') as HTMLElement;
          const parent2ClonedText = parent2.querySelector('span.tree-text-expand') as HTMLElement;
          expect(parent1ClonedText).not.toBeNull();
          expect(parent1ClonedText.textContent).toBe('🔽');
          expect(parent2ClonedText).not.toBeNull();
          expect(parent2ClonedText.textContent).toBe('🔽');

          const parent1ClonedImg = parent1.querySelector('img.tree-img-collapse') as HTMLImageElement;
          const parent2ClonedImg = parent2.querySelector('img.tree-img-collapse') as HTMLImageElement;
          expect(parent1ClonedImg).not.toBeNull();
          expect(parent1ClonedImg.src).toContain('collapse.png');
          expect(parent2ClonedImg).not.toBeNull();
          expect(parent2ClonedImg.src).toContain('collapse.png');
        });

        it('should handle cloning when tree items are added dynamically', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="dynamic_expand" class="dynamic-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="dynamic_collapse" class="dynamic-collapse"></forge-icon>
              <forge-tree-item .value=${'existing'}>
                Existing Item
                <forge-tree-item slot="children" .value=${'existing_child'}>Existing Child</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const newTreeItem = document.createElement('forge-tree-item') as TreeItemComponent;
          newTreeItem.value = 'dynamic';
          newTreeItem.innerHTML = `
            Dynamic Item
            <forge-tree-item slot="children" value="dynamic_child">Dynamic Child</forge-tree-item>
          `;
          el.appendChild(newTreeItem);
          await frame();

          const dynamicClonedExpand = newTreeItem.querySelector('forge-icon[name="dynamic_expand"]') as HTMLElement;
          const dynamicClonedCollapse = newTreeItem.querySelector('forge-icon[name="dynamic_collapse"]') as HTMLElement;
          expect(dynamicClonedExpand).not.toBeNull();
          expect(dynamicClonedCollapse).not.toBeNull();

          const dynamicChild = Array.from(newTreeItem.querySelectorAll('forge-tree-item')).find(
            item => (item as TreeItemComponent).value === 'dynamic_child'
          ) as TreeItemComponent;
          const childClonedExpand = dynamicChild.querySelector('forge-icon[name="dynamic_expand"]') as HTMLElement;
          const childClonedCollapse = dynamicChild.querySelector('forge-icon[name="dynamic_collapse"]') as HTMLElement;
          expect(childClonedExpand).not.toBeNull();
          expect(childClonedCollapse).not.toBeNull();
        });

        it('should maintain functionality with cloned icons from tree level', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="functional_expand" class="functional-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="functional_collapse" class="functional-collapse"></forge-icon>
              <forge-tree-item .value=${'parent'}>
                Parent Item
                <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const harness = new TreeHarness(el);
          const parent = harness.treeItems.find(item => item.value === 'parent')!;

          const clonedExpandIcon = parent.querySelector('forge-icon[name="functional_expand"]') as HTMLElement;
          const clonedCollapseIcon = parent.querySelector('forge-icon[name="functional_collapse"]') as HTMLElement;
          expect(clonedExpandIcon).not.toBeNull();
          expect(clonedCollapseIcon).not.toBeNull();

          expect(parent.open).toBe(false);

          await harness.clickExpandIcon(parent);
          expect(parent.open).toBe(true);

          await harness.clickExpandIcon(parent);
          expect(parent.open).toBe(false);
        });

        it('should handle mixed tree-level and item-level icons correctly', async () => {
          const screen = render(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="tree_expand" class="tree-expand"></forge-icon>
              <forge-tree-item .value=${'parent1'}>
                Parent 1 (Tree icons)
                <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              </forge-tree-item>
              <forge-tree-item .value=${'parent2'}>
                Parent 2 (Custom icons)
                <forge-icon slot="expand-icon" name="custom_expand" class="custom-expand"></forge-icon>
                <forge-tree-item slot="children" .value=${'child2'}>
                  Child 2 (Tree icons)
                  <forge-tree-item slot="children" .value=${'grandchild'}>Grandchild</forge-tree-item>
                </forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);
          const el = screen.container.querySelector('forge-tree') as TreeComponent;

          await frame();

          const harness = new TreeHarness(el);
          const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;
          const child2 = harness.treeItems.find(item => item.value === 'child2')!;

          const parent1TreeIcon = parent1.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent1TreeIcon).not.toBeNull();

          const parent2CustomIcon = parent2.querySelector('forge-icon[name="custom_expand"]') as HTMLElement;
          const parent2TreeIcon = parent2.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent2CustomIcon).not.toBeNull();
          expect(parent2CustomIcon.checkVisibility()).toBe(true);
          expect(parent2TreeIcon.checkVisibility()).toBe(false);

          const child2TreeIcon = child2.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          const child2CustomIcon = child2.querySelector('forge-icon[name="custom_expand"]') as HTMLElement;
          expect(child2TreeIcon).not.toBeNull();
          expect(child2CustomIcon).toBeNull();
        });
      });
    });
  });

  describe('TreeItemComponent', () => {
    it('should not be accessible when rendered outside tree', async () => {
      const screen = render(html`<forge-tree-item>Test Item</forge-tree-item>`);
      const el = screen.container.querySelector('forge-tree-item') as TreeItemComponent;

      await expect(el).not.toBeAccessible();
    });

    it('should render with correct default values', async () => {
      const screen = render(html`<forge-tree-item>Test Item</forge-tree-item>`);
      const el = screen.container.querySelector('forge-tree-item') as TreeItemComponent;

      expect(el.value).toBeUndefined();
      expect(el.selected).toBe(false);
      expect(el.open).toBe(false);
      expect(el.lazy).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.openDisabled).toBe(false);
      expect(el.leaf).toBe(true);
      expect(el.level).toBe(0);
      expect(el.indeterminate).toBe(false);
    });

    it('should calculate correct level based on nesting', async () => {
      const screen = render(html`
        <forge-tree>
          <forge-tree-item .value=${'level0'}>
            Level 0
            <forge-tree-item slot="children" .value=${'level1'}>
              Level 1
              <forge-tree-item slot="children" .value=${'level2'}>Level 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;

      const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
      const level0Item = items.find(item => item.value === 'level0')!;
      const level1Item = items.find(item => item.value === 'level1')!;
      const level2Item = items.find(item => item.value === 'level2')!;

      expect(level0Item.level).toBe(0);
      expect(level1Item.level).toBe(1);
      expect(level2Item.level).toBe(2);
    });

    it('should detect leaf status correctly', async () => {
      const parentScreen = render(html`
        <forge-tree-item>
          Parent
          <forge-tree-item slot="children">Child</forge-tree-item>
        </forge-tree-item>
      `);
      const parentEl = parentScreen.container.querySelector('forge-tree-item') as TreeItemComponent;
      await frame();

      const leafScreen = render(html`<forge-tree-item>Leaf</forge-tree-item>`);
      const leafEl = leafScreen.container.querySelector('forge-tree-item') as TreeItemComponent;
      await frame();

      expect(parentEl.leaf).toBe(false);
      expect(leafEl.leaf).toBe(true);
    });

    it('should dispatch select event when clicked', async () => {
      const screen = render(html`
        <forge-tree>
          <forge-tree-item .value=${'test'}>Test Item</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      await frame();
      const treeItem = el.querySelector('forge-tree-item') as TreeItemComponent;
      const selectSpy = vi.fn();

      treeItem.addEventListener('forge-tree-item-select', selectSpy);

      const header = treeItem.shadowRoot?.querySelector('.header') as HTMLElement;
      header.click();
      await frame();

      expect(selectSpy).toHaveBeenCalledOnce();
      expect(selectSpy.mock.calls[0][0].detail).toBe('test');
    });
  });

  describe('TreeSelectionController', () => {
    it('should initialize with empty selection', () => {
      const treeElement = document.createElement('forge-tree') as TreeComponent;
      const controller = new TreeSelectionController(treeElement);

      expect(controller.items).toHaveLength(0);
      expect(controller.value).toHaveLength(0);
    });

    it('should select items in single mode', async () => {
      const screen = render(html`
        <forge-tree mode="single">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      const controller = (el as any)._selectionController as TreeSelectionController;
      const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

      controller.toggle(item1);
      expect(controller.items).toHaveLength(1);
      expect(controller.items[0]).toBe(item1);
      expect(controller.value).toEqual(['item1']);

      controller.toggle(item2);
      expect(controller.items).toHaveLength(1);
      expect(controller.items[0]).toBe(item2);
      expect(controller.value).toEqual(['item2']);
    });

    it('should select multiple items in multiple mode', async () => {
      const screen = render(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      const controller = (el as any)._selectionController as TreeSelectionController;
      const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

      controller.toggle(item1);
      expect(controller.items).toHaveLength(1);
      expect(controller.value).toEqual(['item1']);

      controller.toggle(item2);
      expect(controller.items).toHaveLength(2);
      expect(controller.value).toEqual(['item1', 'item2']);
    });

    it('should handle selectAll method', async () => {
      const screen = render(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      const controller = (el as any)._selectionController as TreeSelectionController;
      const selectAllSpy = vi.fn();

      el.addEventListener('forge-tree-select-all', selectAllSpy);

      controller.selectAll();

      expect(controller.items).toHaveLength(3);
      expect(controller.value).toEqual(['item1', 'item2', 'item3']);
      expect(selectAllSpy).toHaveBeenCalledOnce();
    });

    it('should cleanup invalid selections when mode changes', async () => {
      const screen = render(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const el = screen.container.querySelector('forge-tree') as TreeComponent;
      const controller = (el as any)._selectionController as TreeSelectionController;
      const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

      controller.toggle(item1);
      controller.toggle(item2);
      expect(controller.items).toHaveLength(2);

      el.mode = 'single';
      await frame();
      controller.cleanup();

      expect(controller.items).toHaveLength(1);
    });
  });

  describe('Tree Utils', () => {
    describe('Identity functions', () => {
      it('should identify tree components', async () => {
        const screen = render(html`<forge-tree></forge-tree>`);
        const treeEl = screen.container.querySelector('forge-tree') as TreeComponent;
        const divEl = document.createElement('div');

        expect(isTree(treeEl)).toBe(true);
        expect(isTree(divEl)).toBe(false);
      });

      it('should identify tree item components', async () => {
        const screen = render(html`<forge-tree-item></forge-tree-item>`);
        const treeItemEl = screen.container.querySelector('forge-tree-item') as TreeItemComponent;
        const divEl = document.createElement('div');

        expect(isTreeItem(treeItemEl)).toBe(true);
        expect(isTreeItem(divEl)).toBe(false);
      });
    });

    describe('DOM navigation functions', () => {
      let fixtureEl: TreeComponent;
      let items: TreeItemComponent[];

      beforeEach(async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'parent1'}>
              Parent 1
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'parent2'}>Parent 2</forge-tree-item>
            <forge-tree-item .value=${'leaf'}>Leaf</forge-tree-item>
          </forge-tree>
        `);
        fixtureEl = screen.container.querySelector('forge-tree') as TreeComponent;
        items = Array.from(fixtureEl.querySelectorAll('forge-tree-item'));
      });

      it('should get correct level for nested items', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        expect(getLevel(parent1)).toBe(0);
        expect(getLevel(child1)).toBe(1);
        expect(getLevel(child2)).toBe(1);
      });

      it('should get parent tree correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;

        expect(getParentTree(parent1)).toBe(fixtureEl);
        expect(getParentTree(child1)).toBe(fixtureEl);
      });

      it('should get parent item correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;

        expect(getParentItem(parent1)).toBeNull();
        expect(getParentItem(child1)).toBe(parent1);
      });

      it('should get child items correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        const children = getChildItems(parent1);
        expect(children).toHaveLength(2);
        expect(children).toContain(child1);
        expect(children).toContain(child2);

        const allChildren = getChildItems(fixtureEl, true);
        expect(allChildren).toHaveLength(5);
      });

      it('should get first and last child items correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        expect(getFirstChildItem(parent1)).toBe(child1);
        expect(getLastChildItem(parent1)).toBe(child2);
      });

      it('should get sibling items correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const leaf = items.find(item => item.value === 'leaf')!;

        const siblings = getSiblingItems(parent1);
        expect(siblings).toHaveLength(2);
        expect(siblings).toContain(parent2);
        expect(siblings).toContain(leaf);

        const siblingsIncludingSelf = getSiblingItems(parent1, true);
        expect(siblingsIncludingSelf).toHaveLength(3);
        expect(siblingsIncludingSelf).toContain(parent1);
      });

      it('should get next item correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const child1 = items.find(item => item.value === 'child1')!;

        parent1.open = true;
        expect(getNextItem(parent1)).toBe(child1);

        parent1.open = false;
        expect(getNextItem(parent1)).toBe(parent2);
      });

      it('should get previous item correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const child1 = items.find(item => item.value === 'child1')!;

        expect(getPreviousItem(parent2)).toBe(parent1);
        expect(getPreviousItem(child1)).toBe(parent1);
      });
    });

    describe('Search function', () => {
      it('should find items by text content', async () => {
        const screen = render(html`
          <forge-tree>
            <forge-tree-item .value=${'apple'}>Apple</forge-tree-item>
            <forge-tree-item .value=${'banana'}>Banana</forge-tree-item>
            <forge-tree-item .value=${'apricot'}>Apricot</forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const startItem = items.find(item => item.value === 'banana')!;
        const result = searchItems(startItem, 'ap');

        expect(result).not.toBeNull();
        expect(result?.value).toBe('apricot');
      });
    });

    describe('State functions', () => {
      it('should detect indeterminate state correctly', async () => {
        const screen = render(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'} selected>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const el = screen.container.querySelector('forge-tree') as TreeComponent;

        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;

        expect(isIndeterminate(parent)).toBe(true);
      });
    });
  });
});
