import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeTextFieldModule, ForgeIconModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  imports: [DemoCardComponent, ForgeTextFieldModule, FormsModule, ForgeIconModule]
})
export class TextFieldComponent {
  public defaultTextFieldValue = 'Default';
  public roomyTextFieldValue = 'Roomy';
  public denseTextFieldValue = 'Dense';
  public textAreaValue = 'textarea value';
}
