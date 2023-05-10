import { ILinearProgressComponent, LinearProgressComponent, LINEAR_PROGRESS_CONSTANTS, defineLinearProgressComponent } from '@tylertech/forge/linear-progress';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestLinearProgressContext
}

interface ITestLinearProgressContext {
  component: ILinearProgressComponent;
  getRootElement(): HTMLElement;
  getPrimaryBar(): HTMLElement;
  getBufferBar(): HTMLElement;
  append(): void;
  destroy(): void;
}

describe('LinearProgressComponent', function(this:ITestContext) {
  beforeAll(function(this:ITestContext) {
    defineLinearProgressComponent();
  });

  afterEach(function(this:ITestContext) {
    this.context.destroy();
  });

  it('should be connected', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should be instantiated', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component instanceof LinearProgressComponent).toBe(true);
  });

  it('should be indeterminate by default', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.determinate).toBe(false);
  });

  it('should have correct role', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.getRootElement().getAttribute('role')).toBe('progressbar');
  });

  it('should have correct MDC classes', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress')).toBe(true);
  });

  it('should be open by default', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.visible).toBeTrue();
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBe(false);
  });

  it('should have correct progress by default', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.progress).toBe(0);
    expect(this.context.getPrimaryBar().style.transform).toBe('scaleX(1)');
  });

  it('should have correct buffer by default', function(this:ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.buffer).toBe(1);
    expect(this.context.getBufferBar().style.flexBasis).toBe('100%');
  });

  it('should close', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.close();
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBe(true);
  });

  it('should close and reopen', async function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.close();
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBe(true);
    await tick();
    this.context.component.open();
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBe(false);
  });

  it('should set mode to indeterminate', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.determinate = false;
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--indeterminate')).toBe(true);
  });

  it('should set progress', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.determinate = true;
    this.context.component.progress = 0.5;
    expect(this.context.getPrimaryBar().style.transform).toBe('scaleX(0.5)');
  });

  it('should set buffer', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.determinate = true;
    this.context.component.buffer = 0.75;
    expect(this.context.getBufferBar().style.flexBasis).toBe('75%');
  });

  it('should not set progress if indetermined', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.progress = 0.5;
    expect(this.context.getPrimaryBar().style.transform).toBe('scaleX(1)');
  });

  it('should not set buffer if indeterminate', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.buffer = 0.75;
    expect(this.context.getBufferBar().style.flexBasis).toBe('100%');
  });

  it('should set closed via visible property', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.visible = false;
    expect(this.context.component.visible).toBe(false);
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBeTrue();
  });

  it('should set closed via visible attribute', function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.VISIBLE, 'false');
    expect(this.context.component.visible).toBe(false);
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBeTrue();
  });

  it('should set closed via visible property', async function(this:ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.visible = false;
    await tick();
    this.context.component.visible = true;
    
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBeFalse();
  });

  it('should set closed by default', async function(this:ITestContext) {
    this.context = setupTestContext();   
    await tick();
    this.context.component.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.VISIBLE, 'false');
    this.context.append();
    await tick();
    
    expect(this.context.getRootElement().classList.contains('mdc-linear-progress--closed')).toBeTrue();
  });

  function setupTestContext(append = false): ITestLinearProgressContext {
    const fixture = document.createElement('div');
    fixture.id = 'linear-progress-test-fixture';
    const component = document.createElement(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;
    fixture.appendChild(component);
    if (append) document.body.appendChild(fixture);
    return {
      component,
      getRootElement: () => getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT),
      getPrimaryBar: () => getShadowElement(component, '.mdc-linear-progress__primary-bar'),
      getBufferBar: () => getShadowElement(component, '.mdc-linear-progress__buffer-bar'),      
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }  
});
