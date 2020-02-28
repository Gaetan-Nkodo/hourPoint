import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { DashboardUserAdminComponent } from './dashboardUserAdmin.component';
import { DashboardRoutes } from './dashboard.routing';
import {NgxPaginationModule} from 'ngx-pagination'
import { AuthGuard } from 'app/shared/auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        NgxPaginationModule
    ],
    declarations: [DashboardUserAdminComponent],
    providers:[AuthGuard]
})

export class DashboardUserAdminModule {}
