import '$src/shared';
import '@tylertech/forge/button';
import { ButtonComponent } from '@tylertech/forge/button';
import '@tylertech/forge/label';
import { SelectComponent } from '@tylertech/forge/select';
import '@tylertech/forge/sparkline';
import { SparklineComponent } from '@tylertech/forge/sparkline';
import { SwitchComponent } from '@tylertech/forge/switch';
import './sparkline.scss';

const container = document.getElementById('sparkline-demo');

// Options
const dataPointsField = document.getElementById('opt-data-points') as HTMLInputElement;
const minField = document.getElementById('opt-min') as HTMLInputElement;
const maxField = document.getElementById('opt-max') as HTMLInputElement;
const smoothSwitch = document.getElementById('opt-smooth') as SwitchComponent;
const fillSwitch = document.getElementById('opt-fill') as SwitchComponent;
const densitySelect = document.getElementById('opt-density') as SelectComponent;
const themeSelect = document.getElementById('opt-theme') as SelectComponent;
const strokeWidthField = document.getElementById('opt-stroke-width') as HTMLInputElement;
const fillOpacityField = document.getElementById('opt-fill-opacity') as HTMLInputElement;
const rerollButton = document.getElementById('opt-reroll') as ButtonComponent;

// Sparklines
const basicSparkline = document.getElementById('basic-sparkline') as SparklineComponent;
const datesSparkline = document.getElementById('dates-sparkline') as SparklineComponent;
const customGradientSparkline = document.getElementById('custom-gradient-sparkline') as SparklineComponent;
const emptySparkline = document.getElementById('empty') as SparklineComponent;
const singleSparkline = document.getElementById('single') as SparklineComponent;
const sameSparkline = document.getElementById('same') as SparklineComponent;
const allSparklines = [basicSparkline, datesSparkline, customGradientSparkline, emptySparkline, singleSparkline, sameSparkline];

// Sample data generators
function generateRandomNumbers(count: number): number[] {
  return Array.from({ length: count }, () => Math.random() * 100);
}

function generateRandomDates(count: number): Date[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const randomDaysAgo = Math.floor(Math.random() * 365);
    return new Date(now - randomDaysAgo * 24 * 60 * 60 * 1000);
  });
}

function populateSparklines() {
  const count = parseInt(dataPointsField?.value ?? '10', 10);
  if (basicSparkline) {
    basicSparkline.value = generateRandomNumbers(count);
  }
  if (datesSparkline) {
    datesSparkline.value = generateRandomDates(count);
  }
  if (customGradientSparkline) {
    customGradientSparkline.value = generateRandomNumbers(count);
  }
  if (emptySparkline) {
    emptySparkline.value = [];
  }
  if (singleSparkline) {
    singleSparkline.value = [50];
  }
  if (sameSparkline) {
    sameSparkline.value = [50, 50, 50, 50, 50];
  }
}

// Event listeners
dataPointsField?.addEventListener('input', () => {
  populateSparklines();
});

minField?.addEventListener('input', () => {
  const min = minField.value ? parseFloat(minField.value) : undefined;
  allSparklines.forEach(sparkline => {
    if (sparkline) {
      sparkline.min = min;
    }
  });
});

maxField?.addEventListener('input', () => {
  const max = maxField.value ? parseFloat(maxField.value) : undefined;
  allSparklines.forEach(sparkline => {
    if (sparkline) {
      sparkline.max = max;
    }
  });
});

smoothSwitch?.addEventListener('change', () => {
  const smooth = smoothSwitch.checked;
  allSparklines.forEach(sparkline => {
    if (sparkline) {
      sparkline.smooth = smooth;
    }
  });
});

fillSwitch?.addEventListener('change', () => {
  const fill = fillSwitch.checked;
  container?.style.setProperty('--forge-sparkline-fill-visibility', fill ? 'visible' : 'hidden');
});

densitySelect?.addEventListener('change', () => {
  const density = densitySelect.value;
  allSparklines.forEach(sparkline => {
    if (sparkline) {
      sparkline.density = density;
    }
  });
});

themeSelect?.addEventListener('change', () => {
  const theme = themeSelect.value;
  allSparklines.forEach(sparkline => {
    if (sparkline && sparkline.id !== 'custom-gradient-sparkline') {
      sparkline.theme = theme;
    }
  });
});

strokeWidthField?.addEventListener('input', () => {
  const strokeWidth = strokeWidthField.value;
  container?.style.setProperty('--forge-sparkline-stroke-width', strokeWidth);
});

fillOpacityField?.addEventListener('input', () => {
  const fillOpacity = fillOpacityField.value + '%';
  container?.style.setProperty('--forge-sparkline-fill-opacity', fillOpacity);
});

rerollButton?.addEventListener('click', () => {
  populateSparklines();
});

// Initialization
populateSparklines();

if (customGradientSparkline) {
  customGradientSparkline.gradient = ['lightsteelblue', 'cornflowerblue', 'teal'];
}
