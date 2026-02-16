import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { IPaginatorComponent } from './paginator.js';
import type { IPaginatorChangeEventData } from './paginator-constants.js';
import { PAGINATOR_CONSTANTS } from './paginator-constants.js';
import type { ISelectComponent } from '../select/select/select.js';
import type { IIconButtonComponent } from '../icon-button/index.js';

import './paginator.js';

describe('Paginator', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.paginatorElement.shadowRoot).toBeTruthy();
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.paginatorElement.pageIndex).toBe(0);
    expect(harness.paginatorElement.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);
    expect(harness.paginatorElement.offset).toBe(0);
    expect(harness.paginatorElement.total).toBe(0);
    expect(harness.paginatorElement.pageSizeOptions).toEqual(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS);
    expect(harness.paginatorElement.label).toBe(PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL);
    expect(harness.paginatorElement.firstLast).toBe(false);
    expect(harness.paginatorElement.first).toBe(false);
    expect(harness.paginatorElement.disabled).toBe(false);
    expect(harness.paginatorElement.alternative).toBe(false);
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();

      await expect(harness.paginatorElement).toBeAccessible();
    });

    it('should be accessible when alternative', async () => {
      const harness = await createFixture({ alternative: true });

      await expect(harness.paginatorElement).toBeAccessible();
    });

    it('should be accessible when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      await expect(harness.paginatorElement).toBeAccessible();
    });
  });

  describe('total', () => {
    it('should default to DEFAULT_TOTAL when set to non-finite value', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.total = NaN;
      expect(harness.paginatorElement.total).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL);

      harness.paginatorElement.total = 100;
      harness.paginatorElement.total = Infinity;
      expect(harness.paginatorElement.total).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL);

      harness.paginatorElement.total = 100;
      harness.paginatorElement.total = -Infinity;
      expect(harness.paginatorElement.total).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL);
    });

    it('should set total via attribute', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.paginatorElement.total).toBe(100);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL)).toBe('100');
    });

    it('should set total via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.total = 100;

      expect(harness.paginatorElement.total).toBe(100);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL)).toBe('100');
    });

    it('should set total via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL, '100');

      expect(harness.paginatorElement.total).toBe(100);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL)).toBe('100');
    });

    it('should reflect total in range label', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.rangeLabelText).toBe('1-25 of 100');

      harness.paginatorElement.total = 200;

      expect(harness.rangeLabelText).toBe('1-25 of 200');
    });
  });

  describe('pageIndex', () => {
    it('should default to DEFAULT_PAGE_INDEX when set to non-finite value', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 2 });

      harness.paginatorElement.pageIndex = NaN;
      expect(harness.paginatorElement.pageIndex).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX);

      harness.paginatorElement.pageIndex = 2;
      harness.paginatorElement.pageIndex = Infinity;
      expect(harness.paginatorElement.pageIndex).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX);

      harness.paginatorElement.pageIndex = 2;
      harness.paginatorElement.pageIndex = -Infinity;
      expect(harness.paginatorElement.pageIndex).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX);
    });

    it('should set pageIndex via attribute', async () => {
      const harness = await createFixture({ pageIndex: 2 });

      expect(harness.paginatorElement.pageIndex).toBe(2);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).toBe('2');
    });

    it('should set pageIndex via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageIndex = 2;

      expect(harness.paginatorElement.pageIndex).toBe(2);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).toBe('2');
    });

    it('should set pageIndex via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX, '2');

      expect(harness.paginatorElement.pageIndex).toBe(2);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).toBe('2');
    });

    it('should reflect pageIndex in range label', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });

      expect(harness.rangeLabelText).toBe('26-50 of 100');

      harness.paginatorElement.pageIndex = 2;

      expect(harness.rangeLabelText).toBe('51-75 of 100');
    });

    it('should update offset when pageIndex changes', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });

      expect(harness.paginatorElement.offset).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);

      harness.paginatorElement.pageIndex = 2;

      expect(harness.paginatorElement.offset).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE * 2);
    });
  });

  describe('pageSize', () => {
    it('should default to DEFAULT_PAGE_SIZE when set to non-finite value', async () => {
      const harness = await createFixture({ total: 100, pageSize: 50 });

      harness.paginatorElement.pageSize = NaN;
      expect(harness.paginatorElement.pageSize).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);

      harness.paginatorElement.pageSize = 50;
      harness.paginatorElement.pageSize = Infinity;
      expect(harness.paginatorElement.pageSize).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);

      harness.paginatorElement.pageSize = 50;
      harness.paginatorElement.pageSize = -Infinity;
      expect(harness.paginatorElement.pageSize).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);
    });

    it('should set pageSize via attribute', async () => {
      const harness = await createFixture({ pageSize: 50 });

      expect(harness.paginatorElement.pageSize).toBe(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE)).toBe('50');
    });

    it('should set pageSize via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageSize = 50;

      expect(harness.paginatorElement.pageSize).toBe(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE)).toBe('50');
    });

    it('should set pageSize via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE, '50');

      expect(harness.paginatorElement.pageSize).toBe(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE)).toBe('50');
    });

    it('should reflect pageSize in range label', async () => {
      const harness = await createFixture({ total: 100, pageSize: 50 });

      expect(harness.rangeLabelText).toBe('1-50 of 100');

      harness.paginatorElement.pageSize = 25;

      expect(harness.rangeLabelText).toBe('1-25 of 100');
    });

    it('should update offset when pageSize changes', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.paginatorElement.offset).toBe(0);

      harness.paginatorElement.pageIndex = 1;
      harness.paginatorElement.pageSize = 50;

      expect(harness.paginatorElement.offset).toBe(50);
    });

    it('should update range label if page size is set to 0', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.pageSize = 0;

      expect(harness.rangeLabelText).toBe('1 of 100');
    });
  });

  describe('offset', () => {
    it('should set offset via attribute', async () => {
      const harness = await createFixture({ offset: 50 });

      expect(harness.paginatorElement.offset).toBe(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET)).toBe('50');
    });

    it('should set offset via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.offset = 50;

      expect(harness.paginatorElement.offset).toBe(50);
    });

    it('should set offset via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET, '50');

      expect(harness.paginatorElement.offset).toBe(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET)).toBe('50');
    });

    it('should update pageIndex when setting offset', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.offset = 50;

      expect(harness.paginatorElement.pageIndex).toBe(2);
      expect(harness.rangeLabelText).toBe('51-75 of 100');
    });
  });

  describe('pageSizeOptions', () => {
    it('should set pageSizeOptions via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageSizeOptions = [10, 20, 30];

      expect(harness.paginatorElement.pageSizeOptions).toEqual([10, 20, 30]);
    });

    it('should set pageSizeOptions via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE_OPTIONS, '10,20,30');

      expect(harness.paginatorElement.pageSizeOptions).toEqual([10, 20, 30]);
    });

    it('should reflect pageSizeOptions in page size select', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageSizeOptions = [10, 20, 30];

      expect(harness.pageSizeSelect.options.length).toBe(3);
      expect(harness.pageSizeSelect.options[0].value).toBe('10');
      expect(harness.pageSizeSelect.options[1].value).toBe('20');
      expect(harness.pageSizeSelect.options[2].value).toBe('30');
    });

    it('should update page size when selecting option in page size select', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.pageSizeOptions = [10, 20, 30];
      harness.pageSizeSelect.value = '20';
      harness.pageSizeSelect.dispatchEvent(new CustomEvent('change', { detail: '20' }));

      expect(harness.paginatorElement.pageSize).toBe(20);
      expect(harness.paginatorElement.offset).toBe(0);
      expect(harness.rangeLabelText).toBe('1-20 of 100');
    });

    it('should hide page size select if no options', async () => {
      const harness = await createFixture();

      expect(harness.pageSizeSelect).toBeTruthy();

      harness.paginatorElement.pageSizeOptions = [];

      expect(harness.pageSizeSelect.hidden).toBe(true);
    });
  });

  describe('label', () => {
    it('should set label via attribute', async () => {
      const harness = await createFixture({ label: 'Test' });

      expect(harness.paginatorElement.label).toBe('Test');
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).toBe('Test');
    });

    it('should set label via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.label = 'Test';

      expect(harness.paginatorElement.label).toBe('Test');
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).toBe('Test');
    });

    it('should set label via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.LABEL, 'Test');

      expect(harness.paginatorElement.label).toBe('Test');
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).toBe('Test');
    });

    it('should reflect label in label text', async () => {
      const harness = await createFixture({ label: 'Test' });

      expect(harness.labelText).toBe('Test');
    });

    it('should remove label attribute when no label is set', async () => {
      const harness = await createFixture({ label: 'Test' });

      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).toBe('Test');

      harness.paginatorElement.label = '';

      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).toBe(false);
    });
  });

  describe('firstLast', () => {
    it('should set firstLast via attribute', async () => {
      const harness = await createFixture({ firstLast: true });

      expect(harness.paginatorElement.firstLast).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST)).toBe(true);
    });

    it('should set firstLast via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.firstLast = true;

      expect(harness.paginatorElement.firstLast).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST)).toBe(true);
    });

    it('should set firstLast via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST, '');

      expect(harness.paginatorElement.firstLast).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST)).toBe(true);
    });
  });

  describe('first', () => {
    it('should set first via attribute', async () => {
      const harness = await createFixture({ first: true });

      expect(harness.paginatorElement.first).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST)).toBe(true);
    });

    it('should set first via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.first = true;

      expect(harness.paginatorElement.first).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST)).toBe(true);
    });

    it('should set first via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.FIRST, '');

      expect(harness.paginatorElement.first).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST)).toBe(true);
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', async () => {
      const harness = await createFixture();

      expect(harness.paginatorElement.disabled).toBe(false);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).toBe(false);
      expect(harness.pageSizeSelect.disabled).toBe(false);
      expect(harness.firstButton).toBeNull();
      expect(harness.previousButton.disabled).toBe(true);
      expect(harness.nextButton.disabled).toBe(true);
      expect(harness.lastButton).toBeNull();
    });

    it('should set disabled via attribute', async () => {
      const harness = await createFixture({ disabled: true, firstLast: true });

      expect(harness.paginatorElement.disabled).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(harness.pageSizeSelect.disabled).toBe(true);
      expect(harness.firstButton?.disabled).toBe(true);
      expect(harness.previousButton.disabled).toBe(true);
      expect(harness.nextButton.disabled).toBe(true);
      expect(harness.lastButton?.disabled).toBe(true);
    });

    it('should set disabled via property dynamically', async () => {
      const harness = await createFixture({ firstLast: true });

      harness.paginatorElement.disabled = true;

      expect(harness.paginatorElement.disabled).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(harness.pageSizeSelect.disabled).toBe(true);
      expect(harness.firstButton?.disabled).toBe(true);
      expect(harness.previousButton.disabled).toBe(true);
      expect(harness.nextButton.disabled).toBe(true);
      expect(harness.lastButton?.disabled).toBe(true);
    });

    it('should set disabled via attribute dynamically', async () => {
      const harness = await createFixture({ firstLast: true });

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED, '');

      expect(harness.paginatorElement.disabled).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(harness.pageSizeSelect.disabled).toBe(true);
      expect(harness.firstButton?.disabled).toBe(true);
      expect(harness.previousButton.disabled).toBe(true);
      expect(harness.nextButton.disabled).toBe(true);
      expect(harness.lastButton?.disabled).toBe(true);
    });
  });

  describe('alternative', () => {
    it('should set alternative via attribute', async () => {
      const harness = await createFixture({ alternative: true });

      expect(harness.paginatorElement.alternative).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).toBe(true);
    });

    it('should set alternative via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.alternative = true;

      expect(harness.paginatorElement.alternative).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).toBe(true);
    });

    it('should set alternative via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE, '');

      expect(harness.paginatorElement.alternative).toBe(true);
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).toBe(true);
    });

    it('should reflect alternative in range label', async () => {
      const harness = await createFixture({ total: 100, alternative: true });

      expect(harness.alternativeRangeLabelText).toBe('1-25 of 100');

      harness.paginatorElement.pageIndex = 1;

      expect(harness.alternativeRangeLabelText).toBe('26-50 of 100');
    });
  });

  describe('rangeLabelCallback', () => {
    it('should set range label via callback property', async () => {
      const harness = await createFixture();

      const cb = (): string => 'Test';
      harness.paginatorElement.rangeLabelCallback = cb;

      expect(harness.paginatorElement.rangeLabelCallback).toBe(cb);
      expect(harness.rangeLabelText).toBe('Test');
    });

    it('should set alternative range label via callback property', async () => {
      const harness = await createFixture({ alternative: true });

      harness.paginatorElement.rangeLabelCallback = () => 'Test';

      expect(harness.alternativeRangeLabelText).toBe('Test');
    });
  });

  describe('page buttons', () => {
    it('should not show first and last buttons by default', async () => {
      const harness = await createFixture();

      expect(harness.firstButton).toBeNull();
      expect(harness.lastButton).toBeNull();
    });

    it('should show first and last buttons when firstLast is true', async () => {
      const harness = await createFixture({ firstLast: true });

      expect(harness.firstButton).toBeTruthy();
      expect(harness.lastButton).toBeTruthy();
    });

    it('should show first button when first is true', async () => {
      const harness = await createFixture({ first: true });

      expect(harness.firstButton).toBeTruthy();
      expect(harness.lastButton).toBeNull();
    });

    it('should update pageIndex when clicking first button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });

      harness.firstButton?.click();

      expect(harness.paginatorElement.pageIndex).toBe(0);
      expect(harness.rangeLabelText).toBe('1-25 of 100');
    });

    it('should update pageIndex when clicking previous button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });

      harness.previousButton.click();

      expect(harness.paginatorElement.pageIndex).toBe(0);
      expect(harness.rangeLabelText).toBe('1-25 of 100');
    });

    it('should update pageIndex when clicking next button', async () => {
      const harness = await createFixture({ total: 100 });

      harness.nextButton.click();

      expect(harness.paginatorElement.pageIndex).toBe(1);
      expect(harness.rangeLabelText).toBe('26-50 of 100');
    });

    it('should update pageIndex when clicking last button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });

      harness.lastButton?.click();

      expect(harness.paginatorElement.pageIndex).toBe(3);
      expect(harness.rangeLabelText).toBe('76-100 of 100');
    });

    it('should dispatch change event when clicking next page button', async () => {
      const harness = await createFixture({ total: 100 });
      const changeSpy = vi.fn();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.nextButton.click();

      expect(changeSpy).toHaveBeenCalledOnce();
      const detail = changeSpy.mock.calls[0][0].detail as IPaginatorChangeEventData;
      expect(detail.type).toBe('next-page');
      expect(detail.pageIndex).toBe(1);
      expect(detail.pageSize).toBe(25);
      expect(detail.offset).toBe(25);
    });

    it('should dispatch change event when clicking previous page button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });
      const changeSpy = vi.fn();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.previousButton.click();

      expect(changeSpy).toHaveBeenCalledOnce();
      const detail = changeSpy.mock.calls[0][0].detail as IPaginatorChangeEventData;
      expect(detail.type).toBe('previous-page');
      expect(detail.pageIndex).toBe(0);
      expect(detail.pageSize).toBe(25);
      expect(detail.offset).toBe(0);
    });

    it('should dispatch change event when clicking first page button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });
      const changeSpy = vi.fn();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.firstButton?.click();

      expect(changeSpy).toHaveBeenCalledOnce();
      const detail = changeSpy.mock.calls[0][0].detail as IPaginatorChangeEventData;
      expect(detail.type).toBe('first-page');
      expect(detail.pageIndex).toBe(0);
      expect(detail.pageSize).toBe(25);
      expect(detail.offset).toBe(0);
    });

    it('should dispatch change event when clicking last page button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });
      const changeSpy = vi.fn();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.lastButton?.click();

      expect(changeSpy).toHaveBeenCalledOnce();
      const detail = changeSpy.mock.calls[0][0].detail as IPaginatorChangeEventData;
      expect(detail.type).toBe('last-page');
      expect(detail.pageIndex).toBe(3);
      expect(detail.pageSize).toBe(25);
      expect(detail.offset).toBe(75);
    });

    it('should dispatch change event when changing page size select', async () => {
      const harness = await createFixture({ total: 100 });
      const changeSpy = vi.fn();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.pageSizeSelect.value = '50';
      harness.pageSizeSelect.dispatchEvent(new CustomEvent('change', { detail: '50' }));

      expect(changeSpy).toHaveBeenCalledOnce();
      const detail = changeSpy.mock.calls[0][0].detail as IPaginatorChangeEventData;
      expect(detail.type).toBe('page-size');
      expect(detail.pageIndex).toBe(0);
      expect(detail.pageSize).toBe(50);
      expect(detail.offset).toBe(0);
    });

    it('should not update pageSize when cancelling change event', async () => {
      const harness = await createFixture({ total: 100 });
      const changeSpy = vi.fn(evt => evt.preventDefault());
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.pageSizeSelect.value = '50';
      harness.pageSizeSelect.dispatchEvent(new CustomEvent('change', { detail: '50' }));

      expect(harness.paginatorElement.pageSize).toBe(25);
    });

    it('should disable first button when on first page', async () => {
      const harness = await createFixture({ total: 100, firstLast: true });

      expect(harness.firstButton?.disabled).toBe(true);
    });

    it('should disable previous button when on first page', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.previousButton.disabled).toBe(true);
    });

    it('should disable next button when on last page', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 3 });

      expect(harness.nextButton.disabled).toBe(true);
    });

    it('should disable last button when on last page', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 3, firstLast: true });

      expect(harness.lastButton?.disabled).toBe(true);
    });
  });

  describe('Interaction API', () => {
    describe('navigation methods', () => {
      it('should navigate to first page via goToFirstPage()', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 2 });
        const changeSpy = vi.fn();
        harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

        harness.paginatorElement.goToFirstPage();

        expect(harness.paginatorElement.pageIndex).toBe(0);
        expect(harness.paginatorElement.offset).toBe(0);
        expect(changeSpy).toHaveBeenCalledOnce();
        expect(changeSpy.mock.calls[0][0].detail.type).toBe('first-page');
        expect(changeSpy.mock.calls[0][0].detail.pageIndex).toBe(0);
      });

      it('should navigate to previous page via goToPreviousPage()', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 2 });
        const changeSpy = vi.fn();
        harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

        harness.paginatorElement.goToPreviousPage();

        expect(harness.paginatorElement.pageIndex).toBe(1);
        expect(harness.paginatorElement.offset).toBe(25);
        expect(changeSpy).toHaveBeenCalledOnce();
        expect(changeSpy.mock.calls[0][0].detail.type).toBe('previous-page');
        expect(changeSpy.mock.calls[0][0].detail.pageIndex).toBe(1);
      });

      it('should navigate to next page via goToNextPage()', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 1 });
        const changeSpy = vi.fn();
        harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

        harness.paginatorElement.goToNextPage();

        expect(harness.paginatorElement.pageIndex).toBe(2);
        expect(harness.paginatorElement.offset).toBe(50);
        expect(changeSpy).toHaveBeenCalledOnce();
        expect(changeSpy.mock.calls[0][0].detail.type).toBe('next-page');
        expect(changeSpy.mock.calls[0][0].detail.pageIndex).toBe(2);
      });

      it('should navigate to last page via goToLastPage()', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 1 });
        const changeSpy = vi.fn();
        harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

        harness.paginatorElement.goToLastPage();

        expect(harness.paginatorElement.pageIndex).toBe(3);
        expect(harness.paginatorElement.offset).toBe(75);
        expect(changeSpy).toHaveBeenCalledOnce();
        expect(changeSpy.mock.calls[0][0].detail.type).toBe('last-page');
        expect(changeSpy.mock.calls[0][0].detail.pageIndex).toBe(3);
      });

      it('should not navigate beyond bounds', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 0 });

        harness.paginatorElement.goToFirstPage();
        expect(harness.paginatorElement.pageIndex).toBe(0);

        harness.paginatorElement.goToPreviousPage();
        expect(harness.paginatorElement.pageIndex).toBe(0);

        harness.paginatorElement.pageIndex = 3; // Last page
        harness.paginatorElement.goToLastPage();
        expect(harness.paginatorElement.pageIndex).toBe(3);

        harness.paginatorElement.goToNextPage();
        expect(harness.paginatorElement.pageIndex).toBe(3);
      });
    });

    describe('validation methods', () => {
      it('should validate navigation possibilities correctly', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 0 });

        expect(harness.paginatorElement.canGoToFirstPage()).toBe(false);
        expect(harness.paginatorElement.canGoToPreviousPage()).toBe(false);
        expect(harness.paginatorElement.canGoToNextPage()).toBe(true);
        expect(harness.paginatorElement.canGoToLastPage()).toBe(true);

        harness.paginatorElement.pageIndex = 1;

        expect(harness.paginatorElement.canGoToFirstPage()).toBe(true);
        expect(harness.paginatorElement.canGoToPreviousPage()).toBe(true);
        expect(harness.paginatorElement.canGoToNextPage()).toBe(true);
        expect(harness.paginatorElement.canGoToLastPage()).toBe(true);

        harness.paginatorElement.pageIndex = 3; // Last page (100 total / 25 size = 4 pages, 0-indexed)

        expect(harness.paginatorElement.canGoToFirstPage()).toBe(true);
        expect(harness.paginatorElement.canGoToPreviousPage()).toBe(true);
        expect(harness.paginatorElement.canGoToNextPage()).toBe(false);
        expect(harness.paginatorElement.canGoToLastPage()).toBe(false);
      });

      it('should handle edge cases for validation', async () => {
        const harness = await createFixture({ total: 0 });

        expect(harness.paginatorElement.canGoToFirstPage()).toBe(false);
        expect(harness.paginatorElement.canGoToPreviousPage()).toBe(false);
        expect(harness.paginatorElement.canGoToNextPage()).toBe(false);
        expect(harness.paginatorElement.canGoToLastPage()).toBe(false);
      });
    });

    describe('event cancellation support', () => {
      it('should respect cancelled navigation events', async () => {
        const harness = await createFixture({ total: 100, pageIndex: 1 });
        const changeSpy = vi.fn(evt => evt.preventDefault());
        harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

        harness.paginatorElement.goToNextPage();

        expect(harness.paginatorElement.pageIndex).toBe(1); // Should not change
        expect(changeSpy).toHaveBeenCalledOnce();
      });
    });
  });
});

