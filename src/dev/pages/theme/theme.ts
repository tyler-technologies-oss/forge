import '$src/shared';
import './theme.scss';

interface ISwatchGroup {
  header?: string;
  swatches: ISwatch[];
}

interface ISwatch {
  text?: string;
  background?: string;
  border?: string;
  noBorder?: boolean;
  foreground?: string;
}

const SWATCH_GROUPS: ISwatchGroup[] = [
  {
    header: 'Surface',
    swatches: [
      { text: 'Surface', background: 'surface' },
      { text: 'Surface dim (background)', background: 'surface-dim' },
      { text: 'Surface bright', background: 'surface-bright' },
      { text: 'Surface inverse', background: 'surface-inverse', foreground: 'on-surface-inverse' }
    ]
  },
  {
    swatches: [
      { text: 'Surface container', background: 'surface-container', foreground: 'on-surface-container' },
      { text: 'Surface container (minimum)', background: 'surface-container-minimum', foreground: 'on-surface' },
      { text: 'Surface container (low)', background: 'surface-container-low', foreground: 'on-surface' },
      { text: 'Surface container (medium)', background: 'surface-container-medium', foreground: 'on-surface' },
      { text: 'Surface container (high)', background: 'surface-container-high', foreground: 'on-surface-container-high' }
    ]
  },
  {
    header: 'Brand',
    swatches: [
      { text: 'Brand', background: 'brand', foreground: 'on-brand' }
    ]
  },
  {
    header: 'Key colors',
    swatches: [
      { text: 'Primary', background: 'primary', foreground: 'on-primary' },
      { text: 'Primary container (minimum)', background: 'primary-container-minimum', foreground: 'on-primary-container-minimum' },
      { text: 'Primary container (low)', background: 'primary-container-low', foreground: 'on-primary-container-low' },
      { text: 'Primary container', background: 'primary-container', foreground: 'on-primary-container' },
      { text: 'Primary container (high)', background: 'primary-container-high', foreground: 'on-primary-container-high' }
    ]
  },
  {
    swatches: [
      { text: 'Secondary', background: 'secondary', foreground: 'on-secondary' },
      { text: 'Secondary container (minimum)', background: 'secondary-container-minimum', foreground: 'on-secondary-container-minimum' },
      { text: 'Secondary container (low)', background: 'secondary-container-low', foreground: 'on-secondary-container-low'},
      { text: 'Secondary container', background: 'secondary-container', foreground: 'on-secondary-container' },
      { text: 'Secondary container (high)', background: 'secondary-container-high', foreground: 'on-secondary-container-high' }
    ]
  },
  {
    swatches: [
      { text: 'Tertiary', background: 'tertiary', foreground: 'on-tertiary' },
      { text: 'Tertiary container (minimum)', background: 'tertiary-container-minimum', foreground: 'on-tertiary-container-minimum' },
      { text: 'Tertiary container (low)', background: 'tertiary-container-low', foreground: 'on-tertiary-container-low' },
      { text: 'Tertiary container', background: 'tertiary-container', foreground: 'on-tertiary-container' },
      { text: 'Tertiary container (high)', background: 'tertiary-container-high', foreground: 'on-tertiary-container-high' }
    ]
  },
  {
    header: 'Status',
    swatches: [
      { text: 'Success', background: 'success', foreground: 'on-success' },
      { text: 'Success container (minimum)', background: 'success-container-minimum', foreground: 'on-success-container-minimum' },
      { text: 'Success container (low)', background: 'success-container-low', foreground: 'on-success-container-low' },
      { text: 'Success container', background: 'success-container', foreground: 'on-success-container' },
      { text: 'Success container (high)', background: 'success-container-high', foreground: 'on-success-container-high' }
    ]
  },
  {
    swatches: [
      { text: 'Error ', background: 'error', foreground: 'on-error' },
      { text: 'Error container (minimum)', background: 'error-container-minimum', foreground: 'on-error-container-minimum' },
      { text: 'Error container (low)', background: 'error-container-low', foreground: 'on-error-container-low' },
      { text: 'Error container', background: 'error-container', foreground: 'on-error-container' },
      { text: 'Error container (high)', background: 'error-container-high', foreground: 'on-error-container-high' }
    ]
  },
  {
    swatches: [
      { text: 'Warning', background: 'warning', foreground: 'on-warning' },
      { text: 'Warning container (minimum)', background: 'warning-container-minimum', foreground: 'on-warning-container-minimum' },
      { text: 'Warning container (low)', background: 'warning-container-low', foreground: 'on-warning-container-low' },
      { text: 'Warning container', background: 'warning-container', foreground: 'on-warning-container' },
      { text: 'Warning container (high)', background: 'warning-container-high', foreground: 'on-warning-container-high' }
    ]
  },
  {
    swatches: [
      { text: 'Info', background: 'info', foreground: 'on-info' },
      { text: 'Info container (minimum)', background: 'info-container-minimum', foreground: 'on-info-container-minimum' },
      { text: 'Info container (low)', background: 'info-container-low', foreground: 'on-info-container-low' },
      { text: 'Info container', background: 'info-container', foreground: 'on-info-container' },
      { text: 'Info container (high)', background: 'info-container-high', foreground: 'on-info-container-high' }
    ]
  },
  {
    header: 'Text',
    swatches: [
      { text: 'High (87%)', foreground: 'text-high', noBorder: true },
      { text: 'Medium (60%)', foreground: 'text-medium', noBorder: true },
      { text: 'Low (38%)', foreground: 'text-low', noBorder: true },
      { text: 'Lowest (12%)', foreground: 'text-lowest', noBorder: true }
    ]
  },
  {
    header: 'Outline',
    swatches: [
      { text: 'Outline (high)', border: 'outline-high' },
      { text: 'Outline (medium)', border: 'outline-medium' },
      { text: 'Outline (low)', border: 'outline-low' },
      { text: 'Outline', border: 'outline' }
    ]
  }
];

