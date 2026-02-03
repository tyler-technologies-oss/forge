/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/focusable_test.ts)
 */

import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { customElement } from '@tylertech/forge-core';

import { isFocusable } from '../../../constants';
import { WithFocusable } from './with-focusable';
import { BaseComponent } from '../../base/base-component';

describe('WithFocusable', () => {
  @customElement({ name: 'test-focusable' })
  class TestFocusable extends WithFocusable(BaseComponent) {
    public static get observedAttributes(): string[] {
      return ['tabindex'];
    }
  }

  async function setupTest(): Promise<TestFocusable> {
    return await fixture<TestFocusable>(html`<test-focusable></test-focusable>`);
  }

  it('should set isFocusable to true by default', async () => {
    const element = await setupTest();

    expect(element[isFocusable]).to.be.true;
  });

  it('should set tabindex="0" when isFocusable is true', async () => {
    const element = await setupTest();

    expect(element.tabIndex).to.equal(0);
  });

  it('should set tabindex="-1" when isFocusable is false', async () => {
    const element = await setupTest();

    element[isFocusable] = false;

    expect(element.tabIndex).to.equal(-1);
  });

  it('should not override user-set tabindex="0" when isFocusable is false', async () => {
    const element = await setupTest();

    element[isFocusable] = false;
    element.tabIndex = 0;

    expect(element[isFocusable]).to.be.false;
    expect(element.tabIndex).to.equal(0);
  });

  it('should not override user-set tabindex="-1" when isFocusable is true', async () => {
    const element = await setupTest();

    element.tabIndex = -1;

    expect(element[isFocusable]).to.be.true;
    expect(element.tabIndex).to.equal(-1);
  });

  it('should restore default tabindex when user-set tabindex attribute is removed', async () => {
    const element = await setupTest();

    element.tabIndex = -1;
    element.removeAttribute('tabindex');

    expect(element.tabIndex).to.equal(0);
  });
});
