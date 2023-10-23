import '$src/shared';
import '@tylertech/forge/circular-progress';
import type { ICircularProgressComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';

const circularProgress = document.querySelector('forge-circular-progress#circular-progress') as ICircularProgressComponent;

let determinateIntervalTimer: number | undefined;

const showTrackToggle = document.getElementById('opt-show-track') as ISwitchComponent;
showTrackToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    circularProgress.style.removeProperty('--forge-circular-progress-track-background');
  } else {
    circularProgress.style.setProperty('--forge-circular-progress-track-background', 'transparent');
  }
});

const showPercentToggle = document.getElementById('opt-show-percent') as ISwitchComponent;
showPercentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  circularProgress.textContent = selected ? '0%' : '';
});

const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  if (detail === 'tertiary') {
    circularProgress.style.removeProperty('--forge-theme-tertiary');
  } else {
    circularProgress.style.setProperty('--forge-theme-tertiary', `var(--forge-theme-${detail})`);
  }
});

const determinateToggle = document.getElementById('opt-determinate') as ISwitchComponent;
determinateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  circularProgress.determinate = selected;

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
      circularProgress.progress += 0.025;
      if (circularProgress.progress > 1) {
        clearInterval(determinateIntervalTimer);
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

const spacingInput = document.getElementById('opt-spacing') as HTMLInputElement;
spacingInput.addEventListener('input', () => {
  if (!spacingInput.value) {
    circularProgress.style.removeProperty('--forge-circular-progress-padding');
  } else {
    circularProgress.style.setProperty('--forge-circular-progress-padding', spacingInput.value);
  }
});

const trackWidthInput = document.getElementById('opt-track-width') as ISelectComponent;
trackWidthInput.addEventListener('input', () => {
  if (!trackWidthInput.value) {
    circularProgress.style.removeProperty('--forge-circular-progress-track-width');
  } else {
    circularProgress.style.setProperty('--forge-circular-progress-track-width', trackWidthInput.value);
  }
});
