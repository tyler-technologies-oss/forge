import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { defineAppBarComponent } from '@tylertech/forge';

import { ForgeAppBarProxyModule } from './app-bar-proxy.module';
import { AppBarRouterNavigateDirective } from './app-bar-router-navigate.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AppBarRouterNavigateDirective],
  exports: [AppBarRouterNavigateDirective, ForgeAppBarProxyModule]
})
export class ForgeAppBarModule {
  constructor() {
    defineAppBarComponent();
  }
}
