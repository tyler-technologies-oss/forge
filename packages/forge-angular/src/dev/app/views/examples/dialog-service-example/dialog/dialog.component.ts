import { Component } from '@angular/core';
import { ForgeToolbarModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [ForgeToolbarModule]
})
export class DialogComponent {}
