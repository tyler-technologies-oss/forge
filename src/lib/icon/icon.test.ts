import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { stub } from 'sinon';
import { task } from '../core/utils/utils';
import type { IIconComponent } from './icon';
import { IconRegistry } from './icon-registry';
import { tylIcon360, tylIconCode, tylIconFace } from '@tylertech/tyler-icons/standard';
import { ICON_CONSTANTS } from './icon-constants';

import './icon';
import { IconCore } from './icon-core';

const ICON_NAME = 'code';

type IconCoreInternal = IconCore & { _loadIcon: () => void };
type IconComponentWithCore = IIconComponent & { _core: IconCoreInternal };

describe('Icon', () => {
  before(() => {
    IconRegistry.define(tylIconCode);
  });

  it('should initialize', async () => {
    const el = await fixture<IIconComponent>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IIconComponent>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);

    expect(el.shadowRoot?.querySelector('svg')?.getAttribute('aria-hidden')).to.equal('true');
    await expect(el).to.be.accessible();
  });

  it('should have correct default values', async () => {
    const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

    expect(el.name).to.be.undefined;
    expect(el.src).to.be.undefined;
    expect(el.lazy).to.be.false;
    expect(el.external).to.be.false;
    expect(el.externalType).to.equal('standard');
    expect(el.viewbox).to.be.undefined;
    expect(el.theme).to.be.undefined;
  });

  it('should cache <svg> element instance in icon registry when icon is rendered', async () => {
    const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);
    IconRegistry.define(tylIcon360);
    const entry = IconRegistry.get(tylIcon360.name);

    expect(entry?.raw).to.be.ok;
    expect(entry?.node).not.to.be.ok;

    el.name = tylIcon360.name;
    await elementUpdated(el);

    expect(entry?.node).to.be.ok;
  });

  describe('API', () => {
    it('should set name via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);

      expect(el.name).to.equal(ICON_NAME);
    });

    it('should set name via property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);
      el.name = ICON_NAME;

      expect(el.name).to.equal(ICON_NAME);
      expect(el.getAttribute(ICON_CONSTANTS.attributes.NAME)).to.equal(ICON_NAME);
    });

    it('should set src via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon src=${tylIconFace.data}></forge-icon>`);

      expect(el.src).to.equal(tylIconFace.data);
    });

    it('should set src via property and reflect to attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);
      el.src = tylIconFace.data;

      expect(el.src).to.equal(tylIconFace.data);
      expect(el.getAttribute(ICON_CONSTANTS.attributes.SRC)).to.equal(tylIconFace.data);
    });

    it('should set lazy via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon lazy></forge-icon>`);

      expect(el.lazy).to.be.true;
    });

    it('should set lazy via property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);
      el.lazy = true;

      expect(el.lazy).to.be.true;
      expect(el.hasAttribute(ICON_CONSTANTS.attributes.LAZY)).to.be.true;
    });

    it('should set external via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon external></forge-icon>`);

      expect(el.external).to.be.true;
    });

    it('should set external via property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);
      el.external = true;

      expect(el.external).to.be.true;
      expect(el.hasAttribute(ICON_CONSTANTS.attributes.EXTERNAL)).to.be.true;
    });

    it('should set externalType via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon external external-type="custom"></forge-icon>`);

      expect(el.externalType).to.equal('custom');
    });

    it('should set externalType via property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon external></forge-icon>`);
      el.externalType = 'custom';

      expect(el.externalType).to.equal('custom');
      expect(el.getAttribute(ICON_CONSTANTS.attributes.EXTERNAL_TYPE)).to.equal('custom');
    });

    it('should set viewbox via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon viewbox="0 0 16 16" name=${ICON_NAME}></forge-icon>`);

      expect(el.viewbox).to.equal('0 0 16 16');
      expect(el.shadowRoot?.querySelector('svg')?.getAttribute('viewBox')).to.equal('0 0 16 16');
    });

    it('should set viewbox via property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      el.viewbox = '0 0 16 16';

      expect(el.viewbox).to.equal('0 0 16 16');
      expect(el.getAttribute(ICON_CONSTANTS.attributes.VIEWBOX)).to.equal('0 0 16 16');
      expect(el.shadowRoot?.querySelector('svg')?.getAttribute('viewBox')).to.equal('0 0 16 16');
    });

    it('should set theme via attribute', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon theme="primary"></forge-icon>`);

      expect(el.theme).to.equal('primary');
    });

    it('should set theme via property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);
      el.theme = 'primary';

      expect(el.theme).to.equal('primary');
      expect(el.getAttribute(ICON_CONSTANTS.attributes.THEME)).to.equal('primary');
    });

    it('should force icon to load when calling layout method', async () => {
      const el = await fixture<IconComponentWithCore>(html`<forge-icon></forge-icon>`);
      const loadStub = stub(el['_core'], '_loadIcon');

      el.layout();

      expect(loadStub.calledOnce).to.be.true;
    });
  });

  describe('name', () => {
    it('should not set content if name is not set', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

      expect(el.shadowRoot?.childElementCount).to.equal(0);
    });

    it('should remove icon content if name is removed', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;

      el.name = '';
      await elementUpdated(el);

      expect(el.shadowRoot?.childElementCount).to.equal(0);
    });

    it('should set icon content if exists in registry', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should set icon content if icon is set dynamically', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

      expect(el.shadowRoot?.childElementCount).to.equal(0);

      el.name = ICON_NAME;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should not set icon content if icon is not found in registry', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon name="not-found"></forge-icon>`);

      expect(el.shadowRoot?.childElementCount).to.equal(0);
    });

    it('should await icon to be registered', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon name=${tylIconFace.name}></forge-icon>`);

      expect(el.shadowRoot?.childElementCount).to.equal(0);

      await task(500);
      IconRegistry.define(tylIconFace);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
      IconRegistry.remove(tylIconFace.name);
    });

    it('should await icon when set dynamically', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

      expect(el.shadowRoot?.childElementCount).to.equal(0);

      el.name = tylIconFace.name;

      await task(500);
      IconRegistry.define(tylIconFace);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
      IconRegistry.remove(tylIconFace.name);
    });

    it('should set icon via src property', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon src=${tylIconFace.data}></forge-icon>`);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should set icon via src property dynamically', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

      expect(el.shadowRoot?.childElementCount).to.equal(0);

      el.src = tylIconFace.data;

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should not set icon if content is not safe', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

      const unsafeSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <script>console.log('unsafe');</script>
          <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
        </svg>
      `;
      el.src = unsafeSvg;
      await elementUpdated(el);

      expect(el.shadowRoot?.childElementCount).to.equal(0);
    });

    it('should update icon if external type is changed', async () => {
      const el = await fixture<IconComponentWithCore>(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      const loadStub = stub(el['_core'], '_loadIcon');

      el.external = true;
      el.name = tylIconCode.name;

      // Wait two frames, one for the delayed update and one for flushing the remaining queue
      await elementUpdated(el);
      await elementUpdated(el);

      el.externalType = 'custom';
      await elementUpdated(el);

      expect(loadStub.calledTwice).to.be.true;
    });

    it('should not set icon if content includes inline listeners', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon></forge-icon>`);

      const unsafeSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" onload="doSomethingUnsafe();">
          <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
        </svg>
      `;
      el.src = unsafeSvg;
      await elementUpdated(el);

      expect(el.shadowRoot?.childElementCount).to.equal(0);
    });

    it('should batch icon updates if multiple properties change in same frame', async () => {
      const el = await fixture<IconComponentWithCore>(html`<forge-icon></forge-icon>`);
      const loadStub = stub(el['_core'], '_loadIcon');

      el.name = ICON_NAME;
      el.external = true;
      el.externalType = 'custom';

      await elementUpdated(el);

      expect(loadStub.calledOnce).to.be.true;
    });

    it('should not apply icon if not initialized', async () => {
      const tempIcon = document.createElement(ICON_CONSTANTS.elementName) as IconComponentWithCore;
      const loadStub = stub(tempIcon['_core'], '_loadIcon');

      tempIcon.name = tylIconCode.name;
      tempIcon.externalType = 'custom';
      tempIcon.external = true;
      tempIcon.src = tylIconCode.data;
      tempIcon.externalUrlBuilder = () => '';
      tempIcon.viewbox = '0 0 32 32';
      tempIcon.lazy = true;
      tempIcon.lazy = false;
      tempIcon.layout();

      await elementUpdated(tempIcon);

      expect(loadStub.called).to.be.false;
    });
  });

  describe('external', () => {
    it('should request icon externally if not in registry', async () => {
      const fetchStub = stub(window, 'fetch');
      fetchStub.returns(Promise.resolve(new Response(tylIconFace.data)));

      const el = await fixture<IIconComponent>(html`<forge-icon external name="face"></forge-icon>`);

      await elementUpdated(el);
      fetchStub.restore();

      expect(fetchStub.calledOnce).to.be.true;
      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should not request icon externally if already available in registry', async () => {
      const fetchStub = stub(window, 'fetch');
      fetchStub.returns(Promise.resolve(new Response(tylIconCode.data)));

      const el = await fixture<IIconComponent>(html`<forge-icon external name=${tylIconCode.name}></forge-icon>`);

      await elementUpdated(el);
      fetchStub.restore();

      expect(fetchStub.called).to.be.false;
      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should request icon from custom external URL', async () => {
      const fetchStub = stub(window, 'fetch');
      fetchStub.returns(Promise.resolve(new Response('<svg><title>my-icon</title></svg>')));

      const el = await fixture<IIconComponent>(html`<forge-icon name="my-icon"></forge-icon>`);
      el.externalUrlBuilder = name => `custom:://icons/${name}.svg`;
      el.external = true;

      await elementUpdated(el);
      fetchStub.restore();

      expect(el.externalUrlBuilder).to.be.a('function');
      expect(fetchStub.calledOnceWith('custom:://icons/my-icon.svg')).to.be.true;
      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });
  });

  describe('lazy', () => {
    it('should set icon immediately if visible when lazy', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon lazy name=${ICON_NAME}></forge-icon>`);
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });

    it('should set icon when visible when lazy', async () => {
      const el = await fixture<IIconComponent>(html`<forge-icon style="display: none;" lazy name=${ICON_NAME}></forge-icon>`);
      await elementUpdated(el);

      expect(el.shadowRoot?.childElementCount).to.equal(0);

      el.style.removeProperty('display');
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
    });
  });
});
