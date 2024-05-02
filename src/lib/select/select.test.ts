import { nothing } from 'lit';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { ISelectComponent } from './select/select';
import { IPopoverComponent } from '../popover';

import './select';

describe('Select', () => {
  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();

      await expect(harness.selectEl).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      await harness.openDropdown();

      expect(harness.isOpen).to.be.true;
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });

    it('should be accessible with a selected option', async () => {
      const harness = await createFixture();

      await harness.openDropdown();
      await harness.selectOption(1);
      await harness.dropdownAnimation();

      expect(harness.selectEl.value).to.equal('2');
      expect(harness.isOpen).to.be.false;
      await expect(harness.selectEl).to.be.accessible();
    });

    it('should be accessible when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      await elementUpdated(harness.selectEl);

      await expect(harness.selectEl).to.be.accessible();
    });

    it('should be accessible when multiple', async () => {
      const harness = await createFixture({ multiple: true });

      await expect(harness.selectEl).to.be.accessible();
    });

    it('should be accessible when multiple and open', async () => {
      const harness = await createFixture({ multiple: true });

      await harness.openDropdown();

      expect(harness.isOpen).to.be.true;
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });
  });
});

class SelectHarness {
  constructor(public selectEl: ISelectComponent) {}

  public async openDropdown(): Promise<void> {
    this.clickElement(this.selectEl);
    await elementUpdated(this.selectEl);
    await this.dropdownAnimation();
  }

  public get popoverElement(): IPopoverComponent | undefined {
    return this.selectEl.popupElement;
  }

  public get isOpen(): boolean {
    return this.selectEl.open && !!this.popoverElement && this.popoverElement.isConnected && this.popoverElement.open;
  }

  public async selectOption(index: number): Promise<void> {
    const option = this.popoverElement?.querySelectorAll('forge-list-item')[index];
    if (option) {
      await this.clickElement(option);
    }
  }

  public async dropdownAnimation(): Promise<void> {
    await elementUpdated(this.selectEl);
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  public clickElement(element: HTMLElement): Promise<void> {
    const { x, y, width, height } = element.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
}

interface SelectFixtureConfig {
  multiple?: boolean;
  disabled?: boolean;
}

async function createFixture({
  multiple,
  disabled,
}: SelectFixtureConfig = {}): Promise<SelectHarness> {
  const el = await fixture<ISelectComponent>(html`
    <forge-select
      id="my-label"
      label="Label"
      multiple=${multiple ?? nothing}
      disabled=${disabled ?? nothing}>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2">Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-select>
  `);
  return new SelectHarness(el);
}