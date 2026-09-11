import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeSliderProxyModule, ForgeSliderModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';
import { JsonPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  imports: [DemoCardComponent, ForgeSliderProxyModule, ForgeSliderModule, FormsModule, JsonPipe, DecimalPipe]
})
export class SliderComponent {
  public continuous = 25;
  public discrete = 50;
  public discreteMarkers = 70;
  public rangeValue = { valueStart: 25, valueEnd: 75 };
}
