import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { IToastComponent, ToastComponent } from './toast';
import { TOAST_CONSTANTS } from './toast-constants';
import { timer } from '@tylertech/forge-testing';

import './toast';
import { IOverlayComponent } from '../overlay';
import { IIconComponent } from '../icon';

const TOAST_ANIMATION_DURATION = 400;

describe('Toast', () => {
  it('should have shadow root', async () => {
    const el = await fixture<IToastComponent>(html`<forge-toast>Test</forge-toast>`);

    expect(el.shadowRoot).to.not.be.null;
  });

  it('should have correct default state', async () => {
    const el = await fixture<IToastComponent>(html`<forge-toast>Test</forge-toast>`);

    expect(el.open).to.be.false;
    expect(el.duration).to.equal(TOAST_CONSTANTS.defaults.DURATION);
    expect(el.placement).to.equal(TOAST_CONSTANTS.defaults.PLACEMENT);
    expect(el.actionText).to.be.undefined;
    expect(el.dismissible).to.be.false;
    expect(el.dismissLabel).to.undefined;
    expect(el.theme).to.equal(TOAST_CONSTANTS.defaults.THEME);
  });

  describe('accessibility', () => {
    it('should be accessible when closed', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast>Test</forge-toast>`);

      expect(el.open).to.be.false;
      await expect(el).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(el.getAttribute('role')).to.equal('alert');
      expect(el.getAttribute('aria-live')).to.equal('assertive');
      expect(el.getAttribute('aria-atomic')).to.equal('true');
      await expect(el).to.be.accessible();
    });

    it('should allow for custom role', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast role="presentation">Test</forge-toast>`);

      expect(el.getAttribute('role')).to.equal('presentation');
      expect(el.hasAttribute('aria-live')).to.be.false;
      expect(el.hasAttribute('aria-atomic')).to.be.false;
      await expect(el).to.be.accessible();
    });

    it('should not set ARIA attributes if aria-hidden="true"', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast aria-hidden="true">Test</forge-toast>`);

      expect(el.hasAttribute('role')).to.be.false;
      expect(el.hasAttribute('aria-live')).to.be.false;
      expect(el.hasAttribute('aria-atomic')).to.be.false;
      await expect(el).to.be.accessible();
    });
  });

  describe('open/close', () => {
    it('should show toast when open property is set', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast>Test</forge-toast>`);

      el.open = true;

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.true;
    });

    it('should open by default when open attribute is set', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(getOverlay(el).open).to.be.true;
    });

    it('should hide toast when open property is set to false', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;

      el.open = false;
      await timer(TOAST_ANIMATION_DURATION);

      expect(el.open).to.be.false;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.false;
      expect(getOverlay(el).open).to.be.false;
    });

    it('should not dispatch close event when open set via property', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);
      const closeSpy = sinon.spy();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).to.be.true;

      el.open = false;
      await timer(TOAST_ANIMATION_DURATION);

      expect(el.open).to.be.false;
      expect(closeSpy.called).to.be.false;
    });

    it('should automatically hide after default duration elapses', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);
      const closeSpy = sinon.spy();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).to.be.true;

      await timer(TOAST_ANIMATION_DURATION + TOAST_CONSTANTS.defaults.DURATION);

      expect(el.open).to.be.false;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.false;
      expect(getOverlay(el).open).to.be.false;
    });

    it('should hide after custom duration', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open duration="500">Test</forge-toast>`);

      expect(el.open).to.be.true;

      await timer(TOAST_ANIMATION_DURATION + 500);

      expect(el.open).to.be.false;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.false;
    });

    it('should not hide automatically if duration is set to 0', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open duration="0">Test</forge-toast>`);
      const closeSpy = sinon.spy();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).to.be.true;

      await timer(TOAST_ANIMATION_DURATION + 100);

      expect(el.open).to.be.true;
      expect(closeSpy.called).to.be.false;
    });

    it('should clear existing timeout when duration is set to 0', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;

      el.duration = 0;
      await timer(TOAST_ANIMATION_DURATION + 100);

      expect(el.open).to.be.true;
    });

    it('should reset duration timeout if set while open', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;

      el.duration = 500;
      await timer(TOAST_ANIMATION_DURATION + 500);

      expect(el.open).to.be.false;
    });

    it('should show when show() method is called', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast>Test</forge-toast>`);

      el.show();

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.true;
    });

    it('should hide when hide() method is called', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;

      el.hide();
      await timer(TOAST_ANIMATION_DURATION);

      expect(el.open).to.be.false;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.false;
    });
  });

  describe('dismissible', () => {
    it('should not show close button if not dismissible', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE)).to.be.false;
      expect(getComputedStyle(getCloseButton(el)).display).to.equal('none');
    });

    it('should show close button when dismissible', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible>Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE)).to.be.true;
      expect(getComputedStyle(getCloseButton(el)).display).to.not.equal('none');
    });

    it('should close when close button is clicked', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible>Test</forge-toast>`);

      expect(el.open).to.be.true;

      getCloseButton(el).click();
      await timer(TOAST_ANIMATION_DURATION);

      expect(el.open).to.be.false;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.false;
    });

    it('should dispatch close event when close button is clicked', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible>Test</forge-toast>`);
      const closeSpy = sinon.spy();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      getCloseButton(el).click();
      await timer(TOAST_ANIMATION_DURATION);

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should have default dismiss label', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible>Test</forge-toast>`);

      expect(getCloseButton(el).getAttribute('aria-label')).to.equal('Dismiss');
    });

    it('should have custom dismiss label', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible dismiss-label="Close">Test</forge-toast>`);

      expect(el.dismissLabel).to.equal('Close');
      expect(getCloseButton(el).getAttribute('aria-label')).to.equal('Close');
    });

    it('should set dismiss label dynamically while open', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible>Test</forge-toast>`);

      expect(getCloseButton(el).getAttribute('aria-label')).to.equal('Dismiss');

      el.dismissLabel = 'Close';
      await elementUpdated(el);

      expect(el.dismissLabel).to.equal('Close');
      expect(getCloseButton(el).getAttribute('aria-label')).to.equal('Close');
    });

    it('should hide close button dynamically while open if not dismissible', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open dismissible>Test</forge-toast>`);
      const closeSpy = sinon.spy();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(getCloseButton(el).hidden).to.be.false;

      el.dismissible = false;
      await elementUpdated(el);

      getCloseButton(el).click();
      await timer(TOAST_ANIMATION_DURATION);

      expect(el.open).to.be.true;
      expect(closeSpy.called).to.be.false;
    });
  });

  describe('action button', () => {
    it('should not show action button if action text is not set', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open>Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT)).to.be.false;
      expect(getActionButton(el).hidden).to.be.true;
    });

    it('should show action button when action text is set', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open action-text="Action">Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT)).to.be.true;
      expect(getActionButton(el).hidden).to.be.false;
    });

    it('should dispatch action event when action button is clicked', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open action-text="Action">Test</forge-toast>`);
      const actionSpy = sinon.spy();
      el.addEventListener(TOAST_CONSTANTS.events.ACTION, actionSpy);

      getActionButton(el).click();

      expect(actionSpy.calledOnce).to.be.true;
    });

    it('should not hide when action button is clicked', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open action-text="Action">Test</forge-toast>`);

      expect(el.open).to.be.true;

      getActionButton(el).click();
      await timer(TOAST_ANIMATION_DURATION);

      expect(el.open).to.be.true;
    });

    it('should hide action button dynamically while open if action text is removed', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast open action-text="Action">Test</forge-toast>`);

      expect(el.open).to.be.true;
      expect(getActionButton(el).hidden).to.be.false;

      el.actionText = '';
      await elementUpdated(el);

      expect(getActionButton(el).hidden).to.be.true;
    });
  });

  describe('placement', () => {
    it('should set placement', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast placement="top">Test</forge-toast>`);

      expect(el.placement).to.equal('top');
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).to.equal('top');
    });

    it('should set placement to default if null/undefined is provided', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast placement="top">Test</forge-toast>`);

      el.placement = undefined as any;
      await elementUpdated(el);

      expect(el.placement).to.equal(TOAST_CONSTANTS.defaults.PLACEMENT);
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).to.equal(TOAST_CONSTANTS.defaults.PLACEMENT);
    });
  });

  describe('theme', () => {
    it('should set theme', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast theme="success">Test</forge-toast>`);

      expect(el.theme).to.equal('success');
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.THEME)).to.equal('success');
    });

    it('should set theme to default if null/undefined is provided', async () => {
      const el = await fixture<IToastComponent>(html`<forge-toast theme="success">Test</forge-toast>`);

      el.theme = undefined as any;
      await elementUpdated(el);

      expect(el.theme).to.equal(TOAST_CONSTANTS.defaults.THEME);
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.THEME)).to.equal(TOAST_CONSTANTS.defaults.THEME);
    });
  });

  describe('static present()', () => {
    afterEach(() => {
      const toasts = document.querySelectorAll('forge-toast');
      toasts.forEach(toast => toast.remove());
    });

    it('should show toast dynamically', async () => {
      const toast = ToastComponent.present({ message: 'Test' });

      expect(toast.isConnected).to.be.true;
      expect(toast.open).to.be.true;
      expect(toast.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(toast.textContent).to.equal('Test');
    });

    it('should set action text', async () => {
      const toast = ToastComponent.present({ message: 'Test', actionText: 'Action' });

      expect(toast.actionText).to.equal('Action');
      expect(getActionButton(toast).hidden).to.be.false;
    });

    it('should set duration', async () => {
      const toast = ToastComponent.present({ message: 'Test', duration: 500 });

      expect(toast.open).to.be.true;

      await timer(TOAST_ANIMATION_DURATION + 500);

      expect(toast.open).to.be.false;
      expect(toast.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).to.be.false;
    });

    it('should set placement', async () => {
      const toast = ToastComponent.present({ message: 'Test', placement: 'top' });

      expect(toast.placement).to.equal('top');
      expect(toast.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).to.equal('top');
    });

    it('should set dismissible', async () => {
      const toast = ToastComponent.present({ message: 'Test', dismissible: true });

      expect(toast.dismissible).to.be.true;
      expect(toast.hasAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE)).to.be.true;
    });

    it('should set theme', async () => {
      const toast = ToastComponent.present({ message: 'Test', theme: 'success' });

      expect(toast.theme).to.equal('success');
      expect(toast.getAttribute(TOAST_CONSTANTS.attributes.THEME)).to.equal('success');
    });

    it('should set icon', async () => {
      const toast = ToastComponent.present({ message: 'Test', icon: { name: 'info' } });

      const iconEl = toast.querySelector('forge-icon') as IIconComponent;
      expect(iconEl).to.be.ok;
      expect(iconEl.slot).to.equal('icon');
      expect(iconEl.name).to.equal('info');
    });

    it('should add css class', async () => {
      const toast = ToastComponent.present({ message: 'Test', className: 'custom-class' });

      expect(toast.classList.contains('custom-class')).to.be.true;
    });

    it('should add multiple css classes', async () => {
      const toast = ToastComponent.present({ message: 'Test', className: ['class1', 'class2'] });

      expect(toast.classList.contains('class1')).to.be.true;
      expect(toast.classList.contains('class2')).to.be.true;
    });

    it('should append element', async () => {
      const element = document.createElement('div');
      element.id = 'custom-toast-content';
      element.textContent = 'Test';
      const toast = ToastComponent.present({ element });

      expect(toast.querySelector('#custom-toast-content')).to.equal(element);
    });
  });

  function getOverlay(el: IToastComponent): IOverlayComponent {
    return el.shadowRoot?.querySelector('forge-overlay') as IOverlayComponent;
  }

  function getCloseButton(el: IToastComponent): HTMLButtonElement {
    return el.shadowRoot?.querySelector(TOAST_CONSTANTS.selectors.CLOSE_BUTTON) as HTMLButtonElement;
  }

  function getActionButton(el: IToastComponent): HTMLButtonElement {
    return el.shadowRoot?.querySelector(TOAST_CONSTANTS.selectors.ACTION_BUTTON) as HTMLButtonElement;
  }
});
