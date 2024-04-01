import { expect, fixture, html } from '@open-wc/testing';
import { ILabelValueComponent } from './label-value';

import './label-value';

describe('Label Value', () => {
  it('should use shadow DOM', async () => {
    const el = await createFixture();

    expect(el.shadowRoot).to.not.be.null;
  });
});

function createFixture(): Promise<ILabelValueComponent> {
  return fixture<ILabelValueComponent>(html`
    <forge-label-value></forge-label-value>
  `);  
}
