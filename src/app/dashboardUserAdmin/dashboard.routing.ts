import { Routes } from '@angular/router';

import { DashboardUserAdminComponent } from './dashboardUserAdmin.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const DashboardRoutes: Routes = [
    {

        path: 'dashboardUserAdmin',
        component: DashboardUserAdminComponent,
        canActivate:[AuthGuard]
}
];
