import { Routes } from '@angular/router';

import { UserPageComponent } from './userpage.component';
import { UserAuthGuard } from 'app/shared/auth/userAuth.guard';

export const UserRoutes: Routes = [
    {

        path: 'user',
        component: UserPageComponent,
        canActivate:[UserAuthGuard]
}
];
