import { AfterViewInit, ApplicationRef, Component, ElementRef, OnInit, Renderer2, inject, viewChild } from '@angular/core';
import {
  ICON_BUTTON_CONSTANTS,
  ICON_CONSTANTS,
  IColumnConfiguration,
  IMenuOption,
  IPaginatorChangeEventData,
  ISortedItem,
  ITableFilterEventData,
  ITableRowClickEventData,
  ITableSortEventData,
  IconRegistry,
  SelectComponentDelegate,
  SortDirection,
  TOOLTIP_CONSTANTS,
  TextFieldComponentDelegate
} from '@tylertech/forge';
import {
  DynamicComponentService,
  IDynamicComponentRef,
  ToastService,
  ForgeTableModule,
  ForgePaginatorModule,
  ForgeMenuModule,
  ForgeIconButtonModule,
  ForgeIconModule,
  ForgeCheckboxProxyModule
} from '@tylertech/forge-angular';
import { tylIconChevronRight, tylIconSettings } from '@tylertech/tyler-icons';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { TableCellMenuComponent } from './table-cell-menu.component';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { AsyncPipe } from '@angular/common';

interface IPlayer {
  [key: string]: any;
  Id: number;
  Name: string;
  Age: number;
  Position: string;
  FavoriteColor: string;
}

const players: IPlayer[] = [
  { Id: 1, Name: 'Tom Brady', Age: 41, Position: 'QB', FavoriteColor: 'Red' },
  { Id: 2, Name: 'Julian Edelman', Age: 32, Position: 'WR', FavoriteColor: 'Blue' },
  { Id: 3, Name: 'Rob Gronkowski', Age: 29, Position: 'TE', FavoriteColor: 'Red' },
  { Id: 4, Name: 'Chris Hogan', Age: 30, Position: 'WR', FavoriteColor: 'Blue' },
  { Id: 5, Name: 'James White', Age: 26, Position: 'RB', FavoriteColor: 'Blue' }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    DemoCardComponent,
    ForgeTableModule,
    ForgePaginatorModule,
    ForgeMenuModule,
    ForgeIconButtonModule,
    ForgeIconModule,
    ForgeCheckboxProxyModule,
    AsyncPipe
  ]
})
export class TableComponent implements OnInit, AfterViewInit {
  private _toastService = inject(ToastService);
  private _dcs = inject(DynamicComponentService);
  private _appRef = inject(ApplicationRef);
  private _renderer = inject(Renderer2);

  public readonly selectAllTemplate = viewChild('selectAllTemplate', { read: ElementRef });

  public readonly selectAllTemplateTable = viewChild('selectAllTemplateTable', { read: ElementRef });

  public columnConfigurations: IColumnConfiguration[] = [
    { header: 'Name', property: 'Name', sortable: true, initialSort: true },
    { header: 'Age', property: 'Age', sortable: true },
    { header: 'Position', property: 'Position', sortable: true }
  ];
  public advColumnConfigurations: IColumnConfiguration[] = [
    {
      header: 'Name',
      property: 'Name',
      sortable: true,
      initialSort: true,
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter name...' } })
    },
    {
      header: 'Age',
      property: 'Age',
      sortable: true,
      filter: true,
      filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter age...', type: 'number' } })
    },
    {
      header: 'Position',
      property: 'Position',
      sortable: false,
      filter: true,
      transform: value => this._transformPosition(value),
      filterDelegate: new SelectComponentDelegate({
        props: {
          placeholder: 'Filter position...',
          options: [{ label: '', value: null }, ...players.map(p => ({ label: p.Position, value: p.Position }))]
        },
        options: {
          style: { width: '164px' }
        }
      })
    },
    { sortable: false, template: index => this._createAdvMenuCell(index) },
    { sortable: false, template: index => this._createVanillaNavCell(index) }
  ];
  public multiColumnSortConfigurations: IColumnConfiguration[] = [
    { header: 'Name', property: 'Name', sortable: true, initialSort: { sortOrder: 1, direction: SortDirection.Descending, propertyName: 'Name' } },
    { header: 'Age', property: 'Age', sortable: true },
    { header: 'Position', property: 'Position', sortable: true },
    { header: 'Favorite Color', property: 'FavoriteColor', sortable: true }
  ];

  public data$: BehaviorSubject<IPlayer[]>;
  public totalCount = players.length;
  private _dynamicComponentCache = new Map<string, IDynamicComponentRef<any>>();
  public options: IMenuOption[] = [
    { label: 'Action', value: 'action' },
    { label: 'Action 2', value: 'action2' },
    { label: 'Action 3', value: 'action3' }
  ];

  constructor() {
    IconRegistry.define([tylIconChevronRight, tylIconSettings]);
  }

  public ngAfterViewInit(): void {
    const selectAllTable = this.selectAllTemplateTable();
    const selectAll = this.selectAllTemplate();
    if (selectAllTable && selectAll) {
      selectAllTable.nativeElement.selectAllTemplate = () => firstValueFrom(of(selectAll.nativeElement));
    }
  }

  public ngOnInit(): void {
    this.data$ = new BehaviorSubject(players.sort(this._sortByProperty('Name', 'DESC')));
  }