const container = document.getElementById('container');

function buildSwatches(): void {
  SWATCH_GROUPS.forEach(group => {
    const swatchContainer = document.createElement('div');
    swatchContainer.classList.add('swatch-container');

    if (group.header) {
      const header = document.createElement('h2');
      header.classList.add('forge-typography--subheading4');
      header.textContent = group.header;
      container.appendChild(header);
    }

    group.swatches.forEach(config => {
      swatchContainer.appendChild(createSwatch(config));
    });

    container.appendChild(swatchContainer);
  });
}

function createSwatch(config: ISwatch): HTMLElement {
  const swatch = document.createElement('div');
  swatch.classList.add('swatch');
  if (config.text) {
    swatch.textContent = config.text;
  }

  if (config.border && !config.noBorder) {
    swatch.style.setProperty('border-color', `var(--forge-theme-${config.border})`);
  } else if (config.noBorder) {
    swatch.style.setProperty('border', 'none');
  }

  if (config.background) {
    swatch.style.setProperty('background-color', `var(--forge-theme-${config.background})`);
  }

  if (config.foreground) {
    swatch.style.setProperty('color', `var(--forge-theme-${config.foreground})`);
  }

  return swatch;
}

buildSwatches();

function hexToRGB(hex: string): [number, number, number] {
  let hexValue = hex.replace('#', '');
  if (hexValue.length === 3) {
    hexValue = hexValue.split('').map(char => char + char).join('');
  }
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  return [r, g, b];
}

function _linearChannelValue($channelValue: number): number {
  const normalizedChannelValue = $channelValue / 255;
  if (normalizedChannelValue < 0.03928) {
    return normalizedChannelValue / 12.92;
  }
  return Math.pow(normalizedChannelValue + 0.055 / 1.055, 2.4);
}

// Calculate the luminance for a color.
// See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
function _luminance($color): number {
  const [r, g, b] = hexToRGB($color);
  const red = _linearChannelValue(r);
  const green = _linearChannelValue(g);
  const blue = _linearChannelValue(b);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

// Calculate the contrast ratio between two colors.
// See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
function contrastRatio($back: string, $front: string): number {
  const backLum = _luminance($back) + 0.05;
  const foreLum = _luminance($front) + 0.05;
  return Math.max(backLum, foreLum) / Math.min(backLum, foreLum);
}
