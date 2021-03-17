import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about'
      },

      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule)
      },
      {
        path: 'userList',
        loadChildren: () =>
          import('./user-list/user-list.module').then((m) => m.UserListModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
