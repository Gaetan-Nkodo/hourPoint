import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import {PagesRoutes} from './register.routing'
import { AuthGuard } from 'app/shared/auth/auth.guard';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PagesRoutes),
      FormsModule
    ],
    declarations: [
      RegisterComponent
    ],
    providers:[AuthGuard]
  })
  
  export class RegisterModule {}