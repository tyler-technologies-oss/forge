import '$src/shared';
import { ISelectComponent, ISplitViewComponent } from '@tylertech/forge';
import '@tylertech/forge/split-view';
import './split-view.scss';

const splitView = document.getElementById('demo-split-view') as ISplitViewComponent;

const orientationSelect = document.getElementById('opt-orientation') as ISelectComponent;
orientationSelect.addEventListener('change', () => {
  splitView.orientation = orientationSelect.value;
});
