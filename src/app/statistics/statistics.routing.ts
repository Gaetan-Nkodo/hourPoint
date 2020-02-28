import { Routes } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { AuthGuard } from 'app/shared/auth/auth.guard';

export const StatisticsRoutes: Routes = [
    {

        path: 'statistics',
        component: StatisticsComponent,
        canActivate:[AuthGuard]
}
];
