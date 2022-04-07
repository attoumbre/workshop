import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { CreateBoardComponent } from './create-board/create-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CreateBoardComponent
  ],
  imports: [
    CommonModule,
    MaterialCdkModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class HomeModule { }
