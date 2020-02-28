import { Routes } from '@angular/router';

import { UserListComponent } from './userList.component';
import { UserAuthGuard } from 'app/shared/auth/userAuth.guard';

export const UserListRoutes: Routes = [
    {

        path: 'userList',
        component: UserListComponent,
        canActivate:[UserAuthGuard]
}
];
