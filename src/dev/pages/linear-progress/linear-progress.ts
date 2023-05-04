import '$src/shared';
import '@tylertech/forge/linear-progress';
import type { ILinearProgressComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';

const linearProgress = document.getElementById('linear-progress') as ILinearProgressComponent;
const modeSelect = document.getElementById('opt-mode') as ISelectComponent;
const visibleToggle = document.getElementById('opt-visible') as ISwitchComponent;

modeSelect.addEventListener('change', ({ detail: value }) => {
  if (value === 'determinate' || value === 'indeterminate') {
    linearProgress.determinate = value === 'determinate';
    linearProgress.progress = value === 'indeterminate' ? 0 : 0.25;
  } else {
    linearProgress.determinate = true;
    linearProgress.progress = 0.50;
    linearProgress.buffer = 0.75;
  }
});

visibleToggle.addEventListener('forge-switch-select', ({ detail: selected }) => linearProgress.visible = selected);
