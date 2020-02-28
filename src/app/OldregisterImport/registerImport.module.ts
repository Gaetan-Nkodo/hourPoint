import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterImportComponent } from './registerImport.component';
import {PagesRoutes} from './registerImport.routing'
import { AuthGuard } from 'app/shared/auth/auth.guard';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PagesRoutes),
      FormsModule,
      HttpClientModule
    ],
    declarations: [
      RegisterImportComponent
    ],
    providers:[AuthGuard]
  })
  
  export class RegisterImportModule {}