import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { timer } from '@tylertech/forge-testing';
import { getShadowElement } from '@tylertech/forge-core';
import { AvatarComponent, IAvatarComponent } from './avatar';
import { AVATAR_CONSTANTS } from './avatar-constants';

import './avatar'
import { AvatarComponentDelegate } from './avatar-component-delegate';

describe('Avatar', () => {
  it('should initialize', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar></forge-avatar>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);

    await expect(el).to.be.accessible();
  });

  it('should set slot text content to first characters of text attribute', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);

    expect(el.text).to.equal('Tyler Forge');
    expect(getDefaultSlotEl(el).textContent).to.equal('TF');
  });

  it('should set restrict letter count when attribute set', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="Tyler Forge" letter-count="2"></forge-avatar>`);

    el.setAttribute(AVATAR_CONSTANTS.attributes.LETTER_COUNT, '1');

    expect(getDefaultSlotEl(el).textContent).to.equal('T');
  });

  it('should update the letter count attribute when the property is set ', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);

    el.letterCount = 3;

    expect(el.getAttribute(AVATAR_CONSTANTS.attributes.LETTER_COUNT)).to.equal('3');
  });

  it('should change background image when set via attribute', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);

    const url = 'https://empower.tylertech.com/rs/015-NUU-525/images/tyler-logo-color.svg';
    el.setAttribute(AVATAR_CONSTANTS.attributes.IMAGE_URL, url);
    const root = getRootEl(el);
    // Give enough time for the image to load
    await timer(1800);

    expect(root.hasAttribute('style')).to.be.true;
    expect(root.style.backgroundImage).to.equal(`url("${url}")`);
  });

  it('should change text when set via attribute', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="Tyler Forge"></forge-avatar>`);

    el.setAttribute(AVATAR_CONSTANTS.attributes.TEXT, 'New Value');

    expect(getDefaultSlotEl(el).textContent).to.equal('NV');
  });

  it('should render text when image url fails to load an image with 500 error', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar image-url="https://httpstat.us/500" text="Invalid Url"></forge-avatar>`);
    const root = getRootEl(el);

    await timer(300);

    expect(getDefaultSlotEl(el).textContent).to.equal('IU');
    expect(root.hasAttribute('style')).to.be.false;
  });

  it('should render text when image url fails to load an image with 404 error', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar image-url="https://httpstat.us/404" text="Invalid Url"></forge-avatar>`);
    const root = getRootEl(el);

    await timer(300);

    expect(getDefaultSlotEl(el).textContent).to.equal('IU');
    expect(root.hasAttribute('style')).to.be.false;
  });

  it('should have proper default values', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar></forge-avatar>`);

    expect(el.text).to.equal('');
    expect(el.letterCount).to.equal(AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT);
    expect(el.imageUrl).to.be.undefined;
  });

  it('should have not have any content by default', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar></forge-avatar>`);

    expect(getDefaultSlotEl(el).textContent).to.equal('');
  });

  it('should render slotted content in place of text content', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="attribute text">Slotted Content</forge-avatar>`);
    const defaultSlot = getDefaultSlotEl(el);

    expect(defaultSlot.textContent).to.equal('AT');
    expect(defaultSlot.assignedNodes().length).to.equal(1);
  });

  it('should render first character of each word when letter count is greater than number of words', async () => {
    const el = await fixture<IAvatarComponent>(html`<forge-avatar text="some long string with spaces" letter-count="6">Slotted Content</forge-avatar>`);
    const defaultSlot = getDefaultSlotEl(el);

    expect(defaultSlot.textContent).to.equal('SLSWS');
  });

  describe('AvatarComponentDelegate', () => {
    it('should create avatar via delegate', async () => {
      const delegate = new AvatarComponentDelegate();

      expect(delegate.element).to.be.instanceOf(AvatarComponent);
    });
  });

  function getRootEl(el: IAvatarComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }
  function getDefaultSlotEl(el: IAvatarComponent): HTMLSlotElement {
    return getShadowElement(el, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
  }
});