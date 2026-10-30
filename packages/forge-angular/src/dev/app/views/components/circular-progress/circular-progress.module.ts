import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeCircularProgressModule, ForgeOptionModule, ForgeSelectModule, ForgeSelectProxyModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { CircularProgressComponent } from './circular-progress.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeCircularProgressModule,
    ForgeOptionModule,
    ForgeSelectModule,
    ForgeSelectProxyModule,
    DemoCardComponent,
    CircularProgressComponent
  ]
})
export class CircularProgressModule {}
