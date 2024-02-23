import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';

import './stack'
import { IStackComponent } from './stack';
import { STACK_CONSTANTS } from './stack-constants';

describe('Stack', () => {
  it('should initialize', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    await expect(el).to.be.accessible();
  });

  it('should update the inline attribute when the property is set ', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.inline = true;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.INLINE)).to.be.true;
  });

  it('should update the wrap attribute when the property is set ', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.wrap = true;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.WRAP)).to.be.true;
  });

  it('should update the stretch attribute when the property is set ', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.stretch = true;
    expect(el.hasAttribute(STACK_CONSTANTS.attributes.STRETCH)).to.be.true;
  });

  it('should update the gap attribute when the property is set ', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.gap = '32';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).to.equal('32');
  });

  it('should update the alignment attribute when the property is set ', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.alignment = 'center';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.ALIGNMENT)).to.equal('center');
  });

  it('should update the justify attribute when the property is set ', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.justify = 'center';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.JUSTIFY)).to.equal('center');
  });

  it('should change the inline property when set via attribute', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.setAttribute(STACK_CONSTANTS.attributes.INLINE, 'true');
    expect(el.inline).to.be.true;  
  });

  it('should change the wrap property when set via attribute', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.setAttribute(STACK_CONSTANTS.attributes.WRAP, 'true');
    expect(el.wrap).to.be.true;    
  });

  it('should change the stretch property when set via attribute', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.setAttribute(STACK_CONSTANTS.attributes.STRETCH, 'true');
    expect(el.stretch).to.be.true;    
  });

  it('should change the gap property when set via attribute', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.setAttribute(STACK_CONSTANTS.attributes.GAP, '100');
    expect(el.gap).to.equal('100');   
  });

  it('should change the alignment property when set via attribute', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.setAttribute(STACK_CONSTANTS.attributes.ALIGNMENT, 'end');
    expect(el.alignment).to.equal('end');   
  });

  it('should change the justify property when set via attribute', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.setAttribute(STACK_CONSTANTS.attributes.JUSTIFY, 'end');
    expect(el.justify).to.equal('end');   
  });

  it('should set the gap property to the value provided verbatim', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    el.gap = '100';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).to.equal('100');
    expect(getRootEl(el).style.gap).to.equal('var(--forge-stack-gap, 100px)');

    el.gap = '100px';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).to.equal('100px');
    expect(getRootEl(el).style.gap).to.equal('var(--forge-stack-gap, 100px)');

    el.gap = '2rem';
    expect(el.getAttribute(STACK_CONSTANTS.attributes.GAP)).to.equal('2rem');
    expect(getRootEl(el).style.gap).to.equal('var(--forge-stack-gap, 2rem)');
  });

  it('should set default values when no attributes are applied', async () => {
    const el = await fixture<IStackComponent>(html`<forge-stack></forge-stack>`);
    expect(el.inline).to.be.false;
    expect(el.wrap).to.be.false; 
    expect(el.stretch).to.be.false; 
    expect(el.gap).to.equal('16');  
    expect(el.alignment).to.equal('start');  
    expect(el.justify).to.equal('start');   
  });

  function getRootEl(el: IStackComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }
});