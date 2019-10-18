import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import {UserComponent} from './layouts/user/user.component'

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'pages/login',/** Page d'Accueil de l'Application et celle vers laquelle tous les routing inconnu sont redirrigé */
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }
  ]}, {
    path: '',
    component: UserComponent,
    children: [
        {
      path: '',
      loadChildren: './dashboardUser/dashboardUser.module#DashboardUserModule'
  },    {
       path: '',
       loadChildren: './userpage/userpage.module#UserPageModule'
  }
]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
