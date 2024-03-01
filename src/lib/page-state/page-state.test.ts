import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IPageStateComponent, PageStateComponent } from './page-state';
import { PAGE_STATE_CONSTANTS } from './page-state-constants';
import './page-state';

interface ITestContext {
  context: ITestPageStateContext
}

interface ITestPageStateContext {
  component: PageStateComponent;
  destroy(): void;
}

describe('PageStateComponent', () => {
  const { elementName: pageState } = PAGE_STATE_CONSTANTS;

  it('should instantiate component instance', async () => {
    const el = await fixture<IPageStateComponent>(html`<${pageState}></${pageState}>`);

    expect(el).not.to.be.accessible();
  });
});
