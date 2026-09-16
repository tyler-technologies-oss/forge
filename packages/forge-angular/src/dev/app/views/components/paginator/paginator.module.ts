import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgePaginatorModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { PaginatorComponent } from './paginator.component';

@NgModule({
  imports: [CommonModule, ForgePaginatorModule, DemoCardComponent, PaginatorComponent]
})
export class PaginatorModule {}
