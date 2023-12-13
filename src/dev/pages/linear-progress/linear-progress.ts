import '$src/shared';
import type { ILinearProgressComponent, ISelectComponent } from '@tylertech/forge';
import '@tylertech/forge/linear-progress';

const linearProgress = document.getElementById('linear-progress') as ILinearProgressComponent;

const modeSelect = document.getElementById('opt-mode') as ISelectComponent;
modeSelect.addEventListener('change', ({ detail: value }) => {
  if (value === 'determinate' || value === 'indeterminate') {
    linearProgress.determinate = value === 'determinate';
    linearProgress.progress = value === 'indeterminate' ? 0 : 0.25;
    linearProgress.buffer = 1;
  } else {
    linearProgress.determinate = true;
    linearProgress.progress = 0.50;
    linearProgress.buffer = 0.75;
  }
});

const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  linearProgress.theme = detail;
});
