/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable_test.ts)
 */

import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { customElement } from '@tylertech/forge-core';

import { isFocusable } from '../../../constants.js';
import { WithFocusable } from './with-focusable.js';
import { BaseComponent } from '../../base/base-component.js';

describe('WithFocusable', () => {
  @customElement({ name: 'test-focusable' })
  class TestFocusable extends WithFocusable(BaseComponent) {
    public static get observedAttributes(): string[] {
      return ['tabindex'];
    }
  }

  function setupTest(): TestFocusable {
    const screen = render(html`<test-focusable></test-focusable>`);
    return screen.container.querySelector('test-focusable') as TestFocusable;
  }

  it('should set isFocusable to true by default', async () => {
    const element = setupTest();

    expect(element[isFocusable]).toBe(true);
  });

  it('should set tabindex="0" when isFocusable is true', async () => {
    const element = setupTest();

    expect(element.tabIndex).toBe(0);
  });

  it('should set tabindex="-1" when isFocusable is false', async () => {
    const element = setupTest();

    element[isFocusable] = false;

    expect(element.tabIndex).toBe(-1);
  });

  it('should not override user-set tabindex="0" when isFocusable is false', async () => {
    const element = setupTest();

    element[isFocusable] = false;
    element.tabIndex = 0;

    expect(element[isFocusable]).toBe(false);
    expect(element.tabIndex).toBe(0);
  });

  it('should not override user-set tabindex="-1" when isFocusable is true', async () => {
    const element = setupTest();

    element.tabIndex = -1;

    expect(element[isFocusable]).toBe(true);
    expect(element.tabIndex).toBe(-1);
  });

  it('should restore default tabindex when user-set tabindex attribute is removed', async () => {
    const element = setupTest();

    element.tabIndex = -1;
    element.removeAttribute('tabindex');

    expect(element.tabIndex).toBe(0);
  });
});
