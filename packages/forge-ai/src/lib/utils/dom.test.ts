import { describe, expect, it } from 'vitest';
import { generateUniqueId, toggleState } from './dom.js';

function createInternals(): ElementInternals {
  class StateHost extends HTMLElement {
    public readonly internals = this.attachInternals();
  }
  const tag = `state-host-${Math.random().toString(36).slice(2)}`;
  customElements.define(tag, StateHost);
  return (document.createElement(tag) as StateHost).internals;
}

describe('generateUniqueId', () => {
  it('should use the "id" prefix when no prefix is provided', () => {
    expect(generateUniqueId()).toMatch(/^id-[a-z0-9]+$/);
  });

  it('should use the provided prefix', () => {
    expect(generateUniqueId('thread')).toMatch(/^thread-[a-z0-9]+$/);
  });

  it('should generate a different id on each call', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateUniqueId()));

    expect(ids.size).toBe(50);
  });
});

describe('toggleState', () => {
  it('should add the custom state when value is true', () => {
    const internals = createInternals();

    toggleState(internals, 'active', true);

    expect(internals.states.has('active')).toBe(true);
  });

  it('should remove the custom state when value is false', () => {
    const internals = createInternals();
    toggleState(internals, 'active', true);

    toggleState(internals, 'active', false);

    expect(internals.states.has('active')).toBe(false);
  });

  it('should be idempotent when adding a state that is already set', () => {
    const internals = createInternals();

    toggleState(internals, 'active', true);
    toggleState(internals, 'active', true);

    expect(internals.states.has('active')).toBe(true);
  });

  it('should not throw when removing a state that was never set', () => {
    const internals = createInternals();

    expect(() => toggleState(internals, 'missing', false)).not.toThrow();
  });

  it('should fall back to a dashed-ident state when the plain name is rejected on add', () => {
    const added: string[] = [];
    const internals = {
      states: {
        add: (name: string): void => {
          if (!name.startsWith('--')) {
            throw new DOMException('invalid', 'SyntaxError');
          }
          added.push(name);
        },
        delete: (): boolean => true
      }
    } as unknown as ElementInternals;

    toggleState(internals, 'legacy', true);

    expect(added).toEqual(['--legacy']);
  });

  it('should fall back to a dashed-ident state when the plain name is rejected on delete', () => {
    const deleted: string[] = [];
    const internals = {
      states: {
        add: (): void => {},
        delete: (name: string): boolean => {
          if (!name.startsWith('--')) {
            throw new DOMException('invalid', 'SyntaxError');
          }
          deleted.push(name);
          return true;
        }
      }
    } as unknown as ElementInternals;

    toggleState(internals, 'legacy', false);

    expect(deleted).toEqual(['--legacy']);
  });
});
