import { Routes } from '@angular/router';

import { AdminUserPageConsultComponent } from './adminUserPageConsult.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const UserRoutes: Routes = [
    {

        path: 'adminUserPageConsult',
        component: AdminUserPageConsultComponent,
        canActivate:[AuthGuard]
}
];
