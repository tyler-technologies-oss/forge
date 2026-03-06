import { tylIcon360, tylIconCode, tylIconFace } from '@tylertech/tyler-icons';
import { html } from 'lit';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { frame, task } from '../core/utils/utils.js';
import { ICON_CONSTANTS } from './icon-constants.js';
import { IconRegistry } from './icon-registry.js';
import type { IconComponent } from './icon.js';

import './icon.js';

const ICON_NAME = 'code';

async function waitForIconRender(el: IconComponent, timeout = 500): Promise<SVGElement | null> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const svg = el.shadowRoot?.querySelector('svg');
    if (svg) {
      return svg;
    }
    await frame();
  }
  return null;
}

async function waitForIconRemoval(el: IconComponent, timeout = 500): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (el.shadowRoot?.childElementCount === 0) {
      return;
    }
    await frame();
  }
}

describe('Icon', () => {
  beforeAll(() => {
    IconRegistry.define(tylIconCode);
  });

  it('should initialize', async () => {
    const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
    const el = screen.container.querySelector('forge-icon') as IconComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
    const el = screen.container.querySelector('forge-icon') as IconComponent;

    expect(el.shadowRoot?.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    await expect(el).toBeAccessible();
  });

  it('should have correct default values', async () => {
    const screen = render(html`<forge-icon></forge-icon>`);
    const el = screen.container.querySelector('forge-icon') as IconComponent;

    expect(el.name).toBeUndefined();
    expect(el.src).toBeUndefined();
    expect(el.lazy).toBe(false);
    expect(el.external).toBe(false);
    expect(el.externalType).toBe('all');
    expect(el.viewbox).toBeUndefined();
    expect(el.theme).toBeUndefined();
  });

  it('should cache <svg> element instance in icon registry when icon is rendered', async () => {
    const screen = render(html`<forge-icon></forge-icon>`);
    const el = screen.container.querySelector('forge-icon') as IconComponent;
    IconRegistry.define(tylIcon360);
    const entry = IconRegistry.get(tylIcon360.name);

    expect(entry?.raw).toBeTruthy();
    expect(entry?.node).toBeFalsy();

    el.name = tylIcon360.name;
    await el.updateComplete;
    await waitForIconRender(el);

    expect(entry?.node).toBeTruthy();
  });

  describe('API', () => {
    it('should set name via attribute', async () => {
      const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.name).toBe(ICON_NAME);
    });

    it('should set name via property', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.name = ICON_NAME;

      await el.updateComplete;

      expect(el.name).toBe(ICON_NAME);
      expect(el.getAttribute(ICON_CONSTANTS.attributes.NAME)).toBe(ICON_NAME);
    });

    it('should set src via attribute', async () => {
      const screen = render(html`<forge-icon src=${tylIconFace.data}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.src).toBe(tylIconFace.data);
    });

    it('should set src via property and reflect to attribute', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.src = tylIconFace.data;

      await el.updateComplete;

      expect(el.src).toBe(tylIconFace.data);
      expect(el.getAttribute(ICON_CONSTANTS.attributes.SRC)).toBe(tylIconFace.data);
    });

    it('should set lazy via attribute', async () => {
      const screen = render(html`<forge-icon lazy></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.lazy).toBe(true);
    });

    it('should set lazy via property', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.lazy = true;

      await el.updateComplete;

      expect(el.lazy).toBe(true);
      expect(el.hasAttribute(ICON_CONSTANTS.attributes.LAZY)).toBe(true);
    });

    it('should set external via attribute', async () => {
      const screen = render(html`<forge-icon external></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.external).toBe(true);
    });

    it('should set external via property', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.external = true;

      await el.updateComplete;

      expect(el.external).toBe(true);
      expect(el.hasAttribute(ICON_CONSTANTS.attributes.EXTERNAL)).toBe(true);
    });

    it('should set externalType via attribute', async () => {
      const screen = render(html`<forge-icon external external-type="custom"></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.externalType).toBe('custom');
    });

    it('should set externalType via property', async () => {
      const screen = render(html`<forge-icon external></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.externalType = 'custom';

      await el.updateComplete;

      expect(el.externalType).toBe('custom');
      expect(el.getAttribute(ICON_CONSTANTS.attributes.EXTERNAL_TYPE)).toBe('custom');
    });

    it('should set viewbox via attribute', async () => {
      const screen = render(html`<forge-icon viewbox="0 0 16 16" name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.viewbox).toBe('0 0 16 16');
      expect(el.shadowRoot?.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 16 16');
    });

    it('should set viewbox via property', async () => {
      const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.viewbox = '0 0 16 16';

      await el.updateComplete;

      expect(el.viewbox).toBe('0 0 16 16');
      expect(el.getAttribute(ICON_CONSTANTS.attributes.VIEWBOX)).toBe('0 0 16 16');
      expect(el.shadowRoot?.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 16 16');
    });

    it('should set theme via attribute', async () => {
      const screen = render(html`<forge-icon theme="primary"></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.theme).toBe('primary');
    });

    it('should set theme via property', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.theme = 'primary';

      await el.updateComplete;

      expect(el.theme).toBe('primary');
      expect(el.getAttribute(ICON_CONSTANTS.attributes.THEME)).toBe('primary');
    });

    it('should force icon to load when calling layout method', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);

      el.name = ICON_NAME;
      await el.updateComplete;
      el.layout();
      await frame();

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  });

  describe('name', () => {
    it('should not set content if name is not set', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);
    });

    it('should remove icon content if name is removed', async () => {
      const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();

      el.name = '';
      await waitForIconRemoval(el);

      expect(el.shadowRoot?.childElementCount).toBe(0);
    });

    it('should set icon content if exists in registry', async () => {
      const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should set icon content if icon is set dynamically', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);

      el.name = ICON_NAME;
      await el.updateComplete;
      await frame();

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should not set icon content if icon is not found in registry', async () => {
      const screen = render(html`<forge-icon name="not-found"></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);
    });

    it('should await icon to be registered', async () => {
      const screen = render(html`<forge-icon name=${tylIconFace.name}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);

      await task(500);
      IconRegistry.define(tylIconFace);

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
      IconRegistry.remove(tylIconFace.name);
    });

    it('should await icon when set dynamically', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);

      el.name = tylIconFace.name;
      await el.updateComplete;

      await task(500);
      IconRegistry.define(tylIconFace);

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
      IconRegistry.remove(tylIconFace.name);
    });

    it('should set icon via src property', async () => {
      const screen = render(html`<forge-icon src=${tylIconFace.data}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should set icon via src property dynamically', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);

      el.src = tylIconFace.data;
      await waitForIconRender(el);

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should not set icon if content is not safe', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      const unsafeSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <script>console.log('unsafe');</script>
          <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
        </svg>
      `;
      el.src = unsafeSvg;
      await el.updateComplete;
      await frame();

      expect(el.shadowRoot?.childElementCount).toBe(0);
    });

    it('should update icon if external type is changed', async () => {
      const screen = render(html`<forge-icon name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      const initialSvg = el.shadowRoot?.querySelector('svg');
      expect(initialSvg).toBeTruthy();

      el.external = true;
      el.name = tylIconCode.name;
      await el.updateComplete;

      await frame();
      await frame();

      const svgAfterExternal = el.shadowRoot?.querySelector('svg');
      expect(svgAfterExternal).toBeTruthy();

      el.externalType = 'custom';
      await el.updateComplete;
      await frame();

      const svgAfterTypeChange = el.shadowRoot?.querySelector('svg');
      expect(svgAfterTypeChange).toBeTruthy();
    });

    it('should not set icon if content includes inline listeners', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      const unsafeSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" onload="doSomethingUnsafe();">
          <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
        </svg>
      `;
      el.src = unsafeSvg;
      await el.updateComplete;
      await frame();

      expect(el.shadowRoot?.childElementCount).toBe(0);
    });

    it('should batch icon updates if multiple properties change in same frame', async () => {
      const screen = render(html`<forge-icon></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      expect(el.shadowRoot?.childElementCount).toBe(0);

      el.name = ICON_NAME;
      el.external = true;
      el.externalType = 'custom';
      await el.updateComplete;

      await task();

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should not apply icon if not initialized', async () => {
      const tempIcon = document.createElement(ICON_CONSTANTS.elementName) as IconComponent;

      tempIcon.name = tylIconCode.name;
      tempIcon.externalType = 'custom';
      tempIcon.external = true;
      tempIcon.src = tylIconCode.data;
      tempIcon.externalUrlBuilder = () => '';
      tempIcon.viewbox = '0 0 32 32';
      tempIcon.lazy = true;
      tempIcon.lazy = false;
      tempIcon.layout();

      await frame();

      expect(tempIcon.shadowRoot?.childElementCount).toBeFalsy();
    });
  });

  describe('external', () => {
    it('should request icon externally if not in registry', async () => {
      IconRegistry.remove('external-test-icon');
      const fetchMock = vi.fn().mockResolvedValue(new Response(tylIconFace.data));
      vi.stubGlobal('fetch', fetchMock);

      const screen = render(html`<forge-icon external name="external-test-icon"></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      await waitForIconRender(el);
      vi.unstubAllGlobals();

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should not request icon externally if already available in registry', async () => {
      const fetchSpy = vi.spyOn(window, 'fetch');
      fetchSpy.mockResolvedValue(new Response(tylIconCode.data));

      const screen = render(html`<forge-icon external name=${tylIconCode.name}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      await frame();
      fetchSpy.mockRestore();

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should request icon from custom external URL', async () => {
      IconRegistry.remove('custom-url-test-icon');
      const fetchMock = vi.fn().mockResolvedValue(new Response('<svg><title>my-icon</title></svg>'));
      vi.stubGlobal('fetch', fetchMock);

      const screen = render(html`<forge-icon name="custom-url-test-icon"></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      el.externalUrlBuilder = name => `custom:://icons/${name}.svg`;
      el.external = true;
      await el.updateComplete;

      await waitForIconRender(el);
      vi.unstubAllGlobals();

      expect(el.externalUrlBuilder).toBeTypeOf('function');
      expect(fetchMock).toHaveBeenCalledWith('custom:://icons/custom-url-test-icon.svg');
      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  });

  describe('lazy', () => {
    it('should set icon immediately if visible when lazy', async () => {
      const screen = render(html`<forge-icon lazy name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;

      await waitForIconRender(el);

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });

    it('should set icon when visible when lazy', async () => {
      const screen = render(html`<forge-icon style="display: none;" lazy name=${ICON_NAME}></forge-icon>`);
      const el = screen.container.querySelector('forge-icon') as IconComponent;
      await frame();

      expect(el.shadowRoot?.childElementCount).toBe(0);

      el.style.removeProperty('display');
      await el.updateComplete;
      await waitForIconRender(el);

      expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    });
  });
});
