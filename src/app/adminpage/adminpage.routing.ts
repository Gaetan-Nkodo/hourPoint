import { Routes } from '@angular/router';

import { AdminPageComponent } from './adminpage.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const AdminRoutes: Routes = [
    {

        path: 'admin',
        component: AdminPageComponent,
        canActivate:[AuthGuard]
}
];
