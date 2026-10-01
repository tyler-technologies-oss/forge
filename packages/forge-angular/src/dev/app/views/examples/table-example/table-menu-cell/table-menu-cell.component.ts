import { Component, input, output } from '@angular/core';
import { IMenuOption } from '@tylertech/forge';
import { ForgeMenuModule, ForgeIconButtonModule, ForgeIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-table-menu-cell',
  templateUrl: './table-menu-cell.component.html',
  imports: [ForgeMenuModule, ForgeIconButtonModule, ForgeIconModule]
})
export class TableMenuCellComponent {
  public readonly options = input<IMenuOption[]>([]);

  public readonly selected = output();

  public onMenuOptionSelected(value: any): void {
    this.selected.emit(value);
  }
}
