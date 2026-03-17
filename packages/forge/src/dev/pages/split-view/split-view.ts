import '$src/shared';
import '@tylertech/forge/split-view';
import './split-view.scss';
import { ISplitViewComponent } from '@tylertech/forge/split-view';
import { ISelectComponent } from '@tylertech/forge/select';

const splitView = document.getElementById('demo-split-view') as ISplitViewComponent;

const orientationSelect = document.getElementById('opt-orientation') as ISelectComponent;
orientationSelect.addEventListener('change', () => {
  splitView.orientation = orientationSelect.value;
});
