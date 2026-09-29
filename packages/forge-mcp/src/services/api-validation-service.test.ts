import { describe, it, expect } from 'vitest';
import { ApiValidationService } from './api-validation-service.js';
import { CEMComponentDeclaration } from '../types/cem.js';

const mockComponent: CEMComponentDeclaration = {
  tagName: 'forge-test',
  name: 'TestComponent',
  kind: 'class',
  customElement: true,
  members: [
    {
      kind: 'field',
      name: 'value',
      privacy: 'public',
      description: 'The value',
    },
    {
      kind: 'field',
      name: 'disabled',
      privacy: 'public',
      description: 'Disabled state',
    },
    {
      kind: 'field',
      name: 'oldProp',
      privacy: 'public',
      description: 'Old property',
      deprecated: 'Use newProp instead',
    },
    {
      kind: 'field',
      name: '_private',
      privacy: 'private',
      description: 'Private field',
    },
    {
      kind: 'method',
      name: 'focus',
      privacy: 'public',
      description: 'Focus the element',
    },
    {
      kind: 'method',
      name: 'reset',
      privacy: 'public',
      description: 'Reset the element',
    },
    {
      kind: 'method',
      name: '_internalMethod',
      privacy: 'private',
      description: 'Internal method',
    },
  ],
  attributes: [{ name: 'value' }, { name: 'disabled' }, { name: 'readonly' }],
  events: [
    {
      name: 'change',
      description: 'Fired on change',
      type: { text: 'CustomEvent' },
    },
    {
      name: 'input',
      description: 'Fired on input',
      type: { text: 'CustomEvent' },
    },
  ],
  slots: [
    { name: '', description: 'Default slot' },
    { name: 'prefix', description: 'Prefix content' },
    { name: 'suffix', description: 'Suffix content' },
  ],
  cssProperties: [
    { name: '--forge-test-color', description: 'Text color' },
    { name: '--forge-test-background', description: 'Background color' },
  ],
  cssParts: [
    { name: 'root', description: 'Root element' },
    { name: 'input', description: 'Input element' },
  ],
  cssClasses: [{ name: 'forge-test--large', description: 'Large size' }],
};

describe('ApiValidationService', () => {
  const service = new ApiValidationService();

  describe('validateComponentApis', () => {
    it('should return empty results when no APIs provided', () => {
      const results = service.validateComponentApis(mockComponent, {});

      expect(results.totalValidated).toBe(0);
      expect(results.validApis).toHaveLength(0);
      expect(results.invalidApis).toHaveLength(0);
      expect(results.deprecatedApis).toHaveLength(0);
    });

    it('should include component info in results', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['value'],
      });

      expect(results.component).toBe('TestComponent');
      expect(results.tagName).toBe('forge-test');
    });
  });

  describe('property validation', () => {
    it('should validate existing public properties as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['value', 'disabled'],
      });

      expect(results.validApis).toHaveLength(2);
      expect(results.invalidApis).toHaveLength(0);
      expect(results.validApis.map(a => a.name)).toContain('value');
      expect(results.validApis.map(a => a.name)).toContain('disabled');
    });

    it('should validate non-existent properties as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['nonExistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].name).toBe('nonExistent');
      expect(results.invalidApis[0].apiType).toBe('property');
    });

    it('should flag deprecated properties', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['oldProp'],
      });

      expect(results.deprecatedApis).toHaveLength(1);
      expect(results.deprecatedApis[0].name).toBe('oldProp');
      expect(results.deprecatedApis[0].deprecationMessage).toBe(
        'Use newProp instead',
      );
    });

    it('should treat private properties as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['_private'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].name).toBe('_private');
    });
  });

  describe('attribute validation', () => {
    it('should validate existing attributes as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        attributes: ['value', 'disabled', 'readonly'],
      });

      expect(results.validApis).toHaveLength(3);
      expect(results.invalidApis).toHaveLength(0);
    });

    it('should validate non-existent attributes as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        attributes: ['nonExistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('attribute');
    });
  });

  describe('event validation', () => {
    it('should validate existing events as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        events: ['change', 'input'],
      });

      expect(results.validApis).toHaveLength(2);
    });

    it('should validate non-existent events as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        events: ['nonExistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('event');
    });
  });

  describe('method validation', () => {
    it('should validate existing public methods as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        methods: ['focus', 'reset'],
      });

      expect(results.validApis).toHaveLength(2);
    });

    it('should validate non-existent methods as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        methods: ['nonExistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('method');
    });

    it('should treat private methods as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        methods: ['_internalMethod'],
      });

      expect(results.invalidApis).toHaveLength(1);
    });
  });

  describe('slot validation', () => {
    it('should validate existing slots as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        slots: ['', 'prefix', 'suffix'],
      });

      expect(results.validApis).toHaveLength(3);
    });

    it('should validate non-existent slots as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        slots: ['nonExistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('slot');
    });
  });

  describe('CSS property validation', () => {
    it('should validate existing CSS properties as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        cssProperties: ['--forge-test-color', '--forge-test-background'],
      });

      expect(results.validApis).toHaveLength(2);
    });

    it('should validate non-existent CSS properties as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        cssProperties: ['--nonexistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('cssProperty');
    });
  });

  describe('CSS part validation', () => {
    it('should validate existing CSS parts as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        cssParts: ['root', 'input'],
      });

      expect(results.validApis).toHaveLength(2);
    });

    it('should validate non-existent CSS parts as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        cssParts: ['nonexistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('cssPart');
    });
  });

  describe('CSS class validation', () => {
    it('should validate existing CSS classes as valid', () => {
      const results = service.validateComponentApis(mockComponent, {
        cssClasses: ['forge-test--large'],
      });

      expect(results.validApis).toHaveLength(1);
    });

    it('should validate non-existent CSS classes as invalid', () => {
      const results = service.validateComponentApis(mockComponent, {
        cssClasses: ['nonexistent'],
      });

      expect(results.invalidApis).toHaveLength(1);
      expect(results.invalidApis[0].apiType).toBe('cssClass');
    });
  });

  describe('available APIs collection', () => {
    it('should only include requested API types in availableApis', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['value'],
      });

      expect(results.availableApis.properties).not.toHaveLength(0);
      expect(results.availableApis.attributes).toHaveLength(0);
      expect(results.availableApis.events).toHaveLength(0);
      expect(results.availableApis.methods).toHaveLength(0);
    });

    it('should include all requested API types in availableApis', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['value'],
        events: ['change'],
        slots: ['prefix'],
      });

      expect(results.availableApis.properties).not.toHaveLength(0);
      expect(results.availableApis.events).not.toHaveLength(0);
      expect(results.availableApis.slots).not.toHaveLength(0);
      expect(results.availableApis.attributes).toHaveLength(0);
    });
  });

  describe('mixed validation', () => {
    it('should handle validation of multiple API types', () => {
      const results = service.validateComponentApis(mockComponent, {
        properties: ['value', 'invalidProp'],
        attributes: ['disabled'],
        events: ['change', 'invalidEvent'],
        methods: ['focus'],
        slots: ['prefix'],
        cssProperties: ['--forge-test-color'],
        cssParts: ['root'],
        cssClasses: ['forge-test--large'],
      });

      expect(results.totalValidated).toBe(10);
      expect(results.validApis).toHaveLength(8);
      expect(results.invalidApis).toHaveLength(2);
      expect(results.invalidApis.map(a => a.name)).toContain('invalidProp');
      expect(results.invalidApis.map(a => a.name)).toContain('invalidEvent');
    });
  });
});
