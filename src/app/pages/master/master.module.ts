import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterRoutingModule } from './master-routing.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterAuthComponent } from './master-auth/master-auth.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterAuthComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    NgbActiveModal
  ]
})
export class MasterModule { }
