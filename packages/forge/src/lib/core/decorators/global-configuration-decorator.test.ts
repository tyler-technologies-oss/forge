import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { IBaseAdapter } from '../base/base-adapter.js';
import { TylerForgeGlobalConfiguration } from '../configuration/global-configuration.js';
import { globalConfig } from './global-configuration-decorator.js';

describe('globalConfig decorator', () => {
  let originalConfig: TylerForgeGlobalConfiguration | undefined;

  beforeEach(() => {
    // Save original config
    originalConfig = window.TylerForgeGlobalConfiguration;
    // Clear config before each test
    window.TylerForgeGlobalConfiguration = {};
  });

  afterEach(() => {
    // Restore original config
    if (originalConfig !== undefined) {
      window.TylerForgeGlobalConfiguration = originalConfig;
    } else {
      delete (window as any).TylerForgeGlobalConfiguration;
    }
  });

  describe('with Lit components (HTMLElement)', () => {
    const TAG_NAME = 'test-global-config-lit';

    @customElement(TAG_NAME)
    class TestGlobalConfigLit extends LitElement {
      public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAG_NAME;

      @globalConfig()
      @property({ type: String })
      public variant = 'default';

      @globalConfig()
      @property({ type: Boolean })
      public enabled = false;

      @globalConfig()
      @property({ type: Number })
      public count = 10;

      public render(): TemplateResult {
        return html`<div>${this.variant}</div>`;
      }
    }

    function setupTest(): TestGlobalConfigLit {
      const screen = render(html`<test-global-config-lit></test-global-config-lit>`);
      return screen.container.querySelector(TAG_NAME) as TestGlobalConfigLit;
    }

    it('should use default value when no global config is set', () => {
      const element = setupTest();

      expect(element.variant).toBe('default');
      expect(element.enabled).toBe(false);
      expect(element.count).toBe(10);
    });

    it('should apply global configuration value over default', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          variant: 'outlined',
          enabled: true,
          count: 42
        }
      };

      const element = setupTest();

      expect(element.variant).toBe('outlined');
      expect(element.enabled).toBe(true);
      expect(element.count).toBe(42);
    });

    it('should only apply global config values that are defined', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          variant: 'outlined'
          // enabled and count not set
        }
      };

      const element = setupTest();

      expect(element.variant).toBe('outlined');
      expect(element.enabled).toBe(false); // uses default
      expect(element.count).toBe(10); // uses default
    });

    it('should allow setting property value after initialization', () => {
      const element = setupTest();

      element.variant = 'filled';

      expect(element.variant).toBe('filled');
    });

    it('should allow setting property value and still respect global config on new instances', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          variant: 'outlined'
        }
      };

      const element1 = setupTest();
      // First access initializes with global config value
      expect(element1.variant).toBe('outlined');

      // Then set it to a different value
      element1.variant = 'filled';
      expect(element1.variant).toBe('filled');

      const element2 = setupTest();
      expect(element2.variant).toBe('outlined'); // new instance still uses global config
    });

    it('should throw TypeError when global config type does not match default type', () => {
      // Test with Core class pattern to avoid Lit's internal property access
      const ERROR_TAG_NAME = 'test-global-config-type-error';

      interface ITestAdapter extends IBaseAdapter {
        hostElement: HTMLElement;
      }

      class TestCoreTypeError {
        @globalConfig()
        private _variant = 'default';

        constructor(private _adapter: ITestAdapter) {}

        public get variant(): string {
          return this._variant;
        }
      }

      class TestElementTypeError extends HTMLElement {
        private _core: TestCoreTypeError;

        constructor() {
          super();
          const adapter: ITestAdapter = {
            hostElement: this
          } as unknown as ITestAdapter;
          this._core = new TestCoreTypeError(adapter);
        }

        public get variant(): string {
          return this._core.variant;
        }
      }

      customElements.define(ERROR_TAG_NAME, TestElementTypeError);

      window.TylerForgeGlobalConfiguration = {
        [ERROR_TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          variant: 123 as any // wrong type
        }
      };

      const screen = render(html`<test-global-config-type-error></test-global-config-type-error>`);
      const element = screen.container.querySelector(ERROR_TAG_NAME) as TestElementTypeError;

      expect(() => {
        // Access the property to trigger initialization
        const _ = element.variant;
      }).toThrow(TypeError);
    });

    it('should not throw TypeError when comparing null values', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          variant: null as any
        }
      };

      const element = setupTest();
      expect(element.variant).toBe(null);
    });
  });

  describe('with Core classes (legacy pattern)', () => {
    const TAG_NAME = 'test-global-config-core';

    interface ITestAdapter extends IBaseAdapter {
      hostElement: HTMLElement;
    }

    class TestCore {
      @globalConfig()
      private _variant = 'default';

      @globalConfig()
      private _enabled = false;

      constructor(private _adapter: ITestAdapter) {}

      public get variant(): string {
        return this._variant;
      }

      public set variant(value: string) {
        this._variant = value;
      }

      public get enabled(): boolean {
        return this._enabled;
      }

      public set enabled(value: boolean) {
        this._enabled = value;
      }
    }

    class TestElement extends HTMLElement {
      private _core: TestCore;

      constructor() {
        super();
        const adapter: ITestAdapter = {
          hostElement: this
        } as unknown as ITestAdapter;
        this._core = new TestCore(adapter);
      }

      public get variant(): string {
        return this._core.variant;
      }

      public set variant(value: string) {
        this._core.variant = value;
      }

      public get enabled(): boolean {
        return this._core.enabled;
      }

      public set enabled(value: boolean) {
        this._core.enabled = value;
      }
    }

    customElements.define(TAG_NAME, TestElement);

    function setupTest(): TestElement {
      const screen = render(html`<test-global-config-core></test-global-config-core>`);
      return screen.container.querySelector(TAG_NAME) as TestElement;
    }

    it('should use default value when no global config is set', () => {
      const element = setupTest();

      expect(element.variant).toBe('default');
      expect(element.enabled).toBe(false);
    });

    it('should apply global configuration value over default', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          variant: 'outlined',
          enabled: true
        }
      };

      const element = setupTest();

      expect(element.variant).toBe('outlined');
      expect(element.enabled).toBe(true);
    });

    it('should strip leading underscore from private property names for lookup', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          // Config uses 'variant', not '_variant'
          variant: 'outlined'
        }
      };

      const element = setupTest();

      expect(element.variant).toBe('outlined');
    });

    it('should allow setting property value after initialization', () => {
      const element = setupTest();

      element.variant = 'filled';

      expect(element.variant).toBe('filled');
    });
  });

  describe('edge cases', () => {
    const TAG_NAME = 'test-global-config-edge';

    @customElement(TAG_NAME)
    class TestGlobalConfigEdge extends LitElement {
      public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAG_NAME;

      @globalConfig()
      @property({ type: String })
      public nullable: string | null = null;

      @globalConfig()
      @property({ type: Object })
      public objectValue: Record<string, any> = { key: 'value' };

      public render(): TemplateResult {
        return html`<div></div>`;
      }
    }

    function setupTest(): TestGlobalConfigEdge {
      const screen = render(html`<test-global-config-edge></test-global-config-edge>`);
      return screen.container.querySelector(TAG_NAME) as TestGlobalConfigEdge;
    }

    it('should handle null default values', () => {
      const element = setupTest();

      expect(element.nullable).toBe(null);
    });

    it('should allow null values from global config', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME]: {
          nullable: null
        }
      } as any;

      const element = setupTest();

      expect(element.nullable).toBe(null);
    });

    it('should handle object default values', () => {
      const element = setupTest();

      expect(element.objectValue).toEqual({ key: 'value' });
    });

    it('should apply object values from global config', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          objectValue: { foo: 'bar' }
        }
      };

      const element = setupTest();

      expect(element.objectValue).toEqual({ foo: 'bar' });
    });

    it('should only initialize once on first access', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          nullable: 'first'
        }
      };

      const element = setupTest();

      // First access
      expect(element.nullable).toBe('first');

      // Change global config (should not affect already-initialized element)
      (window.TylerForgeGlobalConfiguration as any)[TAG_NAME]!.nullable = 'second';

      // Second access - should still be 'first'
      expect(element.nullable).toBe('first');
    });

    it('should not apply undefined values from global config', () => {
      window.TylerForgeGlobalConfiguration = {
        [TAG_NAME as keyof typeof window.TylerForgeGlobalConfiguration]: {
          nullable: undefined
        }
      };

      const element = setupTest();

      expect(element.nullable).toBe(null); // uses default, not undefined
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for symbol properties', () => {
      const symbolProp = Symbol('test');

      expect(() => {
        class _TestClass {
          @globalConfig()
          public [symbolProp] = 'value';
        }
      }).toThrow(TypeError);
    });
  });
});
