import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
// import { AuthGuard } from './core/guards/auth.guard';
import { RequestValidationComponent } from './additional/request-validation/request-validation.component';

const routes: Routes = [
  { path: 'pages-aja', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  { path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)},
  { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  {
    path: 'request-validation', component: RequestValidationComponent
  },
  // {
  //   path: 'form',
  //   redirectTo: "pages-aja",
  //   pathMatch: "full"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
