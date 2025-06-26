import { nothing } from 'lit-html';
import { fixture, expect, html } from '@open-wc/testing';
import type { IPaginatorComponent } from './paginator';

import './paginator';
import { IPaginatorChangeEventData, PAGINATOR_CONSTANTS } from './paginator-constants';
import { getShadowElement } from '@tylertech/forge-core';
import { ISelectComponent } from '../select/select/select';
import { IIconButtonComponent } from '../icon-button';
import sinon from 'sinon';

describe('Paginator', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.paginatorElement.shadowRoot).to.be.ok;
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.paginatorElement.pageIndex).to.equal(0);
    expect(harness.paginatorElement.pageSize).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);
    expect(harness.paginatorElement.offset).to.equal(0);
    expect(harness.paginatorElement.total).to.equal(0);
    expect(harness.paginatorElement.pageSizeOptions).to.deep.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS);
    expect(harness.paginatorElement.label).to.equal(PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL);
    expect(harness.paginatorElement.firstLast).to.be.false;
    expect(harness.paginatorElement.first).to.be.false;
    expect(harness.paginatorElement.disabled).to.be.false;
    expect(harness.paginatorElement.alternative).to.be.false;
  });

  it('should focus page size select when calling focus()', async () => {
    const harness = await createFixture();

    harness.paginatorElement.focus();

    expect(harness.pageSizeSelect.matches(':focus')).to.be.true;
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();

      await expect(harness.paginatorElement).to.be.accessible();
    });

    it('should be accessible when alternative', async () => {
      const harness = await createFixture({ alternative: true });

      await expect(harness.paginatorElement).to.be.accessible();
    });

    it('should be accessible when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      await expect(harness.paginatorElement).to.be.accessible();
    });
  });

  describe('total', () => {
    it('should set total via attribute', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.paginatorElement.total).to.equal(100);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL)).to.equal('100');
    });

    it('should set total via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.total = 100;

      expect(harness.paginatorElement.total).to.equal(100);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL)).to.equal('100');
    });

    it('should set total via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL, '100');

      expect(harness.paginatorElement.total).to.equal(100);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL)).to.equal('100');
    });

    it('should reflect total in range label', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.rangeLabelText).to.equal('1-25 of 100');

      harness.paginatorElement.total = 200;

      expect(harness.rangeLabelText).to.equal('1-25 of 200');
    });
  });

  describe('pageIndex', () => {
    it('should set pageIndex via attribute', async () => {
      const harness = await createFixture({ pageIndex: 2 });

      expect(harness.paginatorElement.pageIndex).to.equal(2);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).to.equal('2');
    });

    it('should set pageIndex via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageIndex = 2;

      expect(harness.paginatorElement.pageIndex).to.equal(2);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).to.equal('2');
    });

    it('should set pageIndex via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX, '2');

      expect(harness.paginatorElement.pageIndex).to.equal(2);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).to.equal('2');
    });

    it('should reflect pageIndex in range label', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });

      expect(harness.rangeLabelText).to.equal('26-50 of 100');

      harness.paginatorElement.pageIndex = 2;

      expect(harness.rangeLabelText).to.equal('51-75 of 100');
    });

    it('should update offset when pageIndex changes', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });

      expect(harness.paginatorElement.offset).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);

      harness.paginatorElement.pageIndex = 2;

      expect(harness.paginatorElement.offset).to.equal(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE * 2);
    });
  });

  describe('pageSize', () => {
    it('should set pageSize via attribute', async () => {
      const harness = await createFixture({ pageSize: 50 });

      expect(harness.paginatorElement.pageSize).to.equal(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE)).to.equal('50');
    });

    it('should set pageSize via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageSize = 50;

      expect(harness.paginatorElement.pageSize).to.equal(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE)).to.equal('50');
    });

    it('should set pageSize via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE, '50');

      expect(harness.paginatorElement.pageSize).to.equal(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE)).to.equal('50');
    });

    it('should reflect pageSize in range label', async () => {
      const harness = await createFixture({ total: 100, pageSize: 50 });

      expect(harness.rangeLabelText).to.equal('1-50 of 100');

      harness.paginatorElement.pageSize = 25;

      expect(harness.rangeLabelText).to.equal('1-25 of 100');
    });

    it('should update offset when pageSize changes', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.paginatorElement.offset).to.equal(0);

      harness.paginatorElement.pageIndex = 1;
      harness.paginatorElement.pageSize = 50;

      expect(harness.paginatorElement.offset).to.equal(50);
    });

    it('should update range label if page size is set to 0', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.pageSize = 0;

      expect(harness.rangeLabelText).to.equal('1 of 100');
    });
  });

  describe('offset', () => {
    it('should set offset via attribute', async () => {
      const harness = await createFixture({ offset: 50 });

      expect(harness.paginatorElement.offset).to.equal(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET)).to.equal('50');
    });

    it('should set offset via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.offset = 50;

      expect(harness.paginatorElement.offset).to.equal(50);
    });

    it('should set offset via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET, '50');

      expect(harness.paginatorElement.offset).to.equal(50);
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET)).to.equal('50');
    });

    it('should update pageIndex when setting offset', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.offset = 50;

      expect(harness.paginatorElement.pageIndex).to.equal(2);
      expect(harness.rangeLabelText).to.equal('51-75 of 100');
    });
  });

  describe('pageSizeOptions', () => {
    it('should set pageSizeOptions via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageSizeOptions = [10, 20, 30];

      expect(harness.paginatorElement.pageSizeOptions).to.deep.equal([10, 20, 30]);
    });

    it('should set pageSizeOptions via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE_OPTIONS, '10,20,30');

      expect(harness.paginatorElement.pageSizeOptions).to.deep.equal([10, 20, 30]);
    });

    it('should reflect pageSizeOptions in page size select', async () => {
      const harness = await createFixture();

      harness.paginatorElement.pageSizeOptions = [10, 20, 30];

      expect(harness.pageSizeSelect.options.length).to.equal(3);
      expect(harness.pageSizeSelect.options[0].value).to.equal('10');
      expect(harness.pageSizeSelect.options[1].value).to.equal('20');
      expect(harness.pageSizeSelect.options[2].value).to.equal('30');
    });

    it('should update page size when selecting option in page size select', async () => {
      const harness = await createFixture({ total: 100 });

      harness.paginatorElement.pageSizeOptions = [10, 20, 30];
      harness.pageSizeSelect.value = '20';
      harness.pageSizeSelect.dispatchEvent(new CustomEvent('change', { detail: '20' }));

      expect(harness.paginatorElement.pageSize).to.equal(20);
      expect(harness.paginatorElement.offset).to.equal(0);
      expect(harness.rangeLabelText).to.equal('1-20 of 100');
    });

    it('should hide page size select if no options', async () => {
      const harness = await createFixture();

      expect(harness.pageSizeSelect).to.be.ok;

      harness.paginatorElement.pageSizeOptions = [];

      expect(harness.pageSizeSelect.hidden).to.be.true;
    });
  });

  describe('label', () => {
    it('should set label via attribute', async () => {
      const harness = await createFixture({ label: 'Test' });

      expect(harness.paginatorElement.label).to.equal('Test');
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).to.equal('Test');
    });

    it('should set label via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.label = 'Test';

      expect(harness.paginatorElement.label).to.equal('Test');
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).to.equal('Test');
    });

    it('should set label via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.LABEL, 'Test');

      expect(harness.paginatorElement.label).to.equal('Test');
      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).to.equal('Test');
    });

    it('should reflect label in label text', async () => {
      const harness = await createFixture({ label: 'Test' });

      expect(harness.labelText).to.equal('Test');
    });

    it('should remove label attribute when no label is set', async () => {
      const harness = await createFixture({ label: 'Test' });

      expect(harness.paginatorElement.getAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).to.equal('Test');

      harness.paginatorElement.label = '';

      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.LABEL)).to.be.false;
    });
  });

  describe('firstLast', () => {
    it('should set firstLast via attribute', async () => {
      const harness = await createFixture({ firstLast: true });

      expect(harness.paginatorElement.firstLast).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST)).to.be.true;
    });

    it('should set firstLast via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.firstLast = true;

      expect(harness.paginatorElement.firstLast).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST)).to.be.true;
    });

    it('should set firstLast via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST, '');

      expect(harness.paginatorElement.firstLast).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST)).to.be.true;
    });
  });

  describe('first', () => {
    it('should set first via attribute', async () => {
      const harness = await createFixture({ first: true });

      expect(harness.paginatorElement.first).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST)).to.be.true;
    });

    it('should set first via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.first = true;

      expect(harness.paginatorElement.first).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST)).to.be.true;
    });

    it('should set first via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.FIRST, '');

      expect(harness.paginatorElement.first).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.FIRST)).to.be.true;
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', async () => {
      const harness = await createFixture();

      expect(harness.paginatorElement.disabled).to.be.false;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).to.be.false;
      expect(harness.pageSizeSelect.disabled).to.be.false;
      expect(harness.firstButton).not.to.be.ok;
      expect(harness.previousButton.disabled).to.be.true;
      expect(harness.nextButton.disabled).to.be.true;
      expect(harness.lastButton).not.to.be.ok;
    });

    it('should set disabled via attribute', async () => {
      const harness = await createFixture({ disabled: true, firstLast: true });

      expect(harness.paginatorElement.disabled).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(harness.pageSizeSelect.disabled).to.be.true;
      expect(harness.firstButton?.disabled).to.be.true;
      expect(harness.previousButton.disabled).to.be.true;
      expect(harness.nextButton.disabled).to.be.true;
      expect(harness.lastButton?.disabled).to.be.true;
    });

    it('should set disabled via property dynamically', async () => {
      const harness = await createFixture({ firstLast: true });

      harness.paginatorElement.disabled = true;

      expect(harness.paginatorElement.disabled).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(harness.pageSizeSelect.disabled).to.be.true;
      expect(harness.firstButton?.disabled).to.be.true;
      expect(harness.previousButton.disabled).to.be.true;
      expect(harness.nextButton.disabled).to.be.true;
      expect(harness.lastButton?.disabled).to.be.true;
    });

    it('should set disabled via attribute dynamically', async () => {
      const harness = await createFixture({ firstLast: true });

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED, '');

      expect(harness.paginatorElement.disabled).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(harness.pageSizeSelect.disabled).to.be.true;
      expect(harness.firstButton?.disabled).to.be.true;
      expect(harness.previousButton.disabled).to.be.true;
      expect(harness.nextButton.disabled).to.be.true;
      expect(harness.lastButton?.disabled).to.be.true;
    });
  });

  describe('alternative', () => {
    it('should set alternative via attribute', async () => {
      const harness = await createFixture({ alternative: true });

      expect(harness.paginatorElement.alternative).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).to.be.true;
    });

    it('should set alternative via property dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.alternative = true;

      expect(harness.paginatorElement.alternative).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).to.be.true;
    });

    it('should set alternative via attribute dynamically', async () => {
      const harness = await createFixture();

      harness.paginatorElement.setAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE, '');

      expect(harness.paginatorElement.alternative).to.be.true;
      expect(harness.paginatorElement.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).to.be.true;
    });

    it('should reflect alternative in range label', async () => {
      const harness = await createFixture({ total: 100, alternative: true });

      expect(harness.alternativeRangeLabelText).to.equal('1-25 of 100');

      harness.paginatorElement.pageIndex = 1;

      expect(harness.alternativeRangeLabelText).to.equal('26-50 of 100');
    });
  });

  describe('rangeLabelCallback', () => {
    it('should set range label via callback property', async () => {
      const harness = await createFixture();

      const cb = (): string => 'Test';
      harness.paginatorElement.rangeLabelCallback = cb;

      expect(harness.paginatorElement.rangeLabelCallback).to.equal(cb);
      expect(harness.rangeLabelText).to.equal('Test');
    });

    it('should set alternative range label via callback property', async () => {
      const harness = await createFixture({ alternative: true });

      harness.paginatorElement.rangeLabelCallback = () => 'Test';

      expect(harness.alternativeRangeLabelText).to.equal('Test');
    });
  });

  describe('page buttons', () => {
    it('should not show first and last buttons by default', async () => {
      const harness = await createFixture();

      expect(harness.firstButton).not.to.be.ok;
      expect(harness.lastButton).not.to.be.ok;
    });

    it('should show first and last buttons when firstLast is true', async () => {
      const harness = await createFixture({ firstLast: true });

      expect(harness.firstButton).to.be.ok;
      expect(harness.lastButton).to.be.ok;
    });

    it('should show first button when first is true', async () => {
      const harness = await createFixture({ first: true });

      expect(harness.firstButton).to.be.ok;
      expect(harness.lastButton).not.to.be.ok;
    });

    it('should update pageIndex when clicking first button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });

      harness.firstButton?.click();

      expect(harness.paginatorElement.pageIndex).to.equal(0);
      expect(harness.rangeLabelText).to.equal('1-25 of 100');
    });

    it('should update pageIndex when clicking previous button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });

      harness.previousButton.click();

      expect(harness.paginatorElement.pageIndex).to.equal(0);
      expect(harness.rangeLabelText).to.equal('1-25 of 100');
    });

    it('should update pageIndex when clicking next button', async () => {
      const harness = await createFixture({ total: 100 });

      harness.nextButton.click();

      expect(harness.paginatorElement.pageIndex).to.equal(1);
      expect(harness.rangeLabelText).to.equal('26-50 of 100');
    });

    it('should update pageIndex when clicking last button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });

      harness.lastButton?.click();

      expect(harness.paginatorElement.pageIndex).to.equal(3);
      expect(harness.rangeLabelText).to.equal('76-100 of 100');
    });

    it('should dispatch change event when clicking next page button', async () => {
      const harness = await createFixture({ total: 100 });
      const changeSpy = sinon.spy();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.nextButton.click();

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy).to.have.been.calledWithMatch(
        sinon.match.has('detail', {
          type: 'next-page',
          pageIndex: 1,
          pageSize: 25,
          offset: 25
        } as IPaginatorChangeEventData)
      );
    });

    it('should dispatch change event when clicking previous page button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1 });
      const changeSpy = sinon.spy();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.previousButton.click();

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy).to.have.been.calledWithMatch(
        sinon.match.has('detail', {
          type: 'previous-page',
          pageIndex: 0,
          pageSize: 25,
          offset: 0
        } as IPaginatorChangeEventData)
      );
    });

    it('should dispatch change event when clicking first page button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });
      const changeSpy = sinon.spy();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.firstButton?.click();

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy).to.have.been.calledWithMatch(
        sinon.match.has('detail', {
          type: 'first-page',
          pageIndex: 0,
          pageSize: 25,
          offset: 0
        } as IPaginatorChangeEventData)
      );
    });

    it('should dispatch change event when clicking last page button', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 1, firstLast: true });
      const changeSpy = sinon.spy();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.lastButton?.click();

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy).to.have.been.calledWithMatch(
        sinon.match.has('detail', {
          type: 'last-page',
          pageIndex: 3,
          pageSize: 25,
          offset: 75
        } as IPaginatorChangeEventData)
      );
    });

    it('should dispatch change event when changing page size select', async () => {
      const harness = await createFixture({ total: 100 });
      const changeSpy = sinon.spy();
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.pageSizeSelect.value = '50';
      harness.pageSizeSelect.dispatchEvent(new CustomEvent('change', { detail: '50' }));

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy).to.have.been.calledWithMatch(
        sinon.match.has('detail', {
          type: 'page-size',
          pageIndex: 0,
          pageSize: 50,
          offset: 0
        } as IPaginatorChangeEventData)
      );
    });

    it('should not update pageSize when cancelling change event', async () => {
      const harness = await createFixture({ total: 100 });
      const changeSpy = sinon.spy(evt => evt.preventDefault());
      harness.paginatorElement.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, changeSpy);

      harness.pageSizeSelect.value = '50';
      harness.pageSizeSelect.dispatchEvent(new CustomEvent('change', { detail: '50' }));

      expect(harness.paginatorElement.pageSize).to.equal(25);
    });

    it('should disable first button when on first page', async () => {
      const harness = await createFixture({ total: 100, firstLast: true });

      expect(harness.firstButton?.disabled).to.be.true;
    });

    it('should disable previous button when on first page', async () => {
      const harness = await createFixture({ total: 100 });

      expect(harness.previousButton.disabled).to.be.true;
    });

    it('should disable next button when on last page', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 3 });

      expect(harness.nextButton.disabled).to.be.true;
    });

    it('should disable last button when on last page', async () => {
      const harness = await createFixture({ total: 100, pageIndex: 3, firstLast: true });

      expect(harness.lastButton?.disabled).to.be.true;
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
  const el = await fixture<IPaginatorComponent>(html`
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

  return new PaginatorHarness(el);
}
