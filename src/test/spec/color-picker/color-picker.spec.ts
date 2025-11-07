import { getShadowElement, removeElement, getActiveElement } from '@tylertech/forge-core';
import { task, frame } from '@tylertech/forge/core/utils/utils';
import { COLOR_PICKER_CONSTANTS, DEFAULT_COLOR, defineColorPickerComponent, IColorPickerComponent, IHSVA, IRGBA, IColorPickerChangeEventData } from '@tylertech/forge';
import { formatHex, rgbaToHex, rgbaToHsva } from '@tylertech/forge/color-picker/color-picker-utils';

const DEFAULT_RGBA = { r: 0, g: 0, b: 0, a: 1 };
const DEFAULT_HEX = '#000000';
const DEFAULT_HSVA = { h: 0, s: 0, v: 0, a: 1 };
const WHITE_AS_HSVA = { h: 0, s: 0, v: 100, a: 1 };
const WHITE_AS_RGBA = { r: 255, g: 255, b: 255, a: 1 };
const WHITE_AS_HEX = '#ffffff';

interface ITestContext {
  context: ITestColorPickerContext;
}

interface ITestColorPickerContext {
  component: IColorPickerComponent;
  destroy(): void;
}

describe('ColorPickerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineColorPickerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('by default', function(this: ITestContext) {
    it('should have shadow root', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.shadowRoot).not.toBe(null, 'Component should have shadow root attached');
    });

    it('should have default value', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.value).toBe(`#${DEFAULT_COLOR}`, 'The default color is not correct');
    });

    it('should have default rgba ', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.rgba).toEqual(DEFAULT_RGBA, 'The default rgba is not correct');
    });

    it('should have default hsva', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.hsva).toEqual(DEFAULT_HSVA, 'The default hsva is not correct');
    });

    it('should have default opacity', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.opacity).toEqual(1, 'The default opacity is not correct');
    });

    it('should have default allow opacity', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.allowOpacity).toBe(true, 'The default allowOpacity is not correct');
    });
  });

  describe('properties', function(this: ITestContext) {
    describe('value', function(this: ITestContext) {
      it(`when value is set should apply the correct rgba and hsva`, function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, WHITE_AS_HEX);

        expect(this.context.component.rgba).toEqual(WHITE_AS_RGBA, `The rgba value was not set to white`);
        expect(this.context.component.hsva).toEqual(WHITE_AS_HSVA, `The hsva value was not set to white`);
      });

      it(`when value is set with short hex it should apply the correct rgba and hsva`, function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, '#ffff');

        expect(this.context.component.rgba).toEqual(WHITE_AS_RGBA, `The rgba value was not set to white`);
        expect(this.context.component.hsva).toEqual(WHITE_AS_HSVA, `The hsva value was not set to white`);
      });

      it(`when value is set with shorterhex it should apply the correct rgba and hsva`, function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, '#fff');

        expect(this.context.component.rgba).toEqual(WHITE_AS_RGBA, `The rgba value was not set to white`);
        expect(this.context.component.hsva).toEqual(WHITE_AS_HSVA, `The hsva value was not set to white`);
      });

      it(`when value has the wrong type, should throw error`, function(this: ITestContext) {
        this.context = setupTestContext();
        
        const action = () => {
          this.context.component.value = 1 as any;
        };

        expect(action).toThrowError('Invalid hex value provided.');
      });

      it(`when value is set to invalid hex it should throw an error`, function(this: ITestContext) {
        this.context = setupTestContext();
        
        const action = () => {
          this.context.component.value = '#fa3gt43sh';
        };

        expect(action).toThrowError('Invalid hex value provided.');
      });

      it(`when value is set to null rgba and hsva should reset`, function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.value = null;

        expect(this.context.component.rgba).toEqual(DEFAULT_RGBA, `The rgba value was not reset`);
        expect(this.context.component.hsva).toEqual(DEFAULT_HSVA, `The hsva value was not reset`);
      });

      it(`when value is set with all possible paths`, function(this: ITestContext) {
        this.context = setupTestContext();
        
        const action = () =>
          allPossibleHexValuesForRgbaToHsva(color => {
            this.context.component.value = color;
            this.context.component.allowOpacity = true;
            this.context.component.opacity = 1;
          });

        expect(action).not.toThrow();
      });
    });

    describe('rgba', function(this: ITestContext) {
      it(`when rgba is set should update value and hsva`, function(this: ITestContext) {
        this.context = setupTestContext();
        const color = { r: 255, g: 200, b: 150, a: 1 } as IRGBA;
        const hsva = rgbaToHsva(color);
        const hex = formatHex(rgbaToHex(color), false);
        this.context.component.rgba = color;

        expect(this.context.component.rgba).toEqual(color, `The rgba value was not set to white`);
        expect(this.context.component.hsva).toEqual(hsva, `The hsva value was not set to white`);
        expect(this.context.component.value).toEqual(hex, `The hsva value was not set to white`);
      });

      it(`when rgba is set to null should update value and hsva`, function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.rgba = null as IRGBA | null;

        expect(this.context.component.rgba).toEqual(DEFAULT_RGBA, `The rgba value was not reset to the default`);
        expect(this.context.component.hsva).toEqual(DEFAULT_HSVA, `The hsva value was not set reset to the default`);
        expect(this.context.component.value).toEqual(DEFAULT_HEX, `The hsva value was not set reset to the default`);
      });
    });

    describe('hsva', function(this: ITestContext) {
      it('when set to white should update rgba and value', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.hsva = WHITE_AS_HSVA;

        expect(this.context.component.rgba).toEqual(WHITE_AS_RGBA, `The rgba value was not set to white`);
        expect(this.context.component.hsva).toEqual(WHITE_AS_HSVA, `The hsva value was not set to white`);
        expect(this.context.component.value).toEqual(WHITE_AS_HEX, `The hex value was not set to white`);
      });

      it('when set to white should update rgba and value', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.hsva = null as IHSVA | null;

        expect(this.context.component.rgba).toEqual(DEFAULT_RGBA, `The rgba value was not set to white`);
        expect(this.context.component.hsva).toEqual(DEFAULT_HSVA, `The hsva value was not set to white`);
        expect(this.context.component.value).toEqual(DEFAULT_HEX, `The hex value was not set to white`);
      });
    });

    describe('opacity', function(this: ITestContext) {
      it('when set higher than 1 the console warns', function(this: ITestContext) {
        this.context = setupTestContext();
        spyOn(console, 'warn');
        this.context.component.opacity = 500;

        expect(console.warn).toHaveBeenCalled();
      });

      it('when set to 0.5 ', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.value = '#fef';
        this.context.component.allowOpacity = true;
        this.context.component.opacity = 0.5;

        expect(this.context.component.hsva!.a).toEqual(0.5);
      });

      it('when set to all possible hsva paths ', function(this: ITestContext) {
        this.context = setupTestContext();
        allPossiblePathsForhsvaToRgba(color => {
          this.context.component.hsva = color;
          this.context.component.allowOpacity = true;
          this.context.component.opacity = 0.5;

          expect(this.context.component.hsva.a).toEqual(0.5);
        });
      });
    });

    describe('allowOpacity', function(this: ITestContext) {
      it('when set should set color opacity to 1', function(this: ITestContext) {
        this.context = setupTestContext();
        const hsva = { ...DEFAULT_HSVA };
        hsva.a = 0.5;
        this.context.component.hsva = hsva;
        this.context.component.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');
        expect(this.context.component.hsva!.a).toEqual(1);
      });

      it('when added then removed should have no negative effect', function(this: ITestContext) {
        this.context = setupTestContext();
        const hsva = { ...DEFAULT_HSVA };
        hsva.a = 0.5;
        this.context.component.hsva = hsva;
        this.context.component.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');
        this.context.component.removeAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY);
        this.context.component.hsva = hsva;
        this.context.component.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');

        expect(this.context.component.hsva!.a).toEqual(1);
      });
    });
  });

  describe('events', function(this: ITestContext) {
    it('when hex input has changed with an invalid input should not trigger change event', function(this: ITestContext) {
      this.context = setupTestContext();
      const inputSpy = jasmine.createSpy('input');
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      getHexInputElement(this.context.component).value = '54';
      getHexInputElement(this.context.component).dispatchEvent(new Event('input'));
      expect(inputSpy).not.toHaveBeenCalled();
      this.context.component.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when hex input has changed with an invalid input it should trigger the change event', function(this: ITestContext) {
      this.context = setupTestContext();
      const inputSpy = jasmine.createSpy('change');
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
      getHexInputElement(this.context.component).value = '#fff';
      getHexInputElement(this.context.component).dispatchEvent(new Event('input'));
      expect(inputSpy).toHaveBeenCalled();
      this.context.component.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when rgba input has changed the input should trigger the change event', function(this: ITestContext) {
      this.context = setupTestContext();
      const inputSpy = jasmine.createSpy('change');
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      getRgbaInputAElement(this.context.component).value = '1';
      getRgbaInputBElement(this.context.component).value = '100';
      getRgbaInputGElement(this.context.component).value = '100';
      getRgbaInputRElement(this.context.component).value = '100';

      getRgbaInputAElement(this.context.component).dispatchEvent(new Event('input'));
      getRgbaInputBElement(this.context.component).dispatchEvent(new Event('input'));
      getRgbaInputGElement(this.context.component).dispatchEvent(new Event('input'));
      getRgbaInputRElement(this.context.component).dispatchEvent(new Event('input'));

      expect(inputSpy).toHaveBeenCalledTimes(4);
      this.context.component.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when rgba input has changed with an invalid input it should not trigger the change event', function(this: ITestContext) {
      this.context = setupTestContext();
      const inputSpy = jasmine.createSpy('change');
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      getRgbaInputAElement(this.context.component).value = 'd';
      getRgbaInputBElement(this.context.component).value = 'asd';
      getRgbaInputGElement(this.context.component).value = '10d0';
      getRgbaInputRElement(this.context.component).value = '10asd0';

      getRgbaInputAElement(this.context.component).dispatchEvent(new Event('input'));
      getRgbaInputBElement(this.context.component).dispatchEvent(new Event('input'));
      getRgbaInputGElement(this.context.component).dispatchEvent(new Event('input'));
      getRgbaInputRElement(this.context.component).dispatchEvent(new Event('input'));

      expect(inputSpy).toHaveBeenCalledTimes(0);
      this.context.component.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when hsva input has changed the input should trigger the change event', function(this: ITestContext) {
      this.context = setupTestContext();
      const inputSpy = jasmine.createSpy('change');
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      getHsvaInputAElement(this.context.component).value = DEFAULT_HSVA.a.toString();
      getHsvaInputHElement(this.context.component).value = DEFAULT_HSVA.h.toString();
      getHsvaInputSElement(this.context.component).value = DEFAULT_HSVA.s.toString();
      getHsvaInputVElement(this.context.component).value = DEFAULT_HSVA.v.toString();

      getHsvaInputAElement(this.context.component).dispatchEvent(new Event('input'));
      getHsvaInputHElement(this.context.component).dispatchEvent(new Event('input'));
      getHsvaInputSElement(this.context.component).dispatchEvent(new Event('input'));
      getHsvaInputVElement(this.context.component).dispatchEvent(new Event('input'));

      expect(inputSpy).toHaveBeenCalledTimes(4);
      this.context.component.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when hsva input has changed the input should not trigger the change event', function(this: ITestContext) {
      this.context = setupTestContext();
      const inputSpy = jasmine.createSpy('change');
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      getHsvaInputAElement(this.context.component).value = 'asdasdasd';
      getHsvaInputHElement(this.context.component).value = '-5';
      getHsvaInputSElement(this.context.component).value = ' defaultHsva.s.toString();';
      getHsvaInputVElement(this.context.component).value = 'ddasd';

      getHsvaInputAElement(this.context.component).dispatchEvent(new Event('input'));
      getHsvaInputHElement(this.context.component).dispatchEvent(new Event('input'));
      getHsvaInputSElement(this.context.component).dispatchEvent(new Event('input'));
      getHsvaInputVElement(this.context.component).dispatchEvent(new Event('input'));

      expect(inputSpy).toHaveBeenCalledTimes(0);
      this.context.component.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when type clicked once it should change to rgba', function(this: ITestContext) {
      this.context = setupTestContext();
      getTypeButtonElement(this.context.component).click();

      expect(getActiveElement()).toBe(getRgbaInputRElement(this.context.component));
    });

    it('when type clicked twice it should change to hsva', function(this: ITestContext) {
      this.context = setupTestContext();
      getTypeButtonElement(this.context.component).click();
      getTypeButtonElement(this.context.component).click();

      expect(getActiveElement()).toBe(getHsvaInputHElement(this.context.component));
    });

    it('when type clicked thrice it should change to hex', function(this: ITestContext) {
      this.context = setupTestContext();
      getTypeButtonElement(this.context.component).click();
      getTypeButtonElement(this.context.component).click();
      getTypeButtonElement(this.context.component).click();

      expect(getActiveElement()).toBe(getHexInputElement(this.context.component));
    });

    it('when gradient slider changes it should update the value', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 360, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 360, clientY: 0 }));
      await frame();

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 160, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 160, clientY: 0 }));
      await frame();

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 555, clientY: 300 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 555, clientY: 300 }));
      await frame();

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));
      await frame();

      expect(this.context.component.value).toBe('#ff0000');
    });

    it('when hue slider changes it should update the value', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();

      getHueSliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 1000, pageY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 1000 }));
      await frame();

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 10000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 10000, clientY: 0 }));

      await frame();

      expect(this.context.component.value).toBe('#ff00ff');
    });

    it('when opacity slider changes it should update the color preview', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();

      getOpacitySliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 1000, pageY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 1000 }));
      await frame();

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 10000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 10000, clientY: 0 }));

      await frame();

      expect(this.context.component.value).toBe('#ff0000');
    });

    it('should debounce multiple attempts to dispatch the change event', async function(this: ITestContext) {
      this.context = setupTestContext();
      const changeEventSpy = jasmine.createSpy('change event spy').and.callFake(() => {});
      this.context.component.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);
      this.context.component.debounceChangeEvent = true;

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 360, clientY: 0 }));
      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousemove', { clientX: 361, clientY: 0 }));
      await task(COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD / 2);

      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 362, clientY: 0 }));
      getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousemove', { clientX: 363, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 363, clientY: 0 }));
      await frame();
      await task(COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD * 2);

      expect(changeEventSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: jasmine.objectContaining({ type: 'slider', source: 'gradient' }) }));
    });

    describe('gradient keyboard events', function(this: ITestContext) {
      it('when key right gets pressed it should change color', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#fffcfc');
      });

      it('when enter key gets pressed it should do nothing (currently)', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#ffffff');
      });

      it('when key left gets pressed after key right it should go back to white', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#ffffff');
      });

      it('when key down gets pressed it should change color', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#fcfcfc');
      });

      it('when key up gets pressed after down it should change back to white', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 } as Partial<KeyboardEventInit>));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', keyCode: 38 } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#ffffff');
      });

      it('when arrow left is pressed on edge it should stay at white', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#ffffff');
      });

      it('when moved around then back to 0 it should end up to be white', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
        document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

        expect(this.context.component.value).toBe('#ffffff');
      });

      it('when other key pressed it should not affect the color', async function(this: ITestContext) {
        this.context = setupTestContext();
        await frame();

        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        getGradientElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 't' } as Partial<KeyboardEventInit>));

        expect(this.context.component.value).toBe('#ffffff');
      });

      describe('color picker slider keyboard events', function(this: ITestContext) {
        it('when hue slider is moved by key it should change the color', async function(this: ITestContext) {
          this.context = setupTestContext();
          getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          getOpacitySliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keycode: 39 } as Partial<KeyboardEventInit>));

          expect(this.context.component.value).toBe('#ff0d00');
        });

        it('when hue slider on the left edge and left key pressed no change should occur', async function(this: ITestContext) {
          this.context = setupTestContext();
          getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          getOpacitySliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keycode: 37 } as Partial<KeyboardEventInit>));

          expect(this.context.component.value).toBe('#ff0000');
        });

        it('when hue slider is changed by end key it should move to end', async function(this: ITestContext) {
          this.context = setupTestContext();
          getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          getOpacitySliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keycode: 35 } as Partial<KeyboardEventInit>));

          expect(this.context.component.value).toBe('#ff00ff');
        });

        it('when hue slider is changed by home key it should move to start', async function(this: ITestContext) {
          this.context = setupTestContext();
          getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          getOpacitySliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keycode: 35 } as Partial<KeyboardEventInit>));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', keycode: 36 } as Partial<KeyboardEventInit>));

          expect(this.context.component.value).toBe('#ff0000');
        });

        it('when hue slider is moved to the end and arrow right is pressed it should not go further', async function(this: ITestContext) {
          this.context = setupTestContext();
          getGradientElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          getOpacitySliderElement(this.context.component).dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keycode: 35 } as Partial<KeyboardEventInit>));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keycode: 39 } as Partial<KeyboardEventInit>));
          getHueSliderThumbElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keycode: 39 } as Partial<KeyboardEventInit>));

          expect(this.context.component.value).toBe('#ff00ff');
        });
      });
    });
  });

  describe('Color picker utils', function(this: ITestContext) {
    it('rgbaToHasa should not throw error when different rgba values are used', function(this: ITestContext) {
      this.context = setupTestContext();
      const action = () => {
        const color = { r: 255, g: 200, b: 150, a: 1 } as IRGBA;
        const color2 = { r: 200, g: 255, b: 150, a: 1 } as IRGBA;
        const color3 = { r: 150, g: 200, b: 255, a: 1 } as IRGBA;

        rgbaToHsva(color);
        rgbaToHsva(color2);
        rgbaToHsva(color3);
      };

      expect(action).not.toThrow();
    });

    it('hsvaToRgba should not throw error when different rgba values are used', function(this: ITestContext) {
      this.context = setupTestContext();
      const action = () => {
        allPossiblePathsForhsvaToRgba(color => {
          this.context.component.hsva = color;
        });
      };

      expect(action).not.toThrow();
    });
  });

  function setupTestContext(): ITestColorPickerContext {
    const fixture = document.createElement('div');
    fixture.id = 'color-picker-test-fixture';
    const component = document.createElement(COLOR_PICKER_CONSTANTS.elementName) as IColorPickerComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function getGradientElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.GRADIENT);
  }

  function getPreviewColorElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.PREVIEW_COLOR);
  }

  function getHexInputElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.HEX_INPUT) as HTMLInputElement;
  }

  function getRgbaInputRElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_R) as HTMLInputElement;
  }

  function getRgbaInputGElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_G) as HTMLInputElement;
  }

  function getRgbaInputBElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_B) as HTMLInputElement;
  }

  function getRgbaInputAElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_A) as HTMLInputElement;
  }

  function getHsvaInputHElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_H) as HTMLInputElement;
  }

  function getHsvaInputSElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_S) as HTMLInputElement;
  }

  function getHsvaInputVElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_V) as HTMLInputElement;
  }

  function getHsvaInputAElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_A) as HTMLInputElement;
  }

  function getHueSliderElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER);
  }

  function getHueSliderThumbElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER_THUMB);
  }

  function getOpacitySliderElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER);
  }

  function getOpacitySliderThumbElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER_THUMB);
  }

  function getHexValueContainerElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HEX_CONTAINER);
  }

  function getRgbaValueContainerElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_CONTAINER);
  }

  function getHsvaValueContainerElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_CONTAINER);
  }

  function getTypeButtonElement(component: IColorPickerComponent) {
    return getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.TYPE_BUTTON) as HTMLButtonElement;
  }

  function allPossiblePathsForhsvaToRgba(action: (color: IHSVA) => void) {
    const colors: IHSVA[] = [
      { s: 100, a: 1, h: 100, v: 100 },
      { s: 0, a: 1, h: 100, v: 100 },
      { s: 100, a: 1, h: 0, v: 100 },
      { s: 100, a: 1, h: 60, v: 100 },
      { s: 100, a: 1, h: 120, v: 100 },
      { s: 100, a: 1, h: 180, v: 100 },
      { s: 100, a: 1, h: 240, v: 100 },
      { s: 100, a: 1, h: 300, v: 100 },
      { s: 100, a: 1, h: 360, v: 100 }
    ];

    colors.forEach(c => action(c));
  }

  function allPossiblePathsForrgbaToHsva(action: (color: IRGBA) => void) {
    const colors: IRGBA[] = [
      { r: 255, g: 255, b: 255, a: 1 },
      { r: 0, g: 255, b: 255, a: 1 },
      { r: 255, g: 0, b: 255, a: 1 },
      { r: 255, g: 255, b: 0, a: 1 }
    ];

    colors.forEach(c => action(c));
  }

  function allPossibleHexValuesForRgbaToHsva(action: (color: string) => void) {
    const colors: string[] = ['#ffffff', '#00ffff', '#ff00ff', '#ffff00'];

    colors.forEach(c => action(c));
  }
});
