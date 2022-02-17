import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BoardComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatIconModule


  ]
})
export class BoardModule { }
