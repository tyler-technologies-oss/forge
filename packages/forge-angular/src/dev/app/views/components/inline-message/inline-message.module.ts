import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeIconModule, ForgeInlineMessageModule } from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { InlineMessageComponent } from './inline-message.component';

@NgModule({
  imports: [CommonModule, ForgeInlineMessageModule, ForgeIconModule, DemoCardComponent, InlineMessageComponent]
})
export class InlineMessageModule {}
