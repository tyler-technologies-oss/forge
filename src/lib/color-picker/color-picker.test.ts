import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { getActiveElement, getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils';
import { COLOR_PICKER_CONSTANTS, DEFAULT_COLOR, IHSVA, IRGBA } from './color-picker-constants';
import { IColorPickerComponent } from './color-picker';
import { formatHex, rgbaToHex, rgbaToHsva } from './color-picker-utils';
import { TestHarness } from '../core/testing/test-harness';

import './color-picker';

const DEFAULT_RGBA = { r: 0, g: 0, b: 0, a: 1 };
const DEFAULT_HEX = '#000000';
const DEFAULT_HSVA = { h: 0, s: 0, v: 0, a: 1 };
const WHITE_AS_HSVA = { h: 0, s: 0, v: 100, a: 1 };
const WHITE_AS_RGBA = { r: 255, g: 255, b: 255, a: 1 };
const WHITE_AS_HEX = '#ffffff';

describe('ColorPickerComponent', () => {
  it('should have shadow root', async () => {
    const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should have default value', async () => {
    const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
    expect(el.value).to.equal(`#${DEFAULT_COLOR}`);
  });

  it('should have default rgba', async () => {
    const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
    expect(el.rgba).to.deep.equal(DEFAULT_RGBA);
  });

  it('should have default hsva', async () => {
    const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
    expect(el.hsva).to.deep.equal(DEFAULT_HSVA);
  });

  it('should have default opacity', async () => {
    const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
    expect(el.opacity).to.equal(1);
  });

  it('should have default allow opacity', async () => {
    const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
    expect(el.allowOpacity).to.be.true;
  });

  describe('properties', () => {
    describe('value', () => {
      it('when value is set should apply the correct rgba and hsva', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, WHITE_AS_HEX);

        expect(el.rgba).to.deep.equal(WHITE_AS_RGBA);
        expect(el.hsva).to.deep.equal(WHITE_AS_HSVA);
      });

      it('when value is set with short hex it should apply the correct rgba and hsva', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, '#ffff');

        expect(el.rgba).to.deep.equal(WHITE_AS_RGBA);
        expect(el.hsva).to.deep.equal(WHITE_AS_HSVA);
      });

      it('when value is set with shorter hex it should apply the correct rgba and hsva', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.setAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, '#fff');

        expect(el.rgba).to.deep.equal(WHITE_AS_RGBA);
        expect(el.hsva).to.deep.equal(WHITE_AS_HSVA);
      });
      it('when value has the wrong type, should throw error', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);

        const action = (): void => {
          el.value = 1 as any;
        };

        expect(action).to.throw('Invalid hex value provided.');
      });
      it('when value is set to invalid hex it should throw an error', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);

        const action = (): void => {
          el.value = '#fa3gt43sh';
        };

        expect(action).to.throw('Invalid hex value provided.');
      });

      it('when value is set to null rgba and hsva should reset', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.value = null;

        expect(el.rgba).to.deep.equal(DEFAULT_RGBA);
        expect(el.hsva).to.deep.equal(DEFAULT_HSVA);
      });
      it('when value is set with all possible paths', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);

        const action = (): void =>
          allPossibleHexValuesForRgbaToHsva(color => {
            el.value = color;
            el.allowOpacity = true;
            el.opacity = 1;
          });

        expect(action).not.to.throw();
      });
    });

    describe('rgba', () => {
      it('when rgba is set should update value and hsva', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const color = { r: 255, g: 200, b: 150, a: 1 } as IRGBA;
        const hsva = rgbaToHsva(color);
        const hex = formatHex(rgbaToHex(color), false);
        el.rgba = color;

        expect(el.rgba).to.deep.equal(color);
        expect(el.hsva).to.deep.equal(hsva);
        expect(el.value).to.equal(hex);
      });

      it('when rgba is set to null should update value and hsva', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.rgba = null as IRGBA | null;

        expect(el.rgba).to.deep.equal(DEFAULT_RGBA);
        expect(el.hsva).to.deep.equal(DEFAULT_HSVA);
        expect(el.value).to.equal(DEFAULT_HEX);
      });
    });

    describe('hsva', () => {
      it('when set to white should update rgba and value', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.hsva = WHITE_AS_HSVA;

        expect(el.rgba).to.deep.equal(WHITE_AS_RGBA);
        expect(el.hsva).to.deep.equal(WHITE_AS_HSVA);
        expect(el.value).to.equal(WHITE_AS_HEX);
      });

      it('when set to null should update rgba and value', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.hsva = null as IHSVA | null;

        expect(el.rgba).to.deep.equal(DEFAULT_RGBA);
        expect(el.hsva).to.deep.equal(DEFAULT_HSVA);
        expect(el.value).to.equal(DEFAULT_HEX);
      });
    });

    describe('opacity', () => {
      it('when set higher than 1 the console warns', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const consoleSpy = spy(console, 'warn');
        el.opacity = 500;

        expect(consoleSpy.called).to.be.true;
        consoleSpy.restore();
      });

      it('when set to 0.5', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        el.value = '#fef';
        el.allowOpacity = true;
        el.opacity = 0.5;

        expect(el.hsva!.a).to.equal(0.5);
      });

      it('when set to all possible hsva paths', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        allPossiblePathsForhsvaToRgba(color => {
          el.hsva = color;
          el.allowOpacity = true;
          el.opacity = 0.5;

          expect(el.hsva.a).to.equal(0.5);
        });
      });
    });

    describe('allowOpacity', () => {
      it('when set should set color opacity to 1', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const hsva = { ...DEFAULT_HSVA };
        hsva.a = 0.5;
        el.hsva = hsva;
        el.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');
        expect(el.hsva!.a).to.equal(1);
      });

      it('when added then removed should have no negative effect', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const hsva = { ...DEFAULT_HSVA };
        hsva.a = 0.5;
        el.hsva = hsva;
        el.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');
        el.removeAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY);
        el.hsva = hsva;
        el.setAttribute(COLOR_PICKER_CONSTANTS.attributes.ALLOW_OPACITY, '');

        expect(el.hsva!.a).to.equal(1);
      });
    });
  });

  describe('events', () => {
    it('when hex input has changed with an invalid input should not trigger change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const inputSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      harness.hexInput.value = '54';
      harness.hexInput.dispatchEvent(new Event('input'));
      expect(inputSpy.called).to.be.false;
      el.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when hex input has changed with a valid input it should trigger the change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const inputSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
      harness.hexInput.value = '#fff';
      harness.hexInput.dispatchEvent(new Event('input'));
      expect(inputSpy.called).to.be.true;
      el.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when rgba input has changed the input should trigger the change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const inputSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      harness.rgbaInputR.value = '100';
      harness.rgbaInputG.value = '100';
      harness.rgbaInputB.value = '100';
      harness.rgbaInputA.value = '1';

      harness.rgbaInputR.dispatchEvent(new Event('input'));
      harness.rgbaInputG.dispatchEvent(new Event('input'));
      harness.rgbaInputB.dispatchEvent(new Event('input'));
      harness.rgbaInputA.dispatchEvent(new Event('input'));

      expect(inputSpy.callCount).to.equal(4);
      el.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when rgba input has changed with an invalid input it should not trigger the change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const inputSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      harness.rgbaInputR.value = '10asd0';
      harness.rgbaInputG.value = '10d0';
      harness.rgbaInputB.value = 'asd';
      harness.rgbaInputA.value = 'd';

      harness.rgbaInputR.dispatchEvent(new Event('input'));
      harness.rgbaInputG.dispatchEvent(new Event('input'));
      harness.rgbaInputB.dispatchEvent(new Event('input'));
      harness.rgbaInputA.dispatchEvent(new Event('input'));

      expect(inputSpy.callCount).to.equal(0);
      el.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when hsva input has changed the input should trigger the change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const inputSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      harness.hsvaInputH.value = DEFAULT_HSVA.h.toString();
      harness.hsvaInputS.value = DEFAULT_HSVA.s.toString();
      harness.hsvaInputV.value = DEFAULT_HSVA.v.toString();
      harness.hsvaInputA.value = DEFAULT_HSVA.a.toString();

      harness.hsvaInputH.dispatchEvent(new Event('input'));
      harness.hsvaInputS.dispatchEvent(new Event('input'));
      harness.hsvaInputV.dispatchEvent(new Event('input'));
      harness.hsvaInputA.dispatchEvent(new Event('input'));

      expect(inputSpy.callCount).to.equal(4);
      el.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when hsva input has changed with invalid values it should not trigger the change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const inputSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);

      harness.hsvaInputH.value = '-5';
      harness.hsvaInputS.value = ' defaultHsva.s.toString();';
      harness.hsvaInputV.value = 'ddasd';
      harness.hsvaInputA.value = 'asdasdasd';

      harness.hsvaInputH.dispatchEvent(new Event('input'));
      harness.hsvaInputS.dispatchEvent(new Event('input'));
      harness.hsvaInputV.dispatchEvent(new Event('input'));
      harness.hsvaInputA.dispatchEvent(new Event('input'));

      expect(inputSpy.callCount).to.equal(0);
      el.removeEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, inputSpy);
    });

    it('when type clicked once it should change to rgba', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      await elementUpdated(el);

      harness.typeButton.click();
      await elementUpdated(el);

      expect(getActiveElement()).to.equal(harness.rgbaInputR);
    });

    it('when type clicked twice it should change to hsva', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      await elementUpdated(el);

      harness.typeButton.click();
      await elementUpdated(el);
      harness.typeButton.click();
      await elementUpdated(el);

      expect(getActiveElement()).to.equal(harness.hsvaInputH);
    });

    it('when type clicked thrice it should change to hex', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      await elementUpdated(el);

      harness.typeButton.click();
      await elementUpdated(el);
      harness.typeButton.click();
      await elementUpdated(el);
      harness.typeButton.click();
      await elementUpdated(el);

      expect(getActiveElement()).to.equal(harness.hexInput);
    });

    it('when gradient slider changes it should update the value', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
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

      expect(el.value).to.equal('#ff0000');
    });

    it('when hue slider changes it should update the value', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      await frame();

      harness.hueSlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 1000, pageY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 1000 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 10000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 10000, clientY: 0 }));

      await frame();

      expect(el.value).to.equal('#ff00ff');
    });

    it('when opacity slider changes it should update the color preview', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      await frame();

      harness.opacitySlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 1000, pageY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 1000 }));
      await frame();

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 10000, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 10000, clientY: 0 }));

      await frame();

      expect(el.value).to.equal('#ff0000');
    });

    it('should debounce multiple attempts to dispatch the change event', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const harness = new ColorPickerHarness(el);
      const changeEventSpy = spy();
      el.addEventListener(COLOR_PICKER_CONSTANTS.events.CHANGE, changeEventSpy);
      el.debounceChangeEvent = true;

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 360, clientY: 0 }));
      harness.gradientElement.dispatchEvent(new MouseEvent('mousemove', { clientX: 361, clientY: 0 }));
      await task(COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD / 2);

      harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 362, clientY: 0 }));
      harness.gradientElement.dispatchEvent(new MouseEvent('mousemove', { clientX: 363, clientY: 0 }));
      document.dispatchEvent(new MouseEvent('mouseup', { clientX: 363, clientY: 0 }));
      await frame();
      await task(COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD * 2);

      expect(changeEventSpy.calledOnce).to.be.true;
      const lastCall = changeEventSpy.lastCall;
      expect(lastCall.args[0].detail.type).to.equal('slider');
      expect(lastCall.args[0].detail.source).to.equal('gradient');
    });

    describe('gradient keyboard events', () => {
      it('when key right gets pressed it should change color', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as KeyboardEventInit));

        expect(el.value).to.equal('#fffcfc');
      });

      it('when enter key gets pressed it should do nothing (currently)', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 } as KeyboardEventInit));

        expect(el.value).to.equal('#ffffff');
      });

      it('when key left gets pressed after key right it should go back to white', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as KeyboardEventInit));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as KeyboardEventInit));

        expect(el.value).to.equal('#ffffff');
      });

      it('when key down gets pressed it should change color', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 } as KeyboardEventInit));

        expect(el.value).to.equal('#fcfcfc');
      });

      it('when key up gets pressed after down it should change back to white', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 } as KeyboardEventInit));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', keyCode: 38 } as KeyboardEventInit));

        expect(el.value).to.equal('#ffffff');
      });

      it('when arrow left is pressed on edge it should stay at white', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as KeyboardEventInit));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as KeyboardEventInit));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as KeyboardEventInit));

        expect(el.value).to.equal('#ffffff');
      });

      it('when moved around then back to 0 it should end up to be white', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
        document.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));

        expect(el.value).to.equal('#ffffff');
      });

      it('when other key pressed it should not affect the color', async () => {
        const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
        const harness = new ColorPickerHarness(el);
        await frame();

        harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 0, clientY: 0 }));
        harness.gradientElement.dispatchEvent(new KeyboardEvent('keydown', { key: 't' } as KeyboardEventInit));

        expect(el.value).to.equal('#ffffff');
      });

      describe('color picker slider keyboard events', () => {
        it('when hue slider is moved by key it should change the color', async () => {
          const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
          const harness = new ColorPickerHarness(el);

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));

          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as KeyboardEventInit));

          expect(el.value).to.equal('#ff0d00');
        });

        it('when hue slider on the left edge and left key pressed no change should occur', async () => {
          const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
          const harness = new ColorPickerHarness(el);

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));

          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 } as KeyboardEventInit));

          expect(el.value).to.equal('#ff0000');
        });

        it('when hue slider is changed by end key it should move to end', async () => {
          const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
          const harness = new ColorPickerHarness(el);

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));

          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keyCode: 35 } as KeyboardEventInit));

          expect(el.value).to.equal('#ff00ff');
        });

        it('when hue slider is changed by home key it should move to start', async () => {
          const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
          const harness = new ColorPickerHarness(el);

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));

          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keyCode: 35 } as KeyboardEventInit));
          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', keyCode: 36 } as KeyboardEventInit));

          expect(el.value).to.equal('#ff0000');
        });

        it('when hue slider is moved to the end and arrow right is pressed it should not go further', async () => {
          const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
          const harness = new ColorPickerHarness(el);

          harness.gradientElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientX: 1000, clientY: 0 }));

          harness.opacitySlider.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
          document.dispatchEvent(new MouseEvent('mouseup', { clientY: 0, clientX: 0 }));

          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', keyCode: 35 } as KeyboardEventInit));
          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as KeyboardEventInit));
          harness.hueSliderThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 } as KeyboardEventInit));

          expect(el.value).to.equal('#ff00ff');
        });
      });
    });
  });

  describe('Color picker utils', () => {
    it('rgbaToHsva should not throw error when different rgba values are used', async () => {
      const action = (): void => {
        const color = { r: 255, g: 200, b: 150, a: 1 } as IRGBA;
        const color2 = { r: 200, g: 255, b: 150, a: 1 } as IRGBA;
        const color3 = { r: 150, g: 200, b: 255, a: 1 } as IRGBA;

        rgbaToHsva(color);
        rgbaToHsva(color2);
        rgbaToHsva(color3);
      };

      expect(action).not.to.throw();
    });

    it('hsvaToRgba should not throw error when different rgba values are used', async () => {
      const el = await fixture<IColorPickerComponent>(html`<forge-color-picker></forge-color-picker>`);
      const action = (): void => {
        allPossiblePathsForhsvaToRgba(color => {
          el.hsva = color;
        });
      };

      expect(action).not.to.throw();
    });
  });

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
});

