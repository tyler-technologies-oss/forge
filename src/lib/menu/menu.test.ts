import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { IMenuComponent } from './menu';
import { IMenuOption, MENU_CONSTANTS } from './menu-constants';
import { IPopoverComponent } from '../popover';

import './menu';
import '../list/list-item';

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

  describe('popup target', () => {
    it('should have popup target property null by default', async () => {
      const harness = await createFixture();

      expect(harness.menuEl.popupTarget).to.equal(null);
    });

    it('should set popup target via attribute', async () => {
      const harness = await createFixture({ popupTarget: 'custom-target' });

      expect(harness.menuEl.popupTarget).to.equal('custom-target');
      expect(harness.menuEl.getAttribute(MENU_CONSTANTS.attributes.POPUP_TARGET)).to.equal('custom-target');
    });

    it('should set popup target via property', async () => {
      const harness = await createFixture();

      harness.menuEl.popupTarget = 'custom-target';

      expect(harness.menuEl.popupTarget).to.equal('custom-target');
      expect(harness.menuEl.getAttribute(MENU_CONSTANTS.attributes.POPUP_TARGET)).to.equal('custom-target');
    });

    it('should position menu relative to popup target element when specified', async () => {
      const container = await fixture(html`
        <div>
          <div id="position-target" style="position: absolute; top: 100px; left: 100px; width: 200px; height: 50px;"></div>
          <forge-menu popup-target="position-target" .options=${OPTIONS}>
            <button type="button">Menu</button>
          </forge-menu>
        </div>
      `);

      const menuEl = container.querySelector('forge-menu') as IMenuComponent;
      const triggerEl = menuEl.querySelector('button') as HTMLButtonElement;
      const targetEl = container.querySelector('#position-target') as HTMLElement;

      await clickElement(triggerEl);
      await elementUpdated(menuEl);
      await new Promise(resolve => setTimeout(resolve, 500));

      const popover = menuEl.popupElement as IPopoverComponent;
      expect(popover).to.exist;
      expect(popover.anchorElement).to.equal(targetEl);
    });

    it('should set aria-expanded on trigger button and not on popup target element', async () => {
      const container = await fixture(html`
        <div>
          <div id="position-target"></div>
          <forge-menu popup-target="position-target" .options=${OPTIONS}>
            <button type="button">Menu</button>
          </forge-menu>
        </div>
      `);

      const menuEl = container.querySelector('forge-menu') as IMenuComponent;
      const triggerEl = menuEl.querySelector('button') as HTMLButtonElement;
      const targetEl = container.querySelector('#position-target') as HTMLElement;

      await clickElement(triggerEl);
      await elementUpdated(menuEl);
      await new Promise(resolve => setTimeout(resolve, 500));

      expect(triggerEl.getAttribute('aria-expanded')).to.equal('true');
      expect(targetEl.hasAttribute('aria-expanded')).to.be.false;
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
  popupTarget?: string;
}

async function createFixture({ options = OPTIONS, popupTarget }: MenuFixtureConfig = {}): Promise<MenuHarness> {
  const el = await fixture<IMenuComponent>(html`
    <forge-menu .options=${options} .popupTarget=${popupTarget ?? undefined}>
      <button type="button">Menu</button>
    </forge-menu>
  `);
  const triggerEl = el.querySelector('button') as HTMLButtonElement;
  return new MenuHarness(el, triggerEl);
}

function clickElement(element: HTMLElement): Promise<void> {
  const { x, y, width, height } = element.getBoundingClientRect();
  return sendMouse({
    type: 'click',
    position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
  });
}
