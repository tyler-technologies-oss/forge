import { Component } from '@angular/core';
import { ForgeQuantityFieldModule } from '@tylertech/forge-angular';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-quantity-field',
  templateUrl: './quantity-field.component.html',
  imports: [DemoCardComponent, ForgeQuantityFieldModule]
})
export class QuantityFieldComponent {}
