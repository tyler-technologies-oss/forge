import { Component } from '@angular/core';
import { ForgeButtonModule, ForgeConfirmationDialogModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  imports: [DemoCardComponent, ForgeButtonModule, ForgeConfirmationDialogModule]
})
export class ConfirmationDialogComponent {
  public open = false;
  public result: string | undefined;

  public handleAction(event: CustomEvent): void {
    this.open = false;
    this.result = event.detail.value ? 'Confirmed' : 'Cancelled';
  }
}
