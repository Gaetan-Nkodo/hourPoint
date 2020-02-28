import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPageComponent } from './adminpage.component';
import { AdminRoutes } from './adminpage.routing';
import { AuthGuard } from 'app/shared/auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule
    ],
    declarations: [AdminPageComponent],
    providers:[AuthGuard]
})

export class AdminPageModule {}
