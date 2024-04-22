import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { IOpenIconComponent } from './open-icon';
import { OPEN_ICON_CONSTANTS } from './open-icon-constants';

import './open-icon';

describe('Open icon', () => {
  it('should use shadow DOM', async () => {
    const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

    await expect(el).to.be.accessible();
  });

  it('should have correct default values', async () => {
    const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

    expect(el.orientation).to.equal('vertical');
    expect(el.open).to.be.false;
  });

  describe('open', () => {
    it('should set open attribute when property is set', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

      el.open = true;

      expect(el.open).to.be.true;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.true;
    });

    it('should set open when attribute is set by default', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon open></forge-open-icon>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.true;
    });

    it('should set open when attribute is set dynamically', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

      el.setAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN, '');

      expect(el.open).to.be.true;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.true;
    });

    it('should not be open when open attribute is removed', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon open></forge-open-icon>`);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.true;

      el.removeAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN);

      expect(el.open).to.be.false;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.false;
    });

    it('should toggle open attribute when open property is toggled', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);
  
      expect(el.open).to.be.false;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.false;
  
      el.open = true;
      
      expect(el.open).to.be.true;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.true;
  
      el.open = false;
  
      expect(el.open).to.be.false;
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).to.be.false;
    });
  });
  
  describe('orientation', () => {
    it('should set orientation attribute when property is set', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

      el.orientation = 'horizontal';

      expect(el.orientation).to.equal('horizontal');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION)).to.equal('horizontal');
    });

    it('should set orientation when attribute is set by default', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon orientation="horizontal"></forge-open-icon>`);

      expect(el.orientation).to.equal('horizontal');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION)).to.equal('horizontal');
    });

    it('should set orientation when attribute is set dynamically', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

      el.setAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION, 'horizontal');

      expect(el.orientation).to.equal('horizontal');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION)).to.equal('horizontal');
    });
  });

  describe('rotation', () => {
    it('should set rotation attribute when property is set', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

      el.rotation = 'half';

      expect(el.rotation).to.equal('half');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION)).to.equal('half');
    });

    it('should set rotation when attribute is set by default', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon rotation="half"></forge-open-icon>`);

      expect(el.rotation).to.equal('half');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION)).to.equal('half');
    });

    it('should set rotation when attribute is set dynamically', async () => {
      const el = await fixture<IOpenIconComponent>(html`<forge-open-icon></forge-open-icon>`);

      el.setAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION, 'half');

      expect(el.rotation).to.equal('half');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION)).to.equal('half');
    });
  });
});
