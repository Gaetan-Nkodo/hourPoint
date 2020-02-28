import { Routes } from '@angular/router';

import { UserPageConsultComponent } from './userpageconsult.component';
import { UserAuthGuard } from 'app/shared/auth/userAuth.guard';

export const UserRoutes: Routes = [
    {

        path: 'userconsult',
        component: UserPageConsultComponent,
        canActivate:[UserAuthGuard]
}
];
