import { Component } from '@angular/core';
import { SelectBeforeValueChangeCallback } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeSelectProxyModule, ForgeSelectModule, ForgeOptionModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  imports: [DemoCardComponent, ForgeSelectProxyModule, ForgeSelectModule, FormsModule, ForgeOptionModule]
})
export class SelectComponent {
  public selected = 'grains';
  public selectedValues = ['grains'];
  public selectedOutlined = 'grains';
  public selectedValuesOutlined = ['grains'];

  public beforeValueChange: SelectBeforeValueChangeCallback<string> = value => value !== 'fruit';

  public beforeValueChangeMultiple: SelectBeforeValueChangeCallback<string> = value => !value.includes('fruit');
}
