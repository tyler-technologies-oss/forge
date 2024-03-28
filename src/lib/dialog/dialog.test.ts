import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { IDialogComponent } from './dialog';
import { DIALOG_CONSTANTS } from './dialog-constants';

import './dialog';

describe('Dialog', () => {
  it('should be hidden by default', async () => {
    const harness = await createFixture();
  });

  class PopoverHarness {
    constructor(
      public dialogElement: IDialogComponent,
      public triggerElement: HTMLButtonElement) {}
  
    public get surfaceElement(): HTMLElement {
      return getShadowElement(this.dialogElement, DIALOG_CONSTANTS.selectors.SURFACE) as HTMLElement;
    }

    public get isOpen(): boolean {
      return this.dialogElement.open &&
             this.dialogElement.hasAttribute(POPOVER_CONSTANTS.attributes.OPEN) &&
             this.dialogElement.overlay.open;
    }
  
    public async clickBackdrop(): Promise<void> {
      const { x, y, height, width } = this.surfaceElement.getBoundingClientRect();
      const mouseX = Math.round(x + width * 2);
      const mouseY = Math.round(y + height * 2);
      await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
    }
  
    public async clickTrigger(): Promise<void> {
      const { x, y, height, width } = this.triggerElement.getBoundingClientRect();
      const mouseX = Math.round(x + width / 2);
      const mouseY = Math.round(y + height / 2);
      await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
    }
  
    public async keyboardTrigger(): Promise<void> {
      this.triggerElement.focus();
      await sendKeys({ press: 'Enter' });
    }
  
    public async clickSurface(): Promise<void> {
      const { x, y } = this.surfaceElement.getBoundingClientRect();
      const mouseX = Math.round(x);
      const mouseY = Math.round(y);
      await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
    }

    public async pressEscapeKey(): Promise<void> {
      await sendKeys({ press: 'Escape' });
    }
  
    public exitAnimation(): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  interface IDialogFixtureConfig {
    open?: boolean;
  }
  
  async function createFixture({
    open = false
  }: IDialogFixtureConfig = {}): Promise<PopoverHarness> {
    const container = await fixture(html`
      <button type="button" id="test-trigger">Dialog Trigger</button>
      <forge-dialog
        trigger="test-trigger"
        ?open=${open}>
      </forge-dialog>
    `);
  
    const triggerEl = container.querySelector('#test-trigger') as HTMLButtonElement;
    const popoverEl = container.querySelector('forge-dialog') as IDialogComponent;
  
    return new PopoverHarness(dialogEl, triggerEl);
  }
});
