import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPageConsultComponent } from './userpageconsult.component';
import { UserRoutes } from './userpageconsult.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule
    ],
    declarations: [UserPageConsultComponent]
})

export class UserPageConsultModule {}