class ColorPickerHarness extends TestHarness<IColorPickerComponent> {
  public gradientElement: Element;
  public hexInput: HTMLInputElement;
  public rgbaInputR: HTMLInputElement;
  public rgbaInputG: HTMLInputElement;
  public rgbaInputB: HTMLInputElement;
  public rgbaInputA: HTMLInputElement;
  public hsvaInputH: HTMLInputElement;
  public hsvaInputS: HTMLInputElement;
  public hsvaInputV: HTMLInputElement;
  public hsvaInputA: HTMLInputElement;
  public hueSlider: Element;
  public hueSliderThumb: Element;
  public opacitySlider: Element;
  public typeButton: HTMLButtonElement;

  public initElementRefs(): void {
    this.gradientElement = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.GRADIENT);
    this.hexInput = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.HEX_INPUT) as HTMLInputElement;
    this.rgbaInputR = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_R) as HTMLInputElement;
    this.rgbaInputG = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_G) as HTMLInputElement;
    this.rgbaInputB = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_B) as HTMLInputElement;
    this.rgbaInputA = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_A) as HTMLInputElement;
    this.hsvaInputH = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_H) as HTMLInputElement;
    this.hsvaInputS = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_S) as HTMLInputElement;
    this.hsvaInputV = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_V) as HTMLInputElement;
    this.hsvaInputA = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_A) as HTMLInputElement;
    this.hueSlider = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER);
    this.hueSliderThumb = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER_THUMB);
    this.opacitySlider = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER);
    this.typeButton = getShadowElement(this.element, COLOR_PICKER_CONSTANTS.selectors.TYPE_BUTTON) as HTMLButtonElement;
  }
}
