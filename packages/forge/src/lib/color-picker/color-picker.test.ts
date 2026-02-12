import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { frame, task } from '../core/utils/utils.js';
import { COLOR_PICKER_CONSTANTS, DEFAULT_COLOR, IColorPickerComponent, IHSVA, IRGBA } from './index.js';
import './color-picker.js';
import { formatHex, rgbaToHex, rgbaToHsva } from './color-picker-utils.js';
import { TestHarness } from '../core/testing/test-harness.js';

const DEFAULT_RGBA = { r: 0, g: 0, b: 0, a: 1 };
const DEFAULT_HEX = '#000000';
const DEFAULT_HSVA = { h: 0, s: 0, v: 0, a: 1 };
const WHITE_AS_HSVA = { h: 0, s: 0, v: 100, a: 1 };
const WHITE_AS_RGBA = { r: 255, g: 255, b: 255, a: 1 };
const WHITE_AS_HEX = '#ffffff';

describe('ColorPickerComponent', () => {
  describe('by default', () => {
    it('should have shadow root', async () => {
      const harness = await createFixture();

      expect(harness.element.shadowRoot).not.toBeNull();
    });

    it('should have default value', async () => {
      const harness = await createFixture();

      expect(harness.element.value).toBe(`#${DEFAULT_COLOR}`);
    });

    it('should have default rgba ', async () => {
      const harness = await createFixture();

      expect(harness.element.rgba).toEqual(DEFAULT_RGBA);
    });

    it('should have default hsva', async () => {
      const harness = await createFixture();

      expect(harness.element.hsva).toEqual(DEFAULT_HSVA);
    });

    it('should have default opacity', async () => {
      const harness = await createFixture();

      expect(harness.element.opacity).toBe(1);
    });

    it('should have default allow opacity', async () => {
      const harness = await createFixture();

      expect(harness.element.allowOpacity).toBe(true);
    });
  });

  describe('properties', () => {
    describe('value', () => {
      it('when value is set should apply the correct rgba and hsva', async () => {
        const harness = await createFixture();

        harness.element.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, WHITE_AS_HEX);

        expect(harness.element.rgba).toEqual(WHITE_AS_RGBA);
        expect(harness.element.hsva).toEqual(WHITE_AS_HSVA);
      });

      it('when value is set with short hex it should apply the correct rgba and hsva', async () => {
        const harness = await createFixture();

        harness.element.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, '#ffff');

        expect(harness.element.rgba).toEqual(WHITE_AS_RGBA);
        expect(harness.element.hsva).toEqual(WHITE_AS_HSVA);
      });

      it('when value is set with shorterhex it should apply the correct rgba and hsva', async () => {
        const harness = await createFixture();

        harness.element.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, '#fff');

        expect(harness.element.rgba).toEqual(WHITE_AS_RGBA);
        expect(harness.element.hsva).toEqual(WHITE_AS_HSVA);
      });

      it('when value has the wrong type, should throw error', async () => {
        const harness = await createFixture();

        expect(() => {
          harness.element.value = 1 as any;
        }).toThrow('Invalid hex value provided.');
      });

      it('when value is set to invalid hex it should throw an error', async () => {
        const harness = await createFixture();

        expect(() => {
          harness.element.value = '#fa3gt43sh';
        }).toThrow('Invalid hex value provided.');
      });

      it('when value is set to null rgba and hsva should reset', async () => {
        const harness = await createFixture();

        harness.element.value = null;

        expect(harness.element.rgba).toEqual(DEFAULT_RGBA);
        expect(harness.element.hsva).toEqual(DEFAULT_HSVA);
      });

      it('when value is set with all possible paths', async () => {
        const harness = await createFixture();

        expect(() => {
          allPossibleHexValuesForRgbaToHsva(color => {
            harness.element.value = color;
            harness.element.allowOpacity = true;
            harness.element.opacity = 1;
          });
        }).not.toThrow();
      });
    });

    describe('rgba', () => {
      it('when rgba is set should update value and hsva', async () => {
        const harness = await createFixture();
        const color = { r: 255, g: 200, b: 150, a: 1 } as IRGBA;
        const hsva = rgbaToHsva(color);
        const hex = formatHex(rgbaToHex(color), false);

        harness.element.rgba = color;

        expect(harness.element.rgba).toEqual(color);
        expect(harness.element.hsva).toEqual(hsva);
        expect(harness.element.value).toBe(hex);
      });

      it('when rgba is set to null should update value and hsva', async () => {
        const harness = await createFixture();

        harness.element.rgba = null as IRGBA | null;

        expect(harness.element.rgba).toEqual(DEFAULT_RGBA);
        expect(harness.element.hsva).toEqual(DEFAULT_HSVA);
        expect(harness.element.value).toBe(DEFAULT_HEX);
      });
    });

    describe('hsva', () => {
      it('when set to white should update rgba and value', async () => {
        const harness = await createFixture();

        harness.element.hsva = WHITE_AS_HSVA;

        expect(harness.element.rgba).toEqual(WHITE_AS_RGBA);
        expect(harness.element.hsva).toEqual(WHITE_AS_HSVA);
        expect(harness.element.value).toBe(WHITE_AS_HEX);
      });

      it('when set to null should update rgba and value', async () => {
        const harness = await createFixture();

        harness.element.hsva = null as IHSVA | null;

        expect(harness.element.rgba).toEqual(DEFAULT_RGBA);
        expect(harness.element.hsva).toEqual(DEFAULT_HSVA);
        expect(harness.element.value).toBe(DEFAULT_HEX);
      });
    });

    describe('opacity', () => {
      it('when set higher than 1 the console warns', async () => {
        const harness = await createFixture();
        const warnSpy = vi.spyOn(console, 'warn');

        harness.element.opacity = 500;

        expect(warnSpy).toHaveBeenCalled();
        warnSpy.mockRestore();
      });

      it('when set to 0.5 ', async () => {
        const harness = await createFixture();

        harness.element.value = '#fef';
        harness.element.allowOpacity = true;
        harness.element.opacity = 0.5;

        expect(harness.element.hsva!.a).toBe(0.5);
      });

      it('when set to all possible hsva paths ', async () => {
        const harness = await createFixture();

        allPossiblePathsForhsvaToRgba(color => {
          harness.element.hsva = color;
          harness.element.allowOpacity = true;
          harness.element.opacity = 0.5;

          expect(harness.element.hsva.a).toBe(0.5);
        });
      });
    });

    describe('allowOpacity', () => {
      it('when set should set color opacity to 1', async () => {
        const harness = await createFixture();
        const hsva = { ...DEFAULT_HSVA };
        hsva.a = 0.5;

        harness.element.hsva = hsva;
        harness.element.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');

        expect(harness.element.hsva!.a).toBe(1);
      });

      it('when added then removed should have no negative effect', async () => {
        const harness = await createFixture();
        const hsva = { ...DEFAULT_HSVA };
        hsva.a = 0.5;

        harness.element.hsva = hsva;
        harness.element.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');
        harness.element.removeAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY);
        harness.element.hsva = hsva;
        harness.element.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');

        expect(harness.element.hsva!.a).toBe(1);
      });
    });
  });

  describe('events', () => {
    it('when hex input has changed with an invalid input should not trigger change event', async () => {
      const harness = await createFixture();
      const changeSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.hexInputElement.value = '54';
      harness.hexInputElement.dispatchEvent(new Event('input'));

      expect(changeSpy).not.toHaveBeenCalled();
      harness.element.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);
    });

    it('when hex input has changed with an valid input it should trigger the change event', async () => {
      const harness = await createFixture();
      const changeSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.hexInputElement.value = '#fff';
      harness.hexInputElement.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalled();
      harness.element.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);
    });

    it('when rgba input has changed the input should trigger the change event', async () => {
      const harness = await createFixture();
      const changeSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.rgbaInputAElement.value = '1';
      harness.rgbaInputBElement.value = '100';
      harness.rgbaInputGElement.value = '100';
      harness.rgbaInputRElement.value = '100';

      harness.rgbaInputAElement.dispatchEvent(new Event('input'));
      harness.rgbaInputBElement.dispatchEvent(new Event('input'));
      harness.rgbaInputGElement.dispatchEvent(new Event('input'));
      harness.rgbaInputRElement.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalledTimes(4);
      harness.element.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);
    });

    it('when rgba input has changed with an invalid input it should not trigger the change event', async () => {
      const harness = await createFixture();
      const changeSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.rgbaInputAElement.value = 'd';
      harness.rgbaInputBElement.value = 'asd';
      harness.rgbaInputGElement.value = '10d0';
      harness.rgbaInputRElement.value = '10asd0';

      harness.rgbaInputAElement.dispatchEvent(new Event('input'));
      harness.rgbaInputBElement.dispatchEvent(new Event('input'));
      harness.rgbaInputGElement.dispatchEvent(new Event('input'));
      harness.rgbaInputRElement.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalledTimes(0);
      harness.element.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);
    });

    it('when hsva input has changed the input should trigger the change event', async () => {
      const harness = await createFixture();
      const changeSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.hsvaInputAElement.value = DEFAULT_HSVA.a.toString();
      harness.hsvaInputHElement.value = DEFAULT_HSVA.h.toString();
      harness.hsvaInputSElement.value = DEFAULT_HSVA.s.toString();
      harness.hsvaInputVElement.value = DEFAULT_HSVA.v.toString();

      harness.hsvaInputAElement.dispatchEvent(new Event('input'));
      harness.hsvaInputHElement.dispatchEvent(new Event('input'));
      harness.hsvaInputSElement.dispatchEvent(new Event('input'));
      harness.hsvaInputVElement.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalledTimes(4);
      harness.element.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);
    });

    it('when hsva input has changed the input should not trigger the change event', async () => {
      const harness = await createFixture();
      const changeSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.hsvaInputAElement.value = 'asdasdasd';
      harness.hsvaInputHElement.value = '-5';
      harness.hsvaInputSElement.value = ' defaultHsva.s.toString();';
      harness.hsvaInputVElement.value = 'ddasd';

      harness.hsvaInputAElement.dispatchEvent(new Event('input'));
      harness.hsvaInputHElement.dispatchEvent(new Event('input'));
      harness.hsvaInputSElement.dispatchEvent(new Event('input'));
      harness.hsvaInputVElement.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalledTimes(0);
      harness.element.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeSpy);
    });

    it('when type clicked once it should change to rgba', async () => {
      const harness = await createFixture();

      harness.typeButtonElement.click();

      expect(harness.element.shadowRoot!.activeElement).toBe(harness.rgbaInputRElement);
    });

    it('when type clicked twice it should change to hsva', async () => {
      const harness = await createFixture();

      harness.typeButtonElement.click();
      harness.typeButtonElement.click();

      expect(harness.element.shadowRoot!.activeElement).toBe(harness.hsvaInputHElement);
    });

    it('when type clicked thrice it should change to hex', async () => {
      const harness = await createFixture();

      harness.typeButtonElement.click();
      harness.typeButtonElement.click();
      harness.typeButtonElement.click();

      expect(harness.element.shadowRoot!.activeElement).toBe(harness.hexInputElement);
    });

    it('when gradient slider changes it should update the value', async () => {
      const harness = await createFixture();
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 360, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 360, clientY: 0 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 160, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 160, clientY: 0 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 555, clientY: 300 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 555, clientY: 300 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));
      await frame();

      expect(harness.element.value).toBe('#ff0000');
    });

    it('when hue slider changes it should update the value', async () => {
      const harness = await createFixture();
      await frame();

      harness.hueSliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 1000, pageY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 1000 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 10000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 10000, clientY: 0 }));

      await frame();

      expect(harness.element.value).toBe('#ff00ff');
    });

    it('when opacity slider changes it should update the color preview', async () => {
      const harness = await createFixture();
      await frame();

      harness.opacitySliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 1000, pageY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 1000 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 10000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 10000, clientY: 0 }));

      await frame();

      expect(harness.element.value).toBe('#ff0000');
    });

    it('should debounce multiple attempts to dispatch the change event', async () => {
      const harness = await createFixture();
      const changeEventSpy = vi.fn();
      harness.element.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);
      harness.element.debounceChangeEvent = true;

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 360, clientY: 0 }));
      harness.gradientElement.dispatchEvent(new MouseEvent('mousemove', { clientX: 361, clientY: 0 }));
      await task(COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD / 2);

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 362, clientY: 0 }));
      harness.gradientElement.dispatchEvent(new MouseEvent('mousemove', { clientX: 363, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 363, clientY: 0 }));
      await frame();
      await task(COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD * 2);

      expect(changeEventSpy).toHaveBeenCalledOnce();
      expect(changeEventSpy.mock.calls[0][0].detail.type).toBe('slider');
      expect(changeEventSpy.mock.calls[0][0].detail.source).toBe('gradient');
    });

    describe('gradient keyboard events', () => {
      it('when key right gets pressed it should change color', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#fffcfc');
      });

      it('when enter key gets pressed it should do nothing (currently)', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#ffffff');
      });

      it('when key left gets pressed after key right it should go back to white', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#ffffff');
      });

      it('when key down gets pressed it should change color', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#fcfcfc');
      });

      it('when key up gets pressed after down it should change back to white', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 } as Partial<KeyboardEventInit>));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', keyCode: 38 } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#ffffff');
      });

      it('when arrow left is pressed on edge it should stay at white', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#ffffff');
      });

      it('when moved around then back to 0 it should end up to be white', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
        document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

        expect(harness.element.value).toBe('#ffffff');
      });

      it('when other key pressed it should not affect the color', async () => {
        const harness = await createFixture();
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 't' } as Partial<KeyboardEventInit>));

        expect(harness.element.value).toBe('#ffffff');
      });

      describe('color picker slider keyboard events', () => {
        it('when hue slider is moved by key it should change the color', async () => {
          const harness = await createFixture();

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));

          expect(harness.element.value).toBe('#ff0d00');
        });

        it('when hue slider on the left edge and left key pressed no change should occur', async () => {
          const harness = await createFixture();

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as Partial<KeyboardEventInit>));

          expect(harness.element.value).toBe('#ff0000');
        });

        it('when hue slider is changed by end key it should move to end', async () => {
          const harness = await createFixture();

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keyCode: 35 } as Partial<KeyboardEventInit>));

          expect(harness.element.value).toBe('#ff00ff');
        });

        it('when hue slider is changed by home key it should move to start', async () => {
          const harness = await createFixture();

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keyCode: 35 } as Partial<KeyboardEventInit>));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', keyCode: 36 } as Partial<KeyboardEventInit>));

          expect(harness.element.value).toBe('#ff0000');
        });

        it('when hue slider is moved to the end and arrow right is pressed it should not go further', async () => {
          const harness = await createFixture();

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keyCode: 35 } as Partial<KeyboardEventInit>));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));
          harness.hueSliderThumbElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as Partial<KeyboardEventInit>));

          expect(harness.element.value).toBe('#ff00ff');
        });
      });
    });
  });

  describe('Color picker utils', () => {
    it('rgbaToHsva should not throw error when different rgba values are used', async () => {
      await createFixture();

      expect(() => {
        const color = { r: 255, g: 200, b: 150, a: 1 } as IRGBA;
        const color2 = { r: 200, g: 255, b: 150, a: 1 } as IRGBA;
        const color3 = { r: 150, g: 200, b: 255, a: 1 } as IRGBA;

        rgbaToHsva(color);
        rgbaToHsva(color2);
        rgbaToHsva(color3);
      }).not.toThrow();
    });

    it('hsvaToRgba should not throw error when different rgba values are used', async () => {
      const harness = await createFixture();

      expect(() => {
        allPossiblePathsForhsvaToRgba(color => {
          harness.element.hsva = color;
        });
      }).not.toThrow();
    });
  });
});

