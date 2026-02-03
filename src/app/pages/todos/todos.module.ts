import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExampleComponent } from './example/example.component';
import { FormModule } from '../form/form.module';


@NgModule({
  declarations: [
    TodoListComponent,
    ExampleComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormModule
  ],
  exports: [
    TodoListComponent,
    ExampleComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class TodosModule { }
