import { COLOR_CONSTANTS } from './color-constants';

export type ThemeType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ColorType = 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey';

export function getThemeColor(type: ThemeType): string {
  switch (type) {
    case 'primary':
      return COLOR_CONSTANTS.themeColors.primary;
    case 'secondary':
      return COLOR_CONSTANTS.themeColors.secondary;
    case 'success':
      return COLOR_CONSTANTS.themeColors.success;
    case 'warning':
      return COLOR_CONSTANTS.themeColors.warning;
    case 'danger':
      return COLOR_CONSTANTS.themeColors.danger;
    case 'info':
      return COLOR_CONSTANTS.themeColors.info;
    default:
      throw new Error(`Invalid theme type provided: ${type}`);
  }
}

export function getColor(type: ColorType, hue?: string): string {
  hue = hue || '500';

  switch (type) {
    case 'red':
      return COLOR_CONSTANTS.redPalette[hue];
    case 'pink':
      return COLOR_CONSTANTS.pinkPalette[hue];
    case 'purple':
      return COLOR_CONSTANTS.purplePalette[hue];
    case 'deep-purple':
      return COLOR_CONSTANTS.deepPurplePalette[hue];
    case 'indigo':
      return COLOR_CONSTANTS.indigoPalette[hue];
    case 'blue':
      return COLOR_CONSTANTS.bluePalette[hue];
    case 'light-blue':
      return COLOR_CONSTANTS.lightBluePalette[hue];
    case 'cyan':
      return COLOR_CONSTANTS.cyanPalette[hue];
    case 'teal':
      return COLOR_CONSTANTS.tealPalette[hue];
    case 'green':
      return COLOR_CONSTANTS.greenPalette[hue];
    case 'light-green':
      return COLOR_CONSTANTS.lightGreenPalette[hue];
    case 'lime':
      return COLOR_CONSTANTS.limePalette[hue];
    case 'yellow':
      return COLOR_CONSTANTS.limePalette[hue];
    case 'amber':
      return COLOR_CONSTANTS.amberPalette[hue];
    case 'orange':
      return COLOR_CONSTANTS.orangePalette[hue];
    case 'deep-orange':
      return COLOR_CONSTANTS.deepOrangePalette[hue];
    case 'brown':
      return COLOR_CONSTANTS.brownPalette[hue];
    case 'grey':
      return COLOR_CONSTANTS.greyPalette[hue];
    case 'blue-grey':
      return COLOR_CONSTANTS.blueGreyPalette[hue];
  }

  return '';
}
