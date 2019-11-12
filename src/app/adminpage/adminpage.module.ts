import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPageComponent } from './adminpage.component';
import { AdminRoutes } from './adminpage.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule
    ],
    declarations: [AdminPageComponent]
})

export class AdminPageModule {}
