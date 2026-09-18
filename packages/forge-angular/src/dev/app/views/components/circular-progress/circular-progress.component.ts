import { Component } from '@angular/core';
import { CircularProgressTheme } from '@tylertech/forge';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeCircularProgressModule, ForgeSelectProxyModule, ForgeSelectModule, ForgeOptionModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  imports: [DemoCardComponent, ForgeCircularProgressModule, ForgeSelectProxyModule, ForgeSelectModule, FormsModule, ForgeOptionModule]
})
export class CircularProgressComponent {
  public determinate = false;
  public progress = 0.5;
  public size = 72;
  public strokeWidth = 4;
  public color: CircularProgressTheme = 'tertiary';
}
