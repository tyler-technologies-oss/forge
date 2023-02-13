import '$src/shared';
import '@tylertech/forge/circular-progress';
import type { ICircularProgressComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';

const circularProgress = document.querySelector('forge-circular-progress#circular-progress') as ICircularProgressComponent;

let determinateIntervalTimer: number | undefined;

const showTrackToggle = document.getElementById('opt-show-track') as ISwitchComponent;
showTrackToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    circularProgress.style.setProperty('--forge-circular-progress-track-color', 'var(--mdc-theme-text-disabled-on-background)');
  } else {
    circularProgress.style.removeProperty('--forge-circular-progress-track-color');
  }
});

const openToggle = document.getElementById('opt-open') as ISwitchComponent;
openToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  circularProgress.open = selected;
});

const showPercentToggle = document.getElementById('opt-show-percent') as ISwitchComponent;
showPercentToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  circularProgress.textContent = selected ? '0%' : '';
});

const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  if (detail === 'tertiary') {
    circularProgress.style.removeProperty('--forge-theme-tertiary');
  } else {
    circularProgress.style.setProperty('--forge-theme-tertiary', `var(--mdc-theme-${detail})`);
  }
});

const modeSelect = document.getElementById('opt-mode') as ISelectComponent;
modeSelect.addEventListener('change', ({ detail }) => {
  circularProgress.determinate = detail === 'determinate';
  
  showTrackToggle.disabled = !circularProgress.determinate;
  showPercentToggle.disabled = !circularProgress.determinate;

  if (!circularProgress.determinate) {
    circularProgress.textContent = '';
  }

  if (determinateIntervalTimer) {
    clearInterval(determinateIntervalTimer);
  }

  if (circularProgress.determinate) {
    circularProgress.progress = 0;
    determinateIntervalTimer = window.setInterval(() => {
      circularProgress.progress += 0.005;
      if (circularProgress.progress >= 1) {
        circularProgress.progress = 0;
      }
      if (showPercentToggle.selected) {
        const percent = parseInt(String(parseFloat(circularProgress.progress.toFixed(2)) * 100), 10);
        circularProgress.textContent = `${percent}%`;
      }
    }, 100);
  }
});

const sizeInput = document.getElementById('opt-size') as HTMLInputElement;
sizeInput.addEventListener('input', () => {
  if (!sizeInput.value) {
    circularProgress.style.removeProperty('--forge-circular-progress-size');
  } else {
    circularProgress.style.setProperty('--forge-circular-progress-size', sizeInput.value);
  }
});

const strokeWidthInput = document.getElementById('opt-stroke-width') as ISelectComponent;
strokeWidthInput.addEventListener('input', () => {
  if (!strokeWidthInput.value) {
    circularProgress.style.removeProperty('--forge-circular-progress-stroke-width');
  } else {
    circularProgress.style.setProperty('--forge-circular-progress-stroke-width', strokeWidthInput.value);
  }
});
