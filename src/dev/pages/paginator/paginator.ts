import '$src/shared';
import '@tylertech/forge/paginator';
import { IPaginatorComponent, IPaginatorRangeState, ISwitchComponent, PAGINATOR_CONSTANTS } from '@tylertech/forge';

const paginator = document.getElementById('forge-paginator-example') as IPaginatorComponent;

const showPageSizeOptsToggle = document.getElementById('opt-show-page-size-opts') as ISwitchComponent;
showPageSizeOptsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.pageSizeOptions = selected ? PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS : false;
});

const showLabelToggle = document.getElementById('opt-show-label') as ISwitchComponent;
showLabelToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.label = selected ? PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL : null;
});

const showFirstToggle = document.getElementById('opt-show-first') as ISwitchComponent;
showFirstToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.first = selected;
});

const showFirstLastToggle = document.getElementById('opt-show-first-last') as ISwitchComponent;
showFirstLastToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.firstLast = selected;
});

const disabledToggle = document.getElementById('opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.disabled = selected;
});

const alternativeToggle = document.getElementById('opt-alternative') as ISwitchComponent;
alternativeToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.alternative = selected;
});

const customRangeLabelToggle = document.getElementById('opt-custom-range-label') as ISwitchComponent;
customRangeLabelToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    paginator.rangeLabelCallback = (state: IPaginatorRangeState) => {
      return `items ${state.pageStart} thru ${state.pageEnd} out of ${state.total} total`;
    };
  } else {
    paginator.rangeLabelCallback = undefined;
  }
});
