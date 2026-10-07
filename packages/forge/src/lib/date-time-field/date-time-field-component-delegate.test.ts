import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { removeElement } from '@tylertech/forge-core';
import { defineDateTimeFieldComponent, DateTimeFieldComponentDelegate, type DateTimeFieldComponentDelegateProps } from './index.js';

interface IDateTimeFieldComponentDelegateHarness {
  delegate: DateTimeFieldComponentDelegate;
  destroy(): void;
}

describe('DateTimeFieldComponentDelegate', () => {
  let harness: IDateTimeFieldComponentDelegateHarness | undefined;

  beforeAll(() => {
    defineDateTimeFieldComponent();
  });

  afterEach(() => {
    harness?.destroy();
    harness = undefined;
  });

  it('should create one input when the field captures a single value', () => {
    harness = setupTestContext();
    expect(harness.delegate.getInputElements().length).toBe(1);
  });

  it('should create two inputs when date-mode is range', () => {
    harness = setupTestContext({ dateMode: 'range' });
    expect(harness.delegate.getInputElements().length).toBe(2);
  });

  it('should create two inputs when time-mode is range', () => {
    harness = setupTestContext({ timeMode: 'range' });
    expect(harness.delegate.getInputElements().length).toBe(2);
  });

  it('should create one input when time-mode is slots even if date-mode is range', () => {
    harness = setupTestContext({ dateMode: 'range', timeMode: 'slots' });
    expect(harness.delegate.getInputElements().length).toBe(1);
  });

  it('should return the forge-text-field that wraps the inputs', () => {
    harness = setupTestContext({ dateMode: 'range' });
    const textField = harness.delegate.getTextFieldElement();
    expect(textField.localName).toBe('forge-text-field');
    expect(textField.parentElement).toBe(harness.delegate.element);
    harness.delegate.getInputElements().forEach(input => expect(input.parentElement).toBe(textField));
  });

  function setupTestContext(props?: DateTimeFieldComponentDelegateProps): IDateTimeFieldComponentDelegateHarness {
    const fixtureElement = document.createElement('div');
    const delegate = new DateTimeFieldComponentDelegate({ props });
    fixtureElement.appendChild(delegate.element);
    document.body.appendChild(fixtureElement);
    return {
      delegate,
      destroy: () => {
        delegate.destroy();
        removeElement(fixtureElement);
      }
    };
  }
});
