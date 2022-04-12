import { removeElement } from '@tylertech/forge-core';
import { dispatchNativeEvent, tick, timer } from '@tylertech/forge-testing';
import { ITooltipComponent, TOOLTIP_CONSTANTS, defineTooltipComponent } from '@tylertech/forge/tooltip';
import { mockPlatform } from '../../utils';

interface ITestContext {
  context: ITooltipTestContext;
  uninstallMockPlatform?: () => void;
}

interface ITooltipTestContext {
  component: ITooltipComponent;
  targetElement: HTMLElement;
  open(): Promise<HTMLElement>;
  getTooltipElement(): HTMLElement;
  attach(): void;
  appendTarget(): void;
  destroy(): void;
}

describe('TooltipComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineTooltipComponent();
  });

  describe('on desktop', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should show tooltip when mouse over with no delay', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.component.text = 'Tooltip text';
      this.context.component.delay = 0;
      this.context.attach();
      await tick();

      await this.context.open();
      const tooltipElement = await this.context.open();

      expect(this.context.component.delay).toBe(0);
      expect(tooltipElement).not.toBeNull();
      expect(tooltipElement.textContent).toBe(this.context.component.text);
    });

    it('should show tooltip when mouse over with delay', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.component.text = 'Tooltip text';
      this.context.attach();

      await tick();
      dispatchNativeEvent(this.context.targetElement, 'mouseover');
      await timer(TOOLTIP_CONSTANTS.numbers.DEFAULT_DELAY);

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).not.toBeNull();
      expect(tooltipElement.textContent).toBe(this.context.component.text);
    });

    it('should not show a tooltip if the tooltip component has been removed', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.component.text = 'Tooltip text';
      this.context.attach();

      await tick();
      dispatchNativeEvent(this.context.targetElement, 'mouseover');
      
      this.context.component.remove();
      await timer(TOOLTIP_CONSTANTS.numbers.DEFAULT_DELAY);

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
    });

    it('should remove tooltip when mouse out', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.component.text = 'Tooltip text';
      this.context.component.delay = 0;
      this.context.attach();

      await tick();
      dispatchNativeEvent(this.context.targetElement, 'mouseover');
      
      let tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).not.toBeNull();
      
      dispatchNativeEvent(this.context.targetElement, 'mouseout');
      await tick();

      tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
    });

    it('should show custom content in tooltip', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.component.builder = () => {
        const div = document.createElement('div');
        const text = document.createTextNode('using builder function');
        div.appendChild(text);
        return div;
      };
      this.context.component.delay = 0;
      this.context.attach();

      await tick();
      dispatchNativeEvent(this.context.targetElement, 'mouseover');
      
      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).not.toBeNull();
      expect(tooltipElement.children.length).toBe(1);
      expect(tooltipElement.children[0].tagName.toLowerCase()).toBe('div');
      expect(tooltipElement.children[0].textContent).toBe('using builder function');
    });

    it('should show tooltip when using target selector', async function(this: ITestContext) {
      this.context = setupTextContext(false);
      this.context.targetElement.id = 'some-element-id';
      this.context.appendTarget();
      await tick();
      
      const targetSelector = '#some-element-id';
      this.context.component.target = targetSelector;
      this.context.component.delay = 0;
      this.context.attach();
      await tick();

      const tooltipElement = await this.context.open();
      await tick();
      await timer();
      
      expect(this.context.component.target).toBe(targetSelector);
      expect(tooltipElement).toBeTruthy();
      expect(tooltipElement.textContent).toBe(this.context.component.text);
    });

    it('should throw when unable to find target element', async function(this: ITestContext) {
      this.context = setupTextContext(false);
      this.context.component.text = 'Tooltip text with target';
      this.context.component.target = '#some-random-id';
      this.context.component.delay = 0;
      document.body.appendChild(this.context.component);
      const onerror = spyOn<any>(window, 'onerror');

      await tick();

      expect(onerror).toHaveBeenCalled();
    });

    it('should hide tooltip manually', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await this.context.open();
      await timer(TOOLTIP_CONSTANTS.numbers.DEFAULT_DELAY);
      this.context.component.hide();

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
    });

    it('should retrieve open state', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();

      expect(this.context.component.open).toBeFalse();
      await this.context.open();

      expect(this.context.component.open).toBeTrue();
    });

    it('should set position to bottom', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      this.context.component.position = 'bottom';
      await this.context.open();

      const tooltipElement = this.context.getTooltipElement();
      expect(this.context.component.position).toBe('bottom');
      expect(tooltipElement.classList.contains(TOOLTIP_CONSTANTS.classes.TOOLTIP_BOTTOM));
    });

    it('should set position to top', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      this.context.component.position = 'top';
      await this.context.open();

      const tooltipElement = this.context.getTooltipElement();
      expect(this.context.component.position).toBe('top');
      expect(tooltipElement.classList.contains(TOOLTIP_CONSTANTS.classes.TOOLTIP_TOP));
    });

    it('should set position to left', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      this.context.component.position = 'left';
      await this.context.open();

      const tooltipElement = this.context.getTooltipElement();
      expect(this.context.component.position).toBe('left');
      expect(tooltipElement.classList.contains(TOOLTIP_CONSTANTS.classes.TOOLTIP_LEFT));
    });

    it('should hide tooltip when clicking target element', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await this.context.open();

      this.context.targetElement.click();

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
      expect(this.context.component.open).toBe(false);
    });

    it('should hide tooltip when mousedown event dispatches on target element', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await this.context.open();

      dispatchNativeEvent(this.context.targetElement, 'mousedown');

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
      expect(this.context.component.open).toBe(false);
    });

    it('should hide tooltip when dragstart event dispatches on target element', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await this.context.open();

      dispatchNativeEvent(this.context.targetElement, 'dragstart');

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
      expect(this.context.component.open).toBe(false);
    });

    it('should hide tooltip when scrolling window', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await this.context.open();

      window.dispatchEvent(new Event('scroll'));

      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
      expect(this.context.component.open).toBe(false);
    });
  });

  describe('on mobile', function(this: ITestContext) {
    beforeEach(function(this: ITestContext) {
      this.uninstallMockPlatform = mockPlatform('isMobile', true);
    });

    afterEach(function(this: ITestContext) {
      this.context.destroy();
      if (typeof this.uninstallMockPlatform === 'function') {
        this.uninstallMockPlatform();
      }
    });

    it('should open tooltip via touch events', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await tick();
  
      this.context.targetElement.dispatchEvent(new TouchEvent('touchstart'));
      await timer(TOOLTIP_CONSTANTS.numbers.LONGPRESS_THRESHOLD);
      this.context.targetElement.dispatchEvent(new TouchEvent('touchend'));
  
      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).not.toBeNull();
      expect(this.context.component.open).toBeTrue();
    });

    it('should not show tooltip if removed before threshold', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await tick();
  
      this.context.targetElement.dispatchEvent(new TouchEvent('touchstart'));
      await timer(TOOLTIP_CONSTANTS.numbers.LONGPRESS_THRESHOLD / 2);
  
      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
    });

    it('should not show tooltip if touchend is triggered before threshold', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await tick();
  
      this.context.targetElement.dispatchEvent(new TouchEvent('touchstart'));
      await timer(TOOLTIP_CONSTANTS.numbers.LONGPRESS_THRESHOLD / 2);
      this.context.targetElement.dispatchEvent(new TouchEvent('touchend'));
  
      const tooltipElement = this.context.getTooltipElement();
      expect(tooltipElement).toBeNull();
    });

    it('should remove tooltip after visibility duration', async function(this: ITestContext) {
      this.context = setupTextContext();
      this.context.attach();
      await tick();
      
      this.context.targetElement.dispatchEvent(new TouchEvent('touchstart'));
      await timer(TOOLTIP_CONSTANTS.numbers.LONGPRESS_THRESHOLD);
      
      expect(this.context.getTooltipElement()).toBeTruthy();

      await timer(TOOLTIP_CONSTANTS.numbers.LONGPRESS_VISIBILITY_DURATION);
      
      expect(this.context.getTooltipElement()).toBeFalsy();
    });
  });

  function setupTextContext(appendTarget = true): ITooltipTestContext {
    const targetElement = document.createElement('button');
    const component = document.createElement('forge-tooltip');

    if (appendTarget) {
      document.body.appendChild(targetElement);
    }

    return {
      component,
      targetElement,
      open: async () => {
        await tick();
        targetElement.focus();
        dispatchNativeEvent(targetElement, 'mouseover');
        await timer(TOOLTIP_CONSTANTS.numbers.DEFAULT_DELAY);
        return component.tooltipElement as HTMLElement;
      },
      getTooltipElement: () => component.tooltipElement as HTMLElement,
      attach: () => {
        component.text = 'Tooltip text';
        targetElement.appendChild(component);
      },
      appendTarget: () => document.body.appendChild(targetElement),
      destroy: () => {
        removeElement(targetElement);
        removeElement(component);
        
        const tooltips = document.querySelectorAll(TOOLTIP_CONSTANTS.elementName);
        if (tooltips.length) {
          tooltips.forEach((tooltip: HTMLElement) => removeElement(tooltip));
        }
      }
    };
  }
});
