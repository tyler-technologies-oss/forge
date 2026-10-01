import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defineDialogComponent } from '@tylertech/forge';
import {
  ForgeButtonModule,
  ForgeCheckboxModule,
  ForgeDialogModule,
  ForgeScaffoldModule,
  ForgeTextFieldModule,
  ForgeToolbarModule
} from '@tylertech/forge-angular';

import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './dialog.component';

defineDialogComponent();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeButtonModule,
    ForgeCheckboxModule,
    ForgeTextFieldModule,
    ForgeScaffoldModule,
    ForgeToolbarModule,
    ForgeDialogModule,
    DemoCardComponent,
    DialogComponent,
    ConfirmDialogComponent
  ]
})
export class DialogModule {}
