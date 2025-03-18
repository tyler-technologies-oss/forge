import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { IMenuComponent } from './menu';
import { IMenuOption } from './menu-constants';
import { IPopoverComponent } from '../popover';

import './menu';

const OPTIONS: IMenuOption<number>[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
];

describe('Menu', () => {
  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();

      await expect(harness.menuEl).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      await harness.openMenu();

      expect(harness.isOpen).to.be.true;
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });
  });
});

class MenuHarness {
  constructor(
    public menuEl: IMenuComponent,
    public triggerEl: HTMLButtonElement
  ) {}

  public async openMenu(): Promise<void> {
    this.clickElement(this.triggerEl);
    await elementUpdated(this.menuEl);
    await this.dropdownAnimation();
  }

  public async dropdownAnimation(): Promise<void> {
    await elementUpdated(this.menuEl);
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  public get popoverElement(): IPopoverComponent | undefined {
    return this.menuEl.popupElement as IPopoverComponent | undefined;
  }

  public get isOpen(): boolean {
    return this.menuEl.open && !!this.popoverElement && this.popoverElement.isConnected && this.popoverElement.open;
  }

  public async selectOption(index: number): Promise<void> {
    await this.openMenu();
    const option = this.popoverElement?.querySelectorAll('forge-list-item')[index];
    if (option) {
      await this.clickElement(option);
    }
  }

  public clickElement(element: HTMLElement): Promise<void> {
    const { x, y, width, height } = element.getBoundingClientRect();
    return sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }
}

interface MenuFixtureConfig {
  options?: IMenuOption[];
}

async function createFixture({ options = OPTIONS }: MenuFixtureConfig = {}): Promise<MenuHarness> {
  const el = await fixture<IMenuComponent>(html`
    <forge-menu .options=${options}>
      <button type="button">Menu</button>
    </forge-menu>
  `);
  const triggerEl = el.querySelector('button') as HTMLButtonElement;
  return new MenuHarness(el, triggerEl);
}
