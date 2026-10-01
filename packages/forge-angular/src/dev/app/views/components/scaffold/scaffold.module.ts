import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeScaffoldModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ScaffoldComponent } from './scaffold.component';

@NgModule({
  imports: [CommonModule, ForgeScaffoldModule, DemoCardComponent, ScaffoldComponent]
})
export class ScaffoldModule {}
