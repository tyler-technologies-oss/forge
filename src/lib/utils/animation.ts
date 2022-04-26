export type StandardCssPropertyName = 'animation' | 'transform' | 'transition';
export type PrefixedCssPropertyName = '-webkit-animation' | '-webkit-transform' | '-webkit-transition';

export interface CssVendorProperty {
  prefixed: PrefixedCssPropertyName;
  standard: StandardCssPropertyName;
}

export type CssVendorPropertyMap = { [K in StandardCssPropertyName]: CssVendorProperty };

const cssPropertyNameMap: CssVendorPropertyMap = {
  animation: {
    prefixed: '-webkit-animation',
    standard: 'animation'
  },
  transform: {
    prefixed: '-webkit-transform',
    standard: 'transform'
  },
  transition: {
    prefixed: '-webkit-transition',
    standard: 'transition'
  }
};

function isWindow(windowObj: Window): boolean {
  return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}

export function getCorrectPropertyName(windowObj: Window, cssProperty: StandardCssPropertyName): StandardCssPropertyName | PrefixedCssPropertyName {
  if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
    const el = windowObj.document.createElement('div');
    const {standard, prefixed} = cssPropertyNameMap[cssProperty];
    const isStandard = standard in el.style;
    return isStandard ? standard : prefixed;
  }
  return cssProperty;
}
