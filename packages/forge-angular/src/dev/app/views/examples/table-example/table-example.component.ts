import { Component, ElementRef, OnInit, inject, viewChild, OnDestroy } from '@angular/core';
import {
  IColumnConfiguration,
  IMenuOption,
  IMenuSelectEventData,
  ITableSelectAllEventData,
  ITableSelectEventData,
  IconComponentDelegate
} from '@tylertech/forge';
import { ItemManager } from '@tylertech/forge-core';
import { BehaviorSubject } from 'rxjs';

import {
  DynamicComponentService,
  IDynamicComponentRef,
  ForgeDividerModule,
  ForgeMenuModule,
  ForgeIconButtonModule,
  ForgeIconModule,
  ForgeTooltipModule,
  ForgeButtonModule,
  ForgeTableModule,
  ForgePaginatorModule
} from '@tylertech/forge-angular';
import { getJournalColumnConfig } from './journal-table-utils';
import { JournalService } from './journal.service';
import { IJournal } from './types';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss'],
  imports: [
    DemoCardComponent,
    ForgeDividerModule,
    ForgeMenuModule,
    ForgeIconButtonModule,
    ForgeIconModule,
    ForgeTooltipModule,
    ForgeButtonModule,
    ForgeTableModule,
    ForgePaginatorModule,
    AsyncPipe
  ],
  providers: [JournalService]
})
export class TableExampleComponent implements OnInit, OnDestroy {
  private _journalService = inject(JournalService);
  public dcs = inject(DynamicComponentService);

  public readonly tableRef = viewChild('journalTable', { read: ElementRef });
  private _columnConfigurations: IColumnConfiguration[] = getJournalColumnConfig(this);
  public columnConfigs$ = new BehaviorSubject<IColumnConfiguration[]>(this._columnConfigurations);
  public data: IJournal[];
  public currentPageData: IJournal[];
  public pagedData$ = new BehaviorSubject<IJournal[]>([]);
  public showFilter = false;
  public totalCount = 0;
  public journalSelectionCount = 0;
  public availableColumns: IMenuOption[] = [];
  public dynamicComponentCache = new Map<number, IDynamicComponentRef<any>>();
  private _columnSelectionManager = new ItemManager<IColumnConfiguration>();

  public ngOnInit(): void {
    this._journalService.getJournals().subscribe(data => {
      this.data = data;
      this.totalCount = data.length;
      this.currentPageData = data.slice(0, 25);
      this.pagedData$.next(this.currentPageData);
    });

    // All columns are visible by default
    this._columnSelectionManager.setKey(['key']);
    this._columnConfigurations.forEach(cc => this._columnSelectionManager.add(cc));
    this.availableColumns = this._getAvailableColumnOptions();
  }

  public ngOnDestroy(): void {
    this.dynamicComponentCache.forEach(dcRef => dcRef.destroy());
  }

  public onTableRowSelected(evt: CustomEvent<ITableSelectEventData>): void {
    this._updateSelections();
  }

  public onTableSelectAll(evt: CustomEvent<ITableSelectAllEventData>): void {
    this._updateSelections();
  }

  public onToggleColumnVisibility(evt: CustomEvent<IMenuSelectEventData>): void {
    const columnConfig = this._columnConfigurations[evt.detail.value];
    if (this._columnSelectionManager.exists(columnConfig)) {
      this._columnSelectionManager.remove(columnConfig);
    } else {
      this._columnSelectionManager.add(columnConfig);
    }
    this.availableColumns = this._getAvailableColumnOptions();
    this._updateColumns();
  }

  public clearSelections(): void {
    this.tableRef()?.nativeElement.clearSelections();
    this._updateSelections();
  }

  public onRowNavigate(rowIndex: number): void {
    const rowData = this.currentPageData[rowIndex];
    if (rowData) {
      console.log(`Navigating to row: ${rowData.number}`);
    }
  }

  public onRowMenuOptionSelected(rowIndex: number, value: string): void {
    const rowData = this.currentPageData[rowIndex];
    if (rowData) {
      console.log(`Selected option for row: ${rowData.number}, value: ${value}`);
    }
  }

  public onRowAttachments(rowIndex: number): void {
    const rowData = this.currentPageData[rowIndex];
    if (rowData) {
      console.log(`Attachments clicked for row: ${rowData.number}`);
    }
  }

  public onToggleFilters(): void {
    this.showFilter = !this.showFilter;
    this._updateColumns();
  }

  private _updateSelections(): void {
    this.journalSelectionCount = this.tableRef()?.nativeElement.getSelectedRows().length ?? 0;
  }

  private _getAvailableColumnOptions(): IMenuOption[] {
    return this._columnConfigurations
      .filter(cc => !!cc.header)
      .map((cc, index) => {
        const isSelected = this._columnSelectionManager.exists(cc);
        return {
          label: cc.header ?? '',
          value: index,
          leadingBuilder: () => {
            if (isSelected) {
              const iconDelegate = new IconComponentDelegate({
                props: {
                  name: 'check'
                }
              });
              return iconDelegate.element;
            }
            const div = document.createElement('div');
            div.style.height = '24px';
            div.style.width = '24px';
            return div;
          }
        };
      });
  }

  private _updateColumns(): void {
    this.columnConfigs$.next(this._getVisibleColumnConfigs());
  }

  private _getVisibleColumnConfigs(): IColumnConfiguration[] {
    this._columnConfigurations = getJournalColumnConfig(this);
    return [...this._columnConfigurations.filter(cc => this._columnSelectionManager.exists(cc))];
  }
}
