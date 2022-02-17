import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { RouterModule } from '@angular/router';


const  declarables =[
  HeaderComponent,
  FooterComponent
]
@NgModule({
  declarations: [
    declarables
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialCdkModule
  ],
  exports: declarables,
})
export class SharedModule { }
