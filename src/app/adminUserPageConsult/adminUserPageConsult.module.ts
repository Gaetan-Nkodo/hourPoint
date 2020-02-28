import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminUserPageConsultComponent } from './adminUserPageConsult.component';
import { UserRoutes } from './adminUserPageConsult.routing';
import { AuthGuard } from 'app/shared/auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule
    ],
    declarations: [AdminUserPageConsultComponent],
    providers:[AuthGuard]
})

export class AdminUserPageConsultModule {}