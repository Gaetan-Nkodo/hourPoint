import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'app/shared/auth.guard';

export const DashboardRoutes: Routes = [
    {

        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
}
];
