import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { nothing } from 'lit';
import { spy } from 'sinon';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { frame, task } from '../core/utils/utils';
import { IDialogComponent } from './dialog';
import {
  DIALOG_CONSTANTS,
  DialogAnimationType,
  DialogMode,
  DialogPlacement,
  DialogPositionStrategy,
  DialogPreset,
  DialogSizeStrategy,
  DialogType
} from './dialog-constants';
import { type DialogCore } from './dialog-core';
import { type MoveController } from '../core/controllers/move-controller';

import './dialog';

describe('Dialog', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.dialogElement.shadowRoot).to.not.be.null;
  });

  describe('API', () => {
    it('should have expected default values', async () => {
      const harness = await createFixture();

      expect(harness.dialogElement.type).to.equal(DIALOG_CONSTANTS.defaults.TYPE);
      expect(harness.dialogElement.mode).to.equal(DIALOG_CONSTANTS.defaults.MODE);
      expect(harness.dialogElement.animationType).to.equal(DIALOG_CONSTANTS.defaults.ANIMATION_TYPE);
      expect(harness.dialogElement.preset).to.equal(DIALOG_CONSTANTS.defaults.PRESET);
      expect(harness.dialogElement.persistent).to.be.false;
      expect(harness.dialogElement.fullscreen).to.be.false;
      expect(harness.dialogElement.fullscreenThreshold).to.equal(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD);
      expect(harness.dialogElement.positionStrategy).to.equal(DIALOG_CONSTANTS.defaults.POSITION_STRATEGY);
      expect(harness.dialogElement.sizeStrategy).to.equal(DIALOG_CONSTANTS.defaults.SIZE_STRATEGY);
      expect(harness.dialogElement.placement).to.equal(DIALOG_CONSTANTS.defaults.PLACEMENT);
      expect(harness.dialogElement.moveable).to.be.false;
    });

    it('should set mode by default', async () => {
      const harness = await createFixture({ mode: 'nonmodal' });

      expect(harness.dialogElement.mode).to.equal('nonmodal');
    });

    it('should set mode via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.mode = 'modal';

      expect(harness.dialogElement.mode).to.equal('modal');
    });

    it('should set mode via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.MODE, 'modal');

      expect(harness.dialogElement.mode).to.equal('modal');
    });

    it('should set to default mode if attribute is removed', async () => {
      const harness = await createFixture({ mode: 'nonmodal' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.MODE);

      expect(harness.dialogElement.mode).to.equal(DIALOG_CONSTANTS.defaults.MODE);
    });

    it('should set type by default', async () => {
      const harness = await createFixture({ type: 'alertdialog' });

      expect(harness.dialogElement.type).to.equal('alertdialog');
    });

    it('should set type via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.type = 'alertdialog';

      expect(harness.dialogElement.type).to.equal('alertdialog');
    });

    it('should set type via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.TYPE, 'alertdialog');

      expect(harness.dialogElement.type).to.equal('alertdialog');
    });

    it('should set to default type if attribute is removed', async () => {
      const harness = await createFixture({ type: 'alertdialog' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.TYPE);

      expect(harness.dialogElement.type).to.equal(DIALOG_CONSTANTS.defaults.TYPE);
    });

    it('should set animation type by default', async () => {
      const harness = await createFixture({ animationType: 'fade' });

      expect(harness.dialogElement.animationType).to.equal('fade');
    });

    it('should set animation type via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.animationType = 'fade';

      expect(harness.dialogElement.animationType).to.equal('fade');
    });

    it('should set animation type via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.ANIMATION_TYPE, 'fade');

      expect(harness.dialogElement.animationType).to.equal('fade');
    });

    it('should set to default animation type if attribute is removed', async () => {
      const harness = await createFixture({ animationType: 'fade' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.ANIMATION_TYPE);

      expect(harness.dialogElement.animationType).to.equal(DIALOG_CONSTANTS.defaults.ANIMATION_TYPE);
    });

    it('should set preset by default', async () => {
      const harness = await createFixture({ preset: 'right-sheet' });

      expect(harness.dialogElement.preset).to.equal('right-sheet');
    });

    it('should set preset via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.preset = 'right-sheet';

      expect(harness.dialogElement.preset).to.equal('right-sheet');
    });

    it('should set preset via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.PRESET, 'right-sheet');

      expect(harness.dialogElement.preset).to.equal('right-sheet');
    });

    it('should set to default preset if attribute is removed', async () => {
      const harness = await createFixture({ preset: 'right-sheet' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.PRESET);

      expect(harness.dialogElement.preset).to.equal(DIALOG_CONSTANTS.defaults.PRESET);
    });

    it('should set persistent by default', async () => {
      const harness = await createFixture({ persistent: true });

      expect(harness.dialogElement.persistent).to.be.true;
    });

    it('should set dismissible via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.persistent = true;

      expect(harness.dialogElement.persistent).to.be.true;
    });

    it('should set persistent via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.PERSISTENT, '');

      expect(harness.dialogElement.persistent).to.be.true;
    });

    it('should set fullscreen by default', async () => {
      const harness = await createFixture({ fullscreen: true });

      expect(harness.dialogElement.fullscreen).to.be.true;
    });

    it('should set fullscreen via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.fullscreen = true;

      expect(harness.dialogElement.fullscreen).to.be.true;
    });

    it('should set fullscreen via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN, '');

      expect(harness.dialogElement.fullscreen).to.be.true;
    });

    it('should set fullscreen threshold by default', async () => {
      const harness = await createFixture({ fullscreenThreshold: 800 });

      expect(harness.dialogElement.fullscreenThreshold).to.equal(800);
    });

    it('should set fullscreen threshold via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.fullscreenThreshold = 800;

      expect(harness.dialogElement.fullscreenThreshold).to.equal(800);
    });

    it('should set fullscreen threshold via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN_THRESHOLD, '800');

      expect(harness.dialogElement.fullscreenThreshold).to.equal(800);
    });

    it('should set to default fullscreen threshold if attribute is removed', async () => {
      const harness = await createFixture({ fullscreenThreshold: 800 });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN_THRESHOLD);

      expect(harness.dialogElement.fullscreenThreshold).to.equal(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD);
    });

    it('should set position strategy by default', async () => {
      const harness = await createFixture({ positionStrategy: 'container' });

      expect(harness.dialogElement.positionStrategy).to.equal('container');
    });

    it('should set position strategy via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.positionStrategy = 'container';

      expect(harness.dialogElement.positionStrategy).to.equal('container');
    });

    it('should set position strategy via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_STRATEGY, 'container');

      expect(harness.dialogElement.positionStrategy).to.equal('container');
    });

    it('should set to default position strategy if attribute is removed', async () => {
      const harness = await createFixture({ positionStrategy: 'container' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.POSITION_STRATEGY);

      expect(harness.dialogElement.positionStrategy).to.equal(DIALOG_CONSTANTS.defaults.POSITION_STRATEGY);
    });

    it('should set size strategy by default', async () => {
      const harness = await createFixture({ sizeStrategy: 'container-inline' });

      expect(harness.dialogElement.sizeStrategy).to.equal('container-inline');
    });

    it('should set size strategy via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.sizeStrategy = 'container-inline';

      expect(harness.dialogElement.sizeStrategy).to.equal('container-inline');
    });

    it('should set size strategy via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.SIZE_STRATEGY, 'container-inline');

      expect(harness.dialogElement.sizeStrategy).to.equal('container-inline');
    });

    it('should set to default size strategy if attribute is removed', async () => {
      const harness = await createFixture({ sizeStrategy: 'container-inline' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.SIZE_STRATEGY);

      expect(harness.dialogElement.sizeStrategy).to.equal(DIALOG_CONSTANTS.defaults.SIZE_STRATEGY);
    });

    it('should set placement by default', async () => {
      const harness = await createFixture({ placement: 'bottom' });

      expect(harness.dialogElement.placement).to.equal('bottom');
    });

    it('should set placement via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.placement = 'bottom';

      expect(harness.dialogElement.placement).to.equal('bottom');
    });

    it('should set placement via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.PLACEMENT, 'bottom');

      expect(harness.dialogElement.placement).to.equal('bottom');
    });

    it('should set to default placement if attribute is removed', async () => {
      const harness = await createFixture({ placement: 'bottom' });

      harness.dialogElement.removeAttribute(DIALOG_CONSTANTS.attributes.PLACEMENT);

      expect(harness.dialogElement.placement).to.equal(DIALOG_CONSTANTS.defaults.PLACEMENT);
    });

    it('should set moveable by default', async () => {
      const harness = await createFixture({ moveable: true });

      expect(harness.dialogElement.moveable).to.be.true;
    });

    it('should set moveable via property', async () => {
      const harness = await createFixture();

      harness.dialogElement.moveable = true;

      expect(harness.dialogElement.moveable).to.be.true;
    });

    it('should set moveable via attribute', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, '');

      expect(harness.dialogElement.moveable).to.be.true;
    });
  });

  describe('accessibility', () => {
    it('should be accessible when closed', async () => {
      const harness = await createFixture();

      await expect(harness.dialogElement).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      await expect(harness.dialogElement).to.be.accessible();
    });

    it('should be accessible when type is set to alertdialog', async () => {
      const harness = await createFixture({ type: 'alertdialog' });

      await harness.showAsync();

      expect(harness.nativeDialogElement.role).to.equal('alertdialog');
      await expect(harness.dialogElement).to.be.accessible();
    });

    it('should be accessible when mode is set to nonmodal', async () => {
      const harness = await createFixture({ mode: 'nonmodal' });

      await harness.showAsync();

      expect(harness.nativeDialogElement.getAttribute('aria-modal')).to.equal('false');
      await expect(harness.dialogElement).to.be.accessible();
    });

    it('should be accessible when label is set', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      const labelElement = harness.nativeDialogElement.querySelector(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL) as HTMLElement;

      expect(labelElement).to.be.ok;
      expect(labelElement.isConnected).to.be.true;
      expect(labelElement.textContent).to.equal('My dialog title');
      expect(labelElement.id).to.equal('forge-dialog-label');
      expect(harness.nativeDialogElement.getAttribute('aria-labelledby')).to.equal('forge-dialog-label');
      await expect(harness.dialogElement).to.be.accessible();
    });

    it('should be accessible when description is set', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      const descriptionElement = harness.nativeDialogElement.querySelector(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION) as HTMLElement;

      expect(descriptionElement).to.be.ok;
      expect(descriptionElement.isConnected).to.be.true;
      expect(descriptionElement.textContent).to.equal('My dialog description');
      expect(descriptionElement.id).to.equal('forge-dialog-description');
      expect(harness.nativeDialogElement.getAttribute('aria-describedby')).to.equal('forge-dialog-description');
      await expect(harness.dialogElement).to.be.accessible();
    });

    it('should not add multiple visually hidden elements when label or description is updated dynamically', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      const labelElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL);
      const descriptionElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION);

      expect(labelElements.length).to.equal(1);
      expect(descriptionElements.length).to.equal(1);
      expect(labelElements[0].textContent).to.equal('My dialog title');
      expect(descriptionElements[0].textContent).to.equal('My dialog description');

      harness.dialogElement.label = 'My new dialog title';
      harness.dialogElement.description = 'My new dialog description';

      await elementUpdated(harness.dialogElement);

      const newLabelElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL);
      const newDescriptionElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION);

      expect(newLabelElements.length).to.equal(1);
      expect(newDescriptionElements.length).to.equal(1);
      expect(newLabelElements[0].textContent).to.equal('My new dialog title');
      expect(newDescriptionElements[0].textContent).to.equal('My new dialog description');
    });
  });

  describe('open state', () => {
    it('should be hidden by default', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).to.be.false;
    });

    it('should be open by default when setting open attribute', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;
    });

    it('should open when open property set dynamically', async () => {
      const harness = await createFixture();

      harness.dialogElement.open = true;

      expect(harness.isOpen).to.be.true;
    });

    it('should open when open attribute set dynamically', async () => {
      const harness = await createFixture();

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.OPEN, '');

      expect(harness.isOpen).to.be.true;
    });

    it('should open when show() method is called', async () => {
      const harness = await createFixture();

      harness.dialogElement.show();

      expect(harness.isOpen).to.be.true;
    });

    it('should close when hide() method is called', async () => {
      const harness = await createFixture({ open: true });

      harness.dialogElement.hide();

      expect(harness.isOpen).to.be.false;
    });

    it('should close when open property set dynamically', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;

      harness.dialogElement.open = false;

      expect(harness.isOpen).to.be.false;
    });

    it('should open when clicking trigger element', async () => {
      const harness = await createFixture();

      expect(harness.dialogElement.trigger).to.equal(harness.triggerElement.id);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should close when button with formmethod="dialog" is clicked', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      const submitSpy = spy();
      const formEl = harness.dialogElement.querySelector('form') as HTMLFormElement;
      formEl.addEventListener('submit', submitSpy);

      expect(harness.isOpen).to.be.true;

      await harness.clickFormCloseButton();

      expect(submitSpy).to.have.been.calledOnce;
      expect(harness.isOpen).to.be.false;
      expect(beforeCloseSpy).to.have.been.calledOnce;
      expect(beforeCloseSpy).to.have.been.calledWithMatch({ detail: { reason: 'submit' } });
    });

    it('should close when submit button is clicked within a form that has method="dialog"', async () => {
      const harness = await createFixture({ open: true });

      const submitSpy = spy();
      const formEl = harness.dialogElement.querySelector('form[method="dialog"]') as HTMLFormElement;
      formEl.addEventListener('submit', submitSpy);

      expect(harness.isOpen).to.be.true;

      await harness.clickFormSubmitButton();

      expect(submitSpy).to.have.been.calledOnce;
      expect(harness.isOpen).to.be.false;
    });

    it('should set focus to element with autofocus attribute when modal', async () => {
      const harness = await createFixture({ open: true, autofocus: true });

      await elementUpdated(harness.dialogElement);

      expect(harness.formCloseButton).to.equal(document.activeElement);
    });

    it('should set focus to element with autofocus attribute when inline-modal', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal', autofocus: true });

      await elementUpdated(harness.dialogElement);

      expect(harness.formCloseButton).to.equal(document.activeElement);
    });

    it('should set focus to element with autofocus attribute when nonmodal', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal', autofocus: true });

      await elementUpdated(harness.dialogElement);

      expect(harness.formCloseButton).to.equal(document.activeElement);
    });

    it('should set focus to <dialog> element when modal and no autofocus element is present', async () => {
      const harness = await createFixture({ open: true });

      await elementUpdated(harness.dialogElement);

      expect(harness.dialogElement.matches(':focus-within')).to.be.true;
    });

    it('should not set focus to dialog when inline-modal', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      await harness.focusDelay();

      expect(harness.dialogElement.matches(':focus-within')).to.be.false;
    });

    it('should not set focus to dialog when nonmodal', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      await harness.focusDelay();

      expect(harness.dialogElement.matches(':focus-within')).to.be.false;
    });

    it('should open immediately when animation type is set to none', async () => {
      const harness = await createFixture({ animationType: 'none' });

      harness.dialogElement.show();

      expect(harness.isOpen).to.be.true;
    });

    it('should close immediately when animation type is set to none', async () => {
      const harness = await createFixture({ open: true, animationType: 'none' });

      harness.dialogElement.hide();

      expect(harness.isOpen).to.be.false;
    });
  });

  describe('events', () => {
    it('should fire open event when opened', async () => {
      const harness = await createFixture();

      const openSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.OPEN, openSpy);

      harness.dialogElement.show();

      expect(openSpy).to.have.been.calledOnce;
    });

    it('should fire close event when closed', async () => {
      const harness = await createFixture({ open: true });

      const closeSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);

      await harness.hideAsync();

      expect(closeSpy).to.have.been.calledOnce;
    });

    it('should fire before close event when closing via click outside', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      await harness.clickOutside();

      expect(beforeCloseSpy).to.have.been.calledOnce;
    });

    it('should fire before close event when closing via escape key', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      await harness.pressEscapeKey();

      expect(beforeCloseSpy).to.have.been.calledOnce;
      expect(beforeCloseSpy).to.have.been.calledWithMatch({ detail: { reason: 'escape' } });
    });
  });

  describe('modal', () => {
    it('should show backdrop', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.backdropElement.visible).to.be.true;
    });

    it('should show in top layer', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.nativeDialogElement.matches(':modal')).to.be.true;
    });

    it('should not close when clicking outside dialog when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should not close when clicking outside dialog when persistent set after open', async () => {
      const harness = await createFixture({ open: true });

      harness.dialogElement.persistent = true;

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should not close when pressing escape key when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.true;
    });

    it('should not close when pressing escape key when persistent set after open', async () => {
      const harness = await createFixture({ open: true });

      harness.dialogElement.persistent = true;

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.true;
    });

    it('should close when clicking outside dialog', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should close when pressing escape key', async () => {
      const harness = await createFixture({ open: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close when clicking surface', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickSurface();

      expect(harness.isOpen).to.be.true;
    });

    it('should fire before close event when closed via backdrop', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      await harness.clickOutside();

      expect(beforeCloseSpy).to.have.been.calledOnce;
      expect(beforeCloseSpy).to.have.been.calledWithMatch({ detail: { reason: 'backdrop' } });
    });
  });

  describe('inline-modal', () => {
    it('should show with backdrop', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      expect(harness.backdropElement.visible).to.be.true;
    });

    it('should not be in top layer', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      expect(harness.nativeDialogElement.matches(':modal')).to.be.false;
    });

    it('should close when escape key is pressed', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.false;
    });

    it('should close when clicking outside dialog', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close if escape is pressed while a nested element in the dismissible stack is open', async () => {
      const el = await fixture(html`
        <forge-dialog mode="inline-modal">
          <div>Parent dialog</div>
          <forge-dialog mode="inline-modal">
            <div>Nested dialog</div>
          </forge-dialog>
        </forge-dialog>
      `);

      const parentDialog = el as IDialogComponent;
      const nestedDialog = el.querySelector('forge-dialog') as IDialogComponent;

      parentDialog.show();
      await task(400);

      nestedDialog.show();
      await task(400);

      sendKeys({ press: 'Escape' });

      await task(400);

      expect(parentDialog.open).to.be.true;
      expect(nestedDialog.open).to.be.false;
    });
  });

  describe('nonmodal', () => {
    it('should not show backdrop', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      expect(harness.backdropElement.visible).to.be.false;
    });

    it('should not close when clicking outside dialog', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should not close when pressing escape key', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.true;
    });
  });

  describe('trigger', () => {
    it('should be attached to trigger element when trigger attribute is set', async () => {
      const harness = await createFixture();

      expect(harness.dialogElement.trigger).to.equal(harness.triggerElement.id);
      expect(harness.dialogElement.triggerElement).to.equal(harness.triggerElement);
    });

    it('should dynamically attach to trigger element when trigger property is set', async () => {
      const harness = await createFixture();

      harness.dialogElement.trigger = harness.altTriggerElement.id;

      expect(harness.dialogElement.trigger).to.equal(harness.altTriggerElement.id);
      expect(harness.dialogElement.triggerElement).to.equal(harness.altTriggerElement);

      await harness.clickTrigger(harness.triggerElement);

      expect(harness.isOpen).to.be.false;

      await harness.clickTrigger(harness.altTriggerElement);

      expect(harness.isOpen).to.be.true;
    });

    it('should dynamically attach to trigger element when new trigger element is set', async () => {
      const harness = await createFixture();

      harness.dialogElement.triggerElement = harness.altTriggerElement;

      expect(harness.dialogElement.trigger).to.equal('');
      expect(harness.dialogElement.triggerElement).to.equal(harness.altTriggerElement);

      await harness.clickTrigger(harness.triggerElement);

      expect(harness.isOpen).to.be.false;

      await harness.clickTrigger(harness.altTriggerElement);

      expect(harness.isOpen).to.be.true;
    });

    it('should detach from trigger element if no id is set', async () => {
      const harness = await createFixture();

      expect(harness.dialogElement.triggerElement).not.to.be.null;

      harness.dialogElement.trigger = '';

      expect(harness.dialogElement.trigger).to.equal('');
      expect(harness.dialogElement.triggerElement).to.be.null;
    });
  });

  describe('moveable', () => {
    it('should not be moveable by default', async () => {
      const harness = await createFixture({ open: true });

      expect(getComputedStyle(harness.moveHandleElement).display).to.equal('none');
    });

    it('should be moveable when moveable attribute is set', async () => {
      const harness = await createFixture({ open: true, moveable: true });

      expect(getComputedStyle(harness.moveHandleElement).display).to.not.equal('none');
    });

    it('should be moveable when moveable property is set', async () => {
      const harness = await createFixture({ open: true });

      harness.dialogElement.moveable = true;

      expect(getComputedStyle(harness.moveHandleElement).display).to.not.equal('none');
    });

    it('should be moveable when moveable attribute is set dynamically', async () => {
      const harness = await createFixture({ open: true });

      harness.dialogElement.setAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, '');

      expect(getComputedStyle(harness.moveHandleElement).display).to.not.equal('none');
    });

    it('should move dialog when move handle is dragged', async () => {
      const harness = await createFixture({ moveable: true });
      await harness.showAsync();

      const moveStartSpy = spy();
      const moveSpy = spy();
      const moveEndSpy = spy();

      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.MOVE_START, moveStartSpy);
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.MOVE, moveSpy);
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.MOVE_END, moveEndSpy);

      const { x: origX, y: origY } = harness.surfaceElement.getBoundingClientRect();
      const { x, y, height, width } = harness.moveHandleElement.getBoundingClientRect();
      const [handleX, handleY]: [number, number] = [x + width / 2, y + height / 2];
      const amountToMove = 50;

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).to.be.false;
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).to.be.false;

      harness.simulateMoveHandleDown();
      harness.simulateMoveHandleMove(handleX + amountToMove, handleY + amountToMove);

      expect(moveStartSpy).to.have.been.calledOnce;
      expect(moveSpy).to.have.been.calledOnce;
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).to.be.true;
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).to.be.true;

      harness.simulateMoveHandleUp();

      expect(moveEndSpy).to.have.been.calledOnce;

      await elementUpdated(harness.surfaceElement);

      const { x: newX, y: newY } = harness.surfaceElement.getBoundingClientRect();

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).to.be.true;
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).to.be.false;
      expect(harness.surfaceElement.style.top).to.be.ok;
      expect(harness.surfaceElement.style.left).to.be.ok;
      expect(newX).not.to.equal(origX);
      expect(newY).not.to.equal(origY);

      await harness.hideAsync();

      expect(harness.dialogElement['_core']['_moveController']).to.be.undefined;
    });

    it('should not move dialog if setting moveable=false while open', async () => {
      const harness = await createFixture({ moveable: true });

      await harness.showAsync();
      harness.dialogElement.moveable = false;

      const { x: origX, y: origY } = harness.surfaceElement.getBoundingClientRect();
      const amountToMove = 50;

      harness.simulateMoveHandleDown();
      harness.simulateMoveHandleMove(origX + amountToMove, origY + amountToMove);

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).to.be.false;
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).to.be.false;

      harness.simulateMoveHandleUp();

      await elementUpdated(harness.surfaceElement);

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).to.be.false;
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).to.be.false;
      expect(harness.surfaceElement.style.top).not.to.be.ok;
      expect(harness.surfaceElement.style.left).not.to.be.ok;
      expect(harness.surfaceElement.getBoundingClientRect().x).to.equal(origX);
      expect(harness.surfaceElement.getBoundingClientRect().y).to.equal(origY);
    });
  });

  describe('fullscreen', () => {
    it('should set fullscreen when opened if threshold is already reached', async () => {
      const harness = await createFixture();

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });
      await harness.showAsync();

      expect(harness.dialogElement.fullscreen).to.be.true;
    });

    it('should set full screen when threshold is reached', async () => {
      const harness = await createFixture({ open: true });

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });

      expect(harness.dialogElement.fullscreen).to.be.true;
    });

    it('should unset full screen when threshold is no longer reached', async () => {
      const harness = await createFixture();

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });

      await harness.showAsync();

      expect(harness.dialogElement.fullscreen).to.be.true;

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 1, height: 1000 });

      expect(harness.dialogElement.fullscreen).to.be.false;
    });

    it('should fire fullscreen-change event when fullscreen threshold changes', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.dialogElement.fullscreen).to.be.false;

      const fullscreenChangeSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, fullscreenChangeSpy);

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });
      await elementUpdated(harness.dialogElement);

      expect(harness.dialogElement.fullscreen).to.be.true;
      expect(fullscreenChangeSpy).to.have.been.calledOnce;
      expect(fullscreenChangeSpy).to.have.been.calledWithMatch({ detail: true });

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 1, height: 1000 });
      await elementUpdated(harness.dialogElement);

      expect(harness.dialogElement.fullscreen).to.be.false;
      expect(fullscreenChangeSpy).to.have.been.calledTwice;
      expect(fullscreenChangeSpy).to.have.been.calledWithMatch({ detail: false });
    });

    it('should not fire fullscreen-change event when fullscreen property is set already when opened', async () => {
      const harness = await createFixture({ fullscreen: true });

      const fullscreenChangeSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, fullscreenChangeSpy);

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });

      await harness.showAsync();

      expect(harness.dialogElement.fullscreen).to.be.true;
      expect(fullscreenChangeSpy).to.not.have.been.called;
    });

    it('should not listen for fullscreen change if threshold is set to 0', async () => {
      const harness = await createFixture({ fullscreenThreshold: 0 });

      await harness.showAsync();

      const fullscreenChangeSpy = spy();
      harness.dialogElement.addEventListener(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, fullscreenChangeSpy);

      expect(harness.dialogElement.fullscreen).to.be.false;

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });
      await elementUpdated(harness.dialogElement);

      expect(harness.dialogElement.fullscreen).to.be.false;
      expect(fullscreenChangeSpy).to.not.have.been.called;

      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 1, height: 1000 });
      await elementUpdated(harness.dialogElement);

      expect(harness.dialogElement.fullscreen).to.be.false;
      expect(fullscreenChangeSpy).to.not.have.been.called;
    });

    it('should reset fullscreen value to original value dialog opened with if media query changes while open', async () => {
      const harness = await createFixture();

      expect(harness.dialogElement.fullscreen).to.be.false;

      await harness.showAsync();
      await setViewport({ width: DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, height: 1000 });

      expect(harness.dialogElement.fullscreen).to.be.true;

      await harness.hideAsync();

      expect(harness.dialogElement.fullscreen).to.be.false;
    });
  });
});

