import { Routes } from '@angular/router';

import { AdminListComponent } from './adminList.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const AdminListRoutes: Routes = [
    {

        path: 'adminList',
        component: AdminListComponent,
        canActivate: [AuthGuard]
}
];
