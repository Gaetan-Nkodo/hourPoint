import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPageConsultComponent } from './userpageconsult.component';
import { UserRoutes } from './userpageconsult.routing';
import { GlobalService } from 'app/shared/global.service';
import { UserAuthGuard } from 'app/shared/auth/userAuth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule
    ],
    declarations: [UserPageConsultComponent],
    providers: [GlobalService,UserAuthGuard]
})

export class UserPageConsultModule {}