type DialogCoreInternal = DialogCore & { _moveController: MoveController };
type DialogComponentWithCore = IDialogComponent & { _core: DialogCoreInternal };

class DialogHarness {
  constructor(
    public dialogElement: DialogComponentWithCore,
    public triggerElement: HTMLButtonElement,
    public altTriggerElement: HTMLButtonElement,
    public formCloseButton: HTMLButtonElement,
    public formSubmitButton: HTMLButtonElement
  ) {}

  public get nativeDialogElement(): HTMLDialogElement {
    return getShadowElement(this.dialogElement, DIALOG_CONSTANTS.selectors.DIALOG) as HTMLDialogElement;
  }

  public get surfaceElement(): HTMLElement {
    return getShadowElement(this.dialogElement, DIALOG_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  public get moveHandleElement(): HTMLElement {
    return getShadowElement(this.dialogElement, DIALOG_CONSTANTS.selectors.MOVE_HANDLE) as HTMLElement;
  }

  public get backdropElement(): IBackdropComponent {
    return getShadowElement(this.dialogElement, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public get isOpen(): boolean {
    return (
      this.dialogElement.open &&
      this.dialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN) &&
      this.dialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.VISIBLE) &&
      this.nativeDialogElement.open &&
      this.nativeDialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN) &&
      getComputedStyle(this.nativeDialogElement).display !== 'none'
    );
  }

  public showAsync(): Promise<void> {
    this.dialogElement.show();
    return this.enterAnimation();
  }

  public hideAsync(): Promise<void> {
    this.dialogElement.hide();
    return this.exitAnimation();
  }

  public async clickOutside(): Promise<void> {
    await sendMouse({ type: 'click', position: [0, 0], button: 'left' });
  }

  public async clickTrigger(el: HTMLButtonElement = this.triggerElement): Promise<void> {
    const { x, y, height, width } = el.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async clickSurface(): Promise<void> {
    const { x, y, height, width } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async clickFormCloseButton(): Promise<void> {
    const { x, y, height, width } = this.formCloseButton.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async clickFormSubmitButton(): Promise<void> {
    const { x, y, height, width } = this.formSubmitButton.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public simulateMoveHandleDown(): void {
    this.moveHandleElement.dispatchEvent(new PointerEvent('pointerdown'));
  }

  public simulateMoveHandleMove(clientX: number, clientY: number): void {
    document.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY }));
  }

  public simulateMoveHandleUp(): void {
    document.dispatchEvent(new PointerEvent('pointerup'));
  }

  public async pressEscapeKey(): Promise<void> {
    await sendKeys({ press: 'Escape' });
  }

  public enterAnimation(): Promise<void> {
    return task(500);
  }

  public exitAnimation(): Promise<void> {
    return task(500);
  }

  public async focusDelay(): Promise<void> {
    // Wait two frames for focus to be set
    await frame();
    await frame();
  }
}

interface IDialogFixtureConfig {
  open?: boolean;
  type?: DialogType;
  mode?: DialogMode;
  animationType?: DialogAnimationType;
  preset?: DialogPreset;
  persistent?: boolean;
  fullscreen?: boolean;
  fullscreenThreshold?: number;
  positionStrategy?: DialogPositionStrategy;
  sizeStrategy?: DialogSizeStrategy;
  placement?: DialogPlacement;
  moveable?: boolean;
  autofocus?: boolean;
}

async function createFixture({
  open = false,
  type,
  mode,
  animationType,
  preset,
  persistent,
  fullscreen,
  fullscreenThreshold,
  positionStrategy,
  sizeStrategy,
  placement,
  moveable,
  autofocus
}: IDialogFixtureConfig = {}): Promise<DialogHarness> {
  const container = await fixture(html`
    <div>
      <button type="button" id="test-trigger">Dialog Trigger</button>
      <button type="button" id="alt-test-trigger">Dialog Trigger</button>
      <forge-dialog
        trigger="test-trigger"
        label="My dialog title"
        description="My dialog description"
        ?open=${open}
        type=${type ?? nothing}
        mode=${mode ?? nothing}
        animation-type=${animationType ?? nothing}
        preset=${preset ?? nothing}
        ?persistent=${persistent}
        ?fullscreen=${fullscreen}
        fullscreen-threshold=${fullscreenThreshold ?? nothing}
        position-strategy=${positionStrategy ?? nothing}
        size-strategy=${sizeStrategy ?? nothing}
        placement=${placement ?? nothing}
        ?moveable=${moveable}>
        <h1 id="dialog-title">Dialog Title</h1>
        <p id="dialog-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <form>
          <button id="form-close-button" type="submit" formmethod=${'dialog' as any} ?autofocus=${autofocus}>Form button close</button>
        </form>
        <form method="dialog">
          <button id="form-submit-button" type="submit">Form close</button>
        </form>
      </forge-dialog>
    </div>
  `);

  const dialogEl = container.querySelector('forge-dialog') as DialogComponentWithCore;
  const triggerEl = container.querySelector('#test-trigger') as HTMLButtonElement;
  const altTriggerEl = container.querySelector('#alt-test-trigger') as HTMLButtonElement;
  const formCloseButton = container.querySelector('#form-close-button') as HTMLButtonElement;
  const formSubmitButton = container.querySelector('#form-submit-button') as HTMLButtonElement;

  return new DialogHarness(dialogEl, triggerEl, altTriggerEl, formCloseButton, formSubmitButton);
}
