import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';


@NgModule({
  declarations: [
    FormDynamicComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule
  ]
})
export class FormModule { }
