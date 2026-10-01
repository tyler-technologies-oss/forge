import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeLinearProgressModule, ForgeCheckboxProxyModule, ForgeCheckboxModule, ForgeSliderProxyModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-linear-progress',
  styleUrls: ['./linear-progress.component.scss'],
  templateUrl: './linear-progress.component.html',
  imports: [DemoCardComponent, ForgeLinearProgressModule, ForgeCheckboxProxyModule, ForgeCheckboxModule, FormsModule, ForgeSliderProxyModule]
})
export class LinearProgressComponent {
  public isDeterminate = false;
  public progress = 0.5;
  public buffer = 1;
  public sliderProgressValue = 50;
  public sliderBufferValue = 100;

  public onDeterminateChanged(): void {
    this.progress = 0.5;
    this.buffer = 1;
    this.sliderProgressValue = 50;
    this.sliderBufferValue = 100;
  }
}
