import { fixture, expect } from '@open-wc/testing';
import type { IScaffoldComponent } from './scaffold.js';
import { SCAFFOLD_CONSTANTS } from './scaffold-constants.js';

import './scaffold.js';

describe('Scaffold', () => {
  it('should create shadow root', async () => {
    const el = await fixture<IScaffoldComponent>('<forge-scaffold></forge-scaffold>');

    expect(el.shadowRoot).to.be.ok;
  });

  it('should reflect viewport attribute when set via property', async () => {
    const el = await fixture<IScaffoldComponent>('<forge-scaffold></forge-scaffold>');

    el.viewport = true;

    expect(el.viewport).to.be.true;
    expect(el.hasAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT)).to.be.true;
  });

  it('should reflect viewport property when set via attribute', async () => {
    const el = await fixture<IScaffoldComponent>('<forge-scaffold viewport></forge-scaffold>');

    expect(el.viewport).to.be.true;
    expect(el.hasAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT)).to.be.true;
  });
});
