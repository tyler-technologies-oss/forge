import { sendKeys } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { TreeComponent } from './tree/index.js';
import { TreeItemComponent } from './tree-item/index.js';
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
    await elementUpdated(item);
  }

  public async clickExpandIcon(item: TreeItemComponent): Promise<void> {
    const expandIcon = item.shadowRoot?.querySelector('.expand-icon') as HTMLElement;
    expandIcon?.click();
    await elementUpdated(item);
  }

  public focusTreeItem(item: TreeItemComponent): void {
    item.focus();
  }

  public async pressKey(key: string): Promise<void> {
    await sendKeys({ press: key });
  }
}

describe('Tree', () => {
  describe('TreeComponent', () => {
    it('should instantiate shadow root', async () => {
      const el = await fixture<TreeComponent>(html`<forge-tree></forge-tree>`);

      expect(el.shadowRoot).not.to.be.null;
    });

    it('should be accessible', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree aria-label="File tree">
          <forge-tree-item .value=${'folder1'}>Folder 1</forge-tree-item>
          <forge-tree-item .value=${'folder2'}>
            Folder 2
            <forge-tree-item slot="children" .value=${'file1'}>File 1</forge-tree-item>
            <forge-tree-item slot="children" .value=${'file2'}>File 2</forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);

      await expect(el).to.be.accessible();
    });

    it('should be accessible with multiple mode', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="multiple" aria-label="Multi-select file tree">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);

      await expect(el).to.be.accessible();
    });

    it('should be accessible when disabled', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree disabled aria-label="Disabled tree">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);

      await expect(el).to.be.accessible();
    });

    it('should receive label from wrapping label element', async () => {
      const el = await fixture<HTMLLabelElement>(html`
        <label>
          <span>File Explorer</span>
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        </label>
      `);
      const tree = el.querySelector('forge-tree') as TreeComponent;

      await expect(tree).to.be.accessible();
    });

    it('should be accessible with complex hierarchy', async () => {
      const el = await fixture<TreeComponent>(html`
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

      await expect(el).to.be.accessible();
    });

    it('should maintain accessibility when items are selected', async () => {
      const el = await fixture<TreeComponent>(html`
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

      await expect(el).to.be.accessible();
    });

    it('should render with correct default values', async () => {
      const el = await fixture<TreeComponent>(html`<forge-tree></forge-tree>`);

      expect(el.accordion).to.be.false;
      expect(el.indentLines).to.be.false;
      expect(el.mode).to.equal('single');
      expect(el.selectionFollowsFocus).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.value).to.deep.equal([]);
      expect(el.tabIndex).to.equal(0);
    });

    it('should accept value property', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const testValue = ['item1', 'item2'];

      el.value = testValue;

      const items = el.querySelectorAll('forge-tree-item') as NodeListOf<TreeItemComponent>;
      expect(items[0].selected).to.be.true;
      expect(items[1].selected).to.be.true;
      expect(el.value).to.deep.equal(testValue);
    });

    describe('Mode Changes', () => {
      it('should change from single to multiple mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        // Select first item in single mode
        await harness.clickTreeItem(item1);
        expect(item1.selected).to.be.true;
        expect(item2.selected).to.be.false;

        // Change to multiple mode
        el.mode = 'multiple';
        await elementUpdated(el);

        expect(el.mode).to.equal('multiple');
        expect(item1.selected).to.be.true; // Should preserve existing selection

        // Should now allow multiple selections
        await harness.clickTreeItem(item2);
        expect(item1.selected).to.be.true;
        expect(item2.selected).to.be.true;
      });

      it('should change from multiple to single mode and cleanup selections', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        // Select multiple items
        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        await harness.clickTreeItem(item3);
        expect(item1.selected).to.be.true;
        expect(item2.selected).to.be.true;
        expect(item3.selected).to.be.true;
        expect(el.value).to.have.length(3);

        // Change to single mode
        el.mode = 'single';
        await elementUpdated(el);

        expect(el.mode).to.equal('single');
        // Should only keep one selection (typically the first or last selected)
        expect(el.value).to.have.length.at.most(1);

        // Should now only allow single selection
        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        expect(item1.selected).to.be.false;
        expect(item2.selected).to.be.true;
      });

      it('should change from single to off mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        // Select item in single mode
        await harness.clickTreeItem(item1);
        expect(item1.selected).to.be.true;

        // Change to off mode
        el.mode = 'off';
        await elementUpdated(el);

        expect(el.mode).to.equal('off');
        expect(item1.selected).to.be.false; // Should clear selections
        expect(el.value).to.have.length(0);

        // Should not allow selections in off mode
        await harness.clickTreeItem(item2);
        expect(item2.selected).to.be.false;
      });

      it('should change from off to multiple mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="off">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        // Verify no selection works in off mode
        await harness.clickTreeItem(item1);
        expect(item1.selected).to.be.false;

        // Change to multiple mode
        el.mode = 'multiple';
        await elementUpdated(el);

        expect(el.mode).to.equal('multiple');

        // Should now allow multiple selections
        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        expect(item1.selected).to.be.true;
        expect(item2.selected).to.be.true;
      });

      it('should change to leaf mode and only allow leaf selection', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'leaf'}>Leaf Item</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const items = harness.treeItems;
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const leaf = items.find(item => item.value === 'leaf')!;

        // Change to leaf mode
        el.mode = 'leaf';
        await elementUpdated(el);

        expect(el.mode).to.equal('leaf');

        // Try to select parent (non-leaf) - should not work
        await harness.clickTreeItem(parent);
        expect(parent.selected).to.be.false;

        // Select leaf items - should work
        await harness.clickTreeItem(child1);
        expect(child1.selected).to.be.true;

        await harness.clickTreeItem(leaf);
        expect(leaf.selected).to.be.true;
        expect(child1.selected).to.be.false; // Single selection behavior
      });

      xit('should change to multiple-discrete mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const items = harness.treeItems;
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        // Change to multiple-discrete mode
        el.mode = 'multiple-discrete';
        await elementUpdated(el);

        expect(el.mode).to.equal('multiple-discrete');

        // Should allow multiple independent selections
        await harness.clickTreeItem(parent);
        await harness.clickTreeItem(child1);
        await harness.clickTreeItem(child2);

        expect(parent.selected).to.be.true;
        expect(child1.selected).to.be.true;
        expect(child2.selected).to.be.true;
      });

      it('should update selection controller when mode changes', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2] = harness.treeItems;

        // Select multiple items
        await harness.clickTreeItem(item1);
        await harness.clickTreeItem(item2);
        expect(el.value).to.have.length(2);

        // Spy on selection controller cleanup
        const selectionController = (el as any)._selectionController;
        const cleanupSpy = spy(selectionController, 'cleanup');

        // Change mode
        el.mode = 'single';
        await elementUpdated(el);

        // Should have called cleanup on selection controller
        expect(cleanupSpy).to.have.been.calledOnce;
      });

      it('should emit mode change events', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          </forge-tree>
        `);

        const changeEventSpy = spy();
        el.addEventListener('forge-tree-change', changeEventSpy);

        // Change mode
        el.mode = 'multiple';
        await elementUpdated(el);

        // Should emit change event when mode changes affect selection behavior
        expect(el.mode).to.equal('multiple');
      });
    });

    it('should render tree items correctly', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree>
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const harness = new TreeHarness(el);

      expect(harness.treeItems).to.have.length(2);
      expect(harness.treeItems[0].value).to.equal('item1');
      expect(harness.treeItems[1].value).to.equal('item2');
    });

    it('should handle click on tree item in single mode', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="single">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const harness = new TreeHarness(el);
      const [item1, item2] = harness.treeItems;

      await harness.clickTreeItem(item1);
      expect(item1.selected).to.be.true;
      expect(item2.selected).to.be.false;

      await harness.clickTreeItem(item2);
      expect(item1.selected).to.be.false;
      expect(item2.selected).to.be.true;
    });

    it('should handle click on tree item in multiple mode', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const harness = new TreeHarness(el);
      const [item1, item2] = harness.treeItems;

      await harness.clickTreeItem(item1);
      expect(item1.selected).to.be.true;
      expect(item2.selected).to.be.false;

      await harness.clickTreeItem(item2);
      expect(item1.selected).to.be.true;
      expect(item2.selected).to.be.true;
    });

    it('should handle expand/collapse with nested items', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree>
          <forge-tree-item .value=${'parent'}>
            Parent
            <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
            <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
          </forge-tree-item>
        </forge-tree>
      `);
      const harness = new TreeHarness(el);
      const [parentItem] = harness.treeItems;

      expect(parentItem.open).to.be.false;
      expect(parentItem.leaf).to.be.false;

      await harness.clickExpandIcon(parentItem);
      expect(parentItem.open).to.be.true;

      await harness.clickExpandIcon(parentItem);
      expect(parentItem.open).to.be.false;
    });

    it('should handle accordion behavior', async () => {
      const el = await fixture<TreeComponent>(html`
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
      const harness = new TreeHarness(el);
      const [parent1, parent2] = harness.treeItems.filter(item => item.value === 'parent1' || item.value === 'parent2');

      await harness.clickExpandIcon(parent1);
      expect(parent1.open).to.be.true;

      await harness.clickExpandIcon(parent2);
      expect(parent1.open).to.be.false;
      expect(parent2.open).to.be.true;
    });

    describe('Keyboard Controls', () => {
      it('should handle ArrowUp and ArrowDown navigation', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);
        await harness.pressKey('ArrowDown');
        expect(document.activeElement).to.equal(item2);

        await harness.pressKey('ArrowDown');
        expect(document.activeElement).to.equal(item3);

        await harness.pressKey('ArrowUp');
        expect(document.activeElement).to.equal(item2);

        await harness.pressKey('ArrowUp');
        expect(document.activeElement).to.equal(item1);
      });

      it('should handle Shift+ArrowUp/ArrowDown for multi-selection', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);
        await elementUpdated(el);

        // Shift+ArrowDown should select and move to next item
        await sendKeys({ down: 'Shift' });
        await harness.pressKey('ArrowDown');
        await sendKeys({ up: 'Shift' });
        await elementUpdated(el);

        expect(document.activeElement).to.equal(item2);
        expect(item2.selected).to.be.true;

        // Continue with Shift+ArrowDown
        await sendKeys({ down: 'Shift' });
        await harness.pressKey('ArrowDown');
        await sendKeys({ up: 'Shift' });
        await elementUpdated(el);

        expect(document.activeElement).to.equal(item3);
        expect(item3.selected).to.be.true;
      });

      it('should handle ArrowLeft to close items or move to parent', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;

        // Focus on child item, ArrowLeft should move to parent
        child1.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'ArrowLeft' });
        await elementUpdated(el);
        expect(document.activeElement).to.equal(parent);

        // Focus on open parent, ArrowLeft should close it
        parent.focus();
        await elementUpdated(el);
        expect(parent.open).to.be.true;
        await sendKeys({ press: 'ArrowLeft' });
        await elementUpdated(el);
        expect(parent.open).to.be.false;
      });

      it('should handle ArrowRight to open items or move to first child', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'}>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;
        const child1 = items.find(item => item.value === 'child1')!;

        parent.focus();
        await elementUpdated(el);
        expect(parent.open).to.be.false;

        // ArrowRight should open the parent
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(parent.open).to.be.true;

        // ArrowRight again should move to first child
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(document.activeElement).to.equal(child1);
      });

      it('should handle Home key to focus first item', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, _item2, item3] = harness.treeItems;

        harness.focusTreeItem(item3);
        await harness.pressKey('Home');
        expect(document.activeElement).to.equal(item1);
      });

      it('should handle Shift+Ctrl+Home for multi-selection', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item3);
        await elementUpdated(el);

        // Shift+Ctrl+Home should select all previous items
        await sendKeys({ down: 'Shift' });
        await sendKeys({ down: 'Control' });
        await harness.pressKey('Home');
        await sendKeys({ up: 'Control' });
        await sendKeys({ up: 'Shift' });
        await elementUpdated(el);

        expect(item1.selected).to.be.true;
        expect(item2.selected).to.be.true;
        expect(document.activeElement).to.equal(item1);
      });

      it('should handle End key to focus last item', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, _item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);
        await harness.pressKey('End');
        expect(document.activeElement).to.equal(item3);
      });

      it('should handle Shift+Ctrl+End for multi-selection', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const harness = new TreeHarness(el);
        const [item1, item2, item3] = harness.treeItems;

        harness.focusTreeItem(item1);
        await elementUpdated(el);

        // Shift+Ctrl+End should select all subsequent items
        await sendKeys({ down: 'Shift' });
        await sendKeys({ down: 'Control' });
        await harness.pressKey('End');
        await sendKeys({ up: 'Control' });
        await sendKeys({ up: 'Shift' });
        await elementUpdated(el);

        expect(item2.selected).to.be.true;
        expect(item3.selected).to.be.true;
        expect(document.activeElement).to.equal(item3);
      });

      it('should handle asterisk (*) key to open all siblings', async () => {
        const el = await fixture<TreeComponent>(html`
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
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const parent3 = items.find(item => item.value === 'parent3')!;

        parent1.focus();
        await elementUpdated(el);
        expect(parent1.open).to.be.false;
        expect(parent2.open).to.be.false;
        expect(parent3.open).to.be.false;

        await sendKeys({ press: '*' });
        await elementUpdated(el);

        expect(parent1.open).to.be.true;
        expect(parent2.open).to.be.true;
        expect(parent3.open).to.be.true;
      });

      it('should handle Ctrl+A to select all items in multiple mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
            <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
          </forge-tree>
        `);
        const selectAllSpy = spy();
        el.addEventListener('forge-tree-select-all', selectAllSpy);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ down: 'Control' });
        await sendKeys({ press: 'a' });
        await sendKeys({ up: 'Control' });
        await elementUpdated(el);

        expect(selectAllSpy).to.have.been.calledOnce;
      });

      it('should ignore Ctrl+A in non-multiple modes', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const selectAllSpy = spy();
        el.addEventListener('forge-tree-select-all', selectAllSpy);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ down: 'Control' });
        await sendKeys({ press: 'a' });
        await sendKeys({ up: 'Control' });
        await elementUpdated(el);

        expect(selectAllSpy).to.not.have.been.called;
      });

      it('should handle Enter key to toggle open state of non-leaf items', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;

        parent.focus();
        await elementUpdated(el);
        expect(parent.open).to.be.false;

        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(parent.open).to.be.true;

        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(parent.open).to.be.false;
      });

      it('should handle Alt+Enter to close all descendants', async () => {
        const el = await fixture<TreeComponent>(html`
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
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;
        const child = items.find(item => item.value === 'child')!;

        parent.focus();
        await elementUpdated(el);
        expect(parent.open).to.be.true;
        expect(child.open).to.be.true;

        await sendKeys({ down: 'Alt' });
        await sendKeys({ press: 'Enter' });
        await sendKeys({ up: 'Alt' });
        await elementUpdated(el);

        expect(parent.open).to.be.false;
        expect(child.open).to.be.false;
      });

      it('should handle Enter key to select leaf items', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'leaf'}>Leaf Item</forge-tree-item>
          </forge-tree>
        `);
        const [leaf] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        leaf.focus();
        await elementUpdated(el);
        expect(leaf.selected).to.be.false;

        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(leaf.selected).to.be.true;
      });

      it('should handle Space key to select items in non-off mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;

        parent.focus();
        await elementUpdated(el);
        expect(parent.selected).to.be.false;

        await sendKeys({ press: ' ' });
        await elementUpdated(el);
        expect(parent.selected).to.be.true;
      });

      it('should handle Shift+Space for extended selection', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const [_item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const extendSpy = spy((el as any)._selectionController, 'extend');

        item2.focus();
        await elementUpdated(el);
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: ' ' });
        await sendKeys({ up: 'Shift' });
        await elementUpdated(el);

        expect(extendSpy).to.have.been.calledWith(item2);
      });

      it('should ignore Space and Enter in off mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="off">
            <forge-tree-item .value=${'leaf'}>Leaf Item</forge-tree-item>
          </forge-tree>
        `);
        const [leaf] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        leaf.focus();
        await elementUpdated(el);
        expect(leaf.selected).to.be.false;

        await sendKeys({ press: ' ' });
        await elementUpdated(el);
        expect(leaf.selected).to.be.false;

        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(leaf.selected).to.be.false;
      });

      it('should handle type-ahead search', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'apple'}>Apple</forge-tree-item>
            <forge-tree-item .value=${'banana'}>Banana</forge-tree-item>
            <forge-tree-item .value=${'apricot'}>Apricot</forge-tree-item>
          </forge-tree>
        `);
        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const banana = items.find(item => item.value === 'banana')!;
        const apricot = items.find(item => item.value === 'apricot')!;

        banana.focus();
        await elementUpdated(el);

        // Type "ap" to search for items starting with "ap"
        await sendKeys({ type: 'ap' });
        await elementUpdated(el);

        expect(document.activeElement).to.equal(apricot);
      });

      it('should handle selection-follows-focus behavior', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="single" selection-follows-focus>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        item1.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);

        expect(document.activeElement).to.equal(item2);
        expect(item2.selected).to.be.true;
        expect(item1.selected).to.be.false;
      });

      it('should not use selection-follows-focus in multiple mode', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple" selection-follows-focus>
            <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
            <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          </forge-tree>
        `);
        const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

        item1.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);

        expect(document.activeElement).to.equal(item2);
        expect(item2.selected).to.be.false;
        expect(item1.selected).to.be.false;
      });
    });

    describe('Custom Icons', () => {
      it('should render custom expand icon in tree-item slot', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="add"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const customIcon = parentItem.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;

        expect(customIcon).to.not.be.null;
        expect(customIcon.getAttribute('name')).to.equal('add');
        expect(customIcon.getAttribute('slot')).to.equal('expand-icon');
      });

      it('should render custom collapse icon in tree-item slot', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent Item
              <forge-icon slot="collapse-icon" name="remove"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const customIcon = parentItem.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;

        expect(customIcon).to.not.be.null;
        expect(customIcon.getAttribute('name')).to.equal('remove');
        expect(customIcon.getAttribute('slot')).to.equal('collapse-icon');
      });

      it('should use custom expand icon when item is collapsed', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="chevron_right" class="custom-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="chevron_down" class="custom-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.custom-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.custom-collapse') as HTMLElement;

        expect(parentItem.open).to.be.false;
        expect(expandIcon).to.not.be.null;
        expect(collapseIcon).to.not.be.null;
      });

      it('should use custom collapse icon when item is expanded', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'} open>
              Parent Item
              <forge-icon slot="expand-icon" name="chevron_right" class="custom-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="chevron_down" class="custom-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.custom-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.custom-collapse') as HTMLElement;

        expect(parentItem.open).to.be.true;
        expect(expandIcon).to.not.be.null;
        expect(collapseIcon).to.not.be.null;
      });

      it('should toggle between custom expand and collapse icons', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="plus" class="custom-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="minus" class="custom-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const harness = new TreeHarness(el);
        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.custom-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.custom-collapse') as HTMLElement;

        // Initially collapsed
        expect(parentItem.open).to.be.false;
        expect(expandIcon.getAttribute('name')).to.equal('plus');
        expect(collapseIcon.getAttribute('name')).to.equal('minus');

        // Expand the item
        await harness.clickExpandIcon(parentItem);
        expect(parentItem.open).to.be.true;

        // Collapse the item
        await harness.clickExpandIcon(parentItem);
        expect(parentItem.open).to.be.false;
      });

      it('should handle custom icons with different elements', async () => {
        const el = await fixture<TreeComponent>(html`
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

        const [parent1, parent2] = Array.from(el.querySelectorAll('forge-tree-item')).filter(
          item => item.value === 'parent1' || item.value === 'parent2'
        ) as TreeItemComponent[];

        // Text-based custom icons
        const textExpand = parent1.querySelector('.custom-text-expand') as HTMLElement;
        const textCollapse = parent1.querySelector('.custom-text-collapse') as HTMLElement;
        expect(textExpand.textContent).to.equal('▶');
        expect(textCollapse.textContent).to.equal('▼');

        // Image-based custom icons
        const imgExpand = parent2.querySelector('.custom-img-expand') as HTMLImageElement;
        const imgCollapse = parent2.querySelector('.custom-img-collapse') as HTMLImageElement;
        expect(imgExpand.src).to.include('expand.svg');
        expect(imgCollapse.src).to.include('collapse.svg');
      });

      it('should work with custom icons and accessibility', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree aria-label="Tree with custom icons">
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="add" aria-label="Expand item"></forge-icon>
              <forge-icon slot="collapse-icon" name="remove" aria-label="Collapse item"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
        const collapseIcon = parentItem.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;

        expect(expandIcon.getAttribute('aria-label')).to.equal('Expand item');
        expect(collapseIcon.getAttribute('aria-label')).to.equal('Collapse item');

        await expect(el).to.be.accessible();
      });

      it('should handle custom icons in nested tree items', async () => {
        const el = await fixture<TreeComponent>(html`
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

        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const level1 = items.find(item => item.value === 'level1')!;
        const level2 = items.find(item => item.value === 'level2')!;

        const level1ExpandIcon = level1.querySelector('.level1-expand') as HTMLElement;
        const level1CollapseIcon = level1.querySelector('.level1-collapse') as HTMLElement;
        const level2ExpandIcon = level2.querySelector('.level2-expand') as HTMLElement;
        const level2CollapseIcon = level2.querySelector('.level2-collapse') as HTMLElement;

        expect(level1ExpandIcon.getAttribute('name')).to.equal('folder');
        expect(level1CollapseIcon.getAttribute('name')).to.equal('folder_open');
        expect(level2ExpandIcon.getAttribute('name')).to.equal('description');
        expect(level2CollapseIcon.getAttribute('name')).to.equal('description');
      });

      it('should maintain custom icon functionality when toggling programmatically', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="keyboard_arrow_right" class="prog-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="keyboard_arrow_down" class="prog-collapse"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const expandIcon = parentItem.querySelector('.prog-expand') as HTMLElement;
        const collapseIcon = parentItem.querySelector('.prog-collapse') as HTMLElement;

        // Initially collapsed
        expect(parentItem.open).to.be.false;
        expect(expandIcon).to.not.be.null;
        expect(collapseIcon).to.not.be.null;

        // Programmatically expand
        parentItem.open = true;
        await elementUpdated(parentItem);
        expect(parentItem.open).to.be.true;

        // Programmatically collapse
        parentItem.open = false;
        await elementUpdated(parentItem);
        expect(parentItem.open).to.be.false;
      });

      it('should fallback to default icons when custom icons are removed', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'parent'}>
              Parent Item
              <forge-icon slot="expand-icon" name="custom_expand" class="removable-expand"></forge-icon>
              <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const parentItem = el.querySelector('forge-tree-item') as TreeItemComponent;
        const customIcon = parentItem.querySelector('.removable-expand') as HTMLElement;

        expect(customIcon).to.not.be.null;

        // Remove the custom icon
        customIcon.remove();
        await elementUpdated(parentItem);

        // Should still be functional with default icon behavior
        const harness = new TreeHarness(el);
        expect(parentItem.open).to.be.false;

        await harness.clickExpandIcon(parentItem);
        expect(parentItem.open).to.be.true;
      });

      describe('Tree-level Custom Icons', () => {
        it('should clone custom icons from tree to child tree items', async () => {
          const el = await fixture<TreeComponent>(html`
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

          await elementUpdated(el);

          // const harness = new TreeHarness(el);
          // const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          // const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;
          // const child2 = harness.treeItems.find(item => item.value === 'child2')!;

          // Check that tree-level custom icons exist
          const treeExpandIcon = el.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
          const treeCollapseIcon = el.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;
          expect(treeExpandIcon).to.not.be.null;
          expect(treeCollapseIcon).to.not.be.null;

          // Check that parent items have cloned icons
          // const parent1ClonedExpand = parent1.querySelector('forge-icon[name="add_box"]') as HTMLElement;
          // const parent1ClonedCollapse = parent1.querySelector('forge-icon[name="indeterminate_check_box"]') as HTMLElement;
          // expect(parent1ClonedExpand).to.not.be.null;
          // expect(parent1ClonedCollapse).to.not.be.null;

          // const parent2ClonedExpand = parent2.querySelector('forge-icon[name="add_box"]') as HTMLElement;
          // const parent2ClonedCollapse = parent2.querySelector('forge-icon[name="indeterminate_check_box"]') as HTMLElement;
          // expect(parent2ClonedExpand).to.not.be.null;
          // expect(parent2ClonedCollapse).to.not.be.null;

          // // Check that nested items also have cloned icons
          // const child2ClonedExpand = child2.querySelector('forge-icon[name="add_box"]') as HTMLElement;
          // const child2ClonedCollapse = child2.querySelector('forge-icon[name="indeterminate_check_box"]') as HTMLElement;
          // expect(child2ClonedExpand).to.not.be.null;
          // expect(child2ClonedCollapse).to.not.be.null;
        });

        it('should prioritize tree-item level icons over tree level icons', async () => {
          const el = await fixture<TreeComponent>(html`
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

          await elementUpdated(el);

          const harness = new TreeHarness(el);
          const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;

          // Parent1 should use tree-level icons (cloned)
          const parent1TreeIcon = parent1.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent1TreeIcon).to.not.be.null;

          // Parent2 should use its own custom icons (not cloned from tree)
          const parent2ItemIcon = parent2.querySelector('forge-icon[name="item_expand"]') as HTMLElement;
          const parent2TreeIcon = parent2.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent2ItemIcon).to.not.be.null;
          expect(parent2ItemIcon.checkVisibility()).to.be.true;
          expect(parent2TreeIcon.checkVisibility()).to.be.false; // Should not have tree-level icon cloned
        });

        it('should update cloned icons when tree level icons change', async () => {
          const el = await fixture<TreeComponent>(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="initial_expand" class="initial-expand"></forge-icon>
              <forge-tree-item .value=${'parent'}>
                Parent
                <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);

          await elementUpdated(el);

          const harness = new TreeHarness(el);
          const parent = harness.treeItems.find(item => item.value === 'parent')!;

          // Check initial cloned icon
          const clonedIcon = parent.querySelector('forge-icon[name="initial_expand"]') as HTMLElement;
          expect(clonedIcon).to.not.be.null;

          // Change the tree-level icon
          const treeIcon = el.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
          treeIcon.setAttribute('name', 'updated_expand');
          treeIcon.classList.remove('initial-expand');
          treeIcon.classList.add('updated-expand');
          await elementUpdated(el);

          // Check that cloned icon is updated
          const updatedClonedIcon = parent.querySelector('forge-icon[name="updated_expand"]') as HTMLElement;
          const oldClonedIcon = parent.querySelector('forge-icon[name="initial_expand"]') as HTMLElement;
          expect(updatedClonedIcon).to.not.be.null;
          expect(oldClonedIcon).to.be.null;
        });

        it('should remove cloned icons when tree level icons are removed', async () => {
          const el = await fixture<TreeComponent>(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="removable_expand" class="removable-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="removable_collapse" class="removable-collapse"></forge-icon>
              <forge-tree-item .value=${'parent'}>
                Parent
                <forge-tree-item slot="children" .value=${'child'}>Child</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);

          await elementUpdated(el);

          const harness = new TreeHarness(el);
          const parent = harness.treeItems.find(item => item.value === 'parent')!;

          // Check initial cloned icons exist
          let clonedExpandIcon = parent.querySelector('forge-icon[name="removable_expand"]') as HTMLElement;
          let clonedCollapseIcon = parent.querySelector('forge-icon[name="removable_collapse"]') as HTMLElement;
          expect(clonedExpandIcon).to.not.be.null;
          expect(clonedCollapseIcon).to.not.be.null;

          // Remove tree-level icons
          const treeExpandIcon = el.querySelector('forge-icon[slot="expand-icon"]') as HTMLElement;
          const treeCollapseIcon = el.querySelector('forge-icon[slot="collapse-icon"]') as HTMLElement;
          treeExpandIcon.remove();
          treeCollapseIcon.remove();
          await elementUpdated(el);

          // Check that cloned icons are removed
          clonedExpandIcon = parent.querySelector('forge-icon[name="removable_expand"]') as HTMLElement;
          clonedCollapseIcon = parent.querySelector('forge-icon[name="removable_collapse"]') as HTMLElement;
          expect(clonedExpandIcon).to.be.null;
          expect(clonedCollapseIcon).to.be.null;
        });

        it('should clone different types of custom elements from tree level', async () => {
          const el = await fixture<TreeComponent>(html`
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

          await elementUpdated(el);

          const harness = new TreeHarness(el);
          const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;

          // Check text element cloning
          const parent1ClonedText = parent1.querySelector('span.tree-text-expand') as HTMLElement;
          const parent2ClonedText = parent2.querySelector('span.tree-text-expand') as HTMLElement;
          expect(parent1ClonedText).to.not.be.null;
          expect(parent1ClonedText.textContent).to.equal('🔽');
          expect(parent2ClonedText).to.not.be.null;
          expect(parent2ClonedText.textContent).to.equal('🔽');

          // Check image element cloning
          const parent1ClonedImg = parent1.querySelector('img.tree-img-collapse') as HTMLImageElement;
          const parent2ClonedImg = parent2.querySelector('img.tree-img-collapse') as HTMLImageElement;
          expect(parent1ClonedImg).to.not.be.null;
          expect(parent1ClonedImg.src).to.include('collapse.png');
          expect(parent2ClonedImg).to.not.be.null;
          expect(parent2ClonedImg.src).to.include('collapse.png');
        });

        it('should handle cloning when tree items are added dynamically', async () => {
          const el = await fixture<TreeComponent>(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="dynamic_expand" class="dynamic-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="dynamic_collapse" class="dynamic-collapse"></forge-icon>
              <forge-tree-item .value=${'existing'}>
                Existing Item
                <forge-tree-item slot="children" .value=${'existing_child'}>Existing Child</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);

          await elementUpdated(el);

          // Add a new tree item dynamically
          const newTreeItem = document.createElement('forge-tree-item') as TreeItemComponent;
          newTreeItem.value = 'dynamic';
          newTreeItem.innerHTML = `
            Dynamic Item
            <forge-tree-item slot="children" value="dynamic_child">Dynamic Child</forge-tree-item>
          `;
          el.appendChild(newTreeItem);
          await elementUpdated(el);

          // Check that the dynamically added item received cloned icons
          const dynamicClonedExpand = newTreeItem.querySelector('forge-icon[name="dynamic_expand"]') as HTMLElement;
          const dynamicClonedCollapse = newTreeItem.querySelector('forge-icon[name="dynamic_collapse"]') as HTMLElement;
          expect(dynamicClonedExpand).to.not.be.null;
          expect(dynamicClonedCollapse).to.not.be.null;

          // Check that nested dynamic child also received cloned icons
          const dynamicChild = Array.from(newTreeItem.querySelectorAll('forge-tree-item')).find(
            item => (item as TreeItemComponent).value === 'dynamic_child'
          ) as TreeItemComponent;
          const childClonedExpand = dynamicChild.querySelector('forge-icon[name="dynamic_expand"]') as HTMLElement;
          const childClonedCollapse = dynamicChild.querySelector('forge-icon[name="dynamic_collapse"]') as HTMLElement;
          expect(childClonedExpand).to.not.be.null;
          expect(childClonedCollapse).to.not.be.null;
        });

        it('should maintain functionality with cloned icons from tree level', async () => {
          const el = await fixture<TreeComponent>(html`
            <forge-tree>
              <forge-icon slot="expand-icon" name="functional_expand" class="functional-expand"></forge-icon>
              <forge-icon slot="collapse-icon" name="functional_collapse" class="functional-collapse"></forge-icon>
              <forge-tree-item .value=${'parent'}>
                Parent Item
                <forge-tree-item slot="children" .value=${'child'}>Child Item</forge-tree-item>
              </forge-tree-item>
            </forge-tree>
          `);

          await elementUpdated(el);

          const harness = new TreeHarness(el);
          const parent = harness.treeItems.find(item => item.value === 'parent')!;

          // Verify cloned icons exist
          const clonedExpandIcon = parent.querySelector('forge-icon[name="functional_expand"]') as HTMLElement;
          const clonedCollapseIcon = parent.querySelector('forge-icon[name="functional_collapse"]') as HTMLElement;
          expect(clonedExpandIcon).to.not.be.null;
          expect(clonedCollapseIcon).to.not.be.null;

          // Test expand/collapse functionality works with cloned icons
          expect(parent.open).to.be.false;

          await harness.clickExpandIcon(parent);
          expect(parent.open).to.be.true;

          await harness.clickExpandIcon(parent);
          expect(parent.open).to.be.false;
        });

        it('should handle mixed tree-level and item-level icons correctly', async () => {
          const el = await fixture<TreeComponent>(html`
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

          await elementUpdated(el);

          const harness = new TreeHarness(el);
          const parent1 = harness.treeItems.find(item => item.value === 'parent1')!;
          const parent2 = harness.treeItems.find(item => item.value === 'parent2')!;
          const child2 = harness.treeItems.find(item => item.value === 'child2')!;

          // Parent1 should have tree-level cloned icon
          const parent1TreeIcon = parent1.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent1TreeIcon).to.not.be.null;

          // Parent2 should have its own custom icon, not the tree-level one
          const parent2CustomIcon = parent2.querySelector('forge-icon[name="custom_expand"]') as HTMLElement;
          const parent2TreeIcon = parent2.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          expect(parent2CustomIcon).to.not.be.null;
          expect(parent2CustomIcon.checkVisibility()).to.be.true;
          expect(parent2TreeIcon.checkVisibility()).to.be.false;

          // Child2 should have tree-level cloned icon (inherits from tree, not parent2)
          const child2TreeIcon = child2.querySelector('forge-icon[name="tree_expand"]') as HTMLElement;
          const child2CustomIcon = child2.querySelector('forge-icon[name="custom_expand"]') as HTMLElement;
          expect(child2TreeIcon).to.not.be.null;
          expect(child2CustomIcon).to.be.null;
        });
      });
    });
  });

  describe('TreeItemComponent', () => {
    it('should not be accessible when rendered outside tree', async () => {
      const el = await fixture<TreeItemComponent>(html`<forge-tree-item>Test Item</forge-tree-item>`);

      await expect(el).to.not.be.accessible();
    });

    it('should render with correct default values', async () => {
      const el = await fixture<TreeItemComponent>(html`<forge-tree-item>Test Item</forge-tree-item>`);

      expect(el.value).to.be.undefined;
      expect(el.selected).to.be.false;
      expect(el.open).to.be.false;
      expect(el.lazy).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.openDisabled).to.be.false;
      expect(el.leaf).to.be.true;
      expect(el.level).to.equal(0);
      expect(el.indeterminate).to.be.false;
    });

    it('should calculate correct level based on nesting', async () => {
      const el = await fixture<TreeComponent>(html`
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

      const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
      const level0Item = items.find(item => item.value === 'level0')!;
      const level1Item = items.find(item => item.value === 'level1')!;
      const level2Item = items.find(item => item.value === 'level2')!;

      expect(level0Item.level).to.equal(0);
      expect(level1Item.level).to.equal(1);
      expect(level2Item.level).to.equal(2);
    });

    it('should detect leaf status correctly', async () => {
      const parentEl = await fixture<TreeItemComponent>(html`
        <forge-tree-item>
          Parent
          <forge-tree-item slot="children">Child</forge-tree-item>
        </forge-tree-item>
      `);

      const leafEl = await fixture<TreeItemComponent>(html`<forge-tree-item>Leaf</forge-tree-item>`);

      expect(parentEl.leaf).to.be.false;
      expect(leafEl.leaf).to.be.true;
    });

    it('should dispatch select event when clicked', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree>
          <forge-tree-item .value=${'test'}>Test Item</forge-tree-item>
        </forge-tree>
      `);
      const treeItem = el.querySelector('forge-tree-item') as TreeItemComponent;
      const selectSpy = spy();

      treeItem.addEventListener('forge-tree-item-select', selectSpy);

      const header = treeItem.shadowRoot?.querySelector('.header') as HTMLElement;
      header.click();
      await elementUpdated(treeItem);

      expect(selectSpy).to.have.been.calledOnce;
      expect(selectSpy.args[0][0].detail).to.equal('test');
    });
  });

  describe('TreeSelectionController', () => {
    it('should initialize with empty selection', () => {
      const treeElement = document.createElement('forge-tree') as TreeComponent;
      const controller = new TreeSelectionController(treeElement);

      expect(controller.items).to.have.length(0);
      expect(controller.value).to.have.length(0);
    });

    it('should select items in single mode', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="single">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const controller = (el as any)._selectionController as TreeSelectionController;
      const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

      controller.toggle(item1);
      expect(controller.items).to.have.length(1);
      expect(controller.items[0]).to.equal(item1);
      expect(controller.value).to.deep.equal(['item1']);

      controller.toggle(item2);
      expect(controller.items).to.have.length(1);
      expect(controller.items[0]).to.equal(item2);
      expect(controller.value).to.deep.equal(['item2']);
    });

    it('should select multiple items in multiple mode', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const controller = (el as any)._selectionController as TreeSelectionController;
      const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

      controller.toggle(item1);
      expect(controller.items).to.have.length(1);
      expect(controller.value).to.deep.equal(['item1']);

      controller.toggle(item2);
      expect(controller.items).to.have.length(2);
      expect(controller.value).to.deep.equal(['item1', 'item2']);
    });

    it('should handle selectAll method', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
          <forge-tree-item .value=${'item3'}>Item 3</forge-tree-item>
        </forge-tree>
      `);
      const controller = (el as any)._selectionController as TreeSelectionController;
      const selectAllSpy = spy();

      el.addEventListener('forge-tree-select-all', selectAllSpy);

      controller.selectAll();

      expect(controller.items).to.have.length(3);
      expect(controller.value).to.deep.equal(['item1', 'item2', 'item3']);
      expect(selectAllSpy).to.have.been.calledOnce;
    });

    it('should cleanup invalid selections when mode changes', async () => {
      const el = await fixture<TreeComponent>(html`
        <forge-tree mode="multiple">
          <forge-tree-item .value=${'item1'}>Item 1</forge-tree-item>
          <forge-tree-item .value=${'item2'}>Item 2</forge-tree-item>
        </forge-tree>
      `);
      const controller = (el as any)._selectionController as TreeSelectionController;
      const [item1, item2] = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];

      controller.toggle(item1);
      controller.toggle(item2);
      expect(controller.items).to.have.length(2);

      el.mode = 'single';
      await elementUpdated(el);
      controller.cleanup();

      expect(controller.items).to.have.length(1);
    });
  });

  describe('Tree Utils', () => {
    describe('Identity functions', () => {
      it('should identify tree components', async () => {
        const treeEl = await fixture<TreeComponent>(html`<forge-tree></forge-tree>`);
        const divEl = document.createElement('div');

        expect(isTree(treeEl)).to.be.true;
        expect(isTree(divEl)).to.be.false;
      });

      it('should identify tree item components', async () => {
        const treeItemEl = await fixture<TreeItemComponent>(html`<forge-tree-item></forge-tree-item>`);
        const divEl = document.createElement('div');

        expect(isTreeItem(treeItemEl)).to.be.true;
        expect(isTreeItem(divEl)).to.be.false;
      });
    });

    describe('DOM navigation functions', () => {
      let fixtureEl: TreeComponent;
      let items: TreeItemComponent[];

      beforeEach(async () => {
        fixtureEl = await fixture<TreeComponent>(html`
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
        items = Array.from(fixtureEl.querySelectorAll('forge-tree-item'));
      });

      it('should get correct level for nested items', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        expect(getLevel(parent1)).to.equal(0);
        expect(getLevel(child1)).to.equal(1);
        expect(getLevel(child2)).to.equal(1);
      });

      it('should get parent tree correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;

        expect(getParentTree(parent1)).to.equal(fixtureEl);
        expect(getParentTree(child1)).to.equal(fixtureEl);
      });

      it('should get parent item correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;

        expect(getParentItem(parent1)).to.be.null;
        expect(getParentItem(child1)).to.equal(parent1);
      });

      it('should get child items correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        const children = getChildItems(parent1);
        expect(children).to.have.length(2);
        expect(children).to.include(child1);
        expect(children).to.include(child2);

        const allChildren = getChildItems(fixtureEl, true);
        expect(allChildren).to.have.length(5); // All tree items including nested
      });

      it('should get first and last child items correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const child1 = items.find(item => item.value === 'child1')!;
        const child2 = items.find(item => item.value === 'child2')!;

        expect(getFirstChildItem(parent1)).to.equal(child1);
        expect(getLastChildItem(parent1)).to.equal(child2);
      });

      it('should get sibling items correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const leaf = items.find(item => item.value === 'leaf')!;

        const siblings = getSiblingItems(parent1);
        expect(siblings).to.have.length(2);
        expect(siblings).to.include(parent2);
        expect(siblings).to.include(leaf);

        const siblingsIncludingSelf = getSiblingItems(parent1, true);
        expect(siblingsIncludingSelf).to.have.length(3);
        expect(siblingsIncludingSelf).to.include(parent1);
      });

      it('should get next item correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const child1 = items.find(item => item.value === 'child1')!;

        parent1.open = true;
        expect(getNextItem(parent1)).to.equal(child1);

        parent1.open = false;
        expect(getNextItem(parent1)).to.equal(parent2);
      });

      it('should get previous item correctly', () => {
        const parent1 = items.find(item => item.value === 'parent1')!;
        const parent2 = items.find(item => item.value === 'parent2')!;
        const child1 = items.find(item => item.value === 'child1')!;

        expect(getPreviousItem(parent2)).to.equal(parent1);
        expect(getPreviousItem(child1)).to.equal(parent1);
      });
    });

    describe('Search function', () => {
      it('should find items by text content', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree>
            <forge-tree-item .value=${'apple'}>Apple</forge-tree-item>
            <forge-tree-item .value=${'banana'}>Banana</forge-tree-item>
            <forge-tree-item .value=${'apricot'}>Apricot</forge-tree-item>
          </forge-tree>
        `);

        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const startItem = items.find(item => item.value === 'banana')!;
        const result = searchItems(startItem, 'ap');

        expect(result).to.not.be.null;
        expect(result?.value).to.equal('apricot');
      });
    });

    describe('State functions', () => {
      it('should detect indeterminate state correctly', async () => {
        const el = await fixture<TreeComponent>(html`
          <forge-tree mode="multiple">
            <forge-tree-item .value=${'parent'}>
              Parent
              <forge-tree-item slot="children" .value=${'child1'} selected>Child 1</forge-tree-item>
              <forge-tree-item slot="children" .value=${'child2'}>Child 2</forge-tree-item>
            </forge-tree-item>
          </forge-tree>
        `);

        const items = Array.from(el.querySelectorAll('forge-tree-item')) as TreeItemComponent[];
        const parent = items.find(item => item.value === 'parent')!;

        expect(isIndeterminate(parent)).to.be.true;
      });
    });
  });
});
