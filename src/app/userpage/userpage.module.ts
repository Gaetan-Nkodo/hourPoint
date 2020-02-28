import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPageComponent } from './userpage.component';
import { UserRoutes } from './userpage.routing';
import { UserAuthGuard } from 'app/shared/auth/userAuth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule
    ],
    declarations: [UserPageComponent],
    providers:[UserAuthGuard]
})

export class UserPageModule {}
