import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutes } from './statistics.routing';
import {NgxPaginationModule} from 'ngx-pagination'
import { AuthGuard } from 'app/shared/auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StatisticsRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        NgxPaginationModule
    ],
    declarations: [StatisticsComponent],
    providers:[AuthGuard]
})

export class StatisticsModule {}
