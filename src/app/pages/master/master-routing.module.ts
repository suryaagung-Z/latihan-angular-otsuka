import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterRoleComponent } from './master-role/master-role.component';
import { MasterDepartmentComponent } from './master-department/master-department.component';
import { MasterAuthComponent } from './master-auth/master-auth.component';

const routes: Routes = [
  {
    path: 'role',
    component: MasterRoleComponent
  },
  {
    path: 'department',
    component: MasterDepartmentComponent
  },
  {
    path: 'auth',
    loadComponent: () => import('./master-auth/master-auth.component').then(m => m.MasterAuthComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