class ColorPickerHarness extends TestHarness<IColorPickerComponent> {
  public initElementRefs(): void {}

  public get gradientElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.GRADIENT);
  }

  public get previewColorElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.PREVIEW_COLOR);
  }

  public get hexInputElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.HEX_INPUT) as HTMLInputElement;
  }

  public get rgbaInputRElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_R) as HTMLInputElement;
  }

  public get rgbaInputGElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_G) as HTMLInputElement;
  }

  public get rgbaInputBElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_B) as HTMLInputElement;
  }

  public get rgbaInputAElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_A) as HTMLInputElement;
  }

  public get hsvaInputHElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_H) as HTMLInputElement;
  }

  public get hsvaInputSElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_S) as HTMLInputElement;
  }

  public get hsvaInputVElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_V) as HTMLInputElement;
  }

  public get hsvaInputAElement(): HTMLInputElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_A) as HTMLInputElement;
  }

  public get hueSliderElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER);
  }

  public get hueSliderThumbElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER_THUMB);
  }

  public get opacitySliderElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER);
  }

  public get opacitySliderThumbElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER_THUMB);
  }

  public get hexValueContainerElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HEX_CONTAINER);
  }

  public get rgbaValueContainerElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_CONTAINER);
  }

  public get hsvaValueContainerElement(): HTMLElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_CONTAINER);
  }

  public get typeButtonElement(): HTMLButtonElement {
    return getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.TYPE_BUTTON) as HTMLButtonElement;
  }
}

async function createFixture(): Promise<ColorPickerHarness> {
  const screen = render(html`<forge-color-picker></forge-color-picker>`);
  const el = screen.container.querySelector('forge-color-picker') as IColorPickerComponent;
  return new ColorPickerHarness(el);
}

function allPossiblePathsForhsvaToRgba(action: (color: IHSVA) => void): void {
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

function allPossibleHexValuesForRgbaToHsva(action: (color: string) => void): void {
  const colors: string[] = ['#ffffff', '#00ffff', '#ff00ff', '#ffff00'];

  colors.forEach(c => action(c));
}
