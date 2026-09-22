import { DatePipe, DecimalPipe } from '@angular/common';
import {
  BadgeTheme,
  CellAlign,
  DatePickerComponentDelegate,
  IColumnConfiguration,
  IconButtonComponentDelegate,
  SelectComponentDelegate,
  TextFieldComponentDelegate
} from '@tylertech/forge';

import { MonthShortPipe } from './month-short.pipe';
import { TableExampleComponent } from './table-example.component';
import { TableMenuCellComponent } from './table-menu-cell/table-menu-cell.component';
import { IJournal } from './types';

export interface IJournalColumnConfiguration extends IColumnConfiguration {
  key: string;
}

export function getJournalColumnConfig(instance: TableExampleComponent): IJournalColumnConfiguration[] {
  return [
    {
      key: 'number',
      header: 'Number',
      property: 'number',
      headerCellStyle: { minWidth: instance.showFilter ? '130px' : 'auto' },
      sortable: true,
      initialSort: true,
      filter: true,
      resizable: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter number...' } })
    },
    {
      key: 'year',
      header: 'Year',
      property: 'year',
      headerCellStyle: { minWidth: instance.showFilter ? '130px' : 'auto' },
      sortable: true,
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { type: 'number', placeholder: 'Filter year...' } })
    },
    {
      key: 'month',
      header: 'Month',
      property: 'month',
      headerCellStyle: { minWidth: instance.showFilter ? '130px' : 'auto' },
      transform: value => MonthShortPipe.prototype.transform(value),
      sortable: true,
      filter: true,
      filterDelegate: new SelectComponentDelegate({
        props: {
          placeholder: 'Filter source...',
          options: [
            { label: 'January', value: 1 },
            { label: 'February', value: 2 },
            { label: 'March', value: 3 },
            { label: 'April', value: 4 },
            { label: 'May', value: 5 },
            { label: 'June', value: 6 },
            { label: 'July', value: 7 },
            { label: 'August', value: 8 },
            { label: 'September', value: 9 },
            { label: 'October', value: 10 },
            { label: 'November', value: 11 },
            { label: 'December', value: 12 }
          ]
        }
      })
    },
    {
      key: 'effective-date',
      header: 'Effective date',
      property: 'effectiveDate',
      headerCellStyle: { minWidth: instance.showFilter ? '150px' : 'auto' },
      transform: value => DatePipe.prototype.transform(value, 'MM/dd/yyyy', '', navigator.language),
      filter: true,
      filterDelegate: new DatePickerComponentDelegate({
        options: {
          textFieldDelegateConfig: {
            options: { placeholder: 'Choose date...' }
          }
        }
      })
    },
    {
      key: 'source',
      header: 'Source',
      property: 'source',
      filter: true,
      headerCellStyle: { minWidth: instance.showFilter ? '130px' : 'auto' },
      filterDelegate: new SelectComponentDelegate({
        props: {
          placeholder: 'Filter source...',
          options: [
            { label: 'GNI', value: 'GNI' },
            { label: 'ENC', value: 'ENC' },
            { label: 'BUA', value: 'BUA' },
            { label: 'GEN', value: 'GEN' }
          ]
        }
      })
    },
    {
      key: 'status',
      header: 'Status',
      property: 'status',
      headerCellStyle: { minWidth: instance.showFilter ? '130px' : 'auto' },
      template: (index, div, data: IJournal) => {
        const badge = document.createElement('forge-badge');
        badge.theme = getBadgeTheme(data.status);
        badge.textContent = data.status.toString();
        return badge;
      },
      filter: true,
      filterDelegate: new SelectComponentDelegate({
        props: {
          placeholder: 'Filter status...',
          options: [
            { label: 'Created', value: 1 },
            { label: 'Cancelled', value: 2 },
            { label: 'Held', value: 3 },
            { label: 'In progress', value: 4 },
            { label: 'Approved', value: 5 }
          ]
        }
      })
    },
    {
      key: 'entered-by',
      header: 'Entered by',
      property: 'enteredBy',
      headerCellStyle: { minWidth: instance.showFilter ? '150px' : 'auto' },
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter entered by...' } })
    },
    {
      key: 'description',
      header: 'Description',
      property: 'description',
      headerCellStyle: { minWidth: instance.showFilter ? '154px' : 'auto' },
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter description...' } })
    },
    {
      key: 'total-debits',
      header: 'Total debits',
      property: 'debits',
      align: CellAlign.Right,
      transform: value => DecimalPipe.prototype.transform(value, '1.2-2', navigator.language),
      headerCellStyle: { minWidth: instance.showFilter ? '150px' : 'auto' },
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter debits...', type: 'number' } })
    },
    {
      key: 'total-credits',
      header: 'Total credits',
      property: 'credits',
      align: CellAlign.Right,
      transform: value => DecimalPipe.prototype.transform(value, '1.2-2', navigator.language),
      headerCellStyle: { minWidth: instance.showFilter ? '150px' : 'auto' },
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter credits...', type: 'number' } })
    },
    {
      key: 'attachments',
      header: 'Attachments',
      width: 48,
      align: CellAlign.Center,
      filter: true,
      filterDelegate: new SelectComponentDelegate({
        props: {
          placeholder: 'Filter attachments...',
          options: [
            { label: '', value: null },
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]
        }
      }),
      template: index => {
        const rowData = instance.currentPageData[index];
        if (rowData.attachments) {
          const iconButtonDelegate = new IconButtonComponentDelegate({
            options: {
              iconName: 'attach_file',
              iconType: 'component',
              tooltip: 'View attachments'
            }
          });
          iconButtonDelegate.element.firstElementChild?.addEventListener('click', () => instance.onRowAttachments(index));
          iconButtonDelegate.element.firstElementChild?.setAttribute('aria-label', 'View attachments');
          return iconButtonDelegate.element;
        }
        return undefined as any;
      }
    },
    {
      key: 'menu',
      width: 48,
      align: CellAlign.Center,
      template: index => {
        const rowData = instance.currentPageData[index];
        let dcRef = instance.dynamicComponentCache.get(rowData.number);
        if (!dcRef) {
          dcRef = instance.dcs.create(TableMenuCellComponent);
          dcRef.instance.options = [
            { label: 'Audit', value: 'audit' },
            { label: 'Create template', value: 'create_template' },
            { label: 'Duplicate', value: 'duplicate' },
            { label: 'Export', value: 'export' },
            { label: 'Post', value: 'post' },
            { label: 'Print', value: 'print' },
            { label: 'Release', value: 'release' },
            { label: 'Void', value: 'void' },
            { label: 'Workflow', value: 'workflow' }
          ];
          instance.dynamicComponentCache.set(rowData.number, dcRef);
          dcRef.instance.selected.subscribe((val: string) => instance.onRowMenuOptionSelected(index, val));
        }
        return dcRef.componentElement as HTMLElement;
      }
    },
    {
      key: 'nav-button',
      width: 48,
      align: CellAlign.Center,
      template: index => {
        const iconButtonDelegate = new IconButtonComponentDelegate({
          options: {
            iconName: 'chevron_right',
            iconType: 'component',
            tooltip: 'View details'
          }
        });
        iconButtonDelegate.element.firstElementChild?.addEventListener('click', () => instance.onRowNavigate(index));
        iconButtonDelegate.element.firstElementChild?.setAttribute('aria-label', 'View details');
        return iconButtonDelegate.element;
      }
    }
  ];
}

export function getBadgeStatusText(code: number): string {
  switch (code) {
    case 1:
      return 'Created';
    case 2:
      return 'Cancelled';
    case 3:
      return 'Held';
    case 4:
      return 'In progress';
    case 5:
      return 'Approved';
  }
  return code.toString();
}

export function getBadgeTheme(code: number): BadgeTheme {
  switch (code) {
    case 1:
      return 'info';
    case 2:
      return 'danger';
    case 3:
      return 'warning';
    case 4:
      return 'info-secondary';
    case 5:
      return 'success';
    default:
      return 'default';
  }
}
