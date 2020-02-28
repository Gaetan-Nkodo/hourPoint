import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { AdminListComponent } from './adminList.component';
import { AdminListRoutes } from './adminList.routing';
import { AuthGuard } from 'app/shared/auth/auth.guard';
import { HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminListRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    declarations: [AdminListComponent],
    providers:[AuthGuard]
})

export class AdminListModule {}