class PaginatorHarness {
  constructor(public paginatorElement: IPaginatorComponent) {}

  public get labelText(): string {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.LABEL)?.textContent ?? '';
  }

  public get rangeLabelText(): string {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL)?.textContent ?? '';
  }

  public get alternativeRangeLabelText(): string {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL_ALTERNATIVE)?.textContent ?? '';
  }

  public get pageSizeSelect(): ISelectComponent {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.PAGE_SIZE_SELECT) as ISelectComponent;
  }

  public get firstButton(): IIconButtonComponent | null {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_BUTTON) as IIconButtonComponent;
  }

  public get previousButton(): IIconButtonComponent {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.PREVIOUS_PAGE_BUTTON) as IIconButtonComponent;
  }

  public get nextButton(): IIconButtonComponent {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.NEXT_PAGE_BUTTON) as IIconButtonComponent;
  }

  public get lastButton(): IIconButtonComponent | null {
    return getShadowElement(this.paginatorElement, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_BUTTON) as IIconButtonComponent;
  }
}

interface IPaginatorFixtureConfig {
  total?: number;
  pageIndex?: number;
  pageSize?: number;
  offset?: number;
  label?: string;
  firstLast?: boolean;
  first?: boolean;
  disabled?: boolean;
  alternative?: boolean;
}

async function createFixture({
  total,
  pageIndex,
  pageSize,
  offset,
  label,
  firstLast,
  first,
  disabled,
  alternative
}: IPaginatorFixtureConfig = {}): Promise<PaginatorHarness> {
  const screen = render(html`
    <forge-paginator
      total=${total ?? nothing}
      page-index=${pageIndex ?? nothing}
      page-size=${pageSize ?? nothing}
      offset=${offset ?? nothing}
      label=${label ?? nothing}
      ?first-last=${firstLast}
      ?first=${first}
      ?disabled=${disabled}
      ?alternative=${alternative}></forge-paginator>
  `);

  const el = screen.container.querySelector('forge-paginator') as IPaginatorComponent;
  return new PaginatorHarness(el);
}
