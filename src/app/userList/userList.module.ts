import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { UserListComponent } from './userList.component';
import { UserListRoutes } from './userList.routing';
import { UserAuthGuard } from 'app/shared/auth/userAuth.guard';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserListRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        NgxPaginationModule
    ],
    declarations: [UserListComponent],
    providers:[UserAuthGuard]
})

export class UserListModule {}
