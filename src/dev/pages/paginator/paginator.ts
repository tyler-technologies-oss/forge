import '$src/shared';
import '@tylertech/forge/paginator';
import { IPaginatorComponent, ISwitchComponent, PAGINATOR_CONSTANTS } from '@tylertech/forge';

const paginator = document.getElementById('forge-paginator-example') as IPaginatorComponent;

const showPageSizeOptsToggle = document.getElementById('opt-show-page-size-opts') as ISwitchComponent;
const showLabelToggle = document.getElementById('opt-show-label') as ISwitchComponent;
const showFirstToggle = document.getElementById('opt-show-first') as ISwitchComponent;
const showFirstLastToggle = document.getElementById('opt-show-first-last') as ISwitchComponent;
const disabledToggle = document.getElementById('opt-disabled') as ISwitchComponent;
const alternativeToggle = document.getElementById('opt-alternative') as ISwitchComponent;

showPageSizeOptsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.pageSizeOptions = selected ? PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS : false;
});

showLabelToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.label = selected ? PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL : null;
});

showFirstToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.first = selected;
});

showFirstLastToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.firstLast = selected;
});

disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.disabled = selected;
});

alternativeToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  paginator.alternative = selected;
});
