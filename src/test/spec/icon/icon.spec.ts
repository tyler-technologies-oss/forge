import { IconComponent, ICON_CONSTANTS, defineIconComponent, IconRegistry, IIconComponent, IIconFoundation } from '@tylertech/forge/icon';
import { IIcon } from '@tylertech/forge/icon';
import { tick, timer } from '@tylertech/forge-testing';
import { removeElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestIconContext;
}

interface ITestIconContext {
  component: IIconComponent;
  foundation: IIconFoundation;
  destroy(): void;
  expectSvgContent(populated: boolean): void;
}

const DEFAULT_ICON: IIcon = {
  name: 'action_launcher',
  data: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><title>action_launcher</title><path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z"/></svg>'
};

describe('IconComponent', function(this: ITestContext) {
  let originalFetch: any; 

  beforeAll(function(this: ITestContext) {
    originalFetch = window.fetch;
    defineIconComponent();
  });

  afterEach(function(this: ITestContext) {
    IconRegistry.clear();
    this.context.destroy();
  });

  afterAll(function(this: ITestContext) {
    if (originalFetch) {
      window.fetch = originalFetch;
    }
  });

  it('should not render anything by default', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.expectSvgContent(false);
  });  

  it('should not render anything if name isn\'t in registry', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(ICON_CONSTANTS.attributes.NAME, 'face');
    this.context.expectSvgContent(false);
    expect(this.context.component.name).toBe('face');
  });

  it('should render icon if in registry', async function(this: ITestContext) {
    this.context = setupTestContext();
    IconRegistry.define(DEFAULT_ICON);

    this.context.component.name = 'action_launcher';
    await timer();

    this.context.expectSvgContent(true);
    IconRegistry.remove(DEFAULT_ICON);
  });

  it('should render icon when defined in registry via listener', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.name = 'action_launcher';
    
    await timer(1000);
    this.context.expectSvgContent(false);

    IconRegistry.define(DEFAULT_ICON);

    this.context.expectSvgContent(true);
    IconRegistry.remove(DEFAULT_ICON);
  });

  it('should render icon via src property', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.src = DEFAULT_ICON.data;
    this.context.expectSvgContent(true);
    expect(this.context.component.src).toBe(DEFAULT_ICON.data);
  });

  it('should render icon via src attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(ICON_CONSTANTS.attributes.SRC, DEFAULT_ICON.data);
    this.context.expectSvgContent(true);
    expect(this.context.component.src).toBe(DEFAULT_ICON.data);
  });

  it('should not render icon if unsafe', async function(this: ITestContext) {
    this.context = setupTestContext();
    const unsafeSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <script>console.log('unsafe');</script>
        <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
      </svg>
    `;
    this.context.component.src = unsafeSvg;
    this.context.expectSvgContent(false);
  });

  it('should not render icon if includes unsafe script', async function(this: ITestContext) {
    this.context = setupTestContext();
    const unsafeSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <script>console.log('unsafe');</script>
        <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
      </svg>
    `;
    this.context.component.src = unsafeSvg;
    this.context.expectSvgContent(false);
  });

  it('should not render icon if includes inline listeners', async function(this: ITestContext) {
    this.context = setupTestContext();
    const unsafeSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" onload="onSomethingUnsafe();">
        <path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z" />
      </svg>
    `;
    this.context.component.src = unsafeSvg;
    this.context.expectSvgContent(false);
  });

  it('should request icon externally if not in registry', async function(this: ITestContext) {
    this.context = setupTestContext();
    const restoreFetch = mockFetch(DEFAULT_ICON.data, false);
    const fetchSpy = spyOn(window, 'fetch').and.callThrough();
    this.context.component.external = true;
    this.context.component.name = 'face';
    await timer();
    restoreFetch();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(this.context.component.external).toBeTrue();
  });

  it('should not request icon externally if available in registry', async function(this: ITestContext) {
    this.context = setupTestContext();
    IconRegistry.define(DEFAULT_ICON);
    const fetchSpy = spyOn(window, 'fetch');

    this.context.component.external = true;
    this.context.component.externalType = 'custom';
    this.context.component.name = 'action_launcher';
    await timer();

    expect(fetchSpy).toHaveBeenCalledTimes(0);
    this.context.expectSvgContent(true);
  });

  it('should render icon manually if icon defined in registry later', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.name = 'action_launcher';
    await timer();
    IconRegistry.define(DEFAULT_ICON.name, DEFAULT_ICON.data);
    this.context.component.layout();
    this.context.expectSvgContent(true);
  });

  it('should render icon if immediately visible when lazy = true', async function(this: ITestContext) {
    IconRegistry.define([DEFAULT_ICON]);
    this.context = setupTestContext({ lazy: true, name: 'action_launcher' });
    await tick();

    // Force the lazy load listener to run so we don't have to depend on IntersectionObserver in our test
    this.context.foundation['_lazyListener']();
    
    this.context.expectSvgContent(true);
    expect(this.context.component.lazy).toBeTrue();
  });

  it('should set custom external URL', async function(this: ITestContext) {
    this.context = setupTestContext();
    const customUrl = 'custom://url';
    const restoreFetch = mockFetch(DEFAULT_ICON.data);
    const fetchSpy = spyOn(window, 'fetch').and.callThrough();
    const expectedUrl = `${customUrl}/${DEFAULT_ICON.name}.svg`;

    this.context.component.externalUrlBuilder = (name: string) => `${customUrl}/${name}.svg`;
    this.context.component.external = true;
    this.context.component.name = DEFAULT_ICON.name;
    
    await timer();

    restoreFetch();
    this.context.expectSvgContent(true);
    expect(this.context.component.shadowRoot!.querySelector('svg title')!.textContent).toBe(DEFAULT_ICON.name);
    expect(fetchSpy).toHaveBeenCalledWith(expectedUrl);
  });

  it('should support SSR', async function(this: ITestContext) {
    this.context = setupTestContext();
    const realFetch = window.fetch;
    window.fetch = undefined as any;
    const realFetchSpy = jasmine.createSpy('real fetch spy', realFetch).and.callThrough();

    this.context.component.external = true;
    this.context.component.name = DEFAULT_ICON.name;

    await timer();
    this.context.expectSvgContent(false);
    expect(realFetchSpy).not.toHaveBeenCalled();

    window.fetch = realFetch;
  });

  it('should remove icon if name is removed', async function(this: ITestContext) {
    this.context = setupTestContext();
    IconRegistry.define([DEFAULT_ICON]);
    this.context.component.name = DEFAULT_ICON.name;
    await timer();

    this.context.expectSvgContent(true);
    await tick();

    this.context.component.name = '';
    await timer();

    expect(this.context.component.hasAttribute(ICON_CONSTANTS.attributes.NAME)).toBeFalse();
  });

  it('should update icon if external type is changed', async function(this: ITestContext) {
    this.context = setupTestContext();
    const loadSpy = spyOn(this.context.component['_foundation'] as any, '_loadIcon').and.callFake(function(this: ITestContext) {});

    this.context.component.external = true;
    this.context.component.name = DEFAULT_ICON.name;
    
    // Wait two frames, one for the delayed update and one for flushing the remaing queue
    await tick();
    await tick();

    this.context.component.externalType = 'custom';
    await tick();

    expect(loadSpy).toHaveBeenCalledTimes(2);
  });

  it('should batch icon updates if multiple properties change in same frame', async function(this: ITestContext) {
    this.context = setupTestContext();
    const loadSpy = spyOn(this.context.component['_foundation'] as any, '_loadIcon').and.callFake(function(this: ITestContext) {});

    await tick();

    this.context.component.name = DEFAULT_ICON.name;
    this.context.component.external = true;
    this.context.component.externalType = 'custom';

    await tick();
    await tick();

    expect(loadSpy).toHaveBeenCalledTimes(1);
  });

  it('should not apply icon if not initialized', async function(this: ITestContext) {
    this.context = setupTestContext();
    const tempIcon = document.createElement(ICON_CONSTANTS.elementName) as IIconComponent;
    const loadSpy = spyOn(tempIcon['_foundation'] as any, '_loadIcon').and.callFake(function(this: ITestContext) {});

    tempIcon.name = DEFAULT_ICON.name;
    tempIcon.externalType = 'custom';
    tempIcon.external = true;
    tempIcon.src = DEFAULT_ICON.data;
    tempIcon.externalUrlBuilder = () => '';
    tempIcon.viewbox = '0 0 32 32';
    tempIcon.lazy = true;
    tempIcon.lazy = false;
    tempIcon.layout();

    await timer();

    expect(loadSpy).not.toHaveBeenCalled();
  });

  function setupTestContext(config?: Partial<IIconComponent>): ITestIconContext {
    const fixture = document.createElement('div');
    fixture.id = 'icon-test-fixture';
    const component = document.createElement(ICON_CONSTANTS.elementName) as IIconComponent;
    if (config) {
      Object.assign(component, config);
    }
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      foundation: component['_foundation'],
      destroy: () => removeElement(fixture),
      expectSvgContent: (populated: boolean) => {
        expect(!!component.shadowRoot!.querySelector('svg')).toBe(populated, 'Expected SVG element to exist.');
      }
    };
  }  
  
  function mockFetch(body: string, ok = true): () => void {
    const realFetch = window.fetch;
    window.fetch = () => {
      return Promise.resolve({ ok, text: () => Promise.resolve(body)} as any);
    };
    return () => window.fetch = realFetch;
  }
});
