import '$src/shared';
import '@tylertech/forge/color-picker';
import '@tylertech/forge/card';
import './color-picker.scss';
import type { IColorPickerComponent } from '@tylertech/forge';

const colorPicker = document.querySelector('forge-color-picker') as IColorPickerComponent;

colorPicker.addEventListener('forge-color-picker-change', ({ detail }) => {
  console.log('[forge-color-picker-change]', detail);
});
