import { Routes } from '@angular/router';

import { AdminPageConsultComponent } from './adminpageconsult.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const AdminRoutes: Routes = [
    {

        path: 'adminconsult',
        component: AdminPageConsultComponent,
        canActivate:[AuthGuard]
}
];
