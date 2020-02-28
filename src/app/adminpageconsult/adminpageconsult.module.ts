import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPageConsultComponent } from './adminpageconsult.component';
import { AdminRoutes } from './adminpageconsult.routing';
import { AuthGuard } from 'app/shared/auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule
    ],
    declarations: [AdminPageConsultComponent],
    providers:[AuthGuard]
})

export class AdminPageConsultModule {}
