import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import {UserComponent} from './layouts/user/user.component'
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

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
    },    {
      path: '',
      loadChildren: './adminList/adminList.module#AdminListModule'
  },    {
      path: '',
      loadChildren: './register/register.module#RegisterModule'
  },    {
    path: '',
    loadChildren: './registerImport/registerImport.module#RegisterImportModule'
},      {
       path: '',
       loadChildren: './adminpage/adminpage.module#AdminPageModule'
  },      {
    path: '',
    loadChildren: './adminpageconsult/adminpageconsult.module#AdminPageConsultModule'
  },      {
    path: '',
    loadChildren: './adminUserPageConsult/adminUserPageConsult.module#AdminUserPageConsultModule'
  },      {
    path: '',
    loadChildren: './dashboardUserAdmin/dashboardUserAdmin.module#DashboardUserAdminModule' 
  },      {
    path: '',
    loadChildren: './statistics/statistics.module#StatisticsModule' 
  }
  ]}, {
    path: '',
    component: UserComponent,
    children: [
        {
      path: '',
      loadChildren: './userList/userList.module#UserListModule'
  },    {
       path: '',
       loadChildren: './userpage/userpage.module#UserPageModule'
  },    {
    path: '',
    loadChildren: './userpageconsult/userpageconsult.module#UserPageConsultModule'
}
]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
 }, {
  path:'pageNotFound',
  component:PageNotFoundComponent
 }, {
      path:'**',
      component:PageNotFoundComponent
 }

];