  public ngOnDestroy(): void {
    // Make sure to destroy any dynamically created components, otherwise they will stay attached to the `ApplicationRef` and cause memory leaks
    this._dynamicComponentCache.forEach(dcRef => dcRef.destroy());
  }

  public onSelect(evt: CustomEvent): void {
    console.log('[table] forge-table-select:', evt.detail);
  }

  public onSelectAll(evt: CustomEvent): void {}

  public onTableSort(evt: CustomEvent<ITableSortEventData>): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sortPropertyName = this.columnConfigurations[evt.detail.columnIndex].property!;
    this.data$.next([...players.sort(this._sortByProperty(sortPropertyName, evt.detail.direction))]);
  }

  public onTableMultiSort(sortData: ISortedItem[]): void {
    console.log(sortData);
    this.data$.next([...players.sort(this._sortByMultiSortData(sortData))]);
  }

  private _sortByMultiSortData(sortData: ISortedItem[]): (a: IPlayer, b: IPlayer) => number {
    return (a: IPlayer, b: IPlayer) => {
      let i = 0;
      let result = 0;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sortData = sortData.sort((d1: ISortedItem, d2: ISortedItem) => d1.sortOrder! - d2.sortOrder!);
      while (i < sortData.length && result === 0) {
        result =
          (sortData[i].direction === SortDirection.Ascending ? -1 : 1) *
          (a[sortData[i].propertyName].toString() < b[sortData[i].propertyName].toString()
            ? -1
            : a[sortData[i].propertyName].toString() > b[sortData[i].propertyName].toString()
              ? 1
              : 0);
        i++;
      }
      return result;
    };
  }

  private _sortByProperty(propertyName: string, sortDirection: string): (a: IPlayer, b: IPlayer) => number {
    return (a, b) => {
      if (sortDirection === 'DESC') {
        return a[propertyName].toString().localeCompare(b[propertyName]);
      } else {
        return b[propertyName].toString().localeCompare(a[propertyName]);
      }
    };
  }

  public onAdvFilter(evt: CustomEvent<ITableFilterEventData>): void {
    console.log(evt.detail);
  }

  public onAdvRowClick(evt: CustomEvent<ITableRowClickEventData>): void {
    this._toastService.show(`Clicked row: ${evt.detail.index}`);
  }

  public onAdvPageChange(evt: CustomEvent<IPaginatorChangeEventData>): void {
    console.log(evt.detail);
  }

  /**
   * This is an example for how to efficiently create and reuse dynamic Angular components within a table cell.
   * @param index
   */
  private _createAdvMenuCell(index: number): HTMLElement {
    // We first check the cache to see if we have already created this component
    const key = `menu-cell-${index}`;
    let dcRef = this._dynamicComponentCache.get(key);

    // If we haven't already created this component, then create it now. Alternatively you could destroy and
    // recreate the component here if you needed to but this is more efficient
    if (!dcRef) {
      // Create the dynamic component (note: this will attach the component to `ApplicationRef` by default)
      dcRef = this._dcs.create(TableCellMenuComponent);
      this._dynamicComponentCache.set(key, dcRef);

      // Set any inputs if you want here...
      dcRef.instance.iconName = 'more_vert';

      // Subscribe to any outputs that you want here...
      dcRef.instance.selected.subscribe((val: any) => this._handleAdvMenuSelection(index, val));
    }

    // Return the component element that will be placed in the table cell element
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return dcRef.componentElement!;
  }

  /**
   * This is an example of how to safely and imperatively create a cell template using the Angular DOM Renderer.
   * @param index
   */
  private _createVanillaNavCell(index: number): HTMLElement {
    const iconButton = this._renderer.createElement(ICON_BUTTON_CONSTANTS.elementName);
    const icon = this._renderer.createElement(ICON_CONSTANTS.elementName);
    const tooltip = this._renderer.createElement(TOOLTIP_CONSTANTS.elementName);

    this._renderer.appendChild(tooltip, this._renderer.createText('View details'));
    this._renderer.setAttribute(icon, 'name', 'chevron_right');
    this._renderer.setAttribute(iconButton, 'aria-label', 'View details');
    this._renderer.listen(iconButton, 'click', () => this._handleAdvRowNav(index));
    this._renderer.appendChild(iconButton, icon);
    this._renderer.appendChild(iconButton, tooltip);
    return iconButton;
  }

  private _handleAdvRowNav(index: number): void {
    this._toastService.show(`Advanced nav for row index: ${index}`);
  }

  private _handleAdvMenuSelection(index: number, value: any): void {
    const player = players[index];
    this._toastService.show({
      duration: 3000,
      message: `Advanced menu selection for index "${index}" with value "${value}" for player "${player.Name}"`
    });
  }

  /**
   * This simulates a "pipe" but for the table cell `transform` property.
   * @param value
   */
  private _transformPosition(value: string): string {
    switch (value) {
      case 'QB':
        return 'Quarterback';
      case 'WR':
        return 'Wide Receiver';
      case 'TE':
        return 'Tight End';
      case 'RB':
        return 'Running Back';
      default:
        return '';
    }
  }
}
