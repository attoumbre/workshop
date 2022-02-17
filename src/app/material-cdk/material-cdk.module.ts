import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

//CDK
import { DragDropModule } from '@angular/cdk/drag-drop';

const components = [MatToolbarModule, MatIconModule, DragDropModule];


@NgModule({
  declarations: [],
  imports: [CommonModule, components],
  exports: components,
})
export class MaterialCdkModule { }

