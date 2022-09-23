import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UiBuilderRoutingModule } from './ui-builder-routing.module';

export const uiBuilderRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, UiBuilderRoutingModule],
  declarations: [],
})
export class UiBuilderModule {}
