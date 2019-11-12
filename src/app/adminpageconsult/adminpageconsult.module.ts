import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPageConsultComponent } from './adminpageconsult.component';
import { AdminRoutes } from './adminpageconsult.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule
    ],
    declarations: [AdminPageConsultComponent]
})

export class AdminPageConsultModule {}
